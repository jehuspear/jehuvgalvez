import { Section } from "@/components/ui/section";
import { profile } from "@/data/profile";

export function About() {
  return (
    <Section id="about" title="About" index="04">
      <div className="editorial-prose">
        <p className="editorial-lead">{profile.fullName}</p>
        <p>{profile.education}</p>
        <p className="editorial-location">Based in {profile.location}.</p>
      </div>
    </Section>
  );
}
