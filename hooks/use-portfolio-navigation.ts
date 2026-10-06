"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioSections, sectionNavigation } from "@/data/navigation";

export function usePortfolioNavigation() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileMinimized, setMobileMinimized] = useState(false);
  const minimizedRef = useRef(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const header = headerRef.current;
    const hero = document.getElementById("hero");
    const intro = document.getElementById("intro");
    const main = document.getElementById("main-content");
    if (!header || !hero || !main) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = matchMedia("(max-width: 639px)");
    const narrow = matchMedia("(max-width: 1023px)");
    const intersecting = new Set<string>();
    let lastY = window.scrollY;
    let direction = 0;
    let directionStart = lastY;
    let raf = 0;
    let measure = true;
    let heroTop = 0;
    let morphDistance = 1;
    let pageDistance = 1;
    let atBottom = false;
    let disposed = false;
    let observerHeight = 0;
    let observer: IntersectionObserver;

    function updateActive() {
      // Intro overlaps the end of Hero: prefer the later section in that overlap.
      const section = portfolioSections.findLast(id => intersecting.has(id)) ?? "hero";
      setActive(sectionNavigation[atBottom ? "contact" : section]);
    }

    function schedule() {
      if (!raf && !disposed) raf = requestAnimationFrame(render);
    }
    function resize() { measure = true; schedule(); }
    function render() {
      raf = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      const nextDirection = Math.sign(delta);
      if (nextDirection && nextDirection !== direction) {
        direction = nextDirection;
        directionStart = lastY;
      }
      const travel = Math.abs(y - directionStart);
      const focused = document.activeElement;
      const keyboardWithin = !!focused && header!.contains(focused) && focused.matches(":focus-visible");
      const shouldMinimize = mobile.matches && y > 80 && direction > 0 && travel >= 20 && !keyboardWithin;
      const shouldExpand = !mobile.matches || y <= 24 || (direction < 0 && travel >= 16);
      if (shouldMinimize && !minimizedRef.current) {
        minimizedRef.current = true;
        setMobileMinimized(true);
      } else if (shouldExpand && minimizedRef.current) {
        minimizedRef.current = false;
        setMobileMinimized(false);
      }
      lastY = y;
      // Read geometry only after resize/content changes, before any style writes.
      if (measure) {
        measure = false;
        heroTop = hero!.getBoundingClientRect().top + y;
        const exit = intro ? intro.getBoundingClientRect().top + y : heroTop + hero!.offsetHeight;
        morphDistance = Math.max(innerHeight * .5, exit - heroTop - innerHeight * .35);
        pageDistance = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        if (observerHeight !== innerHeight) observeSections();
        header!.style.setProperty("--nav-wide", `${Math.min(1152, innerWidth - 48)}px`);
      }
      const progress = Math.max(0, Math.min(1, y / pageDistance));
      const heroProgress = Math.max(0, Math.min(1, (y - heroTop) / morphDistance));
      const morph = narrow.matches ? 1 : reduced.matches ? Number(heroProgress >= 1) : heroProgress;
      header!.style.setProperty("--nav-morph", String(morph));
      header!.style.setProperty("--page-progress", String(progress));
      header!.dataset.compact = String(morph >= .95);
      const bottom = progress >= .999;
      if (bottom !== atBottom) { atBottom = bottom; updateActive(); }
    }

    function observeSections() {
      observer?.disconnect();
      intersecting.clear();
      observerHeight = innerHeight;
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        if (intersecting.size || atBottom) updateActive();
      }, { rootMargin: `${-innerHeight * .2}px 0px ${-innerHeight * .55}px 0px`, threshold: 0 });
      for (const id of portfolioSections) {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
      }
    }
    observeSections();
    const sizes = new ResizeObserver(resize);
    sizes.observe(main);
    sizes.observe(hero);
    sizes.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    reduced.addEventListener("change", resize);
    mobile.addEventListener("change", resize);
    narrow.addEventListener("change", resize);
    schedule();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      sizes.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      reduced.removeEventListener("change", resize);
      mobile.removeEventListener("change", resize);
      narrow.removeEventListener("change", resize);
    };
  }, []);

  return { headerRef, active, mobileMinimized };
}
