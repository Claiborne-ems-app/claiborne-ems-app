import assert from "node:assert/strict";
import test from "node:test";
import { protocolCategories } from "../data/protocols.ts";
import { getProtocolPdfUrl } from "../lib/protocols/pdf-url.ts";

test("creates the expected PDF URL for every imported protocol", () => {
  for (const category of protocolCategories) {
    for (const protocol of category.protocols) {
      assert.match(protocol.code, /^[A-Z]+-\d+$/);
      assert.equal(
        getProtocolPdfUrl(protocol.startPage),
        `/protocols/covenant-health-air-protocols.pdf#page=${protocol.startPage}`,
        `${category.id}/${protocol.id}`
      );
    }
  }
});

test("rejects invalid PDF page numbers", () => {
  assert.throws(() => getProtocolPdfUrl(0));
  assert.throws(() => getProtocolPdfUrl(1.5));
});
