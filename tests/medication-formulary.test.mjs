import assert from "node:assert/strict";
import test from "node:test";
import {
  medicationReferences,
  medicationReferenceSource,
} from "../data/medication-reference.ts";

test("Claiborne directory contains the 42 approved formulary rows plus the approved push-dose epinephrine reference", () => {
  const formularyRows = medicationReferences.filter(
    (medication) => medication.isFormularyItem !== false
  );

  assert.equal(formularyRows.length, 42);
  assert.equal(medicationReferences.length, 43);
  assert.equal(
    new Set(medicationReferences.map((medication) => medication.id)).size,
    43
  );
  assert.match(
    medicationReferenceSource.label,
    /Claiborne County EMS(?: RX-R1)? Formulary/i
  );
});

test("every formulary medication has searchable doses and safety content", () => {
  for (const medication of medicationReferences) {
    assert.ok(medication.uses.length > 0, `${medication.name} has no indication`);
    assert.ok(medication.doses.length > 0, `${medication.name} has no dose row`);
    assert.ok(medication.cautions.length > 0, `${medication.name} has no caution`);
    for (const dose of medication.doses) {
      assert.ok(dose.adult.trim(), `${medication.name} has no adult dose`);
      assert.ok(dose.pediatric.trim(), `${medication.name} has no pediatric dose`);
    }
  }
});

test("high-use formulary doses match the submitted RX-R1 table", () => {
  const byId = Object.fromEntries(
    medicationReferences.map((medication) => [medication.id, medication])
  );

  assert.match(byId.atropine.doses[0].adult, /1 mg IV\/IO/);
  assert.equal(byId.aspirin.doses[0].adult, "324 mg chewed");
  assert.match(byId.dextrose.doses[0].adult, /D10: up to 250 mL IV\/IO/);
  assert.match(byId.dextrose.doses[0].pediatric, /2 mL\/kg IV\/IO \(0\.2 g\/kg\)/);
  assert.equal(byId.rocuronium.doses[0].adult, "1 mg/kg IV/IO when succinylcholine is contraindicated or a longer duration is needed");
  assert.equal(byId.rocuronium.doses[0].pediatric, "1 mg/kg IV/IO; pediatric DAI requires direct online Medical Director or Assistant Medical Director order");
  assert.match(byId["tranexamic-acid"].doses[0].adult, /^1–2 g IV\/IO/);
  assert.match(byId.naloxone.doses[1].adult, /0\.4–2 mg IV\/IO\/IM/);
  assert.match(byId.promethazine.doses[0].adult, /12\.5–25 mg deep IM/);
});

test("approved Claiborne medication updates retain source doses and route safeguards", () => {
  const byId = Object.fromEntries(
    medicationReferences.map((medication) => [medication.id, medication])
  );

  assert.equal(
    byId.adenosine.doses[0].adult,
    "First dose 6 mg rapid IV push with immediate flush; then 12 mg rapid IV push after 1–2 minutes if needed; may repeat the 12 mg dose once"
  );
  assert.equal(
    byId.adenosine.doses[0].pediatric,
    "First dose 0.1 mg/kg rapid IV/IO push (maximum 6 mg); then 0.2 mg/kg after 1–2 minutes if needed (maximum 12 mg)"
  );
  assert.match(byId.albuterol.doses[0].pediatric, /under 20 kg: 2\.5 mg nebulized/i);
  assert.doesNotMatch(byId.albuterol.doses[0].pediatric, /hyperkalemia|10 mg|15 mg/i);
  assert.match(byId.calcium.doses[0].adult, /500–1,000 mg IV\/IO/);
  assert.match(byId.calcium.doses[1].adult, /1\.5–3 g IV/);
  assert.match(byId.calcium.doses[0].pediatric, /20 mg\/kg IV\/IO/);
  assert.match(byId.calcium.doses[1].pediatric, /60–100 mg\/kg IV\/IO/);
  assert.match(byId.diltiazem.doses[0].adult, /0\.25 mg\/kg IV\/IO \(maximum 20 mg\)/);
  assert.match(byId.diltiazem.doses[0].adult, /infusion 5–10 mg\/hr/);
  assert.match(byId.ketorolac.doses[0].adult, /15–30 mg IV once/);
  assert.match(byId.ketorolac.doses[1].adult, /60 mg IM once/);
  assert.match(byId.ketorolac.doses[0].pediatric, /Not authorized.*PM-04/);
  assert.match(byId.labetalol.doses[0].adult, /10 mg slow IV over 2 min/);
  assert.match(byId.labetalol.doses[0].adult, /maximum total 20 mg/);
  assert.match(byId.labetalol.doses[0].pediatric, /Not authorized under Adult Medical AM-04/);
  assert.match(byId.norepinephrine.doses[0].adult, /0\.05–0\.5 mcg\/kg\/min/);
  assert.match(byId.magnesium.doses[0].adult, /Hypomagnesemia: 1–2 g IV over 1 hr/);
  assert.match(byId.magnesium.doses[0].pediatric, /Asthma: 40–50 mg\/kg IV once over 15–30 min/);
  assert.equal(byId.succinylcholine.doses[0].adult, "1–2 mg/kg IV for RSI");
  assert.match(byId.vecuronium.doses[0].adult, /DAI: 80–100 mcg\/kg IV push once/);
  assert.match(byId.vecuronium.doses[0].pediatric, /maintenance: 50–100 mcg\/kg IV every 1 hr as needed/);
  assert.equal(byId.methylprednisolone.doses[0].pediatric, "2 mg/kg IV; maximum 125 mg");

  assert.equal(byId["push-dose-epinephrine"].isFormularyItem, false);
  assert.equal(
    byId["push-dose-epinephrine"].doses[0].adult,
    "10 mcg slow IV/IO (1 mL of a labeled 10 mcg/mL syringe) every 3–5 min as needed; maximum two total boluses, then Medical Control before any additional dose"
  );
  assert.equal(
    byId["push-dose-epinephrine"].doses[0].pediatric,
    "0.5–1 mcg/kg slow IV/IO (0.05–0.1 mL/kg of a labeled 10 mcg/mL syringe) every 3–5 min as needed; maximum 10 mcg (1 mL) per dose and two total boluses, then Medical Control before any additional dose"
  );
  assert.match(byId["push-dose-epinephrine"].cautions[0], /10 mcg\/mL \(0\.01 mg\/mL\)/);
  assert.match(byId["push-dose-epinephrine"].cautions[1], /Do not administer undiluted epinephrine 1 mg\/mL/);

  assert.deepEqual(byId.epinephrine.doses, [
    {
      level: "EMT",
      indication: "Anaphylaxis — IM",
      adult: "0.5 mg of 1 mg/mL IM in the lateral thigh; 0.3 mg autoinjector acceptable; repeat every 5 min as needed",
      pediatric: "0.01 mg/kg of 1 mg/mL IM in the mid-outer thigh; maximum 0.3 mg prepubertal child or 0.5 mg adolescent; repeat every 5 min as needed",
    },
    {
      level: "Paramedic",
      indication: "Cardiac arrest — IV/IO",
      adult: "1 mg of 0.1 mg/mL IV/IO every 3–5 min",
      pediatric: "0.01 mg/kg of 0.1 mg/mL IV/IO; maximum single dose 1 mg; repeat every 3–5 min",
    },
    {
      level: "Paramedic",
      indication: "Persistent unstable bradycardia — infusion",
      adult: "2–10 mcg/min IV/IO infusion; titrate to clinical response",
      pediatric: "Use the pediatric cardiac bradycardia pathway",
    },
    {
      level: "Paramedic",
      indication: "Stridor or upper-airway edema — nebulized",
      adult: "1 mg of 1 mg/mL in 2 mL normal saline; may repeat once",
      pediatric: "0.5 mL/kg of 1 mg/mL; maximum 5 mL (5 mg), nebulized",
    },
  ]);
  assert.equal(byId.promethazine.doses[0].adult, "12.5–25 mg deep IM; never IV or IO");
  assert.equal(byId.promethazine.doses[0].pediatric, "Medical Control");
});

test("route and indication rows do not expose parenteral acetaminophen or hyperkalemia doses as EMT care", () => {
  const byId = Object.fromEntries(medicationReferences.map(m => [m.id, m]));
  const acetaminophenEmt = byId.acetaminophen.doses.filter(d => d.level === "EMT");
  assert.equal(acetaminophenEmt.length, 2);
  assert.ok(acetaminophenEmt.every(d => !/IV|IO/.test(d.adult)));
  const hyperkalemia = byId.albuterol.doses.find(d => /hyperkalemia/i.test(d.indication));
  assert.equal(hyperkalemia.level, "Paramedic");
  assert.match(hyperkalemia.adult, /10 mg/);
  assert.match(hyperkalemia.adult, /Do not.*during cardiac arrest/);
  assert.equal(hyperkalemia.protocolLink.href, "/protocols/am/am-03");
  const bicarbonate = byId["sodium-bicarbonate"].doses.find(d => /AM-03/.test(d.indication));
  assert.match(bicarbonate.adult, /maximum 50 mEq/);
  assert.equal(bicarbonate.level, "Paramedic");
  assert.equal(bicarbonate.protocolLink.href, "/protocols/am/am-03");
});

test("pediatric pain is governed by PM-04, with no generic morphine/hydromorphone/ketorolac/ketamine orders", () => {
  const byId = Object.fromEntries(medicationReferences.map(m => [m.id, m]));
  for (const id of ["morphine", "hydromorphone", "ketorolac"]) {
    for (const dose of byId[id].doses) {
      assert.match(dose.pediatric, /Not authorized.*PM-04/, id);
      assert.doesNotMatch(dose.pediatric, /\d+(?:\.\d+)? mg\/kg/, id);
    }
    assert.ok(byId[id].protocolLinks.some(l => l.href === "/protocols/pm/pm-04"));
  }
  const ketaminePain = byId.ketamine.doses.filter(d => /pain/i.test(d.indication));
  assert.ok(ketaminePain.every(d => /Not authorized.*PM-04/.test(d.pediatric)));
  assert.match(byId.fentanyl.doses[0].pediatric, /1 mcg\/kg.*maximum 50 mcg.*Medical Control.*second dose/);
  assert.match(byId.ketamine.cautions.join(" "), /open globe.*expressly authorized by Medical Control/i);
  assert.ok(byId.ketamine.protocolLinks.some(l => l.href === "/protocols/tb/tb-11"));
});

test("systemic trauma TXA and topical TXA retain separate doses, provider levels and governing orders", () => {
  const txa = medicationReferences.find(m => m.id === "tranexamic-acid");
  const trauma = txa.doses.find(d => /Traumatic hemorrhage/.test(d.indication));
  assert.equal(trauma.level, "Paramedic");
  assert.match(trauma.adult, /^1–2 g IV\/IO/);
  assert.match(trauma.pediatric, /^15 mg\/kg/);
  assert.match(trauma.adult, /1 g over 10 minutes OR 2 g over 20 minutes.*100 mg\/min/);
  assert.match(trauma.releaseNote, /pediatric 15 mg\/kg differs from the Tennessee 20 mg\/kg IV/);
  assert.match(trauma.releaseNote, /Pediatric age eligibility, infusion rate\/cap and IV\/IO route verification.*before release/);
  assert.match(trauma.adult, /Do not automatically repeat; further dosing requires a specific order/);
  const topical = txa.doses.filter(d => /topical only/.test(d.indication));
  assert.equal(topical.length, 2);
  assert.ok(topical.every(d => d.level === "AEMT"));
  assert.ok(topical.every(d => !/1–2 g/.test(d.adult)));
  assert.ok(txa.protocolLinks.some(l => l.href === "/protocols/tb/tb-06"));
  assert.ok(txa.protocolLinks.some(l => l.href === "/protocols/tb/tb-12"));
  assert.match(txa.cautions.join(" "), /no more than 3 hours/);
  assert.match(txa.cautions.join(" "), /receiving team.*duplicate/);
});
