import type { ReviewStatus } from "./review-types";

export type ReleaseReadinessProtocol = {
  review: {
    status: ReviewStatus;
  };
};

export type ProductionReleaseReadiness = {
  totalProtocols: number;
  approved: number;
  reviewed: number;
  inReview: number;
  notStarted: number;
  pendingProtocols: number;
  clinicallyReady: boolean;
};

/**
 * Production is clinically eligible only when every protocol in the review
 * inventory has an explicit Approved status. A source PDF merely existing is
 * not proof that its clinical content has completed the governance review.
 */
export function calculateProductionReleaseReadiness(
  protocols: ReleaseReadinessProtocol[],
): ProductionReleaseReadiness {
  const count = (status: ReviewStatus) =>
    protocols.filter((protocol) => protocol.review.status === status).length;

  const approved = count("approved");
  const reviewed = count("reviewed");
  const inReview = count("in-review");
  const notStarted = count("not-started");
  const pendingProtocols = reviewed + inReview + notStarted;

  return {
    totalProtocols: protocols.length,
    approved,
    reviewed,
    inReview,
    notStarted,
    pendingProtocols,
    clinicallyReady: protocols.length > 0 && pendingProtocols === 0,
  };
}
