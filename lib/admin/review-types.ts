export type ReviewStatus = "approved" | "reviewed" | "in-review" | "not-started" | "rejected";

export interface ReviewMetadata {
  status: ReviewStatus;
  lastReviewed: string | null;
  lastEdited: string | null;
  reviewer?: string;
}

export interface ProtocolSection {
  id:
    | "overview"
    | "indications"
    | "contraindications"
    | "assessment"
    | "treatment"
    | "medications"
    | "pearls"
    | "references";
  title: string;
  content: string[];
  review: ReviewMetadata;
}

export interface Protocol {
  slug: string;
  protocolId: string;
  categoryId: string;
  code: string;
  title: string;
  category: string;
  sourcePdf: string;
  sourcePage?: number;
  importDate: string;
  review: ReviewMetadata;
  sections: ProtocolSection[];
  hasStructuredContent: boolean;
}
