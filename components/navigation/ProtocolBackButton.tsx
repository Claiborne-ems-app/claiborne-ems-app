"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type ProtocolBackButtonProps = {
  fallbackHref: string;
  label: string;
  fallbackLabel?: string;
};

export default function ProtocolBackButton({
  fallbackHref,
  label,
  fallbackLabel = label,
}: ProtocolBackButtonProps) {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.replace(fallbackHref);
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label={`Back to the previous page. If unavailable, go to ${fallbackLabel}.`}
      className="text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
    >
      <ArrowLeft aria-hidden="true" className="mr-1 inline h-4 w-4" />{label}
    </button>
  );
}
