"""Verify universal canonical PDFs against their native source."""
from pathlib import Path
import runpy
import sys
if __name__=='__main__':sys.exit(runpy.run_path(str(Path(__file__).with_name('verify-canonical-trauma-pdfs.py')))['main'](group='universal'))
