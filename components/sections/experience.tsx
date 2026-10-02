import { Section } from "@/components/ui/section";
import { experience } from "@/data/profile";

export function Experience() {
  return (
    <Section id="experience" title="Experience" index="02">
      <ul className="editorial-records">
        {experience.map(item => (
          <li key={item.role}>
            <p className="editorial-meta">{item.period}</p>
            <h3 className="editorial-record-title">{item.role}</h3>
            <p className="editorial-organization">{item.organization}</p>
            <p className="editorial-detail">{item.context}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
