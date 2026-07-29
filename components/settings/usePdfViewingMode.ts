"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  PDF_VIEWING_MODE_STORAGE_KEY,
  type PdfViewingMode,
  parsePdfViewingMode,
} from "../../lib/protocols/viewing-mode";

const PDF_VIEWING_MODE_UPDATED_EVENT = "claiborne-protocols:pdf-viewing-mode-updated";

function subscribe(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === PDF_VIEWING_MODE_STORAGE_KEY) onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(PDF_VIEWING_MODE_UPDATED_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(PDF_VIEWING_MODE_UPDATED_EVENT, onStoreChange);
  };
}

function getSnapshot() {
  try {
    return parsePdfViewingMode(window.localStorage.getItem(PDF_VIEWING_MODE_STORAGE_KEY));
  } catch {
    return "protocol";
  }
}

export function usePdfViewingMode() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, () => "protocol");
  const setMode = useCallback((nextMode: PdfViewingMode) => {
    try {
      window.localStorage.setItem(PDF_VIEWING_MODE_STORAGE_KEY, nextMode);
      window.dispatchEvent(new Event(PDF_VIEWING_MODE_UPDATED_EVENT));
    } catch {
      // Persistent storage is optional for the current browser session.
    }
  }, []);

  return { mode, setMode };
}
