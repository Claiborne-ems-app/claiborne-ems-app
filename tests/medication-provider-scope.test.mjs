import assert from "node:assert/strict";
import test from "node:test";
import { medicationReferences } from "../data/medication-reference.ts";
import { medicationDoseState, AEMT_ANALGESIA_AUTHORIZATION_NOTICE } from "../lib/medications/provider-scope.ts";

const byId = Object.fromEntries(medicationReferences.map(m => [m.id, m]));

test("expanded AEMT analgesia defaults to unverified, not actionable medication doses", () => {
  const conditional = [byId.acetaminophen, byId.ketorolac].flatMap(m => m.doses.filter(d => d.conditionalAemt));
  assert.equal(conditional.length, 3);
  for (const dose of conditional) {
    assert.equal(medicationDoseState(dose, "EMT"), "out-of-scope");
    assert.equal(medicationDoseState(dose, "AEMT"), "authorization-pending");
    assert.equal(medicationDoseState(dose, "Paramedic"), "available");
  }
  assert.match(AEMT_ANALGESIA_AUTHORIZATION_NOTICE, /not enabled.*unverified/);
  assert.match(AEMT_ANALGESIA_AUTHORIZATION_NOTICE, /Tennessee.*training.*credentialing.*medical-director/);
});

test("provider scope never widens because a medication is directly linked", () => {
  const restricted = ["fentanyl", "morphine", "hydromorphone", "ketamine"].flatMap(id => byId[id].doses);
  for (const dose of restricted) {
    assert.equal(medicationDoseState(dose, "EMT"), "out-of-scope");
    assert.equal(medicationDoseState(dose, "AEMT"), "out-of-scope");
    assert.equal(medicationDoseState(dose, "Paramedic"), "available");
  }
  const topical = byId["tranexamic-acid"].doses.filter(d => /topical only/.test(d.indication));
  assert.ok(topical.every(d => medicationDoseState(d, "AEMT") === "available"));
  const systemic = byId["tranexamic-acid"].doses.find(d => /Traumatic/.test(d.indication));
  assert.equal(medicationDoseState(systemic, "AEMT"), "out-of-scope");
});
