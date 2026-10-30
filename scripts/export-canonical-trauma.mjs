import { createHash } from 'node:crypto';
import { structuredProtocols } from '../data/structured-protocols.ts';
export const canonicalTraumaIds = [...Array.from({length: 12}, (_, i) => `tb-${String(i + 1).padStart(2, '0')}`), 'am-03', 'am-05', 'up-11', 'pm-03', 'ar-01', 'ar-02', 'ar-03', 'ar-05', 'ar-06', 'ar-08', 'ar-09', 'ar-11'];
export function canonicalContentHash(protocol) {
  const content = { ...protocol };
  delete content.sourcePages; // Derived PDF layout must not change the clinical fingerprint.
  return createHash('sha256').update(JSON.stringify(content)).digest('hex');
}
export function exportCanonicalTrauma() {
  return canonicalTraumaIds.map(id => {
    const protocol = structuredProtocols.find(item => item.id === id);
    if (!protocol) throw new Error(`Missing canonical protocol ${id}`);
    return { protocol, canonicalSha256: canonicalContentHash(protocol) };
  });
}
if (process.argv[1]?.endsWith('/export-canonical-trauma.mjs')) {
  process.stdout.write(JSON.stringify(exportCanonicalTrauma()));
}
