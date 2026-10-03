import assert from "node:assert/strict";
import { test } from "node:test";
import { FrameSequenceCache, frameAtProgress, frameWindow } from "../lib/frame-sequence.ts";

test("scroll mapping includes endpoints and clamps overscroll", () => {
  for (const count of [37, 73]) {
    assert.equal(frameAtProgress(-1, count), 0);
    assert.equal(frameAtProgress(0, count), 0);
    assert.equal(frameAtProgress(1, count), count - 1);
    assert.equal(frameAtProgress(2, count), count - 1);
    assert.equal(frameAtProgress(0.5, count), (count - 1) / 2);
  }
});

test("initial and reverse-scroll windows stay small and in bounds", () => {
  assert.deepEqual(frameWindow(0, 73), [0, 1, 2, 3]);
  assert.deepEqual(frameWindow(72, 73), [72, 71, 70]);
  assert.equal(frameWindow(35, 73).length, 5);
});

test("cache bounds requests and memory, preserves the displayed frame, and disposes", async () => {
  const originalFetch = globalThis.fetch;
  const originalDecode = globalThis.createImageBitmap;
  const bitmaps = [];
  let active = 0;
  let maxActive = 0;
  const requested = [];
  globalThis.fetch = async (url, { signal }) => {
    active++;
    maxActive = Math.max(maxActive, active);
    requested.push(url);
    await new Promise(resolve => setTimeout(resolve, 5));
    active--;
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    return { ok: true, blob: async () => url };
  };
  globalThis.createImageBitmap = async id => {
    const bitmap = { id, closed: false, close() { this.closed = true; } };
    bitmaps.push(bitmap);
    return bitmap;
  };
  const cache = new FrameSequenceCache({ count: 73, url: String, onChange() {}, capacity: 10 });
  const settle = () => new Promise(resolve => setTimeout(resolve, 70));
  try {
    cache.seek(0);
    await settle();
    assert.deepEqual(requested, ["0", "1", "2", "3"]);
    cache.protect(0);
    cache.seek(35);
    await settle();
    assert.ok(cache.get(35));
    assert.ok(cache.get(0), "displayed bitmap remains available for resize");
    assert.ok(cache.size <= 10);
    cache.protect(35);
    cache.seek(72);
    await settle();
    assert.ok(cache.get(72));
    assert.ok(cache.size <= 10);
    assert.ok(bitmaps.some(bitmap => bitmap.closed));
    cache.seek(2);
    cache.seek(60);
    await settle();
    assert.ok(cache.get(60));
    assert.ok(maxActive <= 3);
    cache.seek(10);
    cache.dispose();
    await settle();
    assert.equal(cache.size, 0);
    assert.ok(bitmaps.every(bitmap => bitmap.closed));
  } finally {
    cache.dispose();
    globalThis.fetch = originalFetch;
    if (originalDecode) globalThis.createImageBitmap = originalDecode;
    else delete globalThis.createImageBitmap;
  }
});

test("retargeting completes requested frames, cancels obsolete prefetch, and bounds fallback distance", async () => {
  const originalFetch = globalThis.fetch;
  const originalDecode = globalThis.createImageBitmap;
  const pending = new Map();
  globalThis.fetch = (url, options) => new Promise((resolve, reject) => {
    assert.equal(options.cache, "force-cache");
    pending.set(Number(url), { signal: options.signal, resolve: () => resolve({ ok: true, blob: async () => url }) });
    options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
  });
  globalThis.createImageBitmap = async id => ({ id, close() {} });
  const cache = new FrameSequenceCache({ count: 100, url: String, onChange() {}, capacity: 6 });
  const flush = () => new Promise(resolve => setImmediate(resolve));
  try {
    cache.seek(10);
    cache.seek(11); // A prefetched frame becomes an explicitly requested target.
    cache.seek(20);
    await flush();
    assert.equal(pending.get(10).signal.aborted, false);
    assert.equal(pending.get(11).signal.aborted, false);
    assert.equal(pending.get(9).signal.aborted, true);
    pending.get(10).resolve();
    pending.get(11).resolve();
    await flush();
    assert.ok(cache.get(10), "completed earlier targets stay reusable");
    assert.equal(cache.nearest(12, 3), 11);
    assert.equal(cache.nearest(20, 3), undefined, "do not substitute a visually distant frame");
    pending.get(20).resolve();
    await flush();
    assert.equal(cache.nearest(20, 3), 20);
    assert.ok(cache.size <= 6);
  } finally {
    cache.dispose();
    await flush();
    globalThis.fetch = originalFetch;
    if (originalDecode) globalThis.createImageBitmap = originalDecode;
    else delete globalThis.createImageBitmap;
  }
});
