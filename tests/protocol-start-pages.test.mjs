import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { protocolCategories } from "../data/protocols.ts";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pdfPath = path.join(
  projectRoot,
  "public/protocols/covenant-health-air-protocols.pdf"
);

const headerLabels = {
  medical: ["Medical"],
  trauma: ["Trauma"],
  pediatrics: ["Pediatric", "Pediatrics"],
  obstetrics: ["Obstetrics"],
  procedures: ["Procedure"],
  medications: ["Medication"],
  references: ["Reference"],
};

function headerLabelPattern(labels) {
  const flexibleLabels = labels.map((label) =>
    label
      .split("")
      .map((character) => character.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("\\s*")
  );

  return new RegExp(`\\b(?:${flexibleLabels.join("|")})\\b`, "i");
}

function protocolCodePattern(code, categoryId) {
  const [prefix, number] = code.split("-");
  const headerPrefix = categoryId === "references" ? "Ref" : prefix;
  const numberPattern = number.split("").join("\\s*");

  return new RegExp(`\\b${headerPrefix}\\s*-\\s*${numberPattern}(?!\\d)`);
}

async function getHeaderText(pdfDocument, pageNumber) {
  const pdfPage = await pdfDocument.getPage(pageNumber);
  const viewport = pdfPage.getViewport({ scale: 1 });
  const content = await pdfPage.getTextContent();

  return content.items
    .filter(
      (item) =>
        "str" in item &&
        item.str.trim() &&
        item.transform[5] >= viewport.height - 220
    )
    .map((item) => item.str)
    .join(" ");
}

test("every generated protocol start page has its code and header signal on the physical PDF page", async () => {
  const loadingTask = getDocument({
    data: new Uint8Array(fs.readFileSync(pdfPath)),
    disableWorker: true,
  });

  try {
    const pdfDocument = await loadingTask.promise;
    const routes = new Set();

    for (const category of protocolCategories) {
      for (const protocol of category.protocols) {
        const route = `${category.id}/${protocol.id}`;
        const headerText = await getHeaderText(pdfDocument, protocol.startPage);
        const titleTokens = protocol.title
          .toLowerCase()
          .split(/[^a-z0-9]+/)
          .filter((token) => token.length >= 3);
        const titleMatches = titleTokens.some((token) =>
          headerText.toLowerCase().includes(token)
        );

        assert.ok(protocol.startPage >= 1 && protocol.startPage <= pdfDocument.numPages, route);
        assert.match(headerText, protocolCodePattern(protocol.code, category.id), route);
        assert.ok(
          headerLabelPattern(headerLabels[category.id]).test(headerText) || titleMatches,
          `${route} has a category or title signal in its header`
        );
        assert.ok(!routes.has(route), `duplicate route ${route}`);
        routes.add(route);
      }
    }
  } finally {
    await loadingTask.destroy();
  }
});
