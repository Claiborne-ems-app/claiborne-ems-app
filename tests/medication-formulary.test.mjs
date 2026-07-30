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
  assert.match(medicationReferenceSource.label, /Claiborne Covenant EMS Formulary/i);
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
  assert.equal(byId.dextrose.doses[0].adult, "25 g IV/IO");
  assert.equal(byId.rocuronium.doses[0].pediatric, "1 mg/kg");
  assert.equal(byId["tranexamic-acid"].doses[0].adult, "1-2 g IV/IO or topical");
});
