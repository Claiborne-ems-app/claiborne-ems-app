"use client";

import { Users } from "lucide-react";
import ProviderLevelSelector, {
  useProviderLevel,
} from "../provider/ProviderLevelSelector";

export default function ProviderViewTool() {
  const { providerLevel, setProviderLevel } = useProviderLevel();

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/20">
          <Users aria-hidden="true" className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-bold">Provider View</h2>
          <p className="mt-1 text-sm leading-5 text-slate-400">
            Choose the scope displayed in native protocol flow charts and action sections.
          </p>
        </div>
      </div>
      <ProviderLevelSelector
        value={providerLevel}
        onChange={setProviderLevel}
        label="Default provider level"
      />
      <p className="mt-3 text-xs leading-5 text-slate-500">
        This selection is saved on this device and can be changed from any native protocol.
      </p>
    </section>
  );
}
