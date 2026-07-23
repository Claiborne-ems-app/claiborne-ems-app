import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";
import { protocolCategories } from "../data/protocols.ts";
import { getProtocolPdfUrl } from "../lib/protocols/pdf-url.ts";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pdfPath = path.join(
  projectRoot,
  "public/protocols/covenant-health-air-protocols.pdf"
);

function compact(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function damerauLevenshteinDistance(first, second) {
  const matrix = Array.from(
    { length: first.length + 1 },
    (_, row) => Array.from({ length: second.length + 1 }, (_, column) => row + column)
  );

  for (let row = 1; row <= first.length; row += 1) {
    for (let column = 1; column <= second.length; column += 1) {
      const substitutionCost = first[row - 1] === second[column - 1] ? 0 : 1;

      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + substitutionCost
      );

      if (
        row > 1 &&
        column > 1 &&
        first[row - 1] === second[column - 2] &&
        first[row - 2] === second[column - 1]
      ) {
        matrix[row][column] = Math.min(
          matrix[row][column],
          matrix[row - 2][column - 2] + 1
        );
      }
    }
  }

  return matrix[first.length][second.length];
}

function titleMatchesHeader(headerText, title) {
  const expectedTitle = compact(title);
  const compactHeader = compact(headerText);

  if (compactHeader.includes(expectedTitle)) {
    return true;
  }

  for (let index = 0; index <= compactHeader.length - expectedTitle.length; index += 1) {
    if (
      damerauLevenshteinDistance(
        compactHeader.slice(index, index + expectedTitle.length),
        expectedTitle
      ) <= 1
    ) {
      return true;
    }
  }

  return false;
}

async function extractPdfPages() {
  const parser = new PDFParse({ data: fs.readFileSync(pdfPath) });

  try {
    const result = await parser.getText();
    const pages = new Map();

    for (let page = 1; page <= result.total; page += 1) {
      const pageResult = await parser.getText({ partial: [page] });
      const pageText = pageResult.text
        .replace(/-- \d+ of \d+ --\n?/g, "")
        .trim();

      pages.set(page, pageText);
    }

    return pages;
  } finally {
    await parser.destroy();
  }
}

test("consecutive medication routes always use distinct PDF page fragments", () => {
  const medications = protocolCategories.find(
    (category) => category.id === "medications"
  )?.protocols;

  assert.ok(medications, "Medications category is present");

  for (let index = 1; index < medications.length; index += 1) {
    const previousUrl = getProtocolPdfUrl(medications[index - 1].startPage);
    const nextUrl = getProtocolPdfUrl(medications[index].startPage);

    assert.notEqual(
      previousUrl,
      nextUrl,
      `${medications[index - 1].code} → ${medications[index].code}`
    );
    assert.notEqual(
      nextUrl,
      previousUrl,
      `${medications[index].code} → ${medications[index - 1].code}`
    );
  }
});

test("every medication has a validated title, slug, page, viewer route, and PDF URL", async () => {
  const medications = protocolCategories.find(
    (category) => category.id === "medications"
  )?.protocols;
  const pages = await extractPdfPages();

  assert.ok(medications, "Medications category is present");

  for (const medication of medications) {
    const number = medication.code.split("-")[1];
    const headerPattern = new RegExp(
      `Med\\s*ication\\s+MED\\s*-\\s*${number}(?!\\d)`
    );
    const matchingPages = [...pages].filter(([, text]) =>
      headerPattern.test(text)
    );

    assert.equal(
      matchingPages.length,
      1,
      `${medication.code} has one medication header in the PDF`
    );

    const [actualPage, pageText] = matchingPages[0];
    const headerText = pageText.slice(pageText.search(headerPattern));

    assert.equal(
      medication.startPage,
      actualPage,
      `${medication.code} starts on its generated PDF page`
    );
    assert.equal(
      medication.id,
      slugify(medication.title),
      `${medication.code} has the expected generated slug`
    );
    assert.equal(
      `/protocols/medications/${medication.id}/viewer`,
      `/protocols/medications/${slugify(medication.title)}/viewer`,
      `${medication.code} generates the expected viewer route`
    );
    assert.ok(
      titleMatchesHeader(headerText, medication.title),
      `${medication.code} header includes ${medication.title}`
    );
    assert.equal(
      getProtocolPdfUrl(medication.startPage),
      `/protocols/covenant-health-air-protocols.pdf#page=${actualPage}`,
      `${medication.code} generates the expected PDF URL`
    );
  }
});
