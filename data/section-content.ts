import { experience } from "@/data/profile";

// All role details and project associations are documented in the supplied résumé.
export const careerChapters = [
  { ...experience[2], year: "2020", tags: ["Bootstrap", "GitHub", "VS Code"], details: "Maintained responsive front-end features, supported cross-browser compatibility, and participated in code reviews." },
  { ...experience[1], year: "2025–2026", tags: ["Active Directory", "BitLocker", "Networking", "OS deployment"], details: "Delivered Tier 1 and Tier 2 support for hardware, networks, and IP telephony. Supported OS deployments, troubleshooting, documentation, and staff training." },
  { ...experience[0], year: "2026", tags: ["PHP", "JavaScript", "MySQL", "UAT"], details: "Developed leave-processing features, leave-credit calculations, document routing, and responsive interfaces for FPA. Conducted user acceptance testing." },
] as const;

export const capabilityNodes = [
  { label: "Full-stack", title: "Full-stack web development", tools: "PHP · JavaScript · HTML · CSS · Bootstrap", detail: "Responsive front-end interfaces and back-end application functionality.", proof: "FPA Leave Management System and iBaryo.", href: "#ibaryo", link: "Explore iBaryo" },
  { label: "Databases", title: "Database design & development", tools: "MySQL · SQL · PL/SQL", detail: "Relational data design supporting leave records, inventory, and resource tracking.", proof: "MySQL database work on FPA and iBaryo.", href: "#fpa-chapter", link: "Explore FPA" },
  { label: "IT operations", title: "IT support & systems administration", tools: "Active Directory · BitLocker · OS deployment", detail: "Tier 1 and Tier 2 support, hardware and software troubleshooting, and staff training.", proof: "Department of Agriculture, Office of the Secretary.", href: "#experience", link: "View experience" },
  { label: "Networking", title: "Networking & troubleshooting", tools: "TCP/IP · Cisco routing & switching · IP telephony", detail: "Networking fundamentals alongside hands-on network and IP telephony troubleshooting.", proof: "Technical support during the DA-ICTS internship.", href: "#experience", link: "View experience" },
  { label: "Connected devices", title: "IoT & ESP32", tools: "ESP32 · Microcontrollers · Embedded systems", detail: "Connected-device development and mobile web control for pet-care workflows.", proof: "AutoPet smart feeder and hydration prototype.", href: "#autopet", link: "Explore AutoPet" },
  { label: "Automation", title: "Workflow automation", tools: "Document routing · Leave-credit calculation · UAT", detail: "Translating operational workflows into application features and validating them with users.", proof: "FPA Leave Management System.", href: "#fpa-chapter", link: "Explore FPA" },
] as const;

export const aboutCopy = {
  lead: "I build across the stack—and beyond the interface.",
  body: "My work connects web applications, databases, IT operations, networking, and connected devices. From leave-processing workflows to inventory tracking and an IoT pet-care prototype, I focus on practical systems built around the people who use them.",
  philosophy: "I start with how people work, then connect the interfaces, records, and devices that support that workflow.",
  learning: "I’m continuing to learn about cloud computing while developing my skills across software and systems.",
} as const;
