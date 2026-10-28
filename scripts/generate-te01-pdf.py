"""Build the approved Claiborne County EMS TE-01 source PDF.

This controlled direct-source replacement supersedes the imported North
Carolina sheet and mirrors the approved structured app content.
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
TMP = ROOT / "tmp/pdfs/te01-approved"
OUTPUT = PUBLIC / "te-01-bites-and-envenomations-protocol.pdf"
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


def build_styles():
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


def section(title, styles):
    return [Spacer(1, 2), p(title, styles["section"]), HRFlowable(width="100%", thickness=0.65, color=LIGHT_GRAY, spaceAfter=3)]


def callout(text, styles, background=PALE_BLUE):
    box = Table([[p(text, styles["callout"])]], colWidths=[7 * inch])
    box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), background),
        ("BOX", (0, 0), (-1, -1), 0.55, NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return box


def grid(rows, styles, header):
    data = [[p(header[0], styles["head"]), p(header[1], styles["head"])]]
    data += [[p(left, styles["table_bold"]), p(right, styles["table"])] for left, right in rows]
    table = Table(data, colWidths=[1.38 * inch, 5.62 * inch], repeatRows=1)
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.35, LIGHT_GRAY),
        ("LEFTPADDING", (0, 0), (-1, -1), 5.5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5.5),
        ("TOPPADDING", (0, 0), (-1, -1), 3.8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.8),
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#F7F9FB")]),
    ]))
    return table


def bullets(items, styles):
    return [p(f"- {item}", styles["body"]) for item in items]


def build():
    styles = build_styles()
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
        canvas.drawString(doc.leftMargin, 0.35 * inch, "Claiborne County EMS Clinical Protocols | TE-01 Bites and Envenomations")
        canvas.drawRightString(letter[0] - doc.rightMargin, 0.35 * inch, f"Page {canvas.getPageNumber()} of 2")
        canvas.restoreState()

    doc = BaseDocTemplate(
        str(temp), pagesize=letter, leftMargin=.75 * inch, rightMargin=.75 * inch,
        topMargin=.63 * inch, bottomMargin=.72 * inch,
    )
    doc.addPageTemplates([
        PageTemplate(
            id="protocol",
            frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")],
            onPage=footer,
        )
    ])

    story = [
        p("TE-01 Bites and Envenomations", styles["title"]),
        p(f"CLAIBORNE COUNTY EMS | MEDICAL-DIRECTOR APPROVED | Reconciled {REVISION}", styles["subtitle"]),
        callout(
            "<b>Protect responders first.</b> Do not attempt to capture, handle, or transport an animal for identification. Use a description or photograph only when safely available.",
            styles,
            PALE_RED,
        ),
    ]
    story += section("Recognition and field flow", styles)
    story.append(grid([
        ("1. Scene safe?", "Stage or request appropriate resources until the animal, insect, or environmental hazard is controlled. Use PPE and avoid creating an additional victim."),
        ("2. ABCs", "Assess airway, breathing, circulation, mental status, perfusion, and signs of anaphylaxis or shock. Treat immediate threats under the appropriate age-based pathway."),
        ("3. Wound care", "Obtain exposure history. Clean and cover the wound when this will not delay care. Remove rings, bands, or other constricting items; immobilize the extremity in a neutral position of comfort."),
        ("4. Suspected snake bite", "Keep the patient calm. Keep the involved limb at heart level; mark swelling or redness with the time; perform serial distal neurovascular checks; call Poison Help; and transport promptly."),
        ("5. Sting or spider bite", "For a visible insect stinger, scrape it away. Wash the area and use a cold pack for 10-20 minutes. Treat anaphylaxis immediately when present."),
        ("6. Animal or human bite", "Gather animal and exposure details. For a possible rabies exposure, follow the local public-health and animal-control reporting process and arrange prompt evaluation for rabies risk assessment."),
        ("7. Reassess and transport", "For suspected envenomation, unknown toxic bite or sting, or concerning symptoms, call Poison Help at 1-800-222-1222 and continue serial reassessment during transport."),
    ], styles, ("Step", "Approved action")))
    story += section("Provider-level actions", styles)
    story.append(grid([
        ("EMT", "Provide wound care when it will not delay care; remove constricting items; immobilize; mark progression; provide authorized anaphylaxis care; contact Poison Help when indicated; and expedite transport."),
        ("AEMT", "All EMT care plus IV/IO access, fluids, and authorized pain or anaphylaxis treatment. Reassess neurovascular status, perfusion, lungs, mental status, and response after each intervention."),
        ("Paramedic", "All prior care plus cardiac monitoring for systemic illness. Treat severe venom-associated muscle spasm or seizure under the approved medication and seizure protocol."),
    ], styles, ("Level", "Approved actions")))
    story += section("Immediate safeguards", styles)
    story += bullets([
        "Do not capture or transport a snake. Identification is not worth a second bite or delayed transport.",
        "Do not apply a tourniquet, ice, incision, suction, electric shock, or other unproven intervention to a suspected snake bite.",
        "Do not delay epinephrine for suspected anaphylaxis, and do not delay transport for snake-bite identification or field procedures.",
    ], styles)

    story.append(PageBreak())
    story += [
        Spacer(1, 8),
        p("TE-01 Bites and Envenomations", styles["title"]),
        p("SNAKE-BITE, RABIES, AND HANDOFF SAFEGUARDS", styles["subtitle"]),
    ]
    story += section("Suspected snake envenomation", styles)
    story.append(grid([
        ("Immediate priorities", "Scene safety; ABCs; remove constricting items; immobilize; keep the limb at heart level; mark the leading edge of swelling or redness with time; and obtain serial distal neurovascular checks."),
        ("Poison Help", "Call 1-800-222-1222 for suspected envenomation, unknown toxic bite or sting, or concerning symptoms. Poison Help can assist with expert consultation and destination planning."),
        ("Do not", "No tourniquet, ice, incision, suction, electric shock, alcohol, or attempts to capture or transport the snake. Do not delay transport for identification."),
        ("Clinical deterioration", "Escalate care for progressive swelling, bleeding, vomiting, weakness, altered mental status, respiratory symptoms, hypotension, dysrhythmia, or anaphylaxis. Use the applicable airway, shock, seizure, and medication pathways."),
    ], styles, ("Topic", "Required action")))
    story += section("Animal bite, scratch, or possible rabies exposure", styles)
    story.append(grid([
        ("Wound", "Cleanse or irrigate the wound when this will not delay immediate care. Control bleeding, cover the wound, assess distal circulation, and document the location and severity of the exposure."),
        ("Exposure details", "Document the animal species, domestic or wild status, behavior, ownership or location when safely available, bite or scratch location, and any saliva exposure to broken skin or mucous membranes."),
        ("Reporting and referral", "Follow the local public-health and animal-control reporting process. ED and public-health clinicians determine rabies risk assessment, post-exposure prophylaxis, and tetanus needs."),
        ("Transport", "Transport when wound severity, infection risk, anatomic location, immunocompromise, possible rabies exposure, or patient condition warrants evaluation. Do not delay care while attempting to locate the animal."),
    ], styles, ("Topic", "Required action")))
    story += section("Medication, documentation, and linked pathways", styles)
    story.append(grid([
        ("Medication safety", "Use the current Claiborne Medication Reference for approved medication, route, dose, contraindication, and monitoring details. This protocol does not duplicate legacy standalone midazolam doses."),
        ("Linked pathways", "Use the applicable age-based anaphylaxis, airway, shock, seizure, and pain protocol. Epinephrine is the priority medication when anaphylaxis is suspected."),
        ("Handoff", "Communicate the mechanism and time of exposure, animal or insect description when safely known, symptom progression, serial swelling marks and neurovascular findings, treatments and response, Poison Help consultation, and reporting actions."),
    ], styles, ("Topic", "Required action")))
    story += [Spacer(1, 4), callout(
        "<b>Critical reminder:</b> Poison Help is 1-800-222-1222. Early consultation and prompt transport are preferred over field attempts to identify, capture, or treat a venomous animal.",
        styles,
        PALE_RED,
    )]
    story += section("Clinical pearls", styles)
    story += bullets([
        "Use a cold pack for uncomplicated insect stings only. Do not apply ice to a suspected snake bite.",
        f"This direct source PDF replaces the prior imported sheet and matches Claiborne-approved TE-01 app content reconciled {REVISION}.",
    ], styles)

    doc.build(story)
    temp.replace(OUTPUT)


if __name__ == "__main__":
    build()
    print(f"Built {OUTPUT.name}")
