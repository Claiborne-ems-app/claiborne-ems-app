"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import {
  RECENTLY_VIEWED_STORAGE_KEY,
  type RecentlyViewedReference,
  parseRecentlyViewed,
  recordRecentlyViewed,
  serializeRecentlyViewed,
} from "../../lib/protocols/recently-viewed";

const RECENTLY_VIEWED_UPDATED_EVENT = "claiborne-protocols:recently-viewed-updated";
const EMPTY_RECENTLY_VIEWED: RecentlyViewedReference[] = [];
let cachedStorageValue: string | null | undefined;
let cachedRecentlyViewed = EMPTY_RECENTLY_VIEWED;

function getRecentlyViewedSnapshot() {
  if (typeof window === "undefined") {
    return EMPTY_RECENTLY_VIEWED;
  }

  try {
    const storageValue = window.localStorage.getItem(
      RECENTLY_VIEWED_STORAGE_KEY
    );

    if (storageValue !== cachedStorageValue) {
      cachedStorageValue = storageValue;
      cachedRecentlyViewed = parseRecentlyViewed(storageValue);
    }

    return cachedRecentlyViewed;
  } catch {
    return EMPTY_RECENTLY_VIEWED;
  }
}

function subscribeToRecentlyViewed(onStoreChange: () => void) {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === RECENTLY_VIEWED_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(RECENTLY_VIEWED_UPDATED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(RECENTLY_VIEWED_UPDATED_EVENT, onStoreChange);
  };
}

export function useRecentlyViewed() {
  const recentlyViewed = useSyncExternalStore(
    subscribeToRecentlyViewed,
    getRecentlyViewedSnapshot,
    () => EMPTY_RECENTLY_VIEWED
  );

  const recordProtocolView = useCallback(
    (protocol: Pick<RecentlyViewedReference, "categoryId" | "protocolId">) => {
      try {
        const nextRecentlyViewed = recordRecentlyViewed(
          getRecentlyViewedSnapshot(),
          protocol
        );

        window.localStorage.setItem(
          RECENTLY_VIEWED_STORAGE_KEY,
          serializeRecentlyViewed(nextRecentlyViewed)
        );
        window.dispatchEvent(new Event(RECENTLY_VIEWED_UPDATED_EVENT));
      } catch {
        // Keep the current session usable when storage is unavailable.
      }
    },
    []
  );

  useEffect(() => {
    try {
      const normalizedRecentlyViewed = serializeRecentlyViewed(recentlyViewed);

      const storedRecentlyViewed = window.localStorage.getItem(
        RECENTLY_VIEWED_STORAGE_KEY
      );

      if (
        storedRecentlyViewed &&
        storedRecentlyViewed !== normalizedRecentlyViewed
      ) {
        window.localStorage.setItem(
          RECENTLY_VIEWED_STORAGE_KEY,
          normalizedRecentlyViewed
        );
        window.dispatchEvent(new Event(RECENTLY_VIEWED_UPDATED_EVENT));
      }
    } catch {
      // Keep the current session usable when storage is unavailable.
    }
  }, [recentlyViewed]);

  return { recentlyViewed, recordProtocolView };
}
