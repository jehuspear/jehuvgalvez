import { Section } from "@/components/ui/section";
import { capabilities } from "@/data/profile";

export function Capabilities() {
  return <Section id="capabilities" title="Capabilities"><ul className="grid gap-4 sm:grid-cols-2">{capabilities.map((item) => <li key={item}>{item}</li>)}</ul></Section>;
}
