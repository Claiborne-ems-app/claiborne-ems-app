import assert from "node:assert/strict";
import test from "node:test";
import { appConfig } from "../lib/app-config.ts";

test("release configuration declares Claiborne EMS and restrained beta status", () => {
  assert.equal(appConfig.protocolName, "Claiborne County EMS Protocols");
  assert.equal(appConfig.protocolVersion, "July 2026");
  assert.equal(appConfig.protocolLastUpdated, "July 2026");
  assert.equal(appConfig.appVersion, "2.12.0");
  assert.equal(appConfig.betaStatus, "Beta application");
  assert.match(appConfig.betaNotice, /Verify clinical decisions/i);
});
