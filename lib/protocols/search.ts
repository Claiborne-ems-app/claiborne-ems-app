import type { Category, Protocol } from "../../data/protocols";
import { getStructuredProtocol } from "../../data/structured-protocols";

export type ProtocolSearchResult = {
  categoryId: string;
  categoryTitle: string;
  protocol: Protocol;
  matchLabel?: string;
  snippet?: string;
};

type SearchFields = {
  title: string;
  code: string;
  category: string;
  medications: string;
  providerCare: string;
  clinical: string;
  combined: string;
};

const QUERY_ALIASES: Record<string, string[]> = {
  ams: ["altered mental status"],
  benadryl: ["diphenhydramine"],
  cva: ["stroke"],
  dyspnea: ["respiratory distress", "shortness of breath"],
  epi: ["epinephrine"],
  mi: ["myocardial infarction", "acute coronary syndrome", "stemi"],
  narcan: ["naloxone"],
  od: ["overdose", "toxic ingestion"],
  rosc: ["return of spontaneous circulation", "post-resuscitation"],
  sob: ["shortness of breath", "respiratory distress", "dyspnea"],
  solumedrol: ["methylprednisolone"],
  svt: ["supraventricular tachycardia", "narrow-complex tachycardia"],
  versed: ["midazolam"],
  vfib: ["ventricular fibrillation", "vf"],
  vtach: ["ventricular tachycardia", "vt"],
};

function normalize(value: string) {
  return value
    .trim()
    .replace(/([a-z])-(\d)/gi, "$1 $2")
    .replace(/[/:(),]/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function searchFields(
  categoryId: string,
  categoryTitle: string,
  protocol: Protocol
): SearchFields {
  const content = getStructuredProtocol(categoryId, protocol.id);
  const title = protocol.title;
  const code = `${protocol.code} ${protocol.id}`;
  const category = categoryTitle;

  if (!content) {
    const combined = [title, code, category].join(" ");
    return {
      title,
      code,
      category,
      medications: "",
      providerCare: "",
      clinical: "",
      combined,
    };
  }

  const medications = content.medications
    .flatMap((medication) => [
      medication.name,
      medication.dose,
      ...(medication.notes ?? []),
    ])
    .join(" ");

  const providerCare = [
    ...(content.flow ?? []).flatMap((node) => [
      node.title,
      node.text,
      ...(node.levels ?? []),
    ]),
    ...(content.careModules ?? []).flatMap((module) => [
      module.title,
      module.summary,
      ...module.levels.flatMap((level) => [level.level, ...level.actions]),
    ]),
  ].join(" ");

  const clinical = [
    ...content.overview,
    ...content.indications,
    ...content.contraindications,
    ...content.assessment.flatMap((group) => [group.title, ...group.items]),
    ...content.treatmentSteps,
    ...content.warnings,
    ...content.clinicalPearls,
    ...content.specialPopulations.flatMap((group) => [
      group.title,
      ...group.items,
    ]),
    ...content.references,
  ].join(" ");

  return {
    title,
    code,
    category,
    medications,
    providerCare,
    clinical,
    combined: [
      title,
      code,
      category,
      medications,
      providerCare,
      clinical,
    ].join(" "),
  };
}

function queryOptions(term: string) {
  return [term, ...(QUERY_ALIASES[term] ?? [])].map(normalize);
}

function matchesAllTerms(text: string, terms: string[]) {
  const normalizedText = normalize(text);
  return terms.every((term) =>
    queryOptions(term).some((option) => normalizedText.includes(option))
  );
}

function firstMatchingOption(text: string, terms: string[]) {
  const normalizedText = normalize(text);
  for (const term of terms) {
    const option = queryOptions(term).find((candidate) =>
      normalizedText.includes(candidate)
    );
    if (option) return option;
  }
  return terms[0];
}

function findSnippet(text: string, match: string) {
  const collapsed = text.replace(/\s+/g, " ").trim();
  const index = normalize(collapsed).indexOf(normalize(match));
  if (index < 0) return collapsed ? collapsed.slice(0, 150) : undefined;
  const start = Math.max(0, index - 55);
  const end = Math.min(collapsed.length, index + match.length + 105);
  return `${start > 0 ? "…" : ""}${collapsed.slice(start, end)}${
    end < collapsed.length ? "…" : ""
  }`;
}

function scoreMatch(fields: SearchFields, terms: string[], normalizedQuery: string) {
  const normalizedCode = normalize(fields.code);
  const normalizedTitle = normalize(fields.title);
  const titleAndCategory = `${fields.title} ${fields.category}`;

  if (normalizedCode === normalizedQuery) return 120;
  if (normalizedTitle === normalizedQuery) return 115;
  if (normalizedCode.includes(normalizedQuery)) return 105;
  if (normalizedTitle.startsWith(normalizedQuery)) return 100;
  if (matchesAllTerms(titleAndCategory, terms)) return 90;
  if (matchesAllTerms(fields.medications, terms)) return 80;
  if (matchesAllTerms(fields.providerCare, terms)) return 70;
  if (matchesAllTerms(fields.clinical, terms)) return 60;
  if (matchesAllTerms(fields.combined, terms)) return 50;
  return 0;
}

function matchDetails(fields: SearchFields, terms: string[]) {
  if (matchesAllTerms(`${fields.title} ${fields.code} ${fields.category}`, terms)) {
    return { matchLabel: "Protocol title, number, or category" };
  }
  if (matchesAllTerms(fields.medications, terms)) {
    const match = firstMatchingOption(fields.medications, terms);
    return {
      matchLabel: "Medication",
      snippet: findSnippet(fields.medications, match),
    };
  }
  if (matchesAllTerms(fields.providerCare, terms)) {
    const match = firstMatchingOption(fields.providerCare, terms);
    return {
      matchLabel: "Flow chart or provider care",
      snippet: findSnippet(fields.providerCare, match),
    };
  }
  const match = firstMatchingOption(fields.clinical || fields.combined, terms);
  return {
    matchLabel: "Native clinical content",
    snippet: findSnippet(fields.clinical || fields.combined, match),
  };
}

export function searchProtocols(
  categories: Category[],
  query: string,
  limit = 12
): ProtocolSearchResult[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];
  const terms = normalizedQuery.split(" ");
  const ranked: Array<ProtocolSearchResult & { score: number; order: number }> = [];
  let order = 0;

  for (const category of categories) {
    for (const protocol of category.protocols) {
      const fields = searchFields(category.id, category.title, protocol);
      const score = scoreMatch(fields, terms, normalizedQuery);
      if (score > 0) {
        ranked.push({
          categoryId: category.id,
          categoryTitle: category.title,
          protocol,
          ...matchDetails(fields, terms),
          score,
          order,
        });
      }
      order += 1;
    }
  }

  return ranked
    .sort((left, right) => right.score - left.score || left.order - right.order)
    .slice(0, limit)
    .map((result) => ({
      categoryId: result.categoryId,
      categoryTitle: result.categoryTitle,
      protocol: result.protocol,
      matchLabel: result.matchLabel,
      snippet: result.snippet,
    }));
}
