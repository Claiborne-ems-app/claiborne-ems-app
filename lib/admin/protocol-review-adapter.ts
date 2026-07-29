import type { Category } from "../../data/protocols";
import type { StructuredProtocolContent } from "../protocols/structured-content";
import type { ReviewMetadataRepository } from "./review-repository";
import type {
  Protocol as AdminProtocol,
  ProtocolSection,
  ReviewMetadata,
  ReviewStatus,
} from "./review-types";

const sectionLabels: Record<ProtocolSection["id"], string> = {
  overview: "Overview",
  indications: "Indications",
  contraindications: "Contraindications",
  assessment: "Assessment",
  treatment: "Treatment",
  medications: "Medications",
  pearls: "Pearls",
  references: "References",
};

export type ProtocolReviewAdapterOptions = {
  categories: Category[];
  getStructuredContent: (categoryId: string, protocolId: string) => StructuredProtocolContent | undefined;
  reviewRepository: ReviewMetadataRepository;
  importDate: string;
};

export type AdminDashboardStats = {
  totalProtocols: number;
  approved: number;
  inReview: number;
  notStarted: number;
  lastImportDate: string;
};

function defaultReview(importDate: string): ReviewMetadata {
  return {
    status: "not-started",
    lastReviewed: null,
    lastEdited: importDate,
  };
}

function nativeReviewStatus(status: StructuredProtocolContent["reviewStatus"]): ReviewStatus {
  if (status === "Approved") return "approved";
  if (status === "Reviewed") return "reviewed";
  return "in-review";
}

function structuredReview(content: StructuredProtocolContent, importDate: string): ReviewMetadata {
  return {
    status: nativeReviewStatus(content.reviewStatus),
    lastReviewed: content.lastVerifiedDate || null,
    lastEdited: content.revisionDate || importDate,
  };
}

function sourcePdfPath(sourcePdf: string | undefined, fallback: string) {
  if (!sourcePdf) return fallback;
  return sourcePdf.startsWith("/") ? sourcePdf : `/protocols/${sourcePdf}`;
}

function groupedContent(groups: StructuredProtocolContent["assessment"]) {
  return groups.flatMap((group) => [group.title, ...group.items]);
}

function contentBySection(content: StructuredProtocolContent): Record<ProtocolSection["id"], string[]> {
  return {
    overview: content.overview,
    indications: content.indications,
    contraindications: [...content.contraindications, ...content.warnings],
    assessment: [...groupedContent(content.assessment), ...groupedContent(content.specialPopulations)],
    treatment: content.treatmentSteps,
    medications: content.medications.flatMap((medication) => [
      `${medication.name}: ${medication.dose}`,
      ...(medication.notes ?? []),
    ]),
    pearls: content.clinicalPearls,
    references: content.references,
  };
}

function createSections(
  protocolKey: string,
  content: StructuredProtocolContent,
  protocolReview: ReviewMetadata,
  repository: ReviewMetadataRepository,
): ProtocolSection[] {
  const values = contentBySection(content);

  return (Object.keys(sectionLabels) as ProtocolSection["id"][]).map((id) => ({
    id,
    title: sectionLabels[id],
    content: values[id],
    review: repository.getSectionReview(protocolKey, id) ?? protocolReview,
  }));
}

export function createProtocolReviewInventory({
  categories,
  getStructuredContent,
  reviewRepository,
  importDate,
}: ProtocolReviewAdapterOptions): AdminProtocol[] {
  return categories.flatMap((category) =>
    category.protocols.map((protocol) => {
      const protocolKey = `${category.id}/${protocol.id}`;
      const content = getStructuredContent(category.id, protocol.id);
      const review = reviewRepository.getProtocolReview(protocolKey)
        ?? (content ? structuredReview(content, importDate) : defaultReview(importDate));

      return {
        slug: `${category.id}--${protocol.id}`,
        protocolId: protocol.id,
        categoryId: category.id,
        code: protocol.code,
        title: protocol.title,
        category: category.title,
        sourcePdf: sourcePdfPath(content?.sourcePdf, protocol.pdfPath),
        sourcePage: content?.sourcePages.start ?? 1,
        importDate,
        review,
        sections: content ? createSections(protocolKey, content, review, reviewRepository) : [],
        hasStructuredContent: Boolean(content),
      };
    }),
  );
}

export function calculateAdminDashboardStats(
  protocols: AdminProtocol[],
  lastImportDate: string,
): AdminDashboardStats {
  const count = (status: ReviewStatus) =>
    protocols.filter((protocol) => protocol.review.status === status).length;

  return {
    totalProtocols: protocols.length,
    approved: count("approved"),
    inReview: count("in-review"),
    notStarted: count("not-started"),
    lastImportDate,
  };
}

export function getAdminProtocol(protocols: AdminProtocol[], slug: string) {
  return protocols.find((protocol) => protocol.slug === slug);
}
