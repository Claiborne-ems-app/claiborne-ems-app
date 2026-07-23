"use client";

import { Star } from "lucide-react";
import { useFavorites } from "../favorites/useFavorites";

export default function NativeFavoriteControl({ categoryId, protocolId, protocolTitle }: { categoryId: string; protocolId: string; protocolTitle: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite({ categoryId, protocolId });

  return (
    <button type="button" onClick={() => toggleFavorite({ categoryId, protocolId })} aria-pressed={favorite} aria-label={`${favorite ? "Remove from" : "Add to"} Favorites: ${protocolTitle}`} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${favorite ? "border-amber-400/40 bg-amber-400/10 text-amber-300" : "border-slate-700 bg-slate-900 text-slate-400 hover:border-amber-400/40 hover:text-amber-300"}`}>
      <Star aria-hidden="true" className="h-5 w-5" fill={favorite ? "currentColor" : "none"} />
    </button>
  );
}
