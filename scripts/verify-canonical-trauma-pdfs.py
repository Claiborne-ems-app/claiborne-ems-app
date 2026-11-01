"""Verify canonical clinical text, links, hashes, bounds, pages and combined PDFs.

Visual inspection is a separate mandatory gate; extraction cannot prove layout.
"""
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import unicodedata
import pdfplumber
from pypdf import PdfReader
from canonical_pdf_projection import project,projection_for,get_path

ROOT=Path(__file__).resolve().parents[1]


def normalize(text):
    text=unicodedata.normalize('NFKC',str(text)).replace('\u2011','-').replace('\u2013','-').replace('\u2014',' - ')
    return re.sub(r'\s+','',text)


def strings(value):
    if isinstance(value,str):yield value
    elif isinstance(value,list):
        for item in value:yield from strings(item)
    elif isinstance(value,dict):
        for item in value.values():yield from strings(item)


def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()


def main(group='trauma'):
    result=subprocess.run([os.environ.get('NODE','node'),'--import','./scripts/register-test-ts-resolver.mjs',f'scripts/export-canonical-{group}.mjs'],cwd=ROOT,capture_output=True,text=True,check=True)
    items=json.loads(result.stdout);manifest_path=ROOT/f'public/canonical-{group}-pdfs.json';manifest=json.loads(manifest_path.read_text())
    version=json.loads((ROOT/'package.json').read_text())['version'];errors=[];results=[];combined_pages={}
    if manifest['appVersion']!=version:errors.append('Manifest app version stale')
    if [r['id'] for r in manifest['protocols']]!=[i['protocol']['id'] for i in items]:errors.append('Manifest protocol order/set mismatch')
    records={r['id']:r for r in manifest['protocols']}
    catalog={r['id'].lower():r for r in json.loads((ROOT/'src/data/claiborne-protocols.json').read_text())}
    notes={r['id']:r for r in json.loads((ROOT/f'reports/{group}-pdf-review-notes.json').read_text())}
    for item in items:
        p=item['protocol'];pid=p['id'];path=ROOT/'public'/p['sourcePdf'].lstrip('/');reader=PdfReader(path);record=records[pid]
        if record['pdfPath']!=p['sourcePdf']:errors.append(pid+': PDF source path mismatch')
        if record['bytes']!=path.stat().st_size:errors.append(pid+': PDF byte count mismatch')
        if record['pdfSha256']!=sha(path):errors.append(pid+': PDF hash mismatch')
        if record['canonicalSha256']!=item['canonicalSha256']:errors.append(pid+': native source hash stale')
        if p['sourcePages']!={'start':1,'end':len(reader.pages)}:errors.append(pid+': native page count mismatch')
        if record['pages']!=len(reader.pages):errors.append(pid+': manifest page count mismatch')
        row=catalog[pid]
        if row['pages']!=len(reader.pages) or row['pdfPath']!=p['sourcePdf']:errors.append(pid+': catalog PDF/page mismatch')
        if row['status']!=p['reviewStatus'].lower():errors.append(pid+': catalog review status mismatch')
        if notes[pid]['canonicalSha256']!=item['canonicalSha256'] or notes[pid]['reviewFlags']!=p['reviewFlags']:errors.append(pid+': governance audit stale')
        subject=reader.metadata.get('/Subject','')
        if item['canonicalSha256'] not in subject or 'App package '+version not in subject:errors.append(pid+': PDF metadata stale')
        combined_pages[pid]=[normalize(page.extract_text() or '') for page in reader.pages]
        display=project(item)['protocol'];rules=projection_for(item)
        fields=['title','category','overview','flow','careModules','indications','contraindications','assessment','treatmentSteps','medications','warnings','clinicalPearls','specialPopulations','references','revisionDate','lastVerifiedDate','actionLinks']
        expected={key:display.get(key,[]) for key in fields}
        expected['flow']=[{k:v for k,v in node.items() if k!='tone'} for node in display.get('flow',[])]
        expected['actionLinks']=[{k:v for k,v in link.items() if k in ('label','description')} for link in display.get('actionLinks',[])]
        for key in ['assessment','specialPopulations']:expected[key]=[entry for entry in display[key] if entry['items']]
        with pdfplumber.open(path) as pdf:
            text=normalize(''.join(page.crop((44,54,568,740)).extract_text() or '' for page in pdf.pages))
            for rule in rules:
                for key in rule['coveredBy']:
                    if normalize(get_path(p,key)) not in text:errors.append(f'{pid}: missing retained projection coverage {key}')
            for value in strings(expected):
                if normalize(value) not in text:errors.append(f'{pid}: missing displayed native text {value[:160]}')
            for number,page in enumerate(pdf.pages,1):
                bad=[c for c in page.chars if c['x0']<44 or c['x1']>568 or c['top']<10 or c['bottom']>766]
                if bad:errors.append(f'{pid}: page {number} has {len(bad)} out-of-bounds characters')
            plain='\n'.join(page.extract_text() or '' for page in pdf.pages)
            for forbidden in ['Clinical release pending.','Approved native content.','Beta reference -','Content status:','CONTROLLED PROTOCOL']:
                if forbidden in plain:errors.append(f'{pid}: internal review/banner text in crew PDF: {forbidden}')
            if pid=='up-19':
                if p['medications'] or normalize('Merged Into UP-18') not in text:errors.append('UP19 retirement notice missing or independent medication orders present')
                if re.search(r'\b\d+(?:\.\d+)?\s*(?:mg|mcg)(?:\b|/)',plain,re.I):errors.append('UP19 contains a standalone drug dose')
        links=[]
        for page in reader.pages:
            for annotation in page.get('/Annots',[]):
                action=annotation.get_object().get('/A',{})
                if action.get('/URI'):links.append(str(action['/URI']))
        for link in p.get('actionLinks',[]):
            href=link['href'];target='https://claiborne-ems-app.vercel.app'+href if href.startswith('/') else href
            if target not in links:errors.append(f'{pid}: missing clickable link {target}')
        results.append({'id':pid,'pages':len(reader.pages),'links':len(links),'bytes':path.stat().st_size,'deduplicatedParagraphs':len(rules)})
    names={'all':'claiborne-all-canonical.pdf','universal':'claiborne-up01-up22-approved.pdf','trauma':'claiborne-tb01-tb09-review.pdf'}
    combined_path=ROOT/'output/pdf'/names[group];combined=PdfReader(combined_path);record=manifest.get('combined',{})
    selected=items if group!='trauma' else [i for i in items if i['protocol']['id'] in {f'tb-{n:02d}' for n in range(1,10)}]
    expected_pages=[page for item in selected for page in combined_pages[item['protocol']['id']]]
    if record.get('path')!=str(combined_path.relative_to(ROOT)):errors.append('Combined path mismatch')
    if record.get('pages')!=len(combined.pages):errors.append('Combined page count mismatch')
    if record.get('bytes')!=combined_path.stat().st_size:errors.append('Combined byte count mismatch')
    if record.get('pdfSha256')!=sha(combined_path):errors.append('Combined hash mismatch')
    if [normalize(page.extract_text() or '') for page in combined.pages]!=expected_pages:errors.append('Combined page text/order mismatch')
    if len(combined.outline)!=len(selected):errors.append('Combined bookmark count mismatch')
    page_index=0
    for item,bookmark in zip(selected,combined.outline):
        pid=item['protocol']['id']
        if combined.get_destination_page_number(bookmark)!=page_index:errors.append(pid+': combined bookmark destination mismatch')
        if pid.upper() not in bookmark.title:errors.append(pid+': combined bookmark title mismatch')
        page_index+=len(combined_pages[pid])
    report={'appVersion':version,'manifestSha256':sha(manifest_path),'protocols':results,'pageCount':sum(r['pages'] for r in results),'combinedPdfSha256':record.get('pdfSha256'),'errors':errors}
    (ROOT/f'reports/{group}-pdf-verification.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report,indent=2));return bool(errors)


if __name__=='__main__':sys.exit(main())
