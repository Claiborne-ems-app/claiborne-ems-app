import assert from "node:assert/strict";
import test from "node:test";
import { protocolCategories } from "../data/protocols.ts";
import { searchProtocols } from "../lib/protocols/search.ts";

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
});

test("limits results and returns no results for empty queries", () => {
  assert.equal(searchProtocols(protocolCategories, "a", 12).length, 12);
  assert.deepEqual(searchProtocols(protocolCategories, "   "), []);
});
