"""Validate fresh visual-review evidence against the exact regenerated PDF snapshot.

Reviewers write explicit per-protocol PDF/PNG hashes only after inspecting every
page. This command checks assertions; it does not itself perform visual review.
"""
import hashlib
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]


def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    manifest_path=ROOT/'public/canonical-all-pdfs.json';manifest=json.loads(manifest_path.read_text())
    render_path=ROOT/'tmp/pdfs/canonical-review/all-render-manifest.json';render=json.loads(render_path.read_text());rendered={r['id']:r for r in render['protocols']}
    evidence={};sources=sorted((ROOT/'reports/canonical-visual-evidence').glob('*.json'))
    if not sources:raise ValueError('No fresh visual-review assertions')
    for path in sources:
        report=json.loads(path.read_text())
        if report.get('status')!='passed' or not report.get('reviewer'):raise ValueError('Review not passed or reviewer missing: '+str(path))
        for record in report['protocols']:
            current=rendered[record['id']]
            for key in ['pdfSha256','pages','renderedPages']:
                if record[key]!=current[key]:raise ValueError('Stale visual evidence: '+str(path)+' '+record['id']+' '+key)
            evidence.setdefault(record['id'],[]).append(str(path.relative_to(ROOT)))
    records=[]
    for record in manifest['protocols']:
        pid=record['id'];current=rendered[pid]
        if pid not in evidence:raise ValueError('Unreviewed protocol: '+pid)
        if current['pdfSha256']!=record['pdfSha256'] or sha(ROOT/'public'/record['pdfPath'].lstrip('/'))!=record['pdfSha256']:raise ValueError('PDF differs from reviewed snapshot: '+pid)
        for page in current['renderedPages']:
            if sha(ROOT/page['path'])!=page['pngSha256']:raise ValueError('Page render changed: '+page['path'])
        records.append({**record,'renderedPages':current['renderedPages'],'reviewEvidence':evidence[pid]})
    combined=[]
    for group in ['all','universal','trauma']:
        family=json.loads((ROOT/f'public/canonical-{group}-pdfs.json').read_text());check=json.loads((ROOT/f'reports/{group}-combined-render-verification.json').read_text())
        if check['errors'] or check['combinedPdfSha256']!=family['combined']['pdfSha256'] or check['pageCount']!=family['combined']['pages']:raise ValueError('Combined pixel proof missing/stale: '+group)
        if sha(ROOT/family['combined']['path'])!=check['combinedPdfSha256']:raise ValueError('Combined PDF changed')
        combined.append(check)
    report={'status':'passed','appVersion':manifest['appVersion'],'protocolCount':len(records),'pageCount':sum(r['pages'] for r in records),'dpi':render['dpi'],'manifestSha256':sha(manifest_path),'renderManifestSha256':sha(render_path),'method':'Every regenerated individual page freshly visually inspected against current PDF/PNG hashes. No lost-build verdict reused. Combined PDF pages separately rendered and compared pixel-for-pixel.','reviewEvidence':[str(p.relative_to(ROOT)) for p in sources],'combined':combined,'protocols':records}
    (ROOT/'reports/all-pdf-visual-review.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items() if k not in ['protocols','combined']},indent=2))


if __name__=='__main__':main()
