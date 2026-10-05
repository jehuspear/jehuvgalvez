"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type ImageViewerProps = { src: string; alt: string; title: string; className?: string; children: ReactNode };

export function ImageViewer({ src, alt, title, className = "cafe-screen-link", children }: ImageViewerProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  return (
    <>
      <a ref={trigger} className={className} href={src}
        aria-label={"Enlarge " + title.replace(/\.$/, "") + " screenshot"}
        aria-haspopup="dialog"
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          dialog.current?.showModal();
          setOpen(true);
        }}>
        {children}
      </a>
      <dialog ref={dialog} className="image-viewer" aria-labelledby={titleId}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus({ preventScroll: true });
        }}>
        <div className="image-viewer-shell">
          <header className="image-viewer-header">
            <h2 id={titleId}>{title}</h2>
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Close screenshot viewer" autoFocus>
              <X size={24} aria-hidden="true" />
            </button>
          </header>
          <div className="image-viewer-media">
            {open && <Image src={src} alt={alt} fill unoptimized sizes="100vw" className="image-viewer-image" />}
          </div>
          <p className="image-viewer-hint">Press Escape or use the close button to return.</p>
        </div>
      </dialog>
    </>
  );
}
