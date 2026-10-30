import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Module, { createRequire } from "node:module";
import test from "node:test";

// Exercise the actual JSX and its scoped output without claiming browser or
// device coverage. The hook is local to this test runner process.
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
let provider = "EMT";
let referencedId = null;
Module._load = function (request, parent, ...rest) {
  if (request.endsWith("/provider/ProviderLevelSelector")) {
    return {
      __esModule: true,
      default: () => null,
      useProviderLevel: () => ({ providerLevel: provider, setProviderLevel() {} }),
    };
  }
  if (request === "react" && parent?.filename.endsWith("MedicationDirectory.tsx")) {
    return { ...React, useSyncExternalStore: () => referencedId };
  }
  return originalLoad.call(this, request, parent, ...rest);
};
const Directory = require("../components/medications/MedicationDirectory.tsx").default;
const detail = (html, id) => html.split(`id="${id}"`)[1]?.split("</details>")[0] ?? "";
const render = () => renderToStaticMarkup(React.createElement(Directory));

test("actual medication JSX renders EMT, unverified AEMT and Paramedic dose scopes correctly", () => {
  referencedId = null;
  for (const level of ["EMT", "AEMT", "Paramedic"]) {
    provider = level;
    const html = render();
    const acetaminophen = detail(html, "acetaminophen");
    const ketorolac = detail(html, "ketorolac");
    const txa = detail(html, "tranexamic-acid");
    if (level === "EMT") {
      assert.ok(!acetaminophen.includes("1 g IV/IO"));
      assert.ok(!html.includes('id="fentanyl"'));
      assert.equal(txa, "");
    }
    if (level === "AEMT") {
      assert.match(acetaminophen, /AEMT — not enabled/);
      assert.ok(!acetaminophen.includes("1 g IV/IO"));
      assert.match(ketorolac, /AEMT — not enabled/);
      assert.ok(!ketorolac.includes("15–30 mg IV once"));
      assert.ok(!ketorolac.includes("60 mg IM"));
      assert.ok(!txa.includes("Traumatic hemorrhage with clinical shock — IV/IO"));
      assert.match(txa, /Persistent atraumatic anterior epistaxis/);
    }
    if (level === "Paramedic") {
      assert.match(acetaminophen, /1 g IV\/IO/);
      assert.match(ketorolac, /15–30 mg IV once/);
      assert.match(txa, /1–2 g IV\/IO/);
      assert.match(detail(html, "ketamine"), /open globe/);
    }
  }
});

test("direct linked references preserve scope and remain navigable when provider view changes", () => {
  referencedId = "fentanyl";
  provider = "AEMT";
  let fentanyl = detail(render(), "fentanyl");
  assert.match(fentanyl, /No dose row is authorized/);
  assert.ok(!fentanyl.includes("maximum 50 mcg"));
  assert.match(fentanyl, /\/protocols\/pm\/pm-04/);
  provider = "Paramedic";
  fentanyl = detail(render(), "fentanyl");
  assert.match(fentanyl, /maximum 50 mcg/);
  assert.match(fentanyl, /Medical Control authorization is required before any second dose/);
  provider = "EMT";
  assert.match(detail(render(), "fentanyl"), /No dose row is authorized/);
  referencedId = null;
  assert.equal(detail(render(), "fentanyl"), "");
});
