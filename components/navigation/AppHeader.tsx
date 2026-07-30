import Link from "next/link";
import { Settings } from "lucide-react";
import { CovenantHealthEmsMark } from "../branding/CovenantHealthEmsLogo";

export default function AppHeader() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <Link
        href="/"
        aria-label="Claiborne EMS Protocols home"
        className="flex min-h-11 items-center gap-3 rounded-xl px-1 font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      >
        <CovenantHealthEmsMark className="h-11 w-11 ring-1 ring-blue-900/20" />
        <span>
          <span className="block text-sm leading-tight text-blue-200">Covenant Health</span>
          <span className="block leading-tight">Claiborne EMS</span>
        </span>
      </Link>

      <Link
        href="/settings"
        aria-label="Open settings"
        className="rounded-xl bg-slate-800 p-3 transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      >
        <Settings aria-hidden="true" className="h-5 w-5" />
      </Link>
    </header>
  );
}
