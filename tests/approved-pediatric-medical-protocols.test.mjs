import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import { canonicalPdfPages } from "../data/canonical-pdf-pages.ts";
import { structuredPediatricMedicalProtocols } from "../data/structured-pediatric-medical-protocols.ts";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("PM-01 is released as approved Claiborne app content and a direct source PDF", async () => {
  const [jsonCatalog, tsCatalog, structured, pdf, metadata] = await Promise.all([
    read("src/data/claiborne-protocols.json"),
    read("src/data/claiborneProtocols.ts"),
    read("data/structured-pediatric-medical-protocols.ts"),
    readFile(new URL("../public/protocols/claiborne/pm-01-pediatric-allergic-reaction-protocol.pdf", import.meta.url)),
    stat(new URL("../public/protocols/claiborne/pm-01-pediatric-allergic-reaction-protocol.pdf", import.meta.url)),
  ]);
  const catalog = JSON.parse(jsonCatalog);
  const pm01 = catalog.find((protocol) => protocol.id === "PM-01");

  assert.equal(pm01?.status, "approved");
  assert.equal(pm01?.year, 2026);
  assert.equal(pm01?.source, "Claiborne County EMS Clinical Protocols");
  assert.match(tsCatalog, /"id": "PM-01"[\s\S]*?"status": "approved"/);
  assert.match(structured, /id: "pm-01"[\s\S]*?reviewStatus: "Approved"/);
  assert.match(structured, /Methylprednisolone", dose: "2 mg\/kg IV; maximum 125 mg"/);
  assert.doesNotMatch(structured, /id: "pm-01"[\s\S]*?Methylprednisolone", dose: "Medical Control only/);
  assert.ok(metadata.size > 20_000);
  assert.equal(pdf.subarray(0, 5).toString("ascii"), "%PDF-");
});

test("PM-02 is released as approved Claiborne app content and a direct source PDF", async () => {
  const [jsonCatalog, tsCatalog, structured, pdf, metadata] = await Promise.all([
    read("src/data/claiborne-protocols.json"),
    read("src/data/claiborneProtocols.ts"),
    read("data/structured-pediatric-medical-protocols.ts"),
    readFile(new URL("../public/protocols/claiborne/pm-02-pediatric-diabetic-protocol.pdf", import.meta.url)),
    stat(new URL("../public/protocols/claiborne/pm-02-pediatric-diabetic-protocol.pdf", import.meta.url)),
  ]);
  const catalog = JSON.parse(jsonCatalog);
  const pm02 = catalog.find((protocol) => protocol.id === "PM-02");

  assert.equal(pm02?.title, "Pediatric Hypoglycemia / Diabetic Emergency");
  assert.equal(pm02?.status, "approved");
  assert.equal(pm02?.year, 2026);
  assert.equal(pm02?.source, "Claiborne County EMS Clinical Protocols");
  assert.match(tsCatalog, /"id": "PM-02"[\s\S]*?"status": "approved"/);
  assert.match(structured, /id: "pm-02"[\s\S]*?reviewStatus: "Approved"/);
  assert.match(structured, /D10 2 mL\/kg IV\/IO/);
  assert.match(structured, /Do not give insulin or sodium bicarbonate in the field/);
  assert.ok(metadata.size > 20_000);
  assert.equal(pdf.subarray(0, 5).toString("ascii"), "%PDF-");
});

test("PM-03 is released as approved Claiborne app content and a direct source PDF", async () => {
  const [jsonCatalog, tsCatalog, structured, pdf, metadata] = await Promise.all([
    read("src/data/claiborne-protocols.json"),
    read("src/data/claiborneProtocols.ts"),
    read("data/structured-pediatric-medical-protocols.ts"),
    readFile(new URL("../public/protocols/claiborne/pm-03-pediatric-hypotension-shock-protocol.pdf", import.meta.url)),
    stat(new URL("../public/protocols/claiborne/pm-03-pediatric-hypotension-shock-protocol.pdf", import.meta.url)),
  ]);
  const catalog = JSON.parse(jsonCatalog);
  const pm03 = catalog.find((protocol) => protocol.id === "PM-03");

  assert.equal(pm03?.title, "Pediatric Hypotension / Shock");
  assert.equal(pm03?.status, "approved");
  assert.equal(pm03?.year, 2026);
  assert.equal(pm03?.source, "Claiborne County EMS Clinical Protocols");
  assert.match(tsCatalog, /"id": "PM-03"[\s\S]*?"status": "approved"/);
  assert.match(structured, /id: "pm-03"[\s\S]*?reviewStatus: "Approved"/);
  assert.match(structured, /10–20 mL\/kg IV\/IO aliquots/);
  assert.match(structured, /patient's prescribed emergency plan or Medical-Control-directed protocol equivalent/);
  assert.doesNotMatch(structured, /id: "pm-03"[\s\S]*?Hydrocortisone 2mg\/kg/);
  assert.ok(metadata.size > 20_000);
  assert.equal(pdf.subarray(0, 5).toString("ascii"), "%PDF-");
});


test("pediatric medical catalog page counts and paths match the native PDF source", async () => {
  const catalog = JSON.parse(await read("src/data/claiborne-protocols.json"));
  for (const native of structuredPediatricMedicalProtocols) {
    const entry = catalog.find((item) => item.id.toLowerCase() === native.id);
    assert.equal(entry?.pages, canonicalPdfPages[native.id] ?? 2);
    assert.equal(entry?.pages, native.sourcePages.end);
    assert.equal(entry?.pdfPath, native.sourcePdf);
  }
});
