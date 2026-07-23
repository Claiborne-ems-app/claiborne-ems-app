export type ProtocolPageRange = {
  startPage: number;
  endPage: number;
};

export function getProtocolPageLabel({ startPage, endPage }: ProtocolPageRange) {
  return startPage === endPage
    ? `PDF Page ${startPage}`
    : `PDF Pages ${startPage}–${endPage}`;
}

export function getProtocolPagePositionLabel(index: number, totalPages: number) {
  if (!Number.isInteger(index) || !Number.isInteger(totalPages) || index < 1 || index > totalPages) {
    throw new Error("Protocol page position must be within the protocol page range.");
  }

  return `Page ${index} of ${totalPages}`;
}
