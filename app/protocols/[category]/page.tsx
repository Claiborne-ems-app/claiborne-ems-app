import Link from "next/link";
import { notFound } from "next/navigation";
import BottomNav from "../../../components/navigation/BottomNav";
import AppHeader from "../../../components/navigation/AppHeader";
import { protocolCategories } from "../../../data/protocols";
import CategorySearch from "../../../components/protocols/CategorySearch";
import { getPrimaryProtocolHref } from "../../../data/structured-protocols";

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
  const category = protocolCategories.find(
    (item) => item.id === categoryId
  );

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md p-6">
        <AppHeader />

        <Link
          href="/protocols"
          className="text-sky-400"
        >
          ← Categories
        </Link>

        <h1 className="mt-4 mb-8 text-3xl font-bold">
          {category.title} Protocols
        </h1>

        {category.id === "medications" && (
          <CategorySearch
            categoryId={category.id}
            categoryTitle={category.title}
            protocols={category.protocols}
          />
        )}

        <div className="space-y-4">
          {category.protocols.length === 0 ? (
            <p className="text-slate-400">No protocols available.</p>
          ) : (
            category.protocols.map((protocol) => (
              <Link
                key={protocol.id}
                href={getPrimaryProtocolHref(category.id, protocol.id)}
                className="block w-full rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-sky-500 hover:bg-slate-800"
              >
                <div className="font-semibold">
                  {protocol.title}
                </div>

                <div className="mt-1 text-sm text-slate-400">
                  {protocol.code} · {protocol.pages ? `${protocol.pages} ${protocol.pages === 1 ? "page" : "pages"}` : "PDF"}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
