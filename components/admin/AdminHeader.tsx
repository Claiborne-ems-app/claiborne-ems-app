import Link from "next/link";
import { ShieldCheck, ShieldPlus } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/admin" className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
          <span className="flex items-center gap-2 font-bold text-white"><ShieldPlus aria-hidden="true" className="h-6 w-6 text-sky-300" />Claiborne EMS</span>
          <span className="hidden h-6 w-px bg-slate-700 sm:block" />
          <span className="hidden text-sm font-semibold text-slate-200 sm:block">Review Admin</span>
        </Link>
        <div className="flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-200">
          <ShieldCheck aria-hidden="true" className="h-4 w-4" />
          Auth placeholder
        </div>
      </div>
    </header>
  );
}
