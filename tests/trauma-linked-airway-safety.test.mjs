import assert from "node:assert/strict";
import test from "node:test";
import { structuredAirwayProtocols } from "../data/structured-airway-protocols.ts";
import { structuredPediatricMedicalProtocols } from "../data/structured-pediatric-medical-protocols.ts";

const airway = (id) => structuredAirwayProtocols.find((item) => item.id === id);
const pediatric = (id) => structuredPediatricMedicalProtocols.find((item) => item.id === id);
const tbiAirways = ["ar-01", "ar-02", "ar-03", "ar-05", "ar-06", "ar-08", "ar-09", "ar-11"];

test("trauma-linked airway routes share explicit TBI oxygenation and ventilation targets", () => {
  for (const id of tbiAirways) {
    const protocol = airway(id);
    assert.ok(protocol, id);
    const branch = protocol.flow.find((node) => node.title === "Suspected TBI?");
    assert.match(branch?.text ?? "", /SpO₂ ≥94%/);
    assert.match(branch?.text ?? "", /EtCO₂ 35–45 mmHg/);
    assert.match(branch?.text ?? "", /active\/imminent herniation only.*30–35.*capnography.*avoid <30/);
    assert.deepEqual(branch.levels, ["EMT", "AEMT", "Paramedic"]);
    assert.match(protocol.treatmentSteps.join(" "), /urgently correct SpO₂ below 90%/);
    assert.match(protocol.treatmentSteps.join(" "), /Only for clear active or imminent cerebral herniation/);
    assert.match(protocol.treatmentSteps.join(" "), /For adults, target SBP at least 110 mmHg, including age 70/);
    assert.match(protocol.treatmentSteps.join(" "), /Pediatric TBI blood-pressure targets require age-specific direction from Medical Control/);
    assert.ok(protocol.actionLinks.some((link) => link.href === "/protocols/tb/tb-05"));
    assert.equal(protocol.revisionDate, "2026-10-30");
    assert.equal(protocol.reviewStatus, "Approved");
  }
});

test("TBI branch does not replace unrelated medical respiratory targets or medication scope", () => {
  assert.match(airway("ar-04").treatmentSteps.join(" "), /target 88–92%/);
  assert.match(airway("ar-08").careModules.flatMap((module) => module.levels).find((level) => level.level === "AEMT").actions.join(" "), /does not grant AEMT authority for post-intubation analgesics, sedatives, or paralytics/);
  assert.match(airway("ar-02").careModules.flatMap((module) => module.levels).find((level) => level.level === "EMT").actions.join(" "), /at least 92% \(at least 94% for suspected TBI\)/);
  assert.equal(airway("ar-04").flow.some((node) => node.title === "Suspected TBI?"), false);
  assert.equal(airway("ar-07").flow.some((node) => node.title === "Suspected TBI?"), false);
});

test("PM-03 separates traumatic hemorrhage from medical boluses without fabricating pediatric targets", () => {
  const protocol = pediatric("pm-03");
  const fluid = protocol.flow.find((node) => node.title === "Fluid Strategy");
  assert.match(protocol.flow.find((node) => node.title === "Airway + Oxygenation").text, /AEMT\/Paramedic: obtain rapid IV\/IO/);
  assert.match(protocol.treatmentSteps.join(" "), /Paramedic-only decompression/);
  assert.match(fluid.text, /Nonhemorrhagic hypovolemic\/distributive.*10–20 mL\/kg/);
  assert.match(fluid.text, /Suspected traumatic hemorrhage.*Medical Control.*do not apply/);
  assert.match(protocol.medications.find((med) => med.name.includes("hypovolemic")).name, /nonhemorrhagic/);
  assert.match(protocol.treatmentSteps.join(" "), /separately approved pediatric traumatic-hemorrhage order or online Medical Control/);
  assert.match(protocol.warnings.join(" "), /not substitute generic pediatric hypotension recognition thresholds/);
  assert.match(protocol.reviewFlags.join(" "), /numeric target table\/age boundaries remain unresolved/);
  assert.ok(protocol.actionLinks.some((link) => link.href === "/protocols/tb/tb-06"));
  assert.ok(protocol.actionLinks.some((link) => link.href === "/protocols/tb/tb-05"));
  assert.equal(protocol.reviewStatus, "Approved");
});

test("PM-04 remains the governing pediatric pain policy", () => {
  const protocol = pediatric("pm-04");
  assert.match(protocol.reviewFlags.join(" "), /does not authorize ketorolac, morphine, hydromorphone, or ketamine/);
  assert.match(protocol.medications.find((med) => med.name === "Fentanyl").dose, /Paramedic: 1 mcg\/kg slow IV\/IO once; maximum 50 mcg/);
  assert.match(protocol.warnings.join(" "), /second fentanyl dose without Medical Control/);
  assert.equal(protocol.revisionDate, "2026-10-08");
});
