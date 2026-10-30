"""Keep historical PDF commands on the single native clinical source."""
from pathlib import Path
import runpy


def build_canonical(protocol_id):
    generator = Path(__file__).with_name('generate-canonical-trauma-pdfs.py')
    runpy.run_path(str(generator))['main']([protocol_id.lower()])
