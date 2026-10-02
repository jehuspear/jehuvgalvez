import Image from "next/image";
import { CircuitBoard, Smartphone, Camera, CalendarClock, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProjectHeading, ProjectTags } from "@/components/ui/project-heading";
import { ChapterProgress } from "@/components/motion/chapter-progress";
import { SectionReveal } from "@/components/motion/section-reveal";
import { projectChapters } from "@/data/project-chapters";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
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
              <Image src={`${base}/projects/autopet/concept-sketch.webp`} width={724} height={725} sizes="(min-width: 1024px) 48vw, 90vw" alt="Supplied concept sketch of the AutoPet feeder and hydration prototype, showing food and water compartments, camera, and voice components." />
              <span className="prototype-marker" aria-hidden="true">ESP32 / IoT</span>
            </div>
            <figcaption>Supplied prototype concept sketch. This is a design reference, not a hardware photograph.</figcaption>
          </figure>
        </div>
        <ol className="device-path" aria-label="AutoPet connected-device capabilities">{project.nodes.map((node, index) => {
          const Icon = icons[index];
          return <li key={node}><span className="path-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><Icon size={24} aria-hidden="true" /><span>{node}</span></li>;
        })}</ol>
        <div className="project-bottom"><p>{project.details}</p><ProjectTags tags={project.tags} /></div>
        <a className="project-recognition-link editorial-link" href="#recognition">Best in IoT-Device · 2025 <ArrowUpRight size={18} aria-hidden="true" /></a>
      </SectionReveal></ChapterProgress></Container>
    </article>
  );
}
