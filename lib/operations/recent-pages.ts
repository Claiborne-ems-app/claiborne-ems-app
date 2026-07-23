export const OPERATIONS_RECENT_PAGES_STORAGE_KEY = "air-protocols:operations-recent-pages";
export const OPERATIONS_RECENT_PAGES_LIMIT = 10;

export type RecentOperationsPage = {
  page: number;
  viewedAt: number;
};

function isValidPage(page: unknown): page is number {
  return typeof page === "number" && Number.isInteger(page) && page > 0;
}

export function normalizeRecentOperationsPages(
  pages: RecentOperationsPage[]
): RecentOperationsPage[] {
  const newestByPage = new Map<number, RecentOperationsPage>();

  pages.forEach((entry) => {
    if (!isValidPage(entry.page) || !Number.isFinite(entry.viewedAt) || entry.viewedAt <= 0) return;
    const existing = newestByPage.get(entry.page);
    if (!existing || entry.viewedAt > existing.viewedAt) newestByPage.set(entry.page, entry);
  });

  return [...newestByPage.values()]
    .sort((first, second) => second.viewedAt - first.viewedAt)
    .slice(0, OPERATIONS_RECENT_PAGES_LIMIT);
}

export function parseRecentOperationsPages(value: string | null): RecentOperationsPage[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    return normalizeRecentOperationsPages(
      parsed.flatMap((item): RecentOperationsPage[] => {
        if (!item || typeof item !== "object") return [];
        const entry = item as Record<string, unknown>;
        return isValidPage(entry.page) && typeof entry.viewedAt === "number"
          ? [{ page: entry.page, viewedAt: entry.viewedAt }]
          : [];
      })
    );
  } catch {
    return [];
  }
}

export function recordRecentOperationsPage(
  pages: RecentOperationsPage[],
  page: number,
  viewedAt = Date.now()
): RecentOperationsPage[] {
  return normalizeRecentOperationsPages([
    { page, viewedAt },
    ...pages.filter((entry) => entry.page !== page),
  ]);
}

export function serializeRecentOperationsPages(pages: RecentOperationsPage[]): string {
  return JSON.stringify(normalizeRecentOperationsPages(pages));
}
