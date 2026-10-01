"use client";
import { useEffect, useRef, useState } from "react";
import { InfiniteMarquee } from "@/components/motion/infinite-marquee";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { skillGroups, mobileSkillGroups, type Skill } from "@/data/skills";
import { Container } from "@/components/ui/container";

export function SkillsMarquees() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<Skill | null>(null);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let intersecting = false;
    const update = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  const moving = !reduced && !paused;
  return (
    <div ref={root} className="skills-marquees">
      <Container>
        <div className="skills-toolbar">
          <h3 className="text-sm text-muted">A connected toolkit.</h3>
          {!reduced && <button type="button" className="marquee-toggle" onClick={() => setPaused(value => !value)} aria-controls="skill-marquee-rows">{paused ? "Resume motion" : "Pause motion"}<span aria-hidden="true">{paused ? " ▷" : " Ⅱ"}</span></button>}
        </div>
      </Container>
      <div id="skill-marquee-rows">
        <div className="marquees-desktop">{skillGroups.map((group, i) => <InfiniteMarquee key={group.id} group={group} direction={i % 2 ? "left" : "right"} duration={i === 0 ? 72 : 44 + i * 10} moving={moving} playing={visible} onInspect={setActive} />)}</div>
        <div className="marquees-mobile">{mobileSkillGroups.map((group, i) => <InfiniteMarquee key={group.id} group={group} direction={i ? "left" : "right"} duration={i === 0 ? 86 : 78} moving={moving} playing={visible} onInspect={setActive} />)}</div>
      </div>
      <Container>
        <div className="skill-context" aria-live="off">
          <p className="skill-context-label">{active ? active.name : "Explore the toolkit"}</p>
          <p>{active ? active.context : "Hover, focus or tap a technology to see where it fits."}</p>
        </div>
      </Container>
    </div>
  );
}
