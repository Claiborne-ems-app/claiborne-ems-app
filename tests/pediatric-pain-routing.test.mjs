import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("UP-11 routes pediatric patients to PM-04, never to UP-12 Police Custody", async () => {
  const [up11Source, pm04Source, catalogSource] = await Promise.all([
    read("data/structured-protocols.ts"),
    read("data/structured-pediatric-medical-protocols.ts"),
    read("src/data/claiborne-protocols.json"),
  ]);
  const catalog = JSON.parse(catalogSource);
  const pm04 = catalog.find((protocol) => protocol.id === "PM-04");

  assert.doesNotMatch(up11Source, /UP-12 Pediatric Pain/i);
  assert.match(up11Source, /href: "\/protocols\/pm\/pm-04"/);
  assert.match(
    up11Source,
    /Do not use UP-11 for patients younger than 16 years\. Open PM-04 Pediatric Pain Control/
  );
  assert.equal(pm04?.title, "Pediatric Pain Control");
  assert.equal(
    pm04?.pdfPath,
    "/protocols/claiborne/pm-04-pediatric-pain-control-protocol.pdf"
  );
  assert.match(pm04Source, /15 mg\/kg PO once; maximum 650 mg/);
  assert.match(pm04Source, /10 mg\/kg PO once; maximum 400 mg/);
  assert.match(
    pm04Source,
    /1 mcg\/kg slow IV\/IO once; maximum 50 mcg/
  );
  assert.match(
    pm04Source,
    /Medical Control authorization is required before any second dose/
  );
});

test("pain references in UP-03, UP-05, and UP-07 use the approved age-based pathway", async () => {
  const source = await read("data/structured-protocols.ts");

  for (const id of ["up-03", "up-05", "up-07"]) {
    const start = source.indexOf(`id: "${id}"`);
    const end = source.indexOf("\n  {\n    id:", start + 1);
    const protocolSource = source.slice(start, end === -1 ? undefined : end);

    assert.ok(start >= 0, `${id} should exist`);
    assert.match(protocolSource, /PM-04 Pediatric Pain Control/);
    assert.match(protocolSource, /patients younger than 2 years.*Medical Control/i);
  }

  assert.doesNotMatch(source, /Use pediatric analgesic dosing from UP-11/i);
});

test("UP-11 catalog points to the reconciled approved three-page PDF", async () => {
  const catalog = JSON.parse(await read("src/data/claiborne-protocols.json"));
  const up11 = catalog.find((protocol) => protocol.id === "UP-11");

  assert.equal(up11?.pages, 3);
  assert.equal(up11?.year, 2026);
  assert.equal(up11?.source, "Claiborne County EMS Clinical Protocols");
  assert.equal(up11?.status, "approved");
});

test("PM-04 source PDF is present and recognizable as a PDF", async () => {
  const pdf = new URL(
    "../public/protocols/claiborne/pm-04-pediatric-pain-control-protocol.pdf",
    import.meta.url
  );
  const [metadata, header] = await Promise.all([
    stat(pdf),
    readFile(pdf).then((content) => content.subarray(0, 5).toString("ascii")),
  ]);

  assert.ok(metadata.size > 10_000);
  assert.equal(header, "%PDF-");
});

test("UP-11 reconciled PDF is present and recognizable as a PDF", async () => {
  const pdf = new URL(
    "../public/protocols/claiborne/up-11-pain-control-adult-protocol.pdf",
    import.meta.url
  );
  const [metadata, header] = await Promise.all([
    stat(pdf),
    readFile(pdf).then((content) => content.subarray(0, 5).toString("ascii")),
  ]);

  assert.ok(metadata.size > 40_000);
  assert.equal(header, "%PDF-");
});
