"""Build the approved AC-04 through AC-16 source-PDF replacement batch.

The data below is intentionally a release-form summary of the reviewed native
protocol content.  It is not generated from legacy PDFs: the reviewed app is
the source of truth for this replacement batch.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, HRFlowable, PageBreak, PageTemplate, Paragraph,
    Spacer, Table, TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT / "public/protocols/claiborne"
TMP = ROOT / "tmp/pdfs/adult-cardiac-release"
REVISION = "October 16, 2026"

NAVY = HexColor("#143A5A")
RED = HexColor("#A31F34")
PALE_BLUE = HexColor("#EAF2F8")
PALE_RED = HexColor("#F9ECEE")
LIGHT_GRAY = HexColor("#D7DEE4")
MID_GRAY = HexColor("#56616B")
REGULAR = "ClaiborneSans"
BOLD = "ClaiborneSansBold"


PROTOCOLS = [
    {
        "id": "AC-04", "title": "Acute Coronary Syndrome / STEMI",
        "file": "ac-04-chest-pain-and-stemi-protocol.pdf",
        "scope": "Use for adults age 16 years or older with chest discomfort, an anginal equivalent, or an ECG concerning for acute coronary occlusion.",
        "flow_title": "Rapid ACS and reperfusion pathway",
        "flow": [
            ("1. Assess + monitor", "ABCs, symptom-onset time, complete vital signs, SpO2, monitor, and pads when instability is present or anticipated."),
            ("2. 12-lead early", "Obtain and transmit a diagnostic-quality 12-lead within 10 minutes when feasible. Repeat for persistent/recurrent symptoms, a nondiagnostic tracing, or deterioration."),
            ("3. Aspirin", "Give 324 mg PO chewed unless true aspirin anaphylaxis, active major bleeding, or strong suspicion of acute aortic dissection. Complete a 324-mg loading dose if aspirin was taken before EMS arrival."),
            ("4. Nitroglycerin eligible?", "SBP at least 110 mmHg and no shock, preload dependence/RV infarction, or prohibited recent PDE-5 inhibitor use: 0.4 mg SL every 5 minutes, maximum 3 doses."),
            ("5. Persistent ischemic pain", "Paramedic: fentanyl 25-50 mcg IV/IO; repeat as needed to a maximum total of 100 mcg after aspirin and appropriate nitroglycerin. Use continuous monitoring."),
            ("6. Reperfusion destination", "Early alert and transport to a catheterization-lab capable hospital or Claiborne Medical Center for hospital-directed thrombolytic treatment. Consider Covenant Health Air only when it reduces time to reperfusion-capable care."),
        ],
        "therapy": [
            ("Oxygen", "Only for SpO2 below 90%, respiratory distress, shock, or another clinical indication."),
            ("Hypotension", "Without pulmonary edema, give isotonic crystalloid in cautious 250-mL IV/IO aliquots with reassessment."),
        ],
        "callout": "Target scene time is less than 15 minutes. Air activation must not delay aspirin, ECG acquisition, stabilization, or movement toward ground transport/rendezvous.",
        "safety": [
            "A normal or nondiagnostic initial ECG does not exclude acute myocardial infarction. Transmit early and repeat when the condition changes.",
            "Do not use new or presumed-new left bundle branch block alone as an automatic STEMI criterion.",
            "Withhold aspirin and nitroglycerin when acute aortic dissection is strongly suspected.",
            "Claiborne EMS does not independently administer thrombolytics, heparin, or a P2Y12 inhibitor under AC-04.",
        ],
        "links": [("AC-05", "Pulmonary edema/decompensated heart failure"), ("AC-02", "Bradycardia or poor perfusion"), ("AC-03", "Immediate pathway if pulseless")],
    },
    {
        "id": "AC-05", "title": "CHF / Acute Pulmonary Edema",
        "file": "ac-05-chf-pulmonary-edema-protocol.pdf",
        "scope": "Use for adults age 16 years or older with suspected cardiogenic pulmonary edema or acute decompensated heart failure.",
        "flow_title": "Early ventilation and perfusion pathway",
        "flow": [
            ("1. Position + monitor", "Upright unless hypotensive. Obtain continuous cardiac monitoring, SpO2, frequent BP, focused reassessment, and a 12-lead without delaying respiratory support."),
            ("2. Oxygen", "Titrate to SpO2 92-96%; use 88-92% for known chronic hypercapnic respiratory failure unless severe hypoxemia requires a higher target."),
            ("3. Early CPAP", "For moderate/severe distress with spontaneous breathing, airway protection, mask tolerance, and SBP at least 100 mmHg. Adjustable devices: start 5 cm H2O and titrate to 10 cm H2O."),
            ("4. Nitroglycerin eligible?", "SBP at least 110 mmHg and no shock, preload dependence/RV infarction, or prohibited PDE-5 inhibitor use: 0.4 mg SL every 5 minutes, maximum 3 doses."),
            ("5. Shock or ventilatory failure", "Withhold nitrates; reduce/remove CPAP if perfusion worsens; support ventilation. Avoid routine crystalloid in pulmonary edema."),
            ("6. Persistent cardiogenic shock", "Paramedic: norepinephrine 0.1 mcg/kg/min IV/IO, titrate to MAP at least 65 mmHg or SBP at least 90 mmHg; maximum 2 mcg/kg/min."),
        ],
        "therapy": [("Albuterol", "Use the approved respiratory dose only when true bronchospasm is suspected; wheezing alone may be pulmonary edema."), ("Destination", "Notify early, treat while moving toward transport, and target scene time less than 15 minutes.")],
        "callout": "Do not routinely administer furosemide, another diuretic, opioid, or IV-fluid bolus under AC-05.",
        "safety": ["Do not delay CPAP, ventilation, or transport for IV access or a 12-lead.", "Do not use CPAP for apnea, inadequate spontaneous ventilation, inability to protect the airway, active vomiting, or shock.", "Intubation in cardiogenic shock can precipitate profound hypotension or arrest; optimize oxygenation/hemodynamics and prepare vasopressor support."],
        "links": [("AC-04", "ACS/STEMI or acute coronary occlusion"), ("AM-05", "Persistent hypotension/shock"), ("AR-03", "Drug-assisted airway if CPAP fails"), ("AC-03", "Immediate pathway if pulseless")],
    },
    {
        "id": "AC-06", "title": "Adult Narrow-Complex Tachycardia",
        "file": "ac-06-adult-tachycardia-narrow-protocol.pdf",
        "scope": "Use for adults age 16 years or older with a pulse and a narrow-complex tachycardia. Treat the patient and the cause, not the rate alone.",
        "flow_title": "Narrow-complex rhythm classification and treatment",
        "flow": [
            ("1. Assess context", "Airway/ventilation, oxygen only if hypoxemic, monitor/pads, frequent BP, IV/IO, and 12-lead when it will not delay urgent care. Treat sinus-tachycardia causes."),
            ("2. Instability caused by rhythm?", "Hypotension, acute altered mental status, shock, ischemic chest discomfort, or acute heart failure."),
            ("3. Unstable", "Synchronized cardioversion: regular narrow 100 J; atrial fibrillation or flutter 200 J. Sedate when feasible but never delay shock; confirm synchronization before every attempt."),
            ("4. Stable regular narrow", "Modified Valsalva; no carotid massage. If unsuccessful, adenosine 6 mg rapid IV/IO plus immediate flush, then 12 mg after 1-2 minutes if needed; may repeat 12 mg once."),
            ("5. Stable AF/flutter with RVR", "No routine adenosine. Use rate control only when significantly symptomatic, SBP is at least 110 mmHg, and no AV-nodal-agent contraindication is present."),
            ("6A. Cardizem available", "Diltiazem 0.25 mg/kg IV/IO (maximum 20 mg); if needed, 0.35 mg/kg IV/IO after 15 minutes (maximum 20 mg). An infusion of 5-10 mg/hr requires Medical Control."),
            ("6B. Cardizem unavailable - approved shortage alternative", "Metoprolol 2.5-5 mg IV push over 1 minute every 10 minutes; maximum 3 doses/15 mg. Reassess BP, HR, rhythm, perfusion, respiratory status, and symptoms before every dose."),
        ],
        "therapy": [("Do not use either AV-nodal drug", "Hypotension, cardiogenic shock, acute decompensated HF/suspected systolic dysfunction, ACS, pre-excited AF/flutter, bradycardia/advanced heart block, or undifferentiated wide-complex rhythm."), ("No adequate response/intolerance", "Contact Medical Control. Do not independently combine or sequence diltiazem and metoprolol, and do not use amiodarone as an AV-nodal substitute in this stable AF-with-RVR branch.")],
        "callout": "The metoprolol branch is a single shortage contingency, activated only while Claiborne pharmacy/operations identifies diltiazem as unavailable. It is not a second routine first-line branch.",
        "safety": ["If pre-excited AF/flutter, an undifferentiated wide-complex rhythm, or polymorphic rhythm is suspected, do not give adenosine, diltiazem, metoprolol, digoxin, or amiodarone; open AC-07/AC-08 and contact Medical Control.", "Do not electively cardiovert stable AF/flutter of unknown duration.", "Obtain a post-treatment rhythm strip/12-lead and complete vital signs; monitor for recurrence."],
        "links": [("AC-07", "Monomorphic wide-complex rhythm"), ("AC-08", "Polymorphic wide-complex rhythm"), ("AC-09", "VF/pulseless VT if pulse lost")],
    },
    {
        "id": "AC-07", "title": "Adult Monomorphic Wide-Complex Tachycardia",
        "file": "ac-07-adult-tachycardia-monomorphic-wide-protocol.pdf",
        "scope": "Use for adults age 16 years or older with a pulse and a monomorphic wide-complex tachycardia. Assume ventricular tachycardia when uncertain.",
        "flow_title": "Wide-complex tachycardia pathway",
        "flow": [
            ("1. Confirm pulse + rhythm", "QRS at least 0.12 sec, monomorphic; support airway/ventilation, oxygen if hypoxemic, monitor/pads, BP/SpO2, and IV/IO."),
            ("2. Unstable", "Synchronized cardioversion 100 J biphasic, increase if unsuccessful, confirm sync before every shock, and sedate when feasible without delaying shock."),
            ("3. Stable uncertain origin", "Only if regular and monomorphic: adenosine 6 mg rapid IV/IO plus flush, then 12 mg after 1-2 minutes if needed; may repeat 12 mg once."),
            ("4. Stable monomorphic VT", "Amiodarone 150 mg IV/IO over 10 minutes. If instability develops, stop infusion and cardiovert immediately."),
            ("5. Persistent/recurring VT", "Synchronized cardioversion 100 J for persistent VT. For recurrence, repeat amiodarone 150 mg over 10 minutes once, then infusion 1 mg/min."),
            ("6. Pulse lost", "Begin CPR immediately and open AC-09 VF/Pulseless VT."),
        ],
        "therapy": [("Do not stack antiarrhythmics", "Use the defined amiodarone sequence; do not independently stack multiple antiarrhythmics."), ("Reassess", "Post-treatment strip/12-lead, complete vital signs, early receiving notification, and prepare for recurrence or polymorphic rhythm.")],
        "callout": "Do not administer diltiazem, verapamil, metoprolol, or another AV-nodal blocker for an undifferentiated wide-complex rhythm.",
        "safety": ["Adenosine is restricted to a regular, monomorphic wide-complex rhythm. Never use it for polymorphic, irregular, or pre-excited AF/flutter.", "Do not give amiodarone for suspected torsades, a clearly prolonged-QT polymorphic rhythm, or suspected pre-excited AF/flutter."],
        "links": [("AC-08", "Polymorphic wide-complex rhythm"), ("AC-09", "VF/pulseless VT if pulse lost"), ("AC-10", "Post-resuscitation care after ROSC")],
    },
    {
        "id": "AC-08", "title": "Adult Polymorphic Wide-Complex Tachycardia",
        "file": "ac-08-adult-tachycardia-polymorphic-wide-protocol.pdf",
        "scope": "Use for adults age 16 years or older with a pulse and polymorphic wide-complex tachycardia. Sustained polymorphic VT is unstable until proven otherwise.",
        "flow_title": "Polymorphic VT and torsades pathway",
        "flow": [
            ("1. Confirm rhythm + pads", "Beat-to-beat QRS variation; support airway/ventilation, oxygen if hypoxemic, apply pads immediately, and do not delay shock."),
            ("2. Sustained polymorphic VT", "Treat as unstable regardless of apparent perfusion."),
            ("3. Immediate shock", "Unsynchronized 200 J biphasic; verify the manufacturer setting, escalate according to device, and never attempt synchronization."),
            ("4. Pulse lost", "Begin CPR immediately and open AC-09 VF/Pulseless VT."),
            ("5. Rhythm terminates", "Obtain strip/12-lead and determine whether baseline QT is prolonged."),
            ("6. Long-QT/torsades recurrence", "Magnesium sulfate 1-2 g IV over 15 minutes; may repeat once."),
            ("7. Normal-QT recurrence", "Treat suspected myocardial ischemia; lidocaine 100 mg IV/IO initial dose."),
        ],
        "therapy": [("After conversion", "Pads remain attached; continuous monitoring, frequent vital signs, early notification, and anticipation of recurrence or VF."), ("Underlying cause", "Review drugs, electrolytes, ischemia, bradycardia, and QT prolongation without delaying electrical treatment.")],
        "callout": "For sustained polymorphic VT, do not delay unsynchronized defibrillation to attempt a 12-lead ECG, medication, or synchronization.",
        "safety": ["Do not give adenosine, diltiazem, verapamil, metoprolol, digoxin, or another AV-nodal blocker for polymorphic wide-complex tachycardia.", "Do not use amiodarone for torsades or clearly prolonged-QT polymorphic VT."],
        "links": [("AC-04", "Suspected ischemia/ACS"), ("AC-09", "VF/pulseless VT if pulse lost"), ("AC-10", "Post-resuscitation care after ROSC")],
    },
    {
        "id": "AC-09", "title": "Ventricular Fibrillation / Pulseless VT",
        "file": "ac-09-vf-pulseless-vt-protocol.pdf",
        "scope": "Use for adults age 16 years or older in ventricular fibrillation or pulseless ventricular tachycardia.",
        "flow_title": "Shockable cardiac-arrest pathway",
        "flow": [
            ("1. Start CPR", "High-quality compressions 100-120/min, depth at least 2 in, full recoil, minimal pauses; BVM with oxygen, monitor/defibrillator, and arrest-team activation."),
            ("2. Shock 1", "200 J biphasic; verify manufacturer setting; immediately resume CPR for 2 minutes."),
            ("3. Shock 2", "Same or higher device-appropriate energy; resume CPR immediately; epinephrine 1 mg IV/IO as soon as possible, then every 3-5 minutes."),
            ("4. Shock 3", "Same or higher device-appropriate energy; resume CPR immediately."),
            ("5. Antiarrhythmic", "Amiodarone 300 mg IV/IO after the third shock; may repeat 150 mg once. Alternative: lidocaine 1-1.5 mg/kg IV/IO, then 0.5-0.75 mg/kg every 5-10 min; maximum total 3 mg/kg."),
            ("6. Rhythm every 2 min", "Shockable: shock and resume CPR. Organized rhythm: pulse check. ROSC: AC-10. Persistent arrest: continue cycles, Hs/Ts, and consider AC-12 when eligible."),
        ],
        "therapy": [("Airway + capnography", "Consider advanced airway and waveform capnography only when this does not interrupt compressions or delay defibrillation."), ("Torsades", "For suspected pulseless torsades, magnesium sulfate 1-2 g IV/IO push; may repeat once. Do not use magnesium routinely for other VF/pVT arrests.")],
        "callout": "Defibrillation and compressions take priority over vascular access, medication, airway placement, movement, or a 12-lead.",
        "safety": ["Do not combine amiodarone and lidocaine without Medical Control.", "Resume CPR immediately after every shock and limit pulse checks to organized rhythms/evidence of ROSC.", "Use AC-03 for the coordinated full cardiac-arrest pathway."],
        "links": [("AC-03", "Adult cardiac arrest"), ("AC-10", "Post-resuscitation care after ROSC"), ("AC-12", "Termination of resuscitation criteria")],
    },
    {
        "id": "AC-10", "title": "Post-Resuscitation Care",
        "file": "ac-10-post-resuscitation-protocol.pdf",
        "scope": "Use after sustained return of spontaneous circulation in an adult after cardiac arrest.",
        "flow_title": "Post-ROSC stabilization and destination",
        "flow": [
            ("1. Confirm sustained ROSC", "Pulse, BP/MAP, organized rhythm, and perfusion; keep pads attached and prepare for re-arrest."),
            ("2. Oxygenation", "100% oxygen until a reliable SpO2, then titrate to 90-98%. Use waveform capnography with an advanced airway."),
            ("3. Ventilation", "Begin near 10 breaths/min and target EtCO2 approximately 35-45 mmHg; avoid hyperventilation."),
            ("4. MAP at least 65?", "If low, NS 250-500 mL IV/IO and reassess; use smaller volume for CHF, renal/liver failure, or volume overload."),
            ("5. Persistent hypotension", "Norepinephrine 0.1-2 mcg/kg/min IV/IO, titrated to MAP at least 65 mmHg; alternatives require Medical Control."),
            ("6. ECG + neuro + temperature", "Obtain/transmit 12-lead as feasible, treat glucose below 70, document GCS/pupils/seizures, and prevent fever. No rapid cold-fluid cooling."),
        ],
        "therapy": [("Destination", "PCI-capable center for STEMI, cardiogenic shock, recurrent ventricular arrhythmia, or ongoing ischemia; consider Covenant Health Air when appropriate."), ("Re-arrest", "Immediate return to AC-03/AC-09." )],
        "callout": "AC-13 supplements this protocol. Stabilize airway, ventilation, oxygenation, perfusion, ECG, glucose, and cause-directed care before temperature management.",
        "safety": ["Avoid hyperoxia after reliable SpO2 monitoring and avoid hyperventilation.", "Do not routinely initiate rapid cold IV-fluid cooling; do not rapidly actively rewarm a spontaneously hypothermic patient.", "Repeat ECG if the immediate post-ROSC tracing is nondiagnostic or the condition changes."],
        "links": [("AC-04", "STEMI/ischemia"), ("AC-13", "Post-arrest temperature management"), ("AR-03", "Advanced-airway management")],
    },
    {
        "id": "AC-11", "title": "TEAM-Focused CPR",
        "file": "ac-11-team-focused-cpr-protocol.pdf",
        "scope": "Use for coordinated adult cardiac-arrest resuscitation. This is the required team-performance companion to the rhythm-specific arrest pathways.",
        "flow_title": "Team roles and two-minute cycle",
        "flow": [
            ("1. Recognize arrest", "Start CPR, apply pads/AED, BVM with oxygen, and start the scene timer."),
            ("2. Assign functions", "Leader, compressor 1/2, airway, monitor/defibrillator, IV/medications, and recorder/timer."),
            ("3. High-quality CPR", "100-120/min, depth 2-2.4 in, full recoil, minimal pauses, compression fraction above 80%; switch compressors every 2 minutes or earlier if fatigued."),
            ("4. Ventilation", "30:2 before an advanced airway; then continuous compressions with 1 breath every 6 seconds. Avoid hyperventilation."),
            ("5. Two-minute cycle", "Precharge when possible, rhythm/pulse check 10 seconds or less, shock if indicated, and immediately resume CPR."),
            ("6. Communicate + record", "Closed-loop orders; announce rhythm, shocks/energy, medications, airway, EtCO2, roles, and key times."),
        ],
        "therapy": [("ROSC", "Open AC-10 and AC-13."), ("Persistent arrest", "Continue rhythm-specific care and evaluate AC-12 eligibility; do not use a single finding alone to terminate.")],
        "callout": "No team member should perform a task that delays compression quality, early defibrillation, or the defined rhythm pathway.",
        "safety": ["Pads, rhythm analysis, airway placement, access, and medication must be coordinated around compressions.", "When staffing is limited, prioritize compressor, AED/monitor, BVM/airway, and leader/timekeeper roles; add functions as help arrives.", "Document role assignments, changes, compression-quality interventions, rhythm, shocks, medications, and time-stamped reassessments."],
        "links": [("AC-01", "Asystole/PEA"), ("AC-03", "Adult cardiac arrest"), ("AC-09", "VF/pulseless VT"), ("AC-12", "Termination of resuscitation")],
    },
    {
        "id": "AC-12", "title": "Termination of Resuscitation",
        "file": "ac-12-termination-of-cpr-protocol.pdf",
        "scope": "Use only for adult, nontraumatic out-of-hospital cardiac arrest after ongoing high-quality resuscitation. Medical Control authorization is required.",
        "flow_title": "Adult nontraumatic termination-of-resuscitation rule",
        "flow": [
            ("1. Begin/continue resuscitation", "Follow AC-03/AC-11 and the rhythm pathway for at least 20 minutes of high-quality care, airway/ventilation, access/medications as indicated, and reversible-cause assessment."),
            ("2. Screen exclusions", "Do not use this rule for pediatric, traumatic, hypothermic, poisoning/overdose, pregnancy, mechanical-device, or other special-circumstance arrests; use the linked pathway and Medical Control."),
            ("3. Universal TOR criteria", "All are required: not witnessed by EMS; no shock delivered before transport; and no ROSC before transport."),
            ("4. All three present?", "If no: continue resuscitation and consider transport. If yes: evaluate full clinical context and contact Medical Control."),
            ("5. Medical Control report", "Report criteria/exclusions, care duration, rhythms, shocks, medications, airway/capnography/EtCO2 trend, reversible causes, and any special factors."),
            ("6. Authorization", "If authorized: stop CPR, document time, support family, preserve scene, and follow disposition policy. If not authorized/unavailable: continue resuscitation and transport."),
        ],
        "therapy": [("DNR/MOST/obvious death", "Honor valid directives and follow the separate obvious-death/death-in-field policy; this is not a substitute for that policy."), ("Family", "Use clear, compassionate communication and follow agency death-notification/bereavement procedures.")],
        "callout": "No single EtCO2 value, rhythm, downtime estimate, or absence of a pulse alone authorizes termination.",
        "safety": ["Continue full care while eligibility is evaluated and Medical Control is contacted.", "Document every criterion, exclusion screen, Medical Control physician/order, time of termination, notifications, family support, and disposition."],
        "links": [("AC-03", "Adult cardiac arrest"), ("AC-11", "TEAM-focused CPR"), ("TE-03/TE-05/TE-07", "Drowning, hypothermia, or toxicologic special circumstances")],
    },
    {
        "id": "AC-13", "title": "Post-Arrest Temperature Management",
        "file": "ac-13-targeted-temperature-management-protocol.pdf",
        "scope": "Use after sustained ROSC in an adult as an adjunct to AC-10 post-resuscitation stabilization.",
        "flow_title": "Fever prevention and temperature protection",
        "flow": [
            ("1. Sustained ROSC", "Open AC-10 and stabilize airway, ventilation, perfusion, rhythm, ECG, glucose, and cause-directed care."),
            ("2. Follows verbal commands?", "If yes: continue AC-10 and prevent fever. If no: enter the temperature-management pathway."),
            ("3. Measure temperature", "Use a reliable core or approved method when available; document site and serial trend."),
            ("4. Prevent fever/exposure", "Remove excessive heat sources, maintain a normal environment, and prevent additional heat loss when cold."),
            ("5. No routine field cooling", "Do not rapidly infuse cold IV fluid or initiate uncontrolled active cooling."),
            ("6. Spontaneously hypothermic", "Prevent additional heat loss and avoid rapid active rewarming."),
        ],
        "therapy": [("Monitoring", "ECG, SpO2, BP/MAP, temperature, and EtCO2 with advanced airway; early receiving-facility notification."), ("Seizure", "Treat under the linked seizure protocol and protect airway/ventilation; do not delay transport.")],
        "callout": "The goal is temperature protection and fever prevention, not a separate prehospital hypothermia-induction protocol.",
        "safety": ["AC-13 never replaces AC-10 hemodynamic, oxygenation, ventilation, ECG, glucose, or cause-directed care.", "Do not expose a cold patient to unnecessary heat loss or aggressively warm a spontaneously hypothermic patient."],
        "links": [("AC-10", "Post-resuscitation care"), ("AC-04", "STEMI/ischemia"), ("UP-13", "Seizure")],
    },
    {
        "id": "AC-14", "title": "LVAD Emergency",
        "file": "ac-14-lvad-emergency-protocol.pdf",
        "scope": "Use for a patient with a durable left-ventricular assist device (LVAD). A continuous-flow LVAD may not produce a palpable pulse; assess perfusion and device function together.",
        "flow_title": "Perfusion-first LVAD emergency pathway",
        "flow": [
            ("1. Assess perfusion, not pulse alone", "Mental status, skin temperature/color, capillary refill, BP/MAP when obtainable, ETCO2 if ventilated, breathing, and signs of shock."),
            ("2. Device check in parallel", "Listen for hum, inspect controller alarms/connection, power source, driveline, and spare equipment. Ask patient/caregiver to assist when possible."),
            ("3. Adequate perfusion", "Treat the presenting complaint, continuous monitoring, 12-lead when indicated, and contact the implanting center/LVAD coordinator early."),
            ("4. Poor perfusion", "Correct simple power/connection problems and seek device guidance while treating reversible causes. For hypotension, use cautious fluid if not overloaded and Medical Control as needed."),
            ("5. No effective perfusion", "Begin standard CPR without delaying for prolonged device troubleshooting when the patient is unresponsive with absent/ineffective circulation. Follow AC-03/AC-09."),
            ("6. Transport", "Bring controller, power modules/batteries, spare equipment, and caregiver when feasible. Route to a device-capable center under local plan."),
        ],
        "therapy": [("Electrical therapy", "Use standard EMS defibrillation/cardioversion/pacing when clinically indicated; keep pads clear of device hardware and follow device-center guidance."), ("Bleeding", "Control external hemorrhage and anticipate anticoagulant/antiplatelet therapy until verified otherwise.")],
        "callout": "A nonpalpable pulse alone is not evidence of LVAD arrest. Conversely, do not withhold CPR from a truly unresponsive patient with absent/effectively absent perfusion while waiting for device support.",
        "safety": ["Do not disconnect a driveline, turn off a functioning controller, or disconnect two power sources simultaneously.", "Avoid compression/traction on the driveline and protect equipment during movement.", "Contact the implanting center/LVAD coordinator early; patient-specific device instructions take priority for device operation."],
        "links": [("AC-03", "Adult cardiac arrest"), ("AC-09", "VF/pulseless VT"), ("AC-04", "ACS/STEMI"), ("AM-05", "Hypotension/shock")],
    },
    {
        "id": "AC-15", "title": "Total Artificial Heart Emergency",
        "file": "ac-15-total-mechanic-circulation-protocol.pdf",
        "scope": "Use for a patient with a SynCardia total artificial heart (TAH). It is not an LVAD; restore driver output rather than applying a generic cardiac-arrest algorithm.",
        "flow_title": "TAH driver and perfusion pathway",
        "flow": [
            ("1. Identify TAH", "Pulsatile flow is usually present. Identify external driver, two pneumatic drivelines, power source, alarms, caregiver, and backup driver."),
            ("2. Assess circulation", "Pulse/BP when obtainable, mental status, skin perfusion, breathing, ETCO2 if ventilated, and signs of shock."),
            ("3. Restore driver output", "Check power, batteries, connections, kinking, alarms, and driver function. Use trained caregiver and SynCardia/implant-center support immediately."),
            ("4. Treat associated problem", "Support airway/ventilation and use complaint-specific care after driver function is restored. Control bleeding and evaluate stroke, infection, or shock."),
            ("5. Hypotension/poor perfusion after driver check", "Cautious NS 250-mL IV/IO boluses with reassessment only when appropriate; contact Medical Control and transplant center."),
            ("6. Transport", "Bring driver, batteries/power, backup equipment, caregiver, and device information. Route to the TAH-capable/implanting center as directed."),
        ],
        "therapy": [("High BP/pulmonary edema", "Nitroglycerin 0.4 mg SL every 5 minutes only for SBP at least 150 mmHg and maintain SBP at least 90 mmHg."), ("Emergency support", "SynCardia Clinical Emergency Support: 866-771-9437 (qualified healthcare providers).")],
        "callout": "Do not perform manual or mechanical chest compressions on a TAH patient. Do not use AED/defibrillation, cardioversion, pacing, antiarrhythmics, or routine ACLS drugs to treat TAH pump failure.",
        "safety": ["Do not disconnect both pneumatic drivelines simultaneously, disassemble the driver, or force a damaged connection.", "Do not confuse a TAH with an LVAD; AC-14 does not apply to TAH pump failure.", "The trained caregiver and transplant coordinator are key clinical resources and may be most familiar with the equipment."],
        "links": [("AC-14", "Use only if device is confirmed LVAD, not TAH"), ("AR-01", "Airway/ventilatory failure"), ("UP-14", "Focal neurologic deficit/stroke"), ("AM-05", "Concurrent non-device shock after output restored")],
    },
    {
        "id": "AC-16", "title": "Wearable Cardioverter-Defibrillator Vest",
        "file": "ac-16-wearable-cardioverter-defibrillator-vest-protocol.pdf",
        "scope": "Use for a patient wearing a ZOLL LifeVest or another wearable cardioverter-defibrillator who is symptomatic, shocked, has a device alarm, or is in cardiac arrest.",
        "flow_title": "LifeVest warning, handoff, and EMS takeover",
        "flow": [
            ("1. Assess patient + alert", "Standard assessment; determine whether device is silent, has a single gong, announces treatment was delivered, or produces a two-tone treatment siren."),
            ("2. Active treatment siren?", "If prompt says response buttons should be pressed or bystanders must not interfere, a shock is likely."),
            ("3. Clear patient", "Stop contact/CPR briefly, clear everyone, and allow device treatment. Only the patient may press response buttons."),
            ("4. Siren stops/CPR prompt", "Immediately reassess pulse and breathing; start/resume CPR when indicated."),
            ("5. EMS takes over", "Pull battery first; remove/disconnect vest; clean/dry chest; apply EMS pads; use AC-03/AC-09 when indicated."),
            ("6. Pulse present/post-shock", "Continuous monitor, 12-lead, assess ACS/dysrhythmia, inspect skin, document shock/symptoms, and transport."),
        ],
        "therapy": [("Electrical therapy", "Before external defibrillation, cardioversion, or pacing, disconnect the LifeVest monitor from the electrode belt. Keep EMS pads clear of vest electrodes and gel."), ("Equipment", "Bring garment, monitor, battery, charger/hotspot, extra battery, and stored-event information to hospital.")],
        "callout": "Never touch the patient during the active treatment warning or while a LifeVest shock is being delivered. Resume CPR immediately when the warning ends or the device prompts CPR.",
        "safety": ["Never press response buttons for the patient; only the patient may use them as a consciousness test.", "If vest is removed, rinse away blue conductive gel with water and dry chest before EMS pad placement.", "Do not delay an indicated EMS shock while troubleshooting, collecting equipment, or contacting technical support."],
        "links": [("AC-03", "Adult cardiac arrest"), ("AC-04", "ACS/STEMI after shock"), ("AC-07/AC-08", "Perfusing ventricular dysrhythmia"), ("AC-09", "VF/pulseless VT once EMS assumes defibrillation")],
    },
]


def p(text, style):
    return Paragraph(text, style)


def make_styles():
    pdfmetrics.registerFont(TTFont(REGULAR, "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont(BOLD, "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("title", parent=base["Title"], fontName=BOLD, fontSize=19, leading=22, textColor=NAVY, spaceAfter=2),
        "subtitle": ParagraphStyle("subtitle", parent=base["Normal"], fontName=BOLD, fontSize=8.0, leading=10.5, textColor=RED, spaceAfter=9),
        "section": ParagraphStyle("section", parent=base["Heading2"], fontName=BOLD, fontSize=11, leading=13, textColor=NAVY, spaceBefore=7, spaceAfter=4),
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName=REGULAR, fontSize=8.1, leading=10.2, spaceAfter=3),
        "table": ParagraphStyle("table", parent=base["BodyText"], fontName=REGULAR, fontSize=7.25, leading=8.85),
        "table_bold": ParagraphStyle("table_bold", parent=base["BodyText"], fontName=BOLD, fontSize=7.25, leading=8.85),
        "table_head": ParagraphStyle("table_head", parent=base["BodyText"], fontName=BOLD, fontSize=7.25, leading=8.85, textColor=colors.white),
        "callout": ParagraphStyle("callout", parent=base["BodyText"], fontName=BOLD, fontSize=7.9, leading=9.7, textColor=NAVY),
    }


def section(title, styles):
    return [Spacer(1, 2), p(title, styles["section"]), HRFlowable(width="100%", thickness=0.65, color=LIGHT_GRAY, spaceAfter=4)]


def callout(text, styles, background=PALE_BLUE):
    table = Table([[p(text, styles["callout"])]], colWidths=[7.0 * inch])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), background), ("BOX", (0, 0), (-1, -1), 0.55, NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return table


def grid(rows, styles, header=None, widths=(1.7 * inch, 5.3 * inch)):
    data = []
    if header:
        data.append([p(header[0], styles["table_head"]), p(header[1], styles["table_head"])])
    data += [[p(left, styles["table_bold"]), p(right, styles["table"])] for left, right in rows]
    table = Table(data, colWidths=list(widths), repeatRows=1 if header else 0)
    commands = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), 0.35, LIGHT_GRAY),
        ("LEFTPADDING", (0, 0), (-1, -1), 6), ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 4.5), ("BOTTOMPADDING", (0, 0), (-1, -1), 4.5),
    ]
    if header:
        commands += [("BACKGROUND", (0, 0), (-1, 0), NAVY), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#F7F9FB")])]
    else:
        commands += [("BACKGROUND", (0, 0), (0, -1), PALE_BLUE), ("ROWBACKGROUNDS", (1, 0), (-1, -1), [colors.white, HexColor("#F7F9FB")])]
    table.setStyle(TableStyle(commands))
    return table


def bullets(items, styles):
    return [p(f"- {item}", styles["body"]) for item in items]


def header_footer(protocol, canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LIGHT_GRAY)
    canvas.setLineWidth(0.4)
    canvas.line(doc.leftMargin, 0.53 * inch, letter[0] - doc.rightMargin, 0.53 * inch)
    canvas.setFont(REGULAR, 6.8)
    canvas.setFillColor(MID_GRAY)
    canvas.drawString(doc.leftMargin, 0.35 * inch, f"Claiborne County EMS Clinical Protocols | {protocol['id']} {protocol['title']}")
    canvas.drawRightString(letter[0] - doc.rightMargin, 0.35 * inch, f"Page {canvas.getPageNumber()} of 2")
    canvas.restoreState()


def build(protocol):
    styles = make_styles()
    TMP.mkdir(parents=True, exist_ok=True)
    tmp_path = TMP / protocol["file"]
    out_path = DESTINATION / protocol["file"]
    doc = BaseDocTemplate(str(tmp_path), pagesize=letter, leftMargin=.75 * inch, rightMargin=.75 * inch, topMargin=.63 * inch, bottomMargin=.72 * inch)
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="protocol", frames=[frame], onPage=lambda c, d: header_footer(protocol, c, d))])

    story = [
        p(f"{protocol['id']} {protocol['title']}", styles["title"]),
        p(f"MEDICAL-DIRECTOR APPROVED APP CONTENT | SOURCE-PDF REPLACEMENT | Reconciled {REVISION}", styles["subtitle"]),
        callout(f"<b>Scope:</b> {protocol['scope']}", styles, PALE_RED),
    ]
    story += section(protocol["flow_title"], styles)
    story.append(grid(protocol["flow"], styles))
    story += section("Key treatment and handoff", styles)
    story.append(grid(protocol["therapy"], styles, header=("Item", "Approved action")))
    story += [Spacer(1, 5), callout(protocol["callout"], styles)]
    story.append(PageBreak())
    story += [
        p(f"{protocol['id']} {protocol['title']}", styles["title"]),
        p("SAFETY, LINKED PATHWAYS, AND DOCUMENTATION", styles["subtitle"]),
    ]
    story += section("Safety checks", styles)
    story += bullets(protocol["safety"], styles)
    story += section("Linked pathways", styles)
    story.append(grid(protocol["links"], styles, header=("Pathway", "Use when")))
    story += section("Documentation and release control", styles)
    story += bullets([
        "Document the presenting condition, focused findings, rhythm/ECG when applicable, all interventions with dose/route/time/response, serial vital signs, reassessments, destination decision, and notifications.",
        f"This source PDF replaces the legacy imported sheet and matches the approved Claiborne EMS app content reconciled {REVISION}.",
        "Use the linked protocol whenever the patient crosses into another clinical pathway. Follow agency release governance, training requirements, and current medication/device availability.",
    ], styles)
    doc.build(story)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    tmp_path.replace(out_path)


if __name__ == "__main__":
    for item in PROTOCOLS:
        build(item)
    print(f"Built {len(PROTOCOLS)} Adult Cardiac protocol PDFs.")
