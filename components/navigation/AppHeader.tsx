import Link from "next/link";
import { Settings } from "lucide-react";
import { CovenantHealthEmsMark } from "../branding/CovenantHealthEmsLogo";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-20 -mx-5 mb-5 flex items-center justify-between border-b border-white/[0.06] bg-slate-950/80 px-5 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-xl">
      <Link
        href="/"
        aria-label="Claiborne EMS Protocols home"
        className="flex min-h-11 items-center gap-3 rounded-xl pr-2 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        <CovenantHealthEmsMark className="h-10 w-10 ring-1 ring-white/10" />
        <span>
          <span className="block text-[0.68rem] font-semibold uppercase leading-4 tracking-[0.12em] text-sky-300">
            Covenant Health EMS
          </span>
          <span className="block text-[0.95rem] leading-5 tracking-[-0.01em]">Claiborne Protocols</span>
        </span>
      </Link>

      <Link
        href="/settings"
        aria-label="Open settings"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition active:scale-95 active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        <Settings aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
      </Link>
    </header>
  );
}
