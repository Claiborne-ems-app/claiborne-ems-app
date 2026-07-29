import assert from "node:assert/strict";
import test from "node:test";
import {
  RECENTLY_VIEWED_LIMIT,
  normalizeRecentlyViewed,
  parseRecentlyViewed,
  recordRecentlyViewed,
  serializeRecentlyViewed,
} from "../lib/protocols/recently-viewed.ts";

test("serializes and parses valid recent protocol references", () => {
  const recentlyViewed = [
    { categoryId: "medical", protocolId: "cardiac-arrest", viewedAt: 2 },
    { categoryId: "trauma", protocolId: "trauma-assessment", viewedAt: 1 },
  ];

  assert.equal(
    serializeRecentlyViewed(recentlyViewed),
    '[{"categoryId":"medical","protocolId":"cardiac-arrest","viewedAt":2},{"categoryId":"trauma","protocolId":"trauma-assessment","viewedAt":1}]'
  );
  assert.deepEqual(parseRecentlyViewed(serializeRecentlyViewed(recentlyViewed)), recentlyViewed);
});

test("records protocols by recency without duplicates", () => {
  const existing = [
    { categoryId: "medical", protocolId: "cardiac-arrest", viewedAt: 1 },
    { categoryId: "trauma", protocolId: "trauma-assessment", viewedAt: 2 },
  ];

  assert.deepEqual(
    recordRecentlyViewed(
      existing,
      { categoryId: "medical", protocolId: "cardiac-arrest" },
      3
    ),
    [
      { categoryId: "medical", protocolId: "cardiac-arrest", viewedAt: 3 },
      { categoryId: "trauma", protocolId: "trauma-assessment", viewedAt: 2 },
    ]
  );
});

test("keeps only the three most recently viewed protocols", () => {
  const recentlyViewed = Array.from({ length: 4 }, (_, index) => ({
    categoryId: "medical",
    protocolId: `protocol-${index + 1}`,
    viewedAt: index + 1,
  }));

  const normalized = normalizeRecentlyViewed(recentlyViewed);

  assert.equal(normalized.length, RECENTLY_VIEWED_LIMIT);
  assert.equal(JSON.parse(serializeRecentlyViewed(recentlyViewed)).length, 3);
  assert.equal(normalized[0].protocolId, "protocol-4");
  assert.equal(normalized.at(-1)?.protocolId, "protocol-2");
});

test("migrates prior timestamps and safely ignores malformed storage values", () => {
  assert.deepEqual(
    parseRecentlyViewed(
      '[{"categoryId":"medical","protocolId":"cardiac-arrest","lastViewed":1}]'
    ),
    [{ categoryId: "medical", protocolId: "cardiac-arrest", viewedAt: 1 }]
  );
  assert.deepEqual(parseRecentlyViewed("not-json"), []);
  assert.deepEqual(parseRecentlyViewed('{"categoryId":"medical"}'), []);
  assert.deepEqual(
    parseRecentlyViewed(
      '[{"categoryId":"medical","protocolId":"cardiac-arrest","viewedAt":"now"}]'
    ),
    []
  );
});
