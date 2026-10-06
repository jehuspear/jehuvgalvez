import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { RecognitionGallery } from "@/components/ui/recognition-gallery";
import { certificates } from "@/data/recognition";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Recognition() {
  return (
    <Section id="recognition" title="Built. Tested. Recognized." label="Recognition" index="05" layout="stacked">
      <RecognitionGallery>
        <div className="recognition-previews" aria-label="Selected certificate preview">
          {certificates.map((certificate) => {
            const url = `${base}/recognition/${certificate.file}`;
            return (
              <figure key={certificate.id} id={`certificate-preview-${certificate.id}`} className={`recognition-feature certificate-preview-${certificate.id}`}>
                <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`View ${certificate.title} certificate full size in a new tab`}>
                  <Image src={url} width={certificate.width} height={certificate.height} unoptimized loading="lazy" alt={certificate.alt} />
                </a>
                <figcaption>
                  <span>{certificate.caption}</span>
                  {certificate.project && <a className="editorial-link" href={certificate.project.href}>{certificate.project.label}<ArrowUpRight size={16} aria-hidden="true" /></a>}
                  <a className="editorial-link" href={url} target="_blank" rel="noopener noreferrer">View certificate<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> full size (opens in a new tab)</span></a>
                </figcaption>
              </figure>
            );
          })}
        </div>
        <div className="recognition-records">
          <fieldset className="certificate-options">
            <legend className="editorial-meta">Credentials & academic recognition</legend>
            <p className="certificate-hint">Select a credential to view its certificate.</p>
            {certificates.map((certificate, index) => (
              <label key={certificate.id} className="certificate-option">
                <input className="sr-only" type="radio" name="portfolio-certificate" id={`certificate-${certificate.id}`} value={certificate.id} defaultChecked={certificate.id === "iot"} aria-controls={`certificate-preview-${certificate.id}`} />
                <span className="editorial-meta certificate-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="certificate-option-copy"><span className="certificate-title">{certificate.title}</span><span className="certificate-detail">{certificate.detail}</span></span>
                <Check size={16} className="certificate-selected" aria-hidden="true" />
              </label>
            ))}
          </fieldset>
        </div>
      </RecognitionGallery>
    </Section>
  );
}
