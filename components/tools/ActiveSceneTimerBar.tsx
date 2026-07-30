"use client";

import Link from "next/link";
import { ChevronRight, Timer } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  emptySceneWorkspace,
  formatSceneTime,
  getSceneElapsedSeconds,
  normalizeSceneWorkspace,
  SCENE_STORAGE_KEY,
  SCENE_WORKSPACE_EVENT,
  type SceneWorkspace,
} from "../../lib/scene-timer";

function readWorkspace() {
  try {
    return normalizeSceneWorkspace(
      JSON.parse(window.localStorage.getItem(SCENE_STORAGE_KEY) ?? "null")
    );
  } catch {
    return emptySceneWorkspace;
  }
}

export default function ActiveSceneTimerBar() {
  const pathname = usePathname();
  const [workspace, setWorkspace] =
    useState<SceneWorkspace>(emptySceneWorkspace);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const syncWorkspace = (event?: Event) => {
      const customEvent = event as CustomEvent<SceneWorkspace> | undefined;
      setWorkspace(customEvent?.detail ?? readWorkspace());
      setNow(Date.now());
    };
    const syncStorage = (event: StorageEvent) => {
      if (event.key === SCENE_STORAGE_KEY) syncWorkspace();
    };
    const syncVisibility = () => {
      if (document.visibilityState === "visible") syncWorkspace();
    };

    syncWorkspace();
    window.addEventListener(SCENE_WORKSPACE_EVENT, syncWorkspace);
    window.addEventListener("storage", syncStorage);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      window.removeEventListener(SCENE_WORKSPACE_EVENT, syncWorkspace);
      window.removeEventListener("storage", syncStorage);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (workspace.runningSince === null) return;
    const interval = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(interval);
  }, [workspace.runningSince]);

  const elapsedSeconds = useMemo(
    () => getSceneElapsedSeconds(workspace, now),
    [now, workspace]
  );
  const running = workspace.runningSince !== null;

  if (!workspace.sceneStartedAt || pathname === "/scene-timer") {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-[calc(4.55rem+env(safe-area-inset-bottom))] z-20 px-3">
      <Link
        href="/scene-timer"
        className="mx-auto flex min-h-14 max-w-md items-center gap-3 rounded-2xl border border-sky-400/35 bg-slate-900/95 px-4 text-white shadow-2xl shadow-black/35 backdrop-blur-xl transition active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
      >
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-200 ring-1 ring-sky-400/25">
          <Timer aria-hidden="true" className="h-5 w-5" />
          {running ? (
            <span className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full border-2 border-slate-900 bg-emerald-400" />
          ) : null}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-bold uppercase tracking-[0.12em] text-sky-300">
            {running ? "Scene timer running" : "Scene timer paused"}
          </span>
          <span className="mt-0.5 block text-xs text-slate-400">
            {workspace.entries.length} timestamped{" "}
            {workspace.entries.length === 1 ? "entry" : "entries"}
          </span>
        </span>
        <span className="font-mono text-xl font-bold">
          {formatSceneTime(elapsedSeconds)}
        </span>
        <ChevronRight aria-hidden="true" className="h-5 w-5 text-slate-400" />
      </Link>
    </div>
  );
}
