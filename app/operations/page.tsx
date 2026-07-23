import Link from "next/link";
import AppHeader from "../../components/navigation/AppHeader";
import BottomNav from "../../components/navigation/BottomNav";
import OperationsManualHome from "../../components/operations/OperationsManualHome";

export default function OperationsPage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md p-6">
        <AppHeader />
        <Link href="/" className="text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">← Home</Link>
        <h1 className="mt-4 text-3xl font-bold">Operations Manual</h1>
        <p className="mt-2 text-slate-400">Medical Operations Manual</p>
        <OperationsManualHome />
      </div>
      <BottomNav />
    </main>
  );
}
