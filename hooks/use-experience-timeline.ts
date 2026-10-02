"use client";

import { useEffect, useRef } from "react";

export function useExperienceTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    const stage = root?.querySelector<HTMLElement>(".experience-stage");
    const viewport = root?.querySelector<HTMLElement>(".experience-window");
    const track = root?.querySelector<HTMLElement>(".experience-track");
    if (!root || !stage || !viewport || !track || !window.IntersectionObserver || !window.ResizeObserver) return;
    const desktop = matchMedia("(min-width: 1024px) and (min-height: 700px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0, travel = 0, eligible = false, nearby = false, listening = false;
    const draw = () => {
      raf = 0;
      if (!eligible || !nearby) return;
      const rect = root.getBoundingClientRect();
      const distance = Math.max(1, root.offsetHeight - stage.offsetHeight);
      const progress = Math.max(0, Math.min(1, (96 - rect.top) / distance));
      track.style.transform = `translateX(${-progress * travel}px)`;
      root.style.setProperty("--career-progress", String(progress));
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const syncScroll = () => {
      const enabled = eligible && nearby;
      if (enabled && !listening) window.addEventListener("scroll", schedule, { passive: true });
      else if (!enabled && listening) window.removeEventListener("scroll", schedule);
      listening = enabled;
      if (enabled) schedule();
    };
    const measure = () => {
      root.dataset.enhanced = String(desktop.matches && !reduced.matches);
      eligible = desktop.matches && !reduced.matches && stage.offsetHeight <= innerHeight - 96 + 2;
      root.dataset.enhanced = String(eligible);
      travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
      if (!eligible) {
        track.style.removeProperty("transform");
        root.style.removeProperty("--career-progress");
        cancelAnimationFrame(raf); raf = 0;
      }
      syncScroll();
    };
    const keyboard = (event: KeyboardEvent) => {
      if (!eligible || event.target !== viewport || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const top = root.getBoundingClientRect().top + scrollY - 96;
      const distance = Math.max(1, root.offsetHeight - stage.offsetHeight);
      const current = Math.max(0, Math.min(1, (scrollY - top) / distance));
      const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : Math.max(0, Math.min(1, current + (event.key === "ArrowRight" ? .5 : -.5)));
      scrollTo({ top: top + distance * next, behavior: "smooth" });
    };
    const proximity = new IntersectionObserver(entries => {
      nearby = entries.some(entry => entry.isIntersecting);
      syncScroll();
    }, { rootMargin: "150px" });
    const resize = new ResizeObserver(measure);
    resize.observe(stage); resize.observe(track);
    proximity.observe(root);
    window.addEventListener("resize", measure);
    viewport.addEventListener("keydown", keyboard);
    desktop.addEventListener("change", measure); reduced.addEventListener("change", measure);
    measure();
    return () => {
      cancelAnimationFrame(raf); proximity.disconnect(); resize.disconnect();
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", measure);
      viewport.removeEventListener("keydown", keyboard);
      desktop.removeEventListener("change", measure); reduced.removeEventListener("change", measure);
    };
  }, []);
  return rootRef;
}
