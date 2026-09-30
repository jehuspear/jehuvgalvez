import { Section } from "@/components/ui/section";
import { projects } from "@/data/projects";

export function SelectedWork() {
  return (
    <Section id="selected-work" title="Selected Work">
      <ul className="divide-y divide-line">
        {projects.map((project) => <li key={project.id} className="py-5 first:pt-0 last:pb-0"><h3 className="text-xl text-ink">{project.name}</h3></li>)}
      </ul>
    </Section>
  );
}
