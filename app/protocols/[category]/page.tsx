import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Files } from "lucide-react";
import BottomNav from "../../../components/navigation/BottomNav";
import AppHeader from "../../../components/navigation/AppHeader";
import CategorySearch from "../../../components/protocols/CategorySearch";
import { protocolCategories } from "../../../data/protocols";

export const dynamicParams = false;

export function generateStaticParams() {
  return protocolCategories.map((category) => ({
    category: category.id,
  }));
}

export default async function CategoryProtocolsPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryId } = await params;
  const category = protocolCategories.find((item) => item.id === categoryId);

  if (!category) {
    notFound();
  }

  const isMedicationCategory = category.id === "medications";

  return (
    <main className="min-h-screen pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md px-5">
        <AppHeader />

        <Link
          href="/protocols"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm font-semibold text-slate-200 transition active:scale-95 active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Categories
        </Link>

        <header
          className={`mt-4 overflow-hidden rounded-[1.75rem] border p-5 shadow-xl shadow-black/15 ${
            isMedicationCategory
              ? "border-blue-400/40 bg-gradient-to-br from-blue-600/30 via-blue-950/80 to-slate-950"
              : "border-white/10 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-950"
          }`}
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-sky-300">
            <Files aria-hidden="true" className="h-4 w-4" />
            {category.protocols.length} protocols
          </div>
          <h1 className="mt-3 text-[1.8rem] font-bold leading-8 tracking-[-0.025em]">
            {category.title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Search or select a protocol for the native field view.
          </p>
        </header>

        <div className="mt-5">
          <CategorySearch
            categoryId={category.id}
            categoryTitle={category.title}
            protocols={category.protocols}
          />
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
