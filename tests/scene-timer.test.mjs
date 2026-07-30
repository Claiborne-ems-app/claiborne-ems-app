import assert from "node:assert/strict";
import test from "node:test";
import {
  createSceneTimelineText,
  formatSceneTime,
  getSceneElapsedSeconds,
  normalizeSceneWorkspace,
} from "../lib/scene-timer.ts";

test("scene timer formats short and extended scene times", () => {
  assert.equal(formatSceneTime(0), "00:00");
  assert.equal(formatSceneTime(605), "10:05");
  assert.equal(formatSceneTime(3661), "01:01:01");
});

test("running timer derives elapsed time from the wall clock", () => {
  const workspace = {
    accumulatedSeconds: 12,
    runningSince: 1_000,
    sceneStartedAt: "2026-07-30T12:00:00.000Z",
    entries: [],
  };

  assert.equal(getSceneElapsedSeconds(workspace, 6_500), 17);
  assert.equal(
    getSceneElapsedSeconds({ ...workspace, runningSince: null }, 60_000),
    12
  );
});

test("stored scene data is normalized and limited to 100 entries", () => {
  const entries = Array.from({ length: 105 }, (_, index) => ({
    id: `${index}`,
    note: `Treatment ${index}`,
    elapsedSeconds: index,
    recordedAt: "2026-07-30T12:00:00.000Z",
  }));
  const workspace = normalizeSceneWorkspace({
    accumulatedSeconds: 12.9,
    runningSince: 1_000,
    sceneStartedAt: "2026-07-30T12:00:00.000Z",
    entries,
  });

  assert.equal(workspace.accumulatedSeconds, 12);
  assert.equal(workspace.entries.length, 100);
  assert.equal(workspace.entries[0].note, "Treatment 5");
});

test("copied timeline contains elapsed time, clock time, and treatment", () => {
  const timeline = createSceneTimelineText({
    accumulatedSeconds: 30,
    runningSince: null,
    sceneStartedAt: "2026-07-30T12:00:00.000Z",
    entries: [
      {
        id: "treatment-1",
        note: "Epinephrine 1 mg IV administered",
        elapsedSeconds: 18,
        recordedAt: "2026-07-30T12:00:18.000Z",
      },
    ],
  });

  assert.match(timeline, /Claiborne EMS scene timeline/);
  assert.match(timeline, /00:18/);
  assert.match(timeline, /Epinephrine 1 mg IV administered/);
  assert.match(timeline, /review before entering/i);
});
