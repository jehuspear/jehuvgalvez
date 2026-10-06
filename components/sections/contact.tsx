import { ArrowUpRight, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { ChapterProgress } from "@/components/motion/chapter-progress";
import { SectionReveal } from "@/components/motion/section-reveal";
import { profile } from "@/data/profile";
import { DeferredHeroPortrait } from "@/components/motion/deferred-hero-portrait";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="editorial-section contact-finale" data-layout="stacked">
      <Container><ChapterProgress>
        <SectionLabel index="06" label="Contact" />
        <div className="contact-stage">
          <DeferredHeroPortrait sectionId="contact" containerClassName="contact-silhouette" sizes="(min-width: 1024px) 50vw, 90vw" />
          <SectionReveal>
            <header className="contact-heading"><p className="editorial-meta">The next chapter</p><h2 id="contact-title" className="editorial-heading">Have a system<br />that needs<br /><span>building?</span></h2></header>
            <a className="contact-primary editorial-button editorial-button-primary" href={`mailto:${profile.email}`}>Let’s talk<ArrowUpRight size={24} aria-hidden="true" /></a>
            <a className="contact-email editorial-link" href={`mailto:${profile.email}`}><span>{profile.email}</span><ArrowUpRight size={24} aria-hidden="true" /></a>
            <div className="contact-links">
              <a href={profile.github} className="editorial-link" target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
              <a href={profile.linkedIn} className="editorial-link" target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
              <a href={`${base}/resume/Jehu_Galvez_Resume.pdf`} className="editorial-link" target="_blank" rel="noopener noreferrer">View résumé<FileText size={18} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
              <a href={`${base}/resume/Jehu_Galvez_Resume.pdf`} download="Jehu_Galvez_Resume.pdf" className="editorial-link">Download PDF<ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
            <p className="contact-location">{profile.location}</p>
          </SectionReveal>
        </div>
      </ChapterProgress></Container>
    </section>
  );
}
