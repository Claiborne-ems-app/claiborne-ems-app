import type {
  ProviderLevel,
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
  medications?: { name: string; dose: string; notes?: string[] }[];
  warnings?: string[];
  pearls?: string[];
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
    treatmentSteps: [],
    medications: input.medications ?? [],
    warnings: input.warnings ?? [],
    clinicalPearls: input.pearls ?? [],
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
      "Verify pediatric doses against the current length/weight system and local formulary.",
      "The original imported PDF remains available for source comparison.",
    ],
  };
}

export const structuredPediatricMedicalProtocols: StructuredProtocolContent[] = [
  protocol({
    id: "pm-01",
    title: "Pediatric Allergic Reaction",
    sourcePdf: "/protocols/claiborne/pm-01-pediatric-allergic-reaction-protocol.pdf",
    pages: 2,
    overview: [
      "Epinephrine is the first-line treatment for pediatric anaphylaxis and must not be delayed for vascular access, antihistamines, or corticosteroids.",
      "Differentiate isolated skin findings from multi-system involvement, respiratory compromise, or hypotension.",
    ],
    indications: ["Pediatric allergic reaction or anaphylaxis after a suspected exposure."],
    flow: [
      { title: "Suspected Allergic Reaction", text: "Assess airway, breathing, circulation, exposure, onset, skin, GI, and cardiovascular findings.", levels: ALL_LEVELS, tone: "start" },
      { title: "Anaphylaxis?", text: "Two or more systems, respiratory compromise, or hypotension after likely allergen.", levels: ALL_LEVELS, tone: "decision" },
      { title: "IM Epinephrine Now", text: "≥30 kg: 0.3–0.5 mg • <30 kg: 0.15 mg • repeat every 5 min as needed.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Support Airway + Breathing", text: "Oxygen/ventilation; albuterol for wheeze; prepare for rapid airway deterioration.", levels: ALL_LEVELS, tone: "action" },
      { title: "Shock?", text: "NS 20 mL/kg; repeat to max 60 mL/kg and target SBP >70 + (2 × age).", levels: ["AEMT", "Paramedic"], tone: "decision" },
      { title: "Reassess + Transport", text: "Repeat epinephrine when indicated; monitor for recurrence and notify destination.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Remove the trigger when safe, support airway/ventilation, give IM epinephrine for anaphylaxis, and apply cardiac/SpO₂ monitoring when available.",
      "For mild isolated symptoms, EMT may give oral diphenhydramine only when the child is alert and can swallow.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access, normal saline boluses, nebulized albuterol, parenteral diphenhydramine, and authorized repeat epinephrine.",
    ],
    paramedic: [
      "Perform all prior care plus advanced airway management and Medical-Control-directed IV/IO epinephrine for refractory anaphylaxis after IM doses.",
      "Consider methylprednisolone as an adjunct; never substitute it for epinephrine.",
    ],
    medications: [
      { name: "Epinephrine 1 mg/mL (1:1,000)", dose: "≥30 kg: 0.3–0.5 mg IM; <30 kg: 0.15 mg IM; repeat every 5 minutes as needed" },
      { name: "Epinephrine (intranasal option)", dose: "15–30 kg: 1 mg IN; may repeat once in the other nostril" },
      { name: "Albuterol", dose: "2.5–5 mg nebulized; may repeat up to 3 treatments" },
      { name: "Diphenhydramine", dose: "1 mg/kg PO/IV/IO/IM; maximum 50 mg", notes: ["EMT route is oral only."] },
      { name: "Normal saline", dose: "20 mL/kg IV/IO; repeat to maximum 60 mL/kg" },
      { name: "Methylprednisolone", dose: "2 mg/kg IV/IO/IM; maximum 125 mg" },
    ],
    warnings: [
      "Do not delay IM epinephrine for IV access, diphenhydramine, or corticosteroids.",
      "Do not give oral medication to a child with decreased mental status, inability to swallow, or an unprotected airway.",
    ],
    pearls: ["A falling blood pressure may be late; pediatric hypotension is SBP below 70 + (2 × age) from ages 1–9."],
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
