import test from "node:test";
import assert from "node:assert/strict";
import { fpaTimeline } from "../lib/fpa-timeline.ts";

test("FPA holds each story beat, crossfades without an empty stage, and clamps overscroll", () => {
  for (const [p, index] of [[0, 0], [.15, 0], [.35, 1], [.62, 2], [.9, 3], [1, 3]]) {
    assert.equal(fpaTimeline(p).weights[index], 1);
  }
  for (let p = 0; p <= 1; p += .01) {
    const { weights } = fpaTimeline(p);
    assert.ok(weights.every(value => value >= 0 && value <= 1));
    assert.ok(Math.abs(weights.reduce((a, b) => a + b, 0) - 1) < .000001);
  }
  assert.equal(fpaTimeline(-1).progress, 0);
  assert.equal(fpaTimeline(2).progress, 1);
});

test("FPA loads upcoming media before each crossfade and saves the finale for the ledger", () => {
  assert.equal(fpaTimeline(0).loadThrough, 0);
  assert.equal(fpaTimeline(.15).loadThrough, 1);
  assert.equal(fpaTimeline(.35).loadThrough, 2);
  assert.equal(fpaTimeline(.7).loadThrough, 3);
  assert.equal(fpaTimeline(.7).finale, 0);
  assert.equal(fpaTimeline(1).finale, 1);
  assert.equal(fpaTimeline(.43).documentScale, .9);
  assert.equal(fpaTimeline(.7).documentScale, 1);
});
