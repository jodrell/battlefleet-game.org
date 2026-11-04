#!/usr/bin/env python3

"""
Usage: pdf2text.py PDF_FILE

This script extracts text from the PDF file given as an argument.
mupdf appears to do a better job than poppler (pdftotext), especially
for the BFG files, and avoids the issue where blocks of text get reordered.
"""

import pymupdf,sys,re

doc = pymupdf.open(sys.argv[1])

i = 0

for page in doc:
    text = re.sub(r"[ \t]+\n", "\n", page.get_text())
    print(text)
