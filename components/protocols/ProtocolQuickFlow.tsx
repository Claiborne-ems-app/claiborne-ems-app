import { ArrowDown, CircleAlert } from "lucide-react";
import type {
  ProtocolCareModule,
  ProtocolFlowNode,
  ProviderLevel,
} from "../../lib/protocols/structured-content";

const badgeClass: Record<ProviderLevel, string> = {
  EMT: "border-blue-400/50 bg-blue-500/20 text-blue-100",
  AEMT: "border-amber-400/50 bg-amber-500/20 text-amber-100",
  Paramedic: "border-red-400/50 bg-red-500/20 text-red-100",
  "Medical Control": "border-violet-400/40 bg-violet-500/15 text-violet-200",
};

const levelPanelClass: Record<ProviderLevel, string> = {
  EMT: "border-blue-500/40",
  AEMT: "border-amber-500/40",
  Paramedic: "border-red-500/40",
  "Medical Control": "border-violet-500/40",
};

const levelHeaderClass: Record<ProviderLevel, string> = {
  EMT: "bg-blue-600 text-white",
  AEMT: "bg-amber-500 text-slate-950",
  Paramedic: "bg-red-600 text-white",
  "Medical Control": "bg-violet-600 text-white",
};

const includesNote: Partial<Record<ProviderLevel, string>> = {
  AEMT: "Includes EMT care",
  Paramedic: "Includes EMT and AEMT care",
};

function LevelBadge({ level }: { level: ProviderLevel }) {
  return (
    <span className={`rounded-full border px-2 py-1 text-[0.68rem] font-bold uppercase tracking-wide ${badgeClass[level]}`}>
      {level}
    </span>
  );
}

function clinicalNodeVisible(
  levels: ProviderLevel[] | undefined,
  visibleLevels: ProviderLevel[]
) {
  if (!levels?.length) return true;
  const clinicalLevels = levels.filter((level) => level !== "Medical Control");
  if (!clinicalLevels.length) return true;
  return clinicalLevels.some((level) => visibleLevels.includes(level));
}

export function ProtocolQuickFlow({
  nodes,
  visibleLevels,
}: {
  nodes: ProtocolFlowNode[];
  visibleLevels: ProviderLevel[];
}) {
  const visibleNodes = nodes.filter((node) =>
    clinicalNodeVisible(node.levels, visibleLevels)
  );

  return (
    <section id="quick-flow" className="scroll-mt-28">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">Fast Bubble Flow</h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Quick field view
        </span>
      </div>
      <div className="flex flex-col items-center">
        {visibleNodes.map((node, index) => {
          const tone = node.tone ?? "action";
          const classes =
            tone === "urgent"
              ? "border-rose-400/50 bg-rose-950/50"
              : tone === "decision"
                ? "border-amber-400/50 bg-amber-950/40"
                : tone === "transport"
                  ? "border-violet-400/50 bg-violet-950/40"
                  : tone === "start"
                    ? "border-emerald-400/50 bg-emerald-950/40"
                    : "border-sky-400/40 bg-sky-950/35";
          const visibleBadges = node.levels?.filter((level) =>
            visibleLevels.includes(level)
          );

          return (
            <div key={`${node.title}-${index}`} className="contents">
              <article className={`w-full max-w-xl rounded-[2rem] border-2 px-5 py-4 text-center shadow-lg shadow-black/10 ${classes}`}>
                <h3 className="text-lg font-extrabold tracking-tight">
                  {node.title}
                </h3>
                <p className="mx-auto mt-1 max-w-lg text-sm font-medium leading-5 text-slate-200">
                  {node.text}
                </p>
                {visibleBadges?.length ? (
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {visibleBadges.map((level) => (
                      <LevelBadge key={level} level={level} />
                    ))}
                  </div>
                ) : null}
              </article>
              {index < visibleNodes.length - 1 ? (
                <ArrowDown
                  aria-hidden="true"
                  className="my-1.5 h-6 w-6 text-slate-500"
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function CareLevelModules({
  modules,
  visibleLevels,
}: {
  modules: ProtocolCareModule[];
  visibleLevels: ProviderLevel[];
}) {
  return (
    <section id="care-levels" className="scroll-mt-28">
      <div className="mb-3 flex items-center gap-2">
        <CircleAlert className="h-5 w-5 text-sky-300" aria-hidden="true" />
        <h2 className="text-xl font-bold">Provider-Level Actions</h2>
      </div>
      <div className="space-y-3">
        {modules.map((module, index) => {
          const visibleEntries = module.levels.filter((entry) =>
            visibleLevels.includes(entry.level)
          );

          return (
            <details
              key={module.title}
              open={index === 0}
              className="group rounded-2xl border border-slate-800 bg-slate-900"
            >
              <summary className="cursor-pointer list-none px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white">{module.title}</h3>
                    <p className="mt-1 text-sm leading-5 text-slate-400">
                      {module.summary}
                    </p>
                  </div>
                  <span className="text-xl text-slate-500 group-open:rotate-45">
                    +
                  </span>
                </div>
              </summary>
              <div className="space-y-4 border-t border-slate-800 px-5 py-4">
                {visibleEntries.map((entry) => (
                  <section
                    key={entry.level}
                    className={`overflow-hidden rounded-xl border ${levelPanelClass[entry.level]}`}
                  >
                    <header className={`flex min-h-11 items-center justify-between gap-3 px-4 py-2.5 ${levelHeaderClass[entry.level]}`}>
                      <h4 className="font-extrabold">{entry.level}</h4>
                      {includesNote[entry.level] ? (
                        <span className="text-xs font-bold opacity-90">
                          {includesNote[entry.level]}
                        </span>
                      ) : null}
                    </header>
                    <ul className="space-y-1.5 bg-slate-950/60 px-5 py-4 pl-9 text-sm leading-6 text-slate-200 marker:text-sky-400">
                      {entry.actions.map((action) => (
                        <li key={action} className="list-disc">
                          {action}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
