"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fpaTimeline } from "@/lib/fpa-timeline";

export function useFpaChapter() {
  const rootRef = useRef<HTMLElement>(null);
  const scheduler = useRef<(() => void) | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [modeReady, setModeReady] = useState(false);
  const [phase, setPhase] = useState(0);
  const [loadThrough, setLoadThrough] = useState(0);
  const refresh = useCallback(() => scheduler.current?.(), []);

  useEffect(() => {
    const root = rootRef.current;
    const stage = root?.querySelector<HTMLElement>(".fpa-stage");
    if (!root || !stage) return;
    const desktop = matchMedia("(min-width: 1024px) and (min-height: 700px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let disposed = false;
    let wasEnhanced = false;
    let initialModeResolved = false;
    let previousPhase = 0;
    let requestedThrough = 0;

    function schedule() {
      if (!raf && !disposed) raf = requestAnimationFrame(render);
    }
    function render() {
      raf = 0;
      let eligible = desktop.matches && !reduced.matches;
      root!.dataset.enhanced = String(eligible);
      // Short windows and zoom keep all content in ordinary document flow.
      if (eligible && stage!.offsetHeight > innerHeight + 2) {
        eligible = false;
        root!.dataset.enhanced = "false";
      }
      if (!initialModeResolved) { initialModeResolved = true; setModeReady(true); }
      if (eligible !== wasEnhanced) {
        wasEnhanced = eligible;
        setEnhanced(eligible);
      }
      if (!eligible) {
        if (previousPhase !== 0) { previousPhase = 0; setPhase(0); }
        return;
      }
      const rect = root!.getBoundingClientRect();
      const timeline = fpaTimeline(-rect.top / Math.max(1, root!.offsetHeight - stage!.offsetHeight));
      if (timeline.loadThrough > requestedThrough) {
        requestedThrough = timeline.loadThrough;
        setLoadThrough(requestedThrough);
      }
      // A slow screenshot keeps the preceding decoded visual instead of flashing an empty panel.
      const weights = [...timeline.weights];
      for (let i = 3; i > 0; i--) {
        if (!root!.querySelector(`[data-fpa-beat="${i}"] [data-ready="true"]`)) {
          weights[i - 1] += weights[i];
          weights[i] = 0;
        }
      }
      const active = weights.indexOf(Math.max(...weights));
      if (active !== previousPhase) { previousPhase = active; setPhase(active); }
      root!.dataset.phase = String(active);
      weights.forEach((weight, i) => root!.style.setProperty(`--fpa-weight-${i}`, String(weight)));
      root!.style.setProperty("--fpa-progress", String(timeline.progress));
      root!.style.setProperty("--fpa-workflow", String(timeline.workflow));
      root!.style.setProperty("--fpa-document-scale", String(timeline.documentScale));
      root!.style.setProperty("--fpa-quiet", String(timeline.quiet));
      root!.style.setProperty("--fpa-finale", String(timeline.finale));
    }

    scheduler.current = schedule;
    const observer = new ResizeObserver(schedule);
    observer.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    reduced.addEventListener("change", schedule);
    schedule();
    return () => {
      disposed = true;
      scheduler.current = null;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);
  return { rootRef, enhanced, modeReady, phase, loadThrough, refresh };
}
