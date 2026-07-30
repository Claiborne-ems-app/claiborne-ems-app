import AppHeader from "../../components/navigation/AppHeader";
import BottomNav from "../../components/navigation/BottomNav";
import SceneTimer from "../../components/tools/SceneTimer";

export default function SceneTimerPage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md p-6">
        <AppHeader />
        <header className="mt-4">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
            On-scene workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Scene Timer & Timeline
          </h1>
          <p className="mt-2 leading-6 text-slate-400">
            Time the scene and capture reviewed, timestamped treatment notes.
          </p>
        </header>

        <div className="mt-6">
          <SceneTimer />
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
