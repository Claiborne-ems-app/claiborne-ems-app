"""Compare every combined PDF page with the individual canonical page pixel-for-pixel.

This cannot replace visual inspection. It proves assembly preserves reviewed pages.
"""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
from PIL import Image,ImageChops
ROOT=Path(__file__).resolve().parents[1]


def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()


def main(group='all'):
    manifest=json.loads((ROOT/f'public/canonical-{group}-pdfs.json').read_text());render=json.loads((ROOT/'tmp/pdfs/canonical-review/all-render-manifest.json').read_text());rendered={r['id']:r for r in render['protocols']}
    records=manifest['protocols']
    if group=='trauma':records=[r for r in records if r['id'] in {f'tb-{n:02d}' for n in range(1,10)}]
    pages=[]
    for record in records:
        if record['pdfSha256']!=rendered[record['id']]['pdfSha256']:raise ValueError('Stale render snapshot: '+record['id'])
        if sha(ROOT/'public'/record['pdfPath'].lstrip('/'))!=record['pdfSha256']:raise ValueError('Individual PDF changed')
        pages.extend(rendered[record['id']]['renderedPages'])
    combined=ROOT/manifest['combined']['path']
    if sha(combined)!=manifest['combined']['pdfSha256']:raise ValueError('Combined PDF hash mismatch')
    dest=ROOT/f'tmp/pdfs/canonical-review/combined-{group}';dest.mkdir(exist_ok=True)
    for old in dest.glob('page-*.png'):old.unlink()
    subprocess.run(['pdftoppm','-r',str(render['dpi']),'-png',str(combined),str(dest/'page')],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
    if sha(combined)!=manifest['combined']['pdfSha256']:raise ValueError('Combined PDF changed during render')
    images=sorted(dest.glob('page-*.png'),key=lambda p:int(p.stem.split('-')[-1]));errors=[]
    if len(images)!=len(pages):raise ValueError('Combined rendered page count mismatch')
    for n,(path,page) in enumerate(zip(images,pages),1):
        reference=ROOT/page['path']
        if sha(reference)!=page['pngSha256']:raise ValueError('Individual rendered page changed')
        with Image.open(reference) as a,Image.open(path) as b:
            equal=a.size==b.size and not ImageChops.difference(a.convert('RGB'),b.convert('RGB')).getbbox()
        if equal:path.unlink()
        else:errors.append(f'Combined page {n} differs from {page["path"]}')
    report={'group':group,'combinedPdfSha256':manifest['combined']['pdfSha256'],'pageCount':len(pages),'method':'Every combined page rendered at the same DPI and compared pixel-for-pixel with its individually rendered canonical page.','errors':errors}
    (ROOT/f'reports/{group}-combined-render-verification.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2));return bool(errors)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--group',choices=['all','universal','trauma'],default='all');raise SystemExit(main(parser.parse_args().group))
