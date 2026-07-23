import assert from "node:assert/strict";
import test from "node:test";
import {
  normalizeFavorites,
  parseFavorites,
  serializeFavorites,
} from "../lib/protocols/favorites.ts";

test("serializes stable favorite references without duplicates", () => {
  const favorites = [
    { categoryId: "medical", protocolId: "cardiac-arrest" },
    { categoryId: "medical", protocolId: "cardiac-arrest" },
    { categoryId: "trauma", protocolId: "trauma-assessment" },
  ];

  assert.deepEqual(normalizeFavorites(favorites), [
    { categoryId: "medical", protocolId: "cardiac-arrest" },
    { categoryId: "trauma", protocolId: "trauma-assessment" },
  ]);
  assert.equal(
    serializeFavorites(favorites),
    '[{"categoryId":"medical","protocolId":"cardiac-arrest"},{"categoryId":"trauma","protocolId":"trauma-assessment"}]'
  );
});

test("parses valid storage and safely ignores malformed values", () => {
  assert.deepEqual(
    parseFavorites('[{"categoryId":"medical","protocolId":"cardiac-arrest"}]'),
    [{ categoryId: "medical", protocolId: "cardiac-arrest" }]
  );
  assert.deepEqual(parseFavorites("not-json"), []);
  assert.deepEqual(parseFavorites('{"categoryId":"medical"}'), []);
});
