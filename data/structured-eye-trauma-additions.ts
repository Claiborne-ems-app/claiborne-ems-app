// Compatibility export from the single controlled protocol source.
import { structuredProtocols } from "./structured-protocols";
export const structuredEyeTraumaAdditions = structuredProtocols.filter(protocol => ["tb-11"].includes(protocol.id));
