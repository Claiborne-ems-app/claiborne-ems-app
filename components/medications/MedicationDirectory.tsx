"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, BookOpenCheck, Search, X } from "lucide-react";
import ProviderLevelSelector, {
  CLINICAL_PROVIDER_LEVELS,
  useProviderLevel,
} from "../provider/ProviderLevelSelector";
import {
  medicationReferences,
  medicationReferenceSource,
  type MedicationProviderLevel,
} from "../../data/medication-reference";

const levelStyle: Record<MedicationProviderLevel, string> = {
  EMT: "border-blue-400/30 bg-blue-500/15 text-blue-200",
  AEMT: "border-amber-400/30 bg-amber-500/15 text-amber-200",
  Paramedic: "border-red-400/30 bg-red-500/15 text-red-200",
};

export default function MedicationDirectory() {
  const { providerLevel, setProviderLevel } = useProviderLevel();
  const [query, setQuery] = useState("");
  const selectedIndex = CLINICAL_PROVIDER_LEVELS.indexOf(providerLevel);

  const medications = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return medicationReferences
      .map((medication) => ({
        ...medication,
        doses: medication.doses.filter(
          (dose) => CLINICAL_PROVIDER_LEVELS.indexOf(dose.level) <= selectedIndex
        ),
      }))
      .filter((medication) => {
        if (medication.doses.length === 0) return false;
        if (!normalized) return true;
        return [
          medication.name,
          ...medication.tradeNames,
          ...medication.uses,
          ...medication.doses.flatMap((dose) => [
            dose.indication,
            dose.adult,
            dose.pediatric,
          ]),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      });
  }, [query, selectedIndex]);

  return (
    <>
      <aside className="rounded-2xl border border-red-500/35 bg-red-950/35 p-4 text-sm leading-6 text-red-50">
        <div className="flex gap-3">
          <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
          <div>
            <p className="font-extrabold">Draft medication reference — not yet an approved formulary</p>
            <p className="mt-1 text-red-100/80">
              Confirm the indication, concentration, route, dose, repeat interval, contraindications,
              and provider authorization in the current approved Claiborne standing order. The
              protocol-specific order controls if any value differs.
            </p>
          </div>
        </div>
      </aside>

      <div className="mt-5">
        <ProviderLevelSelector
          value={providerLevel}
          onChange={setProviderLevel}
          label="Medication Provider View"
        />
      </div>

      <div className="relative mt-5">
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search medication, brand, or indication"
          aria-label="Search medications"
          className="min-h-14 w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-12 text-base text-white outline-none placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/25"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear medication search"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 active:bg-white/10"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <p className="font-semibold text-slate-300">
          {medications.length} {medications.length === 1 ? "medication" : "medications"}
        </p>
        <p className="text-right text-xs text-slate-500">Showing {providerLevel} and lower-level care</p>
      </div>

      <section aria-label="Medication quick reference" className="mt-4 space-y-3">
        {medications.map((medication) => (
          <details
            key={medication.id}
            className="group overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-950/45 to-slate-900 shadow-lg shadow-black/10 open:border-sky-400/45"
          >
            <summary className="flex min-h-[5.25rem] cursor-pointer list-none items-center gap-4 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/25">
                <span aria-hidden="true" className="text-lg font-black">{medication.name.slice(0, 1)}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-extrabold tracking-tight text-white">{medication.name}</span>
                <span className="mt-1 block truncate text-sm text-slate-400">
                  {medication.tradeNames.length ? medication.tradeNames.join(" · ") : medication.uses.join(" · ")}
                </span>
              </span>
              <span aria-hidden="true" className="text-2xl font-light text-sky-300 transition group-open:rotate-45">+</span>
            </summary>

            <div className="border-t border-white/[0.07] px-4 pb-5 pt-4">
              <div className="flex flex-wrap gap-2">
                {medication.uses.map((use) => (
                  <span key={use} className="rounded-full border border-slate-700 bg-slate-950/70 px-2.5 py-1 text-xs font-semibold text-slate-300">
                    {use}
                  </span>
                ))}
              </div>

              <div className="mt-4 space-y-3">
                {medication.doses.map((dose) => (
                  <article key={`${medication.id}-${dose.level}-${dose.indication}`} className="rounded-xl border border-white/[0.08] bg-slate-950/55 p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full border px-2.5 py-1 text-[0.68rem] font-extrabold uppercase tracking-wide ${levelStyle[dose.level]}`}>
                        {dose.level}
                      </span>
                      <h3 className="text-sm font-bold text-white">{dose.indication}</h3>
                    </div>
                    <dl className="mt-3 grid gap-3">
                      <div>
                        <dt className="text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-sky-300">Adult reference</dt>
                        <dd className="mt-1 text-sm leading-6 text-slate-200">{dose.adult}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-pink-300">Pediatric reference</dt>
                        <dd className="mt-1 text-sm leading-6 text-slate-200">{dose.pediatric}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-950/20 p-3">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-amber-300">Safety checks</p>
                <ul className="mt-2 space-y-1.5 text-sm leading-5 text-amber-50/85">
                  {medication.cautions.map((caution) => <li key={caution}>• {caution}</li>)}
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {medication.protocolLinks.map((protocol) => (
                  <Link
                    key={protocol.href}
                    href={protocol.href}
                    className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-sky-500/25 bg-sky-500/10 px-3 py-2 text-xs font-bold text-sky-200"
                  >
                    <BookOpenCheck aria-hidden="true" className="h-4 w-4" />
                    {protocol.label}
                  </Link>
                ))}
              </div>
            </div>
          </details>
        ))}
      </section>

      {medications.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
          <p className="font-bold text-white">No medication matches</p>
          <p className="mt-2 text-sm text-slate-400">Try another name, brand, or indication.</p>
        </div>
      ) : null}

      <footer className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs leading-5 text-slate-500">
        <p>{medicationReferenceSource.label}</p>
        <a
          href={medicationReferenceSource.href}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex min-h-10 items-center font-bold text-sky-300"
        >
          Open Tennessee source PDF
        </a>
        <p>Source comparison reviewed {medicationReferenceSource.reviewed}.</p>
      </footer>
    </>
  );
}
