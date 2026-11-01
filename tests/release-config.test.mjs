import assert from "node:assert/strict";
import test from "node:test";
import { appConfig } from "../lib/app-config.ts";

test("release configuration declares Claiborne EMS and neutral crew-facing status", () => {
  assert.equal(appConfig.protocolName, "Claiborne County EMS Protocols");
  assert.equal(appConfig.protocolVersion, "October 2026");
  assert.equal(appConfig.protocolLastUpdated, "October 2026");
  assert.equal(appConfig.appVersion, "2.34.0");
  assert.equal(appConfig.betaStatus, "Protocol reference");
  assert.match(appConfig.betaNotice, /Verify clinical decisions/i);
});
