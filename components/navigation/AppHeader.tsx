import Link from "next/link";
import { ShieldPlus, Settings } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <Link href="/" aria-label="Claiborne EMS Protocols home" className="flex min-h-11 items-center gap-2 rounded-xl px-1 font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/20"><ShieldPlus aria-hidden="true" className="h-5 w-5" /></span>
        <span>Claiborne EMS</span>
      </Link>

      <Link href="/settings" aria-label="Open settings" className="rounded-xl bg-slate-800 p-3 transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
        <Settings aria-hidden="true" className="h-5 w-5" />
      </Link>
    </header>
  );
}
