import { adminProtocols } from "../data/admin-review.ts";
import { appConfig } from "../lib/app-config.ts";
import { calculateProductionReleaseReadiness } from "../lib/admin/release-readiness.ts";

const readiness = calculateProductionReleaseReadiness(adminProtocols);

console.table([{
  "protocols in inventory": readiness.totalProtocols,
  approved: readiness.approved,
  reviewed: readiness.reviewed,
  "in review": readiness.inReview,
  "not started": readiness.notStarted,
  "release metadata complete": readiness.clinicallyReady ? "yes" : "no",
  "current app status": appConfig.betaStatus,
}]);

if (!readiness.clinicallyReady) {
  console.error(
    `Production-release governance gate remains closed: ${readiness.pendingProtocols} protocol${readiness.pendingProtocols === 1 ? "" : "s"} still have pending governance metadata; this is not a claim that their clinical content lacks user approval. See docs/release-handoff-2.34.0.md.`,
  );
  process.exitCode = 1;
}
