export type ProtocolReviewStatus = "Draft" | "Reviewed" | "Approved";

export type ProtocolMedication = {
  name: string;
  dose: string;
  notes?: string[];
};

export type ProtocolSectionGroup = {
  title: string;
  items: string[];
};

export type ProviderLevel = "EMT" | "AEMT" | "Paramedic" | "Medical Control";

export type ProtocolFlowNode = {
  title: string;
  text: string;
  levels?: ProviderLevel[];
  tone?: "start" | "action" | "decision" | "urgent" | "transport";
};

export type ProtocolCareModule = {
  title: string;
  summary: string;
  levels: { level: ProviderLevel; actions: string[] }[];
};

export type StructuredProtocolContent = {
  id: string;
  title: string;
  categoryId: string;
  category: string;
  overview: string[];
  flow?: ProtocolFlowNode[];
  careModules?: ProtocolCareModule[];
  indications: string[];
  contraindications: string[];
  assessment: ProtocolSectionGroup[];
  treatmentSteps: string[];
  medications: ProtocolMedication[];
  warnings: string[];
  clinicalPearls: string[];
  specialPopulations: ProtocolSectionGroup[];
  references: string[];
  sourcePdf: string;
  sourcePages: { start: number; end: number };
  revisionDate: string;
  lastVerifiedDate: string;
  reviewStatus: ProtocolReviewStatus;
  reviewFlags: string[];
};

export type NativeProtocolSection = {
  id: string;
  title: string;
};

export const BETA_CLINICAL_DISCLAIMER =
  "This beta application is for evaluation and reference purposes only. Verify all clinical decisions against the current approved Claiborne County EMS protocols.";

export function getNativeProtocolSections(content: StructuredProtocolContent) {
  const sections: NativeProtocolSection[] = [];
  if (content.flow?.length) sections.push({ id: "quick-flow", title: "Quick Flow" });
  if (content.careModules?.length) sections.push({ id: "care-levels", title: "Care Levels" });
  if (content.overview.length) sections.push({ id: "overview", title: "Overview" });
  if (content.indications.length) sections.push({ id: "indications", title: "Indications" });
  if (content.contraindications.length) sections.push({ id: "contraindications", title: "Contraindications" });
  if (content.assessment.length) sections.push({ id: "assessment", title: "Assessment" });
  if (content.treatmentSteps.length) sections.push({ id: "treatment", title: "Treatment" });
  if (content.medications.length) sections.push({ id: "medications", title: "Medications" });
  if (content.warnings.length) sections.push({ id: "warnings", title: "Warnings" });
  if (content.clinicalPearls.length) sections.push({ id: "clinical-pearls", title: "Clinical Pearls" });
  if (content.specialPopulations.length) sections.push({ id: "special-populations", title: "Special Populations" });
  if (content.references.length) sections.push({ id: "references", title: "References" });
  sections.push({ id: "source", title: "Source Information" });
  return sections;
}

export function getProtocolReaderHref(categoryId: string, protocolId: string) {
  return `/protocols/${categoryId}/${protocolId}`;
}

export function getProtocolViewerHref(categoryId: string, protocolId: string) {
  return `${getProtocolReaderHref(categoryId, protocolId)}/viewer`;
}

export function getProtocolFallbackHref(categoryId: string) {
  return `/protocols/${categoryId}`;
}

export const PROTOCOL_HOME_HREF = "/";

export function shouldUseBrowserBack(historyLength: number) {
  return historyLength > 1;
}
