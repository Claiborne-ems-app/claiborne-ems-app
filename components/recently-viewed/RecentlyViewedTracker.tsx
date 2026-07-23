"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "./useRecentlyViewed";

type RecentlyViewedTrackerProps = {
  categoryId: string;
  protocolId: string;
};

export default function RecentlyViewedTracker({
  categoryId,
  protocolId,
}: RecentlyViewedTrackerProps) {
  const { recordProtocolView } = useRecentlyViewed();

  useEffect(() => {
    recordProtocolView({ categoryId, protocolId });
  }, [categoryId, protocolId, recordProtocolView]);

  return null;
}
