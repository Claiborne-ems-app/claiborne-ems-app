import assert from "node:assert/strict";
import test from "node:test";
import { appConfig } from "../lib/app-config.ts";

test("release configuration declares the manual source and restrained beta status", () => {
  assert.equal(appConfig.protocolName, "Covenant Health Air Protocols");
  assert.equal(appConfig.protocolVersion, "July 2026");
  assert.equal(appConfig.protocolLastUpdated, "July 2026");
  assert.equal(appConfig.appVersion, "1.0.0");
  assert.equal(appConfig.betaStatus, "Beta application");
  assert.match(appConfig.betaNotice, /Verify clinical decisions/i);
});
