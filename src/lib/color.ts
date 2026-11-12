type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
  const clean = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(clean.slice(i, i + 2), 16)) as Rgb;
}

function luminance([r, g, b]: Rgb): number {
  const [lr, lg, lb] = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }) as Rgb;
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

/** Lightens a brand colour until it reaches WCAG 3:1 contrast against the dark background. */
export function readableOnDark(hex: string, background = '#05070f', minRatio = 3): string {
  const base = hexToRgb(hex);
  const bg = hexToRgb(background);
  for (let step = 0; step <= 10; step++) {
    const t = step / 10;
    const mixed = base.map((c) => Math.round(c + (255 - c) * t)) as Rgb;
    if (contrast(mixed, bg) >= minRatio) return `rgb(${mixed.join(' ')})`;
  }
  return '#ffffff';
}
