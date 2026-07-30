"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { protocolCategories } from "../../data/protocols";
import { getPrimaryProtocolHref } from "../../data/structured-protocols";
import { searchProtocols } from "../../lib/protocols/search";

const examples = ["Chest pain", "Epinephrine", "Stroke", "PC 05"];

export default function ProtocolSearchTool() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim();
  const results = useMemo(
    () =>
      normalizedQuery.length >= 2
        ? searchProtocols(protocolCategories, normalizedQuery, 20)
        : [],
    [normalizedQuery]
  );

  return (
    <section
      aria-labelledby="tools-protocol-search-title"
      className="rounded-2xl border border-sky-500/30 bg-sky-950/20 p-5"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/20">
          <Search aria-hidden="true" className="h-5 w-5" />
        </span>
        <div>
          <h2 id="tools-protocol-search-title" className="text-lg font-bold">
            Protocol Search
          </h2>
          <p className="mt-1 text-sm leading-5 text-slate-400">
            Search symptoms, medications, abbreviations, protocol numbers, and native clinical text.
          </p>
        </div>
      </div>

      <label htmlFor="tools-protocol-search-input" className="sr-only">
        Search all protocols
      </label>
      <div className="relative mt-4">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
        />
        <input
          id="tools-protocol-search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Symptom, medication, or protocol #"
          autoComplete="off"
          aria-controls="tools-protocol-search-results"
          className="min-h-14 w-full rounded-xl border border-slate-600 bg-slate-950 py-3 pl-12 pr-12 text-base text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        />
        {normalizedQuery ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear protocol search"
            className="absolute right-1.5 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 hover:text-white"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      {!normalizedQuery ? (
        <div className="mt-3 flex flex-wrap gap-2" aria-label="Example searches">
          {examples.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setQuery(example)}
              className="min-h-10 rounded-full border border-slate-700 bg-slate-950 px-3 text-xs font-bold text-slate-300 hover:border-sky-500 hover:text-white"
            >
              {example}
            </button>
          ))}
        </div>
      ) : null}

      <div id="tools-protocol-search-results" className="mt-3 space-y-2" aria-live="polite">
        {normalizedQuery.length === 1 ? (
          <p className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-slate-400">
            Enter at least two characters.
          </p>
        ) : null}

        {normalizedQuery.length >= 2 && results.length ? (
          <>
            <p className="px-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              {results.length === 20 ? "Top 20 matches" : `${results.length} ${results.length === 1 ? "match" : "matches"}`}
            </p>
            {results.map(
              ({ categoryId, categoryTitle, protocol, matchLabel, snippet }) => (
                <Link
                  key={`${categoryId}-${protocol.id}`}
                  href={getPrimaryProtocolHref(categoryId, protocol.id)}
                  className="flex min-h-16 items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 p-4 transition hover:border-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-white">
                      {protocol.title}
                    </span>
                    <span className="mt-1 block text-xs text-sky-300">
                      {protocol.code} · {categoryTitle}
                    </span>
                    {matchLabel ? (
                      <span className="mt-1 block text-xs font-medium text-slate-500">
                        Matched: {matchLabel}
                      </span>
                    ) : null}
                    {snippet ? (
                      <span className="mt-2 line-clamp-2 block text-sm leading-5 text-slate-300">
                        {snippet}
                      </span>
                    ) : null}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-sky-300"
                  />
                </Link>
              )
            )}
          </>
        ) : null}

        {normalizedQuery.length >= 2 && results.length === 0 ? (
          <p className="rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-400">
            No matching protocols. Try a symptom, medication name, abbreviation, or protocol number.
          </p>
        ) : null}
      </div>
    </section>
  );
}
