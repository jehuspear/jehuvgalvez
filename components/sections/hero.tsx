import { HeroSequence } from "@/components/motion/hero-sequence";
import { HeroJourney } from "@/components/motion/hero-journey";
import { HeroStory } from "@/components/sections/hero-story";
import { Container } from "@/components/ui/container";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <HeroSequence>
      <div className="sequence-content">
        <Container>
          <p className="mb-5 text-xs tracking-[0.16em] text-accent uppercase sm:text-sm">Development · Systems · IT</p>
          <h1 id="hero-title" className="sequence-title">{profile.name}<span className="text-accent">.</span></h1>
          <p className="sr-only">{profile.summary}</p>
          <HeroStory />
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-5">
            <a href="#selected-work" className="inline-block border border-accent/60 bg-canvas/40 px-5 py-3 text-sm hover:bg-accent hover:text-canvas">Explore selected work <span aria-hidden="true">↗</span></a>
            <a href="#intro" className="text-sm text-muted underline underline-offset-4 hover:text-ink">Skip to intro</a>
          </div>
          <p className="sequence-scroll-hint mt-10 text-xs tracking-[0.14em] text-muted uppercase" aria-hidden="true">Scroll to explore <span className="ml-2 text-accent">↓</span></p>
        </Container>
      </div>
      <HeroJourney />
    </HeroSequence>
  );
}
