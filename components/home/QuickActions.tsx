import Link from "next/link";
import { Baby, Pill, Search, Timer } from "lucide-react";

const actions = [
  {
    href: "/tools/search",
    label: "Protocol Search",
    description: "Find symptoms, drugs, or protocol numbers",
    icon: Search,
    accent: "bg-sky-500/15 text-sky-200 ring-sky-400/25",
  },
  {
    href: "/medications",
    label: "Medications",
    description: "Adult and pediatric quick reference",
    icon: Pill,
    accent: "bg-blue-500/15 text-blue-200 ring-blue-400/25",
  },
  {
    href: "/scene-timer",
    label: "Scene Timer",
    description: "Time and timestamp treatments",
    icon: Timer,
    accent: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25",
  },
  {
    href: "/tools/pediatric-resuscitation",
    label: "Pediatric",
    description: "Weight-based resuscitation calculator",
    icon: Baby,
    accent: "bg-pink-500/15 text-pink-200 ring-pink-400/25",
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
              className="flex min-h-32 flex-col rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-white transition active:scale-[0.98] active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${action.accent}`}
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="mt-3 block font-extrabold">{action.label}</span>
              <span className="mt-1 block text-xs leading-4 text-slate-400">
                {action.description}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
