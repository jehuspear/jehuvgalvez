/** Map the displayed source frame, including sparse mobile sampling, to its narrative beat. */
export function heroPhaseAtFrame(sourceFrame: number, starts: { professional: number; "human-ai": number }) {
  if (sourceFrame >= starts["human-ai"]) return "human-ai";
  if (sourceFrame >= starts.professional) return "professional";
  return "student";
}
