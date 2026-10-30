import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("TB-11 and TB-12 are approved Claiborne protocols in both catalogs", async () => {
  const [jsonCatalog, tsCatalog, eye, abdominalPelvic] = await Promise.all([
    read("src/data/claiborne-protocols.json"),
    read("src/data/claiborneProtocols.ts"),
    read("data/structured-eye-trauma-additions.ts"),
    read("data/structured-abdominal-pelvic-trauma-additions.ts"),
  ]);
  const catalog = JSON.parse(jsonCatalog);

  for (const id of ["TB-11", "TB-12"]) {
    const protocol = catalog.find((item) => item.id === id);
    assert.equal(protocol?.status, "approved");
    assert.equal(protocol?.year, 2026);
    assert.equal(protocol?.source, "Claiborne County EMS Clinical Protocols");
    assert.ok(tsCatalog.includes(`"id": "${id}"`));
  }

  assert.match(eye, /id: "tb-11"[\s\S]*?reviewStatus: "Approved"/);
  assert.match(abdominalPelvic, /id: "tb-12"[\s\S]*?reviewStatus: "Approved"/);
});

test("TB-11 retains approved eye-protection and chemical-irrigation safeguards", async () => {
  const eye = await read("data/structured-eye-trauma-additions.ts");

  assert.match(eye, /start immediate gentle copious irrigation through handoff/i);
  assert.match(eye, /No pressure, manipulation, irrigation, drops, or object removal/);
  assert.match(eye, /Do not use ketamine for analgesia in suspected penetrating or open-globe eye trauma/);
  assert.match(eye, /Do not patch either eye/);
});

test("TB-12 includes perfusion-directed adult resuscitation and Paramedic-only trauma TXA", async () => {
  const abdominalPelvic = await read("data/structured-abdominal-pelvic-trauma-additions.ts");

  assert.match(abdominalPelvic, /warmed isotonic crystalloid titrated to adult perfusion when blood is unavailable/);
  assert.match(abdominalPelvic, /target adult SBP at least 110 mmHg/);
  assert.doesNotMatch(abdominalPelvic, /1 L IV\/IO/);
  assert.match(abdominalPelvic, /Trauma TXA is Paramedic-only/);
  assert.match(abdominalPelvic, /Adult dose: 1–2 g IV\/IO/);
  assert.doesNotMatch(abdominalPelvic, /approved Claiborne TXA pathway/);
  assert.match(abdominalPelvic, /greater trochanters/);
});

test("approved TB-11 and TB-12 direct PDFs are present and recognizable as Claiborne PDFs", async () => {
  for (const relativePath of [
    "public/protocols/claiborne/tb-11-eye-trauma-protocol.pdf",
    "public/protocols/claiborne/tb-12-abdominal-pelvic-trauma-protocol.pdf",
  ]) {
    const pdf = new URL(`../${relativePath}`, import.meta.url);
    const [metadata, header] = await Promise.all([
      stat(pdf),
      readFile(pdf).then((content) => content.subarray(0, 5).toString("ascii")),
    ]);

    assert.ok(metadata.size > 20_000);
    assert.equal(header, "%PDF-");
  }
});
