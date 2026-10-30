export type MedicationProviderLevel = "EMT" | "AEMT" | "Paramedic";

export interface MedicationDoseReference {
  level: MedicationProviderLevel;
  indication: string;
  adult: string;
  pediatric: string;
  /** Conditional AEMT access remains disabled until separately verified by the agency. */
  conditionalAemt?: boolean;
  /** Governing order for this indication/route/age-specific row. */
  protocolLink?: { label: string; href: string };
  releaseNote?: string;
}

export interface MedicationReference {
  id: string;
  name: string;
  tradeNames: string[];
  uses: string[];
  doses: MedicationDoseReference[];
  cautions: string[];
  protocolLinks: { label: string; href: string }[];
  /** True unless this is a protocol-specific preparation rather than a stocked formulary row. */
  isFormularyItem?: boolean;
}

export const medicationReferenceSource = {
  label:
    "Claiborne County EMS RX-R1 Formulary — 42 verified stocked medications plus protocol-specific references",
  href: "https://www.tn.gov/content/dam/tn/health/events/TN%20State%20Guidelines%202024-2025%2009.11.2025.pdf",
  reviewed: "October 30, 2026 (scoped trauma reconciliation; unresolved state/local differences remain)",
};

type SingleDoseMedication = Omit<MedicationReference, "doses"> & {
  level: MedicationProviderLevel;
  indication: string;
  adult: string;
  pediatric: string;
};

function medication(input: SingleDoseMedication): MedicationReference {
  const { level, indication, adult, pediatric, ...reference } = input;
  return {
    ...reference,
    doses: [{ level, indication, adult, pediatric }],
  };
}

export const medicationReferences: MedicationReference[] = [
  {
    id: "acetaminophen",
    name: "Acetaminophen",
    tradeNames: ["Tylenol", "Ofirmev"],
    uses: ["Pain", "Fever"],
    doses: [
      {
        "level": "EMT",
        "indication": "Pain — oral",
        "adult": "UP-11, age 16 and older: 650–1,000 mg PO once.",
        "pediatric": "PM-04, age 2 to <16: 15 mg/kg PO once; maximum 650 mg. Under age 2: Medical Control.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      },
      {
        "level": "EMT",
        "indication": "Uncomfortable fever — oral",
        "adult": "650–1,000 mg PO.",
        "pediatric": "Older than 3 months: 15 mg/kg PO; maximum 650 mg. Use UP-10 for assessment and exclusions.",
        "protocolLink": {
          "label": "UP-10 Fever",
          "href": "/protocols/up/up-10"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Adult pain — IV/IO; AEMT authorization pending",
        "adult": "Age 16 and older: 1 g IV/IO once. Do not routinely combine with another acetaminophen dose.",
        "pediatric": "IV/IO acetaminophen is not a standing-order pediatric analgesic under PM-04; use its oral/nonpharmacologic options.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        },
        "conditionalAemt": true
      }
    ],
    cautions: [
      "Check severe liver disease, allergy, suspected overdose, prior dose/time, and maximum daily exposure. Do not repeat when previous dose/time is uncertain.",
      "Do not give IV/IO acetaminophen solely for uncomplicated fever. Do not establish IO solely for pain in a stable patient.",
      "AEMT expanded analgesia is not enabled while authorization is unverified. Current Tennessee authority for the exact drug/route, documented applicable education, agency competency/credentialing, and medical-director orders for the drug, route, indication, and age group are all required; course completion or selecting AEMT view alone is not authorization."
    ],
    protocolLinks: [
      { label: "Pain Control - Adult", href: "/protocols/up/up-11" },
      { label: "Pediatric Pain Control", href: "/protocols/pm/pm-04" },
      { label: "Fever", href: "/protocols/up/up-10" },
    ],
  },
  medication({
    id: "adenosine",
    name: "Adenosine",
    tradeNames: ["Adenocard"],
    uses: ["Narrow-complex tachycardia", "Wide-complex tachycardia"],
    level: "Paramedic",
    indication: "Narrow-tach; wide-tach",
    adult: "First dose 6 mg rapid IV push with immediate flush; then 12 mg rapid IV push after 1–2 minutes if needed; may repeat the 12 mg dose once",
    pediatric: "First dose 0.1 mg/kg rapid IV/IO push (maximum 6 mg); then 0.2 mg/kg after 1–2 minutes if needed (maximum 12 mg)",
    cautions: [
      "Use only for a stable regular rhythm under the applicable tachycardia protocol.",
      "Give as a rapid push through the most proximal practical access with an immediate flush and continuous rhythm recording.",
      "Do not use for an irregular rhythm, sinus tachycardia, or active severe bronchospasm.",
      "Contact Medical Control before reduced-dose administration in a heart-transplant patient or through central venous access.",
    ],
    protocolLinks: [
      { label: "Adult Narrow-Complex Tachycardia", href: "/protocols/ac/ac-06" },
      { label: "Pediatric Narrow-Complex Tachycardia", href: "/protocols/pc/pc-05" },
    ],
  }),
  {
    id: "albuterol",
    name: "Albuterol",
    tradeNames: ["Proventil", "Ventolin"],
    uses: ["Asthma/COPD", "Allergic reaction", "Hyperkalemia"],
    doses: [
      {
        "level": "EMT",
        "indication": "Bronchospasm — inhaled",
        "adult": "Nebulized 2.5–5 mg; MDI 2 puffs inhaled.",
        "pediatric": "Under 20 kg: 2.5 mg nebulized; 20 kg or greater: 5 mg nebulized.",
        "protocolLink": {
          "label": "AR-04 Adult COPD / Asthma",
          "href": "/protocols/ar/ar-04"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AM-03 suspected hyperkalemia with a pulse — nebulized",
        "adult": "10 mg by nebulizer. Do not administer nebulized albuterol during cardiac arrest.",
        "pediatric": "The prior pediatric formulary reference is under 15 kg: 10 mg; 15 kg or greater: 15 mg. This is not a PM-04 analgesic or a pediatric standing order under adult AM-03; obtain the separate pediatric order/Medical Control.",
        "protocolLink": {
          "label": "AM-03 Hyperkalemia / Renal Failure",
          "href": "/protocols/am/am-03"
        },
        "releaseNote": "No automatic repeat interval is authorized here. Confirm pediatric eligibility and repeat/cumulative limits in a separately approved order before use; the former generic every-2-hour instruction is not carried into AM-03."
      }
    ],
    cautions: [
      "Reassess heart rate, work of breathing, air movement, and response.",
      "For anaphylaxis, albuterol is adjunctive and does not replace IM epinephrine.",
      "High-dose hyperkalemia treatment is Paramedic-only, distinct from EMT bronchospasm care. Do not give nebulized albuterol during cardiac arrest."
    ],
    protocolLinks: [
      {
        "label": "Adult COPD / Asthma",
        "href": "/protocols/ar/ar-04"
      },
      {
        "label": "Pediatric Respiratory Distress",
        "href": "/protocols/ar/ar-07"
      },
      {
        "label": "AM-03 Hyperkalemia / Renal Failure",
        "href": "/protocols/am/am-03"
      }
    ],
  },
  medication({
    id: "amiodarone",
    name: "Amiodarone",
    tradeNames: ["Cordarone"],
    uses: [
      "VF/pulseless VT",
      "Narrow-tachycardia with CHF",
      "Wide-complex tachycardia",
      "Torsades with short QT",
    ],
    level: "Paramedic",
    indication: "Pulseless or perfusing dysrhythmia",
    adult:
      "Pulseless: 300 mg then 150 mg IV/IO; pulsed: 150 mg IV/IO; infusion: 1 mg/min",
    pediatric: "5 mg/kg",
    cautions: [
      "Administration rate and repeat dosing depend on whether a pulse is present.",
    ],
    protocolLinks: [
      { label: "Adult VF / Pulseless VT", href: "/protocols/ac/ac-09" },
      { label: "Pediatric VF / Pulseless VT", href: "/protocols/pc/pc-07" },
    ],
  }),
  medication({
    id: "aspirin",
    name: "Aspirin",
    tradeNames: ["ASA"],
    uses: ["Chest pain", "Suspected acute coronary syndrome"],
    level: "EMT",
    indication: "Chest pain / suspected ACS",
    adult: "324 mg chewed",
    pediatric: "N/A",
    cautions: [
      "Confirm allergy, active bleeding, and whether an adequate dose was already taken.",
    ],
    protocolLinks: [
      { label: "Acute Coronary Syndrome / STEMI", href: "/protocols/ac/ac-04" },
    ],
  }),
  medication({
    id: "atropine",
    name: "Atropine",
    tradeNames: ["Atropine sulfate"],
    uses: ["Bradycardia", "Organophosphate exposure"],
    level: "Paramedic",
    indication: "Bradycardia; organophosphate exposure",
    adult: "Bradycardia: 1 mg IV/IO; organophosphate: 1-2 mg IV/IO",
    pediatric: "0.02 mg/kg",
    cautions: [
      "Repeat dosing and clinical endpoints differ substantially by indication.",
      "For organophosphate exposure, follow the nerve-agent/toxicology protocol.",
    ],
    protocolLinks: [
      { label: "Bradycardia With a Pulse", href: "/protocols/ac/ac-02" },
      { label: "WMD / Nerve Agent", href: "/protocols/te/te-08" },
    ],
  }),
  {
    id: "calcium",
    name: "Calcium Chloride / Gluconate",
    tradeNames: ["Calcium chloride", "Calcium gluconate"],
    uses: ["Hyperkalemia/arrhythmia", "Calcium-channel blocker toxicity", "Calcium replacement"],
    doses: [
      {
        "level": "Paramedic",
        "indication": "Hyperkalemia/arrhythmia — calcium chloride IV/IO",
        "adult": "500–1,000 mg IV/IO. Use AM-03 indication and monitoring requirements.",
        "pediatric": "20 mg/kg IV/IO reference; not a pediatric standing order under adult AM-03. Pediatric indication and limits require the separate order/Medical Control.",
        "protocolLink": {
          "label": "AM-03 Hyperkalemia / Renal Failure",
          "href": "/protocols/am/am-03"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Hyperkalemia/arrhythmia — calcium gluconate IV",
        "adult": "1.5–3 g IV initial; preferred for peripheral IV administration.",
        "pediatric": "60–100 mg/kg IV/IO reference; pediatric eligibility and limits require the separate order/Medical Control.",
        "protocolLink": {
          "label": "AM-03 Hyperkalemia / Renal Failure",
          "href": "/protocols/am/am-03"
        },
        "releaseNote": "Release decision pending: AM-03 describes a 3-g maximum per episode and also a repeat dose. The repeat dose and cumulative maximum must be reconciled; do not infer permission to exceed 3 g or repeat without clarification."
      },
      {
        "level": "Paramedic",
        "indication": "Calcium-channel blocker toxicity / other calcium indications",
        "adult": "Use the condition-specific order; do not transfer the hyperkalemia regimen to another indication.",
        "pediatric": "Use the separately approved pediatric indication-specific order or Medical Control.",
        "protocolLink": {
          "label": "TE-07 Overdose / Toxic Ingestion",
          "href": "/protocols/te/te-07"
        }
      }
    ],
    cautions: [
      "Verify calcium salt, concentration, route, indication, and cumulative dose. Calcium chloride and gluconate are alternatives; do not give both as the initial calcium treatment.",
      "Calcium gluconate is preferred through a peripheral IV. Monitor continuously for extravasation; calcium chloride can cause severe tissue injury.",
      "Do not mix calcium and bicarbonate or infuse simultaneously through the same tubing; flush thoroughly between medications."
    ],
    protocolLinks: [
      {
        "label": "AM-03 Hyperkalemia / Renal Failure",
        "href": "/protocols/am/am-03"
      },
      {
        "label": "Overdose / Toxic Ingestion",
        "href": "/protocols/te/te-07"
      }
    ],
  },
  medication({
    id: "dexamethasone",
    name: "Dexamethasone",
    tradeNames: ["Decadron"],
    uses: ["Allergic reaction", "Asthma/COPD", "Croup/stridor"],
    level: "Paramedic",
    indication: "Allergic reaction; asthma/COPD; croup/stridor",
    adult: "10 mg IV/IO or IM",
    pediatric: "0.6 mg/kg",
    cautions: [
      "Steroid effect is delayed and does not replace epinephrine, bronchodilator, airway, or ventilation care.",
    ],
    protocolLinks: [
      { label: "Adult COPD / Asthma", href: "/protocols/ar/ar-04" },
      { label: "Pediatric Respiratory Distress", href: "/protocols/ar/ar-07" },
    ],
  }),
  medication({
    id: "dexmedetomidine",
    name: "Dexmedetomidine",
    tradeNames: ["Precedex"],
    uses: ["Advanced sedation", "Pain"],
    level: "Paramedic",
    indication: "Advanced sedation / pain",
    adult: "0.2-1.5 mcg/kg/hr",
    pediatric: "Same as adult formulary dose",
    cautions: [
      "Continuous airway, respiratory, cardiac, and blood-pressure monitoring is required.",
      "Watch for bradycardia and hypotension.",
    ],
    protocolLinks: [
      { label: "Post-Intubation / BIAD Management", href: "/protocols/ar/ar-08" },
    ],
  }),
  medication({
    id: "dextrose",
    name: "Dextrose",
    tradeNames: ["D10W", "D25W", "D50W"],
    uses: ["Hypoglycemia"],
    level: "AEMT",
    indication: "Hypoglycemia",
    adult: "D10: up to 250 mL IV/IO, titrated to improving mental status and glucose at least 70 mg/dL; maximum 25 g",
    pediatric: "D10: 2 mL/kg IV/IO (0.2 g/kg); recheck glucose and neurologic status after 5 min; may repeat once",
    cautions: [
      "Pediatric D10 dosing is weight-based, not age-based.",
      "Verify concentration, patient weight, vascular patency, and maximum volume before administration.",
      "Recheck glucose and clinical response.",
    ],
    protocolLinks: [
      { label: "Pediatric Diabetic Emergency", href: "/protocols/pm/pm-02" },
      { label: "Altered Mental Status", href: "/protocols/up/up-04" },
    ],
  }),
  medication({
    id: "diazepam",
    name: "Diazepam",
    tradeNames: ["Valium", "Diastat"],
    uses: ["Chemical restraint", "Seizures"],
    level: "Paramedic",
    indication: "Chemical restraint; seizures",
    adult: "See protocol doses",
    pediatric: "0.2 mg/kg IV/IO; 0.5 mg/kg IM/PR",
    cautions: [
      "Route, repeat interval, and maximum dose are protocol-specific.",
      "Monitor ventilation, oxygenation, blood pressure, and sedation depth.",
    ],
    protocolLinks: [],
  }),
  medication({
    id: "diltiazem",
    name: "Diltiazem",
    tradeNames: ["Cardizem"],
    uses: ["Narrow-complex tachycardia"],
    level: "Paramedic",
    indication: "Narrow-tachycardia",
    adult: "0.25 mg/kg IV/IO (maximum 20 mg); if needed, 0.35 mg/kg IV/IO after 15 minutes (maximum 20 mg); infusion 5–10 mg/hr",
    pediatric: "Medical Control",
    cautions: [
      "Avoid in hypotension, pre-excited atrial fibrillation, or an undifferentiated wide-complex rhythm.",
      "Use only under the applicable rhythm protocol.",
    ],
    protocolLinks: [
      { label: "Adult Narrow-Complex Tachycardia", href: "/protocols/ac/ac-06" },
    ],
  }),
  medication({
    id: "diphenhydramine",
    name: "Diphenhydramine",
    tradeNames: ["Benadryl"],
    uses: ["Abdominal pain/vomiting", "Allergic reaction"],
    level: "Paramedic",
    indication: "Abdominal pain/vomiting; allergic reaction",
    adult: "25-50 mg IV/IO or IM",
    pediatric: "1 mg/kg",
    cautions: [
      "May cause sedation, anticholinergic effects, and hypotension.",
    ],
    protocolLinks: [],
  }),
  medication({
    id: "dopamine",
    name: "Dopamine",
    tradeNames: ["Intropin"],
    uses: ["Bradycardia", "Medical shock"],
    level: "Paramedic",
    indication: "Bradycardia; medical shock",
    adult: "2-20 mcg/kg/min infusion",
    pediatric: "Same as adult formulary dose",
    cautions: [
      "Use an infusion pump, titrate to the protocol endpoint, and monitor for dysrhythmia or extravasation.",
    ],
    protocolLinks: [
      { label: "Bradycardia With a Pulse", href: "/protocols/ac/ac-02" },
    ],
  }),
  {
    id: "epinephrine",
    name: "Epinephrine",
    tradeNames: ["Adrenalin", "EpiPen"],
    uses: ["Anaphylaxis", "Cardiac arrest", "Bradycardia", "Severe upper-airway edema / asthma"],
    doses: [
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
    ],
    cautions: [
      "Verify indication, concentration, route, dose, and repeat interval before every administration.",
      "Do not use a routine IV/IO epinephrine bolus for refractory anaphylaxis; follow the applicable anaphylaxis pathway.",
    ],
    protocolLinks: [
      { label: "Adult Allergic Reaction", href: "/protocols/am/am-01" },
      { label: "Pediatric Allergic Reaction", href: "/protocols/pm/pm-01" },
      { label: "Adult COPD / Asthma", href: "/protocols/ar/ar-04" },
      { label: "Pediatric Respiratory Distress", href: "/protocols/ar/ar-07" },
    ],
  },
  medication({
    id: "push-dose-epinephrine",
    name: "Push-Dose Epinephrine",
    tradeNames: [],
    uses: [
      "Temporary bridge for severe hypotension",
      "Peri-intubation hypotension",
    ],
    isFormularyItem: false,
    level: "Paramedic",
    indication: "Severe hypotension / peri-intubation shock — temporary bridge only",
    adult:
      "10 mcg slow IV/IO (1 mL of a labeled 10 mcg/mL syringe) every 3–5 min as needed; maximum two total boluses, then Medical Control before any additional dose",
    pediatric:
      "0.5–1 mcg/kg slow IV/IO (0.05–0.1 mL/kg of a labeled 10 mcg/mL syringe) every 3–5 min as needed; maximum 10 mcg (1 mL) per dose and two total boluses, then Medical Control before any additional dose",
    cautions: [
      "Use only a labeled 10 mcg/mL (0.01 mg/mL) syringe. To prepare when a standardized prepared syringe is unavailable: add 1 mL of epinephrine 0.1 mg/mL (1:10,000) to 9 mL normal saline in a 10 mL syringe, then label the syringe with drug and concentration.",
      "Do not administer undiluted epinephrine 1 mg/mL (1:1,000) or the 0.1 mg/mL (1:10,000) cardiac-arrest syringe as a push-dose bolus.",
      "Paramedic use only. Use only as a temporary bridge while a vasoactive infusion is prepared and the underlying cause of shock is treated; use continuous ECG and frequent blood-pressure reassessment.",
      "Do not use for cardiac arrest or under AC-02 Bradycardia With a Pulse. For anaphylaxis, give IM epinephrine immediately under AM-01 or PM-01; push-dose epinephrine does not replace that pathway.",
    ],
    protocolLinks: [
      { label: "Adult Hypotension / Shock", href: "/protocols/am/am-05" },
      { label: "Crashing Medical Patient", href: "/protocols/am/am-07" },
      { label: "Airway, Drug Assisted", href: "/protocols/ar/ar-03" },
      { label: "Pediatric Hypotension / Shock", href: "/protocols/pm/pm-03" },
    ],
  }),
  medication({
    id: "etomidate",
    name: "Etomidate",
    tradeNames: ["Amidate"],
    uses: ["Drug-assisted intubation/RSI"],
    level: "Paramedic",
    indication: "DAI/RSI",
    adult: "0.3 mg/kg IV/IO",
    pediatric: "0.3 mg/kg IV/IO; pediatric DAI requires direct online Medical Director or Assistant Medical Director order",
    cautions: [
      "DAI dosing is weight-based. Etomidate provides hypnosis without analgesia or ongoing sedation.",
      "Use only with complete airway, paralysis, and post-intubation plans.",
    ],
    protocolLinks: [
      { label: "Airway Drug-Assisted Intubation", href: "/protocols/ar/ar-03" },
    ],
  }),
  {
    id: "fentanyl",
    name: "Fentanyl",
    tradeNames: ["Sublimaze"],
    uses: ["Pain", "Procedures", "Advanced sedation"],
    doses: [
      {
        "level": "Paramedic",
        "indication": "Pain — IV/IO",
        "adult": "UP-11 age 16 and older: 50 mcg slow IV/IO; repeat 25–50 mcg every 5 minutes as needed; maximum total 100 mcg.",
        "pediatric": "PM-04 age 2 to <16: 1 mcg/kg slow IV/IO once; maximum 50 mcg. Medical Control authorization is required before any second dose.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      },
      {
        "level": "Paramedic",
        "indication": "DAI / post-intubation analgesia — IV/IO",
        "adult": "AR-03: 25–50 mcg IV/IO; repeat cautiously as needed; maximum 100 mcg. Use the separate airway/sedation order, not the pain regimen.",
        "pediatric": "Pediatric DAI requires a direct online Medical Director or Assistant Medical Director order; use the pediatric/airway pathway.",
        "protocolLink": {
          "label": "AR-03 Drug-Assisted Airway",
          "href": "/protocols/ar/ar-03"
        }
      }
    ],
    cautions: [
      "Select one opioid for pain; do not combine fentanyl, morphine and hydromorphone under UP-11.",
      "Use continuous SpO₂ and waveform EtCO₂ with opioids; monitor airway, ventilation, mental status, blood pressure, cumulative dose and response.",
      "Claiborne opioid analgesia remains Paramedic-only. AEMT expanded-analgesia coursework does not create a local opioid standing order."
    ],
    protocolLinks: [
      { label: "Pain Control - Adult", href: "/protocols/up/up-11" },
      { label: "Pediatric Pain Control", href: "/protocols/pm/pm-04" },
    ],
  },
  medication({
    id: "glucagon",
    name: "Glucagon",
    tradeNames: ["GlucaGen"],
    uses: ["Hypoglycemia"],
    level: "AEMT",
    indication: "Hypoglycemia",
    adult: "1-2 mg IV/IO or IM",
    pediatric: ">20 kg: 1 mg; <20 kg: 0.5 mg",
    cautions: [
      "Nausea and vomiting are common; protect the airway and reassess glucose.",
    ],
    protocolLinks: [
      { label: "Pediatric Diabetic Emergency", href: "/protocols/pm/pm-02" },
    ],
  }),
  {
    id: "hydromorphone",
    name: "Hydromorphone",
    tradeNames: ["Dilaudid"],
    uses: ["Pain"],
    doses: [
      {
        "level": "Paramedic",
        "indication": "Adult pain — slow IV/IO",
        "adult": "Age 16 and older: 0.5 mg slow IV/IO; repeat 0.5 mg after 10 minutes as needed; maximum total 1 mg.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Adult pain — IM when vascular access unavailable",
        "adult": "Age 16 and older: 0.5–1 mg IM once.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      }
    ],
    cautions: [
      "Potent opioid: verify dose units, prior analgesics, cumulative dose and ventilation. Select only one opioid; additional dosing beyond UP-11 limits requires Medical Control.",
      "Maintain continuous SpO₂ and waveform EtCO₂, cardiac monitoring, and reassessment every 5–10 minutes."
    ],
    protocolLinks: [
      {
        "label": "UP-11 Adult Pain Control",
        "href": "/protocols/up/up-11"
      },
      {
        "label": "PM-04 Pediatric Pain Control",
        "href": "/protocols/pm/pm-04"
      }
    ],
  },
  medication({
    id: "ibuprofen",
    name: "Ibuprofen",
    tradeNames: ["Advil", "Motrin"],
    uses: ["Pain", "Fever"],
    level: "EMT",
    indication: "Pain; fever",
    adult: "400 mg PO",
    pediatric: "Pain (PM-04, age 2 to <16): 10 mg/kg PO once; maximum 400 mg. Fever: see UP-10.",
    cautions: [
      "Confirm age, renal disease, GI bleeding, NSAID allergy, pregnancy, and prior NSAID use.",
    ],
    protocolLinks: [
      { label: "Pain Control - Adult", href: "/protocols/up/up-11" },
      { label: "Pediatric Pain Control", href: "/protocols/pm/pm-04" },
      { label: "Fever", href: "/protocols/up/up-10" },
    ],
  }),
  medication({
    id: "ipratropium",
    name: "Ipratropium",
    tradeNames: ["Atrovent"],
    uses: ["Asthma/COPD"],
    level: "EMT",
    indication: "Moderate or severe bronchospasm",
    adult: "0.5 mg nebulized with the initial albuterol treatment",
    pediatric: "Under 20 kg: 0.25 mg nebulized; 20 kg or greater: 0.5 mg nebulized, with initial albuterol",
    cautions: [
      "Use as an adjunct to albuterol under the respiratory protocol.",
    ],
    protocolLinks: [
      { label: "Adult COPD / Asthma", href: "/protocols/ar/ar-04" },
      { label: "Pediatric Respiratory Distress", href: "/protocols/ar/ar-07" },
    ],
  }),
  {
    id: "ketamine",
    name: "Ketamine",
    tradeNames: ["Ketalar"],
    uses: ["RSI", "Chemical restraint", "Seizures", "Pain", "Procedures", "Sedation"],
    doses: [
      {
        "level": "Paramedic",
        "indication": "DAI/RSI — IV/IO or IM",
        "adult": "1–2 mg/kg IV/IO; if vascular access is unavailable, 4 mg/kg IM (maximum 400 mg).",
        "pediatric": "Direct online Medical Director or Assistant Medical Director order for pediatric DAI; use the applicable pediatric pathway.",
        "protocolLink": {
          "label": "AR-03 Drug-Assisted Airway",
          "href": "/protocols/ar/ar-03"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Adult pain — IV/IO",
        "adult": "Age 16 and older: 0.3 mg/kg IV/IO slowly over 10 minutes; maximum 30 mg per dose. May repeat every 20 minutes as needed; maximum three total doses. Never rapid IV push.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Adult pain — IN when vascular access unavailable",
        "adult": "Age 16 and older: 0.5–1 mg/kg IN once; maximum 100 mg. Single-dose option under UP-11.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      }
    ],
    cautions: [
      "For suspected penetrating eye injury or open globe, do not give ketamine unless expressly authorized by Medical Control under TB-11; preserve this restriction when using an analgesia or airway reference.",
      "Ketamine analgesia, DAI, agitation, seizures, and post-intubation sedation have separate indications, doses and permissions. Do not substitute DAI doses for analgesia.",
      "Continuous airway, ventilation, oxygenation, cardiac, blood-pressure and sedation monitoring are required. Do not routinely start ketamine and an opioid together.",
      "Claiborne ketamine analgesia remains Paramedic-only; AEMT coursework alone does not authorize it."
    ],
    protocolLinks: [
      {
        "label": "Drug-Assisted Airway",
        "href": "/protocols/ar/ar-03"
      },
      {
        "label": "UP-11 Adult Pain Control",
        "href": "/protocols/up/up-11"
      },
      {
        "label": "PM-04 Pediatric Pain Control",
        "href": "/protocols/pm/pm-04"
      },
      {
        "label": "Eye Trauma / Open Globe Safeguards",
        "href": "/protocols/tb/tb-11"
      },
      {
        "label": "Behavioral Agitation / Sedation",
        "href": "/protocols/up/up-18"
      },
      {
        "label": "Seizure",
        "href": "/protocols/up/up-13"
      }
    ],
  },
  {
    id: "ketorolac",
    name: "Ketorolac",
    tradeNames: ["Toradol"],
    uses: ["Adult pain"],
    doses: [
      {
        "level": "Paramedic",
        "indication": "Adult pain — IV; AEMT authorization pending",
        "adult": "Age 16 and older: 15–30 mg IV once.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        },
        "conditionalAemt": true
      },
      {
        "level": "Paramedic",
        "indication": "Adult pain — IM; AEMT authorization pending",
        "adult": "Age 16 and older: 60 mg IM once.",
        "releaseNote": "Local UP-11 retains 60 mg IM, while the current Tennessee reference lists 10–30 mg IV/IM. The medical director must reconcile this state/local dose difference before release; this update does not silently change the local dose or verify expanded AEMT authority.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        },
        "conditionalAemt": true
      }
    ],
    cautions: [
      "Avoid with renal disease/transplant, significant dehydration, hypotension, active GI bleeding, NSAID allergy, clinically significant anticoagulant-associated bleeding risk, pregnancy, or recent NSAID administration.",
      "Do not give solely for uncomplicated fever. PM-04 does not authorize pediatric ketorolac standing orders.",
      "AEMT expanded analgesia is not enabled while authorization is unverified. Current Tennessee authority for the exact drug/route, documented applicable education, agency competency/credentialing, and medical-director orders for the drug, route, indication, and age group are all required; course completion or selecting AEMT view alone is not authorization."
    ],
    protocolLinks: [
      {
        "label": "UP-11 Adult Pain Control",
        "href": "/protocols/up/up-11"
      },
      {
        "label": "PM-04 Pediatric Pain Control",
        "href": "/protocols/pm/pm-04"
      }
    ],
  },
  medication({
    id: "labetalol",
    name: "Labetalol",
    tradeNames: ["Trandate"],
    uses: ["Undifferentiated suspected CVA with severe hypertension", "Medical-Control-directed non-stroke hypertensive emergency"],
    level: "Paramedic",
    indication: "AM-04 undifferentiated suspected CVA with SBP >220 or DBP >110; other use only under a condition-specific pathway or Medical Control",
    adult: "Undifferentiated suspected CVA: 10 mg slow IV over 2 min; may repeat 10 mg once after at least 10 min if still SBP >220 or DBP >110; maximum total 20 mg",
    pediatric: "Not authorized under Adult Medical AM-04; use a pediatric condition-specific pathway or Medical Control",
    cautions: [
      "Use the standing order only for manually confirmed undifferentiated suspected CVA with SBP >220 or DBP >110; target SBP ≤220 and DBP ≤110. Do not use this target after thrombolysis/TNK.",
      "For any non-stroke hypertensive emergency, use a linked condition-specific pathway or Medical Control; avoid rapid or unmonitored reduction.",
      "Do not give with bradycardia, advanced heart block, acute decompensated heart failure/pulmonary edema, cardiogenic shock, or active bronchospasm.",
    ],
    protocolLinks: [
      { label: "Hypertension", href: "/protocols/am/am-04" },
      { label: "Suspected Stroke", href: "/protocols/up/up-14" },
    ],
  }),
  medication({
    id: "lidocaine",
    name: "Lidocaine",
    tradeNames: ["Xylocaine"],
    uses: ["VF/pulseless VT cardiac arrest", "Wide-complex tachycardia", "Normal-QT polymorphic VT"],
    level: "Paramedic",
    indication: "VF/pulseless VT cardiac arrest; other ventricular dysrhythmias per linked protocol",
    adult: "VF/pulseless VT cardiac arrest: 1–1.5 mg/kg IV/IO initial; then 0.5–0.75 mg/kg every 5–10 min; maximum total 3 mg/kg. For perfusing ventricular tachycardia, follow the linked protocol.",
    pediatric: "1 mg/kg",
    cautions: [
      "Track cumulative dose and monitor for neurologic or cardiovascular toxicity.",
      "Do not combine lidocaine with amiodarone for shock-refractory VF/pulseless VT without Medical Control direction.",
    ],
    protocolLinks: [
      { label: "Adult VF / Pulseless VT", href: "/protocols/ac/ac-09" },
      { label: "Pediatric VF / Pulseless VT", href: "/protocols/pc/pc-07" },
    ],
  }),
  medication({
    id: "lorazepam",
    name: "Lorazepam",
    tradeNames: ["Ativan"],
    uses: ["Chemical restraint", "Seizures"],
    level: "Paramedic",
    indication: "Chemical restraint; seizures",
    adult: "See protocol",
    pediatric: "0.1 mg/kg",
    cautions: [
      "Route, repeat interval, and maximum dose are protocol-specific.",
      "Monitor ventilation, oxygenation, blood pressure, and sedation depth.",
    ],
    protocolLinks: [],
  }),
  medication({
    id: "magnesium",
    name: "Magnesium Sulfate",
    tradeNames: ["Magnesium"],
    uses: ["Hypomagnesemia", "Eclampsia/pre-eclampsia", "Tocolysis", "Ventricular arrhythmia/torsades", "Asthma/COPD"],
    level: "Paramedic",
    indication: "Hypomagnesemia; eclampsia/pre-eclampsia; torsades/ventricular arrhythmia; asthma/COPD",
    adult: "Hypomagnesemia: 1–2 g IV over 1 hr. Eclampsia/pre-eclampsia: 4–6 g IV over 20 min, then 1–2 g/hr. Tocolysis: 4–6 g IV, then 2–4 g/hr for 12–24 hr. Ventricular arrhythmia: 2 g IV over 15 min with a pulse or IV push if pulseless. Torsades: 1–2 g IV over 15 min with a pulse (may repeat once) or IV push if pulseless. Asthma/COPD: 1–2 g IV over 15–30 min",
    pediatric: "Hypomagnesemia: 25–50 mg/kg IV every 8 hr (maximum 2 g/dose). Ventricular arrhythmia: 25–50 mg/kg IV (maximum 2 g/dose). Torsades: 25–50 mg/kg IV/IO once. Asthma: 40–50 mg/kg IV once over 15–30 min (maximum 2 g/dose)",
    cautions: [
      "Dose, dilution, rate, and endpoint differ by indication.",
      "Monitor respiratory status, blood pressure, and cardiac rhythm.",
    ],
    protocolLinks: [
      { label: "OB / GYN Emergency", href: "/protocols/ao/ao-03" },
      { label: "Adult COPD / Asthma", href: "/protocols/ar/ar-04" },
    ],
  }),
  medication({
    id: "methylprednisolone",
    name: "Methylprednisolone",
    tradeNames: ["Solu-Medrol"],
    uses: ["Allergic reaction", "Asthma/COPD"],
    level: "Paramedic",
    indication: "Allergic reaction; asthma/COPD",
    adult: "125 mg IV/IO or IM",
    pediatric: "2 mg/kg IV; maximum 125 mg",
    cautions: [
      "Steroid effect is delayed and does not replace immediate airway or bronchodilator therapy.",
    ],
    protocolLinks: [
      { label: "Adult COPD / Asthma", href: "/protocols/ar/ar-04" },
    ],
  }),
  medication({
    id: "metoprolol",
    name: "Metoprolol",
    tradeNames: ["Lopressor"],
    uses: ["AF/flutter with RVR during Cardizem shortage"],
    level: "Paramedic",
    indication: "Stable, symptomatic atrial fibrillation/flutter with RVR when diltiazem is unavailable under the approved shortage contingency",
    adult: "2.5–5 mg IV push over 1 minute every 10 minutes; maximum 3 doses or 15 mg",
    pediatric: "Medical Control",
    cautions: [
      "Use only during the approved Cardizem shortage contingency; do not independently combine or sequence with diltiazem.",
      "Avoid with hypotension, bradycardia, advanced heart block, cardiogenic shock, pre-excited atrial fibrillation/flutter, undifferentiated wide-complex rhythm, acute decompensated heart failure, or suspected systolic dysfunction.",
      "Reassess blood pressure, heart rate, rhythm, perfusion, respiratory status, and symptoms before every dose; use caution with bronchospasm.",
    ],
    protocolLinks: [
      { label: "Adult Narrow-Complex Tachycardia", href: "/protocols/ac/ac-06" },
    ],
  }),
  {
    id: "midazolam",
    name: "Midazolam",
    tradeNames: ["Versed"],
    uses: ["Seizures", "Chemical restraint", "Post-intubation sedation"],
    doses: [
      {
        level: "Paramedic",
        indication: "Adult seizure",
        adult: "10 mg IM preferred without IV/IO; 10 mg IN alternative; or 5 mg IV/IO when access is established. For IV/IO, repeat 5 mg once after 5 min if seizure continues; maximum total 10 mg",
        pediatric: "0.2 mg/kg IM/IN, maximum 10 mg; or 0.1 mg/kg IV/IO, maximum 5 mg. May repeat once after 5 min; maximum total 0.4 mg/kg, not to exceed 10 mg",
      },
      {
        level: "Paramedic",
        indication: "Adult dangerous agitation (BARS 6)",
        adult: "2.5 mg IV/IO or 5 mg IM/IN; repeat once after 5 min if dangerous agitation persists. Maximum: 5 mg IV/IO or 10 mg IM/IN",
        pediatric: "Use the pediatric agitation pathway and Medical Control as indicated",
      },
      {
        level: "Paramedic",
        indication: "Post-intubation sedation",
        adult: "2–5 mg IV/IO; repeat cautiously as needed after analgesia",
        pediatric: "Direct online Medical Control or receiving-facility order",
      },
    ],
    cautions: [
      "For agitation, IM is preferred over IN when IM is feasible.",
      "Continuously monitor airway, ventilation, oxygenation, blood pressure, cardiac rhythm, and sedation depth.",
    ],
    protocolLinks: [
      { label: "Seizure", href: "/protocols/up/up-13" },
      { label: "Behavioral Agitation / Sedation", href: "/protocols/up/up-18" },
      { label: "Airway Drug-Assisted Intubation", href: "/protocols/ar/ar-03" },
      { label: "Post-Intubation / BIAD Management", href: "/protocols/ar/ar-08" },
    ],
  },
  {
    id: "morphine",
    name: "Morphine",
    tradeNames: ["Morphine sulfate"],
    uses: ["Pain"],
    doses: [
      {
        "level": "Paramedic",
        "indication": "Adult pain — slow IV/IO",
        "adult": "Age 16 and older: 5 mg slow IV/IO; repeat 5 mg after 10 minutes as needed; maximum total 10 mg.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Adult pain — IM when vascular access unavailable",
        "adult": "Age 16 and older: 5–10 mg IM once.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      }
    ],
    cautions: [
      "Monitor airway, ventilation, oxygenation, mental status, blood pressure and cumulative opioid dose. Select only one opioid; additional dosing beyond UP-11 limits requires Medical Control.",
      "Maintain continuous SpO₂ and waveform EtCO₂, cardiac monitoring, and reassessment every 5–10 minutes."
    ],
    protocolLinks: [
      {
        "label": "UP-11 Adult Pain Control",
        "href": "/protocols/up/up-11"
      },
      {
        "label": "PM-04 Pediatric Pain Control",
        "href": "/protocols/pm/pm-04"
      }
    ],
  },
  {
    id: "nitroglycerin",
    name: "Nitroglycerin",
    tradeNames: ["Nitrostat", "NTG"],
    uses: ["Chest pain", "CHF", "Hypertension"],
    doses: [
      {
        level: "EMT",
        indication: "Patient's own prescribed medication",
        adult: "0.4 mg SL every 5 min; maximum 3 doses",
        pediatric: "N/A",
      },
      {
        level: "AEMT",
        indication: "Agency formulary medication",
        adult: "0.4 mg SL every 5 min; maximum 3 doses",
        pediatric: "N/A",
      },
    ],
    cautions: [
      "Verify blood-pressure threshold, PDE-5 inhibitor use, right-ventricular infarction concern, and protocol indication.",
    ],
    protocolLinks: [
      { label: "Acute Coronary Syndrome / STEMI", href: "/protocols/ac/ac-04" },
    ],
  },
  {
    id: "naloxone",
    name: "Naloxone",
    tradeNames: ["Narcan"],
    uses: ["Suspected opioid-related respiratory depression"],
    doses: [
      {
        level: "EMT",
        indication: "Intranasal naloxone",
        adult: "2 mg IN; repeat every 2–3 min to adequate ventilation; maximum cumulative dose 8 mg",
        pediatric: "0.01 mg/kg IN initially; if ventilation remains inadequate, escalate to 0.1 mg/kg; maximum 2 mg per dose",
      },
      {
        level: "Paramedic",
        indication: "Adult opioid-related respiratory depression",
        adult: "0.4–2 mg IV/IO/IM, or 2 mg IN; repeat every 2–3 min and titrate to adequate ventilation; maximum cumulative dose 8 mg",
        pediatric: "0.01 mg/kg IV/IO/IM/IN initially; if ventilation remains inadequate, escalate to 0.1 mg/kg; maximum 2 mg per dose and 8 mg cumulative",
      },
    ],
    cautions: [
      "Ventilation is the treatment priority. Titrate to adequate ventilation rather than complete arousal.",
      "If ventilation remains inadequate after 8 mg, continue airway support and reassess the diagnosis.",
    ],
    protocolLinks: [
      { label: "Altered Mental Status", href: "/protocols/up/up-04" },
      { label: "Overdose / Toxic Ingestion", href: "/protocols/te/te-07" },
    ],
  },
  medication({
    id: "norepinephrine",
    name: "Norepinephrine",
    tradeNames: ["Levophed"],
    uses: ["Bradycardia", "Medical shock"],
    level: "Paramedic",
    indication: "Bradycardia; medical shock",
    adult: "Medical shock (AM-05): 0.05–0.5 mcg/kg/min IV/IO infusion; for other indications, follow the linked protocol",
    pediatric: "Same as adult formulary dose",
    cautions: [
      "Use an infusion pump, titrate to the protocol endpoint, and monitor the access site and distal perfusion.",
    ],
    protocolLinks: [
      { label: "Hypotension / Shock", href: "/protocols/am/am-05" },
      { label: "Adult CHF / Acute Pulmonary Edema", href: "/protocols/ac/ac-05" },
    ],
  }),
  medication({
    id: "ondansetron",
    name: "Ondansetron",
    tradeNames: ["Zofran"],
    uses: ["Nausea and vomiting"],
    level: "AEMT",
    indication: "Abdominal pain / nausea / vomiting",
    adult: "4 mg IV/IO/IM/PO/ODT; may repeat once after 15 min after reassessment",
    pediatric: "0.15 mg/kg IV/IO/IM/PO/ODT; maximum 4 mg; may repeat once after 15 min after reassessment",
    cautions: [
      "Avoid with known congenital long-QT syndrome or clinically significant QT prolongation; use caution with electrolyte loss, bradyarrhythmia, or other QT-prolonging medications.",
    ],
    protocolLinks: [
      { label: "Abdominal Pain / Vomiting / Diarrhea", href: "/protocols/up/up-03" },
    ],
  }),
  medication({
    id: "promethazine",
    name: "Promethazine",
    tradeNames: ["Phenergan"],
    uses: ["Persistent nausea/vomiting after ondansetron"],
    level: "Paramedic",
    indication: "Persistent adult nausea/vomiting after ondansetron",
    adult: "12.5–25 mg deep IM; never IV or IO",
    pediatric: "Medical Control",
    cautions: [
      "Deep IM is the only authorized route. Never administer IV or IO.",
      "Avoid with significant CNS depression, inability to protect the airway, or known hypersensitivity.",
    ],
    protocolLinks: [
      { label: "Abdominal Pain / Vomiting / Diarrhea", href: "/protocols/up/up-03" },
    ],
  }),
  medication({
    id: "propofol",
    name: "Propofol",
    tradeNames: ["Diprivan"],
    uses: ["Interfacility continuation of an established sedative infusion"],
    level: "Paramedic",
    indication: "Continuation of a pre-existing interfacility infusion only",
    adult: "5–50 mcg/kg/min infusion, continued only according to the sending order",
    pediatric: "Continuation only according to the sending order and Medical Control direction",
    cautions: [
      "Do not initiate or bolus propofol in the field.",
      "Requires continuous airway, ventilation, oxygenation, cardiac, and blood-pressure monitoring.",
      "Propofol has no analgesic effect and may cause profound hypotension or apnea.",
    ],
    protocolLinks: [
      { label: "Post-Intubation / BIAD Management", href: "/protocols/ar/ar-08" },
    ],
  }),
  medication({
    id: "rocuronium",
    name: "Rocuronium",
    tradeNames: ["Zemuron"],
    uses: ["Drug-assisted intubation/RSI"],
    level: "Paramedic",
    indication: "DAI/RSI",
    adult: "1 mg/kg IV/IO when succinylcholine is contraindicated or a longer duration is needed",
    pediatric: "1 mg/kg IV/IO; pediatric DAI requires direct online Medical Director or Assistant Medical Director order",
    cautions: [
      "DAI dosing is weight-based. Establish post-intubation analgesia and sedation promptly; do not routinely repeat before they are established.",
    ],
    protocolLinks: [
      { label: "Airway Drug-Assisted Intubation", href: "/protocols/ar/ar-03" },
    ],
  }),
  {
    id: "sodium-bicarbonate",
    name: "Sodium Bicarbonate",
    tradeNames: ["Sodium bicarbonate"],
    uses: ["Hyperkalemia", "Protocol-specific toxicologic emergency"],
    doses: [
      {
        "level": "Paramedic",
        "indication": "AM-03 suspected hyperkalemia / severe metabolic acidosis — IV/IO",
        "adult": "1 mEq/kg IV/IO; maximum 50 mEq. Use the AM-03 indication and monitoring safeguards.",
        "pediatric": "No pediatric trauma/hyperkalemia standing order is supplied by adult AM-03. Use a separately approved pediatric order or Medical Control.",
        "protocolLink": {
          "label": "AM-03 Hyperkalemia / Renal Failure",
          "href": "/protocols/am/am-03"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Toxicologic indication — IV/IO",
        "adult": "1 mEq/kg IV/IO reference; use the toxin-specific order for dose, repeat, maximum and clinical endpoint.",
        "pediatric": "1 mEq/kg reference; use the pediatric toxin-specific order for route, repeat, maximum and endpoint.",
        "protocolLink": {
          "label": "TE-07 Overdose / Toxic Ingestion",
          "href": "/protocols/te/te-07"
        }
      }
    ],
    cautions: [
      "Not routine in every cardiac arrest. Use only the protocol-defined indication; do not transfer a toxicology regimen to traumatic or medical arrest.",
      "Verify concentration and adequate ventilation. Do not mix with calcium or administer simultaneously through the same tubing; flush thoroughly."
    ],
    protocolLinks: [
      {
        "label": "AM-03 Hyperkalemia / Renal Failure",
        "href": "/protocols/am/am-03"
      },
      {
        "label": "Overdose / Toxic Ingestion",
        "href": "/protocols/te/te-07"
      }
    ],
  },
  medication({
    id: "succinylcholine",
    name: "Succinylcholine",
    tradeNames: ["Anectine"],
    uses: ["Drug-assisted intubation/RSI"],
    level: "Paramedic",
    indication: "DAI/RSI",
    adult: "1–2 mg/kg IV for RSI",
    pediatric: "1–2 mg/kg IV for RSI; pediatric DAI requires direct online Medical Director or Assistant Medical Director order",
    cautions: [
      "DAI dosing is weight-based. Verify contraindications and prepare continuous post-paralysis ventilation, analgesia, and sedation.",
    ],
    protocolLinks: [
      { label: "Airway Drug-Assisted Intubation", href: "/protocols/ar/ar-03" },
    ],
  }),
  {
    id: "tranexamic-acid",
    name: "Tranexamic Acid",
    tradeNames: ["TXA", "Cyklokapron"],
    uses: ["Traumatic hemorrhage with clinical shock", "Topical epistaxis", "Topical dental hemorrhage", "Medical-Control-directed bradykinin angioedema"],
    doses: [
      {
        "level": "Paramedic",
        "indication": "Traumatic hemorrhage with clinical shock — IV/IO",
        "adult": "1–2 g IV/IO: 1 g over 10 minutes OR 2 g over 20 minutes; maximum administration rate 100 mg/min. Verify the stocked concentration and preparation instructions. Do not automatically repeat; further dosing requires a specific order.",
        "pediatric": "15 mg/kg. Pediatric trauma eligibility/age limits, infusion instructions, repeat policy and maximum require a separately approved pediatric order or online Medical Control; do not infer them from this dose.",
        "protocolLink": {
          "label": "TB-12 Abdominal / Pelvic Trauma",
          "href": "/protocols/tb/tb-12"
        },
        "releaseNote": "Adult dose/rate options are approved as shown. Verify stocked concentration and preparation instructions; do not invent dilution volumes or automatically repeat without a specific order. Pediatric age eligibility, infusion rate/cap and IV/IO route verification remain unresolved before release. The locally selected pediatric 15 mg/kg differs from the Tennessee 20 mg/kg IV reference; do not imply state dose equivalence or infer systemic trauma dosing from topical dosing."
      },
      {
        "level": "AEMT",
        "indication": "Persistent atraumatic anterior epistaxis — topical only",
        "adult": "UP-09: 1 g/10 mL total applied to anterior gauze after 15 minutes uninterrupted compression; maintain external pressure for 20 minutes.",
        "pediatric": "UP-09: 15 mg/kg topically; maximum 1 g total, on appropriately sized anterior gauze; maintain external pressure for 20 minutes.",
        "protocolLink": {
          "label": "UP-09 Epistaxis",
          "href": "/protocols/up/up-09"
        }
      },
      {
        "level": "AEMT",
        "indication": "Persistent dental hemorrhage — topical only",
        "adult": "UP-07: TXA 1 g/10 mL to saturate gauze/cotton; pack the bleeding socket and maintain direct pressure for 20 minutes.",
        "pediatric": "Use UP-07 for the pediatric dental indication and Medical Control when the pediatric dose or eligibility is not specified; do not infer a systemic 15 mg/kg regimen.",
        "protocolLink": {
          "label": "UP-07 Dental Problems",
          "href": "/protocols/up/up-07"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Suspected ACE-inhibitor / hereditary bradykinin angioedema — IV/IO with Medical Control",
        "adult": "AM-01: 1 g IV/IO over 10 minutes with Medical Control.",
        "pediatric": "Use a separate pediatric order / Medical Control; the adult AM-01 order is not a pediatric standing order.",
        "protocolLink": {
          "label": "AM-01 Allergic Reaction / Anaphylaxis",
          "href": "/protocols/am/am-01"
        }
      }
    ],
    cautions: [
      "Systemic trauma TXA is Paramedic-only: after immediate lifesaving interventions, consider for traumatic hemorrhage with clinical hemorrhagic shock and injury no more than 3 hours earlier. Do not delay transport or hemorrhage control.",
      "Record injury time and TXA dose/time; notify the receiving team to avoid duplicate dosing. Do not infer systemic trauma dosing from topical indications.",
      "Topical nasal/oral TXA is a separate existing AEMT/Paramedic order; EMT administration is not authorized under UP-07/UP-09. The adult trauma 1–2 g range is not a topical dose.",
      "Do not give IV/IO TXA solely for isolated dental bleeding or epistaxis. Do not atomize TXA, or perform deep/blind/posterior nasal packing under UP-09."
    ],
    protocolLinks: [
      {
        "label": "Multiple Trauma",
        "href": "/protocols/tb/tb-06"
      },
      {
        "label": "Abdominal / Pelvic Trauma",
        "href": "/protocols/tb/tb-12"
      },
      {
        "label": "Epistaxis",
        "href": "/protocols/up/up-09"
      },
      {
        "label": "Dental Problems",
        "href": "/protocols/up/up-07"
      },
      {
        "label": "Allergic Reaction / Anaphylaxis",
        "href": "/protocols/am/am-01"
      }
    ],
  },
  medication({
    id: "vecuronium",
    name: "Vecuronium",
    tradeNames: ["Norcuron"],
    uses: ["Drug-assisted intubation/RSI"],
    level: "Paramedic",
    indication: "DAI/RSI",
    adult: "DAI: 80–100 mcg/kg IV push once; intermittent maintenance: 10–15 mcg/kg IV every 15 min as needed",
    pediatric: "DAI: 80–100 mcg/kg IV push once; intermittent maintenance: 50–100 mcg/kg IV every 1 hr as needed; pediatric DAI requires direct online Medical Director or Assistant Medical Director order",
    cautions: [
      "Paralysis provides no sedation, amnesia, or analgesia.",
      "Confirm ventilation capability and give continuous post-intubation sedation/analgesia.",
    ],
    protocolLinks: [
      { label: "Airway Drug-Assisted Intubation", href: "/protocols/ar/ar-03" },
    ],
  }),
];
