import type {
  ProviderLevel,
  ProtocolActionLink,
  ProtocolCareModule,
  ProtocolFlowNode,
  StructuredProtocolContent,
} from "../lib/protocols/structured-content";

const ALL_LEVELS: ProviderLevel[] = ["EMT", "AEMT", "Paramedic"];

type PediatricCardiacInput = {
  id: string;
  title: string;
  sourcePdf: string;
  pages: number;
  revisionDate: string;
  overview: string[];
  flow: ProtocolFlowNode[];
  emt: string[];
  aemt: string[];
  paramedic: string[];
  indications: string[];
  treatmentSteps?: string[];
  medications?: { name: string; dose: string; notes?: string[] }[];
  warnings?: string[];
  clinicalPearls?: string[];
  actionLinks?: ProtocolActionLink[];
  reviewStatus?: "Draft" | "Reviewed" | "Approved";
  reviewFlags?: string[];
  lastVerifiedDate?: string;
};

function pediatricCardiacProtocol(
  input: PediatricCardiacInput
): StructuredProtocolContent {
  const careModules: ProtocolCareModule[] = [
    {
      title: "Provider-Level Actions",
      summary:
        "Use a length- or weight-based pediatric resuscitation system and perform immediate lifesaving care without delaying oxygenation, ventilation, CPR, or defibrillation.",
      levels: [
        { level: "EMT", actions: input.emt },
        { level: "AEMT", actions: input.aemt },
        { level: "Paramedic", actions: input.paramedic },
      ],
    },
  ];

  return {
    id: input.id,
    title: input.title,
    categoryId: "pc",
    category: "Pediatric Cardiac",
    overview: input.overview,
    flow: input.flow,
    careModules,
    indications: input.indications,
    contraindications: [],
    assessment: [],
    treatmentSteps: input.treatmentSteps ?? [],
    medications: input.medications ?? [],
    warnings: input.warnings ?? [],
    clinicalPearls: input.clinicalPearls ?? [],
    specialPopulations: [],
    actionLinks: input.actionLinks ?? [],
    references: [
      "Claiborne County EMS approved protocol manual.",
      "Current Tennessee EMS scope of practice and Claiborne County standing orders control when provider scope differs from the imported source.",
    ],
    sourcePdf: input.sourcePdf,
    sourcePages: { start: 1, end: input.pages },
    revisionDate: input.revisionDate,
    lastVerifiedDate: input.lastVerifiedDate ?? "2026-07-29",
    reviewStatus: input.reviewStatus ?? "Reviewed",
    reviewFlags: input.reviewFlags ?? [
      "Medical-director approval is required before clinical release.",
      "Verify all pediatric doses, energy settings, and advanced procedures against the current length/weight system and Claiborne County standing orders.",
      "The original imported PDF remains available for source comparison.",
    ],
  };
}

export const structuredPediatricCardiacProtocols: StructuredProtocolContent[] = [
  pediatricCardiacProtocol({
    id: "pc-01",
    title: "Pediatric Asystole / PEA",
    sourcePdf: "/protocols/claiborne/pc-01-pediatric-asytole-pea-protocol.pdf",
    pages: 2,
    revisionDate: "2025-09-01",
    overview: [
      "For infants and children after the newly born period, asystole and PEA are commonly the end result of hypoxia or respiratory failure; ventilation and high-quality CPR are central interventions.",
      "Search aggressively for reversible causes while minimizing interruptions in compressions.",
    ],
    indications: [
      "Pediatric patient in pulseless arrest with asystole or pulseless electrical activity.",
    ],
    flow: [
      { title: "Pulseless Arrest", text: "Confirm apnea/pulselessness, DNR/MOST, and obvious-death criteria; apply monitor/AED and check leads before treating apparent asystole.", levels: ALL_LEVELS, tone: "start" },
      { title: "High-Quality CPR", text: "100–120/min • depth at least ⅓ chest AP diameter • full recoil • pauses under 10 sec • change compressor every 2 min.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Oxygenate + Ventilate", text: "BVM first; 15:2 with two rescuers or 30:2 with one rescuer when no advanced airway; avoid hyperventilation.", levels: ALL_LEVELS, tone: "action" },
      { title: "IV/IO + Early Epinephrine", text: "Obtain rapid vascular access without delaying CPR; give 0.01 mg/kg IV/IO every 3–5 min.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Reversible Cause?", text: "Hypoxia • hypovolemia • acidosis • temperature • metabolic/electrolyte cause • tension • toxins • thrombosis.", levels: ALL_LEVELS, tone: "decision" },
      { title: "ROSC?", text: "Yes: PC-08 Pediatric Post-Resuscitation. No: continue 2-min cycles, reassessment, and treatment of cause.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Begin continuous high-quality CPR, apply AED/monitor, provide oxygenation/ventilation, and use 15:2 with two rescuers or 30:2 with one rescuer when no advanced airway is present.",
      "Use a pediatric length-based resuscitation system, change compressors every 2 minutes, and limit rhythm/pulse checks to less than 10 seconds.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access, weight-based epinephrine, glucose analysis, crystalloid when hypovolemia is suspected, and authorized advanced airway support.",
      "Do not delay CPR or ventilation for repeated IV attempts; use IO promptly when IV access is not rapidly available.",
    ],
    paramedic: [
      "Perform all prior care plus rhythm confirmation, continuous waveform EtCO₂, advanced reversible-cause treatment, and post-ROSC transition.",
      "Do not interrupt compressions to intubate; use effective BVM or an authorized BIAD when it reduces pauses.",
    ],
    medications: [
      { name: "Epinephrine 0.1 mg/mL (1:10,000)", dose: "0.01 mg/kg IV/IO as early as possible; maximum single dose 1 mg; repeat every 3–5 minutes" },
      { name: "Normal saline", dose: "10–20 mL/kg IV/IO only when hypovolemia is suspected; reassess perfusion, lungs, and suspected cause after each bolus" },
    ],
    treatmentSteps: [
      "Asystole/PEA is nonshockable. Continue CPR and treat reversible causes; defibrillate only if the rhythm changes to VF/pulseless VT.",
      "With an advanced airway, use continuous compressions and ventilate 20–30/min (1 breath every 2–3 seconds). Avoid hyperventilation.",
      "Check glucose, temperature, and likely reversible causes during CPR: hypoxia, hypovolemia, acidosis, hypo/hyperkalemia or metabolic disturbance, hypothermia, tension pneumothorax, tamponade, toxins, and thrombosis.",
      "Use continuous waveform EtCO₂ when available. Use trends to improve CPR; an unexpected sustained increase may indicate ROSC, but do not use a single EtCO₂ value alone to make termination decisions.",
      "Perform rhythm/pulse checks no more than every 2 minutes and keep each pause under 10 seconds.",
      "After ROSC, move immediately to PC-08 Pediatric Post-Resuscitation Care; maintain airway support, oxygenation, ventilation, glucose/temperature management, blood pressure support, and early notification.",
    ],
    actionLinks: [
      { label: "AR-05 Pediatric Airway", description: "Open for pediatric BVM and airway support.", href: "/protocols/ar/ar-05", kind: "protocol" },
      { label: "AR-06 Pediatric Failed Airway", description: "Open for ineffective oxygenation/ventilation or unsafe further airway attempts.", href: "/protocols/ar/ar-06", kind: "protocol" },
      { label: "PC-02 Pediatric Bradycardia / Poor Perfusion", description: "Open if a pulse returns but bradycardia with poor perfusion persists.", href: "/protocols/pc/pc-02", kind: "protocol" },
      { label: "PC-08 Pediatric Post-Resuscitation Care", description: "Open immediately after ROSC.", href: "/protocols/pc/pc-08", kind: "protocol" },
      { label: "AO-02 Newly Born", description: "Open for neonatal resuscitation immediately after birth.", href: "/protocols/ao/ao-02", kind: "protocol" },
    ],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: [
      "Clinical pediatric nonshockable-arrest recognition, CPR/ventilation, epinephrine, vascular access, fluid safeguards, reversible causes, ROSC transition, and linked pathways approved by the Claiborne EMS medical director on August 14, 2026.",
      "Routine calcium and sodium bicarbonate are excluded unless a specific indication exists.",
    ],
    warnings: [
      "Do not hyperventilate or pause compressions for endotracheal intubation.",
      "IV/IO access and medications are secondary to CPR and ventilation.",
      "Do not routinely give calcium or sodium bicarbonate unless a specific indication exists.",
      "Do not delay transport for repeated airway attempts.",
    ],
    clinicalPearls: [
      "Pediatric nonshockable arrest is often hypoxic/asphyxial; effective ventilation is a central intervention.",
      "Use waveform EtCO₂ trends to improve CPR quality and detect possible ROSC, not as a stand-alone termination decision.",
    ],
  }),

  pediatricCardiacProtocol({
    id: "pc-02",
    title: "Pediatric Bradycardia With Poor Perfusion",
    sourcePdf: "/protocols/claiborne/pc-02-pediatric-bradycardia-poor-perfusion-protocol.pdf",
    pages: 2,
    revisionDate: "2026-02-15",
    overview: [
      "For infants and children after the newly born period, pediatric bradycardia is usually caused by hypoxia; correct airway, oxygenation, ventilation, and reversible causes before medication.",
      "Begin CPR when heart rate remains below 60/min with poor perfusion despite effective oxygenation and ventilation.",
    ],
    indications: [
      "Pediatric patient with bradycardia and hypotension, altered mental status, shock, poor perfusion, or impending arrest.",
    ],
    flow: [
      { title: "Bradycardia + Poor Perfusion", text: "HR <60 with hypotension, AMS, shock, weak pulses, or other poor perfusion.", levels: ALL_LEVELS, tone: "start" },
      { title: "Airway / Oxygenation First", text: "Correct respiratory failure, obstruction, hypoxia, apnea/hypoventilation, hypoglycemia, hypothermia, acidosis, toxins, and other reversible causes.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "HR Still <60 + Poor Perfusion?", text: "After effective oxygenation and ventilation: begin CPR immediately, even with a pulse.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Vascular Access + Epinephrine", text: "Obtain rapid IV/IO without delaying CPR; give 0.01 mg/kg IV/IO every 3–5 min while compromise persists.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Vagal / AV-Block Cause?", text: "Atropine only for increased vagal tone or primary AV block; consider pacing for selected refractory conduction disease.", levels: ["Paramedic"], tone: "decision" },
      { title: "Reassess + Transport", text: "Treat cause, monitor rhythm/perfusion, transition to arrest/ROSC pathway as needed, and notify pediatric-capable destination.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Open and support the airway, oxygenate and ventilate effectively, assess glucose when authorized, and begin CPR for persistent HR below 60 with poor perfusion.",
      "Check pulse and response approximately every 2 minutes and transition immediately to the arrest pathway if pulseless.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access, weight-based epinephrine, glucose analysis, crystalloid when hypovolemia is suspected, and authorized advanced airway support.",
      "Do not delay CPR or ventilation for repeated IV attempts; use IO promptly when IV access is not rapidly available.",
    ],
    paramedic: [
      "Perform all prior care plus cardiac monitoring, atropine for increased vagal tone or primary AV block, and transcutaneous pacing for selected refractory conduction disease.",
      "Consider immediate pacing for complete heart block or sinus-node dysfunction with persistent cardiopulmonary compromise when vascular access is not immediately available.",
      "If pacing is used in a conscious child, provide age-appropriate analgesia/sedation with Medical Control when time permits; do not delay life-saving pacing in extremis.",
    ],
    medications: [
      { name: "Epinephrine 0.1 mg/mL (1:10,000)", dose: "0.01 mg/kg IV/IO; maximum single dose 1 mg; repeat every 3–5 minutes while bradycardia with poor perfusion persists" },
      { name: "Normal saline", dose: "10–20 mL/kg IV/IO only when hypovolemia is suspected; reassess perfusion, lungs, and cause after each bolus" },
      { name: "Atropine", dose: "0.02 mg/kg IV/IO for increased vagal tone or primary AV block; minimum 0.1 mg; maximum single dose 0.5 mg child / 1 mg adolescent; may repeat once; maximum total 1 mg child / 2 mg adolescent" },
    ],
    treatmentSteps: [
      "Treat the child, not the number: bradycardia is an emergency when associated with hypotension, altered mental status, shock, weak pulses, or other poor perfusion.",
      "If HR remains below 60/min with poor perfusion despite effective oxygenation and ventilation, start high-quality CPR immediately even if a pulse is still present.",
      "Use continuous ECG, SpO₂, blood pressure, and waveform EtCO₂ after an advanced airway. Obtain a 12-lead if it does not delay resuscitation.",
      "Atropine is not a treatment for hypoxic bradycardia. Use it only for increased vagal tone or primary AV block.",
      "If the child becomes pulseless, transition immediately to PC-01/PC-04 Pediatric Pulseless Arrest. After sustained ROSC, move to PC-08 Pediatric Post-Resuscitation Care.",
    ],
    actionLinks: [
      { label: "AR-05 Pediatric Airway", description: "Open for pediatric BVM and airway support.", href: "/protocols/ar/ar-05", kind: "protocol" },
      { label: "PC-01 Pediatric Asystole / PEA", description: "Open for nonshockable pulseless arrest.", href: "/protocols/pc/pc-01", kind: "protocol" },
      { label: "PC-04 Pediatric Pulseless Arrest", description: "Open immediately if the child becomes pulseless.", href: "/protocols/pc/pc-04", kind: "protocol" },
      { label: "PC-08 Pediatric Post-Resuscitation Care", description: "Open after sustained ROSC.", href: "/protocols/pc/pc-08", kind: "protocol" },
      { label: "AO-02 Newly Born", description: "Open for neonatal resuscitation immediately after birth.", href: "/protocols/ao/ao-02", kind: "protocol" },
    ],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: [
      "Clinical pediatric bradycardia recognition, oxygenation/ventilation priority, CPR threshold, epinephrine, fluid safeguards, atropine, pacing, arrest transition, and linked pathways approved by the Claiborne EMS medical director on August 14, 2026.",
    ],
    warnings: [
      "Do not delay oxygenation and ventilation for vascular access or medication.",
      "Atropine is not a treatment for hypoxic bradycardia.",
      "Atropine may be ineffective or harmful after cardiac transplantation and may cause paradoxical bradycardia.",
      "Interpret the rate in clinical context; asymptomatic bradycardia requires monitoring and treatment of the cause, not automatic medication.",
    ],
    clinicalPearls: [
      "Bradycardia associated with poor perfusion may be a harbinger of pediatric cardiac arrest; ventilation and timely CPR are central interventions.",
      "Transcutaneous pacing is for selected refractory conduction disease, not routine hypoxic bradycardia.",
    ],
  }),

  pediatricCardiacProtocol({
    id: "pc-03",
    title: "Pediatric Pulmonary Edema / CHF",
    sourcePdf: "/protocols/claiborne/pc-03-pediatric-chf-pulmonary-edema-protocol.pdf",
    pages: 1,
    revisionDate: "2026-08-14",
    overview: [
      "For infants and children after the newly born period with suspected acute heart failure, pulmonary edema, or cardiogenic shock. Congenital anatomy and baseline physiology can make usual findings and oxygen targets misleading.",
      "Support airway, breathing, and perfusion; avoid routine fluids, bronchodilators, diuretics, and vasoactive medications without a specific indication and early Medical Control consultation.",
    ],
    indications: [
      "Infant or child with known or suspected cardiac disease plus respiratory distress, crackles/rales, poor feeding, cyanosis, edema, orthopnea, shock, hepatomegaly, or signs of poor perfusion.",
    ],
    flow: [
      { title: "Suspected Cardiac Cause", text: "Assess respiratory distress, perfusion, mental status, cardiac history/surgeries, baseline SpO₂, home medications, fluid restriction, feeding/urine output, fever, and caregiver-reported baseline.", levels: ALL_LEVELS, tone: "start" },
      { title: "Airway / Breathing Support", text: "Use position of comfort, oxygen and ventilation support for distress. Use gentle positive pressure and contact Medical Control early for known complex congenital heart disease.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Known Baseline Different?", text: "Do not force a normal SpO₂ in cyanotic or single-ventricle disease; use the child's documented/caregiver-reported baseline and Medical Control guidance.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Monitor + Identify Cause", text: "Continuous ECG, SpO₂, frequent BP, respiratory reassessment, and EtCO₂ when ventilatory support is used. Consider respiratory, infectious, cardiac, and anaphylactic causes.", levels: ALL_LEVELS, tone: "action" },
      { title: "Volume Overload / Shock?", text: "No routine fluid bolus. If hypovolemia is genuinely suspected, use small reassessed aliquots with Medical Control. Diuretic, vasodilator, analgesia, or vasoactive treatment requires Medical Control.", levels: ["AEMT", "Paramedic"], tone: "decision" },
      { title: "Pediatric-Cardiac Destination", text: "Notify early, bring the caregiver's cardiac emergency plan/records when available, and transport without delaying for a medication trial.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Position for comfort, support airway and ventilation, monitor SpO₂ and frequent vital signs, and obtain a focused cardiac history from the caregiver.",
      "Do not assume wheeze is asthma or treat it with albuterol unless bronchospasm is strongly supported.",
      "Identify and communicate the child's usual oxygen saturation, anatomy/surgeries, home medication schedule, and recent feeding/urine output.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access when indicated, ECG/EtCO₂ monitoring when available, and early Medical Control consultation.",
      "Do not give a routine fluid bolus. If hypovolemia is genuinely suspected, use cautious small aliquots with reassessment and Medical Control guidance.",
    ],
    paramedic: [
      "Perform all prior care plus cardiac/12-lead monitoring when it does not delay care, careful ventilatory support, and Medical-Control-directed therapy based on the child's anatomy and physiology.",
      "Use furosemide only when volume overload is established or a known diuretic plan supports it. Do not empirically diurese undifferentiated shock or poor perfusion.",
      "Use vasodilator, vasoactive, or analgesic therapy only with Medical Control; treat shock or dysrhythmia under the applicable pediatric protocol.",
    ],
    medications: [
      { name: "Furosemide", dose: "1 mg/kg IV/IO only with Medical Control when volume overload is established or a known diuretic plan supports use" },
      { name: "Fentanyl", dose: "1 mcg/kg IV/IO; maximum single dose 50 mcg only with Medical Control for pain/anxiety after airway and perfusion are stabilized" },
      { name: "Nitroglycerin / vasoactive medication", dose: "Agent, dose, and indication determined by Medical Control" },
    ],
    treatmentSteps: [
      "Pediatric acute heart failure may reflect congenital heart disease, myocarditis/cardiomyopathy, dysrhythmia, pulmonary hypertension, infection, or another cause; tailor treatment to physiology rather than to wheeze or crackles alone.",
      "Avoid routine albuterol, fluid, or diuretic therapy without an identified indication. Excess fluid can worsen pulmonary edema, and usual saturation targets may be inappropriate for cyanotic or single-ventricle disease.",
      "Use positive-pressure ventilation carefully in known complex congenital heart disease and seek early Medical Control guidance.",
      "If anaphylaxis is clinically suspected, open PM-01 Pediatric Anaphylaxis. If severe bradycardia or pulseless arrest develops, move immediately to the appropriate pediatric cardiac pathway.",
    ],
    actionLinks: [
      { label: "AR-05 Pediatric Airway", description: "Open for pediatric BVM and airway support.", href: "/protocols/ar/ar-05", kind: "protocol" },
      { label: "AR-07 Pediatric Respiratory Distress", description: "Open when respiratory pathology or bronchospasm is suspected.", href: "/protocols/ar/ar-07", kind: "protocol" },
      { label: "PM-01 Pediatric Anaphylaxis", description: "Open immediately when anaphylaxis is suspected.", href: "/protocols/pm/pm-01", kind: "protocol" },
      { label: "PC-02 Pediatric Bradycardia / Poor Perfusion", description: "Open for bradycardia with poor perfusion.", href: "/protocols/pc/pc-02", kind: "protocol" },
      { label: "PC-04 Pediatric Pulseless Arrest", description: "Open immediately if the child becomes pulseless.", href: "/protocols/pc/pc-04", kind: "protocol" },
    ],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: [
      "Clinical pediatric acute-heart-failure recognition, congenital-physiology safeguards, oxygenation/ventilation approach, monitoring, fluid and medication safeguards, transport planning, and linked pathways approved by the Claiborne EMS medical director on August 14, 2026.",
    ],
    warnings: [
      "Do not force a normal SpO₂ in cyanotic or single-ventricle disease without Medical Control guidance.",
      "Do not give routine albuterol, fluid, furosemide, vasodilator, or vasoactive treatment without an identified indication and Medical Control direction.",
      "Do not delay transport for a medication trial or repeated airway attempts.",
      "Pediatric CHF treatment varies with the underlying congenital lesion; obtain Medical Control early.",
    ],
    clinicalPearls: [
      "Caregiver knowledge of baseline oxygen saturation, anatomy, medications, and emergency plans can be critical to safe prehospital decisions.",
      "Children with heart disease may wheeze or present with respiratory symptoms; evaluate perfusion and cardiac history before assuming asthma.",
    ],
  }),

  pediatricCardiacProtocol({
    id: "pc-04",
    title: "Pediatric Pulseless Arrest",
    sourcePdf: "/protocols/claiborne/pc-04-pediatric-pulseless-arrest-protocol.pdf",
    pages: 2,
    revisionDate: "2025-09-01",
    overview: [
      "Use this routing protocol for pediatric pulseless arrest from 3 days through 15 years, then follow the shockable or nonshockable rhythm pathway.",
      "Oxygenation and ventilation are especially important because most pediatric arrests begin with respiratory failure or hypoxia.",
    ],
    indications: [
      "Pulseless patient age 3 days through 15 years.",
      "Use Newly Born protocol through 3 days of age and Adult Cardiac Arrest at age 16 years or older.",
    ],
    flow: [
      { title: "Pediatric Arrest", text: "Confirm pulselessness, age pathway, DNR/MOST, and obvious-death criteria.", levels: ALL_LEVELS, tone: "start" },
      { title: "High-Quality CPR + Ventilation", text: "100–120/min • ⅓ AP depth • 15:2 without advanced airway • avoid pauses.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "AED / Monitor", text: "Apply immediately without delaying CPR or airway support.", levels: ALL_LEVELS, tone: "action" },
      { title: "Shockable Rhythm?", text: "Yes: VF/pulseless VT. No: asystole/PEA.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Opioid Cause?", text: "Give naloxone when suspected while continuing CPR, oxygenation, and ventilation.", levels: ["AEMT", "Paramedic"], tone: "decision" },
      { title: "ROSC?", text: "Transition immediately to Pediatric Post-Resuscitation and destination planning.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Begin high-quality CPR and age-appropriate ventilation, apply AED, and route to the shockable or nonshockable algorithm.",
      "Do not delay CPR, ventilation, or defibrillation for advanced procedures.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access, protocol medications, glucose assessment, and authorized advanced airway support.",
    ],
    paramedic: [
      "Perform all prior care plus rhythm-specific manual treatment, reversible-cause management, continuous EtCO₂, and post-ROSC transition.",
    ],
    medications: [
      { name: "Naloxone", dose: "0.1 mg/kg IV/IO/IM/IN/ETT when opioid cause is suspected; maximum 4 mg" },
    ],
    warnings: [
      "Naloxone does not replace ventilation or high-quality CPR.",
      "Do not interrupt compressions for endotracheal intubation; consider BIAD when it minimizes pauses.",
    ],
  }),

  pediatricCardiacProtocol({
    id: "pc-05",
    title: "Pediatric Narrow-Complex Tachycardia",
    sourcePdf: "/protocols/claiborne/pc-05-pediatrictachycardia-narrow-complex.pdf",
    pages: 2,
    revisionDate: "2026-05-01",
    overview: [
      "Interpret tachycardia in clinical context and distinguish sinus tachycardia from SVT.",
      "Unstable tachycardia requires prompt synchronized cardioversion; sedation must not delay the shock.",
    ],
    indications: [
      "Pediatric narrow-complex tachycardia at or below 0.09 seconds with suspected SVT or serious symptoms.",
    ],
    flow: [
      { title: "Narrow Tachycardia", text: "Assess perfusion, mental status, respiratory status, BP, onset, P waves, and R-R variability.", levels: ALL_LEVELS, tone: "start" },
      { title: "Unstable?", text: "AMS • shock • hypotension • respiratory failure • sudden collapse.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Synchronized Cardioversion", text: "0.5–1 J/kg; repeat at 2 J/kg. Consider sedation without delaying shock.", levels: ["Paramedic"], tone: "urgent" },
      { title: "Stable + Regular?", text: "No: Medical Control. Yes: distinguish sinus tachycardia from probable SVT.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Probable SVT", text: "Vagal maneuvers, rapid adenosine, and continuous rhythm documentation.", levels: ["Paramedic"], tone: "action" },
      { title: "Reassess + Transport", text: "Treat underlying cause, monitor continuously, and notify destination.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Support airway/oxygenation, obtain vital signs and rhythm strip when available, treat fever/pain/hypovolemia/hypoxia, and identify serious signs.",
      "Keep the caregiver with the child when possible and prepare for immediate cardioversion if deterioration occurs.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access and supportive treatment of the underlying cause within standing orders.",
    ],
    paramedic: [
      "Perform all prior care plus synchronized cardioversion for instability and vagal maneuvers/adenosine for stable regular SVT.",
      "Document rhythm before and after each intervention; obtain 12-lead when stable without delaying treatment.",
    ],
    medications: [
      { name: "Adenosine", dose: "0.1 mg/kg rapid IV/IO, maximum 6 mg; repeat 0.2 mg/kg, maximum 12 mg" },
      { name: "Midazolam", dose: "0.1–0.2 mg/kg IV/IO/IN for cardioversion; maximum single 2 mg, maximum total 5 mg", notes: ["Do not delay cardioversion."] },
    ],
    treatmentSteps: [
      "Sinus tachycardia usually has visible P waves and variable R-R intervals; infant rate usually below 220 and child below 180.",
      "SVT is usually abrupt, regular, with absent/abnormal P waves; infant rate often above 220 and child above 180.",
    ],
    warnings: [
      "Do not delay synchronized cardioversion for sedation in an unstable child.",
      "Continuous pulse oximetry is required for SVT when available.",
      "If pulseless at any time, move immediately to Pediatric Pulseless Arrest.",
    ],
  }),

  pediatricCardiacProtocol({
    id: "pc-06",
    title: "Pediatric Wide-Complex Tachycardia",
    sourcePdf: "/protocols/claiborne/pc-06-pediatric-tachycardia-wide-complex-protocol.pdf",
    pages: 2,
    revisionDate: "2026-05-01",
    overview: [
      "Treat unstable wide-complex tachycardia with synchronized cardioversion.",
      "In a stable child, adenosine is considered only when the rhythm is regular and monomorphic; expert consultation is recommended for antiarrhythmics.",
    ],
    indications: [
      "Pediatric tachycardia with QRS wider than 0.09 seconds and suspected VT, SVT with aberrancy, or polymorphic tachycardia.",
    ],
    flow: [
      { title: "Wide Tachycardia", text: "Assess perfusion, mental status, respiratory status, BP, QRS pattern, and underlying cause.", levels: ALL_LEVELS, tone: "start" },
      { title: "Unstable?", text: "AMS • shock • hypotension • respiratory failure • sudden collapse.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Synchronized Cardioversion", text: "0.5–1 J/kg; repeat at 2 J/kg. Sedation must not delay treatment.", levels: ["Paramedic"], tone: "urgent" },
      { title: "Stable + Regular?", text: "Irregular/polymorphic: Medical Control. Regular: determine monomorphic pattern.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Regular Monomorphic", text: "Consider adenosine; obtain expert consultation for antiarrhythmic strategy.", levels: ["Paramedic"], tone: "action" },
      { title: "Reassess + Transport", text: "Continuous monitoring, rhythm strips, cause treatment, and early notification.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Support airway/oxygenation, identify serious signs, obtain rhythm strip when available, treat reversible causes, and prepare for cardioversion.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access and supportive treatment within current standing orders.",
    ],
    paramedic: [
      "Perform all prior care plus synchronized cardioversion for instability and adenosine only for a stable, regular, monomorphic wide-complex rhythm.",
      "Consult Medical Control before amiodarone or procainamide; never administer both together.",
    ],
    medications: [
      { name: "Adenosine", dose: "0.1 mg/kg rapid IV/IO, maximum 6 mg; repeat 0.2 mg/kg, maximum 12 mg", notes: ["Only for a regular monomorphic rhythm."] },
      { name: "Midazolam", dose: "0.1–0.2 mg/kg IV/IO/IN for cardioversion; maximum single 2 mg, maximum total 5 mg", notes: ["Do not delay cardioversion."] },
      { name: "Amiodarone", dose: "5 mg/kg IV/IO over 20–60 minutes with expert consultation" },
      { name: "Procainamide", dose: "15 mg/kg IV/IO over 30–60 minutes with expert consultation" },
    ],
    warnings: [
      "Do not give amiodarone and procainamide together.",
      "Do not use adenosine for an irregular or polymorphic wide-complex rhythm.",
      "If pulseless at any time, move immediately to Pediatric Pulseless Arrest.",
    ],
  }),

  pediatricCardiacProtocol({
    id: "pc-07",
    title: "Pediatric VF / Pulseless VT",
    sourcePdf: "/protocols/claiborne/pc-07-pediatric-vf-pulseless-vt-protocol.pdf",
    pages: 2,
    revisionDate: "2025-09-01",
    overview: [
      "High-quality CPR and early defibrillation are the central treatments for pediatric VF/pulseless VT.",
      "Charge during compressions and resume CPR immediately after every shock without an immediate pulse check.",
    ],
    indications: [
      "Pediatric pulseless arrest with ventricular fibrillation or pulseless ventricular tachycardia.",
    ],
    flow: [
      { title: "VF / Pulseless VT", text: "Begin continuous CPR, oxygenation/ventilation, and attach defibrillator.", levels: ALL_LEVELS, tone: "start" },
      { title: "Shock 2 J/kg", text: "Defibrillate and immediately resume CPR for 2 minutes.", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Shock 4 J/kg", text: "Resume CPR immediately; obtain IV/IO and give epinephrine.", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Refractory Rhythm", text: "Subsequent shocks at least 4 J/kg, maximum 10 J/kg or adult dose.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Antiarrhythmic + Causes", text: "Use agency-specific antiarrhythmic; magnesium for torsades; treat reversible causes.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "ROSC?", text: "Yes: Pediatric Post-Resuscitation. No: continue drug-shock cycles.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Begin high-quality CPR and ventilation, apply AED, minimize pauses, and resume compressions immediately after every shock.",
    ],
    aemt: [
      "Perform all EMT care plus manual defibrillation when authorized, IV/IO access, epinephrine, and magnesium within current standing orders.",
    ],
    paramedic: [
      "Perform all prior care plus manual defibrillation, agency-specific antiarrhythmic treatment, EtCO₂-guided CPR improvement, and reversible-cause management.",
      "Charge during compressions and minimize the peri-shock pause.",
    ],
    medications: [
      { name: "Epinephrine 1:10,000", dose: "0.01 mg/kg IV/IO every 3–5 minutes; maximum 1 mg" },
      { name: "Magnesium sulfate", dose: "40 mg/kg IV/IO over 2–3 minutes; maximum 2 g" },
      { name: "Agency-specific antiarrhythmic", dose: "Use current Claiborne pediatric shockable-arrest standing order" },
    ],
    warnings: [
      "Do not pause CPR after a shock to check a pulse; resume immediately until the next planned rhythm check.",
      "Do not interrupt compressions for endotracheal intubation.",
    ],
  }),

  pediatricCardiacProtocol({
    id: "pc-08",
    title: "Pediatric Post-Resuscitation",
    sourcePdf: "/protocols/claiborne/pc-08-pediatric-post-resuscitation-protocol.pdf",
    pages: 2,
    revisionDate: "2025-09-01",
    overview: [
      "After ROSC, prevent recurrent arrest and secondary neurologic or organ injury through controlled oxygenation, ventilation, perfusion, glucose, temperature, and rhythm management.",
      "Choose a destination capable of pediatric intensive care and the child's likely cardiac, neurologic, and temperature-management needs.",
    ],
    indications: [
      "Pediatric patient with return of spontaneous circulation after respiratory or cardiac arrest.",
    ],
    flow: [
      { title: "ROSC", text: "Confirm pulse/perfusion and immediately stabilize airway, breathing, circulation, and temperature.", levels: ALL_LEVELS, tone: "start" },
      { title: "Optimize Oxygenation", text: "Target SpO₂ 92–98%; use age-appropriate ventilation and avoid hyperventilation.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Support Perfusion", text: "Age-based BP target • IV/IO • glucose • fluid/vasopressor pathway as indicated.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Persistent Arrhythmia?", text: "Follow rhythm-specific pathway and continue antiarrhythmic used during arrest when indicated.", levels: ["Paramedic"], tone: "decision" },
      { title: "Pain + Sedation", text: "Treat pain first; maintain post-intubation monitoring and ventilation.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Pediatric-Capable Destination", text: "Early notification, frequent reassessment, and Medical Control consultation.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Maintain airway and age-appropriate ventilation, titrate oxygen to SpO₂ 92–98%, monitor vital signs frequently, check glucose when authorized, and prevent temperature extremes.",
      "Elevate the head 10–20 degrees when feasible and reassess for recurrent arrest.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access, glucose correction, age-based hypotension treatment, and authorized post-airway analgesia/sedation.",
    ],
    paramedic: [
      "Perform all prior care plus cardiac/12-lead and continuous EtCO₂ monitoring, rhythm-specific treatment, vasopressor support, and advanced post-intubation management.",
      "Select a destination with pediatric ICU, cardiology, neurology, and temperature-management capabilities when available.",
    ],
    treatmentSteps: [
      "Minimum systolic targets from the imported source: newborn–31 days at least 60 mmHg; 1 month–1 year at least 70 mmHg; older than 1 year at least 70 + (2 × age) mmHg.",
      "Target EtCO₂ near 35–45 mmHg but do not hyperventilate to force the number.",
      "Use approximately 6 mL/kg tidal volume and keep airway pressures below 30 cmH₂O when mechanically ventilated, individualized to the patient.",
    ],
    warnings: [
      "Hyperventilation can cause hypotension and recurrent arrest after ROSC.",
      "A paralyzed or ventilated patient may be awake and in pain; treat pain before anxiety and maintain sedation.",
      "Post-ROSC condition can change rapidly; reassess continuously.",
    ],
  }),
];
