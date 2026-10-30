# Trauma protocol reconciliation — local preparation

## Scope and provenance

- Upstream reviewed base: `7c96f66a4cd6a508ef5c98790d51eac81b3f1dcb` (`main`).
- Publication base refreshed to `7e08e41cc8398cb374f6a8bc445da3a2078d1711`; the concurrent approved TE update is preserved byte-for-byte, with shared catalogs/offline artifacts regenerated rather than overwritten.
- This workspace is a connector-materialized reconstruction, not a clone with upstream history. All 284 original files were verified against their upstream Git blob hashes before editing. The local baseline snapshot is `0d5d9fedae1de7d5f79e51b8ea7b8342eec2df61`.
- Prepared app/offline package version: **2.33.0** / **2-33-0-october-2026**. A review-branch push is authorized; main/production, PR creation and device updates are not performed by this change.
- Implements the approved trauma-review recommendations and the user's specific overrides: routine/initial assisted TBI EtCO2 35–45 mmHg; brief herniation rescue 30–35; adult TBI SBP at least 110; TB09 original rate-based fluid table; systemic trauma TXA Paramedic-only with the retained adult 1–2 g range; pediatric pain governed by PM04; expanded AEMT analgesia not enabled while authorization is unverified.
- Unrelated toxicology content, App Store planning, non-TBI ventilation targets, and medical/septic/cardiogenic shock regimens are not redefined by this change.

## Single-source PDF workflow

```bash
npm ci
npm run generate:trauma-pdfs
npm run verify:trauma-pdfs
npm run generate:offline
npm test
npm run lint
npx tsc --noEmit
npm run build
npm run release:check
```

PDF generation additionally requires Python 3, `reportlab`, `pypdf`, and DejaVu Sans fonts. PDF text/geometry QA requires `pdfplumber`; visual review requires Poppler (`pdftoppm`). Set `CLAIBORNE_PDF_FONT_DIR` for a different installed DejaVu font location. Node 24 is required by the repository.

`data/structured-*.ts` remains the clinical source. The exporter selects TB01–12, AM03/AM05, UP11, PM03 and the affected airway pathways. `scripts/generate-canonical-trauma-pdfs.py` writes controlled PDFs at the existing public URLs, synchronizes generated native page counts and both catalog records, and writes `public/canonical-trauma-pdfs.json` with source/PDF hashes and sizes. Historical generator entry points delegate reconciled protocols to this canonical workflow rather than overwriting them from stale duplicated prose.

Clinical-review status is preserved, not elevated by PDF creation. TB01–09 catalog records now say `reviewed`, not imported North Carolina content. UP11's catalog follows its existing native `Reviewed` status instead of asserting a higher status. Administrative review flags are retained separately in `reports/trauma-pdf-review-notes.json`; the clinical PDF carries concise status/provenance information.

Where editorial deduplication is used, `data/trauma-pdf-projection.json` records each omitted paragraph, retained canonical paragraphs covering it, and the reviewed source hash. These mappings remove duplicate prose, not distinct doses, age/provider limits, conditions, or exceptions. A subsequent canonical change invalidates its mapping until re-reviewed. The full canonical content remains in the app and change record.

After PDF regeneration, regenerate the offline package. Existing device caches are not evidence of an update: completed-download, upgrade, interrupted/retry, cold-launch and airplane-mode tests on target devices remain required. PDF app links open the deployed application, which can differ from these locally prepared revisions; compare the package version before use.

## Remaining clinical and operational release decisions

These are not resolved by source parity or a green technical build:

- Pediatric TBI blood-pressure targets and explicit age boundaries: numeric table still requires a response/approval. Until established, use the displayed Medical Control safeguard rather than an invented value.
- Pediatric traumatic-hemorrhage fluid branch: do not repurpose PM03 medical/septic-shock targets as a trauma order.
- TXA: adult 1–2 g range is intentional. The adult administration pair is approved: 1 g over 10 minutes or 2 g over 20 minutes (maximum 100 mg/min). Verify actual stocked concentration/preparation and do not give an automatic repeat. Pediatric eligibility/rate/dose maximum and IV/IO state/local reconciliation require confirmation. The existing local pediatric 15 mg/kg reference is not an unrestricted pediatric trauma order. The user deliberately retained pediatric 15 mg/kg rather than the current Tennessee chart's 20 mg/kg. The approved adult pair respects the 100 mg/min maximum despite the chart's internally inconsistent adult timing text.
- Calcium gluconate: the existing initial range/3 g per-episode limit does not establish an unambiguous automatic repeat rule. Require the specific Medical Control order confirming dose/cumulative limit; do not silently raise the ceiling.
- Ketorolac: retain existing local adult 60 mg IM instruction pending director reconciliation with Tennessee's 10–30 mg IV/IM chart. A dose difference is not itself proof of a legal scope prohibition.
- Expanded AEMT analgesia: verify current exact drug/route/patient-group authority, applicable Tennessee-approved training, agency credentialing/competency, and current medical-director standing orders. Training alone and a self-attested UI toggle do not enable it. Baseline unverified doses remain hidden.
- Operational documents: signed regional trauma/burn/pediatric destination plan and transfer arrangements; approved chest-seal/positive-pressure-ventilation and device-specific decompression/tourniquet procedures; pediatric SMR decision aid and clearance authority; ocular-pH equipment/training/endpoint; high-risk crush-release orders; blood-product program support if implemented.

The release gate remains intentionally separate from technical checks. No ATLS certification, state-scope certification, clinical-release approval, production deployment, or successful physical-device offline test is claimed.
