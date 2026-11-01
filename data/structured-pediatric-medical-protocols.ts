// Compatibility export from the single controlled protocol source.
import { structuredProtocols } from "./structured-protocols";
export const structuredPediatricMedicalProtocols = structuredProtocols.filter(protocol => ["pm-01","pm-02","pm-03","pm-04"].includes(protocol.id));
