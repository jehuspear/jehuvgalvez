"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { MediaSkeleton } from "@/components/ui/skeleton";
import { heroSequence } from "@/data/hero-sequence";
import { useScrollSequence } from "@/hooks/use-scroll-sequence";

export function HeroSequence({ children }: { children: ReactNode }) {
  const { rootRef, stageRef, canvasRef } = useScrollSequence();
  const posterRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const poster = posterRef.current;
    const visual = poster?.closest<HTMLElement>(".sequence-visual");
    if (!poster || !visual) return;
    const update = () => { visual.dataset.posterState = poster.naturalWidth > 0 ? "ready" : "error"; };
    // Images can finish before hydration, so check the cached state as well as events.
    if (poster.complete) update();
    poster.addEventListener("load", update);
    poster.addEventListener("error", update);
    return () => { poster.removeEventListener("load", update); poster.removeEventListener("error", update); };
  }, []);

  return (
    <section ref={rootRef} id="hero" aria-labelledby="hero-title" className="sequence-hero" data-phase="student">
      <div ref={stageRef} className="sequence-stage">
        <div className="sequence-visual" data-poster-state="loading" aria-hidden="true">
          <picture>
            <source media="(prefers-reduced-motion: reduce)" srcSet={heroSequence.reducedPoster} />
            {/* Already compressed local WebP; picture must switch posters before hydration. */}
            <img ref={posterRef} src={heroSequence.poster} alt="" width={heroSequence.desktop.width} height={heroSequence.desktop.height} fetchPriority="high" className="sequence-poster" />
          </picture>
          <canvas ref={canvasRef} className="sequence-canvas" />
          <MediaSkeleton variant="portrait" label="Loading portrait" />
          <span className="hero-preview-error">Portrait preview unavailable</span>
        </div>
        <div className="sequence-shade" aria-hidden="true" />
        <div className="hero-loading-status" aria-hidden="true"><span className="hero-loading-text">Loading portrait</span><span className="hero-loading-failed">Portrait preview unavailable</span></div>
        {children}
        <div className="sequence-progress" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
