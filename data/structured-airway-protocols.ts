import type {
  ProviderLevel,
  ProtocolActionLink,
  ProtocolCareModule,
  ProtocolFlowNode,
  StructuredProtocolContent,
} from "../lib/protocols/structured-content";

const ALL_LEVELS: ProviderLevel[] = ["EMT", "AEMT", "Paramedic"];

type AirwayProtocolInput = {
  id: string;
  title: string;
  sourcePdf: string;
  pages: number;
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

function airwayProtocol(
  input: AirwayProtocolInput
): StructuredProtocolContent {
  const careModules: ProtocolCareModule[] = [
    {
      title: "Provider-Level Actions",
      summary:
        "Use the least invasive effective airway intervention and escalate only when oxygenation or ventilation remains inadequate.",
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
    categoryId: "ar",
    category: "Airway & Respiratory",
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
    revisionDate: "2025-09-01",
    lastVerifiedDate: input.lastVerifiedDate ?? "2026-07-29",
    reviewStatus: input.reviewStatus ?? "Reviewed",
    reviewFlags: input.reviewFlags ?? [
      "Medical-director approval is required before clinical release.",
      "Verify medication dosing, advanced airway authorization, and invasive procedures against current Claiborne County standing orders.",
      "The original imported PDF remains available for source comparison.",
    ],
  };
}

export const structuredAirwayProtocols: StructuredProtocolContent[] = [
  airwayProtocol({
    id: "ar-01",
    title: "Adult Airway",
    sourcePdf: "/protocols/claiborne/ar-01-adult-airway-protocol.pdf",
    pages: 2,
    overview: [
      "A secure airway is one that provides effective oxygenation and ventilation, not simply an advanced device.",
      "Begin with positioning, suction, basic adjuncts, and effective BVM ventilation before escalating.",
    ],
    indications: [
      "Adult with actual or threatened airway obstruction, inadequate oxygenation, inadequate ventilation, or inability to protect the airway.",
    ],
    flow: [
      { title: "Airway / Breathing Adequate?", text: "Assess rate, effort, patency, oxygenation, ventilation, and mental status.", levels: ALL_LEVELS, tone: "start" },
      { title: "Basic Maneuvers First", text: "Position • suction • OPA/NPA • two-person BVM ± PEEP.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Foreign-Body Obstruction?", text: "Use age-appropriate obstruction procedure and direct visualization when authorized.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Support Still Needed?", text: "Oxygen • BVM • NIPPV • BIAD • intubation according to need and scope.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Oxygenation / Ventilation Effective?", text: "Maintain SpO₂ at least 92%; if ineffective, move to failed-airway pathway.", levels: ALL_LEVELS, tone: "action" },
      { title: "Confirm + Reassess", text: "Waveform EtCO₂ after ETT/BIAD, secure device, monitor, and notify destination.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Position and open the airway, suction, insert basic adjuncts, provide oxygen, and perform effective two-person BVM ventilation with PEEP when indicated.",
      "Continue basic airway care when it maintains adequate oxygenation and ventilation; do not delay transport solely to place an advanced airway.",
    ],
    aemt: [
      "Perform all EMT care plus authorized BIAD placement and continuous waveform capnography once available. Endotracheal intubation is not included as an AEMT procedure in this protocol.",
      "After a failed intubation attempt, change the approach or equipment and strongly consider a BIAD.",
    ],
    paramedic: [
      "Perform all prior care plus ETT, advanced airway selection, DAI when authorized, chest decompression when indicated, and surgical airway for cannot-oxygenate/cannot-ventilate failure.",
      "Use waveform capnography continuously and transition immediately to the failed-airway protocol when criteria are met.",
    ],
    treatmentSteps: [
      "Target adult ventilation at approximately 10–12 breaths/min and use EtCO₂ and clinical response to avoid hyperventilation.",
      "Before an advanced-airway attempt, assess for difficult BVM ventilation, difficult laryngoscopy, inability to place a BIAD, and potential surgical-airway need. Prepare backup equipment and a rescue plan before beginning.",
    ],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: ["Clinical airway assessment, provider permissions, BVM/advanced-airway pathway, failed-airway threshold, confirmation, and cross-links approved by the Claiborne EMS medical director on August 14, 2026.", "Airway-difficulty acronym item removed at medical-director direction."],
    warnings: [
      "Failed airway includes inability to oxygenate at least 90% after an unsuccessful attempt, anatomy unsuitable for further attempts, or three total unsuccessful attempts.",
      "No more than three total intubation attempts by the most experienced AEMT/Paramedic.",
      "Waveform capnography is mandatory after ETT and BIAD placement once available.",
      "Effective BVM is an acceptable definitive field airway; do not delay oxygenation or ventilation for intubation or repeated laryngoscopy.",
    ],
    clinicalPearls: [
      "DOPE: displacement, obstruction, pneumothorax, and equipment failure.",
      "Manually stabilize the ETT during every move or transfer.",
    ],
  }),

  airwayProtocol({
    id: "ar-02",
    title: "Adult Failed Airway",
    sourcePdf: "/protocols/claiborne/ar-02-adult-failed-airway-protocol.pdf",
    pages: 2,
    overview: [
      "Recognize failure early, stop repeated laryngoscopy, and return immediately to the most effective oxygenation method.",
      "BVM with adjuncts is acceptable definitive field management when it maintains oxygenation and ventilation.",
    ],
    indications: [
      "Unable to ventilate and maintain oxygen saturation at least 90% during or after one or more unsuccessful attempts.",
      "Anatomy inconsistent with continued attempts or three unsuccessful attempts by the most experienced AEMT/Paramedic.",
    ],
    flow: [
      { title: "Declare Failed Airway", text: "Cannot oxygenate/ventilate • unsuitable anatomy • or three total failed attempts.", levels: ALL_LEVELS, tone: "start" },
      { title: "Call for Resources", text: "Bring the most experienced airway provider and rescue devices.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "BVM + Adjuncts", text: "Optimize position, suction, mask seal, OPA/NPA, PEEP, and two-person technique.", levels: ALL_LEVELS, tone: "action" },
      { title: "SpO₂ ≥92%?", text: "Yes: continue effective BVM. No: place authorized rescue airway.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Rescue Airway", text: "BIAD • video laryngoscopy when appropriate • surgical airway if required.", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Confirm + Transport", text: "Waveform EtCO₂, secure device, post-airway care, and early notification.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Stop repeated attempts, optimize two-person BVM with airway adjuncts, suction, oxygen, and PEEP when indicated.",
      "Continue BVM when it maintains oxygen saturation at least 92% and adequate ventilation.",
    ],
    aemt: [
      "Perform all EMT care plus authorized BIAD and video-laryngoscopy rescue techniques.",
      "Confirm BIAD/ETT with waveform capnography and secure during all movement.",
    ],
    paramedic: [
      "Perform all prior care and proceed to surgical cricothyrotomy only when less invasive methods cannot oxygenate or ventilate.",
      "Avoid additional laryngoscopy after three total attempts or when anatomy makes success unlikely.",
    ],
    treatmentSteps: ["Optimize two-person BVM with positioning, suction, OPA/NPA as appropriate, high-flow oxygen, and PEEP when indicated.", "If BVM maintains SpO₂ at least 92% and adequate ventilation, continue it as the definitive field airway and begin transport.", "Place an authorized BIAD when BVM is ineffective or prolonged ventilation is required; confirm and secure it before movement.", "Proceed to surgical cricothyrotomy only for a Paramedic-managed cannot-oxygenate/cannot-ventilate patient after less-invasive rescue measures fail or cannot be used.", "Ventilate approximately 10–12 breaths/min with visible chest rise; use EtCO₂ and clinical response to avoid hyperventilation."],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: ["Clinical failed-airway definition, rescue sequence, provider permissions, confirmation, ventilation, transport, and linked pathways approved by the Claiborne EMS medical director on August 14, 2026."],
    warnings: [
      "No more than three total intubation attempts; every repeated attempt must change the provider, approach, positioning, or equipment.",
      "Do not abandon effective BVM merely to obtain an advanced airway.",
      "Do not delay transport for repeated advanced-airway attempts once oxygenation and ventilation are effective.",
    ],
    clinicalPearls: [
      "The clinical goal is oxygenation and ventilation, not endotracheal intubation.",
      "Use DOPE for sudden deterioration after airway placement.",
    ],
  }),

  airwayProtocol({
    id: "ar-03",
    title: "Airway, Drug Assisted",
    sourcePdf: "/protocols/claiborne/ar-03-airway-drug-assisted-intubation-protocol.pdf",
    pages: 2,
    overview: [
      "Drug-assisted airway (DAI) is an optional, high-risk procedure requiring specific agency authorization, documented competency, performance improvement, and at least two Paramedics on scene.",
      "Correct hypoxia and hypotension before administering a sedative-paralytic sequence whenever possible; resuscitation takes priority over intubation.",
    ],
    indications: [
      "Failure to protect the airway, inability to oxygenate, inability to ventilate, or impending airway compromise when less-invasive care is inadequate and DAI is authorized.",
    ],
    flow: [
      { title: "DAI Indicated + Authorized?", text: "Airway protection failure • oxygenation/ventilation failure • impending compromise; not for convenience.", levels: ["Paramedic"], tone: "start" },
      { title: "Prepare Completely", text: "Two Paramedics • monitor • suction • BVM/PEEP • primary and rescue airway • surgical-airway plan.", levels: ["Paramedic"], tone: "urgent" },
      { title: "Preoxygenate + Resuscitate", text: "High-flow oxygen, NIPPV or BVM/PEEP; correct hypoxia and hypotension before paralysis.", levels: ["Paramedic"], tone: "action" },
      { title: "Induction + Paralysis", text: "Select one induction agent, use the appropriate paralytic, and proceed immediately to airway placement.", levels: ["Paramedic"], tone: "action" },
      { title: "Airway Successful?", text: "Waveform EtCO₂, bilateral exam, tube depth, SpO₂, and securement. If not: BVM/BIAD and AR-02.", levels: ["Paramedic"], tone: "decision" },
      { title: "Post-Airway Management", text: "Pain-first analgesia/sedation • ventilate 10–12/min • continuous monitoring • transport.", levels: ["Paramedic"], tone: "transport" },
    ],
    emt: [
      "Assist with preoxygenation, suction, BVM, equipment preparation, physiologic monitoring, and backup-airway readiness.",
      "Continue oxygenation and ventilation throughout preparation and between attempts.",
    ],
    aemt: [
      "Perform all EMT care plus authorized vascular access, rescue BIAD support, monitoring, and assistance with the failed-airway plan.",
    ],
    paramedic: [
      "Confirm indications, authorization, two-Paramedic staffing, monitoring, preoxygenation, suction, primary device, rescue BIAD, surgical-airway equipment, and a failed-airway plan before medication.",
      "Obtain two IV/IO access points when feasible, but do not delay life-saving oxygenation or ventilation for a second access attempt.",
      "Correct hypoxia and hypotension before paralytic administration, limit laryngoscopy attempts, verify with waveform capnography, and begin pain-first post-intubation care immediately.",
    ],
    treatmentSteps: [
      "Do not perform DAI solely for convenience, because BVM is effective, or for a short transport when BVM or BIAD safely maintains oxygenation and ventilation.",
      "Preoxygenate with high-flow oxygen, NIPPV when appropriate, or two-person BVM with PEEP. Prepare suction, an appropriately sized primary airway device, BIAD, and surgical-airway rescue before medication.",
      "Use the AM-05 or AM-07 resuscitation pathway for peri-intubation shock. Treat hypotension before paralysis; use norepinephrine when indicated and see Medication Reference for the approved push-dose epinephrine preparation.",
      "Select one induction medication, then give the appropriate paralytic and proceed immediately to airway placement. Do not routinely repeat rocuronium before post-intubation analgesia and sedation are established.",
      "Limit laryngoscopy to three total attempts. Each subsequent attempt must change the provider, approach, positioning, or equipment; move immediately to AR-02 when oxygenation or ventilation is ineffective.",
      "Confirm every advanced airway with continuous waveform EtCO₂, bilateral chest assessment, SpO₂, tube depth, and securement. Reassess after each movement.",
      "After airway placement, treat pain first, then sedation. Ventilate an adult at approximately 10–12 breaths/min with visible chest rise and use EtCO₂ and clinical response to avoid hyperventilation.",
      "Document indication, authorization, staffing, preoxygenation, medications and doses, oxygenation/hemodynamics before and after medication, attempt count, airway confirmation, ventilatory support, sedation/analgesia, and required quality-improvement form.",
    ],
    medications: [
      { name: "Ketamine", dose: "1–2 mg/kg IV/IO", notes: ["Select one induction agent. Ketamine is generally preferred when hypotension or bronchospasm is present.", "If vascular access is unavailable: 4 mg/kg IM, maximum 400 mg; establish IV/IO access and proceed with airway management.", "Pediatric use requires direct online order from the Medical Director or Assistant Medical Director under the imported source."] },
      { name: "Etomidate", dose: "0.3 mg/kg IV/IO", notes: ["Select one induction agent when hemodynamic response is uncertain."] },
      { name: "Succinylcholine", dose: "1–2 mg/kg IV for RSI" },
      { name: "Rocuronium", dose: "1 mg/kg IV/IO when succinylcholine is contraindicated or a longer duration is needed", notes: ["Do not routinely repeat before post-intubation analgesia and sedation are established."] },
      { name: "Fentanyl", dose: "25–50 mcg IV/IO; repeat cautiously as needed, maximum 100 mcg", notes: ["Use lower or fractionated doses with shock, older age, or other hemodynamic risk."] },
      { name: "Midazolam", dose: "2–5 mg IV/IO; repeat cautiously as needed", notes: ["Use after analgesia when sedation is needed."] },
    ],
    actionLinks: [
      { label: "AM-05 Hypotension / Shock", description: "Open for peri-intubation hypotension or shock.", href: "/protocols/am/am-05", kind: "protocol" },
      { label: "AM-07 Crashing Medical Patient", description: "Open for immediate physiologic resuscitation when the patient is critically unstable.", href: "/protocols/am/am-07", kind: "protocol" },
      { label: "AR-02 Adult Failed Airway", description: "Open immediately when oxygenation or ventilation is ineffective or further laryngoscopy is unsafe.", href: "/protocols/ar/ar-02", kind: "protocol" },
      { label: "AR-08 Post-Intubation / BIAD Management", description: "Open for continued analgesia, sedation, ventilation, and monitoring after airway placement.", href: "/protocols/ar/ar-08", kind: "protocol" },
      { label: "Medication Reference", description: "Open for the approved push-dose epinephrine preparation and medication details.", href: "/medications", kind: "protocol" },
    ],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: [
      "Clinical DAI indications, staffing and preparation requirements, medications, rescue threshold, confirmation, post-airway care, documentation, and linked pathways approved by the Claiborne EMS medical director on August 14, 2026.",
      "Pediatric DAI remains restricted to the direct online Medical Director or Assistant Medical Director order specified in the imported source.",
    ],
    warnings: [
      "This procedure removes protective airway reflexes and spontaneous breathing; do not begin without complete rescue capability.",
      "At least two Paramedics must be present under the approved protocol.",
      "DAI during unresolved hypoxia or hypotension substantially increases cardiac-arrest risk.",
      "No more than three total laryngoscopy attempts. Effective BVM is an acceptable definitive field airway.",
      "A paralyzed patient may be awake and in pain without visible movement; establish analgesia and sedation promptly after airway placement.",
      "Complete the required airway evaluation and performance-improvement documentation.",
    ],
    clinicalPearls: [
      "When BVM maintains saturation at least 90%, continued basic airway management may be safer than DAI during a short transport.",
      "BIAD is preferred while resuscitating severe hypoxia or hypotension.",
      "Norepinephrine may be used for peri-intubation hypotension; follow AM-05 and the Medication Reference for push-dose epinephrine.",
    ],
  }),

  airwayProtocol({
    id: "ar-04",
    title: "Adult COPD / Asthma",
    sourcePdf: "/protocols/claiborne/ar-04-copd-asthma-protocol.pdf",
    pages: 2,
    overview: [
      "Differentiate lower-airway bronchospasm from stridor and other causes of respiratory distress while supporting oxygenation and ventilation.",
      "Escalate early for silent chest, fatigue, altered mental status, poor air movement, or impending respiratory failure.",
    ],
    indications: [
      "Adult with respiratory distress from suspected asthma, COPD, reactive airway disease, bronchospasm, or stridor.",
    ],
    flow: [
      { title: "Respiratory Distress", text: "Assess work of breathing, speech, air movement, SpO₂, lung sounds, mental status, and fatigue.", levels: ALL_LEVELS, tone: "start" },
      { title: "Wheeze, Stridor, or Another Cause?", text: "Treat anaphylaxis immediately when suspected; assess for CHF, ACS, PE, pneumonia, pneumothorax, obstruction, or foreign body.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Oxygen + Bronchodilator", text: "Position upright • target oxygen appropriately • albuterol ± ipratropium.", levels: ALL_LEVELS, tone: "action" },
      { title: "NIPPV Appropriate?", text: "Use early if cooperative and stable; do not use with emesis, inability to protect airway, or shock.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Severe / Not Improving?", text: "Epinephrine • steroid • magnesium • BVM/advanced-airway preparation.", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Reassess + Transport", text: "Continuous SpO₂; EtCO₂ when indicated; reassess after each treatment and notify early.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Position for comfort, provide oxygen, assist ventilation when tiring, and administer authorized albuterol.",
      "Use epinephrine immediately for anaphylaxis within EMT scope and request ALS for severe distress or poor response.",
      "Monitor work of breathing, speech, mental status, air movement, SpO₂, and clinical response after every intervention.",
    ],
    aemt: [
      "Perform all EMT care plus NIPPV for an appropriate cooperative, hemodynamically stable patient; obtain vascular access and give repeated albuterol/ipratropium within scope.",
      "Use nebulized epinephrine for stridor/upper-airway edema and authorized IM epinephrine for anaphylaxis or life-threatening asthma.",
    ],
    paramedic: [
      "Perform all prior care plus cardiac and EtCO₂ monitoring when indicated, steroid and magnesium therapy, advanced-airway management, and treatment of competing diagnoses.",
      "Prepare BVM with PEEP and follow the airway pathway promptly for silent chest, exhaustion, declining mental status, or ineffective ventilation.",
    ],
    treatmentSteps: [
      "Target SpO₂ 93–95% for asthma or undifferentiated hypoxemia. For known COPD with hypercapnia risk, usual lower saturation, or an individualized oxygen plan, target 88–92%; do not withhold oxygen from a critically hypoxemic patient.",
      "Give albuterol promptly; add ipratropium to the initial treatment for moderate or severe bronchospasm. Repeat bronchodilator treatment according to clinical response.",
      "Use NIPPV early for a cooperative patient with significant distress, fatigue, or hypercapnic COPD physiology. Stop NIPPV and move to BVM/airway-resuscitation management for hypotension, worsening mental status, emesis, intolerance, or deteriorating ventilation.",
      "For severe asthma or COPD exacerbation, give methylprednisolone early; it is adjunctive and must not delay bronchodilator treatment.",
      "Use magnesium sulfate for severe asthma or bronchospasm not improving after initial bronchodilator therapy; monitor for hypotension.",
      "Use IM epinephrine for anaphylaxis, severe upper-airway edema, or life-threatening asthma with poor air movement or impending respiratory failure. Use nebulized epinephrine for stridor or upper-airway edema, not routine lower-airway COPD/asthma treatment.",
      "Reassess respiratory effort, ability to speak, air movement, SpO₂, EtCO₂ when used, heart rate, and blood pressure after each intervention. Transport all severe, recurrent, or incompletely responsive patients and notify early for NIPPV, epinephrine, magnesium, or impending airway failure.",
    ],
    medications: [
      { name: "Albuterol", dose: "2.5–5 mg nebulized; repeat as needed ×3 and continue when clinically indicated" },
      { name: "Ipratropium", dose: "0.5 mg nebulized with the initial albuterol treatment for moderate or severe bronchospasm" },
      { name: "Epinephrine 1 mg/mL (1:1,000)", dose: "0.3–0.5 mg IM for anaphylaxis, severe upper-airway edema, or life-threatening asthma" },
      { name: "Nebulized epinephrine", dose: "1 mg of 1 mg/mL (1:1,000) in 2 mL normal saline; may repeat once for stridor or upper-airway edema" },
      { name: "Methylprednisolone", dose: "125 mg IV/IO/IM" },
      { name: "Magnesium sulfate", dose: "1–2 g IV over 15–30 minutes for severe asthma/bronchospasm not improving after initial bronchodilators" },
    ],
    actionLinks: [
      { label: "AR-01 Adult Airway", description: "Open for progressive respiratory failure or advanced-airway support.", href: "/protocols/ar/ar-01", kind: "protocol" },
      { label: "AR-03 Drug-Assisted Airway", description: "Open only when DAI is indicated and authorized for impending or actual airway failure.", href: "/protocols/ar/ar-03", kind: "protocol" },
      { label: "AM-01 Allergic Reaction / Anaphylaxis", description: "Open for suspected anaphylaxis or airway edema.", href: "/protocols/am/am-01", kind: "protocol" },
      { label: "AM-05 Hypotension / Shock", description: "Open for persistent hypotension or shock.", href: "/protocols/am/am-05", kind: "protocol" },
      { label: "AM-07 Crashing Medical Patient", description: "Open for immediate physiologic resuscitation in a critically unstable patient.", href: "/protocols/am/am-07", kind: "protocol" },
    ],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: [
      "Clinical respiratory assessment, oxygen targets, bronchodilator and adjunct selection, NIPPV safeguards, airway escalation, transport, and linked pathways approved by the Claiborne EMS medical director on August 14, 2026.",
      "Medication routes and provider permissions remain subject to current Claiborne standing orders.",
    ],
    warnings: [
      "A silent chest with respiratory distress is a pre-arrest finding.",
      "Do not persist with NIPPV in a patient with hypotension, worsening mental status, emesis, inability to protect the airway, intolerance, or deteriorating ventilation.",
      "Do not delay assisted ventilation and airway preparation for repeated nebulizer treatments in a tiring patient.",
      "EMT medication use must follow current Tennessee and Claiborne authorization.",
    ],
    clinicalPearls: [
      "A patient who can no longer speak, is tiring, or has decreasing air movement may be worsening even when wheezing is quieter.",
      "Do not treat every wheeze as asthma/COPD; reassess for anaphylaxis, CHF, ACS, PE, pneumothorax, pneumonia, upper-airway obstruction, and foreign body.",
    ],
  }),

  airwayProtocol({
    id: "ar-05",
    title: "Pediatric Airway",
    sourcePdf: "/protocols/claiborne/ar-05-pediatric-airway-protocol.pdf",
    pages: 2,
    overview: [
      "For infants and children after the newly born period, begin with positioning, suction, basic adjuncts, and effective BVM; BVM is an acceptable definitive field airway when it provides adequate oxygenation and ventilation.",
      "Use the pediatric length-based resuscitation system and age/size-appropriate equipment.",
    ],
    indications: [
      "Pediatric patient with actual or threatened airway obstruction, inadequate oxygenation, inadequate ventilation, or inability to protect the airway.",
    ],
    flow: [
      { title: "Airway / Breathing Adequate?", text: "Assess pediatric appearance, work of breathing, patency, oxygenation, ventilation, mental status, and perfusion.", levels: ALL_LEVELS, tone: "start" },
      { title: "Basic Maneuvers First", text: "Neutral position • suction • OPA/NPA when appropriate • two-person age-sized BVM ± PEEP.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Foreign-Body Obstruction?", text: "Use age-appropriate obstruction procedure; direct visualization only when authorized.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Support Still Needed?", text: "Oxygen • BVM • authorized BIAD • paramedic ETT only when clinically necessary.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Effective?", text: "If oxygenation or ventilation remains ineffective, move immediately to pediatric failed-airway rescue.", levels: ALL_LEVELS, tone: "action" },
      { title: "Confirm + Reassess", text: "Waveform EtCO₂ after ETT/BIAD, secure device, monitor, maintain warmth, and transport.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Position, suction, use basic adjuncts, and provide effective age-appropriate BVM ventilation; avoid unnecessary advanced-airway attempts.",
      "Maintain warmth and use the pediatric length-based resuscitation system for equipment sizing and dosing support.",
      "Continue effective BVM when it provides adequate oxygenation and ventilation; do not delay transport solely to place an advanced airway.",
    ],
    aemt: [
      "Perform all EMT care plus authorized pediatric BIAD, vascular access, and continuous waveform capnography. Endotracheal intubation is not included as an AEMT procedure in this protocol.",
      "After a failed attempt, change approach/equipment and move promptly toward a rescue airway.",
    ],
    paramedic: [
      "Perform all prior care plus ETT when clinically necessary and a skilled attempt is likely to succeed, chest decompression when indicated, and age-appropriate cricothyrotomy as an absolute last resort.",
      "Pediatric DAI requires the direct online Medical Director or Assistant Medical Director order specified in the imported source.",
      "Secure the tube carefully and manually stabilize it during every movement.",
    ],
    treatmentSteps: [
      "Use neutral airway positioning. For infants, consider a small shoulder roll to avoid flexion. Suction early and use age-appropriate OPA/NPA when clinically appropriate.",
      "Use the length-based pediatric system as the primary source for equipment, medication, and tube sizing. Estimated ETT depth is approximately 3 × tube diameter; estimated uncuffed tube size is (16 + age in years) ÷ 4 only as a secondary estimate and not for infants.",
      "For inadequate breathing with a pulse, ventilate 1 breath every 2–3 seconds (20–30/min) with visible chest rise. Use clinical response and EtCO₂ when available to avoid hyperventilation.",
      "For severe foreign-body obstruction: infants—repeat 5 back blows and 5 chest thrusts; children—repeat 5 back blows and 5 abdominal thrusts. Do not perform blind finger sweeps.",
      "Escalate early for apnea, exhaustion, altered mental status, worsening cyanosis, inadequate chest rise, or persistent hypoxemia despite optimized BVM.",
      "Limit laryngoscopy to three total attempts. Each further attempt must change provider, approach, positioning, or equipment; move immediately to AR-06 when oxygenation or ventilation is ineffective.",
      "Confirm ETT or BIAD with continuous waveform EtCO₂, chest examination, tube depth, SpO₂, and securement. Recheck after every move.",
      "If heart rate remains below 60/min with poor perfusion despite effective oxygenation and ventilation, start CPR and follow PC-02 Pediatric Bradycardia / Poor Perfusion.",
      "Pediatric cricothyrotomy is not routine. Consider it only for persistent cannot-oxygenate/cannot-ventilate failure when age-appropriate, specifically authorized, and within provider training and equipment capability.",
    ],
    actionLinks: [
      { label: "AO-02 Newly Born", description: "Open for neonatal resuscitation immediately after birth.", href: "/protocols/ao/ao-02", kind: "protocol" },
      { label: "AR-06 Pediatric Failed Airway", description: "Open immediately when oxygenation or ventilation is ineffective or further laryngoscopy is unsafe.", href: "/protocols/ar/ar-06", kind: "protocol" },
      { label: "AR-08 Post-Intubation / BIAD Management", description: "Open for airway confirmation, ventilation, monitoring, and continued post-airway management.", href: "/protocols/ar/ar-08", kind: "protocol" },
      { label: "PC-02 Pediatric Bradycardia / Poor Perfusion", description: "Open for HR below 60/min with poor perfusion despite oxygenation and ventilation.", href: "/protocols/pc/pc-02", kind: "protocol" },
    ],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: [
      "Clinical pediatric assessment, provider permissions, BVM-first pathway, ventilation, foreign-body management, failed-airway threshold, confirmation, pediatric DAI restriction, bradycardia crossover, and linked pathways approved by the Claiborne EMS medical director on August 14, 2026.",
      "Pediatric cricothyrotomy remains a rare, specifically authorized last-resort procedure.",
    ],
    warnings: [
      "Effective BVM ventilation is often safer than a difficult pediatric intubation.",
      "No more than three total intubation attempts; every further attempt must change the provider, approach, positioning, or equipment.",
      "Pediatric ketamine/DAI requires direct online order from the Medical Director or Assistant Medical Director under the imported source.",
      "Pediatric cricothyrotomy is a rare, age-appropriate, specifically authorized last-resort procedure for persistent cannot-oxygenate/cannot-ventilate failure.",
    ],
    clinicalPearls: [
      "Respiratory failure is a common cause of pediatric cardiac arrest; support oxygenation and ventilation promptly.",
      "An improving SpO₂ alone does not prove adequate ventilation—reassess chest rise, mental status, perfusion, and waveform EtCO₂ when available.",
    ],
  }),

  airwayProtocol({
    id: "ar-06",
    title: "Pediatric Failed Airway",
    sourcePdf: "/protocols/claiborne/ar-06-pediatric-failed-airway-protocol.pdf",
    pages: 2,
    overview: [
      "Declare pediatric airway failure early, stop repeated laryngoscopy, and return immediately to effective BVM ventilation.",
      "Effective BVM is an acceptable definitive field airway. Use a rescue BIAD when appropriate; cricothyrotomy is a rare final rescue based on age and agency authorization.",
    ],
    indications: [
      "Unable to oxygenate or ventilate, anatomy unsafe for further attempts, or three total unsuccessful laryngoscopy attempts.",
      "Pediatric deterioration during or after an unsuccessful advanced-airway attempt when continued laryngoscopy could worsen hypoxemia or interrupt ventilation.",
    ],
    flow: [
      { title: "Declare Failed Airway", text: "Cannot oxygenate/ventilate • unsafe anatomy • deterioration • or three failed laryngoscopy attempts.", levels: ALL_LEVELS, tone: "start" },
      { title: "Call + Optimize BVM", text: "Bring most experienced provider/rescue equipment; position • suction • adjuncts • two-person seal • oxygen • PEEP.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "BVM Effective?", text: "Judge chest rise, SpO₂ trend, mental status/perfusion, and EtCO₂ when available.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Rescue Airway Needed?", text: "If BVM ineffective or prolonged ventilation required: authorized age/size-appropriate BIAD or deliberate paramedic rescue.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Cannot Oxygenate / Ventilate?", text: "Paramedic considers age-appropriate, specifically authorized surgical rescue only after less-invasive rescue fails or cannot be used.", levels: ["Paramedic"], tone: "urgent" },
      { title: "Confirm + Transport", text: "Waveform EtCO₂ • secure device • maintain warmth • post-airway care • immediate notification.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Stop further laryngoscopy attempts, call for resources, optimize two-person BVM with positioning, adjuncts, suction, oxygen, and PEEP when indicated.",
      "Continue BVM as the definitive field airway when oxygenation and ventilation are effective; begin transport without delay.",
    ],
    aemt: [
      "Perform all EMT care plus authorized pediatric BIAD and continuous waveform capnography. Endotracheal intubation and video laryngoscopy are not included as AEMT procedures in this protocol.",
      "Use an age/size-appropriate BIAD only when BVM is ineffective or prolonged ventilation requires it; do not make repeated blind rescue-device attempts.",
    ],
    paramedic: [
      "Perform all prior care plus an age/size-appropriate BIAD or a changed, deliberate video-laryngoscopy rescue approach only when BVM is ineffective or prolonged ventilation requires it.",
      "Consider age-appropriate cricothyrotomy only for persistent cannot-oxygenate/cannot-ventilate failure after less-invasive rescue fails or cannot be used, and only when specifically authorized.",
    ],
    treatmentSteps: [
      "Declare failure early. Do not wait for three attempts when BVM is ineffective, oxygenation/ventilation is deteriorating, or anatomy makes further attempts unsafe.",
      "Stop laryngoscopy, bring the most experienced available airway provider and rescue equipment, and optimize BVM with neutral positioning, suction, OPA/NPA when appropriate, correct mask size/seal, oxygen, and PEEP when indicated.",
      "Judge BVM success by chest rise, SpO₂ trend, mental status/perfusion, and waveform EtCO₂ when available—not SpO₂ alone.",
      "If BVM is effective, continue it as the definitive field airway and begin transport. Do not pursue an advanced airway solely because BVM is not ideal.",
      "Do not use repeated blind BIAD or laryngoscopy attempts. Every additional attempt must have a meaningful change in provider, approach, positioning, or equipment.",
      "Confirm every BIAD/ETT with continuous waveform EtCO₂, chest examination, SpO₂, depth, and securement; reassess after every movement.",
      "If heart rate remains below 60/min with poor perfusion despite effective oxygenation and ventilation, start CPR and follow PC-02. If pulseless, follow PC-04 Pediatric Pulseless Arrest.",
      "Maintain warmth, frequent reassessment, rapid transport, and early notification for any rescue airway, persistent hypoxemia, or respiratory failure.",
    ],
    actionLinks: [
      { label: "AR-05 Pediatric Airway", description: "Open for the primary pediatric airway and BVM pathway.", href: "/protocols/ar/ar-05", kind: "protocol" },
      { label: "AR-08 Post-Intubation / BIAD Management", description: "Open for airway confirmation, ventilation, monitoring, and continued post-airway management.", href: "/protocols/ar/ar-08", kind: "protocol" },
      { label: "PC-02 Pediatric Bradycardia / Poor Perfusion", description: "Open for HR below 60/min with poor perfusion despite oxygenation and ventilation.", href: "/protocols/pc/pc-02", kind: "protocol" },
      { label: "PC-04 Pediatric Pulseless Arrest", description: "Open if the child is pulseless.", href: "/protocols/pc/pc-04", kind: "protocol" },
    ],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: [
      "Clinical pediatric failed-airway definition, BVM-first rescue sequence, provider permissions, confirmation, pediatric arrest crossover, transport, and linked pathways approved by the Claiborne EMS medical director on August 14, 2026.",
      "Pediatric surgical airway remains a rare, age-appropriate, specifically authorized last-resort procedure.",
    ],
    warnings: [
      "Effective BVM ventilation is an acceptable definitive field airway; avoid repeated attempts that interrupt oxygenation or worsen hypoxemia.",
      "No more than three total laryngoscopy attempts; every further attempt must change the provider, approach, positioning, or equipment.",
      "Do not use repeated blind BIAD or laryngoscopy attempts.",
      "Pediatric cricothyrotomy is a rare, age-appropriate, specifically authorized last-resort procedure for persistent cannot-oxygenate/cannot-ventilate failure.",
    ],
    clinicalPearls: [
      "Do not wait for arbitrary attempt counts when the child is deteriorating—return to effective ventilation first.",
      "Waveform EtCO₂ confirms continuous respiratory gas exchange after an advanced airway and helps identify deterioration promptly.",
    ],
  }),

  airwayProtocol({
    id: "ar-07",
    title: "Pediatric Respiratory Distress",
    sourcePdf: "/protocols/claiborne/ar-07-pediatric-respiratory-distress-protocol.pdf",
    pages: 2,
    overview: [
      "Assess pediatric respiratory distress by appearance, work of breathing, air movement, SpO₂, mental status, hydration/perfusion, and fatigue.",
      "Separate bronchospasm/asthma, croup/stridor, bronchiolitis, anaphylaxis, epiglottitis/bacterial tracheitis concern, foreign body, and respiratory failure early.",
    ],
    indications: [
      "Pediatric patient with asthma, reactive airway disease, wheezing, bronchospasm, croup, stridor, bronchiolitis, or other respiratory distress.",
    ],
    flow: [
      { title: "Pediatric Distress", text: "Position of comfort • appearance • work • air movement • SpO₂ • mental status • perfusion.", levels: ALL_LEVELS, tone: "start" },
      { title: "Wheeze, Stridor, or Another Cause?", text: "Consider asthma, croup, bronchiolitis, epiglottitis, anaphylaxis, foreign body, or respiratory failure.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Initial Support", text: "Least distressing effective oxygen method • suction when needed • pathway-specific bronchodilator/epinephrine.", levels: ALL_LEVELS, tone: "action" },
      { title: "Improving?", text: "Reassess after each treatment; obtain access when severe or persistent.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Severe / Impending Failure?", text: "PM-01 epinephrine when indicated • Medical-Control-directed steroid • magnesium • BVM/airway escalation.", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Reassess + Transport", text: "Continuous SpO₂; EtCO₂ when indicated; maintain warmth and notify early.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Allow position of comfort, minimize agitation, provide oxygen by the least distressing effective method, assist ventilation when tiring, and administer authorized albuterol.",
      "Treat anaphylaxis immediately through PM-01 and avoid airway manipulation when epiglottitis is suspected.",
      "For clear bronchiolitis, provide supportive care—suction, oxygen when needed, hydration assessment, and ventilation support for failure—rather than routine bronchodilator or epinephrine treatment.",
    ],
    aemt: [
      "Perform all EMT care plus vascular access, repeated albuterol and weight-appropriate initial ipratropium for moderate or severe bronchospasm, nebulized epinephrine for croup/stridor, and PM-01-directed IM epinephrine.",
    ],
    paramedic: [
      "Perform all prior care plus Medical-Control-directed corticosteroid consideration, magnesium for severe asthma, cardiac/EtCO₂ monitoring, and BVM/advanced-airway support for impending failure.",
      "Move promptly to AR-05/AR-06 for silent chest, cyanosis, exhaustion, declining mental status, bradycardia, or ineffective ventilation; do not continue repeated medications in a tiring child.",
    ],
    treatmentSteps: [
      "Do not force a mask on an agitated child who is maintaining oxygenation. Use blow-by or the least distressing effective oxygen method; support ventilation immediately when oxygenation or ventilation is inadequate.",
      "For wheeze/bronchospasm, give albuterol and reassess after each treatment. Add ipratropium to the initial treatment only for moderate or severe bronchospasm.",
      "For croup/stridor, keep the child calm, avoid unnecessary airway manipulation, give nebulized epinephrine for stridor at rest or moderate/severe upper-airway obstruction, and transport after treatment because symptoms can recur.",
      "For suspected epiglottitis or bacterial tracheitis—drooling, tripod position, toxic appearance, or rapidly progressive upper-airway symptoms—do not force the child supine or examine the tongue/airway; prepare for a controlled airway response and notify the receiving facility early.",
      "For anaphylaxis or life-threatening asthma, use the approved PM-01 Pediatric Allergic Reaction epinephrine pathway; do not use a conflicting separate epinephrine dose in this protocol.",
      "For moderate or severe asthma/reactive-airway disease, contact Medical Control for corticosteroid consideration; it is adjunctive and must not delay bronchodilator therapy.",
      "Use magnesium sulfate for severe asthma not improving after initial bronchodilator therapy; monitor blood pressure.",
      "If heart rate remains below 60/min with poor perfusion despite effective oxygenation and ventilation, start CPR and follow PC-02.",
    ],
    medications: [
      { name: "Albuterol", dose: "Under 20 kg: 2.5 mg nebulized; 20 kg or greater: 5 mg nebulized for bronchospasm" },
      { name: "Ipratropium", dose: "Under 20 kg: 0.25 mg nebulized; 20 kg or greater: 0.5 mg nebulized, with initial albuterol for moderate or severe bronchospasm" },
      { name: "Nebulized epinephrine", dose: "0.5 mL/kg of 1 mg/mL (1:1,000) epinephrine, maximum 5 mL (5 mg), nebulized for croup/stridor" },
      { name: "Epinephrine 1 mg/mL (1:1,000)", dose: "Use the approved PM-01 Pediatric Allergic Reaction pathway for anaphylaxis or life-threatening asthma dosing" },
      { name: "Methylprednisolone", dose: "Medical Control only; no standing pediatric dose, for moderate or severe asthma/reactive-airway disease" },
      { name: "Magnesium sulfate", dose: "40–50 mg/kg IV once over 15–30 minutes; maximum 2 g, for severe asthma not improving after initial bronchodilators" },
    ],
    actionLinks: [
      { label: "PM-01 Pediatric Allergic Reaction", description: "Open for anaphylaxis or life-threatening asthma requiring IM epinephrine.", href: "/protocols/pm/pm-01", kind: "protocol" },
      { label: "AR-05 Pediatric Airway", description: "Open for BVM and primary pediatric airway support.", href: "/protocols/ar/ar-05", kind: "protocol" },
      { label: "AR-06 Pediatric Failed Airway", description: "Open for ineffective oxygenation/ventilation or unsafe further airway attempts.", href: "/protocols/ar/ar-06", kind: "protocol" },
      { label: "PC-02 Pediatric Bradycardia / Poor Perfusion", description: "Open for HR below 60/min with poor perfusion despite oxygenation and ventilation.", href: "/protocols/pc/pc-02", kind: "protocol" },
      { label: "AO-02 Newly Born", description: "Open for neonatal respiratory support immediately after birth.", href: "/protocols/ao/ao-02", kind: "protocol" },
    ],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: [
      "Clinical pediatric respiratory assessment, pathway differentiation, medication doses, bronchiolitis safeguards, upper-airway management, airway escalation, pediatric bradycardia crossover, and linked pathways approved by the Claiborne EMS medical director on August 14, 2026.",
      "Anaphylaxis and life-threatening-asthma IM epinephrine dosing is governed by PM-01 to prevent conflicting dosing.",
    ],
    warnings: [
      "Do not force a child supine; allow the position that best maintains the airway.",
      "Drooling, rapid onset, fever, and tripod positioning suggest epiglottitis or bacterial tracheitis; airway manipulation may cause complete obstruction.",
      "A silent chest is a pre-arrest finding.",
      "Do not routinely give albuterol or epinephrine for clear bronchiolitis.",
      "Do not delay airway support for repeated medications in a tiring child.",
      "Do not perform blind finger sweeps.",
    ],
    clinicalPearls: [
      "A child with decreasing wheeze, worsening fatigue, or declining mental status may be deteriorating rather than improving.",
      "Stridor is an upper-airway finding; albuterol does not treat croup or fixed upper-airway obstruction.",
    ],
  }),

  airwayProtocol({
    id: "ar-08",
    title: "Post-Intubation / BIAD Management",
    sourcePdf: "/protocols/claiborne/ar-08-post-intubation-biad-management-protocol.pdf",
    pages: 2,
    overview: [
      "After every ETT or BIAD placement, continuously confirm airway position, oxygenation, ventilation, securement, analgesia, and sedation.",
      "Treat pain first; paralysis does not provide analgesia or sedation. Newly born patients remain under AO-02.",
    ],
    indications: [
      "Any patient after successful endotracheal intubation or BIAD placement, excluding neonatal resuscitation immediately after birth.",
    ],
    flow: [
      { title: "ETT / BIAD Placed", text: "Confirm success with continuous waveform EtCO₂, bilateral exam, SpO₂, tube depth, and securement.", levels: ALL_LEVELS, tone: "start" },
      { title: "Secure + Ventilate", text: "Manual stabilization during movement • appropriate rate • visible chest rise • EtCO₂-guided reassessment.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Monitor Continuously", text: "Waveform EtCO₂ • SpO₂ • cardiac monitor • tube depth • breath sounds • frequent vital signs.", levels: ALL_LEVELS, tone: "action" },
      { title: "Pain / Anxiety / Movement?", text: "Paramedic: treat pain first, then add sedation when needed. Pediatric medication requires pediatric pathway/online order.", levels: ["Paramedic"], tone: "decision" },
      { title: "Sudden Deterioration?", text: "Evaluate DOPE; disconnect ventilator and manually ventilate if cause is not immediately clear.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Transport + Reconfirm", text: "Recheck after every move, document airway status/medications, and notify early.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Manually stabilize and secure the device, ventilate at the appropriate rate, monitor SpO₂, and reassess after every move.",
      "Immediately report loss of waveform, resistance, reduced breath sounds, hypoxia, or changing tube depth.",
    ],
    aemt: [
      "Perform all EMT care plus waveform capnography, IV/IO access, authorized ventilation support, suctioning, and assistance with DOPE management.",
      "This protocol does not grant AEMT authority for post-intubation analgesics, sedatives, or paralytics.",
    ],
    paramedic: [
      "Perform all prior care plus pain-first adult analgesia/sedation, mechanical ventilation, and rescue management for DOPE deterioration.",
      "For pediatric patients, use the length-based pediatric medication system and direct online Medical Control or receiving-facility orders for post-airway analgesia/sedation; do not apply adult doses.",
      "Use paralysis only as a last resort after adequate analgesia and sedation. If movement remains unsafe, use paramedic judgment with continuous sedation and Medical Control or an established interfacility order.",
    ],
    treatmentSteps: [
      "Confirm ETT/BIAD placement with continuous waveform EtCO₂, bilateral chest examination, SpO₂, tube depth, and securement. Recheck all confirmation points after every transfer or move.",
      "Ventilate adults at approximately 10–12 breaths/min and pediatric patients at 20–30 breaths/min (1 breath every 2–3 seconds), with visible chest rise. Use EtCO₂ and clinical response to avoid hyperventilation.",
      "Avoid hypoxemia. After ROSC, target adult SpO₂ 90–98% and pediatric SpO₂ 94–99% once reliable monitoring is available.",
      "For sudden deterioration, use DOPE: displacement, obstruction, pneumothorax, equipment failure. Disconnect from the ventilator and manually ventilate if the cause is not immediately clear.",
      "Suction when indicated, elevate the head 10–20 degrees when feasible, and reassess breath sounds, tube depth, and waveform after suctioning or movement.",
      "Treat pain first, then add sedation. Do not stack fentanyl and morphine; select one analgesic strategy.",
      "Document airway confirmation, tube depth, waveform EtCO₂, oxygenation, ventilation rate/settings, analgesia/sedation, reassessments, and all movement-related rechecks.",
    ],
    medications: [
      { name: "Ketamine — adult", dose: "1 mg/kg IV/IO", notes: ["Adult alternative for post-airway sedation when clinically appropriate. Pediatric post-airway medication requires the pediatric system and direct online Medical Control or receiving-facility order."] },
      { name: "Fentanyl — adult", dose: "25–50 mcg IV/IO; repeat cautiously as needed, maximum 100 mcg", notes: ["Treat pain first. Do not stack with morphine."] },
      { name: "Morphine — adult alternative", dose: "4 mg IV/IO; repeat 2 mg every 5 minutes as needed, maximum 10 mg", notes: ["Select one analgesic strategy; do not stack with fentanyl."] },
      { name: "Midazolam — adult", dose: "2–5 mg IV/IO; repeat cautiously as needed", notes: ["Use after analgesia when sedation is needed."] },
    ],
    actionLinks: [
      { label: "AR-03 Drug-Assisted Airway", description: "Open for the approved DAI preparation, induction, and post-airway sequence.", href: "/protocols/ar/ar-03", kind: "protocol" },
      { label: "AR-05 Pediatric Airway", description: "Open for pediatric airway support and the length-based medication system.", href: "/protocols/ar/ar-05", kind: "protocol" },
      { label: "AR-09 Ventilator Emergencies", description: "Open for ventilator alarm, equipment failure, or unresolved ventilator deterioration.", href: "/protocols/ar/ar-09", kind: "protocol" },
      { label: "AR-11 Mechanical Ventilation, Adult", description: "Open for adult ventilator setup and management.", href: "/protocols/ar/ar-11", kind: "protocol" },
    ],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: [
      "Clinical airway confirmation, monitoring, ventilation, adult analgesia/sedation, pediatric safeguards, DOPE rescue, transport, and linked pathways approved by the Claiborne EMS medical director on August 14, 2026.",
      "This protocol does not authorize routine repeat paralysis; pediatric post-airway medication requires pediatric pathway and direct order.",
    ],
    warnings: [
      "Waveform capnography is mandatory after ETT and after BIAD placement once available.",
      "A paralyzed patient may be awake and in pain without visible movement; maintain analgesia and sedation.",
      "Loss of waveform or sudden deterioration requires immediate DOPE evaluation; never delay manual ventilation for ventilator troubleshooting.",
      "Propofol may not be initiated or bolused by field Paramedics; an already ordered interfacility infusion may continue when appropriate.",
      "Do not apply adult post-airway medication doses to pediatric patients.",
    ],
    clinicalPearls: [
      "Elevate the head 10–20 degrees when possible to reduce aspiration risk.",
      "For sudden deterioration, disconnect the ventilator, manually ventilate, and evaluate DOPE.",
      "A secure airway requires continuous confirmation, not a single post-placement check.",
    ],
  }),

  airwayProtocol({
    id: "ar-09",
    title: "Ventilator Emergencies",
    sourcePdf: "/protocols/claiborne/ar-09-ventilator-emergencies-protocol.pdf",
    pages: 1,
    overview: [
      "Treat the patient, not the alarm. Use the caregiver and the patient's functioning equipment whenever possible, but never allow ventilator troubleshooting to delay manual ventilation.",
      "If oxygenation or ventilation is inadequate, or the cause cannot be immediately corrected, disconnect the ventilator and ventilate with a BVM.",
    ],
    indications: [
      "Ventilator-dependent patient with alarm, equipment failure, hypoxia, abnormal EtCO₂, respiratory distress, or suspected airway/circuit problem.",
    ],
    flow: [
      { title: "Ventilator Problem", text: "Establish baseline: airway type, diagnosis, usual settings, usual SpO₂/EtCO₂, alarm meaning, and caregiver rescue plan.", levels: ALL_LEVELS, tone: "start" },
      { title: "Patient Stable?", text: "If inadequate ventilation/oxygenation or cause unclear: disconnect and BVM immediately.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Check Simple Causes", text: "Oxygen • power/battery • circuit • connection/leak • kink • water • filter • settings/alarm limits.", levels: ALL_LEVELS, tone: "action" },
      { title: "Use DOPE + Auto-PEEP", text: "Displacement • obstruction • pneumothorax • equipment failure; consider stacked breaths/auto-PEEP.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Cause Corrected?", text: "Yes: resume established settings when safe. No: continue BVM and transport.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Transport", text: "Ventilator • power • battery • oxygen reserve • BVM • suction • spare trach equipment • caregiver when feasible.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Ask the caregiver for the baseline, check power/oxygen/circuit, assess the tracheostomy or ETT, suction when indicated, and immediately use BVM if correction is not rapid.",
      "Bring the patient's ventilator to the hospital even when malfunctioning.",
    ],
    aemt: [
      "Perform all EMT care plus advanced suctioning, tracheostomy/BIAD support, capnography, vascular access when indicated, and assistance with ventilator troubleshooting.",
    ],
    paramedic: [
      "Perform all prior care, maintain functioning home settings when appropriate, and manage airway, pneumothorax, bronchospasm, auto-PEEP, or other physiologic cause.",
      "Transport on the patient's functioning ventilator with current settings when safe; do not make unneeded setting changes during transport.",
    ],
    treatmentSteps: [
      "Establish the baseline: ventilator-dependent diagnosis, tracheostomy versus ETT, usual settings, usual SpO₂/EtCO₂, alarm meaning, and caregiver rescue plan.",
      "If the patient is stable, use the functioning ventilator and established settings. If oxygenation/ventilation is inadequate or the cause is not immediately clear, disconnect the ventilator and manually ventilate with BVM.",
      "Check oxygen source/pressure, battery or AC power, circuit connection, leaks, kinks, water, filter, settings, and alarm limits.",
      "Use DOPE for deterioration: displacement, obstruction, pneumothorax, equipment failure. For asthma/COPD or prolonged exhalation, consider stacked breaths/auto-PEEP; disconnect, manually ventilate slowly, and allow full exhalation before restarting.",
      "For high-pressure alarm, assess kinking, biting, secretions/plugging, bronchospasm, pneumothorax, and patient-ventilator dyssynchrony. For low-pressure alarm, assess disconnection, circuit leak, cuff leak, loose tubing, or displaced airway.",
      "Suction when secretions or obstruction are suspected; preoxygenate when possible and never force the catheter.",
      "During BVM rescue, use age-appropriate rate, visible chest rise, and EtCO₂/clinical response; avoid hyperventilation.",
      "Maintain continuous SpO₂ and waveform EtCO₂ when available. Reassess color, chest rise, breath sounds, airway depth, and perfusion after every intervention.",
      "Transport with the ventilator, power cord, backup battery, adequate oxygen reserve, BVM, suction, and patient-specific spare tracheostomy equipment when available. Bring the knowledgeable caregiver and ventilator settings/information when feasible.",
    ],
    actionLinks: [
      { label: "AR-08 Post-Intubation / BIAD Management", description: "Open for recently placed ETT/BIAD confirmation, monitoring, and DOPE response.", href: "/protocols/ar/ar-08", kind: "protocol" },
      { label: "AR-10 Tracheostomy Tube Emergencies", description: "Open for tracheostomy obstruction, displacement, or decannulation.", href: "/protocols/ar/ar-10", kind: "protocol" },
      { label: "AR-11 Mechanical Ventilation, Adult", description: "Open for adult ventilator setup and management after the emergency is stabilized.", href: "/protocols/ar/ar-11", kind: "protocol" },
    ],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: [
      "Clinical ventilator-emergency assessment, manual-ventilation trigger, equipment and patient troubleshooting, auto-PEEP safeguards, transport, and linked pathways approved by the Claiborne EMS medical director on August 14, 2026.",
    ],
    warnings: [
      "Never delay manual ventilation for troubleshooting. If the patient improves after disconnection, reassess for ventilator/circuit malfunction, obstruction, or auto-PEEP before reconnecting.",
      "Do not make unneeded setting changes when the patient is stable on a functioning home ventilator.",
      "Continuous SpO₂ and waveform EtCO₂ are required during assessment and transport once available.",
    ],
    clinicalPearls: [
      "High-pressure and low-pressure alarms suggest different causes; assess the patient and airway before focusing on the machine.",
      "A ventilator malfunction does not replace the need to assess airway displacement, secretions, pneumothorax, or worsening underlying physiology.",
    ],
  }),

  airwayProtocol({
    id: "ar-10",
    title: "Tracheostomy Tube Emergencies",
    sourcePdf: "/protocols/claiborne/ar-10-tracheostomy-tube-emergencies-protocol.pdf",
    pages: 1,
    overview: [
      "First determine whether the patient has a tracheostomy or total laryngectomy; use caregiver knowledge, emergency information, and the patient's equipment.",
      "Prioritize oxygenation, remove simple obstruction, suction, and recognize that a blocked or displaced tracheostomy tube may need prompt removal rather than repeated ventilation attempts.",
    ],
    indications: [
      "Tracheostomy or laryngectomy patient with distress, cyanosis, altered mental status, copious secretions, obstruction, displacement, decannulation, or bleeding.",
    ],
    flow: [
      { title: "Tracheostomy or Laryngectomy?", text: "Ask caregiver and inspect stoma/tube. If uncertain, apply oxygen to both face and stoma.", levels: ALL_LEVELS, tone: "start" },
      { title: "Remove Simple Obstruction", text: "Remove speaking valve, cap, HME/filter, and inner cannula if present. Do not remove voice prosthesis.", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Suction + Reassess", text: "Use patient-specific catheter/depth when known. Never force resistance.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Catheter Will Not Pass / Tube Displaced?", text: "Deflate cuff if present, reassess face/stoma airflow, and remove the tracheostomy tube when obstruction/displacement is established.", levels: ["AEMT", "Paramedic"], tone: "decision" },
      { title: "Ventilate Through Available Airway", text: "Trach: face and stoma as appropriate. Laryngectomy: stoma only with pediatric mask/stoma interface.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Confirm + Transport", text: "Waveform EtCO₂, SpO₂, secure any rescue tube, bring spare equipment/caregiver, and notify destination.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Use caregiver and patient equipment, determine tracheostomy versus laryngectomy, provide oxygen, assist ventilation at the stoma, and prepare suction/replacement equipment.",
      "If uncertain whether a patient has a laryngectomy, apply oxygen to both face and stoma until anatomy is confirmed.",
      "A confirmed total laryngectomy disconnects the upper airway from the lungs; oxygenate and ventilate only through the stoma.",
    ],
    aemt: [
      "Perform all EMT care plus remove obstructing valves/caps/HME/inner cannula, perform authorized suctioning, and assist with authorized tracheostomy replacement.",
      "Do not make repeated attempts to ventilate through a potentially displaced or obstructed tracheostomy tube. An endotracheal tube through the stoma is not an AEMT procedure in this protocol.",
    ],
    paramedic: [
      "Perform all prior care and manage persistent obstruction, displacement, pneumothorax, respiratory failure, or rescue ventilation with advanced airway support.",
      "For a mature tract when replacement is appropriate, use the patient’s spare tube or one size smaller; an appropriately sized cuffed ETT through the stoma is a paramedic rescue option when necessary.",
      "For a fresh/immature tract, do not blindly replace the tube because of false-passage risk; prioritize oxygenation/ventilation and rapid transport.",
    ],
    treatmentSteps: [
      "First determine tracheostomy versus total laryngectomy. If uncertain, apply oxygen to both face and stoma. For confirmed laryngectomy, the stoma is the only airway; do not attempt oral/nasal ventilation or intubation.",
      "Do not remove a tracheoesophageal voice prosthesis during an emergency.",
      "For suspected tracheostomy obstruction, immediately remove external attachments: speaking valve, cap, HME/filter, and inner cannula if present.",
      "Then attempt suction with the patient’s usual catheter/depth when known. If unknown, use the smallest appropriate catheter and stop at resistance; do not use a fixed depth.",
      "If the suction catheter will not pass, treat the tube as obstructed or displaced: deflate the cuff when present, reassess face and stoma airflow, and remove the tracheostomy tube rather than repeatedly attempting to ventilate through it.",
      "After tracheostomy tube removal, provide oxygen to face and stoma. Use oral/nasal BVM if the upper airway is patent; occlude the stoma if necessary to obtain chest rise.",
      "For laryngectomy rescue ventilation, use a pediatric mask or appropriate stoma interface over the stoma; confirm chest rise and waveform EtCO₂.",
      "After any stoma tube/ETT placement, confirm with waveform EtCO₂, chest examination, SpO₂, depth, and securement.",
      "Significant tracheostomy bleeding is potentially life-threatening: provide oxygen/ventilation, activate rapid transport, and contact Medical Control early.",
    ],
    actionLinks: [
      { label: "AR-01 Adult Airway", description: "Open for progressive respiratory failure or rescue airway support.", href: "/protocols/ar/ar-01", kind: "protocol" },
      { label: "AR-08 Post-Intubation / BIAD Management", description: "Open after a rescue airway is placed for confirmation, monitoring, and transport care.", href: "/protocols/ar/ar-08", kind: "protocol" },
      { label: "AR-09 Ventilator Emergencies", description: "Open for ventilator alarm, equipment failure, or home-ventilator troubleshooting.", href: "/protocols/ar/ar-09", kind: "protocol" },
    ],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: [
      "Clinical tracheostomy versus laryngectomy differentiation, obstruction and rescue sequence, provider permissions, transport, bleeding warning, and linked pathways approved by the Claiborne EMS medical director on August 14, 2026.",
      "Fresh/immature tracheostomy replacement is excluded because of false-passage risk.",
    ],
    warnings: [
      "Do not force a suction catheter; inability to pass suggests obstruction or displacement.",
      "Deflate the cuff before removing a cuffed tracheostomy tube.",
      "Do not attempt oral or nasal ventilation after total laryngectomy; ventilate through the stoma.",
      "Do not remove a tracheoesophageal voice prosthesis during an emergency.",
      "Significant tracheostomy bleeding is potentially life-threatening; expedite transport and contact Medical Control.",
    ],
    clinicalPearls: [
      "If airway anatomy is uncertain, oxygen to both the face and stoma is safest until laryngectomy is excluded.",
      "A blocked or displaced tracheostomy tube should be removed once established, rather than treated as a route for repeated ventilation attempts.",
    ],
  }),

  airwayProtocol({
    id: "ar-11",
    title: "Mechanical Ventilation, Adult",
    sourcePdf: "/protocols/claiborne/ar-11-mechanical-ventilation-adult.pdf",
    pages: 3,
    overview: [
      "Use lung-protective volume assist-control ventilation based on predicted body weight and height, not actual body weight.",
      "If the ventilator alarms and the cause is uncertain, disconnect immediately, manually ventilate, stabilize, and then restart setup.",
    ],
    indications: [
      "Adult or protocol-authorized patient with advanced airway requiring mechanical ventilation.",
      "Interfacility or home-ventilator patient whose current settings are known and functioning.",
    ],
    flow: [
      { title: "Advanced Airway Confirmed", text: "Waveform EtCO₂ • tube depth • bilateral exam • post-airway sedation.", levels: ["Paramedic"], tone: "start" },
      { title: "Home / Transfer Ventilator?", text: "Use functioning established settings and titrate to clinical response.", levels: ["Paramedic"], tone: "decision" },
      { title: "COPD / Asthma?", text: "Use lower rate and longer expiratory time to reduce air trapping and auto-PEEP.", levels: ["Paramedic"], tone: "decision" },
      { title: "Set Volume Assist-Control", text: "Tidal volume by predicted body weight; PEEP 5; FiO₂ 100% initially.", levels: ["Paramedic"], tone: "action" },
      { title: "Check Pressures + Response", text: "Plateau below 30 • SpO₂ 92–98% • EtCO₂ trend • synchrony • full exhalation.", levels: ["Paramedic"], tone: "action" },
      { title: "Alarm / Deterioration?", text: "Disconnect, BVM, use DOPES/DOTT, correct cause, and notify destination.", levels: ALL_LEVELS, tone: "urgent" },
    ],
    emt: [
      "Continuously monitor the airway, SpO₂, patient color, chest movement, and ventilator connection; manually ventilate immediately if failure occurs.",
      "Report alarms, loss of waveform, increased resistance, or clinical deterioration.",
    ],
    aemt: [
      "Perform all EMT care plus capnography, authorized airway care, suctioning, and assistance with ventilator troubleshooting.",
    ],
    paramedic: [
      "Use volume assist-control, calculate tidal volume by predicted body weight/height, and titrate FiO₂/PEEP, rate, and flow to the patient's physiology.",
      "For COPD/asthma, use approximately 12/min and I:E 1:4–1:5; for other adults the imported initial rate is 18/min.",
      "Reduce tidal volume in 1 mL/kg steps for plateau pressure above 30 cmH₂O, but not below 4 mL/kg.",
    ],
    treatmentSteps: [
      "Imported initial adult settings: volume assist-control, FiO₂ 100%, PEEP 5 cmH₂O, tidal volume 8 mL/kg predicted body weight, flow 60 L/min.",
      "After approximately 10 minutes, reduce FiO₂ toward 50% and titrate PEEP/FiO₂ to SpO₂ 92–98% when clinically appropriate.",
      "For high PIP with high plateau pressure, suspect compliance problem; high PIP with normal plateau suggests airway/circuit resistance or auto-PEEP.",
    ],
    warnings: [
      "Tidal volume is based on predicted/ideal body weight from height, never actual body weight.",
      "Do not persist with an alarming ventilator when the cause is unclear; disconnect and manually ventilate.",
      "Avoid forcing EtCO₂ to 35–45 in severe obstructive lung disease when this worsens air trapping; suspected head injury remains a specific target population.",
    ],
    clinicalPearls: [
      "DOPES: displacement, obstruction, pneumothorax/pulmonary problem, equipment failure, stacked breaths.",
      "DOTT response: disconnect/decompress, oxygen/BVM, tube check, then tweak settings.",
    ],
  }),
];
