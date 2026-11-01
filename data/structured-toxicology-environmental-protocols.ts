// Compatibility export from the single controlled protocol source.
import { structuredProtocols } from "./structured-protocols";
export const structuredToxicologyEnvironmentalProtocols = structuredProtocols.filter(protocol => ["te-01","te-02","te-03","te-04","te-05","te-07","te-08"].includes(protocol.id));
