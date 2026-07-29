"use client";

import Link from "next/link";
import { ArrowLeft, House } from "lucide-react";
import { useRouter } from "next/navigation";
import { PROTOCOL_HOME_HREF, shouldUseBrowserBack } from "../../lib/protocols/structured-content";

export default function NativeReaderNavigation({ fallbackHref }: { fallbackHref: string }) {
  const router = useRouter();

  function goBack() {
    if (shouldUseBrowserBack(window.history.length)) {
      router.back();
      return;
    }
    router.replace(fallbackHref);
  }

  return (
    <nav aria-label="Protocol reader navigation" className="flex items-center gap-2">
      <button type="button" onClick={goBack} className="inline-flex min-h-11 items-center rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:border-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
        <ArrowLeft aria-hidden="true" className="mr-1.5 h-4 w-4" />Back
      </button>
      <Link href={PROTOCOL_HOME_HREF} className="inline-flex min-h-11 items-center rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:border-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
        <House aria-hidden="true" className="mr-1.5 h-4 w-4" />Home
      </Link>
    </nav>
  );
}
