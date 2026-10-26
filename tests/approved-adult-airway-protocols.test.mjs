import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("AR-11 is an approved Claiborne adult ventilation protocol in both catalogs", async () => {
  const [jsonCatalog, tsCatalog, structured] = await Promise.all([
    read("src/data/claiborne-protocols.json"),
    read("src/data/claiborneProtocols.ts"),
    read("data/structured-airway-protocols.ts"),
  ]);
  const catalog = JSON.parse(jsonCatalog);
  const protocol = catalog.find((item) => item.id === "AR-11");

  assert.equal(protocol?.status, "approved");
  assert.equal(protocol?.year, 2026);
  assert.equal(protocol?.source, "Claiborne County EMS Clinical Protocols");
  assert.match(tsCatalog, /"id": "AR-11"[\s\S]*?"status": "approved"/);
  assert.match(structured, /id: "ar-11"[\s\S]*?reviewStatus: "Approved"/);
});

test("AR-11 uses the approved IBW-based ventilation and safety pathway", async () => {
  const structured = await read("data/structured-airway-protocols.ts");

  assert.match(structured, /id: "ar-11"[\s\S]*?Ideal Body Weight \(IBW\)/);
  assert.match(structured, /6-8 mL\/kg IBW/);
  assert.match(structured, /Default to 6 mL\/kg for ARDS/);
  assert.match(structured, /Usual adult: 10-12\/min/);
  assert.match(structured, /COPD\/asthma: 8-10\/min/);
  assert.match(structured, /plateau pressure below 30 cm H2O/);
  assert.match(structured, /post-resuscitation target SpO2 90-98%/);
  assert.match(structured, /AR-08 Post-Intubation \/ BIAD Management/);
  assert.match(structured, /AR-09 Ventilator Emergencies/);
});

test("approved AR-11 source PDF is present and recognizable as a Claiborne PDF", async () => {
  const pdf = new URL("../public/protocols/claiborne/ar-11-mechanical-ventilation-adult.pdf", import.meta.url);
  const [metadata, header] = await Promise.all([
    stat(pdf),
    readFile(pdf).then((content) => content.subarray(0, 5).toString("ascii")),
  ]);

  assert.ok(metadata.size > 20_000);
  assert.equal(header, "%PDF-");
});
