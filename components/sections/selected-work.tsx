import { SectionLabel } from "@/components/ui/section-label";
import { Container } from "@/components/ui/container";
import { FpaChapter } from "@/components/sections/fpa-chapter";
import { IbaryoChapter } from "@/components/sections/ibaryo-chapter";
import { AutopetChapter } from "@/components/sections/autopet-chapter";
import { CafeChapter } from "@/components/sections/cafe-chapter";
import { ProjectProof } from "@/components/ui/project-proof";
import { ProjectTags } from "@/components/ui/project-heading";
import { fpaProject } from "@/data/fpa-project";

export function SelectedWork() {
  return (
    <section id="selected-work" aria-labelledby="selected-work-title" className="selected-work-section">
      <Container><SectionLabel index="01" label="Selected Work" /><div className="selected-work-heading"><h2 id="selected-work-title">Selected Work</h2><p>Systems built for real needs</p></div></Container>
      <Container>
        <section className="fpa-proof-overview" aria-labelledby="fpa-overview-title">
          <header>
            <p className="diagram-caption">{fpaProject.index} / {fpaProject.category} / Project overview</p>
            <h3 id="fpa-overview-title">{fpaProject.name}</h3>
            <p className="fpa-overview-summary">{fpaProject.summary}</p>
          </header>
          <dl className="project-meta">
            <div><dt>Period</dt><dd>{fpaProject.period}</dd></div>
            <div><dt>Role</dt><dd>{fpaProject.role}<span>{fpaProject.context}</span></dd></div>
          </dl>
          <ProjectTags tags={fpaProject.technologies} />
          <ProjectProof title={fpaProject.name} proof={fpaProject.proof} />
        </section>
      </Container>
      <FpaChapter />
      <IbaryoChapter />
      <AutopetChapter />
      <CafeChapter />
    </section>
  );
}
