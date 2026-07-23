import assert from "node:assert/strict";
import test from "node:test";
import {
  OPERATIONS_RECENT_PAGES_LIMIT,
  normalizeRecentOperationsPages,
  parseRecentOperationsPages,
  recordRecentOperationsPage,
  serializeRecentOperationsPages,
} from "../lib/operations/recent-pages.ts";

test("stores the ten most recently viewed unique manual pages", () => {
  const pages = Array.from({ length: 12 }, (_, index) => ({ page: index + 1, viewedAt: index + 1 }));
  const normalized = normalizeRecentOperationsPages(pages);
  assert.equal(normalized.length, OPERATIONS_RECENT_PAGES_LIMIT);
  assert.deepEqual(normalized.map((entry) => entry.page), [12, 11, 10, 9, 8, 7, 6, 5, 4, 3]);
});

test("moves a revisited page to the front without duplicating it", () => {
  assert.deepEqual(recordRecentOperationsPage([{ page: 4, viewedAt: 1 }, { page: 8, viewedAt: 2 }], 4, 3), [
    { page: 4, viewedAt: 3 },
    { page: 8, viewedAt: 2 },
  ]);
});

test("round trips valid history and ignores malformed storage", () => {
  const pages = [{ page: 17, viewedAt: 2 }];
  assert.deepEqual(parseRecentOperationsPages(serializeRecentOperationsPages(pages)), pages);
  assert.deepEqual(parseRecentOperationsPages("not-json"), []);
  assert.deepEqual(parseRecentOperationsPages('[{"page":0,"viewedAt":1}]'), []);
});
