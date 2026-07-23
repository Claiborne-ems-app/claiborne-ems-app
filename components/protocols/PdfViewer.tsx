import Link from "next/link";
import ProtocolBackButton from "../navigation/ProtocolBackButton";
import PdfViewingMode from "./PdfViewingMode";
import { ExternalLink, FileText, House } from "lucide-react";

type PdfViewerProps = {
  fallbackHref: string;
  detailsHref: string;
  pdfUrl: string;
  protocolTitle: string;
  protocolCode: string;
  categoryTitle: string;
  pages: number | null;
  nativeContentAvailable: boolean;
};

export default function PdfViewer({
  fallbackHref,
  detailsHref,
  pdfUrl,
  protocolTitle,
  protocolCode,
  categoryTitle,
  pages,
  nativeContentAvailable,
}: PdfViewerProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <ProtocolBackButton
          fallbackHref={fallbackHref}
          fallbackLabel={`${categoryTitle} Protocols`}
          label={`Back to ${protocolTitle}`}
        />
        <Link href="/" className="inline-flex min-h-11 items-center rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:border-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
          <House aria-hidden="true" className="mr-1.5 h-4 w-4" />Home
        </Link>
      </div>

      <h1 className="mt-4 text-3xl font-bold">
        {protocolTitle}
      </h1>

      <p className="mt-1 mb-4 text-slate-400">
        {categoryTitle} · {protocolCode} · {pages ? `${pages} PDF ${pages === 1 ? "page" : "pages"}` : "PDF protocol"}
      </p>

      {!nativeContentAvailable && (
        <p className="mb-4 rounded-xl border border-sky-500/20 bg-sky-500/5 px-4 py-3 text-sm text-sky-200">
          Native mobile content is not yet available for this protocol.
        </p>
      )}

      <PdfViewingMode
        pdfUrl={pdfUrl}
        protocolTitle={protocolTitle}
        fallbackHref={fallbackHref}
      />

      <div className="mt-4 flex items-center gap-4">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sky-400"
        >
          <FileText aria-hidden="true" className="mr-1 inline h-4 w-4" />Open Full PDF<ExternalLink aria-hidden="true" className="ml-1 inline h-4 w-4" />
        </a>

        {nativeContentAvailable && (
          <Link
            href={detailsHref}
            className="text-sm text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Native Protocol
          </Link>
        )}
      </div>
    </>
  );
}
