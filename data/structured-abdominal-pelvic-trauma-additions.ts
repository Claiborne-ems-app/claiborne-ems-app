import { canonicalPdfPages } from "./canonical-pdf-pages";
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
      "Prioritize hemorrhage control, pelvic stabilization when indicated, prevention of hypothermia, rapid transport to definitive or necessary stabilization care, and resuscitation that does not delay definitive hemorrhage control.",
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
        text: "Significant mechanism plus pelvic pain, deformity, shock, or unreliable examination - binder at greater trochanters",
        levels: [...ALL_LEVELS],
        tone: "decision",
      },
      {
        title: "Resuscitate En Route",
        text: "IV/IO - warmed isotonic crystalloid titrated to adult perfusion when blood is unavailable (AM-05) - TBI: adult SBP ≥110 mmHg - analgesia/antiemetic - reassess",
        levels: ["AEMT", "Paramedic"],
        tone: "action",
      },
      {
        title: "Trauma TXA Eligibility",
        text: "Paramedic only: after immediate lifesaving interventions, consider IV/IO TXA for traumatic hemorrhage with clinical hemorrhagic shock within 3 hours. Adult dose: 1–2 g IV/IO: give 1 g over 10 minutes or 2 g over 20 minutes; do not exceed 100 mg/min. Verify the stocked concentration and dilution against the current medication-preparation instructions. Do not administer an automatic repeat dose; any additional dose requires a separate authorized order.",
        levels: ["Paramedic"],
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
              "Perform all EMT actions plus IV/IO access. For adult hemorrhagic shock when blood is unavailable, follow AM-05: titrate warmed isotonic crystalloid to clinical perfusion and avoid unnecessary large-volume crystalloid. Use age-appropriate analgesia or antiemetic care within current standing orders.",
              "Expanded AEMT analgesia is not enabled by default while individual authorization is unverified. The specified medication, route, and patient group require current Tennessee authority, documented Tennessee-approved expanded analgesia training, agency credentialing, and medical-director standing orders; training alone does not grant permission.",
              "Do not delay transport for vascular access. Trend mental status, pulse quality, skin findings, blood pressure, pulse pressure, and response to resuscitation.",
              "Do not delay transport for vascular access or fluid. Without suspected TBI, use the AM-05 endpoint of a palpable radial pulse, adequate mental status, or SBP approximately 80–90 mmHg. With suspected TBI, prevent hypotension and target adult SBP at least 110 mmHg, including age 70; do not use permissive hypotension. Use normal saline when crystalloid is required for suspected TBI and reassess blood pressure frequently and after treatment.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior actions; lead advanced airway/ventilation, cardiac and EtCO2 monitoring, shock resuscitation, Medical Control, trauma-center destination, and air-medical decisions.",
              "Paramedic only: after immediate lifesaving interventions, consider IV/IO TXA for traumatic hemorrhage with clinical hemorrhagic shock no more than 3 hours after injury. Adult dose: 1–2 g IV/IO: give 1 g over 10 minutes or 2 g over 20 minutes; do not exceed 100 mg/min. Verify the stocked concentration and dilution against the current medication-preparation instructions. Do not administer an automatic repeat dose; any additional dose requires a separate authorized order. Do not infer a systemic trauma regimen from topical indications. Record injury time and any TXA dose/time, and notify the receiving team to prevent duplicate dosing. Do not delay transport or definitive hemorrhage control.",
              "Pediatric trauma TXA: local dose reference 15 mg/kg, Paramedic-only. Before administration, confirm pediatric eligibility, maximum dose, administration rate, and preparation with Medical Control within provider scope. Do not extrapolate the adult dose or infusion rate to children.",
              "Use blood products only within an authorized, supported transfusion program with required training, monitoring, and destination coordination. Other advanced hemorrhage interventions remain subject to current standing orders.",
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
      "Establish IV/IO access when indicated without delaying transport. For adult hemorrhagic shock when blood is unavailable, follow AM-05: titrate warmed isotonic crystalloid to clinical perfusion; avoid unnecessary large-volume crystalloid. Without suspected TBI, use a palpable radial pulse, adequate mental status, or SBP approximately 80–90 mmHg. For suspected TBI, prevent hypotension, target adult SBP at least 110 mmHg including age 70, use normal saline when crystalloid is required, and do not use permissive hypotension. Reassess perfusion, respiratory status, and blood pressure frequently and after treatment.",
      "Paramedic only: after immediate lifesaving interventions, consider IV/IO TXA for traumatic hemorrhage with clinical hemorrhagic shock within 3 hours of injury. Adult dose: 1–2 g IV/IO: give 1 g over 10 minutes or 2 g over 20 minutes; do not exceed 100 mg/min. Verify the stocked concentration and dilution against the current medication-preparation instructions. Do not administer an automatic repeat dose; any additional dose requires a separate authorized order. Do not infer a systemic trauma regimen from topical indications. Record injury time and any TXA dose/time; notify the receiving team to prevent duplicate dosing.",
      "Provide authorized analgesia and antiemetic treatment without masking deterioration or delaying transport. Keep the patient NPO and reassess frequently.",
      "Pregnancy beyond approximately 20 weeks: prioritize maternal resuscitation and relieve aortocaval compression with left uterine displacement or left lateral tilt when compatible with trauma care. Notify an appropriate trauma/obstetric-capable destination early.",
      "Apply the trauma field-triage and destination plan: high-risk patients to the highest-level appropriate trauma center within regional constraints; favor pediatric-capable trauma care for children. Use a closer stabilization hospital only for an immediate critical need that cannot safely be managed during longer transport, under the destination plan/Medical Control. Notify early, document the reason, and activate the predefined transfer process. Do not delay ground movement solely while awaiting aircraft.",
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
        name: "Warmed isotonic crystalloid",
        dose: "Adult hemorrhagic shock when blood is unavailable: titrate to perfusion under AM-05; avoid unnecessary large-volume crystalloid. Suspected TBI requires adult SBP at least 110 mmHg and normal saline when crystalloid is required.",
        notes: [
          "Reassess perfusion, respiratory status, and blood pressure frequently and after treatment. Definitive hemorrhage control takes priority; use blood products only within an authorized, supported transfusion program.",
        ],
      },
      {
        name: "Tranexamic acid (TXA)",
        dose: "Paramedic only: consider IV/IO TXA after immediate lifesaving interventions for traumatic hemorrhage with clinical hemorrhagic shock within 3 hours of injury. Adult dose: 1–2 g IV/IO: give 1 g over 10 minutes or 2 g over 20 minutes; do not exceed 100 mg/min. Verify the stocked concentration and dilution against the current medication-preparation instructions. Do not administer an automatic repeat dose; any additional dose requires a separate authorized order.",
        notes: [
          "Do not delay transport or definitive hemorrhage control for TXA administration.",
          "Record injury time and any TXA dose/time; notify the receiving team to prevent duplicate dosing. Do not infer a systemic trauma regimen from topical bleeding indications.",
          "Pediatric trauma TXA: local dose reference 15 mg/kg, Paramedic-only. Before administration, confirm pediatric eligibility, maximum dose, administration rate, and preparation with Medical Control within provider scope. Do not extrapolate the adult dose or infusion rate to children.",
        ],
      },
      {
        name: "Blood products",
        dose: "Use only within an authorized, supported transfusion program with required training, monitoring, and destination coordination.",
      },
    ],
    warnings: [
      "Do not delay transport for a detailed abdominal examination, repeated pelvic assessment, IV attempts, pain medication, splinting, or procedures that can be completed en route.",
      "Do not repeatedly rock or compress the pelvis. A normal or minimally painful pelvic examination does not exclude fracture or retroperitoneal hemorrhage.",
      "Place a pelvic binder over the greater trochanters, not the abdomen, waist, or iliac crests. A high binder may fail to reduce pelvic volume and can obstruct abdominal assessment.",
      "Do not remove an impaled object, reduce eviscerated organs, apply direct pressure to exposed viscera, or blindly pack the abdominal cavity.",
      "Do not allow exposed organs, wet dressings, cold fluids, or unnecessary exposure to cause hypothermia.",
      "Blood at the urinary meatus or suspected urethral injury is a warning for the receiving team; do not insert a urinary catheter in the field.",
      "Trauma TXA is Paramedic-only, not an AEMT intervention. Adult dose: 1–2 g IV/IO: give 1 g over 10 minutes or 2 g over 20 minutes; do not exceed 100 mg/min. Verify the stocked concentration and dilution against the current medication-preparation instructions. Do not administer an automatic repeat dose; any additional dose requires a separate authorized order. Pediatric administration requires confirmation of the patient-specific maximum and rate with Medical Control within provider scope. Do not infer a trauma regimen from topical bleeding instructions.",
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
          "For pediatric traumatic hemorrhage, obtain Medical Control guidance and use only the authorized pediatric trauma resuscitation order; do not apply medical or septic-shock fluid targets indiscriminately.",
          "Use only an appropriately sized, agency-approved pelvic stabilization device and pediatric application procedure.",
        ],
      },
    ],
    actionLinks: [
      {
        label: "AM-05 Hypotension / Shock",
        description: "Adult hemorrhagic-shock fluid strategy, reassessment, and the higher suspected-TBI perfusion target.",
        href: "/protocols/am/am-05",
        kind: "protocol",
      },
      {
        label: "TB-05 Head Trauma",
        description: "Suspected TBI: prevent hypotension and use the higher adult SBP target.",
        href: "/protocols/tb/tb-05",
        kind: "protocol",
      },
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
    sourcePages: { start: 1, end: canonicalPdfPages["tb-12"] },
    revisionDate: "2026-10-30",
    lastVerifiedDate: "2026-10-30",
    reviewStatus: "Approved",
    reviewFlags: [
      "Base content approved October 17, 2026; scoped trauma-review revisions accepted October 30, 2026. This does not establish full-system clinical release.",
      "Adult traumatic hemorrhage uses the AM-05 perfusion-directed warmed isotonic crystalloid strategy when blood is unavailable; the suspected-TBI adult SBP target is at least 110 mmHg. Pediatric traumatic-hemorrhage numeric instructions remain pending.",
      "Trauma TXA is Paramedic-only after immediate lifesaving interventions for traumatic hemorrhage with clinical hemorrhagic shock within 3 hours. Adult dose/rate accepted October 30, 2026: 1 g IV/IO over 10 minutes or 2 g IV/IO over 20 minutes, maximum 100 mg/min. No automatic repeat dose is provided. Verify stocked concentration/dilution using existing preparation instructions. Pediatric 15 mg/kg is the retained local reference; pediatric maximum/rate/age eligibility remain separate requirements.",
      "The retained local TXA references are not a claim of exact equivalence to the current state dosing sheet. IO authorization, pediatric age eligibility, pediatric administration rate/maximum, and any separately proposed repeat order require final director/state-authority reconciliation before clinical release; the approved adult dose/rate pairings are not pending.",
      "Maintain current pelvic-binder model/sizing and placement training, evisceration supplies, trauma-destination plan, and access to current analgesic/antiemetic orders. Record the approved adult TXA dose/rate pairings in the controlled administration order and verify the stocked preparation before clinical release; resolve pediatric maximum/rate separately.",
    ],
  },
];
