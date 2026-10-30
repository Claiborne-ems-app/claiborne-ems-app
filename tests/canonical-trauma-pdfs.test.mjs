import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';
import { exportCanonicalTrauma } from '../scripts/export-canonical-trauma.mjs';
import { claiborneProtocols } from '../src/data/claiborneProtocols.ts';
import { canonicalPdfPages } from '../data/canonical-pdf-pages.ts';
import { appConfig } from '../lib/app-config.ts';

const json = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const [catalog, manifest, offline, resources] = await Promise.all([
  json('../src/data/claiborne-protocols.json'), json('../public/canonical-trauma-pdfs.json'),
  json('../public/offline-data.json'), json('../public/offline-resources.json'),
]);
const originals = exportCanonicalTrauma();

test('every reconciled PDF is current with the canonical native clinical content', async () => {
  assert.deepEqual(manifest.protocols.map(item => item.id), originals.map(item => item.protocol.id));
  for (const { protocol, canonicalSha256 } of originals) {
    const record = manifest.protocols.find(item => item.id === protocol.id);
    assert.equal(record.canonicalSha256, canonicalSha256, `${protocol.id}: regenerate canonical PDFs after content changes`);
    assert.equal(record.pdfPath, protocol.sourcePdf);
    assert.equal(record.pages, canonicalPdfPages[protocol.id]);
    assert.deepEqual(protocol.sourcePages, { start: 1, end: record.pages });
    const file = new URL(`../public${record.pdfPath}`, import.meta.url);
    const [bytes, meta] = await Promise.all([readFile(file), stat(file)]);
    assert.equal(bytes.subarray(0, 5).toString('ascii'), '%PDF-');
    assert.equal(meta.size, record.bytes);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), record.pdfSha256);
  }
});

test('native viewer, both catalogs and offline package use the identical controlled files', () => {
  assert.equal(resources.appVersion, appConfig.appVersion);
  assert.equal(manifest.appVersion, appConfig.appVersion);
  assert.equal(resources.version, offline.version);
  for (const { protocol } of originals) {
    const row = catalog.find(item => item.id.toLowerCase() === protocol.id);
    const tsrow = claiborneProtocols.find(item => item.id.toLowerCase() === protocol.id);
    assert.deepEqual(tsrow, row, `${protocol.id}: TypeScript/JSON catalog parity`);
    assert.equal(row.pdfPath, protocol.sourcePdf);
    assert.equal(row.pages, protocol.sourcePages.end);
    assert.equal(row.status, protocol.reviewStatus.toLowerCase());
    const saved = offline.categories.flatMap(c => c.protocols).find(item => item.id === protocol.id);
    assert.deepEqual(saved, { ...row, id: protocol.id });
    const pdf = manifest.protocols.find(item => item.id === protocol.id);
    const resource = resources.resources.find(item => item.url === row.pdfPath);
    assert.equal(resource.bytes, pdf.bytes);
    assert.equal(resource.kind, 'document');
    assert.ok(resources.resources.some(item => item.url === `/protocols/${protocol.categoryId}/${protocol.id}/viewer`));
  }
});

test('TB01-09 remove imported-source claims without converting review into clinical release', () => {
  for (const { protocol } of originals.filter(item => /^tb-0[1-9]$/.test(item.protocol.id))) {
    const row = catalog.find(item => item.id.toLowerCase() === protocol.id);
    assert.equal(row.source, 'Claiborne County EMS Clinical Protocols');
    assert.equal(row.status, 'reviewed');
    assert.equal(protocol.reviewStatus, 'Reviewed');
    assert.equal(row.year, 2026);
    assert.doesNotMatch(JSON.stringify(protocol), /original imported PDF remains|North Carolina College/i);
    assert.match(protocol.reviewFlags.join(' '), /clinical release/i);
  }
});

test('PDF deduplication is pinned to reviewed canonical content and retained coverage paths', async () => {
  const projection = await json('../data/trauma-pdf-projection.json');
  const notes = await json('../reports/trauma-pdf-review-notes.json');
  const at = (object, path) => path.split('.').reduce((value, key) => value[key], object);
  for (const { protocol, canonicalSha256 } of originals) {
    const note = notes.find(item => item.id === protocol.id);
    assert.equal(note.canonicalSha256, canonicalSha256);
    assert.deepEqual(note.reviewFlags, protocol.reviewFlags);
    const rules = projection.protocols[protocol.id];
    if (!rules) continue;
    assert.equal(rules.canonicalSha256, canonicalSha256, `${protocol.id}: re-review the editorial projection`);
    const removed = new Set(rules.omissions.map(rule => rule.path));
    for (const rule of rules.omissions) {
      assert.equal(typeof at(protocol, rule.path), 'string');
      assert.ok(rule.reason.length > 10 && rule.coveredBy.length > 0);
      for (const coverage of rule.coveredBy) {
        assert.equal(typeof at(protocol, coverage), 'string');
        assert.ok(!removed.has(coverage));
      }
    }
  }
});
