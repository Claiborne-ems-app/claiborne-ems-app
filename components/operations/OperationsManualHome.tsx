"use client";

import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
import { useRecentOperationsPages } from "./useRecentOperationsPages";

export default function OperationsManualHome() {
  const { recentPages } = useRecentOperationsPages();

  return (
    <>
      <section className="mt-6" aria-label="Search operations manual">
        <label htmlFor="operations-search" className="sr-only">Search the operations manual</label>
        <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            id="operations-search"
            type="search"
            placeholder="Search the operations manual..."
            autoComplete="off"
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-4 pr-4 pl-12 text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          />
        </div>
      </section>

      <Link href="/operations/viewer?page=1" className="mt-4 flex min-h-12 w-full items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
        <BookOpen aria-hidden="true" className="mr-2 h-5 w-5" />Open Full Manual
      </Link>

      <section className="mt-8" aria-labelledby="recent-operations-pages">
        <h2 id="recent-operations-pages" className="mb-4 text-xl font-semibold">Recently Viewed</h2>
        {recentPages.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {recentPages.map((entry) => (
              <Link key={entry.page} href={`/operations/viewer?page=${entry.page}`} className="rounded-xl border border-slate-800 bg-slate-900 p-4 font-medium transition hover:border-sky-500 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
                Page {entry.page}
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-slate-400">Pages you open will appear here.</p>
        )}
      </section>
    </>
  );
}
