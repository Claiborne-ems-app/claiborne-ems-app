import type {
  ProviderLevel,
  ProtocolCareModule,
  ProtocolFlowNode,
  StructuredProtocolContent,
} from "../lib/protocols/structured-content";

const ALL_LEVELS: ProviderLevel[] = ["EMT", "AEMT", "Paramedic"];

type TraumaProtocolInput = {
  id: string;
  title: string;
  sourcePdf: string;
  overview: string[];
  flow: ProtocolFlowNode[];
  emt: string[];
  aemt: string[];
  paramedic: string[];
  assessment?: { title: string; items: string[] }[];
  treatmentSteps?: string[];
  warnings?: string[];
  clinicalPearls?: string[];
};

function providerActions(input: TraumaProtocolInput): ProtocolCareModule[] {
  return [
    {
      title: "Provider-Level Actions",
      summary:
        "Perform all immediately indicated care within scope without delaying rapid trauma transport.",
      levels: [
        { level: "EMT", actions: input.emt },
        { level: "AEMT", actions: input.aemt },
        { level: "Paramedic", actions: input.paramedic },
      ],
    },
  ];
}

function traumaProtocol(
  input: TraumaProtocolInput
): StructuredProtocolContent {
  return {
    id: input.id,
    title: input.title,
    categoryId: "tb",
    category: "Trauma & Burns",
    overview: input.overview,
    flow: input.flow,
    careModules: providerActions(input),
    indications: [
      `Patient with suspected ${input.title.toLowerCase()} requiring prehospital assessment or treatment.`,
    ],
    contraindications: [],
    assessment: input.assessment ?? [],
    treatmentSteps: input.treatmentSteps ?? [],
    medications: [],
    warnings: input.warnings ?? [],
    clinicalPearls: input.clinicalPearls ?? [],
    specialPopulations: [],
    references: [
      "Claiborne County EMS approved protocol manual.",
      "Current Tennessee EMS scope of practice and Claiborne County standing orders control when provider scope differs from the imported source.",
    ],
    sourcePdf: input.sourcePdf,
    sourcePages: { start: 1, end: input.id === "tb-04" || input.id === "tb-08" ? 1 : 2 },
    revisionDate: "2025-09-01",
    lastVerifiedDate: "2026-07-29",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director approval is required before clinical release.",
      "Verify medication dosing and invasive procedures against current Claiborne County standing orders.",
      "The original imported PDF remains available for source comparison.",
    ],
  };
}

export const structuredTraumaProtocols: StructuredProtocolContent[] = [
  traumaProtocol({
    id: "tb-01",
    title: "Blast Injury / Incident",
    sourcePdf: "/protocols/claiborne/tb-01-blast-injury-protocol.pdf",
    overview: [
      "Treat every blast as a potentially unsafe, intentional event until authorities determine otherwise.",
      "Expect combined primary, secondary, and tertiary blast injury, including barotrauma, penetrating trauma, burns, crush injury, and toxic exposure.",
    ],
    flow: [
      { title: "Scene Safe?", text: "Stage for hazards, structural collapse, fire, hazardous material, or secondary device; activate the agency MCI plan when indicated.", levels: ALL_LEVELS, tone: "start" },
      { title: "Triage + Rapid Removal", text: "Quantify patients, request resources, apply the local MCI/triage process when indicated, and begin load-and-go care.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Identify Injury Pattern", text: "Airway burn • blast lung • hemorrhage • penetrating trauma • crush; consider radiation only when the mechanism suggests a radiological or nuclear event.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Treat Immediate Threats", text: "Airway and ventilation • hemorrhage control • chest seal • hypothermia prevention • reassessed shock care. Ventilate when clinically necessary.", levels: ALL_LEVELS, tone: "action" },
      { title: "Blast Lung Injury?", text: "Dyspnea, hypoxia, hemoptysis, wheeze, chest pain, or diminished breath sounds; perform serial respiratory assessment, SpO₂, lung sounds, and monitoring when available.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Rapid Trauma Transport", text: "Use trauma/burn destination plan and notify early, especially for respiratory compromise, penetrating injury, major burn, crush injury, or multisystem trauma.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Maintain scene awareness, perform triage, control major hemorrhage, seal open chest wounds, support ventilation, and prevent hypothermia.",
      "Assess for hearing loss, ocular injury, burns, penetrating injury, abdominal injury, amputation, and crush syndrome.",
    ],
    aemt: [
      "Perform all EMT care plus IV access and reassessed crystalloid only when indicated for shock after hemorrhage control, without delaying transport.",
      "Use authorized airway adjuncts and monitor closely for worsening blast-lung physiology.",
    ],
    paramedic: [
      "Perform all prior care plus advanced airway management, cardiac/EtCO₂ monitoring, and chest decompression when indicated.",
      "When positive-pressure ventilation is clinically necessary for suspected blast lung injury, use the lowest effective pressures/volumes and monitor closely for deterioration.",
    ],
    warnings: [
      "Do not approach a patient who may be attached to wires, a package, or a triggering mechanism; withdraw and notify law enforcement.",
      "Do not withhold needed ventilation. Avoid unnecessarily high positive pressures/volumes and excessive fluids in suspected blast lung injury; if air transport is used, notify the flight crew of the concern.",
    ],
    clinicalPearls: [
      "Tympanic membrane rupture and hearing loss are common and may impair communication.",
      "Secondary blast injuries from debris and shrapnel are the most common cause of death.",
    ],
  }),

  traumaProtocol({
    id: "tb-02",
    title: "Chemical and Electrical Burn",
    sourcePdf: "/protocols/claiborne/tb-02-chemical-and-electrical-burn-protocol.pdf",
    overview: [
      "Stop the exposure while protecting responders, then identify chemical, electrical, lightning, or associated traumatic injury.",
      "Chemical and electrical burns may cause severe internal injury despite limited external findings.",
    ],
    flow: [
      { title: "Scene / PPE", text: "Identify agent or electrical source; do not enter until hazards are controlled.", levels: ALL_LEVELS, tone: "start" },
      { title: "Stop Exposure", text: "Disconnect power when safe • remove contaminated clothing • brush dry chemical.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Decontaminate", text: "Irrigate chemical exposure as directed; protect unaffected skin and responders.", levels: ALL_LEVELS, tone: "action" },
      { title: "Airway or Trauma Threat?", text: "Treat inhalation injury, dysrhythmia, fall, blast, or multisystem trauma.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Monitor + Treat", text: "Cardiac monitoring, vascular access, burn care, pain control, and reassessment.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Burn-Center Transport", text: "Use trauma/burn destination criteria and notify early.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Protect the crew, stop exposure, remove contaminated clothing and jewelry, brush off dry chemicals, and begin indicated irrigation.",
      "Cover burns with clean dry dressings, prevent hypothermia, manage associated trauma, and transport promptly.",
    ],
    aemt: [
      "Perform all EMT care plus vascular access, authorized fluid therapy, and analgesia within standing orders.",
      "Apply cardiac monitoring after electrical or lightning injury when available and do not delay transport.",
    ],
    paramedic: [
      "Perform all prior care plus advanced airway treatment, dysrhythmia management, and treatment of shock or compartment-threatening injury.",
      "Consult Poison Control, the burn center, or Medical Control when agent-specific care is needed.",
    ],
    warnings: [
      "Do not neutralize a chemical on the patient unless specifically directed; chemical reactions may generate heat.",
      "Do not apply ice, wet sheets, creams, or ointments to significant burns.",
    ],
    clinicalPearls: [
      "Electrical current may cause dysrhythmia, deep tissue injury, rhabdomyolysis, fractures, or traumatic falls.",
      "Assess entrance and exit wounds, distal perfusion, neurologic status, and circumferential injury.",
    ],
  }),

  traumaProtocol({
    id: "tb-03",
    title: "Crush Syndrome",
    sourcePdf: "/protocols/claiborne/tb-03-crush-syndrome-protocol.pdf",
    overview: [
      "Suspect crush syndrome after prolonged compression of a large muscle mass, especially an extremity or torso.",
      "Begin resuscitation before release when feasible because reperfusion can cause sudden hyperkalemia, acidosis, shock, and cardiac arrest.",
    ],
    flow: [
      { title: "Entrapment / Compression", text: "Confirm scene safety, duration, body region, access, and rescue plan.", levels: ALL_LEVELS, tone: "start" },
      { title: "Crush Syndrome Risk?", text: "Large muscle mass • prolonged entrapment • swelling • neurologic deficit • shock.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Before Release", text: "Airway • monitoring • IV/IO • fluids • prepare hyperkalemia treatment.", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Release + Reassess", text: "Watch for hypotension, dysrhythmia, respiratory failure, and arrest.", levels: ALL_LEVELS, tone: "action" },
      { title: "Treat Complications", text: "Shock, hyperkalemia, pain, compartment syndrome, and associated trauma.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Rapid Trauma Transport", text: "Minimize scene delay and notify the destination early.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Coordinate safe rescue, control bleeding, manage airway and ventilation, prevent hypothermia, splint as indicated, and document compression time.",
      "Do not delay extrication for nonessential procedures when the scene is unsafe.",
    ],
    aemt: [
      "Perform all EMT care plus large-bore vascular access and authorized crystalloid before release when feasible.",
      "Monitor rhythm and perfusion and prepare for rapid deterioration at the moment of release.",
    ],
    paramedic: [
      "Perform all prior care plus protocol-directed treatment for suspected hyperkalemia, severe pain, dysrhythmia, and shock.",
      "Coordinate the timing of release with rescue personnel and ensure resuscitation medications and defibrillation are immediately available.",
    ],
    warnings: [
      "Do not apply a prophylactic tourniquet solely because crush syndrome is suspected unless required for hemorrhage control or directed by protocol.",
      "Reperfusion-related deterioration may occur immediately after the compressive force is removed.",
    ],
  }),

  traumaProtocol({
    id: "tb-04",
    title: "Extremity Trauma",
    sourcePdf: "/protocols/claiborne/tb-04-extremity-trauma-protocol.pdf",
    overview: [
      "Prioritize hemorrhage control and neurovascular preservation in extremity injury.",
      "Treat amputations, open fractures, dislocations, crush injury, and compartment syndrome as time-sensitive trauma.",
    ],
    flow: [
      { title: "Extremity Injury", text: "Expose, identify life-threatening hemorrhage, and assess associated trauma.", levels: ALL_LEVELS, tone: "start" },
      { title: "Major Hemorrhage?", text: "Direct pressure • wound packing • tourniquet when indicated.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Check CSM", text: "Circulation, sensation, and movement before manipulation or splinting.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Align / Splint", text: "Cover open wounds, stabilize joints above and below, and reassess CSM.", levels: ALL_LEVELS, tone: "action" },
      { title: "Pain / Shock Care", text: "Prevent hypothermia and provide authorized analgesia and vascular access.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Appropriate Destination", text: "Rapid transport for vascular compromise, amputation, crush, or multisystem trauma.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Control bleeding, cover open wounds, assess distal circulation/sensation/movement, splint, and reassess after every intervention.",
      "Wrap amputated tissue in moist sterile gauze, seal in a bag, and keep cool without direct contact with ice.",
    ],
    aemt: [
      "Perform all EMT care plus vascular access, fluid therapy for shock, and authorized analgesia.",
      "Trend distal perfusion and report any deterioration immediately.",
    ],
    paramedic: [
      "Perform all prior care plus advanced pain management and resuscitation of hemorrhagic shock within protocol.",
      "Coordinate direct trauma-center transport when limb or life is threatened.",
    ],
    warnings: [
      "Do not delay transport attempting perfect anatomic alignment.",
      "A pulseless extremity, expanding hematoma, severe pain out of proportion, or tense swelling requires urgent specialty care.",
    ],
  }),

  traumaProtocol({
    id: "tb-05",
    title: "Head Trauma",
    sourcePdf: "/protocols/claiborne/tb-05-head-trauma-protocol.pdf",
    overview: [
      "Prevent secondary brain injury by avoiding hypoxia, hypotension, hyperventilation, and transport delay.",
      "Anticoagulant or antiplatelet use, age, mechanism, loss of consciousness, vomiting, seizure, and neurologic change increase risk.",
    ],
    flow: [
      { title: "Head Injury", text: "Assess mechanism, loss of consciousness, anticoagulants, seizure, vomiting, and baseline.", levels: ALL_LEVELS, tone: "start" },
      { title: "Primary Survey", text: "Protect airway and spine as indicated; control bleeding without compressing unstable skull injury.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "GCS + Pupils", text: "Document GCS components, pupils, focal deficits, and repeated neurologic examinations.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Prevent Secondary Injury", text: "Maintain oxygenation, ventilation, perfusion, glucose, and temperature.", levels: ALL_LEVELS, tone: "action" },
      { title: "Herniation Signs?", text: "Falling GCS • unilateral dilated pupil • abnormal posturing • Cushing response.", levels: ["AEMT", "Paramedic"], tone: "decision" },
      { title: "Trauma-Center Transport", text: "Minimize scene time and provide serial GCS and early notification.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Maintain airway, oxygenation, spinal motion restriction when indicated, bleeding control, serial GCS/pupils, and rapid transport.",
      "Identify anticoagulants, antiplatelets, seizure, vomiting, skull signs, and neurologic deterioration.",
    ],
    aemt: [
      "Perform all EMT care plus vascular access and protocol-directed treatment of hypotension without delaying transport.",
      "Use authorized airway adjuncts and EtCO₂ monitoring when available.",
    ],
    paramedic: [
      "Perform all prior care plus advanced airway management and controlled ventilation when the patient cannot protect the airway.",
      "Use protocol-directed herniation management only when clinical signs are present; avoid routine hyperventilation.",
    ],
    warnings: [
      "A single normal examination does not exclude intracranial hemorrhage, especially in anticoagulated or older patients.",
      "Do not aggressively control hypertension in suspected traumatic brain injury unless another approved protocol requires it.",
    ],
    clinicalPearls: [
      "Hypotension in isolated head injury should prompt a search for extracranial hemorrhage.",
      "Trend the individual eye, verbal, and motor GCS components rather than documenting only a total score.",
    ],
  }),

  traumaProtocol({
    id: "tb-06",
    title: "Multiple Trauma",
    sourcePdf: "/protocols/claiborne/tb-06-multiple-trauma-protocol.pdf",
    overview: [
      "Use a rapid XABCDE approach, treat immediate threats, and minimize scene time for serious or critical trauma.",
      "Destination selection and early notification are part of treatment.",
    ],
    flow: [
      { title: "Major Trauma", text: "Scene safety • mechanism • resources • consider air medical / rescue.", levels: ALL_LEVELS, tone: "start" },
      { title: "XABCDE", text: "Exsanguination • airway • breathing • circulation • disability • exposure.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Critical / Serious?", text: "Physiology, anatomy, mechanism, age, anticoagulants, and special considerations.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Treat Immediate Threats", text: "Hemorrhage control • ventilation • chest seal/decompression • pelvic stabilization.", levels: ALL_LEVELS, tone: "action" },
      { title: "Resuscitate En Route", text: "Access, shock care, analgesia, monitoring, warming, and serial reassessment.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Trauma Destination", text: "Limit scene time, use destination plan, and notify early.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Perform rapid XABCDE, control hemorrhage, support airway/ventilation, seal open chest wounds, stabilize the pelvis and fractures, and prevent hypothermia.",
      "Package promptly; complete the secondary examination during transport when possible.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access, authorized shock resuscitation, and airway support during transport.",
      "Trend mental status, perfusion, respiratory status, and response to treatment.",
    ],
    paramedic: [
      "Perform all prior care plus advanced airway treatment, chest decompression, analgesia, and protocol-directed hemorrhagic-shock resuscitation.",
      "Lead destination, air-medical, and Medical Control decisions without extending scene time.",
    ],
    warnings: [
      "Do not delay transport for IV attempts, detailed examination, splinting, or procedures that can be completed en route.",
      "Prevent hypothermia throughout trauma resuscitation.",
    ],
  }),

  traumaProtocol({
    id: "tb-07",
    title: "Radiation Incident",
    sourcePdf: "/protocols/claiborne/tb-07-radiation-incident-protocol.pdf",
    overview: [
      "Radiation exposure, external contamination, and internal contamination are distinct problems.",
      "Treat life threats first while using time, distance, shielding, PPE, and contamination control.",
    ],
    flow: [
      { title: "Radiation Hazard", text: "Stage until incident command identifies a safe zone and appropriate PPE.", levels: ALL_LEVELS, tone: "start" },
      { title: "Life Threat?", text: "Do not delay lifesaving airway, breathing, or hemorrhage care.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Contaminated?", text: "Remove clothing, contain belongings, survey if equipped, and decontaminate.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Assess Exposure", text: "Source • time • distance • shielding • symptoms • associated blast/burn/trauma.", levels: ALL_LEVELS, tone: "action" },
      { title: "Coordinate Experts", text: "HazMat, radiation safety, Poison Control, receiving facility, and Medical Control.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Controlled Transport", text: "Notify destination before departure and prevent ambulance contamination.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Use PPE and contamination control, remove clothing when directed, bag belongings, treat immediate threats, and prevent spread.",
      "Record source information, exposure time, distance, shielding, symptoms, and decontamination performed.",
    ],
    aemt: [
      "Perform all EMT care plus vascular access and supportive treatment within standing orders.",
      "Coordinate monitoring and ambulance preparation with incident command.",
    ],
    paramedic: [
      "Perform all prior care plus advanced supportive care and consultation with Medical Control and radiation experts.",
      "Manage associated trauma, burns, airway injury, shock, or dysrhythmia under the appropriate protocols.",
    ],
    warnings: [
      "Do not enter a radiation hot zone without authorization, monitoring, training, and appropriate PPE.",
      "Contamination alone is not a reason to withhold lifesaving care.",
    ],
  }),

  traumaProtocol({
    id: "tb-08",
    title: "Selective Spinal Immobilization",
    sourcePdf: "/protocols/claiborne/tb-08-selective-spinal-immobilization-protocol.pdf",
    overview: [
      "Apply spinal motion restriction selectively after blunt trauma based on reliability, symptoms, examination, and mechanism.",
      "The goal is motion restriction and safe handling, not routine prolonged placement on a rigid long board.",
    ],
    flow: [
      { title: "Blunt Trauma", text: "Manually stabilize when spinal injury is reasonably suspected.", levels: ALL_LEVELS, tone: "start" },
      { title: "Reliable Exam?", text: "Normal alertness • no intoxication • no distracting injury • effective communication.", levels: ALL_LEVELS, tone: "decision" },
      { title: "High-Risk Finding?", text: "Midline pain/tenderness • neurologic deficit • deformity • concerning mechanism.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Restriction Indicated", text: "Use cervical collar when appropriate and minimize spinal movement.", levels: ALL_LEVELS, tone: "action" },
      { title: "Restriction Not Indicated", text: "Document negative assessment and reassess if symptoms change.", levels: ALL_LEVELS, tone: "action" },
      { title: "Transport + Reassess", text: "Use the safest patient position and repeat neurologic examination.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Assess reliability, midline pain/tenderness, neurologic findings, deformity, distracting injury, intoxication, and mechanism.",
      "Apply motion restriction and collar when indicated; pad voids, protect pressure points, and reassess CSM.",
    ],
    aemt: [
      "Perform all EMT care and support safe positioning, airway care, analgesia, and serial neurologic reassessment within scope.",
    ],
    paramedic: [
      "Perform all prior care, resolve equivocal examinations, and manage airway or ventilation while minimizing cervical motion.",
      "Document the clinical basis for applying or clearing spinal motion restriction.",
    ],
    warnings: [
      "Do not force the head or neck into neutral alignment when pain, resistance, neurologic change, or airway compromise occurs.",
      "Penetrating trauma without neurologic deficit generally does not benefit from routine spinal immobilization and should not have transport delayed.",
    ],
  }),

  traumaProtocol({
    id: "tb-09",
    title: "Thermal Burn",
    sourcePdf: "/protocols/claiborne/tb-09-thermal-burn-protocol.pdf",
    overview: [
      "Stop the burning process, identify airway or associated trauma, estimate partial- and full-thickness TBSA, and prevent hypothermia.",
      "Burns involving the airway, face, hands, feet, perineum, major joints, circumferential extremities, or significant TBSA require specialty destination consideration.",
    ],
    flow: [
      { title: "Stop Burning", text: "Remove heat source and constricting items; protect responders.", levels: ALL_LEVELS, tone: "start" },
      { title: "Airway / Trauma Threat?", text: "Assess inhalation injury, respiratory compromise, CO/cyanide risk, and multisystem trauma.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Classify + Estimate TBSA", text: "Count only partial- and full-thickness burns; use palm ≈ 1% for scattered burns.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Minor / Serious / Critical", text: "Use TBSA, depth, location, age, hypotension, GCS, airway, and associated trauma.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Dry Cover + Resuscitate", text: "Prevent hypothermia • IV/IO • fluids when indicated • pain control.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Burn-Center Destination", text: "Use trauma/burn plan, reassess, and notify early.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Stop the burning process, remove jewelry/constricting items, cover with clean dry dressings, prevent hypothermia, and estimate TBSA.",
      "Support airway and ventilation, screen for carbon monoxide/cyanide exposure, and treat associated trauma.",
    ],
    aemt: [
      "Perform all EMT care plus vascular access, authorized crystalloid based on current burn protocol, and non-IM analgesia within scope.",
      "Consider two IV sites for larger burns without delaying transport.",
    ],
    paramedic: [
      "Perform all prior care plus advanced airway management when clinically required, protocol-directed analgesia, and burn resuscitation.",
      "Coordinate direct burn-center transport and consultation for serious or critical burns.",
    ],
    assessment: [
      {
        title: "Burn severity",
        items: [
          "Minor: less than 5% TBSA partial/full thickness, no inhalation injury, normotensive, and GCS 14 or greater.",
          "Serious: 5–15% TBSA, suspected inhalation injury, airway stabilization need, hypotension, or GCS 13 or less.",
          "Critical: greater than 15% TBSA, burns with multiple trauma, or definitive airway compromise.",
        ],
      },
    ],
    treatmentSteps: [
      "For TBSA below 20%, the imported source lists crystalloid at 0.25 mL/kg × TBSA% per hour.",
      "For TBSA 20% or greater, the imported source lists age-based rates: age 5 or younger 125 mL/hr; age 6–14 250 mL/hr; age 15 or older 500 mL/hr.",
      "Lactated Ringer's is preferred when available; confirm current Claiborne dosing before clinical release.",
    ],
    warnings: [
      "Do not include superficial first-degree burns in TBSA.",
      "Do not apply ice or wet dressings to significant burns; burn patients are highly susceptible to hypothermia.",
      "Do not use intramuscular analgesics in burn patients.",
    ],
  }),

  traumaProtocol({
    id: "tb-10",
    title: "Traumatic Arrest",
    sourcePdf: "/protocols/claiborne/tb-10-traumatic-arrest-protocol.pdf",
    overview: [
      "Apply the approved traumatic-arrest withholding and resuscitation criteria while prioritizing immediately reversible traumatic causes.",
      "When resuscitation is indicated, perform essential interventions during rapid transport and keep scene time at or below 15 minutes.",
    ],
    flow: [
      { title: "Traumatic Arrest", text: "Confirm apnea, pulselessness, rhythm when appropriate, DNR/MOST, and obvious-death criteria.", levels: ALL_LEVELS, tone: "start" },
      { title: "Withholding Criteria?", text: "Incompatible injury, decomposition/rigor/lividity, or protocol-defined downtime and rhythm.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Correct Reversible Causes", text: "Hemorrhage • oxygenation/ventilation • bilateral chest decompression • pelvic stabilization.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "CPR / Defibrillation", text: "High-quality CPR and early defibrillation when the rhythm is indicated.", levels: ALL_LEVELS, tone: "action" },
      { title: "ROSC or Transport Candidate?", text: "Witnessed arrest, organized rhythm, signs of life, short trauma-center time, or reversible cause.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Transport / Terminate", text: "Limit scene time, notify early, and follow Medical Control and deceased-person policy.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Confirm arrest and withholding criteria, control catastrophic hemorrhage, support airway/ventilation, apply AED/monitor, stabilize pelvis/fractures, and prevent hypothermia.",
      "Begin rapid transport when resuscitation criteria are met; do not delay for procedures that can occur en route.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access during transport and bilateral needle chest decompression when specifically authorized for traumatic pulseless arrest.",
      "Use authorized airway adjuncts and reassess for signs of life and ROSC.",
    ],
    paramedic: [
      "Perform all prior care plus advanced airway management, rhythm treatment, bilateral chest decompression, and protocol-directed resuscitation.",
      "Apply termination criteria and contact Medical Control when required by current Claiborne policy.",
    ],
    warnings: [
      "Do not apply traumatic-arrest withholding criteria to lightning strike, drowning, or hypothermic arrest; initiate resuscitation.",
      "Do not hyperventilate. Avoid delaying transport for endotracheal intubation or vascular access.",
      "Needle chest decompression at the AEMT level is limited to traumatic pulseless arrest under the imported source and must match current Tennessee authorization.",
    ],
    clinicalPearls: [
      "Treat the trauma triad of death by controlling hemorrhage, limiting scene time, and aggressively preventing hypothermia.",
      "Consider termination when protocol time thresholds are met without ROSC and transport to the closest trauma center is prolonged.",
    ],
  }),
];
