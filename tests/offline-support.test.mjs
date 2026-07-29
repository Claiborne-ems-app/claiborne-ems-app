import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import {
  createOfflineRoutes,
  createOfflineVersion,
} from "../scripts/generate-offline-manifest.mjs";
import { appConfig } from "../lib/app-config.ts";
import { protocolCategories } from "../data/protocols.ts";
import {
  parseOfflineState,
  serializeOfflineState,
} from "../lib/offline/status.ts";

const require = createRequire(import.meta.url);
const {
  cacheNames,
  normalizeResourceUrl,
  extractBuildResources,
  completedVerification,
  staleCachesToDelete,
} = require("../public/sw.js");

test("generates an offline route for every protocol destination", () => {
  const routes = createOfflineRoutes(protocolCategories);
  assert.ok(routes.includes("/"));
  assert.ok(routes.includes("/settings"));
  assert.ok(!routes.some((route) => route.startsWith("/operations")));
  assert.equal(
    routes.filter(
      (route) =>
        route.endsWith("/viewer") && route.startsWith("/protocols/")
    ).length,
    93
  );
  assert.equal(createOfflineVersion(appConfig), "1-0-0-july-2026");
});

test("generated package includes all direct PDFs and Claiborne branding", async () => {
  const manifest = JSON.parse(
    await readFile(
      new URL("../public/offline-resources.json", import.meta.url),
      "utf8"
    )
  );
  const urls = new Set(manifest.resources.map((resource) => resource.url));
  assert.equal(
    manifest.resources.filter((resource) => resource.kind === "document").length,
    93
  );
  assert.ok(
    urls.has(
      "/protocols/claiborne/up-01-universal-patient-care-protocol.pdf"
    )
  );
  assert.ok(urls.has("/icons/claiborne-ems-512.png"));
  assert.ok(urls.has("/pdfjs/pdf.worker.min.mjs"));
});

test("uses stable Claiborne versioned cache names", () => {
  assert.deepEqual(cacheNames("new"), {
    shell: "claiborne-protocols-shell-new",
    documents: "claiborne-protocols-documents-new",
  });
  assert.deepEqual(
    staleCachesToDelete(
      [
        "claiborne-protocols-shell-old",
        "claiborne-protocols-documents-old",
        "claiborne-protocols-shell-new",
        "claiborne-protocols-documents-new",
      ],
      "new"
    ),
    [
      "claiborne-protocols-shell-old",
      "claiborne-protocols-documents-old",
    ]
  );
});

test("offline helpers normalize, discover, and verify resources", () => {
  assert.equal(
    normalizeResourceUrl(
      "/protocols/claiborne/ac-01-asystole-pulseless-electrical-activity-protocol.pdf#page=2",
      "https://claiborne.example"
    ),
    "/protocols/claiborne/ac-01-asystole-pulseless-electrical-activity-protocol.pdf"
  );
  assert.deepEqual(
    completedVerification(["/", "/protocol.pdf"], new Set(["/"])),
    { complete: false, missing: ["/protocol.pdf"] }
  );
  assert.deepEqual(
    extractBuildResources(
      '<link href="/_next/app.css"><script src="/_next/app.js"></script>',
      "https://claiborne.example"
    ).sort(),
    ["/_next/app.css", "/_next/app.js"]
  );
});

test("offline status persistence round trips valid state", () => {
  const state = {
    status: "ready",
    activeVersion: "1-0-0-july-2026",
    packageVersion: "1-0-0-july-2026",
    completedAt: "2026-07-20T12:00:00.000Z",
    fileCount: 309,
    bytes: 1234,
  };
  assert.deepEqual(parseOfflineState(serializeOfflineState(state)), state);
  assert.equal(parseOfflineState("not-json").status, "not-downloaded");
});
