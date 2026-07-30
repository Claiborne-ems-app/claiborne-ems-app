"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ChevronRight, History } from "lucide-react";
import { protocolCategories } from "../../data/protocols";
import { getPrimaryProtocolHref } from "../../data/structured-protocols";
import { useRecentlyViewed } from "../recently-viewed/useRecentlyViewed";

export default function RecentlyViewedList() {
  const { recentlyViewed } = useRecentlyViewed();
  const protocols = useMemo(
    () =>
      recentlyViewed.flatMap((reference) => {
        const category = protocolCategories.find((item) => item.id === reference.categoryId);
        const protocol = category?.protocols.find((item) => item.id === reference.protocolId);
        return category && protocol ? [{ category, protocol }] : [];
      }),
    [recentlyViewed]
  );

  if (protocols.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 text-slate-400">
        <p className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <History aria-hidden="true" className="h-4 w-4 text-sky-400" />
          No recently viewed protocols
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04]">
      {protocols.map(({ category, protocol }, index) => (
        <Link
          key={`${category.id}-${protocol.id}`}
          href={getPrimaryProtocolHref(category.id, protocol.id)}
          className={`flex min-h-16 items-center gap-3 px-4 py-3.5 transition active:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400 ${index > 0 ? "border-t border-white/[0.07]" : ""}`}
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate font-semibold text-white">{protocol.title}</span>
            <span className="mt-0.5 block text-xs text-slate-400">{category.title} · {protocol.code}</span>
          </span>
          <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-600" />
        </Link>
      ))}
    </div>
  );
}
