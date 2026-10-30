"""Validated editorial deduplication of canonical PDF prose.

Each omitted paragraph has a human-reviewed mapping to retained canonical
paragraphs. Any canonical content change invalidates its projection until review.
No clinical values are authored in this projection layer.
"""
import copy
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROJECTION = ROOT / 'data/trauma-pdf-projection.json'


def get_path(value, path):
    for key in path.split('.'):
        value=value[int(key)] if isinstance(value,list) else value[key]
    return value


def projection_for(item):
    if not PROJECTION.exists():return []
    rules=json.loads(PROJECTION.read_text()).get('protocols',{}).get(item['protocol']['id'])
    if not rules:return []
    if rules['canonicalSha256'] != item['canonicalSha256']:
        raise ValueError(f"{item['protocol']['id']}: canonical content changed; re-review PDF redundancy mapping")
    omitted={rule['path'] for rule in rules['omissions']}
    for rule in rules['omissions']:
        if not isinstance(get_path(item['protocol'],rule['path']),str):raise ValueError('Only individual prose strings may be deduplicated')
        if not rule.get('reason') or not rule.get('coveredBy'):raise ValueError('Every omission requires a retained coverage mapping and rationale')
        for path in rule['coveredBy']:
            if path in omitted:raise ValueError('Coverage path is also omitted: '+path)
            if not isinstance(get_path(item['protocol'],path),str):raise ValueError('Coverage must identify canonical prose strings')
    return rules['omissions']


def project(item):
    rules=projection_for(item); omitted={rule['path'] for rule in rules}
    def walk(value,path=''):
        if isinstance(value,list):
            return [walk(child,f'{path}.{i}'.strip('.')) for i,child in enumerate(value) if f'{path}.{i}'.strip('.') not in omitted]
        if isinstance(value,dict):
            return {key:walk(child,f'{path}.{key}'.strip('.')) for key,child in value.items()}
        return value
    return {**item,'protocol':walk(copy.deepcopy(item['protocol']))}
