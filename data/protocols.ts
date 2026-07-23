import { claiborneProtocols } from "../src/data/claiborneProtocols.ts";

export interface Protocol {
  id: string;
  code: string;
  title: string;
  startPage: number;
  endPage: number;
  pdfPath: string;
}

export interface Category {
  id: string;
  title: string;
  protocols: Protocol[];
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const categories = new Map<string, Category>();

for (const sourceProtocol of claiborneProtocols) {
  const categoryId = slugify(
    sourceProtocol.categoryCode || sourceProtocol.category
  );

  let category = categories.get(categoryId);

  if (!category) {
    category = {
      id: categoryId,
      title: sourceProtocol.category,
      protocols: [],
    };

    categories.set(categoryId, category);
  }

  const pageCount = Math.max(1, sourceProtocol.pages ?? 1);

  category.protocols.push({
    id: slugify(sourceProtocol.id),
    code: sourceProtocol.code,
    title: sourceProtocol.title,
    startPage: 1,
    endPage: pageCount,
    pdfPath: sourceProtocol.pdfPath,
  });
}

export const protocolCategories: Category[] = Array.from(
  categories.values()
);
