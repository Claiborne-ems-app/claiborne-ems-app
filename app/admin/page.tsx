import Link from "next/link";
import { CalendarClock, CheckCircle2, CircleDashed, ClipboardList, FileStack, MoveRight } from "lucide-react";
import ReviewStatusBadge from "../../components/admin/ReviewStatusBadge";
import { adminDashboardStats, adminProtocols } from "../../data/admin-review";

const statCards = [
  { label: "Total Protocols", value: adminDashboardStats.totalProtocols, icon: FileStack, accent: "text-violet-300 bg-violet-400/10" },
  { label: "Approved", value: adminDashboardStats.approved, icon: CheckCircle2, accent: "text-emerald-300 bg-emerald-400/10" },
  { label: "In Review", value: adminDashboardStats.inReview, icon: ClipboardList, accent: "text-sky-300 bg-sky-400/10" },
  { label: "Not Started", value: adminDashboardStats.notStarted, icon: CircleDashed, accent: "text-slate-300 bg-slate-700/60" },
  { label: "Last Import Date", value: adminDashboardStats.lastImportDate, icon: CalendarClock, accent: "text-amber-300 bg-amber-400/10" },
] as const;

export default function AdminDashboardPage() {
  return (
    <main className="mx-auto max-w-screen-2xl px-5 py-8 sm:px-8 lg:py-12">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-400">Clinical governance</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Protocol review dashboard</h1>
        <p className="mt-3 text-slate-400">Review every imported protocol alongside its original source document.</p>
      </div>

      <section aria-label="Review summary" className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {statCards.map(({ label, value, icon: Icon, accent }) => (
          <article key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
            <div className={`inline-flex rounded-xl p-2.5 ${accent}`}><Icon aria-hidden="true" className="h-5 w-5" /></div>
            <p className="mt-5 text-sm font-medium text-slate-400">{label}</p>
            <p className="mt-1 text-2xl font-bold text-white">{value}</p>
          </article>
        ))}
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Review queue</h2>
            <p className="mt-1 text-sm text-slate-400">{adminProtocols.length} imported protocols ready for review.</p>
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          {adminProtocols.map((protocol) => (
            <Link key={protocol.slug} href={`/admin/review/${protocol.slug}`} className="group flex min-h-20 items-center justify-between gap-4 border-b border-slate-800 px-5 py-4 last:border-b-0 hover:bg-slate-800/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-sky-400">{protocol.code}</span>
                  <ReviewStatusBadge status={protocol.review.status} />
                </div>
                <p className="mt-1 truncate font-semibold text-white">{protocol.title}</p>
                <p className="text-sm text-slate-500">
                  {protocol.category} · {protocol.sourcePdf.split("/").at(-1)}
                  {protocol.sourcePage ? ` · Page ${protocol.sourcePage}` : ""}
                </p>
              </div>
              <MoveRight aria-hidden="true" className="h-5 w-5 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-sky-300" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
