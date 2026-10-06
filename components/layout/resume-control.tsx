"use client";

import { useEffect, useRef } from "react";
import { Download, ExternalLink, FileText } from "lucide-react";

const resumeUrl = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resume/Jehu_Galvez_Resume.pdf`;

export function ResumeControl() {
  const rootRef = useRef<HTMLDetailsElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const trigger = triggerRef.current;
    if (!root || !trigger) return;
    const desktop = matchMedia("(min-width: 640px)");
    const hover = matchMedia("(min-width: 640px) and (hover: hover) and (pointer: fine)");
    let escapeFocus = false;
    let hoverOpened = false;
    let pinned = root.open;
    function close() {
      hoverOpened = false;
      pinned = false;
      root!.open = false;
    }
    function enter() {
      if (hover.matches && !root!.open) {
        hoverOpened = true;
        root!.open = true;
      }
    }
    function leave() {
      if (hover.matches && !pinned && !root!.matches(":focus-within")) close();
    }
    function focus(event: FocusEvent) {
      if (desktop.matches && !escapeFocus && (event.target as HTMLElement).matches(":focus-visible")) {
        hoverOpened = false;
        root!.open = true;
      }
    }
    function activate(event: MouseEvent) {
      if (event.defaultPrevented) return;
      if (hover.matches && event.detail > 0 && hoverOpened && root!.open) {
        // A first pointer click pins the hover reveal instead of closing it.
        event.preventDefault();
        hoverOpened = false;
        pinned = true;
      } else {
        hoverOpened = false;
        pinned = !root!.open;
      }
    }
    function blur(event: FocusEvent) {
      if (!root!.contains(event.relatedTarget as Node | null)) close();
    }
    function outside(event: PointerEvent) {
      if (!root!.contains(event.target as Node)) close();
    }
    function key(event: KeyboardEvent) {
      if (event.key === "Escape" && root!.open) {
        event.preventDefault();
        close();
        escapeFocus = true;
        trigger!.focus();
        escapeFocus = false;
      }
    }
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("focusin", focus);
    root.addEventListener("focusout", blur);
    root.addEventListener("keydown", key);
    trigger.addEventListener("click", activate);
    document.addEventListener("pointerdown", outside);
    return () => {
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("focusin", focus);
      root.removeEventListener("focusout", blur);
      root.removeEventListener("keydown", key);
      trigger.removeEventListener("click", activate);
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
