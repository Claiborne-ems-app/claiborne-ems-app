import type { StructuredProtocolContent } from "../lib/protocols/structured-content";

const ALL_LEVELS = ["EMT", "AEMT", "Paramedic"] as const;

export const structuredChemicalHazmatAdditions: StructuredProtocolContent[] = [
  {
    id: "te-09",
    title: "Chemical / HazMat Exposure",
    categoryId: "te",
    category: "Toxicology & Environmental",
    overview: [
      "Use for known or suspected hazardous-chemical exposure involving inhalation, skin or eye contact, ingestion, injection, or an unidentified substance.",
      "Responder safety and contamination control come before patient contact. Do not enter a hot zone or confined space without the required training, monitoring, PPE, respiratory protection, and HazMat coordination.",
      "Stop exposure, perform appropriate decontamination, support airway and ventilation, identify the substance and route when safe, and involve Poison Help and Medical Control early.",
    ],
    flow: [
      {
        title: "Establish Zones + PPE",
        text: "Hot • warm • cold zones • identify wind/terrain/confined-space risk • request HazMat",
        levels: [...ALL_LEVELS],
        tone: "start",
      },
      {
        title: "Safe Rescue Only",
        text: "Removal from the source by properly trained and protected personnel; prevent additional victims",
        levels: [...ALL_LEVELS],
        tone: "urgent",
      },
      {
        title: "Decontaminate",
        text: "Remove clothing/jewelry • brush dry agents • blot liquids • irrigate when indicated • contain runoff",
        levels: [...ALL_LEVELS],
        tone: "action",
      },
      {
        title: "ABCs + Immediate Threats",
        text: "Airway edema • bronchospasm • respiratory failure • shock • dysrhythmia • seizure • burns",
        levels: [...ALL_LEVELS],
        tone: "urgent",
      },
      {
        title: "Identify Agent + Route",
        text: "SDS/ERG • label/placard • inhaled, skin, eye, ingestion • duration • concentration • symptoms",
        levels: [...ALL_LEVELS],
        tone: "decision",
      },
      {
        title: "Poison Help + Medical Control",
        text: "Call 1-800-222-1222 • obtain agent-specific guidance • verify antidote and destination",
        levels: [...ALL_LEVELS],
        tone: "action",
      },
      {
        title: "Agent Card + Transport",
        text: "Use chlorine, ammonia, organophosphate, H2S, HF, or unknown/corrosive pathway",
        levels: [...ALL_LEVELS],
        tone: "transport",
      },
    ],
    careModules: [
      {
        title: "Provider-Level Actions",
        summary: "Protect responders, stop exposure, decontaminate, support ABCs, and use agent-specific guidance.",
        levels: [
          {
            level: "EMT",
            actions: [
              "Remain outside the hazard until the scene is declared safe for the assigned PPE and training level; request HazMat, fire, law enforcement, and additional EMS resources early.",
              "Assist removal of contaminated clothing and jewelry, brush away dry material before irrigation, provide copious eye/skin irrigation when indicated, and prevent contamination of the ambulance or receiving facility.",
              "Support airway and ventilation, administer oxygen as indicated, treat bronchospasm within scope, obtain glucose when indicated, and contact Poison Help.",
              "Obtain the product name, container, label, placard, Safety Data Sheet, exposure route, time, and symptoms without re-entering the hazard or delaying care.",
            ],
          },
          {
            level: "AEMT",
            actions: [
              "Perform all EMT actions plus IV/IO access, authorized fluids and medications, continuous reassessment, and preparation for rapid respiratory deterioration.",
              "Use an unexposed extremity for vascular access when feasible and protect equipment from contamination.",
              "For a cholinergic presentation, use the linked WMD / Nerve Agent pathway and administer agency-approved atropine/pralidoxime within scope.",
            ],
          },
          {
            level: "Paramedic",
            actions: [
              "Perform all prior actions; lead advanced airway, ventilation, CPAP when appropriate, cardiac monitoring, 12-lead ECG, seizure, dysrhythmia, and shock management.",
              "Contact Medical Control and Poison Help for unidentified agents, severe symptoms, delayed-risk exposures, specialty antidotes, or destination questions.",
              "Administer calcium gluconate for hydrofluoric-acid exposure or other uncommon antidotes only from an approved kit and under the finalized agent-specific standing order or direct Medical Control.",
            ],
          },
        ],
      },
    ],
    indications: [
      "Known or suspected exposure to an industrial, agricultural, household, transportation, combustion, laboratory, or intentionally released chemical.",
      "Multiple patients with similar unexplained respiratory, neurologic, ocular, gastrointestinal, or dermatologic findings.",
      "Contamination or symptoms after a spill, vapor release, confined-space event, pesticide application, fertilizer or pool-chemical incident, fumigation, sewer or manure-pit exposure, or unknown substance.",
    ],
    contraindications: [],
    assessment: [
      {
        title: "General chemical-exposure assessment",
        items: [
          "Confirm the scene has been evaluated for atmosphere, oxygen concentration, flammability, explosion, wind direction, vapor density, confined-space hazards, and the need for specialized chemical PPE or SCBA.",
          "Determine the agent or product, physical form, concentration, route, duration, time since exposure, decontamination already completed, number of exposed people, symptoms, and coexisting trauma or thermal injury.",
          "Assess airway voice and patency, work of breathing, lung sounds, oxygenation, ventilation, mental status, pupils, secretions, skin moisture and color, temperature, ECG, perfusion, pain, and exposed eyes and skin.",
          "Do not rely on pulse oximetry alone when a cellular asphyxiant, carbon monoxide, cyanide, hydrogen sulfide, or methemoglobinemia is possible.",
          "Repeatedly reassess because airway edema, pulmonary edema, chemical pneumonitis, dysrhythmia, seizures, electrolyte toxicity, and neurologic symptoms may be delayed.",
        ],
      },
      {
        title: "Quick card: Chlorine / chloramine gas",
        items: [
          "Common sources include pool products, industrial chlorine, and mixing bleach with acids or ammonia. Liquid-soaked clothing can continue to off-gas and contaminate responders.",
          "Expect burning eyes and throat, cough, chest tightness, wheeze, stridor, hypoxemia, and possible delayed pulmonary edema. Liquefied chlorine can cause frostbite.",
          "Move to fresh air through protected rescue, remove contaminated clothing and jewelry, wash exposed skin with mild soap and water, irrigate eyes, support ventilation, and treat bronchospasm.",
          "Do not routinely neutralize chemicals on the patient. Nebulized sodium bicarbonate for chlorine is permitted only if specifically adopted by Claiborne County, available in an approved preparation, and ordered by the finalized protocol or Medical Control.",
        ],
      },
      {
        title: "Quick card: Ammonia",
        items: [
          "Common sources include fertilizer, agricultural operations, industrial refrigeration, and concentrated cleaning products. Ammonia is highly water soluble and causes alkaline injury to moist tissues.",
          "Expect severe eye and upper-airway irritation, cough, bronchospasm, stridor, laryngeal edema, chemical burns, frostbite from liquefied product, hypotension, and pulmonary edema.",
          "Protected rescue and rapid removal from the source are critical. Remove clothing and jewelry, brush/blot visible material, wash skin, irrigate eyes continuously, and prepare early for a difficult or progressively swollen airway.",
        ],
      },
      {
        title: "Quick card: Organophosphate / carbamate pesticide",
        items: [
          "Consider after agricultural or pesticide exposure with miosis, sweating, salivation, lacrimation, vomiting, diarrhea, urination, fasciculations, weakness, bradycardia, bronchospasm, or profuse pulmonary secretions.",
          "Avoid secondary dermal contamination. Use appropriate chemical PPE, remove clothing, bag contaminated items, brush dry agents, wash skin and hair with soap and water, and protect the airway during decontamination.",
          "Airway suction, oxygenation, ventilation, and control of secretions are immediate priorities. Use TE-08 WMD / Nerve Agent for atropine, pralidoxime, seizure care, autoinjectors, and CHEMPACK activation.",
          "Atropine is titrated to improving secretions and ventilation rather than pupil size or a fixed heart-rate target.",
        ],
      },
      {
        title: "Quick card: Hydrogen sulfide",
        items: [
          "Common sources include sewers, septic systems, manure pits, petroleum operations, and decaying organic matter. It is heavier than air and can rapidly incapacitate rescuers in low or confined spaces.",
          "The rotten-egg odor is unreliable because olfactory fatigue occurs. Assume a dangerous atmosphere when unexplained collapse occurs near a confined space or organic-waste source.",
          "Expect eye irritation, cough, dyspnea, pulmonary edema, headache, confusion, seizure, coma, dysrhythmia, circulatory collapse, and sudden respiratory arrest.",
          "Only trained personnel with appropriate respiratory protection may remove the patient. Provide immediate high-concentration oxygen and ventilation, cardiac monitoring, seizure care, and Poison Help/Medical Control consultation. Use antidotal nitrite therapy only if specifically approved.",
        ],
      },
      {
        title: "Quick card: Hydrofluoric acid / hydrogen fluoride",
        items: [
          "Sources include glass etching, rust removal, industrial processing, some wheel or metal cleaners, and laboratory products. Pain and systemic toxicity may be delayed, especially with dilute solutions.",
          "Small-appearing burns can cause deep tissue injury, hypocalcemia, hypomagnesemia, hyperkalemia, prolonged QT, ventricular dysrhythmia, shock, or death. Severe pain out of proportion is a major warning.",
          "Use chemical PPE, remove contaminated clothing and jewelry, brush dry material, irrigate immediately and copiously, establish access in an unexposed extremity when feasible, and begin continuous ECG monitoring.",
          "After irrigation, apply or administer calcium gluconate only through the finalized Claiborne HF kit/protocol and Poison Help or Medical Control guidance. Eye, inhalation, ingestion, hand, face, genital, circumferential, large-area, or symptomatic exposures require urgent specialty evaluation.",
        ],
      },
      {
        title: "Quick card: Unknown chemical / corrosive",
        items: [
          "Treat an unidentified substance as hazardous until identified. Look for placards, container shape, labels, SDS, ERG information, witness reports, occupational setting, and toxidrome without touching contaminated materials.",
          "For dry material, brush away visible particles before irrigation unless authoritative agent-specific guidance directs otherwise. For most liquid skin or eye exposures, remove contaminated items and irrigate with copious tepid water.",
          "Do not induce vomiting, give oral neutralizers, or attempt acid-base neutralization on the body. Do not place water-reactive material in contact with water until the agent is identified and HazMat/Poison Help gives direction.",
          "Transport symptomatic patients and those with significant eye injury, airway symptoms, abnormal vital signs, altered mental status, intentional exposure, concentrated corrosive ingestion, uncertain decontamination, or a substance with known delayed toxicity.",
        ],
      },
    ],
    treatmentSteps: [
      "Establish command, zones, responder accountability, decontamination, and a clean treatment area. Do not bring a contaminated patient, clothing, equipment, or packaging into the ambulance or emergency department.",
      "Remove the patient from exposure only when the rescue can be performed by personnel with the required training and PPE. Never enter a confined space for rescue without the appropriate team and respiratory protection.",
      "Remove and bag contaminated clothing and jewelry. Brush away dry agents and blot excess liquid before irrigation when appropriate. Follow HazMat direction for runoff containment and water-reactive substances.",
      "Provide airway positioning, suction, oxygen when indicated, BVM ventilation, bronchodilator therapy, CPAP when appropriate, and early advanced-airway preparation for progressive edema or respiratory failure.",
      "Irrigate exposed eyes and skin continuously with copious tepid water or saline unless reliable agent-specific guidance contraindicates water. Remove contact lenses when easily possible without delaying irrigation.",
      "Treat shock, seizures, dysrhythmias, burns, temperature injury, and pain using the appropriate linked protocol and provider-level standing orders.",
      "Call Poison Help at 1-800-222-1222 and contact Medical Control early for severe or unknown exposure, unusual antidote, persistent symptoms, ingestion, intentional exposure, pediatric patient, pregnancy, or destination guidance.",
      "Coordinate transport to the most appropriate receiving facility, burn center, trauma center, pediatric center, or facility with toxicology capability. Notify the destination before arrival and report decontamination status.",
      "Document the identified or suspected agent, source, route, concentration, exposure duration, PPE, zone of contact, decontamination, product information, Poison Help/Medical Control recommendations, treatment, response, and contamination status at handoff.",
    ],
    medications: [
      {
        name: "Bronchodilator",
        dose: "Use the current age-appropriate respiratory-distress protocol for clinically significant bronchospasm.",
        notes: [
          "Bronchodilator treatment does not replace decontamination, oxygenation, ventilation, or monitoring for delayed pulmonary edema.",
        ],
      },
      {
        name: "Atropine / pralidoxime",
        dose: "Use TE-08 WMD / Nerve Agent for organophosphate or nerve-agent dosing and clinical endpoints.",
        notes: [
          "Atropine is titrated to improvement in secretions and ventilation; use only within provider scope and the approved formulary.",
        ],
      },
      {
        name: "Calcium gluconate for hydrofluoric-acid exposure",
        dose: "Use only the finalized Claiborne County HF preparation, route, dose, and approval pathway.",
        notes: [
          "Potential routes include topical, nebulized, or other specialty administration depending on exposure and local adoption.",
          "Continuous ECG monitoring and Poison Help or Medical Control consultation are required for symptomatic or significant exposure.",
        ],
      },
      {
        name: "Other specialty antidotes",
        dose: "Methylene blue, nitrite therapy, chelation, or other uncommon antidotes require a separately approved standing order or direct Medical Control.",
      },
    ],
    warnings: [
      "Do not enter a hot zone, vapor cloud, confined space, or oxygen-deficient atmosphere without the required training, monitoring, PPE, and respiratory protection.",
      "Do not allow contaminated clothing, bags, equipment, or runoff to create secondary contamination of EMS personnel, the ambulance, the public, or the receiving facility.",
      "Do not mix household or industrial chemicals to identify them. Mixing bleach with acids or ammonia can generate toxic gas.",
      "Do not routinely neutralize acids, alkalis, or other chemicals on or inside the patient; exothermic reactions can worsen injury.",
      "Do not induce vomiting after caustic, hydrocarbon, or unknown ingestion.",
      "A normal initial examination or pulse oximetry reading does not exclude delayed pulmonary edema, cellular asphyxiation, methemoglobinemia, electrolyte toxicity, or deep tissue injury.",
    ],
    clinicalPearls: [
      "Removing contaminated clothing can eliminate a large portion of external contamination and should occur before entry into the clean treatment area.",
      "For eye exposure, irrigation begins immediately; do not delay irrigation to identify the exact product or locate specialty fluid.",
      "Product labels, photographs, SDS documents, shipping papers, placard numbers, and the Emergency Response Guidebook can improve identification without transporting a contaminated container.",
      "Nitrogen oxides, nitrates/nitrites, aniline dyes, and similar oxidizers can cause methemoglobinemia with cyanosis that responds poorly to oxygen; obtain co-oximetry when available and contact Poison Help.",
      "Methyl bromide and other fumigants may cause delayed neurologic symptoms, seizures, and pulmonary edema even after an initially mild presentation.",
      "Suspected arsenic, lead, mercury, copper, or other heavy-metal exposure is primarily supportive in the field; decontaminate, monitor, preserve product information, and obtain toxicology guidance rather than delaying transport for chelation.",
      "Opioid overdose is already addressed in TE-07 Overdose / Toxic Ingestion; use that pathway for ventilation and naloxone rather than this chemical-decontamination pathway.",
    ],
    specialPopulations: [
      {
        title: "Children",
        items: [
          "Children may receive a greater dose relative to body mass, remain closer to heavier-than-air vapors, and deteriorate rapidly from airway edema or respiratory fatigue.",
          "Use age-appropriate equipment, medication dosing, temperature protection, and pediatric destination criteria.",
        ],
      },
      {
        title: "Pregnancy",
        items: [
          "Maternal oxygenation, ventilation, perfusion, and decontamination are the priorities. Do not delay indicated maternal treatment because of pregnancy.",
          "Consult Poison Help and Medical Control for fetal considerations, antidotes, and destination decisions.",
        ],
      },
      {
        title: "Responder exposure",
        items: [
          "Any responder with symptoms, PPE breach, splash, inhalation, needlestick, or uncertain exposure requires immediate removal from duty, decontamination, medical evaluation, and agency exposure documentation.",
        ],
      },
    ],
    actionLinks: [
      {
        label: "Call Poison Help",
        description: "National Poison Control line",
        href: "tel:+18002221222",
        kind: "call",
      },
      {
        label: "Opioid / Overdose",
        description: "Ventilation and naloxone pathway",
        href: "/protocols/te/te-07",
        kind: "protocol",
      },
      {
        label: "CO / Cyanide",
        description: "Cellular asphyxiant pathway",
        href: "/protocols/te/te-02",
        kind: "protocol",
      },
      {
        label: "Nerve Agent",
        description: "Atropine and pralidoxime pathway",
        href: "/protocols/te/te-08",
        kind: "protocol",
      },
      {
        label: "Chemical Burn",
        description: "Burn and destination pathway",
        href: "/protocols/tb/tb-02",
        kind: "protocol",
      },
    ],
    references: [
      "Tennessee EMS BLS/ALS State Protocol Guidelines 2024-2025 — Hazardous Materials SOPs 801-809",
      "U.S. Health Resources and Services Administration — Poison Help and Tennessee Poison Center",
      "U.S. Department of Transportation — Emergency Response Guidebook",
      "CDC/ATSDR Medical Management Guidelines for Acute Chemical Exposures",
      "Claiborne County EMS HazMat, decontamination, respiratory protection, exposure-control, formulary, destination, and Medical Control policies",
    ],
    sourcePdf: "/protocols/claiborne/te-09-chemical-hazmat-exposure-protocol.pdf",
    sourcePages: { start: 1, end: 4 },
    revisionDate: "July 2026",
    lastVerifiedDate: "July 30, 2026",
    reviewStatus: "Reviewed",
    reviewFlags: [
      "Medical-director, HazMat operations, pharmacy/formulary, and agency administrative approval are required before clinical release.",
      "Finalize local decontamination resources, receiving-facility notification, PPE/SCBA limitations, Poison Help documentation, and responder-exposure procedures.",
      "Specialty therapies such as calcium gluconate, nebulized sodium bicarbonate, methylene blue, nitrite therapy, chelation, and CHEMPACK use must appear only if specifically adopted and stocked.",
      "Current Tennessee law, provider scope, Poison Help recommendations, and Claiborne County policy control if any conflict exists.",
    ],
  },
];
