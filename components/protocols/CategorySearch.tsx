"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { Protocol } from "../../data/protocols";
import { normalizeCategorySearchQuery, searchCategoryProtocols } from "../../lib/protocols/category-search";
import { getProtocolPageLabel } from "../../lib/protocols/page-range";
import { getPrimaryProtocolHref } from "../../data/structured-protocols";

type CategorySearchProps = {
  categoryId: string;
  categoryTitle: string;
  protocols: Protocol[];
};

export default function CategorySearch({ categoryId, categoryTitle, protocols }: CategorySearchProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeCategorySearchQuery(query);
  const matches = useMemo(
    () => searchCategoryProtocols(protocols, query),
    [protocols, query]
  );

  return (
    <section className="mb-5" aria-label={`Search ${categoryTitle} protocols`}>
      <label htmlFor={`${categoryId}-search`} className="sr-only">Search {categoryTitle}</label>
      <div className="relative">
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input id={`${categoryId}-search`} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search medications by name or code" autoComplete="off" className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-4 pr-12 pl-12 text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" />
        {normalizedQuery && <button type="button" onClick={() => setQuery("")} className="absolute right-2 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" aria-label="Clear medication search"><X aria-hidden="true" className="h-5 w-5" /></button>}
      </div>
      {normalizedQuery && (
        <div className="mt-3 space-y-2" aria-live="polite">
          {matches.length ? matches.map((protocol) => (
            <Link key={protocol.id} href={getPrimaryProtocolHref(categoryId, protocol.id)} className="block rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-sky-500 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
              <span className="block font-semibold text-white">{protocol.title}</span>
              <span className="mt-1 block text-sm text-slate-400">{protocol.code} · {getProtocolPageLabel(protocol)}</span>
            </Link>
          )) : <p className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-slate-400">No matching medications</p>}
        </div>
      )}
    </section>
  );
}
