import { ibaryoMedia } from "@/data/ibaryo-media";
import { cafeMedia } from "@/data/cafe-media";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Roles and project history verified against resources/Jehu_Galvez_Resume.pdf.
// iBaryo screenshots and captions are documented separately in data/ibaryo-media.ts.
export const projectChapters = {
  ibaryo: {
    index: "02", category: "Inventory & resource systems", title: "iBaryo",
    subtitle: "Inventory and Resource Tracking System",
    period: "November 2025–May 2026",
    role: "Freelance full-stack programmer · Database consultant & designer",
    summary: "From manual recordkeeping to a centralized inventory and resource tracking platform for barangay operations.",
    details: "I developed the inventory and resource tracking modules, designed the MySQL database, and deployed the system as an internal intranet application.",
    tags: ["PHP", "JavaScript", "MySQL", "jQuery", "AJAX", "Bootstrap"],
    proof: {
      problem: "Manual barangay inventory and resource recordkeeping.",
      contribution: "Built inventory/resource modules, designed MySQL data relationships, and deployed the intranet app.",
      delivered: "Centralized inventory, availability, transactions, and resource movement records.",
    },
    media: { basePath: `${base}/projects/ibaryo`, screens: ibaryoMedia },
  },
  autopet: {
    index: "03", category: "Connected hardware & IoT", title: "AutoPet",
    subtitle: "Smart Pet Feeder and Hydration System",
    period: "April–October 2025",
    role: "Front-end & back-end developer · IoT hardware engineer",
    summary: "Connecting physical pet care with a mobile web application, real-time monitoring, and voice features.",
    details: "I worked on the prototype using ESP32 microcontrollers and a mobile web application for remote feeding schedule management, incorporating stakeholder requirements and feedback.",
    tags: ["ESP32", "IoT", "Mobile web", "Embedded systems"],
    proof: {
      problem: "Managing pet feeding schedules and monitoring remotely.",
      contribution: "Developed the mobile web application and ESP32 prototype with stakeholder feedback.",
      delivered: "A feeder/hydration prototype with schedules, monitoring, camera access, and voice features.",
    },
    media: {
      src: `${base}/projects/autopet/concept-sketch.webp`, width: 724, height: 725,
      alt: "Supplied concept sketch of the AutoPet feeder and hydration prototype, showing food and water compartments, camera, and voice components.",
      caption: "Supplied prototype concept sketch. This is a design reference, not a hardware photograph.",
    },
    nodes: ["Mobile web control", "ESP32", "Feeding schedules", "Camera & voice"],
  },
  cafe: {
    index: "04", category: "Customer-facing web applications", title: "White House Café",
    subtitle: "Web-App Based Kiosk Ordering System",
    period: "November 2024–March 2025",
    role: "Front-end & back-end developer",
    summary: "A customer web ordering application designed around a clearer ordering process for a local café.",
    details: "I implemented authentication and ticket logging, collaborated through GitHub, and conducted performance testing. Updates were informed by café management and customer feedback.",
    tags: ["Web application", "Authentication", "Ticket logging", "Performance testing"],
    proof: {
      problem: "Customer ordering, checkout queues, and ticket tracking.",
      contribution: "Built front/back end with authentication and ticket logging; tested performance and incorporated feedback.",
      delivered: "Web ordering with numbered tickets and a visible preparation-to-collection flow.",
    },
    media: { basePath: `${base}/projects/white-house-cafe`, screens: cafeMedia },
  },
} as const;
