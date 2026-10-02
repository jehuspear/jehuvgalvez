"use client";

import { useEffect, useRef } from "react";

/** Only nearby chapters subscribe to scroll; SSR and reduced motion show the complete diagram. */
export function useChapterProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !window.IntersectionObserver) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0, observing = false, listening = false;
    const draw = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight * .85 - rect.top) / (rect.height + innerHeight * .35)));
      root.style.setProperty("--chapter-progress", String(progress));
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const sync = () => {
      const enabled = observing && !reduced.matches;
      if (enabled && !listening) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
      } else if (!enabled && listening) {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        cancelAnimationFrame(raf); raf = 0;
      }
      listening = enabled;
      if (reduced.matches) root.style.removeProperty("--chapter-progress");
      else if (enabled) schedule();
    };
    const observer = new IntersectionObserver(entries => {
      observing = entries.some(entry => entry.isIntersecting);
      sync();
    }, { rootMargin: "200px" });
    observer.observe(root);
    reduced.addEventListener("change", sync);
    return () => {
      observer.disconnect(); reduced.removeEventListener("change", sync);
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}
