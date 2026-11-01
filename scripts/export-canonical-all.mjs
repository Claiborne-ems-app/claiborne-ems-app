import { structuredProtocols } from '../data/structured-protocols.ts';
import { claiborneProtocols } from '../src/data/claiborneProtocols.ts';
import { canonicalContentHash } from './export-canonical-trauma.mjs';

export const canonicalAllIds = claiborneProtocols.filter(p => !['SC', 'SO'].includes(p.categoryCode)).map(p => p.id.toLowerCase());
export function exportCanonicalAll() {
  if (new Set(canonicalAllIds).size !== canonicalAllIds.length) throw new Error('Duplicate catalog ID');
  const orphan = structuredProtocols.filter(p => !canonicalAllIds.includes(p.id));
  if (orphan.length) throw new Error(`Native records absent from active catalog: ${orphan.map(p => p.id)}`);
  const paths = new Set();
  return canonicalAllIds.map(id => {
    const matches = structuredProtocols.filter(p => p.id === id);
    if (matches.length !== 1) throw new Error(`Expected exactly one canonical protocol ${id}`);
    const protocol = matches[0];
    if (paths.has(protocol.sourcePdf)) throw new Error(`Duplicate PDF path: ${protocol.sourcePdf}`);
    paths.add(protocol.sourcePdf);
    if (id === 'up-19' && (protocol.medications.length || !/merged into up-18/i.test(protocol.title))) throw new Error('UP19 must remain a retirement notice without medication orders');
    return { protocol, canonicalSha256: canonicalContentHash(protocol) };
  });
}
if (process.argv[1]?.endsWith('/export-canonical-all.mjs')) process.stdout.write(JSON.stringify(exportCanonicalAll()));
