"use client";

import {
  Check,
  Clipboard,
  Mic,
  MicOff,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Timer,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  createSceneTimelineText,
  emptySceneWorkspace,
  formatSceneClockTime,
  formatSceneTime,
  getSceneElapsedSeconds,
  normalizeSceneWorkspace,
  SCENE_STORAGE_KEY,
  SCENE_WORKSPACE_EVENT,
  type SceneEntry,
  type SceneWorkspace,
} from "../../lib/scene-timer";

type SpeechRecognitionResultLike = {
  0?: { transcript?: string };
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: SpeechRecognitionResultLike;
  };
};

type SpeechRecognitionErrorLike = {
  error?: string;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type SpeechWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

function readStoredWorkspace(): SceneWorkspace {
  try {
    const raw = window.localStorage.getItem(SCENE_STORAGE_KEY);
    if (!raw) return emptySceneWorkspace;
    return normalizeSceneWorkspace(JSON.parse(raw));
  } catch {
    return emptySceneWorkspace;
  }
}

function createEntryId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function SceneTimer() {
  const [workspace, setWorkspace] =
    useState<SceneWorkspace>(emptySceneWorkspace);
  const [now, setNow] = useState(() => Date.now());
  const [hydrated, setHydrated] = useState(false);
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    // Restore the active timer after navigation, reload, or screen sleep.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWorkspace(readStoredWorkspace());
    setNow(Date.now());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      SCENE_STORAGE_KEY,
      JSON.stringify(workspace)
    );
    window.dispatchEvent(
      new CustomEvent(SCENE_WORKSPACE_EVENT, { detail: workspace })
    );
  }, [hydrated, workspace]);

  useEffect(() => {
    if (workspace.runningSince === null) return;
    const id = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(id);
  }, [workspace.runningSince]);

  useEffect(
    () => () => {
      recognitionRef.current?.abort();
    },
    []
  );

  const elapsedSeconds = useMemo(
    () => getSceneElapsedSeconds(workspace, now),
    [now, workspace]
  );
  const running = workspace.runningSince !== null;
  const hasScene = workspace.sceneStartedAt !== null;
  const tone =
    elapsedSeconds >= 900
      ? "border-rose-500/50 bg-rose-950/30"
      : elapsedSeconds >= 600
        ? "border-amber-500/40 bg-amber-950/20"
        : "border-slate-800 bg-slate-900";

  function toggleTimer() {
    const actionTime = Date.now();
    setNow(actionTime);
    setMessage("");
    setWorkspace((current) => {
      if (current.runningSince !== null) {
        return {
          ...current,
          accumulatedSeconds: getSceneElapsedSeconds(current, actionTime),
          runningSince: null,
        };
      }

      return {
        ...current,
        runningSince: actionTime,
        sceneStartedAt:
          current.sceneStartedAt ?? new Date(actionTime).toISOString(),
      };
    });
  }

  function resetScene() {
    const hasContent = elapsedSeconds > 0 || workspace.entries.length > 0;
    if (
      hasContent &&
      !window.confirm(
        "Start a new scene? This clears the timer and all timestamped notes."
      )
    ) {
      return;
    }

    recognitionRef.current?.abort();
    recognitionRef.current = null;
    setListening(false);
    setDraft("");
    setMessage("Scene timer and timeline cleared.");
    setNow(Date.now());
    setWorkspace(emptySceneWorkspace);
    window.localStorage.removeItem(SCENE_STORAGE_KEY);
  }

  function toggleDictation() {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    if (!hasScene) {
      setMessage("Start the scene timer before dictating a treatment.");
      return;
    }

    const speechWindow = window as SpeechWindow;
    const Recognition =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!Recognition) {
      setMessage(
        "Voice recognition is unavailable in this browser. Use the keyboard microphone or type the treatment."
      );
      return;
    }

    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      let transcript = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        transcript += event.results[index]?.[0]?.transcript ?? "";
      }
      if (transcript.trim()) setDraft(transcript.trim());
    };
    recognition.onerror = (event) => {
      setListening(false);
      setMessage(
        event.error === "not-allowed"
          ? "Microphone permission was not granted."
          : "Dictation stopped. You can retry or type the treatment."
      );
    };
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    setMessage("Listening… speak one treatment or event.");
    setListening(true);

    try {
      recognition.start();
    } catch {
      setListening(false);
      recognitionRef.current = null;
      setMessage("Dictation could not start. Try again or type the treatment.");
    }
  }

  function addEntry() {
    const note = draft.trim();
    if (!note || !hasScene) return;
    const recordedAt = new Date().toISOString();
    const entry: SceneEntry = {
      id: createEntryId(),
      note,
      elapsedSeconds,
      recordedAt,
    };

    setWorkspace((current) => ({
      ...current,
      entries: [...current.entries, entry].slice(-100),
    }));
    setDraft("");
    setMessage(
      `Treatment added at ${formatSceneTime(entry.elapsedSeconds)}.`
    );
  }

  function deleteEntry(id: string) {
    setWorkspace((current) => ({
      ...current,
      entries: current.entries.filter((entry) => entry.id !== id),
    }));
    setMessage("Timeline entry removed.");
  }

  async function copyTimeline() {
    try {
      await navigator.clipboard.writeText(createSceneTimelineText(workspace));
      setMessage("Timeline copied. Review it before adding it to the ePCR.");
    } catch {
      setMessage("Unable to copy the timeline on this device.");
    }
  }

  return (
    <section
      aria-labelledby="scene-timer-title"
      className={`rounded-2xl border p-5 text-white ${tone}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Timer aria-hidden="true" className="h-5 w-5 text-sky-300" />
          <h2 id="scene-timer-title" className="text-lg font-bold">
            Scene Timer
          </h2>
        </div>
        {running ? (
          <span className="flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-200 ring-1 ring-emerald-400/30">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Running
          </span>
        ) : null}
      </div>

      <p className="mt-2 text-sm leading-5 text-slate-300">
        Continues accurately through screen sleep, navigation, and reload. It
        does not replace protocol-specific timing requirements.
      </p>

      <div
        className="my-6 text-center font-mono text-6xl font-bold tracking-tight"
        aria-label={`Elapsed scene time ${formatSceneTime(elapsedSeconds)}`}
      >
        {formatSceneTime(elapsedSeconds)}
      </div>

      {workspace.sceneStartedAt ? (
        <p className="mb-4 text-center text-xs font-medium text-slate-400">
          Started {formatSceneClockTime(workspace.sceneStartedAt)}
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={toggleTimer}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 font-bold text-white hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        >
          {running ? (
            <Pause aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Play aria-hidden="true" className="h-5 w-5" />
          )}
          {running ? "Pause" : hasScene ? "Resume" : "Start"}
        </button>
        <button
          type="button"
          onClick={resetScene}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 font-bold text-white hover:border-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        >
          <RotateCcw aria-hidden="true" className="h-5 w-5" />
          New Scene
        </button>
      </div>

      <div className="mt-6 border-t border-white/10 pt-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/25">
            <Mic aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-bold">Timestamp a treatment</h3>
            <p className="mt-1 text-sm leading-5 text-slate-400">
              Dictate or type one event, review the text, then add it to the
              scene timeline.
            </p>
          </div>
        </div>

        <label
          htmlFor="scene-treatment-note"
          className="mt-4 block text-xs font-bold uppercase tracking-[0.12em] text-slate-400"
        >
          Treatment or event
        </label>
        <textarea
          id="scene-treatment-note"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={
            hasScene
              ? "Example: Epinephrine 1 mg IV administered"
              : "Start the scene timer first"
          }
          rows={3}
          disabled={!hasScene}
          className="mt-2 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-3 text-base text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={toggleDictation}
            disabled={!hasScene}
            aria-pressed={listening}
            className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-50 ${
              listening
                ? "border-rose-400 bg-rose-600 text-white"
                : "border-violet-400/40 bg-violet-500/15 text-violet-100 hover:border-violet-300"
            }`}
          >
            {listening ? (
              <MicOff aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Mic aria-hidden="true" className="h-5 w-5" />
            )}
            {listening ? "Stop" : "Dictate"}
          </button>
          <button
            type="button"
            onClick={addEntry}
            disabled={!hasScene || !draft.trim()}
            className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-3 font-bold text-white hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            <Plus aria-hidden="true" className="h-5 w-5" />
            Add at {formatSceneTime(elapsedSeconds)}
          </button>
        </div>

        <p className="mt-3 text-xs leading-5 text-amber-200/90">
          Trial feature: browser speech services may process dictation. The app
          does not retain audio. Do not dictate patient identifiers, and verify
          every transcription before adding it.
        </p>
      </div>

      {workspace.entries.length > 0 ? (
        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-bold">Scene timeline</h3>
              <p className="mt-1 text-xs text-slate-400">
                {workspace.entries.length} timestamped{" "}
                {workspace.entries.length === 1 ? "entry" : "entries"}
              </p>
            </div>
            <button
              type="button"
              onClick={copyTimeline}
              className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm font-bold text-white hover:border-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <Clipboard aria-hidden="true" className="h-4 w-4" />
              Copy
            </button>
          </div>

          <ol className="mt-4 space-y-3">
            {workspace.entries.map((entry) => (
              <li
                key={entry.id}
                className="flex gap-3 rounded-xl border border-slate-700 bg-slate-950/80 p-3"
              >
                <span className="shrink-0 rounded-lg bg-sky-500/15 px-2 py-1 font-mono text-sm font-bold text-sky-200">
                  {formatSceneTime(entry.elapsedSeconds)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block break-words text-sm font-semibold text-white">
                    {entry.note}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {formatSceneClockTime(entry.recordedAt)}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => deleteEntry(entry.id)}
                  aria-label={`Delete timeline entry: ${entry.note}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-500 hover:bg-rose-500/10 hover:text-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                >
                  <Trash2 aria-hidden="true" className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ol>

          <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-400">
            <Check
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"
            />
            Draft field notes only. Review for accuracy before entering them
            into the official patient care record.
          </p>
        </div>
      ) : null}

      <p className="sr-only" role="status" aria-live="polite">
        {message}
      </p>
      {message ? (
        <p className="mt-4 rounded-xl border border-sky-400/20 bg-sky-950/40 p-3 text-sm text-sky-100">
          {message}
        </p>
      ) : null}
    </section>
  );
}
