import Link from "next/link";
import { ArrowLeft, Pill } from "lucide-react";
import AppHeader from "../../components/navigation/AppHeader";
import BottomNav from "../../components/navigation/BottomNav";
import MedicationDirectory from "../../components/medications/MedicationDirectory";

export default function MedicationsPage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md px-5">
        <AppHeader />
        <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-xl text-sm font-bold text-sky-300">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Home
        </Link>
        <header className="mt-3">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/25">
              <Pill aria-hidden="true" className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">Quick reference</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight">Medications</h1>
            </div>
          </div>
          <p className="mt-3 leading-6 text-slate-400">
            Searchable adult and pediatric reference doses organized by indication and provider level.
          </p>
        </header>

        <div className="mt-6">
          <MedicationDirectory />
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
