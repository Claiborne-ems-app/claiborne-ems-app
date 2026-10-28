"""Build the approved Claiborne County EMS PM-03 source PDF."""

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
TMP = ROOT / "tmp/pdfs/pm03-approved"
OUTPUT = PUBLIC / "pm-03-pediatric-hypotension-shock-protocol.pdf"
REVISION = "October 26, 2026"
NAVY, RED = HexColor("#143A5A"), HexColor("#A31F34")
PALE_BLUE, PALE_RED, LIGHT_GRAY, MID_GRAY = HexColor("#EAF2F8"), HexColor("#F9ECEE"), HexColor("#D7DEE4"), HexColor("#56616B")
REGULAR, BOLD = "ClaiborneSans", "ClaiborneSansBold"


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
    box.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), background), ("BOX", (0, 0), (-1, -1), 0.55, NAVY), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
    return box


def grid(rows, s, header):
    data = [[p(header[0], s["head"]), p(header[1], s["head"])]]
    data += [[p(left, s["table_bold"]), p(right, s["table"])] for left, right in rows]
    table = Table(data, colWidths=[1.38 * inch, 5.62 * inch], repeatRows=1)
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), 0.35, LIGHT_GRAY),
        ("LEFTPADDING", (0, 0), (-1, -1), 5.5), ("RIGHTPADDING", (0, 0), (-1, -1), 5.5),
        ("TOPPADDING", (0, 0), (-1, -1), 3.8), ("BOTTOMPADDING", (0, 0), (-1, -1), 3.8),
        ("BACKGROUND", (0, 0), (-1, 0), NAVY), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#F7F9FB")]),
    ]))
    return table


def bullets(items, s):
    return [p(f"• {item}", s["body"]) for item in items]


def build():
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
        canvas.drawString(doc.leftMargin, 0.35 * inch, "Claiborne County EMS Clinical Protocols | PM-03 Pediatric Hypotension / Shock")
        canvas.drawRightString(letter[0] - doc.rightMargin, 0.35 * inch, f"Page {canvas.getPageNumber()} of 2")
        canvas.restoreState()

    doc = BaseDocTemplate(str(temp), pagesize=letter, leftMargin=.75 * inch, rightMargin=.75 * inch, topMargin=.63 * inch, bottomMargin=.72 * inch)
    doc.addPageTemplates([PageTemplate(id="protocol", frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")], onPage=footer)])
    story = [
        p("PM-03 Pediatric Hypotension / Shock", s["title"]),
        p(f"CLAIBORNE COUNTY EMS | MEDICAL-DIRECTOR APPROVED | Reconciled {REVISION}", s["subtitle"]),
        callout("<b>Recognize pediatric shock before hypotension develops.</b> Use perfusion and clinical trends, not one blood-pressure value or a shock-index shortcut. Treat the likely cause while supporting airway, oxygenation, and circulation.", s, PALE_RED),
    ]
    story += section("Recognition and field flow", s)
    story.append(grid([
        ("1. Recognize shock", "Assess mental status, central/peripheral pulses, capillary refill, skin temperature/color, work of breathing, BP trend, history, and likely cause. Hypotension is a late, ominous sign."),
        ("2. Immediate care", "Support airway/ventilation, control external hemorrhage, keep warm, check glucose, monitor ECG/SpO2, and obtain rapid IV/IO. Do not delay critical treatment for repeated IV attempts."),
        ("3. Identify type", "Consider hypovolemic/hemorrhagic, distributive/septic, cardiogenic, or obstructive shock. Use age-adjusted vital signs, perfusion findings, and clinical trends."),
        ("4. Fluids", "Hypovolemic/distributive: isotonic crystalloid 10-20 mL/kg IV/IO aliquots with reassessment after every bolus. Cardiogenic: 5-10 mL/kg cautiously with early Medical Control."),
        ("5. Refractory/obstructive", "For fluid-refractory septic shock, contact Medical Control for epinephrine or norepinephrine infusion. Decompress tension pneumothorax and treat other obstructive causes when indicated."),
        ("6. Transport", "Reassess perfusion, lungs, mental status, glucose, and BP after every intervention. Notify a pediatric-capable destination early and transport without delay."),
    ], s, ("Step", "Approved action")))
    story += section("Age-defined hypotension and provider actions", s)
    story.append(grid([
        ("Hypotension", "Neonate: SBP below 60. Age 1 month to younger than 1 year: below 70. Age 1-9 years: below 70 + (2 x age in years). Age 10 years or older: below 90 mmHg."),
        ("EMT", "Support airway/ventilation, control external hemorrhage, keep warm, assess glucose, apply monitoring when available, recognize compensated shock, and expedite transport."),
        ("AEMT", "All EMT care plus rapid IV/IO access and shock-type-specific isotonic-crystalloid aliquots with reassessment after every dose. Use IO promptly when access is not quickly available in critical shock."),
        ("Paramedic", "All prior care plus cardiac monitoring, needle decompression for tension pneumothorax, and Medical-Control-directed vasoactive infusion for fluid-refractory septic shock."),
    ], s, ("Topic", "Approved action")))
    story += section("Immediate safeguards", s)
    story += bullets([
        "Reassess after every fluid bolus for perfusion, lungs, hepatomegaly, work of breathing, and other signs of volume overload.",
        "Avoid routine 20-mL/kg boluses in suspected cardiogenic shock. Open PC-03 Pediatric Pulmonary Edema / CHF and use small, cautious aliquots.",
        "Treat the cause: control hemorrhage, give epinephrine for anaphylaxis, decompress tension pneumothorax, and use the appropriate cardiac or airway pathway.",
    ], s)

    story.append(PageBreak())
    story += [Spacer(1, 4), p("PM-03 Pediatric Hypotension / Shock", s["title"]), p("FLUIDS, ADRENAL-CRISIS SAFEGUARDS, AND HANDOFF", s["subtitle"])]
    story += section("Fluid, vasoactive, and emergency steroid pathway", s)
    story.append(grid([
        ("Hypovolemic/distributive", "Isotonic crystalloid 10-20 mL/kg IV/IO aliquots. Reassess after every bolus; further fluid is individualized with Medical Control."),
        ("Cardiogenic", "Isotonic crystalloid 5-10 mL/kg IV/IO cautiously with early Medical Control. Reassess after each aliquot and monitor for pulmonary edema."),
        ("Vasoactive infusion", "Epinephrine or norepinephrine infusion is Medical-Control-directed for fluid-refractory septic shock. Verify pediatric formulation and dose in the current medication reference."),
        ("Adrenal crisis", "For known or suspected adrenal crisis, use the patient's prescribed emergency steroid plan when available. Otherwise use a Medical-Control-directed equivalent. Do not use routine corticosteroids for septic shock."),
    ], s, ("Therapy", "Dose and role")))
    story += section("Cause-specific pathway and reassessment", s)
    story += bullets([
        "Hypovolemic/hemorrhagic: control external bleeding, package for rapid transport, and use the applicable trauma/hemorrhage pathway.",
        "Distributive: use PM-01 for anaphylactic shock; assess for sepsis, neurogenic causes, medication/toxin effect, and adrenal crisis when history or emergency plan supports it.",
        "Obstructive: assess for tension pneumothorax, tamponade, and other obstructive causes. Treat immediately when an approved intervention is indicated.",
        "Document serial mental status, vital signs, perfusion, fluid volume, lung findings, vasoactive/airway interventions, consultation, and response after every intervention.",
    ], s)
    story += section("Transport, documentation, and linked pathways", s)
    story.append(grid([
        ("Transport", "All children with suspected shock require prompt transport. Escalate destination notification for persistent poor perfusion, airway compromise, cardiogenic shock, suspected sepsis, or vasoactive support."),
        ("Handoff", "Communicate likely shock type, precipitating history, age/weight source, serial perfusion and vital signs, fluids/medications with response, airway support, consultation, and destination notification."),
        ("Links", "AR-05 Pediatric Airway; PC-03 Pediatric Pulmonary Edema / CHF; PM-01 Pediatric Anaphylaxis; current Claiborne Medication Reference."),
    ], s, ("Topic", "Required action")))
    story += [Spacer(1, 4), callout("<b>Critical reminder:</b> Hypotension is late in pediatric shock. Reassess after every intervention, avoid excess fluid in cardiogenic shock, and contact Medical Control early for fluid-refractory shock or an adrenal-crisis treatment decision.", s, PALE_RED)]
    story += section("Clinical pearls", s)
    story += bullets([
        "Early pediatric shock is recognized by perfusion and behavior changes before hypotension develops.",
    ], s)
    doc.build(story)
    temp.replace(OUTPUT)


if __name__ == "__main__":
    build()
    print(f"Built {OUTPUT.name}")
