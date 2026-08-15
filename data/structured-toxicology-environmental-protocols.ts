import type {
  ProviderLevel,
  ProtocolCareModule,
  ProtocolFlowNode,
  StructuredProtocolContent,
} from "../lib/protocols/structured-content";

const ALL_LEVELS: ProviderLevel[] = ["EMT", "AEMT", "Paramedic"];
type Input = {
  id: string; title: string; sourcePdf: string; pages: number; revisionDate?: string;
  overview: string[]; indications: string[]; flow: ProtocolFlowNode[];
  emt: string[]; aemt: string[]; paramedic: string[];
  medications?: { name: string; dose: string; notes?: string[] }[];
  actionLinks?: StructuredProtocolContent["actionLinks"];
  warnings?: string[]; pearls?: string[];
};
function protocol(input: Input): StructuredProtocolContent {
  const careModules: ProtocolCareModule[] = [{
    title: "Provider-Level Actions",
    summary: "Protect rescuers, stop exposure when safe, support ABCs, and involve Poison Control or Medical Control early.",
    levels: [
      { level: "EMT", actions: input.emt },
      { level: "AEMT", actions: input.aemt },
      { level: "Paramedic", actions: input.paramedic },
    ],
  }];
  return {
    id: input.id, title: input.title, categoryId: "te", category: "Toxicology & Environmental",
    overview: input.overview, flow: input.flow, careModules, indications: input.indications,
    contraindications: [], assessment: [], treatmentSteps: [], medications: input.medications ?? [],
    warnings: input.warnings ?? [], clinicalPearls: input.pearls ?? [], specialPopulations: [],
    actionLinks: input.actionLinks,
    references: [
      "Claiborne County EMS approved protocol manual.",
      "Poison Help national line: 1-800-222-1222.",
      "Current Tennessee EMS scope of practice and Claiborne County standing orders control when provider scope differs from the imported source.",
    ],
    sourcePdf: input.sourcePdf, sourcePages: { start: 1, end: input.pages },
    revisionDate: input.revisionDate ?? "2025-09-01", lastVerifiedDate: "2026-07-29",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director approval is required before clinical release.",
      "Verify medication doses, antidote availability, and local Poison Control procedures.",
      "The original imported PDF remains available for source comparison.",
    ],
  };
}

export const structuredToxicologyEnvironmentalProtocols: StructuredProtocolContent[] = [
  protocol({
    id: "te-01", title: "Bites and Envenomations",
    sourcePdf: "/protocols/claiborne/te-01-bites-and-envenomations-protocol.pdf", pages: 2,
    overview: [
      "Prioritize scene safety, wound care, immobilization, removal of constricting items, and treatment of anaphylaxis or shock.",
      "Do not endanger responders to capture or identify an animal; use a description or photograph when safely available.",
    ],
    indications: ["Animal/human bite, insect sting, or suspected snake/spider envenomation."],
    flow: [
      { title: "Scene Safe?", text: "Stage or request resources until animal, insect, or environmental hazard is controlled.", levels: ALL_LEVELS, tone: "start" },
      { title: "ABCs / Anaphylaxis / Shock", text: "Treat immediate threats and route to age-appropriate allergy or shock protocol.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Wound + Immobilize", text: "Clean/cover, remove constricting items, and immobilize the extremity in a neutral position of comfort.", levels: ALL_LEVELS, tone: "action" },
      { title: "Snake Bite?", text: "Mark swelling/redness with time; keep the patient calm and transport promptly. Do not apply ice, tourniquet, suction, or incision.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Spider / Sting?", text: "For a visible stinger, scrape it away; wash the area and use a cold pack for 10–20 minutes. Treat anaphylaxis immediately when present.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Consult + Transport", text: "For suspected envenomation, unknown toxic bite/sting, or concerning symptoms, call Poison Control (1-800-222-1222). Follow local public-health/animal-control reporting process for possible rabies exposure.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Provide wound care, remove rings/bands, immobilize the extremity in a neutral position of comfort, mark progression, and treat anaphylaxis with epinephrine when indicated.",
      "For a visible insect stinger, scrape it away; wash the area and use a cold pack for 10–20 minutes.",
      "For possible rabies exposure, follow the local public-health/animal-control reporting process.",
    ],
    aemt: ["Perform all EMT care plus IV/IO access, fluids, and authorized pain/anaphylaxis treatment."],
    paramedic: ["Perform all prior care plus cardiac monitoring and treat severe venom-associated muscle spasm or seizure under the applicable medication and seizure protocol."],
    actionLinks: [
      { label: "Medication Reference", description: "Open for approved midazolam indications, dosing, and monitoring.", href: "/medications", kind: "external" },
    ],
    warnings: [
      "Do not capture or transport a snake for identification.",
      "Do not apply ice to a snake bite.",
      "Do not delay transport for snake-bite interventions or identification.",
    ],
  }),

  protocol({
    id: "te-02", title: "Carbon Monoxide / Cyanide",
    sourcePdf: "/protocols/claiborne/te-02-carbon-monoxide-cyanide-protocol.pdf", pages: 1,
    overview: [
      "Consider carbon monoxide and cyanide in any combustion exposure; conventional pulse oximetry and environmental readings do not exclude poisoning.",
      "Immediate removal from exposure, decontamination when indicated, and 100% oxygen are foundational.",
    ],
    indications: ["Smoke/combustion exposure, industrial cyanide exposure, cyanide ingestion, or compatible unexplained illness."],
    flow: [
      { title: "Scene Safety + Decontaminate", text: "Use PPE/HAZMAT support, remove from exposure, and decontaminate liquid/industrial cyanide exposure before ambulance transport when indicated.", levels: ALL_LEVELS, tone: "start" },
      { title: "100% Oxygen", text: "Give regardless of standard pulse-ox reading; support airway and ventilation.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Assess Toxicity", text: "AMS, dyspnea, weakness, GI symptoms, syncope, seizure, chest pain, shock, and neurologic deficit.", levels: ALL_LEVELS, tone: "action" },
      { title: "Monitor + Access", text: "Glucose, 12-lead, IV/IO, cardiac monitoring, and pulse CO-oximetry when available; conventional SpO₂ is unreliable in CO exposure.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "High Cyanide Suspicion?", text: "Enclosed-space fire, known industrial cyanide exposure, or ingestion with severe AMS, seizure, hypotension/collapse, or respiratory failure.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Consult + Early Alert", text: "Call Poison Control/Medical Control and notify the receiving facility early. Cyanide antidote treatment, including hydroxocobalamin, is deferred to the receiving facility.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: ["Remove from exposure, provide 100% oxygen and ventilation support, obtain glucose, and rapidly transport."],
    aemt: ["Perform all EMT care plus IV/IO access, 12-lead acquisition, and treatment of glucose abnormality or shock."],
    paramedic: ["Perform all prior care plus cardiac/pulse CO-oximetry monitoring when available, Poison Control/Medical Control consultation, and early destination notification for severe exposure."],
    warnings: [
      "Provide 100% oxygen regardless of conventional pulse-oximetry reading; standard SpO₂ is unreliable in carbon monoxide exposure.",
      "Do not place a patient with liquid or industrial cyanide contamination in the ambulance before indicated decontamination and HAZMAT direction.",
      "For severe carbon monoxide exposure—loss of consciousness, neurologic deficit, dysrhythmia/ischemia, severe acidosis, or pregnancy—notify the receiving facility early for hyperbaric-consultation consideration.",
      "Hydroxocobalamin/Cyanokit is not stocked on Claiborne ground units; antidote treatment is deferred to the receiving facility.",
      "Pregnant patients, children, and older adults may become symptomatic at lower CO levels.",
    ],
  }),

  protocol({
    id: "te-03", title: "Drowning / Submersion Injury",
    sourcePdf: "/protocols/claiborne/te-03-drowning-submersion-injury-protocol.pdf", pages: 1,
    overview: [
      "Drowning is respiratory impairment after submersion or immersion; reversal of hypoxia is the priority.",
      "Begin with two initial breaths/ventilations, then support ventilation and circulation without delaying for routine spinal restriction or copious airway foam.",
    ],
    indications: ["Any submersion/immersion event with respiratory symptoms, altered mental status, apnea, or arrest."],
    flow: [
      { title: "Safe Water Rescue", text: "Only trained/equipped rescuers enter hazardous water. Trained responders may provide in-water breaths only when safe and without delaying removal.", levels: ALL_LEVELS, tone: "start" },
      { title: "Two Initial Breaths", text: "For apnea or unresponsiveness, provide two initial breaths/ventilations by the first effective means available; do not delay for routine suctioning.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Pulse?", text: "No: begin CPR with breaths and compressions, then use the adult or pediatric arrest pathway. Yes: continue oxygenation and airway support.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Trauma Indication?", text: "Use spinal-motion restriction only when indicated and never at the expense of ventilation/CPR.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Dry + Warm + Monitor", text: "Remove wet clothing; assess glucose, ECG, hypothermia, and pulmonary status.", levels: ALL_LEVELS, tone: "action" },
      { title: "Transport / Observe", text: "Encourage evaluation, especially for cough, foam, dyspnea, abnormal sounds, or hypoxia.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: ["Prioritize rescue safety, give two initial breaths/ventilations when indicated, ventilate through foam without routine suctioning, begin CPR with breaths and compressions if pulseless, and dry/warm the patient."],
    aemt: ["Perform all EMT care plus IV/IO access and treatment of glucose abnormality, shock, or associated hypothermia."],
    paramedic: ["Perform all prior care plus advanced airway/cardiac monitoring and consultation for dive-related barotrauma or decompression illness."],
    warnings: [
      "Do not waste time suctioning airway foam; ventilate through it and suction water/vomit only when needed.",
      "Spinal-motion restriction should never delay oxygenation, ventilation, or CPR.",
    ],
    pearls: ["Do not use a single submersion-time cutoff alone to determine whether to begin or continue resuscitation; use the applicable cardiac-arrest and termination pathway with the full clinical context."],
  }),

  protocol({
    id: "te-04", title: "Hyperthermia",
    sourcePdf: "/protocols/claiborne/te-04-hyperthermia-protocol.pdf", pages: 2,
    overview: [
      "Heat exposure with altered mental status is heat stroke until proven otherwise and demands immediate aggressive cooling; do not wait for a temperature or exclude heat stroke because the initial reading is below 104°F.",
      "Rapid cooling is initiated concurrently with standard resuscitation and takes precedence over transport in exertional heat stroke when effective immersion is available.",
    ],
    indications: ["Heat cramps, heat exhaustion, heat stroke, or other hyperthermic emergency."],
    flow: [
      { title: "Remove From Heat", text: "Move to cool area, remove tight/excess clothing, obtain glucose; temperature must not delay care.", levels: ALL_LEVELS, tone: "start" },
      { title: "Classify Severity", text: "Cramps • exhaustion • suspected heat stroke (heat exposure plus altered mental status; a temperature below 104°F does not exclude it).", levels: ALL_LEVELS, tone: "decision" },
      { title: "Heat Stroke?", text: "Begin immediate active cooling concurrent with resuscitation. Ice-water immersion is preferred; use tepid-water immersion or tarp-assisted ice-water cooling if unavailable.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Cool to 101.5°F", text: "Use rectal core temperature when feasible, without interrupting care. Stop active cooling at 101.5°F (38.6°C).", levels: ALL_LEVELS, tone: "action" },
      { title: "Support Perfusion", text: "For hypotension, dehydration, or poor perfusion, give isotonic crystalloid in reassessed aliquots: adult 500 mL; pediatric 20 mL/kg. Do not use a routine fixed maximum.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Reassess + Transport", text: "Airway, ECG, neurologic status, BP, and core temperature; notify destination.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: ["Move to a cool environment, remove excess clothing, check glucose, begin active cooling, and give oral fluid only for mild illness with intact mentation/swallowing."],
    aemt: ["Perform all EMT care plus IV/IO isotonic crystalloid for hypotension, dehydration, or poor perfusion, with reassessment after each aliquot."],
    paramedic: ["Perform all prior care plus cardiac monitoring and protocol treatment of seizures, dysrhythmia, shock, or airway failure."],
    medications: [{ name: "Isotonic crystalloid", dose: "Adult 500 mL IV/IO aliquots; pediatric 20 mL/kg IV/IO aliquots; repeat only after reassessment for hypotension, dehydration, or poor perfusion." }],
    warnings: [
      "Do not delay cooling to obtain a temperature; heat exposure with altered mental status is heat stroke until proven otherwise.",
      "Use rectal core temperature when feasible, but do not interrupt active cooling, airway management, or transport to obtain it.",
      "Do not overcool; stop active cooling at 101.5°F (38.6°C).",
      "Antipyretics and dantrolene are not treatments for environmental or exertional heat stroke; use active external cooling.",
    ],
  }),

  protocol({
    id: "te-05", title: "Hypothermia / Frostbite",
    sourcePdf: "/protocols/claiborne/te-05-hypothermia-protocol.pdf", pages: 2,
    revisionDate: "2022-10-15",
    overview: [
      "Remove wet clothing, protect from further heat loss, and handle severe hypothermia carefully while assessing for signs of life for at least 60 seconds.",
      "Treat localized cold injury without rubbing, massage, or allowing refreezing.",
    ],
    indications: ["Systemic hypothermia or localized cold injury/frostbite."],
    flow: [
      { title: "Remove Wet Clothing", text: "Move to warm shelter, dry patient, insulate, and measure temperature without delaying treatment.", levels: ALL_LEVELS, tone: "start" },
      { title: "Localized or Systemic?", text: "Frostbite: no rubbing; if refreezing can be prevented, rapidly rewarm in 37–40°C (99–104°F) water for 20–30 minutes. Systemic: airway, glucose, warming, ECG.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Pulse Check ≥60 Seconds", text: "If no pulse, begin the age-appropriate arrest pathway with hypothermia modifications and concurrent rewarming.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Active Core Warming", text: "Warm blankets/packs to axillae and groin; protect skin and keep chemical heat away from frostbitten tissue; warmed fluids when available.", levels: ALL_LEVELS, tone: "action" },
      { title: "Support Perfusion", text: "For hypotension or poor perfusion, give warmed isotonic crystalloid in reassessed aliquots: adult 500 mL; pediatric 20 mL/kg. Do not use a routine fixed maximum.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Hypothermic Arrest / Transport", text: "Below 30°C (86°F): full resuscitation with rewarming. For VF/pVT, defibrillate once; if unsuccessful, defer further shocks and epinephrine until ≥30°C. Contact Medical Control early and consider ECLS-capable destination when feasible.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: ["Remove wet clothing, dry/insulate, apply protected heat packs to axillae/groin, check glucose, and provide gentle handling."],
    aemt: ["Perform all EMT care plus IV/IO access and warmed isotonic crystalloid when available for hypotension or poor perfusion, with reassessment after each aliquot."],
    paramedic: ["Perform all prior care plus cardiac monitoring and the hypothermic-arrest sequence below 30°C (86°F): full resuscitation with rewarming; one VF/pVT defibrillation attempt, then defer further shocks and epinephrine until ≥30°C."],
    medications: [{ name: "Warmed isotonic crystalloid", dose: "Adult 500 mL IV/IO aliquots; pediatric 20 mL/kg IV/IO aliquots; repeat only after reassessment for hypotension or poor perfusion." }],
    warnings: [
      "Do not rub or massage frostbitten tissue, debride frostbite blisters, or apply direct chemical heat to frostbitten tissue.",
      "Do not rewarm frostbite if refreezing is possible. When sustained thaw can be assured, use 37–40°C (99–104°F) water for 20–30 minutes.",
      "Below 30°C (86°F), provide full resuscitation with rewarming. For VF/pVT, defibrillate once; if unsuccessful, defer further shocks and epinephrine until ≥30°C.",
    ],
    pearls: ["Do not use a fixed temperature alone to stop resuscitation. Continue unless there is obvious lethal injury or the patient is frozen solid; seek early Medical Control and consider ECLS-capable destination when feasible."],
  }),

  protocol({
    id: "te-07", title: "Overdose / Toxic Ingestion",
    sourcePdf: "/protocols/claiborne/te-07-overdose-toxic-ingestion-protocol.pdf", pages: 3,
    overview: [
      "Stabilize ventilation and perfusion first, identify time/substance/amount/co-ingestants, and consult Poison Control.",
      "Naloxone is titrated to adequate ventilation—not restoration of consciousness—and toxin-specific treatment follows the clinical toxidrome and ECG.",
    ],
    indications: ["Known or suspected overdose, poisoning, or toxic ingestion/exposure."],
    actionLinks: [
      {
        label: "Call Poison Help",
        description: "National Poison Control line",
        href: "tel:+18002221222",
        kind: "call",
      },
      {
        label: "Medication Reference",
        description: "Open for approved naloxone and antidote dosing.",
        href: "/medications",
        kind: "external",
      },
      {
        label: "TE-08 WMD / Nerve Agent",
        description: "Open for suspected organophosphate or nerve-agent exposure.",
        href: "/protocols/te/te-08",
        kind: "protocol",
      },
    ],
    flow: [
      { title: "ABCs + Exposure History", text: "Substance, route, amount, time, co-ingestants, intent; bring containers when safe. For skin/eye exposures, remove contaminated clothing and irrigate; for inhalation, move to fresh air only when the scene is safe.", levels: ALL_LEVELS, tone: "start" },
      { title: "Inadequate Ventilation?", text: "Ventilate first; suspected opioid: naloxone titrated to breathing.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Shock / AMS / Seizure?", text: "Treat by age-appropriate shock, diabetic, AMS, behavioral, and seizure pathways.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Poison Control", text: "Call 1-800-222-1222; obtain 12-lead, IV/IO, and cardiac monitor as indicated.", levels: ALL_LEVELS, tone: "action" },
      { title: "Specific Toxin?", text: "APAP/salicylate • beta/CCB • CO/cyanide • organophosphate • TCA.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Treat + Disposition", text: "Transport unless Poison Control gives a specific home-care recommendation and agency non-transport criteria are met. Intentional, pediatric, pregnant, polysubstance, or symptomatic exposures require direct Poison Control consultation.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Support ventilation, give IN/IM naloxone for suspected opioid-induced respiratory depression, check glucose, and contact Poison Control.",
      "If activated charcoal is stocked and authorized, use only after Poison Control or Medical Control recommendation and only when airway protection and swallowing are intact.",
    ],
    aemt: ["Perform all EMT care plus IV/IO access, broader-route naloxone, reassessed fluids, and toxin-specific treatment only with Poison Control or Medical Control guidance."],
    paramedic: ["Perform all prior care plus cardiac monitoring, calcium for beta-blocker/calcium-channel-blocker toxicity, sodium bicarbonate for life-threatening sodium-channel-blocker cardiotoxicity, pacing, and toxidrome-specific advanced care."],
    medications: [
      { name: "Glucagon", dose: "Beta/CCB: adult 2–4 mg IV/IO/IM; pediatric 0.1 mg/kg; may repeat in 15 min" },
      { name: "Calcium", dose: "For beta-blocker/calcium-channel-blocker toxicity: use calcium gluconate through a peripheral IV when indicated; reserve calcium chloride for IO or central access when authorized." },
      { name: "Sodium bicarbonate", dose: "For life-threatening sodium-channel-blocker cardiotoxicity (QRS widening, hypotension, ventricular dysrhythmia, or seizure): consult Poison Control/Medical Control and use the approved medication reference." },
    ],
    warnings: [
      "Ventilation has priority over naloxone; do not dose solely to restore consciousness. Use the Medication Reference for approved naloxone dosing.",
      "Charcoal is not routine and should not be given to a patient unable to protect the airway; use only when stocked, authorized, and recommended by Poison Control or Medical Control.",
      "Do not rely only on history in a suspected intentional ingestion; assess for hidden medications and weapons.",
    ],
  }),

];
