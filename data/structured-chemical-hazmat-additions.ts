// Compatibility export from the single controlled protocol source.
import { structuredProtocols } from "./structured-protocols";
export const structuredChemicalHazmatAdditions = structuredProtocols.filter(protocol => ["te-09"].includes(protocol.id));
