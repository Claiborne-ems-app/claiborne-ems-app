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
      "Consider methylprednisolone only as an adjunct; never substitute it for epinephrine. Do not use a routine IV/IO epinephrine bolus for refractory anaphylaxis.",
    ],
    medications: [
      { name: "Epinephrine 1 mg/mL (1:1,000)", dose: "0.01 mg/kg IM in the mid-outer thigh; maximum 0.3 mg prepubertal child / 0.5 mg adolescent; repeat every 5 minutes as needed" },
      { name: "Albuterol", dose: "2.5–5 mg nebulized for lower-airway bronchospasm; may repeat up to 3 treatments", notes: ["Adjunct only; does not treat upper-airway edema, hypotension, or anaphylaxis itself."] },
      { name: "Diphenhydramine", dose: "1 mg/kg PO/IV/IO/IM; maximum 50 mg", notes: ["Adjunct for cutaneous symptoms only. EMT route is oral only."] },
      { name: "Normal saline", dose: "20 mL/kg IV/IO for anaphylactic shock; reassess perfusion and lungs after each bolus" },
      { name: "Methylprednisolone", dose: "2 mg/kg IV/IO/IM; maximum 125 mg", notes: ["Adjunct only; do not delay epinephrine."] },
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
    title: "Pediatric Diabetic",
    sourcePdf: "/protocols/claiborne/pm-02-pediatric-diabetic-protocol.pdf",
    pages: 2,
    overview: [
      "Check blood glucose early in any child with altered mental status, seizure, weakness, or suspected diabetic emergency.",
      "Treat hypoglycemia promptly while protecting the airway; use cautious fluid resuscitation for marked hyperglycemia.",
    ],
    indications: ["Pediatric patient with glucose abnormality or symptoms suggesting hypoglycemia or hyperglycemia."],
    flow: [
      { title: "Check Blood Glucose", text: "Assess airway, mental status, medications, intake, diabetes history, and perfusion.", levels: ALL_LEVELS, tone: "start" },
      { title: "Glucose ≤69 mg/dL?", text: "Yes: treat hypoglycemia. No: evaluate other causes and hyperglycemia.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Can Swallow Safely?", text: "Yes: oral glucose/food. No: IV dextrose or IM glucagon.", levels: ALL_LEVELS, tone: "decision" },
      { title: "D10 for All Pediatric Ages", text: "D10 2 mL/kg IV/IO (0.2 g/kg) • recheck glucose and neurologic status after 5 minutes • repeat once if hypoglycemia persists", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Glucose ≥250 mg/dL?", text: "If dehydrated/poor perfusion, NS 10–20 mL/kg; maximum 20 mL/kg.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Recheck After 5 Minutes", text: "Repeat glucose and neurologic assessment • repeat D10 once if glucose remains <70 mg/dL with symptoms or unreliable symptom assessment", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Check glucose and give oral glucose only if the child is awake, follows commands, and can swallow/protect the airway.",
      "If oral treatment is unsafe, support airway/ventilation and request ALS promptly.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access and D10 2 mL/kg (0.2 g/kg); recheck after 5 minutes and repeat once for persistent hypoglycemia. Use glucagon when vascular access is unavailable and oral therapy is unsafe.",
      "For marked hyperglycemia with dehydration, give a cautious normal-saline bolus and reassess.",
    ],
    paramedic: [
      "Perform all prior care plus cardiac monitoring, evaluation for alternate causes, and management of dysrhythmia, seizure, shock, or airway compromise.",
    ],
    medications: [
      { name: "Oral glucose", dose: "Per local product and weight-based system; give only when the child can swallow and protect the airway" },
      { name: "Dextrose 10% (D10)", dose: "2 mL/kg IV/IO (0.2 g/kg); recheck glucose and neurologic status after 5 minutes and repeat once for persistent hypoglycemia. Contact Medical Control for additional dextrose dosing or infusion." },
      { name: "Glucagon", dose: "<20 kg: 0.5 mg IM; ≥20 kg: 1 mg IM when oral glucose is unsafe and vascular access cannot be obtained promptly" },
      { name: "Normal saline", dose: "Hyperglycemia ≥250 mg/dL: 10–20 mL/kg IV/IO; maximum 20 mL/kg" },
    ],
    warnings: [
      "Do not administer oral glucose when swallowing or airway protection is impaired.",
      "Do not give large or repeated fluid boluses routinely in suspected pediatric diabetic ketoacidosis.",
    ],
    pearls: ["Refusal after hypoglycemia requires normal neurologic status/capacity, glucose ≥80, ability to eat, an appropriate caregiver, and no oral hypoglycemic-agent concern."],
  }),

  protocol({
    id: "pm-03",
    title: "Pediatric Hypotension / Shock",
    sourcePdf: "/protocols/claiborne/pm-03-pediatric-hypotension-shock-protocol.pdf",
    pages: 2,
    overview: [
      "Compensated pediatric shock may precede hypotension; recognize abnormal perfusion before blood pressure falls.",
      "Classify shock as cardiogenic, hypovolemic, distributive, or obstructive because fluid strategy and definitive treatment differ.",
    ],
    indications: ["Pediatric patient with poor perfusion, altered mental status, weak pulses, delayed capillary refill, or age-defined hypotension."],
    flow: [
      { title: "Recognize Shock", text: "Tachycardia, weak pulses, delayed refill, cool/mottled skin, AMS; HR greater than SBP is concerning.", levels: ALL_LEVELS, tone: "start" },
      { title: "Airway + Oxygenation", text: "Support ventilation, control bleeding, keep warm, and obtain glucose.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Identify Shock Type", text: "Cardiogenic • hypovolemic • distributive • obstructive.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Fluid Strategy", text: "Cardiogenic: NS 5–10 mL/kg, max 10 • Other: 20 mL/kg, repeat to max 60.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Obstructive / Refractory?", text: "Decompress tension pneumothorax; begin authorized vasopressor for persistent shock.", levels: ["Paramedic"], tone: "urgent" },
      { title: "Rapid Transport", text: "Reassess after each bolus/intervention and notify a pediatric-capable destination.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Support airway/ventilation, control external hemorrhage, keep the child warm, assess glucose, and expedite transport.",
      "Use age-appropriate blood pressure thresholds and treat worsening mental status or decreasing heart rate as late, ominous signs.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access and shock-type-specific normal saline boluses with reassessment after each dose.",
    ],
    paramedic: [
      "Perform all prior care plus cardiac monitoring, needle decompression for tension pneumothorax, and authorized vasopressor treatment for refractory shock.",
      "For suspected adrenal crisis, give the patient's prescribed emergency steroid or protocol-equivalent corticosteroid.",
    ],
    medications: [
      { name: "Normal saline—cardiogenic shock", dose: "5–10 mL/kg IV/IO; maximum total 10 mL/kg; titrate carefully" },
      { name: "Normal saline—other shock", dose: "20 mL/kg IV/IO; repeat as needed to maximum 60 mL/kg" },
      { name: "Methylprednisolone", dose: "Adrenal crisis: 2 mg/kg IV/IO/IM; maximum 125 mg" },
      { name: "Hydrocortisone", dose: "Adrenal crisis: 2 mg/kg IV/IO/IM; maximum 100 mg" },
      { name: "Dexamethasone", dose: "Adrenal crisis alternative when other steroid unavailable: 5 mg" },
    ],
    warnings: [
      "Avoid routine 20 mL/kg boluses in cardiogenic shock; pulmonary edema may worsen rapidly.",
      "Hypotension is late in pediatric shock: neonate SBP <60, 1 month–<1 year <70, age 1–9 <70 + (2 × age), age ≥10 <90 mmHg.",
    ],
  }),
];
