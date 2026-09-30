import { Section } from "@/components/ui/section";
import { recognition } from "@/data/profile";

export function Recognition() {
  return <Section id="recognition" title="Recognition"><ul className="space-y-4">{recognition.map((item) => <li key={item}>{item}</li>)}</ul></Section>;
}
