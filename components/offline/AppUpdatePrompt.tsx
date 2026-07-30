"use client";

import { RefreshCw, ShieldAlert, X } from "lucide-react";
import { useEffect, useState } from "react";
import { appConfig } from "../../lib/app-config";
import { isNewerAppVersion } from "../../lib/app-update";
import {
  normalizeSceneWorkspace,
  SCENE_STORAGE_KEY,
  SCENE_WORKSPACE_EVENT,
  type SceneWorkspace,
} from "../../lib/scene-timer";

type OfflineManifest = {
  appVersion?: string;
};

function readSceneWorkspace() {
  try {
    return normalizeSceneWorkspace(
      JSON.parse(window.localStorage.getItem(SCENE_STORAGE_KEY) ?? "null")
    );
  } catch {
    return normalizeSceneWorkspace(null);
  }
}

function sceneIsRunning(workspace: SceneWorkspace) {
  return workspace.runningSince !== null;
}

export default function AppUpdatePrompt() {
  const [availableVersion, setAvailableVersion] = useState<string | null>(null);
  const [sceneRunning, setSceneRunning] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [dismissedVersion, setDismissedVersion] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const checkForUpdate = async () => {
      if (!navigator.onLine) return;
      try {
        const response = await fetch(
          `/offline-resources.json?update-check=${Date.now()}`,
          { cache: "no-store" }
        );
        if (!response.ok) return;
        const manifest = (await response.json()) as OfflineManifest;
        if (
          !cancelled &&
          manifest.appVersion &&
          isNewerAppVersion(manifest.appVersion, appConfig.appVersion)
        ) {
          setAvailableVersion(manifest.appVersion);
        }
      } catch {
        // Update checks are best effort and should never block field use.
      }
    };

    const syncScene = (event?: Event) => {
      const customEvent = event as CustomEvent<SceneWorkspace> | undefined;
      const workspace = customEvent?.detail ?? readSceneWorkspace();
      setSceneRunning(sceneIsRunning(workspace));
    };
    const checkWhenVisible = () => {
      if (document.visibilityState === "visible") void checkForUpdate();
    };

    syncScene();
    void checkForUpdate();
    const interval = window.setInterval(checkForUpdate, 15 * 60 * 1000);
    window.addEventListener("online", checkForUpdate);
    window.addEventListener(SCENE_WORKSPACE_EVENT, syncScene);
    document.addEventListener("visibilitychange", checkWhenVisible);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("online", checkForUpdate);
      window.removeEventListener(SCENE_WORKSPACE_EVENT, syncScene);
      document.removeEventListener("visibilitychange", checkWhenVisible);
    };
  }, []);

  async function updateAndReload() {
    if (sceneRunning || updating) return;
    setUpdating(true);

    try {
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.update()));
        registrations.forEach((registration) => {
          registration.waiting?.postMessage({ type: "SKIP_WAITING" });
        });
      }
    } finally {
      const url = new URL(window.location.href);
      url.searchParams.set("app-update", availableVersion ?? Date.now().toString());
      window.location.replace(url.toString());
    }
  }

  if (!availableVersion || dismissedVersion === availableVersion) return null;

  return (
    <aside className="fixed inset-x-0 top-0 z-50 p-3 pt-[calc(0.75rem+env(safe-area-inset-top))]">
      <div className="mx-auto max-w-md rounded-2xl border border-sky-400/40 bg-slate-900/95 p-4 text-white shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-200 ring-1 ring-sky-400/25">
            {sceneRunning ? (
              <ShieldAlert aria-hidden="true" className="h-5 w-5" />
            ) : (
              <RefreshCw
                aria-hidden="true"
                className={`h-5 w-5 ${updating ? "animate-spin" : ""}`}
              />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-bold">App update available</p>
            <p className="mt-1 text-sm leading-5 text-slate-300">
              {sceneRunning
                ? "Your scene timer is active. The update will wait so field timing is not interrupted."
                : `Version ${availableVersion} is ready. Favorites, provider selection, offline files, and scene notes will be preserved.`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDismissedVersion(availableVersion)}
            aria-label="Dismiss update notice"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <button
          type="button"
          onClick={updateAndReload}
          disabled={sceneRunning || updating}
          className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 font-bold text-white hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          <RefreshCw
            aria-hidden="true"
            className={`h-5 w-5 ${updating ? "animate-spin" : ""}`}
          />
          {sceneRunning
            ? "Available after scene"
            : updating
              ? "Updating…"
              : "Update and reload"}
        </button>
      </div>
    </aside>
  );
}
