import Link from "next/link";
import { protocolCategories } from "../../data/protocols";
import BottomNav from "../../components/navigation/BottomNav";
import AppHeader from "../../components/navigation/AppHeader";

export default function ProtocolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md p-6">
        <AppHeader />

        <Link
          href="/"
          className="text-sky-400"
        >
          ← Home
        </Link>

        <h1 className="mt-4 mb-2 text-3xl font-bold">
          Protocol Categories
        </h1>

        <p className="mb-8 text-slate-400">
          Select a protocol category.
        </p>

        <div className="space-y-4">
          {protocolCategories.map((category) => (
            <Link
              key={category.id}
              href={`/protocols/${category.id}`}
              className="block"
            >
              <div className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-sky-500 hover:bg-slate-800">
                <div className="text-xl font-semibold">
                  {category.title}
                </div>

                <div className="mt-2 text-sm text-slate-400">
                  {category.protocols.length} protocols
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
