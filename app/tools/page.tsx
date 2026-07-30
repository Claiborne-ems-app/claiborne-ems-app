import Link from "next/link";
import { Activity, ArrowRight, BookOpenCheck, Search, ShieldAlert } from "lucide-react";
import AppHeader from "../../components/navigation/AppHeader";
import BottomNav from "../../components/navigation/BottomNav";
import SceneTimer from "../../components/tools/SceneTimer";
import ProviderViewTool from "../../components/tools/ProviderViewTool";
import { structuredProtocols } from "../../data/structured-protocols";

export default function ToolsPage() {
  const nativeProtocols = structuredProtocols.filter((protocol) => protocol.reviewStatus === "Reviewed" || protocol.reviewStatus === "Approved");

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

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link href="/#protocol-search" className="rounded-2xl border border-slate-800 bg-slate-900 p-4 hover:border-sky-500">
            <Search aria-hidden="true" className="h-6 w-6 text-sky-300" /><h2 className="mt-3 font-bold">Search all content</h2><p className="mt-1 text-sm text-slate-400">Titles and native text</p>
          </Link>
          <Link href="/protocols" className="rounded-2xl border border-slate-800 bg-slate-900 p-4 hover:border-sky-500">
            <BookOpenCheck aria-hidden="true" className="h-6 w-6 text-emerald-300" /><h2 className="mt-3 font-bold">Protocol library</h2><p className="mt-1 text-sm text-slate-400">Native and source PDFs</p>
          </Link>
        </div>

        <section className="mt-6 rounded-2xl border border-sky-500/25 bg-sky-950/20 p-5">
          <div className="flex items-center gap-2"><Activity aria-hidden="true" className="h-5 w-5 text-sky-300" /><h2 className="text-lg font-bold">Native quick references</h2></div>
          <div className="mt-4 space-y-3">
            {nativeProtocols.map((protocol) => (
              <Link key={`${protocol.categoryId}-${protocol.id}`} href={`/protocols/${protocol.categoryId}/${protocol.id}`} className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 hover:border-sky-500">
                <span><span className="block font-bold">{protocol.title}</span><span className="mt-0.5 block text-xs text-slate-400">Structured · searchable · field formatted</span></span>
                <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-sky-300" />
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-6 space-y-6">
          <SceneTimer />
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
