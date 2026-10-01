// Sources: resources/Jehu_Galvez_Resume.pdf and tools explicitly supplied by Jehu.
// Project associations remain limited to documented uses.
export type Skill = { id: string; name: string; logo?: string; symbol?: "code" | "data" | "network" | "chip" | "flow"; context: string };
export type SkillGroup = { id: string; label: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  { id: "development", label: "Development / AI Tools", skills: [
    { id: "chatgpt", name: "ChatGPT", logo: "chatgpt", context: "I use ChatGPT as part of my AI-assisted toolkit." },
    { id: "codex", name: "OpenAI Codex", logo: "codex", context: "I use OpenAI Codex as part of my development toolkit." },
    { id: "antigravity", name: "Antigravity", logo: "antigravity", context: "I use Google Antigravity as part of my development toolkit." },
    { id: "gemini", name: "Gemini", logo: "gemini", context: "I use Gemini as part of my AI-assisted toolkit." },
    { id: "vscode", name: "Visual Studio Code", logo: "vscode", context: "I use Visual Studio Code in my development workflow." },
    { id: "php", name: "PHP", logo: "php", context: "Web application development for FPA Leave Management and iBaryo." },
    { id: "javascript", name: "JavaScript", logo: "javascript", context: "Front-end and application features for FPA Leave Management and iBaryo." },
    { id: "html5", name: "HTML5", logo: "html5", context: "Responsive interfaces for FPA Leave Management and iBaryo." },
    { id: "css3", name: "CSS3", logo: "css3", context: "Responsive styling for FPA Leave Management and iBaryo." },
    { id: "bootstrap", name: "Bootstrap", logo: "bootstrap", context: "Responsive UI work at BlastAsia, FPA, and on iBaryo." },
    { id: "jquery", name: "jQuery", logo: "jquery", context: "Front-end functionality in the iBaryo inventory system." },
    { id: "ajax", name: "AJAX", symbol: "flow", context: "Asynchronous application functionality in iBaryo." },
    { id: "python", name: "Python", logo: "python", context: "Part of my programming toolkit." },
    { id: "java", name: "Java", logo: "java", context: "Part of my programming toolkit." },
    { id: "csharp", name: "C#", logo: "csharp", context: "Part of my programming toolkit." },
    { id: "cplusplus", name: "C++", logo: "cplusplus", context: "Part of my programming toolkit." },
  ] },
  { id: "systems", label: "Systems / Data", skills: [
    { id: "mysql", name: "MySQL", logo: "mysql", context: "Database design for FPA leave-credit calculations and iBaryo inventory tracking." },
    { id: "sql", name: "SQL", symbol: "data", context: "Database queries and relational data work." },
    { id: "plsql", name: "PL/SQL", symbol: "data", context: "Part of my database programming toolkit." },
    { id: "active-directory", name: "Active Directory", symbol: "network", context: "Login troubleshooting and IT support during my DA-ICTS internship." },
    { id: "tcp-ip", name: "TCP/IP", symbol: "network", context: "Networking fundamentals and troubleshooting." },
    { id: "cisco", name: "Cisco", symbol: "network", context: "Routing, switching, and Cisco Packet Tracer." },
    { id: "git", name: "Git", logo: "git", context: "Version control in my development workflow." },
    { id: "github", name: "GitHub", logo: "github", context: "Development collaboration at BlastAsia and on White House Cafe Ordering." },
  ] },
  { id: "emerging", label: "Cloud / Connected Hardware", skills: [
    { id: "azure", name: "Azure", logo: "azure", context: "Microsoft Azure is part of my cloud technology toolkit." },
    { id: "oracle", name: "Oracle Cloud", logo: "oracle", context: "Oracle Cloud Infrastructure 2023 Certified Foundations Associate." },
    { id: "esp32", name: "ESP32", symbol: "chip", context: "Microcontroller integration for the AutoPet smart feeder and hydration system." },
    { id: "arduino", name: "Arduino", logo: "arduino", context: "Part of my microcontroller and embedded-systems toolkit." },
    { id: "iot", name: "IoT", symbol: "network", context: "Connected hardware and remote feeding schedules in AutoPet." },
    { id: "automation", name: "Automation", symbol: "flow", context: "Automated document routing and leave-credit workflows for FPA." },
    { id: "embedded", name: "Embedded Systems", symbol: "chip", context: "Microcontrollers and connected-device development." },
  ] },
];

export const mobileSkillGroups: SkillGroup[] = [
  { id: "mobile-build", label: "Development / AI Tools", skills: skillGroups[0].skills },
  { id: "mobile-connect", label: "Systems / Data / Connected Hardware", skills: skillGroups.slice(1).flatMap(group => group.skills) },
];
