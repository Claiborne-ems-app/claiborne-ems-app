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
OUTPUT = ROOT / "public/protocols/claiborne/ac-02-bradycardia-pulse-present-protocol.pdf"
TMP_OUTPUT = ROOT / "tmp/pdfs/ac-02-bradycardia-pulse-present-protocol.pdf"

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
        style.append(("BACKGROUND", (0, 0), (-1, 0), NAVY))
        style.append(("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#F7F9FB")]))
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
    canvas.drawString(doc.leftMargin, 0.35 * inch, "Claiborne County EMS Clinical Protocols | AC-02 Bradycardia With a Pulse")
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
        paragraph("AC-02 Bradycardia With a Pulse", s["title"]),
        paragraph("MEDICAL-DIRECTOR APPROVED APP CONTENT | AGENCY RELEASE PENDING | Reconciled October 10, 2026", s["subtitle"]),
        callout("<b>Scope:</b> Use for patients age 16 years or older with clinically significant bradycardia, typically below 50/min. Treat poor perfusion caused by the rhythm—not an asymptomatic heart-rate number.", s, PALE_RED),
    ]
    story += section("Rapid assessment and treatment flow", s)
    story.append(grid([
        ("1. Support", "Assess airway, breathing, circulation, mental status, and perfusion. Give oxygen for hypoxemia, assist ventilation as needed, apply monitor and pacing/defibrillation pads, and obtain glucose."),
        ("2. Is there compromise?", "Hypotension, acutely altered mental status, shock, ischemic chest discomfort, or acute heart failure. Confirm that bradycardia is causing the instability."),
        ("3. If stable", "Monitor, obtain a 12-lead ECG and two complete vital-sign sets when this does not delay care, identify the cause, and transport as clinically indicated."),
        ("4. If unstable", "Pursue IV/IO while supporting airway and perfusion. If severe instability or high-grade AV block is present without access, begin transcutaneous pacing immediately."),
        ("5. Reassess", "Confirm mechanical capture, repeat ECG and vital signs, correct reversible causes, and notify the receiving facility early."),
    ], s))
    story += section("Medication and fluid therapy", s)
    story.append(grid([
        ("Atropine", "1 mg IV/IO; repeat every 3-5 minutes to a maximum total dose of 3 mg. Do not delay pacing when atropine is unlikely to be effective."),
        ("Epinephrine infusion", "2-10 mcg/min IV/IO; titrate to clinical response for persistent unstable bradycardia when atropine is ineffective."),
        ("Dopamine infusion", "5-20 mcg/kg/min IV/IO; titrate to clinical response when atropine is ineffective."),
        ("Isotonic crystalloid", "250-500 mL IV/IO aliquots only when clinically appropriate for hypotension; reassess after each aliquot. Use smaller volumes or avoid additional fluid with pulmonary edema, CHF, renal/liver failure, or overload."),
    ], s, header=("Therapy", "Approved dose / use")))
    story += [Spacer(1, 5), callout("<b>Cause-directed resuscitation:</b> Correct hypoxia, ischemia, hyperkalemia or other electrolyte disturbance, acidosis, hypothermia, medication/toxicologic causes, pacemaker malfunction, and other reversible contributors. Do not require routine fluid loading.", s)]
    story.append(PageBreak())

    story += [
        paragraph("AC-02 Bradycardia With a Pulse", s["title"]),
        paragraph("PACING, SAFEGUARDS, AND RELATED PATHWAYS", s["subtitle"]),
    ]
    story += section("Transcutaneous pacing", s)
    story.append(grid([
        ("Start pacing", "For severe instability or high-grade AV block with no vascular access, start pacing while another clinician obtains IV/IO access. Do not delay pacing for atropine in Mobitz II, complete heart block, or a new wide-QRS escape rhythm."),
        ("Set and capture", "Set a rate of 60-80/min. Increase current until electrical capture occurs, then confirm <b>mechanical</b> capture with a palpable pulse, improved blood pressure or perfusion, pulse-ox waveform, or EtCO2 response."),
        ("Comfort", "Pacing is painful in a conscious patient. When the condition permits, provide analgesia and sedation from the current approved pain/procedural-sedation pathway. Never delay lifesaving pacing."),
        ("Ongoing care", "Continuously reassess capture, rhythm, pulse, blood pressure, respiratory status, SpO2, and EtCO2 after sedation. Prepare for recurrent loss of capture or cardiac arrest."),
    ], s))
    story += section("Safety checks", s)
    story += bullets([
        "Treat the patient, not the monitor. An asymptomatic low heart rate may be appropriate for the patient's clinical condition.",
        "Electrical pacing artifacts do not prove perfusion; verify mechanical capture continuously.",
        "Do not use push-dose epinephrine under this protocol.",
        "Do not delay urgent pacing, medication treatment, or transport solely to obtain a 12-lead ECG.",
        "Do not routinely fluid load patients with pulmonary edema, acute heart failure, renal failure, liver failure, or suspected volume overload.",
    ], s)
    story += section("Special causes and routing", s)
    story.append(grid([
        ("Acute coronary syndrome", "Obtain serial 12-leads when feasible and use AC-04 for suspected ischemia or infarction."),
        ("CHF / pulmonary edema", "Use AC-05. Avoid routine fluids and support oxygenation/ventilation while treating the underlying syndrome."),
        ("Medication or toxin", "For beta-blocker, calcium-channel blocker, digoxin, or other toxic exposure, use TE-07 and contact Poison Control."),
        ("Hypothermia", "Use TE-05 because medication response, pacing response, handling, and transport priorities may differ."),
        ("Deterioration", "If the patient loses a pulse, transition immediately to the appropriate adult cardiac-arrest pathway."),
    ], s))
    story += section("Documentation", s)
    story += bullets([
        "Document the rhythm, symptoms and evidence of poor perfusion, 12-lead findings when obtained, suspected cause, medication/infusion dose, pacing settings, electrical and mechanical capture, reassessments, and response.",
        "This document matches the approved app content reconciled October 10, 2026. Final agency release remains subject to Claiborne County EMS release governance.",
    ], s)

    doc.build(story)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    TMP_OUTPUT.replace(OUTPUT)


if __name__ == "__main__":
    main()
