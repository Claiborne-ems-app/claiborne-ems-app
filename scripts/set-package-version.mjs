import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

// Package versions can coincide with the app version. Never use a text-wide
// replacement: dependency ranges, resolved tarball URLs and integrity are fixed.
export function setPackageVersion(packageJson, packageLock, version) {
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(version)) {
    throw new Error("Expected an explicit semantic version.");
  }
  if (!packageLock.packages?.[""]) {
    throw new Error("Expected a package-lock with root package metadata.");
  }
  const manifest = structuredClone(packageJson);
  const lock = structuredClone(packageLock);
  manifest.version = version;
  lock.version = version;
  lock.packages[""].version = version;
  return { manifest, lock };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const version = process.argv[2];
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  const packageLock = JSON.parse(readFileSync("package-lock.json", "utf8"));
  const { manifest, lock } = setPackageVersion(packageJson, packageLock, version);
  writeFileSync("package.json", `${JSON.stringify(manifest, null, 2)}\n`);
  writeFileSync("package-lock.json", `${JSON.stringify(lock, null, 2)}\n`);
}
