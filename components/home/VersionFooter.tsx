import { appConfig } from "../../lib/app-config";

export default function VersionFooter() {
  return (
    <footer className="mb-2 mt-8 border-t border-white/[0.07] px-1 pt-5">
      <dl className="grid grid-cols-3 gap-2 text-center">
        <div>
          <dt className="text-[0.65rem] text-slate-500">Protocol</dt>
          <dd className="mt-1 text-xs font-semibold text-slate-300">{appConfig.protocolVersion}</dd>
        </div>
        <div className="border-x border-white/[0.07]">
          <dt className="text-[0.65rem] text-slate-500">Updated</dt>
          <dd className="mt-1 text-xs font-semibold text-slate-300">{appConfig.protocolLastUpdated}</dd>
        </div>
        <div>
          <dt className="text-[0.65rem] text-slate-500">App</dt>
          <dd className="mt-1 text-xs font-semibold text-slate-300">{appConfig.appVersion}</dd>
        </div>
      </dl>
    </footer>
  );
}
