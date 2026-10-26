import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

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
