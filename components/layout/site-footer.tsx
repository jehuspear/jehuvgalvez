import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-8 text-sm text-muted">
      <Container><div className="flex flex-wrap justify-between gap-4"><p>Jehu Galvez</p><a href="#hero" className="hover:text-ink">Back to top</a></div></Container>
    </footer>
  );
}
