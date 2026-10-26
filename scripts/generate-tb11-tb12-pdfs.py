"""Build approved Claiborne County EMS source PDFs for TB-11 and TB-12.

The PDFs are controlled, direct-source replacements.  Their field content is
kept intentionally concise and mirrors the approved native protocol flows.
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
TMP = ROOT / "tmp/pdfs/tb-approved"
REVISION = "October 17, 2026"

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
        "body_bold": ParagraphStyle("body_bold", parent=base["BodyText"], fontName=BOLD, fontSize=7.75, leading=9.45, spaceAfter=3),
        "table": ParagraphStyle("table", parent=base["BodyText"], fontName=REGULAR, fontSize=7.1, leading=8.55),
        "table_bold": ParagraphStyle("table_bold", parent=base["BodyText"], fontName=BOLD, fontSize=7.1, leading=8.55),
        "head": ParagraphStyle("head", parent=base["BodyText"], fontName=BOLD, fontSize=7.15, leading=8.55, textColor=colors.white),
        "callout": ParagraphStyle("callout", parent=base["BodyText"], fontName=BOLD, fontSize=7.65, leading=9.35, textColor=NAVY),
        "tiny": ParagraphStyle("tiny", parent=base["BodyText"], fontName=REGULAR, fontSize=6.7, leading=7.95),
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


def flow(cells, s):
    data = [[p(f"<b>{title}</b><br/>{text}", s["table"]) for title, text in cells]]
    table = Table(data, colWidths=[7 * inch / len(cells)] * len(cells))
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PALE_BLUE),
        ("GRID", (0, 0), (-1, -1), 0.35, LIGHT_GRAY),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return table


def bullets(items, s):
    return [p(f"• {item}", s["body"]) for item in items]


def document(path, code, title):
    s = styles()
    TMP.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    temp = TMP / path.name

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(LIGHT_GRAY)
        canvas.setLineWidth(0.4)
        canvas.line(doc.leftMargin, 0.53 * inch, letter[0] - doc.rightMargin, 0.53 * inch)
        canvas.setFont(REGULAR, 6.75)
        canvas.setFillColor(MID_GRAY)
        canvas.drawString(doc.leftMargin, 0.35 * inch, f"Claiborne County EMS Clinical Protocols | {code} {title}")
        canvas.drawRightString(letter[0] - doc.rightMargin, 0.35 * inch, f"Page {canvas.getPageNumber()} of 2")
        canvas.restoreState()

    doc = BaseDocTemplate(str(temp), pagesize=letter, leftMargin=.75 * inch, rightMargin=.75 * inch, topMargin=.63 * inch, bottomMargin=.72 * inch)
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="protocol", frames=[frame], onPage=footer)])
    return doc, s, temp


def build_tb11():
    output = PUBLIC / "tb-11-eye-trauma-protocol.pdf"
    doc, s, temp = document(output, "TB-11", "Eye Trauma")
    story = [
        p("TB-11 Eye Trauma", s["title"]),
        p(f"CLAIBORNE COUNTY EMS | MEDICAL-DIRECTOR APPROVED | Reconciled {REVISION}", s["subtitle"]),
        callout("<b>Core principle:</b> Treat life threats first. Irrigate chemical exposure immediately, but never apply pressure, irrigate, manipulate, instill drops, or remove an object when a penetrating or open-globe injury is suspected.", s, PALE_RED),
    ]
    story += section("Field flow", s)
    story.append(flow([
        ("1. Chemical or thermal?", "For chemical exposure: start immediate copious water or saline irrigation; remove a contact lens only if easy. Do not neutralize."),
        ("2. Open globe?", "No pressure, manipulation, irrigation, drops, or object removal. Stabilize any protruding object and apply a rigid shield."),
        ("3. Blunt / superficial?", "Check visual acuity and red flags. Irrigate loose debris only if penetration or globe rupture is not suspected."),
        ("4. Protect + transport", "Pain/nausea control, minimize Valsalva, serial vision assessment, and early notification for vision-threatening injury."),
    ], s))
    story += section("Provider-level actions", s)
    story.append(grid([
        ("EMT", "Treat ABCs and associated trauma. Start immediate chemical/thermal irrigation. For suspected open globe, stabilize without pressure and use a rigid shield. Assess and document visual acuity in each eye separately when this does not delay care."),
        ("AEMT", "All EMT care plus clinically indicated vascular access and authorized analgesia or antiemetic care. Do not delay irrigation, protection, or time-sensitive transport for access."),
        ("Paramedic", "All prior care plus advanced airway, analgesia, antiemetic, monitoring, Medical Control, and destination decisions. Do not use ketamine for suspected penetrating or open-globe eye trauma unless Medical Control expressly authorizes it."),
    ], s, header=("Level", "Approved actions")))
    story += section("Vision-threatening findings", s)
    story.append(callout("<b>Urgent transport / early notification:</b> decreased or lost vision; irregular or teardrop pupil; hyphema; visible penetration or extrusion; impaled object; marked proptosis or rapidly increasing swelling; severe pain; significant chemical burn; high-velocity mechanism; or inability to examine the eye.", s))
    story += section("Focused assessment", s)
    story += bullets([
        "Record mechanism, time, laterality, chemical or product, contact-lens use, protective eyewear, high-velocity metal/glass exposure, and associated head or facial trauma.",
        "Inspect without pressure: pupils, bleeding, hyphema, corneal clouding, foreign body, lid injury, proptosis, peri-orbital swelling, and visible tissue or fluid.",
        "Check extraocular movement or diplopia only gently and only when a globe injury is not suspected. Never force the eyelids open.",
    ], s)
    story.append(PageBreak())
    story.append(Spacer(1, 18))
    story += [
        p("TB-11 Eye Trauma", s["title"]),
        p("CHEMICAL, OPEN-GLOBE, AND TRANSPORT SAFEGUARDS", s["subtitle"]),
    ]
    story += section("Chemical and thermal eye injury", s)
    story += bullets([
        "Begin copious water or normal-saline irrigation immediately and continue during transport as needed. Water is preferable to waiting for saline or a specialized irrigating fluid.",
        "Remove contact lenses only when easily possible without delaying irrigation. Irrigate from the inner corner outward and prevent runoff into the unaffected eye or onto responders.",
        "Brush away dry chemical before irrigation when safe. Do not attempt acid-base neutralization. Use the Chemical / HazMat pathway and Poison Help guidance for unusual or water-reactive agents.",
        "For thermal injury, gently cool or irrigate with room-temperature water or saline. Do not use ice, ointment, or a pressure dressing.",
    ], s)
    story += section("Open globe, blunt trauma, and foreign body", s)
    story.append(grid([
        ("Suspected open globe", "Do not apply pressure, irrigate, manipulate, instill medication, or remove an object. Stabilize a protruding object with bulky material around it without pressure, then apply a rigid shield."),
        ("Blunt trauma", "Use a rigid shield when globe injury is possible. Check for hyphema, irregular pupil, vision change, diplopia, restricted movement, proptosis, and associated facial/head injury."),
        ("Loose debris", "Irrigate only loose superficial debris when penetration or globe rupture is not suspected. Do not remove embedded material or use cotton swabs, magnets, or instruments."),
        ("Medication", "Use approved analgesia and antiemetic care; minimize coughing, vomiting, agitation, and Valsalva. Topical ophthalmic anesthetic is unavailable unless separately stocked and adopted or ordered by Medical Control."),
    ], s, header=("Situation", "Approved response")))
    story += [Spacer(1, 4), callout("<b>Never patch either eye.</b> For suspected open-globe injury, protect the affected eye with a rigid shield without pressure. A pressure patch can worsen an open-globe injury.", s, PALE_RED)]
    story += section("Documentation and handoff", s)
    story += bullets([
        "Document baseline and repeat vision, pupils, laterality, mechanism, product/exposure time, irrigation start and duration, protection, medications, response, consultation, and destination rationale.",
        f"This direct source PDF replaces the prior source and matches Claiborne-approved app content reconciled {REVISION}.",
    ], s)
    doc.build(story)
    temp.replace(output)


def build_tb12():
    output = PUBLIC / "tb-12-abdominal-pelvic-trauma-protocol.pdf"
    doc, s, temp = document(output, "TB-12", "Abdominal / Pelvic Trauma")
    story = [
        p("TB-12 Abdominal / Pelvic Trauma", s["title"]),
        p(f"CLAIBORNE COUNTY EMS | MEDICAL-DIRECTOR APPROVED | Reconciled {REVISION}", s["subtitle"]),
        callout("<b>Core principle:</b> The abdomen, retroperitoneum, and pelvis can conceal life-threatening hemorrhage before hypotension appears. Control external bleeding, stabilize suspected pelvic fracture, prevent hypothermia, and move rapidly toward definitive hemorrhage control.", s, PALE_RED),
    ]
    story += section("Field flow", s)
    story.append(flow([
        ("1. XABCDE", "Control external hemorrhage, support airway/ventilation, assess perfusion and neurologic status, expose only as needed, and warm."),
        ("2. Internal hemorrhage?", "Shock, pain/tenderness, distention, seatbelt sign, flank bruising, high-risk mechanism, pelvic pain/deformity, or unreliable examination."),
        ("3. Open injury?", "Do not remove an impaled object or reduce evisceration. Stabilize and cover without pressure."),
        ("4. Resuscitate en route", "IV/IO, warming, adult LR 1 L bolus with reassessment, analgesia/antiemetic, and Paramedic TXA for life-threatening hemorrhage."),
    ], s))
    story += section("Provider-level actions", s)
    story.append(grid([
        ("EMT", "Perform XABCDE, control external hemorrhage, prevent hypothermia, and assess abdomen, flanks, pelvis, groin, and perineum. Do not repeatedly rock the pelvis. Apply the approved binder over the greater trochanters when indicated. Package for rapid trauma transport."),
        ("AEMT", "All EMT care plus IV/IO access. For an adult with traumatic shock, give lactated Ringer's 1 L IV/IO, then reassess perfusion, respiratory status, and response. Do not delay transport for access or fluid; avoid unnecessary additional large-volume crystalloid."),
        ("Paramedic", "All prior care plus advanced airway/ventilation, monitoring, shock resuscitation, Medical Control, and destination decisions. For life-threatening abdominal or pelvic hemorrhage, administer TXA under the approved Claiborne TXA pathway; do not delay transport or definitive hemorrhage control."),
    ], s, header=("Level", "Approved actions")))
    story += section("High-risk findings", s)
    story.append(callout("<b>Early trauma-center alert:</b> shock; penetrating torso injury; evisceration or impalement; expanding abdominal, flank, or groin hematoma; pelvic deformity or pain after high-energy trauma; seatbelt sign; guarding or rigidity; hematuria or blood at the meatus; pregnancy; pediatric or older patient; anticoagulant use; or unreliable examination.", s))
    story += section("Rapid assessment", s)
    story += bullets([
        "Inspect and gently palpate the abdomen and flanks once for pain, guarding, rigidity, distention, bruising, penetrating wounds, evisceration, or exposed organs. Do not repeatedly examine a painful abdomen.",
        "Inspect pelvis, groin, and perineum for wounds, bruising, deformity, swelling, blood at the urinary meatus, hematuria, rectal or vaginal bleeding, or neurologic deficit while preserving privacy and warmth.",
        "Trend mental status, pulse quality, skin findings, blood pressure, pulse pressure, respiratory status, and response to resuscitation. A normal initial blood pressure does not exclude compensated hemorrhage.",
    ], s)
    story.append(PageBreak())
    story.append(Spacer(1, 18))
    story += [
        p("TB-12 Abdominal / Pelvic Trauma", s["title"]),
        p("PELVIC STABILIZATION, RESUSCITATION, AND TRANSPORT", s["subtitle"]),
    ]
    story += section("Pelvic stabilization", s)
    story += bullets([
        "Use significant mechanism plus pelvic pain, deformity, shock, or unreliable examination to identify a suspected pelvic fracture. Do not repeatedly rock or compress the pelvis to test stability.",
        "Apply the agency-approved commercial pelvic binder centered over the <b>greater trochanters</b>, not the abdomen, waist, or iliac crests. Secure the legs together when appropriate and reassess distal circulation, sensation, and movement.",
        "Minimize movement. Do not loosen or remove a correctly positioned binder in the field unless a separately approved protocol or Medical Control requires it.",
    ], s)
    story += section("Evisceration and impaled object", s)
    story.append(grid([
        ("Evisceration", "Do not replace organs. Cover loosely with sterile saline-moistened dressings and an occlusive layer when available. Avoid direct pressure and protect from heat loss."),
        ("Impaled object", "Do not remove. Stabilize in place with bulky dressings without pressure on exposed organs. Modify or remove only for an immediate lifesaving intervention or safe transport under rescue/Medical Control coordination."),
        ("External bleeding", "Use direct pressure, wound packing, hemostatic gauze, or tourniquet for compressible external or junctional hemorrhage when anatomically appropriate. Do not blindly pack the abdominal cavity."),
    ], s, header=("Finding", "Approved response")))
    story += section("Resuscitation and destination", s)
    story += bullets([
        "Establish IV/IO access only when it will not delay transport. For adult traumatic shock, give lactated Ringer's 1 L IV/IO, then reassess perfusion, respiratory status, and response.",
        "TXA is a Paramedic intervention for life-threatening abdominal or pelvic hemorrhage under the approved Claiborne TXA pathway. Do not delay transport or definitive hemorrhage control for TXA administration.",
        "Provide approved analgesia and antiemetic care, keep the patient NPO, prevent hypothermia, reassess frequently, and notify the trauma center early.",
        "For pregnancy beyond approximately 20 weeks, prioritize maternal resuscitation and use manual left uterine displacement or left lateral tilt when compatible with trauma care. Pediatric hypotension is a late finding; use an appropriately sized pelvic device only when indicated.",
    ], s)
    story += [Spacer(1, 4), callout("<b>Do not delay definitive care:</b> Complete nonessential assessment and procedures during transport. Never remove an impaled object, reduce eviscerated organs, apply direct pressure to exposed viscera, or blindly pack the abdominal cavity.", s, PALE_RED)]
    story += section("Documentation and handoff", s)
    story += bullets([
        "Document mechanism, serial findings and vital signs, suspected bleeding source, binder indication/position/time, distal neurovascular findings, open-injury care, fluids, TXA pathway use, medications, response, pregnancy status, consultation, and destination rationale.",
        f"This direct source PDF replaces the prior source and matches Claiborne-approved app content reconciled {REVISION}.",
    ], s)
    doc.build(story)
    temp.replace(output)


if __name__ == "__main__":
    build_tb11()
    build_tb12()
    print("Built approved TB-11 and TB-12 source PDFs.")
