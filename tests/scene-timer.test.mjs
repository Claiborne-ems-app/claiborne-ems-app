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

test("stored scene data preserves prior entries without silent truncation", () => {
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
  assert.equal(workspace.entries.length, 105);
  assert.equal(workspace.entries[0].note, "Treatment 0");
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


test("wall-clock timer catches up after backgrounding and preserves paused time",()=>{
 const w={accumulatedSeconds:7,runningSince:1000,sceneStartedAt:"2026-07-30T12:00:00Z",entries:[]};
 assert.equal(getSceneElapsedSeconds(w,3601000),3607);
 const p={...w,accumulatedSeconds:3607,runningSince:null};
 assert.equal(getSceneElapsedSeconds(p,7201000),3607);
 assert.equal(getSceneElapsedSeconds({...p,runningSince:7201000},7206000),3612);
 assert.equal(getSceneElapsedSeconds(w,0),7);
});
test("invalid persisted dates and nonfinite values are rejected",()=>{
 const w=normalizeSceneWorkspace({accumulatedSeconds:Infinity,runningSince:NaN,sceneStartedAt:"bad",entries:[
 {id:"bad",note:"bad",elapsedSeconds:2,recordedAt:"bad"},
 {id:"inf",note:"bad",elapsedSeconds:Infinity,recordedAt:"2026-07-30T12:00:00Z"},
 {id:"ok",note:"ok",elapsedSeconds:2,recordedAt:"2026-07-30T12:00:00Z"}]});
 assert.equal(w.accumulatedSeconds,0);assert.equal(w.runningSince,null);assert.equal(w.sceneStartedAt,null);assert.equal(w.entries.length,1);assert.doesNotThrow(()=>createSceneTimelineText(w));assert.equal(formatSceneTime(Infinity),"00:00");
});
test("capacity guard prevents silent overwrite and retains draft",async()=>{
 const {readFile}=await import("node:fs/promises");const s=await readFile(new URL("../components/tools/SceneTimer.tsx",import.meta.url),"utf8");
 assert.match(s,/if \(atEntryCapacity\)/);assert.match(s,/No existing entry will be overwritten/);assert.match(s,/disabled=\{!hasScene \|\| !draft.trim\(\) \|\| atEntryCapacity\}/);assert.doesNotMatch(s,/slice\(-100\)/);
});
