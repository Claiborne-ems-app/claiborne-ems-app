// Compatibility export from the single controlled protocol source.
import { structuredProtocols } from "./structured-protocols";
export const structuredAirwayProtocols = structuredProtocols.filter(protocol => ["ar-01","ar-02","ar-03","ar-04","ar-05","ar-06","ar-07","ar-08","ar-09","ar-10","ar-11"].includes(protocol.id));
