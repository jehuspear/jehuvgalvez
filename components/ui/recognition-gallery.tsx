"use client";

import { useRef, type ChangeEvent, type ReactNode } from "react";

// Native radios and CSS handle selection, including before hydration or without JS.
export function RecognitionGallery({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function revealPreview(event: ChangeEvent<HTMLDivElement>) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.type !== "radio") return;
    if (!window.matchMedia("(max-width: 1023px)").matches || target.matches(":focus-visible")) return;

    const preview = ref.current?.querySelector<HTMLElement>(".recognition-previews");
    if (!preview) return;
    const bounds = preview.getBoundingClientRect();
    if (bounds.top >= 96 && bounds.bottom <= window.innerHeight) return;

    preview.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return <div ref={ref} className="recognition-composition" onChange={revealPreview}>{children}</div>;
}
