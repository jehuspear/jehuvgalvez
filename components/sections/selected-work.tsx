import { SectionLabel } from "@/components/ui/section-label";
import { Container } from "@/components/ui/container";
import { FpaChapter } from "@/components/sections/fpa-chapter";
import { IbaryoChapter } from "@/components/sections/ibaryo-chapter";
import { AutopetChapter } from "@/components/sections/autopet-chapter";
import { CafeChapter } from "@/components/sections/cafe-chapter";

export function SelectedWork() {
  return (
    <section id="selected-work" aria-labelledby="selected-work-title" className="selected-work-section">
      <Container><SectionLabel index="01" label="Selected Work" /><div className="selected-work-heading"><h2 id="selected-work-title">Selected Work</h2><p>Systems built for real needs</p></div></Container>
      <FpaChapter />
      <IbaryoChapter />
      <AutopetChapter />
      <CafeChapter />
    </section>
  );
}
