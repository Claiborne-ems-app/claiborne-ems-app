import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { structuredProtocols } from "../data/structured-protocols.ts";

// Render the real provider components. This proves JSX scope filtering, not
// browser hydration, credential verification or physical-device offline use.
const require = createRequire(import.meta.url);
const ts = require("typescript");
for (const extension of [".tsx", ".ts"]) {
  require.extensions[extension] = (module, filename) => {
    const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    });
    module._compile(outputText, filename);
  };
}
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { ProtocolQuickFlow, CareLevelModules } = require("../components/protocols/ProtocolQuickFlow.tsx");
const { clinicalLevelsFor } = require("../components/provider/ProviderLevelSelector.tsx");
const find = (id) => {
  const protocol = structuredProtocols.find(item => item.id === id);
  assert.ok(protocol, `Missing ${id}`);
  return protocol;
};
const render = (protocol, level) => {
  const visibleLevels = [...clinicalLevelsFor(level), "Medical Control"];
  return {
    flow: renderToStaticMarkup(React.createElement(ProtocolQuickFlow, { nodes: protocol.flow, visibleLevels })),
    care: renderToStaticMarkup(React.createElement(CareLevelModules, { modules: protocol.careModules, visibleLevels })),
  };
};
const headings = (html, tag) => [...html.matchAll(new RegExp(`<${tag}[^>]*>(.*?)<\\/${tag}>`, "g"))].map(m => m[1]);

for (const level of ["EMT", "AEMT", "Paramedic"]) {
  test(`TB-06 ${level} rendered flow separates chest decompression and systemic TXA from general care`, () => {
    const protocol = find("tb-06");
    const { flow, care } = render(protocol, level);
    const titles = headings(flow, "h3");
    assert.ok(titles.includes("Treat Immediate Threats"));
    assert.match(flow, /urgently request ALS for suspected tension pneumothorax/);
    assert.equal(titles.includes("Chest Decompression"), level === "Paramedic");
    assert.equal(titles.includes("Trauma TXA Eligibility"), level === "Paramedic");
    assert.deepEqual(headings(care, "h4"), clinicalLevelsFor(level));
    if (level === "Paramedic") {
      assert.match(flow, /Paramedic-only chest decompression/);
      assert.match(care, /Perform all prior care plus advanced airway treatment, chest decompression/);
    } else {
      // Negative safeguards may mention decompression; the restricted action
      // node and Paramedic action panel must not be presented as lower-level care.
      assert.doesNotMatch(care, /Perform all prior care plus advanced airway treatment, chest decompression/);
      assert.doesNotMatch(flow, /Adult dose: 1–2 g IV\/IO/);
    }
  });

  test(`TB-03 ${level} rendered flow keeps high-dose hyperkalemia treatment Paramedic-only`, () => {
    const { flow, care } = render(find("tb-03"), level);
    assert.equal(headings(flow, "h3").includes("Paramedic Hyperkalemia Care"), level === "Paramedic");
    assert.deepEqual(headings(care, "h4"), clinicalLevelsFor(level));
    if (level === "Paramedic") {
      assert.match(flow, /Prepare ECG-directed calcium, sodium bicarbonate, and high-dose albuterol treatment/);
      assert.match(care, /protocol-directed treatment for ECG changes, dysrhythmia, or peri-arrest hyperkalemia/);
    } else {
      assert.doesNotMatch(flow, /Prepare ECG-directed calcium, sodium bicarbonate, and high-dose albuterol treatment/);
      assert.doesNotMatch(care, /Perform all prior care plus protocol-directed treatment for ECG changes/);
    }
    if (level === "AEMT") assert.match(flow, /Request Paramedic treatment for suspected hyperkalemia/);
  });

  test(`PM-04 ${level} rendered care preserves the pediatric pain pathway`, () => {
    const { flow, care } = render(find("pm-04"), level);
    assert.match(flow, /acetaminophen OR ibuprofen/);
    assert.deepEqual(headings(care, "h4"), clinicalLevelsFor(level));
    const fentanylNode = "Severe Pain / Oral Route Unsafe or Inadequate?";
    assert.equal(headings(flow, "h3").includes(fentanylNode), level === "Paramedic");
    if (level === "EMT" || level === "AEMT") {
      assert.doesNotMatch(flow + care, /1 mcg\/kg slow IV\/IO/);
    } else {
      assert.match(flow, /1 mcg\/kg slow IV\/IO once, maximum 50 mcg/);
      assert.match(care, /Before any second fentanyl dose, contact Medical Control/);
    }
    if (level !== "EMT") assert.match(care, /No additional AEMT standing-order analgesic is authorized by PM-04/);
    assert.doesNotMatch(flow + care, /(?:morphine|hydromorphone|ketorolac|ketamine):? \d/i);
  });
}

test("UP-11 actual rendered AEMT view defaults to unverified without Paramedic analgesic dose nodes", () => {
  const protocol = find("up-11");
  const { flow, care } = render(protocol, "AEMT");
  const titles = headings(flow, "h3");
  assert.ok(titles.includes("AEMT Authorization Check"));
  assert.ok(!titles.includes("Parenteral Nonopioid Appropriate?"));
  assert.ok(!titles.includes("Moderate–Severe Pain?"));
  assert.match(flow, /disabled by default.*authorization is unverified/);
  assert.match(flow, /Tennessee drug\/route authority.*training.*credentialing.*medical-director standing orders/);
  assert.match(care, /Do not administer IV\/IO acetaminophen or IV\/IM ketorolac from this unverified AEMT view/);
  assert.doesNotMatch(flow + care, /1 g IV\/IO|15–30 mg IV|60 mg IM|50 mcg slow IV\/IO/);
  const paramedic = render(protocol, "Paramedic");
  assert.ok(headings(paramedic.flow, "h3").includes("Parenteral Nonopioid Appropriate?"));
  assert.match(paramedic.care, /acetaminophen 1 g IV\/IO once/);
  assert.match(paramedic.care, /open-globe eye trauma.*Medical Control expressly authorizes/);
});
