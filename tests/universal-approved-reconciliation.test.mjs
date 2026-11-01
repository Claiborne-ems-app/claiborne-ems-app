import assert from 'node:assert/strict';
import test from 'node:test';
import { structuredProtocols, getPrimaryProtocolHref } from '../data/structured-protocols.ts';
import { medicationReferences } from '../data/medication-reference.ts';

const protocol = (id) => {
  const value = structuredProtocols.find((item) => item.id === id);
  assert.ok(value, `Missing protocol ${id}`);
  return value;
};
const medication = (id) => {
  const value = medicationReferences.find((item) => item.id === id);
  assert.ok(value, `Missing medication ${id}`);
  return value;
};
const active = (id) => {
  const { reviewFlags, ...content } = protocol(id);
  void reviewFlags;
  return JSON.stringify(content);
};
const actions = (id, level) => protocol(id).careModules.flatMap((module) => module.levels)
  .filter((entry) => entry.level === level).flatMap((entry) => entry.actions).join(' ');

test('norepinephrine ceilings remain indication-specific, not a global dose replacement', () => {
  const rows = medication('norepinephrine').doses;
  assert.match(rows.find((row) => row.indication.includes('UP-15')).adult, /maximum 2 mcg\/kg\/min/);
  assert.match(rows.find((row) => row.indication.includes('AM-05')).adult, /maximum 0\.5 mcg\/kg\/min/);
  assert.match(active('up-15'), /maximum 2 mcg\/kg\/min/);
  assert.match(active('am-05'), /0\.05–0\.5 mcg\/kg\/min/);
  assert.match(rows.find((row) => row.indication.includes('UP-15')).pediatric, /Medical Control.*ceiling/);
});

test('adult ketorolac is limited to one 15 mg IV or 30 mg IM dose and remains gated for AEMT', () => {
  const rows = medication('ketorolac').doses;
  assert.ok(rows.every((row) => row.level === 'Paramedic' && row.conditionalAemt === true));
  assert.ok(rows.some((row) => /maximum 15 mg IV/.test(row.adult)));
  assert.ok(rows.some((row) => /maximum 30 mg IM/.test(row.adult)));
  assert.ok(rows.every((row) => /No EMS repeat/.test(row.adult)));
  assert.match(protocol('up-11').warnings.join(' '), /65 years.*less than 50 kg.*Do not administer 60 mg IM/);
  assert.match(protocol('up-11').medications.find((row) => row.name === 'Ketorolac').dose, /15 mg IV once or 30 mg IM once/);
});

test('pediatric intranasal naloxone is product-specific and never inherits the parenteral numeric regimen', () => {
  const row = protocol('up-04').medications.find((item) => item.name === 'Naloxone — intranasal');
  assert.match(row.dose, /Adult: 2 mg IN/);
  assert.match(row.dose, /Pediatric: product\/device-specific Medical Control order required/);
  assert.match(row.dose, /no default numeric IN regimen/);
  assert.doesNotMatch(row.dose, /0\.01|0\.1 mg\/kg/);
  assert.match(row.notes.join(' '), /nostril division.*dead-space/);
  assert.match(active('ao-02'), /Naloxone is not recommended.*provide ventilatory support/);
});

test('Arrow EZ-IO previous-attempt exclusion and AEMT limits are retained in clinical fields', () => {
  assert.match(protocol('up-06').contraindications.join(' '), /Arrow EZ-IO.*48 hours/);
  assert.match(actions('up-06', 'AEMT'), /upper-extremity.*do not cannulate a leg or neck.*two in one arm/);
  assert.match(actions('up-06', 'AEMT'), /three total attempts across the entire crew/);
  assert.match(active('up-06'), /preservative-free, epinephrine-free/);
});

test('UP-19 is a retirement notice with no independent medication or fluid orders', () => {
  assert.equal(getPrimaryProtocolHref('up', 'up-19'), '/protocols/up/up-18');
  assert.deepEqual(protocol('up-19').medications, []);
  assert.match(protocol('up-19').warnings.join(' '), /No independent medication or fluid standing orders/);
});

test('final diphenhydramine and magnesium scopes are Paramedic without removing AEMT arrest epinephrine', () => {
  for (const id of ['diphenhydramine', 'magnesium']) {
    assert.ok(medication(id).doses.every((row) => row.level === 'Paramedic'), id);
  }
  assert.doesNotMatch(actions('am-01', 'AEMT'), /give diphenhydramine/);
  assert.match(actions('am-01', 'Paramedic'), /diphenhydramine 25–50 mg/);
  assert.doesNotMatch(actions('pc-07', 'AEMT'), /magnesium/);
  assert.match(actions('pc-07', 'Paramedic'), /magnesium/);
  assert.match(actions('pc-07', 'AEMT'), /epinephrine/);
});

test('orphan benzodiazepine references do not establish active standing orders', () => {
  for (const id of ['diazepam', 'lorazepam']) {
    const med = medication(id);
    assert.ok(med.doses.every((row) => /REFERENCE ONLY/.test(row.indication)));
    assert.ok(med.doses.every((row) => /No active adult standing-order regimen/.test(row.adult)));
    assert.ok(med.doses.every((row) => /NOT an administration order/.test(row.pediatric)));
    assert.match(med.cautions.join(' '), /does not establish an administration order/);
  }
});

test('clinical safeguards survive hiding all internal review notes', () => {
  const checks = {
    'ac-14': /patient stability, transport time, LVAD-center capability, and coordinator or Medical Control direction/,
    'ac-01': /cause-directed fluid resuscitation.*do not require a routine fixed-volume saline bolus/,
    'ao-02': /does not specify a neonatal D10 dose.*After immediate newborn stabilization, use PM-02/,
    'ao-03': /Oxytocin is not on the Claiborne formulary and is not authorized/,
    'ar-08': /does not authorize routine repeat paralysis/,
    'pm-04': /does not authorize ketorolac, morphine, hydromorphone, or ketamine as standing-order pediatric analgesics/,
    'up-11': /65 years.*less than 50 kg.*Do not administer 60 mg IM/,
    'up-04': /nostril division and device dead-space handling/,
  };
  for (const [id, expression] of Object.entries(checks)) assert.match(active(id), expression, id);
  for (const value of structuredProtocols) {
    const { reviewFlags, ...content } = value;
    void reviewFlags;
    assert.doesNotMatch(JSON.stringify(content), /native protocol|canonical rendering|review build|release safeguards|retained review notes/i, value.id);
  }
});
