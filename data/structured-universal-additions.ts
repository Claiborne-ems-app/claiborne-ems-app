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
];
