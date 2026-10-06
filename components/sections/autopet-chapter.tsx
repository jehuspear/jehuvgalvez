import Image from "next/image";
import { CircuitBoard, Smartphone, Camera, CalendarClock, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProjectHeading } from "@/components/ui/project-heading";
import { ChapterProgress } from "@/components/motion/chapter-progress";
import { SectionReveal } from "@/components/motion/section-reveal";
import { ProjectProof } from "@/components/ui/project-proof";
import { projectChapters } from "@/data/project-chapters";

const icons = [Smartphone, CircuitBoard, CalendarClock, Camera];

export function AutopetChapter() {
  const project = projectChapters.autopet;
  return (
    <article id="autopet" className="project-chapter autopet-chapter" aria-labelledby="project-03-title">
      <Container><ChapterProgress><SectionReveal>
        <div className="project-composition">
          <ProjectHeading {...project} />
          <figure className="autopet-visual">
            <div className="prototype-frame">
              <p className="diagram-caption">Physical / digital</p>
              <Image src={project.media.src} width={project.media.width} height={project.media.height} sizes="(min-width: 1024px) 48vw, 90vw" loading="lazy" alt={project.media.alt} />
              <span className="prototype-marker" aria-hidden="true">ESP32 / IoT</span>
            </div>
            <figcaption>{project.media.caption}</figcaption>
          </figure>
        </div>
        <ProjectProof title={project.title} proof={project.proof} />
        <ol className="device-path" aria-label="AutoPet connected-device capabilities">{project.nodes.map((node, index) => {
          const Icon = icons[index];
          return <li key={node}><span className="path-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><Icon size={24} aria-hidden="true" /><span>{node}</span></li>;
        })}</ol>
        <div className="project-bottom"><p>{project.details}</p></div>
        <a className="project-recognition-link editorial-link" href="#recognition">Best in IoT-Device · 2025 <ArrowUpRight size={18} aria-hidden="true" /></a>
      </SectionReveal></ChapterProgress></Container>
    </article>
  );
}
