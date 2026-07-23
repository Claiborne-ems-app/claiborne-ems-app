import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { protocolCategories } from "../data/protocols.ts";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const report = JSON.parse(
  fs.readFileSync(
    path.join(projectRoot, "reports/protocol-page-validation.json"),
    "utf8"
  )
);

const protocols = protocolCategories.flatMap((category) =>
  category.protocols.map((protocol) => ({ ...protocol, categoryId: category.id }))
);

test("generated protocol ranges are valid and do not overlap except documented shared starts", () => {
  assert.equal(report.validationStatus, "passed");
  assert.equal(report.protocols.length, protocols.length);

  const sorted = [...protocols].sort(
    (first, second) => first.startPage - second.startPage || first.code.localeCompare(second.code)
  );

  for (const [index, protocol] of sorted.entries()) {
    assert.ok(Number.isInteger(protocol.startPage) && protocol.startPage >= 1);
    assert.ok(protocol.endPage >= protocol.startPage);
    assert.ok(protocol.endPage <= report.pdfPageCount);

    const next = sorted[index + 1];
    if (!next || protocol.endPage < next.startPage) {
      continue;
    }

    assert.equal(protocol.startPage, next.startPage, "only shared starts may overlap");
    assert.equal(protocol.endPage, next.endPage, "shared starts must share the same range");
    assert.equal(
      protocol.title.toLowerCase().replace(/[^a-z0-9]/g, ""),
      next.title.toLowerCase().replace(/[^a-z0-9]/g, ""),
      "shared starts must represent the same protocol title"
    );
  }
});

test("Intraosseous Needle Placement has its validated three-page range", () => {
  const intraosseous = protocols.find(
    (protocol) =>
      protocol.categoryId === "procedures" && protocol.id === "intraosseous-needle-placement"
  );

  assert.deepEqual(intraosseous && {
    startPage: intraosseous.startPage,
    endPage: intraosseous.endPage,
  }, { startPage: 144, endPage: 146 });
});
