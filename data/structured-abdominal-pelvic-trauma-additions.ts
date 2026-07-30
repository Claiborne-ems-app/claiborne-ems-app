import type { StructuredProtocolContent } from "../lib/protocols/structured-content";

const ALL_LEVELS = ["EMT", "AEMT", "Paramedic"] as const;

export const structuredAbdominalPelvicTraumaAdditions: StructuredProtocolContent[] = [
  {
    id: "tb-12",
    title: "Abdominal / Pelvic Trauma",
    categoryId: "tb",
    category: "Trauma & Burns",
    overview: [
      "Use for blunt or penetrating injury to the abdomen, flank, pelvis, groin, perineum, or lower torso, including suspected internal hemorrhage, pelvic fracture, evisceration, or an impaled object.",
      "A normal initial examination or blood pressure does not exclude major abdominal, retroperitoneal, pelvic, solid-organ, hollow-viscus, vascular, genitourinary, or pregnancy-related injury.",
      "Prioritize hemorrhage control, pelvic stabilization when indicated, prevention of hypothermia, rapid trauma-center transport, and resuscitation that does not delay definitive hemorrhage control.",
    ],
    flow: [
      {
        title: "XABCDE + Rapid Trauma Survey",
        text: "Control external hemorrhage - airway/ventilation - perfusion - neuro status - expose and warm",
        levels: [...ALL_LEVELS],
        tone: "start",
      },
      {
        title: "Internal Hemorrhage?",
        text: "Shock - pain/tenderness - distention - seatbelt sign - flank bruising - high-risk mechanism",
        levels: [...ALL_LEVELS],
        tone: "urgent",
      },
      {
        title: "Open Injury?",
        text: "Impaled object or evisceration - do not remove or reduce - stabilize and cover without pressure",
        levels: [...ALL_LEVELS],
        tone: "decision",
      },
      {
        title: "Pelvic Injury Suspected?",
        text: "High-energy mechanism - pelvic pain/deformity - instability/shock - binder at greater trochanters",
        levels: [...ALL_LEVELS],
        tone: "decision",
      },
      {
        title: "Resuscitate En Route",
        text: "IV/IO - warming - analgesia/antiemetic - shock pathway - blood/TXA only if locally adopted",
        levels: ["AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Trauma Center + Early Alert",
        text: "Minimize scene time - serial exam/vitals - pregnancy and pediatric considerations - destination plan",
        levels: [...ALL_LEVELS],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary:
          "Recognize concealed hemorrhage, stabilize the pelvis when indicated, protect open injuries, and move rapidly toward definitive care.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Perform XABCDE, control external hemorrhage, support airway and ventilation, prevent hypothermia, and rapidly assess the abdomen, flanks, pelvis, groin, and perineum for injury.",
              "Do not repeatedly compress or rock the pelvis. When pelvic fracture with significant mechanism, pain, deformity, or shock is suspected, apply the agency-approved pelvic binder centered over the greater trochanters and reassess distal circulation, sensation, and movement.",
              "Do not remove an impaled object or reduce eviscerated organs. Stabilize protruding objects without pressure and cover evisceration with a sterile saline-moistened dressing protected from heat loss.",
              "Package for rapid trauma transport, keep the patient NPO, and provide early notification for shock, penetrating injury, evisceration, impalement, pregnancy, or suspected unstable pelvic injury.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Perform all EMT actions plus IV/IO access, warmed crystalloid only as authorized for traumatic shock, and age-appropriate analgesia or antiemetic care within current standing orders.",
              "Do not delay transport for vascular access. Trend mental status, pulse quality, skin findings, blood pressure, pulse pressure, and response to resuscitation.",
              "Prepare for rapid deterioration and use the current hemorrhagic-shock pathway; avoid unnecessary large-volume crystalloid.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior actions; lead advanced airway/ventilation, cardiac and EtCO2 monitoring, shock resuscitation, Medical Control, trauma-center destination, and air-medical decisions.",
              "Use prehospital blood products, tranexamic acid, vasopressors, or other advanced hemorrhage interventions only under a separately finalized Claiborne County standing order with the required training, monitoring, and destination coordination.",
              "For a pregnant patient beyond approximately 20 weeks, relieve aortocaval compression with manual left uterine displacement or left lateral tilt when compatible with spinal and trauma care.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Blunt or penetrating injury to the abdomen, flank, pelvis, groin, perineum, lower chest, or lower back.",
      "Abdominal or pelvic pain, tenderness, guarding, rigidity, distention, bruising, abrasion, seatbelt sign, penetrating wound, impalement, evisceration, or unstable vital signs after trauma.",
      "Pelvic pain or deformity, suspected pelvic fracture, blood at the urinary meatus, hematuria, rectal/vaginal bleeding, inability to void, or neurologic deficit after trauma.",
      "High-energy mechanism, multisystem trauma, anticoagulant use, pregnancy, pediatric trauma, older adult trauma, or unexplained shock with possible abdominal/pelvic injury.",
    ],
    contraindications: [],
    assessment: [
      {
        title: "Rapid abdominal and pelvic assessment",
        items: [
          "Determine mechanism, time, energy transfer, penetration trajectory, impaled object, restraint/seatbelt use, airbag deployment, vehicle intrusion, fall height, crush, blast, anticoagulants, pregnancy possibility/gestation, and associated chest, spine, head, or extremity injury.",
          "Inspect and gently palpate the abdomen and flanks once for pain, tenderness, guarding, rigidity, distention, abrasions, ecchymosis, penetrating wounds, evisceration, or exposed organs. Do not repeatedly examine a painful abdomen.",
          "Inspect the pelvis, groin, and perineum for wounds, bruising, deformity, swelling, blood at the urinary meatus, hematuria, rectal or vaginal bleeding, or neurologic deficit while preserving privacy and preventing heat loss.",
          "Assess the pelvis by history, mechanism, visual findings, and gentle palpation only when needed. Do not repeatedly rock or compress the iliac crests to test stability.",
          "Trend mental status, pulse, skin, capillary refill, blood pressure, pulse pressure, respiratory status, and shock index when useful. A normal initial pressure does not exclude compensated hemorrhagic shock.",
        ],
      },
      {
        title: "High-risk findings",
        items: [
          "Hypotension, altered mental status, tachycardia, weak pulses, cool or mottled skin, narrowing pulse pressure, or worsening shock.",
          "Penetrating torso injury, evisceration, impalement, expanding abdomen/flank/groin hematoma, pelvic deformity, significant pelvic pain with high-energy mechanism, or suspected open pelvic fracture.",
          "Seatbelt sign, lower-rib injury, severe pain, guarding/rigidity, distention, hematemesis, hematuria, blood at the meatus, bloody stool, vaginal bleeding, or inability to void.",
          "Pregnancy, pediatric or older patient, anticoagulant/antiplatelet use, bleeding disorder, or unreliable examination because of altered mental status, distracting injury, intoxication, or communication barrier.",
        ],
      },
    ],
    treatmentSteps: [
      "Perform XABCDE, control compressible external hemorrhage, support oxygenation and ventilation as indicated, expose only as needed, and actively prevent hypothermia.",
      "Treat suspected abdominal or pelvic hemorrhage as time-critical trauma. Minimize scene time, begin destination coordination early, and complete nonessential assessment or procedures during transport.",
      "Suspected pelvic fracture: apply the agency-approved commercial pelvic binder centered over the greater trochanters, not the abdomen, waist, or iliac crests. Secure the legs together when appropriate, minimize movement, and reassess distal neurovascular status.",
      "Do not repeatedly manipulate, rock, or compress the pelvis and do not loosen or remove a correctly positioned binder in the field unless a separately approved protocol or Medical Control requires it.",
      "Evisceration: do not replace organs into the abdomen. Cover loosely with sterile saline-moistened dressings and an occlusive layer when available, protect from heat loss, and avoid direct pressure.",
      "Impaled object: do not remove. Stabilize in place with bulky dressings without pressure on exposed organs. Modify or remove only when essential for an immediate lifesaving intervention or safe transport and under rescue/Medical Control coordination.",
      "Control external or junctional hemorrhage with direct pressure, wound packing, hemostatic gauze, or tourniquet when anatomically appropriate. Do not blindly pack material into the abdominal cavity.",
      "Establish IV/IO access when indicated without delaying transport. Use warmed crystalloid, blood products, TXA, and other shock interventions only according to the current Claiborne traumatic-shock and provider-level standing orders.",
      "Provide authorized analgesia and antiemetic treatment without masking deterioration or delaying transport. Keep the patient NPO and reassess frequently.",
      "Pregnancy beyond approximately 20 weeks: prioritize maternal resuscitation and relieve aortocaval compression with left uterine displacement or left lateral tilt when compatible with trauma care. Notify an appropriate trauma/obstetric-capable destination early.",
      "Transport to the most appropriate trauma center under the current Tennessee trauma destination criteria and Claiborne plan. Consider air medical only when it is expected to reduce time to definitive care and does not delay ground movement.",
      "Document mechanism, examination, serial vital signs, suspected bleeding source, pelvic-binder indication/position/time, distal neurovascular findings, open-injury care, medications/fluids/blood, response, pregnancy status, consultation, and destination rationale.",
    ],
    medications: [
      {
        name: "Analgesic",
        dose: "Use the current Claiborne County pain-management protocol and provider-level standing orders.",
        notes: [
          "Titrate to comfort while preserving ventilation, perfusion, mental-status reassessment, and rapid transport.",
        ],
      },
      {
        name: "Antiemetic",
        dose: "Use the current age-appropriate Claiborne County standing order when indicated.",
        notes: [
          "Vomiting increases aspiration risk and can complicate evisceration, impalement, and pain control.",
        ],
      },
      {
        name: "Warmed crystalloid",
        dose: "Use only the current traumatic-shock pathway and provider-level standing orders.",
        notes: [
          "Avoid unnecessary large-volume crystalloid; definitive hemorrhage control and blood-based resuscitation, when locally available, take priority.",
        ],
      },
      {
        name: "Blood products / tranexamic acid",
        dose: "Only under a separately approved Claiborne County protocol with defined indications, exclusions, dosing, monitoring, and destination requirements.",
      },
    ],
    warnings: [
      "Do not delay transport for a detailed abdominal examination, repeated pelvic assessment, IV attempts, pain medication, splinting, or procedures that can be completed en route.",
      "Do not repeatedly rock or compress the pelvis. A normal or minimally painful pelvic examination does not exclude fracture or retroperitoneal hemorrhage.",
      "Place a pelvic binder over the greater trochanters, not the abdomen, waist, or iliac crests. A high binder may fail to reduce pelvic volume and can obstruct abdominal assessment.",
      "Do not remove an impaled object, reduce eviscerated organs, apply direct pressure to exposed viscera, or blindly pack the abdominal cavity.",
      "Do not allow exposed organs, wet dressings, cold fluids, or unnecessary exposure to cause hypothermia.",
      "Blood at the urinary meatus or suspected urethral injury is a warning for the receiving team; do not insert a urinary catheter in the field.",
      "Maternal resuscitation is the best initial fetal resuscitation. Do not delay trauma-center care to obtain fetal assessment unavailable to the crew.",
    ],
    clinicalPearls: [
      "The abdomen, retroperitoneum, and pelvis can conceal life-threatening blood loss before hypotension appears.",
      "Pelvic pain plus a high-energy mechanism or shock is enough to justify early stabilization under the local binder policy; repeated manual testing adds risk without improving field care.",
      "A seatbelt sign, lower-rib injury, flank bruising, hematuria, or unexplained shock should increase suspicion even when abdominal tenderness is mild.",
      "Pediatric patients may maintain blood pressure until late shock. Older adults and patients taking anticoagulants may deteriorate after an initially reassuring examination.",
      "A correctly positioned binder and rapid transport are complementary; neither should delay the other.",
    ],
    specialPopulations: [
      {
        title: "Pregnancy",
        items: [
          "Assess gestational age, abdominal pain, contractions, vaginal bleeding/fluid, fetal movement when known, and maternal shock while prioritizing maternal XABCDE.",
          "Beyond approximately 20 weeks, use manual left uterine displacement or left lateral tilt when compatible with spinal and trauma care.",
          "Transport significant trauma to a destination capable of both maternal trauma resuscitation and obstetric/neonatal care when feasible without delaying definitive trauma treatment.",
        ],
      },
      {
        title: "Pediatric patient",
        items: [
          "Use the length-based system for equipment and medication calculations when appropriate, but do not delay hemorrhage control or transport.",
          "Use age-appropriate signs of shock; hypotension is a late finding.",
          "Use only an appropriately sized, agency-approved pelvic stabilization device and pediatric application procedure.",
        ],
      },
    ],
    actionLinks: [
      {
        label: "Multiple Trauma",
        description: "XABCDE, hemorrhage control, shock care, and trauma destination.",
        href: "/protocols/tb/tb-06",
        kind: "protocol",
      },
      {
        label: "Selective Spinal Immobilization",
        description: "Spinal motion restriction based on mechanism and examination.",
        href: "/protocols/tb/tb-08",
        kind: "protocol",
      },
      {
        label: "Traumatic Arrest",
        description: "Use when abdominal/pelvic trauma progresses to cardiac arrest.",
        href: "/protocols/tb/tb-10",
        kind: "protocol",
      },
      {
        label: "OB / GYN Emergency",
        description: "Pregnancy-related assessment and obstetric coordination.",
        href: "/protocols/ao/ao-03",
        kind: "protocol",
      },
    ],
    references: [
      "Tennessee EMS ALS/BLS Blended Protocol Guidelines 2024-2025 - SOP #402 Abdominal / Pelvic Trauma.",
      "Tennessee EMS ALS/BLS Blended Protocol Guidelines 2024-2025 - Trauma Assessment / Destination Guidelines and Hypovolemic Shock.",
      "National Association of State EMS Officials National Model EMS Clinical Guidelines, Version 3.",
      "Claiborne County EMS Multiple Trauma, Selective Spinal Immobilization, Traumatic Arrest, and OB / GYN Emergency protocols.",
    ],
    sourcePdf: "/protocols/claiborne/tb-12-abdominal-pelvic-trauma-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "July 2026",
    lastVerifiedDate: "July 30, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director approval is required before this protocol is released for clinical use.",
      "Confirm the agency's commercial pelvic binder model, adult/pediatric sizing, placement training, evisceration supplies, hemorrhagic-shock pathway, and trauma destination plan.",
      "Blood products, TXA, crystalloid endpoints, analgesic/antiemetic choices, and air-medical criteria require final formulary and operational approval.",
      "Trauma-system, emergency medicine, surgery, obstetric, pediatric, pharmacy, and education review are recommended before final approval.",
      "The beta application remains a reference tool; the current approved Claiborne County protocol manual controls patient care.",
    ],
  },
];
