"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { protocolCategories } from "../../data/protocols";
import { getProtocolPageLabel } from "../../lib/protocols/page-range";
import { searchProtocols } from "../../lib/protocols/search";
import { Search, X } from "lucide-react";
import { getPrimaryProtocolHref } from "../../data/structured-protocols";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const results = useMemo(
    () => searchProtocols(protocolCategories, query),
    [query]
  );
  const hasQuery = query.trim().length > 0;

  return (
    <section aria-label="Search protocols">
      <label
        htmlFor="protocol-search"
        className="sr-only"
      >
        Search protocols
      </label>

      <div className="relative">
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input id="protocol-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search protocols..." autoComplete="off" aria-controls="protocol-search-results" className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-4 pr-12 pl-12 text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" />
        {hasQuery && <button type="button" onClick={() => setQuery("")} className="absolute right-2 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" aria-label="Clear protocol search"><X aria-hidden="true" className="h-5 w-5" /></button>}
      </div>

      {hasQuery && (
        <div
          id="protocol-search-results"
          className="mt-3 space-y-2"
          aria-live="polite"
        >
          {results.length > 0 ? (
            results.map(({ categoryId, categoryTitle, protocol }) => (
              <Link
                key={`${categoryId}-${protocol.id}`}
                href={getPrimaryProtocolHref(categoryId, protocol.id)}
                className="block rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-sky-500 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <div className="font-semibold text-white">
                  {protocol.title}
                </div>

                <div className="mt-1 text-sm text-slate-400">
                  {categoryTitle} · {getProtocolPageLabel(protocol)}
                </div>
              </Link>
            ))
          ) : (
            <p className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-slate-400">
              No matching protocols
            </p>
          )}
        </div>
      )}
    </section>
  );
}
