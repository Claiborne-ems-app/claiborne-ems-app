from canonical_pdf_bridge import build_canonical
"""Build the approved AM-01 through AM-07 Claiborne source-PDF replacement batch.

The reviewed app content is the controlled source for this release. These PDFs
replace the older imported North Carolina sheets while preserving the field
workflow, medication authority, safeguards, and linked pathways in the app.
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
TMP = ROOT / "tmp/pdfs/adult-medical-release"
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
        "id": "AM-01",
        "title": "Allergic Reaction / Anaphylaxis",
        "file": "am-01-allergic-reaction-anaphylaxis-protocol.pdf",
        "scope": "Use for acute allergic symptoms, suspected anaphylaxis, or bradykinin-mediated angioedema. Epinephrine is first-line for anaphylaxis.",
        "flow_title": "Anaphylaxis recognition and immediate treatment",
        "flow": [
            ("1. Assess", "Remove a trigger when safe. Assess airway, breathing, circulation, skin, GI symptoms, and perfusion."),
            ("2. Anaphylaxis?", "Respiratory compromise, hypotension/poor perfusion, or acute involvement of 2 or more body systems."),
            ("3. IM epinephrine now", "1 mg/mL: 0.5 mg IM lateral thigh. A 0.3 mg autoinjector is acceptable. Repeat every 5 min while significant symptoms persist."),
            ("4. Airway + support", "Position supine when tolerated. Oxygen, suction, BVM as needed. Albuterol 2.5 mg nebulized for persistent bronchospasm after epinephrine."),
            ("5. Poor perfusion", "Isotonic crystalloid 500 mL IV/IO aliquots, reassessing after each; maximum 2 L. Use 250 mL aliquots if fluid-overload risk."),
            ("6. Refractory shock", "Continue IM epinephrine. With Medical Control, epinephrine infusion 2-10 mcg/min; no IV epinephrine bolus under this protocol."),
            ("7. Bradykinin angioedema", "Early difficult-airway plan. With Medical Control, consider TXA 1 g IV/IO over 10 min while prioritizing airway and transport."),
            ("8. Monitor + transport", "Continuous ECG/SpO2/BP, 12-lead when feasible, EtCO2 when indicated, early destination notification."),
        ],
        "therapy": [
            ("Diphenhydramine", "25-50 mg slow IV/IO or deep IM only for isolated or persistent skin symptoms with adequate BP and mental status. It never delays or replaces epinephrine."),
            ("Beta-blocked refractory shock", "With Medical Control, glucagon 1-2 mg IV/IO over 5 min; prepare for vomiting and airway protection."),
        ],
        "callout": "Every patient receiving epinephrine or showing airway, respiratory, cardiovascular, progressive, or multisystem symptoms requires transport and continuous reassessment.",
        "safety": [
            "Anaphylaxis may occur without rash. Do not delay initial or repeat IM epinephrine for IV access, monitoring, antihistamine, corticosteroid, or transport preparation.",
            "Routine corticosteroids are not part of the acute anaphylaxis pathway. Albuterol treats lower-airway bronchospasm only, not laryngeal edema or shock.",
            "Do not give diphenhydramine to a patient with hypotension, poor perfusion, or decreased mental status.",
            "Do not allow a hypotensive or poorly perfused patient to stand or walk.",
        ],
        "links": [("AR-01", "Progressive airway swelling or ventilatory failure"), ("AR-04", "Persistent bronchospasm or asthma/COPD"), ("AM-05", "Persistent hypotension or another shock cause")],
    },
    {
        "id": "AM-02",
        "title": "Diabetic Emergency - Adult",
        "file": "am-02-diabetic-adult-protocol.pdf",
        "scope": "Use for symptomatic hypoglycemia, hyperglycemia/DKA-HHS concern, or an unexplained metabolic presentation. Claiborne EMS does not administer insulin under AM-02.",
        "flow_title": "Glucose, airway, and disposition pathway",
        "flow": [
            ("1. Check glucose + ABCs", "Assess airway, breathing, circulation, mental status, focal deficits, seizure, and likely cause."),
            ("2. Glucose below 70?", "Treat if symptomatic or symptoms cannot be reliably assessed because of altered mental status."),
            ("3. Safe swallow?", "If alert and protecting airway: oral glucose 15-25 g. If unsafe/ineffective: D10 IV/IO or glucagon IM."),
            ("4. Titrate D10", "D10 up to 250 mL IV/IO, titrated to improving mental status and glucose at least 70 mg/dL; maximum 25 g."),
            ("5. No access", "Glucagon 1 mg IM when oral treatment is unsafe and vascular access is not promptly available."),
            ("6. Reassess", "Parenteral treatment: glucose + neuro exam at 5 min. Oral treatment: repeat glucose within 10-15 min."),
            ("7. Hyperglycemia/DKA-HHS?", "Consider glucose at least 250, Kussmaul breathing, vomiting, abdominal pain, dehydration, infection, shock, or SGLT2 use."),
            ("8. Transport/refusal", "Transport high-risk medication exposure, recurrence, seizure, pregnancy, overdose, uncertain cause, DKA/HHS, or persistent deficit."),
        ],
        "therapy": [
            ("Fluid", "For hypotension or poor perfusion only: isotonic crystalloid 500 mL IV/IO aliquots; 250 mL for fluid-overload risk; maximum 2 L."),
            ("Non-transport", "Consider only after a known/clear cause, normal baseline mental/neuro status and capacity, glucose at least 80 and stable on repeat, food intake, and responsible-adult supervision."),
        ],
        "callout": "Do not give oral glucose, food, fluid, or medication to a patient who cannot reliably swallow or protect the airway.",
        "safety": [
            "Do not use D50 as the routine adult treatment under AM-02. Avoid insulin and do not change an insulin pump under this protocol.",
            "Strongly recommend transport after sulfonylurea or long-acting-insulin exposure, recurrent hypoglycemia, seizure, pregnancy, overdose, unclear cause, or absent supervision.",
            "Persistent focal deficits after correction remain a stroke alert; do not attribute them to glucose alone.",
            "Do not give routine fluid for uncomplicated hyperglycemia without hypotension, poor perfusion, dehydration, or another specific indication.",
        ],
        "links": [("UP-04", "Persistent altered mental status or metabolic/toxic cause"), ("UP-13", "Active seizure or persistent postictal findings"), ("UP-14", "Persistent focal deficit after glucose correction"), ("AM-05", "Persistent hypotension or poor perfusion")],
    },
    {"id": "AM-03"},
    {
        "id": "AM-04",
        "title": "Hypertension / Suspected Hypertensive Emergency",
        "file": "am-04-hypertension-protocol.pdf",
        "scope": "Use for markedly elevated BP with suspected acute end-organ injury. Treat the condition causing the elevation, not an isolated number.",
        "flow_title": "Targeted blood-pressure evaluation and treatment",
        "flow": [
            ("1. Confirm BP", "Correct cuff size. Repeat an extreme or inconsistent automated value manually when feasible."),
            ("2. End-organ emergency?", "CVA/stroke, ACS, pulmonary edema, aortic syndrome, encephalopathy, pregnancy-related symptoms, or reduced perfusion."),
            ("3. Undifferentiated CVA", "If manually confirmed SBP is above 220 or DBP is above 110, give labetalol 10 mg slow IV over 2 min."),
            ("4. Reassess", "Every 5 min: BP, HR, rhythm, perfusion, and focused neurologic exam."),
            ("5. Still above target?", "After at least 10 min, repeat labetalol 10 mg once only if still SBP above 220 or DBP above 110. Maximum total 20 mg."),
            ("6. Goal BP", "SBP 220 or less and DBP 110 or less. Do not lower further without a condition-specific order."),
            ("7. Other acute injury", "Use linked ACS, pulmonary-edema, aortic, obstetric, or transfer pathway. Medical Control defines non-stroke antihypertensive treatment."),
            ("8. No acute injury", "Address pain, anxiety, hypoxia, urinary retention, stimulant exposure, or missed medications. Do not give antihypertensive medication solely to normalize BP."),
        ],
        "therapy": [
            ("Labetalol exclusions", "Do not give for pulmonary edema, acute decompensated heart failure, cardiogenic shock, bradycardia, advanced heart block, or active bronchospasm."),
            ("TNK/post-thrombolysis", "Do not apply the 220/110 undifferentiated-CVA target. Use AM-06 and written sending/receiving-facility orders."),
        ],
        "callout": "Do not let BP treatment delay stroke alert, definitive imaging, or time-critical transport.",
        "safety": [
            "Rapid, non-targeted BP reduction can reduce cerebral, coronary, and renal perfusion.",
            "A suspected stroke is undifferentiated until imaging. Do not administer an antihypertensive solely to normalize BP.",
            "Do not administer a patient's home antihypertensive unless specifically authorized.",
            "For any non-stroke hypertensive emergency, Medical Control must define the indication, dose, and endpoint unless a linked condition-specific protocol explicitly authorizes treatment.",
        ],
        "links": [("UP-14", "Suspected stroke assessment, alert, destination, and matching CVA BP branch"), ("AM-06", "Post-TNK transfer; written facility orders govern"), ("AC-04", "ACS or ischemic chest discomfort"), ("AC-05", "Pulmonary edema; do not give labetalol under AM-04"), ("AO-03", "Pregnancy-related hypertension/eclampsia concern")],
    },
    {"id": "AM-05"},
    {
        "id": "AM-06",
        "title": "Suspected Stroke - Tenecteplase (TNK) Transfer",
        "file": "am-06-suspected-stroke-tnk-transfer-protocol.pdf",
        "scope": "Interfacility transfer after hospital-administered TNK for suspected acute ischemic stroke. TNK is a single IV bolus; there is no thrombolytic infusion to continue, titrate, or stop.",
        "flow_title": "Post-TNK transfer and complication pathway",
        "flow": [
            ("1. Verify transfer", "Accepted sending/receiving plan, exact TNK bolus time, patient weight/dose, last known well, baseline neuro examination, and written orders."),
            ("2. Before departure", "Airway, glucose, IV sites, BP below 180/105, continuous monitor, NPO, receiving acceptance, and destination verified."),
            ("3. Every 15 min", "BP, GCS, pupils, focal findings, airway, SpO2, and bleeding/angioedema symptoms. Increase frequency if unstable or on an authorized infusion."),
            ("4. Continue ordered infusion", "Only a sending-facility antihypertensive infusion with written order and accepted pump parameters. Do not initiate or titrate a new antihypertensive under AM-06."),
            ("5. Deterioration", "Severe headache, vomiting, acute hypertension, worsening deficit, seizure, bleeding, or angioedema: support ABCs, recheck BP/glucose, stop nonessential infusions, notify stroke facility and Medical Control."),
            ("6. Direct transport", "No unnecessary invasive procedures or IM medication. Apply prolonged pressure after any essential vascular access."),
        ],
        "therapy": [
            ("BP target", "Maintain BP below 180/105 for the first 24 hr after thrombolysis. Do not use the pre-thrombolysis 185/110 threshold as the post-TNK target."),
            ("TNK", "Single hospital-administered IV bolus. Exact administration time must be known before departure."),
        ],
        "callout": "Precise times, not estimates, are required for stroke handoff. Do not depart without the exact TNK bolus-administration time.",
        "safety": [
            "Sudden neurologic deterioration, severe headache, vomiting, seizure, acute hypertension, or bleeding may indicate intracranial hemorrhage or edema.",
            "Angioedema can threaten the airway even without other allergic findings.",
            "Keep the patient NPO and avoid antiplatelets, anticoagulants, additional thrombolytic therapy, or unapproved IM medication unless specifically ordered and confirmed under policy.",
            "AM-04 is only a defined undifferentiated-CVA branch; post-TNK BP care is governed by written facility orders and this protocol.",
        ],
        "links": [("UP-04", "Ongoing neurologic/reversible-cause assessment"), ("AM-05", "Hypotension or inadequate perfusion"), ("AR-01", "Airway protection/ventilatory support"), ("UP-13", "Seizure"), ("AM-07", "Peri-arrest deterioration")],
    },
    {
        "id": "AM-07",
        "title": "Crashing Medical Patient",
        "file": "am-07-crashing-patient-protocol.pdf",
        "scope": "Use for immediate or impending physiologic collapse requiring simultaneous resuscitation, rapid decisions, and expedited transport.",
        "flow_title": "Immediate-threat and movement pathway",
        "flow": [
            ("1. Identify", "Hypoxia/ventilatory failure, severe distress, SBP below 90/shock, declining mental status, poor perfusion, or peri-arrest dysrhythmia."),
            ("2. Assign roles", "Leader, airway, monitor/defibrillator, IV/IO/medications, hemorrhage, and documentation. Bring anticipated resuscitation equipment."),
            ("3. Immediate threats", "Airway/ventilation, severe hemorrhage, tension pneumothorax, hypoglycemia, anaphylaxis, dysrhythmia, and shock."),
            ("4. Access + cause care", "Rapid IV/IO, reassessed fluids/vasopressors, pads early, and linked definitive protocol."),
            ("5. Move + reassess", "Move once lifesaving care is underway. Reassess at least every 5 min during prolonged extrication."),
        ],
        "therapy": [
            ("Airway", "BVM/oxygenation first. Use advanced airway when the patient cannot protect the airway or cannot be adequately oxygenated/ventilated less invasively; confirm with waveform capnography."),
            ("Perfusion", "Use AM-05 for fluid/vasopressor strategy. Identify peri-intubation hypotension before high-risk intubation when possible."),
        ],
        "callout": "The goal is not prolonged scene care. Begin immediate lifesaving care at the patient side when safe, then move promptly once critical interventions are underway.",
        "safety": [
            "Do not remain on scene when safety is threatened, definitive treatment is unavailable, hemorrhage requires surgery/blood products unavailable to the crew, or transport/rendezvous is the fastest route to needed care.",
            "GCS 15 does not equal stability. Do not allow procedures to delay definitive care.",
            "Do not use NIPPV for vomiting, facial trauma, inability to cooperate/protect the airway, or impending arrest.",
            "Push-dose epinephrine is a temporary bridge only; use the approved labeled preparation/dedicated reference and transition to an infusion when indicated.",
        ],
        "links": [("UP-01", "Universal patient care"), ("AM-05", "Shock/perfusion strategy"), ("AR-01", "Adult airway management"), ("AC-03", "Cardiac arrest"), ("AM-01", "Anaphylaxis"), ("TB-06", "Multiple trauma"), ("TE-07", "Overdose/toxic ingestion")],
    },
]


def paragraph(text, style):
    return Paragraph(text, style)


def make_styles():
    pdfmetrics.registerFont(TTFont(REGULAR, "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont(BOLD, "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("title", parent=base["Title"], fontName=BOLD, fontSize=18, leading=21, textColor=NAVY, spaceAfter=2),
        "subtitle": ParagraphStyle("subtitle", parent=base["Normal"], fontName=BOLD, fontSize=8, leading=10, textColor=RED, spaceAfter=8),
        "section": ParagraphStyle("section", parent=base["Heading2"], fontName=BOLD, fontSize=10.5, leading=12.5, textColor=NAVY, spaceBefore=6, spaceAfter=3),
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName=REGULAR, fontSize=7.8, leading=9.5, spaceAfter=3),
        "table": ParagraphStyle("table", parent=base["BodyText"], fontName=REGULAR, fontSize=7.05, leading=8.45),
        "table_bold": ParagraphStyle("table_bold", parent=base["BodyText"], fontName=BOLD, fontSize=7.05, leading=8.45),
        "table_head": ParagraphStyle("table_head", parent=base["BodyText"], fontName=BOLD, fontSize=7.05, leading=8.45, textColor=colors.white),
        "callout": ParagraphStyle("callout", parent=base["BodyText"], fontName=BOLD, fontSize=7.6, leading=9.35, textColor=NAVY),
    }


def section(title, styles):
    return [Spacer(1, 2), paragraph(title, styles["section"]), HRFlowable(width="100%", thickness=0.65, color=LIGHT_GRAY, spaceAfter=3)]


def callout(text, styles, background=PALE_BLUE):
    table = Table([[paragraph(text, styles["callout"])]], colWidths=[7.0 * inch])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), background), ("BOX", (0, 0), (-1, -1), 0.55, NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return table


def grid(rows, styles, header=None, widths=(1.65 * inch, 5.35 * inch)):
    data = []
    if header:
        data.append([paragraph(header[0], styles["table_head"]), paragraph(header[1], styles["table_head"])])
    data += [[paragraph(left, styles["table_bold"]), paragraph(right, styles["table"])] for left, right in rows]
    table = Table(data, colWidths=list(widths), repeatRows=1 if header else 0)
    commands = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), 0.35, LIGHT_GRAY),
        ("LEFTPADDING", (0, 0), (-1, -1), 5.5), ("RIGHTPADDING", (0, 0), (-1, -1), 5.5),
        ("TOPPADDING", (0, 0), (-1, -1), 3.7), ("BOTTOMPADDING", (0, 0), (-1, -1), 3.7),
    ]
    if header:
        commands += [("BACKGROUND", (0, 0), (-1, 0), NAVY), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#F7F9FB")])]
    else:
        commands += [("BACKGROUND", (0, 0), (0, -1), PALE_BLUE), ("ROWBACKGROUNDS", (1, 0), (-1, -1), [colors.white, HexColor("#F7F9FB")])]
    table.setStyle(TableStyle(commands))
    return table


def bullets(items, styles):
    return [paragraph(f"- {item}", styles["body"]) for item in items]


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
    if protocol["id"] in ['AM-03', 'AM-05']:
        return build_canonical(protocol["id"])
    styles = make_styles()
    TMP.mkdir(parents=True, exist_ok=True)
    tmp_path = TMP / protocol["file"]
    out_path = DESTINATION / protocol["file"]
    doc = BaseDocTemplate(str(tmp_path), pagesize=letter, leftMargin=.75 * inch, rightMargin=.75 * inch, topMargin=.63 * inch, bottomMargin=.72 * inch)
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="protocol", frames=[frame], onPage=lambda c, d: header_footer(protocol, c, d))])

    story = [
        paragraph(f"{protocol['id']} {protocol['title']}", styles["title"]),
        paragraph(f"MEDICAL-DIRECTOR APPROVED APP CONTENT | SOURCE-PDF REPLACEMENT | Reconciled {REVISION}", styles["subtitle"]),
        callout(f"<b>Scope:</b> {protocol['scope']}", styles, PALE_RED),
    ]
    story += section(protocol["flow_title"], styles)
    story.append(grid(protocol["flow"], styles))
    story += section("Key treatment and disposition", styles)
    story.append(grid(protocol["therapy"], styles, header=("Item", "Approved action")))
    story += [Spacer(1, 5), callout(protocol["callout"], styles)]
    story.append(PageBreak())
    story += [
        paragraph(f"{protocol['id']} {protocol['title']}", styles["title"]),
        paragraph("SAFETY, LINKED PATHWAYS, AND RELEASE CONTROL", styles["subtitle"]),
    ]
    story += section("Safety checks", styles)
    story += bullets(protocol["safety"], styles)
    story += section("Linked pathways", styles)
    story.append(grid(protocol["links"], styles, header=("Pathway", "Use when")))
    story += section("Documentation and release control", styles)
    story += bullets([
        "Document focused findings, BP/rhythm/ECG when applicable, all interventions with dose/route/time/response, serial reassessments, destination decision, and notifications.",
        f"This source PDF replaces the legacy imported sheet and matches the approved Claiborne EMS app content reconciled {REVISION}.",
        "Use the linked protocol whenever the patient crosses into another clinical pathway. Follow agency release governance, training requirements, and current medication/device availability.",
    ], styles)
    doc.build(story)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    tmp_path.replace(out_path)


if __name__ == "__main__":
    for item in PROTOCOLS:
        build(item)
    print(f"Built {len(PROTOCOLS)} Adult Medical protocol PDFs.")
