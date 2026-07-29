"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || process.env.NODE_ENV !== "production") return;
    void navigator.serviceWorker.register("/sw.js", { scope: "/" }).then((registration) => {
      void registration.update();
      window.dispatchEvent(new Event("claiborne-protocols:service-worker-ready"));
    }).catch(() => {
      // The app remains usable online if registration is unavailable.
    });
  }, []);

  return null;
}
