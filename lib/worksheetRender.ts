import { measureText } from "@/lib/canvasText";

export type PaperSize = "A4" | "Letter";
export type GuidelineStyle = "solid" | "dotted" | "none";
export type LineTextMode = "solid" | "dottedTrace" | "none";

export const WORKSHEET_FONTS = {
  cursive: "Dancing Script",
  print: "Patrick Hand",
} as const;

export function paperPixelSize(size: PaperSize): { w: number; h: number } {
  return size === "A4" ? { w: 800, h: 1131 } : { w: 816, h: 1056 };
}

export async function loadCanvasFont(family: string, size: number): Promise<void> {
  try {
    await document.fonts.load(`${size}px '${family}'`);
  } catch {
    // proceed anyway if the Fonts API is unavailable
  }
}

export function drawGuideline(
  ctx: CanvasRenderingContext2D,
  x1: number,
  x2: number,
  yBaseline: number,
  fontSize: number,
  style: GuidelineStyle
) {
  if (style === "none") return;

  ctx.save();
  ctx.strokeStyle = "#9ca3af";
  ctx.lineWidth = 1;
  if (style === "dotted") ctx.setLineDash([3, 4]);
  ctx.beginPath();
  ctx.moveTo(x1, yBaseline);
  ctx.lineTo(x2, yBaseline);
  ctx.stroke();

  // Faint midline marking the x-height for letter-sizing reference
  ctx.strokeStyle = "#d1d5db";
  ctx.lineWidth = 0.75;
  ctx.setLineDash([2, 3]);
  const midY = yBaseline - fontSize * 0.55;
  ctx.beginPath();
  ctx.moveTo(x1, midY);
  ctx.lineTo(x2, midY);
  ctx.stroke();
  ctx.restore();
}

export function drawLineText(
  ctx: CanvasRenderingContext2D,
  opts: {
    x: number;
    yBaseline: number;
    maxWidth: number;
    text: string;
    font: string;
    fontSize: number;
    letterSpacing: number;
    inkColor: string;
    mode: LineTextMode;
    repeatToFill?: boolean;
  }
) {
  const { x, yBaseline, maxWidth, text, font, fontSize, letterSpacing, inkColor, mode, repeatToFill } = opts;
  if (mode === "none" || !text) return;

  ctx.save();
  ctx.font = `${fontSize}px '${font}', cursive`;
  ctx.textBaseline = "alphabetic";

  let output = text;
  if (repeatToFill) {
    const unit = text + "    ";
    const unitWidth = measureText(ctx, unit, letterSpacing);
    const repeats = Math.max(1, Math.floor(maxWidth / unitWidth));
    output = unit.repeat(repeats).trim();
  }

  if (mode === "solid") {
    ctx.fillStyle = inkColor;
    let cx = x;
    for (const ch of output) {
      ctx.fillText(ch, cx, yBaseline);
      cx += ctx.measureText(ch).width + letterSpacing;
    }
  } else if (mode === "dottedTrace") {
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([1.5, 2.5]);
    let cx = x;
    for (const ch of output) {
      ctx.strokeText(ch, cx, yBaseline);
      cx += ctx.measureText(ch).width + letterSpacing;
    }
  }
  ctx.restore();
}

export async function exportCanvasToPDF(
  canvas: HTMLCanvasElement,
  paperSize: PaperSize,
  filename: string
) {
  const { jsPDF } = await import("jspdf");
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: paperSize === "A4" ? "a4" : "letter",
  });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  pdf.addImage(imgData, "PNG", 0, 0, pageW, pageH);
  pdf.save(filename);
}
