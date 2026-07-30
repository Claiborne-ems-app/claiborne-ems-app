import Link from "next/link";
import { ArrowRight, Baby, BookOpenCheck, Pill, ShieldAlert } from "lucide-react";
import AppHeader from "../../components/navigation/AppHeader";
import BottomNav from "../../components/navigation/BottomNav";
import SceneTimer from "../../components/tools/SceneTimer";
import ProviderViewTool from "../../components/tools/ProviderViewTool";
import ProtocolSearchTool from "../../components/tools/ProtocolSearchTool";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md p-6">
        <AppHeader />
        <header className="mt-4">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">Field workspace</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Clinical Tools</h1>
          <p className="mt-2 leading-6 text-slate-400">Fast access to native protocols and operational field tools.</p>
        </header>

        <aside className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 text-sm leading-6 text-amber-100">
          <div className="flex gap-3"><ShieldAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" /><p>Beta tools are decision-support aids only. Confirm information against the current approved protocol and clinical judgment.</p></div>
        </aside>

        <div className="mt-6">
          <ProviderViewTool />
        </div>

        <div className="mt-6">
          <ProtocolSearchTool />
        </div>

        <Link href="/medications" className="mt-6 flex items-center gap-4 rounded-2xl border border-sky-400/35 bg-gradient-to-br from-sky-950/55 to-slate-900 p-5 hover:border-sky-300">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/25">
            <Pill aria-hidden="true" className="h-6 w-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-extrabold">Medication Quick Reference</span>
            <span className="mt-1 block text-sm leading-5 text-slate-400">Searchable adult and pediatric doses by provider level</span>
          </span>
          <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-sky-300" />
        </Link>

        <Link href="/tools/pediatric-resuscitation" className="mt-6 flex items-center gap-4 rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-950/40 to-slate-900 p-5 hover:border-pink-400">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-500/15 text-pink-300 ring-1 ring-pink-400/25">
            <Baby aria-hidden="true" className="h-6 w-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-extrabold">Pediatric Resuscitation</span>
            <span className="mt-1 block text-sm leading-5 text-slate-400">Weight-based medications, fluids, and electrical energy</span>
          </span>
          <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-pink-300" />
        </Link>

        <Link href="/protocols" className="mt-6 flex min-h-16 items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 hover:border-emerald-500">
          <BookOpenCheck aria-hidden="true" className="h-6 w-6 shrink-0 text-emerald-300" />
          <span className="min-w-0 flex-1">
            <span className="block font-bold">Protocol Library</span>
            <span className="mt-1 block text-sm text-slate-400">Browse categories, native protocols, and source PDFs</span>
          </span>
          <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-emerald-300" />
        </Link>

        <div className="mt-6 space-y-6">
          <SceneTimer />
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
