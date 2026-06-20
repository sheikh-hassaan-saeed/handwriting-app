import { getRandomOffset, getLineWobble } from "@/lib/randomize";

export interface DrawHandwrittenTextOptions {
  ctx: CanvasRenderingContext2D;
  lines: string[];
  font: string;
  fontSize: number;
  letterSpacing: number;
  marginLeft: number;
  marginTop: number;
  lineHeight: number;
  inkColor: string;
  ink: string;
  seed: number;
  maxChars?: number;
}

export function totalCharCount(lines: string[]): number {
  return lines.reduce((sum, line) => sum + line.length, 0);
}

export function drawHandwrittenText(opts: DrawHandwrittenTextOptions): number {
  const {
    ctx,
    lines,
    font,
    fontSize,
    letterSpacing,
    marginLeft,
    marginTop,
    lineHeight,
    inkColor,
    ink,
    seed,
    maxChars = Infinity,
  } = opts;

  ctx.font = `${fontSize}px '${font}', cursive`;
  ctx.textBaseline = "alphabetic";

  let charIndex = 0;
  let drawn = 0;

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    const baseY = marginTop + li * lineHeight + fontSize;
    let x = marginLeft;

    for (let ci = 0; ci < line.length; ci++) {
      if (drawn >= maxChars) return drawn;
      const ch = line[ci];
      const off = getRandomOffset(seed + charIndex * 7 + li * 131, ink === "pencil" ? 1.6 : 1);
      const wobble = getLineWobble(seed + li * 53, ci);

      ctx.save();
      const cx = x + ctx.measureText(ch).width / 2;
      const cy = baseY + wobble;
      ctx.translate(cx + off.x, cy + off.y);
      ctx.rotate(off.rotation);
      ctx.scale(off.scaleX, off.scaleY);
      ctx.globalAlpha = off.opacity;
      ctx.fillStyle = inkColor;

      if (ink === "pencil") {
        ctx.fillStyle = `rgba(100,100,110,${0.55 + Math.random() * 0.35})`;
      }

      ctx.fillText(ch, -ctx.measureText(ch).width / 2, 0);
      ctx.restore();

      x += ctx.measureText(ch).width + letterSpacing + off.x * 0.1;
      charIndex++;
      drawn++;
    }
  }
  return drawn;
}
