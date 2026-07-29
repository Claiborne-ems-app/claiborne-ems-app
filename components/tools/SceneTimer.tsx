"use client";

import { Pause, Play, RotateCcw, Timer } from "lucide-react";
import { useEffect, useState } from "react";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function SceneTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const tone = seconds >= 900 ? "border-rose-500/50 bg-rose-950/30 text-rose-100" : seconds >= 600 ? "border-amber-500/40 bg-amber-950/20 text-amber-100" : "border-slate-800 bg-slate-900 text-white";

  return (
    <section className={`rounded-2xl border p-5 ${tone}`}>
      <div className="flex items-center gap-2">
        <Timer aria-hidden="true" className="h-5 w-5 text-sky-300" />
        <h2 className="text-lg font-bold">Scene Timer</h2>
      </div>
      <p className="mt-2 text-sm text-slate-300">A simple operational timer. It does not replace protocol-specific timing requirements.</p>
      <div className="my-6 text-center font-mono text-6xl font-bold tracking-tight" aria-live="polite">{formatTime(seconds)}</div>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => setRunning((value) => !value)} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 font-bold text-white hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">
          {running ? <Pause aria-hidden="true" className="h-5 w-5" /> : <Play aria-hidden="true" className="h-5 w-5" />}{running ? "Pause" : "Start"}
        </button>
        <button type="button" onClick={() => { setRunning(false); setSeconds(0); }} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 font-bold text-white hover:border-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">
          <RotateCcw aria-hidden="true" className="h-5 w-5" />Reset
        </button>
      </div>
    </section>
  );
}
