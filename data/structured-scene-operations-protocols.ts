import type {
  ProviderLevel,
  ProtocolCareModule,
  ProtocolFlowNode,
  StructuredProtocolContent,
} from "../lib/protocols/structured-content";

const ALL_LEVELS: ProviderLevel[] = ["EMT", "AEMT", "Paramedic"];
type Input = {
  id: string; title: string; sourcePdf: string; pages: number; overview: string[];
  indications: string[]; flow: ProtocolFlowNode[]; emt: string[]; aemt: string[];
  paramedic: string[]; warnings?: string[]; pearls?: string[];
};
function protocol(input: Input): StructuredProtocolContent {
  const careModules: ProtocolCareModule[] = [{
    title: "Provider-Level Actions",
    summary: "Operate within the incident-management rehabilitation section; the rehabilitation officer controls return-to-duty decisions.",
    levels: [
      { level: "EMT", actions: input.emt },
      { level: "AEMT", actions: input.aemt },
      { level: "Paramedic", actions: input.paramedic },
    ],
  }];
  return {
    id: input.id, title: input.title, categoryId: "so", category: "Scene Operations",
    overview: input.overview, flow: input.flow, careModules, indications: input.indications,
    contraindications: [], assessment: [], treatmentSteps: [], medications: [],
    warnings: input.warnings ?? [], clinicalPearls: input.pearls ?? [], specialPopulations: [],
    references: ["Claiborne County EMS approved protocol manual.", "Agency incident-management and rehabilitation SOPs."],
    sourcePdf: input.sourcePdf, sourcePages: { start: 1, end: input.pages },
    revisionDate: "2025-09-01", lastVerifiedDate: "2026-07-29", reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director and agency approval are required before operational release.",
      "The original imported PDF remains available for source comparison.",
    ],
  };
}

export const structuredSceneOperationsProtocols: StructuredProtocolContent[] = [
  protocol({
    id: "so-01", title: "Scene Rehabilitation: General",
    sourcePdf: "/protocols/claiborne/so-01-scene-rehabilitation-general-protocol.pdf", pages: 2,
    overview: [
      "General rehabilitation provides logging, vital-sign screening, rest, hydration, and active cooling or warming for responders.",
      "Illness, injury, serious symptoms, or critical vital signs immediately move the responder to the responder-treatment pathway.",
    ],
    indications: ["Adult fire, law-enforcement, rescue, EMS, or training personnel due for rehabilitation after work or SCBA use."],
    flow: [
      { title: "Enter General Rehab", text: "Log responder; remove PPE/equipment; assess symptoms and vital signs. If HR >110, obtain temperature.", levels: ALL_LEVELS, tone: "start" },
      { title: "Serious Finding?", text: "Injury, cardiac/respiratory complaint, RR <8 or >40, or SBP ≤80.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Heat or Cold Stress?", text: "Begin active cooling or warming and move to sheltered rehabilitation.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Rest + Rehydrate", text: "Rest 10–20 min; give 12–32 oz oral fluid over 20 min when safe.", levels: ALL_LEVELS, tone: "action" },
      { title: "Reassess at 20 Minutes", text: "Repeat symptoms and vital signs; HR ≥110 or temp ≥100.6°F requires extended rehab.", levels: ALL_LEVELS, tone: "action" },
      { title: "Release or Escalate", text: "Reassign only when recovered and cleared; otherwise extend rehab or use Responder protocol.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Log the responder, remove protective equipment, obtain/record vital signs, assess symptoms, and perform indicated CO monitoring.",
      "Provide cooling/warming, oral hydration, rest, and repeat assessment before presenting findings to the rehabilitation officer.",
    ],
    aemt: ["Perform all EMT actions and assist with escalation to medical evaluation when oral hydration or general rehabilitation is insufficient."],
    paramedic: ["Perform all prior actions, evaluate abnormal findings for a clinical protocol, and support the rehabilitation officer's treatment/transport decision."],
    warnings: [
      "Any illness or injury requiring treatment beyond oral hydration belongs in an appropriate clinical protocol.",
      "The rehabilitation officer has final authority over return to duty; normalizing a single vital sign does not override symptoms.",
    ],
    pearls: ["Typical trigger: 20-minute rehabilitation after a second 30-minute, one 45-minute, or one 60-minute SCBA cylinder, or after 40 minutes of intense work without SCBA."],
  }),

  protocol({
    id: "so-02", title: "Scene Rehabilitation: Responder",
    sourcePdf: "/protocols/claiborne/so-02-scene-rehabilitation-responder-protocol.pdf", pages: 1,
    overview: [
      "Use this pathway when a responder is not suitable for release through General Rehabilitation.",
      "Abnormal pulse, blood pressure, respiratory rate, oxygen saturation, carboxyhemoglobin, temperature, symptoms, or inability to wear protective gear requires extended rehabilitation and possible transport.",
    ],
    indications: ["Responder with persistent symptoms or abnormal findings after general rehabilitation."],
    flow: [
      { title: "Enter Responder Rehab", text: "Remove gear; log responder; obtain orthostatic VS, SpO₂, and SpCO when available.", levels: ALL_LEVELS, tone: "start" },
      { title: "Rest 20 Minutes", text: "Continue heat/cold treatment and reassess against age-predicted HR and vital-sign criteria.", levels: ALL_LEVELS, tone: "action" },
      { title: "Abnormal Finding?", text: "HR >85% age max • BP ≥160/100 • RR <8/>40 • SpO₂ <90% • SpCO >10% • temp ≥100.6°F.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Hydrate + Extend Rehab", text: "Oral hydration; AEMT/Paramedic may give NS 500 mL, repeat to max 2 L.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Reassess in 10–30 Minutes", text: "Targets include HR ≤100, SBP ≥100, symptom improvement, and ability to wear gear.", levels: ALL_LEVELS, tone: "action" },
      { title: "Release or Transport", text: "No improvement or clinical concern: notify destination/Medical Control and treat under clinical protocol.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Obtain orthostatic vital signs, SpO₂/SpCO when available, continue temperature management, and provide oral hydration when safe.",
      "Do not release a symptomatic responder or one who cannot tolerate required protective equipment.",
    ],
    aemt: ["Perform all EMT actions plus IV/IO normal saline 500 mL; repeat to clinical targets with a maximum total of 2 L."],
    paramedic: ["Perform all prior actions, evaluate abnormal ECG/CO or cardiopulmonary findings, contact Medical Control, and route to the appropriate treatment/transport pathway."],
    warnings: [
      "Persistent abnormal findings after additional rehabilitation require medical evaluation; do not return the responder to duty.",
      "Treat a significant complaint under the appropriate clinical protocol, not hydration alone.",
    ],
  }),
];
