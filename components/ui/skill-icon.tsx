import Image from "next/image";
import type { Skill } from "@/data/skills";

export function SkillIcon({ skill }: { skill: Skill }) {
  if (skill.logo) {
    return <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icons/technology/${skill.logo}.svg`} alt="" width={28} height={28} className="skill-logo" data-logo={skill.logo} />;
  }
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="skill-symbol">
      {skill.symbol === "data" ? <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></> :
        skill.symbol === "chip" ? <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" /><rect x="9" y="9" width="6" height="6" rx="1" /></> :
        skill.symbol === "network" ? <><circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" /><path d="M12 8v4M5 16v-4h14v4" /></> :
          <><path d="M3 7h15m-4-4 4 4-4 4M21 17H6m4-4-4 4 4 4" /></>}
    </svg>
  );
}
