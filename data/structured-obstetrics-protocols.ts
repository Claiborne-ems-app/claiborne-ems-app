import type {
  ProviderLevel,
  ProtocolCareModule,
  ProtocolFlowNode,
  StructuredProtocolContent,
} from "../lib/protocols/structured-content";

const ALL_LEVELS: ProviderLevel[] = ["EMT", "AEMT", "Paramedic"];

type ObstetricProtocolInput = {
  id: string;
  title: string;
  sourcePdf: string;
  revisionDate: string;
  overview: string[];
  flow: ProtocolFlowNode[];
  emt: string[];
  aemt: string[];
  paramedic: string[];
  indications: string[];
  assessment?: { title: string; items: string[] }[];
  treatmentSteps?: string[];
  medications?: { name: string; dose: string; notes?: string[] }[];
  warnings?: string[];
  clinicalPearls?: string[];
  specialPopulations?: { title: string; items: string[] }[];
  actionLinks?: StructuredProtocolContent["actionLinks"];
  reviewStatus?: "Draft" | "Reviewed" | "Approved";
  reviewFlags?: string[];
  lastVerifiedDate?: string;
};

function providerActions(
  input: ObstetricProtocolInput
): ProtocolCareModule[] {
  return [
    {
      title: "Provider-Level Actions",
      summary:
        "Perform immediately indicated care at the highest authorized level present while protecting both maternal and neonatal physiology.",
      levels: [
        { level: "EMT", actions: input.emt },
        { level: "AEMT", actions: input.aemt },
        { level: "Paramedic", actions: input.paramedic },
      ],
    },
  ];
}

function obstetricProtocol(
  input: ObstetricProtocolInput
): StructuredProtocolContent {
  return {
    id: input.id,
    title: input.title,
    categoryId: "ao",
    category: "Adult Obstetrics",
    overview: input.overview,
    flow: input.flow,
    careModules: providerActions(input),
    indications: input.indications,
    contraindications: [],
    assessment: input.assessment ?? [],
    treatmentSteps: input.treatmentSteps ?? [],
    medications: input.medications ?? [],
    warnings: input.warnings ?? [],
    clinicalPearls: input.clinicalPearls ?? [],
    specialPopulations: input.specialPopulations ?? [],
    actionLinks: input.actionLinks,
    references: [
      "Claiborne County EMS approved protocol manual.",
      "Current Tennessee EMS scope of practice and Claiborne County standing orders control when provider scope differs from the imported source.",
    ],
    sourcePdf: input.sourcePdf,
    sourcePages: { start: 1, end: 2 },
    revisionDate: input.revisionDate,
    lastVerifiedDate: input.lastVerifiedDate ?? "2026-07-29",
    reviewStatus: input.reviewStatus ?? "Reviewed",
    reviewFlags: input.reviewFlags ?? [
      "Medical-director approval is required before clinical release.",
      "Verify medication dosing and invasive procedures against current Claiborne County standing orders.",
      "The original imported PDF remains available for source comparison.",
    ],
  };
}

export const structuredObstetricsProtocols: StructuredProtocolContent[] = [
  obstetricProtocol({
    id: "ao-01",
    title: "Childbirth / Labor",
    sourcePdf: "/protocols/claiborne/ao-01-childbirth-labor-protocol.pdf",
    revisionDate: "2025-09-01",
    overview: [
      "Determine whether transport is safe or delivery is imminent using gestational age, contraction pattern, urge to push, parity, prior labor duration, and perineal inspection.",
      "Prioritize maternal positioning, preparation for neonatal care, recognition of abnormal presentation, and immediate treatment of postpartum hemorrhage.",
    ],
    indications: [
      "Pregnant patient with contractions, rupture of membranes, crowning, urge to push, vaginal discharge or bleeding, or concern for imminent delivery.",
      "Patient who has delivered immediately before EMS arrival and requires maternal or neonatal care.",
    ],
    flow: [
      { title: "Labor / Delivery Concern", text: "Due date • gravida/para • contractions • membrane rupture • bleeding • fetal movement.", levels: ALL_LEVELS, tone: "start" },
      { title: "Maternal Emergency?", text: "Severe bleeding • hypertension/hypotension • seizure • severe pain • altered mental status.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Inspect Perineum", text: "No digital vaginal examination. Look for crowning, cord, breech, limb, or meconium.", levels: ALL_LEVELS, tone: "action" },
      { title: "Delivery Imminent?", text: "Crowning, urge to push, frequent contractions, advanced parity, or unsafe transport.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Normal or Complicated?", text: "Normal delivery • prolapsed cord • breech • shoulder dystocia • multiple gestation.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Mother + Newly Born Care", text: "Control bleeding, maintain warmth, record times/APGAR, and notify destination.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Place the mother left lateral when delivery is not imminent; document contraction frequency/duration and continuously reassess.",
      "For field delivery, support the head and body without pulling, check for a nuchal cord, dry and warm the infant, and move immediately to the Newly Born protocol.",
      "For prolapsed cord, elevate hips/knees to chest, relieve pressure from the presenting part with a gloved hand, cover exposed cord with moist saline dressing, and transport emergently.",
      "For breech presentation, support the presenting parts without pulling and create an airway space at the infant's nose if the head does not deliver.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access and protocol-directed treatment of maternal hypotension or hemorrhage without delaying delivery or transport.",
      "Prepare neonatal resuscitation equipment and obtain additional resources for prematurity or multiple gestation.",
    ],
    paramedic: [
      "Perform all prior care plus advanced management of maternal shock, seizure, airway compromise, and complicated delivery.",
      "After field delivery, administer tranexamic acid for postpartum hemorrhage with shock when indicated; oxytocin is not carried on the Claiborne formulary.",
    ],
    assessment: [
      {
        title: "Priority findings",
        items: [
          "Crowning or an uncontrollable urge to push.",
          "Gestation less than 36 weeks.",
          "Abnormal presentation, prolapsed cord, severe bleeding, seizure, or multiple gestation.",
          "History of rapid prior deliveries or very frequent contractions.",
        ],
      },
      {
        title: "Required documentation",
        items: [
          "Contraction onset, duration, and frequency; membrane rupture; delivery time; placenta delivery; maternal bleeding; and treatment.",
          "Infant APGAR at 1 and 5 minutes without interrupting resuscitation.",
        ],
      },
    ],
    treatmentSteps: [
      "Delay cord clamping for at least 60 seconds in a preterm infant under 37 weeks who does not require immediate resuscitation.",
      "Clamp the cord approximately 10 cm from the infant and place the second clamp approximately 5 cm farther away.",
      "After placental delivery, perform uterine massage for postpartum hemorrhage and continue maternal reassessment.",
    ],
    medications: [
      {
        name: "Tranexamic acid",
        dose: "1 g IV/IO over 10 minutes for postpartum hemorrhage with shock when within 3 hours of delivery.",
        notes: [
          "Use with AM-05 Hypotension/Shock and AO-03 OB/GYN Emergency.",
        ],
      },
    ],
    warnings: [
      "Do not perform a digital vaginal examination.",
      "Do not pull on the infant, umbilical cord, breech-presenting parts, or placenta.",
      "Uterine massage is performed only after delivery of the placenta.",
      "Large-volume or free vaginal bleeding is abnormal and requires urgent hemorrhage management.",
    ],
    specialPopulations: [{ title: "Postpartum hemorrhage", items: ["After placental delivery, perform uterine massage for excessive bleeding. For shock, use AM-05 and tranexamic acid 1 g IV/IO over 10 minutes when within 3 hours of delivery."] }],
    reviewStatus: "Approved",
    lastVerifiedDate: "2026-08-14",
    reviewFlags: ["Clinical delivery, maternal/newborn care, complication management, tranexamic acid use, provider permissions, and linked pathways approved by the Claiborne EMS medical director on August 14, 2026.", "Oxytocin was removed because it is not on the Claiborne formulary."],
    clinicalPearls: [
      "Transport is generally preferred, but crowning, urge to push, frequent contractions, parity, and prior rapid labor may make field delivery safer.",
      "Twins are commonly premature and at higher risk for hypothermia; request additional resources early.",
    ],
  }),

  obstetricProtocol({
    id: "ao-02",
    title: "Newly Born",
    sourcePdf: "/protocols/claiborne/ao-02-newly-born-protocol.pdf",
    revisionDate: "2025-09-01",
    overview: [
      "Most newly born infants require only warmth, drying, stimulation, and appropriate cord management.",
      "Effective positive-pressure ventilation is the most important intervention when respirations are inadequate or heart rate remains below 100/min.",
    ],
    indications: [
      "Infant in the immediate newborn period following field, home, or facility delivery.",
      "Newly born infant with apnea, gasping, respiratory distress, persistent central cyanosis, poor tone, or bradycardia.",
    ],
    flow: [
      { title: "Birth", text: "Term? • breathing/crying? • good muscle tone?", levels: ALL_LEVELS, tone: "start" },
      { title: "All Yes", text: "Warm, dry, stimulate, skin-to-skin, maintain temperature, and reassess.", levels: ALL_LEVELS, tone: "action" },
      { title: "Any No", text: "Warm, dry, stimulate, position airway, and suction only if needed.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Apnea / Gasping / HR <100?", text: "Begin BVM ventilation at 40–60/min and assess chest movement and heart-rate response.", levels: ALL_LEVELS, tone: "decision" },
      { title: "HR Remains <60?", text: "After effective ventilation, begin coordinated 3:1 compressions and escalate care.", levels: ALL_LEVELS, tone: "urgent" },
      { title: "Reassess + Transport", text: "Maintain warmth, right-hand SpO₂, cardiac monitoring, glucose, and early notification.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Warm, dry, and stimulate; position the airway and use bulb suction only when secretions obstruct breathing.",
      "If apnea/gasping or heart rate below 100 persists, provide BVM ventilation at 40–60 breaths/min and correct mask seal, airway position, and technique until chest movement is present.",
      "If heart rate remains below 60 after 30–60 seconds of effective ventilation, begin two-thumb encircling chest compressions coordinated at a 3:1 ratio.",
      "Apply pulse oximetry to the right hand, wrist, or upper arm and prevent hypothermia throughout care.",
    ],
    aemt: [
      "Perform all EMT care plus authorized supraglottic airway support, IV/IO access, epinephrine, fluid, and glucose treatment within current neonatal standing orders.",
      "Use cardiac monitoring to determine heart rate when available without interrupting ventilation or compressions.",
    ],
    paramedic: [
      "Perform all prior care plus advanced airway management when ventilation remains ineffective and protocol-directed neonatal resuscitation medications.",
      "Evaluate persistent failure to respond for hypovolemia, pneumothorax, hypoglycemia, congenital disease, infection, or maternal medication effect.",
    ],
    assessment: [
      {
        title: "Initial newborn assessment",
        items: [
          "Term gestation, spontaneous breathing or crying, and good muscle tone.",
          "Heart rate, respiratory effort, central color, temperature, and responsiveness.",
          "Gestational age, meconium, delivery complications, multiple gestation, congenital disease, and maternal medications or substance exposure.",
        ],
      },
      {
        title: "Expected preductal oxygen saturation",
        items: [
          "1 minute: 60–65%; 2 minutes: 65–70%; 3 minutes: 70–75%.",
          "4 minutes: 75–80%; 5 minutes: 80–85%; 10 minutes: 85–95%.",
          "These expected values apply to an infant not requiring active resuscitation.",
        ],
      },
    ],
    treatmentSteps: [
      "If a non-vigorous infant does not improve after warming, drying, and stimulation within 30 seconds, move quickly to positive-pressure ventilation.",
      "Assess adequate ventilation primarily by visible chest movement and a rising heart rate.",
      "Add oxygen when the infant is not responding with an increasing heart rate or adequate breathing.",
      "Do not interrupt resuscitation to obtain APGAR scores; document APGAR at 1 and 5 minutes.",
    ],
    medications: [
      {
        name: "Epinephrine 1:10,000",
        dose: "0.01 mg/kg IV/IO every 3–5 minutes as needed",
        notes: [
          "For heart rate below 60 despite effective ventilation and coordinated compressions.",
          "Confirm current Claiborne neonatal dosing and scope before clinical release.",
        ],
      },
      {
        name: "Normal saline",
        dose: "10 mL/kg IV/IO; may repeat once when not responding to epinephrine",
        notes: ["Consider suspected hypovolemia."],
      },
    ],
    warnings: [
      "Do not routinely suction the airway; suction only when needed for obstruction.",
      "Do not perform routine endotracheal suctioning for meconium; provide supportive ventilation.",
      "Naloxone is not recommended for neonatal respiratory depression from maternal narcotics; provide ventilatory support.",
      "Ventilation must be effective before chest compressions are started.",
    ],
    actionLinks: [{ label: "PM-02 Pediatric Diabetic / Hypoglycemia", description: "Open for newborn hypoglycemia management and the approved pediatric dextrose pathway.", href: "/protocols/pm/pm-02", kind: "protocol" }],
    clinicalPearls: [
      "A rising heart rate is the best indicator that newborn ventilation and resuscitation are effective.",
      "Skin-to-skin contact with the mother is the preferred warming method for a vigorous infant.",
      "Delay cord clamping for approximately 60 seconds unless immediate resuscitation is required.",
    ],
    specialPopulations: [
      {
        title: "Premature infant",
        items: [
          "Premature infants lose heat rapidly; use a cap, plastic wrap, thermal mattress, radiant heat, or other approved warming adjunct.",
          "Anticipate respiratory support, hypoglycemia, and the need for specialized neonatal destination care.",
        ],
      },
    ],
  }),

  obstetricProtocol({
    id: "ao-03",
    title: "OB-GYN Emergency",
    sourcePdf: "/protocols/claiborne/ao-03-ob-gyn-emergency-protocol.pdf",
    revisionDate: "2026-04-06",
    overview: [
      "Evaluate pregnancy-related and gynecologic emergencies including hemorrhage, ectopic pregnancy, miscarriage, preeclampsia, eclampsia, shock, and trauma.",
      "Use left lateral positioning, early hemorrhage recognition, seizure control, and rapid destination notification.",
    ],
    indications: [
      "Known or suspected pregnancy with abdominal pain, vaginal bleeding, hypertension, seizure, syncope, or shock.",
      "Postpartum hemorrhage or uncontrolled vaginal hemorrhage with signs of shock regardless of pregnancy status.",
      "Pregnant patient involved in trauma or motor-vehicle collision.",
    ],
    flow: [
      { title: "Pregnancy / GYN Emergency", text: "Pregnancy possibility • missed period • bleeding • abdominal pain • recent delivery.", levels: ALL_LEVELS, tone: "start" },
      { title: "Position + Assess", text: "Left lateral • ABCs • glucose • vitals • bleeding amount • neurologic findings.", levels: ALL_LEVELS, tone: "action" },
      { title: "Shock / Hemorrhage?", text: "Control external bleeding, establish access, resuscitate, and consider TXA pathway.", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Field Delivery?", text: "Use Childbirth/Labor; after delivery address uterine atony and postpartum bleeding.", levels: ALL_LEVELS, tone: "decision" },
      { title: "Seizure / Eclampsia?", text: "Protect airway; benzodiazepine first for active seizure, then magnesium pathway.", levels: ["AEMT", "Paramedic"], tone: "urgent" },
      { title: "Rapid Transport", text: "Continuous reassessment and early OB/trauma-capable destination notification.", levels: ALL_LEVELS, tone: "transport" },
    ],
    emt: [
      "Place the patient left lateral with the right side elevated 10–20 degrees when pregnancy is advanced or supine hypotension is possible.",
      "Assess airway, breathing, circulation, mental status, abdominal pain, bleeding amount, headache, vision changes, edema, and seizure activity.",
      "For seizure, protect from injury, support oxygenation and ventilation, check glucose, and request ALS immediately.",
      "Treat all pregnant trauma patients as requiring physician evaluation and transport.",
    ],
    aemt: [
      "Perform all EMT care plus IV/IO access, shock resuscitation, and authorized tranexamic acid or magnesium sulfate within current standing orders.",
      "Do not delay an authorized IM benzodiazepine for active seizure while attempting IV/IO access.",
    ],
    paramedic: [
      "Perform all prior care plus cardiac monitoring, protocol-directed seizure control, magnesium treatment, oxytocin after delivery, TXA for qualifying hemorrhagic shock, and advanced resuscitation.",
      "Identify ectopic pregnancy, placental abruption/previa, preeclampsia/eclampsia, and non-obstetric causes while minimizing transport delay.",
    ],
    assessment: [
      {
        title: "Preeclampsia / eclampsia findings",
        items: [
          "Blood pressure above 140 systolic or 90 diastolic, or a significant rise from the patient's prepregnancy baseline.",
          "Severe headache, visual disturbance, right-upper-quadrant or epigastric pain, nausea/vomiting, hyperreflexia, or edema of the hands and face.",
          "Seizure in pregnancy or the postpartum period may represent eclampsia even without a prior diagnosis.",
        ],
      },
      {
        title: "Hemorrhage and shock",
        items: [
          "Quantify bleeding by pads per hour, visible blood loss, clots, free bleeding, and associated syncope or abdominal pain.",
          "Consider occult ectopic rupture or placental abruption when shock is disproportionate to visible bleeding.",
        ],
      },
    ],
    treatmentSteps: [
      "For active seizure, administer the authorized benzodiazepine promptly before magnesium sulfate.",
      "After placental delivery, perform uterine massage and follow postpartum hemorrhage treatment.",
      "A pregnant patient after motor-vehicle collision requires immediate physician evaluation; pregnancy beyond 20 weeks commonly requires 4–6 hours of fetal monitoring.",
    ],
    medications: [
      {
        name: "Tranexamic acid",
        dose: "2 g IV/IO over 10 minutes; maximum 2 g",
        notes: [
          "For uncontrolled vaginal or postpartum hemorrhage with signs of shock under the imported source.",
          "Postpartum use is contraindicated when birth occurred more than 3 hours before EMS arrival.",
        ],
      },
      {
        name: "Oxytocin",
        dose: "10 IU IM after field delivery when available; maximum 10 IU",
        notes: [
          "Used to promote uterine contraction and reduce postpartum hemorrhage.",
        ],
      },
      {
        name: "Midazolam",
        dose: "10 mg IM, or 2–2.5 mg IV/IO repeated every 2–3 minutes to a maximum of 20 mg",
        notes: [
          "Do not delay IM treatment while attempting vascular access during active seizure.",
          "Confirm current Claiborne dosing before clinical release.",
        ],
      },
      {
        name: "Magnesium sulfate",
        dose: "2–4 g IV/IO over 2–3 minutes; may repeat once",
        notes: [
          "For eclamptic seizure after priority benzodiazepine treatment of active seizure.",
          "Monitor for hypotension and respiratory depression.",
        ],
      },
    ],
    warnings: [
      "Active seizure treatment with a benzodiazepine takes priority over magnesium sulfate.",
      "Magnesium sulfate may cause hypotension and respiratory depression; continuously monitor ventilation and perfusion.",
      "Do not suggest that a normal ultrasound alone would exclude injury after maternal trauma; appropriate fetal monitoring and physician evaluation are required.",
      "Vaginal bleeding may be absent in ectopic pregnancy or placental abruption.",
    ],
    clinicalPearls: [
      "Maintain a high index of suspicion for ectopic pregnancy in any patient of childbearing age with abdominal pain, syncope, or shock.",
      "Supine hypotensive syndrome is reduced by left lateral positioning with the right side elevated.",
    ],
  }),
];
