"use client";

import type { PdfViewingMode } from "../../lib/protocols/viewing-mode";
import { usePdfViewingMode } from "./usePdfViewingMode";

const options: { value: PdfViewingMode; title: string; description: string }[] = [
  { value: "protocol", title: "Protocol View", description: "Show only pages that belong to the selected protocol." },
  { value: "manual", title: "Full Manual View", description: "Use the browser PDF viewer with document links and full-manual navigation." },
];

export default function PdfViewingModeSelector() {
  const { mode, setMode } = usePdfViewingMode();

  function selectMode(nextMode: PdfViewingMode) {
    setMode(nextMode);
  }

  return (
    <fieldset className="space-y-3">
      <legend className="text-lg font-semibold text-white">PDF Viewing Mode</legend>
      <p className="text-sm text-slate-400">Applies the next time a protocol is opened.</p>
      {options.map((option) => (
        <label key={option.value} className="flex cursor-pointer gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-sky-500 focus-within:ring-2 focus-within:ring-sky-400">
          <input type="radio" name="pdf-viewing-mode" value={option.value} checked={mode === option.value} onChange={() => selectMode(option.value)} className="mt-1 accent-sky-500" />
          <span>
            <span className="block font-semibold text-white">{option.title}</span>
            <span className="mt-1 block text-sm text-slate-400">{option.description}</span>
          </span>
        </label>
      ))}
    </fieldset>
  );
}
