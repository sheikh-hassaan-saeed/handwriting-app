export function measureText(
  ctx: CanvasRenderingContext2D,
  text: string,
  letterSpacing: number
): number {
  let width = 0;
  for (const ch of text) {
    width += ctx.measureText(ch).width + letterSpacing;
  }
  return width;
}

export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontSize: number,
  letterSpacing: number
): string[] {
  const lines: string[] = [];
  const paragraphs = text.split("\n");

  for (const para of paragraphs) {
    if (para.trim() === "") {
      lines.push("");
      continue;
    }
    const words = para.split(" ");
    let current = "";
    for (const word of words) {
      const test = current ? current + " " + word : word;
      const testWidth = measureText(ctx, test, letterSpacing);
      if (testWidth > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}
