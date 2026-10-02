import { Section } from "@/components/ui/section";
import { capabilities } from "@/data/profile";

export function Capabilities() {
  return (
    <Section id="capabilities" title="Capabilities" index="03">
      <ul className="editorial-capabilities">
        {capabilities.map((item, index) => (
          <li key={item}><span className="editorial-meta" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{item}</span></li>
        ))}
      </ul>
    </Section>
  );
}
