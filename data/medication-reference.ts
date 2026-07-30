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
  label: "Tennessee BLS/ALS State EMS Protocol Guidelines 2024–2025, Medication Dosage reference pp. 209–210",
  href: "https://www.tn.gov/content/dam/tn/health/events/TN%20State%20Protocol%20Guidelines%20%20Sept24.pdf",
  reviewed: "July 30, 2026",
};

export const medicationReferences: MedicationReference[] = [
  {
    id: "acetaminophen",
    name: "Acetaminophen",
    tradeNames: ["Tylenol"],
    uses: ["Pain", "Fever"],
    doses: [{ level: "EMT", indication: "Pain or fever", adult: "1,000 mg PO", pediatric: ">3 months: 15 mg/kg PO" }],
    cautions: ["Confirm maximum daily dose, liver disease history, and prior acetaminophen use."],
    protocolLinks: [{ label: "Pain Control — Adult", href: "/protocols/up/up-11" }, { label: "Fever", href: "/protocols/up/up-10" }],
  },
  {
    id: "adenosine",
    name: "Adenosine",
    tradeNames: ["Adenocard"],
    uses: ["Regular narrow-complex tachycardia", "Selected regular monomorphic wide-complex tachycardia"],
    doses: [{ level: "Paramedic", indication: "Regular tachycardia", adult: "12 mg rapid IV/IO push with immediate flush", pediatric: "0.1 mg/kg rapid IV/IO (max 6 mg); repeat 0.2 mg/kg (max 12 mg)" }],
    cautions: ["Use only for a regular rhythm under the applicable tachycardia protocol.", "Give through the most proximal practical access with an immediate flush."],
    protocolLinks: [{ label: "Adult Narrow-Complex Tachycardia", href: "/protocols/ac/ac-06" }, { label: "Pediatric Narrow-Complex Tachycardia", href: "/protocols/pc/pc-05" }],
  },
  {
    id: "albuterol",
    name: "Albuterol",
    tradeNames: ["Proventil", "Ventolin"],
    uses: ["Bronchospasm", "Asthma/COPD", "Anaphylaxis with wheeze", "Hyperkalemia adjunct"],
    doses: [{ level: "EMT", indication: "Bronchospasm", adult: "2.5 mg in 3 mL NS by nebulizer; repeat per protocol", pediatric: "2.5 mg in 3 mL NS by nebulizer; repeat per protocol" }],
    cautions: ["Reassess heart rate, work of breathing, air movement, and response after each treatment."],
    protocolLinks: [{ label: "Adult COPD / Asthma", href: "/protocols/ar/ar-04" }, { label: "Pediatric Respiratory Distress", href: "/protocols/ar/ar-07" }],
  },
  {
    id: "amiodarone",
    name: "Amiodarone",
    tradeNames: ["Cordarone"],
    uses: ["VF/pulseless VT", "Selected wide-complex tachycardia"],
    doses: [{ level: "Paramedic", indication: "Cardiac dysrhythmia", adult: "300 mg IV/IO, then 150 mg per arrest protocol", pediatric: "5 mg/kg IV/IO per rhythm-specific protocol" }],
    cautions: ["Administration rate and repeat dosing depend on whether the patient has a pulse."],
    protocolLinks: [{ label: "Adult VF / Pulseless VT", href: "/protocols/ac/ac-09" }, { label: "Pediatric VF / Pulseless VT", href: "/protocols/pc/pc-07" }],
  },
  {
    id: "aspirin",
    name: "Aspirin",
    tradeNames: ["ASA"],
    uses: ["Suspected acute coronary syndrome"],
    doses: [{ level: "EMT", indication: "Suspected ACS", adult: "162–324 mg chewed, then swallowed", pediatric: "No routine pediatric dose" }],
    cautions: ["Confirm allergy, active bleeding, and whether an adequate dose was already taken."],
    protocolLinks: [{ label: "Acute Coronary Syndrome / STEMI", href: "/protocols/ac/ac-04" }],
  },
  {
    id: "atropine",
    name: "Atropine",
    tradeNames: ["Atropine sulfate"],
    uses: ["Symptomatic bradycardia", "Organophosphate/nerve-agent exposure"],
    doses: [
      { level: "Paramedic", indication: "Symptomatic bradycardia", adult: "0.5–1 mg IV/IO every 3–5 min; TN table maximum 0.04 mg/kg", pediatric: "0.02 mg/kg IV/IO; follow pediatric bradycardia protocol" },
      { level: "Paramedic", indication: "Organophosphate/nerve agent", adult: "2 mg IV/IO/IM every 3–5 min until secretions improve", pediatric: "Weight-banded dosing per WMD / Nerve Agent protocol" },
    ],
    cautions: ["The dose differs substantially by indication.", "For nerve-agent exposure, clinical drying of secretions—not a conventional cardiac maximum—guides repeat dosing."],
    protocolLinks: [{ label: "Bradycardia With a Pulse", href: "/protocols/ac/ac-02" }, { label: "WMD / Nerve Agent", href: "/protocols/te/te-08" }],
  },
  {
    id: "calcium",
    name: "Calcium",
    tradeNames: ["Calcium chloride", "Calcium gluconate"],
    uses: ["Hyperkalemia", "Calcium-channel blocker toxicity", "Selected arrest etiologies"],
    doses: [{ level: "Paramedic", indication: "Protocol-specific use", adult: "TN table: calcium chloride 500 mg IV/IO; toxicology pathways may specify a different salt/dose", pediatric: "20 mg/kg IV/IO per applicable protocol" }],
    cautions: ["Calcium chloride and calcium gluconate are not dose-equivalent.", "Verify product, concentration, indication, and vascular access before administration."],
    protocolLinks: [{ label: "Dialysis / Renal Failure", href: "/protocols/am/am-03" }, { label: "Overdose / Toxic Ingestion", href: "/protocols/te/te-07" }],
  },
  {
    id: "dextrose",
    name: "Dextrose",
    tradeNames: ["D10W", "D25W", "D50W"],
    uses: ["Symptomatic hypoglycemia"],
    doses: [{ level: "Paramedic", indication: "Symptomatic hypoglycemia", adult: "D50W 12.5–25 g IV/IO or titrated D10W per protocol", pediatric: "Use age/weight-appropriate concentration and the pediatric diabetic protocol" }],
    cautions: ["Use a flowing line, reassess glucose and mental status, and avoid extravasation.", "Pediatric concentration and volume are age/weight dependent."],
    protocolLinks: [{ label: "Diabetic Emergency — Adult", href: "/protocols/am/am-02" }, { label: "Pediatric Diabetic", href: "/protocols/pm/pm-02" }],
  },
  {
    id: "diazepam",
    name: "Diazepam",
    tradeNames: ["Valium"],
    uses: ["Seizure", "Sedation when specifically authorized"],
    doses: [{ level: "Paramedic", indication: "Protocol-specific benzodiazepine use", adult: "2–10 mg slow IV/IO, titrated to effect", pediatric: "0.1 mg/kg slow IV/IO, titrated to effect" }],
    cautions: ["Monitor ventilation, oxygenation, blood pressure, and level of consciousness.", "Use the seizure or sedation protocol’s preferred benzodiazepine when specified."],
    protocolLinks: [{ label: "Seizure", href: "/protocols/up/up-13" }],
  },
  {
    id: "diphenhydramine",
    name: "Diphenhydramine",
    tradeNames: ["Benadryl"],
    uses: ["Allergic reaction adjunct"],
    doses: [{ level: "Paramedic", indication: "Allergic reaction adjunct", adult: "25–50 mg IM or slow IV/IO", pediatric: "1 mg/kg IV/IO/IM (max 50 mg in Claiborne pediatric pathway)" }],
    cautions: ["This is adjunctive treatment and must not delay epinephrine for anaphylaxis.", "May cause sedation and hypotension."],
    protocolLinks: [{ label: "Adult Anaphylaxis", href: "/protocols/am/am-01" }, { label: "Pediatric Allergic Reaction", href: "/protocols/pm/pm-01" }],
  },
  {
    id: "dopamine",
    name: "Dopamine",
    tradeNames: ["Intropin"],
    uses: ["Selected shock or post-arrest hypotension when locally authorized"],
    doses: [{ level: "Paramedic", indication: "Vasopressor infusion", adult: "2–20 mcg/kg/min IV/IO infusion", pediatric: "2–20 mcg/kg/min IV/IO infusion" }],
    cautions: ["Use a pump when available and titrate to the protocol endpoint.", "Verify concentration before calculating the rate."],
    protocolLinks: [{ label: "Hypotension / Shock", href: "/protocols/am/am-05" }, { label: "Post-Resuscitation Care", href: "/protocols/ac/ac-10" }],
  },
  {
    id: "epinephrine",
    name: "Epinephrine",
    tradeNames: ["Adrenaline"],
    uses: ["Anaphylaxis", "Cardiac arrest", "Severe croup/stridor", "Refractory bronchospasm"],
    doses: [
      { level: "EMT", indication: "Anaphylaxis — IM", adult: "0.3–0.5 mg of 1 mg/mL IM", pediatric: "0.01 mg/kg of 1 mg/mL IM (max 0.3 mg in TN table)" },
      { level: "Paramedic", indication: "Cardiac arrest — IV/IO", adult: "0.5–1 mg of 0.1 mg/mL every 3–5 min per TN reference", pediatric: "0.01 mg/kg of 0.1 mg/mL every 3–5 min per Claiborne pediatric arrest pathway" },
      { level: "Paramedic", indication: "Croup/stridor — nebulized", adult: "Use respiratory protocol", pediatric: "1 mg of 1 mg/mL diluted with NS per Claiborne respiratory protocol" },
    ],
    cautions: ["High-alert medication: verify indication, concentration, route, and dose aloud before administration.", "IM anaphylaxis and IV/IO cardiac-arrest concentrations are different."],
    protocolLinks: [{ label: "Adult Anaphylaxis", href: "/protocols/am/am-01" }, { label: "Adult Cardiac Arrest", href: "/protocols/ac/ac-03" }, { label: "Pediatric Respiratory Distress", href: "/protocols/ar/ar-07" }],
  },
  {
    id: "fentanyl",
    name: "Fentanyl",
    tradeNames: ["Sublimaze"],
    uses: ["Analgesia", "Post-intubation analgesia"],
    doses: [{ level: "Paramedic", indication: "Analgesia", adult: "1–2 mcg/kg IV/IO/IN; titrate per pain protocol", pediatric: "0.5–2 mcg/kg IV/IO/IN per applicable protocol" }],
    cautions: ["Titrate slowly and continuously monitor ventilation, oxygenation, blood pressure, and mental status."],
    protocolLinks: [{ label: "Pain Control — Adult", href: "/protocols/up/up-11" }, { label: "Post-Intubation / BIAD", href: "/protocols/ar/ar-08" }],
  },
  {
    id: "glucagon",
    name: "Glucagon",
    tradeNames: ["GlucaGen"],
    uses: ["Hypoglycemia without vascular access", "Beta-blocker/calcium-channel blocker toxicity"],
    doses: [
      { level: "AEMT", indication: "Hypoglycemia", adult: "1–2 mg IM", pediatric: "<20 kg: 0.5 mg IM/IV; ≥20 kg: 1 mg IM/IV" },
      { level: "Paramedic", indication: "Beta-blocker/CCB toxicity", adult: "2–4 mg IV/IO/IM per toxicology protocol", pediatric: "0.1 mg/kg IV/IO/IM per toxicology protocol" },
    ],
    cautions: ["Nausea and vomiting are common; protect the airway.", "Toxicology dosing is different from hypoglycemia dosing."],
    protocolLinks: [{ label: "Diabetic Emergency — Adult", href: "/protocols/am/am-02" }, { label: "Overdose / Toxic Ingestion", href: "/protocols/te/te-07" }],
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen",
    tradeNames: ["Motrin", "Advil"],
    uses: ["Pain", "Fever"],
    doses: [{ level: "EMT", indication: "Pain or fever", adult: "600 mg PO", pediatric: ">6 months: 10 mg/kg PO" }],
    cautions: ["Screen for NSAID allergy, GI bleeding, renal disease, anticoagulants, and pregnancy-related restrictions."],
    protocolLinks: [{ label: "Pain Control — Adult", href: "/protocols/up/up-11" }, { label: "Fever", href: "/protocols/up/up-10" }],
  },
  {
    id: "lidocaine",
    name: "Lidocaine",
    tradeNames: ["Xylocaine"],
    uses: ["IO infusion pain", "Selected ventricular dysrhythmias"],
    doses: [
      { level: "Paramedic", indication: "IO pain", adult: "20–50 mg IO", pediatric: "0.5 mg/kg IO" },
      { level: "Paramedic", indication: "Ventricular dysrhythmia", adult: "1–1.5 mg/kg IV/IO; TN table max 3 mg/kg", pediatric: "1 mg/kg IV/IO" },
    ],
    cautions: ["Do not confuse the IO analgesia dose with the antiarrhythmic dose.", "Verify whether lidocaine is the locally selected antiarrhythmic."],
    protocolLinks: [{ label: "IV / IO Access", href: "/protocols/up/up-06" }, { label: "Adult VF / Pulseless VT", href: "/protocols/ac/ac-09" }],
  },
  {
    id: "magnesium",
    name: "Magnesium sulfate",
    tradeNames: [],
    uses: ["Torsades/polymorphic VT", "Eclampsia", "Severe bronchospasm"],
    doses: [
      { level: "Paramedic", indication: "Torsades", adult: "1–2 g IV/IO over 2 min", pediatric: "50 mg/kg IV/IO (max 2 g) per TN reference" },
      { level: "Paramedic", indication: "Preeclampsia/eclampsia", adult: "2–4 g IV/IO; follow OB-GYN Emergency protocol", pediatric: "Not applicable" },
      { level: "Paramedic", indication: "Severe bronchospasm", adult: "2 g IV/IO over 10–20 min per Claiborne airway protocol", pediatric: "40 mg/kg IV/IO over 10–20 min (max 2 g)" },
    ],
    cautions: ["Dose and administration rate vary by indication.", "Monitor blood pressure, respiratory status, rhythm, and reflexes when clinically relevant."],
    protocolLinks: [{ label: "Adult Polymorphic Wide-Complex Tachycardia", href: "/protocols/ac/ac-08" }, { label: "OB-GYN Emergency", href: "/protocols/ao/ao-03" }, { label: "Adult COPD / Asthma", href: "/protocols/ar/ar-04" }],
  },
  {
    id: "methylprednisolone",
    name: "Methylprednisolone",
    tradeNames: ["Solu-Medrol"],
    uses: ["Asthma/COPD", "Allergic reaction adjunct", "Adrenal crisis"],
    doses: [{ level: "Paramedic", indication: "Protocol-specific steroid use", adult: "62.5 or 125 mg IV/IO/IM", pediatric: "2 mg/kg IV/IO/IM (max 125 mg) in Claiborne respiratory/adrenal pathways" }],
    cautions: ["Steroids are adjuncts and should not delay epinephrine, bronchodilator therapy, or ventilation support."],
    protocolLinks: [{ label: "Adult COPD / Asthma", href: "/protocols/ar/ar-04" }, { label: "Pediatric Hypotension / Shock", href: "/protocols/pm/pm-03" }],
  },
  {
    id: "midazolam",
    name: "Midazolam",
    tradeNames: ["Versed"],
    uses: ["Seizure", "Sedation", "Cardioversion", "Post-intubation care"],
    doses: [{ level: "Paramedic", indication: "Protocol-specific benzodiazepine use", adult: "2–5 mg IV/IO/IM; route and repeat dosing per protocol", pediatric: "0.1 mg/kg; route, maximum, and repeat dosing per protocol" }],
    cautions: ["Dose and maximum vary by indication and route.", "Continuously monitor airway, ventilation, oxygenation, blood pressure, and mental status."],
    protocolLinks: [{ label: "Seizure", href: "/protocols/up/up-13" }, { label: "Behavioral Agitation / Sedation", href: "/protocols/up/up-18" }, { label: "Post-Intubation / BIAD", href: "/protocols/ar/ar-08" }],
  },
  {
    id: "morphine",
    name: "Morphine",
    tradeNames: ["Morphine sulfate"],
    uses: ["Analgesia", "Selected dyspnea/palliative pathways"],
    doses: [{ level: "Paramedic", indication: "Analgesia", adult: "2–4 mg slow IV/IO; repeat per applicable protocol", pediatric: "0.1–0.2 mg/kg per protocol" }],
    cautions: ["Titrate to effect and monitor ventilation, oxygenation, blood pressure, and mental status.", "Palliative eKit directions may differ and are patient-specific."],
    protocolLinks: [{ label: "Pain Control — Adult", href: "/protocols/up/up-11" }, { label: "Hospice / Palliative Care", href: "/protocols/sc/sc-03" }],
  },
  {
    id: "naloxone",
    name: "Naloxone",
    tradeNames: ["Narcan"],
    uses: ["Suspected opioid-related respiratory depression"],
    doses: [
      { level: "EMT", indication: "Authorized intranasal/autoinjector product", adult: "Use approved product and titrate to adequate ventilation", pediatric: "Use approved product and pediatric protocol" },
      { level: "Paramedic", indication: "IV/IO/IM/IN titration", adult: "0.4–2 mg; repeat and titrate to adequate ventilation", pediatric: "0.1 mg/kg; repeat per protocol" },
    ],
    cautions: ["The goal is adequate ventilation, not necessarily complete arousal.", "Expect acute withdrawal, vomiting, agitation, or recurrent respiratory depression."],
    protocolLinks: [{ label: "Overdose / Toxic Ingestion", href: "/protocols/te/te-07" }],
  },
  {
    id: "nitroglycerin",
    name: "Nitroglycerin",
    tradeNames: ["Nitrostat", "Nitrolingual"],
    uses: ["Suspected ACS", "Acute pulmonary edema"],
    doses: [
      { level: "EMT", indication: "Patient’s own prescribed medication", adult: "Assist with prescribed SL tablet/spray under the approved protocol", pediatric: "No routine pediatric dose" },
      { level: "AEMT", indication: "Authorized SL nitroglycerin", adult: "0.4 mg SL tablet or spray every 5 min per protocol", pediatric: "No routine pediatric dose" },
      { level: "Paramedic", indication: "ACS/pulmonary edema", adult: "0.4 mg SL; repeat and add paste only as directed by the applicable protocol", pediatric: "Only with Medical Control when specifically indicated" },
    ],
    cautions: ["Confirm blood pressure, recent PDE-5 inhibitor use, and preload-dependent conditions.", "Stop or withhold when the applicable protocol’s pressure threshold is reached."],
    protocolLinks: [{ label: "Acute Coronary Syndrome / STEMI", href: "/protocols/ac/ac-04" }, { label: "CHF / Acute Pulmonary Edema", href: "/protocols/ac/ac-05" }],
  },
  {
    id: "nitrous-oxide",
    name: "Nitrous oxide",
    tradeNames: ["Nitronox"],
    uses: ["Patient-controlled analgesia"],
    doses: [{ level: "AEMT", indication: "Analgesia", adult: "Patient self-administered inhaled gas", pediatric: "Use only when age, cooperation, equipment, and local policy allow" }],
    cautions: ["Patient must be able to understand instructions, hold the mask, and self-administer.", "Follow equipment-specific contraindications and scavenging requirements."],
    protocolLinks: [{ label: "Pain Control — Adult", href: "/protocols/up/up-11" }],
  },
  {
    id: "ondansetron",
    name: "Ondansetron",
    tradeNames: ["Zofran"],
    uses: ["Nausea and vomiting"],
    doses: [{ level: "Paramedic", indication: "Nausea/vomiting", adult: "2–4 mg IV/IO or 4–8 mg ODT", pediatric: "0.15 mg/kg IV/IO" }],
    cautions: ["Consider QT prolongation risk and the patient’s rhythm/medication history."],
    protocolLinks: [{ label: "Abdominal Pain / Vomiting / Diarrhea", href: "/protocols/up/up-03" }],
  },
  {
    id: "sodium-bicarbonate",
    name: "Sodium bicarbonate",
    tradeNames: [],
    uses: ["Selected toxicologic or metabolic emergencies", "Hyperkalemia"],
    doses: [{ level: "Paramedic", indication: "Protocol-specific use", adult: "1 mEq/kg IV/IO when indicated; repeat only per protocol", pediatric: "Use age-appropriate concentration; 1 mEq/kg IV/IO when indicated" }],
    cautions: ["Not a routine cardiac-arrest medication.", "Confirm indication, concentration, ventilation, and compatibility before administration."],
    protocolLinks: [{ label: "Dialysis / Renal Failure", href: "/protocols/am/am-03" }, { label: "Overdose / Toxic Ingestion", href: "/protocols/te/te-07" }],
  },
];
