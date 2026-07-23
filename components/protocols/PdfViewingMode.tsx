"use client";

import SinglePagePdfViewer from "./SinglePagePdfViewer";
import { usePdfViewingMode } from "../settings/usePdfViewingMode";

type PdfViewingModeProps = {
  startPage: number;
  endPage: number;
  pdfUrl: string;
  protocolTitle: string;
  fallbackHref: string;
};

export default function PdfViewingMode({
  startPage,
  endPage,
  pdfUrl,
  protocolTitle,
  fallbackHref,
}: PdfViewingModeProps) {
  const { mode } = usePdfViewingMode();

  if (mode === "manual") {
    return (
      <section aria-label={`${protocolTitle} full PDF manual`}>
        <p className="mb-3 text-sm text-slate-400">Full manual view</p>
        <iframe
          key={pdfUrl}
          src={pdfUrl}
          title={`${protocolTitle} full PDF manual`}
          className="h-[70vh] min-h-96 w-full rounded-2xl border border-slate-800 bg-slate-900"
        />
      </section>
    );
  }

  return (
    <SinglePagePdfViewer
      key={`${startPage}-${endPage}`}
      startPage={startPage}
      endPage={endPage}
      pdfUrl={pdfUrl}
      protocolTitle={protocolTitle}
      fallbackHref={fallbackHref}
    />
  );
}
