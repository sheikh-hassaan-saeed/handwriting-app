"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  WORKSHEET_FONTS,
  paperPixelSize,
  loadCanvasFont,
  drawGuideline,
  drawLineText,
  exportCanvasToPDF,
  PaperSize,
} from "@/lib/worksheetRender";

type SheetStyle = "cursive" | "print" | "dotted" | "blank";
type LineSpacing = "narrow" | "wide";

const PRESETS: { label: string; value: string }[] = [
  { label: "Alphabet (lowercase)", value: "abcdefghijklmnopqrstuvwxyz" },
  { label: "Alphabet (uppercase)", value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
  { label: "Numbers 0-9", value: "0123456789" },
  { label: "Common Words", value: "the and is you that it he was for on are" },
  { label: "Pangram", value: "The quick brown fox jumps over the lazy dog" },
];

const STYLES: { value: SheetStyle; label: string }[] = [
  { value: "cursive", label: "Cursive" },
  { value: "print", label: "Print" },
  { value: "dotted", label: "Dotted Trace" },
  { value: "blank", label: "Blank Lines" },
];

export default function PracticeSheetGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog");
  const [style, setStyle] = useState<SheetStyle>("dotted");
  const [lineCount, setLineCount] = useState<5 | 10 | 15 | 20>(10);
  const [spacing, setSpacing] = useState<LineSpacing>("wide");
  const [paperSize, setPaperSize] = useState<PaperSize>("A4");

  const render = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const font = style === "cursive" ? WORKSHEET_FONTS.cursive : WORKSHEET_FONTS.print;
    const { w, h } = paperPixelSize(paperSize);
    const marginTop = 110;
    const marginBottom = 60;
    const marginLeft = 55;
    const marginRight = 45;
    const maxWidth = w - marginLeft - marginRight;
    const availableHeight = h - marginTop - marginBottom;
    const lineGap = availableHeight / lineCount;
    const fontSize = Math.min(48, Math.max(14, lineGap * (spacing === "narrow" ? 0.6 : 0.44)));

    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    await loadCanvasFont(font, fontSize);

    // Header: Name / Date fields, standard on printable practice sheets
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#374151";
    ctx.fillText("Name:", marginLeft, 40);
    ctx.strokeStyle = "#9ca3af";
    ctx.beginPath();
    ctx.moveTo(marginLeft + 55, 42);
    ctx.lineTo(marginLeft + 260, 42);
    ctx.stroke();
    ctx.fillText("Date:", marginLeft + 290, 40);
    ctx.beginPath();
    ctx.moveTo(marginLeft + 335, 42);
    ctx.lineTo(w - marginRight, 42);
    ctx.stroke();

    for (let i = 0; i < lineCount; i++) {
      const yBaseline = marginTop + i * lineGap;
      drawGuideline(ctx, marginLeft, w - marginRight, yBaseline, fontSize, "solid");

      if (style !== "blank") {
        drawLineText(ctx, {
          x: marginLeft,
          yBaseline,
          maxWidth,
          text: text || "abcdefghijklmnopqrstuvwxyz",
          font,
          fontSize,
          letterSpacing: 3,
          inkColor: "#1a1a1a",
          mode: style === "dotted" ? "dottedTrace" : "solid",
          repeatToFill: true,
        });
      }
    }
  }, [text, style, lineCount, spacing, paperSize]);

  useEffect(() => {
    const id = setTimeout(render, 50);
    return () => clearTimeout(id);
  }, [render]);

  const handleDownloadPDF = useCallback(async () => {
    if (!canvasRef.current) return;
    await exportCanvasToPDF(canvasRef.current, paperSize, "handwriting-practice-sheet.pdf");
  }, [paperSize]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <aside
        className="w-full lg:w-80 flex-shrink-0 bg-white rounded-2xl shadow border border-gray-100 p-5"
        aria-label="Practice sheet controls"
      >
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Custom Text
            </label>
            <textarea
              className="w-full h-24 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
              placeholder="Type any word, sentence, or word list…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              aria-label="Custom text for practice sheet"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Or Choose a Preset
            </label>
            <div className="grid grid-cols-1 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setText(p.value)}
                  className="text-left px-3 py-2 rounded-lg border border-gray-200 hover:border-indigo-300 bg-white text-gray-700 text-sm transition-all"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sheet Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {STYLES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStyle(s.value)}
                  aria-pressed={style === s.value}
                  className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                    style === s.value
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                      : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Lines
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map((n) => (
                <button
                  key={n}
                  onClick={() => setLineCount(n as 5 | 10 | 15 | 20)}
                  aria-pressed={lineCount === n}
                  className={`px-2 py-2 rounded-lg border text-sm transition-all ${
                    lineCount === n
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                      : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Line Spacing
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["narrow", "wide"] as LineSpacing[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpacing(s)}
                  aria-pressed={spacing === s}
                  className={`px-3 py-2 rounded-lg border text-sm capitalize transition-all ${
                    spacing === s
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                      : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Paper Size
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["A4", "Letter"] as PaperSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setPaperSize(s)}
                  aria-pressed={paperSize === s}
                  className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                    paperSize === s
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                      : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors"
            aria-label="Download practice sheet as PDF"
          >
            ↓ Download PDF
          </button>
        </div>
      </aside>

      <div className="flex-1 bg-white rounded-2xl shadow border border-gray-100 p-4 min-h-[500px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Live Preview
          </span>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full rounded-lg shadow-md border border-gray-200"
          aria-label="Handwriting practice sheet preview"
          role="img"
        />
      </div>
    </div>
  );
}
