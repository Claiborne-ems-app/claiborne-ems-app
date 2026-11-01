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
function render(weight = "20", category = "Cardiac", cap = "Prepubertal child", maximum = "", cardioversionMaximum = maximum) {
  states = [weight, "Measured", cap, category, maximum, cardioversionMaximum];
  stateIndex = 0;
  return renderToStaticMarkup(React.createElement(Calculator));
}
function card(html, title) {
 return html.split("<article").find((block) => block.includes(`>${title}</h3>`))?.split("</article>")[0] ?? "";
}
test("calculator invalid weights yield no calculated dose", () => {
 provider="Paramedic";
 for(const w of ["0","-1","0.49","100.01","NaN","Infinity","abc"]) {
  const html=render(w);assert.match(html,/Enter a weight from 0.5 to 100 kg/);assert.doesNotMatch(html,/Calculated dose/);
 }
 assert.doesNotMatch(render(""),/Calculated dose/);
});
test("cardiac doses and child/adolescent caps match existing formulas",()=>{
 provider="Paramedic";
 assert.match(card(render(),"Epinephrine 0.1 mg/mL"),/>0.2 mg</);
 assert.match(card(render(),"Epinephrine 0.1 mg/mL"),/>2 mL of 0.1 mg\/mL</);
 assert.match(card(render(),"Atropine"),/>0.4 mg</);
 assert.match(card(render("1"),"Atropine"),/>0.1 mg</);
 assert.match(card(render("100"),"Atropine"),/>0.5 mg</);
 assert.match(card(render("100","Cardiac","Adolescent"),"Atropine"),/>1 mg</);
 assert.match(card(render("100"),"Adenosine"),/First: 6 mg/);
 assert.match(card(render("100"),"Adenosine"),/Second: 12 mg/);
});
test("IM epinephrine caps and concentration",()=>{
 provider="EMT";
 assert.match(card(render("100","Allergy / Respiratory"),"Epinephrine 1 mg/mL"),/>0.3 mg</);
 assert.match(card(render("100","Allergy / Respiratory","Adolescent"),"Epinephrine 1 mg/mL"),/>0.5 mg</);
 assert.match(card(render("20","Allergy / Respiratory"),"Epinephrine 1 mg/mL"),/>0.2 mL of 1 mg\/mL</);
});
test("glucagon weight threshold and D10 volume/mass",()=>{
 provider="AEMT";
 assert.match(card(render("19.9","Metabolic / Shock"),"Glucagon"),/>0.5 mg IM</);
 assert.match(card(render("20","Metabolic / Shock"),"Glucagon"),/>1 mg IM</);
 assert.match(card(render("20","Metabolic / Shock"),"Dextrose"),/>40 mL D10</);
 assert.match(card(render("20","Metabolic / Shock"),"Dextrose"),/>4 g dextrose</);
});
test("cardiac provider filtering",()=>{
 provider="EMT";assert.equal(card(render(),"Epinephrine 0.1 mg/mL"),"");
 provider="AEMT";assert.notEqual(card(render(),"Epinephrine 0.1 mg/mL"),"");
 for(const name of ["Atropine","Adenosine","Midazolam"])assert.equal(card(render(),name),"");
 provider="Paramedic";for(const name of ["Atropine","Adenosine","Midazolam"])assert.notEqual(card(render(),name),"");
});
test("submilligram epinephrine mass and volume stay consistent",()=>{
 provider="Paramedic";
 for(const w of ["0.5","0.6","0.9","1","1.5"]){
  const dose=Number((Number(w)*0.01).toFixed(6));const volume=Number((dose/0.1).toFixed(6));
  const iv=card(render(w),"Epinephrine 0.1 mg/mL");assert.ok(iv.includes(`>${dose} mg<`));assert.ok(iv.includes(`>${volume} mL of 0.1 mg/mL<`));
  const im=card(render(w,"Allergy / Respiratory"),"Epinephrine 1 mg/mL");assert.ok(im.includes(`>${dose} mg<`));assert.ok(im.includes(`>${dose} mL of 1 mg/mL<`));
 }
});
test("electrical energy requires explicit valid maximum and is bounded",()=>{
 provider="Paramedic";
 for(const m of ["","0","-1","NaN","Infinity","1e309"]){const html=render("100","Cardiac","Prepubertal child",m);assert.match(html,/No uncapped energy setting is recommended/);assert.doesNotMatch(html,/1st:|2nd:|1000 J/);}
 for(const m of ["1","200","360","1000"]){const html=render("100","Cardiac","Prepubertal child",m);assert.ok(html.includes(`1st: ${Math.min(200,Number(m))} J`));assert.ok(html.includes(`2nd: ${Math.min(400,Number(m))} J`));assert.ok(html.includes(`Subsequent: ${Math.min(400,Number(m))}–${Math.min(1000,Number(m))} J`));}
});
test("PM01 diphenhydramine remains Paramedic only",()=>{
 for(const p of ["EMT","AEMT"]){provider=p;assert.equal(card(render("20","Allergy / Respiratory"),"Diphenhydramine"),"");}
 provider="Paramedic";assert.match(card(render("20","Allergy / Respiratory"),"Diphenhydramine"),/>20 mg</);
});
test("cardioversion ceiling is confirmed separately",()=>{
 provider="Paramedic";const html=render("100","Cardiac","Prepubertal child","200","100");assert.ok(html.includes("2nd: 200 J"));assert.ok(html.includes("Repeat: 100 J"));assert.match(html,/Confirm each therapy separately/);
});
test("pulseless epi remains AEMT but bradycardia epi and magnesium are Paramedic",()=>{
 provider="AEMT";const a=render();assert.match(a,/Pulseless cardiac arrest/);assert.doesNotMatch(a,/Symptomatic bradycardia with a pulse|Torsades during VF/);
 provider="Paramedic";const p=render();assert.match(p,/Symptomatic bradycardia with a pulse/);assert.match(p,/Torsades during VF/);
 provider="EMT";assert.match(render("20","Allergy / Respiratory"),/Anaphylaxis under Pediatric Allergic Reaction/);
});
