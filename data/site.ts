import { profile } from "@/data/profile";

// Public production identity; preview URLs should not become canonical URLs.
export const site = {
  origin: "https://jehuvgalvez.vercel.app",
  title: `${profile.name} | ${profile.professionalTitle}`,
  description: profile.summary,
  socialImage: "/opengraph/portfolio.jpg",
  socialImageAlt: `${profile.name}, ${profile.professionalTitle}, with a formal portrait.`,
} as const;

export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  url: `${site.origin}/`,
  email: profile.email,
  jobTitle: profile.professionalTitle,
  sameAs: [profile.github, profile.linkedIn],
} as const;
