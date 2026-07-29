import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FileText, WandSparkles } from "lucide-react";
import ProtocolReviewSection from "../../../../components/admin/ProtocolReviewSection";
import ReviewStatusBadge from "../../../../components/admin/ReviewStatusBadge";
import { adminProtocols, getAdminProtocol } from "../../../../data/admin-review";

export const dynamicParams = false;

export function generateStaticParams() {
  return adminProtocols.map(({ slug }) => ({ slug }));
}

export default async function ProtocolReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const protocol = getAdminProtocol(slug);
  if (!protocol) notFound();

  const sourceUrl = protocol.sourcePage ? `${protocol.sourcePdf}#page=${protocol.sourcePage}` : protocol.sourcePdf;

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/admin" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />Dashboard
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{protocol.title}</h1>
            <ReviewStatusBadge status={protocol.review.status} />
          </div>
          <p className="mt-2 text-sm text-slate-400">{protocol.category} · {protocol.code}{protocol.sourcePage ? ` · Source page ${protocol.sourcePage}` : ""}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(28rem,1fr)] xl:grid-cols-[minmax(0,1.1fr)_minmax(32rem,0.9fr)]">
        <section aria-labelledby="source-document-title" className="lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
          <div className="flex h-full min-h-[36rem] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
              <div>
                <h2 id="source-document-title" className="flex items-center gap-2 font-bold"><FileText aria-hidden="true" className="h-4 w-4 text-sky-400" />Original protocol</h2>
                <p className="mt-0.5 text-xs text-slate-500">Read-only source document</p>
              </div>
              <a href={sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-700 px-3 text-sm font-semibold text-slate-200 hover:border-sky-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
                Open Original PDF<ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
            <iframe title={`${protocol.title} original protocol PDF`} src={sourceUrl} className="min-h-[32rem] w-full flex-1 bg-white" />
          </div>
        </section>

        <div>
          {protocol.hasStructuredContent ? (
            <>
              <nav aria-label="Protocol sections" className="mb-4 flex gap-2 overflow-x-auto pb-1">
                {protocol.sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} className="shrink-0 rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:border-sky-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">{section.title}</a>
                ))}
              </nav>
              <div className="space-y-4">
                {protocol.sections.map((section) => <ProtocolReviewSection key={section.id} section={section} />)}
              </div>
            </>
          ) : (
            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm">
              <div className="inline-flex rounded-xl bg-sky-400/10 p-3 text-sky-300">
                <WandSparkles aria-hidden="true" className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-xl font-bold">Structured content has not yet been generated.</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Create an editable draft from the imported source protocol to begin section-by-section review.</p>
              <button type="button" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-sky-600 px-4 text-sm font-bold text-white transition hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">
                <WandSparkles aria-hidden="true" className="h-4 w-4" />Generate Draft
              </button>
              <p className="mt-2 text-xs text-slate-500">UI only — draft generation is not connected yet.</p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
