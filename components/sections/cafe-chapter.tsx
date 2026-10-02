import { UserRound, Coffee, Ticket } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProjectHeading, ProjectTags } from "@/components/ui/project-heading";
import { ChapterProgress } from "@/components/motion/chapter-progress";
import { SectionReveal } from "@/components/motion/section-reveal";
import { projectChapters } from "@/data/project-chapters";

const icons = [UserRound, Coffee, Ticket];

export function CafeChapter() {
  const project = projectChapters.cafe;
  return (
    <article id="white-house-cafe" className="project-chapter cafe-chapter" aria-labelledby="project-04-title">
      <Container><ChapterProgress><SectionReveal>
        <div className="project-composition">
          <ProjectHeading {...project} />
          <figure className="cafe-visual">
            <p className="diagram-caption">Customer / order / record</p>
            <ol className="cafe-flow" aria-label="Conceptual ordering flow">{project.nodes.map((node, index) => {
              const Icon = icons[index];
              return <li key={node}><span className="path-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><Icon size={32} aria-hidden="true" /><h4>{node}</h4><p>{["Authentication", "Customer web application", "Order records"][index]}</p></li>;
            })}</ol>
            <figcaption>Conceptual flow based on the documented application features.</figcaption>
            <p className="cafe-note">A considered interface.<br /><span>A practical ordering process.</span></p>
          </figure>
        </div>
        <div className="project-bottom"><p>{project.details}</p><ProjectTags tags={project.tags} /></div>
      </SectionReveal></ChapterProgress></Container>
    </article>
  );
}
