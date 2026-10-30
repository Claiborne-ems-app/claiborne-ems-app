import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("TB-10 is an approved Claiborne traumatic-arrest protocol in both catalogs", async () => {
  const [jsonCatalog, tsCatalog, structured] = await Promise.all([
    read("src/data/claiborne-protocols.json"),
    read("src/data/claiborneProtocols.ts"),
    read("data/structured-trauma-protocols.ts"),
  ]);
  const catalog = JSON.parse(jsonCatalog);
  const protocol = catalog.find((item) => item.id === "TB-10");

  assert.equal(protocol?.status, "approved");
  assert.equal(protocol?.year, 2026);
  assert.equal(protocol?.source, "Claiborne County EMS Clinical Protocols");
  assert.match(tsCatalog, /"id": "TB-10"[\s\S]*?"status": "approved"/);
  assert.match(structured, /id: "tb-10"[\s\S]*?reviewStatus: "Approved"/);
});

test("TB-10 uses the approved Claiborne withholding and Paramedic-only decompression safeguards", async () => {
  const structured = await read("data/structured-trauma-protocols.ts");

  assert.match(structured, /id: "tb-10"[\s\S]*?Do not use downtime alone as a withholding rule/);
  assert.match(structured, /id: "tb-10"[\s\S]*?Do not perform chest decompression; assist the Paramedic/);
  assert.match(structured, /id: "tb-10"[\s\S]*?Chest decompression is Paramedic-only under the current Tennessee statewide protocol guidelines/);
  assert.match(structured, /id: "tb-10"[\s\S]*?lightning strike, drowning, or hypothermic arrest/);
  assert.match(structured, /id: "tb-10"[\s\S]*?age-appropriate medical cardiac-arrest pathway/);
  assert.match(structured, /id: "tb-10"[\s\S]*?PC-04 Pediatric Pulseless Arrest/);
  assert.match(structured, /id: "tb-10"[\s\S]*?For ADULT clearly traumatic arrest, do not routinely give epinephrine/);
});

test("approved TB-10 source PDF is present and recognizable as a Claiborne PDF", async () => {
  const pdf = new URL("../public/protocols/claiborne/tb-10-traumatic-arrest-protocol.pdf", import.meta.url);
  const [metadata, header] = await Promise.all([
    stat(pdf),
    readFile(pdf).then((content) => content.subarray(0, 5).toString("ascii")),
  ]);

  assert.ok(metadata.size > 20_000);
  assert.equal(header, "%PDF-");
});
