import { Container } from "@/components/ui/container";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="py-24 sm:py-36">
      <Container>
        <p className="mb-8 text-sm text-accent">Development · Systems · IT</p>
        <h1 id="hero-title" className="max-w-4xl text-6xl leading-tight font-medium tracking-tight sm:text-8xl">{profile.name}</h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">{profile.summary}</p>
        <a href="#selected-work" className="mt-10 inline-block border border-line px-6 py-3 text-sm hover:border-accent hover:text-accent">Explore selected work <span aria-hidden="true">↘</span></a>
      </Container>
    </section>
  );
}
