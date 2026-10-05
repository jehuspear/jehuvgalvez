import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProjectHeading, ProjectTags } from "@/components/ui/project-heading";
import { SectionReveal } from "@/components/motion/section-reveal";
import { projectChapters } from "@/data/project-chapters";
import { cafeMedia } from "@/data/cafe-media";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
type CafeScreen = typeof cafeMedia[keyof typeof cafeMedia];

function ProductScreen({ screen }: { screen: CafeScreen }) {
  const url = `${base}/projects/white-house-cafe/${screen.file}`;
  return (
    <figure className="cafe-screen" data-portrait={screen.portrait}>
      <a className="cafe-screen-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={`View ${screen.title.replace(/\.$/, "")} screenshot full size (opens in a new tab)`}>
        <span className="cafe-image-stage">
          <Image src={url} width={screen.width} height={screen.height} loading="lazy" sizes={screen.portrait ? "(min-width: 768px) 260px, (max-width: 479px) 100vw, 260px" : "(min-width: 1280px) 560px, (min-width: 768px) 46vw, 100vw"} alt={screen.alt} />
        </span>
        <span className="cafe-image-action">View full size <ArrowUpRight size={14} aria-hidden="true" /></span>
      </a>
      <figcaption><h4>{screen.title}</h4><p>{screen.caption}</p></figcaption>
    </figure>
  );
}

export function CafeChapter() {
  const project = projectChapters.cafe;
  return (
    <article id="white-house-cafe" className="project-chapter cafe-chapter" aria-labelledby="project-04-title">
      <Container><SectionReveal>
        <div className="project-composition">
          <ProjectHeading {...project} />
          <div className="cafe-screen-grid cafe-customer-pair" aria-label="Customer menu and customization">
            <ProductScreen screen={cafeMedia.menu} />
            <ProductScreen screen={cafeMedia.customization} />
          </div>
        </div>
        <p className="cafe-demo-note">Demo order data · Sample customer names · Open any screen to inspect it full size.</p>
        <section className="cafe-story-beat" aria-labelledby="cafe-customer-title">
          <header><p className="diagram-caption">01 / Customer ordering</p><h4 id="cafe-customer-title">From selection to a numbered ticket.</h4></header>
          <div className="cafe-screen-grid cafe-customer-pair">
            <ProductScreen screen={cafeMedia.cart} />
            <ProductScreen screen={cafeMedia.ticket} />
          </div>
        </section>
        <section className="cafe-story-beat" aria-labelledby="cafe-preparation-title">
          <header><p className="diagram-caption">02 / Preparation & collection</p><h4 id="cafe-preparation-title">A shared view of what comes next.</h4></header>
          <div className="cafe-screen-grid">
            <ProductScreen screen={cafeMedia.preparing} />
            <ProductScreen screen={cafeMedia.board} />
          </div>
        </section>
        <details className="cafe-supporting-gallery">
          <summary>Explore more application screens <Plus size={18} aria-hidden="true" /></summary>
          <div className="cafe-screen-grid">
            {[cafeMedia.ready, cafeMedia.receipt, cafeMedia.pending, cafeMedia.pos].map(screen => <ProductScreen key={screen.file} screen={screen} />)}
          </div>
        </details>
        <div className="project-bottom"><p>{project.details}</p><ProjectTags tags={project.tags} /></div>
      </SectionReveal></Container>
    </article>
  );
}
