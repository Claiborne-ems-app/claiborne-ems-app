"use client";

import { CheckCircle2, Database, Download, RefreshCw, ShieldCheck, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { formatBytes, getServiceWorker, sendOfflineMessage } from "../../lib/offline/client";
import { offlineStatusLabel, type OfflineState } from "../../lib/offline/status";
import { useOfflineStatus } from "../offline/useOfflineStatus";

type Progress = {
  phase: "preparing" | "downloading" | "verifying";
  current: number;
  total: number;
  percent: number;
  resource?: string;
  downloadedBytes: number;
};

type StorageInfo = {
  available: number | null;
  persisted: boolean | null;
};

function progressLabel(phase: Progress["phase"]) {
  if (phase === "preparing") return "Preparing download";
  if (phase === "verifying") return "Verifying offline content";
  return "Downloading offline content";
}

export default function OfflineAccess() {
  const { state, setState, supported, refresh } = useOfflineStatus();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [storage, setStorage] = useState<StorageInfo>({ available: null, persisted: null });

  useEffect(() => {
    if (!("storage" in navigator)) return;
    void navigator.storage.estimate().then((estimate) => {
      const available = typeof estimate.quota === "number"
        ? Math.max(0, estimate.quota - (estimate.usage ?? 0))
        : null;
      setStorage((current) => ({ ...current, available }));
    });
    if (navigator.storage.persisted) {
      void navigator.storage.persisted().then((persisted) => {
        setStorage((current) => ({ ...current, persisted }));
      });
    }
  }, []);

  async function download() {
    setError(null);
    const estimated = state.estimatedBytes ?? state.bytes ?? 0;
    if (storage.available !== null && estimated > 0 && storage.available < estimated * 1.15) {
      const proceed = window.confirm(
        `This device may not have enough available storage. About ${formatBytes(estimated)} is required and ${formatBytes(storage.available)} is available. Continue anyway?`
      );
      if (!proceed) return;
    }

    if (navigator.storage?.persist) {
      try {
        const persisted = await navigator.storage.persist();
        setStorage((current) => ({ ...current, persisted }));
      } catch {
        // Persistence is optional and unsupported on some Safari versions.
      }
    }

    try {
      const worker = await getServiceWorker();
      if (!worker) throw new Error("The offline service is not ready.");
      const channel = new MessageChannel();
      channel.port1.onmessage = (event) => {
        const message = event.data;
        if (message.type === "OFFLINE_PROGRESS") {
          setProgress(message as Progress & { type: string });
          setState((current) => ({ ...current, status: "downloading" }));
        } else if (message.type === "OFFLINE_COMPLETE") {
          setProgress(null);
          setState(message.state as OfflineState);
        } else if (message.type === "OFFLINE_ERROR") {
          setProgress(null);
          setError(message.error ?? "The offline download did not complete.");
          if (message.state) setState(message.state as OfflineState);
        }
      };
      worker.postMessage({ type: "DOWNLOAD_OFFLINE_CONTENT" }, [channel.port2]);
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : "The offline download could not start.");
    }
  }

  async function cancel() {
    const worker = await getServiceWorker();
    worker?.postMessage({ type: "CANCEL_OFFLINE_DOWNLOAD" });
  }

  async function verify() {
    setError(null);
    try {
      const response = await sendOfflineMessage<{ state: OfflineState }>({ type: "VERIFY_OFFLINE_CONTENT" });
      if (response.state) setState(response.state);
      await refresh();
    } catch (verifyError) {
      setError(verifyError instanceof Error ? verifyError.message : "Verification failed.");
    }
  }

  async function remove() {
    if (!window.confirm("Remove all downloaded offline clinical content from this device?")) return;
    const response = await sendOfflineMessage<{ state: OfflineState }>({ type: "REMOVE_OFFLINE_CONTENT" });
    if (response.state) setState(response.state);
    setProgress(null);
  }

  const ready = state.status === "ready" || state.status === "update-available";
  const canDownload = state.status !== "downloading" && state.status !== "ready";

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5" aria-labelledby="offline-access-title">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="offline-access-title" className="flex items-center gap-2 text-lg font-semibold">
            <Database aria-hidden="true" className="h-5 w-5 text-sky-400" />Offline Access
          </h2>
          <p className="mt-1 text-sm text-slate-400">Download all clinical resources for intentional offline use.</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${state.status === "update-available" ? "bg-amber-500/10 text-amber-300" : ready ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-800 text-slate-300"}`}>
          {offlineStatusLabel(state.status)}
        </span>
      </div>

      {!supported ? (
        <p className="mt-4 rounded-xl bg-amber-500/10 p-3 text-sm text-amber-200">This browser does not support service workers. Offline downloads are unavailable.</p>
      ) : (
        <>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Package Version</dt><dd className="text-right">{state.availableVersion ?? state.packageVersion ?? "Checking…"}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Last Download</dt><dd className="text-right">{state.completedAt ? new Date(state.completedAt).toLocaleString() : "Never"}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Cached Files</dt><dd>{state.fileCount ?? 0}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Cached Size</dt><dd>{formatBytes(state.bytes ?? state.estimatedBytes)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Available Storage</dt><dd>{formatBytes(storage.available)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Persistent Storage</dt><dd>{storage.persisted === null ? "Not reported" : storage.persisted ? "Granted" : "Not granted"}</dd></div>
          </dl>

          {progress && (
            <div className="mt-5 rounded-xl border border-sky-500/20 bg-sky-500/5 p-4" aria-live="polite">
              <div className="flex items-center justify-between gap-3 text-sm"><span className="font-semibold text-sky-200">{progressLabel(progress.phase)}</span><span>{progress.percent}%</span></div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-sky-500 transition-[width] duration-200" style={{ width: `${progress.percent}%` }} /></div>
              <p className="mt-3 text-xs text-slate-400">File {progress.current} of {progress.total}</p>
              {progress.resource && <p className="mt-1 truncate text-xs text-slate-400" title={progress.resource}>{progress.resource}</p>}
              <p className="mt-1 text-xs text-slate-400">Downloaded: {formatBytes(progress.downloadedBytes)}</p>
              <button type="button" onClick={() => void cancel()} className="mt-4 inline-flex min-h-11 items-center rounded-xl border border-slate-700 px-4 text-sm font-semibold text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"><X aria-hidden="true" className="mr-2 h-4 w-4" />Cancel</button>
            </div>
          )}

          {error && <p className="mt-4 rounded-xl bg-rose-500/10 p-3 text-sm text-rose-200" role="alert">{error}</p>}
          {state.lastError && !error && state.status === "incomplete" && <p className="mt-4 rounded-xl bg-amber-500/10 p-3 text-sm text-amber-200">{state.lastError}</p>}

          {!progress && (
            <div className="mt-5 grid gap-3">
              {canDownload && (
                <button type="button" onClick={() => void download()} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-sky-600 px-4 font-semibold text-white transition hover:bg-sky-500 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
                  {state.status === "update-available" ? <RefreshCw aria-hidden="true" className="mr-2 h-5 w-5" /> : <Download aria-hidden="true" className="mr-2 h-5 w-5" />}
                  {state.status === "update-available" ? "Update Offline Content" : state.status === "incomplete" || state.status === "verification-failed" ? "Restore Offline Content" : "Download for Offline Use"}
                </button>
              )}
              {ready && <p className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 p-3 font-semibold text-emerald-300"><CheckCircle2 aria-hidden="true" className="h-5 w-5" />Ready for Offline Use</p>}
              <button type="button" onClick={() => void verify()} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700 px-4 font-semibold text-slate-200 transition hover:border-sky-500 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"><ShieldCheck aria-hidden="true" className="mr-2 h-5 w-5" />Verify Offline Content</button>
              {(ready || state.status === "incomplete" || state.status === "verification-failed") && <button type="button" onClick={() => void remove()} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-rose-500/30 px-4 font-semibold text-rose-300 transition hover:bg-rose-500/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"><Trash2 aria-hidden="true" className="mr-2 h-5 w-5" />Remove Offline Content</button>}
            </div>
          )}

          <p className="mt-5 text-xs leading-5 text-slate-500">Your device or browser may remove cached files under storage pressure. Use Verify Offline Content to check the package and restore anything missing.</p>
        </>
      )}
    </section>
  );
}
