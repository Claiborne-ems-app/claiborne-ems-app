import type { StructuredProtocolContent } from "../lib/protocols/structured-content";

export const structuredUniversalAdditions: StructuredProtocolContent[] = [
  {
    id: "up-20",
    title: "Sickle Cell Crisis",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Use this protocol for a patient with known or suspected sickle cell disease and acute pain or illness. Sickle cell trait alone does not establish a vaso-occlusive crisis.",
      "Do not assume every complaint is an uncomplicated pain crisis. Screen for acute chest syndrome, stroke, fever or sepsis, shock or severe anemia, splenic sequestration, priapism, pregnancy complications, dehydration, and pain that differs from the patient's usual crisis.",
      "Treat pain promptly and respectfully while preserving airway, ventilation, perfusion, neurologic assessment, and rapid access to definitive care.",
    ],
    flow: [
      {
        title: "Confirm Sickle Cell Disease + Assess",
        text: "Usual crisis pattern • pain • chest symptoms • fever • neurologic findings • perfusion • pregnancy • priapism",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Life-Threatening Complication?",
        text: "Acute chest syndrome • stroke • sepsis • shock/severe anemia • splenic sequestration • priapism ≥4 hours",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Support Oxygenation + Temperature",
        text: "Oxygen for hypoxemia or respiratory distress • target SpO₂ ≥95% unless documented lower baseline • keep warm",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Treat Pain Promptly",
        text: "Nonpharmacologic care • adult UP-11 • approved pediatric weight-based pathway • reassess pain and sedation",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Fluids Only When Indicated",
        text: "No routine bolus • hypotension/poor perfusion: adult 250 mL or pediatric 10 mL/kg isotonic aliquots with reassessment",
        levels: ["AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Rapid Transport When High Risk",
        text: "Chest symptoms • hypoxemia • neurologic deficit • fever ≥38.5°C • shock/anemia • pregnancy • atypical or uncontrolled pain",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "Recognize complications, begin supportive care, treat pain early, and avoid unnecessary delay or excess fluid.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Perform XABCDE, obtain two complete sets of vital signs when feasible, assess pain, temperature, SpO₂, mental status, perfusion, and the patient's usual crisis pattern and prior complications.",
              "Ask specifically about chest pain, cough, fever, dyspnea, new weakness or speech change, syncope, pregnancy, abdominal fullness, and priapism duration when applicable.",
              "Keep the patient warm, position for comfort, provide oxygen for hypoxemia or respiratory distress, and support ventilation when needed.",
              "Use approved nonpharmacologic and EMT pain measures. Do not dismiss or delay care because the patient appears calm or has frequent EMS encounters.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Perform all EMT care. Establish IV access when indicated without delaying transport or analgesia.",
              "Do not give a routine crystalloid bolus for uncomplicated vaso-occlusive pain. For hypotension or poor perfusion, administer isotonic crystalloid in reassessed aliquots: adult 250 mL or pediatric 10 mL/kg.",
              "For suspected dehydration without hypotension, use only KVO or maintenance-rate fluid during transport and reassess for pulmonary congestion.",
              "Administer approved AEMT analgesia under the applicable adult or pediatric pain pathway and monitor treatment response.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior care. Treat adult pain under UP-11 and pediatric pain with the approved age- and weight-based pediatric formulary pathway.",
              "For opioid or ketamine analgesia, continuously monitor airway, respiratory effort, SpO₂, cardiac rhythm, and waveform EtCO₂ when feasible; keep suction and BVM immediately available.",
              "Obtain a 12-lead ECG for adult chest pain, dyspnea, syncope, abnormal rhythm, or another cardiac concern without delaying transport.",
              "Provide early receiving-facility notification for acute chest syndrome, stroke findings, fever, shock, suspected severe anemia or sequestration, prolonged priapism, pregnancy concern, or an atypical crisis.",
            ],
          },
        ],
      },
      {
        title: "High-Risk Complications",
        summary: "A normal appearance or familiar pain complaint does not exclude a time-critical complication.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Acute chest syndrome: suspect with chest pain, cough, fever, dyspnea, abnormal lung sounds, or new hypoxemia. Provide oxygen and ventilation support as indicated and transport rapidly.",
              "Stroke: treat any new focal deficit, speech change, severe disequilibrium, vision change, or altered mental status under the suspected-stroke pathway.",
              "Fever: temperature 38.5°C / 101.3°F or higher is high risk for invasive infection and requires prompt emergency-department evaluation.",
              "Splenic sequestration or severe anemia: suspect with weakness, pallor, tachycardia, abdominal fullness or splenic enlargement, syncope, hypotension, or poor perfusion.",
              "Priapism: duration four hours or longer is a time-critical emergency; severe pain or a rapidly progressing episode also requires urgent evaluation.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "For hypotension or poor perfusion, provide small reassessed isotonic fluid aliquots and stop or slow fluid if respiratory distress, crackles, or worsening oxygenation develops.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Coordinate rapid specialty-capable transport and early notification. Provide cause-specific airway, shock, seizure, stroke, or cardiac care under the applicable Claiborne protocol.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Known or suspected sickle cell disease with acute pain, fever, respiratory symptoms, neurologic symptoms, weakness, syncope, priapism, pregnancy concern, or other acute illness.",
      "Concern for a sickle cell complication even when the presenting pain resembles a prior vaso-occlusive crisis.",
    ],
    contraindications: [
      "Do not diagnose vaso-occlusive crisis solely from sickle cell trait.",
      "Do not give routine crystalloid boluses to an otherwise perfusing patient with uncomplicated pain.",
    ],
    assessment: [
      {
        title: "Focused history",
        items: [
          "Confirm sickle cell disease type when known, prior acute chest syndrome or stroke, baseline SpO₂, transfusion history, usual pain location and severity, and the patient's previously effective and tolerated treatment.",
          "Determine onset, location, severity, and character of pain and whether this episode differs from the patient's usual crisis.",
          "Ask about fever, chills, cough, chest pain, dyspnea, focal neurologic symptoms, syncope, reduced intake, vomiting or diarrhea, pregnancy, abdominal swelling, and priapism duration.",
          "Review allergies, analgesics already taken, hydroxyurea or other disease-modifying therapy, anticoagulants, recent hospitalization, and indwelling vascular access.",
        ],
      },
      {
        title: "Focused examination and monitoring",
        items: [
          "Obtain two complete sets of vital signs when feasible, including temperature, SpO₂, mental status, pain score, respiratory effort, and perfusion.",
          "Assess lung sounds, work of breathing, skin color and temperature, hydration, pulse quality, neurologic status, and the painful area for an alternate cause.",
          "Examine the abdomen for tenderness or enlargement when severe anemia or splenic sequestration is suspected; do not delay transport for a prolonged examination.",
          "Use continuous pulse oximetry for chest or respiratory symptoms. Add cardiac monitoring, 12-lead ECG, and waveform EtCO₂ when indicated by the presentation or treatment.",
        ],
      },
    ],
    treatmentSteps: [
      "Perform Universal Patient Care and immediately address airway, ventilation, hypoxemia, shock, altered mental status, seizure, stroke findings, or another life threat.",
      "Provide oxygen for hypoxemia or respiratory distress and target SpO₂ at least 95% unless the patient has a documented lower baseline. Keep the patient warm and avoid cold exposure.",
      "Treat pain promptly. Use UP-11 for patients 16 years or older and the approved pediatric age- and weight-based pathway for patients younger than 16 years.",
      "Do not withhold analgesia because the patient appears calm, has recurrent crises, or has received opioid medication previously. Use the patient's known effective regimen only when it is consistent with the approved protocol, formulary, and current clinical condition.",
      "Do not give a routine fluid bolus for uncomplicated pain. For hypotension or poor perfusion, give isotonic crystalloid in reassessed aliquots: adult 250 mL or pediatric 10 mL/kg. For dehydration without hypotension, use only KVO or maintenance-rate fluid during transport.",
      "For suspected acute chest syndrome, support oxygenation and ventilation, apply continuous SpO₂ and cardiac monitoring, obtain a 12-lead ECG when indicated, notify early, and transport rapidly without excessive fluid.",
      "For temperature 38.5°C / 101.3°F or higher, provide supportive sepsis care and prompt transport. No field antibiotic is authorized under this protocol.",
      "Use the suspected-stroke pathway for any new focal neurologic deficit. Transport urgently for suspected severe anemia or splenic sequestration and for priapism lasting four hours or longer.",
      "Strongly recommend transport for acute chest symptoms, hypoxemia, neurologic deficit, fever, hypotension, poor perfusion, suspected severe anemia or sequestration, prolonged priapism, pregnancy concern, uncontrolled or atypical pain, or any opioid or ketamine administration.",
    ],
    medications: [],
    warnings: [
      "Do not allow a familiar pain presentation to obscure acute chest syndrome, stroke, sepsis, shock, severe anemia, splenic sequestration, or another emergency.",
      "Avoid excessive crystalloid; overhydration can worsen pulmonary complications.",
      "Opioid or ketamine analgesia requires continuous airway, respiratory, oxygenation, cardiac, and EtCO₂ monitoring as specified by the applicable pain protocol.",
      "Do not use stigmatizing language such as 'drug-seeking' in the clinical record. Document objective findings, reported pain, treatment, response, and safety concerns.",
    ],
    clinicalPearls: [
      "Acute chest syndrome may initially resemble pneumonia or an uncomplicated pain crisis and can progress rapidly.",
      "Pain behavior varies widely. A calm appearance does not reliably measure pain severity.",
      "A patient's prior effective treatment is clinically useful, but medication selection and dose must remain within the approved Claiborne protocol and formulary.",
      "Priapism lasting four hours or longer is an emergency because delay increases the risk of permanent dysfunction.",
    ],
    specialPopulations: [
      {
        title: "Pediatric patients",
        items: [
          "For Claiborne clinical protocols, pediatric medication dosing applies to patients younger than 16 years. Use actual or length-based weight.",
          "Children may deteriorate rapidly from infection, acute chest syndrome, aplastic crisis, or splenic sequestration. Fever 38.5°C / 101.3°F or higher requires prompt emergency evaluation.",
        ],
      },
      {
        title: "Pregnancy",
        items: [
          "Use left lateral positioning when appropriate, monitor closely for hypoxemia and shock, and coordinate obstetric-capable destination and early notification.",
        ],
      },
    ],
    actionLinks: [
      {
        label: "Open UP-11 Adult Pain Control",
        description: "Use the approved adult analgesia pathway for patients 16 years or older.",
        href: "/protocols/up/up-11",
        kind: "protocol",
      },
    ],
    references: [
      "American Society of Hematology — Sickle Cell Disease: Management of Acute Complications pocket guide.",
      "American Society of Hematology 2020 Guidelines for Sickle Cell Disease: Management of Acute and Chronic Pain; guideline reviewed in 2023.",
      "National Heart, Lung, and Blood Institute — Sickle Cell Disease symptoms and emergency complications.",
      "Tennessee EMS Protocol Guidelines, September 2025 edition.",
      "Claiborne EMS UP-11 Pain Control — Adult and approved pediatric medication formulary.",
    ],
    sourcePdf: "/protocols/claiborne/up-20-sickle-cell-crisis-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Clinically reviewed and approved by the medical director; agency implementation approval is required before clinical release.",
      "This beta application remains a reference tool until formal Claiborne County EMS adoption and release.",
    ],
  },
  {
    id: "up-21",
    title: "Family Violence / Abuse",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Use this protocol for suspected intimate-partner or family violence, child abuse or neglect, elderly or vulnerable-adult abuse or exploitation, caregiver abuse, or human trafficking.",
      "Immediate patient care and scene safety come first. Provide private, trauma-informed, nonjudgmental care and use the appropriate trauma, medical, pediatric, behavioral, obstetric, or sexual-assault protocol concurrently.",
      "EMS recognizes, treats, protects, documents, and reports. EMS does not investigate, confront a suspected offender, or attempt to prove that abuse occurred.",
    ],
    flow: [
      {
        title: "Scene Safe?",
        text: "Immediate threat • weapons • escalating behavior • request law enforcement or additional resources",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Treat Immediate Threats",
        text: "XABCDE • hemorrhage • airway • shock • pain • strangulation • age-appropriate complaint protocol",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Create Privacy When Safe",
        text: "Separate patient from others • qualified interpreter • never use suspected aggressor or child as interpreter",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Patient Younger Than 18?",
        text: "Reasonable suspicion: immediately report to DCS • hospital or law-enforcement notice is not a substitute",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Elderly / Vulnerable Adult?",
        text: "Immediately report abuse, neglect, or exploitation to APS • suspected sexual offense: APS + local law enforcement",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Competent Adult Preference",
        text: "No automatic police report over objection unless statutory exception applies",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Preserve + Document",
        text: "Exact words • objective findings • who was present • scene conditions • evidence handled • report details",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Safe Disposition",
        text: "Private handoff • required reports • do not leave child or vulnerable adult in an unsafe plan",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "All providers share responsibility for recognition, immediate safety, compassionate care, objective documentation, and required reporting.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Treat immediate life threats and request law enforcement or additional resources when danger is present.",
              "When safe, speak with the patient privately. Use calm, simple, nonjudgmental, non-leading questions and avoid repeated questioning.",
              "Do not use the suspected aggressor or a child as interpreter. Request a qualified interpreter when needed.",
              "Preserve potential evidence, document objective findings and the patient's exact statements, and ensure the required reporting pathway is completed.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Perform all EMT actions. Provide authorized vascular access, fluid, medication, and monitoring care for associated illness or injury.",
              "Reassess for occult injury, shock, overdose, strangulation, pregnancy-related concerns, and medical causes of altered behavior.",
              "Do not delay transport or a required report to obtain a detailed history or complete documentation on scene.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior care. Lead assessment for serious occult injury, strangulation, head injury, cardiac or neurologic complications, pregnancy emergency, overdose, and need for specialty destination.",
              "Contact Medical Control for questionable capacity, high-risk refusal, conflict between patient safety and caregiver or custodial demands, or an unsafe proposed disposition.",
              "Provide a private receiving-facility handoff and document the agency contacted, recipient, time, report or reference number, and any safety plan.",
            ],
          },
        ],
      },
      {
        title: "Tennessee Reporting Pathways",
        summary: "Reporting duties depend on patient age, vulnerability, suspected offense, injury, capacity, and transport disposition.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Child younger than 18: when reasonable suspicion exists, immediately report suspected abuse, neglect, exploitation, or child sexual abuse to Tennessee DCS at 1-877-237-0004. Ensure the report is made; hospital or law-enforcement notification alone does not replace the duty.",
              "Elderly or vulnerable adult: immediately report suspected abuse, neglect, or exploitation to Tennessee APS at 1-888-277-8366.",
              "Suspected rape, aggravated rape, sexual battery, or aggravated sexual battery of an elderly or vulnerable adult: report to both APS and local law enforcement.",
              "Competent adult intimate-partner violence: do not automatically release identifying information to law enforcement over the patient's objection unless a statutory exception applies.",
              "Life-threatening injury, strangulation, or injury involving a knife, firearm, or other deadly weapon follows the mandatory injury-reporting pathway.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Support immediate reporting and continue patient care. Do not assume another responder or the receiving hospital has completed the clinician's duty unless confirmation is obtained and documented.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Resolve uncertainty through the agency safeguarding chain, Medical Control, and law-enforcement or protective-service consultation without delaying an immediately required report.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Patient disclosure of violence, abuse, neglect, exploitation, coercive control, trafficking, or fear of a household member, caregiver, partner, or other person.",
      "Injury pattern, history, behavior, living condition, caregiver interaction, or scene finding that creates reasonable suspicion for abuse, neglect, exploitation, or trafficking.",
      "Any child, elderly adult, or vulnerable adult for whom a mandatory safeguarding report may be required.",
    ],
    contraindications: [
      "Do not confront or accuse the suspected offender, conduct an independent investigation, or delay emergency treatment to collect evidence.",
      "Do not promise secrecy when a mandatory report may be required.",
    ],
    assessment: [
      {
        title: "Safety and immediate medical assessment",
        items: [
          "Identify immediate threats, weapons, escalating behavior, unsafe persons, children or dependents at risk, and the need for law enforcement or additional resources.",
          "Perform XABCDE and assess for hemorrhage, head injury, strangulation, chest or abdominal injury, fracture, pregnancy complications, overdose, intoxication, neglect, dehydration, hypothermia, and psychiatric emergency.",
          "When safe, separate the patient from household members, caregivers, or a suspected aggressor and ask whether the patient feels safe returning to the current environment.",
        ],
      },
      {
        title: "Trauma-informed inquiry",
        items: [
          "Explain that questions are asked because violence and abuse affect health and safety.",
          "Use broad, non-leading prompts such as: 'Tell me what happened,' 'Has anyone hurt or threatened you?' and 'Do you feel safe where you live?'",
          "Do not pressure a patient to disclose, repeat a detailed account, identify an offender, or make an immediate law-enforcement decision unless a mandatory report applies.",
          "Use the patient's own words in quotation marks when possible and distinguish statements from EMS observations.",
        ],
      },
      {
        title: "Possible strangulation",
        items: [
          "Assess voice change, dysphagia, dyspnea, neck pain or tenderness, petechiae, loss of consciousness, incontinence, seizure, confusion, focal neurologic symptoms, and memory gaps.",
          "Visible neck injury is not required for serious airway or vascular injury. Strongly recommend emergency-department evaluation even when initial findings are minimal.",
          "Treat strangulation as a high-risk mechanism and follow the mandatory injury-reporting pathway.",
        ],
      },
    ],
    treatmentSteps: [
      "Ensure scene safety, request law enforcement or additional resources when danger is present, and treat immediate life threats without delay.",
      "Create privacy when safe, use a qualified interpreter, and use trauma-informed, non-leading questions only to the extent needed for medical care, safety, and reporting.",
      "Treat associated illness or injury under the appropriate Claiborne protocol and preserve evidence when doing so does not compromise care.",
      "For reasonable suspicion involving a patient younger than 18, immediately report to DCS at 1-877-237-0004 and document the report.",
      "For suspected abuse, neglect, or exploitation of an elderly or vulnerable adult, immediately report to APS at 1-888-277-8366. For a suspected sexual offense against an elderly or vulnerable adult, also notify local law enforcement.",
      "For a competent adult experiencing intimate-partner violence, respect the patient's decision regarding police involvement unless a statutory injury or other mandatory-reporting exception applies.",
      "Strongly recommend emergency-department transport after strangulation, significant injury, altered mental status, pregnancy concern, overdose, suicidal risk, or an unsafe disposition.",
      "A competent adult may refuse transport when capacity is intact, but refusal does not cancel a mandatory report. Do not leave a child or vulnerable adult solely under an unsafe caregiver refusal; request law enforcement, DCS or APS, Medical Control, and the agency safeguarding chain.",
      "Provide a private handoff and document objective findings, exact statements, consent, capacity, evidence handling, safety concerns, reporting decisions, notifications, recipient, time, and reference number.",
    ],
    medications: [],
    warnings: [
      "Patient safety and emergency medical care take priority over evidence preservation.",
      "A patient's refusal to disclose details or involve law enforcement does not imply that abuse did not occur.",
      "Do not use a suspected offender, coercive caregiver, or minor child as interpreter.",
      "Age alone does not remove an adult patient's autonomy. Apply the statutory elderly or vulnerable-adult criteria and assess capacity individually.",
      "Do not leave a child or vulnerable adult in an unsafe environment solely because a caregiver refuses transport or minimizes the concern.",
    ],
    clinicalPearls: [
      "EMS needs reasonable suspicion—not proof—to initiate a mandatory child or vulnerable-adult report.",
      "Abuse may coexist with medical illness, disability, cognitive impairment, substance use, pregnancy, or financial dependence.",
      "Objective documentation and the patient's exact words are more useful than conclusory labels.",
      "Strangulation can produce delayed airway, vascular, and neurologic complications despite few or no visible findings.",
    ],
    specialPopulations: [
      {
        title: "Children and adolescents",
        items: [
          "The mandatory child-reporting threshold is younger than 18 years, even though Claiborne pediatric medication dosing generally applies to patients younger than 16 years.",
          "Use developmentally appropriate, non-leading questions. Do not repeatedly interview the child or ask the child to confront the suspected offender.",
        ],
      },
      {
        title: "Elderly and vulnerable adults",
        items: [
          "Assess decision-making capacity individually. Age, disability, or dependence does not automatically remove the right to participate in care decisions.",
          "Report suspected abuse, neglect, or exploitation to APS and use both APS and local law enforcement for suspected qualifying sexual offenses.",
        ],
      },
    ],
    actionLinks: [
      {
        label: "Call Tennessee DCS",
        description: "Child Abuse Hotline: 1-877-237-0004",
        href: "tel:+18772370004",
        kind: "call",
      },
      {
        label: "Call Tennessee APS",
        description: "Adult Protective Services: 1-888-277-8366",
        href: "tel:+18882778366",
        kind: "call",
      },
    ],
    references: [
      "Tennessee Code Annotated §§ 37-1-403 and 37-1-605 — child abuse and child sexual abuse reporting.",
      "Tennessee Department of Children's Services — Child Abuse Hotline and mandated-reporter guidance.",
      "Tennessee Code Annotated § 71-6-103 — Adult Protection Act reporting.",
      "Tennessee Code Annotated § 39-15-509 — reporting abuse or sexual offenses involving elderly or vulnerable adults.",
      "Tennessee Code Annotated § 38-1-101 — reporting of certain injuries and first-responder duties.",
      "Tennessee Department of Human Services — Adult Protective Services.",
      "Claiborne County EMS safeguarding, reporting, evidence-preservation, law-enforcement, destination, and refusal policies.",
    ],
    sourcePdf: "/protocols/claiborne/up-21-family-violence-abuse-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Clinically reviewed and approved by the medical director; agency legal and administrative approval are required before clinical release.",
      "Final local escalation contacts, documentation workflow, evidence procedures, and destination resources must be maintained in the Claiborne County safeguarding policy.",
      "This beta application remains a reference tool until formal Claiborne County EMS adoption and release.",
    ],
  },
  {
    id: "up-22",
    title: "Sexual Assault",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Provide immediate medical care, safety, privacy, patient control, and trauma-informed support after a suspected or disclosed sexual assault.",
      "A competent adult may decline any assessment or treatment step and, unless a mandatory exception applies, may object to release of identifying information to law enforcement.",
      "Use the least intrusive assessment needed for emergency care. EMS does not perform a genital or internal examination, collect forensic swabs, or attempt to determine whether an assault occurred.",
    ],
    flow: [
      {
        title: "Scene Safe + Private?",
        text: "Separate from suspected assailant • request law enforcement for immediate danger • qualified interpreter",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Treat Immediate Threats",
        text: "XABCDE • hemorrhage • head injury • strangulation • intoxication/drugging • pregnancy • suicidal risk",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Consent for Each Step",
        text: "Explain before touching • obtain permission • patient may pause or decline any nonemergent step",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Patient Younger Than 18?",
        text: "Immediately report reasonable suspicion to DCS",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Elderly / Vulnerable Adult?",
        text: "Report suspected sexual offense to APS and local law enforcement",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Competent Adult + Mandatory Exception?",
        text: "Life-threatening injury • strangulation • knife, firearm, or other deadly weapon",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Preserve Evidence Without Delaying Care",
        text: "Minimal handling • separate paper bags • no genital/internal exam or forensic swabs",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Appropriate SANE / Forensic Destination",
        text: "Medical stability first • private handoff • document consent, reports, evidence, and patient preference",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "Protect safety, consent, privacy, evidence, and access to appropriate medical and forensic care.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Treat immediate threats and obtain only the history needed for medical care, safety, destination, and mandatory reporting.",
              "Explain each action before touching the patient, obtain consent throughout care, and allow the patient to pause or decline nonemergent assessment or treatment.",
              "Do not perform a genital or internal examination, collect forensic swabs, or conduct a detailed forensic interview.",
              "Preserve clothing or other potential evidence when feasible and transport to an appropriate medical and forensic-capable facility.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Perform all EMT actions. Provide authorized vascular access, fluid, analgesia, antiemetic, and monitoring care for associated illness or injury.",
              "Do not delay transport or compromise potential evidence for nonessential procedures.",
              "Continue consent checks and explain that medical treatment is available regardless of whether the patient chooses immediate law-enforcement involvement.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior care. Assess and treat serious injury, strangulation, airway or respiratory compromise, shock, head injury, overdose or drug-facilitated assault, pregnancy emergency, and suicidal risk.",
              "Select a medically appropriate SANE or forensic-capable destination when available and notify the receiving emergency department privately.",
              "Contact Medical Control for significant injury, questionable capacity, high-risk refusal, destination uncertainty, or conflict involving consent or mandatory reporting.",
            ],
          },
        ],
      },
      {
        title: "Tennessee Reporting Pathways",
        summary: "A competent adult's law-enforcement preference is respected unless a mandatory child, vulnerable-adult, or injury-reporting exception applies.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Patient younger than 18: immediately report reasonable suspicion of sexual abuse to Tennessee DCS at 1-877-237-0004.",
              "Elderly or vulnerable adult: report the suspected sexual offense to both Tennessee APS at 1-888-277-8366 and local law enforcement.",
              "Competent adult: do not release identifying information to law enforcement over the patient's objection unless a statutory exception applies, including life-threatening injury, strangulation, or injury involving a knife, firearm, or other deadly weapon.",
              "When transporting, privately notify the receiving physician or emergency department of the suspected cause of injury. For nontransport, follow the Tennessee first-responder requirement to report the result through the 911 center and document the notification.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Support immediate required reports while continuing patient care and preserving privacy from bystanders, family, and nonessential personnel.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Resolve uncertainty through the agency safeguarding chain, Medical Control, and protective-service or law-enforcement consultation without delaying an immediately required report.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Patient disclosure of sexual assault or concern that sexual contact occurred without consent.",
      "Concern for sexual assault based on injury, altered consciousness, drug-facilitated assault, caregiver or witness information, or scene findings.",
      "Request for emergency medical evaluation after a suspected sexual assault, regardless of whether the patient wishes to involve law enforcement.",
    ],
    contraindications: [
      "Do not perform a genital or internal examination, collect forensic swabs, photograph intimate areas outside approved agency policy, or attempt to determine whether an assault occurred.",
      "Do not condition medical care or transport on the patient's willingness to speak with law enforcement or undergo a forensic examination.",
    ],
    assessment: [
      {
        title: "Immediate medical and safety assessment",
        items: [
          "Assess scene safety, ongoing threat, need for law enforcement, airway, breathing, circulation, hemorrhage, head or facial injury, strangulation, chest or abdominal trauma, intoxication, overdose, and altered mental status.",
          "Assess for pregnancy-related emergency, suicidal thoughts, severe anxiety or dissociation, and the need for a support person or advocate chosen by the patient when safe and available.",
          "Consider drug-facilitated assault when there is unexpected sedation, memory loss, unexplained intoxication, or concern for covert drug administration. Provide time-sensitive receiving-facility notification.",
        ],
      },
      {
        title: "Consent and focused history",
        items: [
          "Ask only what is necessary to guide emergency care, evidence-preservation advice, destination, and mandatory reporting.",
          "Explain each examination or procedure and obtain consent before proceeding. The patient may decline any nonemergent portion of care.",
          "Use the patient's exact words when documenting statements. Avoid judgmental language, conclusions, and repeated requests for a detailed account.",
        ],
      },
      {
        title: "Possible strangulation",
        items: [
          "Assess voice change, dysphagia, dyspnea, neck pain or tenderness, petechiae, loss of consciousness, incontinence, seizure, confusion, focal neurologic symptoms, and memory gaps.",
          "Visible injury is not required for serious airway or vascular injury. Strongly recommend emergency-department evaluation and follow the mandatory injury-reporting pathway.",
        ],
      },
    ],
    treatmentSteps: [
      "Ensure scene safety and treat immediate airway, breathing, circulation, hemorrhage, shock, head injury, strangulation, overdose, pregnancy emergency, or suicidal risk without delay.",
      "Create privacy when safe, use a qualified interpreter, explain every action before touching the patient, and obtain consent throughout care.",
      "Do not perform a genital or internal examination, collect forensic swabs, or obtain a detailed forensic history.",
      "Preserve possible evidence without delaying care. When practical, advise the patient not to wash, change clothing, eat, drink, urinate, or brush teeth, but never withhold comfort or necessary treatment.",
      "If clothing is removed, minimize handling and place each item separately in a clean paper bag; do not use plastic for damp evidence. Document every item handled and transfer it according to agency evidence policy.",
      "Complete the required DCS report for a patient younger than 18 and both APS and local law-enforcement reports for a suspected sexual offense involving an elderly or vulnerable adult.",
      "For a competent adult, respect the patient's choice about law-enforcement involvement unless a mandatory reporting exception applies. Explain that medical and forensic evaluation may still be available without an immediate police report.",
      "Transport to a medically appropriate SANE or forensic-capable facility when available. Medical stability takes priority, and the final locally approved facility list remains part of the destination plan.",
      "When transporting, privately notify receiving staff of the suspected cause. For nontransport, complete the required 911-center notification and document capacity, options, warnings, reports, and the patient's decision.",
      "Treat pain, nausea, shock, and other medical problems under the applicable Claiborne protocol. Pregnancy prevention, STI prophylaxis, and HIV post-exposure prophylaxis are receiving-facility responsibilities.",
    ],
    medications: [],
    warnings: [
      "Medical care and patient safety take priority over evidence preservation.",
      "Do not promise confidentiality when a mandatory report applies. Explain what information must be shared and with whom.",
      "Do not pressure a competent adult to involve law enforcement, undergo a forensic examination, or accept any nonemergent procedure.",
      "Do not allow the suspected assailant, coercive companion, or a minor child to serve as interpreter.",
      "A normal external examination does not exclude assault, internal injury, strangulation injury, pregnancy risk, or infection risk.",
    ],
    clinicalPearls: [
      "Trauma-informed care returns control to the patient through privacy, explanation, choice, consent, and avoidance of unnecessary repetition.",
      "An adult may be eligible for a medical-forensic examination and Tennessee hold-kit pathway without making an immediate police report. Do not promise exact examiner availability before confirming with the receiving facility.",
      "Potential DNA evidence may be affected by washing or clothing changes, but prior washing, eating, drinking, urination, or time elapsed does not eliminate the value of medical or forensic evaluation.",
      "Drug-facilitated assault toxicology is time-sensitive; early receiving-facility notification is important.",
    ],
    specialPopulations: [
      {
        title: "Children and adolescents",
        items: [
          "Reasonable suspicion involving a patient younger than 18 requires immediate DCS reporting. Use developmentally appropriate, non-leading questions and avoid repeated interviewing.",
          "Use pediatric clinical dosing for patients younger than 16 years and the appropriate adult clinical pathway for patients 16 or 17 years old while maintaining mandatory child-reporting requirements through age 17.",
        ],
      },
      {
        title: "Elderly and vulnerable adults",
        items: [
          "Report a suspected sexual offense to both APS and local law enforcement. Continue to involve the patient in decisions to the maximum extent supported by capacity.",
        ],
      },
    ],
    actionLinks: [
      {
        label: "Call Tennessee DCS",
        description: "Child Abuse Hotline: 1-877-237-0004",
        href: "tel:+18772370004",
        kind: "call",
      },
      {
        label: "Call Tennessee APS",
        description: "Adult Protective Services: 1-888-277-8366",
        href: "tel:+18882778366",
        kind: "call",
      },
    ],
    references: [
      "Tennessee Code Annotated §§ 37-1-403 and 37-1-605 — child abuse and child sexual abuse reporting.",
      "Tennessee Code Annotated § 71-6-103 — Adult Protection Act reporting.",
      "Tennessee Code Annotated § 39-15-509 — reporting sexual offenses involving elderly or vulnerable adults.",
      "Tennessee Code Annotated § 38-1-101 — reporting of certain injuries and first-responder duties.",
      "Tennessee Office of Criminal Justice Programs — Best Practice Guidelines for Sexual Assault Response.",
      "Tennessee Bureau of Investigation — Sexual Assault Kit and Hold Kit guidance.",
      "Claiborne County EMS safeguarding, reporting, evidence-preservation, law-enforcement, destination, and refusal policies.",
    ],
    sourcePdf: "/protocols/claiborne/up-22-sexual-assault-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "August 2026",
    lastVerifiedDate: "August 11, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Clinically reviewed and approved by the medical director; agency legal and administrative approval are required before clinical release.",
      "The locally approved SANE or forensic-capable destination list, escalation contacts, evidence workflow, and patient-advocacy resources must be maintained in Claiborne County policy.",
      "This beta application remains a reference tool until formal Claiborne County EMS adoption and release.",
    ],
  },
];
