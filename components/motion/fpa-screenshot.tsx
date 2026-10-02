"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MediaSkeleton } from "@/components/ui/skeleton";

const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'%3E%3Crect width='1600' height='900' fill='%23191b17'/%3E%3C/svg%3E";

export function FpaScreenshot({ src, alt, allowed, onReady }: { src: string; alt: string; allowed: boolean; onReady: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [requested, setRequested] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!allowed || requested || !root.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRequested(true); observer.disconnect(); }
    }, { rootMargin: "600px" });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [allowed, requested]);
  const loading = requested && !ready && !failed;
  return (
    <div ref={root} className="fpa-screenshot" data-ready={ready || failed} data-state={failed ? "error" : ready ? "ready" : requested ? "loading" : "idle"} aria-busy={loading}>
      <Image src={requested ? src : placeholder} alt={requested ? alt : ""} width={1600} height={900} unoptimized loading="lazy" className="fpa-image" onLoad={event => {
        // A late placeholder event must not count as the requested image being ready.
        if (requested && root.current && event.currentTarget.currentSrc === new URL(src, window.location.href).href) { root.current.dataset.ready = "true"; setReady(true); onReady(); }
      }} onError={() => {
        if (requested && root.current) {
          // The error card is renderable too: let the scroll story continue to its next beat.
          root.current.dataset.ready = "true";
          setFailed(true);
          onReady();
        }
      }} />
      {!ready && <MediaSkeleton label={failed ? "Preview unavailable" : requested ? "Loading project preview" : "Project preview"} loading={loading} />}
      {requested && !ready && <span className="sr-only" role="status">{failed ? "Project preview unavailable. The description remains available below." : "Loading project preview."}</span>}
      <noscript><style>{".fpa-screenshot > .fpa-image { display: none; }"}</style><Image src={src} alt={alt} width={1600} height={900} unoptimized loading="lazy" className="fpa-image fpa-noscript-image" /></noscript>
    </div>
  );
}
