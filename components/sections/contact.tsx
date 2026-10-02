import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <Section id="contact" title="Contact" index="06" layout="stacked">
      <div className="editorial-contact">
        <a className="contact-email editorial-link" href={`mailto:${profile.email}`}><span>{profile.email}</span><ArrowUpRight size={24} aria-hidden="true" /></a>
        <a href={profile.linkedIn} className="editorial-button editorial-button-secondary">LinkedIn <ArrowUpRight size={18} aria-hidden="true" /></a>
      </div>
    </Section>
  );
}
