"""Build the approved AO-01 through AO-03 Claiborne source-PDF release.

The approved Claiborne app content is the controlled source for this release.
These documents replace the imported North Carolina sheets with Claiborne-branded,
field-focused PDFs that retain only currently approved formulary and pathway content.
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
DESTINATION = ROOT / "public/protocols/claiborne"
TMP = ROOT / "tmp/pdfs/adult-obstetrics-release"
REVISION = "October 16, 2026"

NAVY = HexColor("#143A5A")
RED = HexColor("#A31F34")
PALE_BLUE = HexColor("#EAF2F8")
PALE_RED = HexColor("#F9ECEE")
LIGHT_GRAY = HexColor("#D7DEE4")
MID_GRAY = HexColor("#56616B")
REGULAR = "ClaiborneSans"
BOLD = "ClaiborneSansBold"


PROTOCOLS = [
    {
        "id": "AO-01",
        "title": "Childbirth / Labor",
        "file": "ao-01-childbirth-labor-protocol.pdf",
        "scope": "Use for labor, delivery, delivery complications, immediately postpartum care, and maternal/newborn coordination. Transport is preferred unless delivery is imminent or transport is unsafe.",
        "flow_title": "Labor, delivery, and immediate postpartum pathway",
        "flow": [
            ("1. Assess", "Due date and gestation, gravida/para, contraction pattern, membrane rupture, bleeding, fetal movement, prior rapid delivery, and maternal symptoms."),
            ("2. Maternal emergency?", "Severe bleeding, seizure, hypertension/hypotension, altered mental status, severe pain, or shock: begin supportive care and open AO-03 as indicated."),
            ("3. Inspect perineum", "No digital vaginal examination. Look for crowning, cord, breech/limb presentation, or meconium."),
            ("4. Delivery imminent?", "Crowning, uncontrollable urge to push, frequent contractions, advanced parity, or unsafe transport: prepare for field delivery."),
            ("5. Normal or complicated?", "Normal delivery, prolapsed cord, breech, shoulder dystocia, or multiple gestation. Request additional resources early when needed."),
            ("6. Mother + newborn", "Control bleeding, maintain warmth, record delivery and APGAR times, use AO-02 for newborn care, and notify destination early."),
        ],
        "therapy": [
            ("Normal delivery", "Support the head and body without pulling. Check for nuchal cord. Dry and warm the infant. Do not pull on the infant, cord, or placenta."),
            ("Prolapsed cord", "Hips/knees to chest. Use a gloved hand to relieve pressure from the presenting part. Cover exposed cord with a moist saline dressing and transport emergently."),
            ("Breech", "Support presenting parts without pulling. If the head does not deliver, create an airway space at the infant's nose. Do not pull on the infant."),
            ("Postpartum hemorrhage", "After placental delivery, perform uterine massage. For hemorrhage with shock within 3 hours of delivery, give tranexamic acid 1 g IV/IO over 10 minutes and use AM-05."),
        ],
        "callout": "Oxytocin is not carried on the Claiborne formulary and is not authorized under AO-01.",
        "provider": [
            ("EMT", "Left lateral positioning when delivery is not imminent; document contraction frequency/duration; support uncomplicated delivery and listed complications; warm newborn; request ALS/resources early."),
            ("AEMT", "All EMT actions plus IV/IO access and protocol-directed treatment of maternal hypotension or hemorrhage without delaying delivery or transport."),
            ("Paramedic", "All preceding care plus advanced management of maternal shock, seizure, airway compromise, complicated delivery, and approved TXA for qualifying postpartum hemorrhage."),
        ],
        "safety": [
            "Do not perform a digital vaginal examination.",
            "Delay cord clamping for at least 60 seconds in a preterm infant under 37 weeks who does not require immediate resuscitation.",
            "Uterine massage is performed only after delivery of the placenta.",
            "Large-volume or free vaginal bleeding is abnormal. Treat shock immediately and minimize transport delay.",
        ],
        "links": [
            ("AO-02 Newly Born", "Immediate newborn assessment and resuscitation"),
            ("AO-03 OB-GYN Emergency", "Hemorrhage, seizure, pregnancy emergency, or eclampsia"),
            ("AM-05 Hypotension / Shock", "Maternal shock or inadequate perfusion"),
        ],
        "sources": [
            "Claiborne County EMS approved childbirth/labor and postpartum hemorrhage content.",
            "Claiborne County EMS medication formulary and linked protocol pathways.",
        ],
    },
    {
        "id": "AO-02",
        "title": "Newly Born",
        "file": "ao-02-newly-born-protocol.pdf",
        "scope": "Use in the immediate newborn period after field, home, or facility delivery. Effective ventilation is the priority when respirations are inadequate or heart rate is below 100/min.",
        "flow_title": "Immediate newborn stabilization and resuscitation",
        "flow": [
            ("1. Birth", "Initiate the cord-management plan. Determine term gestation, breathing/crying, and muscle tone."),
            ("2. All yes", "Routine care: warm, maintain temperature, skin-to-skin with parent, and ongoing evaluation."),
            ("3. Any no", "Warm, dry, position airway, stimulate, and clear airway only when needed. Apply preductal pulse oximetry and consider cardiac monitoring."),
            ("4. Apnea/gasping or HR <100", "Begin BVM ventilation at 40-60/min. Correct mask seal, airway position, and technique until chest movement and heart-rate response are present."),
            ("5. HR remains <60", "After effective ventilation, begin two-thumb encircling chest compressions coordinated 3:1 with ventilation. Use 100% oxygen and obtain UVC/IO access when available."),
            ("6. Still HR <60", "Give epinephrine 0.01 mg/kg IV/IO every 3-5 minutes. Consider hypovolemia or pneumothorax when there is no response."),
            ("7. Reassess + transport", "Maintain warmth; trend right-hand/wrist/upper-arm SpO2 and heart rate; notify destination early; document APGAR at 1 and 5 minutes without interrupting care."),
        ],
        "therapy": [
            ("Oxygen target", "Preductal target SpO2: 2 min 65-70%; 3 min 70-75%; 4 min 75-80%; 5 min 80-85%; 10 min 85-95%."),
            ("Ventilation", "Visible chest movement and rising heart rate are the primary signs of effective ventilation. Do not start compressions before ventilation is effective."),
            ("Volume", "For suspected hypovolemia, normal saline 10 mL/kg IV/IO; may repeat once when there is no response to epinephrine."),
            ("Glucose", "AO-02 does not carry a neonatal D10 dose. After immediate newborn stabilization, use PM-02 for the approved pediatric hypoglycemia and dextrose pathway."),
        ],
        "callout": "Do not routinely suction the airway or perform routine endotracheal suctioning for meconium. Support ventilation when needed.",
        "provider": [
            ("EMT", "Warm, dry, stimulate, position the airway, suction only for obstruction, provide BVM at 40-60/min when indicated, begin two-thumb 3:1 compressions after effective ventilation when HR remains below 60, and prevent hypothermia."),
            ("AEMT", "All EMT actions plus authorized supraglottic airway support, IV/IO access, epinephrine, fluid, and glucose treatment within Claiborne neonatal standing orders."),
            ("Paramedic", "All preceding care plus advanced airway management when ventilation remains ineffective and evaluation of persistent nonresponse for hypovolemia, pneumothorax, hypoglycemia, congenital disease, infection, or maternal medication effect."),
        ],
        "safety": [
            "Apply pulse oximetry to the right hand, wrist, or upper arm for preductal values.",
            "Naloxone is not recommended for neonatal respiratory depression from maternal narcotics; provide ventilatory support.",
            "Do not interrupt resuscitation to obtain APGAR scores.",
            "Premature infants lose heat rapidly; use approved warming adjuncts and anticipate specialty neonatal destination needs.",
        ],
        "links": [
            ("PM-02 Pediatric Diabetic / Hypoglycemia", "Hypoglycemia and approved pediatric dextrose pathway after immediate stabilization"),
            ("AO-01 Childbirth / Labor", "Maternal care, field delivery, and postpartum coordination"),
            ("AR-05 Pediatric Airway", "Pediatric airway support after the immediate newborn period"),
        ],
        "sources": [
            "American Heart Association and American Academy of Pediatrics. 2025 Neonatal Resuscitation Algorithm.",
            "Claiborne County EMS approved newborn, medication, and pediatric-hypoglycemia content.",
        ],
    },
    {
        "id": "AO-03",
        "title": "OB-GYN Emergency",
        "file": "ao-03-ob-gyn-emergency-protocol.pdf",
        "scope": "Use for pregnancy-related or gynecologic hemorrhage, ectopic pregnancy, miscarriage, preeclampsia/eclampsia, trauma, syncope, shock, or other time-critical maternal emergency.",
        "flow_title": "Maternal emergency, hemorrhage, and eclampsia pathway",
        "flow": [
            ("1. Pregnancy/GYN emergency", "Possible pregnancy, recent delivery, vaginal bleeding, abdominal pain, hypertension, seizure, syncope, or shock."),
            ("2. Position + assess", "Left lateral when advanced pregnancy or supine hypotension is possible. ABCs, glucose, serial vital signs, bleeding amount, neurologic findings, and fetal/delivery history."),
            ("3. Shock/hemorrhage?", "Control external bleeding, establish access, use AM-05 resuscitation, and consider TXA for qualifying postpartum hemorrhage."),
            ("4. Field delivery?", "Open AO-01. After placental delivery, address uterine atony and postpartum bleeding."),
            ("5. Seizure/eclampsia?", "Protect airway, start magnesium as cause-directed therapy, and use standardized seizure treatment for an ongoing convulsion."),
            ("6. Rapid transport", "Notify an emergency/OB-capable destination early. A pregnancy with any chance of delivery remains ground transport; do not place on aircraft."),
        ],
        "therapy": [
            ("Postpartum hemorrhage", "After placental delivery, perform uterine massage. For hemorrhage with shock within 3 hours of delivery, give TXA 1 g IV/IO over 10 minutes."),
            ("Eclampsia", "Magnesium sulfate 4-6 g IV over 20-30 minutes, then 1-2 g/hr infusion. Continuously monitor ECG, BP, respiratory status, SpO2, and EtCO2."),
            ("Ongoing convulsion", "Use the standardized adult-seizure regimen: 10 mg IM when IV/IO is not established, 10 mg IN alternative, or 5 mg IV/IO; repeat 5 mg IV/IO once after 5 minutes if needed (maximum total 10 mg)."),
            ("Magnesium toxicity", "Stop magnesium for clinically significant toxicity. With Medical Control, give calcium gluconate 1 g IV slowly and support ventilation/hemodynamics."),
        ],
        "callout": "AM-04's undifferentiated-CVA labetalol standing order does not apply to pregnancy-related hypertension. Obtain Medical Control for the obstetric indication, agent, dose, and blood-pressure endpoint.",
        "provider": [
            ("EMT", "Left lateral positioning when indicated; ABCs, glucose, hemorrhage assessment, seizure protection, oxygenation/ventilation support, and rapid transport."),
            ("AEMT", "All EMT actions plus IV/IO access, AM-05 shock resuscitation, and authorized IM midazolam for an active seizure without delaying treatment for vascular access."),
            ("Paramedic", "All preceding care plus cardiac monitoring, magnesium treatment, qualifying TXA, calcium-gluconate rescue for magnesium toxicity, and advanced resuscitation."),
        ],
        "safety": [
            "Magnesium is the cause-directed eclampsia therapy. Use standardized midazolam only when immediate control of an ongoing convulsion is required.",
            "Vaginal bleeding may be absent with ectopic pregnancy or placental abruption. Shock disproportionate to visible bleeding requires urgent escalation.",
            "Do not rely on a normal ultrasound alone to exclude injury after maternal trauma; physician evaluation and appropriate fetal monitoring are required.",
            "Oxytocin is not carried on the Claiborne formulary and is not authorized under AO-03.",
        ],
        "links": [
            ("AO-01 Childbirth / Labor", "Field delivery, postpartum care, and newborn coordination"),
            ("AO-02 Newly Born", "Immediate newborn resuscitation"),
            ("AM-05 Hypotension / Shock", "Hemorrhage, shock, or inadequate perfusion"),
            ("UP-13 Seizure", "Standardized active-seizure treatment"),
        ],
        "sources": [
            "American College of Obstetricians and Gynecologists. Gestational Hypertension and Preeclampsia, Practice Bulletin No. 222.",
            "Claiborne County EMS approved maternal-emergency, postpartum-hemorrhage, medication, and transport content.",
        ],
    },
]


def register_fonts():
    pdfmetrics.registerFont(TTFont(REGULAR, "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont(BOLD, "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))


def paragraph(text, style):
    return Paragraph(text, style)


def make_styles():
    register_fonts()
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("ao_title", parent=base["Title"], fontName=BOLD, fontSize=20, leading=23, textColor=NAVY, spaceAfter=2),
        "subtitle": ParagraphStyle("ao_subtitle", parent=base["Normal"], fontName=BOLD, fontSize=8.2, leading=10.5, textColor=RED, spaceAfter=8),
        "section": ParagraphStyle("ao_section", parent=base["Heading2"], fontName=BOLD, fontSize=10.8, leading=13, textColor=NAVY, spaceBefore=7, spaceAfter=4),
        "body": ParagraphStyle("ao_body", parent=base["BodyText"], fontName=REGULAR, fontSize=8.1, leading=10.05, textColor=colors.black, spaceAfter=3),
        "callout": ParagraphStyle("ao_callout", parent=base["BodyText"], fontName=BOLD, fontSize=8.1, leading=10.1, textColor=NAVY),
        "table": ParagraphStyle("ao_table", parent=base["BodyText"], fontName=REGULAR, fontSize=7.2, leading=8.85, textColor=colors.black),
        "table_bold": ParagraphStyle("ao_table_bold", parent=base["BodyText"], fontName=BOLD, fontSize=7.2, leading=8.85, textColor=colors.black),
        "table_head": ParagraphStyle("ao_table_head", parent=base["BodyText"], fontName=BOLD, fontSize=7.3, leading=9, textColor=colors.white),
    }


def section(title, styles):
    return [Spacer(1, 1), paragraph(title, styles["section"]), HRFlowable(width="100%", thickness=0.65, color=LIGHT_GRAY, spaceAfter=2)]


def callout(text, styles, background=PALE_BLUE):
    table = Table([[paragraph(text, styles["callout"])]], colWidths=[7.0 * inch])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), background),
        ("BOX", (0, 0), (-1, -1), 0.55, NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return table


def grid(rows, styles, header=None, widths=(1.62 * inch, 5.38 * inch)):
    data = []
    if header:
        data.append([paragraph(header[0], styles["table_head"]), paragraph(header[1], styles["table_head"])])
    data.extend([[paragraph(left, styles["table_bold"]), paragraph(right, styles["table"])] for left, right in rows])
    table = Table(data, colWidths=list(widths), repeatRows=1 if header else 0)
    commands = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.35, LIGHT_GRAY),
        ("LEFTPADDING", (0, 0), (-1, -1), 5.5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5.5),
        ("TOPPADDING", (0, 0), (-1, -1), 3.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
    ]
    if header:
        commands += [("BACKGROUND", (0, 0), (-1, 0), NAVY), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#F7F9FB")])]
    else:
        commands += [("BACKGROUND", (0, 0), (0, -1), PALE_BLUE), ("ROWBACKGROUNDS", (1, 0), (-1, -1), [colors.white, HexColor("#F7F9FB")])]
    table.setStyle(TableStyle(commands))
    return table


def bullets(items, styles):
    return [paragraph(f"- {item}", styles["body"]) for item in items]


def header_footer(protocol, canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(doc.leftMargin, letter[1] - 0.45 * inch, doc.width, 0.12 * inch, fill=1, stroke=0)
    canvas.setStrokeColor(LIGHT_GRAY)
    canvas.setLineWidth(0.4)
    canvas.line(doc.leftMargin, 0.53 * inch, letter[0] - doc.rightMargin, 0.53 * inch)
    canvas.setFont(REGULAR, 6.8)
    canvas.setFillColor(MID_GRAY)
    canvas.drawString(doc.leftMargin, 0.35 * inch, f"Claiborne County EMS Clinical Protocols | {protocol['id']} {protocol['title']}")
    canvas.drawRightString(letter[0] - doc.rightMargin, 0.35 * inch, f"Page {canvas.getPageNumber()} of 2")
    canvas.restoreState()


def build(protocol):
    styles = make_styles()
    TMP.mkdir(parents=True, exist_ok=True)
    temp_path = TMP / protocol["file"]
    output_path = DESTINATION / protocol["file"]
    doc = BaseDocTemplate(
        str(temp_path), pagesize=letter,
        leftMargin=0.75 * inch, rightMargin=0.75 * inch,
        topMargin=0.63 * inch, bottomMargin=0.72 * inch,
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="protocol", frames=[frame], onPage=lambda canvas, document: header_footer(protocol, canvas, document))])

    story = [
        paragraph(f"{protocol['id']} {protocol['title']}", styles["title"]),
        paragraph(f"CLAIBORNE COUNTY EMS | MEDICAL-DIRECTOR APPROVED | SOURCE PDF | {REVISION}", styles["subtitle"]),
        callout(f"<b>Scope:</b> {protocol['scope']}", styles, PALE_RED),
    ]
    story += section(protocol["flow_title"], styles)
    story.append(grid(protocol["flow"], styles))
    story += section("Key treatment and disposition", styles)
    story.append(grid(protocol["therapy"], styles, header=("Situation", "Approved action")))
    story += [Spacer(1, 4), callout(protocol["callout"], styles)]
    story.append(PageBreak())
    story += [
        paragraph(f"{protocol['id']} {protocol['title']}", styles["title"]),
        paragraph("PROVIDER ACTIONS, SAFETY, AND RELEASE CONTROL", styles["subtitle"]),
    ]
    story += section("Provider-level actions", styles)
    story.append(grid(protocol["provider"], styles, header=("Level", "Actions")))
    story += section("Safety checks", styles)
    story += bullets(protocol["safety"], styles)
    story += section("Linked pathways", styles)
    story.append(grid(protocol["links"], styles, header=("Pathway", "Use when")))
    story += section("Source and release control", styles)
    story += bullets([
        *protocol["sources"],
        "This is the controlled Claiborne source PDF and matches the approved Claiborne EMS app content.",
        "Document focused findings, interventions with dose/route/time/response, serial reassessments, destination decision, and notifications.",
    ], styles)
    doc.build(story)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    temp_path.replace(output_path)


if __name__ == "__main__":
    for protocol in PROTOCOLS:
        build(protocol)
    print(f"Built {len(PROTOCOLS)} Adult Obstetrics protocol PDFs.")
