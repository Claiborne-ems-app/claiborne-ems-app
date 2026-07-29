"use client";

import { Download } from "lucide-react";
import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia("(display-mode: standalone)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia("(display-mode: standalone)").matches || ("standalone" in navigator && navigator.standalone === true);
}

export default function PwaInstallInstructions() {
  const standalone = useSyncExternalStore(subscribe, getSnapshot, () => false);
  if (standalone) return null;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="flex items-center gap-2 text-lg font-semibold"><Download aria-hidden="true" className="h-5 w-5 text-sky-400" />Install on iPhone</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">Open this site in Safari, tap Share, then choose Add to Home Screen. After installing, open Settings and choose Download for Offline Use before going offline.</p>
    </section>
  );
}
