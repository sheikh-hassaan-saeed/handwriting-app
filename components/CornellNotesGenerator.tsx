"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { paperPixelSize, PaperSize } from "@/lib/worksheetRender";

type CornellLayout = "lined" | "dotted" | "grid" | "blank" | "cursive-lined";

export default function CornellNotesGenerator({ defaultLayout }: { defaultLayout?: CornellLayout }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [layout, setLayout] = useState<CornellLayout>(defaultLayout || "lined");
  const [paperSize, setPaperSize] = useState<PaperSize>("A4");
  const [title, setTitle] = useState("CORNELL NOTES");
  const [subject, setSubject] = useState("Topic: ");
  const [dateStr, setDateStr] = useState("Date: ");
  const [cueColPercent, setCueColPercent] = useState(30); // 20% to 45%
  const [summaryHeightPercent, setSummaryHeightPercent] = useState(20); // 15% to 35%
  const [lineSpacing, setLineSpacing] = useState(28);
  const [lineColor, setLineColor] = useState("#e5e7eb"); // grey
  const [borderColor, setBorderColor] = useState("#6b7280"); // dark grey

  const drawCornellPage = useCallback((
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number
  ) => {
    // Fill white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    const marginX = 40;
    const headerHeight = 110;
    const summaryHeight = (h - headerHeight) * (summaryHeightPercent / 100);
    const cueWidth = (w - marginX * 2) * (cueColPercent / 100);

    // 1. Draw Header Text
    ctx.fillStyle = "#111827";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText(title || "CORNELL NOTES", marginX, 55);

    // Subject & Date
    ctx.fillStyle = "#374151";
    ctx.font = "14px sans-serif";
    ctx.fillText(subject || "Topic: ________________________", marginX, 90);
    ctx.textAlign = "right";
    ctx.fillText(dateStr || "Date: ____/____/____", w - marginX, 90);
    ctx.textAlign = "left";

    // Header border line
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(marginX, headerHeight);
    ctx.lineTo(w - marginX, headerHeight);
    ctx.stroke();

    // Bottom summary border line
    ctx.beginPath();
    ctx.moveTo(marginX, h - summaryHeight);
    ctx.lineTo(w - marginX, h - summaryHeight);
    ctx.stroke();

    // Cue separator vertical line
    ctx.beginPath();
    ctx.moveTo(marginX + cueWidth, headerHeight);
    ctx.lineTo(marginX + cueWidth, h - summaryHeight);
    ctx.stroke();

    // Outer frame (left & right borders of Cornell box)
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(marginX, headerHeight);
    ctx.lineTo(marginX, h - summaryHeight);
    ctx.moveTo(w - marginX, headerHeight);
    ctx.lineTo(w - marginX, h - summaryHeight);
    ctx.stroke();

    // 2. Draw interior grids based on layout
    const contentLeft = marginX + cueWidth;
    const contentRight = w - marginX;
    const contentTop = headerHeight;
    const contentBottom = h - summaryHeight;

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 0.8;

    if (layout === "lined" || layout === "cursive-lined") {
      // Horizontal ruled lines inside notes section
      for (let y = contentTop + lineSpacing; y < contentBottom; y += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(contentLeft, y);
        ctx.lineTo(contentRight, y);
        ctx.stroke();
      }
      // Draw ruled lines inside cue section (less frequent or matching)
      for (let y = contentTop + lineSpacing * 1.5; y < contentBottom - 20; y += lineSpacing * 1.5) {
        ctx.beginPath();
        ctx.moveTo(marginX + 10, y);
        ctx.lineTo(contentLeft - 10, y);
        ctx.stroke();
      }
    } else if (layout === "dotted") {
      // Dotted grid inside Notes & Cues
      ctx.fillStyle = lineColor;
      const dotSpacing = lineSpacing * 0.7;
      // Notes
      for (let x = contentLeft + dotSpacing; x < contentRight; x += dotSpacing) {
        for (let y = contentTop + dotSpacing; y < contentBottom; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      // Cues
      for (let x = marginX + dotSpacing; x < contentLeft; x += dotSpacing) {
        for (let y = contentTop + dotSpacing; y < contentBottom; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (layout === "grid") {
      // Square grids inside Notes & Cues
      const gridSpacing = lineSpacing * 0.7;
      // Notes
      for (let x = contentLeft + gridSpacing; x < contentRight; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, contentTop);
        ctx.lineTo(x, contentBottom);
        ctx.stroke();
      }
      for (let y = contentTop + gridSpacing; y < contentBottom; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(contentLeft, y);
        ctx.lineTo(contentRight, y);
        ctx.stroke();
      }
      // Cues
      for (let x = marginX + gridSpacing; x < contentLeft; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, contentTop);
        ctx.lineTo(x, contentBottom);
        ctx.stroke();
      }
      for (let y = contentTop + gridSpacing; y < contentBottom; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(marginX, y);
        ctx.lineTo(contentLeft, y);
        ctx.stroke();
      }
    }

    // Draw ruled lines in Summary Box at the bottom
    for (let y = contentBottom + lineSpacing; y < h - 40; y += lineSpacing) {
      ctx.beginPath();
      ctx.moveTo(marginX, y);
      ctx.lineTo(w - marginX, y);
      ctx.stroke();
    }

    // Labels
    ctx.fillStyle = "#9ca3af";
    if (layout === "cursive-lined") {
      ctx.font = "italic 20px 'Dancing Script', cursive";
      ctx.fillText("Cues / Questions", marginX + 15, headerHeight + 30);
      ctx.fillText("Notes", contentLeft + 15, headerHeight + 30);
      ctx.fillText("Summary", marginX + 15, h - summaryHeight + 30);
    } else {
      ctx.font = "bold 11px sans-serif";
      ctx.fillText("CUES & QUESTIONS", marginX + 15, headerHeight + 25);
      ctx.fillText("LECTURE NOTES", contentLeft + 15, headerHeight + 25);
      ctx.fillText("SUMMARY (COLLATED IDEAS)", marginX + 15, h - summaryHeight + 25);
    }
  }, [layout, title, subject, dateStr, cueColPercent, summaryHeightPercent, lineSpacing, lineColor, borderColor]);

  const renderPreview = useCallback(() => {
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

    // Wait for the script font to load if cursive-lined is selected
    if (layout === "cursive-lined") {
      try {
        document.fonts.load("20px 'Dancing Script'").then(() => {
          drawCornellPage(ctx, w, h);
        });
        return;
      } catch {
        // proceed
      }
    }

    drawCornellPage(ctx, w, h);
  }, [paperSize, layout, drawCornellPage]);

  useEffect(() => {
    const id = setTimeout(renderPreview, 50);
    return () => clearTimeout(id);
  }, [renderPreview]);

  const handleDownloadPNG = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `cornell-notes-${layout}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [layout]);

  const handleDownloadPDF = useCallback(async () => {
    const baseSize = paperPixelSize(paperSize);
    const w = baseSize.w;
    const h = baseSize.h;

    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: paperSize === "A4" ? "a4" : "letter",
    });

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tempCtx = tempCanvas.getContext("2d")!;

    drawCornellPage(tempCtx, w, h);
    const imgData = tempCanvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, w, h);
    pdf.save(`cornell-notes-${layout}.pdf`);
  }, [paperSize, drawCornellPage, layout]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar Controls */}
      <aside className="w-full lg:w-80 flex-shrink-0 bg-white rounded-2xl shadow border border-gray-100 p-5">
        <div className="flex flex-col gap-5">
          {/* Layout type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cornell Layout</label>
            <select
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={layout}
              onChange={(e) => setLayout(e.target.value as CornellLayout)}
            >
              <option value="lined">Standard Lined</option>
              <option value="dotted">Dotted Grid</option>
              <option value="grid">Graph Grid</option>
              <option value="cursive-lined">Cursive Labels Lined</option>
              <option value="blank">Blank Template</option>
            </select>
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Paper Size</label>
            <select
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value as PaperSize)}
            >
              <option value="A4">A4</option>
              <option value="Letter">Letter</option>
            </select>
          </div>

          {/* Text fields */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Page Title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-1 focus:ring-indigo-400 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Subject Label</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-1 focus:ring-indigo-400 focus:outline-none"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Date Label</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-1 focus:ring-indigo-400 focus:outline-none"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
            />
          </div>

          {/* Adjustments */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
              <span>Cue Column Width</span>
              <span>{cueColPercent}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="45"
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              value={cueColPercent}
              onChange={(e) => setCueColPercent(parseInt(e.target.value))}
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
              <span>Summary Height</span>
              <span>{summaryHeightPercent}%</span>
            </div>
            <input
              type="range"
              min="15"
              max="35"
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              value={summaryHeightPercent}
              onChange={(e) => setSummaryHeightPercent(parseInt(e.target.value))}
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
              <span>Line Spacing</span>
              <span>{lineSpacing}px</span>
            </div>
            <input
              type="range"
              min="18"
              max="50"
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              value={lineSpacing}
              onChange={(e) => setLineSpacing(parseInt(e.target.value))}
            />
          </div>

          {/* Custom colors */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Line Color</label>
              <input
                type="color"
                className="w-full h-8 p-0 rounded-lg border border-gray-300 cursor-pointer"
                value={lineColor}
                onChange={(e) => setLineColor(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Border Color</label>
              <input
                type="color"
                className="w-full h-8 p-0 rounded-lg border border-gray-300 cursor-pointer"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={handleDownloadPDF}
              className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
            >
              ↓ Download Printable PDF
            </button>
            <button
              onClick={handleDownloadPNG}
              className="w-full py-2 px-4 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Download Page Image (PNG)
            </button>
          </div>
        </div>
      </aside>

      {/* Canvas workspace area */}
      <div className="flex-1 bg-white rounded-2xl shadow border border-gray-100 p-5 flex flex-col items-center justify-center">
        <span className="self-start text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
          Live Preview
        </span>
        <div className="w-full max-w-xl border border-gray-200 rounded-xl shadow-inner bg-gray-50 p-4">
          <canvas ref={canvasRef} className="w-full bg-white shadow-lg border border-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
