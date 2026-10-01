"use client";

import type { ReactNode } from "react";
import { heroSequence } from "@/data/hero-sequence";
import { useScrollSequence } from "@/hooks/use-scroll-sequence";

export function HeroSequence({ children }: { children: ReactNode }) {
  const { rootRef, stageRef, canvasRef } = useScrollSequence();

  return (
    <section ref={rootRef} id="hero" aria-labelledby="hero-title" className="sequence-hero">
      <div ref={stageRef} className="sequence-stage">
        <div className="sequence-visual" aria-hidden="true">
          <picture>
            <source media="(prefers-reduced-motion: reduce)" srcSet={heroSequence.reducedPoster} />
            {/* Already compressed local WebP; picture must switch posters before hydration. */}
            <img src={heroSequence.poster} alt="" width={heroSequence.desktop.width} height={heroSequence.desktop.height} fetchPriority="high" className="sequence-poster" />
          </picture>
          <canvas ref={canvasRef} className="sequence-canvas" />
        </div>
        <div className="sequence-shade" aria-hidden="true" />
        {children}
        <div className="sequence-progress" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
