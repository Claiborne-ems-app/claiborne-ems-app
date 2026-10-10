from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/protocols/claiborne/up-11-pain-control-adult-protocol.pdf"
TMP_OUTPUT = ROOT / "tmp/pdfs/up-11-pain-control-adult-protocol.pdf"

NAVY = HexColor("#143A5A")
BLUE = HexColor("#1D5E95")
RED = HexColor("#A31F34")
PALE_BLUE = HexColor("#EAF2F8")
PALE_RED = HexColor("#F9ECEE")
MID_GRAY = HexColor("#56616B")
LIGHT_GRAY = HexColor("#D7DEE4")
REGULAR_FONT = "ClaiborneSans"
BOLD_FONT = "ClaiborneSansBold"


def p(text, style):
    return Paragraph(text, style)


def build_styles():
    pdfmetrics.registerFont(TTFont(REGULAR_FONT, "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont(BOLD_FONT, "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "title", parent=base["Title"], fontName=BOLD_FONT, fontSize=20,
            leading=23, textColor=NAVY, spaceAfter=2,
        ),
        "subtitle": ParagraphStyle(
            "subtitle", parent=base["Normal"], fontName=BOLD_FONT, fontSize=8.2,
            leading=11, textColor=RED, spaceAfter=10,
        ),
        "section": ParagraphStyle(
            "section", parent=base["Heading2"], fontName=BOLD_FONT, fontSize=11,
            leading=13, textColor=NAVY, spaceBefore=8, spaceAfter=5,
        ),
        "body": ParagraphStyle(
            "body", parent=base["BodyText"], fontName=REGULAR_FONT, fontSize=8.25,
            leading=10.6, textColor=colors.black, spaceAfter=3,
        ),
        "small": ParagraphStyle(
            "small", parent=base["BodyText"], fontName=REGULAR_FONT, fontSize=7.35,
            leading=9.1, textColor=colors.black,
        ),
        "table_head": ParagraphStyle(
            "table_head", parent=base["BodyText"], fontName=BOLD_FONT, fontSize=7.5,
            leading=9, textColor=colors.white,
        ),
        "table": ParagraphStyle(
            "table", parent=base["BodyText"], fontName=REGULAR_FONT, fontSize=7.45,
            leading=9.25, textColor=colors.black,
        ),
        "table_bold": ParagraphStyle(
            "table_bold", parent=base["BodyText"], fontName=BOLD_FONT, fontSize=7.45,
            leading=9.25, textColor=colors.black,
        ),
        "callout": ParagraphStyle(
            "callout", parent=base["BodyText"], fontName=BOLD_FONT, fontSize=8,
            leading=10, textColor=NAVY,
        ),
        "footer": ParagraphStyle(
            "footer", parent=base["BodyText"], fontName=REGULAR_FONT, fontSize=6.8,
            leading=8, textColor=MID_GRAY,
        ),
    }


def section(title, styles):
    return [Spacer(1, 3), p(title, styles["section"]), HRFlowable(width="100%", thickness=0.65, color=LIGHT_GRAY, spaceAfter=4)]


def shaded_callout(text, styles, color=PALE_BLUE):
    table = Table([[p(text, styles["callout"])]], colWidths=[7.0 * inch])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), color),
        ("BOX", (0, 0), (-1, -1), 0.55, NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return table


def medication_table(rows, styles, widths=(1.3 * inch, 2.1 * inch, 3.6 * inch)):
    data = [[p("Medication", styles["table_head"]), p("Dose / route", styles["table_head"]), p("Key safeguard", styles["table_head"])]]
    for med, dose, note in rows:
        data.append([p(med, styles["table_bold"]), p(dose, styles["table"]), p(note, styles["table"])])
    table = Table(data, colWidths=list(widths), repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.35, LIGHT_GRAY),
        ("BACKGROUND", (0, 1), (-1, -1), colors.white),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#F7F9FB")]),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return table


def bullets(items, styles):
    return [p(f"• {item}", styles["body"]) for item in items]


def header_footer(canvas, doc):
    canvas.saveState()
    page_num = canvas.getPageNumber()
    canvas.setStrokeColor(LIGHT_GRAY)
    canvas.setLineWidth(0.4)
    canvas.line(doc.leftMargin, 0.53 * inch, letter[0] - doc.rightMargin, 0.53 * inch)
    canvas.setFont(REGULAR_FONT, 6.8)
    canvas.setFillColor(MID_GRAY)
    canvas.drawString(doc.leftMargin, 0.35 * inch, "Claiborne County EMS Clinical Protocols | UP-11 Adult Pain Control")
    canvas.drawRightString(letter[0] - doc.rightMargin, 0.35 * inch, f"Page {page_num} of 3")
    canvas.restoreState()


def main():
    styles = build_styles()
    TMP_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(TMP_OUTPUT), pagesize=letter,
        leftMargin=0.75 * inch, rightMargin=0.75 * inch,
        topMargin=0.63 * inch, bottomMargin=0.72 * inch,
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="protocol", frames=[frame], onPage=header_footer)])

    story = []
    story += [
        p("UP-11 Pain Control - Adult", styles["title"]),
        p("MEDICAL-DIRECTOR APPROVED APP CONTENT | AGENCY RELEASE PENDING | Reconciled October 10, 2026", styles["subtitle"]),
        shaded_callout(
            "<b>Scope:</b> Use for patients age 16 years or older. For patients age 2 through younger than 16 years, use PM-04 Pediatric Pain Control. For patients younger than 2 years, contact Medical Control for analgesic direction.",
            styles,
            PALE_RED,
        ),
    ]
    story += section("Purpose and quick flow", styles)
    flow_rows = [
        ("1. Assess", "Pain score, cause, allergies, previous analgesics, airway, breathing, perfusion, mental status, and medication-specific risk."),
        ("2. Treat cause", "Address immediate threats first: airway care, hemorrhage control, splinting, positioning, ice when appropriate, and reassurance."),
        ("3. Select route", "Mild pain with safe oral route: one oral nonopioid. Parenteral nonopioid: AEMT or Paramedic. Moderate-severe pain: Paramedic opioid or analgesic-dose ketamine."),
        ("4. Monitor", "Cardiac monitoring for systemic nonoral analgesia. Continuous SpO2 and waveform EtCO2 with opioid or ketamine. Reassess every 5-10 minutes."),
        ("5. Transport", "Do not delay airway management, hemorrhage control, splinting, or time-sensitive transport to complete analgesia or reach a target pain score."),
    ]
    flow_table = Table([[p(a, styles["table_bold"]), p(b, styles["table"])] for a, b in flow_rows], colWidths=[1.2 * inch, 5.8 * inch])
    flow_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.35, LIGHT_GRAY),
        ("BACKGROUND", (0, 0), (0, -1), PALE_BLUE),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(flow_table)
    story += section("Standing-order oral and parenteral nonopioids", styles)
    story.append(medication_table([
        ("Acetaminophen - oral", "EMT/AEMT/Paramedic: 650-1,000 mg PO once.", "Use only when the patient protects the airway and can swallow safely. Do not give with severe liver disease/failure, suspected overdose, recent maximum dose, or uncertain prior dose/time."),
        ("Ibuprofen - oral", "EMT/AEMT/Paramedic: 400 mg PO once.", "Do not give with NSAID contraindications or recent NSAID administration. Do not combine with ketorolac."),
        ("Acetaminophen - IV/IO", "AEMT/Paramedic: 1 g IV/IO once.", "Include pre-EMS acetaminophen when screening for a recent maximum dose. Do not routinely add an oral acetaminophen dose."),
        ("Ketorolac", "AEMT/Paramedic: 15-30 mg IV once OR 60 mg IM once.", "Do not give with NSAID contraindications. Do not combine with ibuprofen or another NSAID."),
    ], styles))
    story += [Spacer(1, 5), shaded_callout("<b>NSAID exclusions:</b> hypersensitivity, renal disease or transplant, significant dehydration, hypotension, active GI bleeding, clinically significant anticoagulant-associated bleeding risk, known or suspected pregnancy, or recent NSAID administration.", styles)]
    story.append(PageBreak())

    story += [
        p("UP-11 Pain Control - Adult", styles["title"]),
        p("PARAMEDIC ANALGESIA | Select one opioid OR analgesic-dose ketamine", styles["subtitle"]),
    ]
    story += section("Paramedic opioid options", styles)
    story.append(medication_table([
        ("Fentanyl", "50 mcg slow IV/IO; repeat 25-50 mcg every 5 minutes as needed; maximum total 100 mcg.", "Use continuous SpO2 and waveform EtCO2. Do not combine with morphine or hydromorphone."),
        ("Morphine", "5 mg slow IV/IO; repeat 5 mg after 10 minutes as needed; maximum total 10 mg. If no vascular access: 5-10 mg IM once.", "Use continuous SpO2 and waveform EtCO2. Do not combine with fentanyl or hydromorphone."),
        ("Hydromorphone", "0.5 mg slow IV/IO; repeat 0.5 mg after 10 minutes as needed; maximum total 1 mg. If no vascular access: 0.5-1 mg IM once.", "Use continuous SpO2 and waveform EtCO2. Do not combine with fentanyl or morphine."),
    ], styles))
    story += section("Paramedic analgesic-dose ketamine", styles)
    story.append(medication_table([
        ("Ketamine - IV/IO", "0.3 mg/kg IV/IO slowly over 10 minutes; maximum 30 mg per dose. May repeat every 20 minutes; maximum three total doses.", "Do not give by rapid IV push. Use continuous SpO2 and waveform EtCO2; monitor airway, ventilation, sedation, cardiac rhythm, and hemodynamics."),
        ("Ketamine - IN", "If vascular access is unavailable: 0.5-1 mg/kg IN once; maximum 100 mg.", "Single-dose option. Use the same respiratory, cardiac, and sedation monitoring."),
    ], styles))
    story += section("Medication selection and monitoring", styles)
    story += bullets([
        "Select one opioid. Do not combine fentanyl, morphine, and hydromorphone. Additional opioid dosing beyond the approved total limits requires Medical Control authorization.",
        "Do not routinely initiate ketamine and an opioid together. If the initial medication is inadequate, fully reassess airway, ventilation, hemodynamics, sedation, pain, and adverse effects before changing agents.",
        "Use the lower end of the approved opioid range and careful titration in older/frail patients, obstructive sleep apnea, severe COPD, renal or hepatic impairment, or concurrent alcohol, opioid, benzodiazepine, or other sedative exposure.",
        "A fall in respiratory rate, increasing sedation, abnormal EtCO2, hypoxemia, or loss of airway protection after opioid requires immediate airway support and assisted ventilation; administer naloxone when indicated.",
    ], styles)
    story += [Spacer(1, 4), shaded_callout("<b>Ketamine exclusions:</b> known hypersensitivity, uncontrolled hypertension, active severe cardiac ischemia, or active psychosis. Do not routinely combine ketamine with a benzodiazepine.", styles, PALE_RED)]
    story.append(PageBreak())
    story.append(Spacer(1, 0.5 * inch))

    story += [
        p("UP-11 Pain Control - Adult", styles["title"]),
        p("SAFETY, ADJUNCTS, AND DOCUMENTATION", styles["subtitle"]),
    ]
    story += section("Adjuncts and adverse-effect response", styles)
    story.append(medication_table([
        ("Ondansetron", "AEMT/Paramedic: 4 mg IV/IO, IM, or PO.", "For nausea/vomiting associated with pain or analgesic administration. Continue the analgesic medication's required monitoring."),
        ("Naloxone", "Paramedic: after airway support and ventilation, 0.4-2 mg IV/IO/IM; if no vascular access, 2 mg IN. Repeat every 2-3 minutes as needed; maximum cumulative dose 8 mg.", "Titrate to adequate ventilation rather than complete reversal of analgesia when clinically safe. Use the overdose protocol if overdose is suspected."),
    ], styles))
    story += section("Required assessment and safety checks", styles)
    story += bullets([
        "Before medication: review allergies, analgesics already taken or administered, alcohol/sedative exposure, opioid tolerance, sleep apnea/COPD, renal or hepatic impairment, anticoagulant use, GI bleeding, pregnancy, and prior medication adverse responses.",
        "Do not give oral medication when airway protection or swallowing is impaired, active vomiting is present, or another aspiration risk exists.",
        "Do not give an opioid with respiratory depression, inability to protect the airway, severe hypotension, or significant uncorrected hypoxemia.",
        "Apply cardiac monitoring for every systemic nonoral analgesic. With opioid or ketamine, maintain continuous SpO2 and waveform EtCO2; keep suction and ventilation equipment immediately available.",
        "Reassess pain, sedation, airway, respiratory rate/effort, SpO2, EtCO2 when used, BP, cardiac rhythm, and adverse effects at least every 5-10 minutes after parenteral medication and at handoff.",
    ], styles)
    story += section("Provider permissions", styles)
    provider_data = [
        [p("Provider", styles["table_head"]), p("Authorized UP-11 care", styles["table_head"])],
        [p("EMT", styles["table_bold"]), p("Nonpharmacologic care and oral acetaminophen or ibuprofen when indicated and safe.", styles["table"])],
        [p("AEMT", styles["table_bold"]), p("All EMT care plus acetaminophen 1 g IV/IO or ketorolac as above when indicated and safe.", styles["table"])],
        [p("Paramedic", styles["table_bold"]), p("All prior care plus opioid, analgesic-dose ketamine, and adjunctive ondansetron/naloxone as described above.", styles["table"])],
    ]
    provider_table = Table(provider_data, colWidths=[1.2 * inch, 5.8 * inch])
    provider_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.35, LIGHT_GRAY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#F7F9FB")]),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(provider_table)
    story += section("Documentation and related pathway", styles)
    story += bullets([
        "Document pain score or descriptive assessment, medication choice, dose, route, time, monitoring, reassessment findings, adverse effects, and response.",
        "For patients younger than 16 years, do not use UP-11. Use PM-04 Pediatric Pain Control for age 2 through younger than 16 years; contact Medical Control for patients younger than 2 years.",
        "This document matches the approved app content reconciled October 10, 2026. Final agency release remains subject to Claiborne County EMS release governance.",
    ], styles)

    doc.build(story)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    TMP_OUTPUT.replace(OUTPUT)


if __name__ == "__main__":
    main()
