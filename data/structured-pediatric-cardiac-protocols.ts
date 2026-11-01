// Compatibility export from the single controlled protocol source.
import { structuredProtocols } from "./structured-protocols";
export const structuredPediatricCardiacProtocols = structuredProtocols.filter(protocol => ["pc-01","pc-02","pc-03","pc-04","pc-05","pc-06","pc-07","pc-08"].includes(protocol.id));
