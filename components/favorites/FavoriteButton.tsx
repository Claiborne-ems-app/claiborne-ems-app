"use client";

import { useFavorites } from "./useFavorites";
import { Star } from "lucide-react";

type FavoriteButtonProps = {
  categoryId: string;
  protocolId: string;
  protocolTitle: string;
};

export default function FavoriteButton({
  categoryId,
  protocolId,
  protocolTitle,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite({ categoryId, protocolId });
  const action = favorite ? "Remove from Favorites" : "Add to Favorites";

  return (
    <button
      type="button"
      onClick={() => toggleFavorite({ categoryId, protocolId })}
      aria-pressed={favorite}
      aria-label={`${action}: ${protocolTitle}`}
      className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 text-left text-slate-300 transition hover:border-sky-500 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
    >
      <Star aria-hidden="true" className="mr-2 inline h-5 w-5" />{action}
    </button>
  );
}
