import { Code2, Database, Server, Network, CircuitBoard, Workflow, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { capabilityNodes } from "@/data/section-content";

const icons = [Code2, Database, Server, Network, CircuitBoard, Workflow];
const positions = [[50,12],[83,30],[83,70],[50,88],[17,70],[17,30]];
const lines = ["M300 220 L300 53","M300 220 L498 132","M300 220 L498 308","M300 220 L300 387","M300 220 L102 308","M300 220 L102 132"];

export function Capabilities() {
  return (
    <Section id="capabilities" title="Building across the system." label="Capabilities" index="03" layout="stacked" intro="Select a capability to see its tools and where I’ve applied it.">
      <div className="constellation">
        <div className="constellation-map">
          <svg viewBox="0 0 600 440" preserveAspectRatio="none" className="constellation-lines" aria-hidden="true">{lines.map((d, i) => <path key={d} d={d} className={`constellation-line line-${i + 1}`} />)}<circle cx="300" cy="220" r="72" /></svg>
          <div className="constellation-core" aria-hidden="true"><span>JG.</span><small>Systems builder</small></div>
          <ol className="constellation-nodes">{capabilityNodes.map((node, index) => {
            const Icon = icons[index], position = positions[index];
            return (
              <li key={node.title}>
                <details name="portfolio-capability" open={index === 0}>
                  <summary style={{ left: `${position[0]}%`, top: `${position[1]}%` }}><Icon size={22} aria-hidden="true" /><span>{node.label}</span><span className="sr-only">: {node.title}</span></summary>
                  <div className="capability-panel">
                    <p className="editorial-meta">{node.tools}</p><h3>{node.title}</h3><p>{node.detail}</p><p className="capability-proof">{node.proof}</p>
                    <a href={node.href} className="editorial-link">{node.link}<ArrowUpRight size={16} aria-hidden="true" /></a>
                  </div>
                </details>
              </li>
            );
          })}</ol>
        </div>
        <p className="constellation-hint">Select a node to explore a capability.</p>
      </div>
    </Section>
  );
}
