"""Build controlled Claiborne County EMS source PDFs for AR-01 through AR-10.

These documents replace the legacy, state-branded source files.  They are concise
field references derived from the approved native app content for the October
2026 Airway and Respiratory release.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import BaseDocTemplate, Frame, HRFlowable, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT / "public/protocols/claiborne"
TEMP = ROOT / "tmp/pdfs/airway-respiratory-release"
REVISION = "October 17, 2026"

NAVY = HexColor("#143A5A")
RED = HexColor("#A31F34")
PALE_BLUE = HexColor("#EAF2F8")
PALE_RED = HexColor("#F9ECEE")
LIGHT_GRAY = HexColor("#D7DEE4")
MID_GRAY = HexColor("#56616B")
REGULAR = "ClaiborneSans"
BOLD = "ClaiborneSansBold"


def paragraph(text, style):
    return Paragraph(text, style)


def make_styles():
    pdfmetrics.registerFont(TTFont(REGULAR, "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont(BOLD, "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("title", parent=base["Title"], fontName=BOLD, fontSize=17.5, leading=20.5, textColor=NAVY, spaceAfter=2),
        "subtitle": ParagraphStyle("subtitle", parent=base["Normal"], fontName=BOLD, fontSize=8, leading=10, textColor=RED, spaceAfter=7),
        "section": ParagraphStyle("section", parent=base["Heading2"], fontName=BOLD, fontSize=10.3, leading=12.2, textColor=NAVY, spaceBefore=6, spaceAfter=3),
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName=REGULAR, fontSize=7.65, leading=9.25, spaceAfter=2.6),
        "table": ParagraphStyle("table", parent=base["BodyText"], fontName=REGULAR, fontSize=7.0, leading=8.3),
        "table_bold": ParagraphStyle("table_bold", parent=base["BodyText"], fontName=BOLD, fontSize=7.0, leading=8.3),
        "head": ParagraphStyle("head", parent=base["BodyText"], fontName=BOLD, fontSize=7.0, leading=8.3, textColor=colors.white),
        "callout": ParagraphStyle("callout", parent=base["BodyText"], fontName=BOLD, fontSize=7.5, leading=9.1, textColor=NAVY),
        "tiny": ParagraphStyle("tiny", parent=base["BodyText"], fontName=REGULAR, fontSize=6.55, leading=7.75),
    }


def section(title, styles):
    return [Spacer(1, 2), paragraph(title, styles["section"]), HRFlowable(width="100%", thickness=0.65, color=LIGHT_GRAY, spaceAfter=3)]


def callout(text, styles, background=PALE_BLUE):
    table = Table([[paragraph(text, styles["callout"])]], colWidths=[7 * inch])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), background), ("BOX", (0, 0), (-1, -1), 0.55, NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return table


def grid(rows, styles, header=None, widths=(1.38 * inch, 5.62 * inch)):
    data = []
    if header:
        data.append([paragraph(header[0], styles["head"]), paragraph(header[1], styles["head"])])
    data += [[paragraph(left, styles["table_bold"]), paragraph(right, styles["table"])] for left, right in rows]
    table = Table(data, colWidths=list(widths), repeatRows=1 if header else 0)
    commands = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), 0.35, LIGHT_GRAY),
        ("LEFTPADDING", (0, 0), (-1, -1), 5.5), ("RIGHTPADDING", (0, 0), (-1, -1), 5.5),
        ("TOPPADDING", (0, 0), (-1, -1), 3.5), ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
    ]
    if header:
        commands += [("BACKGROUND", (0, 0), (-1, 0), NAVY), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#F7F9FB")])]
    else:
        commands += [("BACKGROUND", (0, 0), (0, -1), PALE_BLUE), ("ROWBACKGROUNDS", (1, 0), (-1, -1), [colors.white, HexColor("#F7F9FB")])]
    table.setStyle(TableStyle(commands))
    return table


def bullets(items, styles):
    return [paragraph(f"• {item}", styles["body"]) for item in items]


PROTOCOLS = [
    {
        "code": "AR-01", "title": "Adult Airway", "file": "ar-01-adult-airway-protocol.pdf",
        "scope": "Adult with actual or threatened obstruction, inadequate oxygenation or ventilation, or inability to protect the airway. A secure airway is one that provides effective oxygenation and ventilation, not simply an advanced device.",
        "flow": [
            ("1. Assess", "Rate, work, patency, oxygenation, ventilation, and mental status."),
            ("2. Basic first", "Position, suction, OPA/NPA, and two-person BVM with PEEP when indicated."),
            ("3. Escalate", "All levels: oxygen/BVM. AEMT/Paramedic: authorized NIPPV or BIAD. Paramedic: intubation when clinically indicated."),
            ("4. Confirm", "Waveform EtCO2 after ETT/BIAD, secure, monitor, and transport. Use AR-02 if ineffective."),
        ],
        "providers": [
            ("EMT", "Position/open the airway, suction, basic adjuncts, oxygen, and effective two-person BVM with PEEP when indicated. Do not delay transport solely to place an advanced airway."),
            ("AEMT", "All EMT care plus authorized BIAD placement and continuous waveform capnography once available. ETT and video laryngoscopy are not AEMT procedures in this protocol."),
            ("Paramedic", "All prior care plus ETT, DAI when authorized, advanced-airway selection, chest decompression when indicated, and surgical airway for cannot-oxygenate/cannot-ventilate failure."),
        ],
        "safety": ["Target adult ventilation at approximately 10-12 breaths/min with visible chest rise; use EtCO2 and clinical response to avoid hyperventilation.", "No more than three total intubation attempts by the most experienced Paramedic. Every further attempt must meaningfully change provider, approach, positioning, or equipment.", "Effective BVM is an acceptable definitive field airway. Do not delay oxygenation or ventilation for repeated laryngoscopy.", "Use DOPE for sudden deterioration: displacement, obstruction, pneumothorax, equipment failure."],
        "links": "AR-02 Adult Failed Airway; AR-03 Drug-Assisted Airway; AR-08 Post-Intubation / BIAD Management.",
    },
    {
        "code": "AR-02", "title": "Adult Failed Airway", "file": "ar-02-adult-failed-airway-protocol.pdf",
        "scope": "Use when the patient cannot be oxygenated or ventilated, anatomy is unsafe for continued attempts, or the most experienced Paramedic has made three unsuccessful laryngoscopy attempts.",
        "flow": [
            ("1. Declare", "Stop repeated laryngoscopy; call for the most experienced airway provider and rescue devices."),
            ("2. Optimize BVM", "Position, suction, OPA/NPA, mask seal, PEEP, high-flow oxygen, and two-person technique."),
            ("3. Rescue", "If BVM remains ineffective: AEMT/Paramedic authorized BIAD; Paramedic deliberate changed video-laryngoscopy rescue or surgical airway when required."),
            ("4. Confirm", "Waveform EtCO2, secure device, post-airway care, immediate transport, and early notification."),
        ],
        "providers": [
            ("EMT", "Stop further attempts and continue BVM when it maintains SpO2 at least 92% with adequate ventilation."),
            ("AEMT", "All EMT care plus authorized BIAD placement; do not perform ETT placement or video laryngoscopy. Confirm BIAD with waveform capnography."),
            ("Paramedic", "Proceed to surgical cricothyrotomy only when less-invasive methods cannot oxygenate or ventilate. Avoid added laryngoscopy after three attempts or when anatomy makes success unlikely."),
        ],
        "safety": ["If BVM maintains SpO2 at least 92% with adequate ventilation, use it as the definitive field airway and begin transport.", "Do not abandon effective BVM merely to obtain an advanced airway.", "Ventilate approximately 10-12 breaths/min with visible chest rise; use EtCO2 and clinical response to avoid hyperventilation.", "Use DOPE for sudden deterioration after airway placement."],
        "links": "AR-01 Adult Airway; AR-03 Drug-Assisted Airway; AR-08 Post-Intubation / BIAD Management.",
    },
    {
        "code": "AR-03", "title": "Drug-Assisted Airway", "file": "ar-03-airway-drug-assisted-intubation-protocol.pdf",
        "scope": "Optional high-risk Paramedic procedure for airway protection failure, inadequate oxygenation/ventilation, or impending compromise when less-invasive care is inadequate. Requires agency authorization, documented competency, performance improvement, and at least two Paramedics on scene.",
        "flow": [
            ("1. Prepare", "Two Paramedics, monitoring, suction, BVM/PEEP, primary and rescue airway, and surgical-airway plan."),
            ("2. Preoxygenate", "High-flow oxygen, NIPPV when appropriate, or two-person BVM/PEEP. Correct hypoxia and hypotension first."),
            ("3. Medicate", "Select one induction agent and the appropriate paralytic; proceed immediately to placement."),
            ("4. Confirm", "Waveform EtCO2, bilateral exam, tube depth, SpO2, securement. If ineffective: BVM/BIAD and AR-02."),
        ],
        "providers": [
            ("EMT", "Assist with preoxygenation, suction, BVM, equipment preparation, monitoring, and backup-airway readiness."),
            ("AEMT", "All EMT care plus authorized vascular access, rescue-BIAD support, monitoring, and failed-airway-plan assistance."),
            ("Paramedic", "Verify indication, authorization, staffing, rescue capability, resuscitation, medications, and post-airway pain-first care before medication."),
        ],
        "safety": ["Do not perform DAI for convenience, merely because BVM is effective, or for a short transport when BVM/BIAD safely maintains oxygenation and ventilation.", "Limit laryngoscopy to three total attempts; each later attempt must change the provider, approach, position, or equipment.", "Do not routinely repeat rocuronium before post-intubation analgesia and sedation are established.", "Pediatric use requires a direct online order from the Claiborne EMS Medical Director or Assistant Medical Director."],
        "medications": [("Ketamine", "1-2 mg/kg IV/IO; if no access: 4 mg/kg IM, max 400 mg"), ("Etomidate", "0.3 mg/kg IV/IO"), ("Succinylcholine", "1-2 mg/kg IV for RSI"), ("Rocuronium", "1 mg/kg IV/IO when indicated"), ("Fentanyl", "25-50 mcg IV/IO; repeat cautiously, max 100 mcg"), ("Midazolam", "2-5 mg IV/IO; repeat cautiously after analgesia")],
        "links": "AM-05 Hypotension / Shock; AM-07 Crashing Medical Patient; AR-02 Adult Failed Airway; AR-08 Post-Intubation / BIAD Management; Push-Dose Epinephrine reference.",
    },
    {
        "code": "AR-04", "title": "Adult COPD / Asthma", "file": "ar-04-copd-asthma-protocol.pdf",
        "scope": "Adult respiratory distress from suspected asthma, COPD, reactive airway disease, bronchospasm, or stridor. Differentiate lower-airway wheeze from upper-airway stridor and other causes of distress.",
        "flow": [
            ("1. Assess", "Work of breathing, speech, air movement, SpO2, lung sounds, mental status, fatigue, and competing causes."),
            ("2. Support", "Position upright, oxygen target, albuterol with ipratropium for moderate/severe bronchospasm."),
            ("3. NIPPV", "AEMT/Paramedic: use early only if cooperative and hemodynamically stable."),
            ("4. Escalate", "Severe/not improving: epinephrine, steroid, magnesium, BVM/advanced-airway preparation, reassessment, transport."),
        ],
        "providers": [
            ("EMT", "Oxygen, comfort position, authorized albuterol, assisted ventilation if tiring, and immediate epinephrine for anaphylaxis within scope."),
            ("AEMT", "All EMT care plus NIPPV for an appropriate patient, vascular access, repeated albuterol/ipratropium, nebulized epinephrine for stridor, and authorized IM epinephrine."),
            ("Paramedic", "All prior care plus cardiac/EtCO2 monitoring when indicated, steroid/magnesium, advanced airway, and evaluation of competing diagnoses."),
        ],
        "safety": ["Target SpO2 93-95% for asthma or undifferentiated hypoxemia. For known COPD with hypercapnia risk, usual lower saturation, or an individualized plan, target 88-92%; never withhold oxygen from critical hypoxemia.", "Do not persist with NIPPV for hypotension, worsening mental status, emesis, inability to protect airway, intolerance, or deteriorating ventilation.", "A silent chest with distress is a pre-arrest finding; do not delay BVM and airway preparation for repeated nebulizers.", "Medication administration follows current Claiborne authorization and standing orders."],
        "medications": [("Albuterol", "2.5-5 mg nebulized; repeat as needed x3 and continue when indicated"), ("Ipratropium", "0.5 mg nebulized with initial albuterol for moderate/severe bronchospasm"), ("Epinephrine 1 mg/mL", "0.3-0.5 mg IM for anaphylaxis, severe upper-airway edema, or life-threatening asthma"), ("Nebulized epinephrine", "1 mg of 1 mg/mL in 2 mL normal saline; may repeat once for stridor/upper-airway edema"), ("Methylprednisolone", "125 mg IV/IO/IM"), ("Magnesium sulfate", "1-2 g IV over 15-30 min for severe nonresponsive bronchospasm")],
        "links": "AR-01 Adult Airway; AR-03 Drug-Assisted Airway; AM-01 Allergic Reaction / Anaphylaxis; AM-05 Hypotension / Shock; AM-07 Crashing Medical Patient.",
    },
    {
        "code": "AR-05", "title": "Pediatric Airway", "file": "ar-05-pediatric-airway-protocol.pdf",
        "scope": "Infant or child after the newly born period with actual or threatened airway obstruction, inadequate oxygenation or ventilation, or inability to protect the airway. Use the length-based pediatric system for equipment and medication support.",
        "flow": [
            ("1. Basic first", "Neutral position, suction, age-appropriate OPA/NPA, and two-person age-sized BVM with PEEP when indicated."),
            ("2. Support", "Oxygen, BVM, authorized BIAD, and Paramedic ETT only when clinically necessary."),
            ("3. Rescue", "If oxygenation/ventilation is ineffective, move immediately to AR-06 Pediatric Failed Airway."),
            ("4. Confirm", "Waveform EtCO2 after ETT/BIAD, chest exam, depth, SpO2, securement, warmth, and transport."),
        ],
        "providers": [
            ("EMT", "Position, suction, basic adjuncts, age-appropriate BVM, warmth, and length-based system. Do not delay transport solely to place an advanced airway."),
            ("AEMT", "All EMT care plus authorized pediatric BIAD, vascular access, and waveform capnography. ETT is not an AEMT procedure in this protocol."),
            ("Paramedic", "All prior care plus ETT when necessary and likely to succeed, chest decompression when indicated, and rare age-appropriate surgical rescue only when specifically authorized."),
        ],
        "safety": ["For inadequate breathing with a pulse, ventilate one breath every 2-3 seconds (20-30/min) with visible chest rise; use EtCO2 when available.", "Limit laryngoscopy to three total attempts. Each later attempt must change provider, approach, position, or equipment; move immediately to AR-06 when ineffective.", "Effective BVM is often safer than a difficult pediatric intubation.", "Pediatric DAI requires a direct online Claiborne EMS Medical Director or Assistant Medical Director order."],
        "links": "AO-02 Newly Born; AR-06 Pediatric Failed Airway; AR-08 Post-Intubation / BIAD Management; PC-02 Pediatric Bradycardia / Poor Perfusion.",
    },
    {
        "code": "AR-06", "title": "Pediatric Failed Airway", "file": "ar-06-pediatric-failed-airway-protocol.pdf",
        "scope": "Use when a child cannot be oxygenated or ventilated, anatomy is unsafe for further attempts, deterioration follows an unsuccessful attempt, or there are three unsuccessful laryngoscopy attempts.",
        "flow": [
            ("1. Declare", "Stop laryngoscopy, call for resources, bring rescue equipment, and optimize BVM immediately."),
            ("2. BVM", "Neutral position, suction, age-appropriate adjuncts, correct mask seal, oxygen, PEEP, and two-person technique."),
            ("3. Rescue", "If BVM ineffective/prolonged ventilation needed: authorized age/size BIAD or deliberate Paramedic rescue."),
            ("4. Confirm", "Waveform EtCO2, secure device, warmth, post-airway care, immediate notification, and transport."),
        ],
        "providers": [
            ("EMT", "Stop attempts and continue BVM as the definitive field airway when it provides effective oxygenation and ventilation."),
            ("AEMT", "All EMT care plus authorized pediatric BIAD and waveform capnography. ETT and video laryngoscopy are not AEMT procedures under this protocol."),
            ("Paramedic", "All prior care plus age/size BIAD or changed deliberate video-laryngoscopy rescue only when BVM is ineffective. Surgical rescue only when age-appropriate and specifically authorized."),
        ],
        "safety": ["Do not wait for three attempts when BVM is ineffective, oxygenation/ventilation is deteriorating, or anatomy is unsafe.", "Judge BVM success by chest rise, SpO2 trend, mental status/perfusion, and waveform EtCO2 when available - not SpO2 alone.", "Do not use repeated blind BIAD or laryngoscopy attempts.", "If HR remains below 60/min with poor perfusion despite oxygenation/ventilation, start CPR and follow PC-02."],
        "links": "AR-05 Pediatric Airway; AR-08 Post-Intubation / BIAD Management; PC-02 Pediatric Bradycardia / Poor Perfusion; PC-04 Pediatric Pulseless Arrest.",
    },
    {
        "code": "AR-07", "title": "Pediatric Respiratory Distress", "file": "ar-07-pediatric-respiratory-distress-protocol.pdf",
        "scope": "Pediatric asthma/reactive airway disease, wheeze, bronchospasm, croup, stridor, bronchiolitis, or other respiratory distress. Differentiate lower-airway, upper-airway, anaphylaxis, foreign-body, and respiratory-failure pathways early.",
        "flow": [
            ("1. Assess", "Appearance, work, air movement, SpO2, mental status, perfusion, fatigue, and position of comfort."),
            ("2. Differentiate", "Wheeze, stridor, bronchiolitis, anaphylaxis, epiglottitis/bacterial tracheitis concern, foreign body, or respiratory failure."),
            ("3. Support", "Least distressing effective oxygen, suction when needed, and pathway-specific bronchodilator or epinephrine."),
            ("4. Escalate", "Severe/impending failure: PM-01 epinephrine when indicated, Medical-Control-directed steroid, magnesium, BVM/airway escalation, and transport."),
        ],
        "providers": [
            ("EMT", "Comfort position, least distressing oxygen, ventilation when tiring, authorized albuterol, PM-01 for anaphylaxis, and supportive care for clear bronchiolitis."),
            ("AEMT", "All EMT care plus access, repeated albuterol, weight-appropriate initial ipratropium, nebulized epinephrine for croup/stridor, and PM-01-directed IM epinephrine."),
            ("Paramedic", "All prior care plus Medical-Control-directed steroid consideration, magnesium for severe asthma, monitoring, and BVM/advanced airway for impending failure."),
        ],
        "safety": ["Do not force a mask on an agitated child who is maintaining oxygenation. Use blow-by or the least distressing effective method.", "For clear bronchiolitis, use supportive care rather than routine bronchodilator or epinephrine.", "Drooling, tripod position, toxic appearance, or rapidly progressive upper-airway symptoms: do not force supine or examine the airway; notify early.", "A silent chest is a pre-arrest finding; do not delay airway support for repeated medication."],
        "medications": [("Albuterol", "Under 20 kg: 2.5 mg nebulized; 20 kg or greater: 5 mg nebulized"), ("Ipratropium", "Under 20 kg: 0.25 mg; 20 kg or greater: 0.5 mg nebulized with initial albuterol for moderate/severe bronchospasm"), ("Nebulized epinephrine", "0.5 mL/kg of 1 mg/mL, max 5 mL (5 mg), for croup/stridor"), ("IM epinephrine", "Use PM-01 Pediatric Allergic Reaction pathway for anaphylaxis or life-threatening asthma"), ("Methylprednisolone", "Medical Control only; no standing pediatric dose"), ("Magnesium sulfate", "40-50 mg/kg IV once over 15-30 min, max 2 g, for severe nonresponsive asthma")],
        "links": "PM-01 Pediatric Allergic Reaction; AR-05 Pediatric Airway; AR-06 Pediatric Failed Airway; PC-02 Pediatric Bradycardia / Poor Perfusion; AO-02 Newly Born.",
    },
    {
        "code": "AR-08", "title": "Post-Intubation / BIAD Management", "file": "ar-08-post-intubation-biad-management-protocol.pdf",
        "scope": "Any patient after successful ETT or BIAD placement, excluding newly born resuscitation immediately after birth. A secure airway requires ongoing confirmation, ventilation, analgesia/sedation when authorized, and reassessment after every movement.",
        "flow": [
            ("1. Confirm", "Continuous waveform EtCO2, bilateral exam, SpO2, tube depth, and securement."),
            ("2. Ventilate", "Manual stabilization with movement, appropriate rate, visible chest rise, and EtCO2-guided reassessment."),
            ("3. Treat pain", "Paramedic adult: analgesia first; add sedation when needed. Pediatric medication requires pediatric pathway/direct order."),
            ("4. Deterioration", "Use DOPE. Disconnect ventilator and manually ventilate if the cause is not immediately clear."),
        ],
        "providers": [
            ("EMT", "Secure/stabilize device, ventilate at appropriate rate, monitor SpO2, recheck after every move, and report loss of waveform, hypoxia, resistance, or changing tube depth."),
            ("AEMT", "All EMT care plus waveform capnography, IV/IO, authorized ventilation support, suctioning, and DOPE assistance. No AEMT authority for post-intubation analgesics, sedatives, or paralytics."),
            ("Paramedic", "All prior care plus adult pain-first analgesia/sedation, mechanical ventilation, and DOPE rescue. Do not apply adult doses to pediatric patients."),
        ],
        "safety": ["Ventilate adults approximately 10-12/min and pediatric patients 20-30/min (one breath every 2-3 seconds), with visible chest rise.", "After ROSC, target adult SpO2 90-98% and pediatric SpO2 94-99% once monitoring is reliable.", "Never stack fentanyl and morphine; select one adult analgesic strategy.", "Propofol may not be initiated or bolused by field Paramedics; an already ordered interfacility infusion may continue when appropriate."],
        "medications": [("Ketamine - adult", "1 mg/kg IV/IO when clinically appropriate"), ("Fentanyl - adult", "25-50 mcg IV/IO; repeat cautiously, max 100 mcg"), ("Morphine - adult alternative", "4 mg IV/IO; repeat 2 mg every 5 min as needed, max 10 mg"), ("Midazolam - adult", "2-5 mg IV/IO; repeat cautiously after analgesia")],
        "links": "AR-03 Drug-Assisted Airway; AR-05 Pediatric Airway; AR-09 Ventilator Emergencies; AR-11 Mechanical Ventilation, Adult.",
    },
    {
        "code": "AR-09", "title": "Ventilator Emergencies", "file": "ar-09-ventilator-emergencies-protocol.pdf",
        "scope": "Ventilator-dependent patient with alarm, failure, hypoxia, abnormal EtCO2, distress, or suspected airway/circuit problem. Treat the patient, not the alarm; never allow troubleshooting to delay manual ventilation.",
        "flow": [
            ("1. Baseline", "Airway type, diagnosis, usual settings, usual SpO2/EtCO2, alarm meaning, and caregiver rescue plan."),
            ("2. Unstable?", "If ventilation/oxygenation is inadequate or the cause is unclear: disconnect and BVM immediately."),
            ("3. Check", "Oxygen, power/battery, circuit, connection/leak, kink, water, filter, settings, and alarm limits."),
            ("4. Resolve", "DOPE and auto-PEEP; resume established settings only when safe or continue BVM and transport."),
        ],
        "providers": [
            ("EMT", "Obtain caregiver baseline, check power/oxygen/circuit, assess tracheostomy/ETT, suction when indicated, use BVM if correction is not rapid, and bring ventilator to hospital."),
            ("AEMT", "All EMT care plus advanced suctioning, tracheostomy/BIAD support, capnography, access when indicated, and troubleshooting assistance."),
            ("Paramedic", "All prior care plus airway and physiologic management. Maintain functioning home settings when appropriate; avoid unneeded changes during transport."),
        ],
        "safety": ["For asthma/COPD or prolonged exhalation, consider auto-PEEP: disconnect, manually ventilate slowly, allow full exhalation, then reassess.", "High-pressure alarm: kink, biting, secretions/plugging, bronchospasm, pneumothorax, or dyssynchrony. Low-pressure: disconnection, leak, cuff leak, loose tubing, or displaced airway.", "Suction when secretions/obstruction are suspected; preoxygenate when possible and never force a catheter.", "Transport with ventilator, power/battery, oxygen reserve, BVM, suction, spare tracheostomy equipment, and caregiver/information when feasible."],
        "links": "AR-08 Post-Intubation / BIAD Management; AR-10 Tracheostomy Tube Emergencies; AR-11 Mechanical Ventilation, Adult.",
    },
    {
        "code": "AR-10", "title": "Tracheostomy Tube Emergencies", "file": "ar-10-tracheostomy-tube-emergencies-protocol.pdf",
        "scope": "Tracheostomy or laryngectomy patient with distress, cyanosis, altered mental status, copious secretions, obstruction, displacement, decannulation, or bleeding. First distinguish tracheostomy from total laryngectomy.",
        "flow": [
            ("1. Identify", "Ask caregiver and inspect stoma/tube. If uncertain, apply oxygen to both face and stoma."),
            ("2. Obstruction", "AEMT/Paramedic: remove valve, cap, HME/filter, and inner cannula. Do not remove voice prosthesis."),
            ("3. Suction", "Use patient-specific catheter/depth when known. Never force resistance."),
            ("4. Rescue", "If catheter will not pass or tube is displaced: deflate cuff, reassess, remove trach tube if obstruction/displacement is established, and ventilate via available airway."),
        ],
        "providers": [
            ("EMT", "Use caregiver/equipment, distinguish tracheostomy vs laryngectomy, provide oxygen, assist stoma ventilation, and prepare suction/replacement equipment."),
            ("AEMT", "All EMT care plus remove simple obstructions, authorized suction, and authorized tracheostomy replacement. ETT through stoma is not an AEMT procedure."),
            ("Paramedic", "All prior care plus persistent obstruction/displacement management. For a mature tract, patient spare tube or one size smaller; cuffed ETT through stoma is a rescue option when necessary."),
        ],
        "safety": ["A confirmed total laryngectomy disconnects the upper airway from the lungs: oxygenate and ventilate through the stoma only.", "For a fresh/immature tract, do not blindly replace the tube because of false-passage risk; prioritize oxygenation/ventilation and rapid transport.", "Deflate cuff before removing a cuffed tracheostomy tube.", "Significant tracheostomy bleeding is potentially life-threatening; expedite transport and contact Medical Control early."],
        "links": "AR-01 Adult Airway; AR-08 Post-Intubation / BIAD Management; AR-09 Ventilator Emergencies.",
    },
]


def build_protocol(item):
    styles = make_styles()
    DESTINATION.mkdir(parents=True, exist_ok=True)
    TEMP.mkdir(parents=True, exist_ok=True)
    target = DESTINATION / item["file"]
    temporary = TEMP / item["file"]

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setTitle(f"Claiborne County EMS {item['code']} {item['title']}")
        canvas.setStrokeColor(LIGHT_GRAY)
        canvas.setLineWidth(0.4)
        canvas.line(doc.leftMargin, 0.53 * inch, letter[0] - doc.rightMargin, 0.53 * inch)
        canvas.setFont(REGULAR, 6.7)
        canvas.setFillColor(MID_GRAY)
        canvas.drawString(doc.leftMargin, 0.35 * inch, f"Claiborne County EMS Clinical Protocols | {item['code']} {item['title']}")
        canvas.drawRightString(letter[0] - doc.rightMargin, 0.35 * inch, f"Page {canvas.getPageNumber()} of 2")
        canvas.restoreState()

    doc = BaseDocTemplate(str(temporary), pagesize=letter, leftMargin=.75 * inch, rightMargin=.75 * inch, topMargin=.63 * inch, bottomMargin=.72 * inch)
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="protocol", frames=[frame], onPage=footer)])
    story = [
        paragraph(f"{item['code']} {item['title']}", styles["title"]),
        paragraph(f"CLAIBORNE COUNTY EMS | MEDICAL-DIRECTOR APPROVED | SOURCE PDF | {REVISION.upper()}", styles["subtitle"]),
        callout(f"<b>Scope:</b> {item['scope']}", styles, PALE_RED),
    ]
    story += section("Field flow", styles)
    story.append(grid(item["flow"], styles))
    story += section("Provider-level actions", styles)
    story.append(grid(item["providers"], styles, header=("Level", "Approved actions")))
    story.append(PageBreak())
    story += [Spacer(1, 14), paragraph(f"{item['code']} {item['title']}", styles["title"]), paragraph("SAFETY, MEDICATION, AND LINKED-PATHWAY REFERENCE", styles["subtitle"])]
    story += section("Safety and escalation", styles)
    story += bullets(item["safety"], styles)
    if item.get("medications"):
        story += section("Medication reference", styles)
        story.append(grid(item["medications"], styles, header=("Medication", "Approved dose / safeguard")))
    story += section("Linked pathways", styles)
    story.append(callout(item["links"], styles))
    story += section("Source control", styles)
    story += bullets([
        f"This controlled direct source PDF replaces the prior source file and matches approved Claiborne EMS app content released {REVISION}.",
        "Use current Claiborne standing orders, formulary, equipment authorization, and Medical Control direction whenever they govern a case-specific decision.",
    ], styles)
    doc.build(story)
    temporary.replace(target)


if __name__ == "__main__":
    for protocol in PROTOCOLS:
        build_protocol(protocol)
        print(f"Generated {protocol['file']}")
