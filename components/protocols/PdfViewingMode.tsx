"use client";

import SinglePagePdfViewer from "./SinglePagePdfViewer";
import { usePdfViewingMode } from "../settings/usePdfViewingMode";

type PdfViewingModeProps = {
  pdfUrl: string;
  protocolTitle: string;
  fallbackHref: string;
};

export default function PdfViewingMode({
  pdfUrl,
  protocolTitle,
  fallbackHref,
}: PdfViewingModeProps) {
  const { mode } = usePdfViewingMode();

  if (mode === "browser") {
    return (
      <section aria-label={`${protocolTitle} PDF document`}>
        <p className="mb-3 text-sm text-slate-400">Browser PDF view</p>
        <iframe
          key={pdfUrl}
          src={pdfUrl}
          title={`${protocolTitle} PDF document`}
          className="h-[70vh] min-h-96 w-full rounded-2xl border border-slate-800 bg-slate-900"
        />
      </section>
    );
  }

  return (
    <SinglePagePdfViewer
      key={pdfUrl}
      pdfUrl={pdfUrl}
      protocolTitle={protocolTitle}
      fallbackHref={fallbackHref}
    />
  );
}
