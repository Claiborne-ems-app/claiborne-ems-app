"use client";

import { CheckCircle2, CloudOff, Download, RefreshCw, TriangleAlert } from "lucide-react";
import { offlineStatusLabel } from "../../lib/offline/status";
import { useOfflineStatus } from "./useOfflineStatus";

export default function OfflineStatusIndicator() {
  const { state, supported } = useOfflineStatus();
  if (!supported) return null;
  const presentation = {
    ready: { icon: CheckCircle2, color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
    downloading: { icon: Download, color: "border-sky-500/30 bg-sky-500/10 text-sky-300" },
    "update-available": { icon: RefreshCw, color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
    incomplete: { icon: TriangleAlert, color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
    "verification-failed": { icon: TriangleAlert, color: "border-rose-500/30 bg-rose-500/10 text-rose-300" },
    "not-downloaded": { icon: CloudOff, color: "border-slate-700 bg-slate-900 text-slate-400" },
  }[state.status];
  const Icon = presentation.icon;

  return (
    <div className={`mx-auto mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${presentation.color}`}>
      <Icon aria-hidden="true" className="h-3.5 w-3.5" />
      {offlineStatusLabel(state.status)}
    </div>
  );
}
