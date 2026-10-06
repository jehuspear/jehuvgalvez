export type Certificate = {
  id: string;
  title: string;
  detail: string;
  caption: string;
  file: string;
  width: number;
  height: number;
  alt: string;
  project?: { href: string; label: string };
};

// Labels and dates are grounded in Jehu's supplied certificates and instructions.
export const certificates: readonly Certificate[] = [
  {
    id: "topcit",
    title: "TOPCIT: Level 3 Competent",
    detail: "Academic recognition · May 2026",
    caption: "TOPCIT / Level 3 Competent / 2026",
    file: "topcit.webp",
    width: 1765,
    height: 1266,
    alt: "NU Fairview certificate recognizing Jehu Vincent F. Galvez as TOPCIT Level 3 Competent, issued May 16, 2026.",
  },
  {
    id: "oracle",
    title: "Oracle Cloud Infrastructure 2023 Certified Foundations Associate",
    detail: "Oracle certification · August 2023",
    caption: "Oracle Cloud Infrastructure / Foundations Associate / 2023",
    file: "oracle-oci.webp",
    width: 1800,
    height: 1391,
    alt: "Oracle certificate for Jehu Vincent Ferrer Galvez, Oracle Cloud Infrastructure 2023 Certified Foundations Associate, dated August 30, 2023.",
  },
  {
    id: "iot",
    project: { href: "#autopet", label: "Explore AutoPet" },
    title: "Best in IoT-Device Award",
    detail: "AutoPet · NU Fairview · October 2025",
    caption: "Best in IoT-Device / AutoPet / 2025",
    file: "best-in-iot-restored.webp",
    width: 1470,
    height: 1070,
    alt: "Restored NU Fairview certificate awarded to Jehu Vincent F. Galvez for AutoPet, winner of the Best in IoT-Device Award, dated October 7, 2025.",
  },
  {
    id: "fpa",
    project: { href: "#fpa-chapter", label: "Explore FPA Leave Management" },
    title: "FPA-LMS Recognition",
    detail: "Fertilizer and Pesticide Authority · May 2026",
    caption: "FPA-LMS / Certificate of Recognition / 2026",
    file: "fpa-lms-recognition.webp",
    width: 1646,
    height: 1205,
    alt: "Fertilizer and Pesticide Authority Certificate of Recognition presented to Jehu Vincent F. Galvez for contributing to the successful development of FPA-LMS, dated May 29, 2026.",
  },
  {
    id: "agentblazer",
    title: "Salesforce Agentblazer Champion",
    detail: "Workshop completion · August 2025",
    caption: "Salesforce Agentblazer Workshop / Completion Certificate / 2025",
    file: "salesforce-agentblazer.webp",
    width: 1800,
    height: 1013,
    alt: "Salesforce Agentblazer Workshop Completion Certificate for Jehu Vincent Ferrer Galvez, issued August 6, 2025.",
  },
];
