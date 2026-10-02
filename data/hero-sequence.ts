import manifest from "@/public/hero/jehu-hero-sequence-native/manifest.json";

// Direct video derivatives; original and upscaled reference sets remain unchanged.
const base = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/hero/jehu-hero-sequence-native`;

export const heroSequence = {
  phaseStartFrames: manifest.phaseStartFrames,
  desktop: manifest.desktop,
  mobile: manifest.mobile,
  poster: `${base}${manifest.posters.initial}`,
  finalPoster: `${base}${manifest.posters.final}`,
  reducedPoster: `${base}${manifest.posters.professional}`,
};

export function frameUrl(variant: "desktop" | "mobile", index: number) {
  const sequence = heroSequence[variant];
  return `${base}${sequence.pathPattern.replace("{index:04d}", String(index + sequence.firstIndex).padStart(4, "0"))}`;
}
