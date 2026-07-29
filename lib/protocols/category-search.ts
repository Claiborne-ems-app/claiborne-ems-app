import type { Protocol } from "../../data/protocols";

export function normalizeCategorySearchQuery(value: string) {
  return value.trim().replace(/\s+/g, " ").replace(/\s*-\s*/g, "-").toLowerCase();
}

export function searchCategoryProtocols(protocols: Protocol[], query: string) {
  const normalizedQuery = normalizeCategorySearchQuery(query);
  if (!normalizedQuery) return [];

  return protocols.filter((protocol) =>
    `${protocol.title} ${protocol.code}`.toLowerCase().includes(normalizedQuery)
  );
}
