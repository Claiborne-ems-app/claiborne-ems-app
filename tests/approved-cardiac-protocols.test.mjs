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

  for (const id of ["AC-01", "AC-02", "AC-03"]) {
    const protocol = catalog.find((item) => item.id === id);
    assert.equal(protocol?.status, "approved");
    assert.equal(protocol?.year, 2026);
    assert.equal(protocol?.source, "Claiborne County EMS Clinical Protocols");
    assert.match(tsCatalog, new RegExp(`"id": "${id}"[\\s\\S]*?"status": "approved"`));
  }

  assert.match(structured, /id: "ac-01"[\s\S]*?reviewStatus: "Approved"/);
  assert.match(structured, /id: "ac-02"[\s\S]*?reviewStatus: "Approved"/);
  assert.match(structured, /id: "ac-03"[\s\S]*?reviewStatus: "Approved"/);
});

test("approved adult cardiac source PDFs are present and recognizable as PDFs", async () => {
  for (const path of [
    "ac-02-bradycardia-pulse-present-protocol.pdf",
    "ac-03-cardiac-arrest-adult-protocol.pdf",
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
