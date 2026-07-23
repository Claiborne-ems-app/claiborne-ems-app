/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { PDFParse } = require("pdf-parse");

const projectRoot = path.resolve(__dirname, "..");
const pdfPath = path.join(
  projectRoot,
  "public/protocols/covenant-health-air-protocols.pdf"
);
const extractedTextPath = path.join(projectRoot, "protocol-text.txt");
const outputPath = path.join(projectRoot, "data/protocols.ts");
const startPageReportPath = path.join(
  projectRoot,
  "reports/protocol-start-pages.md"
);
const pageValidationReportPath = path.join(
  projectRoot,
  "reports/protocol-page-validation.json"
);

const categories = [
  { id: "medical", title: "Medical", prefix: "M", headerLabels: ["Medical"] },
  { id: "trauma", title: "Trauma", prefix: "T", headerLabels: ["Trauma"] },
  {
    id: "pediatrics",
    title: "Pediatrics",
    prefix: "P",
    headerLabels: ["Pediatric", "Pediatrics"],
  },
  { id: "obstetrics", title: "Obstetrics", prefix: "O", headerLabels: ["Obstetrics"] },
  { id: "procedures", title: "Procedures", prefix: "C", headerLabels: ["Procedure"] },
  { id: "medications", title: "Medications", prefix: "MED", headerLabels: ["Medication"] },
  {
    id: "references",
    title: "References",
    prefix: "R",
    headerPrefix: "Ref",
    headerLabels: ["Reference"],
  },
];

function splitPages(text) {
  const pages = new Map();
  const pagePattern = /-- (\d+) of \d+ --\n([\s\S]*?)(?=-- \d+ of \d+ --|$)/g;

  for (const match of text.matchAll(pagePattern)) {
    pages.set(Number(match[1]), match[2].trim());
  }

  return pages;
}

async function extractPhysicalPdfPages(parser, totalPages) {
  const pages = new Map();

  for (let page = 1; page <= totalPages; page += 1) {
    const result = await parser.getText({ partial: [page] });
    const text = result.text
      .replace(/-- \d+ of \d+ --\n?/g, "")
      .trim();

    pages.set(page, text);
  }

  return pages;
}

async function extractProtocolHeaderPages() {
  const { getDocument } = await import(
    pathToFileURL(
      path.join(
        projectRoot,
        "node_modules/pdf-parse/node_modules/pdfjs-dist/legacy/build/pdf.mjs"
      )
    ).href
  );
  const loadingTask = getDocument({
    data: new Uint8Array(fs.readFileSync(pdfPath)),
    disableWorker: true,
  });

  try {
    const pdfDocument = await loadingTask.promise;
    const pages = new Map();

    for (let page = 1; page <= pdfDocument.numPages; page += 1) {
      const pdfPage = await pdfDocument.getPage(page);
      const viewport = pdfPage.getViewport({ scale: 1 });
      const content = await pdfPage.getTextContent();
      const headerText = content.items
        .filter(
          (item) =>
            "str" in item &&
            item.str.trim() &&
            item.transform[5] >= viewport.height - 220
        )
        .map((item) => item.str)
        .join(" ");

      pages.set(page, headerText);
    }

    return {
      pages,
      totalPages: pdfDocument.numPages,
    };
  } finally {
    await loadingTask.destroy();
  }
}

function codePattern(prefix) {
  return new RegExp(`\\b${prefix}\\s*-\\s*(\\d+)\\b`, "g");
}

function headerLabelPattern(labels) {
  const flexibleLabels = labels.map((label) =>
    label
      .split("")
      .map((character) => character.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("\\s*")
  );

  return new RegExp(`\\b(?:${flexibleLabels.join("|")})\\b`, "i");
}

function titleFromText(value) {
  return value
    .replace(/\s+/g, " ")
    .replace(/\s+([,.:;])/g, "$1")
    .trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractContentsEntries(pages, category) {
  const entries = [];
  const seenCodes = new Set();
  const pattern = codePattern(category.prefix);

  for (let page = 2; page <= 13; page += 1) {
    const contents = pages.get(page);

    if (!contents || ![...contents.matchAll(pattern)].length) {
      continue;
    }

    for (const line of contents.split("\n")) {
      const matches = [...line.matchAll(pattern)];

      if (matches.length === 0) {
        if (
          entries.length > 0 &&
          line.trim() &&
          !/^(?:MEDICAL GUIDELINES|TRAUMA GUIDELINES|PEDIATRIC GUIDELINES|OBSTETRICS|PROCEDURES|MEDICATION TABLE OF|REFERENCES TABLE OF|TABLE OF CONTENTS|CONTENTS)$/.test(
            line
          )
        ) {
          entries.at(-1).title = titleFromText(
            `${entries.at(-1).title} ${line}`
          );
        }
        continue;
      }

      const leadingText = line.slice(0, matches[0].index).trim();

      if (leadingText && entries.length > 0) {
        entries.at(-1).title = titleFromText(
          `${entries.at(-1).title} ${leadingText}`
        );
      }

      for (const [index, match] of matches.entries()) {
        const number = match[1];
        const code = `${category.prefix}-${number}`;
        const titleStart = match.index + match[0].length;
        const titleEnd = matches[index + 1]?.index ?? line.length;
        const title = titleFromText(line.slice(titleStart, titleEnd));

        if (!seenCodes.has(code)) {
          entries.push({ code, title });
          seenCodes.add(code);
        }
      }
    }
  }

  return entries.sort(
    (first, second) =>
      Number(first.code.split("-")[1]) - Number(second.code.split("-")[1])
  );
}

function findProtocolPage(pages, entry, category) {
  const [prefix, number] = entry.code.split("-");
  const numberPattern = number.split("").join("\\s*");
  const pattern = new RegExp(
    `\\b${category.headerPrefix ?? prefix}\\s*-\\s*${numberPattern}(?!\\d)`
  );
  const categoryPattern = headerLabelPattern(category.headerLabels);
  const titleTokens = entry.title
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 3);
  const candidates = [];

  for (const [page, text] of pages) {
    const match = text.match(pattern);

    if (page > 13 && match) {
      const normalizedHeader = text.toLowerCase();
      const titleScore = titleTokens.filter((token) =>
        normalizedHeader.includes(token)
      ).length;
      const pageNumberMatch = text.match(/\b(\d+)\s+of\s+\d+\b/i);
      const startPageScore = pageNumberMatch
        ? Number(pageNumberMatch[1]) === 1
          ? 1
          : -1
        : 0;

      if (categoryPattern.test(text) || titleScore > 0) {
        candidates.push({
          page,
          headerText: text,
          score: titleScore * 10 + startPageScore,
        });
      }
    }
  }

  const bestScore = Math.max(...candidates.map((candidate) => candidate.score));
  const bestCandidates = candidates.filter(
    (candidate) => candidate.score === bestScore
  );

  if (bestCandidates.length !== 1) {
    throw new Error(
      `Expected one protocol header for ${entry.code}, found ${bestCandidates.length} best matches (${bestCandidates.map((candidate) => candidate.page).join(", ")}).`
    );
  }

  return bestCandidates[0];
}

function titleFromProtocolHeader(text, code, headerPrefix) {
  const [prefix, number] = code.split("-");
  const pattern = new RegExp(
    `\\b${headerPrefix ?? prefix}\\s*-\\s*${number}(?!\\d)`
  );
  const lines = text.split("\n").map((line) => line.trim());
  const codeLineIndex = lines.findIndex((line) => pattern.test(line));

  if (codeLineIndex === -1) {
    return "";
  }

  const textOnCodeLine = titleFromText(
    lines[codeLineIndex]
      .replace(pattern, "")
      .replace(/\bReference\b/g, "")
  );

  if (textOnCodeLine) {
    return textOnCodeLine;
  }

  return titleFromText(
    lines
      .slice(codeLineIndex + 1)
      .filter(
        (line) =>
          line &&
          !/^\d+\s+of\s+\d+$/.test(line) &&
          !/^(?:Reference|Medical|Trauma|Pediatrics|Obstetrics|Procedure|Medication)$/.test(
            line
          )
      )
      .slice(0, 3)
      .join(" ")
  );
}

function assignProtocolPageRanges(protocolCategories, totalPages) {
  const protocols = protocolCategories.flatMap((category) =>
    category.protocols.map((protocol) => ({ ...protocol, categoryId: category.id }))
  );
  const protocolsByStartPage = new Map();

  for (const protocol of protocols) {
    const protocolsAtPage = protocolsByStartPage.get(protocol.startPage) ?? [];
    protocolsAtPage.push(protocol);
    protocolsByStartPage.set(protocol.startPage, protocolsAtPage);
  }

  const startPages = [...protocolsByStartPage.keys()].sort((first, second) => first - second);
  const structuralExceptions = [];

  for (const [index, startPage] of startPages.entries()) {
    const protocolsAtPage = protocolsByStartPage.get(startPage);
    const nextStartPage = startPages[index + 1];
    const endPage = nextStartPage ? nextStartPage - 1 : totalPages;
    const normalizedTitles = new Set(
      protocolsAtPage.map((protocol) => protocol.title.toLowerCase().replace(/[^a-z0-9]/g, ""))
    );

    if (protocolsAtPage.length > 1 && normalizedTitles.size !== 1) {
      throw new Error(
        `Multiple distinct protocols start on PDF page ${startPage}: ${protocolsAtPage
          .map((protocol) => `${protocol.categoryId}/${protocol.code}`)
          .join(", ")}.`
      );
    }

    if (protocolsAtPage.length > 1) {
      structuralExceptions.push({
        type: "shared-start-page",
        startPage,
        protocols: protocolsAtPage.map((protocol) => `${protocol.categoryId}/${protocol.id}`),
        reason: "The PDF intentionally uses one shared Universal Patient Care page for multiple category codes.",
      });
    }

    for (const protocol of protocolsAtPage) {
      protocol.endPage = endPage;
    }
  }

  for (const category of protocolCategories) {
    category.protocols = category.protocols.map((protocol) =>
      {
        const { categoryId, ...protocolWithRange } = protocols.find(
        (candidate) =>
          candidate.categoryId === category.id && candidate.id === protocol.id
        );
        void categoryId;

        return protocolWithRange;
      }
    );
  }

  return structuralExceptions;
}

function validateProtocolCategories(protocolCategories, totalPages) {
  const routes = new Set();
  const protocols = [];
  for (const category of protocolCategories) {
    if (!category.id || !category.title) {
      throw new Error("Every category must have an id and title.");
    }

    for (const protocol of category.protocols) {
      const route = `${category.id}/${protocol.id}`;

      if (!protocol.title) {
        throw new Error(`Missing title for ${route}.`);
      }

      if (!protocol.id) {
        throw new Error(`Missing slug for ${category.id}/${protocol.title}.`);
      }

      if (!protocol.code) {
        throw new Error(`Missing protocol code for ${route}.`);
      }

      if (!Number.isInteger(protocol.startPage) || protocol.startPage < 1 || protocol.startPage > totalPages) {
        throw new Error(`Invalid start page for ${route}.`);
      }

      if (!Number.isInteger(protocol.endPage) || protocol.endPage < protocol.startPage || protocol.endPage > totalPages) {
        throw new Error(`Invalid end page for ${route}.`);
      }

      if (routes.has(route)) {
        throw new Error(`Duplicate slug for ${route}.`);
      }

      routes.add(route);
      protocols.push({ ...protocol, categoryId: category.id });
    }
  }

  const sortedProtocols = [...protocols].sort(
    (first, second) => first.startPage - second.startPage || first.code.localeCompare(second.code)
  );
  for (const [index, protocol] of sortedProtocols.entries()) {
    const nextProtocol = sortedProtocols[index + 1];
    if (!nextProtocol || protocol.endPage < nextProtocol.startPage) {
      continue;
    }

    const sharedStart = protocol.startPage === nextProtocol.startPage;
    const sharedTitle =
      protocol.title.toLowerCase().replace(/[^a-z0-9]/g, "") ===
      nextProtocol.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!sharedStart || !sharedTitle || protocol.endPage !== nextProtocol.endPage) {
      throw new Error(
        `Overlapping page ranges for ${protocol.categoryId}/${protocol.id} and ${nextProtocol.categoryId}/${nextProtocol.id}.`
      );
    }
  }
}

function renderData(protocolCategories) {
  return `export interface Protocol {
  id: string;
  code: string;
  title: string;
  startPage: number;
  endPage: number;
}

export interface Category {
  id: string;
  title: string;
  protocols: Protocol[];
}

export const protocolCategories: Category[] = ${JSON.stringify(
    protocolCategories,
    null,
    2
  )};
`;
}

function renderStartPageReport(entries) {
  const rows = entries.map((entry) => {
    const headerText = entry.headerText
      .replace(/\s+/g, " ")
      .replace(/\|/g, "\\|")
      .trim();

    return `| ${entry.category} | ${entry.code} | ${entry.title} | ${entry.page} | ${headerText} |`;
  });

  return `# Protocol Start-Page Validation\n\nGenerated from physical PDF header coordinates. Every row requires a matching protocol code and category/title signal in the PDF's top header band.\n\n| Category | Code | Title | Detected PDF start page | Matched header text |\n| --- | --- | --- | ---: | --- |\n${rows.join("\n")}\n`;
}

function renderPageValidationReport(protocolCategories, totalPages, structuralExceptions) {
  return `${JSON.stringify(
    {
      pdfPageCount: totalPages,
      validationStatus: "passed",
      structuralExceptions,
      protocols: protocolCategories.flatMap((category) =>
        category.protocols.map((protocol) => ({
          category: category.id,
          code: protocol.code,
          title: protocol.title,
          startPage: protocol.startPage,
          endPage: protocol.endPage,
          pageCount: protocol.endPage - protocol.startPage + 1,
          validationStatus: "passed",
        }))
      ),
    },
    null,
    2
  )}\n`;
}

async function main() {
  const parser = new PDFParse({ data: fs.readFileSync(pdfPath) });
  const result = await parser.getText();
  const contentsPages = splitPages(result.text);
  const protocolPages = await extractPhysicalPdfPages(parser, result.total);
  const headerPages = await extractProtocolHeaderPages();

  if (headerPages.totalPages !== result.total) {
    throw new Error("PDF text extraction and PDF header page counts differ.");
  }

  fs.writeFileSync(extractedTextPath, result.text, "utf8");

  const startPageReportEntries = [];
  const protocolCategories = categories.map((category) => {
    const protocols = extractContentsEntries(contentsPages, category).map((entry) => {
      const { page: startPage, headerText } = findProtocolPage(
        headerPages.pages,
        entry,
        category
      );
      const title =
        entry.title ||
        titleFromProtocolHeader(
          protocolPages.get(startPage),
          entry.code,
          category.headerPrefix
        );

      const protocol = {
        id: slugify(title),
        code: entry.code,
        title,
        startPage,
      };

      startPageReportEntries.push({
        category: category.title,
        code: protocol.code,
        title: protocol.title,
        page: protocol.startPage,
        headerText,
      });

      return protocol;
    });

    return {
      id: category.id,
      title: category.title,
      protocols,
    };
  });

  const structuralExceptions = assignProtocolPageRanges(
    protocolCategories,
    result.total
  );
  validateProtocolCategories(protocolCategories, result.total);

  fs.writeFileSync(outputPath, renderData(protocolCategories), "utf8");
  fs.mkdirSync(path.dirname(startPageReportPath), { recursive: true });
  fs.writeFileSync(
    startPageReportPath,
    renderStartPageReport(startPageReportEntries),
    "utf8"
  );
  fs.writeFileSync(
    pageValidationReportPath,
    renderPageValidationReport(
      protocolCategories,
      result.total,
      structuralExceptions
    ),
    "utf8"
  );
  await parser.destroy();

  const protocolCount = protocolCategories.reduce(
    (count, category) => count + category.protocols.length,
    0
  );

  console.log(
    `Imported and validated ${protocolCount} protocol start pages from ${result.total} PDF pages.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
