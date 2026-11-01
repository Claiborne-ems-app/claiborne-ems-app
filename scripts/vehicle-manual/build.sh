#!/usr/bin/env bash
set -euo pipefail
HERE=$(cd "$(dirname "$0")" && pwd)
REPO=$(cd "${1:-$HERE/../..}" && pwd)
WORK=${2:-$REPO/tmp/compact-vehicle-manual}
EDITION_DATE=${3:-2026-11-01}
mkdir -p "$WORK"
WORK=$(cd "$WORK" && pwd)
(cd "$REPO" && node --import "$REPO/scripts/register-test-ts-resolver.mjs" "$HERE/export_sources.mjs" "$REPO" "$WORK")
python3 "$HERE/build_manual.py" --protocols "$WORK/protocols-frozen.json" --catalog "$WORK/catalog-frozen.json" --out "$WORK/output/claiborne-ems-compact-vehicle-manual.pdf" --dedup --review-flag-map "$HERE/review-flag-preservation-map.json" --edition-date "$EDITION_DATE"
python3 "$HERE/qa_manual.py" --out-dir "$WORK/output"
echo 'Structural checks finished. Review dedup-rejected.json, render and visually inspect every page before publishing.'
