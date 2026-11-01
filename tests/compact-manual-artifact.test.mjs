import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { structuredProtocols } from '../data/structured-protocols.ts';
import { protocolCategories } from '../data/protocols.ts';
import { medicationReferences, medicationReferenceSource } from '../data/medication-reference.ts';
import { printManualPath } from '../lib/print-manual.ts';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const jsonHash = value => hash(JSON.stringify(value)+'\n');
const readJson = async path => JSON.parse(await readFile(new URL(path,import.meta.url),'utf8'));

test('compact manual is visually verified and matches the exact current clinical and formulary sources',async()=>{
 const manifest=await readJson('../public/compact-manual.json');
 assert.equal(manifest.path,printManualPath);
 assert.equal(manifest.visualQa,'passed');
 assert.equal(manifest.sourceSha256.protocols,jsonHash(structuredProtocols));
 assert.equal(manifest.sourceSha256.catalog,jsonHash({categories:protocolCategories,medications:medicationReferences,medicationSource:medicationReferenceSource}));
 const bytes=await readFile(new URL('../public'+printManualPath,import.meta.url));
 assert.equal(hash(bytes),manifest.sha256);
 assert.equal(bytes.length,manifest.bytes);
 assert.equal(bytes.subarray(0,5).toString(),'%PDF-');
 assert.ok(manifest.pages>0);
});
test('compact manual has a direct app link and a byte-counted offline document entry',async()=>{
 const page=await readFile(new URL('../app/protocols/page.tsx',import.meta.url),'utf8');
 assert.match(page,/href=\{printManualPath\}/);
 const offline=await readJson('../public/offline-resources.json');
 const matches=offline.resources.filter(r=>r.url===printManualPath);
 assert.equal(matches.length,1);assert.equal(matches[0].kind,'document');
 assert.equal(matches[0].bytes,(await readFile(new URL('../public'+printManualPath,import.meta.url))).length);
});
