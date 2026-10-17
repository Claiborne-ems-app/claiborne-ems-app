import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("approved adult obstetrics protocols are reconciled in both catalogs", async () => {
  const [jsonCatalog, tsCatalog, structured] = await Promise.all([
    read("src/data/claiborne-protocols.json"),
    read("src/data/claiborneProtocols.ts"),
    read("data/structured-obstetrics-protocols.ts"),
  ]);
  const catalog = JSON.parse(jsonCatalog);

  for (const id of ["AO-01", "AO-02", "AO-03"]) {
    const protocol = catalog.find((item) => item.id === id);
    assert.equal(protocol?.status, "approved");
    assert.equal(protocol?.year, 2026);
    assert.equal(protocol?.source, "Claiborne County EMS Clinical Protocols");
    assert.match(tsCatalog, new RegExp(`"id": "${id}"[\\s\\S]*?"status": "approved"`));
  }

  for (const id of ["ao-01", "ao-02", "ao-03"]) {
    assert.match(structured, new RegExp(`id: "${id}"[\\s\\S]*?reviewStatus: "Approved"`));
  }
});

test("AO release removes imported-state references and reconciles key safety decisions", async () => {
  const structured = await read("data/structured-obstetrics-protocols.ts");

  assert.doesNotMatch(structured, /Tennessee EMS scope of practice/i);
  assert.doesNotMatch(structured, /Postpartum Oxytocin|Oxytocin 10 IU|administer oxytocin/i);
  assert.match(structured, /2 minutes: 65–70%; 3 minutes: 70–75%; 4 minutes: 75–80%/);
  assert.match(structured, /AO-02 does not include a neonatal D10 dose/);
  assert.match(structured, /Do not use AM-04's undifferentiated-CVA labetalol standing order for pregnancy-related hypertension/);
  assert.match(structured, /4–6 g IV over 20–30 minutes, then 1–2 g\/hr infusion/);
});

test("approved adult obstetrics source PDFs are present and recognizable as PDFs", async () => {
  for (const path of [
    "ao-01-childbirth-labor-protocol.pdf",
    "ao-02-newly-born-protocol.pdf",
    "ao-03-ob-gyn-emergency-protocol.pdf",
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
