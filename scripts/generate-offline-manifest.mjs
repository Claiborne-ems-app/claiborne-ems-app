import { copyFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { appConfig } from "../lib/app-config.ts";
import { protocolCategories } from "../data/protocols.ts";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(projectRoot, "public");
const operationsPageCount = 442;

export function createOfflineVersion(config = appConfig) {
  return `${config.appVersion}-${config.protocolVersion}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function createOfflineRoutes(categories = protocolCategories) {
  const routes = ["/", "/protocols", "/operations", "/settings", "/offline"];

  for (const category of categories) {
    routes.push(`/protocols/${category.id}`);
    for (const protocol of category.protocols) {
      routes.push(`/protocols/${category.id}/${protocol.id}`);
      routes.push(`/protocols/${category.id}/${protocol.id}/viewer`);
    }
  }

  for (let page = 1; page <= operationsPageCount; page += 1) {
    routes.push(`/operations/viewer?page=${page}`);
  }

  return [...new Set(routes)];
}

const publicResources = [
  "/protocols/covenant-health-air-protocols.pdf",
  "/documents/operations/medical-operations-manual.pdf",
  "/offline-data.json",
  "/manifest.webmanifest",
  "/icon.png",
  "/apple-icon.png",
  "/branding/covenant-health-air-logo.png",
  "/branding/covenant-health-air-logo-cropped.png",
  "/icons/covenant-health-air-192.png",
  "/icons/covenant-health-air-512.png",
  "/icons/covenant-health-air-apple-touch.png",
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
  const offlineData = {
    version: createOfflineVersion(),
    categories: protocolCategories,
  };
  await writeFile(
    path.join(publicRoot, "offline-data.json"),
    `${JSON.stringify(offlineData)}\n`
  );

  const routes = createOfflineRoutes();
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
