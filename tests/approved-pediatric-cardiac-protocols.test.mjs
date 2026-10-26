import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const APPROVED_PC = [
  "PC-01", "PC-02", "PC-03", "PC-04",
  "PC-05", "PC-06", "PC-07", "PC-08",
];

const PEDIATRIC_CARDIAC_PDFS = [
  "pc-01-pediatric-asytole-pea-protocol.pdf",
  "pc-02-pediatric-bradycardia-poor-perfusion-protocol.pdf",
  "pc-03-pediatric-chf-pulmonary-edema-protocol.pdf",
  "pc-04-pediatric-pulseless-arrest-protocol.pdf",
  "pc-05-pediatrictachycardia-narrow-complex.pdf",
  "pc-06-pediatric-tachycardia-wide-complex-protocol.pdf",
  "pc-07-pediatric-vf-pulseless-vt-protocol.pdf",
  "pc-08-pediatric-post-resuscitation-protocol.pdf",
];

test("approved Pediatric Cardiac protocols are released in both catalogs", async () => {
  const [jsonCatalog, tsCatalog, structured] = await Promise.all([
    read("src/data/claiborne-protocols.json"),
    read("src/data/claiborneProtocols.ts"),
    read("data/structured-pediatric-cardiac-protocols.ts"),
  ]);
  const catalog = JSON.parse(jsonCatalog);

  for (const id of APPROVED_PC) {
    const protocol = catalog.find((item) => item.id === id);
    assert.equal(protocol?.status, "approved");
    assert.equal(protocol?.year, 2026);
    assert.equal(protocol?.source, "Claiborne County EMS Clinical Protocols");
    assert.equal(protocol?.pages, 2);
    assert.match(tsCatalog, new RegExp(`"id": "${id}"[\\s\\S]*?"status": "approved"`));
  }

  for (const id of APPROVED_PC.map((id) => id.toLowerCase())) {
    assert.match(structured, new RegExp(`id: "${id}"[\\s\\S]*?reviewStatus: "Approved"`));
  }
});

test("released Pediatric Cardiac source PDFs are direct two-page Claiborne PDFs", async () => {
  for (const path of PEDIATRIC_CARDIAC_PDFS) {
    const pdf = new URL(`../public/protocols/claiborne/${path}`, import.meta.url);
    const [metadata, header] = await Promise.all([
      stat(pdf),
      readFile(pdf).then((content) => content.subarray(0, 5).toString("ascii")),
    ]);

    assert.ok(metadata.size > 20_000, `${path} should be a substantive direct source PDF`);
    assert.equal(header, "%PDF-");
  }
});

test("Pediatric Cardiac safety-critical clinical guardrails remain explicit", async () => {
  const structured = await read("data/structured-pediatric-cardiac-protocols.ts");

  assert.match(structured, /id: "pc-01"[\s\S]*?Do not routinely give calcium or sodium bicarbonate/);
  assert.match(structured, /id: "pc-02"[\s\S]*?Atropine is not a treatment for hypoxic bradycardia/);
  const pc03 = structured.split('id: "pc-03"')[1].split('id: "pc-04"')[0];
  assert.doesNotMatch(pc03, /name: "Furosemide"|Use furosemide|diuretic therapy/i);
  assert.match(pc03, /furosemide\/Lasix was removed from this pathway/i);
  assert.match(structured, /id: "pc-04"[\s\S]*?Naloxone is not a substitute for resuscitation/);
  assert.match(structured, /id: "pc-05"[\s\S]*?Do not give adenosine for an irregular rhythm/);
  assert.match(structured, /id: "pc-06"[\s\S]*?Do not administer amiodarone and procainamide together/);
  assert.match(structured, /id: "pc-07"[\s\S]*?2 J\/kg for the first shock, 4 J\/kg for the second shock/);
  assert.match(structured, /id: "pc-08"[\s\S]*?Avoid core temperature above 37\.5 °C/);
});
