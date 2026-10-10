import assert from "node:assert/strict";
import test from "node:test";
import { protocolCategories } from "../data/protocols.ts";
import { structuredProtocols } from "../data/structured-protocols.ts";
import {
  calculateAdminDashboardStats,
  createProtocolReviewInventory,
} from "../lib/admin/protocol-review-adapter.ts";
import { InMemoryReviewMetadataRepository } from "../lib/admin/review-repository.ts";

function inventory() {
  return createProtocolReviewInventory({
    categories: protocolCategories,
    getStructuredContent: (categoryId, protocolId) =>
      structuredProtocols.find(
        (content) =>
          content.categoryId === categoryId && content.id === protocolId
      ),
    reviewRepository: new InMemoryReviewMetadataRepository(),
    importDate: "July 2026",
  });
}

function protocolCount() {
  return protocolCategories.reduce(
    (total, category) => total + category.protocols.length,
    0,
  );
}

test("maps all cataloged Claiborne protocols to direct source PDFs", () => {
  const records = inventory();
  assert.equal(records.length, protocolCount());
  assert.equal(
    new Set(records.map((record) => record.sourcePdf)).size,
    protocolCount()
  );
  assert.ok(
    records.every((record) =>
      record.sourcePdf.startsWith("/protocols/claiborne/")
    )
  );
});

test("calculates dashboard metrics from the migrated inventory", () => {
  const records = inventory();
  const metrics = calculateAdminDashboardStats(records, "July 2026");
  assert.equal(metrics.totalProtocols, protocolCount());
  assert.equal(
    metrics.approved + metrics.inReview + metrics.notStarted,
    protocolCount()
  );
  assert.ok(metrics.approved >= 1);
});
