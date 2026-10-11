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
OUTPUT = ROOT / "public/protocols/claiborne/ac-03-cardiac-arrest-adult-protocol.pdf"
TMP_OUTPUT = ROOT / "tmp/pdfs/ac-03-cardiac-arrest-adult-protocol.pdf"

NAVY = HexColor("#143A5A")
RED = HexColor("#A31F34")
PALE_BLUE = HexColor("#EAF2F8")
PALE_RED = HexColor("#F9ECEE")
MID_GRAY = HexColor("#56616B")
LIGHT_GRAY = HexColor("#D7DEE4")
REGULAR_FONT = "ClaiborneSans"
BOLD_FONT = "ClaiborneSansBold"


def paragraph(text, style):
    return Paragraph(text, style)


def styles():
    pdfmetrics.registerFont(TTFont(REGULAR_FONT, "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont(BOLD_FONT, "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("title", parent=base["Title"], fontName=BOLD_FONT, fontSize=20, leading=23, textColor=NAVY, spaceAfter=2),
        "subtitle": ParagraphStyle("subtitle", parent=base["Normal"], fontName=BOLD_FONT, fontSize=8.2, leading=11, textColor=RED, spaceAfter=10),
        "section": ParagraphStyle("section", parent=base["Heading2"], fontName=BOLD_FONT, fontSize=11, leading=13, textColor=NAVY, spaceBefore=8, spaceAfter=5),
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName=REGULAR_FONT, fontSize=8.25, leading=10.6, textColor=colors.black, spaceAfter=3),
        "table": ParagraphStyle("table", parent=base["BodyText"], fontName=REGULAR_FONT, fontSize=7.5, leading=9.35, textColor=colors.black),
        "table_bold": ParagraphStyle("table_bold", parent=base["BodyText"], fontName=BOLD_FONT, fontSize=7.5, leading=9.35, textColor=colors.black),
        "table_head": ParagraphStyle("table_head", parent=base["BodyText"], fontName=BOLD_FONT, fontSize=7.5, leading=9, textColor=colors.white),
        "callout": ParagraphStyle("callout", parent=base["BodyText"], fontName=BOLD_FONT, fontSize=8, leading=10, textColor=NAVY),
    }


def section(title, s):
    return [
        Spacer(1, 3),
        paragraph(title, s["section"]),
        HRFlowable(width="100%", thickness=0.65, color=LIGHT_GRAY, spaceAfter=4),
    ]


def callout(text, s, background=PALE_BLUE):
    block = Table([[paragraph(text, s["callout"])]], colWidths=[7.0 * inch])
    block.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), background),
        ("BOX", (0, 0), (-1, -1), 0.55, NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return block


def grid(rows, s, widths=(1.7 * inch, 5.3 * inch), header=None):
    data = []
    if header:
        data.append([paragraph(header[0], s["table_head"]), paragraph(header[1], s["table_head"])])
    data += [[paragraph(left, s["table_bold"]), paragraph(right, s["table"])] for left, right in rows]
    table = Table(data, colWidths=list(widths), repeatRows=1 if header else 0)
    style = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.35, LIGHT_GRAY),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    if header:
        style += [
            ("BACKGROUND", (0, 0), (-1, 0), NAVY),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#F7F9FB")]),
        ]
    else:
        style += [
            ("BACKGROUND", (0, 0), (0, -1), PALE_BLUE),
            ("ROWBACKGROUNDS", (1, 0), (-1, -1), [colors.white, HexColor("#F7F9FB")]),
        ]
    table.setStyle(TableStyle(style))
    return table


def bullets(items, s):
    return [paragraph(f"• {item}", s["body"]) for item in items]


def header_footer(canvas, doc):
    canvas.saveState()
    page_num = canvas.getPageNumber()
    canvas.setStrokeColor(LIGHT_GRAY)
    canvas.setLineWidth(0.4)
    canvas.line(doc.leftMargin, 0.53 * inch, letter[0] - doc.rightMargin, 0.53 * inch)
    canvas.setFont(REGULAR_FONT, 6.8)
    canvas.setFillColor(MID_GRAY)
    canvas.drawString(doc.leftMargin, 0.35 * inch, "Claiborne County EMS Clinical Protocols | AC-03 Adult Cardiac Arrest")
    canvas.drawRightString(letter[0] - doc.rightMargin, 0.35 * inch, f"Page {page_num} of 2")
    canvas.restoreState()


def main():
    s = styles()
    TMP_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(TMP_OUTPUT), pagesize=letter,
        leftMargin=0.75 * inch, rightMargin=0.75 * inch,
        topMargin=0.63 * inch, bottomMargin=0.72 * inch,
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="protocol", frames=[frame], onPage=header_footer)])

    story = [
        paragraph("AC-03 Adult Cardiac Arrest", s["title"]),
        paragraph("MEDICAL-DIRECTOR APPROVED APP CONTENT | AGENCY RELEASE PENDING | Reconciled October 10, 2026", s["subtitle"]),
        callout("<b>Scope:</b> Use for patients age 16 years or older who are unresponsive, have absent or abnormal breathing, and have no definite pulse within 10 seconds. Honor valid DNR/MOST and obvious-death criteria.", s, PALE_RED),
    ]
    story += section("Immediate coordinated resuscitation", s)
    story.append(grid([
        ("1. Begin CPR", "Compressions 100-120/min, depth 2-2.4 in, full recoil, and minimal pauses. Change compressor every 2 minutes or sooner if fatigued. Target chest-compression fraction above 80%."),
        ("2. Attach AED / monitor", "Analyze rhythm immediately. Resume CPR immediately after every analysis or shock. Check a pulse only with an organized rhythm and limit the check to 10 seconds."),
        ("3. Rhythm pathway", "VF/pulseless VT: open AC-09. Asystole/PEA: open AC-01. Repeat rhythm analysis every 2 minutes."),
        ("4. Access + medication", "One rapid IV attempt, then IO if unsuccessful or delayed. Epinephrine 1 mg IV/IO every 3-5 minutes: as soon as possible for asystole/PEA and after the second shock for VF/pulseless VT."),
        ("5. Airway + ventilation", "Use two-person BVM first and 30:2 before an advanced airway. Do not interrupt compressions for airway placement. After an advanced airway, give 1 breath every 6 seconds with continuous compressions and waveform capnography."),
        ("6. Reassess", "Treat reversible causes, confirm mechanical pulse when an organized rhythm appears, move to AC-10 after ROSC, or consider AC-12 when resuscitation remains unsuccessful."),
    ], s))
    story += section("Shockable-rhythm medication and defibrillation", s)
    story.append(grid([
        ("Defibrillation", "For VF/pulseless VT, give an initial 200 J biphasic shock. Verify the manufacturer-recommended setting; use the same or higher energy for subsequent shocks. Resume CPR immediately after every shock."),
        ("Epinephrine", "1 mg IV/IO every 3-5 minutes. Give after the second shock for VF/pulseless VT; give as soon as possible for asystole/PEA."),
        ("Amiodarone", "300 mg IV/IO after the third shock for refractory VF/pulseless VT; may repeat 150 mg IV/IO once."),
        ("Lidocaine", "Alternative to amiodarone after the third shock: 1-1.5 mg/kg IV/IO initially; then 0.5-0.75 mg/kg every 5-10 minutes; maximum total 3 mg/kg. Do not combine with amiodarone without Medical Control."),
    ], s, header=("Therapy", "Approved dose / use")))
    story += [Spacer(1, 5), callout("<b>Cause-directed care:</b> Evaluate and treat the Hs and Ts. Do not routinely give calcium, sodium bicarbonate, magnesium, fluid, antidotes, or other cause-specific therapy without an appropriate suspected or confirmed cause.", s)]
    story.append(PageBreak())

    story += [
        paragraph("AC-03 Adult Cardiac Arrest", s["title"]),
        paragraph("SPECIAL CIRCUMSTANCES, SAFEGUARDS, AND DOCUMENTATION", s["subtitle"]),
    ]
    story += section("Special circumstances and linked pathways", s)
    story.append(grid([
        ("Pregnancy", "Begin standard resuscitation. When the fundus is at or above the umbilicus, use continuous left uterine displacement, notify Medical Control early, and plan an obstetric-capable destination when clinically appropriate. Use AO-03 for related obstetric care."),
        ("Traumatic arrest", "Use TB-10 because hemorrhage control, oxygenation, bilateral chest decompression, and transport decisions differ from primary medical arrest."),
        ("Opioid / toxicologic", "Naloxone or an antidote may be considered only when it does not delay CPR, defibrillation, airway support, or standard cardiac-arrest medications. Use TE-07."),
        ("Drowning / hypothermia", "Use TE-03 or TE-05 because oxygenation, pulse assessment, medication timing, resuscitation duration, and transport priorities may differ."),
        ("Mechanical circulatory device", "Use AC-14 or the applicable device pathway. A continuous-flow device may not produce a palpable pulse; assess perfusion and device function before starting compressions."),
    ], s))
    story += section("Safety checks", s)
    story += bullets([
        "High-quality CPR and early defibrillation for a shockable rhythm take priority over vascular access, medication preparation, airway placement, and scene movement.",
        "Do not routinely transport during active CPR. Favor on-scene resuscitation unless a defined special circumstance supports transport or ROSC is sustained.",
        "Do not use push-dose epinephrine, routine head-up CPR, double-sequential defibrillation, vector-change defibrillation, or point-of-care ultrasound under this protocol.",
        "A sudden sustained EtCO2 increase may suggest ROSC; do not use a single EtCO2 value or any single finding alone to terminate resuscitation.",
    ], s)
    story += section("Documentation and handoff", s)
    story += bullets([
        "Document downtime and witnessed status when known, bystander CPR/AED use, initial and subsequent rhythms, compression-quality interventions, shocks/energy, medication times and doses, airway/capnography findings, suspected cause, ROSC, and disposition.",
        "For ROSC, transition immediately to AC-10 and notify the receiving facility early. For persistent arrest, apply AC-12 and Medical Control requirements when appropriate.",
        "This document matches approved app content reconciled October 10, 2026. Final agency release remains subject to Claiborne County EMS release governance.",
    ], s)

    doc.build(story)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    TMP_OUTPUT.replace(OUTPUT)


if __name__ == "__main__":
    main()
