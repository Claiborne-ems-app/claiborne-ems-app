import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { setPackageVersion } from "../scripts/set-package-version.mjs";

const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const lock = JSON.parse(readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"));

function withoutRootVersions(value) {
  const copy = structuredClone(value);
  delete copy.version;
  if (copy.packages?.[""]) delete copy.packages[""].version;
  return copy;
}

test("app version updates only root metadata, never dependency versions or URLs", () => {
  const originalManifest = structuredClone(manifest);
  const originalLock = structuredClone(lock);
  // Deliberately collide with an installed dependency version.
  const { manifest: changedManifest, lock: changedLock } = setPackageVersion(manifest, lock, "2.32.0");
  const result = setPackageVersion(changedManifest, changedLock, "2.33.0");
  assert.equal(result.manifest.version, "2.33.0");
  assert.equal(result.lock.version, "2.33.0");
  assert.equal(result.lock.packages[""].version, "2.33.0");
  assert.deepEqual(withoutRootVersions(result.manifest), withoutRootVersions(manifest));
  assert.deepEqual(withoutRootVersions(result.lock), withoutRootVersions(lock));
  assert.deepEqual(manifest, originalManifest);
  assert.deepEqual(lock, originalLock);
});

test("trauma app-version bump preserves the upstream dependency lock exactly", () => {
  // Upstream 7e08e41 dependency snapshot; update only for an intentional,
  // reviewed dependency change, not for an app release-version increment.
  const hash = createHash("sha256").update(JSON.stringify(withoutRootVersions(lock))).digest("hex");
  assert.equal(hash, "316e64dbac8d478aa256318413be88b0f0756717d855d2e6215e999b3a173891");
  assert.equal(lock.version, manifest.version);
  assert.equal(lock.packages[""].version, manifest.version);
});

test("version helper rejects invalid inputs without modifying data", () => {
  assert.throws(() => setPackageVersion(manifest, lock, "latest"), /semantic version/);
  assert.throws(() => setPackageVersion(manifest, {}, "2.33.0"), /root package/);
});
