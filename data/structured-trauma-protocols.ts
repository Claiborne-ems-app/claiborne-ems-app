import { canonicalPdfPages } from "./canonical-pdf-pages";
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
  actionLinks?: StructuredProtocolContent["actionLinks"];
  references?: string[];
  revisionDate?: string;
  lastVerifiedDate?: string;
  reviewStatus?: StructuredProtocolContent["reviewStatus"];
  reviewFlags?: string[];
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
    actionLinks: input.actionLinks,
    references: input.references ?? [
      "Claiborne County EMS native protocol content; controlled PDF generated from the same structured source.",
      "Current Tennessee EMS scope of practice, verified individual credentials, and Claiborne County standing orders control provider authorization.",
    ],
    sourcePdf: input.sourcePdf,
    sourcePages: { start: 1, end: canonicalPdfPages[input.id] ?? 2 },
    revisionDate: input.revisionDate ?? "2026-10-30",
    lastVerifiedDate: input.lastVerifiedDate ?? "2026-10-30",
    reviewStatus: input.reviewStatus ?? "Reviewed",
    reviewFlags: input.reviewFlags ?? [
      "Medical-director approval is required before clinical release.",
      "Verify medication dosing and invasive procedures against current Claiborne County standing orders.",
      "The controlled Claiborne PDF mirrors this native content and replaces the imported sheet. Reconciliation does not establish full-system clinical release.",
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
      { title: "Treat Immediate Threats", text: "Airway and ventilation • hemorrhage control • assess chest injury • hypothermia prevention • reassessed shock care. Urgently request ALS for suspected tension pneumothorax; decompression is Paramedic-only. Ventilate when clinically necessary.", levels: ALL_LEVELS, tone: "action" },
      { title: "Blast Lung Injury?", text: "Dyspnea, hypoxia, hemoptysis, wheeze, chest pain, or diminished breath sounds; perform serial respiratory assessment, SpO₂, lung sounds, and monitoring when available.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Rapid Trauma Transport", text: "Use trauma/burn destination plan and notify early, especially for respiratory compromise, penetrating injury, major burn, crush injury, or multisystem trauma.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Maintain scene awareness, perform triage, control major hemorrhage, assess chest injury, oxygenation, ventilation, and perfusion, urgently request ALS for suspected tension pneumothorax, support ventilation, and prevent hypothermia.",
      "For an open chest wound in a spontaneously breathing patient, consider an approved vented seal and reassess frequently. If deterioration follows sealing, assess/release an obstructing seal and obtain immediate Paramedic treatment for suspected tension pneumothorax. Do not probe the wound. Positive-pressure ventilation requires the chest-injury standing orders and immediate Paramedic/Medical Control guidance, not automatic extrapolation of this seal instruction.",
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
      { title: "Stop Exposure", text: "Disconnect power when safe • remove contaminated clothing and jewelry • brush off dry chemical.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Decontaminate", text: "Brush away dry particulate before irrigation. For most chemical skin/eye exposures, begin prompt copious irrigation without delaying ordinary eye irrigation for product identification. Known water-reactive contamination requires immediate HazMat/Poison Help direction; open TE-09 for agent-specific exceptions. Protect unaffected skin and responders.", levels: ALL_LEVELS, tone: "action" },
      { title: "Airway or Trauma Threat?", text: "Treat inhalation injury, dysrhythmia, fall, blast, or multisystem trauma.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Monitor + Treat", text: "For high-voltage/lightning exposure, loss of consciousness, chest pain, dysrhythmia, abnormal ECG, or significant trauma: cardiac monitoring, vascular access, burn care, pain control, and reassessment.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Burn-Center Transport", text: "Consult a burn center for every chemical injury, high-voltage (≥1,000 V) injury, or lightning injury. Arrange consultation and consider follow-up after low-voltage injury, including delayed symptoms or visual complaints; use the regional destination plan and notify early.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Protect the crew, stop exposure, remove contaminated clothing and jewelry, and brush off dry particulate before irrigation. For most chemical skin/eye exposures, begin prompt copious irrigation; do not delay ordinary chemical-eye irrigation while identifying an unknown agent. Remove contact lenses when easily possible. For known water-reactive contamination, follow immediate HazMat/Poison Help direction and TE-09.",
      "After decontamination, cover burns with clean dry dressings except when white phosphorus is suspected: keep affected areas wet with cool water or wet dressings to prevent reignition until particles are removed. Protect the rest of the patient from hypothermia, manage associated trauma, and transport promptly.",
    ],
    aemt: [
      "Perform all EMT care plus vascular access, reassessed fluid only for shock or significant burn-resuscitation need, and analgesia within standing orders.",
      "Expanded AEMT analgesia is not enabled by default while individual authorization is unverified. The specified medication, route, and patient group require current Tennessee authority, documented Tennessee-approved expanded analgesia training, agency credentialing, and medical-director standing orders; training alone does not grant permission.",
      "Prioritize cardiac monitoring after high-voltage/lightning exposure, loss of consciousness, chest pain, dysrhythmia, abnormal ECG, or significant associated trauma; do not delay transport.",
    ],
    paramedic: [
      "Perform all prior care plus advanced airway treatment, dysrhythmia management, and treatment of shock or compartment-threatening injury.",
      "Consult Poison Help or Medical Control for agent-specific care and a burn center for every chemical injury, high-voltage (≥1,000 V) injury, or lightning injury. Arrange burn-center consultation and consider follow-up after low-voltage injury, including delayed symptoms or visual complaints.",
    ],
    actionLinks: [
      { label: "TE-09 Chemical / HazMat Exposure", description: "Agent-specific decontamination, water-reactive contamination, white phosphorus, and antidote restrictions.", href: "/protocols/te/te-09", kind: "protocol" },
      { label: "TB-11 Eye Trauma", description: "Ordinary chemical-eye irrigation and known or strongly suspected open-globe exception.", href: "/protocols/tb/tb-11", kind: "protocol" },
      { label: "TB-09 Thermal Burn", description: "Burn assessment, controlled fluid rates, consultation, and hypothermia prevention.", href: "/protocols/tb/tb-09", kind: "protocol" },
    ],
    warnings: [
      "Do not neutralize a chemical on the patient unless specifically directed by Poison Control, Medical Control, or HazMat; chemical reactions may generate heat.",
      "Do not apply ice, creams, ointments, or routine wet sheets to significant burns. White phosphorus is an exception: keep the affected area wet until particles are removed while keeping uninjured areas warm.",
    ],
    clinicalPearls: [
      "Apply the trauma field-triage and destination plan: high-risk patients to the highest-level appropriate trauma center within regional constraints; favor pediatric-capable trauma care for children. Use a closer stabilization hospital only for an immediate critical need that cannot safely be managed during longer transport, under the destination plan/Medical Control. Notify early, document the reason, and activate the predefined transfer process. Do not delay ground movement solely while awaiting aircraft.",
      "Electrical current may cause dysrhythmia, deep tissue injury, rhabdomyolysis, fractures, or traumatic falls.",
      "Assess entrance and exit wounds, distal perfusion, neurologic status, and circumferential injury.",
    ],
  }),

  traumaProtocol({
    id: "tb-03",
    title: "Crush Syndrome",
    sourcePdf: "/protocols/claiborne/tb-03-crush-syndrome-protocol.pdf",
    overview: [
      "Suspect crush syndrome after compression of a large muscle mass, especially an extremity or torso; it can occur in under an hour and risk rises with longer entrapment.",
      "Begin resuscitation before release when feasible because reperfusion can cause sudden hyperkalemia, acidosis, shock, and cardiac arrest.",
    ],
    flow: [
      { title: "Entrapment / Compression", text: "Confirm scene safety, duration, body region, access, and rescue plan.", levels: ALL_LEVELS, tone: "start" },
      { title: "Crush Syndrome Risk?", text: "Large muscle mass • any significant entrapment time • swelling • neurologic deficit • shock. Document the time compression began when known.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Before Release", text: "Airway • continuous cardiac monitoring/12-lead when feasible • IV/IO • normal saline preferred • prepare defibrillator and request early Medical Control/rescue-physician input. ECG-directed calcium, bicarbonate, and high-dose albuterol are Paramedic-only. Do not delay unsafe extrication.", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Release + Reassess", text: "Coordinate release with rescue personnel; assign a clinician to monitor the patient. Watch immediately for hypotension, hyperkalemia/dysrhythmia, respiratory failure, arrest, and compartment syndrome.", levels: ALL_LEVELS, tone: "action" },
      { title: "Treat Complications", text: "Reassess shock, pain, compartment syndrome, and associated trauma; supportive treatment within scope. Request Paramedic treatment for suspected hyperkalemia.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Paramedic Hyperkalemia Care", text: "Prepare ECG-directed calcium, sodium bicarbonate, and high-dose albuterol treatment before release for ECG changes, dysrhythmia, or peri-arrest deterioration under the reconciled standing order or Medical Control. No routine prophylactic calcium or bicarbonate.", levels: ["Paramedic"], tone: "urgent" },
      { title: "Rapid Trauma Transport", text: "Minimize scene delay once safely released and notify the trauma center early for high-risk entrapment.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Coordinate safe rescue, control bleeding, manage airway and ventilation, prevent hypothermia, splint as indicated, and document the compression time and body region.",
      "Do not delay extrication for nonessential procedures when the scene is unsafe.",
    ],
    aemt: [
      "Perform all EMT care plus large-bore vascular access and 0.9% saline before release when feasible: adult initial 1 L, then continue reassessed fluids during extrication. Prefer normal saline, but do not withhold otherwise indicated isotonic crystalloid solely because saline is unavailable. Use Medical Control for pediatric fluid guidance and for additional fluid rate/reassessment limits not specified by standing order.",
      "Do not administer calcium, sodium bicarbonate, or high-dose albuterol for hyperkalemia as an AEMT; these interventions are Paramedic-only.",
      "Monitor rhythm and perfusion, obtain a 12-lead when feasible, and prepare for rapid deterioration at the moment of release.",
    ],
    paramedic: [
      "Perform all prior care plus protocol-directed treatment for ECG changes, dysrhythmia, or peri-arrest hyperkalemia, severe pain, and shock; do not give routine prophylactic calcium or bicarbonate solely for crush injury.",
      "Coordinate the timing of release with rescue personnel and ensure the defibrillator and ECG-directed hyperkalemia treatment are immediately available. Obtain early Medical Control/rescue-physician input for prolonged large-muscle compression and follow the high-risk crush-release plan.",
      "Pre-release empiric medication use, fluid rate, and reassessment limits require the specified standing order or Medical Control; do not improvise. Do not repeat calcium gluconate without a specific Medical Control order confirming the cumulative dose.",
    ],
    warnings: [
      "Do not apply a prophylactic tourniquet solely because crush syndrome is suspected. Consider one only for hemorrhage control or with Medical Control/an established rescue plan when pre-release treatment cannot be provided.",
      "Reperfusion-related deterioration may occur immediately after the compressive force is removed.",
    ],
    reviewFlags: [
      "Medical-director approval is required before clinical release.",
      "Verify medication dosing and invasive procedures against current Claiborne County standing orders.",
      "The controlled Claiborne PDF mirrors this native content and replaces the imported sheet. Reconciliation does not establish full-system clinical release.",
      "The existing AM-03 calcium-gluconate repeat instruction conflicts with its 3 g per-episode maximum. A reconciled repeat/cumulative-limit order remains pending; no new numeric regimen is chosen.",
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
      { title: "Major Hemorrhage?", text: "Direct pressure • approved wound packing • tourniquet for life-threatening extremity bleeding when pressure is ineffective or impractical. Tighten until bleeding stops and distal pulse is absent; reassess after movement.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Check CSM", text: "Document distal pulse, capillary refill, skin color/temperature, sensation, and movement before and after every alignment, splint, or tourniquet.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Align / Splint", text: "Cover open wounds, stabilize joints above and below, and reassess CSM. Gently realign only for absent distal perfusion or when needed to splint; stop for resistance or worsening pain. Do not force reduction.", levels: ALL_LEVELS, tone: "action" },
      { title: "Pain / Shock Care", text: "Prevent hypothermia and provide authorized analgesia and vascular access.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Appropriate Destination", text: "Apply the trauma field-triage and destination plan: high-risk patients to the highest-level appropriate trauma center within regional constraints; favor pediatric-capable trauma care for children. Use a closer stabilization hospital only for an immediate critical need that cannot safely be managed during longer transport, under the destination plan/Medical Control. Notify early, document the reason, and activate the predefined transfer process. Do not delay ground movement solely while awaiting aircraft.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "For life-threatening extremity hemorrhage, apply an approved tourniquet promptly when direct pressure is ineffective or impractical. Tighten until bleeding stops and the distal pulse is absent. If bleeding persists despite proper placement and tightening, add a second tourniquet immediately proximal to the first when feasible. Record time, leave visible, and reassess after movement and throughout transport. For suitable junctional wounds, pack with approved gauze and maintain direct pressure per product instructions. Document distal pulse, capillary refill, skin color/temperature, sensation, and movement before and after every intervention.",
      "For open fractures, cover with a sterile dressing; do not probe the wound or push exposed bone back in. Wrap amputated tissue in moist sterile gauze, seal it in a labeled bag with patient/time, send it with the patient, and keep cool without direct contact with ice or water.",
    ],
    aemt: [
      "Perform all EMT care plus vascular access, fluid therapy for shock, and authorized analgesia.",
      "Expanded AEMT analgesia is not enabled by default while individual authorization is unverified. The specified medication, route, and patient group require current Tennessee authority, documented Tennessee-approved expanded analgesia training, agency credentialing, and medical-director standing orders; training alone does not grant permission.",
      "Trend distal perfusion and report any deterioration immediately.",
    ],
    paramedic: [
      "Perform all prior care plus advanced pain management and resuscitation of hemorrhagic shock within protocol.",
      "Coordinate direct trauma-center transport when limb or life is threatened.",
    ],
    warnings: [
      "Do not delay transport attempting perfect anatomic alignment. Do not force fracture or dislocation reduction; attempt gentle realignment only for absent distal perfusion or when needed to splint, and stop for resistance or worsening pain.",
      "Record tourniquet application time. Do not periodically loosen or remove a tourniquet. A pulseless extremity, expanding hematoma, severe pain out of proportion, or tense swelling requires urgent specialty care.",
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
      { title: "GCS + Pupils", text: "Document GCS components, pupils, focal deficits, and repeated neurologic examinations; use continuous SpO₂ and serial blood pressure monitoring.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Prevent Secondary Injury", text: "Continuously monitor oxygenation and ventilation; aim for SpO₂ ≥94% and urgently correct SpO₂ <90% or inadequate ventilation. During initial and routine assisted ventilation, target EtCO₂ 35–45 mmHg; do not routinely hyperventilate. Maintain age-appropriate perfusion, glucose, and temperature. For suspected TBI, prevent hypotension: target adult SBP at least 110 mmHg, including age 70; do not use permissive hypotension. Reassess blood pressure frequently and after treatment; for children, obtain Medical Control for age-specific TBI resuscitation guidance rather than substituting an adult target.", levels: ALL_LEVELS, tone: "action" },
      { title: "Herniation Signs?", text: "Falling GCS • unilateral dilated pupil • abnormal posturing • Cushing response. Position the head midline and elevate about 20–30° when this does not worsen hypotension or interfere with spinal precautions. Only for clear active or imminent herniation, use brief controlled rescue ventilation to EtCO₂ 30–35 mmHg with capnography while expediting transport; avoid overshooting below 30 mmHg; no routine hyperventilation.", levels: ["AEMT", "Paramedic"], tone: "decision" },
      { title: "Appropriate Destination", text: "Minimize scene time, provide serial GCS and early notification, especially for neurologic deterioration or anticoagulant/antiplatelet use. Apply the trauma field-triage and destination plan: high-risk patients to the highest-level appropriate trauma center within regional constraints; favor pediatric-capable trauma care for children. Use a closer stabilization hospital only for an immediate critical need that cannot safely be managed during longer transport, under the destination plan/Medical Control. Notify early, document the reason, and activate the predefined transfer process. Do not delay ground movement solely while awaiting aircraft.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Maintain airway; continuously monitor oxygenation and ventilation, aim for SpO₂ ≥94%, and urgently correct SpO₂ <90% or inadequate ventilation. Use spinal motion restriction when indicated, control bleeding, obtain serial GCS/pupils, and transport promptly.",
      "Identify anticoagulants, antiplatelets, seizure, repeated vomiting, skull signs, focal deficit, abnormal pupils, and neurologic deterioration.",
    ],
    aemt: [
      "Perform all EMT care plus vascular access and age-appropriate treatment of hypotension without delaying transport; use AM-05 for adults. For suspected TBI, target adult SBP at least 110 mmHg, including age 70; do not use permissive hypotension. Reassess blood pressure frequently and after treatment; for children, obtain Medical Control for age-specific TBI resuscitation guidance rather than substituting an adult target.",
      "Use authorized airway adjuncts and EtCO₂ monitoring when available. For initial and routine assisted ventilation, target EtCO₂ 35–45 mmHg; avoid routine hyperventilation.",
    ],
    paramedic: [
      "Perform all prior care plus advanced airway management and controlled ventilation when the patient cannot protect the airway; for initial and routine assisted ventilation, including after advanced airway placement, target EtCO₂ 35–45 mmHg.",
      "Only for clear active or imminent herniation, use brief controlled rescue ventilation to EtCO₂ 30–35 mmHg with capnography while expediting transport; avoid overshooting below 30 mmHg; avoid routine hyperventilation. Treat active seizure under the seizure/medication pathway; do not provide prophylactic antiseizure medication in the field.",
    ],
    warnings: [
      "For pediatric TBI, obtain Medical Control guidance on age-specific perfusion targets. Do not substitute an adult target or a generic medical-shock threshold.",
      "A single normal examination does not exclude intracranial hemorrhage, especially in anticoagulated or older patients.",
      "Do not aggressively control hypertension in suspected traumatic brain injury unless another approved protocol requires it. Initial and routine assisted-ventilation target: EtCO₂ 35–45 mmHg. Brief rescue target: EtCO₂ 30–35 mmHg only for clear active or imminent herniation, with capnography and expedited transport; avoid overshooting below 30 mmHg and do not routinely hyperventilate.",
    ],
    actionLinks: [
      { label: "AM-05 Hypotension / Shock", description: "Adult shock care with the higher suspected-TBI perfusion target.", href: "/protocols/am/am-05", kind: "protocol" },
    ],
    clinicalPearls: [
      "Hypotension in isolated head injury should prompt a search for extracranial hemorrhage.",
      "Trend the individual eye, verbal, and motor GCS components rather than documenting only a total score.",
    ],
    reviewFlags: [
      "Medical-director approval is required before clinical release.",
      "Verify medication dosing and invasive procedures against current Claiborne County standing orders.",
      "The controlled Claiborne PDF mirrors this native content and replaces the imported sheet. Reconciliation does not establish full-system clinical release.",
      "The pediatric TBI numeric target table and age boundaries remain unpublished/unapproved. No pediatric numeric target is selected by this reconciliation.",
    ],
  }),

  traumaProtocol({
    id: "tb-06",
    title: "Multiple Trauma",
    sourcePdf: "/protocols/claiborne/tb-06-multiple-trauma-protocol.pdf",
    overview: [
      "Use a rapid XABCDE approach, treat immediate threats, and minimize scene time for high-risk trauma.",
      "Destination selection and early notification are part of treatment.",
    ],
    flow: [
      { title: "Major Trauma", text: "Scene safety • mechanism • resources • request air medical early when it meaningfully improves time to needed care or provides unavailable capability; never delay ground transport.", levels: ALL_LEVELS, tone: "start" },
      { title: "XABCDE", text: "Exsanguination • airway • breathing • circulation • disability • exposure.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "High-Risk Trauma?", text: "Physiologic abnormality • high-risk anatomy • special considerations (age, anticoagulants, pregnancy, burns with trauma, suspected abuse) • concerning mechanism.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Treat Immediate Threats", text: "Catastrophic hemorrhage control • airway/ventilation • assess chest injury and urgently request ALS for suspected tension pneumothorax • pelvic stabilization only when indicated • warming • reassessment.", levels: ALL_LEVELS, tone: "action" },
      { title: "Chest Decompression", text: "Paramedic-only chest decompression for suspected tension pneumothorax under current standing orders; reassess ventilation and perfusion after intervention.", levels: ["Paramedic"], tone: "urgent" },
      { title: "Resuscitate En Route", text: "Access • hemorrhage control • warmed isotonic crystalloid titrated to perfusion when blood is unavailable • higher adult TBI SBP target ≥110 mmHg • analgesia • warming • serial reassessment. Follow AM-05; avoid unnecessary large-volume crystalloid.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Trauma TXA Eligibility", text: "Paramedic only: after immediate lifesaving interventions, consider IV/IO TXA for traumatic hemorrhage with clinical hemorrhagic shock within 3 hours of injury. Adult dose: 1–2 g IV/IO: give 1 g over 10 minutes or 2 g over 20 minutes; do not exceed 100 mg/min. Verify the stocked concentration and dilution against the current medication-preparation instructions. Do not administer an automatic repeat dose; any additional dose requires a separate authorized order.", levels: ["Paramedic"], tone: "action" },
      { title: "Appropriate Destination", text: "Apply the trauma field-triage and destination plan: high-risk patients to the highest-level appropriate trauma center within regional constraints; favor pediatric-capable trauma care for children. Use a closer stabilization hospital only for an immediate critical need that cannot safely be managed during longer transport, under the destination plan/Medical Control. Notify early, document the reason, and activate the predefined transfer process. Do not delay ground movement solely while awaiting aircraft.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Perform rapid XABCDE, control hemorrhage, support airway/ventilation, assess chest injury, oxygenation and perfusion, and urgently request ALS for suspected tension pneumothorax. Stabilize the pelvis only when indicated, stabilize fractures, and prevent hypothermia.",
      "For life-threatening extremity hemorrhage, apply an approved tourniquet promptly when direct pressure is ineffective or impractical. Tighten until bleeding stops and the distal pulse is absent. If bleeding persists despite proper placement and tightening, add a second tourniquet immediately proximal to the first when feasible. Record time, leave visible, and reassess after movement and throughout transport. For suitable junctional wounds, pack with approved gauze and maintain direct pressure per product instructions. Do not periodically loosen or remove a tourniquet.",
      "For an open chest wound in a spontaneously breathing patient, consider an approved vented seal and reassess frequently. If deterioration follows sealing, assess/release an obstructing seal and obtain immediate Paramedic treatment for suspected tension pneumothorax. Do not probe the wound. Positive-pressure ventilation requires the chest-injury standing orders and immediate Paramedic/Medical Control guidance, not automatic extrapolation of this seal instruction.",
      "Package promptly; complete the secondary examination during transport when possible.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access, age-appropriate authorized shock resuscitation, and airway support during transport. For adult hemorrhagic shock when blood is unavailable, follow AM-05: titrate warmed isotonic crystalloid to perfusion; avoid unnecessary large-volume crystalloid. If TBI is suspected, prevent hypotension and target adult SBP at least 110 mmHg; do not use permissive hypotension.",
      "Trend mental status, perfusion, respiratory status, and response to treatment.",
    ],
    paramedic: [
      "Perform all prior care plus advanced airway treatment, chest decompression, analgesia, and protocol-directed hemorrhagic-shock resuscitation.",
      "Paramedic only: after immediate lifesaving interventions, consider IV/IO TXA for traumatic hemorrhage with clinical hemorrhagic shock no more than 3 hours after injury. Adult dose: 1–2 g IV/IO: give 1 g over 10 minutes or 2 g over 20 minutes; do not exceed 100 mg/min. Verify the stocked concentration and dilution against the current medication-preparation instructions. Do not administer an automatic repeat dose; any additional dose requires a separate authorized order. Do not infer a systemic trauma regimen from topical indications. Record injury time and any TXA dose/time, and notify the receiving team to prevent duplicate dosing.",
      "Pediatric trauma TXA: local dose reference 15 mg/kg, Paramedic-only. Before administration, confirm pediatric eligibility, maximum dose, administration rate, and preparation with Medical Control within provider scope. Do not extrapolate the adult dose or infusion rate to children.",
      "Use blood products only within an authorized, supported transfusion program with required training, monitoring, and destination coordination.",
      "Lead destination, air-medical, and Medical Control decisions without extending scene time.",
    ],
    actionLinks: [
      { label: "AM-05 Hypotension / Shock", description: "Adult hemorrhagic-shock strategy and suspected-TBI perfusion exception.", href: "/protocols/am/am-05", kind: "protocol" },
      { label: "TB-12 Abdominal / Pelvic Trauma", description: "Concealed hemorrhage, pelvic stabilization, and trauma TXA eligibility, the authorized adult dose range, and outstanding administration parameters.", href: "/protocols/tb/tb-12", kind: "protocol" },
      { label: "TB-08 Spinal Motion", description: "Open when selective spinal motion restriction is indicated.", href: "/protocols/tb/tb-08", kind: "protocol" },
      { label: "TB-10 Traumatic Arrest", description: "Open for traumatic pulseless arrest.", href: "/protocols/tb/tb-10", kind: "protocol" },
    ],
    warnings: [
      "Do not delay transport for IV attempts, detailed examination, splinting, or procedures that can be completed en route.",
      "Prevent hypothermia throughout trauma resuscitation.",
      "Trauma TXA is Paramedic-only, not an AEMT intervention. Adult dose: 1–2 g IV/IO: give 1 g over 10 minutes or 2 g over 20 minutes; do not exceed 100 mg/min. Verify the stocked concentration and dilution against the current medication-preparation instructions. Do not administer an automatic repeat dose; any additional dose requires a separate authorized order. Pediatric administration requires confirmation of the patient-specific maximum and rate with Medical Control within provider scope. Do not infer a trauma regimen from topical bleeding instructions.",
      "For pediatric traumatic hemorrhage, obtain Medical Control guidance and use only the authorized pediatric trauma resuscitation order; do not apply medical or septic-shock fluid targets indiscriminately.",
    ],
    reviewFlags: [
      "Medical-director approval is required before clinical release.",
      "Verify medication dosing and invasive procedures against current Claiborne County standing orders.",
      "The controlled Claiborne PDF mirrors this native content and replaces the imported sheet. Reconciliation does not establish full-system clinical release.",
      "Adult TXA dose/rate accepted October 30, 2026: 1 g IV/IO over 10 minutes or 2 g IV/IO over 20 minutes, not exceeding 100 mg/min. No automatic repeat dose is provided. Verify stocked concentration/dilution using existing preparation instructions. Pediatric 15 mg/kg is the retained local reference; pediatric maximum/rate/age eligibility and general IO/state-authority reconciliation remain separate requirements.",
      "A numeric pediatric traumatic-hemorrhage branch remains pending; a medical/septic-shock link alone does not establish one.",
    ],
  }),

  traumaProtocol({
    id: "tb-07",
    title: "Radiation Incident",
    sourcePdf: "/protocols/claiborne/tb-07-radiation-incident-protocol.pdf",
    overview: [
      "Radiation exposure, external contamination, and internal contamination are distinct problems; exposure alone does not make the patient or ambulance contaminated.",
      "Treat life threats first while using time, distance, shielding, PPE, and contamination control.",
    ],
    flow: [
      { title: "Radiation Hazard", text: "Stage until Incident Command identifies a safe zone and the appropriate PPE and radiation monitoring/dosimetry when required.", levels: ALL_LEVELS, tone: "start" },
      { title: "Life Threat?", text: "Do not delay lifesaving airway, breathing, hemorrhage care, or transport for decontamination.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Contaminated?", text: "If radioactive material is on clothing or skin, carefully remove outer clothing, bag and label belongings, then gently wash with soap and lukewarm water. Do not decontaminate an exposure-only patient.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Assess Exposure", text: "Source • time • distance • shielding • symptoms • associated blast/burn/trauma • survey or dose information provided by radiation authorities.", levels: ALL_LEVELS, tone: "action" },
      { title: "Coordinate Experts", text: "Incident Command/HazMat • local radiation safety • receiving facility • Medical Control.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Controlled Transport", text: "Notify the destination early. If unstable, transport promptly with contamination precautions rather than delaying for completed decontamination.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Use appropriate PPE and contamination control, treat immediate threats, and prevent spread. Exposure without contamination does not require patient or ambulance decontamination.",
      "For known or suspected external contamination, carefully remove outer clothing, bag and label belongings, and gently wash exposed skin or hair with soap and lukewarm water; do not scrub or injure the skin.",
      "Record source information, exposure time, distance, shielding, symptoms, decontamination performed, and any survey or dose information provided by radiation authorities.",
    ],
    aemt: [
      "Perform all EMT care plus vascular access and supportive treatment within standing orders.",
      "Coordinate monitoring, ambulance preparation, and transport precautions with Incident Command.",
    ],
    paramedic: [
      "Perform all prior care plus advanced supportive care and consultation with Medical Control, HazMat, local radiation safety, and the receiving facility.",
      "Manage associated trauma, burns, airway injury, shock, or dysrhythmia under the appropriate protocols. Do not give potassium iodide or other radiation countermeasures unless specifically directed by public-health or radiation authorities.",
    ],
    warnings: [
      "Do not enter a radiation hot zone without authorization, training, appropriate PPE, and required monitoring/dosimetry.",
      "Contamination alone is not a reason to withhold lifesaving care or delay transport of a seriously injured patient.",
    ],
  }),

  traumaProtocol({
    id: "tb-08",
    title: "Selective Spinal Immobilization",
    sourcePdf: "/protocols/claiborne/tb-08-selective-spinal-immobilization-protocol.pdf",
    overview: [
      "Apply spinal motion restriction (SMR) selectively after blunt trauma based on a reliable clinical examination and high-risk findings.",
      "The goal is to minimize unwanted spinal movement and provide safe handling, not routine prolonged placement on a rigid long board.",
    ],
    flow: [
      { title: "Blunt Trauma", text: "Manually stabilize when spinal injury is reasonably suspected.", levels: ALL_LEVELS, tone: "start" },
      { title: "Reliable Exam?", text: "Normal alertness • no intoxication • no distracting injury • effective communication.", levels: ALL_LEVELS, tone: "decision" },
      { title: "SMR Indicated?", text: "Altered mental status • midline neck/back pain or tenderness • focal neurologic symptom/deficit • spinal deformity • unreliable examination.", levels: ALL_LEVELS, tone: "decision" },
      { title: "SMR Indicated", text: "Use an appropriately fitted cervical collar and keep head, neck, and torso aligned and secured on the cot, scoop, vacuum device, or similar device.", levels: ALL_LEVELS, tone: "action" },
      { title: "SMR Not Indicated", text: "Mechanism alone does not mandate SMR in an alert, reliable patient with no pain/tenderness or neurologic finding. Document the negative assessment and reassess if symptoms change.", levels: ALL_LEVELS, tone: "action" },
      { title: "Transport + Reassess", text: "Use the safest position that preserves airway and ventilation; repeat motor and sensory examinations and document findings at handoff.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Assess alertness, reliability, midline neck/back pain or tenderness, neurologic findings, deformity, distracting injury, intoxication, and communication barriers.",
      "For children, include neck pain/torticollis, neurologic abnormality, altered mental status, high-risk motor-vehicle collision, high-impact diving, and substantial torso injury in the age-appropriate assessment. Age alone is not an indication, and mechanism alone does not mandate SMR in an alert, reliable, asymptomatic patient.",
      "Use appropriately sized equipment and padding to avoid excessive neck flexion; maintain airway access, do not force neutral alignment, and minimize time on rigid transfer devices.",
      "Apply SMR when indicated using an appropriately fitted cervical collar and aligned securement; pad voids, protect pressure points, and reassess motor/sensory findings and distal perfusion before and after movement.",
    ],
    aemt: [
      "Perform all EMT care and support safe positioning, airway care, analgesia, and serial neurologic reassessment within scope.",
      "Expanded AEMT analgesia is not enabled by default while individual authorization is unverified. The specified medication, route, and patient group require current Tennessee authority, documented Tennessee-approved expanded analgesia training, agency credentialing, and medical-director standing orders; training alone does not grant permission.",
    ],
    paramedic: [
      "Perform all prior care, resolve equivocal examinations, and manage airway or ventilation while minimizing cervical motion.",
      "Document the clinical basis for applying or clearing SMR and repeat neurologic findings before transfer of care.",
    ],
    warnings: [
      "Do not force the head or neck into neutral alignment when pain, resistance, neurologic change, airway compromise, or a position that cannot be tolerated occurs.",
      "A rigid long board is primarily an extrication or transfer device, not routine transport packaging; remove it when safely feasible.",
      "Routine SMR is not indicated for penetrating trauma without neurologic deficit and should not delay transport.",
      "For pediatric clearance, use only the approved pediatric decision aid and locally authorized clinician. If these requirements cannot be met, obtain Medical Control guidance; do not substitute an emergency-department imaging rule or treat these risk features as a stand-alone field-clearance rule.",
    ],
    reviewFlags: [
      "Medical-director approval is required before clinical release.",
      "Verify medication dosing and invasive procedures against current Claiborne County standing orders.",
      "The controlled Claiborne PDF mirrors this native content and replaces the imported sheet. Reconciliation does not establish full-system clinical release.",
      "The pediatric field decision aid and local clinical-clearance authority still require documentation before clinical release.",
    ],
  }),

  traumaProtocol({
    id: "tb-09",
    title: "Thermal Burn",
    sourcePdf: "/protocols/claiborne/tb-09-thermal-burn-protocol.pdf",
    overview: [
      "Stop the burning process, identify airway or associated trauma, estimate partial- and full-thickness TBSA, and prevent hypothermia.",
      "Full-thickness burns; partial-thickness burns of 10% TBSA or greater; deep burns involving critical areas; inhalation injury; significant associated trauma; uncontrolled pain; and pediatric burns require burn-center consultation or transfer consideration.",
    ],
    flow: [
      { title: "Stop Burning", text: "Remove the heat source and constricting items; protect responders. For a small thermal burn (<10% TBSA), use cool running water for approximately 20 minutes when feasible without hypothermia or transport delay. Monitor temperature and keep uninjured areas warm; no ice.", levels: ALL_LEVELS, tone: "start" },
      { title: "Airway / Trauma Threat?", text: "Assess inhalation injury, progressive respiratory compromise, CO/cyanide risk, and multisystem trauma; plan early airway care when clinically indicated.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Classify + Estimate TBSA", text: "Count only partial- and full-thickness burns. For scattered burns, the patient's palm plus fingers (whole palmar hand surface) is approximately 1% TBSA; use an age-adjusted validated chart for larger pediatric burns.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Burn-Center Consultation?", text: "Full thickness • partial thickness ≥10% TBSA • potentially deep burn of any size • critical-area burn • inhalation injury • associated trauma • uncontrolled pain • complicating comorbidity • pediatric burn.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Dry Cover + Resuscitate", text: "Prevent hypothermia • IV/IO when indicated • controlled warmed LR infusion using the burn-fluid table below (NS if LR unavailable) • pain control • frequent reassessment. Do not give an automatic 1 L bolus solely for burn size; shock requires assessment for hemorrhage or another cause.", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Appropriate Destination", text: "Consult a burn center for indicated injuries, including potentially deep burns of any size and complicating comorbidity. Consultation does not automatically require bypassing needed stabilization; follow the regional destination plan. Use a closer stabilization hospital for an immediate critical need that cannot safely be managed during longer transport; notify early, document the reason, and coordinate transfer.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Stop the burning process and remove jewelry/constricting items. For a small thermal burn (<10% TBSA), use cool running water for approximately 20 minutes when feasible without hypothermia or transport delay; monitor temperature and keep uninjured areas warm. Do not cool when hypothermia risk is significant. Cover with clean dry dressings, prevent hypothermia, and estimate TBSA.",
      "Support airway and ventilation, screen for carbon monoxide/cyanide exposure, and treat associated trauma.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access and authorized non-IM analgesia within scope. When burn-fluid resuscitation is indicated, use a controlled warmed lactated Ringer's infusion (normal saline if LR is unavailable) at the starting rate in the burn-fluid table; reassess perfusion, respiratory status, and response frequently.",
      "Expanded AEMT analgesia is not enabled by default while individual authorization is unverified. The specified medication, route, and patient group require current Tennessee authority, documented Tennessee-approved expanded analgesia training, agency credentialing, and medical-director standing orders; training alone does not grant permission.",
      "Consider two IV sites for larger burns without delaying transport.",
      "For shock, search for associated hemorrhage or another cause and follow the appropriate shock-resuscitation pathway; the isolated-burn starting rate does not replace shock treatment.",
    ],
    paramedic: [
      "Perform all prior care plus advanced airway management when clinically required, protocol-directed analgesia, and burn resuscitation.",
      "Coordinate burn-center consultation or direct transport when appropriate. Consultation does not automatically require bypassing needed stabilization; apply the regional destination plan, document any immediate critical need for closer stabilization, and arrange transfer.",
    ],
    assessment: [
      {
        title: "Initial burn-fluid rates when resuscitation is indicated",
        items: [
          "Record injury time, weight, and partial-/full-thickness TBSA. Use warmed lactated Ringer's when available; normal saline is an alternative, changing to LR when available.",
          "TBSA below 20%: 0.25 mL/kg × TBSA percentage per hour. Enter TBSA as a whole percentage, not a decimal fraction; for 70 kg and 15% TBSA, the starting rate is approximately 263 mL/hr.",
          "TBSA 20% or greater: age ≤5: 125 mL/hr; age 6–14: 250 mL/hr; age ≥15: 500 mL/hr.",
          "Reassess perfusion, respiratory status, and response frequently. Do not give an automatic 1 L bolus solely because a burn is extensive; do not delay transport.",
          "For shock, search for hemorrhage or another cause and use the appropriate shock-resuscitation pathway rather than relying on the isolated-burn starting rate.",
        ],
      },
      {
        title: "Burn-center consultation or transfer considerations",
        items: [
          "Full-thickness burns; potentially deep burns of any size; or comorbidity that complicates care.",
          "Partial-thickness burns of 10% TBSA or greater.",
          "Deep partial- or full-thickness burns involving the face, hands, feet, genitalia, perineum, or over major joints.",
          "Suspected inhalation injury, chemical or electrical injury, significant associated trauma, poorly controlled pain, or pediatric burns requiring specialty support.",
        ],
      },
    ],
    treatmentSteps: [
      "For a small thermal burn (<10% TBSA), use cool running water for approximately 20 minutes when feasible without hypothermia or transport delay. Monitor temperature and keep uninjured areas warm; do not use ice or cool when hypothermia risk is significant. Then cover with clean dry dressings.",
      "For an isolated burn requiring fluid resuscitation without shock, begin a controlled warmed LR infusion using the displayed age-/weight-/TBSA-based burn-fluid table; use NS if LR is unavailable. Record injury time, weight, and partial-/full-thickness TBSA, and reassess frequently.",
      "For shock, search for associated hemorrhage or another cause and use the appropriate shock-resuscitation pathway; do not delay transport. Do not apply medical/septic-shock fluid targets indiscriminately to pediatric traumatic hemorrhage.",
      "Consult a burn center for indicated injuries, potentially deep burns of any size, or complicating comorbidity. Consultation does not automatically require bypassing needed stabilization; follow the regional destination plan and document/coordinate any closer stabilization and transfer.",
    ],
    actionLinks: [
      { label: "AM-05 Hypotension / Shock", description: "Adult shock care when hypotension suggests hemorrhage or another cause beyond an isolated burn.", href: "/protocols/am/am-05", kind: "protocol" },
      { label: "TB-06 Multiple Trauma", description: "Associated traumatic hemorrhage and trauma destination priorities.", href: "/protocols/tb/tb-06", kind: "protocol" },
    ],
    warnings: [
      "Do not include superficial first-degree burns in TBSA.",
      "Do not apply ice, wet sheets, creams, or ointments to significant burns; burn patients are highly susceptible to hypothermia.",
      "Do not use intramuscular analgesics in burn patients.",
    ],
  }),

  traumaProtocol({
    id: "tb-10",
    title: "Traumatic Arrest",
    sourcePdf: "/protocols/claiborne/tb-10-traumatic-arrest-protocol.pdf",
    overview: [
      "Apply the approved traumatic-arrest withholding and resuscitation criteria while prioritizing immediately reversible traumatic causes.",
      "When resuscitation is indicated, perform essential interventions without delaying movement toward definitive care for nonessential procedures.",
    ],
    flow: [
      { title: "Arrest With Trauma", text: "Confirm apnea, pulselessness, rhythm when appropriate, DNR/MOST, and obvious-death criteria. If trauma does not clearly explain the arrest, use the age-appropriate medical cardiac-arrest pathway: adult cardiac arrest or PC-04 Pediatric Pulseless Arrest, while evaluating reversible causes.", levels: ALL_LEVELS, tone: "start" },
      { title: "Withhold Resuscitation?", text: "Withhold only for a valid DNR/MOST or unmistakable death: decomposition, rigor mortis, dependent lividity, decapitation, hemicorporectomy, or injury incompatible with life. Do not use downtime alone as a withholding rule.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Correct Reversible Causes", text: "Catastrophic hemorrhage • oxygenation/ventilation • Paramedic chest decompression when indicated • pelvic stabilization only when indicated • hypothermia prevention.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "CPR / Defibrillation", text: "Perform high-quality CPR and defibrillation for a shockable rhythm without delaying catastrophic hemorrhage control, effective oxygenation/ventilation, or indicated Paramedic chest decompression.", levels: ALL_LEVELS, tone: "action" },
      { title: "ROSC or Transport Candidate?", text: "Witnessed arrest, organized rhythm, signs of life, feasible definitive-care transport, or an immediately reversible cause.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Appropriate Destination", text: "Follow Medical Control and deceased-person policy. Apply the trauma field-triage and destination plan: high-risk patients to the highest-level appropriate trauma center within regional constraints; favor pediatric-capable trauma care for children. Use a closer stabilization hospital only for an immediate critical need that cannot safely be managed during longer transport, under the destination plan/Medical Control. Notify early, document the reason, and activate the predefined transfer process. Do not delay ground movement solely while awaiting aircraft.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Confirm arrest and withholding criteria, control catastrophic hemorrhage, support airway/ventilation, apply AED/monitor, stabilize the pelvis only when indicated, and prevent hypothermia.",
      "Begin rapid transport when resuscitation criteria are met; do not delay for procedures that can occur en route.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access during transport. Do not perform chest decompression; assist the Paramedic with the procedure when requested.",
      "Use authorized airway adjuncts and reassess for signs of life and ROSC.",
    ],
    paramedic: [
      "Perform all prior care plus advanced airway management, rhythm treatment, and chest decompression when tension physiology is suspected within standing orders. Consider bilateral decompression when the mechanism, examination, or physiology supports it.",
      "For ADULT clearly traumatic arrest, do not routinely give epinephrine. If used under local orders, it must not precede indicated lifesaving trauma interventions. Pediatric medication and resuscitation rules require the separate age-appropriate director-approved pathway; do not extrapolate the adult epinephrine instruction to children.",
      "Continue resuscitation or terminate only under current Claiborne policy and Medical Control requirements; do not use an app-only downtime cutoff.",
    ],
    warnings: [
      "Do not apply traumatic-arrest withholding criteria to lightning strike, drowning, or hypothermic arrest; initiate resuscitation.",
      "Do not hyperventilate. Avoid delaying transport for endotracheal intubation or vascular access.",
      "Chest decompression is Paramedic-only under the current Tennessee statewide protocol guidelines. Do not extend this procedure to an AEMT without formal state authorization.",
    ],
    clinicalPearls: [
      "Treat the trauma triad of death by controlling hemorrhage, limiting scene delay, and aggressively preventing hypothermia.",
      "Withholding is limited to a valid directive or unmistakable death; an initiated resuscitation requires Claiborne policy and Medical Control for termination decisions.",
    ],
    actionLinks: [
      { label: "AC-03 Adult Cardiac Arrest", description: "Adult medical-arrest pathway when trauma does not clearly explain arrest.", href: "/protocols/ac/ac-03", kind: "protocol" },
      { label: "PC-04 Pediatric Pulseless Arrest", description: "Age-appropriate pediatric medical-arrest pathway when trauma does not clearly explain arrest.", href: "/protocols/pc/pc-04", kind: "protocol" },
      { label: "TB-06 Multiple Trauma", description: "Hemorrhage control, provider-specific chest care, and destination priorities.", href: "/protocols/tb/tb-06", kind: "protocol" },
    ],
    references: [
      "Tennessee Emergency Medical Services ALS/BLS Blended Protocol Guidelines 2024-2025 - Adult Traumatic Cardiac Arrest and Chest Decompression procedure.",
      "NAEMSP, ACS Committee on Trauma, and ACEP. Prehospital Management of Adults with Traumatic Out-of-Hospital Circulatory Arrest, March 2025.",
      "Claiborne County EMS medical-director approval, October 17, 2026.",
    ],
    revisionDate: "2026-10-30",
    lastVerifiedDate: "2026-10-30",
    reviewStatus: "Approved",
    reviewFlags: [
      "Scoped trauma-review revisions accepted October 30, 2026: age-appropriate medical-arrest fallback, adult-only epinephrine safeguard, and destination priorities. Pediatric medication/resuscitation specifics and full-system clinical release remain separate requirements.",
      "Medical-director-approved update: traumatic-arrest withholding is limited to a valid directive or unmistakable death; downtime alone is not a Claiborne withholding rule.",
      "Medical-director-approved scope safeguard: chest decompression is Paramedic-only under the current Tennessee statewide protocol guidelines.",
      "The approved Claiborne direct PDF replaces the imported North Carolina decision tree; the beta application remains subject to full-system release governance.",
    ],
  }),
];
