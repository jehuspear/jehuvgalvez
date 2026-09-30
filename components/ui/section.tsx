import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

type SectionProps = { id: string; title: string; children: ReactNode };

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-6 border-t border-line py-16 sm:py-24">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 id={`${id}-title`} className="text-2xl font-medium tracking-tight">{title}</h2>
          <div className="min-w-0 text-base leading-relaxed text-muted">{children}</div>
        </div>
      </Container>
    </section>
  );
}
