export const SCENE_STORAGE_KEY = "claiborne-ems:scene-workspace:v1";
export const SCENE_WORKSPACE_EVENT = "claiborne-ems:scene-workspace-change";

export type SceneEntry = {
  id: string;
  note: string;
  elapsedSeconds: number;
  recordedAt: string;
};

export type SceneWorkspace = {
  accumulatedSeconds: number;
  runningSince: number | null;
  sceneStartedAt: string | null;
  entries: SceneEntry[];
};

export const emptySceneWorkspace: SceneWorkspace = {
  accumulatedSeconds: 0,
  runningSince: null,
  sceneStartedAt: null,
  entries: [],
};

export function formatSceneTime(totalSeconds: number) {
  const normalizedSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(normalizedSeconds / 3600);
  const minutes = Math.floor((normalizedSeconds % 3600) / 60);
  const seconds = normalizedSeconds % 60;

  if (hours > 0) {
    return [hours, minutes, seconds]
      .map((value) => value.toString().padStart(2, "0"))
      .join(":");
  }

  return [minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
}

export function getSceneElapsedSeconds(
  workspace: SceneWorkspace,
  now = Date.now()
) {
  if (workspace.runningSince === null) return workspace.accumulatedSeconds;
  return (
    workspace.accumulatedSeconds +
    Math.max(0, Math.floor((now - workspace.runningSince) / 1000))
  );
}

export function formatSceneClockTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(value));
}

function isSceneEntry(value: unknown): value is SceneEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<SceneEntry>;
  return (
    typeof entry.id === "string" &&
    typeof entry.note === "string" &&
    typeof entry.elapsedSeconds === "number" &&
    entry.elapsedSeconds >= 0 &&
    typeof entry.recordedAt === "string"
  );
}

export function normalizeSceneWorkspace(value: unknown): SceneWorkspace {
  if (!value || typeof value !== "object") return emptySceneWorkspace;
  const workspace = value as Partial<SceneWorkspace>;

  return {
    accumulatedSeconds:
      typeof workspace.accumulatedSeconds === "number" &&
      workspace.accumulatedSeconds >= 0
        ? Math.floor(workspace.accumulatedSeconds)
        : 0,
    runningSince:
      typeof workspace.runningSince === "number"
        ? workspace.runningSince
        : null,
    sceneStartedAt:
      typeof workspace.sceneStartedAt === "string"
        ? workspace.sceneStartedAt
        : null,
    entries: Array.isArray(workspace.entries)
      ? workspace.entries.filter(isSceneEntry).slice(-100)
      : [],
  };
}

export function createSceneTimelineText(workspace: SceneWorkspace) {
  const started = workspace.sceneStartedAt
    ? new Date(workspace.sceneStartedAt).toLocaleString()
    : "Not recorded";
  const lines = workspace.entries.map(
    (entry) =>
      `${formatSceneTime(entry.elapsedSeconds)} | ${formatSceneClockTime(
        entry.recordedAt
      )} | ${entry.note}`
  );

  return [
    "Claiborne EMS scene timeline",
    `Scene started: ${started}`,
    "",
    ...lines,
    "",
    "Draft field notes — review before entering into the patient care record.",
  ].join("\n");
}
