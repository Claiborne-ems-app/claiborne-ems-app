import assert from "node:assert/strict";
import test from "node:test";
import { adminProtocols } from "../data/admin-review.ts";
import { calculateProductionReleaseReadiness } from "../lib/admin/release-readiness.ts";

test("clinical release requires explicit approval for every protocol", () => {
  const ready = calculateProductionReleaseReadiness([
    { review: { status: "approved" } },
    { review: { status: "approved" } },
  ]);

  assert.equal(ready.pendingProtocols, 0);
  assert.equal(ready.clinicallyReady, true);
});

test("reviewed, in-review, and not-started protocols keep the clinical release gate closed", () => {
  const pending = calculateProductionReleaseReadiness([
    { review: { status: "approved" } },
    { review: { status: "reviewed" } },
    { review: { status: "in-review" } },
    { review: { status: "not-started" } },
  ]);

  assert.equal(pending.approved, 1);
  assert.equal(pending.reviewed, 1);
  assert.equal(pending.inReview, 1);
  assert.equal(pending.notStarted, 1);
  assert.equal(pending.pendingProtocols, 3);
  assert.equal(pending.clinicallyReady, false);
});

test("current Claiborne inventory remains beta-only until full approval is complete", () => {
  const readiness = calculateProductionReleaseReadiness(adminProtocols);

  assert.equal(readiness.totalProtocols, adminProtocols.length);
  assert.ok(readiness.approved > 0);
  assert.ok(readiness.pendingProtocols > 0);
  assert.equal(readiness.clinicallyReady, false);
});
