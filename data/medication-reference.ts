export type MedicationProviderLevel = "EMT" | "AEMT" | "Paramedic";

export interface MedicationDoseReference {
  level: MedicationProviderLevel;
  indication: string;
  adult: string;
  pediatric: string;
}

export interface MedicationReference {
  id: string;
  name: string;
  tradeNames: string[];
  uses: string[];
  doses: MedicationDoseReference[];
  cautions: string[];
  protocolLinks: { label: string; href: string }[];
}

export const medicationReferenceSource = {
  label:
    "Claiborne Covenant EMS RX-R1 Formulary — 42 verified stocked medications",
  href: "https://www.tn.gov/content/dam/tn/health/events/TN%20State%20Protocol%20Guidelines%20%20Sept24.pdf",
  reviewed: "August 15, 2026",
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
  medication({
    id: "acetaminophen",
    name: "Acetaminophen",
    tradeNames: ["Tylenol", "Ofirmev"],
    uses: ["Pain", "Fever"],
    level: "EMT",
    indication: "Pain; fever",
    adult: "650-1,000 mg PO; 1 g IV/IO",
    pediatric: "15 mg/kg",
    cautions: [
      "Confirm route authorization, liver disease, prior acetaminophen use, and maximum daily dose.",
    ],
    protocolLinks: [
      { label: "Pain Control - Adult", href: "/protocols/up/up-11" },
      { label: "Fever", href: "/protocols/up/up-10" },
    ],
  }),
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
  medication({
    id: "albuterol",
    name: "Albuterol",
    tradeNames: ["Proventil", "Ventolin"],
    uses: ["Asthma/COPD", "Allergic reaction", "Hyperkalemia"],
    level: "EMT",
    indication: "Bronchospasm",
    adult: "Nebulized 2.5–5 mg; MDI 2 puffs inhaled",
    pediatric: "Bronchospasm: under 20 kg 2.5 mg nebulized; 20 kg or greater 5 mg nebulized. Hyperkalemia: under 15 kg 10 mg nebulized; 15 kg or greater 15 mg nebulized; may repeat every 2 hr as needed",
    cautions: [
      "Reassess heart rate, work of breathing, air movement, and response after treatment.",
      "For anaphylaxis, albuterol is adjunctive and does not replace IM epinephrine.",
    ],
    protocolLinks: [
      { label: "Adult COPD / Asthma", href: "/protocols/ar/ar-04" },
      { label: "Pediatric Respiratory Distress", href: "/protocols/ar/ar-07" },
    ],
  }),
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
  medication({
    id: "calcium",
    name: "Calcium Chloride / Gluconate",
    tradeNames: ["Calcium chloride", "Calcium gluconate"],
    uses: ["Hyperkalemia/arrhythmia", "Calcium-channel blocker toxicity", "Calcium replacement"],
    level: "Paramedic",
    indication: "Hyperkalemia/arrhythmia; other protocol-specific calcium use",
    adult: "Calcium chloride: 500–1,000 mg IV/IO for hyperkalemia/arrhythmia. Calcium gluconate: 1.5–3 g IV for hyperkalemia/arrhythmia; preferred through a peripheral IV",
    pediatric: "Calcium chloride: 20 mg/kg IV/IO for hyperkalemia/arrhythmia. Calcium gluconate: 60–100 mg/kg IV/IO for hyperkalemia/arrhythmia",
    cautions: [
      "Verify the calcium salt, concentration, indication, and protocol before administration.",
      "Prefer calcium gluconate through a peripheral IV. Calcium chloride extravasation can cause severe tissue injury; use central/IO administration when appropriate and authorized.",
    ],
    protocolLinks: [
      { label: "Overdose / Toxic Ingestion", href: "/protocols/te/te-07" },
    ],
  }),
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
  medication({
    id: "fentanyl",
    name: "Fentanyl",
    tradeNames: ["Sublimaze"],
    uses: ["Pain", "Procedures", "Advanced sedation"],
    level: "Paramedic",
    indication: "Pain; procedures; advanced sedation",
    adult: "25-100 mcg IV/IO",
    pediatric: "1 mcg/kg",
    cautions: [
      "Monitor airway, ventilation, oxygenation, mental status, and blood pressure.",
    ],
    protocolLinks: [
      { label: "Pain Control - Adult", href: "/protocols/up/up-11" },
    ],
  }),
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
  medication({
    id: "hydromorphone",
    name: "Hydromorphone",
    tradeNames: ["Dilaudid"],
    uses: ["Pain"],
    level: "Paramedic",
    indication: "Pain",
    adult: "0.5-1 mg IV/IO or IM",
    pediatric: "0.01 mg/kg",
    cautions: [
      "Hydromorphone is a potent opioid; verify dose units and monitor ventilation closely.",
    ],
    protocolLinks: [
      { label: "Pain Control - Adult", href: "/protocols/up/up-11" },
    ],
  }),
  medication({
    id: "ibuprofen",
    name: "Ibuprofen",
    tradeNames: ["Advil", "Motrin"],
    uses: ["Pain", "Fever"],
    level: "EMT",
    indication: "Pain; fever",
    adult: "400 mg PO",
    pediatric: "10 mg/kg",
    cautions: [
      "Confirm age, renal disease, GI bleeding, NSAID allergy, pregnancy, and prior NSAID use.",
    ],
    protocolLinks: [
      { label: "Pain Control - Adult", href: "/protocols/up/up-11" },
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
  medication({
    id: "ketamine",
    name: "Ketamine",
    tradeNames: ["Ketalar"],
    uses: ["RSI", "Chemical restraint", "Seizures", "Pain", "Procedures", "Sedation"],
    level: "Paramedic",
    indication: "DAI/RSI",
    adult: "1–2 mg/kg IV/IO; if vascular access is unavailable, 4 mg/kg IM (maximum 400 mg)",
    pediatric: "Direct online Medical Director or Assistant Medical Director order for DAI; use the applicable pediatric pathway",
    cautions: [
      "DAI dosing is weight-based. Ideal-body-weight dosing is not yet part of this protocol.",
      "Other ketamine uses have separate indication- and route-specific doses; follow the linked protocol.",
      "Continuous airway, ventilation, oxygenation, cardiac, blood-pressure, and sedation monitoring are required.",
    ],
    protocolLinks: [
      { label: "Airway Drug-Assisted Intubation", href: "/protocols/ar/ar-03" },
      { label: "Pain Control - Adult", href: "/protocols/up/up-11" },
      { label: "Behavioral Agitation / Sedation", href: "/protocols/up/up-18" },
      { label: "Seizure", href: "/protocols/up/up-13" },
    ],
  }),
  medication({
    id: "ketorolac",
    name: "Ketorolac",
    tradeNames: ["Toradol"],
    uses: ["Pain", "Fever"],
    level: "Paramedic",
    indication: "Pain; fever",
    adult: "15–30 mg IV or 60 mg IM",
    pediatric: "0.5 mg/kg IV once; maximum 15 mg",
    cautions: [
      "Avoid with renal disease, active bleeding, GI ulcer, NSAID allergy, pregnancy, or recent NSAID use.",
    ],
    protocolLinks: [
      { label: "Pain Control - Adult", href: "/protocols/up/up-11" },
    ],
  }),
  medication({
    id: "labetalol",
    name: "Labetalol",
    tradeNames: ["Trandate"],
    uses: ["Hypertensive emergency", "Selected stroke blood-pressure control"],
    level: "Paramedic",
    indication: "Protocol-defined hypertensive emergency or stroke blood-pressure control",
    adult: "10–20 mg slow IV push; may repeat every 10 minutes as needed to goal blood pressure",
    pediatric: "0.2–1 mg/kg once; maximum 40 mg",
    cautions: [
      "Use only under the Hypertension or Suspected Stroke pathway; avoid rapid or unmonitored blood-pressure reduction.",
      "Avoid with bradycardia, decompensated heart failure, or active bronchospasm unless Medical Control directs otherwise.",
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
    uses: ["VF/pulseless VT", "Wide-complex tachycardia", "Torsades"],
    level: "Paramedic",
    indication: "VF/VT; wide-tachycardia; torsades",
    adult: "100 mg IV/IO initial",
    pediatric: "1 mg/kg",
    cautions: [
      "Track cumulative dose and monitor for neurologic or cardiovascular toxicity.",
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
    pediatric: "Medical Control",
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
    uses: ["Narrow-complex tachycardia"],
    level: "Paramedic",
    indication: "Narrow-tachycardia",
    adult: "2.5-5 mg IV/IO",
    pediatric: "Medical Control",
    cautions: [
      "Monitor for hypotension and bradycardia; use caution with bronchospasm or acute heart failure.",
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
  medication({
    id: "morphine",
    name: "Morphine",
    tradeNames: ["Morphine sulfate"],
    uses: ["Pain"],
    level: "Paramedic",
    indication: "Pain",
    adult: "5-10 mg IV/IO or IM",
    pediatric: "0.1 mg/kg",
    cautions: [
      "Monitor airway, ventilation, oxygenation, mental status, blood pressure, and cumulative opioid dose.",
    ],
    protocolLinks: [
      { label: "Pain Control - Adult", href: "/protocols/up/up-11" },
    ],
  }),
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
    adult: "0.1-2 mcg/kg/min infusion",
    pediatric: "Same as adult formulary dose",
    cautions: [
      "Use an infusion pump, titrate to the protocol endpoint, and monitor the access site and distal perfusion.",
    ],
    protocolLinks: [],
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
  medication({
    id: "sodium-bicarbonate",
    name: "Sodium Bicarbonate",
    tradeNames: ["Sodium bicarbonate"],
    uses: ["Cardiac arrest", "Overdose"],
    level: "Paramedic",
    indication: "Cardiac arrest; overdose",
    adult: "1 mEq/kg IV/IO",
    pediatric: "1 mEq/kg",
    cautions: [
      "Use only for a protocol-defined indication; it is not routine for every cardiac arrest.",
      "Verify concentration and ensure adequate ventilation.",
    ],
    protocolLinks: [
      { label: "Overdose / Toxic Ingestion", href: "/protocols/te/te-07" },
    ],
  }),
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
  medication({
    id: "tranexamic-acid",
    name: "Tranexamic Acid",
    tradeNames: ["TXA", "Cyklokapron"],
    uses: ["Angioedema", "Hemorrhagic shock", "Head trauma", "Nasal/oral bleeding", "Stroke"],
    level: "Paramedic",
    indication: "Use the applicable condition-specific TXA pathway",
    adult: "1-2 g IV/IO or topical",
    pediatric: "15 mg/kg",
    cautions: [
      "Open the applicable TXA pathway before administration; route, timing, eligibility, and endpoint are condition-specific.",
    ],
    protocolLinks: [
      { label: "Abdominal / Pelvic Trauma", href: "/protocols/tb/tb-12" },
      { label: "Epistaxis", href: "/protocols/up/up-09" },
      { label: "Dental Problems", href: "/protocols/up/up-07" },
    ],
  }),
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
