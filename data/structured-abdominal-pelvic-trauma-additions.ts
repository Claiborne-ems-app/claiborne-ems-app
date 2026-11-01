// Compatibility export from the single controlled protocol source.
import { structuredProtocols } from "./structured-protocols";
export const structuredAbdominalPelvicTraumaAdditions = structuredProtocols.filter(protocol => ["tb-12"].includes(protocol.id));
