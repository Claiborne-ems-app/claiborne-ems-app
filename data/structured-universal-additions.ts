// Compatibility export from the single controlled protocol source.
import { structuredProtocols } from "./structured-protocols";
export const structuredUniversalAdditions = structuredProtocols.filter(protocol => ["up-20","up-21","up-22"].includes(protocol.id));
