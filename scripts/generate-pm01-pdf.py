"""Build the approved Claiborne County EMS PM-01 source PDF.

This controlled direct-source replacement supersedes the imported North
Carolina sheet. It mirrors the approved structured PM-01 app content.
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
PUBLIC = ROOT / "public/protocols/claiborne"
TMP = ROOT / "tmp/pdfs/pm01-approved"
OUTPUT = PUBLIC / "pm-01-pediatric-allergic-reaction-protocol.pdf"
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
        canvas.drawString(doc.leftMargin, 0.35 * inch, "Claiborne County EMS Clinical Protocols | PM-01 Pediatric Anaphylaxis")
        canvas.drawRightString(letter[0] - doc.rightMargin, 0.35 * inch, f"Page {canvas.getPageNumber()} of 2")
        canvas.restoreState()

    doc = BaseDocTemplate(str(temp), pagesize=letter, leftMargin=.75 * inch, rightMargin=.75 * inch, topMargin=.63 * inch, bottomMargin=.72 * inch)
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="protocol", frames=[frame], onPage=footer)])
    return doc, s, temp


def build():
    doc, s, temp = document()
    story = [
        p("PM-01 Pediatric Anaphylaxis / Allergic Reaction", s["title"]),
        p(f"CLAIBORNE COUNTY EMS | MEDICAL-DIRECTOR APPROVED | Reconciled {REVISION}", s["subtitle"]),
        callout("<b>Epinephrine is first-line treatment.</b> For suspected anaphylaxis, give IM epinephrine immediately. Do not delay for IV/IO access, antihistamine, corticosteroid, albuterol, monitoring, or transport preparation.", s, PALE_RED),
    ]
    story += section("Recognition and field flow", s)
    story.append(grid([
        ("1. Assess", "Assess airway, breathing, circulation, skin/mucosa, GI and cardiovascular symptoms, perfusion, onset, and likely trigger. Remove the trigger when safe."),
        ("2. Anaphylaxis?", "Treat when there is airway/breathing compromise, hypotension/poor perfusion, or acute involvement of 2 or more body systems after a likely allergen. Rash may be absent."),
        ("3. IM epinephrine now", "Epinephrine 1 mg/mL: 0.01 mg/kg IM in the mid-outer thigh; maximum 0.3 mg prepubertal child or 0.5 mg adolescent. Repeat every 5 minutes while significant symptoms persist."),
        ("4. Support ABCs", "Position supine when tolerated; oxygen, suction, BVM, and early airway planning as indicated. Give albuterol only for persistent lower-airway bronchospasm after epinephrine."),
        ("5. Shock/refractory", "For hypotension or poor perfusion, give normal saline 20 mL/kg IV/IO and reassess after every bolus. Repeat IM epinephrine. Contact Medical Control early for refractory symptoms or epinephrine infusion."),
        ("6. Reassess/transport", "Continuous ECG, SpO2, BP, respiratory, mental-status, and perfusion reassessment. Transport every child treated with epinephrine or with airway, respiratory, circulatory, progressive, or multisystem symptoms."),
    ], s, header=("Step", "Approved action")))
    story += section("Provider-level actions", s)
    story.append(grid([
        ("EMT", "Remove the trigger when safe; support airway and ventilation; give authorized IM epinephrine for suspected anaphylaxis; position safely; monitor when available; and expedite transport."),
        ("AEMT", "All EMT care plus rapid IV/IO access without delaying epinephrine, normal saline for anaphylactic shock with reassessment after each bolus, albuterol for bronchospasm, and authorized repeat IM epinephrine."),
        ("Paramedic", "All prior care plus advanced airway support, Paramedic-only diphenhydramine for isolated or persistent cutaneous symptoms after stabilization, methylprednisolone as an adjunct, and Medical-Control-directed epinephrine infusion for refractory anaphylaxis after repeated IM doses."),
    ], s, header=("Level", "Approved actions")))
    story += section("Immediate safeguards", s)
    story += bullets([
        "Do not allow a hypotensive or poorly perfused child to stand or walk. A falling blood pressure may be late; poor perfusion or respiratory compromise warrants action before hypotension develops.",
        "Do not use intranasal epinephrine as the EMS anaphylaxis treatment pathway. Do not give a routine IV/IO epinephrine bolus for anaphylaxis.",
        "Albuterol treats lower-airway bronchospasm only. It does not reverse upper-airway edema, hypotension, or shock.",
    ], s)

    story.append(PageBreak())
    story += [
        Spacer(1, 18),
        p("PM-01 Pediatric Anaphylaxis / Allergic Reaction", s["title"]),
        p("MEDICATIONS, REFRACTORY CARE, AND HANDOFF", s["subtitle"]),
    ]
    story += section("Medication and fluid pathway", s)
    story.append(grid([
        ("Epinephrine 1 mg/mL", "0.01 mg/kg IM in the mid-outer thigh; maximum 0.3 mg prepubertal child or 0.5 mg adolescent; repeat every 5 minutes as needed."),
        ("Albuterol", "Under 20 kg: 2.5 mg nebulized. 20 kg or greater: 5 mg nebulized. Use only for lower-airway bronchospasm after epinephrine."),
        ("Normal saline", "20 mL/kg IV/IO for anaphylactic shock. Reassess perfusion, lungs, work of breathing, and response after every bolus."),
        ("Diphenhydramine", "Paramedic: 1 mg/kg PO/IV/IO/IM; maximum 50 mg. Adjunct only for isolated or persistent cutaneous symptoms after stabilization."),
        ("Methylprednisolone", "2 mg/kg IV; maximum 125 mg. Adjunct only; delayed benefit. Do not delay or replace epinephrine."),
        ("Epinephrine infusion", "Medical-Control-directed only for refractory anaphylaxis after repeated IM epinephrine. Use a labeled infusion and continuous monitoring; do not give a routine IV/IO epinephrine bolus."),
    ], s, header=("Therapy", "Dose and role")))
    story += section("Airway, refractory symptoms, and shock", s)
    story += bullets([
        "For progressive facial, tongue, or airway swelling, request airway resources early and use AR-05 Pediatric Airway and AR-06 Pediatric Failed Airway. Avoid repeated or traumatic airway attempts.",
        "If significant symptoms persist after repeat IM epinephrine, continue IM dosing every 5 minutes as indicated, provide airway and fluid support, contact Medical Control, and prepare a monitored epinephrine infusion only with explicit direction.",
        "Do not administer oral medication to a child with decreased mental status, vomiting, inability to swallow, or an unprotected airway. Avoid diphenhydramine in hypotension, poor perfusion, or decreased mental status.",
    ], s)
    story += section("Transport, documentation, and linked pathways", s)
    story.append(grid([
        ("Transport", "Every child treated with epinephrine, or with airway, respiratory, cardiovascular, progressive, or multisystem symptoms, requires ED evaluation and continuous reassessment for recurrence."),
        ("Handoff", "Document trigger/exposure, onset, serial findings and vital signs, weight/length system, epinephrine concentration/dose/route/site/time, response, airway support, fluids, adjuncts, consultation, and destination notification."),
        ("Links", "AR-05 Pediatric Airway; AR-06 Pediatric Failed Airway; AR-07 Pediatric Respiratory Distress; PM-03 Pediatric Hypotension / Shock; current Claiborne Medication Reference."),
    ], s, header=("Topic", "Required action")))
    story += [Spacer(1, 4), callout("<b>Critical reminder:</b> Antihistamines and corticosteroids are adjuncts. They never replace epinephrine and must not delay its initial or repeat administration.", s, PALE_RED)]
    story += section("Clinical pearls", s)
    story += bullets([
        "The mid-outer thigh is the preferred IM epinephrine site for reliable absorption. If concern is high, give IM epinephrine rather than waiting for every diagnostic criterion.",
        f"This direct source PDF replaces the prior imported sheet and matches Claiborne-approved PM-01 app content reconciled {REVISION}.",
    ], s)
    doc.build(story)
    temp.replace(OUTPUT)


if __name__ == "__main__":
    build()
    print(f"Built {OUTPUT.name}")
