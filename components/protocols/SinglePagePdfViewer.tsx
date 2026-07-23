"use client";

import type {
  PDFDocumentLoadingTask,
  PDFDocumentProxy,
  RenderTask,
} from "pdfjs-dist/legacy/build/pdf.mjs";
import { ExternalLink, RefreshCw, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.25;

type ProtocolPdfViewerProps = {
  pdfUrl: string;
  protocolTitle: string;
  fallbackHref: string;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "The protocol pages could not be rendered.";
}

function PdfPageCanvas({
  document,
  page,
  width,
  zoom,
  protocolTitle,
  onRendered,
  onError,
}: {
  document: PDFDocumentProxy;
  page: number;
  width: number;
  zoom: number;
  protocolTitle: string;
  onRendered: (page: number) => void;
  onError: (error: unknown) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !width) return;

    let active = true;
    let renderTask: RenderTask | null = null;

    document.getPage(page).then((pdfPage) => {
      if (!active) return;
      const baseViewport = pdfPage.getViewport({ scale: 1 });
      const viewport = pdfPage.getViewport({ scale: (width / baseViewport.width) * zoom });
      const outputScale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;
      renderTask = pdfPage.render({
        canvas,
        canvasContext: context,
        transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0],
        viewport,
      });
      return renderTask.promise;
    }).then(() => onRendered(page), (error) => {
      if (active && getErrorMessage(error) !== "Rendering cancelled") onError(error);
    });

    return () => {
      active = false;
      renderTask?.cancel();
    };
  }, [document, onError, onRendered, page, width, zoom]);

  return <canvas ref={canvasRef} aria-label={`${protocolTitle}, PDF page ${page}`} className="mx-auto block bg-white shadow-lg" />;
}

export default function SinglePagePdfViewer({ pdfUrl, protocolTitle, fallbackHref }: ProtocolPdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [renderedPages, setRenderedPages] = useState<number[]>([]);
  const [reloadKey, setReloadKey] = useState(0);
  const sourceUrl = pdfUrl.split("#")[0];
  const pages = document
    ? Array.from({ length: document.numPages }, (_, index) => index + 1)
    : [];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const resizeObserver = new ResizeObserver((entries) => setContainerWidth(Math.max(0, Math.floor(entries[0].contentRect.width) - 16)));
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    let loadingTask: PDFDocumentLoadingTask | null = null;
    void import("pdfjs-dist/legacy/build/pdf.mjs").then(({ GlobalWorkerOptions, getDocument }) => {
      if (!active) return;
      GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";
      loadingTask = getDocument({ url: sourceUrl, wasmUrl: "/pdfjs/wasm/" });
      loadingTask.promise.then(
        (pdfDocument) => active && setDocument(pdfDocument),
        (loadingError) => active && setError(getErrorMessage(loadingError))
      );
    }, (loadingError) => active && setError(getErrorMessage(loadingError)));
    return () => {
      active = false;
      void loadingTask?.destroy();
    };
  }, [sourceUrl, reloadKey]);

  const markRendered = useCallback(
    (page: number) => setRenderedPages((current) => current.includes(page) ? current : [...current, page]),
    []
  );
  const renderError = useCallback((renderError: unknown) => setError(getErrorMessage(renderError)), []);
  const loading = !error && (!document || renderedPages.length !== pages.length);
  const loadingLabel = document
    ? `Loading protocol page ${Math.min(renderedPages.length + 1, pages.length)} of ${pages.length}…`
    : "Loading protocol pages…";

  function retry() {
    setDocument(null);
    setError(null);
    setRenderedPages([]);
    setReloadKey((current) => current + 1);
  }

  return (
    <section aria-label={`${protocolTitle} PDF pages`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-400">Protocol view</p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setZoom((current) => Math.max(MIN_ZOOM, current - ZOOM_STEP))} disabled={zoom <= MIN_ZOOM} className="min-h-11 min-w-11 rounded-lg border border-slate-700 bg-slate-900 p-2 text-sm text-slate-200 transition hover:border-sky-500 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" aria-label="Zoom out"><ZoomOut aria-hidden="true" className="mx-auto h-5 w-5" /></button>
          <button type="button" onClick={() => setZoom(1)} className="min-h-11 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 transition hover:border-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" aria-label="Reset zoom"><RotateCcw aria-hidden="true" className="mr-1 inline h-4 w-4" />{Math.round(zoom * 100)}%</button>
          <button type="button" onClick={() => setZoom((current) => Math.min(MAX_ZOOM, current + ZOOM_STEP))} disabled={zoom >= MAX_ZOOM} className="min-h-11 min-w-11 rounded-lg border border-slate-700 bg-slate-900 p-2 text-sm text-slate-200 transition hover:border-sky-500 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" aria-label="Zoom in"><ZoomIn aria-hidden="true" className="mx-auto h-5 w-5" /></button>
        </div>
      </div>
      <div ref={containerRef} className="min-h-96 overflow-auto rounded-2xl border border-slate-800 bg-slate-900 p-2" style={{ touchAction: "pan-x pan-y pinch-zoom" }}>
        {error ? <div className="p-4 text-sm text-rose-300"><p>Unable to load this protocol: {error}</p><div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={retry} className="min-h-11 rounded-lg bg-sky-600 px-4 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"><RefreshCw aria-hidden="true" className="mr-2 inline h-4 w-4" />Retry</button><a href={pdfUrl} target="_blank" rel="noreferrer" className="min-h-11 rounded-lg border border-slate-700 px-4 py-3 text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"><ExternalLink aria-hidden="true" className="mr-2 inline h-4 w-4" />Open Full PDF</a><a href={fallbackHref} className="min-h-11 rounded-lg border border-slate-700 px-4 py-3 text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">Protocol list</a></div></div> : (
          <div className="relative min-h-96 space-y-3">
            {loading && <p aria-live="polite" className="absolute inset-0 z-10 flex items-center justify-center text-sm text-slate-400">{loadingLabel}</p>}
            {document && containerWidth > 0 && pages.map((page) => <figure key={`${page}-${zoom}`} className="space-y-2"><figcaption className="text-center text-xs font-medium text-slate-400">Page {page} of {pages.length}</figcaption><PdfPageCanvas document={document} page={page} width={containerWidth} zoom={zoom} protocolTitle={protocolTitle} onRendered={markRendered} onError={renderError} /></figure>)}
          </div>
        )}
      </div>
    </section>
  );
}
