"use client";

import { useEffect, useState } from "react";
import type { ProviderLevel } from "../../lib/protocols/structured-content";

export type ClinicalProviderLevel = Exclude<ProviderLevel, "Medical Control">;

export const CLINICAL_PROVIDER_LEVELS: ClinicalProviderLevel[] = [
  "EMT",
  "AEMT",
  "Paramedic",
];

const STORAGE_KEY = "claiborne-provider-level";
const CHANGE_EVENT = "claiborne-provider-level-change";

const optionClass: Record<ClinicalProviderLevel, { selected: string; idle: string }> = {
  EMT: {
    selected: "border-blue-400 bg-blue-600 text-white shadow-blue-950/40",
    idle: "border-blue-500/30 bg-blue-950/30 text-blue-200 hover:border-blue-400/60",
  },
  AEMT: {
    selected: "border-amber-400 bg-amber-500 text-slate-950 shadow-amber-950/40",
    idle: "border-amber-500/30 bg-amber-950/25 text-amber-200 hover:border-amber-400/60",
  },
  Paramedic: {
    selected: "border-red-400 bg-red-600 text-white shadow-red-950/40",
    idle: "border-red-500/30 bg-red-950/30 text-red-200 hover:border-red-400/60",
  },
};

function isClinicalProviderLevel(value: string | null): value is ClinicalProviderLevel {
  return value === "EMT" || value === "AEMT" || value === "Paramedic";
}

export function useProviderLevel() {
  const [providerLevel, setProviderLevelState] = useState<ClinicalProviderLevel>("EMT");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isClinicalProviderLevel(stored)) setProviderLevelState(stored);

    const handleChange = (event: Event) => {
      const next = (event as CustomEvent<string>).detail;
      if (isClinicalProviderLevel(next)) setProviderLevelState(next);
    };
    window.addEventListener(CHANGE_EVENT, handleChange);
    return () => window.removeEventListener(CHANGE_EVENT, handleChange);
  }, []);

  const setProviderLevel = (next: ClinicalProviderLevel) => {
    setProviderLevelState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: next }));
  };

  return { providerLevel, setProviderLevel };
}

export function clinicalLevelsFor(
  selected: ClinicalProviderLevel
): ClinicalProviderLevel[] {
  const selectedIndex = CLINICAL_PROVIDER_LEVELS.indexOf(selected);
  return CLINICAL_PROVIDER_LEVELS.slice(0, selectedIndex + 1);
}

export default function ProviderLevelSelector({
  value,
  onChange,
  label = "Provider View",
}: {
  value: ClinicalProviderLevel;
  onChange: (level: ClinicalProviderLevel) => void;
  label?: string;
}) {
  return (
    <section aria-labelledby="provider-view-label" className="rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-lg shadow-black/10">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 id="provider-view-label" className="font-bold text-white">{label}</h2>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Higher levels include all lower-level care.
          </p>
        </div>
        <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-bold text-slate-300">
          {value}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Select provider level">
        {CLINICAL_PROVIDER_LEVELS.map((level) => {
          const selected = value === level;
          return (
            <button
              key={level}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(level)}
              className={`min-h-12 rounded-xl border px-2 py-3 text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${selected ? `${optionClass[level].selected} shadow-lg` : optionClass[level].idle}`}
            >
              {level}
            </button>
          );
        })}
      </div>
    </section>
  );
}
