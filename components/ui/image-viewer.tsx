"use client";

import Image from "next/image";
import { RotateCcw, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { MediaSkeleton } from "@/components/ui/skeleton";

type ImageViewerProps = { src: string; alt: string; title: string; className?: string; children: ReactNode };
type ImageState = "loading" | "ready" | "error";

export function ImageViewer({ src, alt, title, className = "cafe-screen-link", children }: ImageViewerProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const retryButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [imageState, setImageState] = useState<ImageState>("loading");
  const [attempt, setAttempt] = useState(0);
  // Only a user-requested retry gets a fresh URL; normal opens retain browser caching.
  const imageSrc = attempt === 0 ? src : `${src}${src.includes("?") ? "&" : "?"}viewer-retry=${attempt}`;

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
          setImageState("loading");
          setAttempt(0);
          trigger.current?.focus({ preventScroll: true });
        }}>
        <div className="image-viewer-shell">
          <header className="image-viewer-header">
            <h2 id={titleId}>{title}</h2>
            <button ref={closeButton} type="button" onClick={() => dialog.current?.close()} aria-label="Close screenshot viewer" autoFocus>
              <X size={24} aria-hidden="true" />
            </button>
          </header>
          <div className="image-viewer-media" data-state={imageState} aria-busy={open && imageState === "loading"}>
            {open && (
              <Image key={attempt} src={imageSrc} alt={alt} fill unoptimized loading="eager" sizes="100vw" className="image-viewer-image"
                aria-hidden={imageState !== "ready"}
                onLoad={() => {
                  // Keep keyboard focus inside the dialog when the retry UI disappears.
                  if (retryButton.current === document.activeElement) closeButton.current?.focus({ preventScroll: true });
                  setImageState("ready");
                }}
                onError={() => setImageState("error")} />
            )}
            {open && imageState === "loading" && <MediaSkeleton label="Loading full-size screenshot" />}
            {open && imageState !== "ready" && (imageState === "error" || attempt > 0) && (
              <div className="image-viewer-recovery">
                {imageState === "error" && <><p>Screenshot couldn’t load.</p><p>Try again, or close this view to return to the project.</p></>}
                <button ref={retryButton} type="button" aria-disabled={imageState === "loading"}
                  onClick={() => {
                    if (imageState === "loading") return;
                    setImageState("loading");
                    setAttempt(value => value + 1);
                  }}>
                  <RotateCcw size={18} aria-hidden="true" />{imageState === "loading" ? "Retrying…" : "Retry image"}
                </button>
              </div>
            )}
          </div>
          <p className="sr-only" role="status">{open && imageState === "loading" ? "Loading full-size screenshot." : open && imageState === "error" ? "Screenshot unavailable. Retry image or close the viewer." : ""}</p>
          <p className="image-viewer-hint">Press Escape or use the close button to return.</p>
        </div>
      </dialog>
    </>
  );
}
