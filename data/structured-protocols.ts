import type { StructuredProtocolContent } from "../lib/protocols/structured-content";

export const structuredProtocols: StructuredProtocolContent[] = [
  {
    id: "universal-patient-care",
    title: "Universal Patient Care",
    categoryId: "medical",
    category: "Medical",
    overview: ["Universal Patient Care Guideline"],
    indications: [],
    contraindications: [],
    assessment: [
      {
        title: "Body Substance Isolation Precautions",
        items: ["Gloves", "Eye Protection, PRN", "Respiratory Protection, PRN", "Splash/Splatter Protection, PRN"],
      },
      {
        title: "Scene Size-Up",
        items: [
          "Scene Safety",
          "Evaluate the mechanism of injury or illness",
          "Determine the number of patients",
          "Request additional resources, PRN",
        ],
      },
      {
        title: "Initial Assessment",
        items: [
          "Evaluate general impression of the patient.",
          "Determine chief complaint/Life threats",
          "Determine level of consciousness",
          "Assess airway, breathing, circulation",
        ],
      },
      {
        title: "Select Appropriate Assessment",
        items: ["Medical Assessment", "Trauma Assessment", "Obstetrical Assessment", "Pediatric Assessment"],
      },
      {
        title: "Assess Airway, Breathing, and Circulation",
        items: [
          "Moderate to severe respiratory distress/failure?",
          "Assess and control major bleeding",
          "Maintain Sp02 to >94%.",
          "Application of appropriate oxygen delivery device",
          "Assess pulse",
          "Assess skin color, temperature",
          "Assess Cap refill",
        ],
      },
      {
        title: "Vitals",
        items: [
          "Continuously monitor vital signs q5 minutes",
          "NIBP",
          "Respiratory Rate",
          "Heart Rate",
          "Pulse Ox",
          "AVPU",
          "Blood Sugar",
        ],
      },
    ],
    treatmentSteps: [
      "All patients should have their height measured.",
      "Obtain IBW using the IBW Reference Chart",
      "Round up IBW to nearest 5 kg for medication dosing",
    ],
    medications: [],
    warnings: [],
    clinicalPearls: [],
    specialPopulations: [
      {
        title: "Pediatric patients",
        items: [
          "For pediatric patients, IBW will be based on length-based tape color unless an accurate weight is obtained from a reliable source.",
          "For pediatric patients who exceed the length-based tape and are <60 inches, use the following IBW:",
          "Male 50 kgs",
          "Female 45 kgs",
        ],
      },
    ],
    references: ["IBW Reference Chart", "Medical Assessment", "Trauma Assessment", "Obstetrical Assessment", "Pediatric Assessment"],
    sourcePdf: "covenant-health-air-protocols.pdf",
    sourcePages: { start: 15, end: 15 },
    revisionDate: "July 2026",
    lastVerifiedDate: "July 20, 2026",
    reviewStatus: "Draft",
    reviewFlags: [
      "Source page contains a flowchart and multi-column relationships that require manual clinical review.",
      "No imported content is approved automatically.",
    ],
  },
];

export function getStructuredProtocol(categoryId: string, protocolId: string) {
  return structuredProtocols.find(
    (protocol) => protocol.categoryId === categoryId && protocol.id === protocolId
  );
}

export function hasReviewedNativeContent(content?: StructuredProtocolContent) {
  return content?.reviewStatus === "Reviewed" || content?.reviewStatus === "Approved";
}

export function getPrimaryProtocolHref(categoryId: string, protocolId: string) {
  return hasReviewedNativeContent(getStructuredProtocol(categoryId, protocolId))
    ? `/protocols/${categoryId}/${protocolId}`
    : `/protocols/${categoryId}/${protocolId}/viewer`;
}
