import { claiborneProtocols } from "../src/data/claiborneProtocols.ts";

export interface Protocol {
  id: string;
  code: string;
  title: string;
  category: string;
  categoryCode: string;
  pdfPath: string;
  pages: number | null;
  year: number;
  source: string;
  agency: string;
  status: "draft-import" | "approved";
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

  category.protocols.push({
    id: slugify(sourceProtocol.id),
    code: sourceProtocol.code,
    title: sourceProtocol.title,
    category: sourceProtocol.category,
    categoryCode: sourceProtocol.categoryCode,
    pdfPath: sourceProtocol.pdfPath,
    pages: sourceProtocol.pages,
    year: sourceProtocol.year,
    source: sourceProtocol.source,
    agency: sourceProtocol.agency,
    status: sourceProtocol.status,
  });
}

export const protocolCategories: Category[] = Array.from(
  categories.values()
);
