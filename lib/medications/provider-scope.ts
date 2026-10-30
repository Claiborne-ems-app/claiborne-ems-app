import type { MedicationDoseReference, MedicationProviderLevel } from "../../data/medication-reference";

const LEVELS: MedicationProviderLevel[] = ["EMT", "AEMT", "Paramedic"];

/** A display selection or direct link is not a credential record. */
export function medicationDoseState(
  dose: MedicationDoseReference,
  provider: MedicationProviderLevel
): "available" | "authorization-pending" | "out-of-scope" {
  if (provider === "AEMT" && dose.conditionalAemt) return "authorization-pending";
  return LEVELS.indexOf(dose.level) <= LEVELS.indexOf(provider) ? "available" : "out-of-scope";
}

export const AEMT_ANALGESIA_AUTHORIZATION_NOTICE =
  "Expanded AEMT analgesia is not enabled: authorization is unverified. Verify current Tennessee authority for the exact medication and route, documented applicable training, agency competency/credentialing, and medical-director standing orders for the indication and patient group. Selecting a provider view, completing a class, or opening a link does not establish those permissions. Request Paramedic support and follow the approved Medical Control process within scope.";
