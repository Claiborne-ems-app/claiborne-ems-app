import { structuredProtocols } from '../data/structured-protocols.ts';
import { canonicalContentHash } from './export-canonical-trauma.mjs';
export const canonicalUniversalIds = Array.from({length: 22}, (_, i) => `up-${String(i + 1).padStart(2, '0')}`);
export function exportCanonicalUniversal() {
  return canonicalUniversalIds.map(id => {
    const matches = structuredProtocols.filter(p => p.id === id && p.categoryId === 'up');
    if (matches.length !== 1) throw new Error(`Expected exactly one Universal protocol ${id}`);
    const protocol = matches[0];
    if (id === 'up-19' && (protocol.medications.length || !/merged into up-18/i.test(protocol.title))) throw new Error('UP19 must remain a retirement notice');
    return { protocol, canonicalSha256: canonicalContentHash(protocol) };
  });
}
if (process.argv[1]?.endsWith('/export-canonical-universal.mjs')) process.stdout.write(JSON.stringify(exportCanonicalUniversal()));
