import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { profile } from "@/data/profile";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function SiteFooter() {
  return (
    <footer className="portfolio-footer border-t border-line py-8 text-sm text-muted">
      <Container>
        <div className="footer-composition">
          <div><p className="text-ink">{profile.name}</p><p className="footer-description">Developer / Systems Builder</p></div>
          <nav aria-label="Professional links" className="footer-links">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            <a href={base + "/resume/Jehu_Galvez_Resume.pdf"} target="_blank" rel="noopener noreferrer">Résumé<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            <a href="#hero">Back to top<span aria-hidden="true">↑</span></a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
