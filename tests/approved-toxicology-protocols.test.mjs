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

test("TE-03 through TE-09 are released as approved Claiborne content", () => {
  const expected = ["TE-03", "TE-04", "TE-05", "TE-07", "TE-08", "TE-09"];
  for (const id of expected) {
    const item = catalog.find((protocol) => protocol.id === id);
    assert.equal(item?.status, "approved", `${id} should be approved`);
    assert.equal(item?.source, "Claiborne County EMS Clinical Protocols", `${id} should have a Claiborne source`);
    assert.equal(item?.year, 2026, `${id} should have a 2026 source`);
  }
});

test("approved TE-03 through TE-09 direct source PDFs are present and recognizable", async () => {
  const files = [
    "te-03-drowning-submersion-injury-protocol.pdf",
    "te-04-hyperthermia-protocol.pdf",
    "te-05-hypothermia-protocol.pdf",
    "te-07-overdose-toxic-ingestion-protocol.pdf",
    "te-08-wmd-nerve-agent-protocol.pdf",
    "te-09-chemical-hazmat-exposure-protocol.pdf",
  ];
  for (const file of files) {
    const pdf = new URL(`../public/protocols/claiborne/${file}`, import.meta.url);
    const [header, metadata] = await Promise.all([readFile(pdf), stat(pdf)]);
    assert.equal(header.subarray(0, 5).toString("ascii"), "%PDF-", `${file} needs a PDF header`);
    assert.ok(metadata.size > 20_000, `${file} should be a substantive direct source PDF`);
  }
});

test("remaining approved TE content preserves the key safety boundaries", () => {
  const te04 = structuredToxicologyEnvironmentalProtocols.find((item) => item.id === "te-04");
  const te05 = structuredToxicologyEnvironmentalProtocols.find((item) => item.id === "te-05");
  const te07 = structuredToxicologyEnvironmentalProtocols.find((item) => item.id === "te-07");
  const te08 = structuredToxicologyEnvironmentalProtocols.find((item) => item.id === "te-08");
  assert.match(te04?.flow.find((node) => node.title === "Cool to below 102°F")?.text ?? "", /below 102°F/i);
  assert.match(te05?.flow.find((node) => node.title === "Hypothermic Arrest / Transport")?.text ?? "", /defibrillate once.*defer further shocks and epinephrine/i);
  assert.doesNotMatch(JSON.stringify(te07), /Glucagon|2-4 mg|0\.1 mg\/kg/i);
  assert.match(JSON.stringify(te08), /do not carry a CHEMPACK, Mark I, or equivalent atropine\/pralidoxime field kit/i);
  assert.doesNotMatch(JSON.stringify(te08), /600\s*mg|three kits|two kits/i);
});
