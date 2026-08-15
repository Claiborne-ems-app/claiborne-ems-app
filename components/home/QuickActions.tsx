import Link from "next/link";
import { Baby, Pill, Search, Timer } from "lucide-react";

const actions = [
  {
    href: "/tools/search",
    label: "Protocol Search",
    description: "Find symptoms, drugs, or protocol numbers",
    icon: Search,
    accent: "bg-[#0e71b8] text-white ring-[#075b9a]",
  },
  {
    href: "/medications",
    label: "Medications",
    description: "Adult and pediatric quick reference",
    icon: Pill,
    accent: "bg-[#c4174d] text-white ring-[#98113b]",
  },
  {
    href: "/scene-timer",
    label: "Scene Timer",
    description: "Time and timestamp treatments",
    icon: Timer,
    accent: "bg-[#c4174d] text-white ring-[#98113b]",
  },
  {
    href: "/tools/pediatric-resuscitation",
    label: "Peds Calculator",
    description: "Weight-based resuscitation calculator",
    icon: Baby,
    accent: "bg-[#0e71b8] text-white ring-[#075b9a]",
  },
] as const;

export default function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-title" className="mt-5">
      <h2
        id="quick-actions-title"
        className="px-1 text-sm font-bold uppercase tracking-[0.16em] text-slate-400"
      >
        Quick actions
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="flex min-h-32 flex-col rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-sm transition active:scale-[0.98] active:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e71b8]"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${action.accent}`}
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="mt-3 block font-extrabold">{action.label}</span>
              <span className="mt-1 block text-xs leading-4 text-slate-600">
                {action.description}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
