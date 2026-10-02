export const navigation = [
  { id: "selected-work", label: "Work", accessibleLabel: "Selected Work", href: "#selected-work" },
  { id: "experience", label: "Experience", accessibleLabel: "Experience", href: "#experience" },
  { id: "about", label: "About", accessibleLabel: "About", href: "#about" },
  { id: "contact", label: "Contact", accessibleLabel: "Contact", href: "#contact" },
] as const;

export const portfolioSections = [
  "hero", "intro", "selected-work", "experience", "capabilities", "about", "recognition", "contact",
] as const;

export const sectionNavigation: Record<(typeof portfolioSections)[number], string> = {
  hero: "hero",
  intro: "hero",
  "selected-work": "selected-work",
  experience: "experience",
  capabilities: "experience",
  about: "about",
  recognition: "about",
  contact: "contact",
};
