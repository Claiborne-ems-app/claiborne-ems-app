"""Route historical generation commands through one canonical clinical source."""
from pathlib import Path
import runpy


def build_canonical(protocol_id):
    ids=protocol_id if isinstance(protocol_id,list) else [protocol_id]
    runpy.run_path(str(Path(__file__).with_name('generate-canonical-all-pdfs.py')))['main']([key.lower() for key in ids])
