"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { protocolCategories } from "../../data/protocols";
import { getPrimaryProtocolHref } from "../../data/structured-protocols";
import { searchProtocols } from "../../lib/protocols/search";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const results = useMemo(
    () => searchProtocols(protocolCategories, query),
    [query]
  );
  const hasQuery = query.trim().length > 0;

  return (
    <section id="protocol-search" aria-label="Search protocols" className="relative z-10">
      <label htmlFor="protocol-search-input" className="sr-only">
        Search protocols, symptoms, medications, or protocol numbers
      </label>

      <div className="relative">
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-300" />
        <input
          id="protocol-search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search protocols, meds, symptoms…"
          autoComplete="off"
          enterKeyHint="search"
          aria-controls="protocol-search-results"
          className="min-h-14 w-full rounded-2xl border border-white/10 bg-slate-900/90 py-3.5 pl-12 pr-12 text-base text-white shadow-lg shadow-black/10 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
        />
        {hasQuery && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-1.5 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 active:bg-white/10 active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Clear protocol search"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        )}
      </div>

      {hasQuery && (
        <div
          id="protocol-search-results"
          className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/35"
          aria-live="polite"
        >
          {results.length > 0 ? (
            results.map(({ categoryId, categoryTitle, protocol, matchLabel, snippet }, index) => (
              <Link
                key={`${categoryId}-${protocol.id}`}
                href={getPrimaryProtocolHref(categoryId, protocol.id)}
                className={`block p-4 transition active:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400 ${index > 0 ? "border-t border-white/[0.07]" : ""}`}
              >
                <div className="font-semibold text-white">{protocol.title}</div>
                <div className="mt-1 text-xs text-slate-400">
                  {categoryTitle} · {protocol.code}{matchLabel ? ` · ${matchLabel}` : ""}
                </div>
                {snippet ? (
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-300">
                    {snippet}
                  </p>
                ) : null}
              </Link>
            ))
          ) : (
            <p className="p-4 text-sm text-slate-400">No matching protocols</p>
          )}
        </div>
      )}
    </section>
  );
}
