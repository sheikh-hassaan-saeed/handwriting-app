"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  WORKSHEET_FONTS,
  paperPixelSize,
  loadCanvasFont,
  drawGuideline,
  drawLineText,
  exportCanvasToPDF,
  GuidelineStyle,
} from "@/lib/worksheetRender";

type Layout = "single" | "two" | "sentence";
type FontStyle = "print" | "cursive";

const LAYOUTS: { value: Layout; label: string }[] = [
  { value: "single", label: "Single Word per Line" },
  { value: "two", label: "Two Words per Line" },
  { value: "sentence", label: "Sentence Repeat" },
];

const GUIDELINES: { value: GuidelineStyle; label: string }[] = [
  { value: "dotted", label: "Dotted Guidelines" },
  { value: "solid", label: "Solid Guidelines" },
  { value: "none", label: "No Guidelines" },
];

function buildLines(input: string, layout: Layout): string[] {
  const cleaned = input.trim();
  if (!cleaned) return [];

  if (layout === "sentence") {
    return [cleaned.replace(/\s+/g, " ")];
  }

  const tokens = cleaned.split(/\s+/).filter(Boolean);
  if (layout === "single") {
    return tokens;
  }
  // two words per line
  const pairs: string[] = [];
  for (let i = 0; i < tokens.length; i += 2) {
    pairs.push(tokens.slice(i, i + 2).join(" "));
  }
  return pairs;
}

export default function WorksheetMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [input, setInput] = useState("Emma");
  const [layout, setLayout] = useState<Layout>("single");
  const [guideline, setGuideline] = useState<GuidelineStyle>("dotted");
  const [repetitions, setRepetitions] = useState<1 | 2 | 3>(3);
  const [fontStyle, setFontStyle] = useState<FontStyle>("print");

  const lines = useMemo(() => {
    const entries = buildLines(input, layout);
    const repeated: string[] = [];
    for (const entry of entries) {
      for (let r = 0; r < repetitions; r++) repeated.push(entry);
    }
    return repeated.slice(0, 30);
  }, [input, layout, repetitions]);

  const render = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const font = fontStyle === "cursive" ? WORKSHEET_FONTS.cursive : WORKSHEET_FONTS.print;
    const { w, h } = paperPixelSize("A4");
    const marginTop = 110;
    const marginBottom = 60;
    const marginLeft = 55;
    const marginRight = 45;
    const maxWidth = w - marginLeft - marginRight;
    const totalLines = Math.max(lines.length, 1);
    const availableHeight = h - marginTop - marginBottom;
    const lineGap = availableHeight / totalLines;
    const fontSize = Math.min(48, Math.max(14, lineGap * 0.5));

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

    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#374151";
    ctx.fillText("Name:", marginLeft, 40);
    ctx.strokeStyle = "#9ca3af";
    ctx.beginPath();
    ctx.moveTo(marginLeft + 55, 42);
    ctx.lineTo(w - marginRight, 42);
    ctx.stroke();

    lines.forEach((line, i) => {
      const yBaseline = marginTop + i * lineGap;
      drawGuideline(ctx, marginLeft, w - marginRight, yBaseline, fontSize, guideline);
      drawLineText(ctx, {
        x: marginLeft,
        yBaseline,
        maxWidth,
        text: line,
        font,
        fontSize,
        letterSpacing: 3,
        inkColor: "#1a1a1a",
        mode: "solid",
        repeatToFill: false,
      });
    });
  }, [lines, fontStyle, guideline]);

  useEffect(() => {
    const id = setTimeout(render, 50);
    return () => clearTimeout(id);
  }, [render]);

  const handleDownloadPDF = useCallback(async () => {
    if (!canvasRef.current) return;
    await exportCanvasToPDF(canvasRef.current, "A4", "handwriting-worksheet.pdf");
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <aside
        className="w-full lg:w-80 flex-shrink-0 bg-white rounded-2xl shadow border border-gray-100 p-5"
        aria-label="Worksheet maker controls"
      >
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name, Word List, or Sentence
            </label>
            <textarea
              className="w-full h-24 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
              placeholder="Enter a child's name, a word list, or a sentence…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Name, word list, or sentence for the worksheet"
            />
            <p className="text-xs text-gray-400 mt-1">
              Tip: type a child&apos;s name for instant name-tracing practice.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Layout</label>
            <div className="grid grid-cols-1 gap-2">
              {LAYOUTS.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLayout(l.value)}
                  aria-pressed={layout === l.value}
                  className={`text-left px-3 py-2 rounded-lg border text-sm transition-all ${
                    layout === l.value
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                      : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Guideline Style
            </label>
            <div className="grid grid-cols-1 gap-2">
              {GUIDELINES.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGuideline(g.value)}
                  aria-pressed={guideline === g.value}
                  className={`text-left px-3 py-2 rounded-lg border text-sm transition-all ${
                    guideline === g.value
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                      : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Repetitions per Word/Line
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  onClick={() => setRepetitions(n as 1 | 2 | 3)}
                  aria-pressed={repetitions === n}
                  className={`px-2 py-2 rounded-lg border text-sm transition-all ${
                    repetitions === n
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">Font Style</label>
            <div className="grid grid-cols-2 gap-2">
              {(["print", "cursive"] as FontStyle[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFontStyle(f)}
                  aria-pressed={fontStyle === f}
                  className={`px-3 py-2 rounded-lg border text-sm capitalize transition-all ${
                    fontStyle === f
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                      : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors"
            aria-label="Download worksheet as PDF"
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
          aria-label="Handwriting worksheet preview"
          role="img"
        />
      </div>
    </div>
  );
}
