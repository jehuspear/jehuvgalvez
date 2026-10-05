import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProjectHeading, ProjectTags } from "@/components/ui/project-heading";
import { SectionReveal } from "@/components/motion/section-reveal";
import { projectChapters } from "@/data/project-chapters";
import { ImageViewer } from "@/components/ui/image-viewer";
import { ibaryoMedia } from "@/data/ibaryo-media";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function ProductScreen({ screen, lead = false }: { screen: typeof ibaryoMedia[number]; lead?: boolean }) {
  const url = `${base}/projects/ibaryo/${screen.id}.jpg`;
  return (
    <figure className="ibaryo-screen">
      <p className="diagram-caption">{screen.label}</p>
      <ImageViewer src={url} alt={screen.alt} title={screen.title} className="ibaryo-screen-link">
        <Image src={url} width={1543} height={884} sizes={lead ? "(min-width: 1280px) 640px, (min-width: 1024px) 55vw, 100vw" : "(min-width: 1280px) 560px, (min-width: 768px) 46vw, 100vw"} loading="lazy" alt={screen.alt} />
        <span className="ibaryo-image-action">View full size <ArrowUpRight size={14} aria-hidden="true" /></span>
      </ImageViewer>
      <figcaption><h4>{screen.title}</h4><p>{screen.caption}</p>{lead && <p className="ibaryo-demo-note">Historical demo data · Open any screen to inspect it full size.</p>}</figcaption>
    </figure>
  );
}

export function IbaryoChapter() {
  const project = projectChapters.ibaryo;
  return (
    <article id="ibaryo" className="project-chapter ibaryo-chapter" aria-labelledby="project-02-title">
      <Container><SectionReveal>
        <div className="project-composition">
          <ProjectHeading {...project} />
          <ProductScreen screen={ibaryoMedia[0]} lead />
        </div>
        <div className="ibaryo-supporting-screens">
          {ibaryoMedia.slice(1).map(screen => <ProductScreen key={screen.id} screen={screen} />)}
        </div>
        <div className="project-bottom"><p>{project.details}</p><ProjectTags tags={project.tags} /></div>
      </SectionReveal></Container>
    </article>
  );
}
