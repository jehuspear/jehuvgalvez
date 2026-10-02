"use client";

import type { ReactNode } from "react";
import { useExperienceTimeline } from "@/hooks/use-experience-timeline";

export function ExperienceTimeline({ children }: { children: ReactNode }) {
  const ref = useExperienceTimeline();
  return <div ref={ref} className="experience-timeline">{children}</div>;
}
