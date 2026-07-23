export const PDF_VIEWING_MODE_STORAGE_KEY = "claiborne-protocols:pdf-viewing-mode";

export const PDF_VIEWING_MODES = ["protocol", "browser"] as const;

export type PdfViewingMode = (typeof PDF_VIEWING_MODES)[number];

export function parsePdfViewingMode(value: string | null): PdfViewingMode {
  return value === "browser" ? "browser" : "protocol";
}
