import { Container } from "@/components/ui/container";
import { FpaChapter } from "@/components/sections/fpa-chapter";
import { projects } from "@/data/projects";

export function SelectedWork() {
  return (
    <section id="selected-work" aria-labelledby="selected-work-title" className="selected-work-section">
      <Container><div className="selected-work-heading"><h2 id="selected-work-title">Selected Work</h2><p>Systems built for real needs</p></div></Container>
      <FpaChapter />
      <div className="remaining-projects"><Container><ul>
        {projects.slice(1).map((project, index) => <li key={project.id}><span aria-hidden="true">{String(index + 2).padStart(2, "0")}</span><h3>{project.name}</h3></li>)}
      </ul></Container></div>
    </section>
  );
}
