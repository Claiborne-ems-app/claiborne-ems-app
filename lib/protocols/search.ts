import type { Category, Protocol } from "../../data/protocols";
import { getStructuredProtocol } from "../../data/structured-protocols";

export type ProtocolSearchResult = {
  categoryId: string;
  categoryTitle: string;
  protocol: Protocol;
  matchLabel?: string;
  snippet?: string;
};

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function structuredSearchText(categoryId: string, protocolId: string) {
  const content = getStructuredProtocol(categoryId, protocolId);
  if (!content) return "";

  return [
    ...content.overview,
    ...content.indications,
    ...content.contraindications,
    ...content.assessment.flatMap((group) => [group.title, ...group.items]),
    ...content.treatmentSteps,
    ...content.medications.flatMap((medication) => [medication.name, medication.dose, ...(medication.notes ?? [])]),
    ...content.warnings,
    ...content.clinicalPearls,
    ...content.specialPopulations.flatMap((group) => [group.title, ...group.items]),
    ...content.references,
  ].join(" ");
}

function findSnippet(text: string, query: string) {
  const collapsed = text.replace(/\s+/g, " ").trim();
  const index = collapsed.toLowerCase().indexOf(query.toLowerCase());
  if (index < 0) return undefined;
  const start = Math.max(0, index - 55);
  const end = Math.min(collapsed.length, index + query.length + 95);
  return `${start > 0 ? "…" : ""}${collapsed.slice(start, end)}${end < collapsed.length ? "…" : ""}`;
}

export function searchProtocols(
  categories: Category[],
  query: string,
  limit = 12
): ProtocolSearchResult[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  const titleMatches: ProtocolSearchResult[] = [];
  const contentMatches: ProtocolSearchResult[] = [];

  for (const category of categories) {
    const categoryName = normalize(category.title);

    for (const protocol of category.protocols) {
      const titleText = normalize(`${protocol.title} ${protocol.code} ${categoryName}`);
      const structuredText = structuredSearchText(category.id, protocol.id);

      if (titleText.includes(normalizedQuery)) {
        titleMatches.push({ categoryId: category.id, categoryTitle: category.title, protocol, matchLabel: "Title or category" });
      } else if (normalize(structuredText).includes(normalizedQuery)) {
        contentMatches.push({
          categoryId: category.id,
          categoryTitle: category.title,
          protocol,
          matchLabel: "Native protocol content",
          snippet: findSnippet(structuredText, query.trim()),
        });
      }
    }
  }

  return [...titleMatches, ...contentMatches].slice(0, limit);
}
