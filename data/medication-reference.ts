export type MedicationProviderLevel = "EMT" | "AEMT" | "Paramedic";

export interface MedicationDoseReference {
  level: MedicationProviderLevel;
  indication: string;
  adult: string;
  pediatric: string;
  /** Conditional AEMT access remains disabled until separately verified by the agency. */
  conditionalAemt?: boolean;
  /** Governing order for this indication/route/age-specific row. */
  protocolLink?: { label: string; href: string };
  releaseNote?: string;
}

export interface MedicationReference {
  id: string;
  name: string;
  tradeNames: string[];
  uses: string[];
  doses: MedicationDoseReference[];
  cautions: string[];
  protocolLinks: { label: string; href: string }[];
  /** True unless this is a protocol-specific preparation rather than a stocked formulary row. */
  isFormularyItem?: boolean;
}

export const medicationReferenceSource = {
  "label": "Claiborne County EMS RX-R1 Formulary — 42 verified stocked medications plus protocol-specific references",
  "href": "https://www.tn.gov/content/dam/tn/health/events/TN%20State%20Guidelines%202024-2025%2009.11.2025.pdf",
  "reviewed": "October 31, 2026"
};

export const medicationReferences: MedicationReference[] = [
  {
    "id": "acetaminophen",
    "name": "Acetaminophen",
    "tradeNames": [
      "Tylenol",
      "Ofirmev"
    ],
    "uses": [
      "Pain",
      "Fever"
    ],
    "doses": [
      {
        "level": "EMT",
        "indication": "Pain — oral",
        "adult": "UP-11, age 16 and older: 650–1,000 mg PO once.",
        "pediatric": "PM-04, age 2 to <16: 15 mg/kg PO once; maximum 650 mg. Under age 2: Medical Control.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      },
      {
        "level": "EMT",
        "indication": "Uncomfortable fever — oral",
        "adult": "650–1,000 mg PO.",
        "pediatric": "Older than 3 months: 15 mg/kg PO; maximum 650 mg. Use UP-10 for assessment and exclusions.",
        "protocolLink": {
          "label": "UP-10 Fever",
          "href": "/protocols/up/up-10"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Adult pain — IV/IO; AEMT authorization pending",
        "adult": "Age 16 and older: weight ≥50 kg, 1,000 mg; weight <50 kg, 15 mg/kg (maximum 750 mg). Infuse over 15 minutes once; never rapid push. Allow at least 6 hours after the previous acetaminophen dose; no EMS repeat. Total from all routes: ≤4,000 mg/24 hours at ≥50 kg, or ≤75 mg/kg/24 hours (maximum 3,750 mg) below 50 kg.",
        "pediatric": "IV/IO acetaminophen is not a standing-order pediatric analgesic under PM-04; use its oral/nonpharmacologic options.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        },
        "conditionalAemt": true,
        "releaseNote": "IO use requires separate verified authorization; never establish IO solely for pain. Expanded AEMT use remains disabled pending verification."
      }
    ],
    "cautions": [
      "Check severe liver disease, allergy, suspected overdose, prior dose/time, and all acetaminophen sources against the route-, weight- and indication-specific dose limits. Do not repeat when previous dose/time is uncertain.",
      "Do not give IV/IO acetaminophen solely for uncomplicated fever. Do not establish IO solely for pain in a stable patient.",
      "AEMT expanded analgesia is not enabled while authorization is unverified. Current Tennessee authority for the exact drug/route, documented applicable education, agency competency/credentialing, and medical-director orders for the drug, route, indication, and age group are all required; course completion or selecting AEMT view alone is not authorization."
    ],
    "protocolLinks": [
      {
        "label": "Pain Control - Adult",
        "href": "/protocols/up/up-11"
      },
      {
        "label": "Pediatric Pain Control",
        "href": "/protocols/pm/pm-04"
      },
      {
        "label": "Fever",
        "href": "/protocols/up/up-10"
      }
    ]
  },
  {
    "id": "adenosine",
    "name": "Adenosine",
    "tradeNames": [
      "Adenocard"
    ],
    "uses": [
      "Narrow-complex tachycardia",
      "Wide-complex tachycardia"
    ],
    "cautions": [
      "Use only for a stable regular rhythm under the applicable tachycardia protocol.",
      "Give as a rapid push through the most proximal practical access with an immediate flush and continuous rhythm recording.",
      "Do not use for an irregular rhythm, sinus tachycardia, or active severe bronchospasm.",
      "Contact Medical Control before reduced-dose administration in a heart-transplant patient or through central venous access."
    ],
    "protocolLinks": [
      {
        "label": "Adult Narrow-Complex Tachycardia",
        "href": "/protocols/ac/ac-06"
      },
      {
        "label": "Pediatric Narrow-Complex Tachycardia",
        "href": "/protocols/pc/pc-05"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "Narrow-tach; wide-tach",
        "adult": "First dose 6 mg rapid IV push with immediate flush; then 12 mg rapid IV push after 1–2 minutes if needed; may repeat the 12 mg dose once",
        "pediatric": "First dose 0.1 mg/kg rapid IV/IO push (maximum 6 mg); then 0.2 mg/kg after 1–2 minutes if needed (maximum 12 mg)"
      }
    ]
  },
  {
    "id": "albuterol",
    "name": "Albuterol",
    "tradeNames": [
      "Proventil",
      "Ventolin"
    ],
    "uses": [
      "Asthma/COPD",
      "Allergic reaction",
      "Hyperkalemia"
    ],
    "doses": [
      {
        "level": "EMT",
        "indication": "Bronchospasm — inhaled",
        "adult": "Nebulized 2.5–5 mg; MDI 2 puffs inhaled.",
        "pediatric": "Under 20 kg: 2.5 mg nebulized; 20 kg or greater: 5 mg nebulized.",
        "protocolLink": {
          "label": "AR-04 Adult COPD / Asthma",
          "href": "/protocols/ar/ar-04"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AM-03 suspected hyperkalemia with a pulse — nebulized",
        "adult": "10 mg by nebulizer. Do not administer nebulized albuterol during cardiac arrest.",
        "pediatric": "The prior pediatric formulary reference is under 15 kg: 10 mg; 15 kg or greater: 15 mg. This is not a PM-04 analgesic or a pediatric standing order under adult AM-03; obtain the separate pediatric order/Medical Control.",
        "protocolLink": {
          "label": "AM-03 Hyperkalemia / Renal Failure",
          "href": "/protocols/am/am-03"
        },
        "releaseNote": "No automatic repeat interval is authorized here. Confirm pediatric eligibility and repeat/cumulative limits in a separately approved order before use; the former generic every-2-hour instruction is not carried into AM-03."
      }
    ],
    "cautions": [
      "Reassess heart rate, work of breathing, air movement, and response.",
      "For anaphylaxis, albuterol is adjunctive and does not replace IM epinephrine.",
      "High-dose hyperkalemia treatment is Paramedic-only, distinct from EMT bronchospasm care. Do not give nebulized albuterol during cardiac arrest."
    ],
    "protocolLinks": [
      {
        "label": "Adult COPD / Asthma",
        "href": "/protocols/ar/ar-04"
      },
      {
        "label": "Pediatric Respiratory Distress",
        "href": "/protocols/ar/ar-07"
      },
      {
        "label": "AM-03 Hyperkalemia / Renal Failure",
        "href": "/protocols/am/am-03"
      }
    ]
  },
  {
    "id": "amiodarone",
    "name": "Amiodarone",
    "tradeNames": [
      "Cordarone"
    ],
    "uses": [
      "Shock-refractory VF/pulseless VT",
      "Stable monomorphic VT with a pulse"
    ],
    "cautions": [
      "Administration rate and repeat dosing depend on whether a pulse is present."
    ],
    "protocolLinks": [
      {
        "label": "Adult VF / Pulseless VT",
        "href": "/protocols/ac/ac-09"
      },
      {
        "label": "Pediatric VF / Pulseless VT",
        "href": "/protocols/pc/pc-07"
      },
      {
        "label": "AC-07 Adult Monomorphic Wide-Complex Tachycardia",
        "href": "/protocols/ac/ac-07"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "AC-09 / PC-07 shock-refractory VF/pulseless VT",
        "adult": "First dose 300 mg IV/IO; second dose 150 mg IV/IO. Paramedic standing order for VF/pVT refractory to the third shock. Administer during CPR without interrupting compressions. Do not combine with lidocaine without Medical Control.",
        "pediatric": "5 mg/kg IV/IO for shock-refractory VF/pulseless VT; maximum 300 mg. Select one antiarrhythmic only unless Medical Control directs otherwise.. ",
        "protocolLink": {
          "label": "AC-09 Ventricular Fibrillation / Pulseless VT",
          "href": "/protocols/ac/ac-09"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AC-07 stable adult monomorphic VT with a pulse",
        "adult": "150 mg IV/IO over 10 minutes. Paramedic standing order for stable monomorphic VT with a pulse. Stop the infusion and cardiovert immediately if instability develops. After conversion, if VT recurs, repeat 150 mg over 10 minutes once and begin maintenance infusion at 1 mg/min. Do not combine with another antiarrhythmic without Medical Control.",
        "pediatric": "PC-06 antiarrhythmic agent and dose require Medical Control; do not extrapolate this adult order.",
        "protocolLink": {
          "label": "AC-07 Adult Monomorphic Wide-Complex Tachycardia",
          "href": "/protocols/ac/ac-07"
        }
      }
    ]
  },
  {
    "id": "aspirin",
    "name": "Aspirin",
    "tradeNames": [
      "ASA"
    ],
    "uses": [
      "Chest pain",
      "Suspected acute coronary syndrome"
    ],
    "cautions": [
      "Confirm allergy, active bleeding, and whether an adequate dose was already taken."
    ],
    "protocolLinks": [
      {
        "label": "Acute Coronary Syndrome / STEMI",
        "href": "/protocols/ac/ac-04"
      }
    ],
    "doses": [
      {
        "level": "EMT",
        "indication": "Chest pain / suspected ACS",
        "adult": "324 mg chewed",
        "pediatric": "N/A"
      }
    ]
  },
  {
    "id": "atropine",
    "name": "Atropine",
    "tradeNames": [
      "Atropine sulfate"
    ],
    "uses": [
      "Symptomatic bradycardia"
    ],
    "cautions": [
      "Follow the cause-specific bradycardia pathway. Do not delay ventilation, CPR or indicated pacing.",
      "This cardiac dosing row does not establish a toxicologic antidote order."
    ],
    "protocolLinks": [
      {
        "label": "AC-02 Bradycardia With a Pulse",
        "href": "/protocols/ac/ac-02"
      },
      {
        "label": "PC-02 Pediatric Bradycardia",
        "href": "/protocols/pc/pc-02"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "AC-02 adult / PC-02 pediatric symptomatic bradycardia",
        "adult": "1 mg IV/IO; repeat every 3–5 minutes to maximum total 3 mg. For bradycardia causing cardiopulmonary compromise; do not delay indicated pacing.",
        "pediatric": "0.02 mg/kg IV/IO for increased vagal tone or primary AV block; minimum 0.1 mg; maximum single dose 0.5 mg child / 1 mg adolescent; may repeat once; maximum total 1 mg child / 2 mg adolescent.",
        "protocolLink": {
          "label": "AC-02 Bradycardia With a Pulse",
          "href": "/protocols/ac/ac-02"
        }
      }
    ]
  },
  {
    "id": "calcium",
    "name": "Calcium Chloride / Gluconate",
    "tradeNames": [
      "Calcium chloride",
      "Calcium gluconate"
    ],
    "uses": [
      "Hyperkalemia/arrhythmia",
      "Calcium-channel blocker toxicity",
      "Calcium replacement"
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "Hyperkalemia/arrhythmia — calcium chloride IV/IO",
        "adult": "500–1,000 mg IV/IO. May repeat once after 5–10 minutes for persistent life-threatening ECG changes. Use AM-03 indication and monitoring requirements.",
        "pediatric": "20 mg/kg IV/IO reference; not a pediatric standing order under adult AM-03. Pediatric indication and limits require the separate order/Medical Control.",
        "protocolLink": {
          "label": "AM-03 Hyperkalemia / Renal Failure",
          "href": "/protocols/am/am-03"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Hyperkalemia/arrhythmia — calcium gluconate IV",
        "adult": "1.5–3 g IV initial; maximum 3 g per episode. Preferred for peripheral IV administration. For persistent life-threatening ECG changes, do not repeat without a specific Medical Control order confirming cumulative dose.",
        "pediatric": "60–100 mg/kg IV/IO reference; pediatric eligibility and limits require the separate order/Medical Control.",
        "protocolLink": {
          "label": "AM-03 Hyperkalemia / Renal Failure",
          "href": "/protocols/am/am-03"
        },
        "releaseNote": "For persistent life-threatening ECG changes, do not repeat calcium gluconate without a specific Medical Control order confirming cumulative dose. The AM-03 standing-order maximum is 3 g per episode."
      },
      {
        "level": "Paramedic",
        "indication": "Calcium-channel blocker toxicity / other calcium indications",
        "adult": "Use the condition-specific order; do not transfer the hyperkalemia regimen to another indication.",
        "pediatric": "Use the separately approved pediatric indication-specific order or Medical Control.",
        "protocolLink": {
          "label": "TE-07 Overdose / Toxic Ingestion",
          "href": "/protocols/te/te-07"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AO-03 clinically significant magnesium toxicity — Medical Control",
        "adult": "Stop magnesium sulfate; calcium gluconate 1 g IV slowly with Medical Control.",
        "pediatric": "Pregnancy-related indication: follow AO-03 and Medical Control for age-specific care.",
        "protocolLink": {
          "label": "AO-03 OB-GYN Emergency",
          "href": "/protocols/ao/ao-03"
        }
      }
    ],
    "cautions": [
      "Verify calcium salt, concentration, route, indication, and cumulative dose. Calcium chloride and gluconate are alternatives; do not give both as the initial calcium treatment.",
      "Calcium gluconate is preferred through a peripheral IV. Monitor continuously for extravasation; calcium chloride can cause severe tissue injury.",
      "Do not mix calcium and bicarbonate or infuse simultaneously through the same tubing; flush thoroughly between medications."
    ],
    "protocolLinks": [
      {
        "label": "AM-03 Hyperkalemia / Renal Failure",
        "href": "/protocols/am/am-03"
      },
      {
        "label": "Overdose / Toxic Ingestion",
        "href": "/protocols/te/te-07"
      },
      {
        "label": "AO-03 OB-GYN Emergency",
        "href": "/protocols/ao/ao-03"
      }
    ]
  },
  {
    "id": "dexamethasone",
    "name": "Dexamethasone",
    "tradeNames": [
      "Decadron"
    ],
    "uses": [
      "Allergic reaction",
      "Asthma/COPD",
      "Croup/stridor"
    ],
    "cautions": [
      "Steroid effect is delayed and does not replace epinephrine, bronchodilator, airway, or ventilation care."
    ],
    "protocolLinks": [
      {
        "label": "Adult COPD / Asthma",
        "href": "/protocols/ar/ar-04"
      },
      {
        "label": "Pediatric Respiratory Distress",
        "href": "/protocols/ar/ar-07"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "Allergic reaction; asthma/COPD; croup/stridor",
        "adult": "10 mg IV/IO or IM",
        "pediatric": "0.6 mg/kg"
      }
    ]
  },
  {
    "id": "dexmedetomidine",
    "name": "Dexmedetomidine",
    "tradeNames": [
      "Precedex"
    ],
    "uses": [
      "Advanced sedation",
      "Pain"
    ],
    "cautions": [
      "Continuous airway, respiratory, cardiac, and blood-pressure monitoring is required.",
      "Watch for bradycardia and hypotension."
    ],
    "protocolLinks": [
      {
        "label": "Post-Intubation / BIAD Management",
        "href": "/protocols/ar/ar-08"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "Advanced sedation / pain",
        "adult": "0.2-1.5 mcg/kg/hr",
        "pediatric": "Same as adult formulary dose"
      }
    ]
  },
  {
    "id": "dextrose",
    "name": "Dextrose",
    "tradeNames": [
      "D10W",
      "D25W",
      "D50W"
    ],
    "uses": [
      "Hypoglycemia"
    ],
    "cautions": [
      "Pediatric D10 dosing is weight-based, not age-based.",
      "Verify concentration, patient weight, vascular patency, and maximum volume before administration.",
      "Recheck glucose and clinical response."
    ],
    "protocolLinks": [
      {
        "label": "Pediatric Diabetic Emergency",
        "href": "/protocols/pm/pm-02"
      },
      {
        "label": "Altered Mental Status",
        "href": "/protocols/up/up-04"
      }
    ],
    "doses": [
      {
        "level": "AEMT",
        "indication": "Hypoglycemia",
        "adult": "D10: up to 250 mL IV/IO, titrated to improving mental status and glucose at least 70 mg/dL; maximum 25 g",
        "pediatric": "D10: 2 mL/kg IV/IO (0.2 g/kg); recheck glucose and neurologic status after 5 min; may repeat once"
      }
    ]
  },
  {
    "id": "diazepam",
    "name": "Diazepam",
    "tradeNames": [
      "Valium",
      "Diastat"
    ],
    "uses": [
      "Chemical restraint",
      "Seizures"
    ],
    "cautions": [
      "Not an automatically authorized alternative to the active seizure or agitation pathway. This reference entry does not establish an administration order or expand scope.",
      "Monitor ventilation, oxygenation, blood pressure, and sedation depth."
    ],
    "protocolLinks": [
      {
        "label": "UP-13 active seizure pathway (not an order for this drug)",
        "href": "/protocols/up/up-13"
      },
      {
        "label": "UP-18 active agitation pathway (not an order for this drug)",
        "href": "/protocols/up/up-18"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "REFERENCE ONLY — no active standing order established",
        "adult": "No active adult standing-order regimen is established in this app. Medical Control must specify indication, dose, route, rate, repeat interval and maximum within verified Paramedic scope.",
        "pediatric": "Historical formulary reference only, NOT an administration order: 0.2 mg/kg IV/IO; 0.5 mg/kg IM/PR. No active pediatric route-specific regimen, repeat interval or maximum is established here; obtain an explicit Medical Control order within verified scope."
      }
    ]
  },
  {
    "id": "diltiazem",
    "name": "Diltiazem",
    "tradeNames": [
      "Cardizem"
    ],
    "uses": [
      "Significantly symptomatic stable atrial fibrillation/flutter"
    ],
    "cautions": [
      "Avoid in hypotension, pre-excited atrial fibrillation, or an undifferentiated wide-complex rhythm.",
      "Use only under the applicable rhythm protocol."
    ],
    "protocolLinks": [
      {
        "label": "Adult Narrow-Complex Tachycardia",
        "href": "/protocols/ac/ac-06"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "AC-06 stable symptomatic AF/flutter with SBP ≥110 mmHg",
        "adult": "0.25 mg/kg IV/IO (maximum 20 mg); if needed, 0.35 mg/kg IV/IO after 15 minutes (maximum 20 mg); infusion 5–10 mg/hr. Paramedic standing order for significantly symptomatic stable atrial fibrillation/flutter when SBP is at least 110 mmHg. For prolonged transport, an infusion of 5–10 mg/hr requires Medical Control. Avoid with hypotension, acute decompensated heart failure, suspected systolic dysfunction, acute coronary syndrome, pre-excitation, or an undifferentiated wide-complex rhythm.",
        "pediatric": "Medical Control; no pediatric standing order under AC-06.",
        "protocolLink": {
          "label": "AC-06 Adult Narrow-Complex Tachycardia",
          "href": "/protocols/ac/ac-06"
        }
      }
    ]
  },
  {
    "id": "diphenhydramine",
    "name": "Diphenhydramine",
    "tradeNames": [
      "Benadryl"
    ],
    "uses": [
      "Abdominal pain/vomiting",
      "Allergic reaction",
      "Acute dystonic / extrapyramidal reaction"
    ],
    "cautions": [
      "May cause sedation, anticholinergic effects, and hypotension.",
      "For dystonia, assess for airway involvement and monitor after administration. Allergy treatment authority does not establish dystonia authority; Medical Control cannot expand provider scope."
    ],
    "protocolLinks": [
      {
        "label": "Behavioral / Psychiatric Emergency",
        "href": "/protocols/up/up-17"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "Abdominal pain/vomiting; allergic reaction",
        "adult": "25-50 mg IV/IO or IM",
        "pediatric": "1 mg/kg"
      },
      {
        "level": "Paramedic",
        "indication": "UP-17 acute dystonic / extrapyramidal reaction",
        "adult": "50 mg IV/IO/IM.",
        "pediatric": "Younger than 16 years: 1 mg/kg IV/IO/IM; maximum 50 mg.",
        "protocolLink": {
          "label": "UP-17 Behavioral / Psychiatric Emergency",
          "href": "/protocols/up/up-17"
        },
        "releaseNote": "Paramedic-only for dystonia until specific current Tennessee AEMT authority for this indication/route, competency and signed local orders are documented. AEMT care is recognition, airway assessment/support and requesting Paramedic care."
      }
    ]
  },
  {
    "id": "dopamine",
    "name": "Dopamine",
    "tradeNames": [
      "Intropin"
    ],
    "uses": [
      "Bradycardia",
      "Medical shock"
    ],
    "cautions": [
      "Use an infusion pump, titrate to the protocol endpoint, and monitor for dysrhythmia or extravasation.",
      "The AC-02 regimen is indication-specific. Other shock indications require the applicable protocol or a specific Medical Control order, not extrapolation from this row."
    ],
    "protocolLinks": [
      {
        "label": "Bradycardia With a Pulse",
        "href": "/protocols/ac/ac-02"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "AC-02 persistent unstable adult bradycardia",
        "adult": "5–20 mcg/kg/min IV/IO infusion; titrate to clinical response. Paramedic standing order for persistent unstable bradycardia when atropine is ineffective. Taper slowly after clinical stabilization when appropriate.",
        "pediatric": "No pediatric standing dose is established by AC-02; use the pediatric condition-specific protocol and Medical Control.",
        "protocolLink": {
          "label": "AC-02 Bradycardia With a Pulse",
          "href": "/protocols/ac/ac-02"
        }
      }
    ]
  },
  {
    "id": "epinephrine",
    "name": "Epinephrine",
    "tradeNames": [
      "Adrenalin",
      "EpiPen"
    ],
    "uses": [
      "Anaphylaxis",
      "Cardiac arrest",
      "Bradycardia",
      "Severe upper-airway edema / asthma"
    ],
    "doses": [
      {
        "level": "EMT",
        "indication": "Anaphylaxis — IM",
        "adult": "0.5 mg of 1 mg/mL IM in the lateral thigh; 0.3 mg autoinjector acceptable; repeat every 5 min as needed",
        "pediatric": "0.01 mg/kg of 1 mg/mL IM in the mid-outer thigh; maximum 0.3 mg prepubertal child or 0.5 mg adolescent; repeat every 5 min as needed"
      },
      {
        "level": "AEMT",
        "indication": "AC-01 / AC-03 / AC-09 adult pulseless cardiac arrest — IV/IO",
        "adult": "1 mg of 0.1 mg/mL IV/IO every 3–5 minutes. Follow the rhythm-specific AC-01/AC-03/AC-09 timing; in VF/pulseless VT give after the second shock as soon as possible without delaying CPR or defibrillation.",
        "pediatric": "Use the separate pediatric pulseless-arrest row. Pulseless-arrest authorization does not establish neonatal resuscitation, pulsed bradycardia or vasopressor-infusion authority.",
        "protocolLink": {
          "label": "AC-09 Adult VF / Pulseless VT",
          "href": "/protocols/ac/ac-09"
        }
      },
      {
        "level": "AEMT",
        "indication": "Pediatric pulseless cardiac arrest — IV/IO",
        "adult": "Use the separate adult pulseless-arrest row.",
        "pediatric": "0.01 mg/kg of 0.1 mg/mL IV/IO; maximum single dose 1 mg; repeat every 3–5 minutes. Follow PC-01/PC-04/PC-07 rhythm-specific timing; not a newborn resuscitation order.",
        "protocolLink": {
          "label": "PC-07 Pediatric VF / Pulseless VT",
          "href": "/protocols/pc/pc-07"
        }
      },
      {
        "level": "Paramedic",
        "indication": "PC-02 pediatric bradycardia with poor perfusion — IV/IO",
        "adult": "Use AC-02 for adult bradycardia; this is not an adult IV bolus order.",
        "pediatric": "0.01 mg/kg of 0.1 mg/mL IV/IO; maximum single dose 1 mg; repeat every 3–5 minutes while bradycardia with poor perfusion persists. Follow PC-02 airway, ventilation and CPR priorities. Not a newborn resuscitation order.",
        "protocolLink": {
          "label": "PC-02 Pediatric Bradycardia With Poor Perfusion",
          "href": "/protocols/pc/pc-02"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Persistent unstable bradycardia — infusion",
        "adult": "2–10 mcg/min IV/IO infusion; titrate to clinical response",
        "pediatric": "Use the pediatric cardiac bradycardia pathway"
      },
      {
        "level": "Paramedic",
        "indication": "AR-04 adult stridor/upper-airway edema or AR-07 pediatric croup/stridor — nebulized",
        "adult": "AR-04: 1 mg of 1 mg/mL epinephrine in 2 mL normal saline, nebulized; may repeat once for stridor or upper-airway edema.",
        "pediatric": "AR-07: 0.5 mL/kg of 1 mg/mL epinephrine, maximum 5 mL (5 mg), nebulized for croup/stridor.",
        "protocolLink": {
          "label": "AR-07 Pediatric Respiratory Distress",
          "href": "/protocols/ar/ar-07"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AM-01 refractory anaphylactic shock — infusion with Medical Control",
        "adult": "2–10 mcg/min IV/IO; titrate to SBP ≥90 mmHg or MAP ≥65 mmHg. Paramedic with Medical Control for refractory shock after repeated IM epinephrine and appropriate fluid. Use an infusion pump and continuous cardiac, blood-pressure, and SpO₂ monitoring. Do not give an IV epinephrine bolus under this protocol.",
        "pediatric": "This adult pathway is not a pediatric standing order; use the age-specific protocol and Medical Control.",
        "protocolLink": {
          "label": "AM-01 Allergic Reaction / Anaphylaxis",
          "href": "/protocols/am/am-01"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AM-05 adult shock — infusion alternative",
        "adult": "2–10 mcg/min IV/IO; titrate to adequate perfusion and MAP at least 65 mmHg. Paramedic alternative when norepinephrine is unavailable or significant bradycardia accompanies shock. Use continuous ECG and frequent blood-pressure monitoring.",
        "pediatric": "This adult pathway is not a pediatric standing order; use the age-specific protocol and Medical Control.",
        "protocolLink": {
          "label": "AM-05 Hypotension / Shock",
          "href": "/protocols/am/am-05"
        }
      },
      {
        "level": "Paramedic",
        "indication": "UP-15 pediatric septic shock — Medical Control selection",
        "adult": "Use the separate adult UP-15 norepinephrine pathway.",
        "pediatric": "Medical Control selects epinephrine or norepinephrine and specifies the initial rate (approved range 0.05–0.1 mcg/kg/min), titration increment/interval, ceiling and perfusion target. Do not select solely from a warm/cold label.",
        "protocolLink": {
          "label": "UP-15 Suspected Sepsis",
          "href": "/protocols/up/up-15"
        }
      },
      {
        "level": "AEMT",
        "indication": "AR-04 / AR-07 life-threatening asthma — IM",
        "adult": "AR-04: 0.3–0.5 mg of 1 mg/mL epinephrine IM for life-threatening asthma with poor air movement or impending respiratory failure.",
        "pediatric": "AR-07 uses PM-01: 0.01 mg/kg of 1 mg/mL IM; maximum 0.3 mg prepubertal child or 0.5 mg adolescent. Follow PM-01 reassessment and repeat limits; not a nebulized order.",
        "protocolLink": {
          "label": "AR-04 Adult COPD / Asthma",
          "href": "/protocols/ar/ar-04"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AO-02 newly born resuscitation — HR below 60 with a pulse despite effective ventilation and coordinated compressions",
        "adult": "Newly born resuscitation only; not an adult dosing order.",
        "pediatric": "Epinephrine 0.1 mg/mL (1:10,000): 0.01 mg/kg IV/IO every 3–5 minutes as needed for heart rate below 60 despite effective ventilation and coordinated compressions. Paramedic-only while a pulse is present. Use UVC/IO access when available under AO-02.",
        "protocolLink": {
          "label": "AO-02 Newly Born",
          "href": "/protocols/ao/ao-02"
        }
      }
    ],
    "cautions": [
      "Verify indication, concentration, route, dose, and repeat interval before every administration.",
      "Do not use a routine IV/IO epinephrine bolus for refractory anaphylaxis; follow the applicable anaphylaxis pathway."
    ],
    "protocolLinks": [
      {
        "label": "Adult Allergic Reaction",
        "href": "/protocols/am/am-01"
      },
      {
        "label": "Pediatric Allergic Reaction",
        "href": "/protocols/pm/pm-01"
      },
      {
        "label": "Adult COPD / Asthma",
        "href": "/protocols/ar/ar-04"
      },
      {
        "label": "Pediatric Respiratory Distress",
        "href": "/protocols/ar/ar-07"
      },
      {
        "label": "AM-01 Allergic Reaction / Anaphylaxis",
        "href": "/protocols/am/am-01"
      },
      {
        "label": "AM-05 Hypotension / Shock",
        "href": "/protocols/am/am-05"
      },
      {
        "label": "UP-15 Suspected Sepsis",
        "href": "/protocols/up/up-15"
      },
      {
        "label": "AC-01 Adult Asystole / PEA",
        "href": "/protocols/ac/ac-01"
      },
      {
        "label": "AC-03 Adult Cardiac Arrest",
        "href": "/protocols/ac/ac-03"
      },
      {
        "label": "AC-09 Adult VF / Pulseless VT",
        "href": "/protocols/ac/ac-09"
      },
      {
        "label": "PC-07 Pediatric VF / Pulseless VT",
        "href": "/protocols/pc/pc-07"
      },
      {
        "label": "AR-04 Adult COPD / Asthma",
        "href": "/protocols/ar/ar-04"
      },
      {
        "label": "AR-07 Pediatric Respiratory Distress",
        "href": "/protocols/ar/ar-07"
      },
      {
        "label": "AO-02 Newly Born",
        "href": "/protocols/ao/ao-02"
      }
    ]
  },
  {
    "id": "push-dose-epinephrine",
    "name": "Push-Dose Epinephrine",
    "tradeNames": [],
    "uses": [
      "Temporary bridge for severe hypotension",
      "Peri-intubation hypotension"
    ],
    "isFormularyItem": false,
    "cautions": [
      "Use only a labeled 10 mcg/mL (0.01 mg/mL) syringe. To prepare when a standardized prepared syringe is unavailable: add 1 mL of epinephrine 0.1 mg/mL (1:10,000) to 9 mL normal saline in a 10 mL syringe, then label the syringe with drug and concentration.",
      "Do not administer undiluted epinephrine 1 mg/mL (1:1,000) or the 0.1 mg/mL (1:10,000) cardiac-arrest syringe as a push-dose bolus.",
      "Paramedic use only. Use only as a temporary bridge while a vasoactive infusion is prepared and the underlying cause of shock is treated; use continuous ECG and frequent blood-pressure reassessment.",
      "Do not use for cardiac arrest or under AC-02 Bradycardia With a Pulse. For anaphylaxis, give IM epinephrine immediately under AM-01 or PM-01; push-dose epinephrine does not replace that pathway."
    ],
    "protocolLinks": [
      {
        "label": "Adult Hypotension / Shock",
        "href": "/protocols/am/am-05"
      },
      {
        "label": "Crashing Medical Patient",
        "href": "/protocols/am/am-07"
      },
      {
        "label": "Airway, Drug Assisted",
        "href": "/protocols/ar/ar-03"
      },
      {
        "label": "Pediatric Hypotension / Shock",
        "href": "/protocols/pm/pm-03"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "Severe hypotension / peri-intubation shock — temporary bridge only",
        "adult": "10 mcg slow IV/IO (1 mL of a labeled 10 mcg/mL syringe) every 3–5 min as needed; maximum two total boluses, then Medical Control before any additional dose",
        "pediatric": "0.5–1 mcg/kg slow IV/IO (0.05–0.1 mL/kg of a labeled 10 mcg/mL syringe) every 3–5 min as needed; maximum 10 mcg (1 mL) per dose and two total boluses, then Medical Control before any additional dose"
      }
    ]
  },
  {
    "id": "etomidate",
    "name": "Etomidate",
    "tradeNames": [
      "Amidate"
    ],
    "uses": [
      "Drug-assisted intubation/RSI"
    ],
    "cautions": [
      "DAI dosing is weight-based. Etomidate provides hypnosis without analgesia or ongoing sedation.",
      "Use only with complete airway, paralysis, and post-intubation plans."
    ],
    "protocolLinks": [
      {
        "label": "Airway Drug-Assisted Intubation",
        "href": "/protocols/ar/ar-03"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "DAI/RSI",
        "adult": "0.3 mg/kg IV/IO",
        "pediatric": "0.3 mg/kg IV/IO; pediatric DAI requires direct online Medical Director or Assistant Medical Director order"
      }
    ]
  },
  {
    "id": "fentanyl",
    "name": "Fentanyl",
    "tradeNames": [
      "Sublimaze"
    ],
    "uses": [
      "Pain",
      "Procedures",
      "Advanced sedation"
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "Pain — IV/IO",
        "adult": "UP-11 age 16 and older: 50 mcg slow IV/IO; repeat 25–50 mcg every 5 minutes as needed; maximum total 100 mcg.",
        "pediatric": "PM-04 age 2 to <16: 1 mcg/kg slow IV/IO once; maximum 50 mcg. Medical Control authorization is required before any second dose.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      },
      {
        "level": "Paramedic",
        "indication": "DAI / post-intubation analgesia — IV/IO",
        "adult": "AR-03: 25–50 mcg IV/IO; repeat cautiously as needed; maximum 100 mcg. Use the separate airway/sedation order, not the pain regimen.",
        "pediatric": "Pediatric DAI requires a direct online Medical Director or Assistant Medical Director order; use the pediatric/airway pathway.",
        "protocolLink": {
          "label": "AR-03 Drug-Assisted Airway",
          "href": "/protocols/ar/ar-03"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AC-04 persistent significant ischemic discomfort",
        "adult": "25–50 mcg IV/IO; repeat as needed to a maximum total dose of 100 mcg. Paramedic standing order for persistent significant ischemic discomfort after aspirin and appropriate nitroglycerin. Use continuous cardiac, respiratory, SpO₂, and blood-pressure monitoring. Avoid routine opioid administration; opioids may delay absorption of oral antiplatelet medications.",
        "pediatric": "This adult pathway is not a pediatric standing order; use the age-specific protocol and Medical Control.",
        "protocolLink": {
          "label": "AC-04 Acute Coronary Syndrome / STEMI",
          "href": "/protocols/ac/ac-04"
        }
      },
      {
        "level": "Paramedic",
        "indication": "PC-03 pediatric cardiac pain/anxiety — Medical Control",
        "adult": "Use the adult indication-specific pathway.",
        "pediatric": "1 mcg/kg IV/IO; maximum single dose 50 mcg only with Medical Control for pain/anxiety after airway and perfusion are stabilized. ",
        "protocolLink": {
          "label": "PC-03 Pediatric Pulmonary Edema / CHF",
          "href": "/protocols/pc/pc-03"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AR-08 adult post-airway analgesia",
        "adult": "25–50 mcg IV/IO; repeat cautiously as needed, maximum 100 mcg. Treat pain first. Do not stack with morphine.",
        "pediatric": "Direct online Medical Control or receiving-facility order through the pediatric system.",
        "protocolLink": {
          "label": "AR-08 Post-Intubation / BIAD Management",
          "href": "/protocols/ar/ar-08"
        }
      }
    ],
    "cautions": [
      "Select one opioid for pain; do not combine fentanyl, morphine and hydromorphone under UP-11.",
      "Use continuous SpO₂ and waveform EtCO₂ with opioids; monitor airway, ventilation, mental status, blood pressure, cumulative dose and response.",
      "Claiborne opioid analgesia remains Paramedic-only. AEMT expanded-analgesia coursework does not create a local opioid standing order."
    ],
    "protocolLinks": [
      {
        "label": "Pain Control - Adult",
        "href": "/protocols/up/up-11"
      },
      {
        "label": "Pediatric Pain Control",
        "href": "/protocols/pm/pm-04"
      },
      {
        "label": "AC-04 Acute Coronary Syndrome / STEMI",
        "href": "/protocols/ac/ac-04"
      },
      {
        "label": "PC-03 Pediatric Pulmonary Edema / CHF",
        "href": "/protocols/pc/pc-03"
      },
      {
        "label": "AR-08 Post-Intubation / BIAD Management",
        "href": "/protocols/ar/ar-08"
      }
    ]
  },
  {
    "id": "glucagon",
    "name": "Glucagon",
    "tradeNames": [
      "GlucaGen"
    ],
    "uses": [
      "Hypoglycemia"
    ],
    "cautions": [
      "Nausea and vomiting are common; protect the airway and reassess glucose.",
      "Follow UP-04/PM-02 eligibility and aspiration precautions; this hypoglycemia row is not a toxicologic overdose dosing order."
    ],
    "protocolLinks": [
      {
        "label": "Altered Mental Status",
        "href": "/protocols/up/up-04"
      },
      {
        "label": "Pediatric Diabetic Emergency",
        "href": "/protocols/pm/pm-02"
      },
      {
        "label": "AM-01 Allergic Reaction / Anaphylaxis",
        "href": "/protocols/am/am-01"
      }
    ],
    "doses": [
      {
        "level": "AEMT",
        "indication": "Hypoglycemia — IM when oral glucose is unsafe and vascular access cannot be obtained promptly",
        "adult": "1 mg IM.",
        "pediatric": "Below 20 kg: 0.5 mg IM; 20 kg or above: 1 mg IM.",
        "protocolLink": {
          "label": "UP-04 Altered Mental Status",
          "href": "/protocols/up/up-04"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AM-01 refractory shock/bradycardia in a beta-blocked patient — Medical Control",
        "adult": "1–2 mg IV/IO over 5 minutes. Paramedic with Medical Control for refractory shock or bradycardia in a beta-blocked patient. Prepare for vomiting and protect the airway.",
        "pediatric": "This adult pathway is not a pediatric standing order; use the age-specific protocol and Medical Control.",
        "protocolLink": {
          "label": "AM-01 Allergic Reaction / Anaphylaxis",
          "href": "/protocols/am/am-01"
        }
      }
    ]
  },
  {
    "id": "hydromorphone",
    "name": "Hydromorphone",
    "tradeNames": [
      "Dilaudid"
    ],
    "uses": [
      "Pain"
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "Adult pain — slow IV/IO",
        "adult": "Age 16 and older: 0.5 mg slow IV/IO; repeat 0.5 mg after 10 minutes as needed; maximum total 1 mg.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Adult pain — IM when vascular access unavailable",
        "adult": "Age 16 and older: 0.5–1 mg IM once.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      }
    ],
    "cautions": [
      "Potent opioid: verify dose units, prior analgesics, cumulative dose and ventilation. Select only one opioid; additional dosing beyond UP-11 limits requires Medical Control.",
      "Maintain continuous SpO₂ and waveform EtCO₂, cardiac monitoring, and reassessment every 5–10 minutes."
    ],
    "protocolLinks": [
      {
        "label": "UP-11 Adult Pain Control",
        "href": "/protocols/up/up-11"
      },
      {
        "label": "PM-04 Pediatric Pain Control",
        "href": "/protocols/pm/pm-04"
      }
    ]
  },
  {
    "id": "ibuprofen",
    "name": "Ibuprofen",
    "tradeNames": [
      "Advil",
      "Motrin"
    ],
    "uses": [
      "Pain",
      "Fever"
    ],
    "cautions": [
      "Confirm age, renal disease, GI bleeding, NSAID allergy, pregnancy, and prior NSAID use."
    ],
    "protocolLinks": [
      {
        "label": "Pain Control - Adult",
        "href": "/protocols/up/up-11"
      },
      {
        "label": "Pediatric Pain Control",
        "href": "/protocols/pm/pm-04"
      },
      {
        "label": "Fever",
        "href": "/protocols/up/up-10"
      }
    ],
    "doses": [
      {
        "level": "EMT",
        "indication": "Pain; fever",
        "adult": "400 mg PO",
        "pediatric": "Pain (PM-04, age 2 to <16): 10 mg/kg PO once; maximum 400 mg. Fever: see UP-10."
      }
    ]
  },
  {
    "id": "ipratropium",
    "name": "Ipratropium",
    "tradeNames": [
      "Atrovent"
    ],
    "uses": [
      "Asthma/COPD"
    ],
    "cautions": [
      "Use as an adjunct to albuterol under the respiratory protocol."
    ],
    "protocolLinks": [
      {
        "label": "Adult COPD / Asthma",
        "href": "/protocols/ar/ar-04"
      },
      {
        "label": "Pediatric Respiratory Distress",
        "href": "/protocols/ar/ar-07"
      }
    ],
    "doses": [
      {
        "level": "EMT",
        "indication": "Moderate or severe bronchospasm",
        "adult": "0.5 mg nebulized with the initial albuterol treatment",
        "pediatric": "Under 20 kg: 0.25 mg nebulized; 20 kg or greater: 0.5 mg nebulized, with initial albuterol"
      }
    ]
  },
  {
    "id": "ketamine",
    "name": "Ketamine",
    "tradeNames": [
      "Ketalar"
    ],
    "uses": [
      "RSI",
      "Chemical restraint",
      "Seizures",
      "Pain",
      "Procedures",
      "Sedation"
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "DAI/RSI — IV/IO or IM",
        "adult": "1–2 mg/kg IV/IO; if vascular access is unavailable, 4 mg/kg IM (maximum 400 mg).",
        "pediatric": "Direct online Medical Director or Assistant Medical Director order for pediatric DAI; use the applicable pediatric pathway.",
        "protocolLink": {
          "label": "AR-03 Drug-Assisted Airway",
          "href": "/protocols/ar/ar-03"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Adult pain — IV/IO",
        "adult": "Age 16 and older: 0.3 mg/kg IV/IO slowly over 10 minutes; maximum 30 mg per dose. May repeat every 20 minutes as needed; maximum three total doses. Never rapid IV push.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Adult pain — IN when vascular access unavailable",
        "adult": "Age 16 and older: 0.5–1 mg/kg IN once; maximum 100 mg. Single-dose option under UP-11.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      },
      {
        "level": "Paramedic",
        "indication": "UP-18 adult severe agitation (BARS 7) — IM",
        "adult": "Age 16 and older: 2–4 mg/kg IM; maximum 400 mg. Do not delay treatment attempting vascular access.",
        "pediatric": "Younger than 16: direct Medical Control medication and dose order required before BARS 7 chemical sedation.",
        "protocolLink": {
          "label": "UP-18 Behavioral Agitation / Severe Agitation",
          "href": "/protocols/up/up-18"
        }
      },
      {
        "level": "Paramedic",
        "indication": "UP-18 adult severe agitation (BARS 7) — established IV/IO only",
        "adult": "Age 16 and older: 1 mg/kg IV/IO slowly; maximum 100 mg. Only if access is already safely established; do not attempt IV access in a violently struggling patient solely for this route.",
        "pediatric": "Younger than 16: direct Medical Control medication and dose order required before BARS 7 chemical sedation.",
        "protocolLink": {
          "label": "UP-18 Behavioral Agitation / Severe Agitation",
          "href": "/protocols/up/up-18"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AR-08 adult post-airway sedation",
        "adult": "1 mg/kg IV/IO. Adult alternative for post-airway sedation when clinically appropriate. Pediatric post-airway medication requires the pediatric system and direct online Medical Control or receiving-facility order.",
        "pediatric": "Direct online Medical Control or receiving-facility order through the pediatric system.",
        "protocolLink": {
          "label": "AR-08 Post-Intubation / BIAD Management",
          "href": "/protocols/ar/ar-08"
        }
      }
    ],
    "cautions": [
      "For suspected penetrating eye injury or open globe, do not give ketamine unless expressly authorized by Medical Control under TB-11; preserve this restriction when using an analgesia or airway reference.",
      "Ketamine analgesia, DAI, agitation, seizures, and post-intubation sedation have separate indications, doses and permissions. Do not substitute DAI doses for analgesia.",
      "Continuous airway, ventilation, oxygenation, cardiac, blood-pressure and sedation monitoring are required. Do not routinely start ketamine and an opioid together.",
      "Claiborne ketamine analgesia remains Paramedic-only; AEMT coursework alone does not authorize it.",
      "For BARS 7, do not routinely combine ketamine and midazolam or give prophylactic midazolam after ketamine. If dangerous agitation persists 10 minutes after ketamine, contact Medical Control before repeating ketamine or adding another sedative."
    ],
    "protocolLinks": [
      {
        "label": "Drug-Assisted Airway",
        "href": "/protocols/ar/ar-03"
      },
      {
        "label": "UP-11 Adult Pain Control",
        "href": "/protocols/up/up-11"
      },
      {
        "label": "PM-04 Pediatric Pain Control",
        "href": "/protocols/pm/pm-04"
      },
      {
        "label": "Eye Trauma / Open Globe Safeguards",
        "href": "/protocols/tb/tb-11"
      },
      {
        "label": "Behavioral Agitation / Sedation",
        "href": "/protocols/up/up-18"
      },
      {
        "label": "Seizure",
        "href": "/protocols/up/up-13"
      },
      {
        "label": "AR-08 Post-Intubation / BIAD Management",
        "href": "/protocols/ar/ar-08"
      }
    ]
  },
  {
    "id": "ketorolac",
    "name": "Ketorolac",
    "tradeNames": [
      "Toradol"
    ],
    "uses": [
      "Adult pain"
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "Adult pain — IV; AEMT authorization pending",
        "adult": "Age 16 and older: 15 mg IV once; maximum 15 mg IV. No EMS repeat.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        },
        "conditionalAemt": true
      },
      {
        "level": "Paramedic",
        "indication": "Adult pain — IM; AEMT authorization pending",
        "adult": "Age 16 and older: 30 mg IM once; maximum 30 mg IM. No EMS repeat.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        },
        "conditionalAemt": true
      }
    ],
    "cautions": [
      "Select one route only; do not combine IV and IM doses or exceed the route-specific single-dose maximum. Apply the same dose ceiling in older or low-weight adults.",
      "Avoid with renal disease/transplant, significant dehydration, hypotension, active GI bleeding, NSAID allergy, clinically significant anticoagulant-associated bleeding risk, pregnancy, or recent NSAID administration.",
      "Do not give solely for uncomplicated fever. PM-04 does not authorize pediatric ketorolac standing orders.",
      "AEMT expanded analgesia is not enabled while authorization is unverified. Current Tennessee authority for the exact drug/route, documented applicable education, agency competency/credentialing, and medical-director orders for the drug, route, indication, and age group are all required; course completion or selecting AEMT view alone is not authorization."
    ],
    "protocolLinks": [
      {
        "label": "UP-11 Adult Pain Control",
        "href": "/protocols/up/up-11"
      },
      {
        "label": "PM-04 Pediatric Pain Control",
        "href": "/protocols/pm/pm-04"
      }
    ]
  },
  {
    "id": "labetalol",
    "name": "Labetalol",
    "tradeNames": [
      "Trandate"
    ],
    "uses": [
      "Undifferentiated suspected CVA with severe hypertension",
      "Medical-Control-directed non-stroke hypertensive emergency"
    ],
    "cautions": [
      "Use the standing order only for manually confirmed undifferentiated suspected CVA with SBP >220 or DBP >110; target SBP ≤220 and DBP ≤110. Do not use this target after thrombolysis/TNK.",
      "For any non-stroke hypertensive emergency, use a linked condition-specific pathway or Medical Control; avoid rapid or unmonitored reduction.",
      "Do not give with bradycardia, advanced heart block, acute decompensated heart failure/pulmonary edema, cardiogenic shock, active bronchospasm, bronchial asthma, or known drug hypersensitivity."
    ],
    "protocolLinks": [
      {
        "label": "Hypertension",
        "href": "/protocols/am/am-04"
      },
      {
        "label": "Suspected Stroke",
        "href": "/protocols/up/up-14"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "AM-04 undifferentiated suspected CVA with SBP >220 or DBP >110; other use only under a condition-specific pathway or Medical Control",
        "adult": "Age 16 and older only. Undifferentiated suspected CVA: 10 mg slow IV over 2 min; may repeat 10 mg once after at least 10 min if still SBP >220 or DBP >110; maximum total 20 mg",
        "pediatric": "Not authorized under Adult Medical AM-04; use a pediatric condition-specific pathway or Medical Control"
      }
    ]
  },
  {
    "id": "lidocaine",
    "name": "Lidocaine",
    "tradeNames": [
      "Xylocaine"
    ],
    "uses": [
      "VF/pulseless VT cardiac arrest",
      "Wide-complex tachycardia",
      "Normal-QT polymorphic VT",
      "Conscious IO infusion pain"
    ],
    "cautions": [
      "Track cumulative dose and monitor for neurologic or cardiovascular toxicity.",
      "Do not combine lidocaine with amiodarone for shock-refractory VF/pulseless VT without Medical Control direction.",
      "The IO-pain row is separate from Paramedic-only cardiac/dysrhythmia dosing. After slow administration before the initial forceful flush, flush and use the IO according to the stocked device instructions."
    ],
    "protocolLinks": [
      {
        "label": "Adult VF / Pulseless VT",
        "href": "/protocols/ac/ac-09"
      },
      {
        "label": "Pediatric VF / Pulseless VT",
        "href": "/protocols/pc/pc-07"
      },
      {
        "label": "Venous Access",
        "href": "/protocols/up/up-06"
      },
      {
        "label": "AC-08 Adult Polymorphic Wide-Complex Tachycardia",
        "href": "/protocols/ac/ac-08"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "VF/pulseless VT cardiac arrest; other ventricular dysrhythmias per linked protocol",
        "adult": "VF/pulseless VT cardiac arrest: 1–1.5 mg/kg IV/IO initial; then 0.5–0.75 mg/kg every 5–10 min; maximum total 3 mg/kg. For perfusing ventricular tachycardia, follow the linked protocol.",
        "pediatric": "1 mg/kg IV/IO for shock-refractory VF/pulseless VT; maximum 100 mg. Select one antiarrhythmic only unless Medical Control directs otherwise.. ",
        "protocolLink": {
          "label": "AC-09 Ventricular Fibrillation / Pulseless VT",
          "href": "/protocols/ac/ac-09"
        }
      },
      {
        "level": "AEMT",
        "indication": "UP-06 conscious IO infusion pain — IO only",
        "adult": "20–40 mg IO slowly before the initial forceful flush.",
        "pediatric": "0.5 mg/kg IO slowly; maximum 40 mg.",
        "protocolLink": {
          "label": "UP-06 Venous Access",
          "href": "/protocols/up/up-06"
        },
        "releaseNote": "Use 2% preservative-free, epinephrine-free lidocaine suitable for IV/IO administration. Device training and local authorization are required."
      },
      {
        "level": "Paramedic",
        "indication": "AC-08 recurrent polymorphic VT with normal baseline QT",
        "adult": "100 mg IV/IO initial dose. Paramedic standing order for recurrent polymorphic VT only when the baseline QT interval is normal. Treat associated myocardial ischemia and keep pads attached. Do not substitute lidocaine for immediate defibrillation of a sustained episode.",
        "pediatric": "This adult pathway is not a pediatric standing order; use the age-specific protocol and Medical Control.",
        "protocolLink": {
          "label": "AC-08 Adult Polymorphic Wide-Complex Tachycardia",
          "href": "/protocols/ac/ac-08"
        }
      }
    ]
  },
  {
    "id": "lorazepam",
    "name": "Lorazepam",
    "tradeNames": [
      "Ativan"
    ],
    "uses": [
      "Chemical restraint",
      "Seizures"
    ],
    "cautions": [
      "Not an automatically authorized alternative to the active seizure or agitation pathway. This reference entry does not establish an administration order or expand scope.",
      "Monitor ventilation, oxygenation, blood pressure, and sedation depth."
    ],
    "protocolLinks": [
      {
        "label": "UP-13 active seizure pathway (not an order for this drug)",
        "href": "/protocols/up/up-13"
      },
      {
        "label": "UP-18 active agitation pathway (not an order for this drug)",
        "href": "/protocols/up/up-18"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "REFERENCE ONLY — no active standing order established",
        "adult": "No active adult standing-order regimen is established in this app. Medical Control must specify indication, dose, route, rate, repeat interval and maximum within verified Paramedic scope.",
        "pediatric": "Historical formulary reference only, NOT an administration order: 0.1 mg/kg. No active pediatric route-specific regimen, repeat interval or maximum is established here; obtain an explicit Medical Control order within verified scope."
      }
    ]
  },
  {
    "id": "magnesium",
    "name": "Magnesium Sulfate",
    "tradeNames": [
      "Magnesium"
    ],
    "uses": [
      "Hypomagnesemia",
      "Eclampsia/pre-eclampsia",
      "Tocolysis",
      "Ventricular arrhythmia/torsades",
      "Asthma/COPD"
    ],
    "cautions": [
      "Dose, dilution, rate, and endpoint differ by indication.",
      "Monitor respiratory status, blood pressure, and cardiac rhythm.",
      "Do not infer independent tocolysis, prolonged infusion, or repeat hypomagnesemia standing orders from historical formulary reference dosing. Those indications require a specific applicable protocol/order."
    ],
    "protocolLinks": [
      {
        "label": "OB / GYN Emergency",
        "href": "/protocols/ao/ao-03"
      },
      {
        "label": "Adult COPD / Asthma",
        "href": "/protocols/ar/ar-04"
      },
      {
        "label": "AC-08 Adult Polymorphic Wide-Complex Tachycardia",
        "href": "/protocols/ac/ac-08"
      },
      {
        "label": "AC-09 Ventricular Fibrillation / Pulseless VT",
        "href": "/protocols/ac/ac-09"
      },
      {
        "label": "PC-07 Pediatric VF / Pulseless VT",
        "href": "/protocols/pc/pc-07"
      },
      {
        "label": "AR-07 Pediatric Respiratory Distress",
        "href": "/protocols/ar/ar-07"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "AO-03 eclampsia / suspected eclampsia",
        "adult": "4–6 g IV over 20–30 minutes, then 1–2 g/hr infusion for eclampsia or suspected eclampsia. Primary cause-directed therapy for eclampsia or suspected eclampsia. Continuously monitor ECG, BP, respiratory status, SpO₂, and EtCO₂.",
        "pediatric": "Pregnancy-related indication: follow AO-03 and Medical Control for age-specific care. No unrelated pediatric standing order is created.",
        "protocolLink": {
          "label": "AO-03 OB-GYN Emergency",
          "href": "/protocols/ao/ao-03"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AC-08 recurrent prolonged-QT polymorphic VT/torsades with a pulse",
        "adult": "1–2 g IV over 15 minutes; may repeat once. Paramedic standing order for recurrent polymorphic VT associated with a prolonged QT interval/torsades de pointes. Defibrillation takes priority for any sustained episode. Do not administer routinely when the QT interval is normal. Monitor continuously for hypotension, bradycardia, respiratory depression, and recurrent dysrhythmia.",
        "pediatric": "This adult pathway is not a pediatric standing order; use the age-specific protocol and Medical Control.",
        "protocolLink": {
          "label": "AC-08 Adult Polymorphic Wide-Complex Tachycardia",
          "href": "/protocols/ac/ac-08"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AC-09 / PC-07 pulseless torsades / specified pediatric arrest indication",
        "adult": "1–2 g IV/IO push; may repeat once. Paramedic standing order only for suspected pulseless torsades/long-QT polymorphic VT. Routine magnesium is not indicated for other VF/pVT cardiac arrests.",
        "pediatric": "25–50 mg/kg IV/IO once; maximum 2 g; only for torsades/polymorphic VT or suspected hypomagnesemia. ",
        "protocolLink": {
          "label": "AC-09 Ventricular Fibrillation / Pulseless VT",
          "href": "/protocols/ac/ac-09"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AR-04 / AR-07 severe asthma",
        "adult": "1–2 g IV over 15–30 minutes for severe asthma under AR-04.",
        "pediatric": "40–50 mg/kg IV once over 15–30 minutes; maximum 2 g, for severe asthma not improving after initial bronchodilators. ",
        "protocolLink": {
          "label": "AR-04 Adult COPD / Asthma",
          "href": "/protocols/ar/ar-04"
        }
      }
    ]
  },
  {
    "id": "methylprednisolone",
    "name": "Methylprednisolone",
    "tradeNames": [
      "Solu-Medrol"
    ],
    "uses": [
      "Allergic reaction",
      "Asthma/COPD"
    ],
    "cautions": [
      "Steroid effect is delayed and does not replace immediate airway or bronchodilator therapy."
    ],
    "protocolLinks": [
      {
        "label": "Adult COPD / Asthma",
        "href": "/protocols/ar/ar-04"
      },
      {
        "label": "AR-07 Pediatric Respiratory Distress",
        "href": "/protocols/ar/ar-07"
      },
      {
        "label": "PM-01 Pediatric Anaphylaxis / Allergic Reaction",
        "href": "/protocols/pm/pm-01"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "AR-04 adult moderate/severe asthma or COPD",
        "adult": "125 mg IV/IO or IM.",
        "pediatric": "AR-07: Medical Control only; no standing pediatric dose for asthma/reactive-airway disease. Do not substitute the PM-01 allergy dose.",
        "protocolLink": {
          "label": "AR-04 Adult COPD / Asthma",
          "href": "/protocols/ar/ar-04"
        }
      },
      {
        "level": "Paramedic",
        "indication": "PM-01 pediatric allergic reaction — adjunct",
        "adult": "Use the applicable adult pathway; no separate adult dose is added by this pediatric row.",
        "pediatric": "2 mg/kg IV; maximum 125 mg. Adjunct only; do not delay or replace epinephrine.",
        "protocolLink": {
          "label": "PM-01 Pediatric Anaphylaxis / Allergic Reaction",
          "href": "/protocols/pm/pm-01"
        }
      }
    ]
  },
  {
    "id": "metoprolol",
    "name": "Metoprolol",
    "tradeNames": [
      "Lopressor"
    ],
    "uses": [
      "AF/flutter with RVR during Cardizem shortage"
    ],
    "cautions": [
      "Use only during the approved Cardizem shortage contingency; do not independently combine or sequence with diltiazem.",
      "Avoid with hypotension, bradycardia, advanced heart block, cardiogenic shock, pre-excited atrial fibrillation/flutter, undifferentiated wide-complex rhythm, acute decompensated heart failure, or suspected systolic dysfunction.",
      "Reassess blood pressure, heart rate, rhythm, perfusion, respiratory status, and symptoms before every dose; use caution with bronchospasm."
    ],
    "protocolLinks": [
      {
        "label": "Adult Narrow-Complex Tachycardia",
        "href": "/protocols/ac/ac-06"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "Stable, symptomatic atrial fibrillation/flutter with RVR when diltiazem is unavailable under the approved shortage contingency",
        "adult": "2.5–5 mg IV push over 1 minute every 10 minutes; maximum 3 doses or 15 mg",
        "pediatric": "Medical Control"
      }
    ]
  },
  {
    "id": "midazolam",
    "name": "Midazolam",
    "tradeNames": [
      "Versed"
    ],
    "uses": [
      "Seizures",
      "Chemical restraint",
      "Post-intubation sedation"
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "Seizure — age-specific dosing",
        "adult": "10 mg IM preferred without IV/IO; 10 mg IN alternative; or 5 mg IV/IO when access is established. For IV/IO, repeat 5 mg once after 5 min if seizure continues; maximum total 10 mg",
        "pediatric": "0.2 mg/kg IM/IN, maximum 10 mg; or 0.1 mg/kg IV/IO, maximum 5 mg. May repeat once after 5 min; maximum total 0.4 mg/kg, not to exceed 10 mg Count prescribed prearrival rescue benzodiazepine toward the two-dose episode limit.",
        "protocolLink": {
          "label": "UP-13 Seizure",
          "href": "/protocols/up/up-13"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Adult dangerous agitation (BARS 6)",
        "adult": "Age 16 and older: 2.5 mg IV/IO or 5 mg IM/IN; repeat once after 5 min if dangerous agitation persists after complete airway/hemodynamic reassessment. Maximum: 5 mg IV/IO or 10 mg IM/IN. Age ≥65, frail, significant respiratory disease, or suspected CNS-depressant intoxication: 1–2.5 mg IV/IO or 2.5 mg IM/IN; repeat once only after reassessment; maximum cumulative dose 5 mg.",
        "pediatric": "Younger than 16: 0.1 mg/kg IV/IO or 0.2 mg/kg IM/IN; maximum initial dose 5 mg. Contact Medical Control when feasible before administration; repeat requires Medical Control. Maximum cumulative dose 10 mg.",
        "protocolLink": {
          "label": "UP-18 Behavioral Agitation / Severe Agitation",
          "href": "/protocols/up/up-18"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Adult severe agitation (BARS 7) — alternative when ketamine unavailable or contraindicated",
        "adult": "Age 16 and older: 10 mg IM preferred; 10 mg IN only if IM not feasible. Age ≥65, frail, or increased respiratory risk: 5 mg IM. Follow UP-18 reassessment and Medical Control requirements before additional sedation.",
        "pediatric": "Younger than 16: direct Medical Control medication and dose order required before BARS 7 chemical sedation.",
        "protocolLink": {
          "label": "UP-18 Behavioral Agitation / Severe Agitation",
          "href": "/protocols/up/up-18"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Post-intubation sedation",
        "adult": "2–5 mg IV/IO; repeat cautiously as needed after analgesia",
        "pediatric": "Direct online Medical Control or receiving-facility order"
      },
      {
        "level": "Paramedic",
        "indication": "AC-06 adult electrical-therapy sedation",
        "adult": "2–5 mg IV/IO; use the smallest effective dose. Paramedic procedural sedation for synchronized cardioversion when feasible. Do not delay cardioversion in an unstable patient. Continuous airway, respiratory, SpO₂, cardiac, and blood-pressure monitoring is required.",
        "pediatric": "This adult pathway is not a pediatric standing order; use the age-specific protocol and Medical Control.",
        "protocolLink": {
          "label": "AC-06 Adult Narrow-Complex Tachycardia",
          "href": "/protocols/ac/ac-06"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AC-07 adult electrical-therapy sedation",
        "adult": "2–5 mg IV/IO; use the smallest effective dose. Paramedic sedation for synchronized cardioversion when feasible. Do not delay cardioversion in an unstable patient. Continuous airway, respiratory, SpO₂, cardiac, and blood-pressure monitoring is required.",
        "pediatric": "This adult pathway is not a pediatric standing order; use the age-specific protocol and Medical Control.",
        "protocolLink": {
          "label": "AC-07 Adult Monomorphic Wide-Complex Tachycardia",
          "href": "/protocols/ac/ac-07"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AC-08 adult electrical-therapy sedation",
        "adult": "2–5 mg IV/IO; use the smallest effective dose. Paramedic sedation when a conscious patient requires unsynchronized defibrillation. Do not delay shock delivery for sedation. Continuous airway, respiratory, SpO₂, cardiac, and blood-pressure monitoring is required.",
        "pediatric": "This adult pathway is not a pediatric standing order; use the age-specific protocol and Medical Control.",
        "protocolLink": {
          "label": "AC-08 Adult Polymorphic Wide-Complex Tachycardia",
          "href": "/protocols/ac/ac-08"
        }
      },
      {
        "level": "Paramedic",
        "indication": "PC-05 pediatric cardioversion sedation",
        "adult": "Use the adult electrical-therapy pathway.",
        "pediatric": "0.1–0.2 mg/kg IV/IO/IN for cardioversion; maximum single dose 2 mg, maximum total 5 mg. Use only if immediately available; do not delay synchronized cardioversion. Verify against the current Claiborne pediatric medication reference.",
        "protocolLink": {
          "label": "PC-05 Pediatric Narrow-Complex Tachycardia",
          "href": "/protocols/pc/pc-05"
        }
      },
      {
        "level": "Paramedic",
        "indication": "PC-06 pediatric cardioversion sedation",
        "adult": "Use the adult electrical-therapy pathway.",
        "pediatric": "0.1–0.2 mg/kg IV/IO/IN for cardioversion; maximum single dose 2 mg, maximum total 5 mg. Use only if immediately available; do not delay synchronized cardioversion. Verify against the current Claiborne pediatric medication reference.",
        "protocolLink": {
          "label": "PC-06 Pediatric Wide-Complex Tachycardia",
          "href": "/protocols/pc/pc-06"
        }
      }
    ],
    "cautions": [
      "For agitation, IM is preferred over IN when IM is feasible.",
      "Continuously monitor airway, ventilation, oxygenation, blood pressure, cardiac rhythm, and sedation depth.",
      "Do not routinely combine ketamine and midazolam or give prophylactic midazolam after ketamine. BARS 6, BARS 7, seizure and airway regimens are separate orders."
    ],
    "protocolLinks": [
      {
        "label": "Seizure",
        "href": "/protocols/up/up-13"
      },
      {
        "label": "Behavioral Agitation / Sedation",
        "href": "/protocols/up/up-18"
      },
      {
        "label": "Airway Drug-Assisted Intubation",
        "href": "/protocols/ar/ar-03"
      },
      {
        "label": "Post-Intubation / BIAD Management",
        "href": "/protocols/ar/ar-08"
      },
      {
        "label": "AC-06 Adult Narrow-Complex Tachycardia",
        "href": "/protocols/ac/ac-06"
      },
      {
        "label": "AC-07 Adult Monomorphic Wide-Complex Tachycardia",
        "href": "/protocols/ac/ac-07"
      },
      {
        "label": "AC-08 Adult Polymorphic Wide-Complex Tachycardia",
        "href": "/protocols/ac/ac-08"
      },
      {
        "label": "PC-05 Pediatric Narrow-Complex Tachycardia",
        "href": "/protocols/pc/pc-05"
      },
      {
        "label": "PC-06 Pediatric Wide-Complex Tachycardia",
        "href": "/protocols/pc/pc-06"
      }
    ]
  },
  {
    "id": "morphine",
    "name": "Morphine",
    "tradeNames": [
      "Morphine sulfate"
    ],
    "uses": [
      "Pain"
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "Adult pain — slow IV/IO",
        "adult": "Age 16 and older: 5 mg slow IV/IO; repeat 5 mg after 10 minutes as needed; maximum total 10 mg.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Adult pain — IM when vascular access unavailable",
        "adult": "Age 16 and older: 5–10 mg IM once.",
        "pediatric": "Not authorized as a standing-order pediatric analgesic under PM-04. Use PM-04; contact Medical Control for patients younger than 2 years.",
        "protocolLink": {
          "label": "UP-11 Adult Pain Control",
          "href": "/protocols/up/up-11"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AR-08 adult post-airway analgesia — alternative",
        "adult": "4 mg IV/IO; repeat 2 mg every 5 minutes as needed, maximum 10 mg. Select one analgesic strategy; do not stack with fentanyl.",
        "pediatric": "Direct online Medical Control or receiving-facility order through the pediatric system.",
        "protocolLink": {
          "label": "AR-08 Post-Intubation / BIAD Management",
          "href": "/protocols/ar/ar-08"
        }
      }
    ],
    "cautions": [
      "Monitor airway, ventilation, oxygenation, mental status, blood pressure and cumulative opioid dose. Select only one opioid; additional dosing beyond UP-11 limits requires Medical Control.",
      "Maintain continuous SpO₂ and waveform EtCO₂, cardiac monitoring, and reassessment every 5–10 minutes."
    ],
    "protocolLinks": [
      {
        "label": "UP-11 Adult Pain Control",
        "href": "/protocols/up/up-11"
      },
      {
        "label": "PM-04 Pediatric Pain Control",
        "href": "/protocols/pm/pm-04"
      },
      {
        "label": "AR-08 Post-Intubation / BIAD Management",
        "href": "/protocols/ar/ar-08"
      }
    ]
  },
  {
    "id": "nitroglycerin",
    "name": "Nitroglycerin",
    "tradeNames": [
      "Nitrostat",
      "NTG"
    ],
    "uses": [
      "Chest pain",
      "CHF",
      "Hypertension"
    ],
    "doses": [
      {
        "level": "EMT",
        "indication": "Patient's own prescribed medication",
        "adult": "0.4 mg SL every 5 min; maximum 3 doses",
        "pediatric": "N/A"
      },
      {
        "level": "AEMT",
        "indication": "Agency formulary medication",
        "adult": "0.4 mg SL every 5 min; maximum 3 doses",
        "pediatric": "N/A"
      }
    ],
    "cautions": [
      "Verify blood-pressure threshold, PDE-5 inhibitor use, right-ventricular infarction concern, and protocol indication."
    ],
    "protocolLinks": [
      {
        "label": "Acute Coronary Syndrome / STEMI",
        "href": "/protocols/ac/ac-04"
      }
    ]
  },
  {
    "id": "naloxone",
    "name": "Naloxone",
    "tradeNames": [
      "Narcan"
    ],
    "uses": [
      "Suspected opioid-related respiratory depression"
    ],
    "doses": [
      {
        "level": "EMT",
        "indication": "UP-04 suspected opioid-related respiratory depression — IN only",
        "adult": "2 mg IN; repeat every 2–3 min to adequate ventilation; maximum cumulative dose 8 mg. Retain this local adult order pending confirmation of the stocked product; do not silently substitute a 4 mg spray.",
        "pediatric": "No numeric pediatric IN standing order is established by this update. Confirm stocked product/strength or injectable concentration plus atomizer; obtain a product/device-specific Medical Control dose and administration plan. Do not apply the IV 0.01-to-0.1 mg/kg sequence to IN.",
        "protocolLink": {
          "label": "UP-04 Altered Mental Status",
          "href": "/protocols/up/up-04"
        },
        "releaseNote": "Pediatric IN product, dose, repeat interval, limits and technique require medical-director selection before release. For atomized injectable product, specify deliverable volume, nostril division and device dead-space handling."
      },
      {
        "level": "AEMT",
        "indication": "UP-04 suspected opioid-related respiratory depression — IV/IO/IM only",
        "adult": "0.4–2 mg IV/IO/IM; repeat every 2–3 min and titrate to adequate ventilation; maximum cumulative dose 8 mg.",
        "pediatric": "0.01 mg/kg IV/IO/IM initially; if ventilation remains inadequate, escalate to 0.1 mg/kg; maximum 2 mg per dose. Repeat every 2–3 min to adequate ventilation; maximum cumulative dose 8 mg.",
        "protocolLink": {
          "label": "UP-04 Altered Mental Status",
          "href": "/protocols/up/up-04"
        }
      }
    ],
    "cautions": [
      "Support ventilation immediately; do not delay BVM ventilation while preparing or awaiting naloxone. Titrate to adequate ventilation rather than complete arousal.",
      "If ventilation remains inadequate after 8 mg, continue airway support and reassess the diagnosis.",
      "For resuscitation immediately after birth, follow AO-02 Newly Born; naloxone does not replace neonatal ventilation. This is not an expanded-analgesia privilege."
    ],
    "protocolLinks": [
      {
        "label": "Altered Mental Status",
        "href": "/protocols/up/up-04"
      },
      {
        "label": "Overdose / Toxic Ingestion",
        "href": "/protocols/te/te-07"
      }
    ]
  },
  {
    "id": "norepinephrine",
    "name": "Norepinephrine",
    "tradeNames": [
      "Levophed"
    ],
    "uses": [
      "Bradycardia",
      "Medical shock",
      "Septic shock"
    ],
    "cautions": [
      "Use an infusion pump, titrate to the protocol endpoint, and monitor the access site and distal perfusion.",
      "Indication-specific ceilings are distinct: UP-15 adult septic shock 2 mcg/kg/min; AM-05 adult medical shock 0.5 mcg/kg/min. For other indications, follow the condition-specific protocol. Pediatric initiation and titration require Medical Control; never use “same as adult.”"
    ],
    "protocolLinks": [
      {
        "label": "Hypotension / Shock",
        "href": "/protocols/am/am-05"
      },
      {
        "label": "Adult CHF / Acute Pulmonary Edema",
        "href": "/protocols/ac/ac-05"
      },
      {
        "label": "Sepsis",
        "href": "/protocols/up/up-15"
      },
      {
        "label": "AC-05 CHF / Acute Pulmonary Edema",
        "href": "/protocols/ac/ac-05"
      },
      {
        "label": "AC-10 Post-Resuscitation Care",
        "href": "/protocols/ac/ac-10"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "AM-05 adult medical shock",
        "adult": "0.05–0.5 mcg/kg/min IV/IO infusion; titrate to adequate perfusion and MAP at least 65 mm Hg; maximum 0.5 mcg/kg/min under AM-05.",
        "pediatric": "Do not use the adult AM-05 regimen as a pediatric standing order. Follow the age-specific shock pathway and Medical Control.",
        "protocolLink": {
          "label": "AM-05 Hypotension / Shock",
          "href": "/protocols/am/am-05"
        }
      },
      {
        "level": "Paramedic",
        "indication": "UP-15 adult septic shock",
        "adult": "Start 0.1 mcg/kg/min IV/IO; titrate to MAP ≥65 mm Hg or SBP ≥90 mm Hg; maximum 2 mcg/kg/min.",
        "pediatric": "Persistent pediatric septic shock: Medical Control selects epinephrine or norepinephrine and specifies the initial rate (approved range 0.05–0.1 mcg/kg/min), titration increment/interval, ceiling and perfusion target. Do not select solely from a warm/cold label or use the adult ceiling.",
        "protocolLink": {
          "label": "UP-15 Sepsis",
          "href": "/protocols/up/up-15"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AC-05 persistent adult cardiogenic shock",
        "adult": "Start 0.1 mcg/kg/min IV/IO; titrate to MAP ≥65 mmHg or SBP ≥90 mmHg; maximum 2 mcg/kg/min. Paramedic standing order for persistent cardiogenic shock. Continuous cardiac monitoring, frequent blood-pressure assessment, and careful IV/IO-site surveillance are required. Use a proximal, well-functioning IV or IO and reassess perfusion frequently.",
        "pediatric": "This adult pathway is not a pediatric standing order; use the age-specific protocol and Medical Control.",
        "protocolLink": {
          "label": "AC-05 CHF / Acute Pulmonary Edema",
          "href": "/protocols/ac/ac-05"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AC-10 persistent adult post-ROSC hypotension",
        "adult": "0.1–2 mcg/kg/min IV/IO; titrate to MAP at least 65 mm Hg. Paramedic preferred vasopressor for persistent post-ROSC hypotension after cautious fluid resuscitation. Use continuous cardiac monitoring and frequent blood-pressure reassessment. Alternative post-ROSC vasopressors require Medical Control.",
        "pediatric": "This adult pathway is not a pediatric standing order; use the age-specific protocol and Medical Control.",
        "protocolLink": {
          "label": "AC-10 Post-Resuscitation Care",
          "href": "/protocols/ac/ac-10"
        }
      }
    ]
  },
  {
    "id": "ondansetron",
    "name": "Ondansetron",
    "tradeNames": [
      "Zofran"
    ],
    "uses": [
      "Nausea and vomiting"
    ],
    "cautions": [
      "Avoid with known congenital long-QT syndrome or clinically significant QT prolongation; use caution with electrolyte loss, bradyarrhythmia, or other QT-prolonging medications."
    ],
    "protocolLinks": [
      {
        "label": "Abdominal Pain / Vomiting / Diarrhea",
        "href": "/protocols/up/up-03"
      }
    ],
    "doses": [
      {
        "level": "AEMT",
        "indication": "Abdominal pain / nausea / vomiting",
        "adult": "4 mg IV/IO/IM/PO/ODT; may repeat once after 15 min after reassessment",
        "pediatric": "0.15 mg/kg IV/IO/IM/PO/ODT; maximum 4 mg; may repeat once after 15 min after reassessment"
      }
    ]
  },
  {
    "id": "promethazine",
    "name": "Promethazine",
    "tradeNames": [
      "Phenergan"
    ],
    "uses": [
      "Persistent nausea/vomiting after ondansetron"
    ],
    "cautions": [
      "Deep IM is the only authorized route. Never administer IV or IO.",
      "Avoid with significant CNS depression, inability to protect the airway, or known hypersensitivity."
    ],
    "protocolLinks": [
      {
        "label": "Abdominal Pain / Vomiting / Diarrhea",
        "href": "/protocols/up/up-03"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "UP-03 adult refractory nausea/vomiting after ondansetron",
        "adult": "12.5 mg deep IM once after ondansetron; never IV/IO.",
        "pediatric": "Medical Control; no pediatric standing order.",
        "protocolLink": {
          "label": "UP-03 Abdominal Pain / Vomiting / Diarrhea",
          "href": "/protocols/up/up-03"
        }
      }
    ]
  },
  {
    "id": "propofol",
    "name": "Propofol",
    "tradeNames": [
      "Diprivan"
    ],
    "uses": [
      "Interfacility continuation of an established sedative infusion"
    ],
    "cautions": [
      "Do not initiate or bolus propofol in the field.",
      "Requires continuous airway, ventilation, oxygenation, cardiac, and blood-pressure monitoring.",
      "Propofol has no analgesic effect and may cause profound hypotension or apnea."
    ],
    "protocolLinks": [
      {
        "label": "Post-Intubation / BIAD Management",
        "href": "/protocols/ar/ar-08"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "Continuation of a pre-existing interfacility infusion only",
        "adult": "5–50 mcg/kg/min infusion, continued only according to the sending order",
        "pediatric": "Continuation only according to the sending order and Medical Control direction"
      }
    ]
  },
  {
    "id": "rocuronium",
    "name": "Rocuronium",
    "tradeNames": [
      "Zemuron"
    ],
    "uses": [
      "Drug-assisted intubation/RSI"
    ],
    "cautions": [
      "DAI dosing is weight-based. Establish post-intubation analgesia and sedation promptly; do not routinely repeat before they are established."
    ],
    "protocolLinks": [
      {
        "label": "Airway Drug-Assisted Intubation",
        "href": "/protocols/ar/ar-03"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "DAI/RSI",
        "adult": "1 mg/kg IV/IO when succinylcholine is contraindicated or a longer duration is needed",
        "pediatric": "1 mg/kg IV/IO; pediatric DAI requires direct online Medical Director or Assistant Medical Director order"
      }
    ]
  },
  {
    "id": "sodium-bicarbonate",
    "name": "Sodium Bicarbonate",
    "tradeNames": [
      "Sodium bicarbonate"
    ],
    "uses": [
      "Hyperkalemia",
      "Protocol-specific toxicologic emergency"
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "AM-03 suspected hyperkalemia / severe metabolic acidosis — IV/IO",
        "adult": "1 mEq/kg IV/IO; maximum 50 mEq. Use the AM-03 indication and monitoring safeguards.",
        "pediatric": "No pediatric trauma/hyperkalemia standing order is supplied by adult AM-03. Use a separately approved pediatric order or Medical Control.",
        "protocolLink": {
          "label": "AM-03 Hyperkalemia / Renal Failure",
          "href": "/protocols/am/am-03"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Toxicologic indication — IV/IO",
        "adult": "1 mEq/kg IV/IO reference; use the toxin-specific order for dose, repeat, maximum and clinical endpoint.",
        "pediatric": "1 mEq/kg reference; use the pediatric toxin-specific order for route, repeat, maximum and endpoint.",
        "protocolLink": {
          "label": "TE-07 Overdose / Toxic Ingestion",
          "href": "/protocols/te/te-07"
        }
      }
    ],
    "cautions": [
      "Not routine in every cardiac arrest. Use only the protocol-defined indication; do not transfer a toxicology regimen to traumatic or medical arrest.",
      "Verify concentration and adequate ventilation. Do not mix with calcium or administer simultaneously through the same tubing; flush thoroughly."
    ],
    "protocolLinks": [
      {
        "label": "AM-03 Hyperkalemia / Renal Failure",
        "href": "/protocols/am/am-03"
      },
      {
        "label": "Overdose / Toxic Ingestion",
        "href": "/protocols/te/te-07"
      }
    ]
  },
  {
    "id": "succinylcholine",
    "name": "Succinylcholine",
    "tradeNames": [
      "Anectine"
    ],
    "uses": [
      "Drug-assisted intubation/RSI"
    ],
    "cautions": [
      "DAI dosing is weight-based. Verify contraindications and prepare continuous post-paralysis ventilation, analgesia, and sedation."
    ],
    "protocolLinks": [
      {
        "label": "Airway Drug-Assisted Intubation",
        "href": "/protocols/ar/ar-03"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "DAI/RSI",
        "adult": "1–2 mg/kg IV for RSI",
        "pediatric": "1–2 mg/kg IV for RSI; pediatric DAI requires direct online Medical Director or Assistant Medical Director order"
      }
    ]
  },
  {
    "id": "tranexamic-acid",
    "name": "Tranexamic Acid",
    "tradeNames": [
      "TXA",
      "Cyklokapron"
    ],
    "uses": [
      "Traumatic hemorrhage with clinical shock",
      "Topical epistaxis",
      "Topical dental hemorrhage",
      "Medical-Control-directed bradykinin angioedema"
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "Traumatic hemorrhage with clinical shock — IV/IO",
        "adult": "1–2 g IV/IO: 1 g over 10 minutes OR 2 g over 20 minutes; maximum administration rate 100 mg/min. Verify the stocked concentration and preparation instructions. Do not automatically repeat; further dosing requires a specific order.",
        "pediatric": "15 mg/kg reference. Pediatric systemic trauma TXA is Medical-Control-directed only: obtain the patient-specific eligibility, route, infusion rate, maximum and repeat instructions before administration; no independent pediatric standing-order regimen.",
        "protocolLink": {
          "label": "TB-12 Abdominal / Pelvic Trauma",
          "href": "/protocols/tb/tb-12"
        },
        "releaseNote": "Adult dose/rate options are approved as shown. Verify stocked concentration and preparation instructions; no automatic repeat. Pediatric systemic trauma TXA requires a patient-specific Medical Control order for eligibility, route, infusion rate, maximum and repeat policy. The locally selected 15 mg/kg differs from the Tennessee 20 mg/kg IV reference; current state/route authority and credential verification still apply. Do not infer systemic dosing from topical orders."
      },
      {
        "level": "AEMT",
        "indication": "Persistent atraumatic anterior epistaxis — topical only",
        "adult": "UP-09: 1 g/10 mL total applied to anterior gauze after 15 minutes uninterrupted compression; maintain external pressure for 20 minutes.",
        "pediatric": "UP-09: 15 mg/kg topically; maximum 1 g total, on appropriately sized anterior gauze; maintain external pressure for 20 minutes.",
        "protocolLink": {
          "label": "UP-09 Epistaxis",
          "href": "/protocols/up/up-09"
        }
      },
      {
        "level": "AEMT",
        "indication": "Persistent dental hemorrhage — topical only",
        "adult": "UP-07: TXA 1 g/10 mL to saturate gauze/cotton; pack the bleeding socket and maintain direct pressure for 20 minutes.",
        "pediatric": "Use UP-07 for the pediatric dental indication and Medical Control when the pediatric dose or eligibility is not specified; do not infer a systemic 15 mg/kg regimen.",
        "protocolLink": {
          "label": "UP-07 Dental Problems",
          "href": "/protocols/up/up-07"
        }
      },
      {
        "level": "Paramedic",
        "indication": "Suspected ACE-inhibitor / hereditary bradykinin angioedema — IV/IO with Medical Control",
        "adult": "AM-01: 1 g IV/IO over 10 minutes with Medical Control.",
        "pediatric": "Use a separate pediatric order / Medical Control; the adult AM-01 order is not a pediatric standing order.",
        "protocolLink": {
          "label": "AM-01 Allergic Reaction / Anaphylaxis",
          "href": "/protocols/am/am-01"
        }
      },
      {
        "level": "Paramedic",
        "indication": "AO-03 postpartum hemorrhage with shock — within 3 hours of delivery",
        "adult": "1 g IV/IO over 10 minutes for postpartum hemorrhage with shock when within 3 hours of delivery. Do not use this postpartum order more than 3 hours after delivery.",
        "pediatric": "Pregnancy/postpartum indication only; no non-obstetric pediatric TXA order is created. Follow AO-03 and Medical Control for age-specific care.",
        "protocolLink": {
          "label": "AO-03 OB-GYN Emergency",
          "href": "/protocols/ao/ao-03"
        }
      }
    ],
    "cautions": [
      "Systemic trauma TXA is Paramedic-only: after immediate lifesaving interventions, consider for traumatic hemorrhage with clinical hemorrhagic shock and injury no more than 3 hours earlier. Do not delay transport or hemorrhage control.",
      "Record injury time and TXA dose/time; notify the receiving team to avoid duplicate dosing. Do not infer systemic trauma dosing from topical indications.",
      "Topical nasal/oral TXA is a separate existing AEMT/Paramedic order; EMT administration is not authorized under UP-07/UP-09. The adult trauma 1–2 g range is not a topical dose.",
      "Do not give IV/IO TXA solely for isolated dental bleeding or epistaxis. Do not atomize TXA, or perform deep/blind/posterior nasal packing under UP-09."
    ],
    "protocolLinks": [
      {
        "label": "Multiple Trauma",
        "href": "/protocols/tb/tb-06"
      },
      {
        "label": "Abdominal / Pelvic Trauma",
        "href": "/protocols/tb/tb-12"
      },
      {
        "label": "Epistaxis",
        "href": "/protocols/up/up-09"
      },
      {
        "label": "Dental Problems",
        "href": "/protocols/up/up-07"
      },
      {
        "label": "Allergic Reaction / Anaphylaxis",
        "href": "/protocols/am/am-01"
      },
      {
        "label": "AO-03 OB-GYN Emergency",
        "href": "/protocols/ao/ao-03"
      }
    ]
  },
  {
    "id": "vecuronium",
    "name": "Vecuronium",
    "tradeNames": [
      "Norcuron"
    ],
    "uses": [
      "Drug-assisted intubation/RSI"
    ],
    "cautions": [
      "Paralysis provides no sedation, amnesia, or analgesia.",
      "Confirm ventilation capability and give continuous post-intubation sedation/analgesia."
    ],
    "protocolLinks": [
      {
        "label": "Airway Drug-Assisted Intubation",
        "href": "/protocols/ar/ar-03"
      }
    ],
    "doses": [
      {
        "level": "Paramedic",
        "indication": "DAI/RSI",
        "adult": "DAI: 80–100 mcg/kg IV push once; intermittent maintenance: 10–15 mcg/kg IV every 15 min as needed",
        "pediatric": "DAI: 80–100 mcg/kg IV push once; intermittent maintenance: 50–100 mcg/kg IV every 1 hr as needed; pediatric DAI requires direct online Medical Director or Assistant Medical Director order"
      }
    ]
  }
];
