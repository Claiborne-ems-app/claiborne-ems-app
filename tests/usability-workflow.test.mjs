import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("bottom navigation exposes the dedicated scene timer beside Tools", async () => {
  const source = await read("components/navigation/BottomNav.tsx");
  assert.match(source, /href="\/tools"/);
  assert.match(source, /href="\/scene-timer"/);
  assert.ok(
    source.indexOf('href="/tools"') < source.indexOf('href="/scene-timer"')
  );
  assert.match(source, />Timer<\/span>/);
});

test("Tools is a focused card dashboard with dedicated screens", async () => {
  const source = await read("app/tools/page.tsx");
  assert.match(source, /\/tools\/search/);
  assert.match(source, /\/tools\/provider-view/);
  assert.match(source, /\/scene-timer/);
  assert.doesNotMatch(source, /<SceneTimer\s*\/>/);
  await Promise.all([
    read("app/tools/search/page.tsx"),
    read("app/tools/provider-view/page.tsx"),
    read("app/scene-timer/page.tsx"),
  ]);
});

test("Home quick actions link to all four field workflows", async () => {
  const source = await read("components/home/QuickActions.tsx");
  for (const href of [
    "/tools/search",
    "/medications",
    "/scene-timer",
    "/tools/pediatric-resuscitation",
  ]) {
    assert.match(source, new RegExp(`href: "${href}"`));
  }
  const home = await read("app/page.tsx");
  assert.match(home, /<QuickActions\s*\/>/);
});

test("global layout provides update and active-timer surfaces", async () => {
  const layout = await read("app/layout.tsx");
  const update = await read("components/offline/AppUpdatePrompt.tsx");
  const activeTimer = await read("components/tools/ActiveSceneTimerBar.tsx");
  assert.match(layout, /<AppUpdatePrompt\s*\/>/);
  assert.match(layout, /<ActiveSceneTimerBar\s*\/>/);
  assert.match(update, /Update and reload/);
  assert.match(update, /scene timer is active/i);
  assert.match(activeTimer, /Scene timer running/);
});

test("new field routes are included in the offline package", async () => {
  const source = await read("scripts/generate-offline-manifest.mjs");
  assert.match(source, /"\/scene-timer"/);
  assert.match(source, /"\/tools\/search"/);
  assert.match(source, /"\/tools\/provider-view"/);
});
