import assert from "node:assert/strict";
import test from "node:test";
import {
  medicationReferences,
  medicationReferenceSource,
} from "../data/medication-reference.ts";

test("Claiborne formulary contains the 42 approved rows", () => {
  assert.equal(medicationReferences.length, 42);
  assert.equal(
    new Set(medicationReferences.map((medication) => medication.id)).size,
    42
  );
  assert.match(
    medicationReferenceSource.label,
    /Claiborne Covenant EMS(?: RX-R1)? Formulary/i
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
  assert.equal(byId["tranexamic-acid"].doses[0].adult, "1-2 g IV/IO or topical");
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
  assert.match(byId.albuterol.doses[0].pediatric, /under 20 kg 2\.5 mg nebulized/i);
  assert.match(byId.albuterol.doses[0].pediatric, /under 15 kg 10 mg nebulized/i);
  assert.match(byId.calcium.doses[0].adult, /Calcium chloride: 500–1,000 mg IV\/IO/);
  assert.match(byId.calcium.doses[0].adult, /Calcium gluconate: 1\.5–3 g IV/);
  assert.match(byId.calcium.doses[0].pediatric, /Calcium chloride: 20 mg\/kg IV\/IO/);
  assert.match(byId.calcium.doses[0].pediatric, /Calcium gluconate: 60–100 mg\/kg IV\/IO/);
  assert.match(byId.diltiazem.doses[0].adult, /0\.25 mg\/kg IV\/IO \(maximum 20 mg\)/);
  assert.match(byId.diltiazem.doses[0].adult, /infusion 5–10 mg\/hr/);
  assert.equal(byId.ketorolac.doses[0].adult, "15–30 mg IV or 60 mg IM");
  assert.equal(byId.ketorolac.doses[0].pediatric, "0.5 mg/kg IV once; maximum 15 mg");
  assert.match(byId.labetalol.doses[0].adult, /10–20 mg slow IV push/);
  assert.equal(byId.labetalol.doses[0].pediatric, "0.2–1 mg/kg once; maximum 40 mg");
  assert.match(byId.magnesium.doses[0].adult, /Hypomagnesemia: 1–2 g IV over 1 hr/);
  assert.match(byId.magnesium.doses[0].pediatric, /Asthma: 40–50 mg\/kg IV once over 15–30 min/);
  assert.equal(byId.succinylcholine.doses[0].adult, "1–2 mg/kg IV for RSI");
  assert.match(byId.vecuronium.doses[0].adult, /DAI: 80–100 mcg\/kg IV push once/);
  assert.match(byId.vecuronium.doses[0].pediatric, /maintenance: 50–100 mcg\/kg IV every 1 hr as needed/);

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
