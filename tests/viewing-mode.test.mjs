import assert from "node:assert/strict";
import test from "node:test";
import { PDF_VIEWING_MODE_STORAGE_KEY, parsePdfViewingMode } from "../lib/protocols/viewing-mode.ts";

test("parses persisted viewing mode with a safe Protocol View fallback", () => {
  assert.equal(PDF_VIEWING_MODE_STORAGE_KEY, "claiborne-protocols:pdf-viewing-mode");
  assert.equal(parsePdfViewingMode("browser"), "browser");
  assert.equal(parsePdfViewingMode("protocol"), "protocol");
  assert.equal(parsePdfViewingMode("unexpected"), "protocol");
  assert.equal(parsePdfViewingMode(null), "protocol");
});
