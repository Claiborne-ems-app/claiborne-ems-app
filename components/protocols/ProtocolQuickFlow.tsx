import { ArrowDown, CircleAlert } from "lucide-react";
import type { ProtocolCareModule, ProtocolFlowNode, ProviderLevel } from "../../lib/protocols/structured-content";

const badgeClass: Record<ProviderLevel, string> = {
  EMT: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
  AEMT: "border-sky-400/40 bg-sky-500/15 text-sky-200",
  Paramedic: "border-rose-400/40 bg-rose-500/15 text-rose-200",
  "Medical Control": "border-violet-400/40 bg-violet-500/15 text-violet-200",
};

function LevelBadge({ level }: { level: ProviderLevel }) {
  return <span className={`rounded-full border px-2 py-1 text-[0.68rem] font-bold uppercase tracking-wide ${badgeClass[level]}`}>{level}</span>;
}

export function ProtocolQuickFlow({ nodes }: { nodes: ProtocolFlowNode[] }) {
  return (
    <section id="quick-flow" className="scroll-mt-28">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">Fast Bubble Flow</h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Quick field view</span>
      </div>
      <div className="flex flex-col items-center">
        {nodes.map((node, index) => {
          const tone = node.tone ?? "action";
          const classes = tone === "urgent" ? "border-rose-400/50 bg-rose-950/50" : tone === "decision" ? "border-amber-400/50 bg-amber-950/40" : tone === "transport" ? "border-violet-400/50 bg-violet-950/40" : tone === "start" ? "border-emerald-400/50 bg-emerald-950/40" : "border-sky-400/40 bg-sky-950/35";
          return (
            <div key={`${node.title}-${index}`} className="contents">
              <article className={`w-full max-w-xl rounded-[2rem] border-2 px-5 py-4 text-center shadow-lg shadow-black/10 ${classes}`}>
                <h3 className="text-lg font-extrabold tracking-tight">{node.title}</h3>
                <p className="mx-auto mt-1 max-w-lg text-sm font-medium leading-5 text-slate-200">{node.text}</p>
                {node.levels?.length ? <div className="mt-3 flex flex-wrap justify-center gap-1.5">{node.levels.map((level) => <LevelBadge key={level} level={level} />)}</div> : null}
              </article>
              {index < nodes.length - 1 ? <ArrowDown aria-hidden="true" className="my-1.5 h-6 w-6 text-slate-500" /> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function CareLevelModules({ modules }: { modules: ProtocolCareModule[] }) {
  return (
    <section id="care-levels" className="scroll-mt-28">
      <div className="mb-3 flex items-center gap-2">
        <CircleAlert className="h-5 w-5 text-sky-300" aria-hidden="true" />
        <h2 className="text-xl font-bold">Universal Clinical Core</h2>
      </div>
      <div className="space-y-3">
        {modules.map((module, index) => (
          <details key={module.title} open={index === 0} className="group rounded-2xl border border-slate-800 bg-slate-900">
            <summary className="cursor-pointer list-none px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div><h3 className="font-bold text-white">{module.title}</h3><p className="mt-1 text-sm leading-5 text-slate-400">{module.summary}</p></div>
                <span className="text-xl text-slate-500 group-open:rotate-45">+</span>
              </div>
            </summary>
            <div className="space-y-4 border-t border-slate-800 px-5 py-4">
              {module.levels.map((entry) => (
                <section key={entry.level}>
                  <LevelBadge level={entry.level} />
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm leading-6 text-slate-200 marker:text-sky-400">
                    {entry.actions.map((action) => <li key={action} className="list-disc">{action}</li>)}
                  </ul>
                </section>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
