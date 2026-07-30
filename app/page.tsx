import Link from "next/link";
import {
  AlertTriangle,
  Baby,
  BookOpen,
  Calculator,
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
import AppHeader from "../components/navigation/AppHeader";
import SearchBar from "../components/home/SearchBar";
import FavoritesList from "../components/home/FavoritesList";
import RecentlyViewedList from "../components/home/RecentlyViewedList";
import CategoryCard from "../components/home/CategoryCard";
import SectionTitle from "../components/home/SectionTitle";
import VersionFooter from "../components/home/VersionFooter";
import BottomNav from "../components/navigation/BottomNav";
import OfflineStatusIndicator from "../components/offline/OfflineStatusIndicator";
import { CovenantHealthEmsLogo } from "../components/branding/CovenantHealthEmsLogo";
import { protocolCategories } from "../data/protocols";

const categoryPresentation: Record<string, { icon: LucideIcon; accent: string; subtitle: string }> = {
  ac: {
    icon: HeartPulse,
    accent: "bg-rose-500/12 text-rose-300 ring-rose-400/20",
    subtitle: "Adult cardiac emergencies",
  },
  am: {
    icon: Syringe,
    accent: "bg-sky-500/12 text-sky-300 ring-sky-400/20",
    subtitle: "Adult medical emergencies",
  },
  ao: {
    icon: HeartHandshake,
    accent: "bg-violet-500/12 text-violet-300 ring-violet-400/20",
    subtitle: "Maternal & newborn care",
  },
  ar: {
    icon: Wind,
    accent: "bg-cyan-500/12 text-cyan-300 ring-cyan-400/20",
    subtitle: "Airway & respiratory care",
  },
  pc: {
    icon: HeartPulse,
    accent: "bg-pink-500/12 text-pink-300 ring-pink-400/20",
    subtitle: "Pediatric cardiac care",
  },
  pm: {
    icon: Baby,
    accent: "bg-teal-500/12 text-teal-300 ring-teal-400/20",
    subtitle: "Pediatric medical care",
  },
  sc: {
    icon: ShieldAlert,
    accent: "bg-violet-500/12 text-violet-300 ring-violet-400/20",
    subtitle: "Special circumstances",
  },
  so: {
    icon: Users,
    accent: "bg-orange-500/12 text-orange-300 ring-orange-400/20",
    subtitle: "Scene operations",
  },
  tb: {
    icon: ShieldAlert,
    accent: "bg-red-500/12 text-red-300 ring-red-400/20",
    subtitle: "Trauma & burn care",
  },
  te: {
    icon: AlertTriangle,
    accent: "bg-emerald-500/12 text-emerald-300 ring-emerald-400/20",
    subtitle: "Toxicology & environmental",
  },
  up: {
    icon: BookOpen,
    accent: "bg-blue-500/12 text-blue-300 ring-blue-400/20",
    subtitle: "Universal patient care",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md px-5">
        <AppHeader />

        <section className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-950 p-5 shadow-2xl shadow-black/20">
          <CovenantHealthEmsLogo
            priority
            className="w-full max-w-[15rem] border border-white/10 p-2 shadow-lg shadow-black/20"
          />
          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-sky-300">Field reference</p>
              <h1 className="mt-1 text-[1.75rem] font-bold leading-8 tracking-[-0.025em]">
                Claiborne County EMS Protocols
              </h1>
            </div>
            <div aria-hidden="true" className="mb-1 h-12 w-1 shrink-0 rounded-full bg-rose-700" />
          </div>
          <OfflineStatusIndicator />
        </section>

        <div className="mt-5">
          <SearchBar />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            href="/protocols"
            className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 font-semibold text-slate-100 transition active:scale-[0.98] active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <BookOpen aria-hidden="true" className="h-5 w-5 text-sky-300" />
            <span className="flex-1 text-sm">All Protocols</span>
            <ChevronRight aria-hidden="true" className="h-4 w-4 text-slate-500" />
          </Link>
          <Link
            href="/tools"
            className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 font-semibold text-slate-100 transition active:scale-[0.98] active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <Calculator aria-hidden="true" className="h-5 w-5 text-emerald-300" />
            <span className="flex-1 text-sm">Clinical Tools</span>
            <ChevronRight aria-hidden="true" className="h-4 w-4 text-slate-500" />
          </Link>
        </div>

        <Link
          href="/medications"
          className="mt-3 flex min-h-[4.5rem] items-center gap-4 rounded-2xl border border-sky-400/30 bg-gradient-to-r from-sky-600/25 via-blue-600/15 to-slate-900 px-4 py-3 shadow-lg shadow-sky-950/20 transition active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-400/15 text-sky-200 ring-1 ring-sky-300/25">
            <Pill aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-extrabold text-white">Medication Quick Reference</span>
            <span className="mt-1 block text-xs text-sky-100/70">Search by drug, brand, indication, or provider level</span>
          </span>
          <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0 text-sky-300" />
        </Link>

        <SectionTitle title="Favorites" />
        <FavoritesList />

        <SectionTitle title="Recently Viewed" />
        <RecentlyViewedList />

        <SectionTitle title="Protocol Categories" />
        <div className="grid grid-cols-2 gap-3">
          {protocolCategories.map((category) => {
            const presentation = categoryPresentation[category.id] ?? {
              icon: BookOpen,
              accent: "bg-sky-500/12 text-sky-300 ring-sky-400/20",
              subtitle: `${category.protocols.length} protocols`,
            };

            return (
              <CategoryCard
                key={category.id}
                href={`/protocols/${category.id}`}
                title={category.title}
                subtitle={presentation.subtitle}
                icon={presentation.icon}
                accent={presentation.accent}
              />
            );
          })}
        </div>

        <VersionFooter />
      </div>

      <BottomNav />
    </main>
  );
}
