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
  warnings?: string[]; pearls?: string[];
};

function protocol(input: Input): StructuredProtocolContent {
  const careModules: ProtocolCareModule[] = [{
    title: "Provider-Level Actions",
    summary: "Follow incident command, infection-control, public-health, hospice, and Medical Control requirements applicable to the event.",
    levels: [
      { level: "EMT", actions: input.emt },
      { level: "AEMT", actions: input.aemt },
      { level: "Paramedic", actions: input.paramedic },
    ],
  }];
  return {
    id: input.id, title: input.title, categoryId: "sc", category: "Special Circumstances",
    overview: input.overview, flow: input.flow, careModules, indications: input.indications,
    contraindications: [], assessment: [], treatmentSteps: [], medications: input.medications ?? [],
    warnings: input.warnings ?? [], clinicalPearls: input.pearls ?? [], specialPopulations: [],
    references: [
      "Claiborne County EMS approved protocol manual.",
      "Current agency infection-control, public-health, hospice, and Medical Control directives supersede outdated external guidance.",
    ],
    sourcePdf: input.sourcePdf, sourcePages: { start: 1, end: input.pages },
    revisionDate: input.revisionDate ?? "2025-09-01", lastVerifiedDate: "2026-07-29",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director approval is required before clinical release.",
      "Confirm current agency and public-health policy before use.",
      "The original imported PDF remains available for source comparison.",
    ],
  };
}

export const structuredSpecialCircumstancesProtocols: StructuredProtocolContent[] = [
  protocol({
    id: "sc-01", title: "Suspected Ebola",
    sourcePdf: "/protocols/claiborne/sc-01-suspected-ebola-protocol.pdf", pages: 4,
    overview: [
      "Use travel/exposure history plus symptoms to identify possible viral hemorrhagic fever while protecting responders and the healthcare system.",
      "Limit personnel, sharps, aerosol-generating procedures, and invasive care to what is medically necessary.",
    ],
    indications: ["Travel or exposure risk within 21 days with fever, weakness, GI symptoms, pain, or unexplained bleeding."],
    flow: [
      { title: "Screen Before Contact", text: "Travel/exposure in past 21 days plus fever, GI illness, weakness, pain, or bleeding?", levels: ALL_LEVELS, tone: "start" },
      { title: "Limit Entry + Don PPE", text: "Notify command; trained essential personnel only; protect all skin and mucous membranes.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Mask Patient", text: "Surgical mask; NRB if oxygen needed. Avoid AGPs unless medically necessary.", levels: ALL_LEVELS, tone: "action" },
      { title: "Essential Care Only", text: "Avoid routine IV/IO and sharps; if access is necessary, stop vehicle during placement.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Discrete Destination Alert", text: "Notify early; do not enter facility until directed by receiving staff.", levels: ALL_LEVELS, tone: "transport" },
      { title: "Doff + Decontaminate", text: "Use trained observer, regulated waste, handwashing, exposure reporting, and approved disinfection.", levels: ALL_LEVELS, tone: "urgent" },
    ],
    emt: [
      "Screen from a distance, isolate the patient, limit contact, apply source control, and use the current agency VHF PPE ensemble before entering.",
      "Avoid aerosol-generating procedures unless lifesaving; notify command and destination without broadcasting identifying details.",
    ],
    aemt: [
      "Perform all EMT care; establish IV/IO only when clinically necessary, minimize sharps, and secure them immediately in a puncture-proof container.",
    ],
    paramedic: [
      "Perform all prior care; choose the least aerosol-generating effective airway strategy and coordinate treatment, transport entry, exposure response, and decontamination with command.",
    ],
    warnings: [
      "Do not rely solely on dispatch screening; repeat travel/exposure and symptom screening before close contact.",
      "A trained observer should supervise donning and doffing; the outside of PPE is contaminated.",
      "Any blood/body-fluid exposure requires immediate washing or mucous-membrane irrigation and occupational-health notification.",
    ],
    pearls: ["Incubation is typically 2–21 days; infectious risk rises after symptoms, especially fever, begin."],
  }),

  protocol({
    id: "sc-03", title: "Hospice or Palliative Care Patient",
    sourcePdf: "/protocols/claiborne/sc-03-hospice-or-palliative-care-patient-protocol.pdf", pages: 2,
    overview: [
      "Align care with the patient's goals, valid MOST/DNR orders, and hospice plan while actively relieving pain, air hunger, anxiety, agitation, and nausea.",
      "Involve the hospice nurse in treatment, transport, and disposition whenever possible.",
    ],
    indications: ["Established hospice/palliative-care patient or patient with terminal/life-altering chronic illness requesting goal-concordant symptom care."],
    flow: [
      { title: "Confirm Goals + Documents", text: "Terminal illness? Active hospice? Valid MOST/DNR? Identify patient/surrogate wishes.", levels: ALL_LEVELS, tone: "start" },
      { title: "Contact Hospice", text: "Notify service and request nurse response; involve them in the transport decision.", levels: ALL_LEVELS, tone: "action" },
      { title: "Transport Desired?", text: "If yes, notify hospice of destination and follow the appropriate clinical pathway.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Pain / Air Hunger?", text: "Use hospice eKit or EMS-equivalent opioid within scope and titrate to comfort.", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Anxiety / Nausea?", text: "Use eKit instructions or protocol-equivalent symptom medication.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Treat in Place?", text: "With hospice/Medical Control and safe follow-up, transfer care to hospice nurse or transport.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Verify goals and valid documents, provide positioning/oxygen/comfort care, contact hospice, and preserve patient dignity.",
      "If the situation falls outside the hospice plan or symptoms cannot be controlled, follow the age-appropriate protocol and transport discussion.",
    ],
    aemt: ["Perform all EMT care plus authorized vascular access and administration of available hospice eKit medications within scope and labeled directions."],
    paramedic: ["Perform all prior care; titrate parenteral symptom medications, use existing PICC/port access only when trained/equipped, and coordinate nontransport with hospice/Medical Control."],
    medications: [
      { name: "Morphine", dose: "Mild 2 mg; moderate 4 mg; severe 8 mg IV/IM/SQ; IV titration 2 mg every 15 min" },
      { name: "Hydromorphone", dose: "Mild 0.5 mg; moderate 1 mg; severe 2 mg IV/IM/SQ; IV titration 0.5 mg every 15 min" },
      { name: "Fentanyl", dose: "Mild 25 mcg; moderate 50 mcg; severe 100 mcg IV/IM/SQ; IV titration 25 mcg every 15 min" },
      { name: "Lorazepam / midazolam / diazepam / haloperidol", dose: "Use source severity table or individualized eKit directions" },
    ],
    warnings: [
      "For IM/SQ dosing, wait 30 minutes before repeating to reduce dose stacking.",
      "When opioid tolerance is uncertain, begin with the lower dose and titrate.",
      "A hospice enrollment does not itself equal a DNR order.",
    ],
  }),

  protocol({
    id: "sc-04", title: "Vaccination / Medication",
    sourcePdf: "/protocols/claiborne/sc-04-vaccination-medication-protocol.pdf", pages: 1,
    overview: [
      "This optional protocol supports an authorized local public-health immunization or medication-distribution program.",
      "Product-specific screening, training, dosing, route, observation, documentation, and adverse-event procedures are mandatory.",
    ],
    indications: ["Authorized community vaccination, immunization, or medication-distribution event conducted with the local public-health department."],
    flow: [
      { title: "Authorized Program?", text: "Confirm public-health partnership, approved product guide, provider authorization, and just-in-time training.", levels: ALL_LEVELS, tone: "start" },
      { title: "Screen Eligibility", text: "Confirm age, history, allergies, indications, contraindications, and absence of disqualifying active infection.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Eligible?", text: "No: do not administer; refer to public-health official for instructions.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Administer Product", text: "Use the exact public-health dose and authorized PO/IN/IM/IV/SQ route.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Observe + Educate", text: "Provide required monitoring and written post-administration instructions.", levels: ALL_LEVELS, tone: "action" },
      { title: "Reaction?", text: "Treat by age-appropriate allergic-reaction protocol and notify public health.", levels: ALL_LEVELS, tone: "urgent" },
    ],
    emt: [
      "Participate only when specifically authorized by DHHS/medical-board emergency provision and after product-specific training.",
      "Screen, observe, educate, and document using the approved public-health process.",
    ],
    aemt: ["Administer approved medication/vaccine by authorized route after eligibility confirmation; provide monitoring and required documentation."],
    paramedic: ["Perform all prior care and manage complications within scope, including vascular access or IV administration only when the program and standing orders authorize it."],
    warnings: [
      "Do not administer outside an authorized local public-health program or without current product-specific guidance.",
      "Document every patient contact in the approved program log; follow current reporting requirements.",
    ],
  }),
];
