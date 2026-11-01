#!/usr/bin/env python3
"""Build a faithful, printable vehicle manual from the app's native exports.
Native clinical prose is rendered verbatim except audited exact-source duplicate consolidation.
Pinned overlays never introduce new clinical instructions.
"""
import argparse, collections, datetime, hashlib, html, json, os, re, unicodedata
from pathlib import Path
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
    PageBreak, NextPageTemplate, Flowable, KeepTogether, CondPageBreak)
from reportlab.lib.pagesizes import letter

ROOT=Path(__file__).resolve().parent
PAPER_W,PAPER_H=letter
MARGIN=36; GUTTER=18; BODY_TOP=733; BODY_BOTTOM=42
COL=(PAPER_W-2*MARGIN-GUTTER)/2
FONTDIR=Path(os.environ.get('VEHICLE_MANUAL_FONT_DIR',str(ROOT/'fonts')))
for name,file in [('Body','LiberationSans-Regular.ttf'),('Bold','LiberationSans-Bold.ttf'),('Italic','LiberationSans-Italic.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(FONTDIR/file)))
pdfmetrics.registerFontFamily('Body',normal='Body',bold='Bold',italic='Italic',boldItalic='Bold')
ST={
 'module':ParagraphStyle('module',fontName='Body',fontSize=11,leading=12.5,spaceAfter=2.6,allowWidows=0,allowOrphans=0,keepWithNext=True),
 'body':ParagraphStyle('body',fontName='Body',fontSize=11,leading=12.5,spaceAfter=2.6,allowWidows=0,allowOrphans=0),
 'bullet':ParagraphStyle('bullet',fontName='Body',fontSize=11,leading=12.5,spaceAfter=2.6,leftIndent=8,firstLineIndent=-8,allowWidows=0,allowOrphans=0),
 'step':ParagraphStyle('step',fontName='Body',fontSize=11,leading=12.5,spaceAfter=2.6,leftIndent=15,firstLineIndent=-15,allowWidows=0,allowOrphans=0),
 'h1':ParagraphStyle('h1',fontName='Bold',fontSize=16,leading=18.7,spaceAfter=8,keepWithNext=True),
 'h2':ParagraphStyle('h2',fontName='Bold',fontSize=11.6,leading=14,spaceBefore=6,spaceAfter=3,keepWithNext=True),
 'h3':ParagraphStyle('h3',fontName='Bold',fontSize=11,leading=12.5,spaceBefore=3,spaceAfter=2,keepWithNext=True),
 'meta':ParagraphStyle('meta',fontName='Body',fontSize=8.6,leading=10.7,spaceAfter=4),
 'reference':ParagraphStyle('reference',fontName='Body',fontSize=9,leading=11.2,spaceAfter=3.8,allowWidows=0,allowOrphans=0),
 'flow':ParagraphStyle('flow',fontName='Body',fontSize=11,leading=13.2),
 'flowlabel':ParagraphStyle('flowlabel',fontName='Bold',fontSize=10,leading=12,spaceAfter=2),
 'index':ParagraphStyle('index',fontName='Body',fontSize=10.7,leading=13.2,spaceAfter=5),
 'cover':ParagraphStyle('cover',fontName='Body',fontSize=12,leading=16,spaceAfter=11),
 'title':ParagraphStyle('title',fontName='Bold',fontSize=26,leading=31,spaceAfter=15),
}

# Review notes are suppressed only with a complete exact-source clinical-preservation map.

def normalize(s):
    return str(s).translate(str.maketrans({'–':'-','—':'-','‑':'-','−':'-','’':"'",'‘':"'",'“':'"','”':'"','\u00a0':' '}))

def esc(s):return html.escape(normalize(s),quote=False)

def leaves(v,prefix=''):
    if isinstance(v,dict):
        for k,x in v.items():yield from leaves(x,f'{prefix}.{k}' if prefix else k)
    elif isinstance(v,list):
        for i,x in enumerate(v):yield from leaves(x,f'{prefix}[{i}]')
    else:yield prefix,v

class Tracker:
    def __init__(self):self.entries={};self.layout=[];self.protocol_pages={};self.index_pages={};self.omissions=[];self.page_protocols={}
    def record(self,path,value,disposition='printed',reason=None):
        rec={'path':path,'value':value,'disposition':disposition,'pages':[]}
        if path in DEDUP:
            rec.update({'disposition':'clinically-deduplicated' if DEDUP[path]['targets'] else 'excluded-nonoperative','reason':DEDUP[path]['reason'],'targets':DEDUP[path]['targets']})
        if path in FLAGS:
            flag=FLAGS[path]
            rec.update({'disposition':'clinical-note-accounted-for' if flag['targets'] else 'excluded-governance','reason':flag['reason'],'targets':flag['targets']})
        if reason:rec['reason']=reason
        self.entries[path]=rec
    def page(self,paths,n):
        for p in paths:
            if p in self.entries and n not in self.entries[p]['pages']:self.entries[p]['pages'].append(n)
            if p.startswith('protocols.'):
                pid=p.split('.')[1]
                self.page_protocols.setdefault(n,[])
                if pid not in self.page_protocols[n]:self.page_protocols[n].append(pid)
                self.protocol_pages.setdefault(pid,[])
                if n not in self.protocol_pages[pid]:self.protocol_pages[pid].append(n)

TRACK=None; PAGE_MAP={}; IDS=set(); CATEGORY_TITLES={}; DEDUP={}; FIELD_MAP={}; TARGET_FIELDS=set(); FLAGS={}; CURR=''; REV='November 1, 2026'

def linked(s):
    s=esc(s)
    # Only already-existing protocol identifiers receive links. No clinical text changed.
    return re.sub(r'\b(?:UP|AC|AM|AO|AR|PC|PM|TB|TE)-\d{2}\b',lambda m:f'<link href="#{m[0].lower()}" color="#000000"><u>{m[0]}</u></link>' if m[0].lower() in IDS else m[0],s)

class TrackedParagraph(Paragraph):
    def __init__(self,text,style,paths=(),**kw):
        self.paths=list(paths);super().__init__(text,style,**kw)
    def draw(self):
        TRACK.page(self.paths,self.canv.getPageNumber())
        seen=getattr(self.canv,'_field_marks',set())
        for path in self.paths:
            if path in TARGET_FIELDS and path not in seen:
                self.canv.bookmarkHorizontal('field-'+hashlib.sha1(path.encode()).hexdigest(),0,self.height);seen.add(path)
        self.canv._field_marks=seen
        super().draw()
    def split(self,w,h):
        pieces=super().split(w,h)
        for p in pieces:p.paths=self.paths
        return pieces

class Mark(Flowable):
    def __init__(self,key,title,level=0,category=None):
        super().__init__();self.key=key;self.title=title;self.level=level;self.category=category;self.width=0;self.height=0
    def draw(self):
        self.canv.bookmarkPage(self.key)
        self.canv.addOutlineEntry(self.title,self.key,self.level,closed=self.level==0)
        TRACK.index_pages[self.key]=self.canv.getPageNumber()
        self.canv._doctemplate.current_title=self.title
        self.canv._doctemplate.current_key=self.key
        if self.key in IDS: TRACK.protocol_pages.setdefault(self.key,[]).append(self.canv.getPageNumber())

class FlowDiagram(Flowable):
    def __init__(self,nodes,path,start=0,continued=False,total=None):
        super().__init__();self.nodes=nodes;self.path=path;self.start=start;self.continued=continued;self.total=total if total is not None else len(nodes);self.parts=[]
    def wrap(self,w,h):
        self.width=w;self.parts=[];height=0
        if self.continued:height+=20
        for i,n in enumerate(self.nodes):
            ix=self.start+i
            lvl=' / '.join(n.get('levels',[])) or 'Use the provider-specific orders below'
            label=Paragraph(f'<b>{ix+1}. {linked(n["title"])}</b><br/>{esc(lvl)}',ST['flowlabel'])
            text=Paragraph(linked(n['text']),ST['flow'])
            _,lh=label.wrap(w-22,9999);_,th=text.wrap(w-22,9999)
            bh=lh+th+16
            self.parts.append((n,label,text,lh,th,bh));height+=bh+16
        if self.start+len(self.nodes)<self.total:height+=18
        self.height=height;return self.width,self.height
    def split(self,w,h):
        self.wrap(w,h)
        y=20 if self.continued else 0;count=0
        for *_,bh in self.parts:
            if y+bh+16+18>h:break
            y+=bh+16;count+=1
        if count==0:return []
        if count==len(self.nodes):return [self]
        return [FlowDiagram(self.nodes[:count],self.path,self.start,self.continued,self.total),FlowDiagram(self.nodes[count:],self.path,self.start+count,True,self.total)]
    def draw(self):
        c=self.canv;y=self.height
        if self.continued:
            c.setFont('Bold',10);c.drawString(0,y-11,f'Quick flow continued at step {self.start+1}');y-=20
        for i,(n,label,text,lh,th,bh) in enumerate(self.parts):
            ix=self.start+i;bot=y-bh
            c.setStrokeColor(colors.black);c.setLineWidth(.65)
            if n.get('tone')=='decision':
                # Beveled decision box preserves room for the exact branch wording.
                p=c.beginPath();p.moveTo(9,bot);p.lineTo(self.width-9,bot);p.lineTo(self.width,bot+bh/2);p.lineTo(self.width-9,y);p.lineTo(9,y);p.lineTo(0,bot+bh/2);p.close();c.drawPath(p,stroke=1,fill=0)
            elif n.get('tone') in ['start','transport']:
                c.roundRect(0,bot,self.width,bh,8,stroke=1,fill=0)
            else:c.rect(0,bot,self.width,bh,stroke=1,fill=0)
            label.drawOn(c,11,y-8-lh);text.drawOn(c,11,y-8-lh-th)
            TRACK.page([f'{self.path}[{ix}].title',f'{self.path}[{ix}].text',f'{self.path}[{ix}].tone',*[f'{self.path}[{ix}].levels[{j}]' for j in range(len(n.get('levels',[])))]],c.getPageNumber())
            TRACK.layout.append({'type':'flow-node','page':c.getPageNumber(),'key':f'{self.path}[{ix}]','width':self.width,'height':bh,'text_height':lh+th,'padding':16})
            y=bot-16
            if i<len(self.parts)-1:
                mid=self.width/2;c.line(mid,bot-2,mid,bot-12)
                p=c.beginPath();p.moveTo(mid-3,bot-9);p.lineTo(mid,bot-13);p.lineTo(mid+3,bot-9);c.drawPath(p,stroke=1,fill=0)
        if self.start+len(self.nodes)<self.total:
            c.setFont('Bold',10);c.drawString(0,2,f'Continue at step {self.start+len(self.nodes)+1} in the next column/page')

class ManualDoc(BaseDocTemplate):
    def __init__(self,*a,**kw):
        super().__init__(*a,pagesize=letter,leftMargin=MARGIN,rightMargin=MARGIN,topMargin=59,bottomMargin=BODY_BOTTOM,**kw)
        self.current_title='Claiborne EMS Protocol Manual';self.current_key='cover'
        full=Frame(MARGIN,BODY_BOTTOM,PAPER_W-2*MARGIN,BODY_TOP-BODY_BOTTOM,id='full',leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)
        cols=[Frame(MARGIN+i*(COL+GUTTER),BODY_BOTTOM,COL,BODY_TOP-BODY_BOTTOM,id=f'col{i}',leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0) for i in range(2)]
        self.addPageTemplates([PageTemplate(id='cover',frames=[full],onPageEnd=self.footer),PageTemplate(id='two',frames=cols,onPageEnd=self.footer)])
    def footer(self,c,d):
        c.saveState();c.setFillColor(colors.black)
        c.setFont('Bold',8.7)
        ps=TRACK.page_protocols.get(d.page,[])
        title=self.current_title if not ps else (ps[0].upper() if len(ps)==1 else ps[0].upper()+' through '+ps[-1].upper())+' | '+CATEGORY_TITLES.get(ps[0].split('-')[0],'Protocols')
        while pdfmetrics.stringWidth(title,'Bold',8.7)>480:title=title[:-2]
        c.drawString(MARGIN,756,title)
        c.setFont('Body',8.1)
        c.drawString(MARGIN,741,'Claiborne EMS | '+REV)
        c.drawString(MARGIN,27,'Claiborne EMS Protocol Manual')
        c.drawRightString(PAPER_W-MARGIN,27,f'{d.page}')
        c.linkRect('', 'contents',(PAPER_W-MARGIN-100,740,PAPER_W-MARGIN,753),relative=0,thickness=0)
        c.setFont('Body',8.1);c.drawRightString(PAPER_W-MARGIN,741,'Contents')
        c.restoreState()


def para(value,path=None,style='body',prefix='',raw=False):
    if path:TRACK.record(path,value)
    if path in DEDUP:
        rec=DEDUP[path]
        if rec.get('displayText'):
            keys=list(dict.fromkeys(t['path'].split('.')[1] for t in rec['targets'] if t['path'].startswith('protocols.')))
            refs=[]
            for k in keys:
                ts=[t['path'] for t in rec['targets'] if t['path'].startswith('protocols.'+k+'.')]
                pages=sorted(set(n for t in ts for n in FIELD_MAP.get(t,[])))
                label=('pp. '+str(min(pages))+'-'+str(max(pages))) if pages and len(pages)>1 else ('p. '+str(pages[0] if pages else PAGE_MAP.get(k,888)))
                anchor='field-'+hashlib.sha1(ts[0].encode()).hexdigest()
                refs.append(f'<link href="#{anchor}" color="#000000"><u>{k.upper()}</u></link> ({label})')
            refs=', '.join(refs)
            return TrackedParagraph(prefix+esc(rec['displayText'])+' '+refs+'.',ST[style],[path])
        return Spacer(1,0)
    return TrackedParagraph(prefix+(value if raw else linked(value)),ST[style],[path] if path else [])
def heading(text,style='h2'):return Paragraph(esc(text),ST[style])
def visible(path):return path not in DEDUP or bool(DEDUP[path].get('displayText'))
def items(story,values,path,style='bullet',numbered=False):
    number=0
    for i,v in enumerate(values):
        if visible(f'{path}[{i}]'):number+=1
        story.append(para(v,f'{path}[{i}]','step' if numbered else style,prefix=f'{number}. ' if numbered else ('• ' if style=='bullet' else '')))
def group(story,title,values,path,**kw):
    if values:
        if any(f'{path}[{i}]' not in DEDUP or DEDUP[f'{path}[{i}]'].get('displayText') for i in range(len(values))):story.append(heading(title))
        items(story,values,path,**kw)

def href_key(href):
    if href.startswith('/protocols/'):
        k=href.strip('/').split('/')[-1];return k if k in IDS else None
    if href=='/medications':return 'formulary'
    if href.startswith('/medications#'):return 'med-'+href.split('#')[1]
    return None

def related(story,values,path,object_single=False):
    for i,v in enumerate(values):
        base=path if object_single else f'{path}[{i}]';key=href_key(v['href'])
        for k,x in v.items():TRACK.record(f'{base}.{k}',x,'printed' if k in ['label','description'] else 'navigation',reason=None if k in ['label','description'] else 'Preserved as PDF internal link or displayed external/call target')
        if key:
            page=PAGE_MAP.get(key,888);txt=f'<link href="#{key}" color="#000000"><u>{esc(v["label"])}</u></link> (p. {page})'
        else:txt=f'{linked(v["label"])} - {esc(v["href"])}'
        if v.get('description'):txt+=': '+linked(v['description'])
        story.append(TrackedParagraph('• '+txt,ST['bullet'],[f'{base}.{k}' for k in v]))

def render_protocol(story,p,catalog):
    pid=p['id'];base=f'protocols.{pid}'
    story.extend([CondPageBreak(240),Spacer(1,10),Mark(pid,f'{pid.upper()} {p["title"]}',1)])
    TRACK.record(base+'.id',pid,'navigation','Protocol code in heading/index/bookmark')
    TRACK.record(base+'.categoryId',p['categoryId'],'navigation','Section heading and bookmark')
    TRACK.record(base+'.category',p['category'],'navigation','Section heading and contents')
    story.append(para(p['title'],base+'.title','h1',prefix=pid.upper()+'<br/>'))
    TRACK.record(base+'.revisionDate',p['revisionDate'])
    for k in ['lastVerifiedDate','reviewStatus']:TRACK.record(base+'.'+k,p[k],'excluded-governance','Internal review metadata retained in the audit record, not the crew-facing manual.')
    story.append(TrackedParagraph(esc('Revised '+p['revisionDate']),ST['meta'],[base+'.revisionDate']))
    if pid=='up-19':story.append(heading('Retired entry - use UP-18'))
    for i,v in enumerate(p['reviewFlags']):TRACK.record(f'{base}.reviewFlags[{i}]',v)
    group(story,'Overview',p['overview'],base+'.overview',style='body')
    if p.get('flow'):
        flow_heading=heading('Quick flow')
        flow_intro=para('Apply this pathway together with the full provider-specific instructions and clinical precautions below.',style='meta')
        diagram=FlowDiagram(p['flow'],base+'.flow')
        diagram.wrap(COL,9999)
        # Reserve only the first complete node, not the entire multi-column diagram.
        # split() also reserves the node gap (16) and continuation label (18).
        start_height=sum(f.wrap(COL,9999)[1]+f.getSpaceBefore()+f.getSpaceAfter() for f in [flow_heading,flow_intro])+diagram.parts[0][5]+16+18
        story.extend([CondPageBreak(start_height),flow_heading,flow_intro])
        for path,v in leaves(p['flow'],base+'.flow'):
            TRACK.record(path,v,'graphic-style' if path.endswith('.tone') else 'printed','Node shape reflects the supplied pathway; words and provider labels remain explicit' if path.endswith('.tone') else None)
        story.append(diagram)
    group(story,'Indications',p['indications'],base+'.indications')
    group(story,'Contraindications',p['contraindications'],base+'.contraindications')
    if p['assessment']:
        if any(visible(f'{base}.assessment[{i}].items[{j}]') for i,g in enumerate(p['assessment']) for j in range(len(g['items']))):story.append(heading('Assessment'))
        for i,g in enumerate(p['assessment']):
            gp=f'{base}.assessment[{i}]'
            if any(visible(f'{gp}.items[{j}]') for j in range(len(g['items']))):story.append(para(g['title'],gp+'.title','h3'))
            else:TRACK.record(gp+'.title',g['title'],'structural-heading','Grouping heading omitted because all its instructions are consolidated into retained source-mapped instructions; no empty heading is printed.')
            items(story,g['items'],gp+'.items')
    group(story,'Treatment',p['treatmentSteps'],base+'.treatmentSteps',numbered=True)
    if p['medications']:
        story.append(heading('Medication orders'))
        for i,m in enumerate(p['medications']):
            mb=f'{base}.medications[{i}]'
            story.append(para(m['name'],mb+'.name','h3'));story.append(para(m['dose'],mb+'.dose'))
            items(story,m.get('notes',[]),mb+'.notes')
    if p.get('careModules'):
        story.append(heading('Provider-level care'))
        for i,m in enumerate(p['careModules']):
            mb=f'{base}.careModules[{i}]'
            TRACK.record(mb+'.title',m['title']);TRACK.record(mb+'.summary',m['summary'])
            story.append(TrackedParagraph('<b>'+linked(m['title'])+'</b> '+(linked(m['summary']) if mb+'.summary' not in DEDUP else ''),ST['module'],[mb+'.title',mb+'.summary']))
            for j,l in enumerate(m['levels']):
                lb=f'{mb}.levels[{j}]';TRACK.record(lb+'.level',l['level'])
                first_action=True
                for k,action in enumerate(l['actions']):
                    ab=f'{lb}.actions[{k}]';TRACK.record(ab,action)
                    if ab in DEDUP:
                        story.append(para(action,ab));continue
                    prefix='<b>'+esc(l['level'])+':</b> ' if first_action else '• '
                    story.append(TrackedParagraph(prefix+linked(action),ST['body'],[lb+'.level',ab] if first_action else [ab]));first_action=False
                if first_action:story.append(TrackedParagraph('<b>'+esc(l['level'])+':</b> See the provider-labeled medication orders and pathway above.',ST['body'],[lb+'.level']))
    group(story,'Warnings',p['warnings'],base+'.warnings')
    group(story,'Clinical pearls',p['clinicalPearls'],base+'.clinicalPearls')
    if p['specialPopulations']:
        if any(visible(f'{base}.specialPopulations[{i}].items[{j}]') for i,g in enumerate(p['specialPopulations']) for j in range(len(g['items']))):story.append(heading('Special populations'))
        for i,g in enumerate(p['specialPopulations']):
            gb=f'{base}.specialPopulations[{i}]'
            if any(visible(f'{gb}.items[{j}]') for j in range(len(g['items']))):story.append(para(g['title'],gb+'.title','h3'))
            else:TRACK.record(gb+'.title',g['title'],'structural-heading','Grouping heading omitted because all its instructions are consolidated into retained source-mapped instructions; no empty heading is printed.')
            items(story,g['items'],gb+'.items')
    if p.get('actionLinks'):
        story.append(heading('Related pathways'));related(story,p['actionLinks'],base+'.actionLinks')
    for i,r in enumerate(p['references']):TRACK.record(f'{base}.references[{i}]',r,'source-provenance','Bibliographic reference retained in companion source/coverage map rather than repeated in the vehicle print copy; no operative medication or clinical instruction occurs in this citation field.')
    TRACK.record(base+'.sourcePdf',p['sourcePdf'],'source-provenance','Controlled source PDF path retained in the coverage map; the printed clinical reference is generated from the current protocol export, not the retired legacy PDF.')
    for path,v in leaves(p['sourcePages'],base+'.sourcePages'):TRACK.record(path,v,'source-provenance','Original source pagination is not this compact manual pagination. Retained in coverage map.')


def render_medications(story,catalog):
    story.extend([PageBreak(),Mark('formulary','Medication reference',0),heading('Medication reference','h1')])
    story.append(para('Use the indication-specific protocol and provider level. This reference does not grant additional scope or override Medical Control requirements, contraindications, age limits, or product-specific restrictions.'))
    for k,v in catalog['medicationSource'].items():
        if k=='reviewed':TRACK.record('medicationSource.'+k,v,'excluded-governance','Internal review history retained in the audit record, not the medication reference.')
        else:story.append(para(v,'medicationSource.'+k,'reference'))
    for m in catalog['medications']:
        base='medications.'+m['id'];key='med-'+m['id']
        story.extend([CondPageBreak(100),Mark(key,m['name'],1),para(m['name'],base+'.name','h2')])
        TRACK.record(base+'.id',m['id'],'navigation','Medication bookmark and lookup index')
        for i,v in enumerate(m['tradeNames']):story.append(para(v,f'{base}.tradeNames[{i}]','meta',prefix='Trade name: '))
        group(story,'Uses',m['uses'],base+'.uses')
        for i,dose in enumerate(m['doses']):
            db=f'{base}.doses[{i}]'
            story.append(para(dose['level'],db+'.level','h3'))
            story.append(para(dose['indication'],db+'.indication',prefix='<b>Indication:</b> '))
            story.append(para(dose['adult'],db+'.adult',prefix='<b>Adult:</b> '))
            story.append(para(dose['pediatric'],db+'.pediatric',prefix='<b>Pediatric:</b> '))
            if 'conditionalAemt' in dose:
                TRACK.record(db+'.conditionalAemt',dose['conditionalAemt'])
                txt='Conditional AEMT access remains disabled until separately verified by the agency.' if dose['conditionalAemt'] else 'No conditional AEMT flag applies to this row.'
                story.append(TrackedParagraph(esc(txt),ST['body'],[db+'.conditionalAemt']))
            if dose.get('releaseNote'):story.append(para(dose['releaseNote'],db+'.releaseNote',prefix='<b>Clinical restriction:</b> '))
            if dose.get('protocolLink'):related(story,[dose['protocolLink']],db+'.protocolLink',object_single=True)
        group(story,'Cautions',m['cautions'],base+'.cautions')
        if m.get('protocolLinks'):
            story.append(heading('Governing pathways','h3'));related(story,m['protocolLinks'],base+'.protocolLinks')
        if 'isFormularyItem' in m:
            TRACK.record(base+'.isFormularyItem',m['isFormularyItem'])
            story.append(TrackedParagraph('Stocked formulary item.' if m['isFormularyItem'] else 'Protocol-specific preparation/reference; not an additional stocked formulary item.',ST['meta'],[base+'.isFormularyItem']))


def make_story(protocols,catalog):
    story=[Mark('cover','Claiborne EMS Protocol Manual',0),Spacer(1,30),Paragraph('Claiborne EMS<br/>Protocol Manual',ST['title'])]
    story.append(Paragraph('Vehicle and app reference<br/>'+esc(REV),ST['cover']))
    for text in [
      'Protocols for universal patient care, adult cardiac and medical emergencies, obstetrics, airway and respiratory care, pediatric cardiac and medical emergencies, trauma and burns, and toxicology and environmental emergencies. Includes the medication reference and the retired UP-19 redirect to UP-18.',
      'Use each quick-flow diagram together with the assessment, treatment, medication orders, provider-level care, warnings and special-population instructions. Conditional instructions appear within the flow boxes. A flow box or medication name alone is not a complete order.',
      'Provider labels are explicit and do not depend on color. Follow the stated Medical Control requirements, provider-scope restrictions and product-specific instructions. When directed to another protocol, use its printed page reference or tap the underlined link.',
      'Use the contents or PDF bookmarks to locate a protocol or medication. Printed page numbers match PDF page numbers.',
      'Print on US Letter at actual size, duplex with long-edge binding. The manual uses high-contrast text, vector flow diagrams and searchable text.'
    ]:story.append(Paragraph(esc(text),ST['cover']))
    story.extend([NextPageTemplate('two'),PageBreak(),Mark('contents','Contents',0),heading('Contents','h1')])
    story.append(para('Tap any entry or use the PDF bookmarks. Printed page numbers match PDF page numbers.',style='reference'))
    byid={p['id']:p for p in protocols}
    order=['up','ac','am','ao','ar','pc','pm','tb','te']
    categories=sorted(catalog['categories'],key=lambda c:order.index(c['id']))
    for c in categories:
        key='section-'+c['id'];page=PAGE_MAP.get(key,888)
        story.append(heading(c['title'],'h2'))
        for cp in sorted(c['protocols'],key=lambda x:int(x['id'].split('-')[-1])):
            p=byid[cp['id']];pid=p['id'];page=PAGE_MAP.get(pid,888)
            story.append(Paragraph(f'<link href="#{pid}" color="#000000"><b>{pid.upper()}</b> {esc(p["title"])}</link> <b>{page}</b>',ST['index']))
    story.append(heading('Medication reference','h2'))
    for m in catalog['medications']:
        key='med-'+m['id'];page=PAGE_MAP.get(key,888)
        story.append(Paragraph(f'<link href="#{key}" color="#000000">{esc(m["name"])}</link> <b>{page}</b>',ST['index']))
    first=True
    for c in categories:
        # Section bookmark attaches to the first protocol's page, not an extra divider.
        for j,cp in enumerate(sorted(c['protocols'],key=lambda x:int(x['id'].split('-')[-1]))):
            p=byid[cp['id']]
            if j==0:story.extend([PageBreak(),Mark('section-'+c['id'],c['title'],0)])
            render_protocol(story,p,catalog)
    render_medications(story,catalog)
    return story


def main():
    global TRACK,PAGE_MAP,IDS,CATEGORY_TITLES,DEDUP,FIELD_MAP,TARGET_FIELDS,FLAGS,REV
    ap=argparse.ArgumentParser();ap.add_argument('--protocols',default='protocols-prototype.json');ap.add_argument('--catalog',default='catalog-prototype.json');ap.add_argument('--out',default='output/pdf/claiborne-ems-compact-vehicle-manual.pdf');ap.add_argument('--passes',type=int,default=5);ap.add_argument('--dedup',action='store_true');ap.add_argument('--review-flag-map',required=True);ap.add_argument('--edition-date',default='2026-11-01')
    args=ap.parse_args();pfile=ROOT/args.protocols;cfile=ROOT/args.catalog
    REV=datetime.date.fromisoformat(args.edition_date).strftime('%B %d, %Y').replace(' 0',' ')
    protocols=json.loads(pfile.read_text());catalog=json.loads(cfile.read_text());IDS={p['id'] for p in protocols};CATEGORY_TITLES={c['id']:c['title'] for c in catalog['categories']}
    out=ROOT/args.out;out.parent.mkdir(parents=True,exist_ok=True)
    expected={}
    for p in protocols:expected.update(dict(leaves(p,'protocols.'+p['id'])))
    for m in catalog['medications']:expected.update(dict(leaves(m,'medications.'+m['id'])))
    expected.update(dict(leaves(catalog['medicationSource'],'medicationSource')))
    flag_map_file=ROOT/args.review_flag_map
    raw_flag_rows=json.loads(flag_map_file.read_text())
    flag_rows=[{'sourcePath':r['path'],'sourceText':r['originalText'],'targets':r['targets'],'reason':r['rationale'],'classification':r['classification']} for r in raw_flag_rows]
    if any(r['classification'] not in ['governance-only','retained-clinical-equivalent'] for r in raw_flag_rows):raise RuntimeError('Incomplete or unapproved review-note disposition')
    for rec in flag_rows:
        path=rec['sourcePath']
        if path in FLAGS:raise RuntimeError('Duplicate review-note disposition '+path)
        if expected.get(path)!=rec['sourceText']:raise RuntimeError('Stale review-note disposition '+path)
        for target in rec['targets']:
            if '.reviewFlags[' in target['path']:raise RuntimeError('Review-note target is another hidden note '+path)
            if expected.get(target['path'])!=target['text']:raise RuntimeError('Stale clinical-preservation target '+path+' -> '+target['path'])
        FLAGS[path]=rec
    expected_flags={path for path in expected if '.reviewFlags[' in path}
    if set(FLAGS)!=expected_flags:raise RuntimeError('Review-note audit coverage mismatch: '+str(expected_flags^set(FLAGS)))
    if args.dedup:
        overlays=[]
        for file in sorted((ROOT/'overlays').glob('*-dedup.json')):overlays+=json.loads(file.read_text())
        rejected=[]
        for rec in overlays:
            if expected.get(rec['sourcePath'])!=rec['sourceText'] or any(expected.get(t['path'])!=t['text'] for t in rec['targets']):
                rejected.append(rec);continue
            if '.reviewFlags[' in rec['sourcePath'] or any('.reviewFlags[' in t['path'] for t in rec['targets']):raise RuntimeError('Clinical deduplication cannot use hidden review notes')
            if rec['sourcePath'] in DEDUP:raise RuntimeError('Duplicate overlay source '+rec['sourcePath'])
            DEDUP[rec['sourcePath']]=rec
        def resolve(path,seen=()):
            if path in seen:raise RuntimeError('Circular clinical deduplication '+path)
            if path not in DEDUP:return [{'path':path,'text':expected[path]}]
            ts=DEDUP[path]['targets']
            if not ts:raise RuntimeError('Clinical mapping points to metadata-only omission '+path)
            out=[]
            for t in ts:out+=resolve(t['path'],seen+(path,))
            return list({t['path']:t for t in out}.values())
        for path,rec in DEDUP.items():
            if rec['targets']:
                rec['originalTargets']=rec['targets']
                rec['targets']=list({t['path']:t for x in rec['targets'] for t in resolve(x['path'],(path,))}.values())
        for flag in FLAGS.values():
            flag['targets']=list({t['path']:t for original in flag['targets'] for t in resolve(original['path'])}.values())
        TARGET_FIELDS={t['path'] for rec in DEDUP.values() if rec.get('displayText') for t in rec['targets']}
        (out.parent/'dedup-rejected.json').write_text(json.dumps(rejected,indent=2,ensure_ascii=False))
        (out.parent/'dedup-applied.json').write_text(json.dumps(list(DEDUP.values()),indent=2,ensure_ascii=False))
        print(f'Dedup accepted {len(DEDUP)}, changed-text rejected/restored {len(rejected)}',flush=True)
    for run in range(args.passes):
        TRACK=Tracker();story=make_story(protocols,catalog)
        # Omitted fields are already audited; zero-height placeholders must not
        # break heading keepWithNext before the next retained instruction.
        story=[f for f in story if not (isinstance(f,Spacer) and f.height==0)]
        doc=ManualDoc(str(out),title='Claiborne EMS Protocol Manual',author='Claiborne County EMS',subject='EMS protocols and medication reference')
        doc.build(story)
        new=TRACK.index_pages
        print(f'Pass {run+1}: {doc.page} pages; {len(TRACK.entries)} source fields; {len(new)} destinations',flush=True)
        new_fields={k:v['pages'] for k,v in TRACK.entries.items() if k in TARGET_FIELDS}
        if new==PAGE_MAP and new_fields==FIELD_MAP:break
        PAGE_MAP=new.copy();FIELD_MAP=new_fields
    else:raise RuntimeError('Printed page references did not stabilize')
    for rec in TRACK.entries.values():
        if rec.get('targets'):
            rec['retained_pages']=sorted(set(n for t in rec['targets'] for n in TRACK.entries[t['path']]['pages']))
    missing=set(expected)-set(TRACK.entries);extra=set(TRACK.entries)-set(expected)
    mismatched=[k for k in expected if k in TRACK.entries and expected[k]!=TRACK.entries[k]['value']]
    audit={'title':'Claiborne EMS compact vehicle manual coverage map','generated_date':args.edition_date,'pdf':str(out),'page_count':doc.page,'protocol_count':len(protocols),'medication_reference_count':len(catalog['medications']),'source_sha256':{'protocols':hashlib.sha256(pfile.read_bytes()).hexdigest(),'catalog':hashlib.sha256(cfile.read_bytes()).hexdigest()},'source_files':{'protocols':str(pfile),'catalog':str(cfile)},'review_flag_map':str(flag_map_file),'review_flag_map_sha256':hashlib.sha256(flag_map_file.read_bytes()).hexdigest(),'normalization':'ASCII dash and quotation mark normalization. Clinical duplicate omissions require audited source-to-retained-instruction mappings; all medication doses/notes and distinct clinical instructions are retained.','missing_fields':sorted(missing),'extra_fields':sorted(extra),'value_mismatches':mismatched,'protocol_pages':TRACK.protocol_pages,'destinations':TRACK.index_pages,'field_counts':dict(collections.Counter(r['disposition'] for r in TRACK.entries.values())),'fields':list(TRACK.entries.values()),'diagram_layout':TRACK.layout}
    (out.parent/'coverage-map.json').write_text(json.dumps(audit,indent=2,ensure_ascii=False))
    summary=['# Claiborne EMS compact manual coverage\n',f'- PDF pages: {doc.page}',f'- Catalog coverage: {len(protocols)} entries in {len(catalog["categories"])} sections',f'- Medication entries: {len(catalog["medications"])}',f'- Missing source fields: {len(missing)}',f'- Altered source values: {len(mismatched)}','- Clinical prose is preserved, not summarized. Only typography is normalized.','- Non-operative approval/source history is excluded from print but preserved with reasons in coverage-map.json.','- Publication labels do not replace clinical authorization; operational verification is documented separately from the crew-facing manual.','\n## Protocol page map\n']
    for pid,pg in TRACK.protocol_pages.items():summary.append(f'- {pid.upper()}: {min(pg)}-{max(pg)}')
    (out.parent/'coverage-summary.md').write_text('\n'.join(summary)+'\n')
    if missing or extra or mismatched:raise RuntimeError(f'Coverage mismatch missing={missing} extra={extra} changed={mismatched}')
    print(json.dumps({'pdf':str(out),'pages':doc.page,'coverage':'all fields accounted for','field_counts':audit['field_counts']}))
if __name__=='__main__':main()
