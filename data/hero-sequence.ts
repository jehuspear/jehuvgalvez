import manifest from "@/data/hero-web-manifest.json";

// Direct video derivatives with content-versioned URLs for safe browser/CDN caching.
const base = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${manifest.assetPath}`;

export const heroSequence = {
  phaseStartFrames: manifest.phaseStartFrames,
  desktop: manifest.desktop,
  mobile: manifest.mobile,
  poster: `${base}${manifest.posters.initial}`,
  mobilePoster: `${base}${manifest.mobilePosters.initial}`,
  finalPoster: `${base}${manifest.posters.final}`,
  reducedPoster: `${base}${manifest.posters.professional}`,
  reducedMobilePoster: `${base}${manifest.mobilePosters.professional}`,
};

export function frameUrl(variant: "desktop" | "mobile", index: number) {
  const sequence = heroSequence[variant];
  return `${base}${sequence.pathPattern.replace("{index:04d}", String(index + sequence.firstIndex).padStart(4, "0"))}`;
}
