import assert from "node:assert/strict";
import test from "node:test";
import {
  compareAppVersions,
  isNewerAppVersion,
} from "../lib/app-update.ts";

test("app versions compare by semantic version segments", () => {
  assert.equal(compareAppVersions("2.18.0", "2.17.0"), 1);
  assert.equal(compareAppVersions("2.17.0", "2.18.0"), -1);
  assert.equal(compareAppVersions("2.18", "2.18.0"), 0);
  assert.equal(compareAppVersions("2.18.1", "2.18.0"), 1);
});

test("update prompt appears only for a newer deployed version", () => {
  assert.equal(isNewerAppVersion("2.18.0", "2.17.0"), true);
  assert.equal(isNewerAppVersion("2.18.0", "2.18.0"), false);
  assert.equal(isNewerAppVersion("2.17.9", "2.18.0"), false);
});
