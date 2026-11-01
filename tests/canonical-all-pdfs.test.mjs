import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { exportCanonicalAll, canonicalAllIds } from '../scripts/export-canonical-all.mjs';
import { canonicalPdfPages } from '../data/canonical-pdf-pages.ts';
import { claiborneProtocols } from '../src/data/claiborneProtocols.ts';
import { appConfig } from '../lib/app-config.ts';

const json = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const [manifest, universal, trauma, catalog, notes] = await Promise.all([
  json('../public/canonical-all-pdfs.json'), json('../public/canonical-universal-pdfs.json'), json('../public/canonical-trauma-pdfs.json'), json('../src/data/claiborne-protocols.json'), json('../reports/all-pdf-review-notes.json'),
]);
const items = exportCanonicalAll();

test('all 91 native entries have current canonical PDF hashes and catalog pagination', async () => {
  assert.equal(canonicalAllIds.length, 91);
  assert.deepEqual(manifest.protocols.map(r => r.id), canonicalAllIds);
  assert.ok(canonicalAllIds.every(id => !/^s[co]-/.test(id)));
  assert.equal(manifest.appVersion, appConfig.appVersion);
  for (const { protocol, canonicalSha256 } of items) {
    const record = manifest.protocols.find(r => r.id === protocol.id);
    assert.equal(record.canonicalSha256, canonicalSha256, `${protocol.id}: regenerate PDF after source change`);
    assert.equal(record.pdfPath, protocol.sourcePdf);
    assert.equal(record.pages, canonicalPdfPages[protocol.id]);
    assert.deepEqual(protocol.sourcePages, { start: 1, end: record.pages });
    const bytes = await readFile(new URL(`../public${record.pdfPath}`, import.meta.url));
    assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
    assert.equal(bytes.length, record.bytes);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), record.pdfSha256);
    const row = catalog.find(r => r.id.toLowerCase() === protocol.id);
    assert.deepEqual(claiborneProtocols.find(r => r.id === row.id), row);
    assert.equal(row.title, protocol.title);
    assert.equal(row.pages, record.pages);
    assert.equal(row.pdfPath, record.pdfPath);
    assert.equal(row.status, protocol.reviewStatus.toLowerCase());
    const note = notes.find(r => r.id === protocol.id);
    assert.equal(note.canonicalSha256, canonicalSha256);
    assert.deepEqual(note.reviewFlags, protocol.reviewFlags);
  }
});

test('shared canonical families point to exactly the same files', () => {
  for (const family of [universal, trauma]) {
    assert.equal(family.appVersion, appConfig.appVersion);
    for (const record of family.protocols) assert.deepEqual(record, manifest.protocols.find(r => r.id === record.id));
  }
  assert.equal(manifest.combined.pages, manifest.protocols.reduce((sum, r) => sum + r.pages, 0));
  assert.equal(manifest.combined.path, 'output/pdf/claiborne-all-canonical.pdf');
  assert.match(manifest.combined.pdfSha256, /^[a-f0-9]{64}$/);
});

test('historical PDF commands contain no duplicate authored clinical prose', async () => {
  for (const name of ['ac02-pdf', 'ac03-pdf', 'adult-cardiac-pdfs', 'adult-medical-pdfs', 'adult-obstetrics-pdfs', 'airway-respiratory-pdfs', 'pediatric-cardiac-pdfs', 'pm01-pdf', 'pm02-pdf', 'te01-pdf', 'te02-pdf', 'approved-te-pdfs']) {
    const source = await readFile(new URL(`../scripts/generate-${name}.py`, import.meta.url), 'utf8');
    assert.match(source, /from canonical_pdf_bridge import build_canonical/);
    assert.ok(source.length < 1000);
  }
});

test('every shipped PDF has a completed fresh visual-review snapshot', async () => {
  const visual = await json('../reports/all-pdf-visual-review.json');
  assert.equal(visual.status, 'passed');
  assert.equal(visual.appVersion, appConfig.appVersion);
  assert.equal(visual.protocolCount, manifest.protocols.length);
  assert.equal(visual.pageCount, manifest.protocols.reduce((sum, r) => sum + r.pages, 0));
  assert.equal(visual.manifestSha256, createHash('sha256').update(await readFile(new URL('../public/canonical-all-pdfs.json', import.meta.url))).digest('hex'));
  assert.deepEqual(visual.protocols.map(r => r.id), manifest.protocols.map(r => r.id));
  for (const record of manifest.protocols) {
    const reviewed = visual.protocols.find(r => r.id === record.id);
    assert.equal(reviewed.pdfSha256, record.pdfSha256, `${record.id}: visual review stale`);
    assert.equal(reviewed.canonicalSha256, record.canonicalSha256);
    assert.equal(reviewed.renderedPages.length, record.pages);
    assert.ok(reviewed.reviewEvidence.length > 0);
    for (const page of reviewed.renderedPages) assert.match(page.pngSha256, /^[a-f0-9]{64}$/);
  }
  for (const family of [manifest, universal, trauma]) assert.ok(visual.combined.some(r => r.combinedPdfSha256 === family.combined.pdfSha256 && r.pageCount === family.combined.pages && !r.errors.length));
});

test('offline catalog and resource byte counts match the canonical PDFs', async () => {
  const offline = await json('../public/offline-data.json');
  const resources = await json('../public/offline-resources.json');
  const rows = offline.categories.flatMap(category => category.protocols);
  for (const record of manifest.protocols) {
    const row = rows.find(item => item.id.toLowerCase() === record.id);
    assert.ok(row, `${record.id}: missing offline catalog entry`);
    assert.equal(row.pdfPath, record.pdfPath);
    assert.equal(row.pages, record.pages);
    assert.equal(resources.resources.find(item => item.url === record.pdfPath)?.bytes, record.bytes, `${record.id}: regenerate offline resource metadata`);
  }
});
