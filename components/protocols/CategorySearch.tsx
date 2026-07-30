"use client";

import Link from "next/link";
import { ChevronRight, FileText, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { Protocol } from "../../data/protocols";
import { getPrimaryProtocolHref } from "../../data/structured-protocols";
import {
  normalizeCategorySearchQuery,
  searchCategoryProtocols,
} from "../../lib/protocols/category-search";

type CategorySearchProps = {
  categoryId: string;
  categoryTitle: string;
  protocols: Protocol[];
};

export default function CategorySearch({
  categoryId,
  categoryTitle,
  protocols,
}: CategorySearchProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeCategorySearchQuery(query);
  const matches = useMemo(
    () => searchCategoryProtocols(protocols, query),
    [protocols, query]
  );
  const visibleProtocols = normalizedQuery ? matches : protocols;
  const isMedicationCategory = categoryId === "medications";

  return (
    <section aria-label={`Search ${categoryTitle} protocols`}>
      <label htmlFor={`${categoryId}-search`} className="sr-only">
        Search {categoryTitle}
      </label>
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-300"
        />
        <input
          id={`${categoryId}-search`}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={
            isMedicationCategory
              ? "Search medications by name or code"
              : `Search ${categoryTitle.toLowerCase()}…`
          }
          autoComplete="off"
          enterKeyHint="search"
          className="min-h-14 w-full rounded-2xl border border-white/10 bg-slate-900/90 py-3.5 pl-12 pr-12 text-base text-white shadow-lg shadow-black/10 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
        />
        {normalizedQuery && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-1.5 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 active:bg-white/10 active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label={`Clear ${categoryTitle} search`}
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        )}
      </div>

      <div
        className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035]"
        aria-live="polite"
      >
        {visibleProtocols.length ? (
          visibleProtocols.map((protocol, index) => (
            <Link
              key={protocol.id}
              href={getPrimaryProtocolHref(categoryId, protocol.id)}
              className={`group flex min-h-[4.75rem] items-center gap-3 px-4 py-3.5 transition active:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400 ${
                index > 0 ? "border-t border-white/[0.07]" : ""
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${
                  isMedicationCategory
                    ? "bg-blue-500/20 text-blue-200 ring-blue-400/30"
                    : "bg-sky-500/10 text-sky-300 ring-sky-400/20"
                }`}
              >
                <FileText aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold leading-5 text-white">
                  {protocol.title}
                </span>
                <span className="mt-1 block text-xs text-slate-400">
                  {protocol.code} ·{" "}
                  {protocol.pages
                    ? `${protocol.pages} ${protocol.pages === 1 ? "page" : "pages"}`
                    : "PDF"}
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-slate-400"
              />
            </Link>
          ))
        ) : (
          <p className="p-5 text-sm text-slate-400">
            No matching {categoryTitle.toLowerCase()} protocols
          </p>
        )}
      </div>
    </section>
  );
}
