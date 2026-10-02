import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { ProjectTags } from "@/components/ui/project-heading";
import { ExperienceTimeline } from "@/components/motion/experience-timeline";
import { careerChapters } from "@/data/section-content";

export function Experience() {
  return (
    <section id="experience" className="editorial-section career-section" aria-labelledby="experience-title">
      <ExperienceTimeline>
        <div className="experience-stage"><Container>
          <SectionLabel index="02" label="Experience" />
          <header className="career-heading"><h2 id="experience-title" className="editorial-heading">Across software.<br />Across systems.</h2><p>Professional experience spanning front-end development, IT operations, and full-stack systems.</p></header>
          <p id="career-instructions" className="career-instructions"><span className="career-static-instructions">Career path / 2020–2026</span><span className="career-scroll-instructions">Scroll down, or focus the timeline and use the left and right arrow keys. Home and End reach the first and last roles.</span></p>
          <div className="experience-window" role="region" tabIndex={0} aria-label="Career timeline" aria-describedby="career-instructions">
            <ol className="experience-track">{careerChapters.map((item, index) => (
              <li key={item.role} className="career-stop">
                <p className="career-year"><span>{item.year}</span><span className="career-dot" aria-hidden="true" /></p>
                <p className="editorial-meta">{item.period}</p>
                <h3>{item.role}</h3>
                <p className="career-organization">{item.organization}</p>
                <p className="career-context">{item.context}</p>
                <p className="career-detail">{item.details}</p>
                <ProjectTags tags={item.tags} />
                <span className="career-stop-index" aria-hidden="true">{String(index + 1).padStart(2, "0")} / 03</span>
              </li>
            ))}</ol>
          </div>
          <div className="career-progress" aria-hidden="true"><span /></div>
        </Container></div>
      </ExperienceTimeline>
    </section>
  );
}
