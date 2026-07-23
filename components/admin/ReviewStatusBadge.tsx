import type { ReviewStatus } from "../../lib/admin/review-types";

const statusPresentation: Record<ReviewStatus, { label: string; className: string }> = {
  approved: { label: "Approved", className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" },
  reviewed: { label: "Reviewed", className: "border-teal-400/20 bg-teal-400/10 text-teal-300" },
  "in-review": { label: "In Review", className: "border-sky-400/20 bg-sky-400/10 text-sky-300" },
  "not-started": { label: "Not Started", className: "border-slate-600 bg-slate-800 text-slate-300" },
  rejected: { label: "Rejected", className: "border-red-400/20 bg-red-400/10 text-red-300" },
};

export default function ReviewStatusBadge({ status }: { status: ReviewStatus }) {
  const presentation = statusPresentation[status];
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${presentation.className}`}>{presentation.label}</span>;
}
