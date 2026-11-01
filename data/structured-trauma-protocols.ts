// Compatibility export from the single controlled protocol source.
import { structuredProtocols } from "./structured-protocols";
export const structuredTraumaProtocols = structuredProtocols.filter(protocol => ["tb-01","tb-02","tb-03","tb-04","tb-05","tb-06","tb-07","tb-08","tb-09","tb-10"].includes(protocol.id));
