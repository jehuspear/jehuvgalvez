import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionReveal } from "@/components/motion/section-reveal";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  index?: string;
  label?: string;
  intro?: string;
  divider?: boolean;
  layout?: "split" | "stacked";
};

export function Section({ id, title, children, index, label = title, intro, divider = true, layout = "split" }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="editorial-section" data-layout={layout}>
      <Container>
        <SectionReveal>
          <SectionLabel index={index} label={label} divider={divider} />
          <div className="editorial-grid">
            <header>
              <h2 id={`${id}-title`} className="editorial-heading">{title}</h2>
              {intro && <p className="editorial-intro">{intro}</p>}
            </header>
            <div className="editorial-content">{children}</div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
