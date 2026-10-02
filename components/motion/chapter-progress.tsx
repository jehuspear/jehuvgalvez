"use client";

import type { ReactNode } from "react";
import { useChapterProgress } from "@/hooks/use-chapter-progress";

export function ChapterProgress({ children }: { children: ReactNode }) {
  const ref = useChapterProgress();
  return <div ref={ref} className="chapter-progress">{children}</div>;
}
