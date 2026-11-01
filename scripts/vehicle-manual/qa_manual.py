#!/usr/bin/env python3
import json,re,unicodedata,hashlib,collections,argparse
from pathlib import Path
import fitz
R=Path(__file__).resolve().parent
ap=argparse.ArgumentParser();ap.add_argument('--out-dir',default=str(R/'output/pdf'));args=ap.parse_args();out=Path(args.out_dir)
a=json.load(open(out/'coverage-map.json'));pdf=fitz.open(a['pdf'])
def norm(s):return re.sub(r'[^\w]','',unicodedata.normalize('NFKC',str(s)).casefold())
# Retained source values must occur in the pages on which the renderer reports them.
missing=[]
body_text={i+1:p.get_text(sort=False,clip=fitz.Rect(30,58,582,752)) for i,p in enumerate(pdf)}
for f in a['fields']:
 if f['disposition']=='printed' and isinstance(f['value'],str):
  hay=' '.join(body_text[p] for p in sorted(f['pages']))
  if norm(f['value']) not in norm(hay):missing.append({'path':f['path'],'pages':f['pages'],'value':f['value']})
links=[];broken=[];bounds=[];small=[]
for i,p in enumerate(pdf):
 for l in p.get_links():
  target=l.get('page',-1);dest=int(target) if isinstance(target,str) and target.isdigit() else (target+1 if isinstance(target,int) else -1)
  links.append({'page':i+1,'kind':l['kind'],'destination_page':dest})
  if l['kind']==fitz.LINK_NAMED and not (1<=dest<=len(pdf)):broken.append({'page':i+1,'link':str(l)})
  if l['kind']==fitz.LINK_GOTO and (l.get('page',-1)<0 or l['page']>=len(pdf)):broken.append({'page':i+1,'link':str(l)})
 for b in p.get_text('dict')['blocks']:
  for line in b.get('lines',[]):
   for span in line['spans']:
    x0,y0,x1,y1=span['bbox']
    if x0<34.5 or x1>577.5 or y0<22 or y1>772:bounds.append({'page':i+1,'text':span['text'],'bbox':span['bbox']})
    if span['size']<8:small.append({'page':i+1,'text':span['text'],'size':span['size']})
flow=a['diagram_layout'];flow_bad=[f for f in flow if f['height']<f['text_height']+15.9]
results={'pdf_sha256':hashlib.sha256(Path(a['pdf']).read_bytes()).hexdigest(),'page_count':len(pdf),'retained_string_fields_tested':sum(f['disposition']=='printed' and isinstance(f['value'],str) for f in a['fields']),'retained_text_not_found':missing,'links_count':len(links),'internal_links_count':sum(l['kind'] in [fitz.LINK_GOTO,fitz.LINK_NAMED] for l in links),'broken_internal_links':broken,'outline_count':len(pdf.get_toc()),'bounds_violations':bounds,'text_below_8pt':small,'flow_node_count':len(flow),'flow_padding_violations':flow_bad,'page_sizes':list(set((p.rect.width,p.rect.height) for p in pdf))}
(out/'qa-structural.json').write_text(json.dumps(results,indent=2,ensure_ascii=False))
print(json.dumps({k:(len(v) if isinstance(v,list) else v) for k,v in results.items()},indent=2))

assert not any(results[k] for k in ["retained_text_not_found","broken_internal_links","bounds_violations","text_below_8pt","flow_padding_violations"]), "Structural QA failed"
assert not any(a[k] for k in ["missing_fields","extra_fields","value_mismatches"]), "Source coverage failed"

# Crew-facing editorial cleanup, without banning medically meaningful native anatomy or beta drugs.
forbidden=re.compile(r"native (?:protocol|content|pathway|overview|assessment)|release safeguards|retained review notes|review (?:copy|edition)|beta (?:application|content|field|reference|build|version)|full[- ]system|reconcil(?:ed|iation)|clinical[- ]release|medical director approved|approval recorded|source status",re.I)
presentation=[]
for i,p in enumerate(pdf):
 text=' '.join(p.get_text().split())
 for m in forbidden.finditer(text):presentation.append({'page':i+1,'phrase':m.group(0)})
cleanup={'pdf_sha256':results['pdf_sha256'],'pages':len(pdf),'forbidden_editorial_findings':presentation,'clinical_native_anatomy_pages':[i+1 for i,p in enumerate(pdf) if re.search(r'\bnative\b',p.get_text(),re.I)],'review_notes_in_source':sum('.reviewFlags[' in f['path'] for f in a['fields']),'review_notes_printed':sum('.reviewFlags[' in f['path'] and f['disposition']=='printed' for f in a['fields'])}
(out/'qa-presentation-cleanup.json').write_text(json.dumps(cleanup,indent=2))
assert not presentation and not cleanup['review_notes_printed'], 'Crew presentation cleanup failed'
