"""Text, links, margins and page-count verification; render every page separately for visual review."""
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
import unicodedata

from canonical_pdf_projection import get_path, project, projection_for
import pdfplumber
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]


def normalize(text):
    text=unicodedata.normalize('NFKC',str(text)).replace('\u2011','-').replace('\u2013','-').replace('\u2014',' - ')
    return re.sub(r'\s+','',text)


def strings(value):
    if isinstance(value,str):yield value
    elif isinstance(value,list):
        for item in value:yield from strings(item)
    elif isinstance(value,dict):
        for item in value.values():yield from strings(item)


def main():
    result=subprocess.run(['node','--import','./scripts/register-test-ts-resolver.mjs','scripts/export-canonical-trauma.mjs'],cwd=ROOT,capture_output=True,text=True,check=True)
    items=json.loads(result.stdout)
    manifest=json.loads((ROOT/'public/canonical-trauma-pdfs.json').read_text())
    results=[];errors=[]
    for item in items:
        p=item['protocol'];path=ROOT/'public'/p['sourcePdf'].lstrip('/');reader=PdfReader(path)
        record=next(m for m in manifest['protocols'] if m['id']==p['id'])
        with pdfplumber.open(path) as pdf:
            text=normalize(''.join(page.crop((44,54,568,740)).extract_text() or '' for page in pdf.pages))
            fields=['title','category','overview','flow','careModules','indications','contraindications','assessment','treatmentSteps','medications','warnings','clinicalPearls','specialPopulations','references','revisionDate','lastVerifiedDate','reviewStatus','actionLinks']
            # Flow tone/structural field IDs are not clinical display content.
            rendered=project(item)['protocol']
            display={key:rendered.get(key,[]) for key in fields}
            for group_key in ('assessment','specialPopulations'):
                display[group_key]=[group for group in rendered[group_key] if group['items']]
            display['flow']=[{k:v for k,v in n.items() if k!='tone'} for n in p.get('flow',[])]
            display['actionLinks']=[{k:v for k,v in link.items() if k in ('label','description')} for link in p.get('actionLinks',[])]
            rules=projection_for(item)
            omitted={normalize(get_path(p,rule['path'])) for rule in rules}
            for rule in rules:
                for coverage_path in rule['coveredBy']:
                    if normalize(get_path(p,coverage_path)) not in text:errors.append(f'{p["id"]}: retained coverage text missing: {coverage_path}')
            for s in strings(display):
                if normalize(s) not in text and normalize(s) not in omitted:errors.append(f'{p["id"]}: missing text {s[:150]}')
            for i,page in enumerate(pdf.pages,1):
                # Body must stay within the content area; header/footer have their own bands.
                bad=[c for c in page.chars if c['x0']<44 or c['x1']>568 or c['top']<10 or c['bottom']>766]
                if bad:errors.append(f'{p["id"]}: page{i} out-of-bounds characters {len(bad)}')
            if len(pdf.pages)!=record['pages']:errors.append(f'{p["id"]}: page count mismatch')
        links=[]
        for page in reader.pages:
            for a in page.get('/Annots',[]):
                action=a.get_object().get('/A',{})
                if action.get('/URI'):links.append(action['/URI'])
        for link in p.get('actionLinks',[]):
            href=link['href'];target='https://claiborne-ems-app.vercel.app'+href if href.startswith('/') else href
            if target not in links:errors.append(f'{p["id"]}: missing clickable link {target}')
        if record['canonicalSha256']!=item['canonicalSha256']:errors.append(f'{p["id"]}: stale canonical content hash')
        if hashlib.sha256(path.read_bytes()).hexdigest()!=record['pdfSha256']:errors.append(f'{p["id"]}: PDF hash mismatch')
        results.append({'id':p['id'],'pages':len(reader.pages),'links':len(links),'bytes':path.stat().st_size,'deduplicatedParagraphs':len(projection_for(item))})
    report={'protocols':results,'pageCount':sum(r['pages'] for r in results),'errors':errors}
    print(json.dumps(report,indent=2))
    return bool(errors)


if __name__=='__main__':sys.exit(main())
