import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

import catalog from "../src/data/claiborne-protocols.json" with { type: "json" };
import { structuredToxicologyEnvironmentalProtocols } from "../data/structured-toxicology-environmental-protocols.ts";

test("TE-01 is released as approved Claiborne content and TE-06 is absent", () => {
  const te01 = catalog.find((item) => item.id === "TE-01");
  assert.equal(te01?.title, "Bites and Envenomations");
  assert.equal(te01?.status, "approved");
  assert.equal(te01?.source, "Claiborne County EMS Clinical Protocols");
  assert.equal(catalog.some((item) => item.id === "TE-06"), false);
});

test("TE-01 retains approved snake-bite and rabies safeguards", () => {
  const te01 = structuredToxicologyEnvironmentalProtocols.find((item) => item.id === "te-01");
  assert.equal(te01?.reviewStatus, "Approved");
  assert.match(te01?.flow.find((node) => node.title === "Snake Bite?")?.text ?? "", /heart level.*Poison Help/i);
  assert.match(te01?.warnings.join(" ") ?? "", /Do not capture or transport a snake/i);
  assert.match(te01?.warnings.join(" ") ?? "", /Do not apply ice/i);
});

test("approved TE-01 direct source PDF is present and recognizable", async () => {
  const pdf = new URL("../public/protocols/claiborne/te-01-bites-and-envenomations-protocol.pdf", import.meta.url);
  const [header, metadata] = await Promise.all([
    readFile(pdf),
    stat(pdf),
  ]);
  assert.equal(header.subarray(0, 5).toString("ascii"), "%PDF-");
  assert.ok(metadata.size > 20_000);
});

test("TE-02 is released as approved Claiborne content without a field cyanide-antidote dose", () => {
  const te02 = catalog.find((item) => item.id === "TE-02");
  const structured = structuredToxicologyEnvironmentalProtocols.find((item) => item.id === "te-02");
  assert.equal(te02?.title, "Carbon Monoxide / Cyanide Exposure");
  assert.equal(te02?.status, "approved");
  assert.equal(te02?.source, "Claiborne County EMS Clinical Protocols");
  assert.equal(structured?.reviewStatus, "Approved");
  assert.match(structured?.flow.find((node) => node.title === "Consult + Early Alert")?.text ?? "", /Poison Help.*not stock a cyanide antidote/i);
  assert.doesNotMatch(JSON.stringify(structured), /70\s*mg\s*\/\s*kg/i);
});

test("approved TE-02 direct source PDF is present and recognizable", async () => {
  const pdf = new URL("../public/protocols/claiborne/te-02-carbon-monoxide-cyanide-protocol.pdf", import.meta.url);
  const [header, metadata] = await Promise.all([readFile(pdf), stat(pdf)]);
  assert.equal(header.subarray(0, 5).toString("ascii"), "%PDF-");
  assert.ok(metadata.size > 20_000);
});
