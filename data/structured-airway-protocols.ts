import type {
  ProviderLevel,
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
    references: [
      "Claiborne County EMS approved protocol manual.",
      "Current Tennessee EMS scope of practice and Claiborne County standing orders control when provider scope differs from the imported source.",
    ],
    sourcePdf: input.sourcePdf,
    sourcePages: { start: 1, end: input.pages },
    revisionDate: "2025-09-01",
    lastVerifiedDate: "2026-07-29",
    reviewStatus: "Reviewed",
    reviewFlags: [
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
      "Perform all EMT care plus authorized BIAD placement, intubation procedures within current scope, and continuous waveform capnography once available.",
      "After a failed intubation attempt, change the approach or equipment and strongly consider a BIAD.",
    ],
    paramedic: [
      "Perform all prior care plus advanced airway selection, DAI when authorized, chest decompression when indicated, and surgical airway for cannot-oxygenate/cannot-ventilate failure.",
      "Use waveform capnography continuously and transition immediately to the failed-airway protocol when criteria are met.",
    ],
    treatmentSteps: [
      "Target adult ventilation at approximately 10–12 breaths/min and use EtCO₂ and clinical response to avoid hyperventilation.",
      "Use ROMAN, LEON, RODS, and SMART to anticipate difficulty with BVM, laryngoscopy, BIAD, and cricothyrotomy.",
    ],
    warnings: [
      "Failed airway includes inability to oxygenate at least 90% after an unsuccessful attempt, anatomy unsuitable for further attempts, or three total unsuccessful attempts.",
      "No more than three total intubation attempts by the most experienced AEMT/Paramedic.",
      "Waveform capnography is mandatory after ETT placement and after BIAD placement once available.",
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
    warnings: [
      "No more than three total intubation attempts; every repeated attempt must change the provider, approach, positioning, or equipment.",
      "Do not abandon effective BVM merely to obtain an advanced airway.",
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
      "Drug-assisted airway is optional and requires specific agency authorization, competency, performance improvement, and at least two Paramedics on scene.",
      "Correct hypoxia and hypotension before administering a sedative-paralytic sequence whenever possible.",
    ],
    indications: [
      "Failure to protect the airway, inability to oxygenate, inability to ventilate, or impending airway compromise when drug-assisted airway is authorized.",
    ],
    flow: [
      { title: "DAI Indicated + Authorized?", text: "Airway protection failure • oxygenation/ventilation failure • impending compromise.", levels: ["Paramedic"], tone: "start" },
      { title: "Prepare Completely", text: "Preoxygenate • suction • two IV/IO sites • primary and rescue devices • two Paramedics.", levels: ["Paramedic"], tone: "urgent" },
      { title: "Hypoxic / Hypotensive / Combative?", text: "Use resuscitation-first pathway and correct physiology before paralysis.", levels: ["Paramedic"], tone: "decision" },
      { title: "Induction + Paralysis", text: "Use authorized agent and dose; immediately proceed to airway placement.", levels: ["Paramedic"], tone: "action" },
      { title: "Verify Placement", text: "Continuous waveform EtCO₂, bilateral exam, tube depth, SpO₂, and securement.", levels: ["Paramedic"], tone: "urgent" },
      { title: "Post-Airway Management", text: "Analgesia/sedation, ventilation, monitoring, airway form, and transport.", levels: ["Paramedic"], tone: "transport" },
    ],
    emt: [
      "Assist with preoxygenation, suction, BVM, equipment preparation, physiologic monitoring, and backup airway readiness.",
      "Continue oxygenation and ventilation throughout preparation and between attempts.",
    ],
    aemt: [
      "Perform all EMT care plus authorized vascular access, rescue BIAD support, monitoring, and assistance with the failed-airway plan.",
    ],
    paramedic: [
      "Confirm indications, authorization, two-Paramedic staffing, preoxygenation, two access points, suction, backup airway, and failed-airway plan before medication.",
      "Correct hypoxia/hypotension before paralytic administration, limit attempts, verify with waveform capnography, and begin pain-first post-intubation care.",
    ],
    medications: [
      { name: "Ketamine", dose: "1–2 mg/kg IV/IO; may repeat once. If no access: 4 mg/kg IM, maximum 400 mg.", notes: ["Pediatric use requires direct online order from the Medical Director or Assistant Medical Director under the imported source."] },
      { name: "Etomidate", dose: "0.3 mg/kg IV/IO" },
      { name: "Succinylcholine", dose: "2 mg/kg IV/IO" },
      { name: "Rocuronium", dose: "1 mg/kg IV/IO; may repeat once when succinylcholine is contraindicated" },
    ],
    warnings: [
      "This procedure removes protective airway reflexes and spontaneous breathing; do not begin without complete rescue capability.",
      "At least two Paramedics must be present under the imported source.",
      "DAI during unresolved hypoxia or hypotension substantially increases cardiac-arrest risk.",
      "Complete the required airway evaluation and performance-improvement documentation.",
    ],
    clinicalPearls: [
      "When BVM maintains saturation at least 90%, continued basic airway management may be safer than DAI during a short transport.",
      "BIAD is preferred while resuscitating severe hypoxia or hypotension.",
    ],
  }),

  airwayProtocol({
    id: "ar-04",
    title: "Adult COPD / Asthma",
    sourcePdf: "/protocols/claiborne/ar-04-copd-asthma-protocol.pdf",
    pages: 2,
    overview: [
      "Differentiate wheezing/bronchospasm from stridor and other causes of respiratory distress while supporting oxygenation and ventilation.",
      "Escalate early for silent chest, fatigue, altered mental status, poor air movement, or impending respiratory failure.",
    ],
    indications: [
      "Adult with respiratory distress from suspected asthma, COPD, reactive airway disease, bronchospasm, or stridor.",
    ],
    flow: [
      { title: "Respiratory Distress", text: "Assess work of breathing, speech, air movement, SpO₂, lung sounds, and mental status.", levels: ALL_LEVELS, tone: "start" },
      { title: "Wheeze or Stridor?", text: "Treat anaphylaxis immediately when suspected; evaluate cardiac and other causes.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Bronchodilator", text: "Albuterol; add ipratropium and repeat according to response and scope.", levels: ALL_LEVELS, tone: "action" },
      { title: "NIPPV Appropriate?", text: "Consider early when cooperative and hemodynamically stable.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Severe / Not Improving?", text: "Epinephrine • steroid • magnesium • advanced airway preparation.", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Reassess + Transport", text: "Continuous SpO₂, consider EtCO₂, repeat exam, and notify early.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Position for comfort, provide oxygen, assist ventilation when tiring, and administer authorized albuterol.",
      "Use epinephrine immediately for anaphylaxis within EMT scope and request ALS for severe distress or poor response.",
    ],
    aemt: [
      "Perform all EMT care plus NIPPV, vascular access, repeated albuterol/ipratropium, nebulized epinephrine for stridor, and authorized IM epinephrine.",
    ],
    paramedic: [
      "Perform all prior care plus cardiac/EtCO₂ monitoring, steroid and magnesium therapy, advanced airway management, and treatment of competing diagnoses.",
    ],
    medications: [
      { name: "Albuterol", dose: "2.5–5 mg nebulized; repeat as needed ×3 and continue when clinically indicated" },
      { name: "Ipratropium", dose: "0.5 mg nebulized with albuterol" },
      { name: "Epinephrine 1:1,000", dose: "0.3–0.5 mg IM when indicated" },
      { name: "Nebulized epinephrine", dose: "1 mg of 1:1,000 in 2 mL normal saline; may repeat once for stridor" },
      { name: "Methylprednisolone", dose: "125 mg IV/IO/IM" },
      { name: "Magnesium sulfate", dose: "2 g IV/IO over 10–20 minutes" },
    ],
    warnings: [
      "A silent chest with respiratory distress is a pre-arrest finding.",
      "Consider removing NIPPV when systolic pressure remains below 100 mmHg despite treatment.",
      "EMT medication use must follow current Tennessee and Claiborne authorization.",
    ],
  }),

  airwayProtocol({
    id: "ar-05",
    title: "Pediatric Airway",
    sourcePdf: "/protocols/claiborne/ar-05-pediatric-airway-protocol.pdf",
    pages: 2,
    overview: [
      "Begin with positioning, suction, basic adjuncts, and effective BVM; BVM is acceptable when it provides adequate pediatric oxygenation and ventilation.",
      "Use the pediatric medication/skill resuscitation system and age/size-appropriate equipment.",
    ],
    indications: [
      "Pediatric patient with actual or threatened airway obstruction, inadequate oxygenation, inadequate ventilation, or inability to protect the airway.",
    ],
    flow: [
      { title: "Airway / Breathing Adequate?", text: "Assess rate, effort, patency, oxygenation, ventilation, tone, and mental status.", levels: ALL_LEVELS, tone: "start" },
      { title: "Basic Maneuvers First", text: "Position • suction • OPA/NPA • age-sized BVM ± PEEP.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Foreign-Body Obstruction?", text: "Use pediatric obstruction procedure and direct visualization when authorized.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Support Still Needed?", text: "Oxygen • BVM • BIAD • intubation based on age, anatomy, need, and scope.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Effective?", text: "Maintain SpO₂ at least 92%; move to pediatric failed-airway protocol when ineffective.", levels: ALL_LEVELS, tone: "action" },
      { title: "Confirm + Reassess", text: "Waveform EtCO₂ after ETT/BIAD, secure device, monitor, and transport.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Position, suction, use basic adjuncts, and provide effective age-appropriate BVM ventilation; avoid unnecessary advanced-airway attempts.",
      "Maintain warmth and use the pediatric resuscitation system for equipment sizing and dosing support.",
    ],
    aemt: [
      "Perform all EMT care plus authorized pediatric BIAD or intubation procedures and continuous waveform capnography.",
      "After a failed attempt, change approach/equipment and move promptly toward a rescue airway.",
    ],
    paramedic: [
      "Perform all prior care plus DAI only when authorized, chest decompression when indicated, and age-appropriate cricothyrotomy as an absolute last resort.",
      "Secure the tube carefully and manually stabilize it during every movement.",
    ],
    treatmentSteps: [
      "Suggested ventilation rates from the imported source: neonate 30/min, toddler 25/min, school age 20/min, adolescent 10–12/min.",
      "Estimated ETT depth is approximately 3 × tube diameter; estimated uncuffed size is (16 + age in years) ÷ 4.",
    ],
    warnings: [
      "No more than three total intubation attempts.",
      "Pediatric ketamine requires direct online order from the Medical Director or Assistant Medical Director under the imported source.",
      "Needle cricothyrotomy under age 10 is a rare last-resort procedure requiring specific agency authorization, training, and equipment.",
    ],
  }),

  airwayProtocol({
    id: "ar-06",
    title: "Pediatric Failed Airway",
    sourcePdf: "/protocols/claiborne/ar-06-pediatric-failed-airway-protocol.pdf",
    pages: 2,
    overview: [
      "Stop repeated attempts and return to effective BVM ventilation as soon as pediatric airway failure is recognized.",
      "Use a BIAD when appropriate; cricothyrotomy is a rare final rescue based on age and agency authorization.",
    ],
    indications: [
      "Unable to ventilate and maintain oxygen saturation at least 90% during or after an unsuccessful pediatric intubation attempt.",
      "Anatomy inconsistent with continued attempts or three total unsuccessful attempts.",
    ],
    flow: [
      { title: "Declare Failed Airway", text: "Cannot oxygenate/ventilate • unsuitable anatomy • or three failed attempts.", levels: ALL_LEVELS, tone: "start" },
      { title: "Optimize BVM", text: "Position • suction • OPA/NPA • two-person seal • oxygen • PEEP.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "SpO₂ ≥92%?", text: "Yes: continue BVM. No: use authorized pediatric rescue airway.", levels: ALL_LEVELS, tone: "decision" },
      { title: "BIAD / Video Rescue", text: "Use age/size-appropriate device and change approach.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Cannot Oxygenate?", text: "Consider authorized age-appropriate cricothyrotomy only as a last resort.", levels: ["Paramedic"], tone: "urgent" },
      { title: "Confirm + Transport", text: "Waveform EtCO₂, secure device, post-airway care, and immediate notification.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Stop further attempts, optimize two-person BVM with adjuncts and suction, and continue when oxygenation and ventilation are effective.",
    ],
    aemt: [
      "Perform all EMT care plus authorized pediatric BIAD/video-laryngoscopy rescue and continuous waveform capnography.",
    ],
    paramedic: [
      "Perform all prior care and consider age-appropriate cricothyrotomy only for persistent cannot-oxygenate/cannot-ventilate failure.",
      "Follow all agency authorization and pediatric rescue-airway requirements.",
    ],
    warnings: [
      "No more than three total intubation attempts; each attempt must change the approach or equipment.",
      "Do not abandon effective BVM solely to place an advanced airway.",
    ],
  }),

  airwayProtocol({
    id: "ar-07",
    title: "Pediatric Respiratory Distress",
    sourcePdf: "/protocols/claiborne/ar-07-pediatric-respiratory-distress-protocol.pdf",
    pages: 2,
    overview: [
      "Assess pediatric respiratory distress by appearance, work of breathing, air movement, SpO₂, and mental status.",
      "Distinguish wheeze/bronchospasm from stridor/croup, bronchiolitis, epiglottitis, anaphylaxis, and foreign-body obstruction.",
    ],
    indications: [
      "Pediatric patient with asthma, reactive airway disease, wheezing, bronchospasm, croup, stridor, or other respiratory distress.",
    ],
    flow: [
      { title: "Pediatric Distress", text: "Position of comfort • appearance • work • air movement • SpO₂ • mental status.", levels: ALL_LEVELS, tone: "start" },
      { title: "Wheeze or Stridor?", text: "Consider asthma, croup, epiglottitis, bronchiolitis, anaphylaxis, or foreign body.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Initial Nebulizer", text: "Albuterol; use nebulized epinephrine for indicated stridor/croup pathway.", levels: ALL_LEVELS, tone: "action" },
      { title: "Improving?", text: "Repeat treatment and continue monitoring; obtain access when severe or persistent.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Severe / Impending Failure?", text: "IM epinephrine • steroid • magnesium • airway/ventilation escalation.", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Reassess + Transport", text: "Continuous SpO₂, consider EtCO₂, maintain warmth, and notify early.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Allow position of comfort, minimize agitation, provide oxygen, assist ventilation when tiring, and administer authorized albuterol.",
      "Treat anaphylaxis immediately and avoid airway manipulation when epiglottitis is suspected.",
    ],
    aemt: [
      "Perform all EMT care plus vascular access, repeated albuterol/ipratropium, nebulized epinephrine, and authorized IM epinephrine.",
    ],
    paramedic: [
      "Perform all prior care plus steroid, magnesium, cardiac/EtCO₂ monitoring, and advanced airway support for impending failure.",
    ],
    medications: [
      { name: "Albuterol", dose: "1.25–2.5 mg nebulized; repeat as needed ×3 and continue when indicated" },
      { name: "Ipratropium", dose: "0.5 mg nebulized with albuterol" },
      { name: "Nebulized epinephrine", dose: "1 mg of 1:1,000 in 2 mL normal saline; may repeat once" },
      { name: "Epinephrine 1:1,000", dose: "0.01 mg/kg IM; maximum 0.3 mg" },
      { name: "Methylprednisolone", dose: "2 mg/kg IV/IO/IM; maximum 125 mg" },
      { name: "Magnesium sulfate", dose: "40 mg/kg IV/IO over 10–20 minutes; maximum 2 g" },
    ],
    warnings: [
      "Do not force a child supine; allow the position that best maintains the airway.",
      "Drooling, rapid onset, fever, and tripod positioning suggest epiglottitis; airway manipulation may cause complete obstruction.",
      "A silent chest is a pre-arrest finding.",
    ],
  }),

  airwayProtocol({
    id: "ar-08",
    title: "Post-Intubation / BIAD Management",
    sourcePdf: "/protocols/claiborne/ar-08-post-intubation-biad-management-protocol.pdf",
    pages: 2,
    overview: [
      "Continuously confirm airway position, oxygenation, ventilation, securement, analgesia, and sedation after ETT or BIAD placement.",
      "Treat pain first; paralysis does not provide analgesia or sedation.",
    ],
    indications: [
      "Any patient after successful endotracheal intubation or BIAD placement.",
    ],
    flow: [
      { title: "ETT / BIAD Placed", text: "Confirm success with waveform EtCO₂ and clinical examination.", levels: ALL_LEVELS, tone: "start" },
      { title: "Secure + Ventilate", text: "Maintain SpO₂ at least 92%, age-appropriate rate, and EtCO₂ target.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Monitor Continuously", text: "Waveform EtCO₂ • SpO₂ • cardiac monitor • tube depth • breath sounds.", levels: ALL_LEVELS, tone: "action" },
      { title: "Pain / Anxiety / Movement?", text: "Treat pain first, then add sedation when needed.", levels: ["AEMT", "Paramedic"], tone: "decision" },
      { title: "Still Unsafe Movement?", text: "Paralysis is last resort only after adequate analgesia and sedation.", levels: ["Paramedic"], tone: "urgent" },
      { title: "Transport + Reconfirm", text: "Recheck after every move; use DOPE for deterioration and notify early.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Manually stabilize and secure the device, ventilate at the appropriate rate, monitor SpO₂, and reassess after every move.",
      "Immediately report loss of waveform, resistance, reduced breath sounds, hypoxia, or changing tube depth.",
    ],
    aemt: [
      "Perform all EMT care plus waveform capnography, IV/IO access, authorized ventilation support, and medications within current scope.",
    ],
    paramedic: [
      "Perform all prior care plus pain-first analgesia/sedation, mechanical ventilation, and rescue management for DOPE deterioration.",
      "Use paralysis only as a last resort after adequate analgesia and sedation; continue sedation after paralysis.",
    ],
    medications: [
      { name: "Ketamine", dose: "1.5–2 mg/kg IV/IO" },
      { name: "Fentanyl", dose: "50–75 mcg IV/IO; repeat every 5 minutes as needed, maximum 300 mcg" },
      { name: "Morphine", dose: "4 mg IV/IO; repeat 2 mg every 5 minutes, maximum 10 mg" },
      { name: "Midazolam", dose: "2–2.5 mg IV/IO; repeat every 3–5 minutes, maximum 10 mg" },
      { name: "Vecuronium", dose: "10 mg (0.1 mg/kg) IV/IO when last-resort paralysis is required" },
      { name: "Rocuronium", dose: "0.6–1.2 mg/kg IV/IO once; not indicated in pediatrics under the imported source" },
    ],
    warnings: [
      "Waveform capnography is mandatory after ETT and after BIAD placement once available.",
      "A paralyzed patient may be awake and in pain without visible movement; maintain analgesia and sedation.",
      "Propofol may not be initiated or bolused by field Paramedics under the imported source; approved interfacility infusion only.",
    ],
    clinicalPearls: [
      "Elevate the head 10–20 degrees when possible to reduce aspiration risk.",
      "For sudden deterioration, disconnect the ventilator, manually ventilate, and evaluate DOPE.",
    ],
  }),

  airwayProtocol({
    id: "ar-09",
    title: "Ventilator Emergencies",
    sourcePdf: "/protocols/claiborne/ar-09-ventilator-emergencies-protocol.pdf",
    pages: 1,
    overview: [
      "Use the caregiver and the patient's functioning equipment whenever possible, but never allow ventilator troubleshooting to delay manual ventilation.",
      "If the cause cannot be corrected immediately, disconnect the ventilator and ventilate with a BVM.",
    ],
    indications: [
      "Ventilator-dependent patient with alarm, equipment failure, hypoxia, abnormal EtCO₂, respiratory distress, or suspected airway/circuit problem.",
    ],
    flow: [
      { title: "Ventilator Problem", text: "Ask caregiver for baseline, current settings, alarm meaning, and usual rescue plan.", levels: ALL_LEVELS, tone: "start" },
      { title: "Oxygenation / Ventilation Adequate?", text: "Compare SpO₂ and EtCO₂ with the patient's documented baseline.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Check Simple Causes", text: "Oxygen source • power • circuit connection/leak • filter • water • settings.", levels: ALL_LEVELS, tone: "action" },
      { title: "Use DOPE", text: "Displacement • obstruction • pneumothorax • equipment failure.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Cause Corrected?", text: "No: remove from ventilator and manually ventilate with BVM.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Transport", text: "Bring ventilator and knowledgeable caregiver; continuous SpO₂/EtCO₂ and notification.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Ask the caregiver, check power/oxygen/circuit, assess the tracheostomy or ETT, suction when indicated, and immediately use BVM if correction is not rapid.",
      "Bring the patient's ventilator to the hospital even when malfunctioning.",
    ],
    aemt: [
      "Perform all EMT care plus advanced suctioning, tracheostomy/BIAD support, capnography, and vascular access when indicated.",
    ],
    paramedic: [
      "Perform all prior care, maintain functioning home settings when appropriate, and manage airway, pneumothorax, or other physiologic cause.",
      "Transport on the patient's functioning ventilator with current settings when safe.",
    ],
    warnings: [
      "Do not delay manual BVM ventilation while troubleshooting a patient who is deteriorating.",
      "Continuous SpO₂ and EtCO₂ are required during assessment and transport under the imported source.",
    ],
  }),

  airwayProtocol({
    id: "ar-10",
    title: "Tracheostomy Tube Emergencies",
    sourcePdf: "/protocols/claiborne/ar-10-tracheostomy-tube-emergencies-protocol.pdf",
    pages: 1,
    overview: [
      "Use the caregiver's knowledge and the patient's equipment; distinguish obstruction from displacement and determine whether the patient has a laryngectomy.",
      "Remove simple obstructing components, suction, replace the tube when authorized, and ventilate through the stoma when needed.",
    ],
    indications: [
      "Tracheostomy or laryngectomy patient with distress, cyanosis, altered mental status, copious secretions, obstruction, displacement, or decannulation.",
    ],
    flow: [
      { title: "Tracheostomy Emergency", text: "Ask caregiver: trach vs laryngectomy, tube type/size, baseline, and rescue plan.", levels: ALL_LEVELS, tone: "start" },
      { title: "Remove Simple Obstruction", text: "Remove obturator, speaking valve, decannulation plug, or inner cannula as present.", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Suction", text: "Preoxygenate, use appropriate catheter/depth, and never force resistance.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Tube Displaced / Absent?", text: "Caregiver or authorized provider replaces trach; appropriately sized ETT may enter stoma.", levels: ["AEMT", "Paramedic"], tone: "decision" },
      { title: "Distress Continues?", text: "Assist ventilation via trach/ETT and follow age-appropriate respiratory pathway.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Monitor + Transport", text: "Continuous SpO₂, EtCO₂ when available, secure tube, and notify destination.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Use the caregiver and patient equipment, provide oxygen, assist ventilation at the stoma, and prepare suction/replacement equipment.",
      "Determine whether oral/nasal ventilation is possible; a total laryngectomy disconnects the upper airway from the lungs.",
    ],
    aemt: [
      "Perform all EMT care plus remove obstructing valves/inner cannula, perform authorized suctioning, and replace the tracheostomy or place an appropriately sized ETT in the stoma.",
    ],
    paramedic: [
      "Perform all prior care and manage persistent obstruction, displacement, pneumothorax, or respiratory failure with advanced airway support.",
    ],
    treatmentSteps: [
      "Estimate suction catheter size by doubling the inner tracheostomy diameter and rounding down.",
      "Typical suction depth is 3–6 cm or the caregiver-specified depth; limit each attempt to 10 seconds and preoxygenate between attempts.",
    ],
    warnings: [
      "Do not force a suction catheter; inability to pass suggests obstruction requiring tube change.",
      "Deflate the cuff before removing a cuffed tracheostomy tube.",
      "Do not attempt oral or nasal ventilation after total laryngectomy; ventilate through the stoma.",
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
