import { Section } from "@/components/ui/section";
import { recognition } from "@/data/profile";

export function Recognition() {
  return (
    <Section id="recognition" title="Recognition" index="05">
      <ul className="editorial-credentials">
        {recognition.map((item, index) => <li key={item}><span className="editorial-meta" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}
      </ul>
    </Section>
  );
}
