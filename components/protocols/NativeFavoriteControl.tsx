"use client";

import { Star } from "lucide-react";
import { useFavorites } from "../favorites/useFavorites";

export default function NativeFavoriteControl({
  categoryId,
  protocolId,
  protocolTitle,
}: {
  categoryId: string;
  protocolId: string;
  protocolTitle: string;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite({ categoryId, protocolId });

  return (
    <button
      type="button"
      onClick={() => toggleFavorite({ categoryId, protocolId })}
      aria-pressed={favorite}
      aria-label={`${favorite ? "Remove from" : "Add to"} Favorites: ${protocolTitle}`}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
        favorite
          ? "border-amber-400/40 bg-amber-400/15 text-amber-300"
          : "border-white/10 bg-white/[0.06] text-slate-300 active:bg-white/10"
      }`}
    >
      <Star
        aria-hidden="true"
        className="h-5 w-5"
        fill={favorite ? "currentColor" : "none"}
      />
    </button>
  );
}
