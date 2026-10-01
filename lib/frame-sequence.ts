export function frameAtProgress(progress: number, frameCount: number): number {
  return Math.round(Math.max(0, Math.min(1, progress)) * (frameCount - 1));
}

export function frameWindow(target: number, count: number): number[] {
  // Only the first four frames are warmed on arrival. Later windows follow scroll.
  if (target === 0) return Array.from({ length: Math.min(4, count) }, (_, i) => i);
  const result = [target];
  for (let distance = 1; distance <= 2; distance++) {
    if (target + distance < count) result.push(target + distance);
    if (target - distance >= 0) result.push(target - distance);
  }
  return result;
}

type CacheOptions = {
  count: number;
  url: (index: number) => string;
  onChange: () => void;
  capacity?: number;
};

/** A sliding decode window, not a preload of the entire sequence. */
export class FrameSequenceCache {
  private frames = new Map<number, ImageBitmap>();
  private requests = new Map<number, AbortController>();
  private failed = new Set<number>();
  private wanted: number[] = [];
  private target = 0;
  private pinned = -1;
  private disposed = false;
  private capacity: number;
  private options: CacheOptions;

  constructor(options: CacheOptions) {
    this.options = options;
    this.capacity = options.capacity ?? 12;
  }

  get failureCount() { return this.failed.size; }
  get size() { return this.frames.size; }
  get(index: number) { return this.frames.get(index); }

  protect(index: number) {
    this.pinned = index;
    this.trim();
  }

  seek(target: number) {
    if (this.disposed) return;
    this.target = target;
    this.wanted = frameWindow(target, this.options.count);
    for (const [index, controller] of this.requests) {
      if (!this.wanted.includes(index)) controller.abort();
    }
    this.pump();
  }

  pause() {
    this.wanted = [];
    for (const controller of this.requests.values()) controller.abort();
  }

  dispose() {
    this.disposed = true;
    this.pause();
    for (const frame of this.frames.values()) frame.close();
    this.frames.clear();
  }

  private trim() {
    const candidates = [...this.frames.keys()]
      .filter(index => index !== this.pinned && index !== this.target)
      .sort((a, b) => Math.abs(b - this.target) - Math.abs(a - this.target));
    while (this.frames.size > this.capacity && candidates.length) {
      const index = candidates.shift()!;
      this.frames.get(index)?.close();
      this.frames.delete(index);
    }
  }

  private pump() {
    if (this.disposed) return;
    for (const index of this.wanted) {
      if (this.requests.size >= 3) break;
      if (this.frames.has(index) || this.requests.has(index) || this.failed.has(index)) continue;
      const controller = new AbortController();
      this.requests.set(index, controller);
      void this.load(index, controller);
    }
  }

  private async load(index: number, controller: AbortController) {
    try {
      const response = await fetch(this.options.url(index), { signal: controller.signal });
      if (!response.ok) throw new Error(`Frame response: ${response.status}`);
      const bitmap = await createImageBitmap(await response.blob());
      if (this.disposed || controller.signal.aborted || !this.wanted.includes(index)) {
        bitmap.close();
      } else {
        this.frames.set(index, bitmap);
        this.trim();
      }
    } catch {
      if (!controller.signal.aborted && !this.disposed) this.failed.add(index);
    } finally {
      this.requests.delete(index);
      if (!this.disposed) {
        this.options.onChange();
        this.pump();
      }
    }
  }
}
