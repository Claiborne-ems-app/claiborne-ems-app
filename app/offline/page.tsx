import Link from "next/link";
import { CloudOff } from "lucide-react";
import AppHeader from "../../components/navigation/AppHeader";
import BottomNav from "../../components/navigation/BottomNav";

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md p-6">
        <AppHeader />
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
          <CloudOff aria-hidden="true" className="mx-auto h-12 w-12 text-slate-400" />
          <h1 className="mt-4 text-2xl font-bold">This page is not available offline</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">Reconnect to the internet, or return to content included in your downloaded offline package.</p>
          <Link href="/" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-sky-600 px-5 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">Return Home</Link>
        </section>
      </div>
      <BottomNav />
    </main>
  );
}
