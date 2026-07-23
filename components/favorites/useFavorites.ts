"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  FAVORITES_STORAGE_KEY,
  type FavoriteReference,
  parseFavorites,
  serializeFavorites,
} from "../../lib/protocols/favorites";

const FAVORITES_UPDATED_EVENT = "claiborne-protocols:favorites-updated";
const EMPTY_FAVORITES: FavoriteReference[] = [];
let cachedStorageValue: string | null | undefined;
let cachedFavorites = EMPTY_FAVORITES;

function isSameFavorite(
  first: FavoriteReference,
  second: FavoriteReference
) {
  return (
    first.categoryId === second.categoryId &&
    first.protocolId === second.protocolId
  );
}

function getFavoritesSnapshot() {
  if (typeof window === "undefined") {
    return EMPTY_FAVORITES;
  }

  try {
    const storageValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (storageValue !== cachedStorageValue) {
      cachedStorageValue = storageValue;
      cachedFavorites = parseFavorites(storageValue);
    }

    return cachedFavorites;
  } catch {
    return EMPTY_FAVORITES;
  }
}

function subscribeToFavorites(onStoreChange: () => void) {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === FAVORITES_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(FAVORITES_UPDATED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(FAVORITES_UPDATED_EVENT, onStoreChange);
  };
}

export function useFavorites() {
  const favorites = useSyncExternalStore(
    subscribeToFavorites,
    getFavoritesSnapshot,
    () => EMPTY_FAVORITES
  );

  const toggleFavorite = useCallback(
    (favorite: FavoriteReference) => {
      const isFavorite = favorites.some((currentFavorite) =>
        isSameFavorite(currentFavorite, favorite)
      );
      const nextFavorites = isFavorite
        ? favorites.filter(
            (currentFavorite) => !isSameFavorite(currentFavorite, favorite)
          )
        : [...favorites, favorite];

    try {
      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        serializeFavorites(nextFavorites)
      );
      window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
    } catch {
      // Keep the current session usable when storage is unavailable.
    }
    },
    [favorites]
  );

  const isFavorite = useCallback(
    (favorite: FavoriteReference) =>
      favorites.some((currentFavorite) =>
        isSameFavorite(currentFavorite, favorite)
      ),
    [favorites]
  );

  return { favorites, isFavorite, toggleFavorite };
}
