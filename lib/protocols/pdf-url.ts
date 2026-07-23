const protocolPdfPath = "/protocols/covenant-health-air-protocols.pdf";

export function getProtocolPdfUrl(page: number) {
  if (!Number.isInteger(page) || page < 1) {
    throw new Error("PDF page numbers must be positive integers.");
  }

  return `${protocolPdfPath}#page=${page}`;
}
