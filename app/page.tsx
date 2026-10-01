import { HeroIntro } from "@/components/sections/hero-intro";
import { SelectedWork } from "@/components/sections/selected-work";
import { Experience } from "@/components/sections/experience";
import { Capabilities } from "@/components/sections/capabilities";
import { About } from "@/components/sections/about";
import { Recognition } from "@/components/sections/recognition";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroIntro />
      <SelectedWork />
      <Experience />
      <Capabilities />
      <About />
      <Recognition />
      <Contact />
    </main>
  );
}
