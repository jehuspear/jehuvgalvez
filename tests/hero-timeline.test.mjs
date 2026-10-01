import assert from "node:assert/strict";
import { test } from "node:test";
import { heroTimeline } from "../lib/hero-timeline.ts";

test("sequence ends before a separate 80vh handoff and stays on its last frame", () => {
  assert.deepEqual(heroTimeline(0, 3200, 1000, true), { progress: 0, handoff: 0 });
  assert.deepEqual(heroTimeline(1200, 3200, 1000, true), { progress: .5, handoff: 0 });
  assert.deepEqual(heroTimeline(2400, 3200, 1000, true), { progress: 1, handoff: 0 });
  assert.deepEqual(heroTimeline(2800, 3200, 1000, true), { progress: 1, handoff: .5 });
  assert.deepEqual(heroTimeline(4000, 3200, 1000, true), { progress: 1, handoff: 1 });
  assert.deepEqual(heroTimeline(-200, 3200, 1000, true), { progress: 0, handoff: 0 });
});

test("standalone hero keeps its original progress mapping", () => {
  assert.deepEqual(heroTimeline(1200, 2400, 1000, false), { progress: .5, handoff: 0 });
});
