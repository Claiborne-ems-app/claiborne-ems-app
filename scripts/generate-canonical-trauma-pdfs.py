"""Render controlled Claiborne PDFs directly from native structured content.

Requires Node 24, reportlab and pypdf. Run from any working directory:
  python3 scripts/generate-canonical-trauma-pdfs.py
All clinical prose comes from the native data modules, never a duplicate prose
copy. Page counts, catalogs and a parity manifest are regenerated together.
"""
import hashlib
import json
import os
import re
import argparse
from pathlib import Path
import subprocess
from xml.sax.saxutils import escape

from canonical_pdf_projection import project
from pypdf import PdfReader, PdfWriter
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
OUT = ROOT / 'output/pdf'
NAVY = colors.HexColor('#12384A')
TEAL = colors.HexColor('#007D86')
PALE = colors.HexColor('#EDF5F6')
INK = colors.HexColor('#172B38')
MUTED = colors.HexColor('#52646F')
LINE = colors.HexColor('#D7E2E6')
WIDTH = 520
BASE_URL = 'https://claiborne-ems-app.vercel.app'
APP_VERSION = json.loads((ROOT / 'package.json').read_text())['version']
FONT_DIR = Path(os.environ.get('CLAIBORNE_PDF_FONT_DIR', '/usr/share/fonts/truetype/dejavu'))
pdfmetrics.registerFont(TTFont('CCEMS', str(FONT_DIR / 'DejaVuSans.ttf')))
pdfmetrics.registerFont(TTFont('CCEMS-Bold', str(FONT_DIR / 'DejaVuSans-Bold.ttf')))
pdfmetrics.registerFontFamily('CCEMS', normal='CCEMS', bold='CCEMS-Bold')
STYLE = {
 'title': ParagraphStyle('title', fontName='CCEMS-Bold', fontSize=21, leading=25, textColor=NAVY, spaceAfter=8),
 'section': ParagraphStyle('section', fontName='CCEMS-Bold', fontSize=11.5, leading=15, textColor=TEAL, spaceBefore=9, spaceAfter=4, keepWithNext=True),
 'body': ParagraphStyle('body', fontName='CCEMS', fontSize=9.2, leading=12.2, textColor=INK, spaceAfter=3),
 'small': ParagraphStyle('small', fontName='CCEMS', fontSize=8, leading=11.2, textColor=MUTED, spaceAfter=3),
 'label': ParagraphStyle('label', fontName='CCEMS-Bold', fontSize=9, leading=12, textColor=NAVY, spaceAfter=3, keepWithNext=True),
 'bullet': ParagraphStyle('bullet', fontName='CCEMS', fontSize=9.2, leading=12.2, textColor=INK, leftIndent=10, firstLineIndent=-9, spaceAfter=3),
}


def clean(text):
    return str(text).replace('\u2011', '-').replace('\u2013', '-').replace('\u2014', ' - ').replace('\u00a0', ' ')


def p(text, style='body'):
    return Paragraph(escape(clean(text)), STYLE[style])


def bullets(story, items, small=False, keep=True):
    for item in items:
        paragraph=p(('- ' if not small else '') + item, 'small' if small else 'bullet')
        story.append(KeepTogether([paragraph]) if keep else paragraph)


def section(story, title, items, keep=True):
    if items:
        first=[p(title,'section'),p('- '+items[0],'bullet')]
        if keep:story.append(KeepTogether(first))
        else:story.extend(first)
        bullets(story, items[1:], keep=keep)


def render_protocol(item, output):
    proto = item['protocol']
    doc = SimpleDocTemplate(str(output), pagesize=letter, leftMargin=46, rightMargin=46,
        topMargin=62, bottomMargin=52, title=f"{proto['id'].upper()} | {proto['title']}",
        author='Claiborne County EMS', subject='Canonical SHA-256: '+item['canonicalSha256']+' | App package '+APP_VERSION,
        pageCompression=1, invariant=1)
    story = [p(proto['title'], 'title')]
    status = proto['reviewStatus']
    banner = Table([[p(f"{proto['id'].upper()}  |  {proto['category']}", 'label')]], colWidths=[WIDTH])
    banner.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),PALE),('BOX',(0,0),(-1,-1),0.6,LINE),
        ('LEFTPADDING',(0,0),(-1,-1),11),('RIGHTPADDING',(0,0),(-1,-1),11),
        ('TOPPADDING',(0,0),(-1,0),9),('BOTTOMPADDING',(0,-1),(-1,-1),7)]))
    story += [banner, Spacer(1,8)]
    if proto.get('flow'):
        story.append(p('Quick flow', 'section'))
        for i,node in enumerate(proto['flow'],1):
            label = f"{i:02d}  {node['title']}"
            levels = ' / '.join(node.get('levels', []))
            story.append(KeepTogether([p(label+'  ['+levels+']','label'), p(node['text'])]))
    section(story, 'Overview', proto['overview'])
    for module in proto.get('careModules',[]):
        for index,level in enumerate(module['levels']):
            intro=[p(module['title'],'section'),p(module['summary'])] if index==0 else []
            intro.append(p(level['level'],'label'))
            if level['actions']:intro.append(p('- '+level['actions'][0],'bullet'))
            story.append(KeepTogether(intro))
            bullets(story,level['actions'][1:])
    for key,title in [('indications','Indications'),('contraindications','Contraindications')]:
        section(story,title,proto[key])
    for group in proto['assessment']:
        group_story=[]
        section(group_story, 'Assessment | '+group['title'], group['items'], keep=not (proto['id']=='tb-09' and 'fluid rates' in group['title'].lower()))
        if proto['id']=='tb-09' and 'fluid rates' in group['title'].lower():
            story.append(KeepTogether(group_story))
        else:
            story.extend(group_story)
    section(story,'Treatment steps',proto['treatmentSteps'])
    if proto['medications']:
        for index,med in enumerate(proto['medications']):
            medication_story=([p('Medications','section')] if index==0 else [])+[p(med['name'],'label'),p(med['dose'])]
            bullets(medication_story,med.get('notes',[]),keep=False)
            story.append(KeepTogether(medication_story))
    section(story,'Warnings / precautions',proto['warnings'])
    section(story,'Clinical pearls',proto['clinicalPearls'])
    for group in proto['specialPopulations']:
        section(story,'Special populations | '+group['title'],group['items'])
    if proto.get('actionLinks'):
        story.append(p('Related pathways / contacts','section'))
        for link in proto['actionLinks']:
            href = link['href']
            target = BASE_URL+href if href.startswith('/') else href
            description=(' - '+escape(clean(link['description']))) if link.get('description') else ''
            story.append(KeepTogether([Paragraph(f'<link href="{escape(target)}" color="#007D86"><b>{escape(clean(link["label"]))}</b></link>{description}', STYLE['small'])]))
    story.append(p('Source and references','label'))
    story.append(p(' | '.join(proto['references']),'small'))
    story.append(p(f"Revision: {proto['revisionDate']} | Last verified: {proto['lastVerifiedDate']}",'small'))
    def frame(canvas,doc):
        canvas.saveState()
        canvas.setFillColor(NAVY); canvas.rect(0,letter[1]-39,letter[0],39,fill=1,stroke=0)
        canvas.setFillColor(colors.white); canvas.setFont('CCEMS-Bold',9.3)
        canvas.drawString(54,letter[1]-25,'CLAIBORNE COUNTY EMS')
        canvas.setFont('CCEMS',8); canvas.drawRightString(558,letter[1]-25,proto['id'].upper()+'  |  PROTOCOL')
        canvas.setStrokeColor(LINE); canvas.line(46,43,566,43)
        canvas.setFillColor(MUTED); canvas.setFont('CCEMS',7)
        canvas.drawString(46,30,f"Claiborne County EMS | App {APP_VERSION}")
        canvas.drawRightString(566,30,f"{proto['id'].upper()}  /  {doc.page}")
        canvas.restoreState()
    doc.build(story,onFirstPage=frame,onLaterPages=frame)


def write_json(path,value):
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps(value,indent=2,ensure_ascii=False)+'\n')


def shared_page_counts(records):
    path=ROOT/'data/canonical-pdf-pages.ts';current={}
    if path.exists():
        match=re.search(r'=\s*(\{.*\})\s*;',path.read_text(),re.S)
        if not match:raise ValueError('Cannot parse generated canonical PDF pages')
        current=json.loads(match.group(1))
    current.update({record['id']:record['pages'] for record in records})
    path.write_text('// Generated by canonical PDF generators. Do not edit manually.\nexport const canonicalPdfPages: Record<string, number> = '+json.dumps(current,indent=2)+';\n')
    return current


def rebuild_combined(group,records):
    required={f'tb-{n:02d}' for n in range(1,10)} if group=='trauma' else {r['id'] for r in records}
    if not required <= {r['id'] for r in records}:return None
    names={'trauma':'claiborne-tb01-tb09-review.pdf','universal':'claiborne-up01-up22-approved.pdf','all':'claiborne-all-canonical.pdf'}
    dest=OUT/names[group];writer=PdfWriter()
    for record in records:
        if record['id'] not in required:continue
        source=PUBLIC/record['pdfPath'].lstrip('/');reader=PdfReader(source)
        writer.append(reader,outline_item=reader.metadata.get('/Title',record['id'].upper()))
    writer.add_metadata({'/Title':'Claiborne County EMS Protocols','/Author':'Claiborne County EMS','/Subject':'App package '+APP_VERSION})
    with dest.open('wb') as f:writer.write(f)
    return {'path':str(dest.relative_to(ROOT)),'pages':len(writer.pages),'pdfSha256':hashlib.sha256(dest.read_bytes()).hexdigest(),'bytes':dest.stat().st_size}


def export_items(group):
    result=subprocess.run([os.environ.get('NODE','node'),'--import','./scripts/register-test-ts-resolver.mjs',f'scripts/export-canonical-{group}.mjs'],cwd=ROOT,text=True,capture_output=True,check=True)
    return json.loads(result.stdout)


def note(item):
    p=item['protocol']
    return {'id':p['id'],'canonicalSha256':item['canonicalSha256'],'reviewStatus':p['reviewStatus'],'revisionDate':p['revisionDate'],'reviewFlags':p['reviewFlags']}


def sync_family(group,records,items):
    path=PUBLIC/f'canonical-{group}-pdfs.json'
    if not path.exists():return
    existing=json.loads(path.read_text());updates={r['id']:r for r in records};changed=False
    for index,record in enumerate(existing['protocols']):
        if record['id'] in updates:
            existing['protocols'][index]=updates[record['id']];changed=True
    if not changed:return
    if {r['id'] for r in existing['protocols']} <= set(updates):existing['appVersion']=APP_VERSION
    existing['combined']=rebuild_combined(group,existing['protocols']);write_json(path,existing)
    notes_path=ROOT/f'reports/{group}-pdf-review-notes.json'
    if notes_path.exists():
        updated={i['protocol']['id']:note(i) for i in items}
        write_json(notes_path,[updated.get(r['id'],r) for r in json.loads(notes_path.read_text())])


def main(ids=None,group='trauma'):
    if group not in ('all','universal','trauma'):raise ValueError('Unknown family '+group)
    all_items=export_items(group)
    selected={key.lower() for key in ids} if ids else {i['protocol']['id'] for i in all_items}
    if selected-{i['protocol']['id'] for i in all_items}:raise ValueError('Unknown canonical protocol IDs')
    items=[i for i in all_items if i['protocol']['id'] in selected]
    # Validate every selected mapping before writing any PDF.
    rendered=[project(item) for item in items]
    OUT.mkdir(parents=True,exist_ok=True)
    records=[]
    for item,display in zip(items,rendered):
        p=item['protocol'];dest=PUBLIC/p['sourcePdf'].lstrip('/');dest.parent.mkdir(parents=True,exist_ok=True)
        render_protocol(display,dest);reader=PdfReader(dest)
        records.append({'id':p['id'],'pdfPath':p['sourcePdf'],'pages':len(reader.pages),'canonicalSha256':item['canonicalSha256'],'pdfSha256':hashlib.sha256(dest.read_bytes()).hexdigest(),'bytes':dest.stat().st_size})
        (OUT/dest.name).write_bytes(dest.read_bytes())
    path=PUBLIC/f'canonical-{group}-pdfs.json'
    previous=json.loads(path.read_text())['protocols'] if path.exists() else []
    order={i['protocol']['id']:n for n,i in enumerate(all_items)}
    manifest=sorted([r for r in previous if r['id'] not in selected and r['id'] in order]+records,key=lambda r:order[r['id']])
    pages=shared_page_counts(records);byid={i['protocol']['id']:i['protocol'] for i in all_items}
    catalog_path=ROOT/'src/data/claiborne-protocols.json';catalog=json.loads(catalog_path.read_text())
    for row in catalog:
        key=row['id'].lower()
        if key not in selected:continue
        p=byid[key]
        row.update(title=p['title'],pages=pages[key],pdfPath=p['sourcePdf'],status=p['reviewStatus'].lower(),year=p.get('sourceYear',2026),source='Claiborne County EMS Clinical Protocols')
    write_json(catalog_path,catalog)
    tspath=ROOT/'src/data/claiborneProtocols.ts';text=tspath.read_text()
    pattern=r'export const claiborneProtocols: ClaiborneProtocol\[\] = \[.*?\n\](?: as ClaiborneProtocol\[\])?;'
    text,count=re.subn(pattern,lambda _: 'export const claiborneProtocols: ClaiborneProtocol[] = '+json.dumps(catalog,indent=2,ensure_ascii=False)+';',text,flags=re.S)
    if count!=1:raise ValueError('Cannot update catalog array safely')
    tspath.write_text(text)
    write_json(ROOT/f'reports/{group}-pdf-review-notes.json',[note(i) for i in all_items])
    write_json(path,{'generator':f'scripts/generate-canonical-{group}-pdfs.py','appVersion':APP_VERSION,'protocols':manifest,'combined':rebuild_combined(group,manifest)})
    for other in ('trauma','universal','all'):
        if other!=group:sync_family(other,records,items)
    # All-family generation initializes subfamily manifests if absent.
    if group=='all':
        for other in ('trauma','universal'):
            other_items=export_items(other);wanted=[i['protocol']['id'] for i in other_items];lookup={r['id']:r for r in manifest}
            if not set(wanted)<=set(lookup):continue
            subset=[lookup[key] for key in wanted]
            write_json(PUBLIC/f'canonical-{other}-pdfs.json',{'generator':f'scripts/generate-canonical-{other}-pdfs.py','appVersion':APP_VERSION,'protocols':subset,'combined':rebuild_combined(other,subset)})
            write_json(ROOT/f'reports/{other}-pdf-review-notes.json',[note(i) for i in other_items])
    print(json.dumps(manifest,indent=2))


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--only',nargs='+');main(parser.parse_args().only)
