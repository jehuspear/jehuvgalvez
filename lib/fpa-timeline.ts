const clamp = (value: number) => Math.max(0, Math.min(1, value));
function easeBetween(progress: number, start: number, end: number) {
  const t = clamp((progress - start) / (end - start));
  return t * t * (3 - 2 * t);
}

/** Crossfade windows leave a readable hold for each part of the story. */
export function fpaTimeline(progress: number) {
  const p = clamp(progress);
  const tracking = easeBetween(p, 0.2, 0.28);
  const document = easeBetween(p, 0.43, 0.51);
  const ledger = easeBetween(p, 0.74, 0.82);
  const weights = [1 - tracking, tracking * (1 - document), document * (1 - ledger), ledger];
  return {
    progress: p,
    weights,
    workflow: easeBetween(p, 0.2, 0.42),
    documentScale: 0.9 + easeBetween(p, 0.43, 0.7) * 0.1,
    quiet: document * (1 - ledger),
    finale: easeBetween(p, 0.84, 0.96),
    loadThrough: p >= 0.62 ? 3 : p >= 0.32 ? 2 : p >= 0.1 ? 1 : 0,
  };
}
