import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Module, { createRequire } from "node:module";
import test from "node:test";

// Render the actual calculator JSX with explicit local state; this does not
// claim browser interaction, offline-device testing, or clinical validation.
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
const originalLoad = Module._load;
let provider = "AEMT";
let stateIndex = 0;
let states = [];
Module._load = function (request, parent, ...rest) {
  if (request.endsWith("/provider/ProviderLevelSelector")) {
    return {
      __esModule: true,
      default: () => null,
      useProviderLevel: () => ({ providerLevel: provider, setProviderLevel() {} }),
    };
  }
  if (request === "react" && parent?.filename.endsWith("PediatricResuscitationCalculator.tsx")) {
    return { ...React, useState: () => [states[stateIndex++], () => {}] };
  }
  return originalLoad.call(this, request, parent, ...rest);
};
const Calculator = require("../components/tools/PediatricResuscitationCalculator.tsx").default;
function render(weight = "20") {
  states = [weight, "Measured", "Prepubertal child", "Metabolic / Shock"];
  stateIndex = 0;
  return renderToStaticMarkup(React.createElement(Calculator));
}

for (const level of ["AEMT", "Paramedic"]) {
  test(`${level} calculator confines 10–20 mL/kg to nonhemorrhagic shock and shows trauma/TBI safeguards`, () => {
    provider = level;
    const html = render();
    assert.match(html, /Nonhemorrhagic hypovolemic \/ distributive pediatric shock/);
    assert.match(html, /400 mL aliquot/);
    assert.match(html, /Nonhemorrhagic shock only/);
    assert.match(html, /Not a pediatric traumatic-hemorrhage fluid order/);
    assert.match(html, /obtain Medical Control direction for traumatic-hemorrhage resuscitation/);
    assert.match(html, /does not supply pediatric TBI blood-pressure targets/);
    assert.match(html, /\/protocols\/pm\/pm-03/);
    assert.doesNotMatch(html, /Non-cardiogenic pediatric shock/);
    // Existing cardiogenic range remains distinct and unchanged.
    assert.match(html, /100–200 mL aliquot/);
    assert.match(html, /5–10 mL\/kg IV\/IO cautiously/);
  });
}

test("EMT calculator does not expose AEMT fluid doses, and invalid weight does not calculate", () => {
  provider = "EMT";
  assert.doesNotMatch(render(), /400 mL aliquot|100–200 mL aliquot/);
  provider = "AEMT";
  const html = render("0");
  assert.match(html, /Enter a weight from 0.5 to 100 kg/);
  assert.doesNotMatch(html, /400 mL aliquot/);
  assert.match(html, /Not a pediatric traumatic-hemorrhage fluid order/);
});
