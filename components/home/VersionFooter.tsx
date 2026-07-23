import { appConfig } from "../../lib/app-config";

export default function VersionFooter() {
  return (
    <footer className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <dl className="grid grid-cols-3 gap-3 text-center">
        <div>
          <dt className="text-xs text-slate-400">Protocol Version</dt>
          <dd className="mt-1 text-sm font-semibold text-slate-200">{appConfig.protocolVersion}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-400">Last Updated</dt>
          <dd className="mt-1 text-sm font-semibold text-slate-200">{appConfig.protocolLastUpdated}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-400">App Version</dt>
          <dd className="mt-1 text-sm font-semibold text-slate-200">{appConfig.appVersion}</dd>
        </div>
      </dl>
    </footer>
  );
}
