"use client";

import React, { useEffect, useRef, useCallback } from "react";
import type { FontStyle, PaperStyle, InkColor } from "./Controls";
import { INK_COLORS, drawPaper } from "@/lib/handwritingStyles";
import { wrapText } from "@/lib/canvasText";
import { drawHandwrittenText } from "@/lib/handwritingRender";

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

    drawHandwrittenText({
      ctx,
      lines,
      font,
      fontSize,
      letterSpacing,
      marginLeft: MARGIN_LEFT,
      marginTop: MARGIN_TOP,
      lineHeight,
      inkColor: INK_COLORS[ink],
      ink,
      seed,
    });
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
