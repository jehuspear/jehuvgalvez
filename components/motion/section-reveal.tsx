"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** A single, one-time reveal for an ordinary chapter, with readable SSR defaults. */
export function SectionReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const group = ref.current;
    if (!group || !window.IntersectionObserver || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anchor = document.getElementById(window.location.hash.slice(1));
    // Native fragment positioning can settle after effects and cinematic height enhancement.
    if (anchor && (anchor.contains(group) || group.contains(anchor))) return;
    // Already visible content and deep-link destinations should never start hidden.
    if (group.getBoundingClientRect().top < innerHeight) return;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      group.dataset.reveal = "visible";
      observer.disconnect();
    }, { threshold: 0, rootMargin: "0px 0px -48px 0px" });
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className="editorial-reveal">{children}</div>;
}
