import { Section } from "@/components/ui/section";
import { experience } from "@/data/profile";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ul className="space-y-8">
        {experience.map((item) => (
          <li key={item.role}>
            <p className="mb-2 text-sm">{item.period}</p>
            <h3 className="text-lg text-ink">{item.role}</h3>
            <p>{item.organization}</p>
            <p className="text-sm">{item.context}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
