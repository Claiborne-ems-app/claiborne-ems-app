export const RECENTLY_VIEWED_STORAGE_KEY = "claiborne-protocols:recently-viewed";
export const RECENTLY_VIEWED_LIMIT = 3;

export type RecentlyViewedReference = {
  categoryId: string;
  protocolId: string;
  viewedAt: number;
};

type ProtocolReference = Pick<
  RecentlyViewedReference,
  "categoryId" | "protocolId"
>;

function parseRecentlyViewedReference(
  value: unknown
): RecentlyViewedReference | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const reference = value as Record<string, unknown>;
  const viewedAt =
    typeof reference.viewedAt === "number"
      ? reference.viewedAt
      : reference.lastViewed;

  if (
    typeof reference.categoryId === "string" &&
    reference.categoryId.length > 0 &&
    typeof reference.protocolId === "string" &&
    reference.protocolId.length > 0 &&
    typeof viewedAt === "number" &&
    Number.isFinite(viewedAt) &&
    viewedAt > 0
  ) {
    return {
      categoryId: reference.categoryId,
      protocolId: reference.protocolId,
      viewedAt,
    };
  }

  return null;
}

export function normalizeRecentlyViewed(
  recentlyViewed: RecentlyViewedReference[]
): RecentlyViewedReference[] {
  const mostRecentByProtocol = new Map<string, RecentlyViewedReference>();

  recentlyViewed.forEach((reference) => {
    const key = `${reference.categoryId}/${reference.protocolId}`;
    const current = mostRecentByProtocol.get(key);

    if (!current || reference.viewedAt > current.viewedAt) {
      mostRecentByProtocol.set(key, reference);
    }
  });

  return [...mostRecentByProtocol.values()]
    .sort((first, second) => second.viewedAt - first.viewedAt)
    .slice(0, RECENTLY_VIEWED_LIMIT);
}

export function parseRecentlyViewed(
  value: string | null
): RecentlyViewedReference[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return normalizeRecentlyViewed(
      parsed.flatMap((item) => {
        const reference = parseRecentlyViewedReference(item);

        return reference ? [reference] : [];
      })
    );
  } catch {
    return [];
  }
}

export function serializeRecentlyViewed(
  recentlyViewed: RecentlyViewedReference[]
): string {
  return JSON.stringify(normalizeRecentlyViewed(recentlyViewed));
}

export function recordRecentlyViewed(
  recentlyViewed: RecentlyViewedReference[],
  protocol: ProtocolReference,
  viewedAt = Date.now()
): RecentlyViewedReference[] {
  return normalizeRecentlyViewed([
    { ...protocol, viewedAt },
    ...recentlyViewed.filter(
      (reference) =>
        reference.categoryId !== protocol.categoryId ||
        reference.protocolId !== protocol.protocolId
    ),
  ]);
}
