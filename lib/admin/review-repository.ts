import type { ProtocolSection, ReviewMetadata } from "./review-types";

export interface ReviewMetadataRepository {
  getProtocolReview(protocolKey: string): ReviewMetadata | undefined;
  getSectionReview(protocolKey: string, sectionId: ProtocolSection["id"]): ReviewMetadata | undefined;
}

type InMemoryReviewRecords = {
  protocols?: Record<string, ReviewMetadata>;
  sections?: Record<string, Partial<Record<ProtocolSection["id"], ReviewMetadata>>>;
};

export class InMemoryReviewMetadataRepository implements ReviewMetadataRepository {
  private readonly records: InMemoryReviewRecords;

  constructor(records: InMemoryReviewRecords = {}) {
    this.records = records;
  }

  getProtocolReview(protocolKey: string) {
    return this.records.protocols?.[protocolKey];
  }

  getSectionReview(protocolKey: string, sectionId: ProtocolSection["id"]) {
    return this.records.sections?.[protocolKey]?.[sectionId];
  }
}

export function createDefaultReviewMetadata(importDate: string): ReviewMetadata {
  return {
    status: "not-started",
    lastReviewed: null,
    lastEdited: importDate,
  };
}

export const reviewMetadataRepository: ReviewMetadataRepository =
  new InMemoryReviewMetadataRepository();
