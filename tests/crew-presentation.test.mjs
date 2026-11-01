import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { structuredProtocols } from '../data/structured-protocols.ts';

test('crew reader omits internal review notes and beta governance banners', async()=>{
 const reader=await readFile(new URL('../components/protocols/NativeProtocolReader.tsx',import.meta.url),'utf8');
 assert.doesNotMatch(reader,/content\??\.reviewFlags|BETA_CLINICAL|Beta —|Manual review required|\{status\}/);
 assert.match(reader,/content\.warnings/);
 assert.match(reader,/content\.medications/);
 assert.match(reader,/revisionDate/);
});
test('crew clinical fields omit internal native-protocol terminology without removing anatomical native or beta-blocker terms',()=>{
 for(const protocol of structuredProtocols){
  const {reviewFlags,reviewStatus,lastVerifiedDate,sourcePdf,sourcePages,...clinical}=protocol;
  void reviewFlags;void reviewStatus;void lastVerifiedDate;void sourcePdf;void sourcePages;
  assert.doesNotMatch(JSON.stringify(clinical),/native protocol|native content|beta (?:application|content|field reference)|release safeguards and retained review notes/i,protocol.id);
 }
});
