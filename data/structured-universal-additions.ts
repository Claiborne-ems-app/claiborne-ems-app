import type { StructuredProtocolContent } from "../lib/protocols/structured-content";

export const structuredUniversalAdditions: StructuredProtocolContent[] = [
  {
    id: "up-21",
    title: "Family Violence / Abuse",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Use this protocol when domestic or intimate-partner violence, child abuse or neglect, abuse or exploitation of an older or vulnerable adult, caregiver abuse, or human trafficking is suspected.",
      "Immediate patient care and scene safety come first. Use a trauma, medical, pediatric, behavioral, obstetric, or sexual-assault pathway at the same time when indicated.",
      "Provide trauma-informed, nonjudgmental care; seek privacy when safe; preserve evidence; document objectively; and complete all required agency and statutory reports.",
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
        text: "XABCDE • hemorrhage • airway • shock • pain • age-appropriate complaint protocol",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Create Privacy When Safe",
        text: "Separate patient from household members • use a qualified interpreter • do not use a suspected aggressor as interpreter",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Concern for Violence / Abuse?",
        text: "Disclosure • fear • inconsistent history • patterned injury • neglect • coercive control • unsafe environment",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Immediate Danger or Vulnerable Patient?",
        text: "Protect patient • request law enforcement • transport when indicated • initiate required report",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Preserve + Document",
        text: "Patient's exact words • objective findings • who was present • scene conditions • evidence handled",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Handoff + Reporting",
        text: "Private receiving-facility report • complete agency/statutory reporting • document recipient, time, and reference number",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "All providers share responsibility for recognition, immediate safety, compassionate care, documentation, and reporting.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Treat immediate life threats and request law enforcement or additional resources when danger is present.",
              "When safe, speak with the patient privately, use simple nonjudgmental questions, and avoid leading or repeated questioning.",
              "Preserve clothing and other potential evidence, document objective findings and exact statements, and follow the required reporting pathway.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Perform all EMT actions plus authorized vascular access, fluid, medication, and monitoring care for associated illness or injury.",
              "Help obtain separate histories and reassess for occult injury, shock, overdose, strangulation, pregnancy-related risk, or neglect-related illness.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior actions; lead the medical, safety, capacity, transport, destination, and resource plan.",
              "Contact Medical Control for high-risk refusal, uncertain capacity, serious occult injury, or conflict between the patient, caregiver, guardian, or authorities.",
              "Ensure the required report is made through the approved pathway and that the receiving team receives a private safeguarding handoff.",
            ],
          },
        ],
      },
    ],
    indications: [
      "A patient discloses violence, abuse, neglect, exploitation, coercion, or fear of a household member, caregiver, partner, or other person.",
      "History, injury pattern, behavior, delay in seeking care, caregiver interaction, or scene conditions raise concern for abuse or neglect.",
      "A child, older adult, dependent adult, cognitively impaired patient, or other vulnerable person may be unsafe or unable to protect their own interests.",
      "Possible human trafficking, sexual exploitation, forced labor, or control of identification, money, medication, communication, or movement.",
    ],
    contraindications: [],
    assessment: [
      {
        title: "Scene and interaction concerns",
        items: [
          "Fear of a household member or caregiver; reluctance to answer; another person answering for the patient, monitoring the conversation, preventing privacy, refusing assessment or transport, or controlling the patient's movement.",
          "Conflicting accounts, a history inconsistent with the injury or developmental ability, an unexplained delay in seeking care, repeated calls or injuries, or concern focused on minor details while serious findings are minimized.",
          "Unsafe or unhealthy living conditions, lack of food or medications, poor hygiene, inappropriate clothing, untreated pressure injury, dehydration, malnutrition, or failure to obtain necessary medical care.",
          "Another person controls identification, money, phone, transportation, medications, or communication; the patient appears coached, fearful, indebted, or unable to state where they are staying.",
        ],
      },
      {
        title: "Physical findings",
        items: [
          "Injury to normally protected areas; patterned bruises, burns, or marks; bite marks; injuries in different stages of healing; unexplained fractures; genital injury; or repeated injury without a plausible mechanism.",
          "Possible strangulation findings: neck pain or tenderness, voice change, difficulty swallowing, dyspnea, petechiae, loss of consciousness, incontinence, seizure, confusion, focal neurologic symptoms, or memory gap. Visible injury may be absent.",
          "Perform an age-appropriate head-to-toe assessment while limiting unnecessary exposure and protecting dignity. Treat and transport based on the medical findings, not solely on whether abuse is confirmed.",
        ],
      },
      {
        title: "Private, trauma-informed questions",
        items: [
          "Ask when the patient is alone and it is safe: “Do you feel safe where you live?”",
          "Ask: “Has anyone hurt, threatened, controlled, or frightened you, or kept you from getting medical care?”",
          "Ask: “Has anyone touched you or made you do something you did not want to do?”",
          "Ask: “Is anyone taking your money, medications, food, identification, or other belongings without permission?”",
          "For children, use developmentally appropriate open-ended questions only as needed for immediate care and safety. Do not conduct a detailed or repetitive forensic interview.",
        ],
      },
    ],
    treatmentSteps: [
      "Address immediate medical and trauma needs first. Use the appropriate airway, shock, trauma, pediatric, obstetric, behavioral, or toxicology protocol concurrently.",
      "Do not confront the suspected aggressor. If the scene is unsafe or violence is escalating, withdraw to safety and request law enforcement and additional resources.",
      "When safe, separate the patient from household members or caregivers for assessment. Use a qualified interpreter; do not use a suspected aggressor or a child as interpreter.",
      "Support the patient without blame or judgment. Explain that help is available and that some disclosures require a report; do not promise secrecy or a specific outcome.",
      "Transport patients with injury, strangulation concern, altered mental status, unsafe disposition, need for forensic or specialty care, or other clinical indication. Choose the destination based on medical needs and local safeguarding resources.",
      "For suspected sexual assault, minimize unnecessary examination or handling, preserve clothing and other evidence, and use the sexual-assault protocol when available.",
      "For suspected child abuse or neglect or abuse, neglect, or exploitation of an older or vulnerable adult, personally ensure the required report is made through the agency-approved Tennessee reporting pathway. Hospital notification alone does not replace the reporter's responsibility.",
      "For an adult with decision-making capacity, respect informed choices unless a mandatory-reporting or immediate-safety requirement applies. Use Medical Control and law enforcement for high-risk refusal, questionable capacity, or an unsafe dependent patient.",
      "Give a private safeguarding handoff to the receiving clinician and document all notifications, reports, and disposition decisions.",
    ],
    medications: [],
    warnings: [
      "Do not delay emergency treatment or transport while attempting to prove abuse or obtain a complete disclosure.",
      "Do not promise confidentiality. Explain reporting obligations in plain language when doing so will not increase danger.",
      "Do not ask leading, accusatory, or repetitive questions; do not conduct a forensic interview.",
      "Do not use children, household members, or a suspected aggressor as interpreter for a private safety assessment.",
      "Do not leave a child or vulnerable adult in an unsafe setting solely because a caregiver refuses transport. Request law enforcement, contact Medical Control, and initiate the required report.",
      "Strangulation can cause delayed airway or neurologic deterioration despite minimal or absent external injury.",
    ],
    clinicalPearls: [
      "A calm, validating response improves safety and the reliability of the history: listen, believe the concern, avoid blame, and explain each step.",
      "Document observations rather than conclusions. Record the patient's exact words in quotation marks and identify who was present for each statement.",
      "When accounts conflict, document each account and its source without deciding which person is truthful.",
      "Photographs, body maps, and collection or transfer of evidence must follow agency policy; document every item handled and to whom it was released.",
      "The goal of the field encounter is medical care, immediate safety, accurate documentation, and appropriate reporting—not determining guilt.",
    ],
    specialPopulations: [
      {
        title: "Children",
        items: [
          "Everyone in Tennessee is a mandated reporter of suspected child abuse or neglect. Follow the current agency reporting procedure promptly.",
          "Use the child's own words and developmentally appropriate open-ended questions. Avoid repeated questioning after the information needed for immediate care and safety is obtained.",
          "Consider occult head, abdominal, skeletal, and sexual injury when the history or examination is concerning.",
        ],
      },
      {
        title: "Older and vulnerable adults",
        items: [
          "Consider physical abuse, neglect, self-neglect, financial exploitation, medication withholding, caregiver burnout, and unsafe living conditions.",
          "Assess decision-making capacity, baseline cognition, dependency for activities of daily living, access to food and medications, and whether the caregiver controls communication or finances.",
          "Follow the current Tennessee Adult Protective Services and agency reporting pathway when abuse, neglect, or exploitation is suspected.",
        ],
      },
      {
        title: "Intimate-partner violence and strangulation",
        items: [
          "Assess privately when safe and ask directly about safety, threats, weapons, escalating violence, stalking, forced sex, and strangulation.",
          "Strangulation is a high-risk mechanism. Hoarseness, dysphagia, dyspnea, neurologic symptoms, loss of consciousness, incontinence, or neck findings warrant urgent evaluation.",
          "Avoid actions that increase danger, including confronting the suspected aggressor or leaving written resources where they may be discovered, unless the patient agrees and it is safe.",
        ],
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — SOP 306 Family Violence",
      "Tennessee Department of Children's Services — Report Child Abuse and Mandated Reporter guidance",
      "Tennessee Department of Human Services — Adult Protective Services",
      "Claiborne County EMS safeguarding, reporting, documentation, evidence-preservation, law-enforcement, and destination policies",
    ],
    sourcePdf: "/protocols/claiborne/up-21-family-violence-abuse-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "July 2026",
    lastVerifiedDate: "July 30, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director and agency legal/administrative approval are required before clinical release.",
      "Final reporting contacts, escalation chain, documentation requirements, evidence procedures, and destination resources must be completed in the Claiborne County safeguarding policy.",
      "Current Tennessee law, provider scope, and Claiborne County policy control if any conflict exists.",
    ],
  },
  {
    id: "up-22",
    title: "Sexual Assault",
    categoryId: "up",
    category: "Universal Patient Care",
    overview: [
      "Provide immediate medical care, safety, privacy, patient control, and trauma-informed support after a suspected or disclosed sexual assault.",
      "For a competent adult who is not a vulnerable adult, sexual assault is not automatically reported to law enforcement when the patient objects to release of identifying information. Mandatory child, vulnerable-adult, and qualifying-injury reporting requirements still apply.",
      "Use the least intrusive assessment needed for emergency care, preserve potential evidence without delaying treatment, and transport to an appropriate facility for medical and forensic options.",
    ],
    flow: [
      {
        title: "Scene Safe + Private?",
        text: "Separate from suspected assailant • request law enforcement for danger • use a qualified interpreter",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "start",
      },
      {
        title: "Treat Immediate Threats",
        text: "XABCDE • hemorrhage • airway • shock • pain • pregnancy or strangulation risk",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "urgent",
      },
      {
        title: "Minor or Vulnerable Adult?",
        text: "Yes: protect patient and initiate the required DCS or APS reporting pathway",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Mandatory Injury Report?",
        text: "Life-threatening injury • strangulation • knife, firearm, or other deadly weapon",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "decision",
      },
      {
        title: "Competent Adult Preference",
        text: "Explain options • respect choice about law enforcement unless a mandatory exception applies",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Preserve + Transport",
        text: "Minimal handling • preserve clothing when possible • appropriate medical/forensic destination",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Private Handoff + Document",
        text: "Exact words • objective findings • consent and reporting decisions • evidence handled • notifications",
        levels: ["EMT", "AEMT", "Paramedic"],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "All providers protect safety, consent, privacy, evidence, and access to appropriate medical and forensic care.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Treat immediate threats, obtain only the history needed for care and safety, and avoid a detailed forensic interview or unnecessary genital examination.",
              "Explain actions before touching the patient, obtain consent throughout care, preserve clothing or other potential evidence when feasible, and transport to an appropriate facility.",
              "If transporting, privately notify receiving ED staff of the suspected cause of injury. For nontransport, follow the current Tennessee first-responder and agency reporting pathway.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Perform all EMT actions plus authorized vascular access, fluid, analgesia, antiemetic, and monitoring care for associated illness or injury.",
              "Reassess for occult shock, strangulation, intoxication, pregnancy-related concern, and injuries requiring a mandatory injury report.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior actions; lead capacity assessment, destination selection, Medical Control consultation, and the reporting decision pathway.",
              "Address high-risk refusal, questionable capacity, serious injury, unsafe disposition, or disagreement involving a parent, guardian, caregiver, or authorities.",
              "Ensure the receiving clinician receives a private handoff that distinguishes patient-authorized law-enforcement involvement from mandatory protective-services or injury reporting.",
            ],
          },
        ],
      },
    ],
    indications: [
      "A patient reports or is suspected of experiencing nonconsensual sexual contact, penetration, coercion, drug-facilitated assault, forced sexual activity, or sexual exploitation.",
      "A child or vulnerable adult may have experienced sexual abuse, including concerning statements, behavior, injury, caregiver interaction, or scene findings.",
      "A patient requests medical evaluation, evidence-preservation guidance, forensic examination, advocacy, or transport after a sexual assault.",
    ],
    contraindications: [],
    assessment: [
      {
        title: "Immediate medical and safety assessment",
        items: [
          "Assess scene safety, immediate danger, need for law enforcement, suicidal thoughts, significant bleeding, head injury, strangulation, intoxication, overdose, pregnancy-related emergency, and other time-critical illness or injury.",
          "When safe, separate the patient from the suspected assailant, controlling person, or unnecessary bystanders. Use a qualified interpreter and ask whom the patient wants present.",
          "Determine age, decision-making capacity, and whether the patient meets the current definition of a vulnerable adult. These factors change reporting and consent requirements.",
        ],
      },
      {
        title: "Trauma-informed history",
        items: [
          "Ask only what is needed for immediate treatment, safety, destination, and evidence-preservation decisions. Useful questions include when the event occurred, areas of pain or injury, possible strangulation, bleeding, loss of consciousness, weapon use, possible drugging, pregnancy possibility, and whether the patient has bathed, changed clothes, eaten, drunk, urinated, or defecated.",
          "Use the patient's own language and exact words. Do not demand a chronological account, challenge inconsistencies, ask “why,” or repeat questions already answered unless clinically necessary.",
          "Explain that trauma can affect memory and that the patient does not need to decide in the field whether to make a police report in order to receive medical care.",
        ],
      },
      {
        title: "Focused examination",
        items: [
          "Perform only the exposure and examination necessary to identify and treat emergency conditions. Preserve dignity and obtain consent before each step.",
          "Do not perform a genital or internal examination solely to look for evidence. A negative or normal field examination does not exclude sexual assault or significant injury.",
          "Look for associated head, neck, thoracic, abdominal, pelvic, extremity, bite, burn, restraint, injection, and defensive injuries. Visible injury may be absent after strangulation or sexual assault.",
        ],
      },
    ],
    treatmentSteps: [
      "Address immediate life threats and medical needs first. Use the appropriate airway, shock, trauma, obstetric, behavioral, pediatric, or toxicology protocol concurrently.",
      "Provide privacy, calm reassurance, and control. Explain each action, ask permission before touching or exposing the patient, and allow the patient to decline any nonessential assessment or procedure.",
      "Do not confront the suspected assailant or attempt to investigate the crime. Request law enforcement when there is immediate danger, a mandatory report, or the patient requests assistance.",
      "Advise the patient that bathing, showering, changing clothes, eating, drinking, smoking, brushing teeth, urinating, defecating, or cleaning the scene may affect evidence, but never withhold medical care, comfort, food, drink, toileting, or necessary treatment.",
      "Avoid unnecessary handling of clothing or personal items. If clothing must be removed for care, handle as little as possible, keep separate items separate, use clean dry paper bags when available, and document transfer according to agency policy. Do not use plastic for damp biological evidence.",
      "Transport to an appropriate medical facility with sexual-assault forensic capability when available and consistent with the patient's medical needs and choices. Notify the destination privately and limit radio details to necessary clinical information.",
      "For a patient under 18, personally initiate the current Tennessee child-abuse reporting pathway. For suspected sexual abuse of a vulnerable adult, initiate the current Adult Protective Services pathway. Hospital notification alone does not replace a personally required protective-services report.",
      "For a competent adult age 18 or older who is not a vulnerable adult, do not make a blanket law-enforcement report of the sexual assault if the patient objects to release of identifying information.",
      "Report injuries as required when they are considered life-threatening or were inflicted by strangulation, a knife, firearm, or other deadly weapon. Explain the required report to the patient when safe; the injury report does not require the patient to speak with law enforcement.",
      "When transporting, privately notify the receiving physician or ED staff of the suspected cause of injury. If the patient is not transported, follow the current Tennessee requirement and agency procedure for reporting the result of the call to the 911 center.",
      "Document the patient's exact words, objective assessment, consent or refusal for each element of care, patient preference regarding law enforcement, reporting criteria considered, required reports and notifications, potential evidence handled, destination, and handoff.",
    ],
    medications: [],
    warnings: [
      "Do not describe every adult sexual assault as a mandatory law-enforcement report. Age, vulnerability, capacity, patient objection, and qualifying injuries determine the reporting pathway.",
      "Do not promise complete confidentiality. Explain child, vulnerable-adult, and mandatory injury-reporting limits in plain language.",
      "Do not conduct a forensic interview, pressure the patient to report, ask accusatory or repetitive questions, or require law-enforcement cooperation as a condition of care.",
      "Do not perform an unnecessary genital examination, collect swabs, or independently assemble a sexual-assault evidence kit in the field.",
      "Do not delay lifesaving treatment, necessary toileting, patient comfort, or transport solely to preserve evidence.",
      "Strangulation can produce delayed airway compromise, vascular injury, or neurologic deterioration despite minimal or absent external findings.",
    ],
    clinicalPearls: [
      "Use validating language: “I am sorry this happened,” “I believe you,” “This is not your fault,” and “You are in control of what happens next.”",
      "An adult may receive a medical forensic examination without immediately filing a police report. Tennessee permits a non-reporting sexual-assault kit to be retained as a hold kit under the receiving facility and law-enforcement process.",
      "Patient behavior after trauma varies widely. Calmness, emotional distress, fragmented memory, intoxication, delayed reporting, or reluctance to involve law enforcement does not determine whether an assault occurred.",
      "Medical stabilization and patient well-being take priority over evidence. Preserve what is reasonably possible without compromising care.",
      "Use private verbal handoff and objective documentation; avoid stigmatizing labels or unnecessary details over open radio channels.",
    ],
    specialPopulations: [
      {
        title: "Children and adolescents",
        items: [
          "Everyone in Tennessee is a mandated reporter of suspected child abuse, including sexual abuse. Initiate the approved reporting pathway promptly.",
          "Use developmentally appropriate open-ended questions only as needed for immediate medical care and safety. Avoid repeated questioning and preserve the child's exact words.",
          "Coordinate destination with pediatric and child-advocacy resources under local policy; do not allow evidence concerns to delay emergency care.",
        ],
      },
      {
        title: "Vulnerable adults",
        items: [
          "Sexual abuse of an adult unable to protect or care for themselves because of mental or physical dysfunction or advanced age requires the vulnerable-adult reporting pathway.",
          "Assess baseline cognition, capacity, dependency, caregiver control, communication barriers, and immediate safety without assuming that age or disability alone eliminates autonomy.",
        ],
      },
      {
        title: "Competent adults",
        items: [
          "Explain medical, forensic, advocacy, and law-enforcement options without coercion. The patient may accept medical care and forensic evidence collection while declining an immediate police report.",
          "Respect an objection to releasing identifying information unless mandatory child, vulnerable-adult, qualifying-injury, or immediate-safety requirements apply.",
        ],
      },
      {
        title: "Possible strangulation",
        items: [
          "Assess for voice change, dysphagia, dyspnea, neck pain or tenderness, petechiae, loss of consciousness, incontinence, seizure, confusion, focal neurologic symptoms, and memory gaps.",
          "Treat strangulation as a high-risk mechanism requiring urgent evaluation and a mandatory injury report under the current Tennessee injury-reporting statute.",
        ],
      },
    ],
    references: [
      "Tennessee Code Annotated § 38-1-101 — reporting of certain injuries and first-responder duties",
      "Tennessee Department of Children's Services — child-abuse and mandated-reporter guidance",
      "Tennessee Adult Protection Act and Department of Human Services — Adult Protective Services",
      "Tennessee Office of Criminal Justice Programs — Best Practice Guidelines for Sexual Assault Response",
      "Tennessee Bureau of Investigation — Sexual Assault Kit and Hold Kit guidance",
      "Claiborne County EMS safeguarding, reporting, evidence-preservation, law-enforcement, destination, and refusal policies",
    ],
    sourcePdf: "/protocols/claiborne/up-22-sexual-assault-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "July 2026",
    lastVerifiedDate: "July 30, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director and agency legal/administrative approval are required before clinical release.",
      "Final reporting contacts, forensic-capable destinations, advocacy resources, refusal process, evidence procedures, and documentation requirements must be completed in Claiborne County policy.",
      "Current Tennessee law, provider scope, patient privacy law, and Claiborne County policy control if any conflict exists.",
    ],
  },
];
