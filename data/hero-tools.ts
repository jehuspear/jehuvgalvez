import { skillGroups } from "@/data/skills";

const skills = skillGroups.flatMap(group => group.skills);
const selections = [
  { id: "student", label: "Foundations", skills: ["html5", "css3", "javascript", "oracle"] },
  { id: "professional", label: "Applied development", skills: ["php", "mysql", "git", "vscode"] },
  { id: "human-ai", label: "AI-assisted toolkit", skills: ["chatgpt", "codex", "gemini", "antigravity"] },
] as const;

// Narrative groupings, not claims about when each tool was first learned.
// Descriptions and logos reuse the verified technical-skills content.
export const heroTools = selections.map(phase => ({
  id: phase.id,
  label: phase.label,
  skills: phase.skills.map(id => {
    const skill = skills.find(item => item.id === id);
    if (!skill) throw new Error(`Unknown Hero skill: ${id}`);
    return skill;
  }),
}));
