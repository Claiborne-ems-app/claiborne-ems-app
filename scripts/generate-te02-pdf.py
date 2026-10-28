"""Build the approved Claiborne County EMS TE-02 source PDF."""

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
TMP = ROOT / "tmp/pdfs/te02-approved"
OUTPUT = PUBLIC / "te-02-carbon-monoxide-cyanide-protocol.pdf"
REVISION = "October 28, 2026"

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
    return [Spacer(1, 2), p(title, s["section"]), HRFlowable(width="100%", thickness=.65, color=LIGHT_GRAY, spaceAfter=3)]


def callout(text, s, background=PALE_BLUE):
    box = Table([[p(text, s["callout"])]], colWidths=[7 * inch])
    box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), background),
        ("BOX", (0, 0), (-1, -1), .55, NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return box


def grid(rows, s, header=("Topic", "Required action")):
    data = [[p(header[0], s["head"]), p(header[1], s["head"])]]
    data += [[p(left, s["table_bold"]), p(right, s["table"])] for left, right in rows]
    table = Table(data, colWidths=[1.48 * inch, 5.52 * inch], repeatRows=1)
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), .35, LIGHT_GRAY),
        ("LEFTPADDING", (0, 0), (-1, -1), 5.5), ("RIGHTPADDING", (0, 0), (-1, -1), 5.5),
        ("TOPPADDING", (0, 0), (-1, -1), 3.8), ("BOTTOMPADDING", (0, 0), (-1, -1), 3.8),
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#F7F9FB")]),
    ]))
    return table


def bullets(items, s):
    return [p(f"- {item}", s["body"]) for item in items]


def build():
    s = styles()
    PUBLIC.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)
    temp = TMP / OUTPUT.name

    def footer(canv, doc):
        canv.saveState()
        canv.setStrokeColor(LIGHT_GRAY)
        canv.setLineWidth(.4)
        canv.line(doc.leftMargin, .53 * inch, letter[0] - doc.rightMargin, .53 * inch)
        canv.setFont(REGULAR, 6.75)
        canv.setFillColor(MID_GRAY)
        canv.drawString(doc.leftMargin, .35 * inch, "Claiborne County EMS Clinical Protocols | TE-02 Carbon Monoxide / Cyanide Exposure")
        canv.drawRightString(letter[0] - doc.rightMargin, .35 * inch, f"Page {canv.getPageNumber()} of 2")
        canv.restoreState()

    doc = BaseDocTemplate(str(temp), pagesize=letter, leftMargin=.75 * inch, rightMargin=.75 * inch, topMargin=.63 * inch, bottomMargin=.72 * inch)
    doc.addPageTemplates([PageTemplate(id="protocol", frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")], onPage=footer)])

    story = [
        p("TE-02 Carbon Monoxide / Cyanide Exposure", s["title"]),
        p(f"CLAIBORNE COUNTY EMS | MEDICAL-DIRECTOR APPROVED | Reconciled {REVISION}", s["subtitle"]),
        callout("<b>Protect responders first.</b> Stage or request the appropriate fire/HazMat resources before entering an unsafe atmosphere. Do not become an additional victim.", s, PALE_RED),
    ]
    story += section("Recognition and immediate field flow", s)
    story.append(grid([
        ("1. Safe scene", "Use PPE and appropriate fire/HazMat support. Remove the patient from the exposure when safe. Do not enter a hazardous atmosphere without the required training and respiratory protection."),
        ("2. Decontaminate", "For liquid or industrial cyanide contamination, remove contaminated clothing and decontaminate as directed before ambulance transport. Gas-only exposure without liquid contamination ordinarily does not require patient decontamination."),
        ("3. ABCs + oxygen", "Assess airway, breathing, circulation, mental status, and perfusion. Give 100% oxygen regardless of conventional pulse-oximetry reading; support ventilation or airway management as indicated."),
        ("4. Assess toxicity", "Look for altered mental status, dyspnea, weakness, nausea/vomiting, syncope, seizure, chest pain, shock, neurologic deficit, or respiratory failure."),
        ("5. Monitor + access", "Obtain glucose, 12-lead ECG, IV/IO, and cardiac monitoring as indicated. Use pulse CO-oximetry when available, but do not delay care or rely on one field SpCO value to rule out poisoning."),
        ("6. Transport / alert", "Rapidly transport significant or symptomatic exposure. Call Poison Help (1-800-222-1222) and notify the receiving facility early for severe exposure or high cyanide suspicion."),
    ], s, ("Step", "Required action")))
    story += section("High cyanide suspicion", s)
    story.append(callout("<b>Consider cyanide poisoning:</b> enclosed-space fire, known industrial cyanide exposure, or ingestion with severe altered mental status, seizure, hypotension/collapse, or respiratory failure. Continue 100% oxygen and supportive care while arranging immediate consultation and transport.", s))
    story += section("Provider-level actions", s)
    story.append(grid([
        ("EMT", "Remove from exposure when safe; provide 100% oxygen and ventilation support; obtain glucose; monitor closely; and rapidly transport."),
        ("AEMT", "All EMT care plus IV/IO access, 12-lead acquisition, and authorized treatment of glucose abnormality or shock."),
        ("Paramedic", "All prior care plus cardiac and pulse CO-oximetry monitoring when available, Poison Help/Medical Control consultation, and early destination notification for severe exposure."),
    ], s, ("Level", "Actions")))
    story.append(PageBreak())

    story += [p("TE-02 | CRITICAL SAFEGUARDS, CONSULTATION, AND HANDOFF", s["subtitle"])]
    story += section("Carbon monoxide safeguards", s)
    story.append(grid([
        ("Pulse oximetry", "A normal conventional SpO₂ does not exclude carbon monoxide poisoning. Provide 100% oxygen on clinical suspicion even when a standard pulse-ox reading appears normal."),
        ("CO-oximetry", "A field pulse CO-oximeter may support assessment when available. Do not delay treatment or transport for measurement, and do not use a single field SpCO value alone to rule out significant exposure."),
        ("High-risk features", "Loss of consciousness, neurologic deficit, dysrhythmia/ischemia, severe acidosis, or pregnancy require early receiving-facility notification for hyperbaric-consultation consideration."),
        ("Vulnerable patients", "Pregnant patients, children, older adults, and patients with cardiac, pulmonary, or hematologic disease may have serious symptoms at lower measured CO levels."),
    ], s))
    story += section("Cyanide safeguards", s)
    story.append(grid([
        ("Contamination", "Do not place a patient with liquid or industrial cyanide contamination in the ambulance before indicated decontamination and HazMat direction. Avoid direct contact with contaminated clothing, skin, or emesis."),
        ("Antidote availability", "A cyanide antidote is not stocked on Claiborne ground units. Do not delay supportive care, Poison Help/Medical Control consultation, or transport while seeking an unavailable antidote."),
        ("Clinical deterioration", "Escalate care for collapse, seizure, coma, respiratory failure, hypotension, dysrhythmia, or cardiac arrest. Use the applicable airway, shock, seizure, and cardiac-arrest pathways."),
    ], s))
    story += section("Consultation and handoff", s)
    story += bullets([
        "Call Poison Help at 1-800-222-1222 for significant suspected CO or cyanide exposure; use Medical Control for severe exposure or care outside standing orders.",
        "Communicate source, route, estimated duration, enclosed-space or combustion history, symptoms and progression, decontamination performed, oxygen/ventilatory support, ECG/CO-oximetry findings when available, treatments, and response.",
        "Early destination notification is essential for severe CO exposure, high cyanide suspicion, pregnancy, persistent neurologic symptoms, cardiac involvement, or need for advanced toxicology or hyperbaric consultation.",
    ], s)
    story.append(callout("<b>Critical reminder:</b> 100% oxygen, airway/ventilation support, safe decontamination when indicated, Poison Help consultation, and rapid transport take priority. Do not allow a normal conventional SpO₂ or an unavailable antidote to delay care.", s, PALE_RED))
    story += section("Linked pathways", s)
    story += bullets([
        "Use the age-appropriate airway, altered mental status, shock, seizure, and cardiac-arrest protocol as indicated.",
        f"This direct source PDF replaces the prior imported sheet and matches Claiborne-approved TE-02 app content reconciled {REVISION}.",
    ], s)

    doc.build(story)
    temp.replace(OUTPUT)


if __name__ == "__main__":
    build()
    print(f"Built {OUTPUT.name}")
