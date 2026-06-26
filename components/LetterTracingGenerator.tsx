"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { paperPixelSize, PaperSize, loadCanvasFont } from "@/lib/worksheetRender";

const EMOJI_MAP: Record<string, { emoji: string; word: string }> = {
  A: { emoji: "🍎", word: "Apple" },
  B: { emoji: "🎈", word: "Balloon" },
  C: { emoji: "🐱", word: "Cat" },
  D: { emoji: "🐶", word: "Dog" },
  E: { emoji: "🥚", word: "Egg" },
  F: { emoji: "🐟", word: "Fish" },
  G: { emoji: "🍇", word: "Grapes" },
  H: { emoji: "🎩", word: "Hat" },
  I: { emoji: "🍦", word: "Ice Cream" },
  J: { emoji: "🏺", word: "Jar" },
  K: { emoji: "🔑", word: "Key" },
  L: { emoji: "🍋", word: "Lemon" },
  M: { emoji: "🌙", word: "Moon" },
  N: { emoji: "🔩", word: "Nut" },
  O: { emoji: "🍊", word: "Orange" },
  P: { emoji: "✏️", word: "Pencil" },
  Q: { emoji: "👑", word: "Queen" },
  R: { emoji: "🚀", word: "Rocket" },
  S: { emoji: "☀️", word: "Sun" },
  T: { emoji: "🌲", word: "Tree" },
  U: { emoji: "☂️", word: "Umbrella" },
  V: { emoji: "🎻", word: "Violin" },
  W: { emoji: "🍉", word: "Watermelon" },
  X: { emoji: "❌", word: "Xylophone" },
  Y: { emoji: "🧶", word: "Yarn" },
  Z: { emoji: "🦓", word: "Zebra" },
};

type TraceLetterStyle = "dotted" | "outline" | "solid";
type TextCase = "normal" | "uppercase" | "lowercase";
type TracingFont = "Patrick Hand" | "Dancing Script";

export default function LetterTracingGenerator({ defaultName }: { defaultName?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inputText, setInputText] = useState(defaultName || "Emma");
  const [fontFamily, setFontFamily] = useState<TracingFont>("Patrick Hand");
  const [letterStyle, setLetterStyle] = useState<TraceLetterStyle>("dotted");
  const [textCase, setTextCase] = useState<TextCase>("normal");
  const [showArrows, setShowArrows] = useState(true);
  const [pictureSupport, setPictureSupport] = useState(true);
  const [firstLetterSolid, setFirstLetterSolid] = useState(true);
  const [lineCount, setLineCount] = useState<number>(8);
  const [paperSize, setPaperSize] = useState<PaperSize>("A4");

  // Simple stroke start points mapping for letters to draw helper green start dots
  const drawStartDots = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    fontSize: number,
    char: string
  ) => {
    if (!showArrows || char === " ") return;
    ctx.save();
    // Green dot where child should start writing the letter
    ctx.fillStyle = "#10b981"; // green start dot
    ctx.beginPath();
    ctx.arc(x + 4, y - fontSize * 0.7, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Small red dot for secondary stroke start
    if ("AEFGHIJMNQTUWY".includes(char.toUpperCase())) {
      ctx.fillStyle = "#ef4444"; // red secondary start
      ctx.beginPath();
      ctx.arc(x + fontSize * 0.4, y - fontSize * 0.7, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }, [showArrows]);

  const drawTracingWorksheet = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const baseSize = paperPixelSize(paperSize);
    const w = baseSize.w;
    const h = baseSize.h;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    // Background white
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    // Grid details
    const marginTop = pictureSupport ? 220 : 120;
    const marginBottom = 65;
    const marginLeft = 55;
    const marginRight = 45;
    const maxWidth = w - marginLeft - marginRight;
    const availableHeight = h - marginTop - marginBottom;
    const lineGap = availableHeight / lineCount;
    const fontSize = Math.min(52, lineGap * 0.55);

    // Load fonts
    await loadCanvasFont(fontFamily, fontSize);

    // 1. Draw Name Box at the top
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#374151";
    ctx.fillText("Name:", marginLeft, 40);
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(marginLeft + 55, 42);
    ctx.lineTo(marginLeft + 260, 42);
    ctx.stroke();

    ctx.fillText("Date:", marginLeft + 295, 40);
    ctx.beginPath();
    ctx.moveTo(marginLeft + 340, 42);
    ctx.lineTo(w - marginRight, 42);
    ctx.stroke();

    // 2. Picture Support banner (top center)
    const firstChar = inputText.trim() ? inputText.trim()[0].toUpperCase() : "A";
    const mapping = EMOJI_MAP[firstChar] || { emoji: "✏️", word: "Writing" };

    if (pictureSupport) {
      // Draw outer box for the picture guide
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(marginLeft, 65, w - marginLeft - marginRight, 120);
      ctx.strokeStyle = "#e5e7eb";
      ctx.strokeRect(marginLeft, 65, w - marginLeft - marginRight, 120);

      // Draw large Emoji
      ctx.font = "72px sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText(mapping.emoji, marginLeft + 30, 125);

      // Label text
      ctx.fillStyle = "#1f2937";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText(`${firstChar} is for ${mapping.word}`, marginLeft + 130, 125);

      // Draw giant letters for tracing template at top right
      ctx.fillStyle = "#d1d5db";
      ctx.font = `bold 82px '${fontFamily}', cursive`;
      ctx.fillText(`${firstChar}${firstChar.toLowerCase()}`, w - marginRight - 160, 125);
    }

    // Prepare line text
    let display = inputText || "ABC";
    if (textCase === "uppercase") display = display.toUpperCase();
    if (textCase === "lowercase") display = display.toLowerCase();

    // Draw rows
    for (let i = 0; i < lineCount; i++) {
      const yBaseline = marginTop + i * lineGap;

      // Draw red/blue handwriting guidelines
      ctx.save();
      // Baseline (blue)
      ctx.strokeStyle = "#93c5fd";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(marginLeft, yBaseline);
      ctx.lineTo(w - marginRight, yBaseline);
      ctx.stroke();

      // Top line (red)
      ctx.strokeStyle = "#fca5a5";
      ctx.beginPath();
      ctx.moveTo(marginLeft, yBaseline - fontSize * 0.85);
      ctx.lineTo(w - marginRight, yBaseline - fontSize * 0.85);
      ctx.stroke();

      // Mid dashed line (grey)
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(marginLeft, yBaseline - fontSize * 0.44);
      ctx.lineTo(w - marginRight, yBaseline - fontSize * 0.44);
      ctx.stroke();
      ctx.restore();

      // Draw text content
      ctx.font = `${fontSize}px '${fontFamily}', cursive`;
      ctx.textBaseline = "alphabetic";

      // Fill line repeat to max width
      const unit = display + "   ";
      ctx.font = `${fontSize}px '${fontFamily}', cursive`;
      let textLine = unit;
      while (ctx.measureText(textLine + unit).width < maxWidth) {
        textLine += unit;
      }
      textLine = textLine.trim();

      let cx = marginLeft;
      const spacing = 3.5;

      for (let c = 0; c < textLine.length; c++) {
        const char = textLine[c];
        const isFirst = c === 0;

        ctx.save();
        if (isFirst && firstLetterSolid) {
          // first character is solid for reference
          ctx.fillStyle = "#374151";
          ctx.fillText(char, cx, yBaseline);
        } else {
          // Tracing style
          if (letterStyle === "dotted") {
            ctx.strokeStyle = "#9ca3af";
            ctx.lineWidth = 1.2;
            ctx.setLineDash([1.5, 2.5]);
            ctx.strokeText(char, cx, yBaseline);
          } else if (letterStyle === "outline") {
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 0.8;
            ctx.strokeText(char, cx, yBaseline);
          } else {
            // solid faint grey
            ctx.fillStyle = "#e2e8f0";
            ctx.fillText(char, cx, yBaseline);
          }
        }
        ctx.restore();

        // Draw helper arrows start dots
        if (!isFirst || !firstLetterSolid) {
          drawStartDots(ctx, cx, yBaseline, fontSize, char);
        }

        cx += ctx.measureText(char).width + spacing;
      }
    }
  }, [inputText, fontFamily, letterStyle, textCase, pictureSupport, firstLetterSolid, lineCount, paperSize, drawStartDots]);

  useEffect(() => {
    const id = setTimeout(drawTracingWorksheet, 50);
    return () => clearTimeout(id);
  }, [drawTracingWorksheet]);

  const handleDownloadPDF = async () => {
    if (!canvasRef.current) return;
    const baseSize = paperPixelSize(paperSize);
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: paperSize === "A4" ? "a4" : "letter",
    });

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = baseSize.w;
    tempCanvas.height = baseSize.h;
    const tempCtx = tempCanvas.getContext("2d")!;
    tempCtx.fillStyle = "#ffffff";
    tempCtx.fillRect(0, 0, baseSize.w, baseSize.h);

    // Call draw logic directly on temporary clean canvas context
    const firstChar = inputText.trim() ? inputText.trim()[0].toUpperCase() : "A";
    const mapping = EMOJI_MAP[firstChar] || { emoji: "✏️", word: "Writing" };
    const marginTop = pictureSupport ? 220 : 120;
    const marginBottom = 65;
    const marginLeft = 55;
    const marginRight = 45;
    const maxWidth = baseSize.w - marginLeft - marginRight;
    const availableHeight = baseSize.h - marginTop - marginBottom;
    const lineGap = availableHeight / lineCount;
    const fontSize = Math.min(52, lineGap * 0.55);

    await loadCanvasFont(fontFamily, fontSize);

    // Draw header labels
    tempCtx.font = "bold 16px sans-serif";
    tempCtx.fillStyle = "#374151";
    tempCtx.fillText("Name:", marginLeft, 40);
    tempCtx.strokeStyle = "#9ca3af";
    tempCtx.beginPath();
    tempCtx.moveTo(marginLeft + 55, 42);
    tempCtx.lineTo(marginLeft + 260, 42);
    tempCtx.stroke();
    tempCtx.fillText("Date:", marginLeft + 295, 40);
    tempCtx.beginPath();
    tempCtx.moveTo(marginLeft + 340, 42);
    tempCtx.lineTo(baseSize.w - marginRight, 42);
    tempCtx.stroke();

    if (pictureSupport) {
      tempCtx.fillStyle = "#f3f4f6";
      tempCtx.fillRect(marginLeft, 65, baseSize.w - marginLeft - marginRight, 120);
      tempCtx.strokeStyle = "#e5e7eb";
      tempCtx.strokeRect(marginLeft, 65, baseSize.w - marginLeft - marginRight, 120);
      tempCtx.font = "72px sans-serif";
      tempCtx.textBaseline = "middle";
      tempCtx.fillText(mapping.emoji, marginLeft + 30, 125);
      tempCtx.fillStyle = "#1f2937";
      tempCtx.font = "bold 24px sans-serif";
      tempCtx.fillText(`${firstChar} is for ${mapping.word}`, marginLeft + 130, 125);
      tempCtx.fillStyle = "#d1d5db";
      tempCtx.font = `bold 82px '${fontFamily}', cursive`;
      tempCtx.fillText(`${firstChar}${firstChar.toLowerCase()}`, baseSize.w - marginRight - 160, 125);
    }

    let display = inputText || "Emma";
    if (textCase === "uppercase") display = display.toUpperCase();
    if (textCase === "lowercase") display = display.toLowerCase();

    for (let i = 0; i < lineCount; i++) {
      const yBaseline = marginTop + i * lineGap;

      tempCtx.save();
      tempCtx.strokeStyle = "#93c5fd";
      tempCtx.lineWidth = 1.2;
      tempCtx.beginPath();
      tempCtx.moveTo(marginLeft, yBaseline);
      tempCtx.lineTo(baseSize.w - marginRight, yBaseline);
      tempCtx.stroke();
      tempCtx.strokeStyle = "#fca5a5";
      tempCtx.beginPath();
      tempCtx.moveTo(marginLeft, yBaseline - fontSize * 0.85);
      tempCtx.lineTo(baseSize.w - marginRight, yBaseline - fontSize * 0.85);
      tempCtx.stroke();
      tempCtx.strokeStyle = "#cbd5e1";
      tempCtx.lineWidth = 0.8;
      tempCtx.setLineDash([3, 4]);
      tempCtx.beginPath();
      tempCtx.moveTo(marginLeft, yBaseline - fontSize * 0.44);
      tempCtx.lineTo(baseSize.w - marginRight, yBaseline - fontSize * 0.44);
      tempCtx.stroke();
      tempCtx.restore();

      tempCtx.font = `${fontSize}px '${fontFamily}', cursive`;
      tempCtx.textBaseline = "alphabetic";

      const unit = display + "   ";
      let textLine = unit;
      while (tempCtx.measureText(textLine + unit).width < maxWidth) {
        textLine += unit;
      }
      textLine = textLine.trim();

      let cx = marginLeft;
      const spacing = 3.5;

      for (let c = 0; c < textLine.length; c++) {
        const char = textLine[c];
        const isFirst = c === 0;

        tempCtx.save();
        if (isFirst && firstLetterSolid) {
          tempCtx.fillStyle = "#374151";
          tempCtx.fillText(char, cx, yBaseline);
        } else {
          if (letterStyle === "dotted") {
            tempCtx.strokeStyle = "#9ca3af";
            tempCtx.lineWidth = 1.2;
            tempCtx.setLineDash([1.5, 2.5]);
            tempCtx.strokeText(char, cx, yBaseline);
          } else if (letterStyle === "outline") {
            tempCtx.strokeStyle = "#cbd5e1";
            tempCtx.lineWidth = 0.8;
            tempCtx.strokeText(char, cx, yBaseline);
          } else {
            tempCtx.fillStyle = "#e2e8f0";
            tempCtx.fillText(char, cx, yBaseline);
          }
        }
        tempCtx.restore();

        if (!isFirst || !firstLetterSolid) {
          if (showArrows && char !== " ") {
            tempCtx.save();
            tempCtx.fillStyle = "#10b981";
            tempCtx.beginPath();
            tempCtx.arc(cx + 4, yBaseline - fontSize * 0.7, 3.5, 0, Math.PI * 2);
            tempCtx.fill();
            if ("AEFGHIJMNQTUWY".includes(char.toUpperCase())) {
              tempCtx.fillStyle = "#ef4444";
              tempCtx.beginPath();
              tempCtx.arc(cx + fontSize * 0.4, yBaseline - fontSize * 0.7, 2.5, 0, Math.PI * 2);
              tempCtx.fill();
            }
            tempCtx.restore();
          }
        }
        cx += tempCtx.measureText(char).width + spacing;
      }
    }

    const imgData = tempCanvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, baseSize.w, baseSize.h);
    pdf.save(`letter-tracing-${inputText.toLowerCase() || "worksheet"}.pdf`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar Controls */}
      <aside className="w-full lg:w-80 flex-shrink-0 bg-white rounded-2xl shadow border border-gray-100 p-5">
        <div className="flex flex-col gap-5">
          {/* Custom text name input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Child&apos;s Name / Text
            </label>
            <input
              type="text"
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="e.g. Emma"
              maxLength={24}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">
              Supports letters, names, and words up to 24 characters.
            </p>
          </div>

          {/* Preset shortcuts */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">Preset Quick Lists</label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setInputText("ABC")}
                className="py-1 px-2 text-xs border border-gray-200 hover:border-indigo-300 rounded bg-gray-50 text-gray-700"
              >
                A B C
              </button>
              <button
                onClick={() => setInputText("123")}
                className="py-1 px-2 text-xs border border-gray-200 hover:border-indigo-300 rounded bg-gray-50 text-gray-700"
              >
                1 2 3
              </button>
              <button
                onClick={() => setInputText("Trace")}
                className="py-1 px-2 text-xs border border-gray-200 hover:border-indigo-300 rounded bg-gray-50 text-gray-700"
              >
                Trace Name
              </button>
              <button
                onClick={() => setInputText("Cursive")}
                className="py-1 px-2 text-xs border border-gray-200 hover:border-indigo-300 rounded bg-gray-50 text-gray-700"
              >
                Cursive Presets
              </button>
            </div>
          </div>

          {/* Handwriting Font Style */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Font Style</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFontFamily("Patrick Hand")}
                className={`py-2 px-3 border text-sm rounded-lg transition-all ${
                  fontFamily === "Patrick Hand"
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                    : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                }`}
              >
                Standard Print
              </button>
              <button
                onClick={() => setFontFamily("Dancing Script")}
                className={`py-2 px-3 border text-sm rounded-lg transition-all ${
                  fontFamily === "Dancing Script"
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                    : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                }`}
              >
                Cursive Script
              </button>
            </div>
          </div>

          {/* Letter style */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tracing Letter Style</label>
            <div className="grid grid-cols-3 gap-2">
              {(["dotted", "outline", "solid"] as TraceLetterStyle[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setLetterStyle(s)}
                  className={`py-1.5 px-1 border text-xs capitalize rounded-lg transition-all ${
                    letterStyle === s
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                      : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Text Casing */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Letter Case</label>
            <div className="grid grid-cols-3 gap-2">
              {(["normal", "uppercase", "lowercase"] as TextCase[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setTextCase(c)}
                  className={`py-1.5 px-1 border text-xs capitalize rounded-lg transition-all ${
                    textCase === c
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                      : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                  }`}
                >
                  {c === "normal" ? "As Entered" : c === "uppercase" ? "ALL CAPS" : "all lower"}
                </button>
              ))}
            </div>
          </div>

          {/* Options checkboxes */}
          <div className="border-t border-gray-100 pt-3 flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Worksheet Options</h4>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="pictureSupport"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                checked={pictureSupport}
                onChange={(e) => setPictureSupport(e.target.checked)}
              />
              <label htmlFor="pictureSupport" className="text-xs font-semibold text-gray-600 cursor-pointer">
                Show Picture Emoji & Guide (Top)
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="firstLetterSolid"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                checked={firstLetterSolid}
                onChange={(e) => setFirstLetterSolid(e.target.checked)}
              />
              <label htmlFor="firstLetterSolid" className="text-xs font-semibold text-gray-600 cursor-pointer">
                First Letter of Row Solid
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showArrows"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                checked={showArrows}
                onChange={(e) => setShowArrows(e.target.checked)}
              />
              <label htmlFor="showArrows" className="text-xs font-semibold text-gray-600 cursor-pointer">
                Show Start Guide Dots
              </label>
            </div>
          </div>

          {/* Line count */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Rows</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white"
              value={lineCount}
              onChange={(e) => setLineCount(parseInt(e.target.value))}
            >
              {[5, 6, 8, 10, 12].map((n) => (
                <option key={n} value={n}>
                  {n} Rows
                </option>
              ))}
            </select>
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Paper Format</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white"
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value as PaperSize)}
            >
              <option value="A4">A4 (800 x 1130 pt)</option>
              <option value="Letter">Letter (816 x 1056 pt)</option>
            </select>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm mt-1"
          >
            ↓ Download Printable PDF
          </button>
        </div>
      </aside>

      {/* Canvas workspace area */}
      <div className="flex-1 bg-white rounded-2xl shadow border border-gray-100 p-5 flex flex-col items-center">
        <span className="self-start text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
          Worksheet Live Preview
        </span>
        <div className="w-full max-w-xl border border-gray-200 rounded-xl shadow-inner bg-gray-50 p-4">
          <canvas ref={canvasRef} className="w-full bg-white shadow-lg border border-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
