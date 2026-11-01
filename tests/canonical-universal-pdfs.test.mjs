import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { exportCanonicalUniversal, canonicalUniversalIds } from '../scripts/export-canonical-universal.mjs';
import { canonicalContentHash } from '../scripts/export-canonical-trauma.mjs';
const manifest = JSON.parse(await readFile(new URL('../public/canonical-universal-pdfs.json', import.meta.url), 'utf8'));
const items = exportCanonicalUniversal();

test('all22 Universal entries use their current single native source', async () => {
  assert.equal(items.length, 22);
  assert.deepEqual(manifest.protocols.map(r => r.id), canonicalUniversalIds);
  for (const { protocol, canonicalSha256 } of items) {
    const record = manifest.protocols.find(r => r.id === protocol.id);
    assert.equal(record.canonicalSha256, canonicalSha256);
    assert.deepEqual(protocol.sourcePages, { start: 1, end: record.pages });
    assert.equal(canonicalContentHash({ ...protocol, sourcePages: { start: 1, end: 999 } }), canonicalSha256);
    const bytes = await readFile(new URL(`../public${record.pdfPath}`, import.meta.url));
    assert.equal(record.bytes, bytes.length);
    assert.equal(record.pdfSha256, createHash('sha256').update(bytes).digest('hex'));
  }
});

test('UP19 is only a retirement notice with a live UP18 link', () => {
  const p = items.find(({ protocol }) => protocol.id === 'up-19').protocol;
  assert.match(p.title, /merged into up-18/i);
  assert.deepEqual(p.medications, []);
  assert.match(p.warnings.join(' '), /No independent medication or fluid standing orders/);
  assert.ok(p.actionLinks.some(link => link.href === '/protocols/up/up-18'));
});
