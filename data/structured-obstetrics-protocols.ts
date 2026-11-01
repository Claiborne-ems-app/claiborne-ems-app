// Compatibility export from the single controlled protocol source.
import { structuredProtocols } from "./structured-protocols";
export const structuredObstetricsProtocols = structuredProtocols.filter(protocol => ["ao-01","ao-02","ao-03"].includes(protocol.id));
