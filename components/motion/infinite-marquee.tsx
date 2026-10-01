"use client";
import { useId, type CSSProperties } from "react";
import { SkillIcon } from "@/components/ui/skill-icon";
import type { Skill, SkillGroup } from "@/data/skills";

type Props = { group: SkillGroup; direction: "left" | "right"; duration: number; moving: boolean; playing: boolean; onInspect: (skill: Skill) => void };

export function InfiniteMarquee({ group, direction, duration, moving, playing, onInspect }: Props) {
  const id = useId();
  return (
    <div className="marquee-row" role="group" aria-label={group.label} data-moving={moving} data-playing={playing}>
      <p className="marquee-category">{group.label}</p>
      <div className="marquee-viewport">
        <div className="marquee-track" style={{ "--marquee-duration": `${duration}s`, animationDirection: direction === "right" ? "reverse" : "normal" } as CSSProperties}>
          <ul className="marquee-set">
            {group.skills.map(skill => <li key={skill.id}>
              <button type="button" className="skill-chip" aria-describedby={`${id}-${skill.id}`} onPointerEnter={() => onInspect(skill)} onFocus={() => onInspect(skill)} onClick={() => onInspect(skill)}>
                <SkillIcon skill={skill} /><span>{skill.name}</span>
              </button>
              <span className="sr-only" id={`${id}-${skill.id}`}>{skill.context}</span>
            </li>)}
          </ul>
          <ul className="marquee-set marquee-copy" aria-hidden="true">
            {group.skills.map(skill => <li key={skill.id}><span className="skill-chip" onPointerEnter={() => onInspect(skill)}><SkillIcon skill={skill} /><span>{skill.name}</span></span></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
