export const navigation = [
  { id: "selected-work", label: "Work", accessibleLabel: "Selected Work", href: "#selected-work", mobileSecondary: false },
  { id: "experience", label: "Experience", accessibleLabel: "Experience", href: "#experience", mobileSecondary: false },
  { id: "capabilities", label: "Capabilities", accessibleLabel: "Capabilities", href: "#capabilities", mobileSecondary: true },
  { id: "about", label: "About", accessibleLabel: "About", href: "#about", mobileSecondary: true },
  { id: "recognition", label: "Recognition", accessibleLabel: "Recognition", href: "#recognition", mobileSecondary: true },
  { id: "contact", label: "Contact", accessibleLabel: "Contact", href: "#contact", mobileSecondary: false },
] as const;

export const portfolioSections = [
  "hero", "intro", "selected-work", "experience", "capabilities", "about", "recognition", "contact",
] as const;

export const sectionNavigation: Record<(typeof portfolioSections)[number], string> = {
  hero: "hero",
  intro: "hero",
  "selected-work": "selected-work",
  experience: "experience",
  capabilities: "capabilities",
  about: "about",
  recognition: "recognition",
  contact: "contact",
};
