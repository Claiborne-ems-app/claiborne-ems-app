import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import { createOfflineRoutes, createOfflineVersion } from "../scripts/generate-offline-manifest.mjs";
import { appConfig } from "../lib/app-config.ts";
import { protocolCategories } from "../data/protocols.ts";
import { parseOfflineState, serializeOfflineState } from "../lib/offline/status.ts";

const require = createRequire(import.meta.url);
const {
  cacheNames,
  normalizeResourceUrl,
  extractBuildResources,
  completedVerification,
  staleCachesToDelete,
} = require("../public/sw.js");

test("generates an offline manifest route for every clinical destination", () => {
  const routes = createOfflineRoutes(protocolCategories);
  const protocolCount = protocolCategories.reduce((total, category) => total + category.protocols.length, 0);
  assert.ok(routes.includes("/"));
  assert.ok(routes.includes("/settings"));
  assert.ok(routes.includes("/operations/viewer?page=442"));
  assert.ok(routes.includes("/protocols/references"));
  assert.equal(routes.filter((route) => route.endsWith("/viewer") && route.startsWith("/protocols/")).length, protocolCount);
  assert.equal(createOfflineVersion(appConfig), "1-0-0-july-2026");
});

test("generated package includes clinical PDFs, search data, branding, and the legacy worker", async () => {
  const manifest = JSON.parse(await readFile(new URL("../public/offline-resources.json", import.meta.url), "utf8"));
  const urls = new Set(manifest.resources.map((resource) => resource.url));
  assert.ok(urls.has("/protocols/covenant-health-air-protocols.pdf"));
  assert.ok(urls.has("/documents/operations/medical-operations-manual.pdf"));
  assert.ok(urls.has("/offline-data.json"));
  assert.ok(urls.has("/branding/covenant-health-air-logo.png"));
  assert.ok(urls.has("/icons/covenant-health-air-512.png"));
  assert.ok(urls.has("/pdfjs/pdf.worker.min.mjs"));
  assert.ok(manifest.estimatedBytes > manifest.knownBytes);
});

test("uses stable versioned shell and document cache names", () => {
  assert.deepEqual(cacheNames("1-0-0-july-2026"), {
    shell: "air-protocols-shell-1-0-0-july-2026",
    documents: "air-protocols-documents-1-0-0-july-2026",
  });
});

test("verification distinguishes complete and incomplete packages", () => {
  assert.deepEqual(completedVerification(["/", "/manual.pdf"], new Set(["/", "/manual.pdf"])), { complete: true, missing: [] });
  assert.deepEqual(completedVerification(["/", "/manual.pdf"], new Set(["/"])), { complete: false, missing: ["/manual.pdf"] });
});

test("cache update cleanup preserves only the newly active package", () => {
  const keys = [
    "air-protocols-shell-old",
    "air-protocols-documents-old",
    "air-protocols-shell-new",
    "air-protocols-documents-new",
    "air-protocols-offline-metadata",
    "unrelated-cache",
  ];
  assert.deepEqual(staleCachesToDelete(keys, "new"), [
    "air-protocols-shell-old",
    "air-protocols-documents-old",
  ]);
});

test("normalizes PDF fragments while preserving meaningful query strings", () => {
  assert.equal(
    normalizeResourceUrl("/protocols/covenant-health-air-protocols.pdf#page=66", "https://air.example"),
    "/protocols/covenant-health-air-protocols.pdf"
  );
  assert.equal(normalizeResourceUrl("/operations/viewer?page=66#section", "https://air.example"), "/operations/viewer?page=66");
});

test("discovers deployment-specific Next.js scripts and styles from route HTML", () => {
  const html = '<link rel="stylesheet" href="/_next/static/css/app.css"><script src="/_next/static/chunks/app.js"></script><img src="/branding/logo.png">';
  assert.deepEqual(extractBuildResources(html, "https://air.example").sort(), [
    "/_next/static/chunks/app.js",
    "/_next/static/css/app.css",
  ]);
});

test("offline status persistence round trips valid state and rejects malformed data", () => {
  const state = {
    status: "ready",
    activeVersion: "1-0-0-july-2026",
    packageVersion: "1-0-0-july-2026",
    completedAt: "2026-07-20T12:00:00.000Z",
    fileCount: 100,
    bytes: 1234,
  };
  assert.deepEqual(parseOfflineState(serializeOfflineState(state)), state);
  assert.equal(parseOfflineState("not-json").status, "not-downloaded");
  assert.equal(parseOfflineState('{"status":"unknown"}').status, "not-downloaded");
});
