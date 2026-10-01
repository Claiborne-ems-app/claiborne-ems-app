import type {
  ProviderLevel,
  ProtocolActionLink,
  ProtocolCareModule,
  ProtocolFlowNode,
  StructuredProtocolContent,
} from "../lib/protocols/structured-content";

const ALL_LEVELS: ProviderLevel[] = ["EMT", "AEMT", "Paramedic"];

type Input = {
  id: string;
  title: string;
  sourcePdf: string;
  pages: number;
  overview: string[];
  indications: string[];
  flow: ProtocolFlowNode[];
  emt: string[];
  aemt: string[];
  paramedic: string[];
  treatmentSteps?: string[];
  medications?: { name: string; dose: string; notes?: string[] }[];
  warnings?: string[];
  pearls?: string[];
  actionLinks?: ProtocolActionLink[];
  revisionDate?: string;
  lastVerifiedDate?: string;
  reviewStatus?: "Draft" | "Reviewed" | "Approved";
  reviewFlags?: string[];
};

function protocol(input: Input): StructuredProtocolContent {
  const careModules: ProtocolCareModule[] = [{
    title: "Provider-Level Actions",
    summary: "Use a length- or weight-based pediatric system and reassess after every intervention.",
    levels: [
      { level: "EMT", actions: input.emt },
      { level: "AEMT", actions: input.aemt },
      { level: "Paramedic", actions: input.paramedic },
    ],
  }];

  return {
    id: input.id,
    title: input.title,
    categoryId: "pm",
    category: "Pediatric Medical",
    overview: input.overview,
    flow: input.flow,
    careModules,
    indications: input.indications,
    contraindications: [],
    assessment: [],
    treatmentSteps: input.treatmentSteps ?? [],
    medications: input.medications ?? [],
    warnings: input.warnings ?? [],
    clinicalPearls: input.pearls ?? [],
    specialPopulations: [],
    actionLinks: input.actionLinks ?? [],
    references: [
      "Claiborne County EMS approved protocol manual.",
      "Current Tennessee EMS scope of practice and Claiborne County standing orders control when provider scope differs from the imported source.",
    ],
    sourcePdf: input.sourcePdf,
    sourcePages: { start: 1, end: input.pages },
    revisionDate: input.revisionDate ?? "2025-09-01",
    lastVerifiedDate: input.lastVerifiedDate ?? "2026-07-29",
    reviewStatus: input.reviewStatus ?? "Reviewed",
    reviewFlags: input.reviewFlags ?? [
      "Medical-director approval is required before clinical release.",
      "Verify pediatric doses against the current length/weight system and local formulary.",
      "The original imported PDF remains available for source comparison.",
    ],
  };
}

export const structuredPediatricMedicalProtocols: StructuredProtocolContent[] = [
  protocol({
    id: "pm-01",
    title: "Pediatric Anaphylaxis / Allergic Reaction",
    sourcePdf: "/protocols/claiborne/pm-01-pediatric-allergic-reaction-protocol.pdf",
    pages: 2,
    revisionDate: "2026-08-14",
    overview: [
      "Epinephrine is the first-line treatment for pediatric anaphylaxis and must not be delayed for vascular access, antihistamines, or corticosteroids.",
      "Treat suspected anaphylaxis promptly when airway/breathing compromise, hypotension/poor perfusion, or multi-system symptoms follow a likely allergen.",
    ],
    indications: ["Pediatric allergic reaction or suspected anaphylaxis after a likely exposure."],
    flow: [
      { title: "Suspected Allergic Reaction", text: "Assess airway, breathing, circulation, exposure, onset, skin, GI, and cardiovascular findings. Remove the trigger when safe.", levels: ALL_LEVELS, tone: "start" },
      { title: "Anaphylaxis Suspected?", text: "Airway/breathing compromise, hypotension/poor perfusion, or multi-system symptoms after likely allergen: treat immediately. Do not wait for every criterion when concern is high.", levels: ALL_LEVELS, tone: "decision" },
      { title: "IM Epinephrine Now", text: "Epinephrine 1 mg/mL: 0.01 mg/kg IM in the mid-outer thigh; maximum 0.3 mg prepubertal child / 0.5 mg adolescent. Repeat every 5 minutes as needed.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Support Airway + Breathing", text: "Oxygen/ventilation as indicated; albuterol only for lower-airway bronchospasm. Prepare early for rapid airway deterioration.", levels: ALL_LEVELS, tone: "action" },
      { title: "Anaphylactic Shock?", text: "Normal saline 20 mL/kg IV/IO with reassessment after each bolus. Repeat IM epinephrine and contact Medical Control early for refractory symptoms.", levels: ["AEMT", "Paramedic"], tone: "decision" },
      { title: "Reassess + Transport", text: "Continuous monitoring, repeat epinephrine when indicated, and ED evaluation for every child treated with epinephrine.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Remove the trigger when safe, support airway/ventilation, give IM epinephrine for suspected anaphylaxis, and apply cardiac/SpO₂ monitoring when available.",
      "For mild isolated skin symptoms, EMT may give oral diphenhydramine only when the child is alert and can swallow. Do not use oral medication for anaphylaxis or an unprotected airway.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access, normal saline for anaphylactic shock with reassessment after each bolus, nebulized albuterol for bronchospasm, and authorized repeat IM epinephrine.",
      "Diphenhydramine is an adjunct for cutaneous symptoms; do not delay epinephrine, airway support, or transport for it.",
    ],
    paramedic: [
      "Perform all prior care plus advanced airway management and Medical-Control-directed epinephrine infusion for refractory anaphylaxis after repeated IM doses.",
      "Consider methylprednisolone only with Medical Control as an adjunct; never substitute it for epinephrine. Do not use a routine IV/IO epinephrine bolus for refractory anaphylaxis.",
    ],
    medications: [
      { name: "Epinephrine 1 mg/mL (1:1,000)", dose: "0.01 mg/kg IM in the mid-outer thigh; maximum 0.3 mg prepubertal child / 0.5 mg adolescent; repeat every 5 minutes as needed" },
      { name: "Albuterol", dose: "Under 20 kg: 2.5 mg nebulized; 20 kg or greater: 5 mg nebulized for lower-airway bronchospasm", notes: ["Adjunct only; does not treat upper-airway edema, hypotension, or anaphylaxis itself."] },
      { name: "Diphenhydramine", dose: "1 mg/kg PO/IV/IO/IM; maximum 50 mg", notes: ["Adjunct for cutaneous symptoms only. EMT route is oral only."] },
      { name: "Normal saline", dose: "20 mL/kg IV/IO for anaphylactic shock; reassess perfusion and lungs after each bolus" },
      { name: "Methylprednisolone", dose: "Medical Control only; no standing pediatric dose", notes: ["Adjunct only; do not delay epinephrine."] },
      { name: "Epinephrine infusion", dose: "Medical-Control-directed for refractory anaphylaxis after repeated IM epinephrine; do not use a routine IV/IO epinephrine bolus" },
    ],
    treatmentSteps: [
      "IM epinephrine is the time-critical definitive treatment. Do not delay it for IV/IO access, diphenhydramine, corticosteroids, nebulizers, or transport preparation.",
      "Give albuterol only for lower-airway bronchospasm. It does not reverse upper-airway edema, hypotension, or shock.",
      "For anaphylactic shock, give normal saline 20 mL/kg with reassessment after each bolus; repeat IM epinephrine and open PM-03 for persistent shock.",
      "All children treated with epinephrine for anaphylaxis require ED evaluation and monitoring for recurrence, even if symptoms resolve.",
    ],
    actionLinks: [
      { label: "AR-05 Pediatric Airway", description: "Open for pediatric BVM and airway support.", href: "/protocols/ar/ar-05", kind: "protocol" },
      { label: "AR-06 Pediatric Failed Airway", description: "Open for rapidly worsening or ineffective airway management.", href: "/protocols/ar/ar-06", kind: "protocol" },
      { label: "PM-03 Pediatric Hypotension / Shock", description: "Open for persistent shock after epinephrine and fluid reassessment.", href: "/protocols/pm/pm-03", kind: "protocol" },
      { label: "Medication Reference", description: "Open the current Claiborne medication reference.", href: "/medications", kind: "external" },
    ],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: [
      "Clinical pediatric anaphylaxis recognition, epinephrine-first treatment, weight-based IM epinephrine, airway/bronchospasm care, shock management, refractory-treatment safeguards, and linked pathways approved by the Claiborne EMS medical director on August 14, 2026.",
    ],
    warnings: [
      "Do not delay IM epinephrine for IV access, diphenhydramine, corticosteroids, or albuterol.",
      "Do not give oral medication to a child with decreased mental status, inability to swallow, or an unprotected airway.",
      "Do not use intranasal epinephrine as the EMS anaphylaxis treatment pathway.",
      "Do not use a routine IV/IO epinephrine bolus for refractory anaphylaxis.",
    ],
    pearls: [
      "A falling blood pressure may be late; poor perfusion and respiratory compromise require action before hypotension develops.",
      "The lateral thigh is the preferred IM epinephrine site for reliable absorption.",
    ],
  }),

  protocol({
    id: "pm-02",
    title: "Pediatric Hypoglycemia / Diabetic Emergency",
    sourcePdf: "/protocols/claiborne/pm-02-pediatric-diabetic-protocol.pdf",
    pages: 2,
    revisionDate: "2026-08-14",
    overview: [
      "Check blood glucose early in any child with altered mental status, seizure, weakness, or suspected diabetic emergency.",
      "Treat hypoglycemia promptly while protecting the airway. Evaluate hyperglycemia for dehydration, poor perfusion, and possible DKA without treating a glucose number alone.",
    ],
    indications: ["Pediatric patient with glucose below 70 mg/dL, significant hyperglycemia, or symptoms suggesting a diabetic emergency."],
    flow: [
      { title: "Check Blood Glucose", text: "Assess airway, mental status, medications/insulin, intake, diabetes history, perfusion, and possible toxin exposure. Confirm unexpected CGM readings with capillary glucose when feasible.", levels: ALL_LEVELS, tone: "start" },
      { title: "Glucose <70 mg/dL?", text: "Yes: treat hypoglycemia. Do not delay treatment of a symptomatic child for CGM confirmation. No: evaluate other causes and hyperglycemia/DKA features.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Can Swallow Safely?", text: "Yes: oral glucose/food per local weight-based product. No: D10 IV/IO or IM glucagon.", levels: ALL_LEVELS, tone: "decision" },
      { title: "D10 for Pediatric Hypoglycemia", text: "D10 2 mL/kg IV/IO (0.2 g/kg); recheck glucose and neurologic status after 5 minutes; repeat once if hypoglycemia persists.", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Suspected DKA + Dehydration?", text: "Treat clinical dehydration/poor perfusion, not hyperglycemia alone: NS 10 mL/kg IV/IO, reassess, and repeat once only if needed; maximum 20 mL/kg before Medical Control.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Recheck + Transport", text: "Repeat glucose and neurologic assessment. Monitor for DKA cerebral-edema signs; notify destination early and transport.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Check glucose and give oral glucose only if the child is awake, follows commands, and can swallow/protect the airway.",
      "If oral treatment is unsafe, support airway/ventilation and request ALS promptly. Do not delay treatment of symptomatic hypoglycemia for a confirmatory CGM or capillary reading.",
      "Use AO-02 Newly Born for immediate newborn hypoglycemia/resuscitation.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access and D10 2 mL/kg (0.2 g/kg); recheck after 5 minutes and repeat once for persistent hypoglycemia.",
      "Use glucagon when vascular access is unavailable and oral therapy is unsafe. For suspected DKA with dehydration/poor perfusion, give cautious normal saline as directed and reassess.",
    ],
    paramedic: [
      "Perform all prior care plus cardiac monitoring, evaluation for alternate causes, and management of dysrhythmia, seizure, shock, or airway compromise.",
      "Do not give insulin or sodium bicarbonate in the field for suspected pediatric DKA. Contact Medical Control early for worsening neurologic status, shock, or suspected cerebral edema.",
    ],
    medications: [
      { name: "Oral glucose", dose: "Per local product and weight-based system; give only when the child can swallow and protect the airway" },
      { name: "Dextrose 10% (D10)", dose: "2 mL/kg IV/IO (0.2 g/kg); recheck glucose and neurologic status after 5 minutes and repeat once for persistent hypoglycemia. Contact Medical Control for additional dextrose dosing or infusion." },
      { name: "Glucagon", dose: "<20 kg: 0.5 mg IM; ≥20 kg: 1 mg IM when oral glucose is unsafe and vascular access cannot be obtained promptly" },
      { name: "Normal saline", dose: "For suspected DKA with dehydration/poor perfusion: 10 mL/kg IV/IO, reassess, and repeat once only if needed; maximum 20 mL/kg before Medical Control" },
    ],
    treatmentSteps: [
      "Treat glucose below 70 mg/dL when symptomatic or when symptom assessment is unreliable. Recheck glucose and neurologic status after every intervention.",
      "If a CGM reading is unexpectedly low or high, confirm with capillary glucose when feasible; do not delay treatment in the symptomatic child.",
      "Hyperglycemia alone does not diagnose DKA. Evaluate dehydration, perfusion, vomiting, abdominal pain, Kussmaul respirations, and mental-status change.",
      "For suspected DKA, do not give insulin, sodium bicarbonate, or routine/repeated large fluid boluses in the field.",
      "Watch for cerebral-edema warning signs: worsening headache, altered mental status, recurrent vomiting, bradycardia, hypertension, or abnormal respirations. Request rapid transport and Medical Control if present.",
      "Refusal after hypoglycemia requires normal neurologic status/capacity, glucose at least 80 mg/dL, ability to eat, a reliable caregiver, a clear reversible cause, and no long-acting oral hypoglycemic-agent concern.",
    ],
    actionLinks: [
      { label: "AO-02 Newly Born", description: "Open for immediate newborn hypoglycemia/resuscitation.", href: "/protocols/ao/ao-02", kind: "protocol" },
      { label: "AR-05 Pediatric Airway", description: "Open when hypoglycemia causes unsafe airway protection or ventilation.", href: "/protocols/ar/ar-05", kind: "protocol" },
      { label: "PM-03 Pediatric Hypotension / Shock", description: "Open for persistent poor perfusion or shock.", href: "/protocols/pm/pm-03", kind: "protocol" },
      { label: "Medication Reference", description: "Open the current Claiborne medication reference.", href: "/medications", kind: "external" },
    ],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: [
      "Clinical pediatric hypoglycemia, D10, glucagon, oral-treatment safeguards, hyperglycemia/DKA assessment, cautious fluid strategy, cerebral-edema safeguards, newborn routing, and linked pathways approved by the Claiborne EMS medical director on August 14, 2026.",
    ],
    warnings: [
      "Do not administer oral glucose when swallowing or airway protection is impaired.",
      "Do not give insulin or sodium bicarbonate in the field for suspected pediatric DKA.",
      "Do not give large or repeated fluid boluses routinely in suspected pediatric DKA.",
      "Do not delay treatment of symptomatic hypoglycemia for a confirmatory glucose reading.",
    ],
    pearls: [
      "D10 2 mL/kg provides 0.2 g/kg of dextrose and is the approved pediatric IV/IO hypoglycemia dose.",
      "Pediatric DKA can deteriorate neurologically; avoid over-resuscitation and communicate serial mental-status findings to the receiving team.",
    ],
  }),

  protocol({
    id: "pm-03",
    title: "Pediatric Hypotension / Shock",
    sourcePdf: "/protocols/claiborne/pm-03-pediatric-hypotension-shock-protocol.pdf",
    pages: 2,
    revisionDate: "2026-08-14",
    overview: [
      "Compensated pediatric shock may precede hypotension; recognize abnormal perfusion before blood pressure falls.",
      "Classify shock as hypovolemic/hemorrhagic, distributive, cardiogenic, or obstructive because fluid strategy and definitive treatment differ.",
    ],
    indications: ["Pediatric patient with poor perfusion, altered mental status, weak pulses, delayed capillary refill, cool/mottled skin, or age-defined hypotension."],
    flow: [
      { title: "Recognize Shock", text: "Assess mental status, central/peripheral pulses, capillary refill, skin temperature/color, work of breathing, BP trends, history, and likely cause. Hypotension is a late sign.", levels: ALL_LEVELS, tone: "start" },
      { title: "Airway + Oxygenation", text: "Support ventilation, control external hemorrhage, keep warm, check glucose, monitor ECG/SpO₂, and obtain rapid IV/IO without delaying care.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Identify Shock Type", text: "Hypovolemic/hemorrhagic • distributive/septic • cardiogenic • obstructive. Treat the likely cause while supporting perfusion.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Fluid Strategy", text: "Hypovolemic/distributive: isotonic crystalloid 10–20 mL/kg aliquots with reassessment after every bolus. Cardiogenic: 5–10 mL/kg cautiously with early Medical Control.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Fluid-Refractory / Obstructive?", text: "For septic shock unresponsive to fluid, begin Medical-Control-directed epinephrine or norepinephrine infusion. Decompress tension pneumothorax and treat other obstructive causes when indicated.", levels: ["Paramedic"], tone: "urgent" },
      { title: "Rapid Transport", text: "Reassess perfusion, lungs, mental status, glucose, and BP after every intervention; notify a pediatric-capable destination early.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Support airway/ventilation, control external hemorrhage, keep the child warm, assess glucose, apply monitoring when available, and expedite transport.",
      "Identify early compensated-shock findings: tachycardia, weak pulses, delayed refill, cool/mottled skin, altered behavior, reduced urine output/poor intake, and worsening work of breathing.",
    ],
    aemt: [
      "Perform all EMT care plus rapid IV/IO access and shock-type-specific isotonic-crystalloid aliquots with reassessment after every dose.",
      "Do not delay treatment for repeated IV attempts; use IO promptly when vascular access is not quickly available in critical shock.",
    ],
    paramedic: [
      "Perform all prior care plus cardiac monitoring, needle decompression for tension pneumothorax, and Medical-Control-directed vasoactive infusion for fluid-refractory septic shock.",
      "Use epinephrine or norepinephrine as the initial vasoactive infusion for fluid-refractory septic shock when authorized. For suspected adrenal crisis, give the patient's prescribed emergency steroid or Medical-Control-directed equivalent.",
    ],
    medications: [
      { name: "Isotonic crystalloid—hypovolemic/distributive shock", dose: "10–20 mL/kg IV/IO aliquots; reassess perfusion, lungs, hepatomegaly, and work of breathing after every bolus. Further fluid is individualized with Medical Control." },
      { name: "Isotonic crystalloid—cardiogenic shock", dose: "5–10 mL/kg IV/IO cautiously with early Medical Control; reassess after each aliquot" },
      { name: "Epinephrine or norepinephrine infusion", dose: "Medical-Control-directed for fluid-refractory septic shock; verify pediatric formulation and dose in the current medication reference" },
      { name: "Emergency corticosteroid", dose: "For known/suspected adrenal crisis: use the patient's prescribed emergency plan or Medical-Control-directed protocol equivalent" },
    ],
    treatmentSteps: [
      "Do not use a single shock-index shortcut as the sole determinant of pediatric shock. Use age-adjusted vital signs, perfusion findings, and clinical trends.",
      "Give isotonic crystalloid in 10- or 20-mL/kg aliquots for hypovolemic/distributive shock and reassess after every bolus for fluid responsiveness and volume overload.",
      "Avoid routine 20-mL/kg boluses in suspected cardiogenic shock; use 5–10 mL/kg cautiously, reassess, and open PC-03 Pediatric Pulmonary Edema / CHF.",
      "For fluid-refractory septic shock, begin Medical-Control-directed epinephrine or norepinephrine infusion; do not use routine corticosteroids unless adrenal crisis is suspected or Medical Control directs otherwise.",
      "Treat the cause: control hemorrhage, give epinephrine for anaphylaxis, decompress tension pneumothorax, and use the appropriate cardiac or airway pathway.",
    ],
    actionLinks: [
      { label: "AR-05 Pediatric Airway", description: "Open for airway and ventilation support.", href: "/protocols/ar/ar-05", kind: "protocol" },
      { label: "PC-03 Pediatric Pulmonary Edema / CHF", description: "Open for suspected cardiogenic shock or pulmonary edema.", href: "/protocols/pc/pc-03", kind: "protocol" },
      { label: "PM-01 Pediatric Anaphylaxis", description: "Open for anaphylactic shock.", href: "/protocols/pm/pm-01", kind: "protocol" },
      { label: "Medication Reference", description: "Open the current Claiborne medication reference.", href: "/medications", kind: "external" },
    ],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: [
      "Clinical pediatric shock recognition, type-specific fluid strategy, cardiogenic safeguards, fluid-refractory septic-shock support, obstructive/anaphylactic/adrenal pathways, monitoring, and destination planning approved by the Claiborne EMS medical director on August 14, 2026.",
    ],
    warnings: [
      "Hypotension is late and ominous in pediatric shock: neonate SBP <60, 1 month–<1 year <70, age 1–9 <70 + (2 × age), age ≥10 <90 mmHg.",
      "Avoid routine 20-mL/kg boluses in suspected cardiogenic shock; pulmonary edema may worsen rapidly.",
      "Reassess after every fluid bolus for fluid responsiveness and signs of volume overload.",
      "Do not use routine corticosteroids for septic shock unless adrenal crisis is suspected or Medical Control directs otherwise.",
    ],
    pearls: [
      "Early pediatric shock is recognized by perfusion and behavior changes before hypotension develops.",
      "Epinephrine or norepinephrine is preferred for fluid-refractory pediatric septic shock when authorized and available.",
    ],
  }),
];
