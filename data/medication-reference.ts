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
    "Claiborne Covenant EMS Formulary - RX-R1 Medications (42 medications)",
  href: "https://www.tn.gov/content/dam/tn/health/events/TN%20State%20Protocol%20Guidelines%20%20Sept24.pdf",
  reviewed: "July 30, 2026",
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
    adult: "First dose 6 mg rapid IV/IO push with immediate flush; second dose 12 mg once after 1–2 minutes if needed",
    pediatric: "0.2 mg/kg",
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
    uses: ["Asthma/COPD", "Allergic reaction"],
    level: "EMT",
    indication: "Asthma/COPD; allergic reaction",
    adult: "Nebulized 2.5 mg in 3 mL NS; MDI 2 puffs inhaled",
    pediatric: "Same as adult formulary dose",
    cautions: [
      "Reassess heart rate, work of breathing, air movement, and response after treatment.",
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
    uses: ["Cardiac arrest", "Blood administration"],
    level: "Paramedic",
    indication: "Cardiac arrest; blood administration",
    adult: "1 g IV/IO",
    pediatric: "20 mg/kg",
    cautions: [
      "Verify the calcium salt, concentration, indication, and protocol before administration.",
      "Calcium chloride extravasation can cause severe tissue injury.",
    ],
    protocolLinks: [],
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
    adult: "25 g IV/IO",
    pediatric: "1 g/kg",
    cautions: [
      "Verify concentration, patient weight, vascular patency, and maximum volume before administration.",
      "Recheck glucose and clinical response.",
    ],
    protocolLinks: [
      { label: "Pediatric Diabetic Emergency", href: "/protocols/pm/pm-02" },
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
    adult: "10-20 mg bolus; infusion 5-10 mg/hr",
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
    uses: ["Multiple indications"],
    doses: [
      {
        level: "EMT",
        indication: "EMT-authorized indication and route",
        adult: "See protocol",
        pediatric: "Varies by protocol",
      },
      {
        level: "Paramedic",
        indication: "Other formulary indications",
        adult: "See protocol",
        pediatric: "Varies by protocol",
      },
    ],
    cautions: [
      "Verify indication, concentration, route, dose, and repeat interval before every administration.",
    ],
    protocolLinks: [
      { label: "Adult Allergic Reaction", href: "/protocols/am/am-02" },
      { label: "Pediatric Allergic Reaction", href: "/protocols/pm/pm-01" },
    ],
  },
  medication({
    id: "etomidate",
    name: "Etomidate",
    tradeNames: ["Amidate"],
    uses: ["Drug-assisted intubation/RSI", "Procedures"],
    level: "Paramedic",
    indication: "DAI/RSI; procedures",
    adult: "DAI/RSI: 20-30 mg IV/IO; procedures: 5-10 mg",
    pediatric: "0.3 mg/kg",
    cautions: [
      "Etomidate provides hypnosis without analgesia or ongoing sedation.",
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
    indication: "Asthma/COPD",
    adult: "0.5 mg with albuterol nebulizer",
    pediatric: "Same as adult formulary dose",
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
    uses: [
      "RSI",
      "Chemical restraint",
      "Seizures",
      "Pain",
      "Procedures",
      "Sedation",
    ],
    level: "Paramedic",
    indication: "RSI; restraint; seizures; pain; procedures; sedation",
    adult: "Various protocol doses",
    pediatric: "Various protocol doses",
    cautions: [
      "Dose and monitoring vary substantially by indication and route.",
      "Current Tennessee reference excludes ketamine analgesia in penetrating eye trauma.",
    ],
    protocolLinks: [
      { label: "Airway Drug-Assisted Intubation", href: "/protocols/ar/ar-03" },
      { label: "Pain Control - Adult", href: "/protocols/up/up-11" },
    ],
  }),
  medication({
    id: "ketorolac",
    name: "Ketorolac",
    tradeNames: ["Toradol"],
    uses: ["Pain", "Fever"],
    level: "Paramedic",
    indication: "Pain; fever",
    adult: "7.5-15 mg IV/IO or 30 mg IM",
    pediatric: "N/A",
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
    uses: ["Hypertension"],
    level: "Paramedic",
    indication: "Hypertension",
    adult: "10 mg IV/IO",
    pediatric: "N/A",
    cautions: [
      "Monitor for hypotension and bradycardia; use caution with bronchospasm or decompensated heart failure.",
    ],
    protocolLinks: [],
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
    uses: ["Asthma/COPD", "Eclampsia", "Torsades"],
    level: "Paramedic",
    indication: "Asthma/COPD; eclampsia; torsades",
    adult: "2-4 g IV/IO",
    pediatric: "25-50 mg/kg",
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
  medication({
    id: "midazolam",
    name: "Midazolam",
    tradeNames: ["Versed"],
    uses: ["RSI", "Chemical restraint", "Seizures", "Procedures", "Sedation"],
    level: "Paramedic",
    indication: "RSI; restraint; seizures; procedures; sedation",
    adult: "See protocol",
    pediatric: "0.1-0.2 mg/kg",
    cautions: [
      "Dose, route, repeat interval, and maximum dose vary by indication.",
      "Monitor ventilation, oxygenation, blood pressure, and sedation depth.",
    ],
    protocolLinks: [
      { label: "Airway Drug-Assisted Intubation", href: "/protocols/ar/ar-03" },
    ],
  }),
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
    uses: ["Opiates", "Sedatives"],
    doses: [
      {
        level: "EMT",
        indication: "Intranasal naloxone",
        adult: "2 mg IN",
        pediatric: "0.01 mg/kg",
      },
      {
        level: "Paramedic",
        indication: "Titrated naloxone",
        adult: "0.1-0.2 mg IV/IO/IM or 2 mg IN",
        pediatric: "0.01 mg/kg",
      },
    ],
    cautions: [
      "Titrate to adequate ventilation rather than full arousal when using incremental dosing.",
      "Be prepared for recurrent respiratory depression or acute withdrawal.",
    ],
    protocolLinks: [
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
    uses: ["Abdominal pain/vomiting"],
    level: "Paramedic",
    indication: "Abdominal pain/vomiting",
    adult: "4 mg IV/IO, IM, or PO",
    pediatric: "Age based",
    cautions: [
      "Follow the age-based pediatric protocol and consider QT-prolongation risk.",
    ],
    protocolLinks: [],
  }),
  medication({
    id: "promethazine",
    name: "Promethazine",
    tradeNames: ["Phenergan"],
    uses: ["Abdominal pain/vomiting"],
    level: "Paramedic",
    indication: "Abdominal pain/vomiting",
    adult: "25 mg IM",
    pediatric: "Medical Control",
    cautions: [
      "Use the formulary IM route; monitor for sedation, hypotension, and tissue injury.",
    ],
    protocolLinks: [],
  }),
  medication({
    id: "propofol",
    name: "Propofol",
    tradeNames: ["Diprivan"],
    uses: ["Advanced sedation", "Pain"],
    level: "Paramedic",
    indication: "Advanced sedation / pain",
    adult: "5-50 mcg/kg/min infusion",
    pediatric: "Same as adult formulary dose",
    cautions: [
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
    adult: "100 mg IV/IO",
    pediatric: "1 mg/kg",
    cautions: [
      "Paralysis provides no sedation, amnesia, or analgesia.",
      "Confirm ventilation capability and give continuous post-intubation sedation/analgesia.",
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
    adult: "100-150 mg IV/IO",
    pediatric: "1-2 mg/kg",
    cautions: [
      "Paralysis provides no sedation, amnesia, or analgesia.",
      "Screen for hyperkalemia risk, neuromuscular disease, major burn/crush timing, and malignant-hyperthermia history.",
    ],
    protocolLinks: [
      { label: "Airway Drug-Assisted Intubation", href: "/protocols/ar/ar-03" },
    ],
  }),
  medication({
    id: "tranexamic-acid",
    name: "Tranexamic Acid",
    tradeNames: ["TXA", "Cyklokapron"],
    uses: [
      "Angioedema",
      "Hemorrhagic shock",
      "Head trauma",
      "Nasal/oral bleeding",
      "Stroke",
    ],
    level: "Paramedic",
    indication:
      "Angioedema; hemorrhagic shock; head trauma; nasal/oral bleeding; stroke",
    adult: "1-2 g IV/IO or topical",
    pediatric: "15 mg/kg",
    cautions: [
      "Use only under the indication-specific protocol; formulary availability does not authorize every listed use.",
      "Confirm dose, timing, contraindications, preparation, and route.",
    ],
    protocolLinks: [
      { label: "Multiple Trauma", href: "/protocols/tb/tb-06" },
      { label: "Head Trauma", href: "/protocols/tb/tb-05" },
      { label: "Abdominal / Pelvic Trauma", href: "/protocols/tb/tb-12" },
    ],
  }),
  medication({
    id: "vecuronium",
    name: "Vecuronium",
    tradeNames: ["Norcuron"],
    uses: ["Drug-assisted intubation/RSI"],
    level: "Paramedic",
    indication: "DAI/RSI",
    adult: "10 mg IV/IO",
    pediatric: "0.1 mg/kg",
    cautions: [
      "Paralysis provides no sedation, amnesia, or analgesia.",
      "Confirm ventilation capability and give continuous post-intubation sedation/analgesia.",
    ],
    protocolLinks: [
      { label: "Airway Drug-Assisted Intubation", href: "/protocols/ar/ar-03" },
    ],
  }),
];
