"use client";

import Link from "next/link";
import { useMemo } from "react";
import { protocolCategories } from "../../data/protocols";
import { useFavorites } from "../favorites/useFavorites";
import { Star } from "lucide-react";
import { getPrimaryProtocolHref } from "../../data/structured-protocols";

export default function FavoritesList() {
  const { favorites } = useFavorites();
  const protocols = useMemo(
    () =>
      favorites.flatMap((favorite) => {
        const category = protocolCategories.find(
          (item) => item.id === favorite.categoryId
        );
        const protocol = category?.protocols.find(
          (item) => item.id === favorite.protocolId
        );

        return category && protocol ? [{ category, protocol }] : [];
      }),
    [favorites]
  );

  if (protocols.length === 0) {
    return (
      <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 text-slate-400">
        <p className="flex items-center gap-2 font-medium text-slate-300"><Star aria-hidden="true" className="h-5 w-5 text-sky-400" />No favorites yet.</p>
        <p className="mt-2 text-sm">
          Favorite protocols will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6 space-y-3">
      {protocols.map(({ category, protocol }) => (
        <Link
          key={`${category.id}-${protocol.id}`}
          href={getPrimaryProtocolHref(category.id, protocol.id)}
          className="block rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-sky-500 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <div className="font-semibold text-white">
            {protocol.title}
          </div>

          <div className="mt-1 text-sm text-slate-400">
            {category.title} · {protocol.code}
          </div>
        </Link>
      ))}
    </div>
  );
}
