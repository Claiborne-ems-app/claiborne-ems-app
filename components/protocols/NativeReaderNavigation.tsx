"use client";

import Link from "next/link";
import { ArrowLeft, House } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  PROTOCOL_HOME_HREF,
  shouldUseBrowserBack,
} from "../../lib/protocols/structured-content";

export default function NativeReaderNavigation({
  fallbackHref,
}: {
  fallbackHref: string;
}) {
  const router = useRouter();

  function goBack() {
    if (shouldUseBrowserBack(window.history.length)) {
      router.back();
      return;
    }
    router.replace(fallbackHref);
  }

  const controlClass =
    "inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/[0.06] px-3.5 text-sm font-semibold text-slate-200 transition active:scale-95 active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400";

  return (
    <nav aria-label="Protocol reader navigation" className="flex items-center gap-2">
      <button type="button" onClick={goBack} className={controlClass}>
        <ArrowLeft aria-hidden="true" className="mr-1.5 h-4 w-4" />
        Back
      </button>
      <Link
        href={PROTOCOL_HOME_HREF}
        aria-label="Protocol categories"
        className={`${controlClass} h-11 w-11 justify-center px-0`}
      >
        <House aria-hidden="true" className="h-4 w-4" />
      </Link>
    </nav>
  );
}
