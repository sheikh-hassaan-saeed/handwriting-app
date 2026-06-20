export type FontStyle =
  | "Caveat"
  | "Homemade Apple"
  | "Patrick Hand"
  | "Dancing Script"
  | "Architects Daughter";

export type PaperStyle = "lined" | "plain" | "grid" | "legal";
export type InkColor = "black" | "blue" | "red" | "pencil";

export const FONTS: { value: FontStyle; label: string }[] = [
  { value: "Caveat", label: "Classic Cursive" },
  { value: "Homemade Apple", label: "Doctor Scrawl" },
  { value: "Patrick Hand", label: "Neat Print" },
  { value: "Dancing Script", label: "Left-Handed Slant" },
  { value: "Architects Daughter", label: "Messy Student" },
];

export const PAPERS: { value: PaperStyle; label: string }[] = [
  { value: "lined", label: "Lined Notebook" },
  { value: "plain", label: "Plain White" },
  { value: "grid", label: "Grid Paper" },
  { value: "legal", label: "Yellow Legal Pad" },
];

export const INKS: { value: InkColor; label: string; color: string }[] = [
  { value: "black", label: "Black", color: "#1a1a1a" },
  { value: "blue", label: "Blue", color: "#1a3a8f" },
  { value: "red", label: "Red", color: "#b91c1c" },
  { value: "pencil", label: "Pencil", color: "#6b7280" },
];

export const INK_COLORS: Record<InkColor, string> = {
  black: "#1a1a1a",
  blue: "#1a3a8f",
  red: "#b91c1c",
  pencil: "#6b7280",
};

export const PAPER_BG: Record<PaperStyle, string> = {
  lined: "#fefefe",
  plain: "#ffffff",
  grid: "#fafafa",
  legal: "#fef9c3",
};

export function drawPaper(
  ctx: CanvasRenderingContext2D,
  paper: PaperStyle,
  w: number,
  h: number
) {
  ctx.fillStyle = PAPER_BG[paper];
  ctx.fillRect(0, 0, w, h);

  if (paper === "lined") {
    const lineSpacing = 36;
    ctx.strokeStyle = "#bfdbfe";
    ctx.lineWidth = 0.8;
    for (let y = 60; y < h; y += lineSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.strokeStyle = "#fca5a5";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(58, 0);
    ctx.lineTo(58, h);
    ctx.stroke();
  } else if (paper === "grid") {
    const gridSize = 24;
    ctx.strokeStyle = "#d1fae5";
    ctx.lineWidth = 0.6;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  } else if (paper === "legal") {
    const lineSpacing = 36;
    ctx.strokeStyle = "#fde68a";
    ctx.lineWidth = 0.9;
    for (let y = 60; y < h; y += lineSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.strokeStyle = "#f87171";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(70, 0);
    ctx.lineTo(70, h);
    ctx.stroke();
  }
}
