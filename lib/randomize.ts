export interface RandomOffset {
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
}

export function getRandomOffset(seed: number, intensity: number = 1): RandomOffset {
  const r = seededRandom(seed);
  return {
    x: (r() - 0.5) * 2.5 * intensity,
    y: (r() - 0.5) * 2 * intensity,
    rotation: (r() - 0.5) * 0.08 * intensity,
    scaleX: 1 + (r() - 0.5) * 0.06 * intensity,
    scaleY: 1 + (r() - 0.5) * 0.06 * intensity,
    opacity: 0.88 + r() * 0.12,
  };
}

export function seededRandom(seed: number) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function getLineWobble(seed: number, x: number): number {
  const r = seededRandom(seed + x * 31);
  return (r() - 0.5) * 1.2;
}

export function getWordSpacing(seed: number, wordIndex: number): number {
  const r = seededRandom(seed + wordIndex * 17);
  return 1 + (r() - 0.5) * 0.3;
}

export function generateSeed(): number {
  return Math.floor(Math.random() * 999999);
}
