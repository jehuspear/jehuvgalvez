/** Preserve the existing sequence distance, then hold the last frame for 80% of a viewport. */
export function heroTimeline(scroll: number, total: number, stageHeight: number, hasIntro: boolean) {
  const hold = hasIntro ? stageHeight * 0.8 : 0;
  const sequenceDistance = Math.max(1, total - hold);
  const clamp = (value: number) => Math.max(0, Math.min(1, value));
  return { progress: clamp(scroll / sequenceDistance), handoff: hold ? clamp((scroll - sequenceDistance) / hold) : 0 };
}
