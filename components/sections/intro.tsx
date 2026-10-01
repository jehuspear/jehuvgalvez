import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SkillsMarquees } from "@/components/sections/skills-marquees";
import { heroSequence } from "@/data/hero-sequence";

export function Intro() {
  return (
    <section id="intro" aria-labelledby="intro-title" className="intro-section">
      <div className="intro-atmosphere" aria-hidden="true">
        <Image src={heroSequence.finalPoster} alt="" fill sizes="100vw" unoptimized loading="lazy" className="intro-portrait" />
        <div className="intro-grid" />
        <svg className="intro-network" viewBox="0 0 1200 900" fill="none" preserveAspectRatio="xMidYMid slice">
          <g stroke="currentColor" strokeWidth="1"><path pathLength="1" d="M50 650H260L410 500H740L940 300H1180M0 330H180L390 540H850L1090 780H1200M120 900V720L500 340V0" /></g>
          <g fill="currentColor">{[[260,650],[410,500],[740,500],[940,300],[180,330],[390,540],[850,540],[500,340]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />)}</g>
        </svg>
      </div>
      <div className="intro-copy">
        <Container>
          <p className="intro-eyebrow">02 / The technology behind the builder</p>
          <h2 id="intro-title">I work across the<br /><span>layers of technology.</span></h2>
          <p className="intro-description">From interfaces and databases to infrastructure, networking and connected hardware, I build systems around real operational needs.</p>
        </Container>
      </div>
      <SkillsMarquees />
    </section>
  );
}
