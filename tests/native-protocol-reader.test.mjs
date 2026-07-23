import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import {
  getPrimaryProtocolHref,
  getStructuredProtocol,
  hasReviewedNativeContent,
} from "../data/structured-protocols.ts";
import {
  BETA_CLINICAL_DISCLAIMER,
  PROTOCOL_HOME_HREF,
  getNativeProtocolSections,
  getProtocolFallbackHref,
  getProtocolViewerHref,
  shouldUseBrowserBack,
} from "../lib/protocols/structured-content.ts";

const content = getStructuredProtocol("medical", "universal-patient-care");

test("demonstration protocol renders maintainable native sections and anchors", () => {
  assert.ok(content);
  assert.deepEqual(getNativeProtocolSections(content).map((section) => section.id), [
    "overview",
    "assessment",
    "treatment",
    "special-populations",
    "references",
    "source",
  ]);
  assert.ok(content.assessment.length > 0);
  assert.ok(content.treatmentSteps.length > 0);
});

test("back and home navigation retain exact semantic destinations", () => {
  assert.equal(shouldUseBrowserBack(2), true);
  assert.equal(shouldUseBrowserBack(1), false);
  assert.equal(getProtocolFallbackHref("medical"), "/protocols/medical");
  assert.equal(PROTOCOL_HOME_HREF, "/");
});

test("source PDF action targets the existing full-screen viewer", () => {
  assert.equal(
    getProtocolViewerHref("medical", "universal-patient-care"),
    "/protocols/medical/universal-patient-care/viewer"
  );
  assert.equal(content.sourcePdf, "covenant-health-air-protocols.pdf");
  assert.deepEqual(content.sourcePages, { start: 15, end: 15 });
});

test("required beta disclaimer is visible in the reader implementation", async () => {
  const readerSource = await readFile(new URL("../components/protocols/NativeProtocolReader.tsx", import.meta.url), "utf8");
  assert.ok(readerSource.includes("BETA_CLINICAL_DISCLAIMER"));
  assert.equal(
    BETA_CLINICAL_DISCLAIMER,
    "This beta application is for evaluation and reference purposes only. It does not contain the current official Covenant Health Air patient care guidelines or treatment standards and must not be used for clinical decision-making or patient care."
  );
});

test("demonstration clinical text is present on the cited source PDF page", async () => {
  const loadingTask = getDocument({
    data: new Uint8Array(await readFile(new URL("../public/protocols/covenant-health-air-protocols.pdf", import.meta.url))),
    disableWorker: true,
  });
  try {
    const page = await (await loadingTask.promise).getPage(content.sourcePages.start);
    const textContent = await page.getTextContent();
    const source = textContent.items.filter((item) => "str" in item).map((item) => item.str).join(" ");
    const normalize = (value) => value.toLowerCase().replace(/\s+([,.])/g, "$1").replace(/\s+/g, " ").trim();
    const normalizedSource = normalize(source);
    const clinicalText = [
      ...content.overview,
      ...content.assessment.flatMap((group) => [group.title, ...group.items]),
      ...content.treatmentSteps,
      ...content.specialPopulations.flatMap((group) => [group.title, ...group.items]),
      ...content.references,
    ];
    for (const statement of clinicalText) {
      assert.ok(normalizedSource.includes(normalize(statement)), `Missing source statement: ${statement}`);
    }
  } finally {
    await loadingTask.destroy();
  }
});

test("native reader route is included in offline package and content remains Draft", async () => {
  const manifest = JSON.parse(await readFile(new URL("../public/offline-resources.json", import.meta.url), "utf8"));
  assert.ok(manifest.resources.some((resource) => resource.url === "/protocols/medical/universal-patient-care"));
  assert.equal(content.reviewStatus, "Draft");
  assert.equal(hasReviewedNativeContent(content), false);
  assert.equal(
    getPrimaryProtocolHref("medical", "universal-patient-care"),
    "/protocols/medical/universal-patient-care/viewer"
  );
  assert.ok(content.reviewFlags.some((flag) => flag.includes("manual clinical review")));
});

test("only Reviewed or Approved content selects the native reader", () => {
  assert.equal(hasReviewedNativeContent({ ...content, reviewStatus: "Reviewed" }), true);
  assert.equal(hasReviewedNativeContent({ ...content, reviewStatus: "Approved" }), true);
  assert.equal(hasReviewedNativeContent({ ...content, reviewStatus: "Draft" }), false);
  assert.equal(hasReviewedNativeContent(undefined), false);
});

test("PDF fallback retains navigation and shows the native-content banner", async () => {
  const viewerSource = await readFile(new URL("../components/protocols/PdfViewer.tsx", import.meta.url), "utf8");
  const routeSource = await readFile(new URL("../app/protocols/[category]/[protocol]/page.tsx", import.meta.url), "utf8");
  assert.ok(viewerSource.includes("Native mobile content is not yet available for this protocol."));
  assert.ok(viewerSource.includes('<House aria-hidden="true"'));
  assert.ok(viewerSource.includes("<ProtocolBackButton"));
  assert.ok(routeSource.includes("redirect(getProtocolViewerHref"));
});
