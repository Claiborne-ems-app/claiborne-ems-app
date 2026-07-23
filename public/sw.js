/* Air Protocols transactional offline service worker. */
const SHELL_PREFIX = "air-protocols-shell-";
const DOCUMENT_PREFIX = "air-protocols-documents-";
const METADATA_CACHE = "air-protocols-offline-metadata";
const STATE_KEY = "/__air_protocols_offline_state__";
const MANIFEST_URL = "/offline-resources.json";
const DOWNLOAD_CONCURRENCY = 3;
const MAX_ATTEMPTS = 3;
const activeDownloads = new Map();

function cacheNames(version) {
  return {
    shell: `${SHELL_PREFIX}${version}`,
    documents: `${DOCUMENT_PREFIX}${version}`,
  };
}

function normalizeResourceUrl(value, origin = self.location?.origin ?? "https://offline.invalid") {
  const url = new URL(value, origin);
  url.hash = "";
  return `${url.pathname}${url.search}`;
}

function isDocumentResource(url) {
  return /\.pdf(?:$|\?)/i.test(url) || url.startsWith("/pdfjs/") || url.startsWith("/icons/") || url.startsWith("/branding/") || url === "/icon.png" || url === "/apple-icon.png";
}

function extractBuildResources(html, origin = self.location?.origin ?? "https://offline.invalid") {
  const resources = new Set();
  const pattern = /(?:src|href)=["']([^"']+)["']/g;
  for (const match of html.matchAll(pattern)) {
    try {
      const url = new URL(match[1], origin);
      if (url.origin === origin && url.pathname.startsWith("/_next/")) {
        resources.add(`${url.pathname}${url.search}`);
      }
    } catch {
      // Ignore malformed markup URLs.
    }
  }
  return [...resources];
}

function completedVerification(expected, found) {
  const missing = expected.filter((url) => !found.has(url));
  return { complete: missing.length === 0, missing };
}

function staleCachesToDelete(keys, activeVersion) {
  const active = cacheNames(activeVersion);
  return keys.filter(
    (key) =>
      (key.startsWith(SHELL_PREFIX) || key.startsWith(DOCUMENT_PREFIX)) &&
      key !== active.shell &&
      key !== active.documents
  );
}

async function readState() {
  const cache = await caches.open(METADATA_CACHE);
  const response = await cache.match(new URL(STATE_KEY, self.location.origin).href);
  if (!response) {
    return { status: "not-downloaded", activeVersion: null, packageVersion: null };
  }
  try {
    return await response.json();
  } catch {
    return { status: "verification-failed", activeVersion: null, packageVersion: null };
  }
}

async function writeState(state) {
  const cache = await caches.open(METADATA_CACHE);
  await cache.put(
    new URL(STATE_KEY, self.location.origin).href,
    new Response(JSON.stringify(state), { headers: { "Content-Type": "application/json" } })
  );
  await notifyClients({ type: "OFFLINE_STATE", state });
  return state;
}

async function fetchManifest() {
  const response = await fetch(`${MANIFEST_URL}?t=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Offline manifest returned ${response.status}.`);
  return response.json();
}

async function notifyClients(message) {
  const windows = await self.clients.matchAll({ includeUncontrolled: true, type: "window" });
  windows.forEach((client) => client.postMessage(message));
}

function post(port, message) {
  port?.postMessage(message);
  void notifyClients(message);
}

async function matchResource(cache, url) {
  return cache.match(new URL(url, self.location.origin).href);
}

async function verifyPackage(version, resources) {
  if (!version || !Array.isArray(resources) || resources.length === 0) {
    return { complete: false, missing: resources ?? [] };
  }
  const names = cacheNames(version);
  const [shell, documents] = await Promise.all([
    caches.open(names.shell),
    caches.open(names.documents),
  ]);
  const found = new Set();
  await runPool(
    resources,
    async (resource) => {
      const url = typeof resource === "string" ? resource : resource.url;
      const cache = isDocumentResource(url) ? documents : shell;
      if (await matchResource(cache, url)) found.add(url);
    },
    8
  );
  return completedVerification(
    resources.map((resource) => (typeof resource === "string" ? resource : resource.url)),
    found
  );
}

async function getStatus() {
  const state = await readState();
  let manifest = null;
  try {
    manifest = await fetchManifest();
  } catch {
    // Offline status remains useful without the deployment manifest.
  }

  if (state.activeVersion && state.resources) {
    const verification = await verifyPackage(state.activeVersion, state.resources);
    if (!verification.complete) {
      return { ...state, status: "incomplete", missingCount: verification.missing.length, availableVersion: manifest?.version ?? null };
    }
    if (manifest && manifest.version !== state.activeVersion) {
      return { ...state, status: "update-available", availableVersion: manifest.version };
    }
    return { ...state, status: "ready", availableVersion: manifest?.version ?? state.activeVersion };
  }

  return {
    ...state,
    status: state.status === "downloading" ? "incomplete" : state.status,
    availableVersion: manifest?.version ?? null,
    packageVersion: manifest?.version ?? state.packageVersion,
    estimatedBytes: manifest?.estimatedBytes ?? manifest?.knownBytes ?? null,
    estimatedFiles: manifest?.resourceCount ?? null,
  };
}

async function fetchWithRetry(resource, signal) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    if (signal.aborted) throw new DOMException("Download cancelled", "AbortError");
    try {
      const response = await fetch(resource.url, { cache: "reload", signal });
      if (!response.ok) throw new Error(`${resource.url} returned ${response.status}.`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < MAX_ATTEMPTS && !signal.aborted) {
        await new Promise((resolve) => setTimeout(resolve, 300 * attempt));
      }
    }
  }
  throw lastError;
}

async function runPool(items, worker, concurrency = DOWNLOAD_CONCURRENCY) {
  let index = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (index < items.length) {
      const current = items[index];
      index += 1;
      await worker(current);
    }
  });
  await Promise.all(runners);
}

async function downloadPackage(port) {
  const manifest = await fetchManifest();
  if (activeDownloads.has(manifest.version)) throw new Error("This offline package is already downloading.");

  const prior = await readState();
  const names = cacheNames(manifest.version);
  if (prior.activeVersion !== manifest.version) {
    await Promise.all([caches.delete(names.shell), caches.delete(names.documents)]);
  }
  const [shell, documents] = await Promise.all([caches.open(names.shell), caches.open(names.documents)]);
  const controller = new AbortController();
  activeDownloads.set(manifest.version, controller);
  const baseResources = manifest.resources.map((resource) => ({ ...resource, url: normalizeResourceUrl(resource.url) }));
  const discovered = new Map();
  let completed = 0;
  let downloadedBytes = 0;
  let total = baseResources.length;

  await writeState({
    ...prior,
    status: "downloading",
    packageVersion: manifest.version,
    downloadStartedAt: new Date().toISOString(),
  });

  const cacheOne = async (resource) => {
    post(port, {
      type: "OFFLINE_PROGRESS",
      phase: "downloading",
      current: completed + 1,
      total,
      percent: Math.floor((completed / total) * 100),
      resource: resource.url,
      downloadedBytes,
    });
    const response = await fetchWithRetry(resource, controller.signal);
    const length = Number(response.headers.get("Content-Length"));
    if (Number.isFinite(length) && length > 0) downloadedBytes += length;
    const target = isDocumentResource(resource.url) ? documents : shell;
    await target.put(new URL(resource.url, self.location.origin).href, response.clone());

    if (resource.kind === "route" && response.headers.get("Content-Type")?.includes("text/html")) {
      const html = await response.clone().text();
      for (const url of extractBuildResources(html, self.location.origin)) {
        if (!discovered.has(url)) discovered.set(url, { url, kind: "static", bytes: null });
      }
    }
    completed += 1;
    post(port, {
      type: "OFFLINE_PROGRESS",
      phase: "downloading",
      current: completed,
      total,
      percent: Math.floor((completed / total) * 100),
      resource: resource.url,
      downloadedBytes,
    });
  };

  try {
    post(port, { type: "OFFLINE_PROGRESS", phase: "preparing", current: 0, total, percent: 0, downloadedBytes: 0 });
    await runPool(baseResources, cacheOne);
    const buildResources = [...discovered.values()].filter(
      (resource) => !baseResources.some((base) => base.url === resource.url)
    );
    total += buildResources.length;
    await runPool(buildResources, cacheOne);
    const resources = [...baseResources, ...buildResources];

    post(port, { type: "OFFLINE_PROGRESS", phase: "verifying", current: completed, total, percent: 100, downloadedBytes });
    const verification = await verifyPackage(manifest.version, resources);
    if (!verification.complete) throw new Error(`Verification failed for ${verification.missing.length} resources.`);

    const nextState = {
      status: "ready",
      activeVersion: manifest.version,
      packageVersion: manifest.version,
      completedAt: new Date().toISOString(),
      fileCount: resources.length,
      bytes: downloadedBytes || manifest.knownBytes,
      resources,
    };
    await writeState(nextState);
    const stale = staleCachesToDelete(await caches.keys(), manifest.version);
    await Promise.all(stale.map((name) => caches.delete(name)));
    post(port, { type: "OFFLINE_COMPLETE", state: nextState });
  } catch (error) {
    const cancelled = error?.name === "AbortError";
    const failureState = {
      ...prior,
      status: "incomplete",
      packageVersion: manifest.version,
      lastError: cancelled ? "Download cancelled." : String(error?.message ?? error),
    };
    await writeState(failureState);
    post(port, { type: "OFFLINE_ERROR", error: failureState.lastError, state: failureState });
  } finally {
    activeDownloads.delete(manifest.version);
  }
}

async function removeOfflineContent() {
  for (const controller of activeDownloads.values()) controller.abort();
  const keys = await caches.keys();
  await Promise.all(
    keys
      .filter((key) => key.startsWith(SHELL_PREFIX) || key.startsWith(DOCUMENT_PREFIX))
      .map((key) => caches.delete(key))
  );
  return writeState({ status: "not-downloaded", activeVersion: null, packageVersion: null });
}

async function activeCacheMatch(request, state) {
  if (!state.activeVersion) return null;
  const names = cacheNames(state.activeVersion);
  const url = new URL(request.url);
  url.hash = "";
  if (isDocumentResource(url.pathname)) {
    return (await caches.open(names.documents)).match(url.href);
  }
  const shell = await caches.open(names.shell);
  return shell.match(url.href) || shell.match(`${url.origin}${url.pathname}`);
}

if (typeof self !== "undefined" && self.addEventListener) {
  self.addEventListener("install", () => self.skipWaiting());
  self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

  self.addEventListener("message", (event) => {
    const port = event.ports?.[0];
    const respond = (message) => port?.postMessage(message);
    if (event.data?.type === "GET_OFFLINE_STATUS") {
      event.waitUntil(getStatus().then((state) => respond({ type: "OFFLINE_STATUS", state })));
    } else if (event.data?.type === "DOWNLOAD_OFFLINE_CONTENT") {
      event.waitUntil(downloadPackage(port).catch((error) => respond({ type: "OFFLINE_ERROR", error: String(error?.message ?? error) })));
    } else if (event.data?.type === "VERIFY_OFFLINE_CONTENT") {
      event.waitUntil(
        getStatus().then(async (state) => {
          const next = await writeState({ ...state, status: state.status === "ready" || state.status === "update-available" ? state.status : "verification-failed" });
          respond({ type: "OFFLINE_STATUS", state: next });
        })
      );
    } else if (event.data?.type === "REMOVE_OFFLINE_CONTENT") {
      event.waitUntil(removeOfflineContent().then((state) => respond({ type: "OFFLINE_STATUS", state })));
    } else if (event.data?.type === "CANCEL_OFFLINE_DOWNLOAD") {
      for (const controller of activeDownloads.values()) controller.abort();
    } else if (event.data?.type === "SKIP_WAITING") {
      void self.skipWaiting();
    }
  });

  self.addEventListener("fetch", (event) => {
    const request = event.request;
    if (request.method !== "GET") return;
    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(
      (async () => {
        const state = await readState();
        const cached = await activeCacheMatch(request, state);
        const cacheFirst = isDocumentResource(url.pathname) || url.pathname.startsWith("/_next/");
        if (cacheFirst && cached) return cached;

        if (request.mode === "navigate") {
          try {
            return await fetch(request);
          } catch {
            if (cached) return cached;
            const fallback = await activeCacheMatch(new Request(`${url.origin}/offline`), state);
            return fallback || new Response("Air Protocols is offline and this page was not downloaded.", { status: 503, headers: { "Content-Type": "text/plain" } });
          }
        }

        try {
          return await fetch(request);
        } catch {
          if (cached) return cached;
          throw new Error(`Offline resource unavailable: ${url.pathname}`);
        }
      })()
    );
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    cacheNames,
    normalizeResourceUrl,
    extractBuildResources,
    completedVerification,
    staleCachesToDelete,
  };
}
