import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const APPROVED_AR = [
  "AR-01", "AR-02", "AR-03", "AR-04", "AR-05",
  "AR-06", "AR-07", "AR-08", "AR-09", "AR-10",
];

const AIRWAY_PDFS = [
  "ar-01-adult-airway-protocol.pdf",
  "ar-02-adult-failed-airway-protocol.pdf",
  "ar-03-airway-drug-assisted-intubation-protocol.pdf",
  "ar-04-copd-asthma-protocol.pdf",
  "ar-05-pediatric-airway-protocol.pdf",
  "ar-06-pediatric-failed-airway-protocol.pdf",
  "ar-07-pediatric-respiratory-distress-protocol.pdf",
  "ar-08-post-intubation-biad-management-protocol.pdf",
  "ar-09-ventilator-emergencies-protocol.pdf",
  "ar-10-tracheostomy-tube-emergencies-protocol.pdf",
];

test("approved airway and respiratory protocols are released in both catalogs", async () => {
  const [jsonCatalog, tsCatalog, structured] = await Promise.all([
    read("src/data/claiborne-protocols.json"),
    read("src/data/claiborneProtocols.ts"),
    read("data/structured-airway-protocols.ts"),
  ]);
  const catalog = JSON.parse(jsonCatalog);

  for (const id of APPROVED_AR) {
    const protocol = catalog.find((item) => item.id === id);
    assert.equal(protocol?.status, "approved");
    assert.equal(protocol?.year, 2026);
    assert.equal(protocol?.source, "Claiborne County EMS Clinical Protocols");
    assert.equal(protocol?.pages, 2);
    assert.match(tsCatalog, new RegExp(`"id": "${id}"[\\s\\S]*?"status": "approved"`));
  }

  for (const id of APPROVED_AR.map((id) => id.toLowerCase())) {
    assert.match(structured, new RegExp(`id: "${id}"[\\s\\S]*?reviewStatus: "Approved"`));
  }

  assert.doesNotMatch(structured, /imported source|original imported PDF|Current Tennessee EMS scope/i);
});

test("released airway source PDFs are direct two-page Claiborne PDFs", async () => {
  for (const path of AIRWAY_PDFS) {
    const pdf = new URL(`../public/protocols/claiborne/${path}`, import.meta.url);
    const [metadata, header] = await Promise.all([
      stat(pdf),
      readFile(pdf).then((content) => content.subarray(0, 5).toString("ascii")),
    ]);

    assert.ok(metadata.size > 20_000, `${path} should be a substantive direct source PDF`);
    assert.equal(header, "%PDF-");
  }
});

test("airway provider authority and approved respiratory safeguards remain explicit", async () => {
  const structured = await read("data/structured-airway-protocols.ts");

  assert.match(structured, /id: "ar-01"[\s\S]*?Endotracheal intubation is not included as an AEMT procedure/);
  assert.match(structured, /id: "ar-02"[\s\S]*?do not perform ETT placement or video laryngoscopy/);
  assert.match(structured, /id: "ar-03"[\s\S]*?Pediatric use requires a direct online order from the Claiborne EMS Medical Director or Assistant Medical Director/);
  assert.match(structured, /id: "ar-04"[\s\S]*?target 88–92%/);
  assert.match(structured, /id: "ar-07"[\s\S]*?Under 20 kg: 2\.5 mg nebulized; 20 kg or greater: 5 mg nebulized/);
  assert.match(structured, /id: "ar-07"[\s\S]*?approved PM-01 Pediatric Allergic Reaction epinephrine pathway/);
  assert.match(structured, /id: "ar-08"[\s\S]*?Propofol may not be initiated or bolused by field Paramedics/);
  assert.match(structured, /id: "ar-10"[\s\S]*?An endotracheal tube through the stoma is not an AEMT procedure/);
});
