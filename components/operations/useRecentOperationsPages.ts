"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  OPERATIONS_RECENT_PAGES_STORAGE_KEY,
  type RecentOperationsPage,
  parseRecentOperationsPages,
  recordRecentOperationsPage,
  serializeRecentOperationsPages,
} from "../../lib/operations/recent-pages";

const UPDATED_EVENT = "air-protocols:operations-recent-pages-updated";
const EMPTY: RecentOperationsPage[] = [];
let cachedValue: string | null | undefined;
let cachedPages = EMPTY;

function getSnapshot() {
  if (typeof window === "undefined") return EMPTY;

  try {
    const value = window.localStorage.getItem(OPERATIONS_RECENT_PAGES_STORAGE_KEY);
    if (value !== cachedValue) {
      cachedValue = value;
      cachedPages = parseRecentOperationsPages(value);
    }
    return cachedPages;
  } catch {
    return EMPTY;
  }
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === OPERATIONS_RECENT_PAGES_STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(UPDATED_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(UPDATED_EVENT, onChange);
  };
}

export function useRecentOperationsPages() {
  const recentPages = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  const recordPage = useCallback((page: number) => {
    try {
      const next = recordRecentOperationsPage(getSnapshot(), page);
      const serialized = serializeRecentOperationsPages(next);
      window.localStorage.setItem(OPERATIONS_RECENT_PAGES_STORAGE_KEY, serialized);
      cachedValue = serialized;
      cachedPages = next;
      window.dispatchEvent(new Event(UPDATED_EVENT));
    } catch {
      // Keep manual viewing available when browser storage is unavailable.
    }
  }, []);

  return { recentPages, recordPage };
}
