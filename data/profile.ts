// Factual source: resources/Jehu_Galvez_Resume.pdf. Keep source documents private to the repository.
export const profile = {
  name: "Jehu Galvez",
  fullName: "Jehu Vincent Ferrer Galvez",
  location: "Pasig City, Metro Manila, Philippines",
  email: "jehugalv@gmail.com",
  linkedIn: "https://www.linkedin.com/in/jehu-galvez/",
  summary: "Information Technology graduate with experience in full-stack web development, IT technical support, databases, networking, and IoT.",
  education: "Bachelor of Science in Information Technology, specializing in Mobile and Internet Technology. National University - Asia Pacific College, Fairview Campus, 2022–2026.",
} as const;

export const experience = [
  { organization: "Department of Agriculture (DA-ICTS)", role: "Full-Stack Software Developer / Programmer Intern", context: "Cross-assigned to Fertilizer and Pesticide Authority (FPA)", period: "April–May 2026" },
  { organization: "Department of Agriculture (DA-ICTS)", role: "IT Technical Support Specialist Intern", context: "Office of the Secretary", period: "December 2025–May 2026" },
  { organization: "BlastAsia Inc.", role: "Front-end Website Developer Intern", context: "Ortigas Center, Pasig City", period: "March 2020" },
] as const;

export const capabilities = [
  "Full-stack web development", "Database design and development", "IT support and systems administration",
  "Networking and troubleshooting", "IoT and ESP32", "Workflow automation",
] as const;

export const recognition = [
  "TOPCIT: Level 3 Competent — May 2026",
  "Oracle Cloud Infrastructure 2023 Certified Foundations Associate — August 2023",
  "Best in IoT-Device Award, NU Fairview IT Exhibit — October 2025",
] as const;
