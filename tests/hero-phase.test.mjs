import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { heroPhaseAtFrame } from "../lib/hero-phase.ts";

const manifest = JSON.parse(readFileSync(new URL("../data/hero-web-manifest.json", import.meta.url)));

test("phase changes match the reviewed source-video boundaries in both scroll directions", () => {
  const starts = manifest.phaseStartFrames;
  assert.equal(heroPhaseAtFrame(0, starts), "student");
  assert.equal(heroPhaseAtFrame(35, starts), "student");
  assert.equal(heroPhaseAtFrame(36, starts), "professional");
  assert.equal(heroPhaseAtFrame(95, starts), "professional");
  assert.equal(heroPhaseAtFrame(96, starts), "human-ai");
  assert.equal(heroPhaseAtFrame(144, starts), "human-ai");
  assert.equal(heroPhaseAtFrame(48, starts), "professional");
  assert.equal(heroPhaseAtFrame(12, starts), "student");
});

test("responsive sampling preserves endpoints and phase timing instead of halving the story", () => {
  for (const variant of [manifest.desktop, manifest.mobile]) {
    const indices = variant.sourceFrameIndices;
    assert.equal(indices.length, variant.frameCount);
    assert.equal(indices[0], 0);
    assert.equal(indices.at(-1), 144);
    assert.equal(new Set(indices).size, indices.length);
    assert.ok(indices.every((frame, index) => index === 0 || frame > indices[index - 1]));
    for (const [phase, boundary] of Object.entries(manifest.phaseStartFrames)) {
      const index = indices.findIndex(frame => frame >= boundary);
      assert.equal(heroPhaseAtFrame(indices[index], manifest.phaseStartFrames), phase);
    }
  }
});

test("web derivatives preserve native dimensions, source mapping, and phases with smaller payloads", () => {
  const reference = JSON.parse(readFileSync(new URL("../public/hero/jehu-hero-sequence-native/manifest.json", import.meta.url)));
  assert.deepEqual(manifest.phaseStartFrames, reference.phaseStartFrames);
  assert.equal(manifest.source.sha256, reference.source.sha256);
  assert.match(manifest.assetPath, /jehu-hero-sequence-web-[a-f0-9]{12}$/);
  for (const variant of ["desktop", "mobile"]) {
    assert.equal(manifest[variant].width, reference[variant].width);
    assert.equal(manifest[variant].height, reference[variant].height);
    assert.deepEqual(manifest[variant].sourceFrameIndices, reference[variant].sourceFrameIndices);
    assert.ok(manifest[variant].totalBytes < reference[variant].totalBytes);
  }
});
