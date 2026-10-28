"""Build the approved Claiborne County EMS PM-02 source PDF.

This controlled direct-source replacement supersedes the imported North
Carolina sheet. It mirrors the approved structured PM-02 app content.
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
PUBLIC = ROOT / "public/protocols/claiborne"
TMP = ROOT / "tmp/pdfs/pm02-approved"
OUTPUT = PUBLIC / "pm-02-pediatric-diabetic-protocol.pdf"
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
        "title": ParagraphStyle("title", parent=base["Title"], fontName=BOLD, fontSize=18, leading=21, textColor=NAVY, spaceAfter=2),
        "subtitle": ParagraphStyle("subtitle", parent=base["Normal"], fontName=BOLD, fontSize=8.1, leading=10, textColor=RED, spaceAfter=7),
        "section": ParagraphStyle("section", parent=base["Heading2"], fontName=BOLD, fontSize=10.4, leading=12.4, textColor=NAVY, spaceBefore=6, spaceAfter=3),
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName=REGULAR, fontSize=7.75, leading=9.45, spaceAfter=3),
        "table": ParagraphStyle("table", parent=base["BodyText"], fontName=REGULAR, fontSize=7.1, leading=8.55),
        "table_bold": ParagraphStyle("table_bold", parent=base["BodyText"], fontName=BOLD, fontSize=7.1, leading=8.55),
        "head": ParagraphStyle("head", parent=base["BodyText"], fontName=BOLD, fontSize=7.15, leading=8.55, textColor=colors.white),
        "callout": ParagraphStyle("callout", parent=base["BodyText"], fontName=BOLD, fontSize=7.65, leading=9.35, textColor=NAVY),
    }


def section(title, s):
    return [Spacer(1, 2), p(title, s["section"]), HRFlowable(width="100%", thickness=0.65, color=LIGHT_GRAY, spaceAfter=3)]


def callout(text, s, background=PALE_BLUE):
    box = Table([[p(text, s["callout"])]], colWidths=[7 * inch])
    box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), background),
        ("BOX", (0, 0), (-1, -1), 0.55, NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return box


def grid(rows, s, header=None, widths=(1.38 * inch, 5.62 * inch)):
    data = []
    if header:
        data.append([p(header[0], s["head"]), p(header[1], s["head"])])
    data += [[p(left, s["table_bold"]), p(right, s["table"])] for left, right in rows]
    table = Table(data, colWidths=list(widths), repeatRows=1 if header else 0)
    commands = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.35, LIGHT_GRAY),
        ("LEFTPADDING", (0, 0), (-1, -1), 5.5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5.5),
        ("TOPPADDING", (0, 0), (-1, -1), 3.8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.8),
    ]
    if header:
        commands += [
            ("BACKGROUND", (0, 0), (-1, 0), NAVY),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#F7F9FB")]),
        ]
    else:
        commands += [
            ("BACKGROUND", (0, 0), (0, -1), PALE_BLUE),
            ("ROWBACKGROUNDS", (1, 0), (-1, -1), [colors.white, HexColor("#F7F9FB")]),
        ]
    table.setStyle(TableStyle(commands))
    return table


def bullets(items, s):
    return [p(f"• {item}", s["body"]) for item in items]


def document():
    s = styles()
    PUBLIC.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)
    temp = TMP / OUTPUT.name

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(LIGHT_GRAY)
        canvas.setLineWidth(0.4)
        canvas.line(doc.leftMargin, 0.53 * inch, letter[0] - doc.rightMargin, 0.53 * inch)
        canvas.setFont(REGULAR, 6.75)
        canvas.setFillColor(MID_GRAY)
        canvas.drawString(doc.leftMargin, 0.35 * inch, "Claiborne County EMS Clinical Protocols | PM-02 Pediatric Diabetic Emergency")
        canvas.drawRightString(letter[0] - doc.rightMargin, 0.35 * inch, f"Page {canvas.getPageNumber()} of 2")
        canvas.restoreState()

    doc = BaseDocTemplate(str(temp), pagesize=letter, leftMargin=.75 * inch, rightMargin=.75 * inch, topMargin=.63 * inch, bottomMargin=.72 * inch)
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="protocol", frames=[frame], onPage=footer)])
    return doc, s, temp


def build():
    doc, s, temp = document()
    story = [
        p("PM-02 Pediatric Hypoglycemia / Diabetic Emergency", s["title"]),
        p(f"CLAIBORNE COUNTY EMS | MEDICAL-DIRECTOR APPROVED | Reconciled {REVISION}", s["subtitle"]),
        callout("<b>Treat symptomatic hypoglycemia promptly while protecting the airway.</b> Do not delay treatment for CGM confirmation. Hyperglycemia alone does not diagnose DKA and does not require field insulin.", s, PALE_RED),
    ]
    story += section("Recognition and field flow", s)
    story.append(grid([
        ("1. Assess", "Assess airway, mental status, medications/insulin, intake, diabetes history, perfusion, vital signs, and possible toxin or alternate cause. Check capillary glucose early."),
        ("2. Glucose below 70?", "Treat a symptomatic child or a child whose symptoms cannot be reliably assessed. Confirm an unexpected CGM result with capillary glucose when feasible, but never delay treatment of a symptomatic child."),
        ("3. Swallow safely?", "If awake, follows commands, and protects the airway, give oral glucose/food per approved product and reassess. Do not give oral glucose with vomiting, decreased mental status, inability to swallow, or an unprotected airway."),
        ("4. Unsafe oral route", "Obtain IV/IO without delaying care. Give D10 2 mL/kg IV/IO. If access cannot be obtained promptly, give IM glucagon. Support airway and ventilation; request ALS when needed."),
        ("5. DKA concern?", "Evaluate vomiting, abdominal pain, Kussmaul respirations, dehydration, poor perfusion, and mental-status change. Treat clinical dehydration/poor perfusion - not the glucose number alone."),
        ("6. Recheck/transport", "Recheck glucose and neurologic status after every intervention. Monitor for cerebral-edema warning signs, notify destination early, and transport for continued evaluation."),
    ], s, header=("Step", "Approved action")))
    story += section("Provider-level actions", s)
    story.append(grid([
        ("EMT", "Check glucose; provide oral glucose only when swallowing and airway protection are intact; support airway/ventilation when oral treatment is unsafe; request ALS and expedite transport."),
        ("AEMT", "All EMT care plus IV/IO access, D10 2 mL/kg, repeat glucose/neurologic assessment at 5 minutes, one repeat D10 dose for persistent hypoglycemia, and IM glucagon if access is not promptly available."),
        ("Paramedic", "All prior care plus cardiac monitoring, evaluation of alternate causes, and management of dysrhythmia, seizure, shock, or airway compromise. Contact Medical Control early for shock or worsening neurologic findings."),
    ], s, header=("Level", "Approved actions")))
    story += section("Immediate safeguards", s)
    story += bullets([
        "Use AO-02 Newly Born for immediate newborn resuscitation. After immediate stabilization, use this pathway for the approved pediatric hypoglycemia treatment.",
        "Do not give insulin or sodium bicarbonate in the field for suspected pediatric DKA. Do not give routine or repeated large fluid boluses.",
        "A normal or elevated glucose does not explain every altered child. Continue evaluation for trauma, seizure, toxic ingestion, infection, shock, and other causes.",
    ], s)

    story.append(PageBreak())
    story += [Spacer(1, 4), p("PM-02 Pediatric Hypoglycemia / Diabetic Emergency", s["title"]), p("MEDICATIONS, DKA SAFEGUARDS, AND HANDOFF", s["subtitle"])]
    story += section("Medication and fluid pathway", s)
    story.append(grid([
        ("Oral glucose", "Give per approved local product only when the child is awake, follows commands, can swallow, and can protect the airway. Follow with food when clinically appropriate and available."),
        ("Dextrose 10% (D10)", "2 mL/kg IV/IO (0.2 g/kg). Recheck glucose and neurologic status after 5 minutes. Repeat once for persistent hypoglycemia; contact Medical Control for additional dextrose dosing or infusion."),
        ("Glucagon", "Under 20 kg: 0.5 mg IM. 20 kg or greater: 1 mg IM. Use when oral glucose is unsafe and vascular access cannot be obtained promptly. Anticipate nausea/vomiting and protect the airway."),
        ("Normal saline", "For suspected DKA with clinical dehydration or poor perfusion: 10 mL/kg IV/IO, reassess, and repeat once only if needed. Maximum 20 mL/kg before Medical Control."),
    ], s, header=("Therapy", "Dose and role")))
    story += section("DKA, cerebral edema, and refusal safeguards", s)
    story += bullets([
        "Cerebral-edema warning signs include worsening headache, altered mental status, recurrent vomiting, bradycardia, hypertension, or abnormal respirations. Request rapid transport and Medical Control if present.",
        "For suspected DKA, document serial mental status, vital signs, perfusion, lungs, glucose, fluid volume, and response after every intervention. Give early destination notification.",
        "Hypoglycemia refusal requires normal neurologic status/capacity, glucose of at least 80 mg/dL, ability to eat, a reliable caregiver, a clear reversible cause, and no concern for a long-acting oral hypoglycemic agent. Otherwise transport or contact Medical Control.",
    ], s)
    story += section("Transport, documentation, and linked pathways", s)
    story.append(grid([
        ("Transport", "Transport children with persistent or recurrent hypoglycemia, severe symptoms, unsafe oral intake, glucagon use, concern for DKA, dehydration/poor perfusion, or abnormal neurologic findings."),
        ("Handoff", "Document history, insulin/medication exposure, food intake, weight/length system, serial glucose and neurologic findings, treatment dose/route/time/response, oral tolerance, fluids, consultation, caregiver reliability, and destination notification."),
        ("Links", "AO-02 Newly Born; AR-05 Pediatric Airway; PM-03 Pediatric Hypotension / Shock; current Claiborne Medication Reference."),
    ], s, header=("Topic", "Required action")))
    story += [Spacer(1, 4), callout("<b>Critical reminder:</b> Do not give insulin or sodium bicarbonate in the field for suspected pediatric DKA. Treat the child’s airway, perfusion, dehydration, and neurologic condition while transporting promptly.", s, PALE_RED)]
    story += section("Clinical pearls", s)
    story += bullets([
        "D10 2 mL/kg provides 0.2 g/kg of dextrose and is the Claiborne-approved pediatric IV/IO hypoglycemia dose.",
        f"This direct source PDF replaces the prior imported sheet and matches Claiborne-approved PM-02 app content reconciled {REVISION}.",
    ], s)
    doc.build(story)
    temp.replace(OUTPUT)


if __name__ == "__main__":
    build()
    print(f"Built {OUTPUT.name}")
