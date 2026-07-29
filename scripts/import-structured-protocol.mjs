import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

function argument(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function parsePages(value) {
  if (!value) throw new Error("Provide --pages with a page number or range, for example --pages 15 or --pages 15-16.");
  const [startText, endText = startText] = value.split("-");
  const start = Number(startText);
  const end = Number(endText);
  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start) throw new Error("The page range is invalid.");
  return { start, end };
}

function groupLines(items) {
  const lines = new Map();
  for (const item of items) {
    if (!("str" in item) || !item.str.trim()) continue;
    const y = Math.round(item.transform[5]);
    const entries = lines.get(y) ?? [];
    entries.push({ text: item.str.trim(), x: item.transform[4] });
    lines.set(y, entries);
  }
  return [...lines.entries()]
    .sort(([first], [second]) => second - first)
    .map(([y, entries]) => ({ y, entries: entries.sort((a, b) => a.x - b.x), text: entries.map((entry) => entry.text).join(" ") }));
}

function looksLikeHeading(text) {
  return text.length <= 80 && !/[.!?]$/.test(text) && (/^[A-Z][A-Za-z &/-]+$/.test(text) || text === text.toUpperCase());
}

function candidateSections(lines, sourcePage) {
  const sections = [];
  let current = { heading: "Unclassified content", lines: [], sourcePage };
  for (const line of lines) {
    if (looksLikeHeading(line.text) && current.lines.length) {
      sections.push(current);
      current = { heading: line.text, lines: [], sourcePage };
    } else if (looksLikeHeading(line.text) && current.heading === "Unclassified content" && current.lines.length === 0) {
      current.heading = line.text;
    } else {
      current.lines.push(line.text);
    }
  }
  if (current.lines.length || current.heading !== "Unclassified content") sections.push(current);
  return sections;
}

export async function importStructuredProtocol({ pdfPath, pages, outputPath, title = "Manual review required", category = "Unclassified" }) {
  const loadingTask = getDocument({ data: new Uint8Array(await readFile(pdfPath)), disableWorker: true });
  const extractedPages = [];
  const reviewFlags = new Set(["Imported content is a Draft and requires manual clinical review."]);

  try {
    const document = await loadingTask.promise;
    for (let pageNumber = pages.start; pageNumber <= pages.end; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      const lines = groupLines(content.items);
      if (lines.some((line) => line.entries.length > 1 && line.entries.at(-1).x - line.entries[0].x > 150)) {
        reviewFlags.add(`Page ${pageNumber} may contain a table, flowchart, or multi-column content.`);
      }
      if (lines.some((line) => /[?]$/.test(line.text)) || lines.length > 45) {
        reviewFlags.add(`Page ${pageNumber} contains ambiguous layout or branching content.`);
      }
      extractedPages.push({ page: pageNumber, candidateSections: candidateSections(lines, pageNumber) });
    }

    const candidate = {
      title,
      category,
      overview: [],
      indications: [],
      contraindications: [],
      assessment: [],
      treatmentSteps: [],
      medications: [],
      warnings: [],
      clinicalPearls: [],
      specialPopulations: [],
      references: [],
      sourcePdf: path.basename(pdfPath),
      sourcePages: pages,
      revisionDate: null,
      lastVerifiedDate: null,
      reviewStatus: "Draft",
      reviewFlags: [...reviewFlags],
      extractedPages,
    };
    await writeFile(outputPath, `${JSON.stringify(candidate, null, 2)}\n`);
    return candidate;
  } finally {
    await loadingTask.destroy();
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const pdfPath = argument("pdf");
  const outputPath = argument("output");
  if (!pdfPath || !outputPath) throw new Error("Usage: npm run import:structured-protocol -- --pdf <file> --pages <range> --output <file> [--title <title>] [--category <category>]");
  const candidate = await importStructuredProtocol({
    pdfPath,
    pages: parsePages(argument("pages")),
    outputPath,
    title: argument("title"),
    category: argument("category"),
  });
  console.log(`Created Draft candidate with ${candidate.reviewFlags.length} manual-review flags.`);
}
