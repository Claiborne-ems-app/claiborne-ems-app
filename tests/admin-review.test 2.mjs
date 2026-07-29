import assert from "node:assert/strict";
import test from "node:test";
import { protocolCategories } from "../data/protocols.ts";
import { structuredProtocols } from "../data/structured-protocols.ts";
import {
  calculateAdminDashboardStats,
  createProtocolReviewInventory,
  getAdminProtocol,
} from "../lib/admin/protocol-review-adapter.ts";
import { InMemoryReviewMetadataRepository } from "../lib/admin/review-repository.ts";

const importDate = "July 2026";
const sourcePdf = "/protocols/covenant-health-air-protocols.pdf";

function inventory(contents = structuredProtocols) {
  return createProtocolReviewInventory({
    categories: protocolCategories,
    getStructuredContent: (categoryId, protocolId) => contents.find(
      (content) => content.categoryId === categoryId && content.id === protocolId,
    ),
    reviewRepository: new InMemoryReviewMetadataRepository(),
    importDate,
    defaultSourcePdf: sourcePdf,
  });
}

test("maps every real imported protocol to one unique admin review record", () => {
  const records = inventory();
  const importedCount = protocolCategories.reduce(
    (total, category) => total + category.protocols.length,
    0,
  );

  assert.equal(records.length, importedCount);
  assert.equal(new Set(records.map((record) => record.slug)).size, importedCount);
  assert.ok(records.every((record) => record.title && record.category && record.code));
});

test("category-qualified slugs distinguish duplicate protocol IDs", () => {
  const records = inventory();
  const universalRecords = records.filter(
    (record) => record.protocolId === "universal-patient-care",
  );

  assert.ok(universalRecords.length > 1);
  assert.deepEqual(
    new Set(universalRecords.map((record) => record.slug)),
    new Set([
      "medical--universal-patient-care",
      "pediatrics--universal-patient-care",
      "obstetrics--universal-patient-care",
    ]),
  );
});

test("defaults protocols without structured content to Not Started", () => {
  const record = inventory().find((protocol) => protocol.slug === "medical--medical-assessment");

  assert.ok(record);
  assert.equal(record.hasStructuredContent, false);
  assert.equal(record.review.status, "not-started");
  assert.equal(record.review.lastReviewed, null);
  assert.equal(record.review.lastEdited, importDate);
  assert.deepEqual(record.sections, []);
});

test("maps real structured Draft content to In Review without inferring approval", () => {
  const record = inventory().find((protocol) => protocol.slug === "medical--universal-patient-care");

  assert.ok(record);
  assert.equal(record.hasStructuredContent, true);
  assert.equal(record.review.status, "in-review");
  assert.deepEqual(
    record.sections.map((section) => section.id),
    [
      "overview",
      "indications",
      "contraindications",
      "assessment",
      "treatment",
      "medications",
      "pearls",
      "references",
    ],
  );
  assert.ok(record.sections.find((section) => section.id === "assessment")?.content.length);
});

test("preserves explicit Reviewed and Approved native states", () => {
  const source = structuredProtocols[0];
  const reviewed = inventory([{ ...source, reviewStatus: "Reviewed" }])[0];
  const approved = inventory([{ ...source, reviewStatus: "Approved" }])[0];

  assert.equal(reviewed.review.status, "reviewed");
  assert.equal(approved.review.status, "approved");
});

test("uses structured or inventory source PDF pages without fabricating content", () => {
  const records = inventory();
  const structured = records.find((protocol) => protocol.slug === "medical--universal-patient-care");
  const pdfOnly = records.find((protocol) => protocol.slug === "medical--medical-assessment");

  assert.equal(structured?.sourcePdf, sourcePdf);
  assert.equal(structured?.sourcePage, 15);
  assert.equal(pdfOnly?.sourcePdf, sourcePdf);
  assert.equal(pdfOnly?.sourcePage, 16);
  assert.equal(pdfOnly?.sections.length, 0);
  assert.ok(records.every((protocol) => /^\/[^#?]+\.pdf$/.test(protocol.sourcePdf)));
});

test("calculates dashboard metrics from mapped inventory statuses", () => {
  const records = inventory();
  const metrics = calculateAdminDashboardStats(records, importDate);

  assert.equal(metrics.totalProtocols, records.length);
  assert.equal(metrics.inReview, 1);
  assert.equal(metrics.approved, 0);
  assert.equal(metrics.notStarted, records.length - 1);
  assert.equal(metrics.lastImportDate, importDate);
});

test("dashboard status metrics are derived from record states", () => {
  const source = inventory().slice(0, 4);
  const records = source.map((record, index) => ({
    ...record,
    review: {
      ...record.review,
      status: ["approved", "in-review", "not-started", "reviewed"][index],
    },
  }));
  const metrics = calculateAdminDashboardStats(records, importDate);

  assert.deepEqual(metrics, {
    totalProtocols: 4,
    approved: 1,
    inReview: 1,
    notStarted: 1,
    lastImportDate: importDate,
  });
});

test("looks up category-qualified review slugs and rejects unknown slugs", () => {
  const records = inventory();
  const record = getAdminProtocol(records, "pediatrics--universal-patient-care");

  assert.equal(record?.categoryId, "pediatrics");
  assert.equal(record?.protocolId, "universal-patient-care");
  assert.equal(getAdminProtocol(records, "unknown--protocol"), undefined);
});
