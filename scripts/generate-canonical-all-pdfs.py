"""Render all protocols from the single native clinical source."""
import argparse
from pathlib import Path
import runpy


def main(ids=None):
    return runpy.run_path(str(Path(__file__).with_name('generate-canonical-trauma-pdfs.py')))['main'](ids,group='all')


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--only',nargs='+');main(parser.parse_args().only)
