"use client";

import { ArrowUpRight } from "lucide-react";
import { fpaProject } from "@/data/fpa-project";
import { useFpaChapter } from "@/hooks/use-fpa-chapter";
import { FpaScreenshot } from "@/components/motion/fpa-screenshot";
import { FpaTeaser } from "@/components/motion/fpa-teaser";

export function FpaChapter() {
  const { rootRef, enhanced, modeReady, phase, loadThrough, refresh } = useFpaChapter();
  return (
    <article ref={rootRef} id={fpaProject.id} aria-labelledby="fpa-project-title" className="fpa-chapter">
      <div className="fpa-stage">
        <header className="fpa-heading">
          <div className="fpa-project-index"><span className="fpa-number" aria-hidden="true">01</span><p className="fpa-category">{fpaProject.category}</p></div>
          <h3 id="fpa-project-title"><span className="fpa-acronym">FPA</span>{" "}<span>Leave Management<br className="fpa-title-break" /> System</span></h3>
          <p className="fpa-summary">{fpaProject.summary}</p>
        </header>

        <div className="fpa-beats" aria-label="FPA project story">
          {fpaProject.beats.map((beat, index) => (
            <figure key={beat.id} className={`fpa-beat fpa-beat-${beat.id}`} data-fpa-beat={index}>
              <div className="fpa-panel-bar" aria-hidden="true"><span>FPA / System walkthrough</span><span>{String(index + 1).padStart(2, "0")} / 04</span></div>
              <div className="fpa-media-frame">
                {beat.image ? <FpaScreenshot src={beat.image} alt={beat.alt} allowed={modeReady && (!enhanced || loadThrough >= index)} onReady={refresh} /> : <FpaTeaser active={!enhanced || phase === 0} />}
              </div>
              <figcaption className="fpa-caption">
                <p className="fpa-beat-label">{beat.label}</p>
                <h4>{beat.title}</h4>
                <p>{beat.copy}</p>
                {index === 1 && <ol className="fpa-workflow" aria-label="Leave approval workflow">
                  {fpaProject.workflow.map((step, i) => <li key={step}><span className="fpa-workflow-node">{String(i + 1).padStart(2, "0")}</span><span>{step}</span>{i < 3 && <span className="fpa-workflow-line" aria-hidden="true"><span />→</span>}</li>)}
                </ol>}
              </figcaption>
            </figure>
          ))}
        </div>

        <footer className="fpa-details">
          <ul className="fpa-tags" aria-label="FPA technologies and practice">{fpaProject.technologies.map(tag => <li key={tag}>{tag}</li>)}</ul>
          <div className="fpa-finale">
            <p>{fpaProject.finale}</p>
            <p className="fpa-recognition">
              <a href={fpaProject.recognition.url} target="_blank" rel="noopener noreferrer">
                <span>{fpaProject.recognition.label}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
                <span className="sr-only"> on Facebook (opens in a new tab)</span>
              </a>
              <span className="fpa-recognition-source">{fpaProject.recognition.source}</span>
            </p>
          </div>
        </footer>
        <div className="fpa-scroll-progress" aria-hidden="true"><span /></div>
      </div>
    </article>
  );
}
