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
OUTPUT = ROOT / "public/protocols/claiborne/tb-10-traumatic-arrest-protocol.pdf"
TMP_OUTPUT = ROOT / "tmp/pdfs/tb-10-traumatic-arrest-protocol.pdf"

NAVY = HexColor("#143A5A")
RED = HexColor("#A31F34")
PALE_BLUE = HexColor("#EAF2F8")
PALE_RED = HexColor("#F9ECEE")
PALE_GREEN = HexColor("#EDF7F0")
MID_GRAY = HexColor("#56616B")
LIGHT_GRAY = HexColor("#D7DEE4")
REGULAR = "ClaiborneSans"
BOLD = "ClaiborneSansBold"


def p(text, style):
    return Paragraph(text, style)


def make_styles():
    pdfmetrics.registerFont(TTFont(REGULAR, "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont(BOLD, "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("title", parent=base["Title"], fontName=BOLD, fontSize=20, leading=23, textColor=NAVY, spaceAfter=2),
        "subtitle": ParagraphStyle("subtitle", parent=base["Normal"], fontName=BOLD, fontSize=8.2, leading=10.5, textColor=RED, spaceAfter=9),
        "section": ParagraphStyle("section", parent=base["Heading2"], fontName=BOLD, fontSize=11, leading=13, textColor=NAVY, spaceBefore=8, spaceAfter=4),
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName=REGULAR, fontSize=8.25, leading=10.55, textColor=colors.black, spaceAfter=3),
        "table": ParagraphStyle("table", parent=base["BodyText"], fontName=REGULAR, fontSize=7.55, leading=9.35, textColor=colors.black),
        "table_bold": ParagraphStyle("table_bold", parent=base["BodyText"], fontName=BOLD, fontSize=7.55, leading=9.35, textColor=colors.black),
        "callout": ParagraphStyle("callout", parent=base["BodyText"], fontName=BOLD, fontSize=8, leading=10, textColor=NAVY),
    }


def section(title, s):
    return [Spacer(1, 3), p(title, s["section"]), HRFlowable(width="100%", thickness=0.65, color=LIGHT_GRAY, spaceAfter=4)]


def callout(text, s, background=PALE_BLUE):
    table = Table([[p(text, s["callout"])]], colWidths=[7.0 * inch])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), background), ("BOX", (0, 0), (-1, -1), 0.55, NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return table


def grid(rows, s, widths=(1.72 * inch, 5.28 * inch)):
    data = [[p(left, s["table_bold"]), p(right, s["table"])] for left, right in rows]
    table = Table(data, colWidths=list(widths))
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), 0.35, LIGHT_GRAY),
        ("BACKGROUND", (0, 0), (0, -1), PALE_BLUE), ("ROWBACKGROUNDS", (1, 0), (-1, -1), [colors.white, HexColor("#F7F9FB")]),
        ("LEFTPADDING", (0, 0), (-1, -1), 6), ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return table


def bullets(items, s):
    return [p(f"• {item}", s["body"]) for item in items]


def header_footer(canvas, doc):
    canvas.saveState()
    page = canvas.getPageNumber()
    canvas.setStrokeColor(LIGHT_GRAY)
    canvas.setLineWidth(0.4)
    canvas.line(doc.leftMargin, 0.53 * inch, letter[0] - doc.rightMargin, 0.53 * inch)
    canvas.setFont(REGULAR, 6.8)
    canvas.setFillColor(MID_GRAY)
    canvas.drawString(doc.leftMargin, 0.35 * inch, "Claiborne County EMS Clinical Protocols | TB-10 Traumatic Arrest")
    canvas.drawRightString(letter[0] - doc.rightMargin, 0.35 * inch, f"Page {page} of 2")
    canvas.restoreState()


def main():
    s = make_styles()
    TMP_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(str(TMP_OUTPUT), pagesize=letter, leftMargin=0.75 * inch, rightMargin=0.75 * inch, topMargin=0.63 * inch, bottomMargin=0.72 * inch)
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="protocol", frames=[frame], onPage=header_footer)])

    story = [
        p("TB-10 Traumatic Arrest", s["title"]),
        p("MEDICAL-DIRECTOR APPROVED APP CONTENT | AGENCY RELEASE PENDING | Reconciled October 17, 2026", s["subtitle"]),
        callout("<b>Scope:</b> Use for confirmed traumatic circulatory arrest. If trauma does not clearly explain the arrest, begin the adult medical cardiac-arrest pathway while evaluating the cause. Honor valid DNR/MOST documents.", s, PALE_RED),
    ]
    story += section("Immediate decision pathway", s)
    story.append(grid([
        ("1. Confirm arrest", "Assess apnea, pulselessness, rhythm when appropriate, mechanism, valid DNR/MOST, and unmistakable death findings. Do not delay lifesaving care for a lengthy examination."),
        ("2. Withhold only when authorized", "Withhold resuscitation only for a valid DNR/MOST or unmistakable death: decomposition, rigor mortis, dependent lividity, decapitation, hemicorporectomy, or injury incompatible with life. Downtime alone is not a Claiborne withholding rule."),
        ("3. Start and prioritize", "For a resuscitation candidate, control catastrophic hemorrhage, support oxygenation and ventilation, prevent hypothermia, and address immediately reversible traumatic causes without delaying definitive care."),
        ("4. Reversible causes", "Treat hemorrhage, tension physiology, hypoxia, and pelvic instability when indicated. Apply a pelvic binder only for suspected pelvic fracture or significant pelvic mechanism."),
        ("5. CPR / defibrillation", "Perform high-quality CPR. Defibrillate a shockable rhythm while immediate reversible causes are treated. Do not hyperventilate."),
        ("6. Destination / consultation", "Notify early. Move to the most appropriate trauma or stabilization facility when transport offers a feasible path to definitive care and does not delay essential interventions."),
    ], s))
    story += section("Provider-level actions", s)
    story.append(grid([
        ("EMT", "Confirm arrest and withholding criteria; control catastrophic hemorrhage; support airway and ventilation; apply AED/monitor; stabilize pelvis only when indicated; prevent hypothermia; and begin rapid transport when resuscitation is indicated."),
        ("AEMT", "Perform EMT actions plus IV/IO access and authorized airway support during transport. Do not perform chest decompression. Assist the Paramedic with the procedure when requested."),
        ("Paramedic", "Perform all prior actions; lead advanced airway management, rhythm treatment, and chest decompression when tension physiology is suspected. Consider bilateral decompression when mechanism, examination, or physiology supports it. Continue or terminate resuscitation only under Claiborne policy and Medical Control requirements."),
    ], s))
    story += section("Critical scope safeguard", s)
    story.append(callout("<b>Chest decompression is Paramedic-only.</b> Tennessee's current statewide protocol guideline places chest decompression in the Paramedic procedure set. An AEMT may assist but does not perform the procedure under TB-10.", s, PALE_RED))
    story.append(PageBreak())

    story += [p("TB-10 Traumatic Arrest", s["title"]), p("SPECIAL CIRCUMSTANCES, SAFEGUARDS, AND HANDOFF", s["subtitle"])]
    story += section("Withholding, continuation, and termination", s)
    story.append(grid([
        ("Do not use this pathway", "For lightning strike, drowning/submersion, or hypothermic arrest, initiate resuscitation and use the linked special-circumstance pathway."),
        ("Do not withhold based on time alone", "A prolonged estimated downtime does not by itself authorize withholding. A patient who has signs of life, a witnessed arrest, an organized rhythm, a potentially reversible cause, or a feasible path to definitive care is a resuscitation candidate."),
        ("Termination after resuscitation begins", "Follow current Claiborne termination policy and obtain Medical Control when required. Document the clinical findings, interventions, response, receiving-facility or Medical Control communication, and disposition."),
        ("Unclear medical vs traumatic cause", "If major trauma does not clearly explain arrest, work the patient under the adult medical cardiac-arrest pathway while evaluating for trauma and other reversible causes."),
    ], s))
    story += section("Operational safeguards", s)
    story += bullets([
        "Do not delay transport for endotracheal intubation, vascular access, or nonessential procedures. Use two-person BVM first when it provides effective oxygenation and ventilation.",
        "Do not hyperventilate. Before an advanced airway, use 30:2 compressions to ventilations. After an advanced airway, ventilate once every 6 seconds with continuous compressions and waveform capnography when available.",
        "Avoid indiscriminate fluids and procedures. Hemorrhage control, oxygenation, decompression when indicated, warming, and rapid access to definitive care take priority.",
        "Use AC-03 only for arrest not clearly caused by trauma. Transition to the appropriate post-resuscitation pathway after ROSC.",
    ], s)
    story += section("Documentation and handoff", s)
    story += bullets([
        "Document mechanism, witnessed status and estimated downtime when known, DNR/MOST or obvious-death findings, initial and subsequent rhythms, signs of life, hemorrhage control, airway/ventilation, chest decompression when performed, pelvic stabilization, temperature measures, medications, ROSC, and disposition.",
        "Record Medical Control contact, the authorizing clinician when applicable, termination rationale, destination notification, and the deceased-person policy process when resuscitation is withheld or terminated.",
        "This document matches Claiborne-approved app content reconciled October 17, 2026. Final agency release remains subject to Claiborne County EMS release governance.",
    ], s)

    doc.build(story)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    TMP_OUTPUT.replace(OUTPUT)


if __name__ == "__main__":
    main()
