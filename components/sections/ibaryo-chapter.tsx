import { Database, Package, ArrowRightLeft, Boxes, MapPinned } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProjectHeading, ProjectTags } from "@/components/ui/project-heading";
import { ChapterProgress } from "@/components/motion/chapter-progress";
import { SectionReveal } from "@/components/motion/section-reveal";
import { projectChapters } from "@/data/project-chapters";

const icons = [Package, Boxes, ArrowRightLeft, MapPinned];

export function IbaryoChapter() {
  const project = projectChapters.ibaryo;
  return (
    <article id="ibaryo" className="project-chapter ibaryo-chapter" aria-labelledby="project-02-title">
      <Container><ChapterProgress><SectionReveal>
        <div className="project-composition">
          <ProjectHeading {...project} />
          <figure className="inventory-visual">
            <div className="inventory-map">
              <p className="diagram-caption">Inventory / resource tracking</p>
              <svg className="inventory-lines" viewBox="0 0 600 440" preserveAspectRatio="none" aria-hidden="true">
                <path d="M300 72 V130 M72 130 H528 M72 130 V190 M224 130 V190 M376 130 V190 M528 130 V190 M72 250 V300 M224 250 V300 M376 250 V300 M528 250 V300 M72 300 H528 M300 300 V355" />
                <path className="diagram-signal" pathLength="1" d="M300 72 V130 H72 V300 H300 V355 M300 130 H528 V300 H300" />
              </svg>
              <div className="inventory-origin"><span>iBaryo</span><small>Centralized records</small></div>
              <ul className="inventory-nodes">{project.nodes.map((node, index) => {
                const Icon = icons[index];
                return <li key={node}><Icon size={22} aria-hidden="true" /><span>{node}</span></li>;
              })}</ul>
              <div className="inventory-database"><Database size={22} aria-hidden="true" /><span>MySQL</span><small>Relational data</small></div>
            </div>
            <figcaption>Conceptual overview of documented modules and data relationships.</figcaption>
          </figure>
        </div>
        <div className="project-bottom"><p>{project.details}</p><ProjectTags tags={project.tags} /></div>
      </SectionReveal></ChapterProgress></Container>
    </article>
  );
}
