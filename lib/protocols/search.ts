import type { Category, Protocol } from "../../data/protocols";

export type ProtocolSearchResult = {
  categoryId: string;
  categoryTitle: string;
  protocol: Protocol;
};

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function searchProtocols(
  categories: Category[],
  query: string,
  limit = 12
): ProtocolSearchResult[] {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return [];
  }

  const results: ProtocolSearchResult[] = [];

  for (const category of categories) {
    const categoryName = normalize(category.title);

    for (const protocol of category.protocols) {
      const searchableText = normalize(
        `${protocol.title} ${protocol.code} ${categoryName}`
      );

      if (searchableText.includes(normalizedQuery)) {
        results.push({
          categoryId: category.id,
          categoryTitle: category.title,
          protocol,
        });
      }

      if (results.length === limit) {
        return results;
      }
    }
  }

  return results;
}
