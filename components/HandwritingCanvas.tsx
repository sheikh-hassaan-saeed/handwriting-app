"use client";

import React, { useEffect, useRef, useCallback } from "react";
import type { FontStyle, PaperStyle, InkColor } from "./Controls";
import { getRandomOffset, getLineWobble } from "@/lib/randomize";

interface HandwritingCanvasProps {
  text: string;
  font: FontStyle;
  paper: PaperStyle;
  ink: InkColor;
  fontSize: number;
  letterSpacing: number;
  seed: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const INK_COLORS: Record<InkColor, string> = {
  black: "#1a1a1a",
  blue: "#1a3a8f",
  red: "#b91c1c",
  pencil: "#6b7280",
};

const PAPER_BG: Record<PaperStyle, string> = {
  lined: "#fefefe",
  plain: "#ffffff",
  grid: "#fafafa",
  legal: "#fef9c3",
};

function drawPaper(ctx: CanvasRenderingContext2D, paper: PaperStyle, w: number, h: number) {
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
    // Red margin line
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

function wrapText(
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

function measureText(ctx: CanvasRenderingContext2D, text: string, letterSpacing: number): number {
  let width = 0;
  for (const ch of text) {
    width += ctx.measureText(ch).width + letterSpacing;
  }
  return width;
}

export default function HandwritingCanvas({
  text,
  font,
  paper,
  ink,
  fontSize,
  letterSpacing,
  seed,
  canvasRef,
}: HandwritingCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const render = useCallback(async () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Wait for the chosen font to finish loading so canvas uses the real glyph shapes
    try {
      await document.fonts.load(`${fontSize}px '${font}'`);
    } catch {
      // proceed anyway if fonts API unavailable
    }

    const dpr = window.devicePixelRatio || 1;
    const W = 794; // A4-ish width
    const MARGIN_LEFT = paper === "lined" ? 72 : paper === "legal" ? 84 : 48;
    const MARGIN_TOP = 56;
    const MARGIN_RIGHT = 40;
    const lineHeight = fontSize * 1.75;
    const maxWidth = W - MARGIN_LEFT - MARGIN_RIGHT;

    const ctx = canvas.getContext("2d")!;

    // Set font to measure
    ctx.font = `${fontSize}px '${font}', cursive`;
    const lines = wrapText(ctx, text || "Start typing to see your handwriting…", maxWidth, fontSize, letterSpacing);

    const H = Math.max(500, MARGIN_TOP + lines.length * lineHeight + 80);

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    ctx.scale(dpr, dpr);

    drawPaper(ctx, paper, W, H);

    ctx.font = `${fontSize}px '${font}', cursive`;
    ctx.textBaseline = "alphabetic";

    const inkColor = INK_COLORS[ink];
    let charIndex = 0;

    for (let li = 0; li < lines.length; li++) {
      const line = lines[li];
      const baseY = MARGIN_TOP + li * lineHeight + fontSize;
      let x = MARGIN_LEFT;

      for (let ci = 0; ci < line.length; ci++) {
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
          // Slightly rough pencil effect
          ctx.fillStyle = `rgba(100,100,110,${0.55 + Math.random() * 0.35})`;
        }

        ctx.fillText(ch, -ctx.measureText(ch).width / 2, 0);
        ctx.restore();

        x += ctx.measureText(ch).width + letterSpacing + off.x * 0.1;
        charIndex++;
      }
    }
  }, [text, font, paper, ink, fontSize, letterSpacing, seed, canvasRef]);

  useEffect(() => {
    const id = setTimeout(render, 50);
    return () => clearTimeout(id);
  }, [render]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg shadow-md border border-gray-200"
        aria-label="Handwriting preview canvas"
        role="img"
      />
    </div>
  );
}
