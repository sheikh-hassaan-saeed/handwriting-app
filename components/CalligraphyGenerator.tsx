"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { paperPixelSize, PaperSize, loadCanvasFont } from "@/lib/worksheetRender";

type CalligraphyPreset = "copperplate" | "spencerian" | "italic" | "modern" | "brush";

const DRILL_PRESETS = [
  { label: "Basic Warm-Up Strokes", value: "//// //// oooo oooo uuuu uuuu nnnn nnnn" },
  { label: "Lowercase Alphabet (a-z)", value: "a b c d e f g h i j k l m n o p q r s t u v w x y z" },
  { label: "Uppercase Alphabet (A-Z)", value: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z" },
  { label: "Calligraphy Pangram", value: "The quick brown fox jumps over the lazy dog" },
  { label: "Focus word 'minimum'", value: "minimum minimum minimum minimum minimum" },
];

export default function CalligraphyGenerator({ defaultPreset }: { defaultPreset?: CalligraphyPreset }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stylePreset, setStylePreset] = useState<CalligraphyPreset>(defaultPreset || "copperplate");
  const [inputText, setInputText] = useState("minimum minimum minimum");
  const [slantAngle, setSlantAngle] = useState(55); // slant angle from horizontal (52, 55, 75, etc.)
  const [xHeight, setXHeight] = useState(24); // height of letters like 'a', 'o'
  const [ratioStr, setRatioStr] = useState("2:1:2"); // ascender : x-height : descender
  const [guidelineColor] = useState("#e5e7eb"); // light grey
  const [slantLineColor, setSlantLineColor] = useState("#fee2e2"); // very light red/pink slant guides
  const [textOpacity, setTextOpacity] = useState(0.3); // transparent for tracing over
  const [paperSize] = useState<PaperSize>("A4");
  const [showSlantLines, setShowSlantLines] = useState(true);

  // Sync settings based on presets
  useEffect(() => {
    if (stylePreset === "copperplate") {
      setSlantAngle(55);
      setXHeight(22);
      setRatioStr("2:1:2");
      setSlantLineColor("#fee2e2"); // faint pink
      setTextOpacity(0.35);
    } else if (stylePreset === "spencerian") {
      setSlantAngle(52);
      setXHeight(18);
      setRatioStr("3:1:3");
      setSlantLineColor("#fee2e2");
      setTextOpacity(0.25);
    } else if (stylePreset === "italic") {
      setSlantAngle(78);
      setXHeight(26);
      setRatioStr("1:1:1");
      setSlantLineColor("#eff6ff"); // faint blue
      setTextOpacity(0.4);
    } else if (stylePreset === "modern") {
      setSlantAngle(60);
      setXHeight(30);
      setRatioStr("1.5:1:1.5");
      setSlantLineColor("#f5f3ff"); // faint purple
      setTextOpacity(0.3);
    } else if (stylePreset === "brush") {
      setSlantAngle(90); // vertical
      setXHeight(32);
      setRatioStr("1:1:1");
      setSlantLineColor("#f3f4f6");
      setTextOpacity(0.4);
    }
  }, [stylePreset]);

  // Decode Ratio String e.g. "2:1:2" -> multipliers for ascender and descender
  const getRatios = useCallback((): { asc: number; desc: number } => {
    try {
      const parts = ratioStr.split(":").map(parseFloat);
      if (parts.length === 3) {
        return {
          asc: parts[0] / parts[1],
          desc: parts[2] / parts[1],
        };
      }
    } catch {
      // fallback
    }
    return { asc: 2, desc: 2 };
  }, [ratioStr]);

  const drawCalligraphyWorksheet = useCallback(async () => {
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

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    // Font selection based on preset
    let fontFamily = "Dancing Script";
    if (stylePreset === "copperplate") fontFamily = "Great Vibes";
    if (stylePreset === "spencerian") fontFamily = "Monsieur La Doulaise";
    if (stylePreset === "italic") fontFamily = "Playball";
    if (stylePreset === "brush") fontFamily = "Homemade Apple";

    // Load Font
    await loadCanvasFont(fontFamily, xHeight * 1.8);

    // Name header
    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = "#6b7280";
    ctx.fillText("CALLIGRAPHY PRACTICE WORKSHEET", 50, 45);
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, 58);
    ctx.lineTo(w - 50, 58);
    ctx.stroke();

    // Ratios and spacing
    const ratios = getRatios();
    const ascenderH = xHeight * ratios.asc;
    const descenderH = xHeight * ratios.desc;
    const totalRowHeight = ascenderH + xHeight + descenderH;
    const rowGap = 36;

    const startY = 90;
    const startX = 50;
    const endX = w - 50;

    let currentY = startY;

    // Draw rows
    while (currentY + totalRowHeight < h - 50) {
      const baselineY = currentY + ascenderH + xHeight;
      const waistlineY = currentY + ascenderH;
      const ascenderY = currentY;
      const descenderY = baselineY + descenderH;

      // Draw Slant Lines First (underneath guidelines)
      if (showSlantLines && slantAngle > 0) {
        ctx.save();
        ctx.strokeStyle = slantLineColor;
        ctx.lineWidth = 0.6;
        const rad = (90 - slantAngle) * (Math.PI / 180);
        const slantSpacing = 36;

        // Draw segments across the writing space
        for (let sx = startX - 100; sx < endX + 100; sx += slantSpacing) {
          const dyAsc = (baselineY - ascenderY) * Math.tan(rad);
          const dyDesc = (descenderY - baselineY) * Math.tan(rad);

          ctx.beginPath();
          ctx.moveTo(sx - dyAsc, ascenderY);
          ctx.lineTo(sx + dyDesc, descenderY);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Draw Guidelines
      ctx.save();
      // Baseline (solid blue/grey)
      ctx.strokeStyle = "#a5b4fc"; // Blue-300
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(startX, baselineY);
      ctx.lineTo(endX, baselineY);
      ctx.stroke();

      // Waistline / Midline (dashed)
      ctx.strokeStyle = guidelineColor;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(startX, waistlineY);
      ctx.lineTo(endX, waistlineY);
      ctx.stroke();
      ctx.setLineDash([]); // clear

      // Ascender line (solid grey)
      ctx.strokeStyle = guidelineColor;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(startX, ascenderY);
      ctx.lineTo(endX, ascenderY);
      ctx.stroke();

      // Descender line (solid grey)
      ctx.beginPath();
      ctx.moveTo(startX, descenderY);
      ctx.lineTo(endX, descenderY);
      ctx.stroke();
      ctx.restore();

      // Render overlay text for tracing
      if (inputText) {
        ctx.save();
        ctx.font = `${xHeight * 1.8}px '${fontFamily}', cursive`;
        ctx.textBaseline = "alphabetic";

        // Draw semi-transparent tracing text
        ctx.fillStyle = `rgba(31, 41, 55, ${textOpacity})`;

        // Repeat to fill row width
        const spacingVal = 4;
        let cx = startX + 15;
        const unitText = inputText + "   ";
        
        let textRow = unitText;
        while (ctx.measureText(textRow + unitText).width < (endX - startX - 30)) {
          textRow += unitText;
        }
        textRow = textRow.trim();

        // If Spencerian/Copperplate, apply slight italic tilt in canvas drawing if font doesn't slant enough
        if (stylePreset === "spencerian" || stylePreset === "copperplate") {
          // Add a slant transformation to the text matrix
          const slantSlope = Math.tan((90 - slantAngle) * (Math.PI / 180));
          ctx.transform(1, 0, slantSlope, 1, 0, 0);
          
          // Adjust cx offset to fit inside transformed matrix bounds
          let tx = cx;
          for (let c = 0; c < textRow.length; c++) {
            const ch = textRow[c];
            // translate X coordinate relative to transformed tilt
            const skewOffset = (baselineY) * slantSlope;
            ctx.fillText(ch, tx - skewOffset, baselineY);
            tx += ctx.measureText(ch).width + spacingVal;
          }
        } else {
          // Standard Italic or Modern
          for (let c = 0; c < textRow.length; c++) {
            const ch = textRow[c];
            ctx.fillText(ch, cx, baselineY);
            cx += ctx.measureText(ch).width + spacingVal;
          }
        }
        ctx.restore();
      }

      // Increment row pointer
      currentY += totalRowHeight + rowGap;
    }
  }, [stylePreset, inputText, slantAngle, xHeight, guidelineColor, slantLineColor, textOpacity, showSlantLines, paperSize, getRatios]);

  useEffect(() => {
    const id = setTimeout(drawCalligraphyWorksheet, 50);
    return () => clearTimeout(id);
  }, [drawCalligraphyWorksheet]);

  const handleDownloadPDF = async () => {
    const baseSize = paperPixelSize(paperSize);
    const w = baseSize.w;
    const h = baseSize.h;

    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: paperSize === "A4" ? "a4" : "letter",
    });

    // Trigger full render
    await drawCalligraphyWorksheet();
    if (canvasRef.current) {
      const imgData = canvasRef.current.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, w, h);
      pdf.save(`calligraphy-${stylePreset}-practice.pdf`);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar Controls */}
      <aside className="w-full lg:w-80 flex-shrink-0 bg-white rounded-2xl shadow border border-gray-100 p-5">
        <div className="flex flex-col gap-5">
          {/* Preset Styles */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Script Style</label>
            <select
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={stylePreset}
              onChange={(e) => setStylePreset(e.target.value as CalligraphyPreset)}
            >
              <option value="copperplate">Copperplate Script (Elegant)</option>
              <option value="spencerian">Spencerian Script (High Slant)</option>
              <option value="italic">Chancery Italic</option>
              <option value="modern">Modern Calligraphy</option>
              <option value="brush">Brush Lettering</option>
            </select>
          </div>

          {/* Drill Presets */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Practice Drills</label>
            <div className="flex flex-col gap-2">
              {DRILL_PRESETS.map((d) => (
                <button
                  key={d.label}
                  onClick={() => setInputText(d.value)}
                  className="text-left px-2.5 py-2 border border-gray-200 hover:border-indigo-300 bg-white text-gray-700 text-xs rounded transition-all"
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Text input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Custom Practice Text</label>
            <input
              type="text"
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-1 focus:ring-indigo-400 focus:outline-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type custom letters or words..."
            />
          </div>

          {/* Slant Angle */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
              <span>Slant Angle</span>
              <span>{slantAngle}°</span>
            </div>
            <input
              type="range"
              min="45"
              max="90"
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              value={slantAngle}
              onChange={(e) => setSlantAngle(parseInt(e.target.value))}
            />
          </div>

          {/* Guidelines details */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
              <span>x-Height (Letter size)</span>
              <span>{xHeight}px</span>
            </div>
            <input
              type="range"
              min="14"
              max="45"
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              value={xHeight}
              onChange={(e) => setXHeight(parseInt(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Ascender Ratio</label>
            <select
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
              value={ratioStr}
              onChange={(e) => setRatioStr(e.target.value)}
            >
              <option value="2:1:2">2 : 1 : 2 (Standard)</option>
              <option value="3:1:3">3 : 1 : 3 (Spencerian High)</option>
              <option value="1.5:1:1.5">1.5 : 1 : 1.5 (Modern)</option>
              <option value="1:1:1">1 : 1 : 1 (Italic/Brush)</option>
            </select>
          </div>

          {/* Opacity of tracing overlay */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
              <span>Trace Guide Opacity</span>
              <span>{Math.round(textOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              value={Math.round(textOpacity * 100)}
              onChange={(e) => setTextOpacity(parseInt(e.target.value) / 100)}
            />
          </div>

          {/* Toggle slant lines */}
          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              id="showSlant"
              checked={showSlantLines}
              onChange={(e) => setShowSlantLines(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="showSlant" className="text-xs font-semibold text-gray-600 cursor-pointer">
              Show Slant Guidelines
            </label>
          </div>

          {/* Action triggers */}
          <button
            onClick={handleDownloadPDF}
            className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
          >
            ↓ Download Printable PDF
          </button>
        </div>
      </aside>

      {/* Canvas workspace area */}
      <div className="flex-1 bg-white rounded-2xl shadow border border-gray-100 p-5 flex flex-col items-center">
        <span className="self-start text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
          Calligraphy Live Preview
        </span>
        <div className="w-full max-w-xl border border-gray-200 rounded-xl shadow-inner bg-gray-50 p-4">
          <canvas ref={canvasRef} className="w-full bg-white shadow-lg border border-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
