import AppHeader from "../components/navigation/AppHeader";
import SearchBar from "../components/home/SearchBar";
import FavoritesList from "../components/home/FavoritesList";
import RecentlyViewedList from "../components/home/RecentlyViewedList";
import CategoryCard from "../components/home/CategoryCard";
import SectionTitle from "../components/home/SectionTitle";
import VersionFooter from "../components/home/VersionFooter";
import BottomNav from "../components/navigation/BottomNav";
import { protocolCategories } from "../data/protocols";
import { Baby, BookOpen, HeartHandshake, HeartPulse, Pill, ShieldAlert, Syringe, type LucideIcon } from "lucide-react";
import OfflineStatusIndicator from "../components/offline/OfflineStatusIndicator";
import { CovenantHealthEmsLogo } from "../components/branding/CovenantHealthEmsLogo";

const categoryPresentation: Record<string, { icon: LucideIcon; accent: string; subtitle: string }> = {
  medical: {
    icon: HeartPulse,
    accent: "bg-sky-500/10 text-sky-300 ring-sky-400/20",
    subtitle: "Adult medical care",
  },
  trauma: {
    icon: ShieldAlert,
    accent: "bg-red-500/10 text-red-300 ring-red-400/20",
    subtitle: "Trauma assessment & care",
  },
  pediatrics: {
    icon: Baby,
    accent: "bg-pink-500/10 text-pink-300 ring-pink-400/20",
    subtitle: "Pediatric patient care",
  },
  obstetrics: {
    icon: HeartHandshake,
    accent: "bg-violet-500/10 text-violet-300 ring-violet-400/20",
    subtitle: "Maternal & newborn care",
  },
  procedures: {
    icon: Syringe,
    accent: "bg-amber-500/10 text-amber-300 ring-amber-400/20",
    subtitle: "Clinical procedures",
  },
  medications: {
    icon: Pill,
    accent: "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20",
    subtitle: "Medication reference",
  },
  references: {
    icon: BookOpen,
    accent: "bg-blue-500/10 text-blue-300 ring-blue-400/20",
    subtitle: "Clinical reference guides",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white">
      <div className="mx-auto max-w-md p-6">
        <AppHeader />

        <section className="mb-8 text-center">
          <CovenantHealthEmsLogo
            priority
            className="mx-auto w-full max-w-sm border border-white/10 p-3 shadow-2xl shadow-black/30"
          />
          <h1 className="mt-5 text-3xl font-bold tracking-tight">Claiborne County EMS Protocols</h1>
          <div aria-hidden="true" className="mx-auto mt-3 h-1 w-20 rounded-full bg-red-700" />
          <OfflineStatusIndicator />
        </section>

        <SearchBar />

        <SectionTitle title="Favorites" />

        <FavoritesList />

        <SectionTitle title="Recently Viewed" />

        <RecentlyViewedList />

        <SectionTitle title="Categories" />

        <div className="grid grid-cols-2 gap-4">
          {protocolCategories.map((category) => {
            const presentation = categoryPresentation[category.id] ?? {
              icon: BookOpen,
              accent: "bg-sky-500/10 text-sky-300 ring-sky-400/20",
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
