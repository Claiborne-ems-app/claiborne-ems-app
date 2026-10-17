import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("approved adult medical protocols are reconciled in both catalogs", async () => {
  const [jsonCatalog, tsCatalog, structured] = await Promise.all([
    read("src/data/claiborne-protocols.json"),
    read("src/data/claiborneProtocols.ts"),
    read("data/structured-protocols.ts"),
  ]);
  const catalog = JSON.parse(jsonCatalog);

  for (const id of ["AM-01", "AM-02", "AM-03", "AM-04", "AM-05", "AM-06", "AM-07"]) {
    const protocol = catalog.find((item) => item.id === id);
    assert.equal(protocol?.status, "approved");
    assert.equal(protocol?.year, 2026);
    assert.equal(protocol?.source, "Claiborne County EMS Clinical Protocols");
    assert.match(tsCatalog, new RegExp(`"id": "${id}"[\\s\\S]*?"status": "approved"`));
  }

  assert.equal(
    catalog.find((item) => item.id === "AM-04")?.title,
    "Hypertension / Suspected Hypertensive Emergency"
  );
  assert.equal(
    catalog.find((item) => item.id === "AM-06")?.pdfPath,
    "/protocols/claiborne/am-06-suspected-stroke-tnk-transfer-protocol.pdf"
  );

  for (const id of ["am-01", "am-02", "am-03", "am-04", "am-05", "am-06", "am-07"]) {
    assert.match(structured, new RegExp(`id: "${id}"[\\s\\S]*?reviewStatus: "Approved"`));
  }
});

test("AM-04 has the approved undifferentiated-CVA labetalol authority", async () => {
  const [structured, medicationReference] = await Promise.all([
    read("data/structured-protocols.ts"),
    read("data/medication-reference.ts"),
  ]);

  assert.match(structured, /id: "am-04"[\s\S]*?SBP above 220 mm Hg or DBP above 110 mm Hg/);
  assert.match(structured, /labetalol 10 mg slow IV over 2 minutes/);
  assert.match(structured, /Maximum total dose is 20 mg/);
  assert.match(structured, /Target SBP is 220 mm Hg or less and DBP is 110 mm Hg or less/);
  assert.match(structured, /post-TNK transfer; follow AM-06 and written facility orders/);
  assert.match(medicationReference, /Undifferentiated suspected CVA: 10 mg slow IV over 2 min/);
  assert.match(medicationReference, /target SBP ≤220 and DBP ≤110/);
});

test("AM replacement fixes linked pathways and key source content", async () => {
  const [structured, medicationReference] = await Promise.all([
    read("data/structured-protocols.ts"),
    read("data/medication-reference.ts"),
  ]);

  assert.match(structured, /id: "am-03"[\s\S]*?label: "AC-09 Ventricular Fibrillation \/ Pulseless VT"/);
  assert.match(structured, /id: "am-05"[\s\S]*?label: "TB-06 Multiple Trauma"/);
  assert.match(structured, /id: "am-07"[\s\S]*?label: "TB-06 Multiple Trauma"/);
  assert.match(structured, /id: "am-06"[\s\S]*?TNK is a single IV bolus/);
  assert.doesNotMatch(structured, /id: "am-06"[\s\S]*?sourcePdf: "[^"\n]*activase/i);
  assert.match(medicationReference, /Medical shock \(AM-05\): 0\.05–0\.5 mcg\/kg\/min/);
});

test("approved adult medical source PDFs are present and recognizable as PDFs", async () => {
  for (const path of [
    "am-01-allergic-reaction-anaphylaxis-protocol.pdf",
    "am-02-diabetic-adult-protocol.pdf",
    "am-03-dialysis-renal-failure-protocol.pdf",
    "am-04-hypertension-protocol.pdf",
    "am-05-hypotension-shock-protocol.pdf",
    "am-06-suspected-stroke-tnk-transfer-protocol.pdf",
    "am-07-crashing-patient-protocol.pdf",
  ]) {
    const pdf = new URL(`../public/protocols/claiborne/${path}`, import.meta.url);
    const [metadata, header] = await Promise.all([
      stat(pdf),
      readFile(pdf).then((content) => content.subarray(0, 5).toString("ascii")),
    ]);
    assert.ok(metadata.size > 20_000);
    assert.equal(header, "%PDF-");
  }
});
