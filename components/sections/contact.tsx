import { Section } from "@/components/ui/section";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="flex flex-col items-start gap-5">
        <a className="break-all text-xl text-ink underline decoration-line underline-offset-8 hover:decoration-accent sm:text-2xl" href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.linkedIn} className="underline underline-offset-4 hover:text-ink">LinkedIn</a>
      </div>
    </Section>
  );
}
