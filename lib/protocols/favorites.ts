export const FAVORITES_STORAGE_KEY = "claiborne-protocols:favorites";

export type FavoriteReference = {
  categoryId: string;
  protocolId: string;
};

function isFavoriteReference(value: unknown): value is FavoriteReference {
  if (!value || typeof value !== "object") {
    return false;
  }

  const reference = value as Record<string, unknown>;

  return (
    typeof reference.categoryId === "string" &&
    reference.categoryId.length > 0 &&
    typeof reference.protocolId === "string" &&
    reference.protocolId.length > 0
  );
}

export function normalizeFavorites(
  favorites: FavoriteReference[]
): FavoriteReference[] {
  const seen = new Set<string>();

  return favorites.filter((favorite) => {
    const key = `${favorite.categoryId}/${favorite.protocolId}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function parseFavorites(value: string | null): FavoriteReference[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return normalizeFavorites(parsed.filter(isFavoriteReference));
  } catch {
    return [];
  }
}

export function serializeFavorites(favorites: FavoriteReference[]): string {
  return JSON.stringify(normalizeFavorites(favorites));
}
