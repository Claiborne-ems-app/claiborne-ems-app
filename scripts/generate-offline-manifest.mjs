import { copyFile, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(projectRoot, "public");
const appConfig = {
  appVersion: "2.10.0",
  protocolVersion: "July 2026",
};

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createProtocolCategories(protocols) {
  const categories = new Map();
  for (const protocol of protocols) {
    const id = slugify(protocol.categoryCode || protocol.category);
    const category = categories.get(id) ?? {
      id,
      title: protocol.category,
      protocols: [],
    };
    category.protocols.push({ ...protocol, id: slugify(protocol.id) });
    categories.set(id, category);
  }
  return [...categories.values()];
}

async function readProtocolCatalog() {
  const source = await readFile(
    path.join(projectRoot, "src/data/claiborne-protocols.json"),
    "utf8"
  );
  return JSON.parse(source);
}

export function createOfflineVersion(config = appConfig) {
  return `${config.appVersion}-${config.protocolVersion}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function createOfflineRoutes(categories) {
  const routes = [
    "/",
    "/protocols",
    "/medications",
    "/tools",
    "/tools/pediatric-resuscitation",
    "/settings",
    "/offline",
  ];

  for (const category of categories) {
    routes.push(`/protocols/${category.id}`);
    for (const protocol of category.protocols) {
      routes.push(`/protocols/${category.id}/${protocol.id}`);
      routes.push(`/protocols/${category.id}/${protocol.id}/viewer`);
    }
  }

  return [...new Set(routes)];
}

const staticResources = [
  "/offline-data.json",
  "/manifest.webmanifest",
  "/icon.png",
  "/apple-icon.png",
  "/icons/claiborne-ems-192.png",
  "/icons/claiborne-ems-512.png",
  "/icons/claiborne-ems-apple-touch.png",
  "/branding/covenant-health-ems-logo.svg",
  "/branding/covenant-health-ems-app-icon.svg",
  "/pdfjs/pdf.worker.min.mjs",
  "/pdfjs/wasm/jbig2.wasm",
  "/pdfjs/wasm/jbig2_nowasm_fallback.js",
  "/pdfjs/wasm/openjpeg.wasm",
  "/pdfjs/wasm/openjpeg_nowasm_fallback.js",
  "/pdfjs/wasm/qcms_bg.wasm",
  "/pdfjs/wasm/quickjs-eval.js",
  "/pdfjs/wasm/quickjs-eval.wasm",
];

async function resourceSize(url) {
  if (url === "/manifest.webmanifest" || url === "/icon.png" || url === "/apple-icon.png") return null;
  try {
    return (await stat(path.join(publicRoot, url))).size;
  } catch {
    return null;
  }
}

export async function generateOfflineManifest() {
  await copyFile(
    path.join(projectRoot, "node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs"),
    path.join(publicRoot, "pdfjs/pdf.worker.min.mjs")
  );
  const catalog = await readProtocolCatalog();
  const protocolCategories = createProtocolCategories(catalog);
  const offlineData = {
    version: createOfflineVersion(),
    categories: protocolCategories,
  };
  await writeFile(
    path.join(publicRoot, "offline-data.json"),
    `${JSON.stringify(offlineData)}\n`
  );

  const routes = createOfflineRoutes(protocolCategories);
  const publicResources = [
    ...catalog.map((protocol) => protocol.pdfPath),
    ...staticResources,
  ];
  const resources = [
    ...routes.map((url) => ({ url, kind: "route", bytes: null })),
    ...(await Promise.all(
      publicResources.map(async (url) => ({
        url,
        kind: url.endsWith(".pdf") ? "document" : "static",
        bytes: await resourceSize(url),
      }))
    )),
  ];

  const manifest = {
    version: createOfflineVersion(),
    appVersion: appConfig.appVersion,
    protocolVersion: appConfig.protocolVersion,
    resources,
    resourceCount: resources.length,
    knownBytes: resources.reduce((total, resource) => total + (resource.bytes ?? 0), 0),
    estimatedBytes:
      resources.reduce((total, resource) => total + (resource.bytes ?? 0), 0) +
      routes.length * 64 * 1024,
  };

  await writeFile(
    path.join(publicRoot, "offline-resources.json"),
    `${JSON.stringify(manifest, null, 2)}\n`
  );
  return manifest;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const manifest = await generateOfflineManifest();
  console.log(`Generated offline package ${manifest.version}: ${manifest.resourceCount} base resources.`);
}
