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
  "clinical release ready": readiness.clinicallyReady ? "yes" : "no",
  "current app status": appConfig.betaStatus,
}]);

if (!readiness.clinicallyReady) {
  console.error(
    `Clinical-release gate is closed: ${readiness.pendingProtocols} protocol${readiness.pendingProtocols === 1 ? "" : "s"} still require final approval.`,
  );
  process.exitCode = 1;
}
