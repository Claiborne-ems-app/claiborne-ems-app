import assert from "node:assert/strict";
import test from "node:test";
import { structuredProtocols } from "../data/structured-protocols.ts";

const protocol = (id) => {
  const result = structuredProtocols.find((item) => item.id === id);
  assert.ok(result, `${id} must exist`);
  return result;
};
const text = (id) => JSON.stringify(protocol(id)).replace(/[–—]/g, "-");
const provider = (id, level) => protocol(id).careModules.flatMap((module) =>
  module.levels.filter((item) => item.level === level).flatMap((item) => item.actions)
).join(" ").replace(/[–—]/g, "-");
const links = (id) => (protocol(id).actionLinks ?? []).map((item) => item.href);

test("TB03 retains selected crush policy and separates Paramedic hyperkalemia care", () => {
  const source = text("tb-03");
  assert.match(source, /adult initial 1 L/);
  assert.match(source, /Do not apply a prophylactic tourniquet solely/);
  assert.match(source, /Medical Control\/an established rescue plan/);
  assert.match(source, /no routine prophylactic calcium or bicarbonate/i);
  assert.match(source, /do not withhold otherwise indicated isotonic crystalloid solely because saline is unavailable/i);
  assert.match(source, /early Medical Control\/rescue-physician input/);
  assert.match(source, /Pre-release empiric medication use, fluid rate, and reassessment limits require/);
  assert.doesNotMatch(source, /avoid potassium-containing fluids/);
  assert.deepEqual(protocol("tb-03").flow.find((node) => node.title === "Paramedic Hyperkalemia Care")?.levels, ["Paramedic"]);
  assert.match(provider("tb-03", "AEMT"), /Do not administer calcium, sodium bicarbonate, or high-dose albuterol/);
});

test("TB05 routine and rescue ventilation retain the explicit 35-45 override", () => {
  const source = text("tb-05");
  assert.match(source, /initial and routine assisted ventilation.*35-45 mmHg/i);
  assert.match(source, /clear active or imminent herniation.*30-35 mmHg with capnography/);
  assert.match(source, /avoid overshooting below 30 mmHg/);
  assert.match(source, /no routine hyperventilation|do not routinely hyperventilate/);
  assert.doesNotMatch(source, /35-40/);
  assert.match(source, /aim for SpO₂ ≥94%/);
  assert.match(source, /urgently correct SpO₂ <90% or inadequate ventilation/);
});

test("TB05 AM05 and TB12 use the same adult TBI target including age70", () => {
  for (const id of ["tb-05", "am-05", "tb-12"]) {
    const source = text(id);
    assert.match(source, /adult SBP at least 110 mmHg,? including age 70/);
    assert.match(source, /do not use permissive hypotension/i);
    assert.match(source, /blood pressure frequently and after treatment/);
    assert.doesNotMatch(source, /age 15-49|age 50-69|>70/);
  }
  assert.match(text("tb-05"), /pediatric TBI numeric target table and age boundaries remain unpublished\/unapproved/);
  assert.match(text("tb-05"), /obtain Medical Control for age-specific TBI resuscitation guidance/);
  assert.doesNotMatch(text("tb-05"), /use age-specific targets for children|use age-specific pediatric targets/);
  assert.match(text("am-05"), /Outside the suspected-TBI branch/);
  assert.match(text("am-05"), /higher adult TBI SBP target of at least 110 mmHg takes precedence/);
  assert.match(text("am-05"), /suspected TBI and SBP below the 110 mmHg target/);
});

test("TB06 and TB12 trauma TXA is Paramedic-only with approved adult dose/rate pairings and separate pediatric safeguards", () => {
  for (const id of ["tb-06", "tb-12"]) {
    const source = text(id);
    const node = protocol(id).flow.find((item) => item.title === "Trauma TXA Eligibility");
    assert.deepEqual(node?.levels, ["Paramedic"]);
    assert.match(source, /clinical hemorrhagic shock within 3 hours/);
    assert.match(source, /after immediate lifesaving interventions/i);
    assert.match(source, /Adult dose: 1-2 g IV\/IO/);
    assert.match(source, /give 1 g over 10 minutes or 2 g over 20 minutes; do not exceed 100 mg\/min/);
    assert.match(source, /Verify the stocked concentration and dilution against the current medication-preparation instructions/);
    assert.match(source, /Do not administer an automatic repeat dose/);
    assert.match(source, /Record injury time and any TXA dose\/time/);
    assert.match(source, /notify the receiving team to prevent duplicate dosing/i);
    assert.match(source, /Pediatric trauma TXA: local dose reference 15 mg\/kg, Paramedic-only/);
    assert.match(source, /confirm pediatric eligibility, maximum dose, administration rate, and preparation with Medical Control within provider scope/);
    assert.match(source, /Do not extrapolate the adult dose or infusion rate to children/);
    assert.doesNotMatch(source, /approved Claiborne TXA pathway|Exact adult dose.*pending/);
    assert.doesNotMatch(provider(id, "AEMT"), /administer TXA|TXA 1-2 g/);
  }
});

test("adult hemorrhage strategy replaces TB12 unconditional1L and does not create a pediatric medical-shock default", () => {
  assert.doesNotMatch(text("tb-12"), /1 L/);
  for (const id of ["tb-06", "tb-12", "am-05"]) {
    assert.match(text(id), /warmed isotonic crystalloid/);
    assert.match(text(id), /when blood is unavailable/);
    assert.match(text(id), /avoid unnecessary large-volume crystalloid/i);
    assert.match(text(id), /authorized, supported transfusion program/);
  }
  for (const id of ["tb-06", "tb-12"]) {
    assert.ok(links(id).includes("/protocols/am/am-05"));
    assert.match(text(id), /pediatric traumatic hemorrhage, obtain Medical Control guidance/);
    assert.match(text(id), /do not apply medical or septic-shock fluid targets indiscriminately/i);
  }
  assert.match(text("am-05"), /500 mL IV\/IO aliquots for nonhemorrhagic shock; use 250 mL aliquots/);
});

test("chest decompression is not offered as an EMT or AEMT quick-flow action", () => {
  const tb06 = protocol("tb-06");
  assert.deepEqual(tb06.flow.find((node) => node.title === "Chest Decompression")?.levels, ["Paramedic"]);
  assert.doesNotMatch(text("tb-06"), /chest seal\/decompression/);
  for (const id of ["tb-01", "tb-06"]) {
    assert.match(provider(id, "EMT"), /spontaneously breathing patient.*approved vented seal/);
    assert.match(provider(id, "EMT"), /assess\/release an obstructing seal/);
    assert.match(provider(id, "EMT"), /Do not probe the wound/);
    assert.match(provider(id, "EMT"), /Positive-pressure ventilation requires/);
  }
  assert.match(provider("tb-10", "AEMT"), /Do not perform chest decompression/);
});

test("traumatic arrest uses age-appropriate fallback and adult-only epinephrine rule", () => {
  const source = text("tb-10");
  assert.match(source, /age-appropriate medical cardiac-arrest pathway/);
  assert.ok(links("tb-10").includes("/protocols/ac/ac-03"));
  assert.ok(links("tb-10").includes("/protocols/pc/pc-04"));
  assert.match(source, /For ADULT clearly traumatic arrest, do not routinely give epinephrine/);
  assert.match(source, /do not extrapolate the adult epinephrine instruction to children/);
  assert.match(source, /without delaying catastrophic hemorrhage control/);
  assert.match(source, /Do not use downtime alone as a withholding rule/);
  assert.match(source, /do not use an app-only downtime cutoff/);
  assert.match(source, /lightning strike, drowning, or hypothermic arrest/);
});

test("TB09 retains original numeric burn-fluid rates only when resuscitation is indicated", () => {
  const source = text("tb-09");
  assert.match(source, /Initial burn-fluid rates when resuscitation is indicated/);
  assert.match(source, /TBSA below 20%: 0\.25 mL\/kg × TBSA percentage per hour/);
  assert.match(source, /whole percentage, not a decimal fraction/);
  assert.match(source, /70 kg and 15% TBSA.*263 mL\/hr/);
  assert.match(source, /TBSA 20% or greater: age ≤5: 125 mL\/hr; age 6-14: 250 mL\/hr; age ≥15: 500 mL\/hr/);
  assert.match(source, /normal saline is an alternative, changing to LR when available/);
  assert.doesNotMatch(source, /start (?:lactated Ringer's|LR) 1 L/);
  assert.match(source, /Do not give an automatic 1 L bolus solely/);
  assert.match(source, /For shock, search for hemorrhage or another cause/);
});

test("chemical decontamination exceptions and burn consultation criteria are explicit", () => {
  const source = text("tb-02");
  assert.ok(links("tb-02").includes("/protocols/te/te-09"));
  assert.match(source, /Brush away dry particulate before irrigation/);
  assert.match(source, /known water-reactive contamination.*immediate HazMat\/Poison Help direction/i);
  assert.match(source, /white phosphorus is suspected: keep affected areas wet/);
  assert.match(source, /until particles are removed/);
  assert.match(source, /high-voltage \(≥1,000 V\)/);
  assert.match(source, /consider follow-up after low-voltage injury/);
  assert.match(source, /delayed symptoms or visual complaints/);
  assert.match(text("tb-09"), /potentially deep burns of any size/i);
  assert.match(text("tb-09"), /complicating comorbidity/);
});

test("destination choices state positive trauma destination and narrow stabilization exception", () => {
  for (const id of ["tb-04", "tb-05", "tb-06", "tb-10", "tb-12"]) {
    const source = text(id);
    assert.match(source, /highest-level appropriate trauma center within regional constraints/);
    assert.match(source, /favor pediatric-capable trauma care for children/);
    assert.match(source, /immediate critical need that cannot safely be managed during longer transport/);
    assert.match(source, /Do not delay ground movement solely while awaiting aircraft/);
  }
});

test("pediatric SMR adds risk assessment without restoring mechanism-alone immobilization", () => {
  const source = text("tb-08");
  assert.match(source, /Mechanism alone does not mandate SMR in an alert, reliable patient/);
  for (const term of ["torticollis", "high-risk motor-vehicle collision", "high-impact diving", "substantial torso injury"])
    assert.ok(source.includes(term));
  assert.match(source, /Age alone is not an indication/);
  assert.match(source, /padding to avoid excessive neck flexion/);
  assert.match(source, /decision aid and locally authorized clinician/);
  assert.match(source, /do not substitute an emergency-department imaging rule or treat these risk features as a stand-alone field-clearance rule/);
});

test("hemorrhage care includes tourniquet effectiveness and reassessment without new junctional devices", () => {
  for (const id of ["tb-04", "tb-06"]) {
    const source = text(id);
    assert.match(source, /Tighten until bleeding stops and the distal pulse is absent/);
    assert.match(source, /second tourniquet immediately proximal to the first/);
    assert.match(source, /leave visible, and reassess after movement and throughout transport/);
    assert.match(source, /maintain direct pressure per product instructions/);
    assert.match(source, /Do not periodically loosen or remove a tourniquet/);
  }
});

test("eye care differentiates ordinary chemical splash from known contaminated open globe", () => {
  const source = text("tb-11");
  assert.match(source, /ordinary chemical splash.*continue during transport through handoff/i);
  assert.match(source, /known or strongly suspected open globe with chemical contamination/i);
  assert.match(source, /do not irrigate into the globe or apply pressure/i);
  assert.match(source, /noncontact rigid shield/);
  assert.match(source, /hypothetical concern for rupture must not delay ordinary splash irrigation/);
  assert.match(source, /When those resources are unavailable, continue ordinary chemical-splash irrigation through handoff/);
  assert.match(source, /Do not patch either eye/);
  assert.match(source, /unless Medical Control expressly authorizes it/);
});

test("minor burn cooling and whole-palmar-hand estimate are explicit", () => {
  const source = text("tb-09");
  assert.match(source, /small thermal burn \(<10% TBSA\).*approximately 20 minutes/);
  assert.match(source, /without hypothermia or transport delay/);
  assert.match(source, /Do not cool when hypothermia risk is significant/i);
  assert.match(source, /palm plus fingers \(whole palmar hand surface\) is approximately 1% TBSA/);
  assert.match(source, /age-adjusted validated chart for larger pediatric burns/);
  assert.match(source, /Do not include superficial first-degree burns in TBSA/);
});

test("UP11 does not authorize unverified expanded AEMT analgesia and retains open-globe restriction", () => {
  const up11 = protocol("up-11");
  assert.deepEqual(up11.flow.find((node) => node.title === "Parenteral Nonopioid Appropriate?")?.levels, ["Paramedic"]);
  const aemt = provider("up-11", "AEMT");
  assert.match(aemt, /not enabled by default while individual authorization is unverified/);
  assert.match(aemt, /current Tennessee authority.*documented Tennessee-approved expanded analgesia training.*agency credentialing and competency verification.*medical-director standing orders/);
  assert.doesNotMatch(aemt, /acetaminophen 1 g|ketorolac 15-30 mg|60 mg IM/);
  for (const medication of up11.medications.filter((item) => ["Acetaminophen — IV/IO", "Ketorolac", "Fentanyl", "Morphine", "Hydromorphone", "Ketamine — analgesic dose"].includes(item.name)))
    assert.match(medication.dose, /^Paramedic:/);
  assert.match(text("up-11"), /suspected penetrating or open-globe eye trauma.*unless Medical Control expressly authorizes it/);
  assert.ok(links("up-11").includes("/protocols/tb/tb-11"));
  assert.ok(links("up-11").includes("/protocols/pm/pm-04"));
  assert.match(text("up-11"), /local ketorolac 60 mg IM dose is not dose-identical to the current Tennessee 10-30 mg IM reference/);
});

test("AM03 preserves initial doses but does not silently choose a calcium-gluconate repeat rule", () => {
  const am03 = protocol("am-03");
  const gluconate = am03.medications.find((item) => item.name === "Calcium gluconate 10%");
  assert.match(gluconate.dose, /1\.5–3 g IV.*maximum 3 g per episode/);
  assert.match(gluconate.notes.join(" "), /do not repeat calcium gluconate/);
  assert.match(gluconate.notes.join(" "), /specific Medical Control order confirming the cumulative dose/);
  assert.match(text("am-03"), /sodium bicarbonate up to 50 mEq/);
  assert.match(text("am-03"), /Nebulized beta-2 agonists are not recommended.*during cardiac arrest/);
  assert.match(provider("am-03", "AEMT"), /Do not administer calcium, sodium bicarbonate, or the high-dose hyperkalemia albuterol/);
});

test("TB01-09 remain Reviewed rather than becoming a clinical-release assertion", () => {
  for (let number = 1; number <= 9; number++) {
    const item = protocol(`tb-${String(number).padStart(2, "0")}`);
    assert.equal(item.reviewStatus, "Reviewed");
    assert.equal(item.revisionDate, "2026-10-30");
    assert.match(item.reviewFlags.join(" "), /clinical release/i);
  }
});


test("TB05 first-page quick flow includes initial/routine ventilation before the rescue exception", () => {
  const tb05 = protocol("tb-05");
  const routine = tb05.flow.find(n => n.title === "Prevent Secondary Injury");
  assert.match(routine.text, /initial and routine assisted ventilation.*35–45 mmHg/);
  assert.match(routine.text, /do not routinely hyperventilate/);
});
