import assert from "node:assert/strict";
import test from "node:test";
import { protocolCategories } from "../data/protocols.ts";
import { searchCategoryProtocols } from "../lib/protocols/category-search.ts";

const medications = protocolCategories.find((category) => category.id === "medications").protocols;

test("medication search normalizes whitespace and finds exact title and code matches", () => {
  assert.equal(searchCategoryProtocols(medications, "  droperidol ")[0]?.title, "Droperidol");
  assert.equal(searchCategoryProtocols(medications, "med-  12")[0]?.code, "MED-12");
  assert.deepEqual(searchCategoryProtocols(medications, "no such medication"), []);
});
