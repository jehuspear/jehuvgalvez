import { Section } from "@/components/ui/section";
import { profile } from "@/data/profile";

export function About() {
  return <Section id="about" title="About"><p className="mb-4 text-ink">{profile.fullName}</p><p>{profile.education}</p><p className="mt-4">Based in {profile.location}.</p></Section>;
}
