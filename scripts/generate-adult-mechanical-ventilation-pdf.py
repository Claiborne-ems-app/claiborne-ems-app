"""Build the approved AR-11 Claiborne adult mechanical-ventilation source PDF.

This controlled source replaces the legacy imported state-branded document and
matches the approved native app content for the October 2026 AR-11 release.
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
DESTINATION = ROOT / "public/protocols/claiborne/ar-11-mechanical-ventilation-adult.pdf"
TMP = ROOT / "tmp/pdfs/adult-airway-release/ar-11-mechanical-ventilation-adult.pdf"
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
        "title": ParagraphStyle("title", parent=base["Title"], fontName=BOLD, fontSize=18, leading=21, textColor=NAVY, spaceAfter=2),
        "subtitle": ParagraphStyle("subtitle", parent=base["Normal"], fontName=BOLD, fontSize=8, leading=10, textColor=RED, spaceAfter=8),
        "section": ParagraphStyle("section", parent=base["Heading2"], fontName=BOLD, fontSize=10.5, leading=12.5, textColor=NAVY, spaceBefore=6, spaceAfter=3),
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName=REGULAR, fontSize=7.8, leading=9.5, spaceAfter=3),
        "table": ParagraphStyle("table", parent=base["BodyText"], fontName=REGULAR, fontSize=7.05, leading=8.4),
        "table_bold": ParagraphStyle("table_bold", parent=base["BodyText"], fontName=BOLD, fontSize=7.05, leading=8.4),
        "table_head": ParagraphStyle("table_head", parent=base["BodyText"], fontName=BOLD, fontSize=7.05, leading=8.4, textColor=colors.white),
        "callout": ParagraphStyle("callout", parent=base["BodyText"], fontName=BOLD, fontSize=7.6, leading=9.3, textColor=NAVY),
        "tiny": ParagraphStyle("tiny", parent=base["BodyText"], fontName=REGULAR, fontSize=6.65, leading=7.8),
        "tiny_bold": ParagraphStyle("tiny_bold", parent=base["BodyText"], fontName=BOLD, fontSize=6.65, leading=7.8),
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


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LIGHT_GRAY)
    canvas.setLineWidth(0.4)
    canvas.line(doc.leftMargin, 0.53 * inch, letter[0] - doc.rightMargin, 0.53 * inch)
    canvas.setFont(REGULAR, 6.8)
    canvas.setFillColor(MID_GRAY)
    canvas.drawString(doc.leftMargin, 0.35 * inch, "Claiborne County EMS Clinical Protocols | AR-11 Mechanical Ventilation, Adult")
    canvas.drawRightString(letter[0] - doc.rightMargin, 0.35 * inch, f"Page {canvas.getPageNumber()} of 3")
    canvas.restoreState()


def ibw_kg(sex, inches):
    base = 45.5 if sex == "Female" else 50.0
    return base + 2.3 * (inches - 60)


def format_height(inches):
    return f"{inches // 12}'{inches % 12}\""


def ibw_table(styles):
    rows = [[
        paragraph("Height", styles["table_head"]),
        paragraph("Female IBW / 6-8 mL/kg", styles["table_head"]),
        paragraph("Male IBW / 6-8 mL/kg", styles["table_head"]),
    ]]
    for inches in range(60, 79, 3):
        female = ibw_kg("Female", inches)
        male = ibw_kg("Male", inches)
        rows.append([
            paragraph(format_height(inches), styles["tiny_bold"]),
            paragraph(f"{female:.1f} kg / {female * 6:.0f}-{female * 8:.0f} mL", styles["tiny"]),
            paragraph(f"{male:.1f} kg / {male * 6:.0f}-{male * 8:.0f} mL", styles["tiny"]),
        ])
    table = Table(rows, colWidths=[0.78 * inch, 3.11 * inch, 3.11 * inch], repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY), ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.35, LIGHT_GRAY), ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#F7F9FB")]),
        ("LEFTPADDING", (0, 0), (-1, -1), 4.5), ("RIGHTPADDING", (0, 0), (-1, -1), 4.5),
        ("TOPPADDING", (0, 0), (-1, -1), 3.2), ("BOTTOMPADDING", (0, 0), (-1, -1), 3.2),
    ]))
    return table


def build():
    styles = make_styles()
    TMP.parent.mkdir(parents=True, exist_ok=True)
    DESTINATION.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(str(TMP), pagesize=letter, leftMargin=.75 * inch, rightMargin=.75 * inch, topMargin=.63 * inch, bottomMargin=.72 * inch)
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="protocol", frames=[frame], onPage=header_footer)])

    story = [
        paragraph("AR-11 Mechanical Ventilation, Adult", styles["title"]),
        paragraph(f"MEDICAL-DIRECTOR APPROVED APP CONTENT | SOURCE-PDF REPLACEMENT | Reconciled {REVISION}", styles["subtitle"]),
        callout("<b>Scope:</b> Adult advanced-airway patient requiring mechanical ventilation or an interfacility/home-ventilator patient. Maintain safe established settings when they are known and functioning; use this pathway for a new controlled setup or clinically necessary adjustment.", styles, PALE_RED),
    ]
    story += section("New controlled setup", styles)
    story.append(grid([
        ("1. Confirm", "Waveform EtCO2, tube depth, bilateral exam, securement, SpO2, hemodynamics, and analgesia/sedation. Use AR-08 after every ETT or BIAD."),
        ("2. Choose mode", "Use volume assist-control for a new controlled setup. Do not overwrite stable home or transfer settings without a clinical reason."),
        ("3. Set tidal volume", "Use 6-8 mL/kg Ideal Body Weight (IBW), based on height and sex - never actual scale weight. Start at 6 mL/kg for ARDS, restrictive physiology, or elevated pressures."),
        ("4. Start oxygenation", "PEEP 5 cm H2O. FiO2 100% only until a reliable oxygen-saturation measurement is available; then use the lowest effective FiO2 and small, reassessed PEEP changes."),
        ("5. Reassess", "Synchrony, chest excursion, waveform EtCO2 trend, SpO2, exhalation, hemodynamics, PIP, and plateau pressure when a valid measurement is possible."),
    ], styles))
    story += section("Rate and oxygenation branch", styles)
    story.append(grid([
        ("Usual adult physiology", "Begin 10-12/min. Titrate only after reassessing patient response, waveform EtCO2 trend, and blood-gas information when available."),
        ("COPD / asthma", "Begin 8-10/min with high inspiratory flow and I:E about 1:4-1:5. Confirm expiratory flow returns to baseline; avoid air trapping and auto-PEEP."),
        ("Oxygen target", "SpO2 92-98% unless a condition-specific target applies. After ROSC, target SpO2 90-98%; EtCO2 is not a direct substitute for PaCO2."),
    ], styles, header=("Patient / goal", "Approved action")))
    story += [Spacer(1, 5), callout("<b>Alarm or deterioration:</b> If the cause is not immediately clear, disconnect the ventilator, manually ventilate with a BVM, stabilize the patient, and evaluate DOPES/DOTT before restarting or changing settings.", styles)]
    story.append(PageBreak())

    story += [
        paragraph("AR-11 Mechanical Ventilation, Adult", styles["title"]),
        paragraph("PRESSURE, SPECIAL-POPULATION, AND TROUBLESHOOTING SAFETY", styles["subtitle"]),
    ]
    story += section("Pressure and waveform interpretation", styles)
    story.append(grid([
        ("Plateau pressure", "Target below 30 cm H2O. Measure only with an inspiratory hold in a passive patient; an active patient does not provide a reliable plateau measurement."),
        ("High PIP + high plateau", "Consider reduced compliance: lung disease/ARDS, pulmonary edema, atelectasis, pneumothorax, chest-wall restriction, or increased intra-abdominal pressure. Reduce tidal volume in 1 mL/kg IBW steps to no lower than 4 mL/kg IBW while correcting the cause and obtaining additional direction as needed."),
        ("High PIP + normal plateau", "Consider airway/circuit resistance: kink, secretions, bronchospasm, biting, narrowed airway, water/filter issue, or auto-PEEP."),
        ("Auto-PEEP / stacked breaths", "Allow complete exhalation. If unstable or alarm cause is uncertain, disconnect briefly and BVM slowly while reassessing rate, flow, obstruction, and chest excursion."),
    ], styles, header=("Finding", "Meaning and response")))
    story += section("Special safety branches", styles)
    story += bullets([
        "Post-ROSC: use AC-10. Target SpO2 90-98% and, when blood-gas information is available, PaCO2 35-45 mm Hg unless directed otherwise.",
        "Suspected brain injury: avoid routine hyperventilation. Target normal ventilation unless signs of impending herniation or Medical Control direction require a different plan.",
        "Severe metabolic acidosis: do not abruptly remove compensatory minute ventilation. Reassess frequently and seek Medical Control or receiving-facility direction before a major reduction in ventilation.",
        "Use AR-08 for analgesia, sedation, continuous tube confirmation, and post-airway reassessment. Use AR-09 for home-ventilator failure, equipment troubleshooting, and transport preparation.",
    ], styles)
    story += [Spacer(1, 4), callout("<b>Do not chase a single number:</b> EtCO2 trends can guide reassessment, but EtCO2 may not equal PaCO2 in poor perfusion or after ROSC. Do not force a numeric EtCO2 target when it worsens air trapping in obstructive disease.", styles, PALE_RED)]
    story.append(PageBreak())

    story += [
        paragraph("AR-11 Mechanical Ventilation, Adult", styles["title"]),
        paragraph("IDEAL BODY WEIGHT QUICK REFERENCE AND DOCUMENTATION", styles["subtitle"]),
    ]
    story += section("Ideal Body Weight (IBW) by height and sex", styles)
    story.append(paragraph("IBW is calculated from height and sex, not actual scale weight. Formula: female = 45.5 + 2.3 x inches over 60; male = 50 + 2.3 x inches over 60. Use the 6 mL/kg end of the range for ARDS, restrictive physiology, or elevated pressures.", styles["body"]))
    story.append(ibw_table(styles))
    story += section("DOPES / DOTT emergency check", styles)
    story.append(grid([
        ("DOPES", "Displacement; Obstruction; Pneumothorax/pulmonary problem; Equipment failure; Stacked breaths/auto-PEEP."),
        ("DOTT", "Disconnect or decompress when indicated; Oxygen/BVM; Tube check; Then adjust settings only after the cause is addressed."),
    ], styles, header=("Tool", "Use when ventilation worsens or an alarm persists")))
    story += section("Documentation and release control", styles)
    story += bullets([
        "Document height, sex used for IBW, initial and changed settings, oxygen/EtCO2 trends, PIP/plateau values when measured, waveform findings, analgesia/sedation, alarms, troubleshooting, patient response, and destination notification.",
        f"This direct source PDF replaces the legacy imported sheet and matches approved Claiborne EMS app content reconciled {REVISION}.",
        "Follow agency release governance, training requirements, current medication/device availability, and condition-specific or Medical Control direction when they differ from this pathway.",
    ], styles)
    doc.build(story)
    TMP.replace(DESTINATION)


if __name__ == "__main__":
    build()
    print(f"Built {DESTINATION.name}.")
