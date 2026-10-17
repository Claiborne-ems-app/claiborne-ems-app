import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("approved adult cardiac protocols are marked approved in both catalogs", async () => {
  const [jsonCatalog, tsCatalog, structured] = await Promise.all([
    read("src/data/claiborne-protocols.json"),
    read("src/data/claiborneProtocols.ts"),
    read("data/structured-protocols.ts"),
  ]);
  const catalog = JSON.parse(jsonCatalog);

  for (const id of [
    "AC-01", "AC-02", "AC-03", "AC-04", "AC-05", "AC-06", "AC-07",
    "AC-08", "AC-09", "AC-10", "AC-11", "AC-12", "AC-13", "AC-14",
    "AC-15", "AC-16",
  ]) {
    const protocol = catalog.find((item) => item.id === id);
    assert.equal(protocol?.status, "approved");
    assert.equal(protocol?.year, 2026);
    assert.equal(protocol?.source, "Claiborne County EMS Clinical Protocols");
    assert.match(tsCatalog, new RegExp(`"id": "${id}"[\\s\\S]*?"status": "approved"`));
  }

  for (const id of [
    "ac-01", "ac-02", "ac-03", "ac-04", "ac-05", "ac-06", "ac-07",
    "ac-08", "ac-09", "ac-10", "ac-11", "ac-12", "ac-13", "ac-14",
    "ac-15", "ac-16",
  ]) {
    assert.match(structured, new RegExp(`id: "${id}"[\\s\\S]*?reviewStatus: "Approved"`));
  }
});

test("approved adult cardiac source PDFs are present and recognizable as PDFs", async () => {
  for (const path of [
    "ac-02-bradycardia-pulse-present-protocol.pdf",
    "ac-03-cardiac-arrest-adult-protocol.pdf",
    "ac-04-chest-pain-and-stemi-protocol.pdf",
    "ac-05-chf-pulmonary-edema-protocol.pdf",
    "ac-06-adult-tachycardia-narrow-protocol.pdf",
    "ac-07-adult-tachycardia-monomorphic-wide-protocol.pdf",
    "ac-08-adult-tachycardia-polymorphic-wide-protocol.pdf",
    "ac-09-vf-pulseless-vt-protocol.pdf",
    "ac-10-post-resuscitation-protocol.pdf",
    "ac-11-team-focused-cpr-protocol.pdf",
    "ac-12-termination-of-cpr-protocol.pdf",
    "ac-13-targeted-temperature-management-protocol.pdf",
    "ac-14-lvad-emergency-protocol.pdf",
    "ac-15-total-mechanic-circulation-protocol.pdf",
    "ac-16-wearable-cardioverter-defibrillator-vest-protocol.pdf",
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

test("AC-06 contains the approved Cardizem-shortage AF/flutter alternative", async () => {
  const [structured, medicationReference] = await Promise.all([
    read("data/structured-protocols.ts"),
    read("data/medication-reference.ts"),
  ]);

  assert.match(structured, /id: "ac-06"[\s\S]*?Metoprolol - Cardizem shortage alternative/);
  assert.match(structured, /2\.5–5 mg IV push over 1 minute every 10 minutes; maximum 3 doses or 15 mg/);
  assert.match(structured, /Do not independently combine or sequence diltiazem and metoprolol/);
  assert.match(medicationReference, /AF\/flutter with RVR during Cardizem shortage/);
});
