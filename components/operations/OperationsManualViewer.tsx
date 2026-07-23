"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import SinglePagePdfViewer from "../protocols/SinglePagePdfViewer";
import { useRecentOperationsPages } from "./useRecentOperationsPages";

const PAGE_COUNT = 442;
const PDF_URL = "/documents/operations/medical-operations-manual.pdf";

export default function OperationsManualViewer({ page }: { page: number }) {
  const router = useRouter();
  const { recordPage } = useRecentOperationsPages();
  const [requestedPage, setRequestedPage] = useState(String(page));

  useEffect(() => {
    recordPage(page);
  }, [page, recordPage]);

  function navigate(nextPage: number) {
    const href = `/operations/viewer?page=${nextPage}`;
    if (!navigator.onLine) {
      window.location.assign(href);
      return;
    }
    router.push(href);
  }

  function goToPage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextPage = Number(requestedPage);
    if (Number.isInteger(nextPage) && nextPage >= 1 && nextPage <= PAGE_COUNT) {
      navigate(nextPage);
    }
  }

  return (
    <>
      <div className="mb-4 flex items-end gap-3">
        <form onSubmit={goToPage} className="flex flex-1 items-end gap-2">
          <label htmlFor="manual-page" className="flex-1 text-sm text-slate-300">
            Page
            <input id="manual-page" type="number" min="1" max={PAGE_COUNT} value={requestedPage} onChange={(event) => setRequestedPage(event.target.value)} className="mt-1 min-h-11 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 text-white focus:border-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" />
          </label>
          <button type="submit" className="min-h-11 rounded-lg bg-sky-600 px-4 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">Go</button>
        </form>
        <span className="pb-3 text-sm text-slate-400">of {PAGE_COUNT}</span>
      </div>

      <SinglePagePdfViewer startPage={page} endPage={page} pdfUrl={`${PDF_URL}#page=${page}`} protocolTitle="Operations Manual" fallbackHref="/operations" />

      <nav aria-label="Manual page navigation" className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" disabled={page <= 1} onClick={() => navigate(page - 1)} className="min-h-11 rounded-xl border border-slate-700 px-4 text-sky-300 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">Previous page</button>
        <button type="button" disabled={page >= PAGE_COUNT} onClick={() => navigate(page + 1)} className="min-h-11 rounded-xl border border-slate-700 px-4 text-sky-300 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">Next page</button>
      </nav>
    </>
  );
}
