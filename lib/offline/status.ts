export type OfflineStatus =
  | "not-downloaded"
  | "downloading"
  | "ready"
  | "update-available"
  | "incomplete"
  | "verification-failed";

export type OfflineResource = {
  url: string;
  kind: "route" | "document" | "static";
  bytes: number | null;
};

export type OfflineState = {
  status: OfflineStatus;
  activeVersion: string | null;
  packageVersion: string | null;
  availableVersion?: string | null;
  completedAt?: string;
  fileCount?: number;
  bytes?: number;
  estimatedBytes?: number | null;
  estimatedFiles?: number | null;
  missingCount?: number;
  lastError?: string;
};

export const EMPTY_OFFLINE_STATE: OfflineState = {
  status: "not-downloaded",
  activeVersion: null,
  packageVersion: null,
};

export function parseOfflineState(value: string | null): OfflineState {
  if (!value) return EMPTY_OFFLINE_STATE;
  try {
    const parsed = JSON.parse(value) as Partial<OfflineState>;
    const validStatuses: OfflineStatus[] = [
      "not-downloaded",
      "downloading",
      "ready",
      "update-available",
      "incomplete",
      "verification-failed",
    ];
    if (!parsed.status || !validStatuses.includes(parsed.status)) return EMPTY_OFFLINE_STATE;
    return {
      ...parsed,
      status: parsed.status,
      activeVersion: typeof parsed.activeVersion === "string" ? parsed.activeVersion : null,
      packageVersion: typeof parsed.packageVersion === "string" ? parsed.packageVersion : null,
    };
  } catch {
    return EMPTY_OFFLINE_STATE;
  }
}

export function serializeOfflineState(state: OfflineState) {
  return JSON.stringify(state);
}

export function offlineStatusLabel(status: OfflineStatus) {
  switch (status) {
    case "ready": return "Ready for Offline Use";
    case "downloading": return "Downloading";
    case "update-available": return "Update Available";
    case "incomplete": return "Incomplete Download";
    case "verification-failed": return "Verification Failed";
    default: return "Not Downloaded";
  }
}
