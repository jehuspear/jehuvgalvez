import { heroStory } from "@/data/hero-story";

/** All three beats remain in reading order; scroll enhancement only changes their visual presentation. */
export function HeroStory() {
  return (
    <div className="hero-story">
      <ol className="hero-story-steps" aria-label="Portrait journey">
        {heroStory.map((phase, index) => (
          <li key={phase.id} data-story={phase.id}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span> {phase.label}
          </li>
        ))}
      </ol>
      <div className="hero-story-panels">
        {heroStory.map(phase => (
          <section key={phase.id} className="hero-story-panel" data-story={phase.id} aria-labelledby={`hero-story-${phase.id}`}>
            <h2 id={`hero-story-${phase.id}`}>{phase.title}</h2>
            <p>{phase.description}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
