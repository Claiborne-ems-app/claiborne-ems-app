import Link from "next/link";
import AppHeader from "../../components/navigation/AppHeader";
import BottomNav from "../../components/navigation/BottomNav";
import PdfViewingModeSelector from "../../components/settings/PdfViewingModeSelector";
import PwaInstallInstructions from "../../components/settings/PwaInstallInstructions";
import { appConfig } from "../../lib/app-config";
import { getProtocolPdfUrl } from "../../lib/protocols/pdf-url";
import CovenantHealthAirLogo from "../../components/branding/CovenantHealthAirLogo";
import OfflineAccess from "../../components/settings/OfflineAccess";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md p-6">
        <AppHeader />
        <section className="text-center">
          <CovenantHealthAirLogo className="mx-auto h-auto w-full max-w-[260px] object-contain" priority />
          <h1 className="mt-3 text-3xl font-bold">Claiborne County EMS Protocols</h1>
          <p className="mt-1 text-sm text-slate-400">Settings and application information</p>
        </section>
        <div className="mt-8 space-y-8">
          <OfflineAccess />
          <PdfViewingModeSelector />
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-lg font-semibold">About</h2>
            <p className="mt-3 font-semibold text-amber-300">{appConfig.betaStatus}</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-slate-400">Protocol Version</dt><dd>{appConfig.protocolVersion}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-400">Last Updated</dt><dd>{appConfig.protocolLastUpdated}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-400">App Version</dt><dd>{appConfig.appVersion}</dd></div>
            </dl>
            <p className="mt-5 text-sm leading-6 text-slate-400">{appConfig.betaNotice}</p>
            <Link href={getProtocolPdfUrl(1)} target="_blank" className="mt-5 inline-block text-sm font-semibold text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">Open full manual</Link>
          </section>
          <PwaInstallInstructions />
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
