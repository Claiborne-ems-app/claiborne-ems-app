import Link from "next/link";
import { Settings } from "lucide-react";
import CovenantHealthAirLogo from "../branding/CovenantHealthAirLogo";

export default function AppHeader() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <Link href="/" aria-label="Covenant Health Air home" className="flex min-h-11 items-center rounded-xl px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
        <CovenantHealthAirLogo className="h-8 w-auto max-w-36 object-contain" priority />
      </Link>

      <Link href="/settings" aria-label="Open settings" className="rounded-xl bg-slate-800 p-3 transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
        <Settings aria-hidden="true" className="h-5 w-5" />
      </Link>
    </header>
  );
}
