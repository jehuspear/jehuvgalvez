"use client";

import { useEffect, useRef } from "react";
import { heroTimeline } from "@/lib/hero-timeline";
import { frameUrl, heroSequence } from "@/data/hero-sequence";
import { FrameSequenceCache, frameAtProgress } from "@/lib/frame-sequence";

type DeviceHints = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string };
};

export function useScrollSequence() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!root || !stage || !canvas || !context || !window.createImageBitmap) return;

    const scene = root.closest<HTMLElement>(".hero-intro-scene");
    const content = root.querySelector<HTMLElement>(".sequence-content");
    let initialAnchorHandled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const device = navigator as DeviceHints;
    const constrained = device.connection?.saveData ||
      ["slow-2g", "2g"].includes(device.connection?.effectiveType ?? "");
    // Fixed for this mount: resizing never fetches the other sequence.
    const variant = !wide.matches || constrained ? "mobile" : "desktop";
    const sequence = heroSequence[variant];
    let cache: FrameSequenceCache | undefined;
    let raf = 0;
    let displayed = -1;
    let failed = false;
    let disposed = false;

    function schedule() {
      if (!raf && !disposed) raf = requestAnimationFrame(render);
    }

    function reset() {
      cache?.dispose();
      cache = undefined;
      displayed = -1;
      root!.dataset.enhanced = "false";
      delete root!.dataset.departed;
      if (scene) { scene.dataset.enhanced = "false"; scene.style.setProperty("--hero-handoff", "0"); }
      if (content) content.inert = false;
      delete canvas!.dataset.ready;
      delete canvas!.dataset.frame;
      // Release the canvas backing store as well as decoded images.
      canvas!.width = canvas!.height = 1;
    }

    function render() {
      raf = 0;
      // At high zoom / short landscape heights, keep the full text in normal flow.
      const fits = stage!.offsetHeight <= window.innerHeight + 2;
      if (reduced.matches || failed || window.innerHeight < 600 || !fits) {
        if (cache) reset();
        return;
      }
      root!.dataset.enhanced = "true";
      if (scene) scene.dataset.enhanced = "true";
      // Preserve deep links when progressive enhancement changes the height above them.
      if (!initialAnchorHandled) {
        initialAnchorHandled = true;
        const anchor = document.getElementById(window.location.hash.slice(1));
        if (anchor && anchor !== root) anchor.scrollIntoView({ behavior: "instant" });
      }
      if (!cache) {
        cache = new FrameSequenceCache({
          count: sequence.frameCount,
          url: index => frameUrl(variant, index),
          onChange: schedule,
          capacity: variant === "mobile" ? 8 : 6,
        });
      }
      if (cache.failureCount >= 3 && displayed < 0) {
        failed = true;
        reset();
        return;
      }
      const rect = root!.getBoundingClientRect();
      const distance = Math.max(1, root!.offsetHeight - stage!.offsetHeight);
      const { progress, handoff } = heroTimeline(-rect.top, distance, stage!.offsetHeight, Boolean(scene));
      scene?.style.setProperty("--hero-handoff", String(handoff));
      root!.dataset.departed = String(handoff >= 0.5);
      if (content) content.inert = handoff >= 0.5;
      if (document.hidden || rect.bottom <= 0 || rect.top >= window.innerHeight) {
        cache.pause();
        return;
      }
      const target = frameAtProgress(progress, sequence.frameCount);
      root!.style.setProperty("--sequence-progress", String(progress));
      cache.seek(target);

      // If the requested image isn't decoded yet, keep the previous canvas pixels.
      const frame = cache.get(target) ?? cache.get(displayed);
      if (!frame) return;
      const next = cache.get(target) ? target : displayed;
      // Use layout dimensions: the Intro handoff's CSS scale must not resize the backing store.
      const cssWidth = canvas!.clientWidth;
      const cssHeight = canvas!.clientHeight;
      if (!cssWidth || !cssHeight) return;
      const dpr = Math.min(window.devicePixelRatio || 1, wide.matches ? 2 : 3,
        frame.width / cssWidth, frame.height / cssHeight);
      const width = Math.round(cssWidth * dpr);
      const height = Math.round(cssHeight * dpr);
      if (!width || !height) return;
      const resized = canvas!.width !== width || canvas!.height !== height;
      if (!resized && next === displayed) return;
      canvas!.width = width;
      canvas!.height = height;
      context!.imageSmoothingEnabled = true;
      context!.imageSmoothingQuality = "high";
      const scale = Math.max(width / frame.width, height / frame.height);
      // Match the poster; both layouts preserve the frame's 16:9 composition.
      context!.drawImage(frame, (width - frame.width * scale) * 0.65,
        (height - frame.height * scale) * 0.5, frame.width * scale, frame.height * scale);
      displayed = next;
      cache.protect(displayed);
      canvas!.dataset.ready = "true";
      canvas!.dataset.frame = String(displayed + 1);
    }

    const observer = new ResizeObserver(schedule);
    observer.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    reduced.addEventListener("change", schedule);
    schedule();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      reduced.removeEventListener("change", schedule);
      reset();
    };
  }, []);

  return { rootRef, stageRef, canvasRef };
}
