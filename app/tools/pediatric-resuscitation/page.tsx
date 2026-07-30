import Link from "next/link";
import { ArrowLeft, Baby } from "lucide-react";
import AppHeader from "../../../components/navigation/AppHeader";
import BottomNav from "../../../components/navigation/BottomNav";
import PediatricResuscitationCalculator from "../../../components/tools/PediatricResuscitationCalculator";

export default function PediatricResuscitationPage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md p-6">
        <AppHeader />
        <Link href="/tools" className="inline-flex min-h-11 items-center gap-2 rounded-xl text-sm font-bold text-sky-300">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Clinical Tools
        </Link>
        <header className="mt-3">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/15 text-pink-300 ring-1 ring-pink-400/25">
              <Baby aria-hidden="true" className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">Field calculator</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight">Pediatric Resuscitation</h1>
            </div>
          </div>
          <p className="mt-3 leading-6 text-slate-400">
            Weight-based medication doses, fluid volumes, and electrical energy from the reviewed Claiborne pediatric protocols.
          </p>
        </header>

        <div className="mt-6">
          <PediatricResuscitationCalculator />
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
