"""Compatibility command; all clinical text comes from native records."""
from canonical_pdf_bridge import build_canonical

if __name__=='__main__':build_canonical(['ao-01', 'ao-02', 'ao-03'])
