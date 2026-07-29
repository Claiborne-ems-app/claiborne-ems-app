"use client";

import { useCallback, useEffect, useState } from "react";
import { sendOfflineMessage } from "../../lib/offline/client";
import { EMPTY_OFFLINE_STATE, type OfflineState } from "../../lib/offline/status";

export function useOfflineStatus() {
  const [state, setState] = useState<OfflineState>(EMPTY_OFFLINE_STATE);
  const [supported, setSupported] = useState(true);

  const refresh = useCallback(async () => {
    if (!("serviceWorker" in navigator)) {
      setSupported(false);
      return;
    }
    try {
      const response = await sendOfflineMessage<{ state: OfflineState }>({ type: "GET_OFFLINE_STATUS" });
      if (response.state) setState(response.state);
    } catch {
      // Registration may still be activating; the ready event retries.
    }
  }, []);

  useEffect(() => {
    const initialRefresh = window.setTimeout(() => void refresh(), 0);
    const onMessage = (event: MessageEvent) => {
      if (event.data?.type === "OFFLINE_STATE" && event.data.state) setState(event.data.state);
    };
    navigator.serviceWorker?.addEventListener("message", onMessage);
    window.addEventListener("online", refresh);
    window.addEventListener("offline", refresh);
    window.addEventListener("claiborne-protocols:service-worker-ready", refresh);
    return () => {
      window.clearTimeout(initialRefresh);
      navigator.serviceWorker?.removeEventListener("message", onMessage);
      window.removeEventListener("online", refresh);
      window.removeEventListener("offline", refresh);
      window.removeEventListener("claiborne-protocols:service-worker-ready", refresh);
    };
  }, [refresh]);

  return { state, setState, supported, refresh };
}
