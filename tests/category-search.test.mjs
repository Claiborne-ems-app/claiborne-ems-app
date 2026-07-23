import assert from "node:assert/strict";
import test from "node:test";
import { protocolCategories } from "../data/protocols.ts";
import { searchCategoryProtocols } from "../lib/protocols/category-search.ts";

const adultCardiac = protocolCategories.find(
  (category) => category.id === "ac"
).protocols;

test("category search normalizes whitespace and finds title and code matches", () => {
  assert.equal(
    searchCategoryProtocols(adultCardiac, "  bradycardia ")[0]?.id,
    "ac-02"
  );
  assert.equal(searchCategoryProtocols(adultCardiac, "ac  12")[0]?.id, "ac-12");
  assert.deepEqual(searchCategoryProtocols(adultCardiac, "no such protocol"), []);
});
