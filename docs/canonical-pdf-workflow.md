# Canonical protocol PDF workflow

Clinical prose is authored only in the native protocol records. The 91-entry export follows the active catalog, excludes removed SC/SO categories, and includes the UP19 retirement compatibility notice. Crew PDFs omit internal review labels and beta/release banners, not clinical precautions. Internal review flags remain in the separate audit notes and canonical source hash.

## Generate and verify

```sh
npm run generate:canonical-pdfs
node scripts/generate-offline-manifest.mjs
npm run verify:canonical-pdfs
npm run verify:universal-pdfs
npm run verify:trauma-pdfs
```

Targeted generation accepts `--only am-01 pc-07`. All generators merge shared pagination, synchronize overlapping family manifests and governance notes, and rebuild affected combined PDFs. Historical family commands bridge to this same renderer. Catalog approval status is preserved, never promoted by generation.

Individual PDFs are written to native `sourcePdf` paths under `public/`. Combined files live under `output/pdf/`: `claiborne-all-canonical.pdf`, `claiborne-up01-up22-approved.pdf`, and `claiborne-tb01-tb09-review.pdf`. The Universal filename is historical and does not confer blanket clinical release. Family manifests pin source/PDF hashes, application version, bytes and pagination. Source hashes exclude only derived `sourcePages`.

## Projection rules

The explicit, hash-pinned omissions in `data/trauma-pdf-projection.json` remove only reviewed duplicate prose. Any source change invalidates a mapping until checked. Never silently replace a hash. Remove an invalid mapping to render full native content, or prove every omitted paragraph and retained coverage paragraph remains valid and record the review. Recovery mapping decisions are recorded in `reports/canonical-projection-recovery-review.json`.

## Mandatory visual gate

```sh
python3 scripts/render-canonical-pdfs.py --group all
python3 scripts/verify-canonical-render-equivalence.py --group all
python3 scripts/verify-canonical-render-equivalence.py --group universal
python3 scripts/verify-canonical-render-equivalence.py --group trauma
python3 scripts/verify-canonical-visual-review.py
node --import ./scripts/register-test-ts-resolver.mjs --test tests/canonical-all-pdfs.test.mjs tests/canonical-universal-pdfs.test.mjs
```

The renderer creates every page at 150 DPI, four-page contact sheets and a PDF/PNG hash manifest under `tmp/pdfs/canonical-review/`. Rendering is not visual inspection. A reviewer must inspect every page and record `status: passed`, reviewer identity, findings and exact per-protocol `pdfSha256`, `pages` and `renderedPages` in JSON evidence under `reports/canonical-visual-evidence/`. Only actual current inspection belongs in those records. Lost-build review assertions cannot be reused for reconstructed artifacts.

Visual verification rejects missing/stale evidence and requires every combined page to have passed a pixel-for-pixel comparison with the corresponding individual page. CI pins every shipped canonical PDF to this complete review snapshot. After regeneration the gate remains red until affected visual evidence is refreshed. Targeted rendering can reuse unchanged PDF/PNG hashes with `--only`; changed pages require new inspection or explicit pixel-identical comparison with a preserved reviewed baseline.

Text verification independently checks all displayed native fields after validated projection, action links, page bounds, source/catalog page counts and approval statuses, source/PDF hashes, metadata, audit-note parity, combined page order and bookmark destinations. It does not replace visual inspection or clinical authorization.
