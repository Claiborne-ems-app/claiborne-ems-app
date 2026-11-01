#!/usr/bin/env node
// Read the app's single native source. No authored clinical copy lives here.
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
const [repoArg, outArg] = process.argv.slice(2);
if (!repoArg || !outArg) throw new Error('Usage: node --import <repo>/scripts/register-test-ts-resolver.mjs export_sources.mjs <repo> <output-directory>');
const repo = resolve(repoArg), out = resolve(outArg);
const load = file => import(pathToFileURL(join(repo, file)).href);
const [s,p,m] = await Promise.all([load('data/structured-protocols.ts'),load('data/protocols.ts'),load('data/medication-reference.ts')]);
const payloads = {
  protocols: s.structuredProtocols,
  catalog: { categories:p.protocolCategories, medications:m.medicationReferences, medicationSource:m.medicationReferenceSource }
};
await mkdir(out,{recursive:true});
const hashes = {};
for (const [key,value] of Object.entries(payloads)) {
  const bytes = JSON.stringify(value)+'\n';
  await writeFile(join(out,key+'-frozen.json'),bytes);
  hashes[key] = createHash('sha256').update(bytes).digest('hex');
}
const manifest = { schemaVersion:1, algorithm:'sha256', serialization:'UTF-8 JSON.stringify(value) followed by one LF', sourceSha256:hashes, protocolCount:s.structuredProtocols.length, medicationReferenceCount:m.medicationReferences.length };
await writeFile(join(out,'source-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify(manifest));
