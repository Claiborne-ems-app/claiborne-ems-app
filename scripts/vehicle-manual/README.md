# Claiborne EMS Protocol Manual — editable generator

This renderer reads the application's protocol and medication exports. It does not create clinical orders. This package builds the November 1, 2026 document revision, using the approved clinical data carried in application version 2.34.0. A later application cache/version change does not itself change this document's clinical content.

## Rebuild

Requirements: Node capable of the repository's TypeScript test resolver, Python 3, the pinned packages in `requirements.txt`, and Poppler (`pdftoppm`) for visual review. Liberation Sans fonts and their license are included. Changing fonts changes pagination.

```bash
python3 -m pip install -r scripts/vehicle-manual/requirements.txt
bash scripts/vehicle-manual/build.sh /absolute/path/to/repository /absolute/path/to/build-directory 2026-11-01
mkdir -p /absolute/path/to/render-directory
pdftoppm -png -r 108 /absolute/path/to/build-directory/output/claiborne-ems-compact-vehicle-manual.pdf /absolute/path/to/render-directory/page
```

`build.sh` does not replace the public PDF. Future editions require deliberate source review, date selection, completeness checks and visual QA before publication. Rebuilding unchanged data for this edition does not require changing its date. The revision date is not a manufactured signature or effective authorization date.

## Clinical completeness and presentation

- All nine catalog sections, all 91 catalog entries (including the retired UP-19 redirect), and all 43 medication-reference entries are processed.
- Source medication doses, routes, provider levels, contraindications, age limits, repeat/max instructions, monitoring, exceptions and Medical Control/product gates are preserved.
- `overlays/*-dedup.json` contains reviewed omission mappings, not replacement orders. Source and target text are pinned exactly. A changed mapping is rejected and its source instruction prints again; never accept such a rejection automatically.
- Shared cross-protocol consolidation is limited to explicitly linked repeated TBI safeguards. Local flow and provider instructions remain.
- The crew-facing manual excludes internal review/status/provenance sections and beta/review-copy labels. Clinical restrictions are ordinary warnings, precautions or medication instructions, not internal release notes.
- All 319 internal review notes remain in the source evidence. The mandatory `review-flag-preservation-map.json` classifies each exact original note as governance-only or maps its clinical content to exact retained ordinary clinical fields. The build rejects incomplete, stale or hidden-review-note targets. Any future source-note change requires a fresh clinical-preservation review.
- Source citations, source paths, administrative notes and empty grouping headings are accounted for in `coverage-map.json`, not silently discarded.
- Vector diagrams connect the supplied ordered nodes. Conditional branches remain in the node wording; no unsupported decision-tree edges are invented.
- Body type is 11 pt, labels do not depend on color, headings stay with retained content, and a Quick flow heading/intro stays with its first complete node.

## Verification gate

The build asserts exhaustive source-leaf coverage and unchanged retained values. `qa_manual.py` verifies retained strings on their recorded pages, internal destinations, bookmarks, page dimensions, text bounds, minimum secondary-text size, flow padding and presentation exclusions. A passing machine check is necessary but not sufficient: inspect every rendered page, including medication rows and column breaks. After a layout-only change, previously reviewed images may be carried only with byte-for-byte PNG identity proof; inspect every changed image.

The PDF has a timestamp, so an otherwise identical rebuild may have a different file SHA. Exports are deterministic: `export_sources.mjs` writes UTF-8 `JSON.stringify(value)` followed by exactly one LF, with SHA256 in `source-manifest.json`. Store source and artifact hashes with the public file and invalidate it after any protocol/catalog/medication export change. This generator does not assess medical authorization, inventory, field device configuration or deployment/offline readiness; the implementation handoff records those separately.

## Handoff

The portable package is this directory: `build_manual.py`, `qa_manual.py`, `export_sources.mjs`, `build.sh`, `requirements.txt`, `review-flag-preservation-map.json`, `overlays/`, `fonts/`, and this README. Do not commit scratch page images. Frozen exports, clinical-preservation decisions, coverage maps, dedup-pruning logs and per-page QA evidence are in the separate audit bundle. These snapshots are evidence, not another authored clinical source.
