import Link from "next/link";
import { FileQuestion } from "lucide-react";
import AppHeader from "../components/navigation/AppHeader";
import BottomNav from "../components/navigation/BottomNav";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md p-6">
        <AppHeader />
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
          <FileQuestion aria-hidden="true" className="mx-auto h-10 w-10 text-sky-400" />
          <h1 className="mt-4 text-2xl font-bold">Protocol not found</h1>
          <p className="mt-3 text-slate-400">This protocol link may be outdated or unavailable in the current manual.</p>
          <Link href="/protocols" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-sky-600 px-4 font-semibold text-white hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">Browse protocols</Link>
        </section>
      </div>
      <BottomNav />
    </main>
  );
}
