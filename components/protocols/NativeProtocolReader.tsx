import Link from "next/link";
import { AlertTriangle, ChevronDown, FileText, Pill, ShieldAlert, Sparkles, Users } from "lucide-react";
import type { Protocol } from "../../data/protocols";
import type { Category } from "../../data/protocols";
import type { StructuredProtocolContent } from "../../lib/protocols/structured-content";
import {
  BETA_CLINICAL_DISCLAIMER,
  getNativeProtocolSections,
  getProtocolFallbackHref,
  getProtocolViewerHref,
} from "../../lib/protocols/structured-content";
import NativeFavoriteControl from "./NativeFavoriteControl";
import NativeReaderNavigation from "./NativeReaderNavigation";
import ProviderProtocolView from "./ProviderProtocolView";

function TextList({ items }: { items: string[] }) {
  return <ul className="space-y-2 pl-5 text-[0.98rem] leading-7 text-slate-200 marker:text-sky-400">{items.map((item) => <li key={item} className="list-disc pl-1">{item}</li>)}</ul>;
}

function ReaderSection({ id, title, children, tone = "default", open = false }: { id: string; title: string; children: React.ReactNode; tone?: "default" | "warning" | "pearl"; open?: boolean }) {
  const colors = tone === "warning" ? "border-rose-500/30 bg-rose-950/30" : tone === "pearl" ? "border-cyan-500/30 bg-cyan-950/20" : "border-slate-800 bg-slate-900";
  return (
    <details id={id} open={open} className={`group scroll-mt-28 rounded-2xl border ${colors}`}>
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
        {title}<ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180" />
      </summary>
      <div className="border-t border-inherit px-5 py-5">{children}</div>
    </details>
  );
}

export default function NativeProtocolReader({ category, protocol, content }: { category: Category; protocol: Protocol; content?: StructuredProtocolContent }) {
  const sections = content ? getNativeProtocolSections(content) : [{ id: "source", title: "Source Information" }];
  const viewerHref = getProtocolViewerHref(category.id, protocol.id);
  const status = content?.reviewStatus ?? "Draft";
  const sourcePdf = content?.sourcePdf ?? protocol.pdfPath;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-3xl px-4 pb-[max(3rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <NativeReaderNavigation fallbackHref={getProtocolFallbackHref(category.id)} />
          <NativeFavoriteControl categoryId={category.id} protocolId={protocol.id} protocolTitle={protocol.title} />
        </div>

        <header className="mt-7 border-b border-slate-800 pb-6">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-sky-300">
            <span>{category.title}</span><span aria-hidden="true" className="text-slate-600">•</span><span>{protocol.code}</span>
            <span className={`ml-auto rounded-full px-2.5 py-1 text-xs ${status === "Approved" ? "bg-emerald-500/10 text-emerald-300" : status === "Reviewed" ? "bg-sky-500/10 text-sky-300" : "bg-amber-500/10 text-amber-300"}`}>{status}</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{protocol.title}</h1>
          <p className="mt-2 text-sm text-slate-400">{protocol.pages ? `${protocol.pages} PDF ${protocol.pages === 1 ? "page" : "pages"}` : "PDF protocol"}</p>
        </header>

        <aside className="mt-6 rounded-2xl border border-rose-500/40 bg-rose-950/40 p-5" aria-label="Beta clinical disclaimer">
          <h2 className="flex items-center gap-2 font-bold text-rose-200"><ShieldAlert aria-hidden="true" className="h-5 w-5" />Beta — Not for Clinical Use</h2>
          <p className="mt-2 text-sm font-medium leading-6 text-rose-100">{BETA_CLINICAL_DISCLAIMER}</p>
        </aside>

        <nav aria-label="Protocol sections" className="sticky top-0 z-10 -mx-4 mt-6 overflow-x-auto border-y border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-3">
          <div className="flex min-w-max gap-2">
            {sections.map((section) => <a key={section.id} href={`#${section.id}`} className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-sky-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">{section.title}</a>)}
          </div>
        </nav>

        <div className="mt-6 space-y-4">
          {!content && (
            <section className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5">
              <h2 className="font-semibold text-amber-200">Native content pending manual review</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">Structured clinical content has not been reviewed for this protocol. Use the original source PDF for evaluation.</p>
            </section>
          )}

          {content && (content.flow.length || content.careModules.length) ? (
            <ProviderProtocolView
              nodes={content.flow}
              modules={content.careModules}
            />
          ) : null}
          {content?.overview.length ? <ReaderSection id="overview" title="Overview" open><TextList items={content.overview} /></ReaderSection> : null}
          {content?.indications.length ? <ReaderSection id="indications" title="Indications"><TextList items={content.indications} /></ReaderSection> : null}
          {content?.contraindications.length ? <ReaderSection id="contraindications" title="Contraindications" tone="warning"><TextList items={content.contraindications} /></ReaderSection> : null}
          {content?.assessment.length ? <ReaderSection id="assessment" title="Assessment" open><div className="space-y-6">{content.assessment.map((group) => <section key={group.title}><h3 className="mb-3 font-semibold text-sky-200">{group.title}</h3><TextList items={group.items} /></section>)}</div></ReaderSection> : null}
          {content?.treatmentSteps.length ? <ReaderSection id="treatment" title="Treatment Steps" open><ol className="space-y-4">{content.treatmentSteps.map((step, index) => <li key={step} className="flex gap-3 text-[0.98rem] leading-7 text-slate-200"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sm font-bold text-sky-300">{index + 1}</span><span>{step}</span></li>)}</ol></ReaderSection> : null}
          {content?.medications.length ? <ReaderSection id="medications" title="Medications"><div className="grid gap-3 sm:grid-cols-2">{content.medications.map((medication) => <article key={`${medication.name}-${medication.dose}`} className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4"><h3 className="flex items-center gap-2 font-bold text-emerald-200"><Pill aria-hidden="true" className="h-4 w-4" />{medication.name}</h3><p className="mt-2 text-lg font-semibold text-white">{medication.dose}</p>{medication.notes?.length ? <div className="mt-3"><TextList items={medication.notes} /></div> : null}</article>)}</div></ReaderSection> : null}
          {content?.warnings.length ? <ReaderSection id="warnings" title="Warnings" tone="warning"><h3 className="sr-only">Highlighted warnings</h3><div className="mb-3 flex items-center gap-2 font-semibold text-rose-200"><AlertTriangle aria-hidden="true" className="h-5 w-5" />Clinical warning</div><TextList items={content.warnings} /></ReaderSection> : null}
          {content?.clinicalPearls.length ? <ReaderSection id="clinical-pearls" title="Clinical Pearls" tone="pearl"><div className="mb-3 flex items-center gap-2 font-semibold text-cyan-200"><Sparkles aria-hidden="true" className="h-5 w-5" />Clinical pearls</div><TextList items={content.clinicalPearls} /></ReaderSection> : null}
          {content?.specialPopulations.length ? <ReaderSection id="special-populations" title="Special Populations"><div className="space-y-5">{content.specialPopulations.map((group) => <section key={group.title}><h3 className="mb-3 flex items-center gap-2 font-semibold text-violet-200"><Users aria-hidden="true" className="h-5 w-5" />{group.title}</h3><TextList items={group.items} /></section>)}</div></ReaderSection> : null}
          {content?.references.length ? <ReaderSection id="references" title="References"><TextList items={content.references} /></ReaderSection> : null}

          <ReaderSection id="source" title="Source Information" open>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-slate-400">Protocol revision</dt><dd className="text-right">{content?.revisionDate ?? "Not yet structured"}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-400">Source PDF</dt><dd className="text-right">{sourcePdf}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-400">PDF pages</dt><dd>{protocol.pages ?? "Unknown"}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-400">Last verified</dt><dd className="text-right">{content?.lastVerifiedDate ?? "Not verified"}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-400">Review status</dt><dd>{status}</dd></div>
            </dl>
            {content?.reviewFlags.length ? <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"><h3 className="font-semibold text-amber-200">Manual review required</h3><div className="mt-2"><TextList items={content.reviewFlags} /></div></div> : null}
          </ReaderSection>
        </div>

        <Link href={viewerHref} className="mt-8 flex min-h-14 w-full items-center justify-center rounded-2xl bg-sky-600 px-5 text-lg font-bold text-white shadow-lg shadow-sky-950/30 transition hover:bg-sky-500 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
          <FileText aria-hidden="true" className="mr-2 h-5 w-5" />View Original PDF
        </Link>
      </div>
    </main>
  );
}
