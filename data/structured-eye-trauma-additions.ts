import type { StructuredProtocolContent } from "../lib/protocols/structured-content";

const ALL_LEVELS = ["EMT", "AEMT", "Paramedic"] as const;

export const structuredEyeTraumaAdditions: StructuredProtocolContent[] = [
  {
    id: "tb-11",
    title: "Eye Trauma",
    categoryId: "tb",
    category: "Trauma & Burns",
    overview: [
      "Use for blunt, penetrating, thermal, or chemical eye injury. Treat life threats and associated trauma first, then protect vision by preventing pressure on a potentially open globe and beginning immediate irrigation for chemical exposure.",
      "Rapidly distinguish chemical or thermal exposure from penetrating/open-globe injury, blunt trauma, and a loose superficial foreign body because the correct care is different.",
      "Any vision loss, irregular pupil, hyphema, extrusion of ocular contents, impaled object, marked proptosis, severe pain, or high-velocity mechanism requires urgent transport and early receiving-facility notification.",
    ],
    flow: [
      {
        title: "Scene + Life Threats",
        text: "PPE - ABCs - associated head/facial trauma - spinal motion restriction only when indicated",
        levels: [...ALL_LEVELS],
        tone: "start",
      },
      {
        title: "Chemical / Thermal?",
        text: "Start immediate copious irrigation - remove contact lens if easy - do not neutralize",
        levels: [...ALL_LEVELS],
        tone: "urgent",
      },
      {
        title: "Penetrating / Open Globe?",
        text: "No pressure, manipulation, irrigation, drops, or object removal - rigid shield - stabilize protruding object",
        levels: [...ALL_LEVELS],
        tone: "decision",
      },
      {
        title: "Blunt / Superficial?",
        text: "Assess vision and red flags - shield if globe injury suspected - irrigate only loose debris",
        levels: [...ALL_LEVELS],
        tone: "action",
      },
      {
        title: "Vision Threat?",
        text: "Vision loss - irregular pupil - hyphema - proptosis - extrusion - severe pain - high-velocity mechanism",
        levels: [...ALL_LEVELS],
        tone: "decision",
      },
      {
        title: "Protect + Transport",
        text: "Control pain/nausea within scope - minimize Valsalva - serial vision check - early specialty notification",
        levels: [...ALL_LEVELS],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary:
          "Protect the injured eye, preserve baseline findings, treat pain and nausea, and avoid transport delay.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Treat immediate airway, breathing, circulation, hemorrhage, and associated trauma threats. Use spinal motion restriction only when indicated by mechanism and examination.",
              "For chemical or thermal exposure, begin copious irrigation with water or normal saline immediately. Remove contact lenses only when easily accomplished without delaying irrigation.",
              "For suspected penetrating or open-globe injury, do not apply pressure, remove an object, manipulate the eye, irrigate, or instill medication. Stabilize a protruding object without pressure and place a rigid eye shield when available.",
              "Assess and document visual acuity in each eye separately when feasible, pupils, visible injury, mechanism, pain, and changes during care. Do not delay time-sensitive transport to complete testing.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Perform all EMT actions plus vascular access when clinically indicated and authorized analgesia or antiemetic treatment under the current standing orders.",
              "Monitor for deterioration from associated head/facial trauma, hemorrhage, chemical exposure, or systemic injury and support transport without delaying irrigation or eye protection.",
              "Avoid medications or interventions that increase agitation, vomiting, coughing, or pressure on a suspected open globe.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior actions; lead advanced airway, analgesia, antiemetic, monitoring, Medical Control, and destination decisions when the injury or associated trauma is severe.",
              "Use early Medical Control and receiving-facility consultation for vision loss, suspected open globe, impaled object, orbital compartment warning signs, hydrofluoric-acid exposure, or uncertain destination.",
              "Do not use ketamine for analgesia in penetrating eye trauma under the current Tennessee reference unless a finalized Claiborne standing order or direct Medical Control explicitly authorizes it.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Blunt or penetrating injury involving the eye or orbit.",
      "Chemical or thermal exposure involving the eye.",
      "High-velocity foreign body, impaled object, sudden visual deficit after trauma, or suspected globe rupture.",
      "Pain, photophobia, redness, swelling, inability to open the eye, abnormal pupil, hyphema, proptosis, diplopia, or loss of vision after injury.",
    ],
    contraindications: [],
    assessment: [
      {
        title: "Focused eye assessment",
        items: [
          "Identify the exact mechanism, time, eye involved, chemical or product when applicable, contact-lens use, protective eyewear, high-velocity metal/glass exposure, and associated head or facial trauma.",
          "Assess visual acuity in each eye separately before treatment when feasible and after treatment when it will not delay care. If a chart is unavailable, document the ability to read, count fingers, detect hand motion, or perceive light.",
          "Inspect without pressure for pupil shape and reactivity, redness, bleeding, hyphema, extrusion of tissue or fluid, corneal clouding, foreign body, lid injury, proptosis, and peri-orbital swelling.",
          "Assess extraocular movement and diplopia only when it can be done gently and without manipulating a suspected open globe. Do not force the eyelids open.",
          "Reassess pain, vision, pupils, mental status, and associated trauma throughout care.",
        ],
      },
      {
        title: "Vision-threatening findings",
        items: [
          "Decreased or lost vision, irregular or teardrop pupil, visible penetration, extruded ocular contents, hyphema, or an impaled object.",
          "Marked proptosis, rapidly increasing orbital swelling, severe pain, decreased vision, or an afferent pupillary abnormality after blunt trauma.",
          "Chemical burns, especially alkali or hydrofluoric-acid exposure; high-velocity metal or glass; explosion; severe lid laceration; or inability to adequately examine the eye.",
        ],
      },
    ],
    treatmentSteps: [
      "Treat immediate life threats and associated head, face, cervical-spine, burn, or multisystem trauma. Eye care must not delay critical trauma transport.",
      "Chemical exposure: begin copious water or normal-saline irrigation immediately and continue for at least 15 minutes and during transport as needed. Remove contact lenses when easily possible, irrigate from the inner corner outward, and prevent runoff into the unaffected eye or onto responders.",
      "Brush away a dry chemical before irrigation when safe and appropriate. Do not attempt acid-base neutralization. Follow TE-09 Chemical / HazMat Exposure and Poison Help guidance for unusual or water-reactive agents.",
      "Thermal injury: gently cool or irrigate with room-temperature water or saline, protect the eye, and avoid ice, ointment, or pressure.",
      "Suspected penetrating/open-globe injury: do not remove an impaled object, manipulate the eye, apply pressure, irrigate, or instill medication. Stabilize a protruding object with bulky material around it without pressure, then protect with a rigid shield.",
      "Blunt trauma: protect with a rigid shield when globe injury is possible. Do not place a pressure dressing. Evaluate for hyphema, irregular pupil, vision change, diplopia, restricted movement, proptosis, and associated facial/head injury.",
      "Loose superficial debris may be irrigated only when penetrating injury or globe rupture is not suspected. Do not remove an embedded foreign body or use cotton swabs, magnets, or instruments on the eye.",
      "Provide authorized analgesia and antiemetic care, minimize coughing, vomiting, agitation, and Valsalva, and position with the head elevated when safe for the overall trauma condition.",
      "Transport promptly to the most appropriate facility under the trauma and specialty-destination plan. Notify early for open globe, impaled object, vision loss, orbital-compartment warning signs, significant chemical burn, or severe associated trauma.",
      "Document baseline and repeat vision, pupil findings, laterality, mechanism, product/exposure time, irrigation start and duration, eye protection, medication, response, consultation, and destination rationale.",
    ],
    medications: [
      {
        name: "Analgesic",
        dose: "Use the current Claiborne County pain-management protocol and provider-level standing orders.",
        notes: [
          "Titrate carefully and monitor airway, ventilation, mental status, and blood pressure.",
          "Current Tennessee reference excludes ketamine analgesia in penetrating eye trauma.",
        ],
      },
      {
        name: "Antiemetic",
        dose: "Use the current age-appropriate Claiborne County standing order when nausea or vomiting threatens the injured eye.",
        notes: [
          "Preventing vomiting and Valsalva is especially important when open-globe injury is suspected.",
        ],
      },
      {
        name: "Topical ophthalmic anesthetic",
        dose: "Only if specifically stocked and adopted in a finalized Claiborne County standing order or ordered by Medical Control.",
        notes: [
          "May facilitate irrigation when authorized; never dispense for patient home use.",
          "Do not instill into an eye with suspected penetration or globe rupture.",
        ],
      },
    ],
    warnings: [
      "Never apply pressure to an eye with trauma, suspected penetration, irregular pupil, hyphema, extrusion, or possible globe rupture.",
      "Do not remove an impaled or embedded object and do not attempt field repair of an eyelid or globe injury.",
      "Do not delay chemical irrigation to identify the product, obtain visual acuity, locate saline, or contact Poison Help.",
      "Do not neutralize a chemical on the eye and do not use ice, ointment, cotton swabs, magnets, or instruments.",
      "Do not patch both eyes routinely. If covering the unaffected eye is considered to reduce conjugate movement, do so only when tolerated and when fall, anxiety, airway, neurologic, and monitoring risks are controlled.",
      "Sudden painless non-traumatic vision loss is not eye trauma. Contact Medical Control and use the appropriate medical pathway; do not apply ocular pressure when trauma or globe rupture is possible.",
    ],
    clinicalPearls: [
      "A normal external appearance does not exclude an open globe or intraocular foreign body after a high-velocity mechanism.",
      "For chemical burns, treatment begins with irrigation. Water is preferable to waiting for saline or a specialized irrigating fluid.",
      "A rigid shield protects without pressing on the eye; a pressure patch can worsen an open-globe injury.",
      "Visual acuity is the eye's vital sign, but critical treatment and transport take priority when it cannot be obtained quickly.",
      "Pediatric patients may describe vision poorly and may resist examination; use calm, age-appropriate assessment and avoid forced eyelid opening.",
    ],
    specialPopulations: [
      {
        title: "Pediatric patient",
        items: [
          "Use a parent or caregiver to help with reassurance and irrigation when safe.",
          "Measure and record weight with the length-based system when age/size appropriate before medication, but do not delay irrigation or transport.",
          "Suspect non-accidental trauma when the history, development, mechanism, or injury pattern is inconsistent; follow the Family Violence / Abuse protocol.",
        ],
      },
    ],
    actionLinks: [
      {
        label: "Chemical / HazMat Exposure",
        href: "/protocols/te/te-09",
        kind: "protocol",
        description: "Responder safety, decontamination, agent cards, and Poison Help.",
      },
      {
        label: "Chemical and Electrical Burn",
        href: "/protocols/tb/tb-02",
        kind: "protocol",
        description: "Associated facial, skin, electrical, or thermal burn care.",
      },
      {
        label: "Head Trauma",
        href: "/protocols/tb/tb-05",
        kind: "protocol",
        description: "Associated head injury and serial neurologic assessment.",
      },
      {
        label: "Multiple Trauma",
        href: "/protocols/tb/tb-06",
        kind: "protocol",
        description: "Multisystem injury and trauma destination decisions.",
      },
    ],
    references: [
      "Tennessee EMS ALS/BLS Blended Protocol Guidelines 2024-2025 - SOP #405 Eye Trauma.",
      "Tennessee EMS ALS/BLS Blended Protocol Guidelines 2024-2025 - Ketamine Reference.",
      "Claiborne County EMS Chemical / HazMat Exposure, Head Trauma, Multiple Trauma, and pain-management protocols.",
    ],
    sourcePdf: "/protocols/claiborne/tb-11-eye-trauma-protocol.pdf",
    sourcePages: { start: 1, end: 2 },
    revisionDate: "July 2026",
    lastVerifiedDate: "July 30, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director approval is required before this protocol is released for clinical use.",
      "Confirm the agency's stocked rigid eye shields, irrigation equipment, analgesic/antiemetic formulary, topical-anesthetic policy, and specialty destination plan.",
      "Ophthalmology, trauma-system, pharmacy, pediatric, and training review are recommended before final approval.",
      "The beta application remains a reference tool; the current approved Claiborne County protocol manual controls patient care.",
    ],
  },
];
