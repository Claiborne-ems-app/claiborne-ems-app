import { readFile } from 'node:fs/promises';
// Assert runtime controlled content rather than the physical location of an
// array. Family modules are compatibility views of the same canonical source.
export async function readProtocolAware(path, base) {
 const url = new URL(`../${path}`,base);
 if (path.startsWith('data/structured-') && path.endsWith('.ts')) {
  const importedModule=await import(url.href);
  const arrays=Object.values(importedModule).filter(Array.isArray);
  return arrays.map(value=>JSON.stringify(value,null,2).replace(/^(\s*)"([A-Za-z_]\w*)":/gm,'$1$2:')).join('\n');
 }
 return readFile(url,'utf8');
}
