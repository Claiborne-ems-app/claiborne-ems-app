"""Render every canonical PDF page and contact sheet; never assert visual review."""
import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path
import subprocess
from PIL import Image,ImageDraw

ROOT=Path(__file__).resolve().parents[1]


def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()


def main(group='all',dpi=150,only=None):
    manifest=json.loads((ROOT/f'public/canonical-{group}-pdfs.json').read_text())
    base=ROOT/'tmp/pdfs/canonical-review';base.mkdir(parents=True,exist_ok=True)
    previous=json.loads((base/f'{group}-render-manifest.json').read_text()) if only else None
    if previous and previous['dpi']!=dpi:raise ValueError('Targeted rendering cannot change DPI')
    old={r['id']:r for r in previous['protocols']} if previous else {}
    if only and set(only)-{r['id'] for r in manifest['protocols']}:raise ValueError('Unknown targeted ID')
    def render(record):
        pdf=ROOT/'public'/record['pdfPath'].lstrip('/')
        if sha(pdf)!=record['pdfSha256']:raise ValueError('PDF changed before render: '+record['id'])
        if only and record['id'] not in only:
            prior=old.get(record['id'])
            if not prior or prior['pdfSha256']!=record['pdfSha256']:raise ValueError('Unselected PDF needs rendering: '+record['id'])
            for page in prior['renderedPages']:
                if sha(ROOT/page['path'])!=page['pngSha256']:raise ValueError('Unselected image changed: '+page['path'])
            return {**record,'renderedPages':prior['renderedPages']}
        dest=base/'pages'/record['id'];dest.mkdir(parents=True,exist_ok=True)
        for path in dest.glob('page-*.png'):path.unlink()
        subprocess.run(['pdftoppm','-r',str(dpi),'-png',str(pdf),str(dest/'page')],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
        pages=sorted(dest.glob('page-*.png'),key=lambda p:int(p.stem.split('-')[-1]))
        if len(pages)!=record['pages']:raise ValueError('Render page count mismatch: '+record['id'])
        if sha(pdf)!=record['pdfSha256']:raise ValueError('PDF changed during rendering: '+record['id'])
        return {**record,'renderedPages':[{'page':n,'path':str(p.relative_to(ROOT)),'pngSha256':sha(p)} for n,p in enumerate(pages,1)]}
    with ThreadPoolExecutor(max_workers=6) as executor:records=list(executor.map(render,manifest['protocols']))
    buckets={group:records}
    for category in sorted({r['id'].split('-')[0] for r in records}):buckets['category-'+category]=[r for r in records if r['id'].startswith(category+'-')]
    if group=='all':
        trauma={r['id'] for r in json.loads((ROOT/'public/canonical-trauma-pdfs.json').read_text())['protocols']}
        buckets['trauma']=[r for r in records if r['id'] in trauma]
        for category in ['am','ar','pm']:buckets['new-'+category]=[r for r in records if r['id'].startswith(category+'-') and r['id'] not in trauma]
    for name,entries in buckets.items():
        pages=[page for entry in entries for page in entry['renderedPages']];dest=base/name;dest.mkdir(exist_ok=True)
        for old_sheet in dest.glob('sheet-*.jpg'):old_sheet.unlink()
        for k in range(0,len(pages),4):
            sheet=Image.new('RGB',(1720,2250),'#cccccc');draw=ImageDraw.Draw(sheet)
            for j,page in enumerate(pages[k:k+4]):
                path=ROOT/page['path']
                with Image.open(path) as im:
                    im.thumbnail((850,1100));x=(j%2)*860+5;y=(j//2)*1125+20
                    sheet.paste(im,(x,y));draw.text((x,y-17),path.parent.name+' '+path.stem,fill='black')
            sheet.save(dest/f'sheet-{k//4+1:02d}.jpg',quality=92)
        (dest/'index.json').write_text(json.dumps(pages,indent=2)+'\n')
        print(name,len(pages),'pages',(len(pages)+3)//4,'sheets',dest,flush=True)
    (base/f'{group}-render-manifest.json').write_text(json.dumps({'dpi':dpi,'visualReviewStatus':'Not asserted; fresh page inspection required','protocols':records},indent=2)+'\n')


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--group',choices=['all','universal','trauma'],default='all');parser.add_argument('--dpi',type=int,default=150);parser.add_argument('--only',nargs='+');args=parser.parse_args();main(args.group,args.dpi,args.only)
