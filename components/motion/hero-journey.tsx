"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SkillIcon } from "@/components/ui/skill-icon";
import { heroTools } from "@/data/hero-tools";

export function HeroJourney() {
  const ref = useRef<HTMLElement>(null);
  const [view, setView] = useState({ phase: "student", enhanced: false, departed: false });

  useEffect(() => {
    const panel = ref.current;
    const hero = panel?.closest<HTMLElement>("#hero");
    const visual = hero?.querySelector<HTMLElement>(".sequence-visual");
    const stage = hero?.querySelector<HTMLElement>(".sequence-stage");
    if (!panel || !hero || !visual || !stage) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let previousPhase = "student";

    function update() {
      const phase = hero!.dataset.phase ?? "student";
      if (previousPhase !== phase) {
        const focusedInside = panel!.contains(document.activeElement);
        panel!.querySelectorAll<HTMLDetailsElement>("details[open]").forEach(detail => { detail.open = false; });
        if (focusedInside) panel!.focus({ preventScroll: true });
        previousPhase = phase;
      }
      const next = { phase, enhanced: hero!.dataset.enhanced === "true" && !reduced.matches, departed: hero!.dataset.departed === "true" };
      setView(current => current.phase === next.phase && current.enhanced === next.enhanced && current.departed === next.departed ? current : next);
    }
    function measure() {
      // Measure only on resize; scrolling uses the Hero's existing CSS progress value.
      panel!.style.setProperty("--journey-mobile-top", `${visual!.offsetTop + Math.max(8, visual!.clientHeight - 132)}px`);
    }
    const phases = new MutationObserver(update);
    phases.observe(hero, { attributes: true, attributeFilter: ["data-phase", "data-enhanced", "data-departed"] });
    const sizes = new ResizeObserver(measure);
    sizes.observe(stage);
    sizes.observe(visual);
    const initial = requestAnimationFrame(() => { update(); measure(); });
    reduced.addEventListener("change", update);
    return () => { cancelAnimationFrame(initial); phases.disconnect(); sizes.disconnect(); reduced.removeEventListener("change", update); };
  }, []);

  return (
    <aside ref={ref} tabIndex={-1} className="hero-journey" aria-label="Skills along my journey" inert={view.enhanced && view.departed} onKeyDown={event => {
      if (event.key !== "Escape") return;
      const detail = (event.target as HTMLElement).closest<HTMLDetailsElement>("details[open]");
      if (detail) { detail.open = false; detail.querySelector("summary")?.focus(); }
    }}>
      {heroTools.map((phase, index) => (
        <section className="journey-phase" data-journey-phase={phase.id} key={phase.id} aria-labelledby={`journey-${phase.id}`} inert={view.enhanced && view.phase !== phase.id}>
          <h3 id={`journey-${phase.id}`} className="journey-label"><span aria-hidden="true">0{index + 1} /</span> {phase.label}</h3>
          <div className="journey-tools">
            {phase.skills.map((skill, order) => (
              <details className="journey-tool" name="hero-journey-tool" key={skill.id} style={{ "--tool-order": order } as CSSProperties}>
                <summary aria-label={`About ${skill.name}`}>
                  <span className="journey-tool-face"><SkillIcon skill={skill} /><span className="journey-tool-name">{skill.name === "Visual Studio Code" ? "VS Code" : skill.name === "OpenAI Codex" ? "Codex" : skill.name}</span></span>
                </summary>
                <div className="journey-context"><strong>{skill.name}</strong><p>{skill.context}</p><span>Tap the badge again to close.</span></div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </aside>
  );
}
