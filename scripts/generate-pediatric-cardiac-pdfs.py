"""Build controlled Claiborne County EMS source PDFs for PC-01 through PC-08.

The field references below are concise renderings of the medical-director-approved
native Pediatric Cardiac content.  They replace legacy state-branded imports.
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
    BaseDocTemplate,
    Frame,
    HRFlowable,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT / "public/protocols/claiborne"
TEMP = ROOT / "tmp/pdfs/pediatric-cardiac-release"
REVISION = "October 26, 2026"

NAVY = HexColor("#143A5A")
RED = HexColor("#A31F34")
PALE_BLUE = HexColor("#EAF2F8")
PALE_RED = HexColor("#F9ECEE")
LIGHT_GRAY = HexColor("#D7DEE4")
MID_GRAY = HexColor("#56616B")
REGULAR = "ClaiborneSans"
BOLD = "ClaiborneSansBold"


def p(text, style):
    return Paragraph(text, style)


def styles():
    pdfmetrics.registerFont(TTFont(REGULAR, "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont(BOLD, "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("title", parent=base["Title"], fontName=BOLD, fontSize=17.5, leading=20.5, textColor=NAVY, spaceAfter=2),
        "subtitle": ParagraphStyle("subtitle", parent=base["Normal"], fontName=BOLD, fontSize=8, leading=10, textColor=RED, spaceAfter=7),
        "section": ParagraphStyle("section", parent=base["Heading2"], fontName=BOLD, fontSize=10.3, leading=12.2, textColor=NAVY, spaceBefore=6, spaceAfter=3),
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName=REGULAR, fontSize=7.65, leading=9.25, spaceAfter=2.6),
        "table": ParagraphStyle("table", parent=base["BodyText"], fontName=REGULAR, fontSize=7, leading=8.3),
        "table_bold": ParagraphStyle("table_bold", parent=base["BodyText"], fontName=BOLD, fontSize=7, leading=8.3),
        "head": ParagraphStyle("head", parent=base["BodyText"], fontName=BOLD, fontSize=7, leading=8.3, textColor=colors.white),
        "callout": ParagraphStyle("callout", parent=base["BodyText"], fontName=BOLD, fontSize=7.5, leading=9.1, textColor=NAVY),
        "tiny": ParagraphStyle("tiny", parent=base["BodyText"], fontName=REGULAR, fontSize=6.55, leading=7.75),
    }


def heading(title, s):
    return [Spacer(1, 2), p(title, s["section"]), HRFlowable(width="100%", thickness=.65, color=LIGHT_GRAY, spaceAfter=3)]


def callout(text, s, background=PALE_BLUE):
    table = Table([[p(text, s["callout"])]], colWidths=[7 * inch])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), background), ("BOX", (0, 0), (-1, -1), .55, NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return table


def grid(rows, s, header=None):
    data = []
    if header:
        data.append([p(header[0], s["head"]), p(header[1], s["head"])])
    data.extend([[p(left, s["table_bold"]), p(right, s["table"])] for left, right in rows])
    table = Table(data, colWidths=[1.5 * inch, 5.5 * inch], repeatRows=1 if header else 0)
    commands = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), .35, LIGHT_GRAY),
        ("LEFTPADDING", (0, 0), (-1, -1), 5.5), ("RIGHTPADDING", (0, 0), (-1, -1), 5.5),
        ("TOPPADDING", (0, 0), (-1, -1), 3.5), ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
    ]
    if header:
        commands += [("BACKGROUND", (0, 0), (-1, 0), NAVY), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#F7F9FB")])]
    else:
        commands += [("BACKGROUND", (0, 0), (0, -1), PALE_BLUE), ("ROWBACKGROUNDS", (1, 0), (-1, -1), [colors.white, HexColor("#F7F9FB")])]
    table.setStyle(TableStyle(commands))
    return table


def bullets(items, s):
    return [p(f"• {item}", s["body"]) for item in items]


PROTOCOLS = [
    {
        "code": "PC-01", "title": "Pediatric Asystole / PEA", "file": "pc-01-pediatric-asytole-pea-protocol.pdf",
        "scope": "Pulseless infant or child after the newly born period with asystole or pulseless electrical activity (PEA). Effective ventilation, high-quality CPR, and reversible-cause treatment are central interventions.",
        "flow": [
            ("1. Confirm", "Apnea/pulselessness, DNR/MOST and obvious-death criteria; apply monitor/AED and check leads before treating apparent asystole."),
            ("2. CPR", "100-120/min, depth at least one third chest AP diameter, full recoil, pauses under 10 seconds; 15:2 with two rescuers or 30:2 with one when no advanced airway."),
            ("3. Ventilate", "Effective BVM first. With advanced airway: continuous compressions and 20-30 breaths/min; avoid hyperventilation."),
            ("4. IV/IO + epi", "Obtain access without delaying CPR. Epinephrine 0.01 mg/kg IV/IO every 3-5 min."),
            ("5. Cause / ROSC", "Treat reversible causes. If ROSC, use PC-08; if no ROSC, continue 2-minute cycles."),
        ],
        "providers": [
            ("EMT", "Continuous high-quality CPR, AED/monitor, BVM oxygenation/ventilation, length-based system, and brief rhythm/pulse checks."),
            ("AEMT", "All EMT care plus prompt IV/IO, epinephrine, glucose assessment, and crystalloid only when hypovolemia is suspected."),
            ("Paramedic", "All prior care plus rhythm confirmation, waveform EtCO2, advanced reversible-cause treatment, and post-ROSC transition."),
        ],
        "medications": [("Epinephrine 0.1 mg/mL", "0.01 mg/kg IV/IO as early as possible; max single dose 1 mg; repeat every 3-5 min."), ("Normal saline", "10-20 mL/kg IV/IO only when hypovolemia is suspected; reassess perfusion and lungs after each bolus.")],
        "safety": ["Asystole/PEA is nonshockable; defibrillate only if the rhythm changes to VF/pulseless VT.", "Do not pause compressions for endotracheal intubation. IV/IO access and medication are secondary to CPR and ventilation.", "Do not routinely give calcium or sodium bicarbonate without a specific indication.", "Treat hypoxia, hypovolemia, acidosis, electrolyte/metabolic disturbance, hypothermia, tension pneumothorax, tamponade, toxins, and thrombosis."],
        "links": "AR-05 Pediatric Airway; AR-06 Pediatric Failed Airway; PC-02 Bradycardia / Poor Perfusion; PC-08 Post-Resuscitation; AO-02 Newly Born.",
    },
    {
        "code": "PC-02", "title": "Pediatric Bradycardia With Poor Perfusion", "file": "pc-02-pediatric-bradycardia-poor-perfusion-protocol.pdf",
        "scope": "Infant or child after the newly born period with bradycardia and hypotension, altered mental status, shock, weak pulses, or other poor perfusion. Correct oxygenation and ventilation before medication.",
        "flow": [
            ("1. Assess", "Bradycardia with poor perfusion: hypotension, altered mental status, shock, weak pulses, or impending arrest."),
            ("2. Correct cause", "Airway, oxygenation, ventilation, obstruction, hypoxia, apnea, glucose, temperature, acidosis, toxins, and other reversible causes."),
            ("3. HR <60?", "If HR remains below 60/min with poor perfusion despite effective oxygenation/ventilation, begin CPR immediately, even with a pulse."),
            ("4. IV/IO + epi", "Obtain rapid access without delaying CPR. Epinephrine 0.01 mg/kg IV/IO every 3-5 min while compromise persists."),
            ("5. Specific cause", "Atropine only for increased vagal tone or primary AV block; consider pacing for selected refractory conduction disease."),
        ],
        "providers": [("EMT", "Airway support, effective oxygenation/ventilation, glucose assessment when authorized, and CPR for persistent HR below 60 with poor perfusion."), ("AEMT", "All EMT care plus IV/IO, epinephrine, glucose assessment, crystalloid only when hypovolemia is suspected, and authorized advanced airway support."), ("Paramedic", "All prior care plus monitoring, atropine for increased vagal tone or primary AV block, and selected pacing for refractory conduction disease.")],
        "medications": [("Epinephrine 0.1 mg/mL", "0.01 mg/kg IV/IO; max single dose 1 mg; repeat every 3-5 min."), ("Atropine", "0.02 mg/kg IV/IO only for increased vagal tone or primary AV block; min 0.1 mg; max single dose 0.5 mg child / 1 mg adolescent; may repeat once."), ("Normal saline", "10-20 mL/kg IV/IO only for suspected hypovolemia; reassess after each bolus.")],
        "safety": ["Atropine is not a treatment for hypoxic bradycardia.", "Do not delay oxygenation, ventilation, or CPR for vascular access or medication.", "If pulseless, move immediately to PC-01/PC-04; after sustained ROSC, use PC-08.", "Obtain 12-lead only when it will not delay resuscitation."],
        "links": "AR-05 Pediatric Airway; PC-01 Asystole / PEA; PC-04 Pulseless Arrest; PC-08 Post-Resuscitation; AO-02 Newly Born.",
    },
    {
        "code": "PC-03", "title": "Pediatric Pulmonary Edema / CHF", "file": "pc-03-pediatric-chf-pulmonary-edema-protocol.pdf",
        "scope": "Infant or child after the newly born period with suspected acute heart failure, pulmonary edema, or cardiogenic shock. Congenital anatomy and baseline physiology may change usual findings and oxygen targets.",
        "flow": [
            ("1. Assess", "Respiratory distress, perfusion, cardiac history/surgeries, baseline SpO2, home medications, fluid restriction, feeding/urine output, fever, and caregiver baseline."),
            ("2. Support", "Position of comfort; oxygen and ventilation support for distress. Use gentle positive pressure and contact Medical Control early for complex congenital disease."),
            ("3. Baseline target", "Do not force normal SpO2 in cyanotic or single-ventricle disease; use documented/caregiver baseline and Medical Control guidance."),
            ("4. Monitor", "Continuous ECG, SpO2, frequent BP, respiratory reassessment, and EtCO2 when ventilatory support is used."),
            ("5. Transport", "No routine fluid bolus. Notify early and transport without delaying for a medication trial."),
        ],
        "providers": [("EMT", "Airway/ventilation support, SpO2 and frequent vital signs, focused cardiac history, and communicate usual saturation/anatomy/medication plan."), ("AEMT", "All EMT care plus indicated IV/IO, ECG/EtCO2, early Medical Control, and cautious reassessed aliquots only if hypovolemia is genuinely suspected."), ("Paramedic", "All prior care plus cardiac/12-lead monitoring without delaying care and Medical-Control-directed therapy tailored to anatomy and physiology.")],
        "medications": [("Fentanyl", "1 mcg/kg IV/IO; max single dose 50 mcg only with Medical Control after airway and perfusion stabilize."), ("Vasodilator / vasoactive", "Agent, dose, and indication determined by Medical Control.")],
        "safety": ["Do not use routine albuterol, fluid, vasodilator, or vasoactive treatment without an identified indication and Medical Control direction.", "Do not force a normal SpO2 in cyanotic or single-ventricle disease without individualized guidance.", "Use PM-01 for suspected anaphylaxis; use the appropriate cardiac pathway for bradycardia or arrest."],
        "links": "AR-05 Pediatric Airway; AR-07 Pediatric Respiratory Distress; PM-01 Pediatric Anaphylaxis; PC-02 Bradycardia / Poor Perfusion; PC-04 Pulseless Arrest.",
    },
    {
        "code": "PC-04", "title": "Pediatric Pulseless Arrest", "file": "pc-04-pediatric-pulseless-arrest-protocol.pdf",
        "scope": "Immediate routing for a pulseless patient age 3 days through 15 years. Use AO-02 Newly Born through 3 days and the adult cardiac-arrest pathway at age 16 years or older.",
        "flow": [
            ("1. Confirm", "Pulselessness, age pathway, DNR/MOST, and obvious-death criteria."),
            ("2. CPR + BVM", "100-120/min, depth at least one third chest AP diameter, full recoil, pauses under 10 sec. Use 30:2 with one rescuer or 15:2 with two."),
            ("3. AED / monitor", "Apply immediately. Use pediatric pads/attenuator when available, but do not delay defibrillation if standard equipment is immediately available."),
            ("4. Rhythm route", "VF/pulseless VT: PC-07. Asystole/PEA: PC-01. Obtain IV/IO without delaying CPR or ventilation."),
            ("5. ROSC", "Use PC-08 and notify the pediatric-capable destination early."),
        ],
        "providers": [("EMT", "High-quality CPR, BVM ventilation, AED/monitor, rhythm-specific routing, length-based system, and minimal interruptions."), ("AEMT", "All EMT care plus prompt IV/IO, glucose/temperature assessment, authorized naloxone, and advanced airway support within standing orders."), ("Paramedic", "All prior care plus rhythm-specific manual treatment, waveform EtCO2 after advanced airway, reversible-cause management, and post-ROSC transition.")],
        "medications": [("Naloxone", "Suspected opioid-associated arrest: 0.01 mg/kg IV/IO/IM/IN initially; if needed 0.1 mg/kg; max 2 mg per dose and 8 mg cumulative. Continue CPR and ventilation.")],
        "safety": ["Naloxone does not replace CPR and ventilation.", "Do not delay CPR, ventilation, or defibrillation for IV access, medication, or intubation.", "Do not pause CPR after a shock to check a pulse; resume until the next planned rhythm check.", "Use waveform EtCO2 trends to improve CPR and identify possible ROSC; do not use a single value for termination."],
        "links": "AR-05 Pediatric Airway; AR-06 Pediatric Failed Airway; PC-01 Asystole / PEA; PC-07 VF / Pulseless VT; PC-08 Post-Resuscitation.",
    },
    {
        "code": "PC-05", "title": "Pediatric Narrow-Complex Tachycardia", "file": "pc-05-pediatrictachycardia-narrow-complex.pdf",
        "scope": "Pediatric narrow-complex tachycardia (QRS at or below 0.09 seconds) with suspected SVT or serious symptoms. Treat sinus tachycardia by correcting its cause.",
        "flow": [
            ("1. Assess", "Perfusion, mental status, BP, respiratory status, onset, P waves, R-R variability, and reversible causes."),
            ("2. Compromise?", "Hypotension, acute altered mental status, shock, or sudden collapse: prepare synchronized cardioversion immediately."),
            ("3. Cardioversion", "0.5-1 J/kg; if unsuccessful, increase to 2 J/kg. Confirm sync mode before every shock; sedate only if immediately available and it does not delay treatment."),
            ("4. Stable SVT?", "Regular narrow-complex SVT: vagal maneuvers first; then adenosine by rapid push and immediate saline flush if access is ready."),
            ("5. Reassess", "Treat cause, monitor continuously, obtain 12-lead only when it does not delay care, and notify destination."),
        ],
        "providers": [("EMT", "Oxygenation as indicated, vital signs/rhythm strip, identify compromise, and treat likely sinus-tachycardia causes within standing orders."), ("AEMT", "All EMT care plus IV/IO and cause-directed supportive treatment. Do not delay transport or cardioversion for repeated access attempts."), ("Paramedic", "All prior care plus synchronized cardioversion for compromise, vagal maneuvers/adenosine for stable regular narrow-complex SVT, and Medical Control for refractory stable SVT.")],
        "medications": [("Adenosine", "0.1 mg/kg rapid IV/IO push with immediate saline flush; max 6 mg. Repeat 0.2 mg/kg; max 12 mg. Only for regular narrow-complex SVT."), ("Midazolam", "0.1-0.2 mg/kg IV/IO/IN for cardioversion; max single 2 mg, max total 5 mg. Do not delay cardioversion; verify against pediatric medication reference.")],
        "safety": ["Do not delay synchronized cardioversion for sedation.", "Do not give adenosine for an irregular, polymorphic, uncertain, or wide-complex rhythm.", "If pulseless at any point, begin CPR and use PC-04.", "Sinus tachycardia from fever, pain, dehydration, hypoxia, sepsis, toxin exposure, or anemia requires cause-directed treatment."],
        "links": "AR-05 Pediatric Airway; PC-04 Pulseless Arrest; PC-06 Wide-Complex Tachycardia; Medication Reference.",
    },
    {
        "code": "PC-06", "title": "Pediatric Wide-Complex Tachycardia", "file": "pc-06-pediatric-tachycardia-wide-complex-protocol.pdf",
        "scope": "Pediatric tachycardia with QRS greater than 0.09 seconds and suspected VT, SVT with aberrancy, or polymorphic tachycardia. Treat as potentially ventricular until proven otherwise.",
        "flow": [
            ("1. Assess", "Perfusion, mental status, BP, respiratory status, QRS pattern, cardiac history, and reversible causes."),
            ("2. Compromise?", "Hypotension, acute altered mental status, shock, or sudden collapse: prepare synchronized cardioversion immediately."),
            ("3. Cardioversion", "0.5-1 J/kg; if unsuccessful, increase to 2 J/kg. Confirm sync mode before every shock; sedate only if it will not delay treatment."),
            ("4. Stable rhythm", "Obtain early Medical Control/expert consultation. Adenosine may be considered only for a regular, monomorphic rhythm."),
            ("5. Reassess", "Continuous monitoring, rhythm strips, cause-directed treatment, and early pediatric-capable destination notification."),
        ],
        "providers": [("EMT", "Oxygenation as indicated, identify compromise, obtain rhythm strip when available, and prepare for synchronized cardioversion."), ("AEMT", "All EMT care plus IV/IO and supportive care; do not delay cardioversion or transport for repeated access attempts."), ("Paramedic", "All prior care plus synchronized cardioversion for compromise and early Medical Control/expert consultation for stable wide-complex tachycardia.")],
        "medications": [("Adenosine", "0.1 mg/kg rapid IV/IO push with immediate saline flush; max 6 mg. Repeat 0.2 mg/kg; max 12 mg. Only for stable, regular, monomorphic rhythm with Medical Control/expert consultation."), ("Midazolam", "0.1-0.2 mg/kg IV/IO/IN for cardioversion; max single 2 mg, max total 5 mg. Do not delay cardioversion; verify against pediatric medication reference."), ("Antiarrhythmic", "Agent/dose determined by Medical Control. Do not administer amiodarone and procainamide together.")],
        "safety": ["Do not delay synchronized cardioversion for sedation, 12-lead acquisition, or repeated IV attempts.", "Do not give adenosine for unstable, irregular, or polymorphic wide-complex tachycardia.", "If pulseless, begin CPR and use PC-04; for VF/pulseless VT use PC-07.", "Assess hypoxia, electrolyte/metabolic disturbance, toxin/stimulant exposure, myocarditis/cardiomyopathy, and congenital disease."],
        "links": "AR-05 Pediatric Airway; PC-04 Pulseless Arrest; PC-05 Narrow-Complex Tachycardia; PC-07 VF / Pulseless VT; Medication Reference.",
    },
    {
        "code": "PC-07", "title": "Pediatric VF / Pulseless VT", "file": "pc-07-pediatric-vf-pulseless-vt-protocol.pdf",
        "scope": "Pediatric pulseless arrest with ventricular fibrillation or pulseless ventricular tachycardia. High-quality CPR and early defibrillation are central treatments.",
        "flow": [
            ("1. CPR + BVM", "Begin continuous CPR, effective BVM ventilation, and defibrillator/AED application; minimize interruptions."),
            ("2. Shock 1", "2 J/kg, then resume CPR for 2 minutes while preparing vascular access."),
            ("3. Shock 2", "4 J/kg, then resume CPR immediately, obtain IV/IO, and give epinephrine 0.01 mg/kg IV/IO."),
            ("4. Refractory", "Subsequent shocks at least 4 J/kg; max 10 J/kg or adult dose. Epi every 3-5 min; consider one authorized antiarrhythmic."),
            ("5. ROSC", "If ROSC, use PC-08. If no ROSC, continue 2-minute rhythm/shock/medication/cause-treatment cycles."),
        ],
        "providers": [("EMT", "High-quality CPR, BVM, AED/monitor, length- or weight-based system, and immediate CPR resumption after every shock."), ("AEMT", "All EMT care plus IV/IO, epinephrine, magnesium when indicated, and manual defibrillation only when authorized."), ("Paramedic", "All prior care plus manual defibrillation, one authorized antiarrhythmic for shock-refractory VF/pulseless VT, EtCO2-guided CPR improvement, and reversible-cause management.")],
        "medications": [("Epinephrine 0.1 mg/mL", "0.01 mg/kg IV/IO after second shock or sooner only if rapid defibrillation is not possible; max 1 mg; repeat every 3-5 min."), ("Amiodarone", "5 mg/kg IV/IO for shock-refractory VF/pulseless VT; max 300 mg. Select one antiarrhythmic only."), ("Lidocaine", "1 mg/kg IV/IO for shock-refractory VF/pulseless VT; max 100 mg. Select one antiarrhythmic only."), ("Magnesium sulfate", "25-50 mg/kg IV/IO once; max 2 g; only for torsades/polymorphic VT or suspected hypomagnesemia.")],
        "safety": ["Do not pause CPR after a shock to check a pulse; resume until the next planned rhythm check.", "Do not delay CPR or defibrillation for IV access, medication, or intubation.", "Do not routinely use calcium or sodium bicarbonate without a specific indication.", "Use one antiarrhythmic only unless Medical Control directs otherwise."],
        "links": "AR-05 Pediatric Airway; AR-06 Pediatric Failed Airway; PC-04 Pulseless Arrest; PC-08 Post-Resuscitation; Medication Reference.",
    },
    {
        "code": "PC-08", "title": "Pediatric Post-Resuscitation", "file": "pc-08-pediatric-post-resuscitation-protocol.pdf",
        "scope": "Sustained ROSC in patients age 3 days through 15 years. Prevent recurrent arrest and secondary injury through controlled oxygenation, ventilation, perfusion, glucose, temperature, and rhythm management.",
        "flow": [
            ("1. Stabilize", "Confirm pulse/perfusion and stabilize airway, breathing, circulation, glucose, temperature, and rhythm."),
            ("2. Oxygen / ventilation", "Once reliable SpO2 is available, titrate toward 94-99% unless an individualized baseline applies; avoid hypocapnia and hypercapnia."),
            ("3. Perfusion", "Maintain systolic and mean arterial pressure above the 10th percentile for age/sex. Avoid routine fluid boluses."),
            ("4. Temperature / glucose", "Check temperature and glucose. Avoid core temperature above 37.5 C in the comatose child; correct hypoglycemia within standing orders."),
            ("5. Destination", "Treat persistent dysrhythmia with the rhythm-specific pathway; notify and transport to the most appropriate pediatric-capable destination."),
        ],
        "providers": [("EMT", "Maintain airway/appropriate ventilation, titrate oxygen to reliable SpO2 94-99% unless individualized target, check glucose when authorized, prevent fever, and reassess."), ("AEMT", "All EMT care plus IV/IO, glucose correction, cautious cause-directed fluid only for suspected hypovolemia, and authorized post-airway analgesia/sedation."), ("Paramedic", "All prior care plus cardiac/12-lead monitoring without delay, waveform EtCO2 after advanced airway, rhythm-specific treatment, and Medical-Control-directed vasopressor support.")],
        "medications": [("Fluids / vasopressors", "No routine bolus. Use cautious reassessed fluid for suspected hypovolemia or Medical-Control-directed vasopressor support."), ("Analgesia / sedation", "Treat pain first, then provide age-appropriate sedation. Paralysis alone is not sedation.")],
        "safety": ["Do not force a usual saturation target in cyanotic congenital heart disease without individualized guidance.", "Avoid core temperature above 37.5 C in the comatose child; do not start field targeted-temperature management unless directed by Medical Control.", "Do not administer routine fluid boluses.", "If pulseless again, return immediately to PC-04; use PC-01 or PC-07 according to rhythm."],
        "links": "AR-08 Post-Intubation / BIAD Management; PC-01 Asystole / PEA; PC-04 Pulseless Arrest; PC-07 VF / Pulseless VT; Medication Reference.",
    },
]


def build(item):
    s = styles()
    DESTINATION.mkdir(parents=True, exist_ok=True)
    TEMP.mkdir(parents=True, exist_ok=True)
    target = DESTINATION / item["file"]
    temporary = TEMP / item["file"]

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setTitle(f"Claiborne County EMS {item['code']} {item['title']}")
        canvas.setStrokeColor(LIGHT_GRAY)
        canvas.setLineWidth(.4)
        canvas.line(doc.leftMargin, .53 * inch, letter[0] - doc.rightMargin, .53 * inch)
        canvas.setFont(REGULAR, 6.7)
        canvas.setFillColor(MID_GRAY)
        canvas.drawString(doc.leftMargin, .35 * inch, f"Claiborne County EMS Clinical Protocols | {item['code']} {item['title']}")
        canvas.drawRightString(letter[0] - doc.rightMargin, .35 * inch, f"Page {canvas.getPageNumber()} of 2")
        canvas.restoreState()

    doc = BaseDocTemplate(str(temporary), pagesize=letter, leftMargin=.75 * inch, rightMargin=.75 * inch, topMargin=.63 * inch, bottomMargin=.72 * inch)
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="protocol", frames=[frame], onPage=footer)])
    story = [
        p(f"{item['code']} {item['title']}", s["title"]),
        p(f"CLAIBORNE COUNTY EMS | MEDICAL-DIRECTOR APPROVED | SOURCE PDF | {REVISION.upper()}", s["subtitle"]),
        callout(f"<b>Scope:</b> {item['scope']}", s, PALE_RED),
    ]
    story += heading("Field flow", s)
    story.append(grid(item["flow"], s))
    story += heading("Provider-level actions", s)
    story.append(grid(item["providers"], s, header=("Level", "Approved actions")))
    story.append(PageBreak())
    story += [Spacer(1, 14), p(f"{item['code']} {item['title']}", s["title"]), p("SAFETY, MEDICATION, AND LINKED-PATHWAY REFERENCE", s["subtitle"])]
    story += heading("Safety and escalation", s)
    story += bullets(item["safety"], s)
    story += heading("Medication reference", s)
    story.append(grid(item["medications"], s, header=("Medication", "Approved dose / safeguard")))
    story += heading("Linked pathways", s)
    story.append(callout(item["links"], s))
    story += heading("Source control", s)
    story += bullets([
        f"This controlled direct source PDF replaces the prior source file and matches approved Claiborne EMS app content released {REVISION}.",
        "Use current Claiborne standing orders, formulary, equipment authorization, and Medical Control direction whenever they govern a case-specific decision.",
    ], s)
    doc.build(story)
    temporary.replace(target)


if __name__ == "__main__":
    for protocol in PROTOCOLS:
        build(protocol)
        print(f"Generated {protocol['file']}")
