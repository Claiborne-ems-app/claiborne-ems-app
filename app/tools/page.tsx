import Link from "next/link";
import {
  Baby,
  BookOpenCheck,
  ChevronRight,
  Pill,
  Search,
  ShieldAlert,
  Timer,
  Users,
} from "lucide-react";
import AppHeader from "../../components/navigation/AppHeader";
import BottomNav from "../../components/navigation/BottomNav";

const tools = [
  {
    href: "/tools/search",
    title: "Protocol Search",
    description: "Search symptoms, medications, abbreviations, and protocol numbers",
    icon: Search,
    accent: "bg-sky-500/15 text-sky-200 ring-sky-400/25",
  },
  {
    href: "/medications",
    title: "Medication Reference",
    description: "Searchable adult and pediatric dosing by provider level",
    icon: Pill,
    accent: "bg-blue-500/15 text-blue-200 ring-blue-400/25",
  },
  {
    href: "/scene-timer",
    title: "Scene Timer",
    description: "Persistent timer and timestamped treatment timeline",
    icon: Timer,
    accent: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25",
  },
  {
    href: "/tools/pediatric-resuscitation",
    title: "Pediatric Resuscitation",
    description: "Weight-based medications, fluids, and electrical energy",
    icon: Baby,
    accent: "bg-pink-500/15 text-pink-200 ring-pink-400/25",
  },
  {
    href: "/tools/provider-view",
    title: "Provider View",
    description: "Select the EMT, AEMT, or Paramedic scope displayed",
    icon: Users,
    accent: "bg-violet-500/15 text-violet-200 ring-violet-400/25",
  },
  {
    href: "/protocols",
    title: "Protocol Library",
    description: "Browse all categories and native clinical protocols",
    icon: BookOpenCheck,
    accent: "bg-amber-500/15 text-amber-200 ring-amber-400/25",
  },
] as const;

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md p-6">
        <AppHeader />
        <header className="mt-4">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
            Field workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Clinical Tools
          </h1>
          <p className="mt-2 leading-6 text-slate-400">
            Select a tool to open a focused field workspace.
          </p>
        </header>

        <aside className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 text-sm leading-6 text-amber-100">
          <div className="flex gap-3">
            <ShieldAlert
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0"
            />
            <p>
              Beta tools are decision-support aids only. Confirm information
              against the current approved protocol and clinical judgment.
            </p>
          </div>
        </aside>

        <div className="mt-6 space-y-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex min-h-24 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition active:scale-[0.985] active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${tool.accent}`}
                >
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-extrabold text-white">
                    {tool.title}
                  </span>
                  <span className="mt-1 block text-sm leading-5 text-slate-400">
                    {tool.description}
                  </span>
                </span>
                <ChevronRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-slate-500"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
