import assert from "node:assert/strict";
import test from "node:test";
import { getProtocolPageLabel, getProtocolPagePositionLabel } from "../lib/protocols/page-range.ts";
import { PDF_VIEWING_MODE_STORAGE_KEY, parsePdfViewingMode } from "../lib/protocols/viewing-mode.ts";

test("parses persisted viewing mode with a safe Protocol View fallback", () => {
  assert.equal(PDF_VIEWING_MODE_STORAGE_KEY, "air-protocols:pdf-viewing-mode");
  assert.equal(parsePdfViewingMode("manual"), "manual");
  assert.equal(parsePdfViewingMode("protocol"), "protocol");
  assert.equal(parsePdfViewingMode("unexpected"), "protocol");
  assert.equal(parsePdfViewingMode(null), "protocol");
});

test("formats single-page and multi-page protocol metadata", () => {
  assert.equal(getProtocolPageLabel({ startPage: 120, endPage: 120 }), "PDF Page 120");
  assert.equal(getProtocolPageLabel({ startPage: 120, endPage: 122 }), "PDF Pages 120–122");
  assert.equal(getProtocolPagePositionLabel(2, 3), "Page 2 of 3");
  assert.throws(() => getProtocolPagePositionLabel(4, 3));
});
