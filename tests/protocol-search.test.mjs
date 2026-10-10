import assert from "node:assert/strict";
import test from "node:test";
import { protocolCategories } from "../data/protocols.ts";
import { searchProtocols } from "../lib/protocols/search.ts";
import { getStructuredProtocol } from "../data/structured-protocols.ts";

test("finds a protocol from every category", () => {
  for (const category of protocolCategories) {
    const protocol = category.protocols[0];
    const results = searchProtocols(protocolCategories, protocol.title);

    assert.ok(
      results.some(
        (result) =>
          result.categoryId === category.id && result.protocol.id === protocol.id
      ),
      `${category.id}/${protocol.id}`
    );
  }
});

test("searches titles, codes, and categories with normalized input", () => {
  const medicalProtocol = protocolCategories[0].protocols[0];

  assert.ok(searchProtocols(protocolCategories, medicalProtocol.code).length > 0);
  assert.ok(searchProtocols(protocolCategories, "  MEDICAL  ").length > 0);
  assert.ok(searchProtocols(protocolCategories, "universal   patient care").length > 0);
  assert.equal(searchProtocols(protocolCategories, "PC-05")[0]?.protocol.id, "pc-05");
});

test("searches medications, flow charts, and provider-level actions", () => {
  assert.ok(
    searchProtocols(protocolCategories, "adenosine").some(
      (result) =>
        result.protocol.id === "pc-05" && result.matchLabel === "Medication"
    )
  );
  assert.ok(
    searchProtocols(protocolCategories, "high-quality CPR").some(
      (result) => result.matchLabel === "Flow chart or provider care"
    )
  );
});

test("expands common EMS abbreviations and medication brand names", () => {
  assert.ok(
    searchProtocols(protocolCategories, "AMS").some(
      (result) => result.protocol.id === "up-04"
    )
  );
  assert.ok(
    searchProtocols(protocolCategories, "Narcan").some(
      (result) => result.snippet?.toLowerCase().includes("naloxone")
    )
  );
  assert.ok(
    searchProtocols(protocolCategories, "SVT").some(
      (result) => result.protocol.id === "pc-05"
    )
  );
});

test("supports multi-term search across native protocol content", () => {
  assert.ok(
    searchProtocols(protocolCategories, "pediatric adenosine").some(
      (result) => result.protocol.id === "pc-05"
    )
  );
});

test("routes pediatric pain to PM-04 and never to UP-12 Police Custody", () => {
  const pediatricMedical = protocolCategories.find(
    (category) => category.id === "pm"
  );
  const pm04 = pediatricMedical?.protocols.find(
    (protocol) => protocol.id === "pm-04"
  );
  const up11 = getStructuredProtocol("up", "up-11");
  const pm04Content = getStructuredProtocol("pm", "pm-04");

  assert.equal(pm04?.title, "Pediatric Pain Control");
  assert.equal(
    pm04?.pdfPath,
    "/protocols/claiborne/pm-04-pediatric-pain-control-protocol.pdf"
  );
  assert.ok(
    up11?.actionLinks?.some(
      (link) => link.href === "/protocols/pm/pm-04"
    )
  );
  assert.doesNotMatch(JSON.stringify(up11), /UP-12 Pediatric Pain/i);
  assert.match(
    JSON.stringify(pm04Content),
    /Medical Control authorization is required before any second dose/i
  );
});

test("limits results and returns no results for empty queries", () => {
  assert.equal(searchProtocols(protocolCategories, "a", 12).length, 12);
  assert.deepEqual(searchProtocols(protocolCategories, "   "), []);
});
