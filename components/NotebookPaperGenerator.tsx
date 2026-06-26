"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { paperPixelSize, PaperSize } from "@/lib/worksheetRender";

type LayoutType =
  | "wide-ruled"
  | "college-ruled"
  | "primary"
  | "kindergarten"
  | "graph"
  | "dot-grid"
  | "cornell"
  | "music"
  | "engineering";

type Orientation = "portrait" | "landscape";

export default function NotebookPaperGenerator({ defaultPreset }: { defaultPreset?: LayoutType }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [layout, setLayout] = useState<LayoutType>(defaultPreset || "wide-ruled");
  const [paperSize, setPaperSize] = useState<PaperSize>("A4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [lineSpacing, setLineSpacing] = useState(30); // custom line height/grid size
  const [marginWidth, setMarginWidth] = useState(90);
  const [lineColor, setLineColor] = useState("#bfdbfe"); // Light blue
  const [marginColor, setMarginColor] = useState("#fca5a5"); // Light red
  const [leftHeader, setLeftHeader] = useState("");
  const [rightHeader, setRightHeader] = useState("");
  const [footerText, setFooterText] = useState("");
  const [showPageNumbers, setShowPageNumbers] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPagePreview, setCurrentPagePreview] = useState(1);

  // Sync defaults based on layout type selection
  useEffect(() => {
    if (layout === "wide-ruled") {
      setLineSpacing(34);
      setMarginWidth(100);
      setLineColor("#bfdbfe");
      setMarginColor("#fca5a5");
    } else if (layout === "college-ruled") {
      setLineSpacing(27);
      setMarginWidth(100);
      setLineColor("#bfdbfe");
      setMarginColor("#fca5a5");
    } else if (layout === "primary") {
      setLineSpacing(48);
      setMarginWidth(80);
      setLineColor("#d1d5db");
      setMarginColor("#fca5a5");
    } else if (layout === "kindergarten") {
      setLineSpacing(64);
      setMarginWidth(80);
      setLineColor("#9ca3af");
      setMarginColor("#f87171");
    } else if (layout === "graph") {
      setLineSpacing(22);
      setMarginWidth(0);
      setLineColor("#e2e8f0");
      setMarginColor("#fca5a5");
    } else if (layout === "dot-grid") {
      setLineSpacing(22);
      setMarginWidth(0);
      setLineColor("#cbd5e1");
    } else if (layout === "cornell") {
      setLineSpacing(28);
      setMarginWidth(200); // Cue column
      setLineColor("#e2e8f0");
      setMarginColor("#cbd5e1");
    } else if (layout === "music") {
      setLineSpacing(8);
      setMarginWidth(50);
      setLineColor("#4b5563");
      setMarginColor("#9ca3af");
    } else if (layout === "engineering") {
      setLineSpacing(18);
      setMarginWidth(40);
      setLineColor("#e2f0d9"); // faint green
      setMarginColor("#a8d08d"); // darker green outline
    }
  }, [layout]);

  const drawPageToContext = useCallback((
    ctx: CanvasRenderingContext2D,
    pageNumber: number,
    w: number,
    h: number
  ) => {
    // Clear and background
    ctx.fillStyle = layout === "engineering" ? "#f4f9f1" : "#ffffff";
    ctx.fillRect(0, 0, w, h);

    // Margin markers
    const topMargin = 70;
    const bottomMargin = 60;

    // Header Drawing
    ctx.fillStyle = "#4b5563";
    ctx.font = "14px sans-serif";
    ctx.textBaseline = "bottom";
    if (leftHeader) {
      ctx.fillText(leftHeader, marginWidth > 30 ? marginWidth : 40, topMargin - 15);
    }
    if (rightHeader) {
      ctx.textAlign = "right";
      ctx.fillText(rightHeader, w - 40, topMargin - 15);
      ctx.textAlign = "left";
    }

    // Line Styles
    ctx.lineWidth = 0.8;

    // Layout Specific Renders
    if (layout === "wide-ruled" || layout === "college-ruled") {
      // Horizontal Ruled Lines
      ctx.strokeStyle = lineColor;
      for (let y = topMargin + lineSpacing; y < h - bottomMargin; y += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      // Vertical red margin
      if (marginWidth > 0) {
        ctx.strokeStyle = marginColor;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(marginWidth, 0);
        ctx.lineTo(marginWidth, h);
        ctx.stroke();
      }
    } else if (layout === "primary" || layout === "kindergarten") {
      // Primary Sets (Solid Top/Bottom, Dashed Midline)
      ctx.strokeStyle = lineColor;
      const setHeight = lineSpacing;
      const gap = lineSpacing * 0.75;
      let y = topMargin + 20;

      while (y + setHeight < h - bottomMargin) {
        // Draw top line
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();

        // Draw middle dashed line
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 0.75;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, y + setHeight / 2);
        ctx.lineTo(w, y + setHeight / 2);
        ctx.stroke();
        ctx.setLineDash([]); // clear

        // Draw bottom line
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y + setHeight);
        ctx.lineTo(w, y + setHeight);
        ctx.stroke();

        y += setHeight + gap;
      }

      // Vertical Margin
      if (marginWidth > 0) {
        ctx.strokeStyle = marginColor;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(marginWidth, 0);
        ctx.lineTo(marginWidth, h);
        ctx.stroke();
      }
    } else if (layout === "graph") {
      // Grid Lines
      ctx.strokeStyle = lineColor;
      // Verticals
      for (let x = lineSpacing; x < w; x += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      // Horizontals
      for (let y = lineSpacing; y < h; y += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    } else if (layout === "dot-grid") {
      // Dots
      ctx.fillStyle = lineColor;
      for (let x = lineSpacing; x < w; x += lineSpacing) {
        for (let y = lineSpacing; y < h; y += lineSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (layout === "cornell") {
      // Cornell Template Layout
      // Draw standard ruled notes inside the right section
      ctx.strokeStyle = lineColor;
      const contentLeft = marginWidth; // vertical split line
      const headerBoxHeight = 100;
      const summaryBoxHeight = 160;

      // Draw notes ruled lines
      for (let y = headerBoxHeight + lineSpacing; y < h - summaryBoxHeight; y += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(contentLeft, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw borders
      ctx.strokeStyle = marginColor;
      ctx.lineWidth = 1.5;

      // Top box separator
      ctx.beginPath();
      ctx.moveTo(0, headerBoxHeight);
      ctx.lineTo(w, headerBoxHeight);
      ctx.stroke();

      // Bottom box separator
      ctx.beginPath();
      ctx.moveTo(0, h - summaryBoxHeight);
      ctx.lineTo(w, h - summaryBoxHeight);
      ctx.stroke();

      // Cue column separator
      ctx.beginPath();
      ctx.moveTo(marginWidth, headerBoxHeight);
      ctx.lineTo(marginWidth, h - summaryBoxHeight);
      ctx.stroke();

      // Section titles
      ctx.fillStyle = "#9ca3af";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("CUES / QUESTIONS", 20, headerBoxHeight + 25);
      ctx.fillText("NOTES", marginWidth + 20, headerBoxHeight + 25);
      ctx.fillText("SUMMARY", 20, h - summaryBoxHeight + 25);

    } else if (layout === "music") {
      // Music Manuscript (Staves of 5 lines)
      ctx.strokeStyle = lineColor;
      const lineGap = lineSpacing; // spacing between staff lines (default 8px)
      const staffHeight = lineGap * 4;
      const staffGap = 40; // spacing between staves
      let y = topMargin + 10;

      while (y + staffHeight < h - bottomMargin) {
        // Draw 5 staff lines
        ctx.lineWidth = 0.8;
        for (let l = 0; l < 5; l++) {
          const ly = y + l * lineGap;
          ctx.beginPath();
          ctx.moveTo(marginWidth, ly);
          ctx.lineTo(w - marginWidth, ly);
          ctx.stroke();
        }

        // Draw left and right vertical stave bounds
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(marginWidth, y);
        ctx.lineTo(marginWidth, y + staffHeight);
        ctx.moveTo(w - marginWidth, y);
        ctx.lineTo(w - marginWidth, y + staffHeight);
        ctx.stroke();

        y += staffHeight + staffGap;
      }
    } else if (layout === "engineering") {
      // Engineering paper (back grid faint + bold green outline)
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;
      const grid = lineSpacing;

      // Draw backing grid
      for (let x = grid; x < w; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = grid; y < h; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw bold margin borders
      ctx.strokeStyle = marginColor;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(marginWidth, 50, w - marginWidth - 40, h - 100);

      // Top title box inside borders
      ctx.beginPath();
      ctx.moveTo(marginWidth, 90);
      ctx.lineTo(w - 40, 90);
      ctx.stroke();

      // Top title labels
      ctx.fillStyle = marginColor;
      ctx.font = "bold 9px sans-serif";
      ctx.fillText("TITLE:", marginWidth + 10, 75);
      ctx.fillText("PAGE:", w - 120, 75);
    }

    // Footer & Page Numbers
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px sans-serif";
    ctx.textBaseline = "top";
    if (footerText) {
      ctx.fillText(footerText, marginWidth > 30 ? marginWidth : 40, h - bottomMargin + 15);
    }
    if (showPageNumbers) {
      ctx.textAlign = "right";
      ctx.fillText(`Page ${pageNumber} of ${totalPages}`, w - 40, h - bottomMargin + 15);
      ctx.textAlign = "left";
    }
  }, [layout, lineColor, marginColor, marginWidth, lineSpacing, leftHeader, rightHeader, footerText, showPageNumbers, totalPages]);

  // Main Render Preview Loop
  const renderPreview = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const baseSize = paperPixelSize(paperSize);
    // Letter / Legal size handling
    let finalW = baseSize.w;
    let finalH = baseSize.h;
    if (paperSize === "Letter") {
      finalW = 816;
      finalH = 1056;
    } else if (paperSize === "A4") {
      finalW = 800;
      finalH = 1131;
    } else {
      // Legal
      finalW = 816;
      finalH = 1344;
    }

    const w = orientation === "portrait" ? finalW : finalH;
    const h = orientation === "portrait" ? finalH : finalW;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "auto";

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    drawPageToContext(ctx, currentPagePreview, w, h);
  }, [paperSize, orientation, currentPagePreview, drawPageToContext]);

  useEffect(() => {
    const id = setTimeout(renderPreview, 60);
    return () => clearTimeout(id);
  }, [renderPreview]);

  const handleDownloadPNG = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `notebook-paper-${layout}-${currentPagePreview}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [layout, currentPagePreview]);

  const handleDownloadPDF = useCallback(async () => {
    const baseSize = paperPixelSize(paperSize);
    let finalW = baseSize.w;
    let finalH = baseSize.h;
    let formatStr = "a4";

    if (paperSize === "Letter") {
      finalW = 816;
      finalH = 1056;
      formatStr = "letter";
    } else if (paperSize === "A4") {
      finalW = 800;
      finalH = 1131;
      formatStr = "a4";
    } else {
      // Legal
      finalW = 816;
      finalH = 1344;
      formatStr = "legal";
    }

    const w = orientation === "portrait" ? finalW : finalH;
    const h = orientation === "portrait" ? finalH : finalW;

    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({
      orientation: orientation === "portrait" ? "portrait" : "landscape",
      unit: "pt",
      format: formatStr,
    });

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tempCtx = tempCanvas.getContext("2d")!;

    for (let p = 1; p <= totalPages; p++) {
      if (p > 1) pdf.addPage();
      drawPageToContext(tempCtx, p, w, h);
      const imgData = tempCanvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, w, h);
    }

    pdf.save(`printable-notebook-${layout}.pdf`);
  }, [paperSize, orientation, totalPages, drawPageToContext, layout]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar Controls */}
      <aside className="w-full lg:w-80 flex-shrink-0 bg-white rounded-2xl shadow border border-gray-100 p-5">
        <div className="flex flex-col gap-5">
          {/* Layout presets */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Paper Template</label>
            <select
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={layout}
              onChange={(e) => setLayout(e.target.value as LayoutType)}
            >
              <option value="wide-ruled">Wide Ruled</option>
              <option value="college-ruled">College Ruled</option>
              <option value="primary">Primary Writing Paper</option>
              <option value="kindergarten">Kindergarten Letter Writing</option>
              <option value="graph">Graph Paper (Grid)</option>
              <option value="dot-grid">Dot Grid Paper</option>
              <option value="cornell">Cornell Layout</option>
              <option value="music">Music Manuscript</option>
              <option value="engineering">Engineering Grid</option>
            </select>
          </div>

          {/* Size / Orientation */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Paper Size</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white"
                value={paperSize}
                onChange={(e) => setPaperSize(e.target.value as PaperSize)}
              >
                <option value="A4">A4</option>
                <option value="Letter">Letter</option>
                <option value="Legal" data-size="legal">Legal</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Orientation</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white"
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as Orientation)}
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
          </div>

          {/* Custom spacing & margin */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
              <span>Line Spacing / Grid</span>
              <span>{lineSpacing}px</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              value={lineSpacing}
              onChange={(e) => setLineSpacing(parseInt(e.target.value))}
            />
          </div>

          {layout !== "graph" && layout !== "dot-grid" && (
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                <span>Margin Offset</span>
                <span>{marginWidth}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="250"
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                value={marginWidth}
                onChange={(e) => setMarginWidth(parseInt(e.target.value))}
              />
            </div>
          )}

          {/* Preset Custom Colors */}
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
            {layout !== "graph" && layout !== "dot-grid" && (
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Margin Color</label>
                <input
                  type="color"
                  className="w-full h-8 p-0 rounded-lg border border-gray-300 cursor-pointer"
                  value={marginColor}
                  onChange={(e) => setMarginColor(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Header/Footer Fields */}
          <div className="border-t border-gray-100 pt-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Header & Footer</h4>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Left Header</label>
              <input
                type="text"
                placeholder="e.g. Name: ________________"
                className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
                value={leftHeader}
                onChange={(e) => setLeftHeader(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Right Header</label>
              <input
                type="text"
                placeholder="e.g. Date: ________"
                className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
                value={rightHeader}
                onChange={(e) => setRightHeader(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Footer Text</label>
              <input
                type="text"
                placeholder="e.g. Subject notes..."
                className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                id="pageNumbers"
                checked={showPageNumbers}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                onChange={(e) => setShowPageNumbers(e.target.checked)}
              />
              <label htmlFor="pageNumbers" className="text-xs font-semibold text-gray-600 cursor-pointer">
                Include Page Numbers
              </label>
            </div>
          </div>

          {/* Multipage configurations */}
          <div className="border-t border-gray-100 pt-3">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Download Pages Count</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white"
              value={totalPages}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setTotalPages(val);
                if (currentPagePreview > val) setCurrentPagePreview(val);
              }}
            >
              {[1, 2, 3, 5, 10].map((n) => (
                <option key={n} value={n}>
                  {n} Page{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Download triggers */}
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
      <div className="flex-1 bg-white rounded-2xl shadow border border-gray-100 p-5 flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Live Preview</span>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                disabled={currentPagePreview <= 1}
                onClick={() => setCurrentPagePreview((p) => p - 1)}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-gray-100 rounded text-xs font-semibold text-gray-600"
              >
                ◀ Prev
              </button>
              <span className="text-xs font-bold text-gray-600">
                Page {currentPagePreview} / {totalPages}
              </span>
              <button
                disabled={currentPagePreview >= totalPages}
                onClick={() => setCurrentPagePreview((p) => p + 1)}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-gray-100 rounded text-xs font-semibold text-gray-600"
              >
                Next ▶
              </button>
            </div>
          )}
        </div>

        <div className="w-full max-w-xl border border-gray-200 rounded-xl shadow-inner bg-gray-50 p-4">
          <canvas ref={canvasRef} className="w-full bg-white shadow-lg border border-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
