"use client";

import { useEffect, useRef } from "react";
import { Download, ExternalLink, FileText } from "lucide-react";

const resumeUrl = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resume/Jehu_Galvez_Resume.pdf`;

export function ResumeControl() {
  const rootRef = useRef<HTMLDetailsElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const hover = matchMedia("(hover: hover) and (pointer: fine)");
    let escapeFocus = false;
    function enter() { if (hover.matches) root!.open = true; }
    function leave() { if (hover.matches && !root!.matches(":focus-within")) root!.open = false; }
    function focus(event: FocusEvent) {
      if (!escapeFocus && (event.target as HTMLElement).matches(":focus-visible")) root!.open = true;
    }
    function blur(event: FocusEvent) {
      if (!root!.contains(event.relatedTarget as Node | null)) root!.open = false;
    }
    function outside(event: PointerEvent) {
      if (!root!.contains(event.target as Node)) root!.open = false;
    }
    function key(event: KeyboardEvent) {
      if (event.key === "Escape" && root!.open) {
        event.preventDefault();
        root!.open = false;
        escapeFocus = true;
        triggerRef.current?.focus();
        escapeFocus = false;
      }
    }
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("focusin", focus);
    root.addEventListener("focusout", blur);
    root.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("focusin", focus);
      root.removeEventListener("focusout", blur);
      root.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);

  return (
    <details ref={rootRef} className="resume-control">
      <summary ref={triggerRef} aria-label="Resume: view or download" aria-controls="resume-actions">
        <FileText size={22} aria-hidden="true" />
      </summary>
      <div id="resume-actions" className="resume-actions" role="group" aria-label="Resume actions">
        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
          <span>View Resume<span className="sr-only"> (PDF, opens in a new tab)</span></span>
          <ExternalLink size={16} aria-hidden="true" />
        </a>
        <a href={resumeUrl} download="Jehu_Galvez_Resume.pdf">
          <Download size={17} aria-hidden="true" /><span>Download<span className="sr-only"> Jehu Galvez resume (PDF)</span></span>
        </a>
      </div>
    </details>
  );
}
