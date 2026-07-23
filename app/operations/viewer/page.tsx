import AppHeader from "../../../components/navigation/AppHeader";
import BottomNav from "../../../components/navigation/BottomNav";
import ProtocolBackButton from "../../../components/navigation/ProtocolBackButton";
import OperationsManualViewer from "../../../components/operations/OperationsManualViewer";

const PAGE_COUNT = 442;

export default async function OperationsViewerPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const params = await searchParams;
  const requestedPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const parsedPage = Number(requestedPage ?? "1");
  const page = Number.isInteger(parsedPage) && parsedPage >= 1 && parsedPage <= PAGE_COUNT ? parsedPage : 1;

  return (
    <main className="min-h-screen bg-slate-950 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md p-6">
        <AppHeader />
        <ProtocolBackButton fallbackHref="/operations" fallbackLabel="Operations Manual" label="Back to Operations Manual" />
        <h1 className="mt-4 mb-4 text-3xl font-bold">Operations Manual</h1>
        <OperationsManualViewer key={page} page={page} />
      </div>
      <BottomNav />
    </main>
  );
}
