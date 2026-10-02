"use client";

import Image from "next/image";
import { MediaSkeleton } from "@/components/ui/skeleton";
import { useEffect, useRef, useState } from "react";
import { fpaProject } from "@/data/fpa-project";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function FpaTeaser({ active }: { active: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const autoPaused = useRef(false);
  const reduced = useReducedMotion();
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let intersects = false;
    const update = () => setVisible(intersects && !document.hidden);
    const preload = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); preload.disconnect(); }
    }, { rootMargin: "600px" });
    const playback = new IntersectionObserver(([entry]) => { intersects = entry.isIntersecting; update(); }, { threshold: 0.1 });
    preload.observe(element);
    playback.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { preload.disconnect(); playback.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element || !near) return;
    if (visible && active && !reduced && !paused) {
      autoPaused.current = false;
      void element.play().catch(() => { /* Poster and native play controls remain available. */ });
    } else if (!element.paused) {
      autoPaused.current = true;
      element.pause();
    }
  }, [active, near, paused, reduced, visible]);

  return (
    <div ref={root} className="fpa-teaser" data-ready={ready}>
      <Image src={fpaProject.poster} alt="FPA Leave Management System dashboard preview." width={1600} height={900} unoptimized loading="lazy" className="fpa-image" onLoad={() => setPosterLoaded(true)} onError={() => setPosterFailed(true)} />
      <video ref={video} id="fpa-teaser-video" src={near ? fpaProject.video : undefined} poster={near ? fpaProject.poster : undefined} preload="none" autoPlay={!reduced && !paused && active && visible} muted loop playsInline controls inert={!active} aria-label="Muted FPA Leave Management System walkthrough" className="fpa-video" onLoadedData={() => setReady(true)} onError={() => setReady(false)} onPlay={() => { setPlaying(true); if (paused) setPaused(false); }} onPause={() => {
        setPlaying(false);
        if (autoPaused.current) autoPaused.current = false;
        else setPaused(true);
      }} />
      {!posterLoaded && !ready && <MediaSkeleton label={posterFailed ? "Preview unavailable" : "Loading walkthrough preview"} loading={!posterFailed} />}
      {posterFailed && !ready && <span className="sr-only" role="status">Walkthrough preview unavailable. Video controls and project details remain available.</span>}
      {!reduced && active && near && <button type="button" className="fpa-video-toggle" aria-controls="fpa-teaser-video" onClick={() => {
        if (playing) setPaused(true);
        else { setPaused(false); void video.current?.play().catch(() => {}); }
      }}>{playing ? "Pause teaser" : "Play teaser"}</button>}
    </div>
  );
}
