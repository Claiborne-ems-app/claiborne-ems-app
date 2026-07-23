import { Check, Clock3, PencilLine, X } from "lucide-react";
import type { ProtocolSection } from "../../lib/admin/review-types";
import ReviewStatusBadge from "./ReviewStatusBadge";

export default function ProtocolReviewSection({ section }: { section: ProtocolSection }) {
  return (
    <section id={section.id} className="scroll-mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-xl font-bold text-white">{section.title}</h2>
        <ReviewStatusBadge status={section.review.status} />
      </div>

      <label className="mt-4 block">
        <span className="sr-only">Edit {section.title}</span>
        <textarea
          defaultValue={section.content.join("\n")}
          placeholder={`No ${section.title.toLowerCase()} content imported.`}
          rows={Math.max(4, Math.min(12, section.content.length + 2))}
          className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-200 placeholder:text-slate-600 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
        />
      </label>

      <div className="mt-5 grid gap-2 border-t border-slate-800 pt-4 text-xs text-slate-400 sm:grid-cols-2">
        <span className="flex items-center gap-2"><Clock3 aria-hidden="true" className="h-3.5 w-3.5" />Last reviewed: {section.review.lastReviewed ?? "Never"}</span>
        <span className="flex items-center gap-2"><PencilLine aria-hidden="true" className="h-3.5 w-3.5" />Last edited: {section.review.lastEdited ?? "Never"}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-3" aria-label={`${section.title} review actions`}>
        <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
          <Check aria-hidden="true" className="h-4 w-4" />Approve
        </button>
        <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 text-sm font-bold text-red-200 transition hover:bg-red-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300">
          <X aria-hidden="true" className="h-4 w-4" />Reject
        </button>
        <span className="self-center text-xs text-slate-500">UI only — changes are not saved</span>
      </div>
    </section>
  );
}
