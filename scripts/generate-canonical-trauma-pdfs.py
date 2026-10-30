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
    governance = ('Clinical release pending. Verify current approved protocols and standing orders.' if status != 'Approved'
        else 'Approved native content. Beta application; agency release requirements still apply.')
    banner = Table([[p(f"{proto['id'].upper()}  |  {proto['category']}  |  {status}", 'label')],
                    [p(governance, 'small')]], colWidths=[WIDTH])
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
        story.append(p('App links open the deployed version. Confirm its package version matches this PDF before use.','small'))
        for link in proto['actionLinks']:
            href = link['href']
            target = BASE_URL+href if href.startswith('/') else href
            description=(' - '+escape(clean(link['description']))) if link.get('description') else ''
            story.append(KeepTogether([Paragraph(f'<link href="{escape(target)}" color="#007D86"><b>{escape(clean(link["label"]))}</b></link>{description}', STYLE['small'])]))
    story.append(p('Source and references','label'))
    story.append(p(' | '.join(proto['references']),'small'))
    story.append(p(f"Revision: {proto['revisionDate']} | Last verified: {proto['lastVerifiedDate']} | Content status: {status}",'small'))
    def frame(canvas,doc):
        canvas.saveState()
        canvas.setFillColor(NAVY); canvas.rect(0,letter[1]-39,letter[0],39,fill=1,stroke=0)
        canvas.setFillColor(colors.white); canvas.setFont('CCEMS-Bold',9.3)
        canvas.drawString(54,letter[1]-25,'CLAIBORNE COUNTY EMS')
        canvas.setFont('CCEMS',8); canvas.drawRightString(558,letter[1]-25,proto['id'].upper()+'  |  CONTROLLED PROTOCOL')
        canvas.setStrokeColor(LINE); canvas.line(46,43,566,43)
        canvas.setFillColor(MUTED); canvas.setFont('CCEMS',7)
        canvas.drawString(46,30,f"{status} | App {APP_VERSION} | Beta reference - verify current standing orders")
        canvas.drawRightString(566,30,f"{proto['id'].upper()}  /  {doc.page}")
        canvas.restoreState()
    doc.build(story,onFirstPage=frame,onLaterPages=frame)


def main(ids=None):
    result = subprocess.run([os.environ.get('NODE','node'),'--import','./scripts/register-test-ts-resolver.mjs','scripts/export-canonical-trauma.mjs'],cwd=ROOT,text=True,capture_output=True,check=True)
    all_items=json.loads(result.stdout)
    if ids:
        ids={key.lower() for key in ids}
        unknown=ids-{item['protocol']['id'] for item in all_items}
        if unknown:raise ValueError('Unknown canonical protocol IDs: '+', '.join(sorted(unknown)))
    items=[item for item in all_items if not ids or item['protocol']['id'] in ids]
    OUT.mkdir(parents=True,exist_ok=True)
    manifest_path=ROOT/'public/canonical-trauma-pdfs.json'
    previous=json.loads(manifest_path.read_text())['protocols'] if manifest_path.exists() else []
    manifest=[]
    for item in items:
        proto=item['protocol'];dest=PUBLIC/proto['sourcePdf'].lstrip('/')
        dest.parent.mkdir(parents=True,exist_ok=True)
        render_protocol(project(item),dest)
        reader=PdfReader(dest)
        manifest.append({'id':proto['id'],'pdfPath':proto['sourcePdf'],'pages':len(reader.pages),
            'canonicalSha256':item['canonicalSha256'],'pdfSha256':hashlib.sha256(dest.read_bytes()).hexdigest(),'bytes':dest.stat().st_size})
        (OUT/dest.name).write_bytes(dest.read_bytes())
    selected_ids={m['id'] for m in manifest}
    manifest=[m for m in previous if m['id'] not in selected_ids]+manifest
    order={item['protocol']['id']:i for i,item in enumerate(all_items)}
    manifest.sort(key=lambda m:order[m['id']])
    pages={m['id']:m['pages'] for m in manifest}
    (ROOT/'data/canonical-pdf-pages.ts').write_text('// Generated by scripts/generate-canonical-trauma-pdfs.py. Do not edit manually.\nexport const canonicalPdfPages: Record<string, number> = '+json.dumps(pages,indent=2)+';\n')
    catalogpath=ROOT/'src/data/claiborne-protocols.json';catalog=json.loads(catalogpath.read_text())
    byid={i['protocol']['id']:i['protocol'] for i in all_items}
    for entry in catalog:
        key=entry['id'].lower()
        if key not in pages:continue
        entry['pages']=pages[key]
        entry['status']=byid[key]['reviewStatus'].lower()
        if key.startswith('tb-0'):
            entry.update(title=byid[key]['title'],year=2026,source='Claiborne County EMS Clinical Protocols',status='reviewed')
    catalogpath.write_text(json.dumps(catalog,indent=2,ensure_ascii=False)+'\n')
    tspath=ROOT/'src/data/claiborneProtocols.ts';text=tspath.read_text()
    for entry in catalog:
        if entry['id'].lower() not in pages:continue
        pattern=r'  \{\n\s*"id": "'+re.escape(entry['id'])+r'",.*?\n  \}'
        replacement='  '+json.dumps(entry,indent=2,ensure_ascii=False).replace('\n','\n  ')
        text,count=re.subn(pattern,lambda _:replacement,text,count=1,flags=re.S)
        if count != 1:raise ValueError('Catalog TypeScript entry missing: '+entry['id'])
    tspath.write_text(text)
    (ROOT/'reports/trauma-pdf-review-notes.json').write_text(json.dumps([{ 'id':item['protocol']['id'],'canonicalSha256':item['canonicalSha256'],'reviewStatus':item['protocol']['reviewStatus'],'revisionDate':item['protocol']['revisionDate'],'reviewFlags':item['protocol']['reviewFlags']} for item in all_items],indent=2,ensure_ascii=False)+'\n')
    (ROOT/'public/canonical-trauma-pdfs.json').write_text(json.dumps({'generator':'scripts/generate-canonical-trauma-pdfs.py','appVersion':APP_VERSION,'protocols':manifest},indent=2)+'\n')
    required={f'tb-{n:02d}' for n in range(1,10)}
    if required <= set(pages):
        combined=PdfWriter()
        for entry in manifest:
            if entry['id'] in required:combined.append(PUBLIC/entry['pdfPath'].lstrip('/'),outline_item=entry['id'].upper()+' | '+byid[entry['id']]['title'])
        with (OUT/'claiborne-tb01-tb09-review.pdf').open('wb') as f:combined.write(f)
    print(json.dumps(manifest,indent=2))


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--only',nargs='+',help='Regenerate selected canonical protocol IDs')
    main(parser.parse_args().only)
