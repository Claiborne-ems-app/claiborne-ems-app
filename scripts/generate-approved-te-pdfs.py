"""Build approved Claiborne County EMS Toxicology & Environmental source PDFs.

These controlled PDFs replace the legacy imported sheets for TE-03 through TE-09
and mirror the approved structured app content reconciled October 30, 2026.
"""

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
TMP = ROOT / "tmp/pdfs/approved-te"
REVISION = "October 30, 2026"

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


def make_styles():
    pdfmetrics.registerFont(TTFont(REGULAR, "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont(BOLD, "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("title", parent=base["Title"], fontName=BOLD, fontSize=16.7, leading=19.5, textColor=NAVY, spaceAfter=2),
        "subtitle": ParagraphStyle("subtitle", parent=base["Normal"], fontName=BOLD, fontSize=7.8, leading=9.7, textColor=RED, spaceAfter=7),
        "section": ParagraphStyle("section", parent=base["Heading2"], fontName=BOLD, fontSize=9.8, leading=11.7, textColor=NAVY, spaceBefore=5, spaceAfter=2),
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName=REGULAR, fontSize=7.4, leading=9.0, spaceAfter=2.4),
        "table": ParagraphStyle("table", parent=base["BodyText"], fontName=REGULAR, fontSize=6.85, leading=8.15),
        "table_bold": ParagraphStyle("table_bold", parent=base["BodyText"], fontName=BOLD, fontSize=6.85, leading=8.15),
        "head": ParagraphStyle("head", parent=base["BodyText"], fontName=BOLD, fontSize=6.9, leading=8.15, textColor=colors.white),
        "callout": ParagraphStyle("callout", parent=base["BodyText"], fontName=BOLD, fontSize=7.35, leading=8.9, textColor=NAVY),
    }


S = make_styles()


def section(title):
    return [Spacer(1, 1.5), p(title, S["section"]), HRFlowable(width="100%", thickness=0.55, color=LIGHT_GRAY, spaceAfter=2.5)]


def callout(text, background=PALE_BLUE):
    box = Table([[p(text, S["callout"])]], colWidths=[7 * inch])
    box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), background),
        ("BOX", (0, 0), (-1, -1), 0.5, NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 4.5), ("BOTTOMPADDING", (0, 0), (-1, -1), 4.5),
    ]))
    return box


def grid(rows, header=("Topic", "Required action"), left=1.48):
    data = [[p(header[0], S["head"]), p(header[1], S["head"])]]
    data += [[p(left_text, S["table_bold"]), p(right_text, S["table"])] for left_text, right_text in rows]
    table = Table(data, colWidths=[left * inch, (7 - left) * inch], repeatRows=1)
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), 0.32, LIGHT_GRAY),
        ("LEFTPADDING", (0, 0), (-1, -1), 4.8), ("RIGHTPADDING", (0, 0), (-1, -1), 4.8),
        ("TOPPADDING", (0, 0), (-1, -1), 3.15), ("BOTTOMPADDING", (0, 0), (-1, -1), 3.15),
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#F7F9FB")]),
    ]))
    return table


def bullets(items):
    return [p(f"- {item}", S["body"]) for item in items]


def protocol_doc(filename, code, title, total_pages, story):
    PUBLIC.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)
    output = PUBLIC / filename
    temp = TMP / filename

    def footer(canv, doc):
        canv.saveState()
        canv.setStrokeColor(LIGHT_GRAY)
        canv.setLineWidth(0.4)
        canv.line(doc.leftMargin, 0.53 * inch, letter[0] - doc.rightMargin, 0.53 * inch)
        canv.setFont(REGULAR, 6.6)
        canv.setFillColor(MID_GRAY)
        canv.drawString(doc.leftMargin, 0.35 * inch, f"Claiborne County EMS Clinical Protocols | {code} {title}")
        canv.drawRightString(letter[0] - doc.rightMargin, 0.35 * inch, f"Page {canv.getPageNumber()} of {total_pages}")
        canv.restoreState()

    doc = BaseDocTemplate(str(temp), pagesize=letter, leftMargin=0.75 * inch, rightMargin=0.75 * inch, topMargin=0.62 * inch, bottomMargin=0.72 * inch)
    doc.addPageTemplates([PageTemplate(id="protocol", frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")], onPage=footer)])
    doc.build(story)
    temp.replace(output)
    return output


def title_page(code, title, warning):
    return [
        p(f"{code} {title}", S["title"]),
        p(f"CLAIBORNE COUNTY EMS | MEDICAL-DIRECTOR APPROVED | Reconciled {REVISION}", S["subtitle"]),
        callout(warning, PALE_RED),
    ]


def build_te03():
    story = title_page("TE-03", "Drowning / Submersion Injury", "<b>Rescue safety and ventilation come first.</b> Drowning is a hypoxic emergency. Do not create an additional victim or delay effective breaths and CPR for routine interventions.")
    story += section("Recognition and immediate field flow")
    story.append(grid([
        ("1. Safe rescue", "Only trained and equipped rescuers enter hazardous water. Request water-rescue resources when needed. Trained responders may provide in-water breathing support only when safe and without delaying removal."),
        ("2. Initial breaths", "For apnea or unresponsiveness, provide two effective initial breaths/ventilations by the first effective means available. Do not delay for routine suctioning."),
        ("3. Pulse?", "No pulse: begin CPR with breaths and compressions, then follow the age-appropriate cardiac-arrest pathway. Pulse present: continue oxygenation and airway support."),
        ("4. Trauma?", "Use spinal-motion restriction only when a traumatic mechanism or findings indicate it. Never delay oxygenation, ventilation, or CPR."),
        ("5. Dry and monitor", "Remove wet clothing, dry and warm the patient, assess glucose, ECG, temperature, lung findings, oxygenation, work of breathing, and mental status."),
        ("6. Transport", "Encourage evaluation after any symptomatic event. Transport for cough, foam, dyspnea, abnormal lung sounds, hypoxia, abnormal vital signs, altered mental status, or any clinical concern."),
    ], ("Step", "Approved action")))
    story += section("Provider-level actions")
    story.append(grid([
        ("EMT", "Prioritize rescue safety; provide two initial breaths/ventilations when indicated; ventilate through foam without routine suctioning; begin CPR with breaths and compressions if pulseless; dry and warm the patient."),
        ("AEMT", "All EMT care plus IV/IO access and authorized treatment of glucose abnormality, shock, or associated hypothermia."),
        ("Paramedic", "All prior care plus advanced airway/cardiac monitoring and consultation for suspected dive-related barotrauma or decompression illness."),
    ], ("Level", "Approved actions")))
    story += section("Critical safeguards")
    story += bullets([
        "Do not waste time suctioning airway foam. Ventilate through it; suction water or vomit only when needed to clear the airway.",
        "Do not use a single submersion-time cutoff alone to decide whether to begin or continue resuscitation.",
        "Use the applicable cardiac-arrest and termination pathway with the complete clinical context and early Medical Control consultation when needed.",
    ])
    story.append(PageBreak())
    story += [p("TE-03 | RESPIRATORY SUPPORT, DISPOSITION, AND HANDOFF", S["subtitle"])]
    story += section("Airway and ventilation")
    story.append(grid([
        ("Ventilation", "Give oxygen and effective positive-pressure ventilation when indicated. Verify visible chest rise and reassess respiratory effort, lung sounds, oxygenation, and mental status frequently."),
        ("Cardiac arrest", "CPR after drowning includes breaths and chest compressions. Apply an AED/defibrillator after CPR with breaths is underway; do not delay ventilation or compressions while setting up the device."),
        ("Foam and emesis", "Foam is common and is not an indication for prolonged suction attempts. Clear obstruction, vomit, or water when it prevents effective ventilation."),
        ("Dive concerns", "For a diving mechanism, assess for chest pain, neurologic symptoms, decompression illness, barotrauma, or arterial gas embolism and notify the receiving facility early."),
    ]))
    story += section("Transport and handoff")
    story += bullets([
        "Report water type, estimated submersion circumstances, rescue interval, witnessed status, initial condition, initial breaths/CPR, temperature exposure, trauma mechanism, and changes in respiratory or neurologic status.",
        "Document oxygenation, ventilation, ECG, glucose, temperature care, airway procedures, response to care, and whether water-rescue or dive resources were involved.",
        "Use the applicable pediatric or adult airway, cardiac-arrest, hypothermia, trauma, and shock protocols as indicated.",
    ])
    story.append(callout("<b>Critical reminder:</b> Effective ventilation is central to drowning resuscitation. Routine spinal restriction, copious suctioning, or a presumed prolonged submersion interval must not displace lifesaving airway, breathing, and circulation care.", PALE_RED))
    story += section("Release note")
    story += bullets([f"This direct source PDF replaces the prior imported sheet and matches Claiborne-approved TE-03 app content reconciled {REVISION}."])
    return protocol_doc("te-03-drowning-submersion-injury-protocol.pdf", "TE-03", "Drowning / Submersion Injury", 2, story)


def build_te04():
    story = title_page("TE-04", "Hyperthermia", "<b>Heat exposure plus altered mental status is heat stroke until proven otherwise.</b> Begin active cooling immediately; do not wait for a temperature or exclude heat stroke because the first temperature is below 104 F.")
    story += section("Recognition and immediate field flow")
    story.append(grid([
        ("1. Remove from heat", "Move to a cool area, remove tight or excess clothing, limit exertion, assess glucose, and obtain temperature when feasible without delaying care."),
        ("2. Classify", "Cramps: painful spasms. Exhaustion: weakness, dizziness, nausea, or heavy sweating without CNS dysfunction. Heat stroke: heat exposure plus altered mental status, seizure, or coma."),
        ("3. Heat stroke?", "Start active cooling concurrent with resuscitation. Ice- or cold-water immersion is preferred when safe. Use tepid-water immersion or tarp-assisted ice-water cooling when immersion is unavailable."),
        ("4. Cooling endpoint", "Use rectal core temperature when feasible without interrupting care. Stop active cooling once core temperature is below 102 F (39 C)."),
        ("5. Perfusion", "For hypotension, dehydration, or poor perfusion, give isotonic crystalloid in reassessed aliquots: adult 500 mL; pediatric 20 mL/kg. Do not use a routine fixed maximum."),
        ("6. Transport", "Continuously reassess airway, ECG, mental status, BP, perfusion, and core temperature. Notify the receiving facility early for suspected heat stroke."),
    ], ("Step", "Approved action")))
    story += section("Provider-level actions")
    story.append(grid([
        ("EMT", "Move to a cool environment, remove excess clothing, check glucose, begin active cooling, and give oral fluid only for mild illness with intact mentation and swallowing."),
        ("AEMT", "All EMT care plus IV/IO isotonic crystalloid for hypotension, dehydration, or poor perfusion with reassessment after each aliquot."),
        ("Paramedic", "All prior care plus cardiac monitoring and protocol treatment of seizure, dysrhythmia, shock, or airway failure."),
    ], ("Level", "Approved actions")))
    story += section("Critical safeguards")
    story += bullets([
        "Do not delay cooling to obtain a temperature. Heat exposure with altered mental status is heat stroke until proven otherwise.",
        "Antipyretics and dantrolene are not treatments for environmental or exertional heat stroke. Use active external cooling.",
        "Do not overcool. Stop active cooling once core temperature is below 102 F (39 C).",
    ])
    story.append(PageBreak())
    story += [p("TE-04 | COOLING METHODS, FLUIDS, AND HANDOFF", S["subtitle"])]
    story += section("Active cooling methods")
    story.append(grid([
        ("Preferred", "When safe and feasible, use whole-body neck-down cold-water or ice-water immersion with continuous access to the airway and patient monitoring."),
        ("Alternative", "Use tarp-assisted ice-water cooling, tepid-water immersion, cold shower, ice sheets/towels, ice packs to high-flow areas, evaporative spray and fan cooling, or a combined approach when immersion is unavailable."),
        ("Monitoring", "Track mental status, temperature, shivering, airway, respiratory effort, BP, pulse, perfusion, and ECG. Adjust cooling to avoid overshoot below the endpoint."),
        ("Concurrent care", "Manage seizures, agitation, shock, hypoglycemia, dysrhythmia, and airway failure under the applicable approved pathway while cooling continues."),
    ]))
    story += section("Fluids and disposition")
    story.append(grid([
        ("IV/IO fluids", "Use reassessed isotonic crystalloid aliquots only for hypotension, dehydration, or poor perfusion. Reassess lungs, work of breathing, BP, perfusion, and clinical response after each aliquot."),
        ("Oral fluids", "Reserve oral fluids for mild illness when the patient is alert, has intact swallowing, and has no vomiting or altered mental status."),
        ("Destination", "Suspected heat stroke requires emergency evaluation and early receiving-facility notification. Do not delay effective cooling for routine transport tasks when immersion is actively available."),
    ]))
    story += section("Handoff and release note")
    story += bullets([
        "Report activity, environment, onset, duration, cooling methods/times, temperature trend, glucose, fluids, neurologic status, ECG findings, and response to care.",
        "Use the applicable adult or pediatric airway, shock, seizure, dysrhythmia, and altered-mental-status protocol as indicated.",
        f"This direct source PDF replaces the prior imported sheet and matches Claiborne-approved TE-04 app content reconciled {REVISION}.",
    ])
    return protocol_doc("te-04-hyperthermia-protocol.pdf", "TE-04", "Hyperthermia", 2, story)


def build_te05():
    story = title_page("TE-05", "Hypothermia / Frostbite", "<b>Protect from further heat loss and handle gently.</b> Severe hypothermia can mimic death. Full resuscitation and rewarming occur together unless there is obvious lethal injury or the patient is frozen solid.")
    story += section("Recognition and immediate field flow")
    story.append(grid([
        ("1. Shelter and insulate", "Move to warm shelter, remove wet clothing, dry the patient, insulate all exposed surfaces, and obtain temperature when feasible without delaying treatment."),
        ("2. Localized or systemic?", "Frostbite: do not rub. If refreezing can be prevented, rewarm in 37-40 C (99-104 F) water for 20-30 minutes. Systemic hypothermia: support airway, glucose, warming, and ECG."),
        ("3. Pulse check", "For severe hypothermia, assess for signs of life and pulse for at least 60 seconds. If absent, begin the age-appropriate cardiac-arrest pathway with hypothermia modifications and concurrent rewarming."),
        ("4. Core warming", "Use warm blankets and protected heat packs to axillae and groin. Keep chemical heat away from frostbitten tissue. Use warmed fluids when available."),
        ("5. Perfusion", "For hypotension or poor perfusion, use warmed isotonic crystalloid in reassessed aliquots: adult 500 mL; pediatric 20 mL/kg. Do not use a routine fixed maximum."),
        ("6. Hypothermic arrest", "Below 30 C (86 F): full resuscitation with rewarming. For VF/pVT, defibrillate once. If unsuccessful, defer further shocks and epinephrine until 30 C (86 F) or greater; contact Medical Control early."),
    ], ("Step", "Approved action")))
    story += section("Provider-level actions")
    story.append(grid([
        ("EMT", "Remove wet clothing; dry and insulate; apply protected heat packs to axillae and groin; check glucose; provide gentle handling; and reassess temperature, airway, breathing, perfusion, and mental status."),
        ("AEMT", "All EMT care plus IV/IO access and warmed isotonic crystalloid when available for hypotension or poor perfusion, with reassessment after each aliquot."),
        ("Paramedic", "All prior care plus cardiac monitoring and the hypothermic-arrest sequence below 30 C (86 F): full resuscitation with rewarming; one VF/pVT defibrillation attempt; then defer further shocks and epinephrine until 30 C or greater."),
    ], ("Level", "Approved actions")))
    story += section("Frostbite safeguards")
    story += bullets([
        "Do not rub or massage frostbitten tissue, debride blisters, or apply direct chemical heat to frostbitten tissue.",
        "Do not rewarm frostbite if refreezing is possible. When a sustained thaw can be assured, use 37-40 C water for 20-30 minutes.",
        "Protect rewarmed tissue from refreezing and arrange prompt definitive evaluation.",
    ])
    story.append(PageBreak())
    story += [p("TE-05 | HYPOTHERMIC ARREST, TRANSPORT, AND HANDOFF", S["subtitle"])]
    story += section("Hypothermic cardiac arrest")
    story.append(grid([
        ("Below 30 C", "Provide full resuscitation and concurrent rewarming. For VF/pVT, deliver one shock. If unsuccessful, defer further shocks and epinephrine until core temperature is 30 C (86 F) or greater."),
        ("Termination", "Do not use a fixed temperature alone to stop resuscitation. Continue unless there is obvious lethal injury or the patient is frozen solid; obtain early Medical Control input."),
        ("ETCO2", "Do not use ETCO2 alone to predict outcome in hypothermic cardiac arrest."),
        ("Destination", "Contact Medical Control early and consider an ECLS-capable destination when feasible without compromising timely resuscitation and transport."),
    ]))
    story += section("Transport and documentation")
    story.append(grid([
        ("Transport", "Prevent additional heat loss, continue gentle handling and protected warming, reassess ECG, glucose, perfusion, temperature, and respiratory status, and give early destination notification for severe exposure or arrest."),
        ("Handoff", "Report estimated exposure, wet-clothing removal, temperature trend, mental status, ECG/rhythm, pulse-check findings, rewarming methods, fluids, defibrillation/medication modifications, and response to care."),
        ("Linked care", "Use the applicable airway, shock, seizure, cardiac-arrest, and trauma pathway. For cold-water submersion, also use TE-03 Drowning / Submersion Injury."),
    ]))
    story.append(callout("<b>Critical reminder:</b> In severe environmental hypothermia, apparent death can be deceptive. Gentle handling, full resuscitation with rewarming, early Medical Control consultation, and appropriate destination planning are central safeguards.", PALE_RED))
    story += section("Release note")
    story += bullets([f"This direct source PDF replaces the prior imported sheet and matches Claiborne-approved TE-05 app content reconciled {REVISION}."])
    return protocol_doc("te-05-hypothermia-protocol.pdf", "TE-05", "Hypothermia / Frostbite", 2, story)


def build_te07():
    story = title_page("TE-07", "Overdose / Toxic Ingestion", "<b>Ventilation and perfusion come first.</b> Naloxone is titrated to adequate breathing, not return of consciousness. Use Poison Help early and do not import legacy source-PDF antidote doses.")
    story += section("Recognition and immediate field flow")
    story.append(grid([
        ("1. ABCs and history", "Support airway, breathing, circulation, glucose, and temperature. Identify substance, route, amount, time, co-ingestants, intent, containers, and exposure mechanism when safe."),
        ("2. Inadequate ventilation", "Ventilate first. For suspected opioid-induced respiratory depression, administer naloxone only per the current Claiborne Medication Reference. Do not delay airway or ventilation care."),
        ("3. Shock, AMS, seizure", "Treat under the age-appropriate shock, diabetic, altered-mental-status, behavioral, and seizure pathways."),
        ("4. Poison Help", "Call 1-800-222-1222. Obtain 12-lead, IV/IO, and cardiac monitoring as indicated. Use Medical Control for severe exposure or care outside standing orders."),
        ("5. Specific toxin", "Consider APAP/salicylate, beta/CCB, CO/cyanide, organophosphate, TCA, and other toxidromes. Use the current Medication Reference and Poison Help/Medical Control; do not import legacy antidote doses."),
        ("6. Disposition", "Patients treated with naloxone require healthcare observation for recurrent respiratory depression. Other low-risk exposures may follow Poison Help home-care advice only when agency non-transport criteria are met."),
    ], ("Step", "Approved action")))
    story += section("Provider-level actions")
    story.append(grid([
        ("EMT", "Support ventilation; administer naloxone for suspected opioid-induced respiratory depression only per the current Medication Reference; check glucose; contact Poison Help; and support decontamination when indicated."),
        ("AEMT", "All EMT care plus IV/IO access, broader-route naloxone per the current Medication Reference, reassessed fluids, and toxin-specific treatment only with Poison Help or Medical Control guidance."),
        ("Paramedic", "All prior care plus cardiac monitoring, pacing when indicated, and toxidrome-specific advanced care using the current Medication Reference with Poison Help or Medical Control guidance."),
    ], ("Level", "Approved actions")))
    story += section("Critical safeguards")
    story += bullets([
        "Charcoal is not routine. Use only when stocked, authorized, recommended by Poison Help or Medical Control, and when airway protection and swallowing are intact.",
        "Do not clear a patient only because they awaken after naloxone; recurrent respiratory depression can occur and requires healthcare observation.",
        "For skin/eye exposures, remove contaminated clothing and irrigate. For inhalation, move to fresh air only when the scene is safe.",
    ])
    story.append(PageBreak())
    story += [p("TE-07 | TOXIDROME SAFEGUARDS, CONSULTATION, AND HANDOFF", S["subtitle"])]
    story += section("Opioid and ingestion safeguards")
    story.append(grid([
        ("Opioid exposure", "Open the airway and provide breaths or BVM ventilation for respiratory depression or arrest with a pulse. Naloxone does not replace ventilation and must not interrupt high-quality CPR when cardiac arrest is present."),
        ("Naloxone response", "A recurrent decline in mental status or breathing can occur after initial response. Continue monitoring and arrange healthcare observation; repeat treatment follows the current Medication Reference and clinical reassessment."),
        ("Intentional ingestion", "Perform a focused safety assessment for hidden medications and weapons. Intentional, pediatric, pregnant, polysubstance, or symptomatic exposures require direct Poison Help consultation."),
        ("Nerve-agent concern", "For suspected organophosphate or nerve-agent exposure, use TE-08 for responder safety, decontamination, cholinergic recognition, and escalation. Claiborne ground units do not carry a CHEMPACK/Mark I field kit."),
    ]))
    story += section("Consultation, destination, and handoff")
    story += bullets([
        "Report substance/product, route, amount, timing, co-ingestants, intent, toxidrome, ECG findings, glucose, decontamination, airway/ventilatory support, treatment, response, and Poison Help/Medical Control guidance.",
        "Use the applicable airway, shock, seizure, cardiac-arrest, behavioral, diabetic, CO/cyanide, and chemical/HazMat pathways as indicated.",
        "The current Claiborne Medication Reference controls medication selection, route, dose, contraindications, and monitoring for agent-specific treatment.",
    ])
    story.append(callout("<b>Critical reminder:</b> Poison Help is 1-800-222-1222. Early consultation, effective ventilation, safe decontamination, and transport/observation when indicated take priority over legacy dose tables or unstocked antidote searches.", PALE_RED))
    return protocol_doc("te-07-overdose-toxic-ingestion-protocol.pdf", "TE-07", "Overdose / Toxic Ingestion", 2, story)


def build_te08():
    story = title_page("TE-08", "WMD / Nerve-Agent Exposure", "<b>No entry without the right protection.</b> Claiborne ground units do not carry a CHEMPACK, Mark I, or equivalent atropine/pralidoxime field kit. This protocol does not authorize routine field autoinjector or antidote administration.")
    story += section("Recognition and immediate field flow")
    story.append(grid([
        ("1. Do not enter", "Stage uphill and upwind when possible. Request HazMat, fire, law enforcement, and incident command. Only trained personnel with appropriate monitoring, PPE, and respiratory protection may enter the hazard area."),
        ("2. Remove and decontaminate", "Protected personnel remove the patient from the source; remove and bag contaminated clothing; brush dry material; and irrigate as directed. Prevent secondary contamination of responders, ambulance, and receiving facility."),
        ("3. Airway and ventilation", "Suction secretions, provide oxygen and BVM ventilation, and use the applicable seizure pathway. Do not allow antidote retrieval to delay resuscitation."),
        ("4. Cholinergic syndrome?", "Consider miosis, salivation, lacrimation, sweating, bronchorrhea, bronchospasm, vomiting, diarrhea, urination, bradycardia, fasciculations, weakness, apnea, or seizure after a compatible exposure."),
        ("5. Escalate", "Call Poison Help (1-800-222-1222) and Medical Control. Request HazMat/mutual aid and early receiving-facility coordination. No CHEMPACK, Mark I, or equivalent field kit is carried by Claiborne ground units."),
        ("6. Transport", "Transport after indicated decontamination. Communicate agent, route, scene zone, PPE, symptoms, decontamination, airway/ventilatory care, and consultation guidance."),
    ], ("Step", "Approved action")))
    story += section("Provider-level actions")
    story.append(grid([
        ("EMT", "Remain outside the hazard until assigned PPE and training level are appropriate; support removal, decontamination, suction, oxygenation, BVM ventilation, glucose assessment, and rapid transport."),
        ("AEMT", "All EMT care plus IV/IO access, authorized fluids, reassessment, and preparation for rapid respiratory deterioration. Do not administer unstocked atropine/pralidoxime or use non-existent autoinjectors under this protocol."),
        ("Paramedic", "All prior care plus advanced airway/ventilation, cardiac monitoring, and seizure or shock care under the applicable approved pathway. Coordinate agent-specific therapy with Medical Control and the receiving facility; no field antidote pathway is authorized."),
    ], ("Level", "Approved actions")))
    story += section("Critical safeguards")
    story += bullets([
        "Do not enter a hot zone, vapor cloud, confined space, or oxygen-deficient atmosphere without required training, monitoring, PPE, and respiratory protection.",
        "Do not add external kit dosing or use the legacy North Carolina CHEMPACK, Mark I, or autoinjector instructions.",
        "Secondary contamination can injure responders and contaminate the ambulance or receiving facility; decontaminate before entry into the clean treatment area.",
    ])
    story.append(PageBreak())
    story += [p("TE-08 | DECONTAMINATION, ESCALATION, AND HANDOFF", S["subtitle"])]
    story += section("Scene safety and decontamination")
    story.append(grid([
        ("Zones", "Work through incident command and HazMat to establish hot, warm, and cold zones. Account for wind, terrain, vapor density, confined-space risk, flammability, and secondary-device concerns."),
        ("Clothing", "Remove contaminated clothing and jewelry under appropriate protection; bag contaminated items and keep them out of the clean treatment area and ambulance."),
        ("Skin and eyes", "Brush dry material before irrigation. Irrigate eyes/skin as directed by HazMat and Poison Help; avoid routine chemical neutralization or water use on an unidentified water-reactive material."),
        ("Supportive care", "Suction, oxygenation, BVM ventilation, seizure care, shock care, cardiac monitoring, and early destination notification are the available Claiborne field priorities."),
    ]))
    story += section("Antidote and operational boundary")
    story.append(grid([
        ("No field kit", "Claiborne ground units do not carry a CHEMPACK, Mark I, or equivalent atropine/pralidoxime field kit. This protocol does not authorize routine field autoinjector or antidote administration."),
        ("Future adoption", "Atropine and pralidoxime are recognized antidotes for life-threatening cholinergic poisoning, but any Claiborne field pathway requires separately approved inventory, training, pharmacy/formulary review, and standing orders."),
        ("Consultation", "Call Poison Help and Medical Control early. Coordinate with HazMat/mutual aid and the receiving facility for agent identification, specialty resources, destination, and any care outside standing orders."),
    ]))
    story += section("Handoff and linked pathways")
    story += bullets([
        "Report agent/source, route, duration, scene zone, required PPE, symptoms, decontamination, airway/ventilatory support, glucose/ECG findings, treatments, and Poison Help/Medical Control guidance.",
        "Use TE-09 Chemical / HazMat Exposure for general zone, PPE, decontamination, and agent-card guidance; use TE-07 for overdose/toxic-ingestion support when applicable.",
        f"This direct source PDF replaces the prior imported sheet and matches Claiborne-approved TE-08 app content reconciled {REVISION}.",
    ])
    story.append(callout("<b>Critical reminder:</b> Supportive care, decontamination, responder safety, and early escalation are the approved Claiborne ground response. Do not delay these measures while seeking an unavailable field antidote kit.", PALE_RED))
    return protocol_doc("te-08-wmd-nerve-agent-protocol.pdf", "TE-08", "WMD / Nerve-Agent Exposure", 2, story)


def build_te09():
    story = title_page("TE-09", "Chemical / HazMat Exposure", "<b>Responder safety and contamination control come before patient contact.</b> Do not enter a hot zone or confined space without required training, monitoring, PPE, respiratory protection, and HazMat coordination.")
    story += section("Universal chemical-exposure flow")
    story.append(grid([
        ("1. Zones and PPE", "Establish hot, warm, and cold zones; identify wind, terrain, vapor density, flammability, oxygen-deficiency, and confined-space risk; request HazMat and incident command."),
        ("2. Safe rescue", "Remove from the source only by properly trained and protected personnel. Prevent additional victims and protect EMS equipment from contamination."),
        ("3. Decontaminate", "Remove clothing/jewelry; brush dry agents; blot liquids; irrigate when indicated; contain runoff; and do not bring contamination into the ambulance or receiving facility."),
        ("4. ABCs", "Treat airway edema, bronchospasm, respiratory failure, shock, dysrhythmia, seizure, burns, and temperature injury under applicable approved pathways."),
        ("5. Identify agent", "Use label, placard, SDS, ERG, witness report, route, duration, concentration, and symptoms without re-entering the hazard or transporting contaminated packaging."),
        ("6. Consult and transport", "Call Poison Help (1-800-222-1222) and Medical Control for significant or unknown exposure. Verify destination and notify the receiving facility of decontamination status."),
    ], ("Step", "Approved action")))
    story += section("Provider-level actions")
    story.append(grid([
        ("EMT", "Stage until safe for the assigned PPE/training level; assist clothing removal and irrigation; support ABCs; obtain product/exposure details safely; and contact Poison Help."),
        ("AEMT", "All EMT care plus IV/IO access, authorized fluids/medications, continuous reassessment, and preparation for respiratory deterioration. For cholinergic findings, use TE-08 for supportive care and escalation; no CHEMPACK/Mark I field kit is carried."),
        ("Paramedic", "All prior care plus advanced airway/ventilation, CPAP when appropriate, cardiac monitoring, 12-lead, and seizure, dysrhythmia, and shock management. Specialty antidotes require an approved kit/order or Medical Control."),
    ], ("Level", "Approved actions")))
    story += section("Universal safeguards")
    story += bullets([
        "Do not routinely neutralize acids, alkalis, or other chemicals on or inside the patient. Do not induce vomiting after caustic, hydrocarbon, or unknown ingestion.",
        "A normal initial examination or pulse-ox reading does not exclude delayed pulmonary edema, cellular asphyxiation, methemoglobinemia, electrolyte toxicity, or deep tissue injury.",
    ])
    story.append(PageBreak())
    story += [p("TE-09 | COMMON AGENT CARDS", S["subtitle"])]
    story += section("Chlorine / chloramine and ammonia")
    story.append(grid([
        ("Chlorine / chloramine", "Pool products, industrial chlorine, or mixing bleach with acid/ammonia can cause eye/throat burning, cough, wheeze, stridor, hypoxemia, delayed pulmonary edema, and frostbite from liquefied product. Protected removal, clothing removal, irrigation, ventilation, and bronchospasm care are priorities. Nebulized bicarbonate is not routine and requires separate adoption/stock/order."),
        ("Ammonia", "Fertilizer, refrigeration, or concentrated cleaners can cause severe eye and upper-airway injury, laryngeal edema, chemical burns, pulmonary edema, and frostbite. Use protected rescue, decontamination, irrigation, airway vigilance, and early difficult-airway preparation."),
    ], ("Agent", "Recognition and field care")))
    story += section("Organophosphate / carbamate pesticide")
    story.append(grid([
        ("Recognition", "Consider after pesticide exposure with miosis, sweating, salivation, lacrimation, vomiting, diarrhea, urination, fasciculations, weakness, bradycardia, bronchospasm, or profuse pulmonary secretions."),
        ("Field priorities", "Avoid secondary dermal contamination. Use chemical PPE, remove/bag clothing, wash skin/hair, suction secretions, oxygenate, ventilate, and use TE-08 for cholinergic recognition and escalation."),
        ("Antidote boundary", "Claiborne ground units do not carry a CHEMPACK, Mark I, or equivalent atropine/pralidoxime kit. Do not use legacy kit counts, autoinjector directions, or unstocked antidote doses."),
    ], ("Topic", "Required action")))
    story += section("Hydrogen sulfide")
    story.append(grid([
        ("Risk", "Sewers, septic systems, manure pits, petroleum operations, and decaying organic matter may generate a heavier-than-air gas that rapidly incapacitates rescuers. Odor is unreliable because olfactory fatigue occurs."),
        ("Field care", "Only trained personnel with appropriate respiratory protection may remove the patient. Provide high-concentration oxygen and ventilation, cardiac monitoring, seizure care, and Poison Help/Medical Control consultation. Nitrite therapy requires separate adoption/stock/order."),
    ], ("Topic", "Required action")))
    story.append(PageBreak())
    story += [p("TE-09 | HIGH-RISK EXPOSURES AND DECONTAMINATION", S["subtitle"])]
    story += section("Hydrofluoric acid / hydrogen fluoride")
    story.append(grid([
        ("Recognition", "Glass etching, rust removal, industrial processing, wheel/metal cleaners, and laboratory products can cause delayed pain and systemic hypocalcemia, hypomagnesemia, hyperkalemia, prolonged QT, ventricular dysrhythmia, shock, or death."),
        ("Field care", "Use chemical PPE; remove clothing/jewelry; brush dry material; irrigate immediately and copiously; establish access in an unexposed extremity when feasible; obtain continuous ECG monitoring; and obtain Poison Help/Medical Control guidance."),
        ("Calcium boundary", "After irrigation, topical, nebulized, or other calcium gluconate routes require a finalized Claiborne kit/preparation, training, standing order, or direct Medical Control. Eye, inhalation, ingestion, hand, face, genital, circumferential, large-area, or symptomatic exposure requires urgent specialty evaluation."),
    ], ("Topic", "Required action")))
    story += section("Unknown chemical / corrosive")
    story.append(grid([
        ("Approach", "Treat unknown material as hazardous. Use placards, labels, SDS, ERG, witnesses, and toxidrome without touching contamination or bringing a container into the ambulance."),
        ("Decontamination", "Brush dry agents before irrigation. For most liquid skin/eye exposures, remove contaminated items and irrigate with copious tepid water. Do not apply water to a suspected water-reactive material until HazMat/Poison Help provides direction."),
        ("Disposition", "Transport symptomatic patients and those with significant eye injury, airway symptoms, abnormal vital signs, altered mental status, intentional exposure, concentrated corrosive ingestion, uncertain decontamination, or delayed-risk agents."),
    ], ("Topic", "Required action")))
    story += section("Responder exposure")
    story += bullets([
        "Any responder with symptoms, PPE breach, splash, inhalation, needlestick, or uncertain exposure must be removed from duty, decontaminated, medically evaluated, and documented under the agency exposure process.",
        "Use an unexposed extremity for vascular access when feasible and protect patient-care equipment from contamination.",
    ])
    story.append(PageBreak())
    story += [p("TE-09 | CONSULTATION, DESTINATION, AND RELEASE SAFEGUARDS", S["subtitle"])]
    story += section("Poison Help, Medical Control, and destination")
    story.append(grid([
        ("Poison Help", "Call 1-800-222-1222 for severe/unknown exposure, unusual antidote, persistent symptoms, ingestion, intentional exposure, pediatric patient, pregnancy, or destination guidance."),
        ("Medical Control", "Use for care outside standing orders, specialty antidotes, unapproved preparations, unusual agent-specific treatment, or destination decisions requiring local resources."),
        ("Destination", "Coordinate early with the most appropriate receiving facility, burn center, trauma center, pediatric center, or toxicology-capable facility. Notify before arrival and report decontamination status."),
        ("Handoff", "Report identified/suspected agent, source, route, concentration, duration, PPE/zone, decontamination, product information, Poison Help/Medical Control recommendations, treatment, response, and contamination status."),
    ], ("Topic", "Required action")))
    story += section("Specialty-therapy boundary")
    story.append(grid([
        ("Not routine", "Nebulized sodium bicarbonate, calcium gluconate for hydrofluoric acid, methylene blue, nitrite therapy, chelation, and other specialty antidotes are not routine field therapies."),
        ("Required before use", "A specialty therapy may appear in field care only when specifically adopted, stocked, trained, and ordered under a finalized Claiborne standing order or direct Medical Control."),
        ("Nerve-agent kits", "Claiborne ground units do not carry a CHEMPACK, Mark I, or equivalent atropine/pralidoxime field kit. Use TE-08 for scene safety, decontamination, recognition, and escalation rather than legacy kit directions."),
    ], ("Topic", "Required action")))
    story += section("Release note")
    story += bullets([
        "Current Tennessee law, provider scope, Poison Help recommendations, HazMat direction, and Claiborne County policy control if any conflict exists.",
        f"This direct source PDF matches Claiborne-approved TE-09 app content reconciled {REVISION}.",
    ])
    story.append(callout("<b>Critical reminder:</b> Do not become an additional victim. Safe rescue, contamination control, decontamination, airway/ventilation support, Poison Help, Medical Control, and early destination notification are the approved Claiborne field priorities.", PALE_RED))
    return protocol_doc("te-09-chemical-hazmat-exposure-protocol.pdf", "TE-09", "Chemical / HazMat Exposure", 4, story)


if __name__ == "__main__":
    outputs = [build_te03(), build_te04(), build_te05(), build_te07(), build_te08(), build_te09()]
    for output in outputs:
        print(f"Built {output.name}")
