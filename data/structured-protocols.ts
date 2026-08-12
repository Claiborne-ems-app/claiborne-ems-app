import type { StructuredProtocolContent } from "../lib/protocols/structured-content";
import { structuredUniversalAdditions } from "./structured-universal-additions";
import { structuredTraumaProtocols } from "./structured-trauma-protocols";
import { structuredObstetricsProtocols } from "./structured-obstetrics-protocols";
import { structuredAirwayProtocols } from "./structured-airway-protocols";
import { structuredPediatricCardiacProtocols } from "./structured-pediatric-cardiac-protocols";
import { structuredPediatricMedicalProtocols } from "./structured-pediatric-medical-protocols";
import { structuredSpecialCircumstancesProtocols } from "./structured-special-circumstances-protocols";
import { structuredSceneOperationsProtocols } from "./structured-scene-operations-protocols";
import { structuredToxicologyEnvironmentalProtocols } from "./structured-toxicology-environmental-protocols";
import { structuredChemicalHazmatAdditions } from "./structured-chemical-hazmat-additions";
import { structuredEyeTraumaAdditions } from "./structured-eye-trauma-additions";
import { structuredAbdominalPelvicTraumaAdditions } from "./structured-abdominal-pelvic-trauma-additions";

export const structuredProtocols: StructuredProtocolContent[] = [
  {
    id: "up-01",
    title: "Universal Patient Care",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Applies to every patient encounter and establishes the minimum assessment, treatment, reassessment, documentation, and transfer-of-care expectations for Claiborne County EMS.",
      "Scene safety, appropriate personal protective equipment, rapid recognition of life threats, and early movement toward definitive care take priority.",
      "Use this protocol together with the age-appropriate complaint, medical, trauma, obstetric, pediatric, operational, and procedure protocols that best fit the patient.",
    ],
    flow: [
      { title: "Scene Safe?", text: "PPE • hazards • number of patients • request resources", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Primary Survey", text: "XABCDE • control major bleeding • identify immediate threats", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Unstable / Time-Critical?", text: "Yes: treat immediate threats, notify early, move toward transport", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Focused Assessment", text: "Chief complaint • SAMPLE/OPQRST • exam • first complete vital set", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Select Protocol + Treat", text: "Use complaint-specific pathway and provider-level standing orders", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Reassess", text: "Repeat primary survey, response to treatment, and second complete vital set", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Transport + Handoff", text: "Appropriate destination • concise report • document care and response", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      {
        title: "1. Initial Patient Assessment",
        summary: "Scene safety, XABCDE, acuity, focused history and exam.",
        levels: [
          { level: "EMT", actions: ["Perform scene size-up, XABCDE, major hemorrhage control, SAMPLE/OPQRST, focused exam, and initial vital signs.", "Begin BLS care immediately; do not wait for ALS for lifesaving interventions."] },
          { level: "AEMT", actions: ["Perform all EMT actions and identify early need for vascular access, fluids, or ALS intercept."] },
          { level: "Paramedic", actions: ["Perform all prior actions; lead high-acuity assessment, advanced differential, destination, and treatment decisions."] },
        ],
      },
      {
        title: "2. Airway, Oxygenation & Ventilation",
        summary: "Use the least invasive effective airway intervention.",
        levels: [
          { level: "EMT", actions: ["Position airway, suction, use basic adjuncts, oxygen when indicated, BVM ventilation, and CPAP when authorized."] },
          { level: "AEMT", actions: ["All EMT actions plus authorized supraglottic airway and advanced oxygenation support within Tennessee scope."] },
          { level: "Paramedic", actions: ["Advanced airway management, waveform capnography, ventilator strategy, and post-airway reassessment."] },
        ],
      },
      {
        title: "3. Monitoring & Vital Signs",
        summary: "Two complete sets are required for transported patients whenever feasible.",
        levels: [
          { level: "EMT", actions: ["Document BP, pulse, respirations, SpO₂, mental status, and pain score when applicable.", "Obtain glucose, temperature, ECG, or other monitoring when indicated and within scope."] },
          { level: "AEMT", actions: ["Trend vital signs and reassess after medication, fluids, procedures, or clinical change."] },
          { level: "Paramedic", actions: ["Add 12-lead ECG, EtCO₂, continuous monitoring, and advanced interpretation when indicated."] },
        ],
      },
      {
        title: "4. Vascular Access",
        summary: "Do not delay urgent care or transport for repeated IV attempts.",
        levels: [
          { level: "EMT", actions: ["Assist, protect existing access, and prepare equipment within local policy."] },
          { level: "AEMT", actions: ["Peripheral IV access and authorized fluid/medication administration.", "No more than 3 total peripheral attempts before IO in urgent cases."] },
          { level: "Paramedic", actions: ["IV/IO access; proceed directly to IO when delay is unsafe or IV success is unlikely.", "Use central access only as allowed by agency policy and training."] },
        ],
      },
      {
        title: "5. Medication Administration",
        summary: "Right patient, medication, dose, route, time, indication, and documentation.",
        levels: [
          { level: "EMT", actions: ["Administer only medications authorized for EMT standing orders; verify allergies and contraindications."] },
          { level: "AEMT", actions: ["Administer authorized AEMT medications; reassess effect and adverse response."] },
          { level: "Paramedic", actions: ["Administer formulary medications within standing orders; obtain Medical Control when required."] },
        ],
      },
      {
        title: "6. Pain Management",
        summary: "Treat pain early while preserving respiratory and hemodynamic safety.",
        levels: [
          { level: "EMT", actions: ["Position, splint, ice/heat when appropriate, acetaminophen, and ibuprofen per protocol."] },
          { level: "AEMT", actions: ["All EMT care plus IV access and approved non-opioid therapy within scope."] },
          { level: "Paramedic", actions: ["Fentanyl, morphine, hydromorphone, or ketamine when indicated; monitor and document repeat pain scores."] },
        ],
      },
      {
        title: "7. Behavioral Emergency",
        summary: "De-escalate first; use the least restrictive safe intervention.",
        levels: [
          { level: "EMT", actions: ["Scene safety, verbal de-escalation, medical cause assessment, and safe restraint assistance."] },
          { level: "AEMT", actions: ["All EMT care plus monitoring, vascular access when safe, and support of authorized sedation pathway."] },
          { level: "Paramedic", actions: ["Midazolam or ketamine may be used per agitation protocol. Continuous airway and cardiac monitoring required."] },
        ],
      },
      {
        title: "8. Refusal / Non-Transport",
        summary: "Refusal is a high-risk disposition requiring capacity and informed decision-making.",
        levels: [
          { level: "EMT", actions: ["Assess capacity, explain risks and alternatives, obtain two vital sets when permitted, and document refusal."] },
          { level: "AEMT", actions: ["Support reassessment and identify high-risk features requiring ALS or Medical Control involvement."] },
          { level: "Paramedic", actions: ["Evaluate high-risk refusals, questionable capacity, minors, or serious illness; contact Medical Control when indicated."] },
        ],
      },
      {
        title: "9. Interfacility Transfer",
        summary: "Confirm stability, orders, equipment, medications, and receiving acceptance before departure.",
        levels: [
          { level: "EMT", actions: ["Verify paperwork, patient identity, baseline status, and transport requirements within EMT scope."] },
          { level: "AEMT", actions: ["Manage authorized infusions and monitoring within scope and local transfer policy."] },
          { level: "Paramedic", actions: ["Confirm advanced monitoring, medication compatibility, airway risk, and contingency plan."] },
        ],
      },
      {
        title: "10. Documentation",
        summary: "Record assessment, clinical reasoning, treatment, response, destination, and handoff.",
        levels: [
          { level: "EMT", actions: ["Complete an accurate PCR for every patient contact, refusal, cancellation after contact, or no-transport encounter."] },
          { level: "AEMT", actions: ["Document vascular access, medication, reassessment, and any unsuccessful attempts."] },
          { level: "Paramedic", actions: ["Document advanced assessment, ECG interpretation, differential, protocol deviation, Medical Control, and destination rationale."] },
        ],
      },
      {
        title: "11. Destination Selection",
        summary: "Choose the most appropriate facility based on capability, time, stability, and local plan.",
        levels: [
          { level: "EMT", actions: ["Identify potential specialty needs and communicate early with ALS and dispatch."] },
          { level: "AEMT", actions: ["Support destination decision and early notification for time-sensitive conditions."] },
          { level: "Paramedic", actions: ["Apply specialty destination criteria, bypass policy, patient preference, and air-medical considerations."] },
        ],
      },
      {
        title: "12. Transfer of Care / Handoff",
        summary: "Direct verbal handoff to equal or higher medical authority.",
        levels: [
          { level: "EMT", actions: ["Report age, complaint, acuity, vital signs, findings, treatment, response, and belongings."] },
          { level: "AEMT", actions: ["Include access, fluids, medications, complications, and reassessment."] },
          { level: "Paramedic", actions: ["Include ECG findings, advanced procedures, diagnostic concerns, and Medical Control orders."] },
        ],
      },
      {
        title: "13. Death in the Field",
        summary: "Follow resuscitation, termination, evidence preservation, and notification policy.",
        levels: [
          { level: "EMT", actions: ["Recognize obvious death criteria only as authorized; preserve the scene and notify appropriate resources."] },
          { level: "AEMT", actions: ["Continue care within scope and assist with documentation and family support."] },
          { level: "Paramedic", actions: ["Apply termination criteria, contact Medical Control when required, and coordinate disposition under local policy."] },
        ],
      },
      {
        title: "14. Medical Control",
        summary: "Use for protocol-required orders, uncertainty, deviation, or high-risk decisions.",
        levels: [
          { level: "EMT", actions: ["Request higher-level consultation through the established chain when care exceeds standing orders."] },
          { level: "AEMT", actions: ["Provide concise clinical information and repeat back orders."] },
          { level: "Paramedic", actions: ["Contact Medical Control for required orders, unusual circumstances, protocol conflicts, or high-risk refusal and destination decisions."] },
          { level: "Medical Control", actions: ["Orders must be read back, documented, and linked to the physician or authorized clinician providing direction."] },
        ],
      },
    ],
    indications: [
      "Every person evaluated, treated, transported, released, or otherwise encountered as a potential patient by Claiborne County EMS.",
      "Any call in which EMS personnel provide assessment, advice, treatment, transport, or a refusal or no-transport disposition.",
    ],
    contraindications: [],
    assessment: [
      {
        title: "Scene approach",
        items: [
          "Confirm scene safety before entry and reassess scene hazards throughout the incident.",
          "Use standard precautions and add airborne, droplet, contact, splash, or other protection when indicated.",
          "Determine the number of patients, mechanism of injury or nature of illness, need for triage, and need for additional resources.",
          "Bring the equipment reasonably anticipated for the call; at minimum, ensure immediate access to the jump bag, oxygen and airway equipment, and cardiac monitor when appropriate.",
          "Preserve potential evidence and document any movement of a body, clothing, or surroundings at a possible crime scene.",
        ],
      },
      {
        title: "Primary assessment",
        items: [
          "Form a general impression and identify the chief complaint and immediate life threats.",
          "Assess responsiveness and mental status using AVPU and Glasgow Coma Scale when appropriate.",
          "Assess and manage airway, breathing, circulation, major hemorrhage, and disability before proceeding to the secondary assessment.",
          "Provide BLS interventions immediately when indicated; do not delay lifesaving care while awaiting ALS resources.",
          "Determine whether the patient is high acuity or low acuity and choose the appropriate transport priority.",
        ],
      },
      {
        title: "Focused history and examination",
        items: [
          "Obtain SAMPLE history and use OPQRST for pain or other time-sensitive symptoms when applicable.",
          "Perform a focused medical, trauma, obstetric, behavioral, or pediatric examination based on the complaint and mechanism.",
          "For altered mental status, focal neurologic symptoms, seizure, syncope, suspected overdose, diabetes, or unexplained weakness, obtain blood glucose and perform the appropriate neurologic or stroke assessment.",
          "Obtain a 12-lead ECG when indicated by symptoms, age, risk, or protocol; transmit promptly when the tracing may alter destination or treatment.",
          "Screen for medications, allergies, anticoagulant or antiplatelet use, pregnancy possibility, implanted devices, and relevant advance directives or care plans.",
        ],
      },
      {
        title: "Minimum vital signs and monitoring",
        items: [
          "Obtain and document at least two complete sets of vital signs whenever feasible, including one early in the encounter and one before transfer of care or release.",
          "A complete adult vital-sign set includes systolic and diastolic blood pressure, pulse, respiratory rate, pulse oximetry, mental status, and pain score when applicable.",
          "Add blood glucose, temperature, end-tidal carbon dioxide, carbon monoxide level, 12-lead ECG, or other monitoring when indicated.",
          "Verify an automated blood-pressure value manually when it is inconsistent with the clinical presentation or differs significantly from a manual reading.",
          "Document why any required assessment or vital sign could not be obtained.",
        ],
      },
      {
        title: "Ongoing reassessment",
        items: [
          "Reassess high-acuity patients approximately every 3-5 minutes and low-acuity patients approximately every 5-15 minutes, or more frequently when clinically indicated.",
          "Repeat the primary assessment, vital signs, mental status, pain score, and response to each intervention.",
          "After medication administration, monitor for therapeutic effect, adverse effects, and any change in transport priority.",
          "Do not allow nonessential procedures to delay transport when the patient needs time-sensitive definitive care.",
        ],
      },
    ],
    treatmentSteps: [
      "Treat immediate life threats using the least invasive effective intervention within the provider's Tennessee scope of practice.",
      "Apply oxygen only when clinically indicated and titrate to the condition-specific target; support ventilation when oxygenation or ventilation is inadequate.",
      "Control major hemorrhage promptly and address shock, temperature exposure, pain, and patient positioning.",
      "Select the most appropriate age-specific and complaint-specific protocol and perform authorized medications and procedures within provider scope.",
      "Request ALS, specialty, rescue, law-enforcement, hazardous-materials, or air-medical resources early when their response is reasonably expected to improve care or transport time.",
      "Transport to the facility most appropriate for the patient's condition and required specialty capability, considering time, clinical stability, patient preference, and the Claiborne County destination plan.",
      "Provide early destination notification for unstable patients and all time-sensitive emergencies.",
      "Transfer care directly to an equal or higher medical authority with a concise verbal report, all available records and tracings, patient belongings, and a summary of treatment and response.",
      "Complete the electronic patient-care report for every patient contact, including refusals, no-patient-found events, and nontransport dispositions.",
    ],
    medications: [],
    warnings: [
      "Do not perform a medication administration or procedure outside the Tennessee-authorized standing orders without Medical Control authorization.",
      "Protocol sequence may be changed when required by patient condition, scene limitations, or resource availability, but the reason must be documented.",
      "A normal initial assessment or vital-sign set does not exclude serious illness; use the complete clinical picture and repeat assessment.",
      "Patient refusal is a high-risk disposition and requires a capacity assessment, explanation of risks and alternatives, appropriate signatures, and detailed documentation.",
      "Do not delay transport for documentation, nonessential IV access, repeated diagnostic testing, or procedures that can safely occur en route.",
    ],
    clinicalPearls: [
      "The most qualified provider caring for the patient is responsible for ensuring that assessment and treatment information is communicated to responding units, Medical Control, and the receiving facility.",
      "A useful radio report includes age, chief complaint, stability, complete vital signs, level of consciousness, major findings, interventions, response, and estimated arrival time.",
      "When no complaint-specific protocol fits, continue supportive care, serial reassessment, and Medical Control consultation as needed.",
      "Document clinical reasoning, especially when deviating from protocol, selecting a specialty destination, or accepting a nontransport disposition.",
      "Maintain patient dignity, privacy, professionalism, and clear communication throughout the encounter.",
    ],
    specialPopulations: [
      {
        title: "Pediatric patients",
        items: [
          "Use the Pediatric Assessment Triangle early: appearance, work of breathing, and circulation to skin.",
          "Use a length-based pediatric resuscitation system for medication doses and equipment selection when applicable, and communicate the measured color or weight to the receiving facility.",
          "Avoid separating the child from the caregiver unless required for safety or treatment.",
          "Adapt the order and technique of examination to the child's developmental stage and clinical condition.",
        ],
      },
      {
        title: "Patients declining care or transport",
        items: [
          "Encourage assessment and transport when a potentially serious illness or injury exists and involve a paramedic when available for high-risk refusals.",
          "Assess the patient's ability to communicate a stable choice, understand relevant information, appreciate the consequences, and reason about options.",
          "Obtain at least two sets of vital signs and a problem-focused examination whenever the patient permits.",
          "Explain the suspected condition, recommended care, material risks of refusal, alternatives, and specific instructions for seeking further help.",
          "Consider Medical Control consultation for high-risk refusal, questionable capacity, minors, vulnerable adults, or disagreement among involved parties.",
        ],
      },
      {
        title: "Older adults and patients with special needs",
        items: [
          "Account for atypical presentations, polypharmacy, anticoagulant use, frailty, communication barriers, cognitive impairment, implanted devices, and baseline functional status.",
          "Seek caregivers, medication lists, advance directives, and individualized emergency plans when available without delaying urgent care.",
        ],
      },
    ],
    references: [
      "Tennessee EMS ALS/BLS Blended Protocol Guidelines 2024-2025 — Introduction, Clinical Notes, Patient Refusal, Patient Assessment, and Quality Improvement Documentation Criteria",
      "North Carolina College of Emergency Physicians 2025 — Universal Patient Care Protocol",
      "Claiborne County EMS destination, documentation, and Medical Control policies",
      "Current Tennessee EMS scope of practice and authorized medication/procedure standards",
    ],
    sourcePdf: "/protocols/claiborne/up-01-universal-patient-care-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "July 2026",
    lastVerifiedDate: "July 29, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director approval is required before release for clinical use.",
      "This native protocol harmonizes Tennessee requirements with the imported North Carolina organization; Tennessee scope and current approved local policy control if any conflict exists.",
      "The original North Carolina PDF remains available as a source-comparison document.",
    ],
  },
  {
    id: "up-02",
    title: "Mass-Casualty Incident (MCI) Triage",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Use this protocol when patient numbers, incident complexity, or available resources require rapid prioritization rather than routine one-patient care.",
      "Activate the Claiborne MCI plan and incident command system early. Primary triage assigns priority rapidly; secondary triage, treatment, destination, and transport occur through the assigned incident structure.",
      "Use START for adults and JumpSTART for pediatric patients according to the agency-adopted age or appearance definition. Triage categories are dynamic and must be reassessed after movement, treatment, deterioration, or a change in resources.",
    ],
    flow: [
      {
        title: "MCI / Resource Imbalance?",
        text: "Scene safety • establish command • declare MCI level • request resources • identify hazards and ingress/egress",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Global Sort",
        text: "Patients who can walk follow commands to the MINOR (Green) area • rapidly identify patients who are not moving or have an obvious life threat",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Adult START",
        text: "Breathing • respiratory rate • perfusion • follows commands",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Pediatric JumpSTART",
        text: "Breathing • pulse if apneic • 5 rescue breaths when pulse present • respiratory rate • peripheral pulse • age-appropriate AVPU",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Immediate Lifesaving Intervention Only",
        text: "Open airway • control major hemorrhage • authorized antidote • chest decompression by Paramedic when immediately indicated",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Tag / Mark + Move",
        text: "Immediate Red • Delayed Yellow • Minor Green • Expectant/Deceased Black • record intervention and time when feasible",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Repeat Triage",
        text: "Reassess in treatment and transport areas, after intervention or movement, with deterioration, and when resource availability changes",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "Every provider uses the same triage criteria; provider level determines which immediate lifesaving interventions are authorized.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Perform START or JumpSTART primary triage as assigned, attach or clearly mark the triage category, and communicate patient location and immediate needs through the incident structure.",
              "Perform only rapid lifesaving interventions authorized at the EMT level during primary triage: open or position the airway, control life-threatening external hemorrhage including tourniquet use, provide JumpSTART rescue breaths, and administer an authorized antidote auto-injector when indicated.",
              "Move to the next patient after assigning a category and completing the permitted immediate intervention; do not delay primary sorting for a complete assessment, routine vital signs, splinting, IV access, or noncritical treatment.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Perform all EMT triage actions using the same START or JumpSTART criteria; do not change a category solely because an advanced provider is available.",
              "Do not initiate routine IV/IO access, fluids, or medications during primary triage. When assigned to a treatment or transport function, provide AEMT care within Tennessee scope, local credentialing, and the incident treatment plan.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior triage actions and, when immediately indicated and consistent with the MCI plan, perform needle chest decompression within current Tennessee Paramedic scope.",
              "When assigned a clinical incident role, coordinate secondary triage, treatment priorities, destination distribution, transport sequencing, Medical Control communication, and reassessment as resources permit.",
              "Do not allow advanced procedures, routine monitoring, vascular access, or medication administration to delay completion of primary triage unless the intervention is an immediately lifesaving action authorized by the MCI plan.",
            ],
          },
        ],
      },
    ],
    indications: [
      "A declared or suspected mass-casualty incident.",
      "Multiple patients whose immediate needs exceed, or may soon exceed, available personnel, equipment, treatment space, or transport capacity.",
      "An incident in which command requests standardized primary or secondary triage.",
    ],
    contraindications: [
      "Do not use MCI triage categories as a substitute for routine patient assessment when resources are adequate for individual care.",
    ],
    assessment: [
      {
        title: "Adult START primary triage",
        items: [
          "Able to walk: direct to the designated MINOR (Green) area for secondary triage; reassess infants, patients with mobility limitations, and anyone unable to follow the global instruction rather than assigning a category from ambulation alone.",
          "Not breathing: open or reposition the airway. If spontaneous breathing begins, classify IMMEDIATE (Red). If the adult remains apneic, classify EXPECTANT/DECEASED (Black) according to the MCI plan.",
          "Breathing with a respiratory rate greater than 30/min: classify IMMEDIATE (Red). If 30/min or less, assess perfusion.",
          "Absent radial pulse or capillary refill greater than 2 seconds: control major hemorrhage and classify IMMEDIATE (Red). Use radial pulse preferentially when cold, poor lighting, skin characteristics, or other conditions make capillary refill unreliable.",
          "Unable to follow simple commands: classify IMMEDIATE (Red). If respiratory rate, perfusion, and command-following criteria are adequate, classify DELAYED (Yellow).",
        ],
      },
      {
        title: "Pediatric JumpSTART primary triage",
        items: [
          "Able to walk: direct to the MINOR (Green) area for secondary triage. Infants and developmentally nonambulatory children are not automatically Immediate; assess them through the JumpSTART sequence.",
          "Not breathing: open or reposition the airway. If spontaneous breathing begins, classify IMMEDIATE (Red).",
          "Still apneic: check for a palpable pulse. If no pulse is present, classify EXPECTANT/DECEASED (Black) according to the MCI plan. If a pulse is present, provide 5 rescue breaths. If spontaneous breathing begins, classify IMMEDIATE (Red); if apnea persists, classify EXPECTANT/DECEASED (Black).",
          "Spontaneously breathing with a respiratory rate less than 15/min or greater than 45/min: classify IMMEDIATE (Red).",
          "No palpable peripheral pulse: classify IMMEDIATE (Red).",
          "Mental status inappropriate for age, inappropriate response to pain, posturing, or unresponsiveness: classify IMMEDIATE (Red). If respiratory rate, pulse, and age-appropriate mental status are adequate, classify DELAYED (Yellow).",
        ],
      },
      {
        title: "Scene and incident assessment",
        items: [
          "Ensure responder safety, appropriate PPE, hazard-zone control, decontamination needs, and law-enforcement or rescue support before patient entry.",
          "Estimate patient count and injury pattern, declare or request the appropriate MCI response level, establish or join incident command, and identify triage, treatment, transport, staging, ingress, and egress functions as resources permit.",
          "Multiple patients with similar unexplained symptoms should prompt immediate consideration of hazardous-material, carbon-monoxide, infectious, radiologic, or intentional exposure and movement to a safe assessment area.",
        ],
      },
    ],
    treatmentSteps: [
      "Complete rapid global sorting and primary triage using START or JumpSTART under the incident command structure.",
      "During primary triage, limit treatment to immediate lifesaving interventions that can be performed rapidly: airway opening or positioning, control of life-threatening external hemorrhage, JumpSTART rescue breaths, authorized antidote administration, and Paramedic needle chest decompression when immediately indicated and permitted by the MCI plan.",
      "Attach or clearly mark the triage category, record critical interventions when feasible, communicate immediate hazards or resource needs, and move to the next patient.",
      "Move patients to assigned treatment areas when safe and directed. Begin complaint-specific care, monitoring, vascular access, medications, splinting, and complete assessment only after primary triage or when assigned to the treatment function.",
      "Repeat triage after movement, decontamination, treatment, clinical change, arrival in the treatment or transport area, and whenever resource availability changes.",
      "Coordinate transport priority, destination distribution, and patient tracking through the Transport Unit and the current regional MCI plan; prevent uncoordinated transport from overwhelming a single facility.",
    ],
    medications: [],
    warnings: [
      "Primary MCI triage is not routine Universal Patient Care. Two complete vital-sign sets, ECG acquisition, IV/IO access, routine medications, splinting, and detailed documentation must not delay primary sorting.",
      "Triage category is based on current physiology and available resources and may change. Repeat assessment is mandatory throughout the incident.",
      "A Black category communicates MCI resource priority; it does not by itself replace Tennessee and local requirements for field determination or pronouncement of death.",
      "Do not enter a hazardous or contaminated area without appropriate PPE, hazard control, and decontamination coordination.",
      "Reverse triage may be required for lightning incidents; use the applicable environmental protocol and incident plan.",
    ],
    clinicalPearls: [
      "The goal of MCI triage is the greatest overall benefit with the resources available, not delivery of complete individual care during the first pass.",
      "Use objective criteria consistently. Do not upgrade or downgrade based only on injury appearance, age, provider intuition, or pressure from bystanders.",
      "Radial pulse may be more reliable than capillary refill in cold environments or when capillary refill is difficult to interpret.",
      "Clearly separate the triage, treatment, and transport functions. Uncoordinated care or transport can create a second resource bottleneck.",
      "Green patients require secondary triage; walking does not guarantee absence of serious injury or delayed deterioration.",
    ],
    specialPopulations: [
      {
        title: "Children",
        items: [
          "Use JumpSTART according to the adopted agency cutoff or appearance definition. The standard JumpSTART rescue-breath sequence uses 5 breaths, not 2.",
          "Infants or children who cannot walk because of normal development are not automatically Immediate; carry them through the JumpSTART breathing, pulse, respiratory-rate, and mental-status sequence.",
        ],
      },
      {
        title: "Mobility, communication, and developmental limitations",
        items: [
          "A patient who cannot walk, hear the instruction, understand the language, follow commands at baseline, or move because of a preexisting disability requires direct physiologic assessment rather than automatic category assignment.",
          "Use caregivers, interpreters, baseline information, and adaptive communication when immediately available without delaying the triage pass.",
        ],
      },
      {
        title: "Hazardous-material or infectious incidents",
        items: [
          "Perform contamination and medical triage in coordination with the HazMat branch. Do not move contaminated patients into the cold zone, treatment area, or transport unit before required decontamination unless an immediate lifesaving exception is directed by command.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — Reference: S.T.A.R.T. Triage and MCI Plan Response Levels",
      "U.S. Department of Health and Human Services, CHEMM — START Adult Triage Algorithm",
      "U.S. Department of Health and Human Services, CHEMM — JumpSTART Pediatric Triage Algorithm",
      "Tennessee Comprehensive Rules and Regulations 1200-12-01-.04 — EMS personnel scope of practice",
      "Claiborne County EMS — current MCI response plan, triage tags, incident command policy, destination distribution plan, and mutual-aid procedures",
    ],
    sourcePdf: "/protocols/claiborne/up-02-triage-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 10, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Confirm the local MCI declaration levels, notification chain, triage-tag system, treatment-area layout, patient-tracking method, destination distribution process, mutual-aid plan, and regional communications channels.",
      "UP-02 may be used as Reviewed beta content, but it must not be marked Approved until the signed Claiborne MCI response plan and related operational policies are reconciled with this protocol.",
    ],
  },
  {
    id: "up-03",
    title: "Abdominal Pain / Vomiting / Diarrhea",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Evaluate nontraumatic abdominal or genitourinary pain, nausea, vomiting, and diarrhea broadly. Prehospital symptom control must occur together with active screening for shock, hemorrhage, pregnancy-related emergencies, acute coronary syndrome, aortic disease, sepsis, metabolic disease, obstruction, perforation, and toxic exposure.",
      "Do not withhold analgesia or antiemetic treatment solely to preserve the abdominal examination. Reassess the examination, vital signs, perfusion, pain, nausea, and response after every intervention.",
      "Patients younger than 16 years use the pediatric doses and considerations in this protocol together with the appropriate pediatric medical protocol.",
    ],
    flow: [
      {
        title: "Primary Survey",
        text: "Airway • breathing • perfusion • mental status • major GI bleeding • pregnancy emergency • peritonitis",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Focused Assessment",
        text: "OPQRST/SAMPLE • abdominal and back exam • emesis/stool/urine blood • LMP/pregnancy • intake/output • surgery • medications • exposures",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Glucose + Cardiac Screen",
        text: "Check blood glucose • acquire and transmit 12-lead ECG for adult abdominal pain or unexplained nausea/vomiting",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Shock / High-Risk Features?",
        text: "Hypotension • poor perfusion • GI bleeding • rigid/guarded abdomen • pain out of proportion • suspected AAA/ACS/ectopic/sepsis",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Treat Symptoms + Cause",
        text: "AEMT: vascular access, fluid, ondansetron • Paramedic: ECG interpretation, analgesia, second-line antiemetic, cause-specific protocol",
        levels: ["AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Reassess + Transport",
        text: "Repeat vital signs, perfusion, pain, nausea, mental status, and abdominal exam • notify early for time-critical findings",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "Higher provider levels include the actions listed for the preceding levels.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Perform the primary survey; place the patient in a position of comfort unless hypotension, respiratory compromise, or another condition requires different positioning. Administer oxygen for hypoxemia, respiratory distress, or shock.",
              "Obtain and document pain score, complete initial vital signs, temperature when infection is possible, blood glucose, and a focused abdominal, back, cardiopulmonary, skin, and neurologic examination. Obtain at least two complete vital-sign sets and reassess after each intervention.",
              "Acquire and transmit a 12-lead ECG for adult abdominal pain or otherwise unexplained nausea/vomiting. Expedite transport for hypotension, poor perfusion, GI bleeding, syncope, altered mental status, rigid or guarded abdomen, pain out of proportion, pulsatile mass, pregnancy-related pain or bleeding, or suspected ACS, AAA, sepsis, obstruction, or perforation.",
              "Keep the patient NPO except for an authorized oral or ODT medication. Use enteric/contact precautions when infectious vomiting or diarrhea is suspected and protect the patient from heat loss.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Establish IV access when the patient has shock, dehydration, persistent vomiting, significant bleeding, an anticipated need for parenteral medication, or another time-critical condition. Use IO access when vascular access is urgently required and IV access cannot be obtained within the Universal Patient Care attempt limit.",
              "For adult hypotension or poor perfusion, administer normal saline 500 mL IV/IO, reassess, and repeat as needed to restore adequate perfusion or systolic blood pressure of at least 90 mmHg; maximum 2 L in this protocol. Use 250 mL increments with frequent lung and perfusion reassessment in patients with heart failure, renal failure, liver failure, known volume overload, pulmonary edema, or another high risk for fluid intolerance.",
              "For pediatric hypotension or poor perfusion, administer normal saline 20 mL/kg IV/IO and reassess after each bolus for perfusion and fluid overload; continue under the applicable pediatric shock protocol when poor perfusion persists.",
              "For nausea or vomiting, administer ondansetron: adult 4 mg IV/IO/IM/PO/ODT; pediatric 0.15 mg/kg IV/IO/IM/PO/ODT, maximum 4 mg. One repeat dose may be given after 15 minutes for persistent symptoms after reassessment.",
              "Treat hypoglycemia or hyperglycemic emergency under the age-appropriate diabetic emergency protocol. Do not delay transport for IV access or symptom-control medication.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Interpret the 12-lead ECG and immediately transition to the acute coronary syndrome protocol when ischemia or STEMI is suspected; obtain continuous cardiac monitoring for high-risk presentation, significant electrolyte loss, dysrhythmia, or parenteral QT-prolonging medication.",
              "Treat moderate or severe pain under UP-11 Pain Management. Do not withhold analgesia solely because a surgical abdomen is possible; document the examination and pain score before and after medication.",
              "If adult nausea or vomiting persists after ondansetron and no contraindication is present, administer promethazine 12.5 mg by deep IM injection once. Do not administer promethazine IV or IO in this protocol.",
              "For shock, major GI bleeding, suspected ruptured AAA or ectopic pregnancy, or another time-critical presentation, consider a second large-bore IV, provide cause-specific resuscitation, notify the receiving facility early, and minimize scene time.",
              "Provide advanced airway management when vomiting, aspiration, altered mental status, or clinical deterioration threatens airway protection or ventilation.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Nontraumatic abdominal, flank, pelvic, or genitourinary pain.",
      "Nausea, vomiting, diarrhea, dehydration, or suspected nontraumatic gastrointestinal bleeding.",
      "Unexplained symptoms in which a gastrointestinal, genitourinary, metabolic, cardiac, obstetric, infectious, or toxicologic cause is possible.",
    ],
    contraindications: [
      "Use the abdominal/pelvic trauma protocol when recent trauma is the likely cause.",
      "Do not give oral or ODT medication when the patient cannot protect the airway, has active uncontrolled vomiting that prevents administration, or has another aspiration risk.",
    ],
    assessment: [
      {
        title: "History",
        items: [
          "Onset, provocation/palliation, quality, region/radiation, severity, progression, and duration of pain or nausea; timing and character of vomiting or diarrhea.",
          "Last oral intake, urine output, bowel movement, flatus, and emesis; blood or coffee-ground material in emesis; melena, hematochezia, hematuria, dysuria, vaginal bleeding, or discharge.",
          "Prior abdominal disease or surgery, aneurysm, cardiac disease, diabetes, renal disease, pregnancy history, immunocompromise, recent antibiotics or hospitalization, sick contacts, travel, unusual foods, alcohol, cannabis, medications, anticoagulants, and possible toxic exposure.",
          "For patients who could be pregnant: last menstrual period, pregnancy possibility, gestational age if known, prior ectopic pregnancy, fertility treatment, pain, syncope, and vaginal bleeding.",
        ],
      },
      {
        title: "Examination",
        items: [
          "General appearance, mental status, skin temperature/color/moisture, hydration, pulses, perfusion, orthostatic symptoms when safe, and evidence of shock.",
          "Inspect and gently palpate the abdomen for distention, focal or diffuse tenderness, guarding, rigidity, rebound/peritoneal signs, mass, hernia, bruising, and pulsation. Assess back and flank pain, distal pulses, and cardiopulmonary findings.",
          "When available without delaying care, note the appearance and approximate amount of emesis or stool and preserve objective descriptions rather than assigning a final diagnosis.",
        ],
      },
      {
        title: "High-risk findings",
        items: [
          "Hypotension, shock index greater than 1, altered mental status, syncope, ongoing GI bleeding, anticoagulant use with bleeding, severe dehydration, or persistent tachycardia.",
          "Rigid or guarded abdomen, pain out of proportion to examination, pulsatile abdominal mass, sudden tearing abdominal/back pain, absent or unequal distal pulses, or rapidly worsening pain.",
          "Pregnancy possibility with pain, bleeding, syncope, shoulder pain, or shock; severe pelvic or testicular pain; fever with poor perfusion; or vomiting with neurologic findings.",
          "Epigastric or upper abdominal symptoms with dyspnea, diaphoresis, weakness, syncope, diabetes, known coronary disease, or ischemic ECG changes.",
        ],
      },
    ],
    treatmentSteps: [
      "Complete the Universal Patient Care assessment and immediately address airway compromise, hypoxemia, shock, major bleeding, severe hypoglycemia, or another life threat.",
      "Obtain blood glucose and the indicated 12-lead ECG early. Transition to the diabetic, acute coronary syndrome, shock, sepsis, obstetric, toxicology, or trauma protocol as soon as a time-critical syndrome is recognized.",
      "Provide vascular access, fluid resuscitation, ondansetron, and analgesia according to the provider-level actions and medication doses in this protocol.",
      "Repeat vital signs, perfusion, lung sounds after fluid, pain score, nausea/vomiting, mental status, and abdominal examination after treatment and during transport.",
      "Notify the receiving facility early and minimize scene time for suspected AAA, ectopic pregnancy, ACS, major GI bleeding, bowel ischemia, obstruction/perforation, sepsis, or persistent shock.",
    ],
    medications: [
      {
        name: "Normal Saline",
        dose: "Adult: 500 mL IV/IO bolus; reassess and repeat to adequate perfusion or SBP ≥90 mmHg, maximum 2 L. Pediatric: 20 mL/kg IV/IO; reassess after each bolus.",
        notes: ["Use 250 mL increments with frequent lung and perfusion reassessment in patients with heart failure, renal failure, liver failure, known volume overload, pulmonary edema, or another high risk for fluid intolerance."],
      },
      {
        name: "Ondansetron",
        dose: "Adult: 4 mg IV/IO/IM/PO/ODT. Pediatric: 0.15 mg/kg IV/IO/IM/PO/ODT, maximum 4 mg. May repeat once after 15 minutes.",
        notes: ["Avoid when the patient has known congenital long-QT syndrome or clinically significant QT prolongation; use caution with electrolyte loss, bradyarrhythmia, or other QT-prolonging medications."],
      },
      {
        name: "Promethazine",
        dose: "Adult: 12.5 mg deep IM once for persistent nausea/vomiting after ondansetron.",
        notes: ["Paramedic only in this protocol.", "Do not administer IV or IO.", "Avoid with significant CNS depression, inability to protect the airway, or known hypersensitivity."],
      },
      {
        name: "Analgesia",
        dose: "Use the medication and dose selected under UP-11 Pain Management.",
        notes: ["Document examination and pain score before and after medication."],
      },
    ],
    warnings: [
      "Abdominal pain may be an atypical presentation of acute coronary syndrome, particularly in older adults, patients with diabetes, and women. Acquire and transmit the ECG early.",
      "A normal blood pressure does not exclude significant hemorrhage or evolving shock. Trend mental status, pulse quality, skin, shock index, and serial vital signs.",
      "Do not give food or unrestricted oral fluids. An approved PO/ODT medication may be used when the airway is protected and administration is feasible.",
      "Promethazine can cause sedation, hypotension, respiratory depression, and severe tissue injury. Deep IM is the only authorized route in this protocol; IV and IO administration are prohibited.",
      "Use ondansetron cautiously in patients with substantial electrolyte loss, bradyarrhythmia, congenital long-QT syndrome, significant QT prolongation, or concurrent QT-prolonging medication.",
      "Do not use NSAID analgesia when GI bleeding, significant renal dysfunction, severe dehydration, anticoagulation, pregnancy, or another contraindication is present.",
    ],
    clinicalPearls: [
      "Pain severity and abdominal tenderness do not reliably predict disease severity. Mesenteric ischemia, ectopic pregnancy, AAA, and early sepsis may initially have limited examination findings.",
      "Pain treatment does not need to be delayed until a hospital examination and should not be withheld solely because a surgical diagnosis is possible.",
      "Nausea without active vomiting may still benefit from antiemetic treatment.",
      "Diarrhea with recent antibiotic exposure or hospitalization should raise concern for C. difficile; use appropriate contact precautions and communicate the risk during handoff.",
      "Recurrent vomiting may reflect obstruction, increased intracranial pressure, DKA, ACS, carbon monoxide exposure, cannabinoid hyperemesis, organophosphate exposure, or another non-GI emergency.",
    ],
    specialPopulations: [
      {
        title: "Pediatrics — younger than 16 years",
        items: [
          "Use actual measured weight when reliable or the length-based tool for medication and equipment dosing. Reassess carefully after each fluid bolus.",
          "Bilious emesis, hematemesis, persistent focal pain, distention, guarding, altered mental status, signs of dehydration, or vomiting in a young infant requires prompt transport and early notification.",
          "Do not administer promethazine to a pediatric patient under this standing protocol; contact Medical Control if exceptional use is considered.",
        ],
      },
      {
        title: "Pregnancy possibility",
        items: [
          "Treat abdominal, pelvic, or back pain with vaginal bleeding, syncope, shoulder pain, or shock as ectopic pregnancy or obstetric hemorrhage until excluded. Expedite transport and transition to the obstetric protocol.",
        ],
      },
      {
        title: "Fluid-intolerant patients",
        items: [
          "Patients with heart failure, renal failure, liver failure, known volume overload, pulmonary edema, or another high risk for fluid intolerance receive 250 mL fluid increments with frequent lung and perfusion reassessment.",
          "Older adults may have serious disease with minimal tenderness or normal initial vital signs; reassess frequently and use clinical judgment regarding fluid tolerance.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — SOP 301 Abdominal/GU Pain (non-traumatic) / Nausea and Vomiting; SOP 603 Mandatory EKG",
      "Claiborne Covenant EMS Formulary — current medical-director source workbook",
      "Claiborne County EMS UP-03 source PDF — Abdominal Pain, Vomiting and Diarrhea, revised September 1, 2025",
      "Claiborne County EMS UP-01 Universal Patient Care and UP-11 Pain Management",
    ],
    sourcePdf: "/protocols/claiborne/up-03-abd-pain-vomiting-and-diarrhea-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 10, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "UP-11 Pain Management must be finalized so the internal analgesia reference has one authoritative dose source.",
      "UP-03 may be used as Reviewed beta content; final Approved status remains pending completion of the full protocol and formulary reconciliation process.",
    ],
  },
  {
    id: "up-04",
    title: "Altered Mental Status",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Altered mental status is a symptom, not a diagnosis. Assume a time-critical medical, traumatic, toxicologic, neurologic, metabolic, environmental, or obstetric cause until reversible threats have been assessed and treated.",
      "Prioritize oxygenation and ventilation, blood glucose, temperature, trauma assessment, opioid toxicity, seizure, stroke, shock, sepsis, toxic exposure, and dysrhythmia. Treat identified causes immediately while continuing the diagnostic assessment.",
      "Do not attribute altered mental status solely to alcohol, recreational drugs, dementia, or psychiatric illness until medical and traumatic causes have been evaluated.",
    ],
    flow: [
      {
        title: "Immediate Stabilization",
        text: "Airway • suction • oxygenation • ventilation • circulation • severe hemorrhage • trauma precautions when indicated",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Rapid Reversible-Cause Check",
        text: "Glucose • temperature • pupils • medication/ingestion clues • opioid toxidrome • seizure • pregnancy possibility",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Hypoglycemia?",
        text: "Safe swallow: oral glucose • unsafe swallow: AEMT/Paramedic D10 or glucagon • recheck glucose and neurologic status",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Respiratory Depression + Suspected Opioid?",
        text: "Ventilate first • naloxone titrated to adequate ventilation • avoid abrupt full withdrawal when possible",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Stroke / Seizure / Trauma / Shock / Sepsis / Toxic Exposure?",
        text: "FAST then C-STAT if positive • document last known well • transition immediately to the cause-specific protocol",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Monitor + Transport",
        text: "Serial GCS/AVPU • repeat glucose/vital signs • cardiac monitor/ECG • EtCO₂ when ventilation is impaired • early notification",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "Higher provider levels include the actions listed for the preceding levels.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Open and suction the airway as needed; insert an OPA or NPA when indicated; provide BVM ventilation for apnea, inadequate respiratory effort, or ineffective ventilation. Administer oxygen for hypoxemia, respiratory distress, shock, or another clinical indication.",
              "Assess AVPU/GCS, orientation and behavior compared with baseline, pupils, speech, facial symmetry, extremity strength, sensation, skin, trauma, medical-alert information, medication access, and exposure clues. Obtain complete vital signs, SpO₂, blood glucose, and temperature early; obtain at least two complete vital-sign sets.",
              "Perform FAST for acute or unexplained neurologic change; if positive, complete C-STAT and document last known well, anticoagulant use, baseline function, and witness contact information. Acquire and transmit a 12-lead ECG for adult acute or unexplained altered mental status, unresponsiveness, suspected ingestion, or postictal state.",
              "If symptomatic hypoglycemia is present and the patient is awake, follows commands, can swallow, and protects the airway, administer oral glucose according to the packaged dose. Do not administer anything orally when airway protection or swallowing is impaired.",
              "When opioid toxicity is suspected with respiratory depression, support ventilation and administer naloxone 2 mg IN. Repeat every 2–3 minutes as needed to restore adequate ventilation; do not delay BVM ventilation while awaiting medication response.",
              "Protect the patient from injury during seizure or agitation. Use the least restrictive safe approach and transition to the seizure, agitation, trauma, stroke, diabetic, sepsis, shock, environmental, or toxicology protocol as soon as the syndrome is recognized.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Establish IV access when parenteral dextrose, naloxone, fluid, or another time-critical intervention is indicated. Use IO access when vascular access is urgently required and IV access cannot be obtained within the Universal Patient Care attempt limit.",
              "For glucose below 70 mg/dL with symptoms, or when symptoms cannot be assessed reliably because of altered mental status, administer D10 when oral glucose is unsafe or ineffective: adult up to 250 mL IV/IO, titrated to improving mental status and glucose at least 70 mg/dL, maximum 25 g; pediatric initial dose 2 mL/kg IV/IO (0.2 g/kg). Recheck glucose and neurologic status after 5 minutes. The pediatric dose may be repeated once for persistent hypoglycemia; contact Medical Control for additional dextrose dosing or infusion.",
              "If vascular access cannot be obtained promptly, administer glucagon IM: adult 1 mg; pediatric 0.5 mg when less than 20 kg or 1 mg when 20 kg or greater. Position for aspiration protection and continue airway monitoring because vomiting may occur.",
              "For suspected opioid toxicity, administer adult naloxone 0.4–2 mg IV/IO/IM or 2 mg IN; repeat every 2–3 minutes and titrate to adequate ventilation rather than complete arousal, maximum cumulative dose 8 mg. For pediatric patients, begin with 0.01 mg/kg IV/IO/IM/IN; if ventilation remains inadequate, escalate to 0.1 mg/kg, maximum 2 mg per dose, and repeat every 2–3 minutes as needed, maximum cumulative dose 8 mg. If ventilation remains inadequate after 8 mg, continue airway/ventilatory support and reassess the diagnosis.",
              "For hypotension, administer normal saline: adult 500 mL IV/IO; pediatric 10 mL/kg IV/IO. Reassess blood pressure, perfusion, and lung sounds after each bolus and transition to the cause-specific shock, sepsis, diabetic, cardiac, or trauma protocol before additional fluid. Do not administer a fluid bolus for altered mental status without hypotension.",
              "Insert a supraglottic airway when BVM ventilation is inadequate or prolonged airway support is required and the patient meets airway-protocol indications. Use continuous waveform capnography when available after advanced airway placement or when ventilation is impaired.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Interpret the ECG, institute continuous cardiac monitoring, and treat a dysrhythmia, ischemia, hyperkalemia pattern, or other identified cardiac cause under the applicable cardiac protocol.",
              "Use waveform capnography for impaired ventilation, suspected opioid or sedative toxicity, advanced airway management, or chemical sedation. Perform endotracheal intubation when the patient cannot protect the airway or cannot be adequately oxygenated or ventilated with less invasive measures.",
              "Complete a focused differential for neurologic, metabolic, infectious, toxicologic, environmental, traumatic, obstetric, and behavioral causes; direct treatment and destination according to the time-critical syndrome identified.",
              "If agitation creates an immediate danger and verbal de-escalation and physical safety measures are insufficient, use midazolam or ketamine under the agitation protocol. Continuous airway, SpO₂, EtCO₂, ECG, and blood-pressure monitoring are required after chemical sedation.",
              "Provide early destination notification for persistent coma, airway compromise, suspected stroke, status epilepticus, sepsis/shock, severe toxic exposure, or unexplained deterioration. Minimize scene time when definitive treatment is time sensitive.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Any acute or unexplained change in awareness, responsiveness, cognition, speech, behavior, orientation, or baseline neurologic function.",
      "Unconsciousness, unresponsiveness, delirium, confusion, lethargy, postictal state, unexplained agitation, or suspected metabolic/toxic encephalopathy.",
    ],
    contraindications: [
      "Do not administer oral glucose, food, fluid, or oral medication when the patient cannot swallow reliably or protect the airway.",
      "Do not use naloxone solely for altered mental status without respiratory depression or a reasonable suspicion of opioid effect.",
    ],
    assessment: [
      {
        title: "Immediate assessment",
        items: [
          "Airway patency and protective reflexes; respiratory rate, depth, effort, SpO₂, and EtCO₂ when ventilation is impaired; pulse, perfusion, blood pressure, and major hemorrhage.",
          "AVPU/GCS and serial neurologic examination including pupils, gaze, facial symmetry, speech, arm drift, grip, extremity movement/sensation, seizure findings, and meningeal or infectious clues.",
          "Blood glucose and temperature in every patient with acute or unexplained altered mental status.",
          "Full head-to-toe examination when the patient cannot provide a reliable history, including occult trauma, infection, pressure injury, maltreatment, abuse, or neglect.",
        ],
      },
      {
        title: "History and scene information",
        items: [
          "Last known well and onset/progression; baseline cognition and function; seizure, stroke, diabetes, renal/hepatic disease, infection, pregnancy, psychiatric history, trauma, and recent illness.",
          "Prescription and nonprescription medications, insulin or oral diabetic agents, anticoagulants, opioids/sedatives, medication changes, alcohol/recreational substances, possible intentional ingestion, and access to toxins.",
          "Witness description, recent fall or injury, oral intake, vomiting/diarrhea, fever, environmental temperature, carbon-monoxide risk, occupational or hazardous-material exposure, and whether others have similar symptoms.",
        ],
      },
      {
        title: "Cause-directed screening",
        items: [
          "Hypoxia/hypercapnia; hypo- or hyperglycemia; opioid/sedative toxicity; seizure/postictal state; stroke or intracranial hemorrhage; head trauma; shock; sepsis/meningitis; hypo- or hyperthermia; dysrhythmia/ACS; electrolyte or renal/hepatic failure; pregnancy-related emergency; and toxic exposure.",
          "Do not stop after finding alcohol, drugs, dementia, or psychiatric illness. These conditions may coexist with hypoglycemia, trauma, infection, stroke, overdose, or another life threat.",
        ],
      },
    ],
    treatmentSteps: [
      "Stabilize airway, oxygenation, ventilation, and circulation; treat severe hemorrhage and apply trauma precautions when indicated.",
      "Obtain glucose and temperature early. Treat symptomatic hypoglycemia immediately and repeat glucose and neurologic assessment after treatment.",
      "Ventilate suspected opioid toxicity and administer naloxone only when respiratory depression is present; titrate to adequate ventilation.",
      "Perform FAST and C-STAT when indicated, acquire/transmit the appropriate ECG, and identify seizure, shock, sepsis, toxic exposure, environmental illness, or trauma.",
      "Transition to the identified cause-specific protocol without delaying transport. Continue serial GCS/AVPU, vital signs, glucose, ventilation, and response-to-treatment assessment.",
    ],
    medications: [
      {
        name: "Oral Glucose",
        dose: "One packaged adult or weight-appropriate product dose PO; repeat based on glucose and clinical response.",
        notes: ["EMT/AEMT/Paramedic.", "Give only when the patient can follow commands, swallow reliably, and protect the airway."],
      },
      {
        name: "Dextrose 10% (D10)",
        dose: "Adult: up to 250 mL IV/IO, titrated to improving mental status and glucose ≥70 mg/dL; maximum 25 g. Pediatric: initial dose 2 mL/kg IV/IO (0.2 g/kg); recheck after 5 minutes and repeat once for persistent hypoglycemia. Contact Medical Control for additional pediatric dextrose dosing or infusion.",
        notes: ["AEMT/Paramedic.", "Recheck glucose and neurologic status 5 minutes after administration."],
      },
      {
        name: "Glucagon",
        dose: "Adult: 1 mg IM. Pediatric: <20 kg, 0.5 mg IM; ≥20 kg, 1 mg IM.",
        notes: ["AEMT/Paramedic when oral glucose is unsafe and vascular access cannot be obtained promptly.", "Protect against aspiration; vomiting may occur."],
      },
      {
        name: "Naloxone",
        dose: "Adult: 0.4–2 mg IV/IO/IM or 2 mg IN; EMT route is 2 mg IN. Pediatric: begin with 0.01 mg/kg IV/IO/IM/IN; if ventilation remains inadequate, escalate to 0.1 mg/kg, maximum 2 mg per dose. Repeat every 2–3 minutes to adequate ventilation; maximum cumulative dose 8 mg.",
        notes: ["Ventilation is the treatment priority.", "If ventilation remains inadequate after 8 mg, continue airway support and reassess the diagnosis."],
      },
      {
        name: "Normal Saline",
        dose: "For hypotension: adult 500 mL IV/IO; pediatric 10 mL/kg IV/IO, then reassess and use the cause-specific protocol.",
        notes: ["Use 250 mL adult increments when heart failure, renal failure, liver failure, pulmonary edema, known volume overload, or another high risk for fluid intolerance is present."],
      },
    ],
    warnings: [
      "Ventilation takes priority over naloxone. The goal is adequate ventilation, not complete arousal; abrupt reversal may cause vomiting, aspiration, severe agitation, withdrawal, or sympathetic surge.",
      "A normal glucose, temperature, ECG, or initial neurologic examination does not exclude a serious cause. Continue reassessment and transport unexplained or persistent altered mental status.",
      "Do not assume intoxication, dementia, psychiatric illness, or postictal state is the sole diagnosis until trauma and medical causes have been assessed.",
      "Physical or chemical restraint may worsen occult hypoxia, hypercapnia, acidosis, hyperthermia, or shock. Use the agitation/restraint protocol and continuous monitoring when restraint is necessary.",
      "Glucagon may be ineffective in malnutrition, chronic alcohol use, severe liver disease, or depleted glycogen states.",
    ],
    clinicalPearls: [
      "Collateral history, medication containers, medical-alert identification, witness contact information, and the exact scene circumstances may be diagnostically critical and should accompany the handoff.",
      "Persistent focal neurologic deficit after glucose correction is stroke until proven otherwise.",
      "Pinpoint pupils alone do not establish opioid toxicity; respiratory depression and response to ventilation/naloxone are more important.",
      "Multiple patients with headache, nausea, confusion, or syncope should prompt immediate consideration of carbon monoxide or another environmental exposure.",
      "Patients who regain consciousness after treatment still require evaluation for recurrence, long-acting agents, co-ingestion, trauma, or an alternative diagnosis.",
    ],
    specialPopulations: [
      {
        title: "Pediatrics — younger than 16 years",
        items: [
          "Use measured weight when reliable or the length-based tool for dosing. Consider ingestion, infection, seizure, trauma, hypoglycemia, metabolic disease, intussusception, and nonaccidental trauma.",
          "Caregiver observations of baseline behavior and the timing of change are important, but do not delay assessment of airway, glucose, temperature, perfusion, and trauma.",
        ],
      },
      {
        title: "Pregnancy",
        items: [
          "Consider eclampsia, hemorrhage/ectopic pregnancy, medication toxicity, hypoglycemia, stroke, and other pregnancy-related causes. Use left uterine displacement when later pregnancy and hypotension are present.",
        ],
      },
      {
        title: "Dementia, developmental disability, or communication limitation",
        items: [
          "Establish baseline status through caregivers or records when immediately available. An acute deviation from baseline requires the same reversible-cause assessment as any other patient.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — SOP 318 Unconscious / Unresponsive / Altered Mental Status and SOP 603 Mandatory EKG",
      "Claiborne Covenant EMS Formulary — current medical-director source workbook",
      "Claiborne County EMS UP-04 source PDF — Altered Mental Status, revised September 1, 2025",
      "Claiborne County EMS UP-01 Universal Patient Care, age-appropriate diabetic emergency, stroke, seizure, shock, sepsis, toxicology, agitation, and airway protocols",
    ],
    sourcePdf: "/protocols/claiborne/up-04-altered-mental-status-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 10, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director approved glucose treatment below 70 mg/dL with symptoms or when symptoms cannot be assessed reliably because of altered mental status; adult D10 up to 250 mL/25 g and pediatric D10 2 mL/kg initial dose with one repeat after 5 minutes for persistent hypoglycemia.",
      "Medical-director approved glucagon: adult 1 mg IM; pediatric 0.5 mg IM below 20 kg or 1 mg IM at 20 kg or greater when oral glucose is unsafe and vascular access is unavailable.",
      "Medical-director approved naloxone: adult 0.4–2 mg IV/IO/IM or 2 mg IN; pediatric begins at 0.01 mg/kg and escalates to 0.1 mg/kg when ventilation remains inadequate; repeat every 2–3 minutes to adequate ventilation, maximum cumulative dose 8 mg.",
      "Medical-director approved 12-lead ECG for adult acute/unexplained altered mental status and FAST followed by C-STAT when positive.",
      "Medical-director approved fluid only for hypotension: adult 500 mL and pediatric 10 mL/kg initial bolus with the UP-03 fluid-intolerance caveat.",
      "UP-04 may be used as Reviewed beta content; final Approved status remains pending completion of the full protocol and formulary reconciliation process.",
    ],
  },
  {
    id: "up-05",
    title: "Back Pain",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Assess patients with back pain for trauma and new neurologic dysfunction, provide appropriate analgesia, and reassess the response to treatment.",
      "Saddle anesthesia is assessed by history. A routine perineal examination is not required in the prehospital setting.",
    ],
    flow: [
      {
        title: "Initial Assessment",
        text: "Primary survey • vital signs • pain score • relevant history • traumatic or atraumatic onset",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Focused Neurologic Assessment",
        text: "Bilateral leg strength and sensation • distal pulses • gait when safe • ask about saddle anesthesia and bowel/bladder dysfunction",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "New Neurologic Deficit?",
        text: "Weakness, sensory loss, saddle anesthesia by history, urinary retention/incontinence, or bowel dysfunction",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Time-Critical Finding",
        text: "Prompt transport • early receiving-facility notification • repeat neurologic examination",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Treat Pain",
        text: "Position of comfort • spinal protection only when indicated • analgesia per UP-11 • cardiac monitoring when medication is administered",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Reassess + Transport",
        text: "Pain score • vital signs • neurologic findings • medication response",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "Higher provider levels include the actions listed for the preceding levels.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Obtain the history, pain score, complete vital signs, and a focused examination. Determine whether the pain followed trauma.",
              "Assess bilateral lower-extremity strength and sensation, distal pulses, and the ability to stand or walk when safe. Ask about new saddle anesthesia, urinary retention or incontinence, and bowel dysfunction. Do not perform a routine perineal examination.",
              "For traumatic back pain, apply spinal protection when indicated. For uncomplicated atraumatic pain, place the patient in a position of comfort and avoid unnecessary immobilization.",
              "Provide nonpharmacologic care and administer oral analgesia according to UP-11 Pain Control. Apply cardiac monitoring when analgesic medication is administered.",
              "Transport promptly and notify the receiving facility early for a new or progressive neurologic deficit, saddle anesthesia, or new bowel or bladder dysfunction.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Establish IV access only when needed for parenteral analgesia, hemodynamic instability, or another specific clinical indication. Do not start an IV or administer fluid routinely for isolated back pain.",
              "Administer analgesia authorized in UP-11, maintain cardiac monitoring after medication administration, and reassess pain, vital signs, neurologic findings, and medication response.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Interpret the cardiac rhythm and administer parenteral analgesia according to UP-11 when indicated. Continue the medication-specific airway, respiratory, hemodynamic, and cardiac monitoring required by that protocol.",
              "Acquire a 12-lead ECG or transition to the appropriate cardiac, abdominal, vascular, trauma, or obstetric protocol only when the history, examination, or clinical condition provides a separate indication.",
            ],
          },
        ],
      },
    ],
    indications: ["Acute or chronic back pain without a more specific immediately apparent treatment pathway."],
    contraindications: [],
    assessment: [
      {
        title: "Focused assessment",
        items: [
          "Pain onset, location, radiation, severity, provoking or relieving factors, trauma, prior episodes, and relevant medications or anticoagulants.",
          "Bilateral lower-extremity strength and sensation, distal pulses, and gait when safe.",
          "Ask about new saddle anesthesia, urinary retention or incontinence, and bowel dysfunction. Saddle anesthesia is a historical symptom; routine prehospital examination of the perineum is not required.",
        ],
      },
    ],
    treatmentSteps: [
      "Complete the focused neurologic assessment and identify any traumatic mechanism.",
      "Use spinal protection only when indicated; otherwise position the patient for comfort.",
      "Administer analgesia according to UP-11 and apply cardiac monitoring when medication is administered.",
      "Reassess the pain score, vital signs, neurologic examination, and treatment response.",
      "Transport promptly with early notification for any new or progressive neurologic deficit, saddle anesthesia, or bowel/bladder dysfunction.",
    ],
    medications: [
      {
        name: "Analgesia",
        dose: "Use the medication, dose, route, contraindications, and repeat-dose limits specified in UP-11 Pain Control.",
        notes: ["Apply cardiac monitoring when analgesic medication is administered.", "Reassess pain, vital signs, neurologic findings, and medication response."],
      },
    ],
    warnings: [
      "Do not perform a routine perineal examination solely to assess saddle anesthesia; obtain this finding by history.",
      "Do not routinely immobilize atraumatic back pain or delay transport for nonessential procedures.",
      "Do not routinely establish IV access or administer fluid for isolated back pain. Apply cardiac monitoring when analgesic medication is administered; obtain a 12-lead ECG only for a separate clinical indication.",
    ],
    clinicalPearls: [
      "New weakness, sensory loss, saddle anesthesia, urinary retention/incontinence, or bowel dysfunction requires prompt transport and early notification.",
      "A normal initial neurologic examination does not replace reassessment after analgesia or when symptoms change.",
    ],
    specialPopulations: [
      {
        title: "Pediatrics — younger than 16 years",
        items: ["Use weight-based pediatric analgesic dosing from the applicable pain protocol and reassess after treatment."],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — SOP 300 Medical Complaint Not Specified, SOP 608 Spinal Protection, and Pain Management reference",
      "Claiborne County EMS UP-05 source PDF — Back Pain",
      "Claiborne County EMS UP-11 Pain Control",
    ],
    sourcePdf: "/protocols/claiborne/up-05-back-pain-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 10, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director approved a concise pathway centered on focused lower-extremity neurologic assessment, analgesia, reassessment, and transport.",
      "Medical-director directed that saddle anesthesia be assessed by history without a routine prehospital perineal examination.",
      "Medical-director approved cardiac monitoring when analgesic medication is administered. IV access is used only when required for the medication route or another clinical indication; a 12-lead ECG requires a separate clinical indication.",
      "UP-05 may be used as Reviewed beta content; final Approved status remains pending completion of the full protocol and formulary reconciliation process.",
    ],
  },
  {
    id: "up-06",
    title: "IV / IO Access",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Establish vascular access only when needed for medication, fluid, blood sampling, or anticipated time-critical treatment. Use the least invasive route that meets the patient’s immediate clinical need.",
      "Do not delay transport or a time-critical medication solely to obtain peripheral IV access. In cardiac arrest, profound shock, or another immediately life-threatening condition, IO access may be established without preceding IV attempts.",
    ],
    flow: [
      {
        title: "Is Vascular Access Needed?",
        text: "Medication • fluid • time-critical treatment • anticipated deterioration",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Immediate IO Indication?",
        text: "Cardiac arrest • profound shock • critical treatment cannot wait",
        levels: ["AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Peripheral IV / Saline Lock",
        text: "Best conventional site • maximum 3 total attempts across the crew • do not delay transport",
        levels: ["AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Critical Access Still Needed?",
        text: "After unsuccessful peripheral attempts, proceed to IO",
        levels: ["AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Preferred IO Site",
        text: "Proximal tibia • adult humeral head only when tibial access is contraindicated",
        levels: ["AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Confirm + Secure + Reassess",
        text: "Patency • flush • secure • inspect for infiltration • document site and every attempt",
        levels: ["AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "Higher provider levels include the actions listed for the preceding levels.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Identify whether the patient may require medication, fluid, blood sampling, or another time-critical treatment and notify the AEMT or Paramedic.",
              "Prepare and assist with vascular-access equipment, position the extremity, maintain aseptic technique, monitor the patient, and document assistance as appropriate. EMT personnel do not insert IV or IO catheters under this protocol.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Establish a peripheral IV or saline lock when clinically indicated. Select a conventional peripheral site appropriate for the treatment and avoid an injured extremity, an extremity with a dialysis fistula or graft, or a site with infection or impaired circulation.",
              "Limit peripheral IV attempts to three total attempts across the entire crew. Do not allow repeated attempts by successive providers to restart the count. If vascular access is critical after unsuccessful attempts, proceed to IO access.",
              "In cardiac arrest, profound shock, or another immediately life-threatening condition in which peripheral attempts would delay critical treatment, proceed directly to IO access without a required preceding IV attempt.",
              "Use the proximal tibia as the preferred IO site. In adults, the humeral head may be used as an alternative when tibial access is contraindicated and appropriate landmarks can be identified. Use proximal tibial access for pediatric patients younger than 16 years.",
              "For a conscious patient, administer 2% lidocaine slowly through the IO before the initial forceful flush: adult 20–40 mg; pediatric 0.5 mg/kg, maximum 40 mg. Flush and operate the device according to manufacturer instructions, using pressure-assisted infusion when needed.",
              "Confirm catheter stability and flow, secure the catheter, and inspect repeatedly for swelling, leakage, displacement, increasing pain, resistance, or impaired distal perfusion. Stop using the site immediately if infiltration or another complication is suspected.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform the AEMT vascular-access actions and select access according to the medication, resuscitation, anticipated flow requirement, patient anatomy, and transport priority.",
              "When conventional peripheral access is unsuccessful or unavailable and IV access remains clinically necessary, establish an external-jugular IV. Do not use the external jugular as a routine first site and do not place a saline lock in an external-jugular vein.",
              "Do not access a PICC, central venous catheter, implanted port, or dialysis catheter under UP-06. Existing central-device use during interfacility transport is governed by the separate interfacility-transfer policy.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Medication, fluid, or blood sampling required by the applicable treatment protocol.",
      "Critical illness, cardiac arrest, profound shock, or anticipated deterioration for which vascular access is needed.",
    ],
    contraindications: [
      "Do not place an IO through infection at the insertion site, into a fractured target bone, through a site with a prosthetic joint or prior orthopedic procedure involving the target bone, or into a bone used for IO access within the preceding 24 hours.",
      "Do not place an IO when landmarks cannot be identified or the device needle is not appropriate for the patient’s tissue depth.",
      "Do not place a peripheral IV in an injured extremity, an extremity with a dialysis fistula or graft, or a site with infection or severely impaired circulation when another site is available.",
    ],
    assessment: [
      {
        title: "Access decision",
        items: [
          "Determine the treatment that requires access, the urgency of that treatment, expected flow needs, transport priority, and whether a nonvascular route can provide the required medication without delay.",
          "Before IO placement, inspect the proposed bone and overlying tissue for fracture, infection, orthopedic hardware or prosthesis, recent IO use, excessive tissue depth, and identifiable landmarks.",
        ],
      },
    ],
    treatmentSteps: [
      "Use a peripheral IV or saline lock when access is needed and the patient’s condition permits the attempt.",
      "Limit peripheral IV attempts to three total attempts across the entire crew; proceed to IO when access remains critical.",
      "Proceed directly to IO in cardiac arrest, profound shock, or another immediately life-threatening condition when IV attempts would delay treatment.",
      "Use the proximal tibia as the preferred IO site. Use the adult humeral head only when tibial access is contraindicated; use the proximal tibia for pediatric patients.",
      "For a conscious IO patient, administer 2% lidocaine before flushing, then flush, secure, and monitor the site continuously.",
      "Document the indication, provider, site, catheter or needle size, number and location of every attempt, medications administered, patency, complications, and response.",
    ],
    medications: [
      {
        name: "Lidocaine 2% — conscious IO infusion pain",
        dose: "Adult: 20–40 mg IO administered slowly before the initial forceful flush. Pediatric: 0.5 mg/kg IO administered slowly before the initial forceful flush; maximum 40 mg.",
        notes: [
          "This dose is for IO infusion pain, not dysrhythmia treatment.",
          "Confirm the IO is appropriately positioned and secure before medication administration.",
        ],
      },
    ],
    warnings: [
      "Three peripheral attempts is the maximum across the entire crew, not a requirement to perform three attempts before IO access.",
      "Do not delay transport, resuscitation, or a time-critical medication for repeated vascular-access attempts.",
      "IO infusion is painful in conscious patients. Administer lidocaine before the initial forceful flush unless an immediate life threat prevents delay.",
      "Stop using an IV or IO immediately for swelling, leakage, displacement, increasing pain, resistance, loss of flow, or suspected infiltration or compartment syndrome.",
      "Central venous devices and dialysis catheters are outside UP-06 and may be used only under the separate interfacility-transfer policy.",
    ],
    clinicalPearls: [
      "A functioning IO provides access for resuscitation medications and fluids when peripheral access is not rapidly available, but pressure-assisted infusion is commonly required.",
      "Aspiration of marrow or blood may support placement but is not required when the catheter is stable, flushes appropriately, and there is no evidence of infiltration.",
      "For trauma patients, establish access during transport whenever feasible rather than extending scene time solely for an IV.",
    ],
    specialPopulations: [
      {
        title: "Pediatrics — younger than 16 years",
        items: [
          "Use the proximal tibia for IO access and select needle length according to patient size and manufacturer guidance.",
          "For a conscious child, administer lidocaine 0.5 mg/kg IO slowly before the initial forceful flush; maximum 40 mg.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — Vascular Access, Intraosseous Access, and Indwelling IV Port Access procedures",
      "Claiborne County EMS UP-06 source PDF — IV or IO Access, revised April 6, 2026",
      "Claiborne County EMS UP-01 Universal Patient Care and separate interfacility-transfer policy",
    ],
    sourcePdf: "/protocols/claiborne/up-06-iv-or-io-access-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 10, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director approved a maximum of three total peripheral IV attempts across the entire crew and direct IO access when IV attempts would delay treatment of cardiac arrest, profound shock, or another immediately life-threatening condition.",
      "Medical-director approved proximal tibia as the preferred IO site; adult humeral-head access is an alternative only when tibial access is contraindicated. Pediatric IO access uses the proximal tibia.",
      "Medical-director approved 2% lidocaine for conscious IO patients: adult 20–40 mg; pediatric 0.5 mg/kg, maximum 40 mg, administered slowly before the initial forceful flush.",
      "Medical-director directed that PICC lines, central venous catheters, implanted ports, and dialysis catheters be governed by a separate interfacility-transfer policy rather than UP-06.",
      "Medical-director approved external-jugular IV access by Paramedics only after conventional access is unsuccessful or unavailable; the EJ is not a routine first site and must not be used as a saline lock.",
      "UP-06 may be used as Reviewed beta content; final Approved status remains pending completion of the full protocol and formulary reconciliation process.",
    ],
  },
  {
    id: "up-07",
    title: "Dental Problems",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Most dental complaints require focused assessment, bleeding control, analgesia, and dental follow-up. Airway-threatening swelling, uncontrolled hemorrhage, significant facial trauma, and anginal-equivalent jaw pain require immediate transition to the appropriate emergency pathway.",
      "An eligible avulsed permanent tooth should be replanted promptly when it can be done safely. Never replant a primary tooth.",
    ],
    flow: [
      {
        title: "Assess Airway + Cause",
        text: "Dental pain • jaw pain • trauma • bleeding • swelling • secretions • voice change",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Airway-Risk Infection?",
        text: "Floor-of-mouth or submandibular swelling • tongue elevation • drooling • stridor • trismus • rapid progression",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Adult Jaw Pain / Anginal Equivalent?",
        text: "Acquire 12-lead ECG • cardiac monitor • transition to adult cardiac protocol",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Dental Hemorrhage?",
        text: "Direct pressure • persistent socket bleeding: AEMT/Paramedic topical TXA",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Permanent Tooth Avulsed?",
        text: "Replant promptly when eligible • otherwise preserve in proper medium • never replant a primary tooth",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Analgesia + Reassess",
        text: "UP-11 Pain Control • cardiac monitoring with medication • repeat airway, bleeding, pain, and vital signs",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "Higher provider levels include the actions listed for the preceding levels.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Assess airway patency, ability to handle secretions, voice, oral and facial swelling, trismus, bleeding, trauma, pain, fever, and complete vital signs. Suction blood or secretions as needed and position the patient to protect the airway.",
              "For floor-of-mouth or submandibular swelling, tongue elevation, drooling, inability to handle secretions, stridor, trismus, toxic appearance, or rapidly progressive swelling, request Paramedic support, prepare airway equipment, minimize oral manipulation, and begin prompt transport.",
              "For adult jaw pain or another anginal-equivalent complaint, acquire and transmit a 12-lead ECG, apply cardiac monitoring, and transition to the applicable adult cardiac protocol. Do not obtain an ECG routinely for isolated tooth pain with a clear dental source.",
              "Control dental bleeding with suction as needed and firm direct pressure using folded gauze placed over the socket. Have the alert patient close the teeth over the gauze while maintaining airway safety. EMT personnel do not administer topical TXA under this protocol.",
              "For an avulsed permanent tooth, handle only the crown. If contaminated, gently rinse with milk or normal saline without rubbing or scrubbing the root. When the patient is conscious, cooperative, protects the airway, the tooth is intact, and significant jaw or socket fracture is not suspected, gently return the tooth to its socket without force and have the patient hold it in position by biting on gauze.",
              "Never replant a primary tooth. If replantation is unsuccessful or contraindicated, place the tooth in commercial tooth-preservation solution, milk, normal saline, or the patient’s saliva in a closed container. Do not store the tooth in the patient’s mouth, on ice, or dry.",
              "Provide nonpharmacologic care and oral analgesia according to UP-11. Apply cardiac monitoring when analgesic medication is administered and reassess pain, airway, bleeding, vital signs, and treatment response.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "For persistent tooth-socket bleeding despite firm direct pressure, saturate gauze or cotton with TXA 1 g/10 mL, pack it into the socket, and maintain direct pressure with the patient closing the teeth for 20 minutes. Continue suction and airway protection as needed. Do not administer IV/IO TXA solely for dental bleeding.",
              "Establish IV access only when required for parenteral analgesia, hemodynamic instability, airway management, or another specific clinical indication. Do not routinely establish IV access or administer fluid for an isolated dental complaint.",
              "Administer analgesia authorized in UP-11, maintain cardiac monitoring after medication administration, and reassess pain, bleeding, airway, vital signs, and medication response.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Interpret the 12-lead ECG and cardiac rhythm for adult jaw pain or another anginal-equivalent complaint, and treat identified ischemia or dysrhythmia under the applicable adult cardiac protocol.",
              "For progressive oral, submandibular, or floor-of-mouth swelling with airway compromise, maintain spontaneous ventilation whenever possible, prepare suction and a difficult-airway plan, and transition to the adult or pediatric airway protocol without delaying transport.",
              "Administer topical TXA and parenteral analgesia as indicated, with the medication-specific airway, respiratory, hemodynamic, and cardiac monitoring required by UP-11.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Dental or jaw pain, oral or tooth-socket bleeding, dental infection or swelling, fractured tooth, or avulsed tooth.",
    ],
    contraindications: [
      "Do not replant a primary tooth.",
      "Do not attempt field replantation when the patient cannot protect the airway, is uncooperative, has significant associated facial or jaw trauma, has a suspected socket fracture, or the tooth cannot be inserted gently without force.",
      "Do not administer topical TXA to a patient with a known hypersensitivity to tranexamic acid.",
    ],
    assessment: [
      {
        title: "Focused dental and airway assessment",
        items: [
          "Onset and source of pain; tooth versus jaw location; trauma; bleeding; fever; swelling progression; difficulty swallowing; drooling; voice change; trismus; dyspnea; chest, arm, back, or epigastric discomfort; diaphoresis; nausea; and syncope.",
          "Inspect the face, jaw, mouth, floor of mouth, tongue position, visible tooth or socket, bleeding source, and ability to handle secretions without aggressive probing or manipulation.",
          "For tooth avulsion, determine whether the tooth is permanent, time out of the socket, dry time, storage medium, root integrity, contamination, and associated facial or neurologic injury.",
        ],
      },
    ],
    treatmentSteps: [
      "Stabilize the airway, suction blood or secretions, control hemorrhage, and identify rapidly progressive infection or associated facial trauma.",
      "For adult jaw pain or another anginal-equivalent complaint, acquire/transmit a 12-lead ECG, apply cardiac monitoring, and use the appropriate cardiac protocol.",
      "Control socket bleeding with folded gauze and direct pressure. If bleeding persists, an AEMT or Paramedic may apply topical TXA 1 g/10 mL on gauze and maintain pressure for 20 minutes.",
      "Replant an eligible avulsed permanent tooth promptly and gently. Never replant a primary tooth. Preserve a tooth that cannot be replanted in commercial solution, milk, normal saline, or saliva in a closed container.",
      "Provide analgesia according to UP-11, apply cardiac monitoring when medication is administered, and reassess airway, bleeding, pain, vital signs, and treatment response.",
    ],
    medications: [
      {
        name: "Tranexamic Acid — topical dental hemorrhage",
        dose: "AEMT/Paramedic: TXA 1 g/10 mL applied topically to saturate gauze or cotton; pack the bleeding socket and maintain direct pressure for 20 minutes.",
        notes: [
          "Use only after bleeding persists despite firm direct pressure.",
          "EMT administration is not authorized under UP-07.",
          "Do not administer IV/IO TXA solely for dental bleeding.",
        ],
      },
      {
        name: "Analgesia",
        dose: "Use the medication, dose, route, contraindications, and repeat-dose limits specified in UP-11 Pain Control.",
        notes: ["Apply cardiac monitoring when analgesic medication is administered.", "Reassess pain, airway, bleeding, vital signs, and medication response."],
      },
    ],
    warnings: [
      "Oral or facial swelling may progress rapidly. Drooling, inability to handle secretions, tongue elevation, stridor, trismus, voice change, or rapidly progressive submandibular swelling requires prompt airway preparation and transport.",
      "Do not probe or attempt to drain a dental abscess in the field.",
      "Do not confuse anginal-equivalent jaw pain with an isolated dental complaint. Obtain an ECG for adult jaw pain or another anginal-equivalent complaint.",
      "Do not touch, rub, or scrub an avulsed tooth root. Never replant a primary tooth or force a permanent tooth into the socket.",
      "An avulsed or loose tooth and blood in the mouth may obstruct the airway, particularly when mental status is impaired.",
    ],
    clinicalPearls: [
      "Immediate replantation offers the best chance of retaining an avulsed permanent tooth when the procedure is safe and the tooth can be inserted gently.",
      "If replantation cannot be performed, preventing the root from drying is time critical. Commercial preservation solution or milk is preferred when immediately available.",
      "Document the tooth type when known, time of avulsion, estimated dry time, storage medium, replantation attempt and result, bleeding treatment, associated injuries, and destination notification.",
    ],
    specialPopulations: [
      {
        title: "Pediatrics — younger than 16 years",
        items: [
          "Carefully distinguish a permanent tooth from a primary tooth. Never replant a primary tooth because of potential injury to the developing permanent tooth.",
          "Use pediatric analgesic dosing from UP-11. Maintain close airway observation when facial swelling, bleeding, or loose teeth are present.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — SOP 403 Avulsed Teeth",
      "American Academy of Pediatric Dentistry, Acute Management of an Avulsed Permanent Tooth, Reference Manual 2025-2026",
      "International Association of Dental Traumatology Guidelines for Avulsion of Permanent Teeth, endorsed by AAPD",
      "Claiborne Covenant EMS Formulary — current medical-director source workbook",
      "Claiborne County EMS UP-07 source PDF — Dental Problems, revised September 1, 2025",
      "Claiborne County EMS UP-11 Pain Control and applicable adult cardiac and airway protocols",
    ],
    sourcePdf: "/protocols/claiborne/up-07-dental-problems-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 10, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director approved field replantation of an eligible avulsed permanent tooth by EMTs, AEMTs, and Paramedics when the patient is conscious, cooperative, protects the airway, the intact tooth can be identified as permanent, significant jaw/socket fracture is not suspected, and the tooth can be inserted gently without force.",
      "Medical-director directed that a tooth not replanted be handled by the crown and transported in commercial preservation solution, milk, normal saline, or the patient’s saliva in a closed container; the root must not be scrubbed and the tooth must not be stored on ice, in the mouth, or dry.",
      "Medical-director approved topical TXA for persistent socket bleeding after direct pressure: AEMT/Paramedic only, TXA 1 g/10 mL applied to gauze or cotton, packed into the socket with pressure for 20 minutes. EMT administration is not authorized.",
      "Medical-director approved 12-lead ECG acquisition for adult jaw pain or another anginal-equivalent complaint, but not for isolated tooth pain with a clear dental source.",
      "Medical-director approved analgesia through UP-11, cardiac monitoring when medication is administered, and no routine IV access or fluids for an isolated dental complaint.",
      "UP-07 may be used as Reviewed beta content; final Approved status remains pending completion of the full protocol and formulary reconciliation process.",
    ],
  },
  {
    id: "up-08",
    title: "Emergencies Involving Indwelling Central Lines",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Recognize and stabilize complications involving PICC lines, tunneled central catheters, implanted ports, and dialysis catheters. Prevent hemorrhage, additional air entry, medication exposure, and further catheter damage.",
      "UP-08 does not authorize routine central-device access, medication administration, or infusion management. Use of an indwelling central device during interfacility transport is governed only by the separate interfacility-transfer policy.",
    ],
    flow: [
      {
        title: "Identify the Emergency",
        text: "Bleeding • damage • dislodgement • air entry • infusion reaction • infection • occlusion",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Stop Further Harm",
        text: "Stop infusion • close clamp • clamp damaged external tubing proximal to defect • protect open site",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Suspected Air Embolism?",
        text: "Seal entry site • left lateral/head down when tolerated • high-concentration oxygen • rapid transport",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Dislodged / Damaged / Bleeding?",
        text: "Do not advance, remove, reinsert, or force-flush • direct pressure • sterile or air-occlusive dressing",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Monitor + Transport",
        text: "Cardiac rhythm • SpO₂ • EtCO₂ • airway • perfusion • neurologic status • early notification",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "Higher provider levels include the actions listed for the preceding levels.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Identify the device and problem without disconnecting, accessing, flushing, advancing, removing, or manipulating the catheter. Obtain the device and infusion history from the patient, caregiver, sending facility, labels, and pump display when immediately available.",
              "For line damage, dislodgement, suspected air entry, or an infusion reaction, stop the infusion. Close an existing clamp or clamp intact external tubing between the patient and the damaged segment. Use a purpose-designed line clamp when available and do not apply an unprotected metal instrument directly to the catheter.",
              "For bleeding at the insertion site, apply direct pressure around the catheter without removing it. If the catheter is completely dislodged, apply direct pressure until hemorrhage is controlled, then cover the site with an air-occlusive dressing. Do not reinsert the catheter.",
              "If the catheter is partially dislodged, do not advance or remove it. Stabilize the external segment in its found position and cover the site with a sterile dressing.",
              "For suspected venous air embolism after catheter disruption or dislodgement, immediately stop the infusion, clamp the line, seal any open insertion site, place the patient left lateral with the head down when tolerated, administer high-concentration oxygen, and begin rapid transport with early notification.",
              "Apply cardiac, SpO₂, and EtCO₂ monitoring for suspected air embolism. Repeat airway, respiratory, perfusion, neurologic, and complete vital-sign assessments during transport.",
              "Do not alter an uncomplicated infusion under UP-08. Routine continuation, adjustment, or discontinuation of an interfacility infusion is governed by the separate interfacility-transfer policy.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Perform the immediate complication-control actions above. If medication or fluid remains necessary after the central device is no longer usable, establish peripheral IV or IO access according to UP-06 without delaying transport.",
              "Treat hypotension or another identified complication under the applicable shock, allergic-reaction, sepsis, or complaint-specific protocol. Do not administer medication or fluid through the affected central device under UP-08.",
              "If parenteral nutrition is interrupted, obtain a blood glucose promptly and repeat glucose assessment for symptoms of hypoglycemia or during prolonged transport.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Interpret the cardiac rhythm, manage airway or ventilatory compromise, and treat shock, dysrhythmia, anaphylaxis, seizure, or another identified complication under the applicable protocol.",
              "For suspected air embolism, continue high-concentration oxygen and cardiac, SpO₂, and waveform EtCO₂ monitoring. Do not delay transport for attempts to aspirate air through the catheter.",
              "Do not access, repair, exchange, advance, remove, or force-flush the catheter under UP-08. Central-device use during an interfacility transfer requires the separate interfacility-transfer policy.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Bleeding, damage, breakage, leakage, partial or complete dislodgement, suspected venous air embolism, occlusion, infusion reaction, infection, or other emergency involving an indwelling central device.",
    ],
    contraindications: [
      "Do not use UP-08 to initiate routine access, administer medication or fluid, or manage an uncomplicated interfacility infusion.",
      "Do not advance, reinsert, exchange, remove, repair, or force-flush a damaged, dislodged, occluded, painful, leaking, or otherwise abnormal central device.",
    ],
    assessment: [
      {
        title: "Device and complication assessment",
        items: [
          "Identify the device type when possible: PICC, tunneled catheter, implanted port, or dialysis catheter. Determine whether it was accessed before EMS arrival, what is infusing, the ordered rate, when the problem began, and what manipulation occurred immediately beforehand.",
          "Inspect without probing for external damage, open connections, clamp position, leakage, bleeding, catheter-length change, dressing disruption, erythema, warmth, drainage, swelling, tenderness, and impaired distal circulation.",
          "Assess for acute dyspnea, chest pain, hypoxemia, cough, hypotension, altered mental status, seizure, or focal neurologic findings suggesting air embolism; assess for fever, rigors, shock, urticaria, bronchospasm, or angioedema suggesting infection or infusion reaction.",
        ],
      },
    ],
    treatmentSteps: [
      "Stop an infusion associated with catheter damage, dislodgement, suspected air embolism, or infusion reaction. Close an existing clamp or clamp intact external tubing between the patient and the defect.",
      "Control bleeding with direct pressure. For complete dislodgement, apply an air-occlusive dressing after hemostasis; for partial dislodgement, stabilize the catheter in place and apply a sterile dressing.",
      "For suspected venous air embolism, seal the entry site, position left lateral with the head down when tolerated, administer high-concentration oxygen, apply cardiac/SpO₂/EtCO₂ monitoring, and transport rapidly with early notification.",
      "Do not advance, reinsert, remove, repair, or force-flush the catheter. Establish alternate peripheral IV or IO access when ongoing treatment requires vascular access.",
      "Treat hemorrhage, shock, anaphylaxis, sepsis, respiratory failure, dysrhythmia, seizure, or another complication under the applicable protocol.",
    ],
    medications: [],
    warnings: [
      "Never force-flush an occluded or resistant central line. Forced flushing may dislodge thrombus, rupture the catheter, or cause infiltration or embolization.",
      "Do not advance a partially dislodged catheter or reinsert a completely dislodged catheter.",
      "An open central-line tract may permit air entry even after the catheter is completely removed. Maintain an air-occlusive dressing and monitor for delayed cardiopulmonary or neurologic symptoms.",
      "Do not delay rapid transport for catheter troubleshooting, repair, or air aspiration.",
      "A life-sustaining infusion that is not associated with line damage, dislodgement, air entry, or reaction must not be altered under UP-08; follow the separate interfacility-transfer policy and sending/receiving physician orders.",
    ],
    clinicalPearls: [
      "Caregivers and sending-facility staff may provide important device-specific information, but immediate stabilization takes priority when hemorrhage, air entry, or a serious infusion reaction is suspected.",
      "Preserve the pump, medication container, tubing, labels, disconnected components, and the dislodged catheter when available for transfer with the patient; do not discard them at the scene.",
      "If parenteral nutrition is stopped, monitor for hypoglycemia, particularly in pediatric patients or during prolonged transport.",
    ],
    specialPopulations: [
      {
        title: "Pediatrics — younger than 16 years",
        items: [
          "Secure damaged or partially dislodged tubing carefully to prevent further movement and use age-appropriate positioning while maintaining airway and respiratory monitoring.",
          "If parenteral nutrition is interrupted, obtain blood glucose promptly and repeat for symptoms or prolonged transport.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — Indwelling IV Port Access procedure",
      "Claiborne County EMS UP-08 source PDF — Emergencies Involving Indwelling Central Lines, revised September 1, 2025",
      "Claiborne County EMS UP-06 IV / IO Access and separate interfacility-transfer policy",
      "Central venous catheter air-embolism literature addressing prevention of further air entry, oxygen, positioning, and occlusive dressing",
    ],
    sourcePdf: "/protocols/claiborne/up-08-emergency-indwelling-central-lines-protocol.pdf",
    sourcePages: { start: 1, end: 1 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 10, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director approved UP-08 as a complication-management protocol that does not authorize routine central access, medication administration, or infusion management; those functions remain under the separate interfacility-transfer policy.",
      "Medical-director approved immediate infusion stop, clamping of intact external tubing proximal to damage, direct pressure, and air-occlusive dressing by EMTs, AEMTs, and Paramedics when required to prevent immediate harm.",
      "Medical-director approved suspected venous-air-embolism treatment with prevention of further air entry, left-lateral/head-down positioning when tolerated, high-concentration oxygen, cardiac/SpO₂/EtCO₂ monitoring, rapid transport, and early notification.",
      "Medical-director directed that a damaged or dislodged catheter must not be advanced, reinserted, removed, repaired, or force-flushed; partially dislodged catheters are stabilized in place and completely dislodged sites receive direct pressure followed by an air-occlusive dressing.",
      "Medical-director removed the source protocol’s blanket instruction to continue an infusion and its nonspecific 20 mL/kg limit. Uncomplicated infusion continuation is governed only by the separate interfacility-transfer policy.",
      "UP-08 may be used as Reviewed beta content; final Approved status remains pending completion of the full protocol and formulary reconciliation process.",
    ],
  },
  {
    id: "up-09",
    title: "Epistaxis",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Control nasal hemorrhage while protecting the airway, identifying traumatic or posterior bleeding, and recognizing significant blood loss or shock.",
      "Sustained compression of the soft lower nose is the first-line treatment. Topical TXA on gauze is available to AEMTs and Paramedics for persistent atraumatic anterior bleeding; oxymetazoline is not included because it is not currently on the Claiborne formulary.",
    ],
    flow: [
      {
        title: "Airway + Position",
        text: "Sit upright and lean forward when tolerated • suction as needed • never tilt the head backward",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Major Facial Trauma / Unprotected Airway?",
        text: "Do not place intranasal gauze or a clamp • protect airway • control external bleeding • transition to trauma/airway care",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Clear Clots + Compress",
        text: "Alert atraumatic patient gently clears clots once • compress soft lower nose continuously for 15 minutes",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Maintain Uninterrupted Pressure",
        text: "Manual pressure • commercial nasal clamp • or two tongue depressors taped together at one end",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Persistent Uncontrolled Bleeding?",
        text: "AEMT/Paramedic: TXA-saturated anterior gauze • bilateral if uncontrolled or source uncertain • pressure 20 minutes",
        levels: ["AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Hypotension?",
        text: "IV/IO access and fluid only for hypotension • reassess after each bolus",
        levels: ["AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Monitor After Bleeding Control + Transport",
        text: "Secure pressure first • then cardiac monitoring when indicated without interrupting hemorrhage control",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "Higher provider levels include the actions listed for the preceding levels.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Assess airway patency, ability to handle blood and secretions, respiratory status, perfusion, mental status, bleeding severity, estimated blood loss, associated facial trauma, anticoagulant or antiplatelet use, and complete vital signs. Suction blood and secretions as needed.",
              "Seat the patient upright and leaning forward when tolerated. Do not tilt the head backward. If the alert, cooperative patient has atraumatic bleeding and protects the airway, have the patient gently clear or blow clots from the nose once before compression.",
              "Compress the soft lower third of the nose continuously for 15 minutes without releasing pressure to check for bleeding. Pressure may be applied manually, with a commercial nasal clamp, or with two tongue depressors taped together at one end. Position the untaped ends externally over the soft nasal alae; never insert the tongue depressors into the nostrils.",
              "If major facial trauma, suspected basilar skull fracture, altered mental status with an unprotected airway, or inability to manage blood and secretions is present, do not place intranasal gauze or a nasal clamp. Suction, protect the airway, control external bleeding, and transition immediately to the applicable trauma and airway protocols.",
              "EMT personnel may assist with equipment and continued external pressure but may not administer topical TXA under UP-09.",
              "Begin prompt transport for airway compromise, hypotension or shock, suspected posterior bleeding, major facial trauma, persistent bleeding, significant estimated blood loss, or uncontrolled bleeding in a patient taking an anticoagulant or antiplatelet medication.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "For persistent atraumatic anterior bleeding after 15 minutes of uninterrupted compression, apply topical TXA to gauze. Adult: TXA 1 g/10 mL total. Pediatric: TXA 15 mg/kg, maximum 1 g total. Saturate an appropriately sized gauze pledget and place it gently in the anterior affected nostril without deep or blind insertion.",
              "If bleeding is uncontrolled when TXA gauze is applied or the bleeding side cannot be identified, place appropriately sized TXA-saturated gauze gently in both anterior nostrils, dividing the approved total dose between the two sides. Leave gauze tails visible externally and maintain external pressure or the nasal clamp for 20 minutes.",
              "Do not atomize TXA. Do not perform deep, blind, balloon, commercial, or posterior nasal packing. Do not administer IV/IO TXA solely for isolated epistaxis.",
              "Establish IV or IO access only for hypotension, significant hemorrhage requiring resuscitation, airway management, or another specific clinical indication. Administer crystalloid only for hypotension according to UP-04: adult 500 mL and pediatric 10 mL/kg, followed by reassessment. Use smaller aliquots and frequent reassessment for CHF, renal failure, liver failure, or known volume overload.",
              "Bleeding control takes priority over routine cardiac-monitor placement. Once uninterrupted pressure or the clamp is secured, apply cardiac monitoring for hypotension, significant blood loss, suspected posterior bleeding, or clinical instability without interrupting hemorrhage control.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform the approved topical TXA treatment and hypotension-directed vascular access and fluid resuscitation described above.",
              "For persistent blood in the posterior pharynx, bleeding from both nares despite correct anterior compression, continued brisk hemorrhage, or inability to maintain airway protection, suspect posterior bleeding, maintain suction, prepare advanced airway management, and transport promptly with early receiving-facility notification.",
              "After hemorrhage-control measures are secured, interpret the cardiac rhythm and manage airway compromise, respiratory failure, shock, or dysrhythmia under the applicable protocol. Do not delay transport for repeated packing attempts.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Active, recurrent, or recently controlled nasal bleeding requiring EMS evaluation or treatment.",
    ],
    contraindications: [
      "Do not place intranasal gauze or a nasal clamp in major facial trauma, suspected basilar skull fracture, an unprotected airway, or inability to manage blood and secretions.",
      "Do not administer topical TXA to a patient with a known hypersensitivity to tranexamic acid.",
      "Do not perform blind, deep, balloon, commercial, or posterior nasal packing under UP-09.",
    ],
    assessment: [
      {
        title: "Focused bleeding and airway assessment",
        items: [
          "Determine onset, duration, recurrence, suspected side, trauma, prior treatment, prior nasal surgery or recurrent unilateral bleeding, estimated blood loss, anticoagulant or antiplatelet use, bleeding disorder, intranasal drug use, and symptoms of anemia or shock.",
          "Assess the ability to handle blood and secretions, airway patency, respiratory status, mental status, skin signs, perfusion, complete vital signs, and the posterior pharynx for ongoing blood.",
          "After clots are cleared once in an alert atraumatic patient, inspect only the visible anterior nasal opening without probing. Persistent blood in the posterior pharynx or continued bilateral bleeding despite correct compression suggests a posterior source.",
        ],
      },
    ],
    treatmentSteps: [
      "Position upright and leaning forward when tolerated, suction as needed, and protect the airway. Do not tilt the head backward.",
      "For an alert, cooperative, atraumatic patient who protects the airway, gently clear clots once, then compress the soft lower nose continuously for 15 minutes without releasing to check.",
      "Maintain pressure manually, with a commercial nasal clamp, or with two tongue depressors taped together at one end and positioned externally over the soft nasal alae.",
      "For persistent atraumatic anterior bleeding, an AEMT or Paramedic may apply topical TXA to anterior gauze. Use adult TXA 1 g/10 mL total or pediatric TXA 15 mg/kg to a maximum of 1 g total. If bleeding is uncontrolled or the source is uncertain, divide the total dose between gauze pledgets placed gently in both anterior nostrils. Leave external tails and maintain pressure for 20 minutes.",
      "Do not atomize TXA or perform blind, deep, balloon, commercial, or posterior packing. Establish IV/IO access and give crystalloid only for hypotension.",
      "Secure bleeding control before routine cardiac-monitor placement. Once pressure is maintained, monitor patients with hypotension, significant blood loss, suspected posterior bleeding, or instability and transport promptly.",
    ],
    medications: [
      {
        name: "Tranexamic Acid — topical epistaxis",
        dose: "AEMT/Paramedic: adult TXA 1 g/10 mL total; pediatric TXA 15 mg/kg, maximum 1 g total. Apply to appropriately sized anterior gauze and maintain external pressure for 20 minutes.",
        notes: [
          "Use only for persistent atraumatic anterior bleeding after 15 minutes of uninterrupted compression.",
          "If bleeding is uncontrolled when TXA is applied or the side is uncertain, divide the approved total dose between gauze pledgets placed gently in both anterior nostrils.",
          "Leave gauze tails visible externally. Do not atomize TXA and do not perform deep or blind packing.",
          "EMT administration is not authorized under UP-09. Do not administer IV/IO TXA solely for isolated epistaxis.",
        ],
      },
      {
        name: "Crystalloid — hypotension only",
        dose: "AEMT/Paramedic: adult 500 mL; pediatric 10 mL/kg. Reassess after each bolus and use smaller aliquots for CHF, renal failure, liver failure, or known volume overload.",
        notes: [
          "Do not establish vascular access or administer fluid routinely for controlled epistaxis in a hemodynamically stable patient.",
          "Transition to UP-04 and the applicable hemorrhagic-shock or trauma protocol when significant blood loss or shock is present.",
        ],
      },
    ],
    warnings: [
      "Airway protection and suction take priority when the patient cannot manage blood or secretions. Do not place gauze or a clamp in a patient with an unprotected airway.",
      "Never tilt the head backward. Blood entering the posterior pharynx may cause aspiration, vomiting, or failure to recognize ongoing hemorrhage.",
      "A tongue-depressor clamp is applied only to the exterior soft nasal alae. Never insert a tongue depressor into a nostril or allow rigid pressure over the nasal bridge.",
      "Do not perform blind, deep, balloon, commercial, or posterior packing. Do not place intranasal gauze or a clamp with major facial trauma or suspected basilar skull fracture.",
      "Do not delay airway care, hemorrhage control, or transport to obtain cardiac monitoring. Apply monitoring after uninterrupted pressure is secured.",
    ],
    clinicalPearls: [
      "Most epistaxis is anterior. Persistent blood in the posterior pharynx, continued bilateral bleeding, or brisk bleeding despite correct anterior compression should raise concern for a posterior source.",
      "The effectiveness of topical TXA depends on technique. Use TXA-saturated gauze rather than atomized administration and maintain sustained external pressure.",
      "Do not interrupt pressure repeatedly to inspect the nose. Use the scene timer to document the full 15-minute compression period and the 20-minute TXA-gauze period.",
      "Document anticoagulant and antiplatelet medications, bleeding duration, estimated blood loss, compression time, clamp method, TXA total dose and laterality, response, vital-sign trends, and destination notification.",
    ],
    specialPopulations: [
      {
        title: "Pediatrics — younger than 16 years",
        items: [
          "Use TXA 15 mg/kg topically to a maximum total dose of 1 g. Select an appropriately sized gauze pledget, leave an external tail, and divide the total dose if both anterior nostrils are treated.",
          "Maintain continuous airway observation. Do not place intranasal gauze or a clamp when the child cannot cooperate, cannot protect the airway, or cannot manage blood and secretions.",
        ],
      },
      {
        title: "Anticoagulant or antiplatelet use",
        items: [
          "Use the same first-line compression and topical treatment. Do not delay immediate bleeding control while seeking medication-reversal information.",
          "Persistent or recurrent bleeding, hemodynamic change, significant estimated blood loss, or suspected posterior bleeding requires prompt transport and early notification.",
        ],
      },
    ],
    references: [
      "American Academy of Otolaryngology–Head and Neck Surgery Foundation, Clinical Practice Guideline: Nosebleed (Epistaxis), 2020",
      "Fatahi M, et al. A meta-analysis on the efficacy of topical tranexamic acid for epistaxis: Does the method of administration affect the success rate? Australasian Emergency Care, 2026",
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — reviewed for state comparison; no dedicated epistaxis protocol identified",
      "Claiborne Covenant EMS Formulary — current medical-director source workbook",
      "Claiborne County EMS UP-09 source PDF — Epistaxis, revised September 1, 2025",
      "Claiborne County EMS UP-04 Shock / Hypotension and applicable trauma and airway protocols",
    ],
    sourcePdf: "/protocols/claiborne/up-09-epistaxis-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 10, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director approved upright forward positioning, suction as needed, one-time gentle clot clearance in an alert atraumatic patient, and uninterrupted compression of the soft lower nose for 15 minutes.",
      "Medical-director approved external pressure using manual compression, a commercial nasal clamp, or two tongue depressors taped together at one end with the untaped ends placed externally over the soft nasal alae.",
      "Medical-director removed oxymetazoline because it is not currently listed on the Claiborne formulary.",
      "Medical-director approved topical TXA on gauze rather than atomized administration for persistent atraumatic anterior bleeding: AEMT/Paramedic only; adult 1 g/10 mL total; pediatric 15 mg/kg to a maximum total dose of 1 g; maintain pressure for 20 minutes.",
      "Medical-director approved bilateral anterior TXA-gauze placement when bleeding is uncontrolled at application or the source is uncertain, with the approved total dose divided between sides and gauze tails left visible externally.",
      "Medical-director prohibited blind, deep, balloon, commercial, and posterior nasal packing under UP-09 and prohibited intranasal gauze or clamp placement with major facial trauma, suspected basilar skull fracture, or an unprotected airway.",
      "Medical-director approved IV/IO access and crystalloid only for hypotension, with adult 500 mL and pediatric 10 mL/kg boluses followed by reassessment and smaller aliquots for fluid-sensitive patients.",
      "Medical-director directed that bleeding control precede routine cardiac-monitor placement; monitoring follows once pressure is secured and must not interrupt hemorrhage control.",
      "UP-09 may be used as Reviewed beta content; final Approved status remains pending completion of the full protocol and formulary reconciliation process.",
    ],
  },
  {
    id: "up-10",
    title: "Fever / Infection Control",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Fever is a clinical sign, not a diagnosis. Identify the probable source, high-risk age or condition, evidence of organ dysfunction, environmental hyperthermia, and the need for transmission-based precautions.",
      "UP-10 permits oral acetaminophen or ibuprofen for an uncomfortable febrile patient who can safely take oral medication. Fever alone does not require vascular access, crystalloid, cardiac monitoring, or sepsis activation.",
    ],
    flow: [
      {
        title: "Standard + Transmission-Based Precautions",
        text: "Select contact, droplet, and/or airborne precautions by suspected route • mask respiratory-symptom patient when tolerated",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Assess + Measure Temperature",
        text: "Airway • breathing • perfusion • mental status • rash • source • temperature method • last antipyretic",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Infant ≤60 Days + Temperature ≥100.4°F / 38°C?",
        text: "Prompt transport and early notification • do not delay for antipyretics",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Environmental Hyperthermia / Heat Stroke?",
        text: "Transition to heat-emergency protocol • active cooling • antipyretics are not effective",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Uncomfortable Fever ≥100.4°F / 38°C?",
        text: "EMT/AEMT/Paramedic: one oral agent if airway protected and no contraindication",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Suspected Infection + Organ Dysfunction?",
        text: "Hypotension • altered mental status • respiratory distress/hypoxemia • poor perfusion → sepsis/shock pathway",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Reassess + Transport",
        text: "Repeat vital signs, temperature when useful, mental status, perfusion, respiratory status, and medication response",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "Higher provider levels include the actions listed for the preceding levels.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Apply standard precautions and add contact, droplet, and/or airborne precautions according to the suspected route of transmission and agency infection-control policy. Place a mask on a patient with respiratory symptoms when tolerated and when it does not interfere with oxygen delivery or ventilation.",
              "Assess airway, respiratory effort, SpO₂, perfusion, mental status, skin, HEENT, neck, lungs, abdomen, back, neurologic status, hydration, rash, pain, and complete vital signs. Identify possible infectious source, environmental exposure, immune compromise, pregnancy, recent procedures, indwelling devices, sick contacts, and medications.",
              "Measure and document temperature and the measurement method. Do not perform rectal temperatures in the field. Accept a reliable documented temperature obtained at home or by another clinician even when antipyretics lowered the temperature before EMS arrival. Document the medication, dose, and administration time when known.",
              "Any infant 60 days old or younger with a documented temperature of at least 100.4°F/38°C requires prompt transport and early receiving-facility notification, even when well appearing. Do not delay transport to administer or assess the effect of an antipyretic.",
              "For an uncomfortable patient with temperature at least 100.4°F/38°C who is alert, protects the airway, can swallow safely, and has no medication contraindication, administer one oral antipyretic: acetaminophen or ibuprofen. Do not routinely administer both agents.",
              "Acetaminophen: adult 650–1,000 mg PO; pediatric older than 3 months 15 mg/kg PO, maximum 650 mg. Ibuprofen: adult 400 mg PO; pediatric older than 6 months 10 mg/kg PO, maximum 400 mg. Do not repeat an agent when the previous dose or administration time is uncertain.",
              "Do not administer aspirin to a patient younger than 16 years. Do not administer an antipyretic for environmental hyperthermia or heat stroke; transition immediately to the applicable heat-emergency protocol and begin active cooling.",
              "For seizure activity, protect the airway and transition to the seizure protocol. Do not delay transport of a toxic-appearing, unstable, immunocompromised, or high-risk patient for temperature reduction.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Do not establish IV/IO access or administer crystalloid for fever alone. Establish vascular access for hypotension, shock, critical illness, required parenteral treatment, or another specific clinical indication.",
              "For hypotension or shock, administer crystalloid according to UP-04: adult 500 mL and pediatric 10 mL/kg, followed by reassessment. Use smaller aliquots and frequent reassessment for CHF, renal failure, liver failure, or known volume overload.",
              "Obtain blood glucose for altered mental status, seizure, a critically ill infant or child, suspected sepsis with organ dysfunction, diabetes-related concern, or another specific indication. Routine glucose measurement is not required for uncomplicated fever.",
              "Administer the same oral acetaminophen or ibuprofen doses authorized above when indicated. UP-10 does not authorize IV acetaminophen, ketorolac, or antibiotic administration solely for fever.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Fever alone is not sepsis. When suspected infection is accompanied by hypotension, altered mental status, respiratory distress or hypoxemia, poor skin perfusion, or another sign of organ dysfunction, transition immediately to the applicable sepsis and shock protocols.",
              "Cardiac monitoring is not required for uncomplicated fever. Apply and interpret cardiac monitoring for suspected sepsis with organ dysfunction, hypotension, significant respiratory distress, dysrhythmia symptoms, or other clinical instability.",
              "Manage airway or ventilatory failure, shock, seizure, dysrhythmia, or another identified complication under the applicable protocol. Notify the receiving facility early for sepsis, a high-risk infant, immunocompromise, meningismus, petechial or purpuric rash, or other time-sensitive findings.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Measured or reliably documented temperature of at least 100.4°F/38°C, suspected infection, recent fever reduced by an antipyretic, or illness requiring infection-control precautions.",
    ],
    contraindications: [
      "Do not give oral medication to a patient who cannot protect the airway, cannot swallow safely, is actively vomiting, or has another aspiration risk.",
      "Do not administer acetaminophen with known hypersensitivity, severe liver disease or liver failure, suspected acetaminophen overdose, or a recent maximum dose.",
      "Do not administer ibuprofen with known NSAID hypersensitivity, age 6 months or younger, renal disease or renal transplant, active gastrointestinal bleeding, significant dehydration, hypotension, clinically significant anticoagulant-associated bleeding risk, or known or suspected pregnancy.",
      "Do not administer aspirin to a patient younger than 16 years.",
    ],
    assessment: [
      {
        title: "Focused fever and infection assessment",
        items: [
          "Onset, duration, highest measured temperature and method, last antipyretic medication/dose/time, recent antibiotics, immune compromise, diabetes, cancer or chemotherapy, transplant, pregnancy, recent hospitalization or procedure, indwelling device, sick contacts, travel or environmental exposure, and suspected source.",
          "Assess for cough, dyspnea, chest pain, headache, neck stiffness, photophobia, sore throat, dysuria, flank pain, abdominal pain, vomiting, diarrhea, myalgias, rash, focal skin infection, altered mental status, rigors, seizure, poor intake, decreased urine output, and signs of dehydration.",
          "Identify organ dysfunction: hypotension, altered mental status, respiratory distress, hypoxemia, poor perfusion, mottling, delayed capillary refill, or rapidly worsening clinical appearance.",
        ],
      },
    ],
    treatmentSteps: [
      "Use standard precautions and add transmission-based precautions according to the suspected route. Mask a patient with respiratory symptoms when tolerated.",
      "Measure and document temperature and method. Do not perform rectal temperatures. Treat a reliable home or clinician-documented fever as valid even when the current temperature is lower after an antipyretic.",
      "Transport an infant 60 days old or younger with documented temperature at least 100.4°F/38°C promptly with early notification; do not delay for antipyretic administration or effect.",
      "For uncomfortable fever, administer one oral agent when safe: acetaminophen adult 650–1,000 mg or pediatric older than 3 months 15 mg/kg to a maximum 650 mg; or ibuprofen adult 400 mg or pediatric older than 6 months 10 mg/kg to a maximum 400 mg.",
      "Do not establish vascular access, administer crystalloid, obtain routine glucose, or apply routine cardiac monitoring for uncomplicated fever. Use these interventions only for the approved clinical indications above.",
      "If environmental hyperthermia or heat stroke is suspected, begin active cooling and transition to the heat-emergency protocol. If suspected infection is accompanied by organ dysfunction, transition to the sepsis/shock pathway.",
      "Repeat complete vital signs and reassess mental status, airway, respiratory status, perfusion, temperature when useful, and medication response without delaying transport.",
    ],
    medications: [
      {
        name: "Acetaminophen — oral fever treatment",
        dose: "EMT/AEMT/Paramedic: adult 650–1,000 mg PO; pediatric older than 3 months 15 mg/kg PO, maximum 650 mg.",
        notes: [
          "Use for uncomfortable fever of at least 100.4°F/38°C when the patient protects the airway and can swallow safely.",
          "Do not administer with severe liver disease or liver failure, suspected acetaminophen overdose, known hypersensitivity, a recent maximum dose, or an uncertain previous dose/time.",
          "Do not delay transport of a high-risk infant, toxic-appearing patient, or unstable patient to administer or assess the effect of acetaminophen.",
        ],
      },
      {
        name: "Ibuprofen — oral fever treatment",
        dose: "EMT/AEMT/Paramedic: adult 400 mg PO; pediatric older than 6 months 10 mg/kg PO, maximum 400 mg.",
        notes: [
          "Use for uncomfortable fever of at least 100.4°F/38°C when the patient protects the airway and can swallow safely.",
          "Do not administer with NSAID hypersensitivity, age 6 months or younger, renal disease/transplant, active GI bleeding, significant dehydration, hypotension, clinically significant anticoagulant-associated bleeding risk, pregnancy, or an uncertain previous dose/time.",
          "Do not administer for environmental hyperthermia or heat stroke.",
        ],
      },
      {
        name: "Crystalloid — hypotension or shock only",
        dose: "AEMT/Paramedic: adult 500 mL; pediatric 10 mL/kg. Reassess after each bolus and use smaller aliquots for fluid-sensitive patients.",
        notes: [
          "Do not administer crystalloid for fever alone.",
          "Continue treatment according to UP-04 and the applicable sepsis or shock protocol.",
        ],
      },
    ],
    warnings: [
      "Do not equate fever alone with sepsis. Sepsis requires suspected infection plus organ dysfunction; transition promptly when organ dysfunction is present.",
      "Infants 60 days old or younger with a documented temperature of at least 100.4°F/38°C require prompt evaluation even when currently afebrile or well appearing.",
      "Petechial or purpuric rash, meningismus, altered mental status, hypotension, hypoxemia, poor perfusion, toxic appearance, or immune compromise requires prompt transport and early notification.",
      "Antipyretics do not treat heat stroke and must never delay active cooling. Do not give NSAIDs in environmental heat emergencies.",
      "Do not delay transport of an unstable or high-risk patient to obtain a temperature, vascular access, cardiac monitoring, or antipyretic response.",
    ],
    clinicalPearls: [
      "Treat the patient rather than the temperature. The purpose of an antipyretic is relief of discomfort; normalization of temperature is not required before transport.",
      "A normal temperature after acetaminophen or ibuprofen does not exclude serious infection. Document the highest reliable temperature and the medication, dose, and time given before EMS arrival.",
      "Antipyretics do not reliably prevent recurrence of febrile seizures. Treat active seizure activity under the seizure protocol.",
      "The absence of fever does not exclude infection or sepsis, especially in older, immunocompromised, or critically ill patients.",
      "Document suspected source, immune status, PPE used, temperature and method, medication contraindication screening, administered dose, response, vital-sign trends, and receiving-facility notification.",
    ],
    specialPopulations: [
      {
        title: "Infants 60 days old or younger",
        items: [
          "A reliably documented temperature of at least 100.4°F/38°C within the current illness is high risk even when the infant appears well or is afebrile after medication.",
          "Provide prompt transport and early notification. Do not delay transport for antipyretic administration or response.",
        ],
      },
      {
        title: "Immunocompromised patients",
        items: [
          "Maintain a low threshold for prompt transport and early notification in patients with chemotherapy, cancer, transplant, HIV with immune suppression, chronic immunosuppressive medication, or another significant immune deficit.",
          "Serious infection may be present without marked fever or classic inflammatory signs.",
        ],
      },
      {
        title: "Pediatrics — younger than 16 years",
        items: [
          "Use actual or length-based weight for medication dosing. Acetaminophen requires age older than 3 months; ibuprofen requires age older than 6 months.",
          "Do not administer aspirin. Assess hydration, urine output, interaction, work of breathing, capillary refill, rash, and caregiver-reported behavior.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — Fever / Infection Control procedure and acetaminophen/ibuprofen references",
      "American Academy of Pediatrics, Clinical Practice Guideline: Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old, updated 2021",
      "Centers for Disease Control and Prevention — Standard and Transmission-Based Precautions, current guidance",
      "Claiborne Covenant EMS Formulary — current medical-director source workbook",
      "Claiborne County EMS UP-10 source PDF — Fever / Infection Control, revised September 1, 2025",
      "Claiborne County EMS UP-04 Shock / Hypotension and applicable sepsis, seizure, and environmental heat protocols",
    ],
    sourcePdf: "/protocols/claiborne/up-10-fever-protocol.pdf",
    sourcePages: { start: 1, end: 1 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 10, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director defined fever as temperature at least 100.4°F/38°C, directed documentation of measurement method and last antipyretic dose/time, prohibited field rectal temperatures, and accepted a reliable home or clinician-documented fever despite later temperature reduction.",
      "Medical-director approved prompt transport and early notification for any infant 60 days old or younger with documented temperature at least 100.4°F/38°C, without delay for antipyretic administration or response.",
      "Medical-director approved one oral antipyretic by EMT, AEMT, or Paramedic for an uncomfortable febrile patient who protects the airway: acetaminophen adult 650–1,000 mg or pediatric older than 3 months 15 mg/kg to maximum 650 mg; or ibuprofen adult 400 mg or pediatric older than 6 months 10 mg/kg to maximum 400 mg.",
      "Medical-director directed that acetaminophen and ibuprofen not be given together routinely, that an agent not be repeated when the prior dose or time is uncertain, and that IV acetaminophen, ketorolac, and antibiotics not be administered solely for uncomplicated fever.",
      "Medical-director approved IV/IO access and crystalloid only for hypotension, shock, critical illness, required parenteral treatment, or another specific indication—not fever alone.",
      "Medical-director directed that fever alone is not sepsis; suspected infection must be accompanied by organ dysfunction before transition to the sepsis/shock pathway. Glucose and cardiac monitoring are not routine for uncomplicated fever.",
      "Medical-director approved standard precautions plus transmission-based precautions selected by suspected route and directed that environmental hyperthermia transition to active cooling under the heat-emergency protocol without antipyretic delay.",
      "Medical-director confirmed that UP-10 does not authorize antibiotic administration solely for fever.",
      "UP-10 may be used as Reviewed beta content; final Approved status remains pending completion of the full protocol and formulary reconciliation process.",
    ],
  },
  {
    id: "up-11",
    title: "Pain Control — Adult",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Assess and treat acute pain early while preserving airway protection, ventilation, perfusion, and neurologic assessment. Use the least invasive effective option and tailor treatment to pain severity, clinical condition, contraindications, and patient preference.",
      "UP-11 applies to patients 16 years of age or older. Mild pain may be treated with oral nonopioid medication. AEMTs and Paramedics may use approved parenteral nonopioids; opioids and analgesic-dose ketamine are Paramedic-only treatments.",
    ],
    flow: [
      {
        title: "Assess Pain + Cause",
        text: "Pain score • location • quality • onset • cause • allergies • airway • respirations • perfusion • mental status",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Immediate Cause-Specific Care",
        text: "Airway care • hemorrhage control • splinting • positioning • ice when appropriate • calm reassurance",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Mild Pain / Oral Route Appropriate?",
        text: "EMT/AEMT/Paramedic: acetaminophen 650–1,000 mg PO OR ibuprofen 400 mg PO",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Parenteral Nonopioid Appropriate?",
        text: "AEMT/Paramedic: acetaminophen 1 g IV/IO OR ketorolac 15 mg IV/IO or 30 mg IM",
        levels: ["AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Moderate–Severe Pain?",
        text: "Paramedic: select one opioid OR analgesic-dose ketamine • titrate to meaningful improvement",
        levels: ["Paramedic"],
        tone: "urgent",
      },
      {
        title: "Monitor + Reassess",
        text: "Cardiac monitor for systemic nonoral analgesia • continuous SpO₂/EtCO₂ for opioid or ketamine • reassess every 5–10 minutes",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Transport + Handoff",
        text: "Do not delay airway care, hemorrhage control, splinting, or transport • document medication response and adverse effects",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "Higher provider levels include the actions listed for the preceding levels.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Identify and treat immediate threats before analgesia. Provide airway support, hemorrhage control, wound coverage, splinting, positioning, ice when appropriate, and reassurance without delaying transport.",
              "Assess onset, location, quality, radiation, severity, aggravating or relieving factors, cause, associated symptoms, allergies, current medications, previous analgesics, substance or opioid tolerance, and relevant renal, hepatic, respiratory, cardiovascular, bleeding, and pregnancy history.",
              "Record a numeric 0–10 pain score when the patient can self-report. Use a descriptive severity assessment when reliable numeric reporting is not possible. Obtain airway, respiratory, perfusion, mental-status, and complete vital-sign assessments before medication.",
              "For mild pain when the patient is alert, protects the airway, can swallow safely, and has no contraindication, administer one oral medication: acetaminophen 650–1,000 mg PO once or ibuprofen 400 mg PO once. Do not routinely administer both.",
              "Do not administer aspirin for pain under UP-11. Aspirin remains limited to its approved cardiac indication. Nitrous oxide is not authorized because it is not on the Claiborne formulary.",
              "Reassess pain, airway, respiratory status, perfusion, mental status, and vital signs after treatment and at handoff. Request the higher provider level when pain remains moderate to severe or oral medication is inappropriate or ineffective.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "For pain requiring a parenteral nonopioid, administer one of the following: acetaminophen 1 g IV/IO once or ketorolac 15 mg IV/IO once or 30 mg IM once. Do not routinely combine IV acetaminophen with an additional acetaminophen dose.",
              "Do not administer ketorolac when ibuprofen or another NSAID has already been given during the current treatment interval. Screen for NSAID hypersensitivity, renal disease, renal transplant, significant dehydration, hypotension, active gastrointestinal bleeding, clinically significant anticoagulant-associated bleeding risk, and known or suspected pregnancy.",
              "Establish IV access when needed for parenteral treatment or another clinical indication. Do not establish IO access solely to treat pain in an otherwise stable patient; use an approved oral or nonvascular option or request Paramedic treatment when appropriate.",
              "Apply cardiac monitoring before IV/IO/IM analgesia and continue through reassessment and transport. Reassess pain, BP, heart rate, respiratory rate, SpO₂, mental status, and adverse effects after medication.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "For moderate to severe pain, select one opioid or analgesic-dose ketamine based on the clinical situation, contraindications, prior response, and patient preference. Titrate to meaningful improvement rather than complete elimination of pain.",
              "Fentanyl: 50 mcg slow IV/IO; repeat 25–50 mcg every 5 minutes as needed; maximum total 100 mcg.",
              "Morphine: 5 mg slow IV/IO; repeat 5 mg after 10 minutes as needed; maximum total 10 mg. If vascular access is unavailable, administer 5–10 mg IM once.",
              "Hydromorphone: 0.5 mg slow IV/IO; repeat 0.5 mg after 10 minutes as needed; maximum total 1 mg. If vascular access is unavailable, administer 0.5–1 mg IM once.",
              "Select one opioid. Do not combine fentanyl, morphine, and hydromorphone. Additional opioid dosing beyond the approved total limits requires medical-control authorization.",
              "Ketamine: 0.3 mg/kg IV/IO slowly over 10 minutes, maximum 30 mg per dose. May repeat every 20 minutes as needed for a maximum of three total doses. Do not administer by rapid IV push.",
              "If vascular access is unavailable, administer ketamine 0.5–1 mg/kg IN once, maximum 100 mg. Intranasal ketamine is a single-dose option under UP-11.",
              "Do not routinely initiate weight-based ketamine and an opioid together. If the initial medication is inadequate, fully reassess airway, ventilation, hemodynamics, sedation, pain, and adverse effects before changing agents.",
              "Apply cardiac monitoring before systemic nonoral analgesia. Maintain continuous SpO₂ and waveform EtCO₂ with any opioid or ketamine, keep suction and ventilation equipment immediately available, and reassess at least every 5–10 minutes.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Acute pain in a patient 16 years of age or older when treatment can be provided without delaying management of immediate threats or time-sensitive transport.",
      "Painful procedures or movement when analgesia is appropriate and the patient can be safely monitored.",
    ],
    contraindications: [
      "Do not give oral medication when the patient cannot protect the airway, cannot swallow safely, is actively vomiting, or has another aspiration risk.",
      "Do not administer acetaminophen with known hypersensitivity, severe liver disease or liver failure, suspected acetaminophen overdose, a recent maximum dose, or an uncertain prior acetaminophen dose or administration time.",
      "Do not administer ibuprofen or ketorolac with NSAID hypersensitivity, renal disease or renal transplant, significant dehydration, hypotension, active gastrointestinal bleeding, clinically significant anticoagulant-associated bleeding risk, known or suspected pregnancy, or recent NSAID administration.",
      "Do not administer an opioid with respiratory depression, inability to protect the airway, severe hypotension, or significant uncorrected hypoxemia.",
      "Do not administer analgesic-dose ketamine with known hypersensitivity, uncontrolled hypertension, active severe cardiac ischemia, or active psychosis.",
    ],
    assessment: [
      {
        title: "Pain and medication-safety assessment",
        items: [
          "Use patient self-report whenever possible. Record pain severity before medication, after each intervention, during transport, and at handoff. Pain score alone does not determine medication selection.",
          "Assess airway protection, respiratory rate and effort, SpO₂, perfusion, BP, heart rate and rhythm, mental status, sedation level, injury or illness severity, and whether pain may represent a time-sensitive cardiac, vascular, neurologic, surgical, obstetric, or traumatic emergency.",
          "Review allergies, analgesics already taken or administered, alcohol or sedative use, opioid tolerance, obstructive sleep apnea, COPD, renal or hepatic impairment, anticoagulant use, GI bleeding, pregnancy, and prior adverse responses to opioids, NSAIDs, acetaminophen, or ketamine.",
        ],
      },
    ],
    treatmentSteps: [
      "Treat airway compromise, hemorrhage, shock, and other immediate threats first. Provide appropriate positioning, splinting, wound care, ice, and reassurance.",
      "For mild pain, administer acetaminophen 650–1,000 mg PO or ibuprofen 400 mg PO when the oral route is safe and medication-specific contraindications are absent.",
      "For parenteral nonopioid treatment, an AEMT or Paramedic may administer acetaminophen 1 g IV/IO once or ketorolac 15 mg IV/IO or 30 mg IM once.",
      "For moderate to severe pain, a Paramedic may select fentanyl, morphine, hydromorphone, or analgesic-dose ketamine using the approved dose, interval, route, and maximum. Do not combine different opioids or routinely initiate opioid/ketamine combination therapy.",
      "Apply cardiac monitoring for all systemic nonoral analgesia. Use continuous SpO₂ and waveform EtCO₂ with opioids or ketamine and keep suction and ventilation equipment immediately available.",
      "Reassess pain, sedation, airway, respiratory rate and effort, SpO₂, EtCO₂ when used, BP, cardiac rhythm, and adverse effects at least every 5–10 minutes after parenteral medication and at handoff.",
      "Do not delay airway treatment, hemorrhage control, splinting, or transport to complete pain treatment or reach a specific pain score.",
    ],
    medications: [
      {
        name: "Acetaminophen — oral",
        dose: "EMT/AEMT/Paramedic: 650–1,000 mg PO once.",
        notes: [
          "Use when the patient protects the airway and can swallow safely.",
          "Do not administer with severe liver disease or liver failure, suspected acetaminophen overdose, a recent maximum dose, or an uncertain prior dose/time.",
        ],
      },
      {
        name: "Ibuprofen — oral",
        dose: "EMT/AEMT/Paramedic: 400 mg PO once.",
        notes: [
          "Do not administer with NSAID hypersensitivity, renal disease/transplant, significant dehydration, hypotension, active GI bleeding, clinically significant anticoagulant-associated bleeding risk, pregnancy, or recent NSAID administration.",
          "Do not combine with ketorolac.",
        ],
      },
      {
        name: "Acetaminophen — IV/IO",
        dose: "AEMT/Paramedic: 1 g IV/IO once.",
        notes: [
          "Include all acetaminophen taken before EMS arrival when screening for a recent maximum dose.",
          "Do not administer an additional oral acetaminophen dose routinely.",
        ],
      },
      {
        name: "Ketorolac",
        dose: "AEMT/Paramedic: 15 mg IV/IO once or 30 mg IM once.",
        notes: [
          "Do not administer with the NSAID contraindications listed above.",
          "Do not combine with ibuprofen or another NSAID.",
        ],
      },
      {
        name: "Fentanyl",
        dose: "Paramedic: 50 mcg slow IV/IO; repeat 25–50 mcg every 5 minutes as needed; maximum total 100 mcg.",
        notes: [
          "Use continuous SpO₂ and waveform EtCO₂ and monitor airway, ventilation, sedation, and hemodynamics.",
          "Do not combine with morphine or hydromorphone.",
        ],
      },
      {
        name: "Morphine",
        dose: "Paramedic: 5 mg slow IV/IO; repeat 5 mg after 10 minutes as needed; maximum total 10 mg. If no vascular access, 5–10 mg IM once.",
        notes: [
          "Use continuous SpO₂ and waveform EtCO₂ and monitor airway, ventilation, sedation, and hemodynamics.",
          "Do not combine with fentanyl or hydromorphone.",
        ],
      },
      {
        name: "Hydromorphone",
        dose: "Paramedic: 0.5 mg slow IV/IO; repeat 0.5 mg after 10 minutes as needed; maximum total 1 mg. If no vascular access, 0.5–1 mg IM once.",
        notes: [
          "Use continuous SpO₂ and waveform EtCO₂ and monitor airway, ventilation, sedation, and hemodynamics.",
          "Do not combine with fentanyl or morphine.",
        ],
      },
      {
        name: "Ketamine — analgesic dose",
        dose: "Paramedic: 0.3 mg/kg IV/IO slowly over 10 minutes, maximum 30 mg per dose; repeat every 20 minutes as needed, maximum three total doses. If no vascular access, 0.5–1 mg/kg IN once, maximum 100 mg.",
        notes: [
          "Do not administer by rapid IV push.",
          "Do not routinely initiate ketamine with an opioid. Fully reassess before changing agents.",
          "Use continuous SpO₂ and waveform EtCO₂ and monitor airway, ventilation, sedation, cardiac rhythm, and hemodynamics.",
        ],
      },
      {
        name: "Ondansetron — analgesia-associated nausea",
        dose: "AEMT/Paramedic: 4 mg IV/IO, IM, or PO.",
        notes: [
          "Use when clinically indicated for nausea or vomiting associated with pain or analgesic administration.",
          "Continue cardiac and respiratory monitoring required by the analgesic medication.",
        ],
      },
      {
        name: "Naloxone — opioid-induced hypoventilation",
        dose: "Paramedic: after airway support and ventilation, administer 0.1–0.2 mg IV/IO/IM and titrate to adequate ventilation. If vascular access is unavailable, administer 2 mg IN.",
        notes: [
          "Ventilate first and titrate to adequate spontaneous ventilation rather than complete reversal of analgesia when clinically safe.",
          "Transition to the naloxone/overdose protocol if overdose rather than an analgesic adverse effect is suspected.",
        ],
      },
    ],
    warnings: [
      "Analgesia must not delay airway management, hemorrhage control, shock treatment, splinting, or time-sensitive transport.",
      "A fall in respiratory rate, increasing sedation, abnormal EtCO₂, hypoxemia, or loss of airway protection after an opioid requires immediate airway support and assisted ventilation; administer naloxone when indicated.",
      "Use the lower end of the approved opioid dose range and careful titration in older or frail patients, obstructive sleep apnea, severe COPD, renal or hepatic impairment, or concurrent alcohol, opioid, benzodiazepine, or other sedative exposure.",
      "Do not routinely combine ketamine with a benzodiazepine. Treat a clinically significant emergence reaction or other adverse effect according to the applicable protocol and medical-control direction.",
      "Analgesic response does not exclude a serious underlying cause. Continue complaint-specific evaluation and transport.",
    ],
    clinicalPearls: [
      "Pain is subjective. Patient self-report should guide assessment when reliable; appearance, diagnosis, or concern for drug-seeking behavior must not be used as the sole reason to withhold appropriate analgesia.",
      "Meaningful improvement in pain and function is the goal; complete elimination of pain is not required.",
      "Do not withhold indicated analgesia solely because abdominal pain is undifferentiated, the patient has opioid tolerance, the injury is a burn, or the patient has sickle-cell disease.",
      "Nonopioid options may provide analgesia comparable to opioids for selected acute pain while avoiding opioid-associated respiratory depression. Medication selection should match the patient and clinical circumstance.",
      "Document the pain score or descriptive assessment, medication choice, dose, route, time, monitoring, reassessment findings, adverse effects, and response.",
    ],
    specialPopulations: [
      {
        title: "Older, frail, respiratory-risk, or organ-impaired patients",
        items: [
          "Use the lower end of the approved dose range, allow adequate time for effect, and reassess before repeating medication.",
          "Maintain continuous respiratory monitoring with any opioid or ketamine and be prepared to support ventilation.",
        ],
      },
      {
        title: "Pregnancy",
        items: [
          "Avoid ibuprofen and ketorolac. Use acetaminophen or carefully titrated Paramedic analgesia when indicated and transition to the applicable obstetric or complaint-specific protocol.",
        ],
      },
      {
        title: "Pediatrics — younger than 16 years",
        items: [
          "Do not use UP-11 for patients younger than 16 years. Use UP-12 Pediatric Pain Control and actual or length-based weight.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — Opiate Reference and Pain Management Protocol",
      "Evidence-Based Guidelines for Prehospital Pain Management: Recommendations, Prehospital Emergency Care, 2022",
      "Agency for Healthcare Research and Quality, Comparative Effectiveness of Analgesics to Reduce Acute Pain in the Prehospital Setting, 2019",
      "Claiborne Covenant EMS Formulary — current medical-director source workbook",
      "Claiborne County EMS UP-11 source PDF — Pain Control, revised February 15, 2026",
      "Claiborne County EMS UP-06 IV / IO Access and applicable complaint-specific protocols",
    ],
    sourcePdf: "/protocols/claiborne/up-11-pain-control-adult-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 10, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director approved adult UP-11 for patients 16 years of age or older and directed provider-specific care: oral acetaminophen/ibuprofen by EMT, AEMT, or Paramedic; IV acetaminophen/ketorolac by AEMT or Paramedic; and opioids/analgesic-dose ketamine by Paramedic only.",
      "Medical-director removed nitrous oxide because it is not on the Claiborne formulary and removed aspirin as an analgesic while retaining aspirin only for its approved cardiac indication.",
      "Medical-director approved acetaminophen 650–1,000 mg PO, ibuprofen 400 mg PO, acetaminophen 1 g IV/IO once, and ketorolac 15 mg IV/IO or 30 mg IM once with the medication-specific contraindications documented in UP-11.",
      "Medical-director approved Paramedic opioid limits: fentanyl maximum total 100 mcg, morphine maximum total 10 mg, and hydromorphone maximum total 1 mg; one opioid is selected and different opioids are not combined.",
      "Medical-director approved analgesic ketamine 0.3 mg/kg IV/IO slowly over 10 minutes to maximum 30 mg per dose, repeat every 20 minutes for maximum three doses; or 0.5–1 mg/kg IN once to maximum 100 mg when vascular access is unavailable.",
      "Medical-director directed against routine initial opioid/ketamine combination therapy and required full reassessment before changing agents.",
      "Medical-director required cardiac monitoring for all systemic nonoral analgesia and continuous SpO₂ and waveform EtCO₂ for opioid or ketamine administration, with reassessment at least every 5–10 minutes and at handoff.",
      "Medical-director approved ventilatory support before titrated naloxone for opioid-induced hypoventilation, ondansetron 4 mg for associated nausea, and the documented medication-specific contraindications and safety exclusions.",
      "UP-11 may be used as Reviewed beta content; final Approved status remains pending completion of the full protocol and formulary reconciliation process.",
    ],
  },
  {
    id: "up-12",
    title: "Police Custody",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Persons in law-enforcement custody receive the same clinical assessment, treatment, dignity, privacy, and access to emergency care as every other patient.",
      "Clinical needs determine EMS assessment, treatment, transport recommendation, and destination. Law enforcement retains responsibility for custody and scene security.",
      "This protocol applies to custody encounters, law-enforcement restraints, chemical-irritant exposure, and conducted-energy weapon exposure. Use the appropriate complaint, trauma, airway, behavioral, or refusal protocol concurrently.",
    ],
    flow: [
      { title: "Scene Safe + Medical Assessment", text: "Obtain law-enforcement report • address life threats • determine illness, injury, exposure, and use of force", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Capacity + Consent", text: "Custody alone does not remove capacity • capable adults retain the right to accept or refuse care", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Restraint Safety", text: "Least restrictive • never prone or hog-tied • protect airway, breathing, circulation, and access to treatment", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Specific Exposure?", text: "Chemical irritant: decontaminate • CEW: assess trauma and probe location • agitation: use agitation protocol", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Transport Required?", text: "Emergency condition, abnormal findings, significant trauma, concerning exposure, impaired capacity, or chemical restraint", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Monitor + Reassess", text: "Serial vital signs • restraint position and circulation • continuous monitoring when agitated or sedated", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Handoff or Informed Refusal", text: "Document observations versus reports, force or exposure, restraints, officers, findings, treatment, capacity, and disposition", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      {
        title: "Provider Actions",
        summary: "Custody does not change the standard of medical care.",
        levels: [
          { level: "EMT", actions: ["Perform complete BLS assessment and immediate lifesaving care. Treat illness or injury under the applicable protocol.", "Provide chemical-irritant decontamination and remove uncomplicated superficial CEW probes using the approved procedure.", "Assess restraint position, airway, breathing, circulation, distal neurovascular status, and decision-making capacity."] },
          { level: "AEMT", actions: ["Perform all EMT care. Establish IV/IO access and administer fluids or medications only when indicated by the patient's clinical condition and the applicable protocol.", "Assist with continuous monitoring, serial reassessment, and treatment of respiratory or hemodynamic complications."] },
          { level: "Paramedic", actions: ["Perform all prior care. Lead evaluation of significant agitation, abnormal vital signs, altered mental status, respiratory compromise, cardiac symptoms, severe injury, or high-risk CEW exposure.", "Provide advanced airway, cardiac, and pharmacologic treatment under the applicable complaint or agitation protocol."] },
        ],
      },
      {
        title: "Consent, Capacity & Refusal",
        summary: "Custody alone does not eliminate patient autonomy.",
        levels: [
          { level: "EMT", actions: ["Determine whether the adult patient can understand the condition, proposed care, material risks, alternatives, and consequences of refusal.", "A capable adult may refuse assessment, treatment, or transport under the Refusal / Non-Transport protocol. Obtain two vital-sign sets when permitted and document any assessment the patient declines."] },
          { level: "AEMT", actions: ["Reassess for intoxication, hypoxia, hypoglycemia, head injury, medication effects, psychiatric emergency, or another condition that may impair capacity."] },
          { level: "Paramedic", actions: ["Evaluate questionable or high-risk capacity and contact Medical Control when uncertainty, disagreement, or a serious suspected condition remains.", "When capacity is absent and an emergency condition exists, provide necessary care and transport under implied consent with law-enforcement assistance when required for safety."] },
        ],
      },
      {
        title: "Restraint Safety & Monitoring",
        summary: "Use restraint only for immediate safety or medically necessary care, never for punishment or convenience.",
        levels: [
          { level: "EMT", actions: ["Use the least restrictive safe method. Never transport a patient prone, hog-tied, with wrists connected directly or indirectly to ankles, or with pressure on the neck, chest, back, or abdomen.", "Position supine with the head elevated or lateral when clinically appropriate. Do not use a long backboard solely as a restraint device.", "Reassess airway, breathing, circulation, restraint position, skin, and distal neurovascular status at least every 5 minutes and document findings."] },
          { level: "AEMT", actions: ["Add continuous SpO₂ and serial vital signs for patients restrained because of agitation. Obtain glucose and temperature when clinically indicated."] },
          { level: "Paramedic", actions: ["Use continuous cardiac monitoring and SpO₂ for significant agitation or chemical restraint. Add waveform EtCO₂ after chemical restraint or when significant agitation or respiratory risk is present.", "Midazolam or ketamine may be used per agitation protocol. Continuous airway and cardiac monitoring required."] },
        ],
      },
      {
        title: "Chemical-Irritant Exposure",
        summary: "Prevent cross-contamination and provide prompt decontamination.",
        levels: [
          { level: "EMT", actions: ["Use appropriate PPE, move the patient to fresh air, remove contaminated clothing, and contain contaminated items when feasible.", "Remove contact lenses when easily accomplished. Irrigate burning or visually impaired eyes with water or normal saline for 10-15 minutes. Wash exposed skin with soap and water without scrubbing.", "Do not apply chemical neutralizers, creams, oils, or eyedrops."] },
          { level: "AEMT", actions: ["Treat wheezing, bronchospasm, or respiratory distress under the applicable respiratory protocol and obtain vascular access when clinically indicated."] },
          { level: "Paramedic", actions: ["Manage persistent respiratory, cardiac, ophthalmic, or neurologic complications and determine need for specialty consultation or destination."] },
        ],
      },
      {
        title: "Conducted-Energy Weapon Exposure",
        summary: "Assess the patient and associated trauma before addressing probes.",
        levels: [
          { level: "EMT", actions: ["Confirm the device has been rendered safe by law enforcement. Assess for fall, head, neck, penetrating, and other traumatic injury before probe removal.", "Remove only an uncomplicated superficial probe in soft tissue using the approved procedure. Clean and dress the wound and dispose of the probe as a contaminated sharp.", "Leave probes involving the eye or face, neck, genitalia, breast, joint, bone, or suspected major vessel in place; stabilize and transport."] },
          { level: "AEMT", actions: ["Perform all EMT care and treat associated injury, dehydration, or other clinical findings under the applicable protocol."] },
          { level: "Paramedic", actions: ["Obtain ECG and provide complaint-specific evaluation when the patient has chest pain, dyspnea, abnormal vital signs, altered mental status, significant intoxication or agitation, prolonged or repeated exposure, pregnancy, significant trauma, or another concerning finding.", "An awake, alert, asymptomatic patient with normal findings after a brief exposure does not require routine ECG, laboratory testing, prolonged observation, or automatic transport solely because of the electrical exposure."] },
        ],
      },
    ],
    indications: [
      "Any patient detained, arrested, incarcerated, or physically restrained by law enforcement.",
      "Any patient evaluated after chemical-irritant spray, conducted-energy weapon exposure, or force used during apprehension or custody.",
      "Any request for EMS assessment before admission to a jail or detention facility.",
    ],
    contraindications: [],
    assessment: [
      {
        title: "Medical assessment",
        items: [
          "Obtain the patient's complaint directly whenever possible and obtain a separate law-enforcement report describing the event, use of force, chemical exposure, CEW exposure duration or number of cycles, fall, struggle, and observed behavior.",
          "Perform a primary assessment, focused medical and trauma examination, and at least two complete vital-sign sets when feasible.",
          "Evaluate for hypoxia, hypoglycemia, hyperthermia, head injury, neck compression, intoxication or withdrawal, overdose, psychiatric emergency, severe agitation, respiratory disease, and cardiac symptoms.",
          "Do not attribute abnormal behavior solely to intoxication, psychiatric illness, resistance, or custody status.",
        ],
      },
      {
        title: "Restraint assessment",
        items: [
          "Ensure restraints do not compromise airway access, ventilation, circulation, neurologic assessment, patient positioning, or treatment.",
          "EMS personnel will not apply handcuffs or attach locking law-enforcement restraints to the stretcher or side rails.",
          "When locking law-enforcement restraints remain during transport, a law-enforcement officer capable of immediately releasing them and possessing the key must accompany the patient in the ambulance.",
          "Request immediate adjustment or removal of any restraint that interferes with necessary medical assessment or care.",
        ],
      },
      {
        title: "Transport indicators",
        items: [
          "Transport for an emergency condition, abnormal vital signs, altered mental status or impaired capacity, significant force or trauma, head injury, neck compression, hyperthermia, suspected ingestion, respiratory or cardiac symptoms, persistent chemical-irritant symptoms, high-risk CEW findings, severe agitation, or chemical restraint.",
          "Persistent eye pain, abnormal vision, corneal concern, wheezing, dyspnea, chest pain, syncope, focal neurologic findings, or worsening symptoms require transport.",
          "Do not delay care or transport to complete law-enforcement questioning, evidence collection, charging, or confinement paperwork.",
        ],
      },
      {
        title: "Required custody documentation",
        items: [
          "Document custody status; chief complaint; patient statements; capacity assessment; vital signs; examination; treatment; response; and disposition.",
          "Document the reported mechanism, force, restraint, chemical agent, CEW mode, number or duration of cycles when known, falls, and probe locations.",
          "Record restraint type, position, application time when known, serial airway and circulation checks, adjustments, and the officer accompanying the patient with immediate access to the key.",
          "Record names or identifying numbers of involved officers when available, receiving personnel, refusal discussion, signatures, Medical Control contact, and any assessment or treatment the patient declined.",
          "Clearly identify which information EMS directly observed and which information was reported by the patient, law enforcement, or witnesses.",
        ],
      },
    ],
    treatmentSteps: [
      "Treat immediate life threats and follow the applicable complaint-specific, trauma, airway, cardiac, toxicology, behavioral, pediatric, or obstetric protocol.",
      "Clinical needs determine the EMS transport recommendation and destination. Law enforcement retains responsibility for custody and scene security.",
      "Do not use this protocol as a fit-for-confinement examination. When a potentially serious injury or emergency condition exists, transport for appropriate medical evaluation.",
      "A capable adult who declines care may remain in law-enforcement custody only after the standard informed-refusal process is completed.",
      "A patient restrained because of agitation requires continuous direct observation during transport and reassessment after every intervention or change in condition.",
      "Release after chemical-irritant or brief CEW exposure is appropriate only when the patient is alert, has decision-making capacity, has normal vital signs and examination, has no transport indicator, and completes the applicable refusal or non-transport documentation.",
      "Provide an early receiving-facility report describing custody status, restraints, significant force, exposure, findings, treatment, and safety considerations.",
    ],
    medications: [
      {
        name: "Midazolam",
        dose: "Per Agitation protocol",
        notes: ["Paramedic only for agitation when indicated.", "Continuous airway and cardiac monitoring required."],
      },
      {
        name: "Ketamine",
        dose: "Per Agitation protocol",
        notes: ["Paramedic only for agitation when indicated.", "Continuous airway and cardiac monitoring required."],
      },
    ],
    warnings: [
      "Never use EMS restraints, equipment, medications, or procedures solely for punishment, law-enforcement convenience, interrogation, or evidence collection.",
      "Never transport a patient prone, hog-tied, sandwiched between backboards or mattresses, or positioned in a manner that compromises airway, breathing, circulation, or access to care.",
      "Do not place a surgical mask, oxygen mask, or spit-protection device in a manner that obstructs the airway, impairs ventilation, or prevents continuous observation.",
      "A badge, handcuffs, intoxication, or apparent behavioral disturbance does not exclude serious illness or injury.",
    ],
    clinicalPearls: [
      "Use calm communication, explain each medical action, preserve dignity, and minimize the number of personnel speaking to an agitated patient.",
      "Distinguish in the PCR between findings directly observed by EMS and events reported by the patient, officers, or witnesses.",
      "Simple brief CEW exposure in an otherwise normal patient rarely causes a clinically important electrical injury; associated trauma, struggle, intoxication, hyperthermia, and agitation often determine risk.",
      "Chemical-irritant symptoms usually improve after removal from exposure and decontamination, but persistent ocular or respiratory symptoms require further evaluation.",
    ],
    specialPopulations: [
      {
        title: "Pediatrics",
        items: ["Use pediatric protocols for patients younger than 16 years. A parent or legal guardian ordinarily provides consent or refusal unless another legal exception applies; custody status does not change pediatric clinical care."],
      },
      {
        title: "Pregnancy",
        items: [
          "For a known pregnant inmate in correctional custody, use the least restrictive restraint and request removal whenever the restraint interferes with medical assessment, treatment, positioning, or transport.",
          "Do not restrain the patient's hands behind her back. During labor or delivery, do not use restraints around the ankles, legs, or waist.",
          "Under Tennessee Code § 41-51-202, a healthcare professional responsible for the inmate's health and safety may request that correctional restraints not be used or be removed.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — SOP 604 Patient Refusal and SOP 704 Physical Restraint.",
      "Tennessee Public Chapter 751, effective July 1, 2026 — medical attention for arrestees before jail acceptance.",
      "Tennessee Code § 41-51-202 — use of restraints on a pregnant inmate.",
      "National Association of EMS Physicians, International Association of Fire Chiefs, and International Association of Chiefs of Police — Best Practices for Collaboration During Acute Behavioral Emergencies, 2024.",
      "American Academy of Emergency Medicine — Evaluation After Conducted Energy Weapon Activation.",
      "Centers for Disease Control and Prevention — Riot Control Agents and Chemical Decontamination.",
      "North Carolina College of Emergency Physicians UP-12 Police Custody source protocol retained for historical comparison.",
    ],
    sourcePdf: "/protocols/claiborne/up-12-police-custody-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 10, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director content decisions approved August 10, 2026.",
      "Coordinate final operational language with the Claiborne County EMS restraint policy and joint law-enforcement transport policy before system-wide clinical release.",
    ],
  },
  {
    id: "up-13",
    title: "Seizure",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Prioritize patient protection, airway and ventilation support, rapid recognition of convulsive status epilepticus, timely anticonvulsant administration, and identification of reversible causes.",
      "Convulsive status epilepticus is continuous generalized seizure activity lasting 5 minutes or longer, or recurrent seizures without recovery to baseline between events.",
      "Treat the seizure while evaluating for hypoxia, hypoglycemia, cardiac arrest, trauma, stroke, pregnancy or postpartum eclampsia, infection, toxins, withdrawal, and medication nonadherence.",
    ],
    flow: [
      { title: "Protect + Assess", text: "Prevent injury • check pulse • airway position • suction • oxygen or BVM when indicated", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Status Epilepticus?", text: "Generalized seizure ≥5 minutes • unknown prolonged duration • recurrent without recovery", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Glucose + Reversible Causes", text: "Check glucose without delaying anticonvulsant • treat hypoglycemia under UP-4", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Midazolam", text: "Adult: 10 mg IM/IN or 5 mg IV/IO • Pediatric: weight-based • maximum total 10 mg", levels: ["Paramedic"], tone: "urgent" },
      { title: "Still Seizing?", text: "Adult: ketamine 1 mg/kg IV/IO/IM, max 100 mg • Pediatric: contact Medical Control", levels: ["Paramedic", "Medical Control"], tone: "decision" },
      { title: "Continuous Monitoring", text: "Cardiac monitor • SpO₂ • waveform EtCO₂ after medication • airway and BVM readiness", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Reassess + Transport", text: "Neurologic recovery • trauma • pregnancy/postpartum • fever • toxin • stroke • document times and doses", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      {
        title: "Provider Actions",
        summary: "Treat status epilepticus promptly while supporting oxygenation and ventilation.",
        levels: [
          { level: "EMT", actions: ["Protect the patient from injury, loosen restrictive clothing, position laterally when feasible, suction as needed, and provide oxygen or BVM ventilation when clinically indicated.", "Check pulse and rhythm promptly because brief seizure-like activity may occur at the onset of cardiac arrest.", "Obtain glucose without delaying indicated anticonvulsant administration; treat hypoglycemia under UP-4.", "Determine seizure onset, duration, number of events, recovery between events, and medications given before EMS arrival."] },
          { level: "AEMT", actions: ["Perform all EMT care. Establish IV/IO access when clinically useful, but do not delay IM or IN midazolam while attempting vascular access.", "Treat hypoglycemia under UP-4, assist ventilation, trend vital signs, and support continuous monitoring and rapid transport."] },
          { level: "Paramedic", actions: ["Perform all prior care. Administer midazolam for convulsive status epilepticus or recurrent seizures without recovery.", "For persistent adult seizure after the adequate midazolam regimen, administer ketamine 1 mg/kg IV/IO or IM, maximum 100 mg.", "For pediatric ketamine, contact Medical Control for authorization and dosing.", "Prepare for respiratory depression, assisted ventilation, and advanced airway management after anticonvulsant medication."] },
        ],
      },
      {
        title: "Adult Anticonvulsant Pathway",
        summary: "Use an adequate early dose and do not delay treatment for vascular access.",
        levels: [
          { level: "EMT", actions: ["Continue patient protection, airway positioning, suction, oxygenation, ventilation, glucose assessment, and preparation for medication administration."] },
          { level: "AEMT", actions: ["Obtain IV/IO access when it can be accomplished without delaying anticonvulsant treatment."] },
          { level: "Paramedic", actions: ["Without established IV/IO access: midazolam 10 mg IM is preferred. Midazolam 10 mg IN, divided between nostrils, is an alternative when IM administration is impractical.", "With established IV/IO access: midazolam 5 mg IV/IO; repeat 5 mg once after 5 minutes if seizure continues. Maximum total EMS midazolam dose is 10 mg.", "If seizure persists after the adequate midazolam regimen: ketamine 1 mg/kg IV/IO or IM once, maximum 100 mg. Continue cardiac monitoring, SpO₂, waveform EtCO₂, and immediate airway and ventilation readiness."] },
        ],
      },
      {
        title: "Pediatric Anticonvulsant Pathway",
        summary: "Pediatric patients are younger than 16 years; use actual or length-based weight.",
        levels: [
          { level: "EMT", actions: ["Use pediatric airway equipment and length-based resources. Identify prescribed rescue medication and the exact dose, route, and time given before EMS arrival."] },
          { level: "AEMT", actions: ["Perform all EMT care and obtain IV/IO access when it will not delay anticonvulsant treatment."] },
          { level: "Paramedic", actions: ["Midazolam IM or IN: 0.2 mg/kg, maximum single dose 10 mg.", "Midazolam IV/IO: 0.1 mg/kg, maximum single dose 5 mg.", "May repeat once after 5 minutes if seizure continues. Maximum total midazolam is 0.4 mg/kg, not to exceed 10 mg.", "Count prescribed rescue benzodiazepine administered before EMS arrival toward the maximum of two total benzodiazepine doses during the episode.", "For seizure persisting after the adequate benzodiazepine regimen, contact Medical Control before pediatric ketamine administration."] },
        ],
      },
    ],
    indications: [
      "Active generalized or focal seizure.",
      "Convulsive seizure lasting 5 minutes or longer, unknown prolonged duration, or recurrent seizures without return to baseline.",
      "Postictal altered mental status requiring evaluation for injury, reversible cause, or incomplete neurologic recovery.",
    ],
    contraindications: [],
    assessment: [
      {
        title: "History",
        items: [
          "Document exact seizure onset time, duration, type, number of seizures, recovery between events, and baseline neurologic status.",
          "Ask about previous seizures, prescribed antiseizure medications, adherence, recent dose changes, prescribed rescue medication, and all medications administered before EMS arrival.",
          "Assess for pregnancy and postpartum status, trauma, diabetes, fever or infection, alcohol or sedative withdrawal, medication or toxin exposure, overdose, headache, stroke symptoms, and recent illness.",
        ],
      },
      {
        title: "Examination",
        items: [
          "Assess airway, ventilation, oxygenation, circulation, pulse, mental status, pupils, gaze or eye deviation, focal movement, symmetry, and postictal neurologic recovery.",
          "Examine for head or neck injury, tongue or oral trauma, active bleeding, incontinence, hyperthermia, meningismus, rash, and evidence of ingestion or injection.",
          "Obtain glucose in every patient when feasible. Obtain temperature when fever, infection, hyperthermia, or pediatric febrile seizure is possible.",
          "Persistent unilateral weakness, aphasia, gaze deviation, or another focal deficit beyond the expected postictal period requires stroke and intracranial-emergency evaluation.",
        ],
      },
      {
        title: "Monitoring",
        items: [
          "Use continuous cardiac monitoring and SpO₂ for status epilepticus, recurrent seizure, abnormal vital signs, or medication administration.",
          "Apply waveform EtCO₂ after midazolam or ketamine and whenever ventilation is impaired or assisted.",
          "Obtain a 12-lead ECG when a cardiac cause, syncope, toxin, overdose, electrolyte disturbance, or abnormal rhythm is suspected; it is not required for every uncomplicated seizure.",
          "Repeat complete vital signs, respiratory assessment, mental status, and neurologic examination after seizure cessation and every medication dose.",
        ],
      },
    ],
    treatmentSteps: [
      "Protect the patient from injury without forcibly restraining convulsions. Never place an object, medication, finger, or bite block in the mouth during active seizure.",
      "Position the airway, suction as needed, and provide oxygen or assisted ventilation according to the patient's clinical condition.",
      "Check pulse and rhythm immediately when the presentation could represent cardiac arrest.",
      "Check glucose early, but do not delay midazolam during convulsive status epilepticus. Treat confirmed hypoglycemia under UP-4.",
      "Administer the age-appropriate midazolam regimen for seizure lasting 5 minutes or longer, unknown prolonged duration, recurrent seizure without recovery, or earlier when unstable airway, breathing, or circulation makes continued seizure immediately dangerous.",
      "For adult seizure persisting after the adequate midazolam regimen, administer ketamine 1 mg/kg IV/IO or IM, maximum 100 mg. Pediatric ketamine requires Medical Control authorization and dosing.",
      "Treat pregnancy or postpartum seizure under the obstetric/eclampsia protocol, trauma under the appropriate trauma protocol, and suspected toxin or withdrawal under the applicable toxicology protocol.",
      "Transport promptly with continuous reassessment and early receiving-facility notification for ongoing or recurrent seizure, incomplete recovery, or any high-risk feature.",
    ],
    medications: [
      {
        name: "Midazolam — Adult",
        dose: "10 mg IM preferred without IV/IO; 10 mg IN alternative; or 5 mg IV/IO when access is established",
        notes: [
          "For IV/IO administration, repeat 5 mg once after 5 minutes if seizure continues.",
          "Maximum total EMS midazolam dose: 10 mg.",
          "Paramedic only.",
        ],
      },
      {
        name: "Midazolam — Pediatric",
        dose: "0.2 mg/kg IM/IN, max 10 mg; or 0.1 mg/kg IV/IO, max 5 mg",
        notes: [
          "May repeat once after 5 minutes if seizure continues.",
          "Maximum total: 0.4 mg/kg, not to exceed 10 mg.",
          "Count prescribed rescue benzodiazepine given before EMS arrival toward the two-dose maximum.",
          "Paramedic only.",
        ],
      },
      {
        name: "Ketamine — Adult Refractory Seizure",
        dose: "1 mg/kg IV/IO or IM once; maximum 100 mg",
        notes: [
          "Use for seizure persisting after the adequate midazolam regimen.",
          "Continuous cardiac monitoring, SpO₂, waveform EtCO₂, and airway and ventilation readiness are required.",
          "Paramedic only.",
        ],
      },
      {
        name: "Ketamine — Pediatric",
        dose: "Contact Medical Control for authorization and dosing",
        notes: [
          "Use only for seizure persisting after the adequate benzodiazepine regimen.",
          "Continuous cardiac monitoring, SpO₂, waveform EtCO₂, and airway and ventilation readiness are required.",
        ],
      },
    ],
    warnings: [
      "Do not forcibly restrain convulsions and do not place anything in the patient's mouth.",
      "Do not delay an indicated full anticonvulsant dose while attempting IV or IO access or obtaining glucose.",
      "Benzodiazepines and ketamine may produce apnea, hypoventilation, or airway obstruction; maintain immediate BVM, suction, and advanced-airway readiness.",
      "Brief seizure-like activity may occur at the onset of ventricular fibrillation or ventricular tachycardia; confirm pulse and rhythm.",
      "Postictal altered mental status does not exclude hypoglycemia, hypoxia, head injury, stroke, intoxication, infection, or eclampsia.",
    ],
    clinicalPearls: [
      "Most isolated seizures stop within 1-2 minutes. A seizure lasting 5 minutes or recurrent seizures without recovery should be treated as status epilepticus.",
      "An adequate early benzodiazepine dose is more effective than several delayed, partial doses.",
      "Document the exact time seizure activity began, medication administration times, observed cessation, recurrence, and return to baseline.",
      "Postictal agitation should prompt reassessment for hypoxia, hypoglycemia, injury, hyperthermia, intoxication, and other medical causes before behavioral treatment.",
      "A focal deficit may be postictal, but persistent or unexplained focal findings require stroke or intracranial-emergency evaluation.",
    ],
    specialPopulations: [
      {
        title: "Pregnancy and postpartum",
        items: [
          "Treat seizure after 20 weeks of pregnancy or within 6 weeks postpartum as eclampsia until proven otherwise.",
          "Follow the obstetric/eclampsia protocol; magnesium sulfate is the primary anticonvulsant for suspected eclampsia.",
          "Do not allow benzodiazepine or ketamine administration to replace indicated magnesium therapy.",
        ],
      },
      {
        title: "Pediatrics",
        items: [
          "Use pediatric protocols for patients younger than 16 years and calculate doses from actual or length-based weight.",
          "A first febrile seizure, prolonged or recurrent febrile seizure, incomplete recovery, abnormal examination, or age outside the expected simple-febrile-seizure range requires transport.",
          "Remove excess clothing and treat fever under the fever protocol after stabilization; do not use ice-water immersion or delay seizure treatment for cooling.",
        ],
      },
      {
        title: "Refusal after a seizure",
        items: [
          "Transport is required for first seizure, status or recurrent seizure, incomplete return to baseline, abnormal vital signs or glucose, injury, fever, pregnancy or postpartum state, persistent neurologic deficit, suspected overdose or withdrawal, respiratory compromise, or any EMS midazolam or ketamine administration.",
          "A capable adult with known epilepsy may refuse only after one typical seizure, complete return to neurologic baseline, normal examination, vital signs and glucose, no injury or concerning cause, no EMS anticonvulsant administration, and confirmation of responsible adult supervision.",
          "Complete the Refusal / Non-Transport protocol and document the patient's capacity, risks explained, responsible adult, and return precautions.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — SOP 315 Seizures.",
      "American Epilepsy Society — Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus in Children and Adults, 2016.",
      "RAMPART — Intramuscular versus Intravenous Therapy for Prehospital Status Epilepticus.",
      "Scheppke et al. — Prehospital Ketamine for Benzodiazepine-Resistant Status Epilepticus, Critical Care Explorations, 2024.",
      "Claiborne Covenant EMS Formulary — Midazolam and ketamine.",
      "North Carolina College of Emergency Physicians UP-13 Seizure source protocol retained for historical comparison.",
    ],
    sourcePdf: "/protocols/claiborne/up-13-seizure-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 10, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director content decisions approved August 10, 2026.",
      "Pediatric ketamine requires Medical Control authorization and dosing.",
      "Final system-wide clinical release remains pending completion of the full Claiborne protocol reconciliation.",
    ],
  },
  {
    id: "up-14",
    title: "Suspected Stroke",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Treat every acute focal neurologic deficit or sudden unexplained neurologic change as a time-critical stroke until proven otherwise.",
      "Use the Cincinnati Prehospital Stroke Scale for recognition and C-STAT for stroke severity and suspected large-vessel occlusion.",
      "Record the exact last-known-well time, symptom-discovery time, baseline neurologic function, and witness contact information.",
    ],
    flow: [
      { title: "Recognize Stroke", text: "Cincinnati screen • posterior-circulation warning signs • exact last known well", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Complete C-STAT", text: "Gaze 2 • LOC questions + commands 1 • arm weakness 1 • score ≥2 suggests LVO", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Glucose + Mimics", text: "Check glucose • treat hypoglycemia under UP-4 • repeat neurologic examination", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Protect Brain + Airway", text: "NPO • manage secretions • protect affected side • oxygen only for hypoxemia", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Stroke Alert + Destination", text: "Follow current Claiborne Stroke Destination Plan • consider C-STAT and transport time", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Monitor + Access", text: "Cardiac monitor • 12-lead if no delay • one IV preferred • NS TKO", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Rapid Transport", text: "Scene target ≤15 minutes • serial neurologic exams • transmit stroke report", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      {
        title: "Provider Actions",
        summary: "Recognize stroke, determine timing and severity, protect the airway, and transport rapidly.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Perform the Cincinnati Prehospital Stroke Scale and document facial droop, arm drift, and speech findings.",
              "Complete and document C-STAT when stroke is suspected. Check glucose and treat hypoglycemia under UP-4.",
              "Determine exact last known well, symptom-discovery time, baseline function, witness contact information, and current anticoagulant or antiplatelet use.",
              "Keep the patient NPO, protect the affected side, manage secretions, provide oxygen only for hypoxemia, and ventilate with BVM when indicated.",
              "Activate the stroke alert and begin transport according to the current Claiborne Stroke Destination Plan.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Perform all EMT care. Establish one IV when it can be accomplished without delaying transport.",
              "Administer normal saline at TKO. Give fluid only for hypotension and reassess for pulmonary edema or volume overload.",
              "Apply continuous cardiac monitoring when available and support serial vital signs and neurologic examinations.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior care. Obtain a 12-lead ECG when it will not delay transport, particularly when atrial fibrillation or another cardiac cause is suspected.",
              "Manage airway or ventilation failure and use waveform EtCO₂ whenever ventilation is impaired, assisted, or an advanced airway is placed.",
              "Repeat an extreme blood pressure manually. For SBP ≥220 mm Hg or DBP ≥120 mm Hg, contact Medical Control without delaying transport; do not routinely lower blood pressure in the field.",
              "Coordinate early destination notification and transmit the complete stroke report, including C-STAT score and anticoagulant or antiplatelet last-dose information.",
            ],
          },
        ],
      },
      {
        title: "C-STAT Stroke Severity",
        summary: "Maximum score 4; a score of 2 or greater suggests possible large-vessel occlusion.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Conjugate gaze deviation: 2 points.",
              "Incorrectly answers at least one orientation question—age or current month—and fails at least one command—close eyes or open and close hand: 1 point.",
              "Cannot hold either arm up for 10 seconds: 1 point.",
              "Document the individual findings and total C-STAT score. A low score does not exclude stroke or eliminate the need for stroke-system transport.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Confirm the documented C-STAT findings during reassessment and report any improvement or deterioration.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Use C-STAT severity with the current Claiborne Stroke Destination Plan and estimated transport time; do not use the score alone to exclude a patient from stroke activation.",
            ],
          },
        ],
      },
      {
        title: "Medication and Bleeding-Risk History",
        summary: "Identify the exact medication, prescribed dose, and last dose time when known.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Anticoagulants: warfarin (Coumadin), apixaban (Eliquis), rivaroxaban (Xarelto), dabigatran (Pradaxa), edoxaban (Savaysa), enoxaparin (Lovenox), and heparin injections or infusion.",
              "Antiplatelet medications: aspirin, clopidogrel (Plavix), ticagrelor (Brilinta), prasugrel (Effient), and aspirin/dipyridamole (Aggrenox).",
              "Bring medication containers or an accurate medication list when available, but do not delay transport.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Confirm medication name, dose, indication, exact last dose time, missed doses, and any recent bleeding, surgery, trauma, or anticoagulant reversal.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Include anticoagulant and antiplatelet details in the stroke alert and receiving-facility report because they may affect thrombolysis and hemorrhage treatment decisions.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Acute facial droop, unilateral weakness or numbness, speech or language disturbance, gaze deviation, visual loss, or another focal neurologic deficit.",
      "Sudden unexplained ataxia, severe vertigo, diplopia, dysarthria, unilateral hearing loss, persistent vomiting, or other possible posterior-circulation symptom.",
      "Resolved focal neurologic symptoms or suspected transient ischemic attack.",
      "Pediatric patient with a sudden focal neurologic deficit or unexplained acute neurologic change.",
    ],
    contraindications: [],
    assessment: [
      {
        title: "Time and Baseline",
        items: [
          "Record exact last known well, exact symptom-discovery time, and the time EMS first assessed the patient.",
          "For a wake-up stroke, last known well is the last time the patient was observed neurologically normal—not the time symptoms were discovered.",
          "Document baseline speech, cognition, mobility, dominant hand, functional status, and preexisting neurologic deficits.",
          "Obtain the witness or caregiver name and telephone number. Bring the witness when practical without delaying transport.",
          "Do not exclude stroke activation solely because the last-known-well time exceeds 6 hours or is unknown.",
        ],
      },
      {
        title: "Neurologic Examination",
        items: [
          "Perform and document the Cincinnati screen and C-STAT. Repeat after glucose correction and with any clinical change.",
          "Assess pupils, gaze, facial symmetry, speech, language, arm and leg strength, sensation, coordination, gait only when safe, and level of consciousness.",
          "A negative Cincinnati screen does not exclude posterior-circulation stroke. Evaluate sudden severe dizziness or vertigo, ataxia, diplopia, dysarthria, visual loss, unilateral hearing loss, and persistent vomiting.",
          "Consider seizure or Todd paralysis, hypoglycemia, migraine, intoxication or overdose, trauma, infection, and other stroke mimics without delaying stroke-system transport for persistent focal deficits.",
        ],
      },
      {
        title: "Medication and Bleeding History",
        items: [
          "Document all current medications, with special attention to anticoagulants and antiplatelet medications.",
          "For warfarin, apixaban, rivaroxaban, dabigatran, edoxaban, enoxaparin, or heparin, record the prescribed dose and exact last dose time when known.",
          "For aspirin, clopidogrel, ticagrelor, prasugrel, or aspirin/dipyridamole, record the prescribed dose and exact last dose time when known.",
          "Ask about prior intracranial hemorrhage, recent surgery or invasive procedure, recent trauma, active bleeding, known bleeding disorder, and recent anticoagulant reversal.",
        ],
      },
      {
        title: "Monitoring",
        items: [
          "Obtain glucose and at least two complete sets of vital signs when feasible without delaying transport.",
          "Use continuous cardiac monitoring and obtain a 12-lead ECG when it will not delay transport.",
          "Use continuous SpO₂. Apply waveform EtCO₂ whenever ventilation is impaired or assisted or an advanced airway is placed.",
          "Repeat the neurologic examination and C-STAT during transport and after every significant clinical change.",
        ],
      },
    ],
    treatmentSteps: [
      "Support airway and ventilation, suction as needed, and keep the patient NPO. Elevate the head approximately 30 degrees when tolerated and when hypotension or another contraindication is absent.",
      "Provide oxygen only for hypoxemia and titrate to maintain SpO₂ at or above 94%. Avoid unnecessary hyperoxia.",
      "Check glucose immediately. Treat confirmed hypoglycemia under UP-4 and repeat the neurologic examination; persistent focal findings remain a stroke alert.",
      "Activate the stroke alert early and transport according to the current Claiborne Stroke Destination Plan, considering C-STAT severity and estimated transport time.",
      "Target a scene time of 15 minutes or less. Do not delay transport for nonessential IV attempts, ECG acquisition, blood collection, or an exhaustive mimic investigation.",
      "Establish one IV when feasible without delaying transport. Use normal saline at TKO and give fluid only for hypotension.",
      "Do not routinely lower blood pressure in suspected stroke. Repeat extreme readings manually and contact Medical Control for SBP ≥220 mm Hg or DBP ≥120 mm Hg without delaying transport.",
      "Transmit glucose, exact last known well, symptom-discovery time, Cincinnati findings, individual C-STAT findings and total score, baseline function, anticoagulant and antiplatelet use with last dose, and witness contact information.",
      "Transport patients with resolved symptoms or suspected transient ischemic attack because symptom resolution does not eliminate the risk of completed or recurrent stroke.",
    ],
    medications: [],
    warnings: [
      "Do not administer aspirin, an anticoagulant, a thrombolytic, or an antihypertensive medication for undifferentiated suspected stroke under this protocol.",
      "Do not administer nitroglycerin solely to lower blood pressure in suspected stroke.",
      "Naloxone is indicated only when opioid exposure and clinically significant respiratory depression are suspected; do not use it empirically for an isolated focal neurologic deficit.",
      "Do not delay transport for nonessential procedures, a second IV, blood collection, or complete resolution of diagnostic uncertainty.",
      "A normal Cincinnati screen, low C-STAT score, symptom improvement, young age, or last-known-well time beyond 6 hours does not exclude a treatment-eligible stroke.",
    ],
    clinicalPearls: [
      "Time is brain, but modern stroke treatment decisions are not limited to the traditional 6-hour window; accurate timing and rapid transport remain essential.",
      "C-STAT is a severity and destination-support tool, not a rule-out test for stroke.",
      "Posterior-circulation stroke may present without facial droop or arm weakness and may be missed by common anterior-circulation screens.",
      "Hypoglycemia may mimic stroke. Correct the glucose abnormality and repeat the examination, but continue the stroke alert when focal deficits persist.",
      "Avoid hypotension. Routine prehospital blood-pressure reduction may reduce cerebral perfusion and should not be performed for uncomplicated suspected stroke.",
      "Medication names alone are insufficient: the exact last dose time of an anticoagulant may directly affect receiving-facility treatment.",
    ],
    specialPopulations: [
      {
        title: "Pediatrics",
        items: [
          "Use pediatric protocols for patients younger than 16 years and dose any required supportive medication by actual or length-based weight.",
          "Stroke occurs in children. Sudden focal weakness, facial asymmetry, speech change, seizure with persistent focal deficit, severe headache, or unexplained acute neurologic change requires stroke-capable evaluation.",
          "Do not delay transport while attempting to prove an alternative pediatric diagnosis.",
        ],
      },
      {
        title: "Posterior-circulation stroke",
        items: [
          "Maintain suspicion with sudden severe vertigo or dizziness, inability to walk, marked ataxia, diplopia, dysarthria, visual loss, unilateral hearing loss, persistent vomiting, or crossed neurologic findings.",
          "A negative Cincinnati screen does not exclude posterior stroke. Activate the stroke system when the overall examination and onset are concerning.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — SOP 304 CVA / Stroke.",
      "American Heart Association / American Stroke Association — 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke.",
      "McMullan et al. — Prospective Prehospital Evaluation of the Cincinnati Stroke Triage Assessment Tool, Prehospital Emergency Care, 2017.",
      "Claiborne EMS UP-4 Diabetic / Glucose Emergencies protocol.",
      "North Carolina College of Emergency Physicians UP-14 Suspected Stroke source protocol retained for historical comparison.",
    ],
    sourcePdf: "/protocols/claiborne/up-14-suspected-stroke-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 10, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director content decisions approved August 10, 2026.",
      "Final Claiborne Stroke Destination Plan and facility-specific destination rules remain pending later review.",
      "Final system-wide clinical release remains pending completion of the full Claiborne protocol reconciliation.",
    ],
  },
  {
    id: "up-15",
    title: "Suspected Sepsis",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Recognize suspected infection with evolving organ dysfunction, hypoperfusion, or shock and begin time-sensitive supportive care.",
      "Use a standardized adult or pediatric sepsis screen, but do not use a single vital sign, fever, qSOFA, or EtCO₂ threshold to rule sepsis in or out.",
      "Activate a Sepsis Alert for suspected infection with organ dysfunction, hypotension, or abnormal perfusion.",
    ],
    flow: [
      { title: "Suspect Infection", text: "History • source clues • temperature may be high, normal, or low", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Screen for Sepsis", text: "Abnormal physiology • altered mental status • hypotension • hypoxia • poor perfusion", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Sepsis Alert?", text: "Suspected infection plus organ dysfunction, hypotension, or hypoperfusion", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Support + Monitor", text: "Infection precautions • glucose • temperature • SpO₂ • cardiac monitor • ECG if no delay", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Crystalloid + Reassess", text: "Adult 500 mL • high overload risk 250 mL • pediatric 10–20 mL/kg", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Persistent Shock?", text: "Adult norepinephrine • pediatric epinephrine or norepinephrine after Medical Control", levels: ["Paramedic", "Medical Control"], tone: "decision" },
      { title: "Rapid Transport", text: "Early notification • reassess unstable patient every 3–5 minutes • document response", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      {
        title: "Provider Actions",
        summary: "Recognize sepsis early, support oxygenation and perfusion, and transport without delay.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Use appropriate standard, contact, droplet, or airborne precautions based on the suspected infection and exposure risk.",
              "Assess airway, breathing, circulation, mental status, skin temperature and perfusion, and possible source of infection.",
              "Obtain temperature, glucose, SpO₂, and complete vital signs. Apply oxygen only when indicated and assist ventilation when needed.",
              "Identify adult or pediatric sepsis-screen findings, activate a Sepsis Alert when criteria are met, and initiate rapid transport.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Perform all EMT care. Establish IV access; use IO access when shock is present and IV access cannot be obtained promptly.",
              "For adult hypotension or hypoperfusion, administer LR or normal saline in 500 mL boluses, or 250 mL increments when volume-overload risk is present.",
              "For pediatric shock, administer LR or normal saline 10–20 mL/kg per bolus and reassess after every bolus.",
              "Apply continuous cardiac monitoring when available and repeat complete vital signs and perfusion assessment after each intervention.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior care. Obtain a 12-lead ECG when it will not delay resuscitation or transport.",
              "For persistent adult septic shock after an initial crystalloid bolus, or concurrently with fluid in profound unstable shock, start norepinephrine.",
              "For persistent pediatric septic shock, contact Medical Control and initiate epinephrine for low-output or cold shock or norepinephrine for vasodilatory or warm shock.",
              "Use waveform EtCO₂ when ventilation is impaired or assisted or an advanced airway is placed; do not use an EtCO₂ threshold as a sepsis-screen criterion.",
            ],
          },
        ],
      },
      {
        title: "Adult Sepsis Screen",
        summary: "Suspected infection plus abnormal physiology or organ dysfunction; clinical concern may override the screen.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Suspected infection plus two or more screening abnormalities: temperature ≥38°C or ≤36°C, heart rate >90/min, or respiratory rate >20/min.",
              "Alternatively, suspected infection plus any organ dysfunction: new altered mental status, SBP ≤100 mm Hg, MAP <65 mm Hg, SpO₂ <92% or new oxygen requirement, delayed capillary refill, mottling, or other abnormal perfusion.",
              "Fever is not required. Older adults and immunocompromised patients may be normothermic or hypothermic.",
              "Do not use qSOFA alone and do not use EtCO₂ <25 mm Hg as a sepsis-screen criterion.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "A positive physiology screen without organ dysfunction identifies possible infection and requires close reassessment. Activate the Sepsis Alert when organ dysfunction, hypotension, or hypoperfusion is present.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Evaluate for alternative causes of shock or abnormal vital signs, including hemorrhage, cardiogenic shock, pulmonary embolism, anaphylaxis, toxicologic causes, heat illness, adrenal crisis, and medication effects, without delaying resuscitation.",
            ],
          },
        ],
      },
      {
        title: "Adult Hemodynamic Support",
        summary: "Give individualized crystalloid boluses and begin norepinephrine early when shock persists.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Position for perfusion and respiratory comfort, prevent heat loss, and reassess mental status, skin perfusion, and blood pressure frequently.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "LR is preferred when available; normal saline is acceptable.",
              "Administer 500 mL IV/IO and reassess blood pressure, MAP, mental status, capillary refill, lung sounds, and oxygen requirement.",
              "Additional crystalloid may be given toward 30 mL/kg for continuing hypotension or hypoperfusion.",
              "Use 250 mL increments for heart failure, renal failure, liver failure, pulmonary edema, or existing volume overload. Stop or reduce fluid for worsening respiratory status or pulmonary edema.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Norepinephrine: start 0.1 mcg/kg/min IV/IO and titrate to MAP ≥65 mm Hg or SBP ≥90 mm Hg; maximum 2 mcg/kg/min.",
              "Norepinephrine may be started after an initial crystalloid bolus when hypotension persists or concurrently with crystalloid in profound unstable shock.",
              "A proximal peripheral IV may be used. Confirm patency, inspect the site frequently, and do not delay norepinephrine solely to obtain central access.",
              "Continuous cardiac monitoring and frequent blood-pressure measurement are required during vasopressor infusion.",
            ],
          },
        ],
      },
      {
        title: "Pediatric Sepsis and Shock",
        summary: "Pediatric patients are younger than 16 years; recognize organ dysfunction because hypotension is a late finding.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Suspect pediatric sepsis with infection plus altered mental status, capillary refill >3 seconds, weak pulses, mottling, abnormal temperature, tachycardia or bradycardia, respiratory distress, hypoxemia, or hypotension.",
              "Pediatric hypotension: birth–28 days, SBP <60 mm Hg; 1–12 months, SBP <70 mm Hg; 1–10 years, SBP <70 plus twice the age in years; older than 10 years, SBP <90 mm Hg.",
              "Use pediatric airway equipment and actual or length-based weight. Do not apply the adult SIRS screen to pediatric patients.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Administer LR or normal saline 10–20 mL/kg IV/IO and reassess after every bolus.",
              "Repeat as needed for ongoing shock, generally not exceeding 40 mL/kg prehospital.",
              "Stop fluid boluses for resolved shock, pulmonary edema, new hepatomegaly, worsening oxygenation, or other evidence of fluid overload.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "For persistent pediatric shock, contact Medical Control and initiate epinephrine 0.05–0.1 mcg/kg/min for low-output or cold shock or norepinephrine 0.05–0.1 mcg/kg/min for vasodilatory or warm shock.",
              "Titrate the selected infusion to improving mental status, pulses, capillary refill, age-appropriate blood pressure, and other perfusion findings.",
              "Continuous cardiac monitoring, SpO₂, frequent blood-pressure measurement, and IV/IO-site assessment are required.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Suspected or confirmed infection with abnormal vital signs, new altered mental status, hypoxemia, abnormal perfusion, hypotension, or other organ dysfunction.",
      "Suspected septic shock with hypotension or hypoperfusion requiring fluid or vasopressor support.",
      "High-risk infection in an older adult, pediatric patient, immunocompromised patient, recently hospitalized patient, or patient with an indwelling vascular, urinary, or prosthetic device.",
    ],
    contraindications: [],
    assessment: [
      {
        title: "History and Source",
        items: [
          "Ask about onset and progression, fever or chills, cough, dyspnea, chest pain, dysuria, abdominal or flank pain, vomiting or diarrhea, headache or neck stiffness, rash, wounds, pressure injuries, recent surgery, and indwelling devices.",
          "Identify recent antibiotics, hospitalization, healthcare exposure, known resistant organisms, chemotherapy, transplant, immune suppression, diabetes, pregnancy or postpartum status, and sick contacts.",
          "Review medications that may blunt tachycardia or fever, including beta-blockers, antipyretics, corticosteroids, and immunosuppressants.",
        ],
      },
      {
        title: "Examination",
        items: [
          "Assess mental status, airway, work of breathing, lung sounds, pulse quality, skin temperature and color, capillary refill, mottling, edema, and urine output when known.",
          "Examine for pulmonary, urinary, abdominal, skin or soft-tissue, neurologic, device-related, postoperative, obstetric, or other potential infection sources.",
          "Obtain temperature, glucose, SpO₂, and complete vital signs. Calculate MAP when hypotension or shock is present.",
          "Obtain at least two complete vital-sign sets when feasible and reassess an unstable patient every 3–5 minutes.",
        ],
      },
      {
        title: "Monitoring and Diagnostics",
        items: [
          "Use continuous cardiac monitoring for a Sepsis Alert, shock, vasopressor administration, abnormal rhythm, or significant physiologic instability.",
          "Obtain a 12-lead ECG when clinically indicated and when it will not delay resuscitation or transport.",
          "Use waveform EtCO₂ only for impaired or assisted ventilation or advanced-airway monitoring; no EtCO₂ value is required for the sepsis screen.",
          "Blood tubes may be collected when available and coordinated with the receiving facility, but collection must not delay transport.",
        ],
      },
    ],
    treatmentSteps: [
      "Use infection precautions appropriate to the suspected disease and exposure risk.",
      "Support airway and ventilation. Titrate oxygen to SpO₂ 92–96%; target 88–92% in a patient with known chronic hypercapnic respiratory failure unless other clinical circumstances require a higher target.",
      "Check glucose and treat hypoglycemia under UP-4. Obtain temperature, but do not exclude sepsis when fever is absent.",
      "Activate a Sepsis Alert for suspected infection with organ dysfunction, hypotension, or hypoperfusion and notify the receiving facility early.",
      "For adult hypotension or hypoperfusion, give LR or normal saline 500 mL IV/IO and reassess; use 250 mL increments when volume-overload risk is present. Additional fluid may be given toward 30 mL/kg when clinically appropriate.",
      "For persistent adult septic shock, start norepinephrine 0.1 mcg/kg/min and titrate to MAP ≥65 mm Hg or SBP ≥90 mm Hg, maximum 2 mcg/kg/min. In profound unstable shock, norepinephrine may begin concurrently with initial crystalloid.",
      "For pediatric shock, give LR or normal saline 10–20 mL/kg IV/IO per bolus with reassessment after every bolus, generally not exceeding 40 mL/kg prehospital.",
      "For persistent pediatric shock, contact Medical Control and initiate epinephrine for low-output or cold shock or norepinephrine for vasodilatory or warm shock at the approved dose.",
      "Do not administer a prehospital antibiotic under this protocol. Piperacillin/tazobactam has been removed from the Claiborne formulary and no replacement sepsis antibiotic is approved.",
      "Transport rapidly, continue resuscitation en route, and reassess an unstable patient every 3–5 minutes.",
    ],
    medications: [
      {
        name: "Norepinephrine — Adult Septic Shock",
        dose: "Start 0.1 mcg/kg/min IV/IO; titrate to MAP ≥65 mm Hg or SBP ≥90 mm Hg; maximum 2 mcg/kg/min",
        notes: [
          "Start after an initial crystalloid bolus when hypotension persists, or concurrently with crystalloid in profound unstable shock.",
          "A proximal peripheral IV may be used with frequent patency and site assessment.",
          "Continuous cardiac monitoring and frequent blood-pressure measurement are required.",
          "Paramedic only.",
        ],
      },
      {
        name: "Epinephrine — Pediatric Low-Output / Cold Septic Shock",
        dose: "0.05–0.1 mcg/kg/min IV/IO infusion after Medical Control contact",
        notes: [
          "Titrate to improving mental status, pulses, capillary refill, age-appropriate blood pressure, and other perfusion findings.",
          "Continuous cardiac monitoring, SpO₂, frequent blood-pressure measurement, and IV/IO-site assessment are required.",
          "Paramedic only.",
        ],
      },
      {
        name: "Norepinephrine — Pediatric Vasodilatory / Warm Septic Shock",
        dose: "0.05–0.1 mcg/kg/min IV/IO infusion after Medical Control contact",
        notes: [
          "Titrate to improving mental status, pulses, capillary refill, age-appropriate blood pressure, and other perfusion findings.",
          "Continuous cardiac monitoring, SpO₂, frequent blood-pressure measurement, and IV/IO-site assessment are required.",
          "Paramedic only.",
        ],
      },
    ],
    warnings: [
      "Do not delay transport for IV attempts, ECG acquisition, blood collection, or completion of every possible diagnostic evaluation.",
      "Do not use qSOFA alone, fever alone, or an EtCO₂ threshold to exclude or confirm sepsis.",
      "Hypotension is a late and ominous finding in pediatric sepsis; treat abnormal perfusion before hypotension develops.",
      "Stop or reduce fluid administration for pulmonary edema, worsening oxygenation, new hepatomegaly, or other evidence of fluid overload.",
      "Do not administer piperacillin/tazobactam or another prehospital antibiotic under this protocol.",
      "Norepinephrine and epinephrine require continuous cardiac monitoring, frequent blood-pressure assessment, and careful IV/IO-site surveillance.",
    ],
    clinicalPearls: [
      "Sepsis is infection associated with life-threatening organ dysfunction. The term severe sepsis is not used in this protocol.",
      "Older adults, immunocompromised patients, and patients taking antipyretics or beta-blockers may lack fever or marked tachycardia.",
      "Capillary refill, mental status, pulse quality, skin findings, blood pressure, and response to a fluid bolus should be interpreted together.",
      "Balanced crystalloid is preferred when available, but appropriate resuscitation should not be delayed when only normal saline is available.",
      "Early norepinephrine may be safer than repeated large fluid boluses in patients at risk for pulmonary edema or volume overload.",
      "A positive screening tool supports recognition but does not replace clinical judgment or evaluation for alternative causes of shock.",
    ],
    specialPopulations: [
      {
        title: "Volume-overload risk",
        items: [
          "Use 250 mL adult fluid increments for heart failure, renal failure, liver failure, pulmonary edema, or existing volume overload.",
          "Reassess lung sounds, SpO₂, respiratory effort, edema, blood pressure, and perfusion after every bolus.",
          "Consider earlier norepinephrine rather than repeated crystalloid when hypotension persists and fluid tolerance is limited.",
        ],
      },
      {
        title: "Pediatrics",
        items: [
          "Use pediatric protocols for patients younger than 16 years and actual or length-based weight for all weight-based treatment.",
          "Do not rely on hypotension alone. Altered mental status, weak pulses, delayed capillary refill, mottling, and respiratory abnormalities may identify shock earlier.",
          "Limit prehospital crystalloid to repeated 10–20 mL/kg boluses with reassessment, generally not exceeding 40 mL/kg.",
        ],
      },
      {
        title: "Refusal / Non-Transport",
        items: [
          "Rapid transport is indicated for any Sepsis Alert or suspected septic shock.",
          "A patient with suspected infection plus organ dysfunction, hypotension, or abnormal perfusion should not be managed as a routine refusal.",
          "If a capable patient continues to refuse after risks and alternatives are explained, contact Medical Control and complete the Refusal / Non-Transport protocol with detailed documentation.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — SOP 410 Septic Shock and Sepsis Identification Tool.",
      "Surviving Sepsis Campaign — International Guidelines for Management of Sepsis and Septic Shock, 2026.",
      "Surviving Sepsis Campaign — International Guidelines for Management of Septic Shock and Sepsis-Associated Organ Dysfunction in Children, 2020.",
      "Society of Critical Care Medicine — International Consensus Criteria for Pediatric Sepsis and Septic Shock, 2024.",
      "Claiborne Covenant EMS Formulary — norepinephrine and epinephrine.",
      "North Carolina College of Emergency Physicians UP-15 Suspected Sepsis source protocol retained for historical comparison.",
    ],
    sourcePdf: "/protocols/claiborne/up-15-suspected-sepsis-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director content decisions approved August 11, 2026.",
      "Pediatric vasopressor initiation requires Medical Control contact.",
      "No prehospital antibiotic is authorized under this protocol.",
      "Final system-wide clinical release remains pending completion of the full Claiborne protocol reconciliation.",
    ],
  },
  {
    id: "up-16",
    title: "Syncope",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Syncope is abrupt, transient loss of consciousness and postural tone caused by temporary global cerebral hypoperfusion, followed by rapid spontaneous recovery.",
      "Near-syncope may carry similar risk and receives the same initial evaluation.",
      "Do not label persistent altered mental status, seizure, hypoglycemia, intoxication, stroke, or traumatic loss of consciousness as uncomplicated syncope.",
    ],
    flow: [
      { title: "Primary Assessment", text: "Airway • breathing • circulation • injury • hemorrhage • pregnancy • persistent instability", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Recovered to Baseline?", text: "Persistent altered mental status or focal deficit requires the appropriate emergency pathway", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Glucose + Cardiac Evaluation", text: "Glucose on every patient • 12-lead ECG • continuous cardiac monitoring", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "High-Risk Features?", text: "Exertional or supine • abrupt • cardiopulmonary symptoms • abnormal ECG • bleeding • abnormal vitals", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Treat Identified Cause", text: "Hypoglycemia • dysrhythmia • hemorrhage • shock • opioid respiratory depression • trauma", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Transport + Reassess", text: "Repeat vitals and ECG when indicated • monitor for recurrent symptoms • early notification", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      {
        title: "Provider Actions",
        summary: "Identify life threats and high-risk cardiac or systemic causes before considering benign syncope.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Assess airway, breathing, circulation, mental status, injury from the fall, possible hemorrhage, pregnancy, and persistent instability.",
              "Obtain glucose, SpO₂, two complete vital-sign sets when feasible, and a focused neurologic examination.",
              "Acquire and transmit a 12-lead ECG and apply continuous cardiac monitoring for every syncope or near-syncope patient.",
              "Give oxygen only for hypoxemia or respiratory distress and initiate rapid transport when any high-risk feature is present.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Perform all EMT care. Establish IV access when hypotension, poor perfusion, clear volume depletion, recurrent symptoms, or another high-risk finding is present.",
              "Administer LR or normal saline only for hypotension, poor perfusion, or clear volume depletion, using the approved adult or pediatric bolus.",
              "Monitor the rhythm continuously, repeat complete vital signs after intervention, and prepare for cause-specific treatment.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior care. Interpret the initial 12-lead ECG and repeat it for recurrent symptoms, rhythm change, chest discomfort, or a concerning initial tracing.",
              "Treat bradycardia, tachycardia, ischemia, shock, hypoglycemia, respiratory failure, or another identified cause under the applicable Claiborne protocol.",
              "Evaluate persistent altered mental status, focal neurologic findings, suspected seizure, bleeding, ectopic pregnancy, pulmonary embolism, aortic emergency, and toxicologic causes.",
            ],
          },
        ],
      },
      {
        title: "High-Risk Syncope",
        summary: "Any high-risk feature requires continuous monitoring and prompt emergency-department evaluation.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Syncope during exertion or while supine, or abrupt syncope without warning.",
              "Chest pain, dyspnea, palpitations, persistent headache, or recurrent symptoms.",
              "Persistent hypotension, hypoxia, bradycardia, tachycardia, abnormal perfusion, or failure to return completely to baseline.",
              "Known coronary disease, heart failure, cardiomyopathy, significant valvular disease, pacemaker, or implanted cardioverter-defibrillator.",
              "Family history of sudden unexplained death before age 50.",
              "GI bleeding, vaginal bleeding, abdominal or back pain, pregnancy, anticoagulant use, significant trauma, or focal neurologic deficit.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Establish vascular access when clinically indicated and transport without delaying for orthostatic vital signs or nonessential procedures.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Treat an abnormal rhythm or identified life threat under the applicable protocol and provide early receiving-facility notification.",
              "Concerning ECG findings include acute ischemia, significant bradycardia or tachycardia, high-grade AV block, ventricular dysrhythmia, prolonged QT, pre-excitation, Brugada pattern, or other new conduction abnormality.",
            ],
          },
        ],
      },
      {
        title: "Orthostatic Vital Signs",
        summary: "Orthostatic testing is optional and must not provoke injury or delay transport.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Consider only when the patient is stable, completely recovered, able to stand safely, and has no injury, pregnancy-related concern, or high-risk feature.",
              "A positive test is recurrent symptoms or a fall in SBP of at least 20 mm Hg or DBP of at least 10 mm Hg after standing.",
              "Stop immediately for dizziness, weakness, recurrent near-syncope, syncope, chest pain, dyspnea, or instability.",
              "Do not use normal orthostatic vital signs to exclude a serious cause and do not delay transport to obtain them.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "When testing is appropriate, ensure monitoring and immediate assistance are available before standing the patient.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Interpret orthostatic findings in the context of the full history, medication list, examination, ECG, glucose, and volume status.",
            ],
          },
        ],
      },
      {
        title: "Fluid Support",
        summary: "Fluids are for hypotension, poor perfusion, or clear volume depletion—not routine syncope treatment.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Position the patient safely, prevent recurrent falls, and reassess perfusion while vascular access is prepared when indicated.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Adult: LR or normal saline 500 mL IV/IO, then reassess.",
              "Heart failure, renal failure, liver failure, pulmonary edema, or volume-overload risk: use 250 mL increments.",
              "Pediatric patient younger than 16 years: LR or normal saline 10–20 mL/kg IV/IO, then reassess.",
              "Stop or reduce fluid for pulmonary edema, worsening oxygenation, or resolved hypotension and poor perfusion.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "If hypotension or poor perfusion persists, reassess for hemorrhagic, cardiogenic, distributive, obstructive, or toxicologic shock and transition to the appropriate shock pathway.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Syncope with transient loss of consciousness and postural tone followed by rapid spontaneous recovery.",
      "Near-syncope with transient lightheadedness, weakness, or impending loss of consciousness without complete loss of consciousness.",
      "Unexplained collapse with apparent spontaneous recovery when syncope remains possible.",
    ],
    contraindications: [],
    assessment: [
      {
        title: "Event History",
        items: [
          "Determine body position and activity at onset, prodrome, precipitating trigger, abruptness, duration, witnessed movements, color change, breathing, injuries, and time to complete recovery.",
          "Ask about exertion, standing, heat exposure, pain, emotional stress, urination, defecation, coughing, swallowing, dehydration, vomiting, diarrhea, and recent illness.",
          "Ask about chest pain, dyspnea, palpitations, headache, neck pain, abdominal or back pain, GI or vaginal bleeding, pregnancy possibility, and neurologic symptoms.",
          "Obtain cardiac, neurologic, seizure, bleeding, and thromboembolic history; family history of sudden death; and all medications, including antihypertensives, diuretics, QT-prolonging medications, and anticoagulants.",
        ],
      },
      {
        title: "Examination",
        items: [
          "Assess mental status and confirm complete return to neurologic baseline. Examine pupils, speech, gaze, facial symmetry, strength, sensation, and coordination when appropriate.",
          "Evaluate pulse rate and regularity, blood pressure, heart and lung findings, perfusion, hydration, abdominal or back tenderness, evidence of bleeding, and injury from the fall.",
          "Obtain glucose on every patient. Obtain temperature when infection or environmental illness is suspected.",
          "Evaluate pregnancy and postpartum status when applicable. Abdominal, pelvic, or back pain with syncope in a patient who may be pregnant requires urgent ectopic-pregnancy evaluation.",
        ],
      },
      {
        title: "Cardiac Monitoring",
        items: [
          "Acquire and transmit a 12-lead ECG and use continuous cardiac monitoring for every syncope or near-syncope patient.",
          "Repeat the ECG for recurrent symptoms, rhythm change, chest discomfort, or a concerning initial tracing.",
          "A single normal ECG or brief period of normal monitoring does not exclude intermittent dysrhythmia or another cardiac cause.",
          "Document monitor rhythm, ECG interpretation, recurrent symptoms, and any rhythm associated with those symptoms.",
        ],
      },
    ],
    treatmentSteps: [
      "Support airway and ventilation and provide oxygen only for hypoxemia or respiratory distress.",
      "Check glucose immediately and treat hypoglycemia under UP-4.",
      "Acquire and transmit a 12-lead ECG and maintain continuous cardiac monitoring.",
      "Assess and treat injury, hemorrhage, pregnancy-related emergency, dysrhythmia, ACS, pulmonary embolism, aortic emergency, seizure, stroke, sepsis, shock, or toxicologic cause under the applicable protocol.",
      "Administer naloxone only when opioid exposure and clinically significant respiratory depression are suspected; do not use naloxone empirically for isolated syncope.",
      "Give LR or normal saline only for hypotension, poor perfusion, or clear volume depletion: adult 500 mL; volume-overload risk 250 mL; pediatric 10–20 mL/kg. Reassess after every bolus.",
      "Do not perform routine orthostatic vital signs. When they are safe and clinically useful, stop immediately for recurrent symptoms or instability.",
      "Transport every high-risk, first unexplained, recurrent, injured, pregnant, anticoagulated, abnormal-vital-sign, abnormal-glucose, or abnormal-ECG patient with continuous reassessment.",
    ],
    medications: [],
    warnings: [
      "Do not assume benign vasovagal syncope until cardiac, hemorrhagic, obstetric, neurologic, metabolic, toxicologic, and traumatic causes have been considered.",
      "A normal ECG does not exclude intermittent dysrhythmia or cardiac syncope.",
      "Do not stand an unstable, injured, pregnant, anticoagulated, or high-risk patient for orthostatic vital signs.",
      "Do not give routine oxygen, IV fluid, aspirin, or naloxone solely because syncope occurred.",
      "Syncope during exertion or while supine is high risk and requires transport for cardiac evaluation.",
      "Persistent altered mental status or focal neurologic deficit is not uncomplicated syncope.",
    ],
    clinicalPearls: [
      "Near-syncope may carry risk similar to complete syncope and warrants the same initial evaluation.",
      "A detailed event history, examination, glucose, ECG, and risk assessment are more useful than routine indiscriminate testing.",
      "Brief myoclonic movements can occur during cerebral hypoperfusion. Persistent postictal confusion, prolonged convulsions, or lateral tongue injury increases concern for seizure.",
      "Isolated syncope without focal neurologic findings is not usually a stroke presentation; persistent focal findings require stroke evaluation.",
      "Syncope associated with dyspnea, unexplained hypoxemia, pleuritic pain, tachycardia, or thromboembolic risk requires consideration of pulmonary embolism.",
      "Abdominal or back pain, diminished pulses, bleeding, hypotension, or pregnancy may identify life-threatening occult hemorrhage or an aortic emergency.",
    ],
    specialPopulations: [
      {
        title: "Pediatrics and athletes",
        items: [
          "Pediatric patients are younger than 16 years and medication or fluid doses use actual or length-based weight.",
          "Exertional or supine syncope, chest pain, palpitations, abnormal ECG, congenital heart disease, or family history of sudden death is high risk.",
          "Do not permit return to sports or exertion. Transport for cardiac evaluation.",
        ],
      },
      {
        title: "Pregnancy and bleeding risk",
        items: [
          "Syncope with abdominal, pelvic, or back pain or vaginal bleeding in a patient who may be pregnant requires urgent evaluation for ectopic pregnancy or other hemorrhage.",
          "Anticoagulant use increases concern for occult bleeding and intracranial injury after a fall.",
          "Do not delay transport for orthostatic vital signs when bleeding, pregnancy complication, or significant trauma is possible.",
        ],
      },
      {
        title: "Refusal / Non-Transport",
        items: [
          "Transport is required for any high-risk feature, first unexplained or recurrent event, abnormal ECG, glucose or vital signs, injury, pregnancy, anticoagulant use, persistent symptoms, or incomplete return to baseline.",
          "A capable adult with a classic vasovagal trigger and prodrome, complete recovery, normal examination, glucose, vital signs, and ECG, and no injury or high-risk feature may refuse only after Medical Control consultation.",
          "Complete the Refusal / Non-Transport protocol and document capacity, event history, examination, ECG and glucose results, risks explained, Medical Control consultation, responsible adult supervision, and return precautions.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — SOP 319 Syncope.",
      "ACC / AHA / HRS — Guideline for the Evaluation and Management of Patients With Syncope, 2017.",
      "Claiborne EMS UP-4 Diabetic / Glucose Emergencies and applicable cardiac, shock, trauma, obstetric, stroke, seizure, and toxicology protocols.",
      "North Carolina College of Emergency Physicians UP-16 Syncope source protocol retained for historical comparison.",
    ],
    sourcePdf: "/protocols/claiborne/up-16-syncope-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director content decisions approved August 11, 2026.",
      "Medical Control consultation is required before refusal after true syncope.",
      "Final system-wide clinical release remains pending completion of the full Claiborne protocol reconciliation.",
    ],
  },
  {
    id: "up-17",
    title: "Behavioral Health Crisis",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Treat behavioral symptoms as a possible medical emergency until reversible medical, traumatic, toxicologic, and environmental causes have been assessed.",
      "The Behavioral Activity Rating Scale (BARS) measures current activity and agitation; it does not determine suicide risk or decision-making capacity.",
      "Protect the patient, public, and responders while preserving dignity and using the least restrictive effective intervention.",
    ],
    flow: [
      { title: "Scene Safe?", text: "Stage or withdraw when unsafe • request law enforcement and sufficient resources • identify weapons or hazards", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Medical Emergency?", text: "Airway • breathing • circulation • vitals • SpO₂ • glucose • temperature • trauma • neurologic and toxicologic causes", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Assign BARS", text: "1–3: altered mental status/overdose • 4: cooperative • 5: de-escalate • 6–7: UP-18 combined agitation pathway", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Assess Safety Risk", text: "Suicide • homicide • plan • intent • access to means • prior attempts • command hallucinations • ability to protect self", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "De-escalate", text: "One calm speaker • reduce stimulation • maintain personal space and exit • acknowledge emotions • offer safe choices", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Immediate Danger?", text: "Direct observation • remove accessible hazards when safe • request authorized custody assistance • do not rely on a safety contract", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Safe Disposition", text: "Emergency department for medical risk, self-harm, restraint, or sedation • alternative destination only under approved policy", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      {
        title: "Provider Actions",
        summary: "Use explicit provider-level actions without substituting a generic scope statement.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Establish scene safety, request law enforcement or additional personnel when indicated, and do not enter or remain in an unsafe environment.",
              "Assess airway, breathing, circulation, mental status, trauma, oxygenation, glucose, temperature, medications, substance exposure, and focused neurologic findings.",
              "Assign and document BARS, complete the suicide/homicide safety assessment, begin verbal and environmental de-escalation, and maintain direct observation when risk is present.",
              "Provide indicated BLS treatment, obtain two complete vital-sign sets when feasible, and transport to the appropriate emergency destination.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Perform all EMT care. Establish IV/IO access only when a medical condition, poor perfusion, significant overdose, or anticipated emergency treatment creates a clinical indication.",
              "Administer dextrose, naloxone, or IV fluid only when indicated under the applicable Claiborne medical, toxicology, or shock protocol; do not medicate solely for a psychiatric diagnosis.",
              "Continue physiologic monitoring, direct observation, and reassessment during transport.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior care. Obtain and interpret a 12-lead ECG, use EtCO₂, and provide advanced airway or cause-specific treatment when the presentation or intervention indicates.",
              "For BARS 6–7, transition to UP-18 Behavioral Agitation and Severe Agitation. Use the severe-agitation branch when delirium, hyperthermia, unusual strength, or prolonged struggle is present.",
              "Agitation medication and dosing are contained only in the combined UP-18 protocol. UP-17 contains no standing-order sedative treatment.",
              "After restraint or medication, provide continuous airway, ventilation, SpO₂, EtCO₂, and cardiac monitoring as required by UP-18.",
            ],
          },
        ],
      },
      {
        title: "BARS Routing",
        summary: "BARS standardizes observation and reassessment but never replaces medical evaluation or suicide-risk assessment.",
        levels: [
          {
            level: "EMT",
            actions: [
              "BARS 1: difficult or unable to awaken. Treat as an airway, altered mental status, overdose, or other medical emergency.",
              "BARS 2: asleep but responds normally to verbal or physical stimulation. Evaluate for medication, alcohol, overdose, hypoglycemia, or another medical cause.",
              "BARS 3: drowsy or appears sedated. Evaluate altered mental status, monitor airway and ventilation, and consider overdose or other CNS depression.",
              "BARS 4: quiet and awake with normal activity. Continue the complete behavioral, suicide/homicide, capacity, and medical assessment.",
              "BARS 5: increased verbal or physical activity but not disruptive. Continue UP-17, reduce stimulation, and attempt verbal de-escalation.",
              "Document the initial score and repeat BARS after de-escalation or any change in condition.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "BARS 6: extremely or continuously active and disruptive but not violent. Request sufficient resources, continue de-escalation when safe, and initiate UP-18.",
              "Do not allow vascular access or nonessential procedures to provoke additional struggle or delay safe transport.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "BARS 7: violent with immediate danger and restraint required. Initiate the UP-18 safety and restraint pathway without delaying for nonessential assessment.",
              "Use the UP-18 severe-agitation branch when agitation includes delirium, hyperthermia, unusual strength, pain tolerance, or continued/prolonged struggle.",
              "Repeat and document BARS after physical restraint, medication, and each clinically important change.",
            ],
          },
        ],
      },
      {
        title: "Suicide and Violence Safety Assessment",
        summary: "A calm or cooperative patient may remain at high risk; BARS does not clear a patient for refusal or release.",
        levels: [
          {
            level: "EMT",
            actions: [
              "For medically able patients age 8 years and older, use the ASQ framework: recent wish to be dead; belief that self or family would be better off if dead; recent thoughts of suicide; prior suicide attempt; and current thoughts of suicide.",
              "Ask directly about plan, intent, timing, access to medications or weapons, preparations already made, previous attempts, recent self-harm, homicidal thoughts, command hallucinations, substance use, and ability to remain safe.",
              "If feasible and developmentally appropriate, interview pediatric patients privately for part of the assessment, then obtain collateral history from the parent or guardian.",
              "Any current suicidal intent, credible homicidal threat, recent serious attempt, dangerous command hallucination, or inability to protect oneself requires direct observation and emergency evaluation.",
              "Do not leave a high-risk patient unattended and do not use a verbal or written safety contract as proof of safety.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Maintain continuous observation and repeat mental-status, vital-sign, and risk assessment after any medical treatment or change in behavior.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Integrate the safety assessment with medical findings and decision-making capacity. Contact Medical Control whenever risk, capacity, custody, or destination is uncertain.",
            ],
          },
        ],
      },
      {
        title: "De-escalation and Restraint Safety",
        summary: "Use restraint only to prevent harm or permit medically necessary assessment, treatment, and transport.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Use one calm speaker, open-ended questions, active listening, emotional acknowledgment, nonthreatening posture, personal space, reduced noise and spectators, and reasonable choices.",
              "Maintain a clear exit and avoid confrontation, sudden movements, deceptive promises, crowding, or arguing about delusions.",
              "Do not use prone restraint, hog-tying, neck or chest compression, or any position or device that compromises airway, breathing, circulation, or rapid release.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Assess respiratory and hemodynamic status and the neurovascular status of restrained extremities as soon as safely possible and at recurring intervals.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Physical or pharmacologic restraint requires the UP-18 pathway, appropriate physiologic monitoring, recurring reassessment, and transport to an emergency department.",
              "EMS medications must never be administered solely to facilitate arrest or law-enforcement custody.",
            ],
          },
        ],
      },
      {
        title: "Tennessee Emergency Detention and Capacity",
        summary: "Coordinate emergency custody through the authorized Tennessee process while continuing necessary medical care.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Request law enforcement or another authorized professional when mental illness or serious emotional disturbance creates an imminent substantial likelihood of serious harm.",
              "EMS personnel do not independently initiate a Tennessee emergency mental-health detention solely by virtue of EMS licensure.",
              "Maintain observation and do not abandon a patient who presents an immediate safety threat or cannot make an informed decision.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Continue medically necessary care and transport while the authorized officer, physician, psychologist, or commissioner-designated professional manages the custody process.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Assess whether the patient can understand relevant information, appreciate the condition and consequences, reason about options, and communicate a stable choice.",
              "A psychiatric diagnosis, unusual belief, intoxication, or refusal alone does not automatically establish incapacity; document the specific functional impairment when capacity is absent.",
              "Contact Medical Control and request authorized custody assistance whenever capacity or immediate risk is uncertain.",
            ],
          },
        ],
      },
      {
        title: "Acute Dystonic / Extrapyramidal Reaction",
        summary: "Recognize medication-induced dystonia as a medical condition that may be mistaken for behavioral illness.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Suspect an acute dystonic reaction with involuntary facial, jaw, neck, trunk, or extremity spasm after an antipsychotic or other dopamine-blocking medication.",
              "Assess for tongue, pharyngeal, or laryngeal involvement and support airway and ventilation immediately when present.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Adult: diphenhydramine 50 mg IV/IO/IM.",
              "Pediatric patient younger than 16 years: diphenhydramine 1 mg/kg IV/IO/IM; maximum 50 mg.",
              "Monitor airway, SpO₂, vital signs, and cardiac rhythm after parenteral medication and reassess the muscular symptoms.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior care. Treat airway compromise immediately and evaluate for serotonin syndrome, neuroleptic malignant syndrome, seizure, tetany, toxic exposure, or another cause when findings are atypical.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Suicidal thoughts, suicide attempt, self-harm, homicidal thoughts, psychosis, hallucinations, delusions, severe anxiety, mania, depression, or another behavioral-health crisis.",
      "Agitation, threatening behavior, impaired judgment, inability to protect oneself, or concern for danger to the patient or others.",
      "Behavioral change that may be caused by a medical, traumatic, toxicologic, medication-related, or environmental emergency.",
    ],
    contraindications: [],
    assessment: [
      {
        title: "Medical and Traumatic Causes",
        items: [
          "Assess airway, ventilation, oxygenation, circulation, complete vital signs, glucose, temperature, pupils, focused neurologic status, trauma, pain, pregnancy when applicable, medication adherence or changes, substance exposure, and withdrawal.",
          "Consider hypoxia, hypoglycemia or hyperglycemia, stroke, seizure or postictal state, head injury, shock, sepsis, hyperthermia, intoxication, overdose, withdrawal, medication reaction, endocrine/metabolic disease, dementia, and delirium.",
          "Obtain a 12-lead ECG when overdose, stimulant use, syncope, chest discomfort, dyspnea, palpitations, abnormal pulse, electrolyte disorder, QT-prolonging medication, or parenteral agitation medication is suspected or used.",
          "Use EtCO₂ for hypoventilation, suspected overdose, significant altered mental status, restraint, or pharmacologic management.",
        ],
      },
      {
        title: "Behavior and Safety Risk",
        items: [
          "Assign BARS from 1 through 7 and document objective observed behavior rather than conclusory labels such as uncooperative, crazy, or violent without supporting facts.",
          "Ask directly about suicidal and homicidal thoughts, plan, intent, access to means, prior attempts, self-harm, command hallucinations, substance use, supports, and ability to remain safe.",
          "Obtain collateral information from family, caregivers, witnesses, law enforcement, medication containers, and prior records when available, while maintaining patient dignity and necessary privacy.",
          "Identify abuse, neglect, exploitation, domestic violence, sexual assault, trafficking, or an unsafe living environment and follow the applicable reporting protocol.",
        ],
      },
      {
        title: "Capacity and Reassessment",
        items: [
          "Assess whether the patient understands the situation and proposed care, appreciates likely consequences, can reason about options, and communicates a stable choice.",
          "Obtain two complete vital-sign sets when feasible. Reassess high-acuity, restrained, sedated, or clinically unstable patients at least every 3–5 minutes.",
          "Repeat BARS and the focused medical, airway, perfusion, neurologic, and safety assessment after every intervention or significant change.",
        ],
      },
    ],
    treatmentSteps: [
      "Ensure scene safety; stage or withdraw when unsafe and request law enforcement and sufficient personnel before contact or intervention.",
      "Perform the medical screen and immediately treat hypoxia, hypoventilation, hypoglycemia, opioid respiratory depression, shock, hyperthermia, trauma, seizure, stroke, overdose, or another identified emergency under the applicable Claiborne protocol.",
      "Assign BARS and route BARS 1–3 to altered mental status/overdose evaluation, BARS 4 to the cooperative behavioral assessment, BARS 5 to de-escalation, and BARS 6–7 to the appropriate branch of the combined UP-18 protocol.",
      "Complete the suicide/homicide assessment. Maintain direct observation and remove accessible dangerous objects when this can be done safely.",
      "Attempt verbal and environmental de-escalation before restraint whenever the situation permits.",
      "When an imminent substantial likelihood of serious harm exists, request an authorized Tennessee custody professional and continue medically necessary care and safe transport.",
      "Use UP-18 for any physical or pharmacologic restraint, including severe agitation with delirium or hyperthermia. Never restrain or transport a patient prone.",
      "Transport to an emergency department for medical abnormality, injury, overdose, delirium, recent self-harm, current suicide or homicide risk, dangerous psychosis, restraint, or pharmacologic management.",
      "Use a psychiatric or crisis alternative destination only under a separately approved destination policy and only after required medical and safety screening criteria are met.",
      "A patient with intact capacity and no identified immediate danger may use the standard refusal process. Contact Medical Control whenever capacity or risk is uncertain and document a clear safety and follow-up plan.",
    ],
    medications: [
      {
        name: "Diphenhydramine",
        dose: "Adult: 50 mg IV/IO/IM. Pediatric patient younger than 16 years: 1 mg/kg IV/IO/IM; maximum 50 mg.",
        notes: ["AEMT or Paramedic.", "Indication: acute dystonic or extrapyramidal reaction.", "Assess for airway involvement and monitor after administration."],
      },
    ],
    warnings: [
      "A calm, cooperative, or BARS 4 patient may still have imminent suicide or homicide risk.",
      "Never assume a psychiatric diagnosis until medical, traumatic, toxicologic, medication-related, and environmental causes have been assessed.",
      "Do not leave a high-risk patient unattended or rely on a verbal or written safety contract.",
      "Do not use prone restraint, hog-tying, neck or chest compression, or a restraint that cannot be rapidly released for airway, breathing, or circulatory compromise.",
      "EMS medication must not be used solely to facilitate arrest or law-enforcement custody.",
      "Any patient receiving physical restraint or pharmacologic management requires continuous observation, physiologic monitoring, recurring reassessment, and emergency-department transport.",
      "Do not place a psychiatric-only patient at an alternative destination unless a separately approved destination policy is active and all criteria are met.",
    ],
    clinicalPearls: [
      "Ask directly about suicide and homicide; asking does not create suicidal thoughts and may identify concealed risk.",
      "BARS is a rapid observational communication tool, not a diagnosis, suicide-risk scale, capacity assessment, or automatic medication order.",
      "Medical causes are especially important with new behavioral change, atypical age of onset, abnormal vital signs, fluctuating attention, focal neurologic findings, trauma, or no established psychiatric history.",
      "One calm speaker and fewer stimuli often work better than multiple responders issuing simultaneous commands.",
      "Current suicidal thoughts, a feasible plan with access to means, a recent attempt, dangerous command hallucinations, or inability to protect oneself requires immediate safety precautions and emergency evaluation.",
      "If law-enforcement restraints that require a key must remain, law enforcement and the key must accompany the patient; transition to the least restrictive safe restraint when feasible.",
      "Exact patient statements are more clinically useful than paraphrases when documenting threats, hallucinations, intent, or refusal.",
    ],
    specialPopulations: [
      {
        title: "Pediatrics",
        items: [
          "Pediatric patients are younger than 16 years and medication doses use actual or length-based weight.",
          "The ASQ framework may be used for medically able patients age 8 years and older. Suspected suicide risk in a child younger than 8 years requires comprehensive emergency mental-health evaluation rather than relying on a screening score.",
          "When feasible and developmentally appropriate, ask the safety questions privately for part of the encounter and then obtain collateral information from the parent or guardian.",
          "Evaluate for abuse, neglect, exploitation, bullying, trafficking, medication ingestion, developmental disability, and an unsafe home environment.",
        ],
      },
      {
        title: "Law-Enforcement Custody",
        items: [
          "A patient restrained by law enforcement remains an EMS patient when medical assessment or treatment is provided; EMS advocates for airway, breathing, circulation, positioning, monitoring, and dignity.",
          "Law enforcement should accompany a patient when law-enforcement restraints must remain during ambulance transport, and the required release key must be immediately available.",
          "Do not transport with hands restrained behind the back when that position interferes with assessment, monitoring, airway protection, or safe positioning.",
        ],
      },
      {
        title: "Refusal / Non-Transport",
        items: [
          "Do not permit refusal based solely on a calm appearance, a low BARS score, denial after a documented threat, or a verbal safety contract.",
          "Current suicidal intent, credible homicidal threat, recent serious attempt, dangerous command hallucinations, inability to protect oneself, impaired capacity, medical instability, restraint, or sedation requires emergency evaluation and safe transport.",
          "A patient with intact capacity and no identified immediate danger may refuse only under the standard Refusal / Non-Transport protocol. Contact Medical Control whenever capacity or risk is uncertain.",
          "Document capacity, risk assessment, exact statements, collateral information, alternatives offered, risks explained, Medical Control or law-enforcement involvement, responsible support person, crisis resources, and return precautions.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines, September 2025.",
      "Tennessee Code Annotated §§ 33-6-401 through 33-6-404 and § 33-6-501 — emergency detention and substantial likelihood of serious harm.",
      "National Institute of Mental Health — Ask Suicide-Screening Questions (ASQ) Toolkit for youth and adults.",
      "National Association of EMS Physicians and partner organizations — Clinical Care and Restraint of Agitated or Combative Patients by EMS Practitioners, 2021.",
      "Claiborne EMS UP-18 Behavioral Agitation and Severe Agitation.",
      "North Carolina College of Emergency Physicians UP-17 Behavioral Health Crisis source protocol retained for historical comparison.",
    ],
    sourcePdf: "/protocols/claiborne/up-17-behavioral-health-crisis-protocol.pdf",
    sourcePages: { start: 1, end: 3 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director content decisions approved August 11, 2026.",
      "BARS is adopted as the Claiborne EMS agitation assessment and reassessment scale; it does not replace suicide-risk, medical, or capacity assessment.",
      "Behavioral-health alternative-destination criteria require a separately approved destination policy.",
      "Final system-wide clinical release remains pending completion of the full Claiborne protocol reconciliation.",
    ],
  },
  {
    id: "up-18",
    title: "Behavioral Agitation and Severe Agitation",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Agitation is a clinical spectrum. Use BARS to select the least restrictive effective intervention while rapidly identifying medical, traumatic, toxicologic, and environmental causes.",
      "The treatment goal is a calm, arousable patient who can be safely assessed and transported—not unconsciousness.",
      "BARS 6 follows the moderate-agitation midazolam pathway. BARS 7 with immediate danger follows the severe-agitation ketamine or alternative midazolam pathway.",
    ],
    flow: [
      { title: "Scene Safe?", text: "Stage or withdraw when unsafe • request law enforcement and sufficient personnel • coordinate one team plan", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Assign BARS", text: "1–3: medical/overdose • 4: cooperative • 5: de-escalate • 6: moderate agitation • 7: severe immediate danger", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "BARS 5", text: "One calm speaker • reduce stimulation • maintain personal space and exit • offer safe choices", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "BARS 6", text: "Paramedic: midazolam pathway • use physical restraint only when needed for immediate safety or necessary care", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "BARS 7 / Immediate Danger", text: "Rapid coordinated control • Paramedic ketamine 2–4 mg/kg IM, max 400 mg • adult alternative midazolam 10 mg IM", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Safe Position", text: "Approved soft restraints • supine with head elevated or lateral • never prone, hog-tied, or compressed at neck/chest", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Find + Treat Cause", text: "Airway • ventilation • glucose • temperature • trauma • neurologic emergency • toxidrome • hypoxia", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Continuous Monitoring", text: "Direct observation • ECG • SpO₂ • waveform EtCO₂ after sedation • BP, respirations, airway, and restraint checks every 5 minutes", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "ED Transport", text: "Every physical restraint or chemical sedation patient • early notification • document BARS, interventions, response, and complications", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      {
        title: "Provider Actions",
        summary: "Use explicit provider-level roles while maintaining one coordinated safety plan.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Establish scene safety, request law enforcement and additional personnel when indicated, and withdraw when responders cannot safely engage.",
              "Use verbal and environmental de-escalation, assess BARS, and assist with approved physical restraint only when necessary to prevent immediate harm or permit emergency care.",
              "Position the patient supine with the head elevated or lateral when clinically appropriate. Maintain airway positioning, oxygenation, suction, BVM readiness, direct observation, SpO₂, restraint checks, and serial vital signs.",
              "Assess glucose, temperature, trauma, oxygenation, neurologic findings, medication or substance exposure, and other reversible causes as soon as safely possible.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Perform all EMT care. Establish IV/IO access only when safely achievable and clinically indicated; do not provoke additional struggle or delay rapid control attempting vascular access.",
              "Administer IV fluid only for hypotension, poor perfusion, or suspected heat illness. Follow the applicable shock or environmental protocol and reassess for fluid overload risk.",
              "Assist ventilation, continuous monitoring, restraint reassessment, active cooling, and rapid transport. AEMTs do not administer chemical sedation under UP-18.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior care. Select the BARS 6 or BARS 7 medication pathway, administer the approved sedative, and direct post-sedation airway, ventilation, hemodynamic, temperature, and neurologic assessment.",
              "Apply continuous ECG, SpO₂, and waveform EtCO₂ as soon as safely possible after parenteral sedation. Keep suction, oxygen, BVM, and advanced-airway equipment immediately available.",
              "Do not administer a sedative for convenience, punishment, to force cooperation with a nonessential procedure, or to facilitate arrest or law-enforcement custody.",
            ],
          },
        ],
      },
      {
        title: "BARS 6 — Moderate Agitation",
        summary: "Use de-escalation first when feasible; medication is intended to achieve safe calm while preserving airway and arousability.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Continue one-speaker verbal de-escalation, reduce noise and spectators, maintain personal space and a clear exit, and avoid provocative procedures.",
              "Prepare monitoring, airway equipment, approved restraints, and a coordinated team approach before medication when circumstances allow.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Obtain IV/IO access only when already tolerated or clinically necessary. Do not delay IM medication attempting vascular access.",
              "Provide continuous physiologic monitoring and support after medication; no AEMT chemical-sedation administration.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Adult: midazolam 2.5 mg IV/IO or 5 mg IM/IN. If dangerous agitation persists, repeat once after 5 minutes following complete airway and hemodynamic reassessment. Maximum 5 mg IV/IO or 10 mg IM/IN.",
              "Adult age 65 or older, frail, significant respiratory disease, or suspected CNS-depressant intoxication: midazolam 1–2.5 mg IV/IO or 2.5 mg IM/IN. Repeat once only after reassessment; maximum cumulative dose 5 mg.",
              "Pediatric patient younger than 16: midazolam 0.1 mg/kg IV/IO or 0.2 mg/kg IM/IN, maximum initial dose 5 mg. Contact Medical Control when feasible before administration; a repeat dose requires Medical Control. Maximum cumulative dose 10 mg.",
            ],
          },
        ],
      },
      {
        title: "BARS 7 — Severe Agitation With Immediate Danger",
        summary: "Use rapid coordinated control to end dangerous exertion and permit emergency assessment and transport.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Request adequate personnel and law enforcement, remove bystanders and hazards, prepare approved restraints and monitoring, and execute one coordinated plan.",
              "Do not delay an immediately necessary safety intervention to obtain routine measurements. Begin medical assessment as soon as control permits.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Assist the coordinated restraint and immediate airway, ventilation, circulatory, temperature, glucose, trauma, and toxidrome assessment.",
              "Do not attempt vascular access in a violently struggling patient. Establish access after control only when a clinical indication remains.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Primary adult treatment: ketamine 2–4 mg/kg IM, maximum 400 mg. Do not delay treatment attempting IV access.",
              "If IV/IO access is already safely established: ketamine 1 mg/kg IV/IO slowly, maximum 100 mg.",
              "If ketamine is unavailable or contraindicated: midazolam 10 mg IM is preferred. If IM administration is not feasible, midazolam 10 mg IN may be considered. For patients age 65 or older, frail, or at increased respiratory risk, use midazolam 5 mg IM.",
              "Do not routinely combine ketamine and midazolam or administer prophylactic midazolam after ketamine. If dangerous agitation persists 10 minutes after ketamine, contact Medical Control before repeating ketamine or adding another sedative.",
              "For every pediatric BARS 7 patient, contact Medical Control and obtain a direct order before chemical sedation. Medical Control will specify the medication and dose.",
            ],
          },
        ],
      },
      {
        title: "Physical Restraint Safety",
        summary: "Restraint is a medical safety intervention and must remain the least restrictive method that protects the patient and responders.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Use only approved soft restraints that can be rapidly removed. Secure the patient to the stretcher frame according to agency training, never to movable side rails.",
              "Position supine with the head elevated or lateral when clinically appropriate. Never restrain or transport prone, hog-tied, with hands and feet tied together behind the back, or with pressure that constricts the neck, chest, diaphragm, or airway.",
              "Do not place hands, knees, equipment, backboards, mattresses, or body weight on the patient's neck, chest, back, or abdomen.",
              "Assess airway, breathing, circulation, distal neurovascular status, restraint security, skin, and position at least every 5 minutes and whenever the patient or restraint position changes.",
              "Never use an oxygen mask as a spit-control device. If an agency-approved breathable spit hood is used, maintain continuous airway observation and remove it immediately for vomiting, respiratory compromise, or airway concern.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Continue all restraint assessments and transition to the least restrictive safe method when the clinical condition permits.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Direct restraint positioning and physiologic reassessment. If rigid law-enforcement restraints must remain, require an accompanying officer with immediate access to the key and transition to approved soft restraints when safely possible.",
            ],
          },
        ],
      },
      {
        title: "Monitoring, Transport, and Documentation",
        summary: "Every restraint or sedation encounter requires close physiologic monitoring, emergency-department transport, and quality review.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Maintain continuous direct observation. Obtain two complete vital-sign sets when feasible and repeat airway, respiratory rate and effort, blood pressure, mental status, BARS, position, and distal neurovascular checks every 5 minutes until stable.",
              "Document the behavior creating immediate danger, initial and repeat BARS, de-escalation attempts, personnel involved, restraint type and position, assessment findings, and response.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Document vascular access, fluids, cooling, physiologic trends, adverse events, and every restraint reassessment.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "After parenteral sedation, maintain continuous ECG, SpO₂, and waveform EtCO₂. Document medication, dose, route, exact time, indication, response, repeat assessment, and any airway or hemodynamic intervention.",
              "Transport every physically restrained or chemically sedated patient to an emergency department with early notification. Interfacility sedation remains governed by the separate transfer policy.",
              "Submit every physical-restraint or chemical-sedation encounter for medical-director or quality-assurance review.",
            ],
          },
        ],
      },
    ],
    indications: [
      "BARS 6 agitation that remains disruptive or creates a safety risk despite verbal and environmental de-escalation.",
      "BARS 7 violent behavior with immediate danger to the patient, responders, or others.",
      "Physical restraint or pharmacologic management required to permit assessment, treatment, or safe transport of a medical patient.",
    ],
    contraindications: [
      "Do not use physical restraint or chemical sedation solely for refusal, verbal hostility, convenience, punishment, noncompliance, or to facilitate arrest or custody.",
      "Do not use a paralyzing medication solely for behavioral control.",
      "Do not administer pediatric BARS 7 chemical sedation without direct Medical Control authorization and dosing.",
    ],
    assessment: [
      {
        title: "Immediate safety and medical assessment",
        items: [
          "Determine BARS, whether an immediate threat exists, available personnel, weapons or hazards, law-enforcement involvement, and the safest approach.",
          "Assess airway, breathing, circulation, oxygenation, glucose, temperature, trauma, neurologic findings, medication exposure, alcohol or substance use, pregnancy, and relevant medical or psychiatric history as soon as safely possible.",
          "Consider hypoxia, hypoglycemia, stroke, seizure or postictal state, traumatic brain injury, infection or sepsis, medication effect, alcohol or sedative withdrawal, stimulant or sympathomimetic toxicity, anticholinergic toxicity, and heat illness.",
          "Do not label severe agitation as a psychiatric condition until urgent medical, traumatic, toxicologic, and environmental causes have been considered.",
        ],
      },
      {
        title: "Post-control physiologic assessment",
        items: [
          "Immediately reassess airway patency, respiratory rate and effort, ventilation, SpO₂, waveform EtCO₂, cardiac rhythm, blood pressure, perfusion, temperature, glucose, mental status, pupils, trauma, restraint position, and distal neurovascular status.",
          "Obtain a 12-lead ECG when feasible after control, particularly with suspected stimulant exposure, abnormal rhythm, chest symptoms, hyperthermia, significant tachycardia, or another medical concern. Do not delay immediate safety intervention or transport solely for the tracing.",
          "Repeat BARS and complete physiologic assessment after each medication, restraint change, or clinically important change.",
        ],
      },
    ],
    treatmentSteps: [
      "Establish scene safety, request law enforcement and sufficient personnel, and use one coordinated team plan.",
      "Assign BARS and begin verbal and environmental de-escalation whenever safely feasible.",
      "For BARS 6, use the approved adult or pediatric midazolam pathway when medication is required.",
      "For adult BARS 7 with immediate danger, administer ketamine 2–4 mg/kg IM, maximum 400 mg. If IV/IO access is already safely established, ketamine 1 mg/kg IV/IO slowly, maximum 100 mg.",
      "When ketamine is unavailable or contraindicated in an adult BARS 7 patient, use midazolam 10 mg IM preferentially; use 10 mg IN only when IM is not feasible. Use 5 mg IM for patients age 65 or older, frail, or at increased respiratory risk.",
      "For pediatric BARS 7, contact Medical Control and obtain a direct medication and dose order before chemical sedation.",
      "Apply approved soft restraints only when necessary, position supine with the head elevated or lateral, and prohibit prone or airway-compromising restraint.",
      "Once safe, immediately identify and treat hypoxia, hypoglycemia, hyperthermia, trauma, toxidrome, shock, and other reversible causes. Use active cooling for clinically significant hyperthermia. Administer fluid only for hypotension, poor perfusion, or suspected heat illness.",
      "After parenteral sedation, maintain continuous ECG, SpO₂, waveform EtCO₂, direct observation, airway equipment readiness, and 5-minute physiologic and restraint reassessment.",
      "Transport every physically restrained or chemically sedated patient to an emergency department, notify early, document completely, and submit the encounter for quality review.",
    ],
    medications: [
      {
        name: "Midazolam — Adult BARS 6",
        dose: "2.5 mg IV/IO or 5 mg IM/IN; repeat once after 5 minutes if dangerous agitation persists",
        notes: [
          "Complete airway, ventilation, blood-pressure, and sedation reassessment before repeat dosing.",
          "Maximum: 5 mg IV/IO or 10 mg IM/IN.",
          "Age 65 or older, frail, respiratory disease, or suspected CNS-depressant intoxication: 1–2.5 mg IV/IO or 2.5 mg IM/IN; maximum cumulative dose 5 mg.",
          "Paramedic only.",
        ],
      },
      {
        name: "Midazolam — Pediatric BARS 6",
        dose: "0.1 mg/kg IV/IO or 0.2 mg/kg IM/IN; maximum initial dose 5 mg",
        notes: [
          "Patient younger than 16 years. Use actual or length-based weight.",
          "Contact Medical Control when feasible before administration. A repeat dose requires Medical Control.",
          "Maximum cumulative dose 10 mg.",
          "Paramedic only.",
        ],
      },
      {
        name: "Ketamine — Adult BARS 7 IM",
        dose: "2–4 mg/kg IM; maximum 400 mg",
        notes: [
          "Primary medication for adult severe agitation with immediate danger.",
          "Do not delay treatment attempting vascular access.",
          "Do not routinely administer prophylactic midazolam after ketamine.",
          "If dangerous agitation persists after 10 minutes, contact Medical Control before repeat ketamine or another sedative.",
          "Paramedic only.",
        ],
      },
      {
        name: "Ketamine — Adult BARS 7 IV/IO",
        dose: "1 mg/kg IV/IO slowly; maximum 100 mg",
        notes: [
          "Use only when vascular access is already safely established.",
          "Do not attempt IV access in a violently struggling patient solely to use this route.",
          "Paramedic only.",
        ],
      },
      {
        name: "Midazolam — Adult BARS 7 Alternative",
        dose: "10 mg IM preferred; 10 mg IN only when IM is not feasible",
        notes: [
          "Use when ketamine is unavailable or contraindicated.",
          "Age 65 or older, frail, or increased respiratory risk: 5 mg IM.",
          "Do not routinely combine with ketamine.",
          "Paramedic only.",
        ],
      },
      {
        name: "Pediatric BARS 7 Chemical Sedation",
        dose: "Direct Medical Control order required; Medical Control specifies medication and dose",
        notes: [
          "Applies to every patient younger than 16 years with BARS 7 severe agitation.",
          "Continuous ECG, SpO₂, waveform EtCO₂, airway readiness, and emergency-department transport are required.",
        ],
      },
    ],
    warnings: [
      "Midazolam and ketamine can cause apnea, hypoventilation, airway obstruction, vomiting, hypersalivation, laryngospasm, or hemodynamic change. Maintain immediate suction, BVM, oxygen, and advanced-airway readiness.",
      "Do not routinely combine ketamine and midazolam. Additional sedation after the approved pathway requires Medical Control.",
      "Flumazenil should not be used routinely for post-midazolam respiratory depression; support airway and ventilation.",
      "Never use prone, hog-tie, neck/chest-compression, sandwich, or backboard/mattress restraint techniques.",
      "Continued physical struggle may worsen hyperthermia, acidosis, rhabdomyolysis, dysrhythmia, and sudden deterioration; coordinate rapid safe control and prompt medical assessment.",
    ],
    clinicalPearls: [
      "BARS is an assessment and reassessment tool, not an automatic medication order.",
      "Target safe calm and preserved airway—not deep unconsciousness.",
      "One calm speaker, fewer stimuli, personal space, and safe choices may prevent escalation when the patient is not an immediate danger.",
      "IM midazolam is preferred over IN midazolam for a severely agitated adult when ketamine cannot be used.",
      "Lorazepam remains on the formulary but is not part of the primary UP-18 agitation algorithm. Droperidol and haloperidol are not included.",
      "Ketamine administration alone is not an indication for endotracheal intubation; intubate only for clinical airway or ventilation failure or another independent indication.",
      "Exact medication times, serial BARS scores, ventilation findings, EtCO₂, positioning, and adverse events are essential for safe handoff and quality review.",
    ],
    specialPopulations: [
      {
        title: "Pediatrics",
        items: [
          "Pediatric patients are younger than 16 years and medication dosing uses actual or length-based weight.",
          "BARS 6 midazolam may be used as listed; contact Medical Control when feasible and obtain Medical Control authorization before any repeat dose.",
          "Every pediatric BARS 7 chemical-sedation medication and dose requires direct Medical Control authorization.",
          "Evaluate for ingestion, hypoglycemia, hypoxia, fever or infection, seizure, trauma, developmental disability, abuse, and an unsafe environment.",
        ],
      },
      {
        title: "Older or Frail Adults",
        items: [
          "Use the reduced midazolam doses listed for patients age 65 or older, frail, or at increased respiratory risk.",
          "Give particular attention to delirium, infection, stroke, hypoxia, medication toxicity, urinary retention, pain, and occult trauma.",
        ],
      },
      {
        title: "Pregnancy",
        items: [
          "Use de-escalation and the least restrictive safe intervention whenever possible. Maternal and fetal safety may require immediate control when violent agitation creates danger.",
          "Contact Medical Control when feasible, but do not permit prolonged dangerous struggle while awaiting consultation in an adult with immediate danger.",
          "Position with left uterine displacement when gestational age and circumstances make aortocaval compression possible.",
        ],
      },
      {
        title: "Law-Enforcement Custody",
        items: [
          "EMS sedation is a medical decision and must never be administered solely to facilitate arrest, interrogation, transport to jail, or law-enforcement compliance.",
          "If rigid restraints must remain, a law-enforcement officer and the release key must accompany the patient. Transition to the least restrictive safe restraint when feasible.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines, September 2025 — agitated or combative patient guidance.",
      "National Association of EMS Physicians and partner organizations — Clinical Care and Restraint of Agitated or Combative Patients by EMS Practitioners, 2021.",
      "American College of Emergency Physicians — Severe Agitation Clinical Policy.",
      "North Carolina College of Emergency Physicians UP-18 and UP-19 source protocols retained for historical comparison.",
      "Claiborne Covenant EMS Formulary.",
    ],
    sourcePdf: "/protocols/claiborne/up-18-behavioral-agitation-sedation-guide-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director content decisions approved August 11, 2026.",
      "UP-18 and UP-19 are clinically merged into one BARS-based protocol; UP-19 remains only as a compatibility redirect.",
      "Droperidol and haloperidol are not included. Pediatric BARS 7 chemical sedation requires direct Medical Control authorization and dosing.",
      "Final system-wide clinical release remains pending completion of the full Claiborne protocol reconciliation.",
    ],
  },
  {
    id: "up-19",
    title: "Severe Agitation — Merged Into UP-18",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "UP-19 has been merged into UP-18 Behavioral Agitation and Severe Agitation.",
      "Use the BARS 7 severe-agitation branch in UP-18 for medication, restraint, monitoring, transport, and documentation requirements.",
    ],
    flow: [
      { title: "Use UP-18", text: "BARS 7 severe agitation and all historical UP-19 presentations now follow the combined UP-18 pathway", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      {
        title: "Compatibility Redirect",
        summary: "This entry preserves the historical UP-19 number while directing all care to the approved combined protocol.",
        levels: [
          { level: "EMT", actions: ["Open UP-18 Behavioral Agitation and Severe Agitation and follow the applicable BARS branch."] },
          { level: "AEMT", actions: ["Open UP-18 Behavioral Agitation and Severe Agitation and follow the applicable BARS branch."] },
          { level: "Paramedic", actions: ["Open UP-18 Behavioral Agitation and Severe Agitation. Do not use historical UP-19 medication dosing."] },
        ],
      },
    ],
    indications: ["Historical UP-19 link, bookmark, or reference."],
    contraindications: [],
    assessment: [],
    treatmentSteps: ["Use UP-18 Behavioral Agitation and Severe Agitation."],
    medications: [],
    warnings: ["Do not use the historical standalone UP-19 medication pathway; all current agitation care and dosing are contained in UP-18."],
    clinicalPearls: ["UP-19 is retained temporarily only to prevent broken links and numbering confusion."],
    specialPopulations: [],
    references: ["Claiborne EMS UP-18 Behavioral Agitation and Severe Agitation."],
    sourcePdf: "/protocols/claiborne/up-19-hyperactive-delirium-with-severe-agitation-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Compatibility redirect only.",
      "All clinical treatment is contained in UP-18.",
    ],
  },
  {
    id: "ac-01",
    title: "Asystole / Pulseless Electrical Activity",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: [
      "Adult nonshockable cardiac-arrest pathway for patients 16 years of age and older.",
      "Prioritize uninterrupted high-quality CPR, early epinephrine, oxygenation and ventilation, and rapid treatment of reversible causes.",
    ],
    flow: [
      {
        title: "Confirm Cardiac Arrest",
        text: "Unresponsive • absent or abnormal breathing • no definite pulse within 10 seconds • honor valid DNR/MOST and obvious-death criteria.",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Begin TEAM-Focused CPR",
        text: "Compressions 100–120/min, depth 2–2.4 in, full recoil, minimal pauses; change compressor every 2 minutes. Use 30:2 before an advanced airway.",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Confirm Nonshockable Rhythm",
        text: "Check rhythm every 2 minutes. Confirm asystole in 2 leads and exclude loose leads, low gain, and fine VF. Do not defibrillate or pace asystole/PEA.",
        levels: ["AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Access + Epinephrine",
        text: "Give epinephrine 1 mg IV/IO as soon as possible and repeat every 3–5 minutes. Make one rapid IV attempt, then proceed to IO if unsuccessful or delayed.",
        levels: ["AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Airway + Ventilation",
        text: "Two-person BVM first. Do not interrupt compressions for airway placement. After an advanced airway, continue compressions and give 1 breath every 6 seconds with waveform capnography.",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Treat Reversible Causes",
        text: "Evaluate and treat hypovolemia, hypoxia, acidosis, potassium abnormality, hypothermia, tension pneumothorax, tamponade, toxins, and coronary or pulmonary thrombosis.",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Rhythm Changes?",
        text: "If VF/pulseless VT develops, transition immediately to AC-09. If ROSC occurs, transition to AC-10. Otherwise continue 2-minute cycles and consider AC-12 termination criteria.",
        levels: ["EMT", "AEMT", "Paramedic", "Medical Control"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "EMT Care",
        summary: "Recognition, high-quality CPR, BLS airway care, AED/monitor support, and cause-directed basic care.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Confirm unresponsiveness, abnormal or absent breathing, and no definite pulse within 10 seconds; identify valid DNR/MOST or obvious-death criteria.",
              "Start TEAM-focused CPR immediately: 100–120 compressions/min, depth 2–2.4 inches, complete recoil, minimal interruptions, and compressor change every 2 minutes.",
              "Apply AED/monitor pads, follow rhythm prompts, and resume compressions immediately after every rhythm or pulse check.",
              "Use a two-person BVM with oxygen and an airway adjunct when available; maintain 30:2 until an advanced airway is in place.",
              "Assist with scene organization, medication timing, documentation, reversible-cause treatment, and safe movement only when indicated.",
            ],
          },
        ],
      },
      {
        title: "AEMT Care",
        summary: "All EMT care plus vascular access, epinephrine, supraglottic airway, and quantitative capnography when available.",
        levels: [
          {
            level: "AEMT",
            actions: [
              "Perform all EMT actions and confirm the rhythm is nonshockable; if apparent asystole, verify in 2 leads and correct lead, cable, and gain problems.",
              "Make one rapid IV attempt without interrupting CPR. If unsuccessful, infeasible, or delayed, establish IO access; use proximal tibia preferentially and humeral head only when tibial access is contraindicated.",
              "Give epinephrine 1 mg IV/IO as soon as possible and repeat every 3–5 minutes while arrest continues.",
              "Place a supraglottic airway without interrupting compressions when BVM ventilation is ineffective or an advanced airway will improve care.",
              "After advanced-airway placement, ventilate once every 6 seconds during continuous compressions and monitor waveform capnography when available.",
            ],
          },
        ],
      },
      {
        title: "Paramedic Care",
        summary: "All AEMT care plus rhythm confirmation, definitive airway options, continuous waveform capnography, and advanced treatment of reversible causes.",
        levels: [
          {
            level: "Paramedic",
            actions: [
              "Perform all EMT and AEMT actions; confirm PEA has no palpable pulse and confirm asystole in 2 leads, excluding fine VF.",
              "Choose supraglottic airway or endotracheal intubation according to patient and scene conditions; airway placement must not interrupt compressions.",
              "Use continuous waveform capnography after any advanced airway to confirm and monitor placement, assess ventilation, and follow trends in CPR effectiveness.",
              "Identify and treat reversible causes. Give calcium or sodium bicarbonate only for a specific suspected or confirmed indication, not routinely.",
              "Direct on-scene resuscitation, transition immediately to AC-09 for VF/pulseless VT or AC-10 after ROSC, and apply AC-12 when termination criteria are met.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Patient 16 years of age or older in cardiac arrest with asystole or pulseless electrical activity.",
      "No definite central pulse detected within a pulse check of no more than 10 seconds.",
    ],
    contraindications: [
      "Valid DNR, MOST, or other recognized order directing that resuscitation not be attempted.",
      "Obvious-death findings or circumstances addressed by agency policy.",
      "A palpable pulse is present; manage the perfusing rhythm and underlying condition instead.",
    ],
    assessment: [
      {
        title: "Arrest Confirmation",
        items: [
          "Assess responsiveness, breathing, and central pulse simultaneously; limit the pulse check to 10 seconds.",
          "For organized electrical activity, verify the absence of a palpable pulse before diagnosing PEA.",
          "For apparent asystole, confirm in 2 leads and check electrodes, cables, monitor gain, and the possibility of fine VF.",
        ],
      },
      {
        title: "CPR Quality",
        items: [
          "Compression rate 100–120/min and depth 2–2.4 inches with complete recoil.",
          "Keep rhythm and pulse checks under 10 seconds and change compressors approximately every 2 minutes.",
          "Use real-time audiovisual CPR feedback when available.",
        ],
      },
      {
        title: "Reversible Causes — Hs and Ts",
        items: [
          "Hypovolemia, hypoxia, hydrogen ion excess/acidosis, hypo-/hyperkalemia, and hypothermia.",
          "Tension pneumothorax, cardiac tamponade, toxins, coronary thrombosis, and pulmonary thrombosis.",
        ],
      },
    ],
    treatmentSteps: [
      "Begin high-quality CPR immediately and follow the TEAM-Focused CPR pathway in AC-11.",
      "Apply monitor/defibrillator pads. Treat asystole and PEA as nonshockable rhythms; do not defibrillate or perform transcutaneous pacing.",
      "Perform rhythm checks every 2 minutes and resume compressions immediately after each check.",
      "Give epinephrine 1 mg IV/IO as soon as possible and every 3–5 minutes thereafter while arrest continues.",
      "Use one rapid IV attempt, then proceed to IO when IV access is unsuccessful, infeasible, or delayed. Proximal tibia is preferred; humeral head is an alternate only when tibial access is contraindicated.",
      "Provide two-person BVM ventilation first. Maintain 30:2 before an advanced airway and avoid excessive ventilation.",
      "After advanced-airway placement, give 1 breath every 6 seconds during continuous compressions and use waveform capnography.",
      "Continuously evaluate and treat reversible causes. Use cause-specific therapy rather than empiric routine arrest medications.",
      "Use changes in waveform EtCO2 as one component of assessment; an abrupt sustained rise may indicate ROSC. Never use a single EtCO2 value alone to terminate resuscitation.",
      "If VF/pulseless VT develops, move to AC-09. If ROSC occurs, move to AC-10.",
      "Continue resuscitation on scene for most out-of-hospital arrests. Transport during CPR only for a defined special circumstance or after ROSC; apply AC-12 termination guidance when appropriate.",
      "Use mechanical CPR only when high-quality manual compressions are unsafe or impractical and placement can occur with minimal interruption.",
    ],
    medications: [
      {
        name: "Epinephrine 1 mg/10 mL (0.1 mg/mL)",
        dose: "1 mg IV/IO as soon as possible; repeat every 3–5 minutes",
        notes: [
          "AEMT and Paramedic standing-order medication for adult nonshockable cardiac arrest.",
          "Flush the vascular line and continue CPR without interruption after administration.",
        ],
      },
    ],
    warnings: [
      "Asystole and PEA are nonshockable. Do not defibrillate or pace unless the rhythm changes to an appropriate perfusing or shockable rhythm.",
      "Do not delay or interrupt CPR for vascular access, medication administration, airway placement, or patient movement.",
      "Do not routinely administer calcium, sodium bicarbonate, magnesium, or antiarrhythmics in asystole/PEA. Use only for a specific protocol-supported cause.",
      "Naloxone must not delay standard resuscitation in confirmed cardiac arrest.",
      "Do not use point-of-care ultrasound during arrest unless separately approved by the agency medical director and governed by a dedicated protocol.",
      "Do not use a single EtCO2 cutoff or any single finding as the sole basis for terminating resuscitation.",
    ],
    clinicalPearls: [
      "Early, high-quality CPR and prompt epinephrine are the central therapies for nonshockable arrest.",
      "A sudden sustained increase in EtCO2 may signal ROSC; pause only for the scheduled brief rhythm and pulse check.",
      "Low or falling EtCO2 should prompt reassessment of compression quality, ventilation, airway placement, and reversible causes—not automatic termination.",
      "Moving a patient during active CPR commonly worsens compression quality and creates safety risk; favor on-scene resuscitation unless a special circumstance clearly supports transport.",
    ],
    specialPopulations: [
      {
        title: "Suspected Opioid-Associated Arrest",
        items: [
          "Prioritize CPR, ventilation, and standard cardiac-arrest care. Naloxone may be considered only when it does not delay or interrupt those interventions.",
        ],
      },
      {
        title: "Pregnancy",
        items: [
          "Begin standard resuscitation immediately and use the applicable pregnancy cardiac-arrest pathway for left uterine displacement and time-critical perimortem delivery decisions.",
        ],
      },
      {
        title: "Hypothermia or Toxicologic Arrest",
        items: [
          "Apply the relevant environmental or toxicology pathway because medication timing, resuscitation duration, and transport decisions may differ.",
        ],
      },
    ],
    actionLinks: [
      {
        label: "AC-09 VF / Pulseless VT",
        description: "Use immediately if the rhythm becomes shockable.",
        href: "/protocols/ac/ac-09",
        kind: "protocol",
      },
      {
        label: "AC-10 Post Resuscitation",
        description: "Use after return of spontaneous circulation.",
        href: "/protocols/ac/ac-10",
        kind: "protocol",
      },
      {
        label: "AC-11 TEAM Focused CPR",
        description: "Team roles and high-performance CPR workflow.",
        href: "/protocols/ac/ac-11",
        kind: "protocol",
      },
      {
        label: "AC-12 Termination of CPR",
        description: "Apply when ongoing resuscitation remains unsuccessful.",
        href: "/protocols/ac/ac-12",
        kind: "protocol",
      },
    ],
    references: [
      "American Heart Association. 2025 Adult Cardiac Arrest Algorithm.",
      "American Heart Association. 2025 Guidelines for CPR and ECC: Adult Basic Life Support and Adult Advanced Life Support.",
      "American Heart Association. 2025 Guidelines for CPR and ECC: Systems of Care.",
      "Tennessee Emergency Medical Services Board. Tennessee EMS Protocol Guidelines, September 2025.",
      "Claiborne EMS AC-11 TEAM Focused CPR, AC-12 Termination of CPR, and agency formulary.",
    ],
    sourcePdf: "/protocols/claiborne/ac-01-asystole-pulseless-electrical-activity-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Clinical content approved by the Claiborne EMS medical director during protocol review.",
      "App content remains a beta field reference until formal agency release and implementation approval.",
    ],
  },
  {
    id: "ac-02",
    title: "Bradycardia With a Pulse",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: [
      "Adult bradycardia pathway for patients 16 years of age and older. Bradycardia is typically a heart rate below 50/min, but treatment is determined by the patient's clinical condition rather than the rate alone.",
      "Treat cardiopulmonary compromise attributable to bradycardia while simultaneously identifying and correcting reversible causes.",
    ],
    flow: [
      {
        title: "Assess + Support",
        text: "Airway • oxygen for hypoxemia • assist ventilation as needed • monitor pulse, rhythm, SpO₂, and blood pressure • apply pacing/defibrillation pads.",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Cardiopulmonary Compromise?",
        text: "Hypotension • acutely altered mental status • shock • ischemic chest discomfort • acute heart failure. Confirm symptoms are caused by the bradycardia.",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "No Compromise",
        text: "Monitor, obtain 12-lead ECG and glucose, identify and treat the cause, obtain 2 complete vital-sign sets, and transport as clinically indicated.",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
      {
        title: "Severe Instability / High-Grade Block?",
        text: "If severe instability or high-grade AV block is present and vascular access is unavailable, begin transcutaneous pacing immediately while access is pursued.",
        levels: ["Paramedic"],
        tone: "urgent",
      },
      {
        title: "Atropine",
        text: "Paramedic: atropine 1 mg IV/IO. Repeat every 3–5 minutes to a maximum total dose of 3 mg. Do not delay pacing when atropine is unlikely to be effective.",
        levels: ["Paramedic"],
        tone: "action",
      },
      {
        title: "Persistent Instability",
        text: "Transcutaneous pacing and/or epinephrine infusion 2–10 mcg/min or dopamine infusion 5–20 mcg/kg/min; titrate to clinical response.",
        levels: ["Paramedic"],
        tone: "urgent",
      },
      {
        title: "Reassess + Transport",
        text: "Confirm mechanical capture, repeat ECG and vital signs, continue cause-directed care, and notify the receiving facility early.",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "EMT Care",
        summary: "BLS stabilization, monitoring, ECG acquisition, pacing-pad placement, and rapid transport.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Assess airway, breathing, circulation, mental status, perfusion, and whether the bradycardia is causing the patient's symptoms.",
              "Provide oxygen for hypoxemia and assist ventilation with BVM when respirations are inadequate.",
              "Apply cardiac monitor and pacing/defibrillation pads, monitor pulse, blood pressure, and SpO₂, and obtain blood glucose.",
              "Acquire and transmit a 12-lead ECG when it will not delay urgent treatment or transport.",
              "Obtain 2 complete vital-sign sets when feasible, assist the ALS provider, and initiate prompt transport for cardiopulmonary compromise or high-grade block.",
            ],
          },
        ],
      },
      {
        title: "AEMT Care",
        summary: "All EMT care plus IV/IO access and cautious isotonic fluid support for appropriate hypotension.",
        levels: [
          {
            level: "AEMT",
            actions: [
              "Perform all EMT actions and establish IV access without delaying pacing, ALS intercept, or transport.",
              "For severe instability, make one rapid IV attempt and proceed to IO if unsuccessful or access is otherwise infeasible or delayed.",
              "For hypotension when volume administration is clinically appropriate, give isotonic fluid in 250–500 mL aliquots with reassessment.",
              "Use smaller fluid volumes or avoid additional fluid when pulmonary edema, CHF, renal failure, liver failure, or volume overload is suspected.",
              "Prepare and assist with transcutaneous pacing, medication administration, serial ECGs, and continuous reassessment.",
            ],
          },
        ],
      },
      {
        title: "Paramedic Care",
        summary: "All AEMT care plus rhythm interpretation, atropine, transcutaneous pacing, pacing analgesia/sedation, and vasopressor infusions.",
        levels: [
          {
            level: "Paramedic",
            actions: [
              "Interpret the rhythm and identify sinus bradycardia, junctional escape, Mobitz I, Mobitz II, complete heart block, or pacemaker malfunction.",
              "Give atropine 1 mg IV/IO every 3–5 minutes to a maximum total dose of 3 mg when bradycardia is producing cardiopulmonary compromise.",
              "Do not delay transcutaneous pacing for atropine in severe instability, Mobitz II, complete heart block, or a new wide-QRS escape rhythm.",
              "If atropine is ineffective, use transcutaneous pacing and/or an epinephrine or dopamine infusion titrated to clinical response.",
              "Provide analgesia and sedation for pacing when the patient's condition permits, without delaying lifesaving pacing; use continuous cardiac, blood-pressure, respiratory, SpO₂, and EtCO₂ monitoring after sedation.",
              "Confirm and continually reassess mechanical capture, treat reversible causes, and coordinate early receiving-facility notification.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Patient 16 years of age or older with clinically significant bradycardia, typically a heart rate below 50/min.",
      "Bradycardia associated with hypotension, acutely altered mental status, signs of shock, ischemic chest discomfort, or acute heart failure.",
      "High-grade AV block or another bradyarrhythmia at risk for rapid deterioration.",
    ],
    contraindications: [
      "Do not provide rate-directed treatment solely for an asymptomatic low heart rate that is appropriate for the clinical condition.",
      "Do not use this pathway when the patient has no pulse; use the appropriate cardiac-arrest protocol.",
    ],
    assessment: [
      {
        title: "Clinical Stability",
        items: [
          "Determine whether bradycardia is causing hypotension, acutely altered mental status, shock, ischemic chest discomfort, or acute heart failure.",
          "Assess the relationship between symptom onset and the rhythm; a low heart rate may be normal in healthy adults, athletes, or during sleep.",
          "Continuously monitor pulse, blood pressure, rhythm, SpO₂, respiratory status, and mental status.",
        ],
      },
      {
        title: "Rhythm + Cardiac Evaluation",
        items: [
          "Acquire a 12-lead ECG when it will not delay urgent pacing, medication treatment, or transport.",
          "Identify high-grade AV block, wide-QRS escape rhythms, ischemia/infarction, pacemaker spikes without capture, and rhythm progression.",
          "Obtain serial ECGs and 2 complete vital-sign sets when feasible, including reassessment after each intervention.",
        ],
      },
      {
        title: "Reversible Causes",
        items: [
          "Hypoxia, myocardial ischemia or infarction, hyperkalemia or another electrolyte disturbance, acidosis, hypothermia, increased vagal tone, and pacemaker malfunction.",
          "Medication or toxicologic causes, including beta-blockers, calcium-channel blockers, digoxin, and other rate-slowing agents.",
        ],
      },
    ],
    treatmentSteps: [
      "Maintain a patent airway, provide oxygen for hypoxemia, assist ventilation as needed, and attach a cardiorespiratory monitor.",
      "Apply pacing/defibrillation pads early, monitor the pulse continuously, obtain blood glucose, and acquire a 12-lead ECG when it will not delay treatment.",
      "If no cardiopulmonary compromise is present, monitor and observe, identify and treat the cause, and transport as clinically indicated.",
      "For cardiopulmonary compromise, establish vascular access while supporting airway, breathing, and perfusion. In severe instability, make one rapid IV attempt and proceed to IO if unsuccessful or delayed.",
      "Give atropine 1 mg IV/IO every 3–5 minutes to a maximum total dose of 3 mg when appropriate.",
      "Begin immediate transcutaneous pacing for severe instability or high-grade AV block when vascular access is unavailable. Do not delay pacing for atropine in Mobitz II, complete heart block, or a new wide-QRS escape rhythm.",
      "For transcutaneous pacing, set a rate of 60–80/min and increase current until electrical capture occurs. Confirm mechanical capture with a palpable pulse, improved blood pressure, pulse-ox waveform, or EtCO₂ response—not ECG appearance alone.",
      "When the patient's condition permits, provide analgesia and sedation using the pain/procedural-sedation protocol; do not delay lifesaving pacing.",
      "If atropine is ineffective, continue pacing and/or begin epinephrine infusion 2–10 mcg/min or dopamine infusion 5–20 mcg/kg/min, titrated to clinical response.",
      "Give isotonic fluid only for hypotension when clinically appropriate, using 250–500 mL aliquots with reassessment and reduced volumes for patients at risk of overload.",
      "Identify and treat reversible causes and use the applicable ACS, CHF, hypothermia, or toxicology pathway when identified.",
      "Begin transport after immediate stabilization measures, continue serial ECGs and vital signs, and notify the receiving facility early.",
    ],
    medications: [
      {
        name: "Atropine",
        dose: "1 mg IV/IO; repeat every 3–5 minutes to a maximum total dose of 3 mg",
        notes: [
          "Paramedic standing order for bradycardia causing cardiopulmonary compromise.",
          "Do not delay pacing when atropine is unlikely to be effective or the patient is severely unstable.",
        ],
      },
      {
        name: "Epinephrine Infusion",
        dose: "2–10 mcg/min IV/IO infusion; titrate to clinical response",
        notes: [
          "Paramedic standing order for persistent unstable bradycardia when atropine is ineffective.",
          "Push-dose epinephrine is not included in this protocol.",
        ],
      },
      {
        name: "Dopamine Infusion",
        dose: "5–20 mcg/kg/min IV/IO infusion; titrate to clinical response",
        notes: [
          "Paramedic standing order for persistent unstable bradycardia when atropine is ineffective.",
          "Taper slowly after clinical stabilization when appropriate.",
        ],
      },
      {
        name: "Isotonic Crystalloid",
        dose: "250–500 mL IV/IO aliquots for hypotension when clinically appropriate; reassess after each aliquot",
        notes: [
          "Use smaller volumes or avoid additional fluid in pulmonary edema, CHF, renal failure, liver failure, or suspected volume overload.",
        ],
      },
    ],
    warnings: [
      "Treat the patient, not the monitor or a heart-rate number. Asymptomatic bradycardia generally does not require rate-directed treatment.",
      "Do not delay transcutaneous pacing in severe instability, Mobitz II, complete heart block, or a new wide-QRS escape rhythm.",
      "Electrical pacing artifacts do not prove perfusion. Confirm mechanical capture and reassess it continuously.",
      "Transcutaneous pacing is painful in a conscious patient; provide analgesia and sedation when feasible, but never delay lifesaving pacing.",
      "Do not use push-dose epinephrine under this protocol.",
      "Avoid routine fluid loading in acute heart failure, pulmonary edema, renal failure, liver failure, or suspected volume overload.",
    ],
    clinicalPearls: [
      "Correction of hypoxia, hyperkalemia, hypothermia, ischemia, or toxicologic causes may be more important than simply increasing the heart rate.",
      "In severe instability without vascular access, pacing can begin while another clinician pursues IV or IO access.",
      "Mechanical capture is supported by a pulse corresponding to paced complexes, improved blood pressure or perfusion, a pulse-ox waveform, or an EtCO₂ response.",
      "Prepare for clinical deterioration and cardiac arrest whenever high-grade AV block, a wide escape rhythm, or recurrent loss of capture is present.",
    ],
    specialPopulations: [
      {
        title: "Acute Coronary Syndrome",
        items: [
          "Obtain serial 12-lead ECGs, avoid delaying stabilization, and use AC-04 when ischemia or infarction is suspected.",
        ],
      },
      {
        title: "Medication or Toxicologic Bradycardia",
        items: [
          "Use TE-07 and contact Poison Control for suspected beta-blocker, calcium-channel blocker, digoxin, or other toxic exposure; antidotal treatment may be required in addition to pacing and pressor support.",
        ],
      },
      {
        title: "Hypothermia",
        items: [
          "Use TE-05 because medication response, pacing response, handling, and transport priorities may differ in significant hypothermia.",
        ],
      },
    ],
    actionLinks: [
      {
        label: "AC-04 Acute Coronary Syndrome / STEMI",
        description: "Use when myocardial ischemia or infarction is suspected.",
        href: "/protocols/ac/ac-04",
        kind: "protocol",
      },
      {
        label: "AC-05 CHF / Acute Pulmonary Edema",
        description: "Use when acute heart failure or pulmonary edema is present.",
        href: "/protocols/ac/ac-05",
        kind: "protocol",
      },
      {
        label: "TE-05 Hypothermia / Frostbite",
        description: "Use for significant hypothermia-associated bradycardia.",
        href: "/protocols/te/te-05",
        kind: "protocol",
      },
      {
        label: "TE-07 Overdose / Toxic Ingestion",
        description: "Use for medication- or toxin-associated bradycardia.",
        href: "/protocols/te/te-07",
        kind: "protocol",
      },
    ],
    references: [
      "American Heart Association. 2025 Adult Bradycardia With a Pulse Algorithm.",
      "American Heart Association. 2025 Guidelines for CPR and ECC: Adult Advanced Life Support, Initial Management of Bradycardia.",
      "American Heart Association. ACLS Provider Manual Change Notice, updated February 6, 2026.",
      "Tennessee Emergency Medical Services Board. Tennessee EMS Protocol Guidelines, September 2025.",
      "Claiborne EMS medication formulary and related cardiac, toxicology, environmental, pain, and sedation protocols.",
    ],
    sourcePdf: "/protocols/claiborne/ac-02-bradycardia-pulse-present-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Clinical content approved by the Claiborne EMS medical director during protocol review.",
      "App content remains a beta field reference until formal agency release and implementation approval.",
    ],
  },
  {
    id: "ac-03",
    title: "Adult Cardiac Arrest",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: [
      "Master adult cardiac-arrest pathway for patients 16 years of age and older. Use this protocol to begin coordinated resuscitation and route immediately to the appropriate rhythm-specific pathway.",
      "Prioritize high-quality TEAM-focused CPR, rapid defibrillation when indicated, oxygenation and ventilation, guideline-directed medications, reversible causes, and on-scene resuscitation.",
    ],
    flow: [
      {
        title: "Confirm Cardiac Arrest",
        text: "Unresponsive • absent or abnormal breathing • no definite pulse within 10 seconds • honor valid DNR/MOST and obvious-death criteria.",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Start TEAM-Focused CPR",
        text: "Compressions 100–120/min • depth 2–2.4 in • full recoil • minimal pauses • change compressor every 2 min • chest-compression fraction goal >80%.",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Attach AED / Monitor",
        text: "Analyze rhythm immediately. Resume CPR after every rhythm check or shock. Check a pulse only with an organized rhythm and limit the check to 10 seconds.",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Shockable Rhythm?",
        text: "VF/pulseless VT → open AC-09. Asystole/PEA → open AC-01. Repeat rhythm analysis every 2 minutes.",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Access + Medication",
        text: "One rapid IV attempt, then IO if unsuccessful or delayed. Epinephrine 1 mg IV/IO every 3–5 min; timing follows the rhythm pathway.",
        levels: ["AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Airway + Capnography",
        text: "Two-person BVM first. Do not interrupt compressions for airway placement. After an advanced airway, give 1 breath every 6 sec with continuous compressions and waveform capnography.",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Treat Reversible Causes",
        text: "Actively evaluate and treat the Hs and Ts. Use cause-specific therapy rather than routine empiric arrest medications.",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "ROSC or Termination",
        text: "ROSC → open AC-10. No ROSC → continue rhythm pathway and evaluate AC-12 when appropriate. Favor on-scene resuscitation unless a defined special circumstance supports transport.",
        levels: ["EMT", "AEMT", "Paramedic", "Medical Control"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "EMT Care",
        summary: "Arrest recognition, TEAM-focused CPR, AED care, two-person BVM ventilation, and basic reversible-cause treatment.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Confirm unresponsiveness, absent or abnormal breathing, and no definite pulse within 10 seconds; identify valid DNR/MOST or obvious-death criteria.",
              "Activate additional resources and begin TEAM-focused CPR immediately, assuming or assigning compressor, airway, AED/monitor, recorder/timer, and team-lead functions.",
              "Perform compressions at 100–120/min to a depth of 2–2.4 inches with complete recoil, minimal interruptions, compressor changes every 2 minutes, and a chest-compression fraction goal above 80%.",
              "Apply the AED, deliver indicated shocks, and resume CPR immediately after every shock or rhythm analysis without an immediate pulse check.",
              "Provide two-person BVM ventilation with oxygen and an airway adjunct when available; maintain 30:2 until an advanced airway is in place.",
              "Assist with medication timing, documentation, reversible-cause treatment, family support, and safe movement only when indicated.",
            ],
          },
        ],
      },
      {
        title: "AEMT Care",
        summary: "All EMT care plus vascular access, epinephrine, supraglottic airway, and capnography when available.",
        levels: [
          {
            level: "AEMT",
            actions: [
              "Perform all EMT actions and make one rapid IV attempt without interrupting CPR or delaying defibrillation.",
              "If IV access is unsuccessful, infeasible, or delayed, establish IO access; use proximal tibia preferentially and humeral head only when tibial access is contraindicated.",
              "Give epinephrine 1 mg IV/IO every 3–5 minutes: as soon as possible for asystole/PEA and after the second shock for VF/pulseless VT.",
              "Place a supraglottic airway without interrupting compressions when BVM ventilation is ineffective or an advanced airway will improve care.",
              "After advanced-airway placement, ventilate once every 6 seconds during continuous compressions and use waveform capnography when available.",
            ],
          },
        ],
      },
      {
        title: "Paramedic Care",
        summary: "All AEMT care plus manual rhythm interpretation and defibrillation, definitive airway options, antiarrhythmics, and advanced reversible-cause treatment.",
        levels: [
          {
            level: "Paramedic",
            actions: [
              "Perform all EMT and AEMT actions and direct the rhythm-specific pathway, TEAM-focused resuscitation, scene strategy, and transition of care.",
              "For VF/pulseless VT, perform manual defibrillation using the manufacturer-recommended biphasic energy; if unknown, use the maximum available energy and follow AC-09.",
              "After the third shock for persistent VF/pulseless VT, give either amiodarone or lidocaine according to AC-09; do not combine them.",
              "Choose a supraglottic airway or endotracheal intubation according to patient and scene conditions; airway placement must not interrupt compressions.",
              "Use continuous waveform capnography after any advanced airway and treat reversible causes with indication-specific therapy.",
              "Transition immediately to AC-10 after ROSC or apply AC-12 when termination criteria are met.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Patient 16 years of age or older who is unresponsive, has absent or abnormal breathing, and has no definite pulse within 10 seconds.",
      "Adult patient in ventricular fibrillation, pulseless ventricular tachycardia, asystole, or pulseless electrical activity requiring resuscitation.",
    ],
    contraindications: [
      "Valid DNR, MOST, or other recognized order directing that resuscitation not be attempted.",
      "Obvious-death findings or circumstances addressed by agency policy.",
      "A definite pulse is present; use the appropriate perfusing-rhythm or medical protocol instead.",
    ],
    assessment: [
      {
        title: "Arrest Confirmation",
        items: [
          "Assess responsiveness, breathing, and central pulse simultaneously; limit the pulse check to 10 seconds.",
          "If there is uncertainty about the pulse, begin CPR rather than delaying treatment.",
          "Identify the arrest as medical, traumatic, toxicologic, environmental, pregnancy-related, drowning-related, or associated with a mechanical circulatory device.",
        ],
      },
      {
        title: "CPR Quality",
        items: [
          "Compression rate 100–120/min and depth 2–2.4 inches with complete recoil.",
          "Minimize pauses, keep rhythm and pulse checks under 10 seconds, and change compressors approximately every 2 minutes.",
          "Target a chest-compression fraction above 80% and use real-time CPR feedback when available.",
        ],
      },
      {
        title: "Rhythm Assessment",
        items: [
          "Analyze rhythm as soon as the AED or monitor is available and approximately every 2 minutes thereafter.",
          "Route VF/pulseless VT to AC-09 and asystole/PEA to AC-01 using the direct protocol links.",
          "Check a pulse only when an organized rhythm is present or ROSC is otherwise suspected.",
        ],
      },
      {
        title: "Reversible Causes — Hs and Ts",
        items: [
          "Hypovolemia, hypoxia, hydrogen ion excess/acidosis, hypo-/hyperkalemia, and hypothermia.",
          "Tension pneumothorax, cardiac tamponade, toxins, coronary thrombosis, and pulmonary thrombosis.",
        ],
      },
    ],
    treatmentSteps: [
      "Begin high-quality CPR immediately and open AC-11 for TEAM-focused roles and performance targets.",
      "Apply AED/monitor pads and analyze the rhythm. Resume CPR immediately after every rhythm check or shock.",
      "For VF/pulseless VT, open AC-09 and prioritize rapid defibrillation. For asystole/PEA, open AC-01 and give epinephrine as soon as possible.",
      "Use manufacturer-recommended biphasic defibrillation energy; when the recommended energy is unknown, use the maximum available energy.",
      "Perform rhythm analysis every 2 minutes. Check a pulse only with an organized rhythm or other evidence of ROSC, and limit the check to 10 seconds.",
      "Make one rapid IV attempt, then proceed to IO when IV access is unsuccessful, infeasible, or delayed. Proximal tibia is preferred; humeral head is an alternate only when tibial access is contraindicated.",
      "Give epinephrine 1 mg IV/IO every 3–5 minutes. Give it as soon as possible for nonshockable rhythms and after the second shock for VF/pulseless VT.",
      "For persistent VF/pulseless VT after the third shock, give either amiodarone or lidocaine according to AC-09. Do not combine the two agents.",
      "Provide two-person BVM ventilation first, maintaining 30:2 before an advanced airway and avoiding excessive ventilation.",
      "After advanced-airway placement, give 1 breath every 6 seconds during continuous compressions and use continuous waveform capnography.",
      "Use changes in waveform EtCO₂ as one component of assessment. An abrupt sustained rise may indicate ROSC; never use a single EtCO₂ value alone to terminate resuscitation.",
      "Identify and treat reversible causes. Give fluids, calcium, sodium bicarbonate, magnesium, antidotes, or other therapies only for a specific suspected or confirmed cause.",
      "Continue resuscitation on scene for most arrests. Transport during CPR only for a defined special circumstance or after sustained ROSC.",
      "Use mechanical CPR only when high-quality manual compressions are unsafe or impractical and device placement can occur with minimal interruption.",
      "If ROSC occurs, open AC-10. If resuscitation remains unsuccessful, open AC-12 and apply termination guidance when appropriate.",
    ],
    medications: [
      {
        name: "Epinephrine 1 mg/10 mL (0.1 mg/mL)",
        dose: "1 mg IV/IO every 3–5 minutes",
        notes: [
          "AEMT and Paramedic standing order for adult cardiac arrest.",
          "Give as soon as possible for asystole/PEA and after the second shock for VF/pulseless VT.",
        ],
      },
      {
        name: "Amiodarone",
        dose: "300 mg IV/IO after the third shock for refractory VF/pulseless VT; may repeat 150 mg IV/IO once",
        notes: [
          "Paramedic standing order under AC-09.",
          "Choose amiodarone or lidocaine; do not combine them.",
        ],
      },
      {
        name: "Lidocaine",
        dose: "1–1.5 mg/kg IV/IO after the third shock; then 0.5–0.75 mg/kg every 5–10 minutes; maximum total 3 mg/kg",
        notes: [
          "Paramedic alternative to amiodarone under AC-09.",
          "Choose lidocaine or amiodarone; do not combine them.",
        ],
      },
    ],
    warnings: [
      "Do not interrupt CPR for IV/IO access, medication preparation, airway attempts, device placement, or prolonged rhythm checks.",
      "Do not transport routinely during active CPR. Movement commonly worsens compression quality and increases risk to the crew and public.",
      "Do not routinely administer calcium, sodium bicarbonate, magnesium, fluids, antidotes, or other cause-specific treatments without an appropriate indication.",
      "Naloxone must not delay CPR, defibrillation, airway support, or standard cardiac-arrest medications.",
      "Do not use routine head-up CPR, double-sequential defibrillation, vector-change defibrillation, or point-of-care ultrasound under this protocol.",
      "Do not use a single EtCO₂ cutoff or any single finding as the sole basis for terminating resuscitation.",
    ],
    clinicalPearls: [
      "High-quality compressions and rapid defibrillation for a shockable rhythm provide the greatest immediate opportunity to improve outcome.",
      "Give epinephrine early for nonshockable arrest, but do not allow it to delay initial defibrillation attempts in VF/pulseless VT.",
      "A sudden sustained increase in EtCO₂ may signal ROSC; pause only for the scheduled brief rhythm and pulse check.",
      "Clear role assignment, closed-loop communication, visible medication and event timing, and structured debriefing improve team reliability.",
    ],
    specialPopulations: [
      {
        title: "Pregnancy",
        items: [
          "Begin standard resuscitation immediately. Use continuous left uterine displacement when the fundus is at or above the umbilicus and activate the pregnancy cardiac-arrest pathway.",
        ],
      },
      {
        title: "Traumatic Arrest",
        items: [
          "Use TB-10 because hemorrhage control, oxygenation, bilateral chest decompression, and transport decisions differ from primary medical arrest.",
        ],
      },
      {
        title: "Hypothermia, Drowning, or Toxicologic Arrest",
        items: [
          "Use TE-05, TE-03, or TE-07 because pulse assessment, medication timing, resuscitation duration, antidotes, and transport decisions may differ.",
        ],
      },
      {
        title: "Mechanical Circulatory Device",
        items: [
          "Use AC-14 or the applicable mechanical-circulation protocol; continuous-flow devices may not produce a palpable pulse, so assess perfusion and device function before starting compressions.",
        ],
      },
    ],
    actionLinks: [
      {
        label: "AC-09 VF / Pulseless VT",
        description: "Open the shockable-rhythm pathway.",
        href: "/protocols/ac/ac-09",
        kind: "protocol",
      },
      {
        label: "AC-01 Asystole / PEA",
        description: "Open the nonshockable-rhythm pathway.",
        href: "/protocols/ac/ac-01",
        kind: "protocol",
      },
      {
        label: "AC-11 TEAM-Focused CPR",
        description: "Open team roles and CPR performance targets.",
        href: "/protocols/ac/ac-11",
        kind: "protocol",
      },
      {
        label: "AC-10 Post-Resuscitation Care",
        description: "Open immediately after ROSC.",
        href: "/protocols/ac/ac-10",
        kind: "protocol",
      },
      {
        label: "AC-12 Termination of Resuscitation",
        description: "Open when resuscitation remains unsuccessful.",
        href: "/protocols/ac/ac-12",
        kind: "protocol",
      },
    ],
    references: [
      "American Heart Association. 2025 Adult Cardiac Arrest Algorithm.",
      "American Heart Association. 2025 Guidelines for CPR and ECC: Adult Basic Life Support and Adult Advanced Life Support.",
      "American Heart Association. 2025 Guidelines for CPR and ECC: Systems of Care.",
      "American Heart Association. 2025 Guidelines for CPR and ECC: Adult and Pediatric Special Circumstances of Resuscitation.",
      "Tennessee Emergency Medical Services Board. Tennessee EMS Protocol Guidelines, September 2025.",
      "Claiborne EMS AC-01, AC-09, AC-10, AC-11, AC-12, medication formulary, and related special-circumstance protocols.",
    ],
    sourcePdf: "/protocols/claiborne/ac-03-cardiac-arrest-adult-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Clinical content approved by the Claiborne EMS medical director during protocol review.",
      "App content remains a beta field reference until formal agency release and implementation approval.",
    ],
  },
  {
    id: "ac-05",
    title: "CHF / Acute Pulmonary Edema",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: [
      "Adult pathway for patients 16 years of age and older with suspected cardiogenic pulmonary edema or acute decompensated heart failure.",
      "Prioritize early noninvasive positive-pressure ventilation and blood-pressure-guided vasodilation while identifying acute coronary syndrome, dysrhythmia, cardiogenic shock, and alternative causes of respiratory distress.",
      "Target scene time is less than 15 minutes unless essential stabilization requires additional time.",
    ],
    flow: [
      {
        title: "Suspected Pulmonary Edema",
        text: "Acute dyspnea • orthopnea • rales • diaphoresis • hypertension • JVD/edema • frothy sputum",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Position + Monitor",
        text: "Upright unless hypotensive • SpO₂ • frequent BP • cardiac monitor • IV • 12-lead without delaying support",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Moderate / Severe Distress?",
        text: "Spontaneously breathing • airway protected • cooperative enough for mask • SBP ≥100",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Start CPAP Early",
        text: "If adjustable: start 5 cm H₂O and titrate to 10 • fixed device: manufacturer setting • reassess continuously",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Nitroglycerin Eligible?",
        text: "SBP ≥110 before every dose • no shock, RV infarction/preload dependence, or prohibited PDE-5 use",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Nitroglycerin",
        text: "0.4 mg SL every 5 min • maximum 3 • EMT assists prescribed medication • AEMT/Paramedic agency medication",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Shock or Ventilatory Failure?",
        text: "Stop nitrates • reduce/remove CPAP if worsening hypotension • BVM/advanced airway • norepinephrine for cardiogenic shock",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Reassess + Transport",
        text: "BP • work of breathing • mental status • SpO₂/EtCO₂ • lung sounds • early alert • scene target <15 min",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "EMT Care",
        summary: "Rapid recognition, positioning, oxygenation, CPAP, prescribed-nitroglycerin assistance, monitoring, and early transport.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Perform the primary assessment; position upright unless hypotensive and assess respiratory effort, lung sounds, perfusion, mental status, SpO₂, and complete vital signs.",
              "Apply the cardiac monitor/AED and obtain a 12-lead ECG when trained and equipped, without delaying respiratory support.",
              "Start CPAP early for moderate-to-severe distress when the patient is breathing spontaneously, can protect the airway, can tolerate the mask, and has SBP of at least 100 mmHg.",
              "Titrate oxygen to SpO₂ 92–96%; use 88–92% for known chronic hypercapnic respiratory failure unless severe hypoxemia requires a higher target.",
              "Assist with the patient's prescribed nitroglycerin only when SBP is at least 110 mmHg and no contraindication is present.",
              "Prepare for BVM ventilation, rapid transport, and ALS support if mental status, ventilation, perfusion, or CPAP tolerance worsens.",
            ],
          },
        ],
      },
      {
        title: "AEMT Care",
        summary: "All EMT care plus vascular access, agency nitroglycerin, CPAP management, and recognition of cardiogenic shock.",
        levels: [
          {
            level: "AEMT",
            actions: [
              "Perform all EMT actions and establish IV access without delaying CPAP, nitroglycerin, or transport.",
              "Give nitroglycerin 0.4 mg SL every 5 minutes, maximum three doses, only when SBP is at least 110 mmHg before every dose and no contraindication is present.",
              "Reassess blood pressure, symptoms, work of breathing, mental status, SpO₂, and perfusion after every nitroglycerin dose and CPAP adjustment.",
              "Do not administer a routine fluid bolus when pulmonary edema is present.",
              "Support ventilation with BVM and immediately request paramedic intervention when shock, ventilatory failure, or inability to protect the airway develops.",
            ],
          },
        ],
      },
      {
        title: "Paramedic Care",
        summary: "All AEMT care plus advanced ECG assessment, cardiogenic-shock treatment, advanced airway management, and linked cause-specific care.",
        levels: [
          {
            level: "Paramedic",
            actions: [
              "Perform all EMT and AEMT actions; interpret the 12-lead ECG and evaluate for ACS, dysrhythmia, acute valvular disease, hypertensive pulmonary edema, and cardiogenic shock.",
              "For persistent cardiogenic shock, start norepinephrine at 0.1 mcg/kg/min IV/IO and titrate to MAP of at least 65 mmHg or SBP of at least 90 mmHg; maximum 2 mcg/kg/min.",
              "Withhold nitroglycerin and reduce or discontinue CPAP when either intervention is worsening hypotension or perfusion.",
              "Use waveform EtCO₂ when available and technically compatible with CPAP; trend ventilation and response rather than relying on a single value.",
              "Prepare for drug-assisted airway management when CPAP fails, ventilation is inadequate, mental status declines, or the airway cannot be protected; anticipate peri-intubation hypotension.",
              "Open AC-04 for suspected ACS/STEMI, AM-05 for shock, AR-03 for drug-assisted airway management, or AC-03 for cardiac arrest.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Suspected cardiogenic pulmonary edema or acute decompensated heart failure in a patient 16 years of age or older.",
      "Acute dyspnea with orthopnea, rales, diaphoresis, hypertension, jugular venous distention, peripheral edema, frothy sputum, or a history strongly suggestive of heart failure.",
      "Respiratory distress associated with suspected acute cardiac ischemia, dysrhythmia, valvular disease, renal failure, or medication nonadherence when pulmonary edema is clinically suspected.",
    ],
    contraindications: [
      "CPAP is contraindicated for apnea, inadequate spontaneous ventilation, active vomiting, inability to protect the airway, significant facial trauma preventing a seal, suspected untreated pneumothorax, severe agitation preventing safe application, or SBP below 100 mmHg.",
      "Nitroglycerin is contraindicated when SBP is below 110 mmHg, shock or preload dependence is present, right-ventricular infarction is suspected, or prohibited recent PDE-5 inhibitor use is identified.",
      "Do not administer routine large-volume crystalloid when pulmonary edema is present.",
    ],
    assessment: [
      {
        title: "Focused history",
        items: [
          "Determine onset and progression, orthopnea, paroxysmal nocturnal dyspnea, chest discomfort, palpitations, syncope, fever, cough, sputum, medication adherence, dialysis schedule, recent weight gain, and baseline oxygen or CPAP use.",
          "Identify prior heart failure, myocardial infarction, PCI/CABG, valvular disease, renal failure, dysrhythmia, COPD/asthma, pulmonary embolism, and implanted cardiac devices.",
          "Review nitrates already taken, diuretics and antihypertensives, antiplatelet or anticoagulant therapy, and recent PDE-5 inhibitor use.",
        ],
      },
      {
        title: "Examination and monitoring",
        items: [
          "Assess respiratory rate and pattern, accessory-muscle use, speech, lung sounds, diaphoresis, cyanosis, frothy sputum, JVD, edema, pulse quality, capillary refill, and mental status.",
          "Obtain continuous cardiac monitoring, SpO₂, frequent blood pressures, and two complete vital-sign sets when feasible.",
          "Obtain a 12-lead ECG without delaying CPAP, ventilation, or transport; use AC-04 when ACS or STEMI is suspected.",
          "Use waveform EtCO₂ when available and technically compatible with CPAP or assisted ventilation.",
        ],
      },
      {
        title: "Alternative and precipitating diagnoses",
        items: [
          "Consider acute coronary syndrome, hypertensive emergency, dysrhythmia, acute valvular disease, renal failure, medication nonadherence, infection, and dietary or fluid excess as precipitants.",
          "Consider COPD/asthma, pneumonia, pulmonary embolism, pneumothorax, aspiration, anaphylaxis, metabolic acidosis, and other causes of respiratory distress.",
          "Wheezing may occur with pulmonary edema; do not assume asthma or COPD solely because wheezing is present.",
        ],
      },
    ],
    treatmentSteps: [
      "Position upright unless hypotensive and begin continuous cardiac monitoring, SpO₂, frequent blood-pressure measurement, and focused reassessment.",
      "Titrate oxygen to SpO₂ 92–96%; use 88–92% for known chronic hypercapnic respiratory failure unless severe hypoxemia requires a higher target.",
      "Start CPAP early for moderate-to-severe respiratory distress when the patient is breathing spontaneously, can protect the airway, can tolerate the mask, and has SBP of at least 100 mmHg.",
      "For adjustable CPAP, begin at 5 cm H₂O and titrate to 10 cm H₂O according to response and tolerance. For a fixed-pressure device, use the manufacturer-approved setting.",
      "Assist with prescribed nitroglycerin at the EMT level or administer agency nitroglycerin at the AEMT/Paramedic level: 0.4 mg SL every 5 minutes as needed, maximum three doses.",
      "Confirm SBP of at least 110 mmHg before every nitroglycerin dose. Withhold for shock, suspected RV infarction or preload dependence, avanafil within 12 hours, sildenafil or vardenafil within 24 hours, or tadalafil within 48 hours.",
      "Reassess blood pressure, respiratory effort, mental status, SpO₂, lung sounds, perfusion, and mask tolerance after every nitroglycerin dose and CPAP adjustment.",
      "Do not routinely administer furosemide, another diuretic, morphine, another opioid, or an IV fluid bolus under this protocol.",
      "Administer albuterol only when true bronchospasm is suspected; wheezing alone may be caused by pulmonary edema.",
      "For hypotension or cardiogenic shock, withhold nitroglycerin, reduce or discontinue CPAP if it worsens perfusion, support ventilation, and avoid routine crystalloid when pulmonary edema is present.",
      "For persistent cardiogenic shock, a paramedic may start norepinephrine at 0.1 mcg/kg/min IV/IO and titrate to MAP of at least 65 mmHg or SBP of at least 90 mmHg; maximum 2 mcg/kg/min.",
      "Prepare for advanced airway management when CPAP fails, ventilation is inadequate, mental status declines, or the airway cannot be protected.",
      "Notify the receiving facility early, treat while moving toward transport, and target scene time under 15 minutes.",
    ],
    medications: [
      {
        name: "Nitroglycerin",
        dose: "0.4 mg SL every 5 minutes as needed; maximum 3 doses",
        notes: [
          "EMT may assist with the patient's prescribed nitroglycerin; AEMT and Paramedic may administer agency nitroglycerin.",
          "Confirm SBP of at least 110 mmHg before every dose.",
          "Withhold for shock, suspected right-ventricular infarction or preload dependence, avanafil within 12 hours, sildenafil or vardenafil within 24 hours, or tadalafil within 48 hours.",
          "IV bolus, infusion, and other high-dose nitroglycerin regimens are not authorized under AC-05.",
        ],
      },
      {
        name: "Norepinephrine",
        dose: "Start 0.1 mcg/kg/min IV/IO; titrate to MAP ≥65 mmHg or SBP ≥90 mmHg; maximum 2 mcg/kg/min",
        notes: [
          "Paramedic standing order for persistent cardiogenic shock.",
          "Continuous cardiac monitoring, frequent blood-pressure assessment, and careful IV/IO-site surveillance are required.",
          "Use a proximal, well-functioning IV or IO and reassess perfusion frequently.",
        ],
      },
      {
        name: "Albuterol",
        dose: "Use the approved respiratory dose only when true bronchospasm is suspected",
        notes: [
          "Do not administer solely because wheezing is present; pulmonary edema may produce cardiac wheezing.",
        ],
      },
    ],
    warnings: [
      "Do not delay CPAP, ventilation, or transport for IV access or a 12-lead ECG.",
      "Do not use CPAP for apnea, inadequate spontaneous ventilation, inability to protect the airway, active vomiting, or shock.",
      "Positive-pressure ventilation can worsen hypotension; reassess blood pressure and perfusion continuously.",
      "Withhold nitroglycerin for SBP below 110 mmHg, shock, suspected right-ventricular infarction or preload dependence, and prohibited recent PDE-5 inhibitor use.",
      "Do not routinely administer a diuretic, opioid, or IV fluid bolus under AC-05.",
      "Norepinephrine requires continuous cardiac monitoring, frequent blood-pressure measurement, and IV/IO-site assessment.",
      "Intubation in cardiogenic shock may precipitate profound hypotension or cardiac arrest; optimize oxygenation and hemodynamics and prepare vasopressor support.",
    ],
    clinicalPearls: [
      "Early CPAP and blood-pressure-guided nitroglycerin are the principal field interventions for hypertensive cardiogenic pulmonary edema.",
      "Acute pulmonary edema may reflect rapid fluid redistribution rather than total-body fluid overload; a single physical finding does not establish the diagnosis.",
      "Wheezing does not exclude pulmonary edema, and rales do not exclude COPD, pneumonia, or another respiratory diagnosis.",
      "A normal initial ECG does not exclude acute coronary syndrome; use AC-04 when the history or tracing is concerning.",
      "Improvement in speech, respiratory rate, work of breathing, mental status, SpO₂, and blood pressure provides a useful treatment-response trend.",
    ],
    specialPopulations: [
      {
        title: "Renal failure or dialysis",
        items: [
          "Determine the last completed dialysis treatment, missed treatments, access complications, baseline weight, and known potassium problems.",
          "Avoid routine fluid administration and consider hyperkalemia when bradycardia, weakness, peaked T waves, or QRS widening is present.",
        ],
      },
      {
        title: "Cardiogenic shock",
        items: [
          "Hypotension, altered mental status, cool or mottled skin, weak pulses, delayed capillary refill, and reduced urine output suggest poor perfusion.",
          "Withhold nitrates, limit positive pressure when it worsens perfusion, avoid routine crystalloid in pulmonary edema, and start norepinephrine when indicated.",
        ],
      },
    ],
    actionLinks: [
      {
        label: "AC-04 ACS / STEMI",
        description: "Open for suspected ischemia, STEMI, or acute coronary occlusion.",
        href: "/protocols/ac/ac-04",
        kind: "protocol",
      },
      {
        label: "AM-05 Hypotension / Shock",
        description: "Open for persistent hypotension or shock management.",
        href: "/protocols/am/am-05",
        kind: "protocol",
      },
      {
        label: "AR-03 Drug-Assisted Airway",
        description: "Open when CPAP fails or airway protection is lost.",
        href: "/protocols/ar/ar-03",
        kind: "protocol",
      },
      {
        label: "AC-03 Adult Cardiac Arrest",
        description: "Open immediately if the patient becomes pulseless.",
        href: "/protocols/ac/ac-03",
        kind: "protocol",
      },
    ],
    references: [
      "American Heart Association/American College of Cardiology/Heart Failure Society of America. 2022 Guideline for the Management of Heart Failure.",
      "Tennessee Emergency Medical Services Board. Tennessee EMS Protocol Guidelines, September 2025.",
      "Claiborne EMS medication formulary and related AC-03, AC-04, AM-05, and AR-03 protocols.",
    ],
    sourcePdf: "/protocols/claiborne/ac-05-chf-pulmonary-edema-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Clinical content approved by the Claiborne EMS medical director during protocol review.",
      "CPAP equipment, fixed or adjustable pressure capabilities, and training must be confirmed before formal agency implementation.",
      "App content remains a beta field reference until formal agency release and implementation approval.",
    ],
  },
  {
    id: "ac-06",
    title: "Adult Narrow-Complex Tachycardia",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: [
      "Adult pathway for patients 16 years of age and older with a pulse and a narrow-complex tachycardia, generally defined by QRS duration under 0.12 seconds.",
      "Determine whether the tachyarrhythmia is causing instability or represents compensation for another problem before attempting rhythm conversion.",
      "A tachyarrhythmia causing instability is typically at least 150/min, but treatment is determined by the patient's clinical condition rather than rate alone.",
    ],
    flow: [
      {
        title: "Assess in Clinical Context",
        text: "Airway/ventilation • oxygen if hypoxemic • monitor/pads • BP/SpO₂ • IV • 12-lead when it will not delay urgent treatment",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Sinus Tachycardia / Secondary Cause?",
        text: "Treat hypoxia, pain, fever, dehydration, hemorrhage, sepsis, stimulant exposure, or another underlying cause",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Instability Caused by Rhythm?",
        text: "Hypotension • acute altered mental status • shock • ischemic chest discomfort • acute heart failure",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Unstable → Synchronized Cardioversion",
        text: "Regular narrow 100 J • AF 200 J • flutter 200 J • sedate when feasible without delaying shock • resynchronize every time",
        levels: ["Paramedic"],
        tone: "urgent",
      },
      {
        title: "Stable + Regular",
        text: "Modified Valsalva • no carotid massage • if unsuccessful, adenosine",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Adenosine",
        text: "Paramedic: 6 mg rapid IV/IO + immediate flush • then 12 mg once after 1–2 min if needed • continuous rhythm recording",
        levels: ["Paramedic"],
        tone: "action",
      },
      {
        title: "Stable AF / Flutter",
        text: "No routine adenosine • if symptomatic and SBP ≥110: diltiazem 10–20 mg IV/IO over 2 min when no contraindication",
        levels: ["Paramedic"],
        tone: "decision",
      },
      {
        title: "Reassess + Transport",
        text: "Post-treatment rhythm strip/12-lead • complete vital signs • monitor recurrence • route wide or polymorphic rhythms appropriately",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "EMT Care",
        summary: "Recognition, supportive care, monitoring, pad placement, modified Valsalva, and rapid escalation for instability.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Perform the primary assessment; support airway and ventilation, give oxygen only when hypoxemic, and assess whether the tachycardia is likely causing the patient's symptoms.",
              "Obtain complete vital signs, apply the cardiac monitor/AED and defibrillation pads, and obtain a 12-lead ECG when trained and equipped without delaying urgent treatment.",
              "Identify and treat likely causes of sinus tachycardia, including hypoxia, pain, fever, dehydration, hemorrhage, sepsis, and stimulant exposure.",
              "For a stable, regular narrow-complex rhythm, coach a modified Valsalva maneuver. Do not perform carotid massage.",
              "Immediately request paramedic intervention and prepare for synchronized cardioversion when instability is attributable to the tachycardia.",
            ],
          },
        ],
      },
      {
        title: "AEMT Care",
        summary: "All EMT care plus vascular access, ECG acquisition, treatment preparation, and monitoring during cardioversion.",
        levels: [
          {
            level: "AEMT",
            actions: [
              "Perform all EMT actions and establish IV/IO access without delaying synchronized cardioversion or transport.",
              "Acquire a 12-lead ECG before treatment when feasible and assist with continuous rhythm recording during adenosine administration.",
              "Prepare medication, suction, oxygenation/ventilation equipment, and airway equipment for cardioversion and procedural sedation.",
              "Reassess blood pressure, mental status, perfusion, chest discomfort, respiratory status, and rhythm after every intervention.",
              "Do not independently administer adenosine, diltiazem, or procedural sedation under AC-06.",
            ],
          },
        ],
      },
      {
        title: "Paramedic Care",
        summary: "All AEMT care plus rhythm interpretation, adenosine, diltiazem, synchronized cardioversion, and procedural sedation.",
        levels: [
          {
            level: "Paramedic",
            actions: [
              "Perform all EMT and AEMT actions; determine rhythm regularity, QRS duration, hemodynamic effect, and whether the tachycardia is the cause of instability.",
              "For unstable regular narrow-complex tachycardia, cardiovert at 100 J. For unstable atrial fibrillation or flutter, cardiovert at 200 J.",
              "Confirm synchronization markers before every shock and resynchronize after every cardioversion attempt; increase energy after an unsuccessful shock.",
              "Sedate whenever feasible with midazolam 2–5 mg IV/IO using the smallest effective dose, but do not delay cardioversion.",
              "For stable regular narrow-complex tachycardia after unsuccessful modified Valsalva, give adenosine 6 mg rapid IV/IO with an immediate flush, then 12 mg once after 1–2 minutes if needed.",
              "For significantly symptomatic stable atrial fibrillation/flutter with SBP of at least 110 mmHg and no contraindication, give diltiazem 10–20 mg IV/IO over 2 minutes.",
              "Route suspected pre-excited, wide-complex, or polymorphic rhythms to the appropriate pathway and contact Medical Control early.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Narrow-complex tachycardia with a pulse in a patient 16 years of age or older.",
      "Stable regular narrow-complex tachycardia potentially responsive to modified Valsalva or adenosine.",
      "Atrial fibrillation or atrial flutter with rapid ventricular response requiring assessment for instability or rate control.",
    ],
    contraindications: [
      "Do not administer adenosine or perform cardioversion for sinus tachycardia; treat the underlying cause.",
      "Do not administer adenosine for an irregular rhythm, unstable wide-complex tachycardia, polymorphic tachycardia, or active severe bronchospasm.",
      "Do not administer diltiazem for hypotension, acute decompensated heart failure, suspected systolic dysfunction, acute coronary syndrome, pre-excited atrial fibrillation/flutter, or an undifferentiated wide-complex rhythm.",
    ],
    assessment: [
      {
        title: "Initial assessment",
        items: [
          "Maintain a patent airway, assist ventilation as needed, and administer oxygen only for hypoxemia.",
          "Obtain continuous cardiac monitoring, defibrillation pads, frequent blood pressure, SpO₂, IV access, and two complete vital-sign sets when feasible.",
          "Obtain a 12-lead ECG before treatment when the patient is stable enough and it will not delay cardioversion.",
          "Determine onset, prior episodes, medications, stimulant or toxicologic exposure, cardiac history, heart-failure history, anticoagulant use, and known pre-excitation.",
        ],
      },
      {
        title: "Instability attributable to tachycardia",
        items: [
          "Hypotension.",
          "Acutely altered mental status.",
          "Signs of shock or poor perfusion.",
          "Ischemic chest discomfort.",
          "Acute heart failure.",
          "Confirm that the rhythm is causing instability rather than representing a compensatory response to another condition such as sepsis, hemorrhage, hypoxia, or pain.",
        ],
      },
      {
        title: "Rhythm classification",
        items: [
          "Confirm QRS duration under 0.12 seconds and determine whether the rhythm is regular or irregular.",
          "Regular narrow rhythms may include AVNRT, AVRT, atrial tachycardia, atrial flutter with fixed conduction, or sinus tachycardia.",
          "Irregular narrow rhythms commonly include atrial fibrillation, atrial flutter with variable conduction, or multifocal atrial tachycardia.",
          "If the rhythm is wide, irregular with pre-excitation, or polymorphic, stop this pathway and open AC-07 or AC-08.",
        ],
      },
    ],
    treatmentSteps: [
      "Treat hypoxia, pain, fever, dehydration, hemorrhage, sepsis, stimulant exposure, and other reversible causes. Do not treat sinus tachycardia with adenosine or cardioversion.",
      "For instability attributable to the tachycardia, perform immediate synchronized cardioversion: 100 J for regular narrow-complex tachycardia and 200 J for atrial fibrillation or atrial flutter.",
      "Confirm synchronization markers before every shock and resynchronize after every attempt. Increase energy after an unsuccessful synchronized shock.",
      "If synchronization is delayed and the patient's condition is critical, deliver an unsynchronized high-energy shock.",
      "Sedate whenever feasible with midazolam 2–5 mg IV/IO using the smallest effective dose, but do not delay cardioversion.",
      "For stable regular narrow-complex tachycardia, perform a modified Valsalva maneuver. Do not perform carotid massage.",
      "If modified Valsalva is unsuccessful, give adenosine 6 mg rapid IV/IO push through the most proximal practical access followed immediately by a rapid normal-saline flush.",
      "If the rhythm persists after 1–2 minutes, give adenosine 12 mg rapid IV/IO once with an immediate flush. Record the rhythm continuously during administration.",
      "Do not give adenosine for an irregular rhythm. Contact Medical Control before using a reduced dose for a heart-transplant patient or administration through central venous access.",
      "For stable atrial fibrillation/flutter causing significant symptoms with SBP of at least 110 mmHg, give diltiazem 10–20 mg IV/IO over 2 minutes when no contraindication is present.",
      "For prolonged transport, a diltiazem infusion of 5–10 mg/hr requires Medical Control.",
      "Do not attempt elective rhythm conversion for stable atrial fibrillation/flutter of unknown duration.",
      "Obtain a post-treatment rhythm strip and 12-lead ECG, reassess complete vital signs, monitor for recurrence, and transport.",
    ],
    medications: [
      {
        name: "Adenosine",
        dose: "First dose 6 mg rapid IV/IO push with immediate flush; second dose 12 mg once after 1–2 minutes if needed",
        notes: [
          "Paramedic standing order for stable regular narrow-complex tachycardia after unsuccessful modified Valsalva.",
          "Use the most proximal practical access and record the rhythm continuously during administration.",
          "Do not use for sinus tachycardia, an irregular rhythm, unstable wide-complex tachycardia, polymorphic tachycardia, or active severe bronchospasm.",
          "Contact Medical Control before using a reduced dose for a heart-transplant patient or administration through central venous access.",
        ],
      },
      {
        name: "Diltiazem",
        dose: "10–20 mg IV/IO over 2 minutes",
        notes: [
          "Paramedic standing order for significantly symptomatic stable atrial fibrillation/flutter when SBP is at least 110 mmHg.",
          "For prolonged transport, an infusion of 5–10 mg/hr requires Medical Control.",
          "Avoid with hypotension, acute decompensated heart failure, suspected systolic dysfunction, acute coronary syndrome, pre-excitation, or an undifferentiated wide-complex rhythm.",
        ],
      },
      {
        name: "Midazolam",
        dose: "2–5 mg IV/IO; use the smallest effective dose",
        notes: [
          "Paramedic procedural sedation for synchronized cardioversion when feasible.",
          "Do not delay cardioversion in an unstable patient.",
          "Continuous airway, respiratory, SpO₂, cardiac, and blood-pressure monitoring is required.",
        ],
      },
    ],
    warnings: [
      "Instability must be caused by the tachycardia rather than merely associated with a fast heart rate.",
      "Do not use adenosine or cardioversion to treat sinus tachycardia.",
      "Do not perform carotid massage in the prehospital setting.",
      "Adenosine is contraindicated in active severe bronchospasm and must not be given for an irregular rhythm.",
      "Do not combine or sequence AV-nodal-blocking medications without an explicit protocol or Medical Control direction.",
      "In suspected pre-excited atrial fibrillation/flutter, do not administer adenosine, diltiazem, metoprolol, digoxin, or amiodarone.",
      "Diltiazem may worsen hypotension or decompensated systolic heart failure.",
      "Verify synchronization before every cardioversion attempt; many devices require synchronization to be reactivated after each shock.",
      "Sedation must not delay cardioversion when instability is attributable to the rhythm.",
    ],
    clinicalPearls: [
      "A tachyarrhythmia causing instability is often at least 150/min, but rate alone does not determine treatment.",
      "A properly performed modified Valsalva is more effective than a simple seated Valsalva maneuver.",
      "Adenosine may transiently reveal atrial activity without terminating atrial fibrillation or flutter; it is not routine therapy for an irregular rhythm.",
      "Capture the rhythm before, during, and after adenosine or cardioversion whenever feasible.",
      "Stable atrial fibrillation/flutter of unknown duration should receive rate control rather than elective prehospital rhythm conversion.",
    ],
    specialPopulations: [
      {
        title: "Heart transplant or central venous access",
        items: [
          "Adenosine may produce an exaggerated response in a heart-transplant patient or when administered centrally.",
          "Contact Medical Control before using a reduced dose; do not automatically give the standard 6 mg dose through central access.",
        ],
      },
      {
        title: "Pre-excited atrial fibrillation/flutter",
        items: [
          "An irregular rapid rhythm with variable QRS morphology or known Wolff-Parkinson-White may represent pre-excitation.",
          "Avoid AV-nodal blockers and amiodarone; perform synchronized cardioversion if unstable and contact Medical Control early if stable.",
        ],
      },
    ],
    actionLinks: [
      {
        label: "AC-04 ACS / STEMI",
        description: "Open for ischemic chest discomfort or suspected acute coronary syndrome.",
        href: "/protocols/ac/ac-04",
        kind: "protocol",
      },
      {
        label: "AC-05 Acute Pulmonary Edema",
        description: "Open when acute heart failure or pulmonary edema is present.",
        href: "/protocols/ac/ac-05",
        kind: "protocol",
      },
      {
        label: "AC-07 Monomorphic Wide-Complex Tachycardia",
        description: "Open when the QRS is wide and the rhythm is monomorphic.",
        href: "/protocols/ac/ac-07",
        kind: "protocol",
      },
      {
        label: "AC-08 Polymorphic Wide-Complex Tachycardia",
        description: "Open for polymorphic or torsades-pattern tachycardia.",
        href: "/protocols/ac/ac-08",
        kind: "protocol",
      },
      {
        label: "AM-05 Hypotension / Shock",
        description: "Open for persistent hypotension or shock.",
        href: "/protocols/am/am-05",
        kind: "protocol",
      },
      {
        label: "AC-03 Adult Cardiac Arrest",
        description: "Open immediately if the patient becomes pulseless.",
        href: "/protocols/ac/ac-03",
        kind: "protocol",
      },
    ],
    references: [
      "American Heart Association. 2025 Adult Tachyarrhythmia With a Pulse Algorithm.",
      "American Heart Association. 2025 Electrical Cardioversion Algorithm.",
      "American Heart Association. 2025 Guidelines for CPR and ECC: Adult Advanced Life Support.",
      "Tennessee Emergency Medical Services Board. Tennessee EMS Protocol Guidelines, September 2025.",
      "Claiborne EMS medication formulary and related adult cardiac protocols.",
    ],
    sourcePdf: "/protocols/claiborne/ac-06-adult-tachycardia-narrow-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Clinical content approved by the Claiborne EMS medical director during protocol review.",
      "The medication quick reference must display the same 6 mg then 12 mg adenosine sequence.",
      "App content remains a beta field reference until formal agency release and implementation approval.",
    ],
  },
  {
    id: "ac-07",
    title: "Adult Monomorphic Wide-Complex Tachycardia",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: [
      "Adult pathway for patients 16 years of age and older with a pulse and a regular monomorphic wide-complex tachycardia, generally QRS duration of at least 0.12 seconds.",
      "When the diagnosis is uncertain, presume ventricular tachycardia and avoid medications that may worsen an undifferentiated wide-complex rhythm.",
      "Claiborne EMS uses an initial synchronized biphasic energy of 100 J for monomorphic ventricular tachycardia with a pulse.",
    ],
    flow: [
      { title: "Confirm Pulse + Monomorphic Wide Rhythm", text: "QRS ≥0.12 sec • assume VT when uncertain • airway/ventilation • oxygen if hypoxemic • monitor/pads • BP/SpO₂ • IV/IO", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Instability Caused by Tachycardia?", text: "Hypotension • acute altered mental status • shock • ischemic chest discomfort • acute heart failure", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Unstable → Synchronized Cardioversion", text: "100 J biphasic • increase if unsuccessful • confirm sync before every shock • sedate when feasible", levels: ["Paramedic"], tone: "urgent" },
      { title: "Stable + Uncertain Origin", text: "Only if regular and monomorphic: adenosine 6 mg rapid IV/IO + flush, then 12 mg once if needed", levels: ["Paramedic"], tone: "decision" },
      { title: "Stable Monomorphic VT", text: "Amiodarone 150 mg IV/IO over 10 min • stop and cardiovert immediately if instability develops", levels: ["Paramedic"], tone: "action" },
      { title: "Persistent After Infusion?", text: "Synchronized cardioversion 100 J biphasic • do not stack multiple antiarrhythmics", levels: ["Paramedic"], tone: "urgent" },
      { title: "Converted / Recurrence", text: "If VT recurs: repeat amiodarone 150 mg over 10 min once • then infusion 1 mg/min", levels: ["Paramedic"], tone: "action" },
      { title: "Reassess + Transport", text: "Post-treatment rhythm strip/12-lead • complete vitals • early notification • prepare for polymorphic rhythm or pulseless arrest", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      {
        title: "EMT Care",
        summary: "Recognition, supportive care, pad placement, reversible-cause assessment, and immediate escalation for instability.",
        levels: [{
          level: "EMT",
          actions: [
            "Perform the primary assessment, confirm a pulse, support airway and ventilation, and give oxygen only when hypoxemic.",
            "Obtain complete vital signs, apply the cardiac monitor/AED and defibrillation pads, and obtain a 12-lead ECG when trained and equipped without delaying urgent treatment.",
            "Treat an uncertain wide-complex tachycardia as ventricular tachycardia and immediately request paramedic intervention.",
            "Identify possible ischemia, electrolyte abnormality, hyperkalemia, toxicologic exposure, stimulant use, or medication effect.",
            "Prepare for immediate CPR and defibrillation if the patient becomes pulseless or the rhythm becomes polymorphic.",
          ],
        }],
      },
      {
        title: "AEMT Care",
        summary: "All EMT care plus vascular access, treatment preparation, and continuous reassessment.",
        levels: [{
          level: "AEMT",
          actions: [
            "Perform all EMT actions and establish IV/IO access without delaying synchronized cardioversion or transport.",
            "Acquire a 12-lead ECG before treatment when the patient is stable and assist with continuous rhythm recording during adenosine.",
            "Prepare medication, suction, ventilation equipment, and airway equipment for cardioversion and sedation.",
            "Reassess blood pressure, mental status, perfusion, chest discomfort, respiratory status, and rhythm after every intervention.",
            "Do not independently administer adenosine, amiodarone, or procedural sedation under AC-07.",
          ],
        }],
      },
      {
        title: "Paramedic Care",
        summary: "All AEMT care plus rhythm interpretation, synchronized cardioversion, adenosine, amiodarone, and procedural sedation.",
        levels: [{
          level: "Paramedic",
          actions: [
            "Perform all EMT and AEMT actions; confirm rhythm regularity, monomorphic morphology, QRS duration, pulse, and whether the tachycardia is causing instability.",
            "For unstable monomorphic VT with a pulse, perform synchronized cardioversion at 100 J biphasic and increase energy if unsuccessful.",
            "Confirm synchronization markers before every shock and resynchronize after every attempt.",
            "Sedate whenever feasible with midazolam 2–5 mg IV/IO using the smallest effective dose, but do not delay cardioversion.",
            "For a stable regular monomorphic wide-complex rhythm of uncertain origin, consider adenosine 6 mg rapid IV/IO with immediate flush, followed by 12 mg once after 1–2 minutes if needed.",
            "For stable monomorphic VT, give amiodarone 150 mg IV/IO over 10 minutes; stop the infusion and cardiovert immediately if instability develops.",
            "After conversion, treat one recurrence with amiodarone 150 mg over 10 minutes, then begin maintenance infusion at 1 mg/min.",
          ],
        }],
      },
    ],
    indications: [
      "Regular monomorphic wide-complex tachycardia with a pulse in a patient 16 years of age or older.",
      "Sustained monomorphic ventricular tachycardia requiring synchronized cardioversion or antiarrhythmic treatment.",
      "Stable regular monomorphic wide-complex tachycardia of uncertain origin in which adenosine may be diagnostic or therapeutic.",
    ],
    contraindications: [
      "Do not use adenosine for unstable, irregular, or polymorphic wide-complex tachycardia or active severe bronchospasm.",
      "Do not administer diltiazem, verapamil, metoprolol, or another AV-nodal blocker for an undifferentiated wide-complex rhythm.",
      "Do not administer amiodarone for suspected torsades de pointes, a clearly prolonged-QT polymorphic rhythm, or suspected pre-excited atrial fibrillation/flutter.",
    ],
    assessment: [
      {
        title: "Initial assessment",
        items: [
          "Maintain the airway, assist ventilation as needed, and give oxygen only for hypoxemia.",
          "Obtain continuous cardiac monitoring, pads, frequent blood pressure, SpO₂, IV/IO access, and two complete vital-sign sets when feasible.",
          "Obtain a 12-lead ECG before treatment when stable enough and it will not delay cardioversion.",
          "Determine onset, prior dysrhythmia, cardiac history, implanted devices, medications, stimulant or toxicologic exposure, and anticoagulant therapy.",
        ],
      },
      {
        title: "Instability attributable to tachycardia",
        items: [
          "Hypotension, acutely altered mental status, shock or poor perfusion, ischemic chest discomfort, or acute heart failure.",
          "Confirm that the rhythm is driving instability rather than representing a secondary response to another critical condition.",
        ],
      },
      {
        title: "Reversible causes and rhythm hazards",
        items: [
          "Evaluate for ACS, structural heart disease, electrolyte abnormality, hyperkalemia, hypomagnesemia, stimulant exposure, and medication toxicity.",
          "Consider sodium-channel-blocker toxicity with wide QRS, hypotension, seizures, or a compatible ingestion.",
          "If the rhythm becomes irregular, polymorphic, or pulseless, leave AC-07 immediately and open the linked pathway.",
        ],
      },
    ],
    treatmentSteps: [
      "Treat an uncertain regular monomorphic wide-complex tachycardia as ventricular tachycardia and apply pads before deterioration.",
      "For instability attributable to monomorphic VT with a pulse, perform immediate synchronized cardioversion at 100 J biphasic and increase energy if unsuccessful.",
      "Confirm synchronization markers before every shock and resynchronize after every attempt.",
      "If synchronization is delayed and the condition is critical, deliver an unsynchronized high-energy shock.",
      "Sedate whenever feasible with midazolam 2–5 mg IV/IO using the smallest effective dose, but do not delay cardioversion.",
      "For stable regular monomorphic wide-complex tachycardia of uncertain origin, consider adenosine 6 mg rapid IV/IO with immediate flush; repeat once with 12 mg after 1–2 minutes if needed.",
      "Do not give adenosine for unstable, irregular, or polymorphic rhythm or active severe bronchospasm.",
      "For stable monomorphic VT, give amiodarone 150 mg IV/IO over 10 minutes. Stop the infusion and cardiovert immediately if instability develops.",
      "If stable VT persists after the infusion, perform synchronized cardioversion at 100 J rather than stacking antiarrhythmics.",
      "After conversion, if VT recurs, repeat amiodarone 150 mg over 10 minutes once, then begin maintenance infusion at 1 mg/min.",
      "Do not combine amiodarone with lidocaine or another antiarrhythmic under AC-07 unless directed by Medical Control.",
      "Obtain post-treatment rhythm strips and a 12-lead ECG, reassess complete vital signs, notify early, and transport.",
    ],
    medications: [
      {
        name: "Adenosine",
        dose: "6 mg rapid IV/IO with immediate flush; then 12 mg once after 1–2 minutes if needed",
        notes: [
          "Paramedic standing order only for stable regular monomorphic wide-complex tachycardia of uncertain origin.",
          "Use proximal access and record the rhythm continuously.",
          "Do not use for unstable, irregular, or polymorphic rhythm or active severe bronchospasm.",
        ],
      },
      {
        name: "Amiodarone",
        dose: "150 mg IV/IO over 10 minutes",
        notes: [
          "Paramedic standing order for stable monomorphic VT with a pulse.",
          "Stop the infusion and cardiovert immediately if instability develops.",
          "After conversion, if VT recurs, repeat 150 mg over 10 minutes once and begin maintenance infusion at 1 mg/min.",
          "Do not combine with another antiarrhythmic without Medical Control.",
        ],
      },
      {
        name: "Midazolam",
        dose: "2–5 mg IV/IO; use the smallest effective dose",
        notes: [
          "Paramedic sedation for synchronized cardioversion when feasible.",
          "Do not delay cardioversion in an unstable patient.",
          "Continuous airway, respiratory, SpO₂, cardiac, and blood-pressure monitoring is required.",
        ],
      },
    ],
    warnings: [
      "Treat an uncertain wide-complex tachycardia as ventricular tachycardia.",
      "Do not administer diltiazem or verapamil for undifferentiated wide-complex tachycardia.",
      "Adenosine is permitted only for stable regular monomorphic rhythm and is contraindicated in active severe bronchospasm.",
      "Do not use adenosine, amiodarone, diltiazem, metoprolol, digoxin, or another AV-nodal blocker for suspected pre-excited atrial fibrillation/flutter.",
      "Do not use amiodarone for torsades de pointes or a clearly prolonged-QT polymorphic rhythm.",
      "Do not stack antiarrhythmics without explicit Medical Control direction.",
      "Verify synchronization before every cardioversion attempt; many devices require reactivation after each shock.",
      "Sedation must not delay cardioversion. Loss of pulse requires immediate transition to AC-03 and AC-09.",
    ],
    clinicalPearls: [
      "In an older adult or patient with structural heart disease, regular wide-complex tachycardia is VT until proven otherwise.",
      "Apply pads early because a stable patient may deteriorate rapidly.",
      "Adenosine may terminate SVT with aberrancy or reveal atrial activity; it does not treat ventricular tachycardia.",
      "A change to polymorphic morphology requires immediate transition to AC-08.",
      "Capture the rhythm before, during, and after medication or cardioversion whenever feasible.",
    ],
    specialPopulations: [
      {
        title: "Pre-excited atrial fibrillation/flutter",
        items: [
          "An irregular rapid wide-complex rhythm with variable morphology or known Wolff-Parkinson-White may represent pre-excitation.",
          "Avoid adenosine, amiodarone, and AV-nodal blockers; cardiovert if unstable and contact Medical Control early if stable.",
        ],
      },
      {
        title: "Toxicologic or metabolic wide-complex rhythm",
        items: [
          "Hyperkalemia and sodium-channel-blocker toxicity require immediate cause-specific treatment in addition to rhythm and perfusion support.",
          "Open the linked renal/hyperkalemia or toxic-ingestion protocol rather than relying on amiodarone alone.",
        ],
      },
    ],
    actionLinks: [
      { label: "AC-04 ACS / STEMI", description: "Open for ischemic chest discomfort or suspected ACS.", href: "/protocols/ac/ac-04", kind: "protocol" },
      { label: "AC-08 Polymorphic Wide-Complex Tachycardia", description: "Open immediately if the rhythm becomes polymorphic.", href: "/protocols/ac/ac-08", kind: "protocol" },
      { label: "AC-09 VF / Pulseless VT", description: "Open immediately if ventricular tachycardia becomes pulseless.", href: "/protocols/ac/ac-09", kind: "protocol" },
      { label: "AC-03 Adult Cardiac Arrest", description: "Open the master cardiac-arrest pathway after loss of pulse.", href: "/protocols/ac/ac-03", kind: "protocol" },
      { label: "AM-03 Dialysis / Renal Failure", description: "Open for suspected hyperkalemia or dialysis-related emergency.", href: "/protocols/am/am-03", kind: "protocol" },
      { label: "TE-07 Overdose / Toxic Ingestion", description: "Open for suspected sodium-channel-blocker or toxicologic dysrhythmia.", href: "/protocols/te/te-07", kind: "protocol" },
    ],
    references: [
      "American Heart Association. 2025 Adult Tachyarrhythmia With a Pulse Algorithm.",
      "American Heart Association. 2025 Electrical Cardioversion Algorithm.",
      "American Heart Association. 2025 Guidelines for CPR and ECC: Adult Advanced Life Support.",
      "Tennessee Emergency Medical Services Board. Tennessee EMS Protocol Guidelines, September 2025.",
      "Claiborne EMS medication formulary and related cardiac, renal, and toxicology protocols.",
    ],
    sourcePdf: "/protocols/claiborne/ac-07-adult-tachycardia-monomorphic-wide-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Clinical content approved by the Claiborne EMS medical director during protocol review.",
      "App content remains a beta field reference until formal agency release and implementation approval.",
    ],
  },
  {
    id: "ac-08",
    title: "Adult Polymorphic Wide-Complex Tachycardia",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: [
      "Adult pathway for patients 16 years of age and older with sustained or recurrent polymorphic wide-complex tachycardia and a pulse.",
      "All sustained polymorphic ventricular tachycardia is electrically unstable and requires immediate unsynchronized defibrillation.",
      "Claiborne EMS uses an initial unsynchronized biphasic shock of 200 J; confirm the manufacturer-recommended setting and escalate according to the device.",
    ],
    flow: [
      { title: "Confirm Pulse + Polymorphic Wide Rhythm", text: "Beat-to-beat QRS variation • pads immediately • airway/ventilation • oxygen if hypoxemic • do not delay shock", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Sustained Polymorphic VT", text: "Treat as unstable regardless of apparent perfusion", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Immediate Unsynchronized Shock", text: "200 J biphasic • verify manufacturer setting • escalate according to device • never attempt synchronization", levels: ["Paramedic"], tone: "urgent" },
      { title: "Pulse Lost?", text: "Begin CPR immediately and open AC-09 VF / Pulseless VT", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Rhythm Terminates", text: "Obtain rhythm strip/12-lead • determine whether baseline QT is prolonged", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Long QT / Torsades Recurrence", text: "Magnesium sulfate 2 g IV/IO over 5–10 min • may repeat once • maximum 4 g", levels: ["Paramedic"], tone: "action" },
      { title: "Normal QT Recurrence", text: "Treat suspected myocardial ischemia • lidocaine 100 mg IV/IO initial dose", levels: ["Paramedic"], tone: "action" },
      { title: "Reassess + Transport", text: "Pads remain attached • continuous monitoring • early notification • anticipate recurrence or VF", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      {
        title: "EMT Care",
        summary: "Rapid recognition, immediate pad placement, supportive care, and preparation for deterioration.",
        levels: [{
          level: "EMT",
          actions: [
            "Perform the primary assessment, confirm a pulse, support airway and ventilation, and give oxygen only when hypoxemic.",
            "Recognize polymorphic wide-complex tachycardia by beat-to-beat variation in QRS morphology and immediately request paramedic intervention.",
            "Apply defibrillation pads, obtain complete vital signs when feasible, and do not delay definitive treatment for a 12-lead ECG.",
            "Prepare for immediate CPR and AED use if the patient becomes pulseless.",
            "After rhythm termination, obtain a rhythm strip and 12-lead ECG when trained and equipped without delaying transport.",
          ],
        }],
      },
      {
        title: "AEMT Care",
        summary: "All EMT care plus vascular access, medication preparation, and continuous reassessment.",
        levels: [{
          level: "AEMT",
          actions: [
            "Perform all EMT actions and establish IV/IO access without delaying defibrillation.",
            "Prepare magnesium sulfate, lidocaine, midazolam, suction, ventilation equipment, and airway equipment for paramedic use.",
            "Reassess pulse, blood pressure, mental status, perfusion, respiratory status, and rhythm after every shock or clinical change.",
            "Keep pads attached and prepare for recurrent polymorphic VT, ventricular fibrillation, or cardiac arrest.",
            "Do not independently administer magnesium sulfate, lidocaine, or procedural sedation under AC-08.",
          ],
        }],
      },
      {
        title: "Paramedic Care",
        summary: "All AEMT care plus immediate manual defibrillation, QT-directed medication treatment, and sedation when feasible.",
        levels: [{
          level: "Paramedic",
          actions: [
            "Perform all EMT and AEMT actions and confirm a pulse with polymorphic wide-complex tachycardia.",
            "For sustained polymorphic VT, immediately deliver an unsynchronized biphasic shock at 200 J; confirm the manufacturer-recommended setting and escalate according to the device.",
            "Never attempt synchronized cardioversion for polymorphic VT because reliable synchronization is not possible.",
            "If the patient is conscious, sedate when immediately feasible with midazolam 2–5 mg IV/IO using the smallest effective dose, but never delay defibrillation.",
            "After rhythm termination, determine whether the baseline QT is prolonged using the preceding or post-conversion rhythm strip/12-lead ECG.",
            "For recurrent long-QT polymorphic VT/torsades, give magnesium sulfate 2 g IV/IO over 5–10 minutes; may repeat 2 g once for continued recurrence, maximum 4 g.",
            "For recurrent polymorphic VT with a normal QT, treat suspected myocardial ischemia and give lidocaine 100 mg IV/IO as the initial dose.",
          ],
        }],
      },
    ],
    indications: [
      "Sustained polymorphic wide-complex tachycardia with a pulse in a patient 16 years of age or older.",
      "Recurrent self-terminating polymorphic VT requiring prevention of recurrence after pads are applied and immediate-shock readiness is established.",
      "Suspected torsades de pointes associated with a prolonged baseline QT interval.",
    ],
    contraindications: [
      "There is no contraindication to immediate unsynchronized defibrillation for sustained polymorphic VT.",
      "Do not use magnesium routinely for polymorphic VT when the baseline QT interval is normal.",
      "Do not use lidocaine as the torsades/long-QT treatment pathway.",
    ],
    assessment: [
      {
        title: "Immediate rhythm and perfusion assessment",
        items: [
          "Confirm the presence of a pulse and identify beat-to-beat variation in QRS morphology.",
          "Treat sustained polymorphic VT as electrically and hemodynamically unstable even when a pulse or transient perfusion is present.",
          "Apply pads immediately and do not delay defibrillation for vascular access, medication administration, sedation, or a 12-lead ECG.",
          "If no pulse is present or the pulse is lost, begin CPR and immediately open AC-09.",
        ],
      },
      {
        title: "QT classification after rhythm termination",
        items: [
          "Use the preceding or post-conversion rhythm strip/12-lead ECG to determine whether the baseline QT is prolonged.",
          "Torsades is suggested by prolonged QT, pause-dependent onset, associated bradycardia, recurrent self-termination, congenital long-QT history, or QT-prolonging medication exposure.",
          "Normal-QT polymorphic VT is commonly associated with acute myocardial ischemia or infarction.",
        ],
      },
      {
        title: "Cause assessment",
        items: [
          "Review prescribed and nonprescribed medications for QT prolongation and discontinue suspected QT-prolonging agents.",
          "Assess for myocardial ischemia, renal failure, dialysis, toxicologic exposure, stimulant use, electrolyte abnormality, congenital long-QT syndrome, and digitalis toxicity.",
          "Do not delay recurrent shock treatment while investigating the underlying cause.",
        ],
      },
    ],
    treatmentSteps: [
      "Apply defibrillation pads immediately and treat all sustained polymorphic VT as unstable.",
      "Deliver an immediate unsynchronized biphasic shock at 200 J; confirm the manufacturer-recommended setting and escalate according to the device.",
      "Never attempt synchronized cardioversion for polymorphic VT.",
      "If the rhythm persists or sustained polymorphic VT recurs, repeat unsynchronized defibrillation using the manufacturer-recommended setting and energy escalation.",
      "If the patient becomes pulseless, begin CPR immediately and open AC-09 VF / Pulseless VT.",
      "If the patient is conscious, sedate when immediately feasible with midazolam 2–5 mg IV/IO using the smallest effective dose, but never delay defibrillation.",
      "After rhythm termination, obtain a rhythm strip and 12-lead ECG and determine whether the baseline QT is prolonged.",
      "For recurrent long-QT polymorphic VT/torsades, give magnesium sulfate 2 g IV/IO over 5–10 minutes; may repeat 2 g once for continued recurrence, maximum 4 g.",
      "Discontinue suspected QT-prolonging medications.",
      "For recurrent torsades associated with bradycardia or pauses, contact Medical Control for overdrive pacing.",
      "For recurrent polymorphic VT with a normal QT, treat suspected myocardial ischemia and give lidocaine 100 mg IV/IO as the initial dose.",
      "Keep pads attached, reassess complete vital signs, notify early, and transport rapidly while anticipating recurrent polymorphic VT or VF.",
    ],
    medications: [
      {
        name: "Magnesium sulfate",
        dose: "2 g IV/IO over 5–10 minutes; may repeat 2 g once; maximum 4 g",
        notes: [
          "Paramedic standing order for recurrent polymorphic VT associated with a prolonged QT interval/torsades de pointes.",
          "Defibrillation takes priority for any sustained episode.",
          "Do not administer routinely when the QT interval is normal.",
          "Monitor continuously for hypotension, bradycardia, respiratory depression, and recurrent dysrhythmia.",
        ],
      },
      {
        name: "Lidocaine",
        dose: "100 mg IV/IO initial dose",
        notes: [
          "Paramedic standing order for recurrent polymorphic VT only when the baseline QT interval is normal.",
          "Treat associated myocardial ischemia and keep pads attached.",
          "Do not substitute lidocaine for immediate defibrillation of a sustained episode.",
        ],
      },
      {
        name: "Midazolam",
        dose: "2–5 mg IV/IO; use the smallest effective dose",
        notes: [
          "Paramedic sedation when a conscious patient requires unsynchronized defibrillation.",
          "Do not delay shock delivery for sedation.",
          "Continuous airway, respiratory, SpO₂, cardiac, and blood-pressure monitoring is required.",
        ],
      },
    ],
    warnings: [
      "All sustained polymorphic VT is unstable and requires immediate unsynchronized defibrillation.",
      "Do not attempt synchronized cardioversion; polymorphic QRS complexes cannot be synchronized reliably.",
      "Do not delay defibrillation for vascular access, medication, sedation, rhythm printing, or a 12-lead ECG.",
      "Do not give adenosine, diltiazem, verapamil, metoprolol, or another AV-nodal blocker for polymorphic wide-complex tachycardia.",
      "Avoid amiodarone and other QT-prolonging antiarrhythmics when torsades or a prolonged QT is suspected.",
      "Routine magnesium is not indicated when the QT interval is normal.",
      "Recurrent polymorphic VT may rapidly degenerate into ventricular fibrillation.",
    ],
    clinicalPearls: [
      "Polymorphic VT varies in QRS shape and axis from beat to beat and may be difficult to distinguish from coarse VF.",
      "Torsades de pointes is polymorphic VT associated with a prolonged baseline QT; polymorphic VT with a normal QT is commonly ischemic.",
      "The QT interval should be assessed on the rhythm before or after the episode rather than during polymorphic VT.",
      "Defibrillation terminates the episode but does not prevent recurrence; subsequent therapy is directed by the baseline QT.",
      "Keep pads attached throughout transport because recurrence is common.",
    ],
    specialPopulations: [
      {
        title: "Long-QT polymorphic VT / torsades",
        items: [
          "Give magnesium for recurrence after immediate-shock readiness is established.",
          "Discontinue suspected QT-prolonging medications.",
          "For recurrent pause-dependent torsades or associated bradycardia, contact Medical Control for overdrive pacing.",
        ],
      },
      {
        title: "Normal-QT polymorphic VT",
        items: [
          "Suspect acute myocardial ischemia or infarction and open AC-04.",
          "Use lidocaine rather than the torsades magnesium pathway.",
          "Seek expert consultation for suspected catecholaminergic polymorphic VT, digitalis toxicity, or another unusual cause.",
        ],
      },
    ],
    actionLinks: [
      { label: "AC-04 ACS / STEMI", description: "Open for suspected myocardial ischemia or infarction.", href: "/protocols/ac/ac-04", kind: "protocol" },
      { label: "AC-07 Monomorphic Wide-Complex Tachycardia", description: "Open if the rhythm is regular with uniform QRS morphology.", href: "/protocols/ac/ac-07", kind: "protocol" },
      { label: "AC-09 VF / Pulseless VT", description: "Open immediately if the pulse is absent or lost.", href: "/protocols/ac/ac-09", kind: "protocol" },
      { label: "AM-03 Dialysis / Renal Failure", description: "Open for suspected dialysis-related or renal emergency.", href: "/protocols/am/am-03", kind: "protocol" },
      { label: "TE-07 Overdose / Toxic Ingestion", description: "Open for suspected medication, stimulant, digitalis, or other toxicologic cause.", href: "/protocols/te/te-07", kind: "protocol" },
    ],
    references: [
      "American Heart Association. 2025 Guidelines for CPR and ECC: Adult Advanced Life Support—Polymorphic Ventricular Tachycardia.",
      "American Heart Association. 2025 Electrical Cardioversion Algorithm.",
      "Tennessee Emergency Medical Services Board. Tennessee EMS Protocol Guidelines, September 2025.",
      "Claiborne EMS medication formulary and related cardiac, renal, and toxicology protocols.",
    ],
    sourcePdf: "/protocols/claiborne/ac-08-adult-tachycardia-polymorphic-wide-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Clinical content approved by the Claiborne EMS medical director during protocol review.",
      "The Claiborne initial unsynchronized-shock setting is 200 J biphasic; personnel must confirm the manufacturer-recommended setting and escalate according to the device.",
      "App content remains a beta field reference until formal agency release and implementation approval.",
    ],
  },
  {
    id: "ac-09",
    title: "Ventricular Fibrillation / Pulseless VT",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: [
      "Adult pathway for patients 16 years of age and older in ventricular fibrillation or pulseless ventricular tachycardia.",
      "High-quality CPR, immediate defibrillation, minimal peri-shock pauses, and treatment of reversible causes take priority over advanced procedures.",
      "Claiborne EMS uses an initial biphasic defibrillation energy of 200 J; confirm the manufacturer-recommended setting and use the same or higher energy for subsequent shocks according to the device.",
    ],
    flow: [
      { title: "VF / Pulseless VT", text: "Start CPR • bag-mask ventilation with oxygen • attach monitor/defibrillator • activate arrest team", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Shock 1", text: "200 J biphasic • verify manufacturer setting • immediately resume CPR for 2 min", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "CPR 2 min + IV/IO", text: "Rate 100–120/min • depth ≥2 in • full recoil • minimize pauses • IV preferred, IO if delayed", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Shock 2", text: "Same or higher energy per device • immediately resume CPR • epinephrine 1 mg IV/IO ASAP, then every 3–5 min", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "CPR 2 min + Airway", text: "Consider advanced airway/capnography without interrupting compressions • treat reversible causes", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Shock 3", text: "Same or higher energy per device • immediately resume CPR", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "CPR 2 min + Antiarrhythmic", text: "Amiodarone 300 mg IV/IO; second dose 150 mg • alternative lidocaine 100 mg IV/IO", levels: ["Paramedic"], tone: "action" },
      { title: "Rhythm Every 2 min", text: "Shockable → shock and resume CPR • organized rhythm → pulse check • ROSC → AC-10", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Persistent Arrest", text: "Continue shock/CPR cycles • epinephrine every 3–5 min • treat Hs and Ts • consider AC-12 when criteria met", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      {
        title: "EMT Care",
        summary: "Immediate CPR, AED operation, ventilation, compressor rotation, timing, and documentation.",
        levels: [{
          level: "EMT",
          actions: [
            "Confirm unresponsiveness, abnormal or absent breathing, and absence of a pulse for no more than 10 seconds; begin CPR immediately.",
            "Perform compressions at 100–120/min to a depth of at least 2 inches with complete recoil and minimal interruption.",
            "Apply the AED/monitor pads and deliver a shock immediately when advised; resume CPR without a post-shock pulse check.",
            "Provide bag-mask ventilation with oxygen at a 30:2 compression-to-ventilation ratio until an advanced airway is placed.",
            "Rotate compressors every 2 minutes or sooner when fatigued and announce cycle, shock, medication, and rhythm-check times.",
            "Check a pulse only when an organized rhythm appears and prepare for immediate re-arrest if ROSC occurs.",
          ],
        }],
      },
      {
        title: "AEMT Care",
        summary: "All EMT care plus vascular access, epinephrine, airway assistance, and medication preparation.",
        levels: [{
          level: "AEMT",
          actions: [
            "Perform all EMT actions and establish IV access during CPR without delaying a shock; use IO access when IV access is unsuccessful or would delay medication.",
            "After the second shock, give epinephrine 1 mg IV/IO as soon as possible and repeat every 3–5 minutes.",
            "Assist with advanced-airway placement and continuous waveform capnography without interrupting compressions or delaying defibrillation.",
            "Prepare amiodarone, lidocaine, and magnesium sulfate for paramedic administration.",
            "Continuously reassess CPR quality, ventilation rate, waveform capnography, medication timing, and reversible causes.",
            "Do not independently administer amiodarone, lidocaine, or magnesium sulfate under AC-09.",
          ],
        }],
      },
      {
        title: "Paramedic Care",
        summary: "All AEMT care plus manual defibrillation, rhythm interpretation, antiarrhythmics, advanced airway/capnography, and reversible-cause treatment.",
        levels: [{
          level: "Paramedic",
          actions: [
            "Perform all EMT and AEMT actions and confirm VF or pulseless VT while maintaining continuous high-quality CPR.",
            "Defibrillate at 200 J biphasic, confirm the manufacturer-recommended setting, and use the same or higher energy for subsequent shocks according to the device.",
            "Charge the defibrillator during compressions, clear briefly, deliver the shock, and resume CPR immediately.",
            "After the second shock, give epinephrine 1 mg IV/IO as soon as possible and repeat every 3–5 minutes.",
            "After the third shock, give amiodarone 300 mg IV/IO; give 150 mg IV/IO as the second dose for persistent or recurrent VF/pVT.",
            "As an alternative to amiodarone, give lidocaine 100 mg IV/IO initially; do not combine amiodarone and lidocaine without Medical Control.",
            "For suspected pulseless torsades, give magnesium sulfate 2 g IV/IO over 1–2 minutes; do not use magnesium routinely for other VF/pVT arrests.",
            "Place an advanced airway and use continuous waveform capnography when this can be accomplished without interrupting compressions or delaying shocks.",
          ],
        }],
      },
    ],
    indications: [
      "Ventricular fibrillation without a pulse in a patient 16 years of age or older.",
      "Pulseless ventricular tachycardia in a patient 16 years of age or older.",
      "Pulseless polymorphic ventricular tachycardia managed as a shockable cardiac-arrest rhythm.",
    ],
    contraindications: [
      "There is no contraindication to immediate defibrillation for confirmed VF or pulseless VT.",
      "Do not defibrillate an organized rhythm unless the patient is pulseless and the rhythm is confirmed as ventricular tachycardia.",
      "Do not interrupt CPR or delay defibrillation for vascular access, medication administration, or advanced-airway placement.",
    ],
    assessment: [
      {
        title: "Immediate arrest assessment",
        items: [
          "Confirm unresponsiveness, abnormal or absent breathing, and absence of a pulse for no more than 10 seconds.",
          "Begin CPR, provide bag-mask ventilation with oxygen, attach pads, and identify VF or pulseless VT.",
          "Establish the time last known responsive, whether the arrest was witnessed, bystander CPR/AED use, initial rhythm, downtime, and suspected cause when this does not interrupt treatment.",
        ],
      },
      {
        title: "CPR quality",
        items: [
          "Compression rate 100–120/min, depth at least 2 inches, complete recoil, and minimal interruptions.",
          "Change compressors every 2 minutes or sooner when fatigued.",
          "Keep rhythm analysis, pulse checks, and peri-shock pauses under 10 seconds.",
          "Charge during compressions and resume compressions immediately after every shock.",
        ],
      },
      {
        title: "Rhythm, ventilation, and perfusion monitoring",
        items: [
          "Analyze rhythm every 2 minutes; check a pulse only when an organized rhythm appears.",
          "Before an advanced airway, use a 30:2 compression-to-ventilation ratio.",
          "After an advanced airway, continue compressions and give one breath every 6 seconds.",
          "Use continuous waveform capnography after advanced-airway placement to confirm position and monitor ventilation and CPR trends.",
          "An abrupt sustained rise in EtCO₂ may suggest ROSC but requires rhythm and pulse confirmation; no absolute EtCO₂ value determines termination.",
        ],
      },
      {
        title: "Reversible causes",
        items: [
          "Evaluate continuously for hypovolemia, hypoxia, hydrogen ion excess/acidosis, hypo-/hyperkalemia, and hypothermia.",
          "Evaluate for tension pneumothorax, cardiac tamponade, toxins, pulmonary thrombosis, and coronary thrombosis.",
          "Use the linked renal/hyperkalemia and toxic-ingestion protocols for cause-specific treatment.",
        ],
      },
    ],
    treatmentSteps: [
      "Begin high-quality CPR, provide bag-mask ventilation with oxygen, attach the monitor/defibrillator, and activate the arrest team.",
      "Deliver the first shock at 200 J biphasic after confirming the manufacturer-recommended setting; immediately resume CPR for 2 minutes.",
      "During the first post-shock CPR cycle, establish IV access; use IO access if IV access is unsuccessful or would delay medication.",
      "Perform a rhythm check after 2 minutes. If VF/pVT persists, deliver the second shock using the same or higher energy according to the device and immediately resume CPR.",
      "After the second shock, give epinephrine 1 mg IV/IO as soon as possible and repeat every 3–5 minutes.",
      "Consider advanced-airway placement and continuous waveform capnography without interrupting compressions or delaying defibrillation.",
      "After the next 2-minute CPR cycle, deliver the third shock if VF/pVT persists and immediately resume CPR.",
      "After the third shock, give amiodarone 300 mg IV/IO. If VF/pVT persists or recurs, give a second dose of 150 mg IV/IO.",
      "Lidocaine 100 mg IV/IO may be used as the initial alternative to amiodarone; do not combine amiodarone and lidocaine without Medical Control.",
      "For suspected pulseless torsades, give magnesium sulfate 2 g IV/IO over 1–2 minutes; do not give magnesium routinely for other VF/pVT arrests.",
      "Continue 2-minute CPR cycles, rhythm checks, shocks for persistent VF/pVT, epinephrine every 3–5 minutes, and treatment of reversible causes.",
      "If an organized rhythm appears, briefly check for a pulse. ROSC requires immediate transition to AC-10; persistent arrest may transition to AC-12 when criteria are met.",
    ],
    medications: [
      {
        name: "Epinephrine",
        dose: "1 mg IV/IO after the second shock as soon as possible; repeat every 3–5 minutes",
        notes: [
          "AEMT and Paramedic standing order under AC-09; no EMT administration.",
          "Do not interrupt CPR or delay defibrillation for medication administration.",
          "Document each dose and maintain a visible 3–5-minute medication timer.",
        ],
      },
      {
        name: "Amiodarone",
        dose: "First dose 300 mg IV/IO; second dose 150 mg IV/IO",
        notes: [
          "Paramedic standing order for VF/pVT refractory to the third shock.",
          "Administer during CPR without interrupting compressions.",
          "Do not combine with lidocaine without Medical Control.",
        ],
      },
      {
        name: "Lidocaine",
        dose: "100 mg IV/IO initial dose",
        notes: [
          "Paramedic alternative to amiodarone for shock-refractory VF/pVT.",
          "Do not combine with amiodarone without Medical Control.",
        ],
      },
      {
        name: "Magnesium sulfate",
        dose: "2 g IV/IO over 1–2 minutes",
        notes: [
          "Paramedic standing order only for suspected pulseless torsades/long-QT polymorphic VT.",
          "Routine magnesium is not indicated for other VF/pVT cardiac arrests.",
        ],
      },
    ],
    warnings: [
      "Do not delay defibrillation for airway placement, vascular access, medication, scene movement, or a 12-lead ECG.",
      "Resume CPR immediately after every shock; do not perform a routine post-shock pulse check.",
      "Avoid excessive ventilation. After advanced-airway placement, give one breath every 6 seconds with continuous compressions.",
      "Do not combine amiodarone and lidocaine without explicit Medical Control direction.",
      "Routine magnesium, calcium, and sodium bicarbonate are not indicated in undifferentiated VF/pVT; use them only for a specific reversible cause or linked protocol indication.",
      "No absolute EtCO₂ value should be used alone to terminate resuscitation.",
      "Routine vector-change defibrillation and double-sequential defibrillation are not included because their usefulness remains unestablished.",
    ],
    clinicalPearls: [
      "Defibrillation and high-quality CPR are the highest-priority treatments for VF/pVT.",
      "Charging during compressions and immediate post-shock CPR reduce harmful pauses.",
      "A rhythm check occurs every 2 minutes, but a pulse check occurs only when an organized rhythm appears.",
      "An abrupt sustained EtCO₂ increase may indicate ROSC; confirm with an organized rhythm and pulse without an unnecessary interruption.",
      "VF/pVT may be the result of coronary occlusion, hyperkalemia, hypothermia, toxins, or another reversible cause that requires simultaneous treatment.",
    ],
    specialPopulations: [
      {
        title: "Suspected pulseless torsades",
        items: [
          "Defibrillate and continue standard VF/pVT arrest care.",
          "Give magnesium sulfate 2 g IV/IO over 1–2 minutes.",
          "Open AC-08 if a pulse returns with recurrent polymorphic VT.",
        ],
      },
      {
        title: "Suspected hyperkalemic or toxicologic arrest",
        items: [
          "Continue standard VF/pVT care while opening the linked cause-specific protocol.",
          "Calcium and sodium bicarbonate are reserved for specific indications rather than routine cardiac-arrest administration.",
        ],
      },
    ],
    actionLinks: [
      { label: "AC-03 Adult Cardiac Arrest", description: "Open the master adult cardiac-arrest pathway.", href: "/protocols/ac/ac-03", kind: "protocol" },
      { label: "AC-08 Polymorphic Wide-Complex Tachycardia", description: "Open if a pulse returns with recurrent polymorphic VT.", href: "/protocols/ac/ac-08", kind: "protocol" },
      { label: "AC-10 Post-Resuscitation Care", description: "Open immediately after return of spontaneous circulation.", href: "/protocols/ac/ac-10", kind: "protocol" },
      { label: "AC-11 TEAM-Focused CPR", description: "Open for team roles, timing, communication, and CPR quality.", href: "/protocols/ac/ac-11", kind: "protocol" },
      { label: "AC-12 Termination of Resuscitation", description: "Open for persistent arrest when termination criteria may be met.", href: "/protocols/ac/ac-12", kind: "protocol" },
      { label: "AM-03 Dialysis / Renal Failure", description: "Open for suspected hyperkalemic or dialysis-related arrest.", href: "/protocols/am/am-03", kind: "protocol" },
      { label: "TE-07 Overdose / Toxic Ingestion", description: "Open for suspected sodium-channel blocker, opioid, or other toxicologic arrest.", href: "/protocols/te/te-07", kind: "protocol" },
    ],
    references: [
      "American Heart Association. 2025 Adult Cardiac Arrest Algorithm.",
      "American Heart Association. 2025 Guidelines for CPR and ECC: Adult Advanced Life Support.",
      "Tennessee Emergency Medical Services Board. Tennessee EMS Protocol Guidelines, September 2025.",
      "Claiborne EMS medication formulary and related cardiac, renal, and toxicology protocols.",
    ],
    sourcePdf: "/protocols/claiborne/ac-09-vf-pulseless-vt-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 12, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Clinical content approved by the Claiborne EMS medical director during protocol review.",
      "The Claiborne initial defibrillation setting is 200 J biphasic; personnel must confirm the manufacturer-recommended setting and use the same or higher energy according to the device.",
      "App content remains a beta field reference until formal agency release and implementation approval.",
    ],
  },
  {
    id: "ac-10",
    title: "Post-Resuscitation Care",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: [
      "Adult pathway for patients 16 years of age and older with sustained return of spontaneous circulation after cardiac arrest.",
      "Prioritize controlled oxygenation and ventilation, avoidance of hypotension, rapid 12-lead ECG acquisition, cause-specific treatment, appropriate destination, and preparation for re-arrest.",
      "Keep defibrillation pads attached throughout transport because recurrent arrest and ventricular dysrhythmias are common.",
    ],
    flow: [
      { title: "Confirm Sustained ROSC", text: "Pulse • BP/MAP • organized rhythm • perfusion • keep pads attached • prepare for re-arrest", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Airway + Oxygenation", text: "100% oxygen until reliable SpO₂ • then titrate to 90–98% • waveform capnography for advanced airway", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Control Ventilation", text: "Begin near 10 breaths/min • target EtCO₂ approximately 35–45 mm Hg • avoid hyperventilation", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "MAP ≥65 mm Hg?", text: "If low: NS 250–500 mL IV/IO and reassess • smaller volume for CHF, renal/liver failure, or overload", levels: ["AEMT", "Paramedic"], tone: "decision" },
      { title: "Persistent Hypotension", text: "Norepinephrine 0.1–2 mcg/kg/min IV/IO • titrate to MAP ≥65 • alternatives require Medical Control", levels: ["Paramedic"], tone: "urgent" },
      { title: "12-Lead ECG + Transmit", text: "Obtain as soon as feasible • repeat if immediate post-ROSC tracing or condition changes • open AC-04 when indicated", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Glucose + Neuro + Temperature", text: "Treat glucose <70 • document GCS/pupils/seizures • prevent fever • no rapid cold-fluid cooling", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Destination + Notify", text: "PCI-capable center for STEMI, cardiogenic shock, recurrent ventricular arrhythmia, or ongoing ischemia • consider Covenant Health Air", levels: ["Paramedic"], tone: "transport" },
    ],
    careModules: [
      {
        title: "EMT Care",
        summary: "Immediate post-ROSC stabilization, ventilation, oxygen titration, monitoring, neurologic assessment, and re-arrest preparation.",
        levels: [{
          level: "EMT",
          actions: [
            "Confirm sustained ROSC using a palpable pulse, blood pressure, organized rhythm, perfusion, and clinical response.",
            "Maintain airway and ventilation, begin near 10 breaths/min, and avoid hyperventilation.",
            "Use 100% oxygen until SpO₂ can be measured reliably, then titrate oxygen to maintain SpO₂ 90–98%.",
            "Keep defibrillation pads attached, obtain frequent complete vital signs, and prepare to resume CPR and defibrillation immediately.",
            "Check blood glucose, document GCS, pupils, purposeful movement and seizure activity, and measure temperature when available.",
            "Acquire and transmit a 12-lead ECG when trained and equipped without delaying stabilization or transport.",
          ],
        }],
      },
      {
        title: "AEMT Care",
        summary: "All EMT care plus vascular access, cautious fluid resuscitation, airway support, and medication preparation.",
        levels: [{
          level: "AEMT",
          actions: [
            "Perform all EMT actions and establish IV/IO access without delaying transport.",
            "For MAP below 65 mm Hg, give normal saline 250–500 mL IV/IO and reassess blood pressure, lung sounds, perfusion, and respiratory status.",
            "Use smaller fluid volumes for CHF, renal failure, liver failure, or suspected volume overload.",
            "Assist with advanced-airway confirmation and continuous waveform capnography; reassess breath sounds, chest rise, tube depth, and waveform after every movement.",
            "Prepare norepinephrine and recurrent-dysrhythmia medications for paramedic use.",
            "Recheck glucose and complete vital signs after interventions or any clinical change.",
          ],
        }],
      },
      {
        title: "Paramedic Care",
        summary: "All AEMT care plus advanced airway/capnography, vasopressor support, rhythm management, ECG interpretation, and destination selection.",
        levels: [{
          level: "Paramedic",
          actions: [
            "Perform all EMT and AEMT actions and identify the likely cause of arrest and immediate post-ROSC threats.",
            "Confirm an advanced airway with continuous waveform capnography and ventilate near 10 breaths/min, titrating toward EtCO₂ approximately 35–45 mm Hg while recognizing that EtCO₂ may underestimate PaCO₂ after ROSC.",
            "If MAP remains below 65 mm Hg after cautious fluid, start norepinephrine 0.1–2 mcg/kg/min IV/IO and titrate to MAP at least 65 mm Hg.",
            "Alternatives to norepinephrine for post-ROSC hypotension require Medical Control.",
            "Interpret and transmit the 12-lead ECG, repeat when indicated, and activate AC-04 for persistent STEMI/STEMI-equivalent or suspected ongoing ischemia.",
            "Treat recurrent ventricular dysrhythmia through the linked rhythm-specific protocol and prepare for immediate re-arrest.",
            "Choose the receiving destination based on STEMI, cardiogenic shock, recurrent ventricular arrhythmia, ongoing ischemia, transport time, and available cardiac-arrest/PCI capability.",
          ],
        }],
      },
    ],
    indications: [
      "Sustained return of spontaneous circulation after adult cardiac arrest.",
      "Post-arrest patient with a pulse requiring stabilization, monitoring, cause identification, and destination selection.",
    ],
    contraindications: [
      "There is no contraindication to immediate post-ROSC stabilization.",
      "Do not continue AC-10 if the patient becomes pulseless; immediately resume CPR and open the rhythm-appropriate cardiac-arrest protocol.",
      "Do not give a rapid cold-IV-fluid infusion for prehospital temperature control after ROSC.",
    ],
    assessment: [
      {
        title: "Confirm ROSC and prepare for re-arrest",
        items: [
          "Confirm pulse, blood pressure/MAP, organized rhythm, perfusion, respiratory effort, and clinical response.",
          "Keep pads attached and maintain immediate access to the defibrillator, suction, ventilation equipment, and arrest medications.",
          "Reassess pulse, rhythm, blood pressure, perfusion, SpO₂, EtCO₂, respiratory status, and neurologic status frequently and after every intervention.",
        ],
      },
      {
        title: "Airway, oxygenation, and ventilation",
        items: [
          "Use 100% oxygen until SpO₂ can be measured reliably; then titrate FiO₂ to maintain SpO₂ 90–98%.",
          "Avoid both hypoxemia and prolonged hyperoxia.",
          "Begin ventilation near 10 breaths/min and titrate toward EtCO₂ approximately 35–45 mm Hg while avoiding hyperventilation.",
          "Recognize that post-ROSC EtCO₂ may underestimate PaCO₂ and follow clinical response and blood-gas results when available.",
          "Confirm an advanced airway with continuous waveform capnography and reassess after every movement.",
        ],
      },
      {
        title: "Hemodynamics",
        items: [
          "Obtain frequent blood pressure measurements and maintain MAP at least 65 mm Hg.",
          "Assess peripheral perfusion, capillary refill, skin findings, mental status, lung sounds, and signs of cardiogenic shock or volume overload.",
          "Use cautious fluid boluses and transition promptly to norepinephrine when hypotension persists.",
        ],
      },
      {
        title: "Cardiac, neurologic, glucose, and temperature assessment",
        items: [
          "Obtain and transmit a 12-lead ECG as soon as feasible; repeat if the tracing was acquired immediately after ROSC or the clinical condition changes.",
          "Document GCS, pupils, purposeful movement, focal findings, and seizure activity without making early field neurologic prognostication.",
          "Check blood glucose and treat values below 70 mg/dL through UP-04.",
          "Measure temperature when available, prevent fever, and avoid rapid warming of spontaneous hypothermia.",
        ],
      },
    ],
    treatmentSteps: [
      "Confirm sustained ROSC, keep defibrillation pads attached, and prepare for immediate re-arrest.",
      "Maintain airway and ventilation, use 100% oxygen until reliable SpO₂ is available, and then titrate oxygen to SpO₂ 90–98%.",
      "Begin ventilation near 10 breaths/min and titrate toward EtCO₂ approximately 35–45 mm Hg while avoiding hyperventilation.",
      "Confirm any advanced airway with continuous waveform capnography and reassess breath sounds, chest rise, tube depth, and waveform after every movement.",
      "Obtain frequent blood pressures and maintain MAP at least 65 mm Hg.",
      "For MAP below 65 mm Hg, give normal saline 250–500 mL IV/IO and reassess; use smaller volumes for CHF, renal failure, liver failure, or suspected volume overload.",
      "If hypotension persists, start norepinephrine 0.1–2 mcg/kg/min IV/IO and titrate to MAP at least 65 mm Hg; alternatives require Medical Control.",
      "Obtain and transmit a 12-lead ECG as soon as feasible and repeat it when the initial tracing was obtained immediately after ROSC or the clinical condition changes.",
      "Open AC-04 for persistent STEMI/STEMI-equivalent or evidence of significant ongoing myocardial ischemia.",
      "Check glucose, treat values below 70 mg/dL through UP-04, document neurologic findings and seizure activity, and avoid early neurologic prognostication.",
      "Measure temperature when available, prevent fever, avoid rapid cold-IV-fluid prehospital cooling, and do not rapidly warm spontaneous hypothermia.",
      "Transport patients with persistent STEMI/STEMI-equivalent, cardiogenic shock, recurrent ventricular arrhythmias, or significant ongoing ischemia to a PCI-capable hospital and consider Covenant Health Air when it shortens time to definitive care.",
      "Otherwise transport to the closest appropriate receiving facility with early notification and continuous reassessment.",
    ],
    medications: [
      {
        name: "Normal saline",
        dose: "250–500 mL IV/IO bolus, then reassess",
        notes: [
          "AEMT and Paramedic standing order for post-ROSC MAP below 65 mm Hg.",
          "Use smaller volumes for CHF, renal failure, liver failure, or suspected volume overload.",
          "Reassess blood pressure/MAP, lung sounds, perfusion, and respiratory status after each bolus.",
        ],
      },
      {
        name: "Norepinephrine",
        dose: "0.1–2 mcg/kg/min IV/IO; titrate to MAP at least 65 mm Hg",
        notes: [
          "Paramedic preferred vasopressor for persistent post-ROSC hypotension after cautious fluid resuscitation.",
          "Use continuous cardiac monitoring and frequent blood-pressure reassessment.",
          "Alternative post-ROSC vasopressors require Medical Control.",
        ],
      },
      {
        name: "Dextrose",
        dose: "Treat glucose below 70 mg/dL through UP-04 Altered Mental Status",
        notes: [
          "Avoid hypoglycemia and recheck glucose after treatment.",
          "Do not treat isolated post-ROSC hyperglycemia routinely in the field unless another protocol indicates treatment.",
        ],
      },
    ],
    warnings: [
      "Re-arrest is common; keep pads attached and be prepared to resume CPR and defibrillation immediately.",
      "Avoid hypoxemia, prolonged hyperoxia, and hyperventilation after ROSC.",
      "Do not use a rapid cold-IV-fluid infusion for prehospital temperature control.",
      "Use cautious fluid in CHF, renal failure, liver failure, and suspected volume overload.",
      "Do not rely on a single immediate post-ROSC ECG to exclude or confirm coronary occlusion; repeat the tracing when indicated.",
      "Coma alone does not exclude a patient from cardiac-center or catheterization-laboratory activation.",
      "Do not make early neurologic prognostication in the field.",
      "Routine prophylactic amiodarone is not required after ROSC without recurrent ventricular dysrhythmia.",
    ],
    clinicalPearls: [
      "A post-ROSC patient remains critically unstable even when the initial blood pressure and rhythm appear acceptable.",
      "AHA targets SpO₂ 90–98%, normal physiologic ventilation, and MAP at least 65 mm Hg after ROSC.",
      "Post-ROSC EtCO₂ may underestimate PaCO₂; use it as a trend and ventilation guide rather than an exact substitute for arterial blood gas.",
      "Immediate post-ROSC ECG changes may evolve; repeat ECG can reduce both missed occlusion and false activation.",
      "Persistent STEMI, cardiogenic shock, recurrent ventricular arrhythmia, or ongoing ischemia supports rapid PCI-capable destination.",
    ],
    specialPopulations: [
      {
        title: "Unresponsive after ROSC",
        items: [
          "Prevent fever and communicate the need for protocolized hospital temperature control between 32°C and 37.5°C.",
          "Do not initiate prehospital cooling with rapid cold-IV-fluid infusion.",
          "Avoid early neurologic prognostication and document the examination before sedatives or paralytics when feasible.",
        ],
      },
      {
        title: "Spontaneous hypothermia",
        items: [
          "Remove wet clothing and prevent further heat loss.",
          "Do not rapidly warm a spontaneously hypothermic post-arrest patient.",
        ],
      },
      {
        title: "Post-intubation care",
        items: [
          "Open AR-08 for tube/BIAD confirmation, ventilation, sedation, analgesia, and ongoing airway management.",
          "Reassess tube position and waveform capnography after every movement or transfer.",
        ],
      },
    ],
    actionLinks: [
      { label: "AC-04 ACS / STEMI", description: "Open for persistent STEMI/STEMI-equivalent or significant ongoing ischemia.", href: "/protocols/ac/ac-04", kind: "protocol" },
      { label: "AC-06 Narrow-Complex Tachycardia", description: "Open for recurrent narrow-complex tachycardia after ROSC.", href: "/protocols/ac/ac-06", kind: "protocol" },
      { label: "AC-07 Monomorphic Wide-Complex Tachycardia", description: "Open for recurrent monomorphic VT with a pulse.", href: "/protocols/ac/ac-07", kind: "protocol" },
      { label: "AC-08 Polymorphic Wide-Complex Tachycardia", description: "Open for recurrent polymorphic VT with a pulse.", href: "/protocols/ac/ac-08", kind: "protocol" },
      { label: "AC-09 VF / Pulseless VT", description: "Open immediately if the patient loses pulses in VF or VT.", href: "/protocols/ac/ac-09", kind: "protocol" },
      { label: "UP-04 Altered Mental Status", description: "Open for glucose below 70 mg/dL or another persistent altered-mental-status cause.", href: "/protocols/up/up-04", kind: "protocol" },
      { label: "AR-08 Post-Intubation / BIAD Management", description: "Open for advanced-airway confirmation, ventilation, sedation, and analgesia.", href: "/protocols/ar/ar-08", kind: "protocol" },
      { label: "AM-03 Dialysis / Renal Failure", description: "Open for suspected hyperkalemia, dialysis-related arrest, or renal failure.", href: "/protocols/am/am-03", kind: "protocol" },
      { label: "TE-07 Overdose / Toxic Ingestion", description: "Open for suspected toxicologic or overdose-related arrest.", href: "/protocols/te/te-07", kind: "protocol" },
    ],
    references: [
      "American Heart Association. 2025 Guidelines for CPR and ECC: Post-Cardiac Arrest Care.",
      "American Heart Association. 2025 Adult Post-Cardiac Arrest Care Algorithm.",
      "Tennessee Emergency Medical Services Board. Tennessee EMS Protocol Guidelines, September 2025.",
      "Claiborne EMS medication formulary and related cardiac, airway, medical, renal, and toxicology protocols.",
    ],
    sourcePdf: "/protocols/claiborne/ac-10-post-resuscitation-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 12, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Clinical content approved by the Claiborne EMS medical director during protocol review.",
      "Destination planning must follow the finalized regional cardiac-destination policy when that policy is adopted.",
      "App content remains a beta field reference until formal agency release and implementation approval.",
    ],
  },
  {
    id: "ac-11",
    title: "TEAM-Focused CPR",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: ["Native Claiborne County adult cardiac pathway using Tennessee scope and standing orders with a concise NC-style field algorithm.", "Use Universal Patient Care and the rhythm- or complaint-specific pathway together."],
    flow: [
      { title: "Assign Roles", text: "Team lead • compressor 1/2 • airway • monitor • IV/meds • recorder.", levels: ["Paramedic"], tone: "start" },
      { title: "Start Core Actions", text: "CPR, pads, rhythm analysis, ventilation, timer, and early shock.", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Closed-Loop Communication", text: "Orders repeated back; interventions and times announced.", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Two-Minute Rhythm", text: "Rotate compressors, assess rhythm, shock if indicated, resume CPR.", levels: ["Paramedic"], tone: "decision" },
      { title: "Quality Check", text: "Rate, depth, recoil, pauses, ventilation, EtCO₂, fatigue.", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "ROSC / Termination", text: "Transition deliberately to AC-10 or AC-12.", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      { title: "Provider-Level Actions", summary: "Act at the highest authorized level present without delaying lifesaving BLS care.", levels: [
        { level: "EMT", actions: ["Immediate assessment, CPR/AED when indicated, oxygenation/ventilation, pads, vital signs, and rapid transport.", "Assist with medications and procedures authorized by Tennessee EMT scope."] },
        { level: "AEMT", actions: ["All EMT care plus IV/IO access and authorized medications within Tennessee AEMT scope.", "Do not delay defibrillation, pacing, cardioversion, or transport for access attempts."] },
        { level: "Paramedic", actions: ["Rhythm interpretation, manual defibrillation, synchronized cardioversion, pacing, advanced airway, and Tennessee-authorized cardiac medications.", "Lead destination, Medical Control, and post-intervention reassessment decisions."] },
      ] },
    ],
    indications: ["Operational team model for adult cardiac arrest."],
    contraindications: [],
    assessment: [{ title: "Focused cardiac assessment", items: ["Apply Universal Patient Care and obtain two complete vital-sign sets when feasible.", "Place on continuous cardiac monitoring; obtain a 12-lead ECG when pulse is present and it will not delay urgent treatment.", "Assess onset, symptoms, medications, implanted devices, anticoagulants, prior cardiac disease, and reversible causes.", "Reassess after every shock, medication, pacing/cardioversion attempt, or major clinical change."] }],
    treatmentSteps: ["Follow the quick-flow algorithm and the current Tennessee adult cardiac protocol.", "Prioritize CPR quality, defibrillation, oxygenation/ventilation, and treatment of reversible causes.", "Notify the receiving facility early for unstable patients and time-sensitive cardiac conditions.", "Do not delay transport for nonessential procedures."],
    medications: [],
    warnings: ["The team leader should avoid performing a task that prevents global oversight.", "Limit compressor changes and rhythm checks to 10 seconds or less."],
    clinicalPearls: ["Predetermined positioning and role cards reduce delays and duplicated work."],
    specialPopulations: [{ title: "Special circumstances", items: ["Pregnancy, hypothermia, toxicologic arrest, electrocution, drowning, implanted mechanical support, and traumatic arrest may require a modified pathway and early Medical Control."] }],
    references: ["Tennessee EMS ALS/BLS Blended Protocol Guidelines, current edition.", "North Carolina College of Emergency Physicians EMS Protocols, 2025 organization and source comparison.", "Claiborne County EMS Clinical Protocols."],
    sourcePdf: "/protocols/claiborne/ac-11-team-focused-cpr-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "July 2026",
    lastVerifiedDate: "July 29, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: ["Medical-director approval is required before clinical release.", "Current Tennessee scope, medication dosing, and standing orders control if any conflict exists.", "The imported North Carolina PDF remains available for source comparison."],
  },
  {
    id: "ac-12",
    title: "Termination of Resuscitation",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: ["Native Claiborne County adult cardiac pathway using Tennessee scope and standing orders with a concise NC-style field algorithm.", "Use Universal Patient Care and the rhythm- or complaint-specific pathway together."],
    flow: [
      { title: "Confirm Eligibility", text: "Adult arrest • adequate resuscitation • no exclusion requiring continued care.", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Complete Resuscitation", text: "High-quality CPR, rhythm-specific care, airway/ventilation, access, reversible causes.", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Persistent Arrest?", text: "No ROSC and termination criteria met after required effort/time.", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Medical Control", text: "Contact when required by Tennessee or Claiborne policy; document discussion.", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Terminate + Support", text: "Stop resuscitation, confirm death, support family, preserve scene when indicated.", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Documentation", text: "Times, rhythms, interventions, EtCO₂, causes considered, decision, disposition.", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      { title: "Provider-Level Actions", summary: "Act at the highest authorized level present without delaying lifesaving BLS care.", levels: [
        { level: "EMT", actions: ["Immediate assessment, CPR/AED when indicated, oxygenation/ventilation, pads, vital signs, and rapid transport.", "Assist with medications and procedures authorized by Tennessee EMT scope."] },
        { level: "AEMT", actions: ["All EMT care plus IV/IO access and authorized medications within Tennessee AEMT scope.", "Do not delay defibrillation, pacing, cardioversion, or transport for access attempts."] },
        { level: "Paramedic", actions: ["Rhythm interpretation, manual defibrillation, synchronized cardioversion, pacing, advanced airway, and Tennessee-authorized cardiac medications.", "Lead destination, Medical Control, and post-intervention reassessment decisions."] },
      ] },
    ],
    indications: ["Adult nontraumatic cardiac arrest being considered for field termination under Tennessee and Claiborne policy."],
    contraindications: [],
    assessment: [{ title: "Focused cardiac assessment", items: ["Apply Universal Patient Care and obtain two complete vital-sign sets when feasible.", "Place on continuous cardiac monitoring; obtain a 12-lead ECG when pulse is present and it will not delay urgent treatment.", "Assess onset, symptoms, medications, implanted devices, anticoagulants, prior cardiac disease, and reversible causes.", "Reassess after every shock, medication, pacing/cardioversion attempt, or major clinical change."] }],
    treatmentSteps: ["Follow the quick-flow algorithm and the current Tennessee adult cardiac protocol.", "Prioritize CPR quality, defibrillation, oxygenation/ventilation, and treatment of reversible causes.", "Notify the receiving facility early for unstable patients and time-sensitive cardiac conditions.", "Do not delay transport for nonessential procedures."],
    medications: [],
    warnings: ["Do not terminate when hypothermia, pregnancy, toxicologic cause, electrocution, lightning, drowning, or another reversible special circumstance warrants continued resuscitation.", "Follow separate traumatic-arrest and obvious-death policies when applicable."],
    clinicalPearls: ["Termination should be a team decision grounded in protocol, clinical context, and complete documentation."],
    specialPopulations: [{ title: "Special circumstances", items: ["Pregnancy, hypothermia, toxicologic arrest, electrocution, drowning, implanted mechanical support, and traumatic arrest may require a modified pathway and early Medical Control."] }],
    references: ["Tennessee EMS ALS/BLS Blended Protocol Guidelines, current edition.", "North Carolina College of Emergency Physicians EMS Protocols, 2025 organization and source comparison.", "Claiborne County EMS Clinical Protocols."],
    sourcePdf: "/protocols/claiborne/ac-12-termination-of-cpr-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "July 2026",
    lastVerifiedDate: "July 29, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: ["Medical-director approval is required before clinical release.", "Current Tennessee scope, medication dosing, and standing orders control if any conflict exists.", "The imported North Carolina PDF remains available for source comparison."],
  },
  {
    id: "ac-13",
    title: "Targeted Temperature Management",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: ["Native Claiborne County adult cardiac pathway using Tennessee scope and standing orders with a concise NC-style field algorithm.", "Use Universal Patient Care and the rhythm- or complaint-specific pathway together."],
    flow: [
      { title: "Post-ROSC Stabilize", text: "Airway, ventilation, perfusion, ECG, glucose, and treat immediate threats.", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Measure Temperature", text: "Use reliable core or approved temperature measurement when available.", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Prevent Fever", text: "Remove excessive insulation; use passive measures and destination plan.", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Active Cooling Authorized?", text: "Use only the Tennessee/Claiborne approved method; avoid uncontrolled cold-fluid loading.", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Treat Shivering / Complications", text: "Per protocol and Medical Control; monitor rhythm, BP, and glucose.", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Transport", text: "Early receiving notification and continuous post-arrest care.", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      { title: "Provider-Level Actions", summary: "Act at the highest authorized level present without delaying lifesaving BLS care.", levels: [
        { level: "EMT", actions: ["Immediate assessment, CPR/AED when indicated, oxygenation/ventilation, pads, vital signs, and rapid transport.", "Assist with medications and procedures authorized by Tennessee EMT scope."] },
        { level: "AEMT", actions: ["All EMT care plus IV/IO access and authorized medications within Tennessee AEMT scope.", "Do not delay defibrillation, pacing, cardioversion, or transport for access attempts."] },
        { level: "Paramedic", actions: ["Rhythm interpretation, manual defibrillation, synchronized cardioversion, pacing, advanced airway, and Tennessee-authorized cardiac medications.", "Lead destination, Medical Control, and post-intervention reassessment decisions."] },
      ] },
    ],
    indications: ["Comatose adult after ROSC when temperature management is indicated by current Tennessee/receiving-system policy."],
    contraindications: [],
    assessment: [{ title: "Focused cardiac assessment", items: ["Apply Universal Patient Care and obtain two complete vital-sign sets when feasible.", "Place on continuous cardiac monitoring; obtain a 12-lead ECG when pulse is present and it will not delay urgent treatment.", "Assess onset, symptoms, medications, implanted devices, anticoagulants, prior cardiac disease, and reversible causes.", "Reassess after every shock, medication, pacing/cardioversion attempt, or major clinical change."] }],
    treatmentSteps: ["Follow the quick-flow algorithm and the current Tennessee adult cardiac protocol.", "Prioritize CPR quality, defibrillation, oxygenation/ventilation, and treatment of reversible causes.", "Notify the receiving facility early for unstable patients and time-sensitive cardiac conditions.", "Do not delay transport for nonessential procedures."],
    medications: [],
    warnings: ["Do not allow temperature interventions to delay airway, perfusion, ECG, or transport.", "Avoid routine rapid infusion of large volumes of cold crystalloid."],
    clinicalPearls: ["Fever prevention begins immediately, even when active cooling is not initiated in the field."],
    specialPopulations: [{ title: "Special circumstances", items: ["Pregnancy, hypothermia, toxicologic arrest, electrocution, drowning, implanted mechanical support, and traumatic arrest may require a modified pathway and early Medical Control."] }],
    references: ["Tennessee EMS ALS/BLS Blended Protocol Guidelines, current edition.", "North Carolina College of Emergency Physicians EMS Protocols, 2025 organization and source comparison.", "Claiborne County EMS Clinical Protocols."],
    sourcePdf: "/protocols/claiborne/ac-13-targeted-temperature-management-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "July 2026",
    lastVerifiedDate: "July 29, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: ["Medical-director approval is required before clinical release.", "Current Tennessee scope, medication dosing, and standing orders control if any conflict exists.", "The imported North Carolina PDF remains available for source comparison."],
  },
  {
    id: "ac-14",
    title: "LVAD Emergency",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: ["Native Claiborne County adult cardiac pathway using Tennessee scope and standing orders with a concise NC-style field algorithm.", "Use Universal Patient Care and the rhythm- or complaint-specific pathway together."],
    flow: [
      { title: "Identify Device + Call Coordinator", text: "Bring controller, batteries, backup equipment; contact LVAD center/coordinator early.", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Assess Perfusion", text: "Mental status, skin, capillary refill, Doppler BP, EtCO₂; pulse may be absent normally.", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Device Running?", text: "Listen for hum, inspect connections, power, controller, and alarms; do not disconnect both power sources.", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Perfusing?", text: "Yes: treat complaint and transport to LVAD-capable center. No: correct device/power issue and begin resuscitation as indicated.", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "CPR Decision", text: "If unresponsive with no signs of perfusion and device troubleshooting fails, begin compressions per protocol/coordinator guidance.", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Transport", text: "Take all equipment and caregiver; destination coordinated with LVAD center.", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      { title: "Provider-Level Actions", summary: "Act at the highest authorized level present without delaying lifesaving BLS care.", levels: [
        { level: "EMT", actions: ["Immediate assessment, CPR/AED when indicated, oxygenation/ventilation, pads, vital signs, and rapid transport.", "Assist with medications and procedures authorized by Tennessee EMT scope."] },
        { level: "AEMT", actions: ["All EMT care plus IV/IO access and authorized medications within Tennessee AEMT scope.", "Do not delay defibrillation, pacing, cardioversion, or transport for access attempts."] },
        { level: "Paramedic", actions: ["Rhythm interpretation, manual defibrillation, synchronized cardioversion, pacing, advanced airway, and Tennessee-authorized cardiac medications.", "Lead destination, Medical Control, and post-intervention reassessment decisions."] },
      ] },
    ],
    indications: ["Patient with a left ventricular assist device who is ill, injured, or has a device alarm."],
    contraindications: [],
    assessment: [{ title: "Focused cardiac assessment", items: ["Apply Universal Patient Care and obtain two complete vital-sign sets when feasible.", "Place on continuous cardiac monitoring; obtain a 12-lead ECG when pulse is present and it will not delay urgent treatment.", "Assess onset, symptoms, medications, implanted devices, anticoagulants, prior cardiac disease, and reversible causes.", "Reassess after every shock, medication, pacing/cardioversion attempt, or major clinical change."] }],
    treatmentSteps: ["Follow the quick-flow algorithm and the current Tennessee adult cardiac protocol.", "Prioritize CPR quality, defibrillation, oxygenation/ventilation, and treatment of reversible causes.", "Notify the receiving facility early for unstable patients and time-sensitive cardiac conditions.", "Do not delay transport for nonessential procedures."],
    medications: [{ name: "Anticoagulation consideration", dose: "Expect chronic anticoagulant use; manage bleeding aggressively", notes: ["Follow current Tennessee scope, contraindications, and Medical Control requirements."] }],
    warnings: ["Do not use pulse absence alone to diagnose arrest in a continuous-flow LVAD patient.", "Do not remove, clamp, or manipulate the driveline; do not replace the controller unless trained and directed."],
    clinicalPearls: ["A functioning continuous-flow LVAD usually produces a constant mechanical hum."],
    specialPopulations: [{ title: "Special circumstances", items: ["Pregnancy, hypothermia, toxicologic arrest, electrocution, drowning, implanted mechanical support, and traumatic arrest may require a modified pathway and early Medical Control."] }],
    references: ["Tennessee EMS ALS/BLS Blended Protocol Guidelines, current edition.", "North Carolina College of Emergency Physicians EMS Protocols, 2025 organization and source comparison.", "Claiborne County EMS Clinical Protocols."],
    sourcePdf: "/protocols/claiborne/ac-14-lvad-emergency-protocol.pdf",
    sourcePages: { start: 1, end: 4 },
    revisionDate: "July 2026",
    lastVerifiedDate: "July 29, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: ["Medical-director approval is required before clinical release.", "Current Tennessee scope, medication dosing, and standing orders control if any conflict exists.", "The imported North Carolina PDF remains available for source comparison."],
  },
  {
    id: "ac-15",
    title: "Total Artificial Heart / Mechanical Circulation",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: ["Native Claiborne County adult cardiac pathway using Tennessee scope and standing orders with a concise NC-style field algorithm.", "Use Universal Patient Care and the rhythm- or complaint-specific pathway together."],
    flow: [
      { title: "Identify System", text: "Determine device type; gather backup driver, batteries, supplies, and trained caregiver.", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Call Specialty Center", text: "Contact device coordinator/implant center immediately.", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Assess Patient + Device", text: "Mental status, perfusion, alarms, tubing, power, driver function, and external bleeding.", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Troubleshoot", text: "Follow device labels and coordinator direction; secure loose connections and restore power.", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Treat Concurrent Illness", text: "Airway, oxygenation, hemorrhage, trauma, glucose, and other reversible problems.", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Transport", text: "Specialty destination with all equipment and continuous coordinator communication.", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      { title: "Provider-Level Actions", summary: "Act at the highest authorized level present without delaying lifesaving BLS care.", levels: [
        { level: "EMT", actions: ["Immediate assessment, CPR/AED when indicated, oxygenation/ventilation, pads, vital signs, and rapid transport.", "Assist with medications and procedures authorized by Tennessee EMT scope."] },
        { level: "AEMT", actions: ["All EMT care plus IV/IO access and authorized medications within Tennessee AEMT scope.", "Do not delay defibrillation, pacing, cardioversion, or transport for access attempts."] },
        { level: "Paramedic", actions: ["Rhythm interpretation, manual defibrillation, synchronized cardioversion, pacing, advanced airway, and Tennessee-authorized cardiac medications.", "Lead destination, Medical Control, and post-intervention reassessment decisions."] },
      ] },
    ],
    indications: ["Patient supported by a total artificial heart or other implanted mechanical circulatory support device."],
    contraindications: [],
    assessment: [{ title: "Focused cardiac assessment", items: ["Apply Universal Patient Care and obtain two complete vital-sign sets when feasible.", "Place on continuous cardiac monitoring; obtain a 12-lead ECG when pulse is present and it will not delay urgent treatment.", "Assess onset, symptoms, medications, implanted devices, anticoagulants, prior cardiac disease, and reversible causes.", "Reassess after every shock, medication, pacing/cardioversion attempt, or major clinical change."] }],
    treatmentSteps: ["Follow the quick-flow algorithm and the current Tennessee adult cardiac protocol.", "Prioritize CPR quality, defibrillation, oxygenation/ventilation, and treatment of reversible causes.", "Notify the receiving facility early for unstable patients and time-sensitive cardiac conditions.", "Do not delay transport for nonessential procedures."],
    medications: [],
    warnings: ["Do not perform chest compressions on a total artificial heart patient unless specifically directed by the device center and current policy.", "Do not disconnect air hoses, cannulas, or power sources except according to device instructions."],
    clinicalPearls: ["The device coordinator and trained caregiver are critical clinical resources."],
    specialPopulations: [{ title: "Special circumstances", items: ["Pregnancy, hypothermia, toxicologic arrest, electrocution, drowning, implanted mechanical support, and traumatic arrest may require a modified pathway and early Medical Control."] }],
    references: ["Tennessee EMS ALS/BLS Blended Protocol Guidelines, current edition.", "North Carolina College of Emergency Physicians EMS Protocols, 2025 organization and source comparison.", "Claiborne County EMS Clinical Protocols."],
    sourcePdf: "/protocols/claiborne/ac-15-total-mechanic-circulation-protocol.pdf",
    sourcePages: { start: 1, end: 3 },
    revisionDate: "July 2026",
    lastVerifiedDate: "July 29, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: ["Medical-director approval is required before clinical release.", "Current Tennessee scope, medication dosing, and standing orders control if any conflict exists.", "The imported North Carolina PDF remains available for source comparison."],
  },
  {
    id: "ac-16",
    title: "Wearable Cardioverter-Defibrillator Vest",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: ["Native Claiborne County adult cardiac pathway using Tennessee scope and standing orders with a concise NC-style field algorithm.", "Use Universal Patient Care and the rhythm- or complaint-specific pathway together."],
    flow: [
      { title: "Scene + Device Safety", text: "Keep bystanders clear during alarms; identify vest and manufacturer instructions.", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Responsive?", text: "Do not prevent a shock unless the patient is conscious and the device provides a response-button option.", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Cardiac Arrest", text: "Remove/disconnect vest as directed, begin CPR, apply EMS pads, and follow AC-03/AC-09.", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Pulse Present", text: "Monitor, 12-lead, assess cause, document device shocks, and contact Medical Control/device support.", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Prevent Interference", text: "Do not place EMS pads directly over vest electrodes or medication patches.", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Transport", text: "Bring the vest, monitor unit, batteries, and event information.", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      { title: "Provider-Level Actions", summary: "Act at the highest authorized level present without delaying lifesaving BLS care.", levels: [
        { level: "EMT", actions: ["Immediate assessment, CPR/AED when indicated, oxygenation/ventilation, pads, vital signs, and rapid transport.", "Assist with medications and procedures authorized by Tennessee EMT scope."] },
        { level: "AEMT", actions: ["All EMT care plus IV/IO access and authorized medications within Tennessee AEMT scope.", "Do not delay defibrillation, pacing, cardioversion, or transport for access attempts."] },
        { level: "Paramedic", actions: ["Rhythm interpretation, manual defibrillation, synchronized cardioversion, pacing, advanced airway, and Tennessee-authorized cardiac medications.", "Lead destination, Medical Control, and post-intervention reassessment decisions."] },
      ] },
    ],
    indications: ["Patient wearing a wearable cardioverter-defibrillator vest who is symptomatic, shocked, or in cardiac arrest."],
    contraindications: [],
    assessment: [{ title: "Focused cardiac assessment", items: ["Apply Universal Patient Care and obtain two complete vital-sign sets when feasible.", "Place on continuous cardiac monitoring; obtain a 12-lead ECG when pulse is present and it will not delay urgent treatment.", "Assess onset, symptoms, medications, implanted devices, anticoagulants, prior cardiac disease, and reversible causes.", "Reassess after every shock, medication, pacing/cardioversion attempt, or major clinical change."] }],
    treatmentSteps: ["Follow the quick-flow algorithm and the current Tennessee adult cardiac protocol.", "Prioritize CPR quality, defibrillation, oxygenation/ventilation, and treatment of reversible causes.", "Notify the receiving facility early for unstable patients and time-sensitive cardiac conditions.", "Do not delay transport for nonessential procedures."],
    medications: [],
    warnings: ["Do not touch the patient during a vest shock warning or delivered shock.", "Once EMS defibrillation is required, remove enough of the vest to safely expose and dry the chest."],
    clinicalPearls: ["The vest may deliver shocks while the patient still has a pulse; assess the patient, not just the alarm history."],
    specialPopulations: [{ title: "Special circumstances", items: ["Pregnancy, hypothermia, toxicologic arrest, electrocution, drowning, implanted mechanical support, and traumatic arrest may require a modified pathway and early Medical Control."] }],
    references: ["Tennessee EMS ALS/BLS Blended Protocol Guidelines, current edition.", "North Carolina College of Emergency Physicians EMS Protocols, 2025 organization and source comparison.", "Claiborne County EMS Clinical Protocols."],
    sourcePdf: "/protocols/claiborne/ac-16-wearable-cardioverter-defibrillator-vest-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "July 2026",
    lastVerifiedDate: "July 29, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: ["Medical-director approval is required before clinical release.", "Current Tennessee scope, medication dosing, and standing orders control if any conflict exists.", "The imported North Carolina PDF remains available for source comparison."],
  },
  {
    id: "am-01",
    title: "Allergic Reaction / Anaphylaxis",
    categoryId: "am",
    category: "Adult Medical",
    overview: [
      "Rapidly distinguish isolated skin symptoms from multisystem anaphylaxis.",
      "Epinephrine is the first-line treatment for anaphylaxis and must not be delayed for IV access, antihistamines, or steroids.",
    ],
    flow: [
      { title: "Suspected Allergen Exposure", text: "Assess airway, breathing, circulation, skin, GI symptoms, and perfusion", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Anaphylaxis?", text: "Two or more body systems, respiratory compromise, or hypotension", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Give IM Epinephrine", text: "Do not delay; repeat per current Tennessee protocol if symptoms persist", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Support Airway + Breathing", text: "Oxygen, suction, BVM, bronchodilator, advanced airway as needed", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Treat Shock", text: "IV/IO, fluid bolus, repeat epinephrine; vasopressor pathway if refractory", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Reassess + Transport", text: "Continuous monitoring and early destination notification", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [
      { title: "Provider Actions", summary: "Epinephrine first for anaphylaxis.", levels: [
        { level: "EMT", actions: ["Airway positioning, oxygen/ventilation, rapid IM epinephrine per protocol, oral antihistamine only for isolated mild symptoms when authorized."] },
        { level: "AEMT", actions: ["All EMT care plus IV/IO access, fluids, bronchodilator therapy, and authorized medications."] },
        { level: "Paramedic", actions: ["Advanced airway, repeated epinephrine, cardiac/EtCO₂ monitoring, and refractory-shock treatment under protocol or Medical Control."] },
      ]},
    ],
    indications: ["Suspected allergic reaction, angioedema, or anaphylaxis."],
    contraindications: ["There is no absolute contraindication to epinephrine in life-threatening anaphylaxis."],
    assessment: [{ title: "Severity", items: ["Mild: isolated flushing, hives, or itching with normal breathing and perfusion.", "Anaphylaxis: respiratory compromise, hypotension, or involvement of two or more body systems.", "Reassess airway swelling, lung sounds, blood pressure, mental status, and response after every intervention."] }],
    treatmentSteps: ["Give IM epinephrine immediately for anaphylaxis.", "Provide airway and ventilatory support; add albuterol for bronchospasm.", "Establish IV/IO access and give isotonic fluid for hypotension.", "Do not allow diphenhydramine or corticosteroid administration to delay epinephrine.", "Transport all moderate or severe reactions with continuous reassessment."],
    medications: [
      { name: "Epinephrine", dose: "Per current Tennessee EMS anaphylaxis protocol", notes: ["First-line medication; IM route preferred initially."] },
      { name: "Albuterol", dose: "Per current Tennessee EMS protocol", notes: ["For persistent bronchospasm."] },
      { name: "Diphenhydramine", dose: "Per current Tennessee EMS protocol", notes: ["Adjunct only; not a substitute for epinephrine."] },
    ],
    warnings: ["Anaphylaxis may occur without rash.", "ACE-inhibitor angioedema may progress rapidly.", "Do not delay repeat epinephrine while obtaining vascular access."],
    clinicalPearls: ["Shorter time from exposure to symptoms often predicts a more severe reaction.", "Obtain a 12-lead and continuous monitoring in significant reactions when it does not delay epinephrine."],
    specialPopulations: [],
    references: ["Tennessee EMS ALS/BLS Blended Protocol Guidelines", "NC College of Emergency Physicians AM-1 source protocol"],
    sourcePdf: "/protocols/claiborne/am-01-allergic-reaction-anaphylaxis-protocol.pdf",
    sourcePages: { start: 1, end: 2 }, revisionDate: "July 2026", lastVerifiedDate: "July 29, 2026", reviewStatus: "Reviewed",
    reviewFlags: ["Final medication doses and provider permissions remain subject to Claiborne County medical-director approval and current Tennessee scope."],
  },
  {
    id: "am-02",
    title: "Diabetic Emergency — Adult",
    categoryId: "am",
    category: "Adult Medical",
    overview: ["Treat symptomatic hypoglycemia promptly while identifying stroke, seizure, overdose, trauma, infection, or other mimics.", "Hyperglycemia management emphasizes dehydration, shock recognition, and cautious fluids when heart failure or renal failure is present."],
    flow: [
      { title: "Check Blood Glucose", text: "Altered mental status, weakness, seizure, diaphoresis, vomiting, or suspected diabetes", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Glucose <70 + Symptoms?", text: "Yes: treat hypoglycemia and protect airway", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Can Swallow Safely?", text: "Yes: oral glucose/food • No: parenteral glucose or glucagon", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Glucose ≥250?", text: "Assess dehydration, DKA/HHS, shock, infection, and euglycemic DKA risk", levels: ["AEMT", "Paramedic"], tone: "decision" },
      { title: "Recheck in 5 Minutes", text: "Repeat glucose and neurologic exam until improving", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Transport / Refusal Screen", text: "Encourage transport for oral agents, long-acting insulin, recurrent symptoms, or uncertain cause", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [{ title: "Provider Actions", summary: "Correct glucose safely and reassess.", levels: [
      { level: "EMT", actions: ["Check glucose; give oral glucose only when the patient can swallow and protect the airway; assist with authorized glucagon when indicated."] },
      { level: "AEMT", actions: ["IV/IO access, dextrose per protocol, cautious fluids for dehydration, serial glucose checks."] },
      { level: "Paramedic", actions: ["Manage airway, seizures, shock, dysrhythmia, and alternative causes; obtain ECG when indicated."] },
    ]}],
    indications: ["Suspected hypoglycemia, hyperglycemia, DKA/HHS, or diabetic complication."], contraindications: ["Do not give oral glucose to a patient unable to swallow or protect the airway."],
    assessment: [{ title: "Key checks", items: ["Blood glucose, airway, neurologic exam, medication type, last dose and meal.", "Look for dehydration, Kussmaul respirations, abdominal pain, infection, and shock.", "Consider euglycemic DKA in patients taking SGLT2 inhibitors despite glucose below 250 mg/dL."] }],
    treatmentSteps: ["Treat symptomatic glucose below 70 mg/dL.", "Recheck glucose and mental status every 5 minutes until stable.", "For hyperglycemia, treat shock/dehydration with cautious isotonic fluid within protocol.", "Use the stroke or seizure pathway when focal deficits or persistent neurologic abnormalities remain after glucose correction."],
    medications: [{ name: "Oral glucose", dose: "Per current Tennessee EMS protocol" }, { name: "Dextrose", dose: "Per current Tennessee EMS protocol" }, { name: "Glucagon", dose: "Per current Tennessee EMS protocol" }, { name: "Normal saline", dose: "Per current Tennessee EMS shock/diabetic protocol" }],
    warnings: ["Glucagon may be ineffective in malnutrition or depleted glycogen states.", "Oral diabetic agents and long-acting insulin can cause recurrent hypoglycemia.", "Limit routine fluids in heart failure or dialysis patients unless clinically volume depleted."],
    clinicalPearls: ["Persistent focal deficit after correction is stroke until proven otherwise.", "A refusal after hypoglycemia requires restored capacity, stable repeat glucose, access to food, and low risk of recurrence."], specialPopulations: [],
    references: ["Tennessee EMS ALS/BLS Blended Protocol Guidelines", "NC College of Emergency Physicians AM-2 source protocol"], sourcePdf: "/protocols/claiborne/am-02-diabetic-adult-protocol.pdf", sourcePages: { start: 1, end: 2 }, revisionDate: "July 2026", lastVerifiedDate: "July 29, 2026", reviewStatus: "Reviewed", reviewFlags: ["Exact glucose thresholds, concentrations, and provider-level routes must match the final Claiborne formulary."],
  },
  {
    id: "am-03",
    title: "Dialysis / Renal Failure",
    categoryId: "am", category: "Adult Medical",
    overview: ["Renal-failure patients may present with hyperkalemia, pulmonary edema, sepsis, bleeding, hypotension, or dialysis-access complications.", "Protect the dialysis access and rapidly identify life-threatening hyperkalemia or fluid overload."],
    flow: [
      { title: "Assess ABCs + Dialysis History", text: "Last treatment • missed sessions • access type • dry weight • symptoms", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Cardiac Arrest / Wide QRS?", text: "Suspect hyperkalemia; begin cardiac protocol and hyperkalemia treatment", levels: ["Paramedic"], tone: "urgent" },
      { title: "Pulmonary Edema?", text: "Position, oxygen/CPAP, cardiac monitoring, CHF pathway", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Access Bleeding?", text: "Direct fingertip pressure; avoid circumferential or bulky compression", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Shock / Sepsis?", text: "Use cautious fluid aliquots with frequent lung and perfusion reassessment", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Transport + Notify", text: "Bring dialysis information; early notification for instability", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [{ title: "Provider Actions", summary: "Protect access and anticipate hyperkalemia.", levels: [
      { level: "EMT", actions: ["Oxygen/ventilation, bleeding control with direct pressure, identify dialysis schedule and access type."] },
      { level: "AEMT", actions: ["IV/IO away from fistula when possible; cautious fluids; glucose assessment."] },
      { level: "Paramedic", actions: ["12-lead/continuous ECG, hyperkalemia medications per protocol, CPAP/advanced airway, dysrhythmia management."] },
    ]}],
    indications: ["Dialysis patient, renal failure, suspected hyperkalemia, or dialysis-access complication."], contraindications: ["Do not place BP cuffs, tourniquets, or vascular access in an extremity with a functioning fistula unless no alternative exists and the situation is immediately life-threatening."],
    assessment: [{ title: "High-risk findings", items: ["Missed dialysis, weakness, bradycardia, peaked T waves, QRS widening, pulmonary edema, fever, hypotension, or uncontrolled access bleeding.", "Ask about last dialysis, dry weight, recent potassium, anticoagulants, and access problems."] }],
    treatmentSteps: ["Treat cardiac arrest and dysrhythmia immediately.", "For suspected hyperkalemia with ECG changes, give membrane-stabilizing and shifting therapy per current Tennessee protocol.", "Control fistula bleeding with focused direct pressure while preserving flow.", "Use cautious fluid boluses for shock and reassess lungs after each aliquot."],
    medications: [{ name: "Calcium", dose: "Per current Tennessee EMS hyperkalemia protocol" }, { name: "Sodium bicarbonate", dose: "Per current Tennessee EMS protocol" }, { name: "Albuterol", dose: "Per current Tennessee EMS hyperkalemia/respiratory protocol" }],
    warnings: ["A normal mental status does not exclude dangerous hyperkalemia or shock.", "Avoid routine large fluid volumes in anuric patients.", "Dialysis catheters are not routine vascular access and may be used only under the approved Claiborne policy."],
    clinicalPearls: ["Hyperkalemia may present with weakness or bradycardia before classic ECG changes.", "Bring the patient's dialysis paperwork and medication list when available."], specialPopulations: [],
    references: ["Tennessee EMS ALS/BLS Blended Protocol Guidelines", "NC College of Emergency Physicians AM-3 source protocol"], sourcePdf: "/protocols/claiborne/am-03-dialysis-renal-failure-protocol.pdf", sourcePages: { start: 1, end: 2 }, revisionDate: "July 2026", lastVerifiedDate: "July 29, 2026", reviewStatus: "Reviewed", reviewFlags: ["Hyperkalemia doses and dialysis-catheter use require final medical-director approval."],
  },
  {
    id: "am-04",
    title: "Hypertension",
    categoryId: "am", category: "Adult Medical",
    overview: ["Treat the patient and evidence of end-organ injury, not an isolated blood-pressure number.", "Prehospital rapid blood-pressure reduction can be harmful unless directed by a condition-specific protocol or Medical Control."],
    flow: [
      { title: "Confirm Blood Pressure", text: "Correct cuff size • repeat manually when inconsistent", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "End-Organ Emergency?", text: "Stroke • ACS • pulmonary edema • aortic syndrome • encephalopathy • pregnancy", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Use Specific Protocol", text: "Treat the emergency driving the blood pressure", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "No Acute Injury", text: "Position, reassure, monitor, avoid aggressive reduction", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Transport + Reassess", text: "Serial BP, neurologic status, chest symptoms, and perfusion", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [{ title: "Provider Actions", summary: "Identify hypertensive emergency.", levels: [
      { level: "EMT", actions: ["Repeat BP, perform stroke screen, assess chest pain, dyspnea, pregnancy, and neurologic symptoms."] },
      { level: "AEMT", actions: ["IV access when indicated; continue monitoring and condition-specific care."] },
      { level: "Paramedic", actions: ["12-lead ECG, advanced assessment, and protocol-specific treatment; contact Medical Control before isolated BP-lowering therapy."] },
    ]}],
    indications: ["Markedly elevated blood pressure or symptoms concerning for hypertensive emergency."], contraindications: ["Do not lower blood pressure solely to normalize a number without a protocol-defined indication."],
    assessment: [{ title: "End-organ screen", items: ["New neurologic deficit, altered mental status, seizure, chest/back pain, pulmonary edema, visual symptoms, pregnancy-related symptoms, or reduced perfusion.", "Document medication adherence and stimulant or sympathomimetic exposure."] }],
    treatmentSteps: ["Verify the reading and address pain, anxiety, hypoxia, and the underlying emergency.", "Use stroke, ACS, pulmonary edema, aortic, or obstetric protocols as indicated.", "Transport symptomatic patients and reassess frequently."],
    medications: [], warnings: ["Rapid uncontrolled BP reduction can worsen cerebral, coronary, or renal perfusion.", "Do not give a patient's home antihypertensive unless specifically authorized."],
    clinicalPearls: ["Severe hypertension without acute end-organ injury is not usually a prehospital medication emergency.", "Accurate cuff size and manual confirmation prevent major treatment errors."], specialPopulations: [],
    references: ["Tennessee EMS ALS/BLS Blended Protocol Guidelines", "NC College of Emergency Physicians AM-4 source protocol"], sourcePdf: "/protocols/claiborne/am-04-hypertension-protocol.pdf", sourcePages: { start: 1, end: 1 }, revisionDate: "July 2026", lastVerifiedDate: "July 29, 2026", reviewStatus: "Reviewed", reviewFlags: ["Any prehospital antihypertensive medication pathway requires explicit Claiborne approval."],
  },
  {
    id: "am-05",
    title: "Hypotension / Shock",
    categoryId: "am", category: "Adult Medical",
    overview: ["Recognize shock from perfusion findings, not blood pressure alone.", "Treat the cause while establishing clinically meaningful vascular access and avoiding delays in resuscitation."],
    flow: [
      { title: "Recognize Shock", text: "SBP <90 or poor perfusion, altered mentation, cool/mottled skin, weak pulses, delayed refill", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Identify Cause", text: "Hemorrhagic • septic • cardiogenic • obstructive • anaphylactic • medication", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Immediate Support", text: "Airway/oxygenation, temperature control, supine as tolerated, control bleeding", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "IV/IO + Fluids", text: "No more than 3 IV attempts in urgent cases; reassess after each aliquot", levels: ["AEMT", "Paramedic"], tone: "action" },
      { title: "Persistent Shock?", text: "Paramedic vasopressor pathway and cause-specific treatment", levels: ["Paramedic"], tone: "decision" },
      { title: "Rapid Transport", text: "Early notification; do not delay definitive hemorrhage or obstructive care", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [{ title: "Provider Actions", summary: "Perfusion first; cause-specific resuscitation.", levels: [
      { level: "EMT", actions: ["Control bleeding, airway/ventilation support, prevent heat loss, rapid transport, frequent vitals."] },
      { level: "AEMT", actions: ["Large proximal IV or IO when urgent, isotonic fluid in reassessed aliquots, authorized cause-specific care."] },
      { level: "Paramedic", actions: ["Advanced hemodynamic assessment, vasopressor treatment, ECG, ultrasound if locally approved, and obstructive/cardiogenic differential."] },
    ]}],
    indications: ["Hypotension or clinical evidence of inadequate perfusion."], contraindications: ["Avoid indiscriminate large-volume crystalloid in pulmonary edema, cardiogenic shock, or uncontrolled hemorrhage."],
    assessment: [{ title: "Shock assessment", items: ["Trend mental status, pulse quality, skin, capillary refill, BP, respiratory pattern, EtCO₂, and urine/dialysis history when relevant.", "Search for bleeding, infection, anaphylaxis, cardiac ischemia, PE, tension pneumothorax, tamponade, overdose, adrenal crisis, and ectopic pregnancy."] }],
    treatmentSteps: ["Correct immediate airway, breathing, or hemorrhage threats.", "Obtain IV/IO access without delaying transport; move to IO rapidly when IV access fails in urgent shock.", "Give fluid in clinically appropriate aliquots with reassessment.", "Use vasopressors only per the current Tennessee/Claiborne protocol and after addressing reversible causes.", "Transport to definitive care with early notification."],
    medications: [{ name: "Isotonic crystalloid", dose: "Per current Tennessee EMS shock protocol" }, { name: "Vasopressor", dose: "Per current Tennessee EMS protocol and Claiborne formulary" }],
    warnings: ["GCS 15 does not equal hemodynamic stability.", "Hypotension requires treatment regardless of mental status.", "Do not delay transport for repeated peripheral IV attempts."],
    clinicalPearls: ["A falling EtCO₂ in a spontaneously breathing patient may signal worsening perfusion.", "Use smaller fluid aliquots with frequent reassessment in heart failure, renal failure, and suspected cardiogenic shock."],
    specialPopulations: [{ title: "Adrenal insufficiency", items: ["Ask about prescribed stress-dose steroids and follow the patient-specific emergency plan when authorized."] }],
    references: ["Tennessee EMS ALS/BLS Blended Protocol Guidelines", "NC College of Emergency Physicians AM-5 source protocol"], sourcePdf: "/protocols/claiborne/am-05-hypotension-shock-protocol.pdf", sourcePages: { start: 1, end: 2 }, revisionDate: "July 2026", lastVerifiedDate: "July 29, 2026", reviewStatus: "Reviewed", reviewFlags: ["Final vasopressor choice, concentration, dosing, and provider scope require Claiborne approval."],
  },
  {
    id: "am-06",
    title: "Suspected Stroke — Tenecteplase (TNK) Transfer",
    categoryId: "am", category: "Adult Medical",
    overview: ["This protocol applies to interfacility transfer of a stroke patient after Tenecteplase (TNK) has been administered by the sending hospital.", "TNK is given as a single weight-based IV bolus; there is no thrombolytic infusion to continue during transport."],
    flow: [
      { title: "Verify TNK Transfer", text: "Confirm drug, weight-based dose, bolus time, last known well, and receiving acceptance", levels: ["Paramedic"], tone: "start" },
      { title: "Stabilize Before Departure", text: "Airway secure • glucose checked • SBP <185 and DBP <110 unless receiving team directs otherwise", levels: ["Paramedic"], tone: "urgent" },
      { title: "Serial Neuro + Vitals", text: "GCS, pupils, stroke findings, BP and symptoms every 15 minutes", levels: ["Paramedic"], tone: "action" },
      { title: "Complication?", text: "Severe headache • vomiting • worsening neuro exam • angioedema • bleeding", levels: ["Paramedic"], tone: "decision" },
      { title: "Support + Notify Immediately", text: "No TNK infusion to stop; manage ABCs and contact receiving facility/Medical Control", levels: ["Paramedic", "Medical Control"], tone: "urgent" },
      { title: "Direct Transport", text: "NPO • cardiac monitor • minimize delays • complete handoff", levels: ["Paramedic"], tone: "transport" },
    ],
    careModules: [{ title: "Provider Actions", summary: "Interfacility transfer after TNK bolus.", levels: [
      { level: "EMT", actions: ["Assist with airway, monitoring, movement, and documentation under the transport team plan."] },
      { level: "AEMT", actions: ["Assist with authorized monitoring and vascular access; this transfer generally requires paramedic-level care."] },
      { level: "Paramedic", actions: ["Verify TNK dose/time, perform serial neurologic and BP assessments, maintain NPO status, and manage complications with immediate receiving-facility contact."] },
    ]}],
    indications: ["Interfacility transfer after hospital-administered Tenecteplase (TNK) for suspected ischemic stroke."],
    contraindications: ["Do not initiate transport until the patient meets sending and receiving facility stability criteria or an explicit physician-directed transfer plan is documented."],
    assessment: [{ title: "Before departure", items: ["Document exact last known well and symptom-discovery times.", "Verify patient weight, total TNK dose, bolus administration time, baseline NIHSS or facility neurologic exam when available, and receiving physician/facility acceptance.", "Obtain baseline BP, GCS, pupils, stroke findings, glucose, airway assessment, and IV-site assessment."] }, { title: "En route", items: ["Repeat BP, GCS, pupils, and neurologic exam at least every 15 minutes.", "Watch for severe headache, nausea/vomiting, acute hypertension, declining mental status, new deficit, angioedema, or bleeding."] }],
    treatmentSteps: ["Maintain oxygenation and ventilation; keep the patient NPO.", "Use the limb without an infusion for BP readings when practical.", "For neurologic deterioration, bleeding, angioedema, or severe headache, support ABCs and immediately contact the receiving facility and Medical Control.", "Continue only antihypertensive infusions specifically ordered and accepted under the interfacility-transfer policy; titrate only to written parameters.", "Transport directly without unnecessary delay."],
    medications: [{ name: "Tenecteplase (TNK)", dose: "Single weight-based IV bolus administered by the sending hospital", notes: ["TNK has no ongoing infusion during transport.", "Verify dose and administration time before departure."] }, { name: "Antihypertensive infusion", dose: "Continue only under written sending orders and receiving-facility acceptance", notes: ["Follow the approved Claiborne interfacility-transfer policy and pump parameters."] }],
    warnings: ["Use Tenecteplase (TNK) on first reference and TNK thereafter throughout the Claiborne protocol.", "Any sudden neurologic deterioration or bleeding after TNK is an emergency.", "Angioedema can threaten the airway even without other allergic findings."],
    clinicalPearls: ["TNK is a bolus medication, so there is no thrombolytic pump or remaining drug volume to manage.", "Precise times—not estimates such as ‘about an hour ago’—are essential for stroke care."],
    specialPopulations: [{ title: "Wake-up stroke", items: ["Last known well is the last time the patient was known to be at neurologic baseline, not the time symptoms were discovered."] }],
    references: ["Tennessee EMS ALS/BLS Blended Protocol Guidelines", "NC College of Emergency Physicians AM-6 source protocol adapted for TNK", "Sending and receiving stroke-center transfer orders"],
    sourcePdf: "/protocols/claiborne/am-06-suspected-stroke-activase-t-pa-transfer-protocol.pdf", sourcePages: { start: 1, end: 2 }, revisionDate: "July 2026", lastVerifiedDate: "July 29, 2026", reviewStatus: "Reviewed",
    reviewFlags: ["Final BP thresholds, antihypertensive agents, titration limits, staffing level, and transfer acceptance requirements must be approved by the Claiborne medical director and receiving stroke centers."],
  },
  {
    id: "am-07",
    title: "Crashing Medical Patient",
    categoryId: "am", category: "Adult Medical",
    overview: ["Identify the critically ill medical patient immediately and begin resuscitation at the patient’s side before a difficult or prolonged move whenever the scene is safe.", "This protocol does not replace rapid transport for trauma or transport when required treatment is unavailable to the crew."],
    flow: [
      { title: "Critical Medical Patient?", text: "Hypoxia • severe respiratory distress • SBP <90 • AMS • poor perfusion • extreme respiratory rate", levels: ["EMT", "AEMT", "Paramedic"], tone: "start" },
      { title: "Bring Resuscitation Equipment", text: "Monitor/defibrillator • airway • oxygen • vascular access • medications", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Treat Before Difficult Movement", text: "Unless movement is required for safety, access, or unavailable intervention", levels: ["EMT", "AEMT", "Paramedic"], tone: "decision" },
      { title: "Stabilize ABCs + Perfusion", text: "Airway/ventilation • shock • dysrhythmia • anaphylaxis • sepsis • respiratory pathway", levels: ["EMT", "AEMT", "Paramedic"], tone: "urgent" },
      { title: "Reassess During Extrication", text: "Predetermine stops; reassess pulse, vitals, airway, and pressor response at least every 5 minutes", levels: ["EMT", "AEMT", "Paramedic"], tone: "action" },
      { title: "Transport + Early Alert", text: "Move once initial lifesaving interventions are underway; request additional resources early", levels: ["EMT", "AEMT", "Paramedic"], tone: "transport" },
    ],
    careModules: [{ title: "Provider Actions", summary: "Resuscitate at the patient side when safe and feasible.", levels: [
      { level: "EMT", actions: ["Full early vital set, oxygen/BVM, hemorrhage control, positioning, AED/monitor support, rapid resource request."] },
      { level: "AEMT", actions: ["Clinically meaningful IV/IO access, fluids and authorized medications, supraglottic airway when indicated."] },
      { level: "Paramedic", actions: ["Advanced airway/ventilation, dysrhythmia treatment, vasopressors, cause-specific resuscitation, destination and transport strategy."] },
    ]}],
    indications: ["Critically ill medical patient with abnormal vital signs and signs of impending deterioration."], contraindications: ["Do not remain on scene when safety is threatened, definitive treatment is unavailable, hemorrhage requires surgery/blood products unavailable to the crew, or transport/rendezvous is the fastest route to needed care."],
    assessment: [{ title: "Crashing features", items: ["SpO₂ below 90%, severe work of breathing, need for NIPPV, SBP below 90, altered mental status, delayed capillary refill, cool/mottled skin, or extreme respiratory rate.", "Obtain a complete set of vital signs as early as possible, ideally within 5 minutes of contact."] }],
    treatmentSteps: ["Bring all anticipated resuscitation equipment to the patient.", "Begin airway, breathing, circulation, shock, and cause-specific interventions before a prolonged move when safe.", "Use rapid IO access when urgent vascular access is needed and peripheral IV is unsuccessful or unlikely.", "Plan reassessment stops during prolonged extrication.", "Initiate movement promptly after lifesaving measures are underway or sooner when transport is the required intervention."],
    medications: [], warnings: ["GCS 15 does not equal stability.", "Hypotension requires treatment regardless of mental status.", "Extrication frequently takes longer than estimated."],
    clinicalPearls: ["The goal is not prolonged scene care; it is to avoid moving an unresuscitated patient through a difficult extrication when immediate EMS interventions can improve stability.", "Call for additional hands and advanced resources early."], specialPopulations: [],
    references: ["Tennessee EMS ALS/BLS Blended Protocol Guidelines", "NC College of Emergency Physicians AM-7 source protocol"], sourcePdf: "/protocols/claiborne/am-07-crashing-patient-protocol.pdf", sourcePages: { start: 1, end: 2 }, revisionDate: "July 2026", lastVerifiedDate: "July 29, 2026", reviewStatus: "Reviewed", reviewFlags: ["This workflow requires operational review to ensure consistency with Claiborne response, intercept, and transport policies."],
  },
  {
    id: "ac-04",
    title: "Acute Coronary Syndrome / STEMI",
    categoryId: "ac",
    category: "Adult Cardiac",
    overview: [
      "Adult acute coronary syndrome pathway for patients 16 years of age and older with chest discomfort, an anginal-equivalent complaint, or ECG findings concerning for acute coronary occlusion.",
      "Obtain and transmit a diagnostic-quality 12-lead ECG as early as possible, with a goal of within 10 minutes of first medical contact.",
      "Target scene time is less than 15 minutes unless essential stabilization requires additional time.",
    ],
    flow: [
      {
        title: "Suspected ACS",
        text: "Chest discomfort or anginal equivalent • ABCs • symptom-onset time • complete vital signs • SpO₂ • cardiac monitor",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "12-Lead Within 10 Minutes",
        text: "Acquire and transmit immediately • repeat for persistent or recurrent symptoms, nondiagnostic tracing, or deterioration",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Immediate Treatment",
        text: "Aspirin 324 mg chewed • oxygen only when indicated • prepare for instability",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Nitroglycerin Eligible?",
        text: "SBP ≥110 • no shock, RV infarction/preload dependence, or prohibited PDE-5 use • 0.4 mg SL every 5 min, max 3",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "STEMI / Occlusion Suspected?",
        text: "Transmit ECG • early alert • minimize scene time • choose the fastest appropriate reperfusion pathway",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Reperfusion Destination",
        text: "Hospital with catheterization-lab capability or Claiborne Medical Center for hospital-directed thrombolytic treatment",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
      {
        title: "Consider Covenant Health Air",
        text: "Activate when appropriate and expected to reduce time to reperfusion-capable care • do not delay ground movement or rendezvous",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
      {
        title: "Reassess En Route",
        text: "Symptoms • ECG • blood pressure • perfusion • respiratory status • response to treatment",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
    ],
    careModules: [
      {
        title: "EMT Care",
        summary: "Rapid recognition, aspirin, prescribed-nitroglycerin assistance, ECG acquisition, early notification, and time-sensitive transport.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Perform the primary assessment, obtain symptom-onset time and focused history, apply the cardiac monitor/AED, obtain SpO₂ and complete vital signs, and place defibrillation pads when instability is present or anticipated.",
              "Obtain a 12-lead ECG within 10 minutes of first medical contact when equipment and training are available; transmit the tracing immediately without delaying transport.",
              "Give aspirin 324 mg chewed unless contraindicated.",
              "Assist with the patient's prescribed nitroglycerin only when SBP is at least 110 mmHg and no contraindication is present.",
              "Provide oxygen only for SpO₂ below 90%, respiratory distress, shock, or another clinical indication.",
              "Initiate early destination notification and transport under the Claiborne reperfusion plan.",
            ],
          },
        ],
      },
      {
        title: "AEMT Care",
        summary: "All EMT care plus vascular access, agency nitroglycerin, cautious fluid treatment for hypotension, and continued ECG surveillance.",
        levels: [
          {
            level: "AEMT",
            actions: [
              "Perform all EMT actions and establish IV access without delaying transport.",
              "Give nitroglycerin 0.4 mg SL every 5 minutes for continuing ischemic discomfort, to a maximum of three doses, only when SBP is at least 110 mmHg and no contraindication is present.",
              "For hypotension without pulmonary edema, give isotonic crystalloid in cautious 250 mL aliquots with reassessment after each aliquot.",
              "Repeat 12-lead ECGs for persistent or recurrent symptoms, a nondiagnostic initial tracing, or clinical deterioration.",
              "Immediately report hypotension, dysrhythmia, worsening respiratory status, altered mental status, or other evidence of instability.",
            ],
          },
        ],
      },
      {
        title: "Paramedic Care",
        summary: "All AEMT care plus ECG interpretation, high-risk occlusion recognition, refractory-pain treatment, instability management, and reperfusion destination decisions.",
        levels: [
          {
            level: "Paramedic",
            actions: [
              "Perform all EMT and AEMT actions; interpret serial ECGs and identify STEMI, posterior or right-ventricular involvement, and other patterns concerning for acute coronary occlusion.",
              "Obtain V4R for suspected right-ventricular involvement or V7-V9 for suspected posterior infarction when indicated and feasible, without delaying transport.",
              "For persistent significant ischemic discomfort after aspirin and appropriate nitroglycerin, give fentanyl 25–50 mcg IV/IO; repeat as needed to a maximum total dose of 100 mcg.",
              "Use continuous cardiac, respiratory, SpO₂, and blood-pressure monitoring after fentanyl administration.",
              "Treat dysrhythmia, acute pulmonary edema, shock, or cardiac arrest under the corresponding linked protocol.",
              "Choose the fastest appropriate reperfusion pathway, initiate early facility notification, and consider Covenant Health Air when appropriate.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Chest discomfort, pressure, heaviness, tightness, or pain concerning for myocardial ischemia.",
      "Anginal-equivalent symptoms including dyspnea, diaphoresis, nausea, vomiting, syncope, weakness, or jaw, arm, back, shoulder, or epigastric discomfort.",
      "Diagnostic, dynamic, or evolving ECG changes concerning for STEMI or acute coronary occlusion.",
      "Unexplained high-risk symptoms in an older adult or a patient with diabetes, known coronary disease, or another significant cardiovascular risk factor.",
    ],
    contraindications: [
      "No exclusion should prevent appropriate assessment and ECG acquisition when acute coronary syndrome is reasonably suspected.",
      "Withhold aspirin for true aspirin anaphylaxis, active major bleeding, or strong suspicion of acute aortic dissection.",
      "Withhold nitroglycerin when SBP is below 110 mmHg, shock or preload dependence is present, right-ventricular infarction is suspected, or prohibited recent PDE-5 inhibitor use is identified.",
    ],
    assessment: [
      {
        title: "Immediate assessment",
        items: [
          "Perform the primary assessment and treat immediate life threats.",
          "Obtain continuous cardiac monitoring, SpO₂, blood pressure, and two complete vital-sign sets when feasible.",
          "Determine exact symptom onset, progression, provoking or relieving factors, and associated symptoms.",
          "Assess for prior myocardial infarction, PCI, CABG, heart failure, dysrhythmia, and implanted cardiac devices.",
          "Review aspirin already taken, antiplatelet or anticoagulant therapy, active bleeding, medication allergies, and recent PDE-5 inhibitor use.",
          "Consider other time-critical causes of chest or upper-body discomfort, including aortic dissection, pulmonary embolism, tension pneumothorax, esophageal rupture, and hemorrhage.",
        ],
      },
      {
        title: "12-lead ECG",
        items: [
          "Obtain a diagnostic-quality 12-lead ECG as early as possible, with a goal of within 10 minutes of first medical contact.",
          "Transmit the ECG to the anticipated receiving facility immediately and provide early notification when STEMI or acute coronary occlusion is suspected.",
          "Repeat the ECG for persistent or recurrent symptoms, a nondiagnostic initial tracing, or clinical deterioration.",
          "Obtain V4R for suspected right-ventricular involvement or V7-V9 for suspected posterior infarction when indicated and feasible.",
          "Do not delay transport solely for ECG transmission, repeat ECGs, or additional lead placement.",
        ],
      },
      {
        title: "STEMI identification",
        items: [
          "Use the clinical presentation together with ST elevation in at least two anatomically contiguous leads.",
          "Measure ST elevation at the J point relative to the isoelectric baseline.",
          "In leads other than V2-V3: at least 1 mm of ST elevation in two contiguous leads.",
          "In V2-V3 for women: at least 1.5 mm.",
          "In V2-V3 for men age 40 or older: at least 2 mm.",
          "In V2-V3 for men younger than 40: at least 2.5 mm.",
          "The monitor's automated interpretation does not independently confirm or exclude STEMI.",
        ],
      },
      {
        title: "Contiguous lead groups",
        items: [
          "Inferior: II, III, aVF.",
          "Lateral: I, aVL, V5, V6.",
          "Anterior/septal: V1-V4.",
          "Posterior: V7-V9.",
          "Right ventricular: V3R-V4R.",
        ],
      },
      {
        title: "STEMI equivalents and high-risk occlusion patterns",
        items: [
          "Posterior MI: horizontal ST depression in V1-V3 with prominent R waves or upright T waves in the appropriate clinical setting; obtain V7-V9 when feasible.",
          "Right-ventricular involvement: in inferior STEMI, obtain right-sided leads when feasible; ST elevation in V4R supports RV involvement.",
          "New or presumed-new left bundle branch block alone is not an automatic STEMI criterion.",
          "In left bundle branch block or paced rhythm, immediately transmit tracings with concordant ST elevation, concordant ST depression in V1-V3, excessive discordance, dynamic ischemia, or another pattern strongly concerning for acute occlusion.",
          "Other high-risk patterns include diffuse ST depression with ST elevation in aVR, de Winter-type changes, hyperacute T waves, and rapidly progressive ST-segment changes.",
        ],
      },
    ],
    treatmentSteps: [
      "Administer aspirin 324 mg chewed as soon as acute coronary syndrome is suspected unless contraindicated. If the patient has already taken aspirin, give enough to complete a 324 mg loading dose.",
      "Provide oxygen only for SpO₂ below 90%, respiratory distress, shock, or another clinical indication; do not routinely administer oxygen when SpO₂ is at least 90%.",
      "Assist with prescribed nitroglycerin at the EMT level or administer agency nitroglycerin at the AEMT/Paramedic level: 0.4 mg SL every 5 minutes as needed, maximum three doses.",
      "Withhold nitroglycerin when SBP is below 110 mmHg, shock or preload dependence is present, right-ventricular infarction is suspected, or the patient used avanafil within 12 hours, sildenafil or vardenafil within 24 hours, or tadalafil within 48 hours.",
      "Establish IV access without delaying transport. Do not routinely administer fluids; for hypotension without pulmonary edema, use cautious 250 mL isotonic-crystalloid aliquots with reassessment.",
      "For persistent significant ischemic discomfort after aspirin and appropriate nitroglycerin, a paramedic may give fentanyl 25–50 mcg IV/IO and repeat as needed to a maximum total dose of 100 mcg with continuous monitoring.",
      "Immediately notify the anticipated receiving facility and transmit the ECG when STEMI or acute coronary occlusion is suspected.",
      "Transport to a hospital with cardiac catheterization laboratory capability or to Claiborne Medical Center for hospital-directed thrombolytic treatment under the Claiborne destination plan.",
      "Consider Covenant Health Air when appropriate and reasonably expected to reduce time to reperfusion-capable care.",
      "Air activation must not delay assessment, aspirin, ECG acquisition, stabilization, or movement toward ground transport or rendezvous.",
      "Treat dysrhythmia, acute pulmonary edema, shock, or cardiac arrest under the corresponding linked protocol.",
      "Target scene time is less than 15 minutes. Do not delay transport for repeat ECGs, IV access, additional leads, or nonessential procedures.",
    ],
    medications: [
      {
        name: "Aspirin",
        dose: "324 mg PO chewed",
        notes: [
          "EMT, AEMT, and Paramedic standing order for suspected acute coronary syndrome.",
          "If aspirin was taken before EMS arrival, give enough to complete a total loading dose of 324 mg.",
          "Withhold for true aspirin anaphylaxis, active major bleeding, or strong suspicion of acute aortic dissection.",
        ],
      },
      {
        name: "Nitroglycerin",
        dose: "0.4 mg SL every 5 minutes as needed; maximum 3 doses",
        notes: [
          "EMT may assist with the patient's prescribed nitroglycerin; AEMT and Paramedic may administer agency nitroglycerin.",
          "Withhold when SBP is below 110 mmHg, shock or preload dependence is present, right-ventricular infarction is suspected, or prohibited recent PDE-5 inhibitor use is identified.",
          "Reassess symptoms, blood pressure, and perfusion before and after every dose.",
        ],
      },
      {
        name: "Fentanyl",
        dose: "25–50 mcg IV/IO; repeat as needed to a maximum total dose of 100 mcg",
        notes: [
          "Paramedic standing order for persistent significant ischemic discomfort after aspirin and appropriate nitroglycerin.",
          "Use continuous cardiac, respiratory, SpO₂, and blood-pressure monitoring.",
          "Avoid routine opioid administration; opioids may delay absorption of oral antiplatelet medications.",
        ],
      },
      {
        name: "Isotonic crystalloid",
        dose: "250 mL IV/IO aliquots with reassessment",
        notes: [
          "AEMT and Paramedic for hypotension without pulmonary edema.",
          "Do not administer routine fluid boluses to a normotensive patient.",
        ],
      },
    ],
    warnings: [
      "A normal or nondiagnostic initial ECG does not exclude acute myocardial infarction.",
      "Do not use a new or presumed-new left bundle branch block alone as an automatic STEMI criterion.",
      "Withhold nitroglycerin for SBP below 110 mmHg, shock, suspected right-ventricular infarction or preload dependence, and prohibited recent PDE-5 inhibitor use.",
      "Strong suspicion of acute aortic dissection is a reason to withhold aspirin and nitroglycerin and pursue immediate time-critical transport.",
      "Do not delay transport while waiting for air-medical arrival when ground transport or rendezvous is faster.",
      "Claiborne EMS does not administer prehospital thrombolytics, heparin, or a P2Y12 inhibitor under AC-04.",
      "Transport to Claiborne Medical Center for thrombolytic treatment means hospital evaluation and hospital-directed treatment; EMS does not independently determine thrombolytic eligibility.",
    ],
    clinicalPearls: [
      "Transmit the first ECG as soon as possible, even when the automated interpretation is nondiagnostic.",
      "Early notification allows the receiving team to review the tracing and prepare the catheterization laboratory or thrombolytic pathway.",
      "Serial ECGs are particularly valuable when symptoms continue or the initial tracing is nondiagnostic.",
      "Borderline ST elevation with strong reciprocal changes may still represent acute coronary occlusion.",
      "Older adults, women, and patients with diabetes may present without classic chest pain.",
    ],
    specialPopulations: [
      {
        title: "Atypical presentations",
        items: [
          "Consider acute coronary syndrome in unexplained dyspnea, weakness, diaphoresis, nausea, syncope, or jaw, arm, shoulder, back, or epigastric discomfort.",
          "Maintain a low threshold for ECG acquisition in older adults and patients with diabetes or known coronary disease.",
        ],
      },
      {
        title: "Right-ventricular infarction",
        items: [
          "Inferior STEMI with hypotension, clear lungs, jugular venous distention, or disproportionate preload dependence should prompt right-sided lead acquisition when feasible.",
          "Withhold nitroglycerin when right-ventricular infarction or preload dependence is suspected.",
        ],
      },
    ],
    actionLinks: [
      {
        label: "AC-02 Bradycardia With a Pulse",
        description: "Open for symptomatic bradycardia or poor perfusion.",
        href: "/protocols/ac/ac-02",
        kind: "protocol",
      },
      {
        label: "AC-05 Acute Pulmonary Edema",
        description: "Open for cardiogenic pulmonary edema or decompensated heart failure.",
        href: "/protocols/ac/ac-05",
        kind: "protocol",
      },
      {
        label: "AC-03 Adult Cardiac Arrest",
        description: "Open immediately if the patient becomes pulseless.",
        href: "/protocols/ac/ac-03",
        kind: "protocol",
      },
    ],
    references: [
      "American College of Cardiology/American Heart Association. 2025 Guideline for the Management of Patients With Acute Coronary Syndromes.",
      "American Heart Association and American Red Cross. 2024 Guidelines for First Aid.",
      "Tennessee Emergency Medical Services Board. Tennessee EMS Protocol Guidelines, September 2025.",
      "Claiborne EMS medication formulary and reperfusion destination plan.",
      "Claiborne Medical Center hospital thrombolytic-treatment pathway.",
      "Covenant Health Air.",
    ],
    sourcePdf: "/protocols/claiborne/ac-04-chest-pain-and-stemi-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Clinical content approved by the Claiborne EMS medical director during protocol review.",
      "Facility capabilities, catheterization-laboratory access, thrombolytic pathway availability, and air-transport routing require periodic operational confirmation.",
      "App content remains a beta field reference until formal agency release and implementation approval.",
    ],
  },
  ...structuredUniversalAdditions,
  ...structuredTraumaProtocols,
  ...structuredObstetricsProtocols,
  ...structuredAirwayProtocols,
  ...structuredPediatricCardiacProtocols,
  ...structuredPediatricMedicalProtocols,
  ...structuredSpecialCircumstancesProtocols,
  ...structuredSceneOperationsProtocols,
  ...structuredToxicologyEnvironmentalProtocols,
  ...structuredChemicalHazmatAdditions,
  ...structuredEyeTraumaAdditions,
  ...structuredAbdominalPelvicTraumaAdditions,
];

export function getStructuredProtocol(categoryId: string, protocolId: string) {
  return structuredProtocols.find(
    (protocol) => protocol.categoryId === categoryId && protocol.id === protocolId
  );
}

export function hasReviewedNativeContent(content?: StructuredProtocolContent) {
  return content?.reviewStatus === "Reviewed" || content?.reviewStatus === "Approved";
}

export function getPrimaryProtocolHref(categoryId: string, protocolId: string) {
  if (categoryId === "up" && protocolId === "up-19") {
    return "/protocols/up/up-18";
  }

  return hasReviewedNativeContent(getStructuredProtocol(categoryId, protocolId))
    ? `/protocols/${categoryId}/${protocolId}`
    : `/protocols/${categoryId}/${protocolId}/viewer`;
}
