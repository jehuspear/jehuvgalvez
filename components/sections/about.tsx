import Image from "next/image";
import { Section } from "@/components/ui/section";
import { profile } from "@/data/profile";
import { aboutCopy } from "@/data/section-content";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function About() {
  return (
    <Section id="about" title="Technology, beyond the interface." label="About" index="04" layout="stacked">
      <div className="about-composition">
        <div className="about-prose">
          <p className="editorial-meta">Jehu Vincent Ferrer Galvez</p>
          <p className="about-lead">{aboutCopy.lead}</p>
          <p>{aboutCopy.body}</p>
          <p>{aboutCopy.philosophy}</p>
          <p>{aboutCopy.learning}</p>
          <dl className="about-facts"><div><dt>Education</dt><dd>{profile.education}</dd></div><div><dt>Based in</dt><dd>{profile.location}</dd></div></dl>
        </div>
        <figure className="about-portrait">
          <div className="portrait-frame"><Image src={`${base}/about/jehu-formal.webp`} width={960} height={1200} sizes="(min-width: 1024px) 40vw, 85vw" alt="Jehu Galvez in a formal black suit and tie." /></div>
          <figcaption><span>Jehu Galvez</span><span>Software / systems / people</span></figcaption>
        </figure>
      </div>
    </Section>
  );
}
