import Link from "next/link";
import {
  AlertTriangle,
  Baby,
  BookOpen,
  ChevronRight,
  HeartHandshake,
  HeartPulse,
  Pill,
  ShieldAlert,
  Syringe,
  Users,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { protocolCategories } from "../../data/protocols";
import BottomNav from "../../components/navigation/BottomNav";
import AppHeader from "../../components/navigation/AppHeader";

const categoryPresentation: Record<
  string,
  { icon: LucideIcon; accent: string; surface: string; description: string }
> = {
  ac: {
    icon: HeartPulse,
    accent: "bg-rose-500/15 text-rose-300 ring-rose-400/25",
    surface: "from-rose-500/[0.08] to-transparent",
    description: "Adult cardiac emergencies",
  },
  am: {
    icon: Syringe,
    accent: "bg-sky-500/15 text-sky-300 ring-sky-400/25",
    surface: "from-sky-500/[0.08] to-transparent",
    description: "Adult medical emergencies",
  },
  ao: {
    icon: HeartHandshake,
    accent: "bg-violet-500/15 text-violet-300 ring-violet-400/25",
    surface: "from-violet-500/[0.08] to-transparent",
    description: "Maternal and newborn care",
  },
  ar: {
    icon: Wind,
    accent: "bg-cyan-500/15 text-cyan-300 ring-cyan-400/25",
    surface: "from-cyan-500/[0.08] to-transparent",
    description: "Airway and respiratory care",
  },
  pc: {
    icon: HeartPulse,
    accent: "bg-pink-500/15 text-pink-300 ring-pink-400/25",
    surface: "from-pink-500/[0.08] to-transparent",
    description: "Pediatric cardiac emergencies",
  },
  pm: {
    icon: Baby,
    accent: "bg-teal-500/15 text-teal-300 ring-teal-400/25",
    surface: "from-teal-500/[0.08] to-transparent",
    description: "Pediatric medical emergencies",
  },
  sc: {
    icon: ShieldAlert,
    accent: "bg-violet-500/15 text-violet-300 ring-violet-400/25",
    surface: "from-violet-500/[0.08] to-transparent",
    description: "Special patient circumstances",
  },
  so: {
    icon: Users,
    accent: "bg-orange-500/15 text-orange-300 ring-orange-400/25",
    surface: "from-orange-500/[0.08] to-transparent",
    description: "Scene and responder operations",
  },
  tb: {
    icon: ShieldAlert,
    accent: "bg-red-500/15 text-red-300 ring-red-400/25",
    surface: "from-red-500/[0.08] to-transparent",
    description: "Trauma and burn care",
  },
  te: {
    icon: AlertTriangle,
    accent: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/25",
    surface: "from-emerald-500/[0.08] to-transparent",
    description: "Toxicologic and environmental care",
  },
  up: {
    icon: BookOpen,
    accent: "bg-blue-500/15 text-blue-300 ring-blue-400/25",
    surface: "from-blue-500/[0.08] to-transparent",
    description: "Core assessment and patient care",
  },
};

export default function ProtocolsPage() {
  return (
    <main className="min-h-screen pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md px-5">
        <AppHeader />

        <header className="pb-5">
          <p className="text-sm font-semibold text-sky-300">Clinical library</p>
          <h1 className="mt-1 text-[2rem] font-bold leading-9 tracking-[-0.03em]">
            Protocol Categories
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Select a category to open its field protocols.
          </p>
        </header>

        <Link
          href="/medications"
          className="mb-5 flex min-h-[5.25rem] items-center gap-4 rounded-2xl border border-sky-400/35 bg-gradient-to-r from-sky-600/25 via-blue-600/15 to-transparent p-4 shadow-lg shadow-sky-950/20 transition active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-200 ring-1 ring-sky-300/30">
            <Pill aria-hidden="true" className="h-6 w-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[1.05rem] font-extrabold text-white">Medication Quick Reference</span>
            <span className="mt-1 block text-xs leading-4 text-sky-100/70">Searchable adult and pediatric dose cards</span>
          </span>
          <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0 text-sky-300" />
        </Link>

        <section aria-label="Protocol categories" className="space-y-3">
          {protocolCategories.map((category) => {
            const presentation = categoryPresentation[category.id] ?? {
              icon: BookOpen,
              accent: "bg-sky-500/15 text-sky-300 ring-sky-400/25",
              surface: "from-sky-500/[0.08] to-transparent",
              description: "Clinical protocols",
            };
            const Icon = presentation.icon;

            return (
              <Link
                key={category.id}
                href={`/protocols/${category.id}`}
                className={`group flex min-h-[5.25rem] items-center gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-r ${presentation.surface} bg-white/[0.035] p-4 shadow-sm transition active:scale-[0.985] active:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset ${presentation.accent}`}
                >
                  <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[1.05rem] font-semibold tracking-[-0.01em] text-white">
                    {category.title}
                  </span>
                  <span className="mt-1 block text-xs leading-4 text-slate-400">
                    {presentation.description} · {category.protocols.length} protocols
                  </span>
                </span>
                <ChevronRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-slate-400"
                />
              </Link>
            );
          })}
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
