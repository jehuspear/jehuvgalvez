"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'%3E%3Crect width='1600' height='900' fill='%23191b17'/%3E%3C/svg%3E";

export function FpaScreenshot({ src, alt, allowed, onReady }: { src: string; alt: string; allowed: boolean; onReady: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [requested, setRequested] = useState(false);
  useEffect(() => {
    if (!allowed || requested || !root.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRequested(true); observer.disconnect(); }
    }, { rootMargin: "600px" });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [allowed, requested]);
  return (
    <div ref={root} className="fpa-screenshot">
      <Image src={requested ? src : placeholder} alt={alt} width={1600} height={900} unoptimized loading="lazy" className="fpa-image" onLoad={() => {
        if (requested && root.current) { root.current.dataset.ready = "true"; onReady(); }
      }} />
      <noscript><style>{".fpa-screenshot > .fpa-image { display: none; }"}</style><Image src={src} alt={alt} width={1600} height={900} unoptimized loading="lazy" className="fpa-image fpa-noscript-image" /></noscript>
    </div>
  );
}
