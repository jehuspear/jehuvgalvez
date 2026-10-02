// Verified against resources/Jehu_Galvez_Resume.pdf. Diagrams are conceptual, not product UI.
export const projectChapters = {
  ibaryo: {
    index: "02", category: "Inventory & resource systems", title: "iBaryo",
    subtitle: "Inventory and Resource Tracking System",
    period: "November 2025–May 2026",
    role: "Freelance full-stack programmer · Database consultant & designer",
    summary: "From manual recordkeeping to a centralized inventory and resource tracking platform for barangay operations.",
    details: "I developed the inventory and resource tracking modules, designed the MySQL database, and deployed the system as an internal intranet application.",
    tags: ["PHP", "JavaScript", "MySQL", "jQuery", "AJAX", "Bootstrap"],
    nodes: ["Inventory items", "Resources", "Transactions", "Resource movement"],
  },
  autopet: {
    index: "03", category: "Connected hardware & IoT", title: "AutoPet",
    subtitle: "Smart Pet Feeder and Hydration System",
    period: "April–October 2025",
    role: "Front-end & back-end developer · IoT hardware engineer",
    summary: "Connecting physical pet care with a mobile web application, real-time monitoring, and voice features.",
    details: "I worked on the prototype using ESP32 microcontrollers and a mobile web application for remote feeding schedule management, incorporating stakeholder requirements and feedback.",
    tags: ["ESP32", "IoT", "Mobile web", "Embedded systems"],
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
    nodes: ["Customer access", "Web order", "Ticket logging"],
  },
} as const;
