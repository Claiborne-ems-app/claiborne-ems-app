import AppHeader from "../../../components/navigation/AppHeader";
import BottomNav from "../../../components/navigation/BottomNav";
import ProtocolSearchTool from "../../../components/tools/ProtocolSearchTool";

export default function ProtocolSearchPage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md p-6">
        <AppHeader />
        <header className="mt-4">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
            Clinical search
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Protocol Search
          </h1>
          <p className="mt-2 leading-6 text-slate-400">
            Search native protocol text, symptoms, medications, abbreviations,
            and protocol numbers.
          </p>
        </header>

        <div className="mt-6">
          <ProtocolSearchTool />
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
