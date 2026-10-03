"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroSequence } from "@/data/hero-sequence";

type Props = {
  sectionId: "intro" | "contact";
  containerClassName?: string;
  imageClassName?: string;
  sizes: string;
  unoptimized?: boolean;
};

export function DeferredHeroPortrait({ sectionId, containerClassName, imageClassName, sizes, unoptimized }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const section = ref.current?.closest(`#${sectionId}`);
    if (!section || !window.IntersectionObserver) return;
    const hidden = matchMedia("(prefers-reduced-motion: reduce), (forced-colors: active)");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hidden.matches) {
        setNear(true);
        observer.disconnect();
      }
    }, { rootMargin: "300px" });
    function updatePreference() {
      if (hidden.matches) setNear(false);
      observer.disconnect();
      observer.observe(section!);
    }
    observer.observe(section);
    hidden.addEventListener("change", updatePreference);
    return () => { observer.disconnect(); hidden.removeEventListener("change", updatePreference); };
  }, [sectionId]);

  // Decorative only: content and the Hero handoff do not depend on this image.
  return <div ref={ref} className={containerClassName} aria-hidden="true">{near && <Image src={heroSequence.finalPoster} fill sizes={sizes} unoptimized={unoptimized} className={imageClassName} alt="" />}</div>;
}
