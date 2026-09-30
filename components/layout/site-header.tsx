import { Container } from "@/components/ui/container";
import { navigation } from "@/data/navigation";

export function SiteHeader() {
  return (
    <header className="border-b border-line py-6">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <a href="#hero" className="font-semibold tracking-tight">Jehu Galvez<span className="text-accent">.</span></a>
          <nav aria-label="Main navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
              {navigation.map((item) => <li key={item.href}><a href={item.href} className="hover:text-ink">{item.label}</a></li>)}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
