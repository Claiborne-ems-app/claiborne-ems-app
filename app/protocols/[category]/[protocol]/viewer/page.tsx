import { notFound } from "next/navigation";
import PdfViewer from "../../../../../components/protocols/PdfViewer";
import BottomNav from "../../../../../components/navigation/BottomNav";
import AppHeader from "../../../../../components/navigation/AppHeader";
import RecentlyViewedTracker from "../../../../../components/recently-viewed/RecentlyViewedTracker";
import { protocolCategories } from "../../../../../data/protocols";
import { getProtocolPdfUrl } from "../../../../../lib/protocols/pdf-url";
import { getStructuredProtocol, hasReviewedNativeContent } from "../../../../../data/structured-protocols";

export const dynamicParams = false;

export function generateStaticParams() {
  return protocolCategories.flatMap((category) =>
    category.protocols.map((protocol) => ({
      category: category.id,
      protocol: protocol.id,
    }))
  );
}

export default async function ProtocolViewerPage({
  params,
}: {
  params: Promise<{ category: string; protocol: string }>;
}) {
  const { category: categoryId, protocol: protocolId } = await params;
  const category = protocolCategories.find(
    (item) => item.id === categoryId
  );
  const protocol = category?.protocols.find(
    (item) => item.id === protocolId
  );

  if (!category || !protocol) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="w-full max-w-7xl mx-auto px-2 lg:px-6 py-4">
        <AppHeader />

        <RecentlyViewedTracker
          categoryId={category.id}
          protocolId={protocol.id}
        />

        <PdfViewer
          fallbackHref={`/protocols/${category.id}`}
          detailsHref={`/protocols/${category.id}/${protocol.id}`}
          pdfUrl={protocol.pdfPath || getProtocolPdfUrl(protocol.startPage)}
          protocolTitle={protocol.title}
          protocolCode={protocol.code}
          categoryTitle={category.title}
          startPage={protocol.startPage}
          endPage={protocol.endPage}
          nativeContentAvailable={hasReviewedNativeContent(
            getStructuredProtocol(category.id, protocol.id)
          )}
        />
      </div>

      <BottomNav />
    </main>
  );
}
