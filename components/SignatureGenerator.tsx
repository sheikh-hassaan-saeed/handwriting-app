"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

type PenColor = "blue" | "black" | "red" | "purple";
type SwoopStyle = "none" | "swoop" | "double-loop" | "cross-strike";

interface SignatureStyleConfig {
  name: string;
  font: string;
  desc: string;
  defaultColor: string;
  defaultSize: number;
}

const SIGNATURE_STYLES: Record<string, SignatureStyleConfig> = {
  elegant: { name: "Elegant Cursive", font: "Great Vibes", desc: "Flowing & sophisticated loop script", defaultColor: "#1a3a8f", defaultSize: 72 },
  professional: { name: "Business Executive", font: "Playball", desc: "Classic formal script style", defaultColor: "#1a1a1a", defaultSize: 64 },
  minimal: { name: "Modern Minimalist", font: "Sacramento", desc: "Fine, clean, thin script strokes", defaultColor: "#1a1a1a", defaultSize: 84 },
  luxury: { name: "Prestige Luxury", font: "Pinyon Script", desc: "Slanted, high-contrast copperplate", defaultColor: "#1a3a8f", defaultSize: 76 },
  fountain: { name: "Fountain Pen", font: "Allura", desc: "Light, expressive flowing handwriting", defaultColor: "#1a3a8f", defaultSize: 80 },
  ballpoint: { name: "Standard Ballpoint", font: "Alex Brush", desc: "Casual everyday connected script", defaultColor: "#1a1a1a", defaultSize: 76 },
  marker: { name: "Bold Marker", font: "Caveat", desc: "Expressive, quick felt-tip print script", defaultColor: "#b91c1c", defaultSize: 90 },
  brush: { name: "Artist Brush", font: "Reenie Beanie", desc: "Organic, fast freehand signature", defaultColor: "#1a1a1a", defaultSize: 100 },
};

const COLOR_MAP: Record<PenColor, string> = {
  black: "#1a1a1a",
  blue: "#1a3a8f",
  red: "#b91c1c",
  purple: "#6b21a8", // purple-700
};

export default function SignatureGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedName, setTypedName] = useState("John Doe");
  const [stylePreset, setStylePreset] = useState("elegant");
  const [penColor, setPenColor] = useState<PenColor>("blue");
  const [penWidth, setPenWidth] = useState(2);
  const [swoop, setSwoop] = useState<SwoopStyle>("swoop");
  const [transparentBg, setTransparentBg] = useState(true);
  const [customSize, setCustomSize] = useState(72);

  // Sync size when style preset changes
  useEffect(() => {
    const config = SIGNATURE_STYLES[stylePreset];
    if (config) {
      setCustomSize(config.defaultSize);
    }
  }, [stylePreset]);

  // Generate SVG path for swoosh
  const getSwooshSvgPath = (textWidth: number, sx: number, sy: number): string => {
    if (swoop === "swoop") {
      return `M ${sx},${sy} C ${sx + textWidth * 0.35},${sy + 20} ${sx + textWidth * 0.75},${sy + 10} ${sx + textWidth * 1.15},${sy - 15}`;
    } else if (swoop === "double-loop") {
      return `M ${sx},${sy} C ${sx + textWidth * 0.35},${sy + 20} ${sx + textWidth * 0.75},${sy + 10} ${sx + textWidth * 1.1},${sy - 10} C ${sx + textWidth * 0.95},${sy + 5} ${sx + textWidth * 0.45},${sy + 20} ${sx + textWidth * 0.15},${sy + 5}`;
    } else if (swoop === "cross-strike") {
      return `M ${sx - 10},${sy + 5} L ${sx + textWidth + 10},${sy - 5}`;
    }
    return "";
  };

  // Helper to draw swooshes on Canvas
  const drawSwooshOnCanvas = useCallback((
    ctx: CanvasRenderingContext2D,
    textWidth: number,
    sx: number,
    sy: number
  ) => {
    if (swoop === "none") return;
    ctx.save();
    ctx.strokeStyle = COLOR_MAP[penColor];
    ctx.lineWidth = penWidth * 1.25;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (swoop === "swoop") {
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.bezierCurveTo(sx + textWidth * 0.35, sy + 20, sx + textWidth * 0.75, sy + 10, sx + textWidth * 1.15, sy - 15);
      ctx.stroke();
    } else if (swoop === "double-loop") {
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.bezierCurveTo(sx + textWidth * 0.35, sy + 20, sx + textWidth * 0.75, sy + 10, sx + textWidth * 1.1, sy - 10);
      ctx.bezierCurveTo(sx + textWidth * 0.95, sy + 5, sx + textWidth * 0.45, sy + 20, sx + textWidth * 0.15, sy + 5);
      ctx.stroke();
    } else if (swoop === "cross-strike") {
      ctx.beginPath();
      ctx.moveTo(sx - 10, sy + 5);
      ctx.lineTo(sx + textWidth + 10, sy - 5);
      ctx.stroke();
    }
    ctx.restore();
  }, [swoop, penColor, penWidth]);

  const renderSignature = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const config = SIGNATURE_STYLES[stylePreset] || SIGNATURE_STYLES.elegant;
    const font = config.font;

    // Dynamically load Google Font
    try {
      await document.fonts.load(`${customSize}px '${font}'`);
    } catch {
      // fallback
    }

    const w = 600;
    const h = 250;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "auto";

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    // Background clearing
    if (!transparentBg) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.clearRect(0, 0, w, h);
    }

    // Draw Signature Text
    ctx.fillStyle = COLOR_MAP[penColor];
    ctx.font = `${customSize}px '${font}', cursive`;
    ctx.textBaseline = "middle";

    const text = typedName.trim() || "Signature";
    const textWidth = ctx.measureText(text).width;

    const sx = (w - textWidth) / 2;
    const sy = h / 2;

    ctx.fillText(text, sx, sy);

    // Draw Underline Swoosh
    drawSwooshOnCanvas(ctx, textWidth, sx, sy + customSize * 0.4);
  }, [typedName, stylePreset, penColor, transparentBg, customSize, drawSwooshOnCanvas]);

  useEffect(() => {
    const id = setTimeout(renderSignature, 50);
    return () => clearTimeout(id);
  }, [renderSignature]);

  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `signature-${typedName.toLowerCase().replace(/\s+/g, "-") || "maker"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleDownloadSVG = () => {
    const config = SIGNATURE_STYLES[stylePreset] || SIGNATURE_STYLES.elegant;
    const font = config.font;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.font = `${customSize}px '${font}', cursive`;
    const text = typedName.trim() || "Signature";
    const textWidth = ctx.measureText(text).width;

    const w = 600;
    const h = 250;
    const sx = (w - textWidth) / 2;
    const sy = h / 2;

    const swooshPath = getSwooshSvgPath(textWidth, sx, sy + customSize * 0.4);

    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&amp;family=Sacramento&amp;family=Pinyon+Script&amp;family=Playball&amp;family=Allura&amp;family=Alex+Brush&amp;family=Caveat&amp;family=Reenie+Beanie&amp;display=swap');
    .sig-text {
      font-family: '${font}', cursive;
      font-size: ${customSize}px;
      fill: ${COLOR_MAP[penColor]};
    }
  </style>
  <rect width="100%" height="100%" fill="${transparentBg ? "none" : "#ffffff"}"/>
  <text x="${sx}" y="${sy + 10}" class="sig-text">${text}</text>
  ${swooshPath ? `<path d="${swooshPath}" stroke="${COLOR_MAP[penColor]}" stroke-width="${penWidth * 1.25}" stroke-linecap="round" fill="none" />` : ""}
</svg>`;

    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `signature-${typedName.toLowerCase().replace(/\s+/g, "-")}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: [600, 250],
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, 600, 250);
    pdf.save(`signature-${typedName.toLowerCase().replace(/\s+/g, "-")}.pdf`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar Controls */}
      <aside className="w-full lg:w-80 flex-shrink-0 bg-white rounded-2xl shadow border border-gray-100 p-5">
        <div className="flex flex-col gap-5">
          {/* Typing name input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Type Your Name</label>
            <input
              type="text"
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="e.g. John Doe"
              maxLength={30}
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
            />
          </div>

          {/* Signature Cursive Styles Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Signature Font Style</label>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
              {Object.entries(SIGNATURE_STYLES).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setStylePreset(key)}
                  className={`text-left px-3 py-2 border rounded-lg transition-all ${
                    stylePreset === key
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                      : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                  }`}
                >
                  <span className="block text-sm">{config.name}</span>
                  <span className="block text-xxs text-gray-400 font-normal">{config.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color mapping options */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ink Color</label>
            <div className="grid grid-cols-4 gap-2">
              {(["blue", "black", "red", "purple"] as PenColor[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setPenColor(c)}
                  className={`py-2 px-1 border rounded-lg text-xs capitalize transition-all ${
                    penColor === c
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                      : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                  }`}
                >
                  <span
                    className="inline-block w-3.5 h-3.5 rounded-full border border-gray-200 align-middle mr-1.5"
                    style={{ backgroundColor: COLOR_MAP[c] }}
                  />
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Swoosh customizer */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Underline Swoop</label>
            <select
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
              value={swoop}
              onChange={(e) => setSwoop(e.target.value as SwoopStyle)}
            >
              <option value="none">No Underline Swoosh</option>
              <option value="swoop">Elegant Underline Swoop</option>
              <option value="double-loop">Double Swirl Swoop</option>
              <option value="cross-strike">Striking Cross-Line</option>
            </select>
          </div>

          {/* Customize size & weight */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                <span>Font Size</span>
              </div>
              <input
                type="range"
                min="40"
                max="120"
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                value={customSize}
                onChange={(e) => setCustomSize(parseInt(e.target.value))}
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                <span>Pen Width</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                value={penWidth}
                onChange={(e) => setPenWidth(parseInt(e.target.value))}
              />
            </div>
          </div>

          {/* Toggle Transparent backdrop */}
          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              id="transBg"
              checked={transparentBg}
              onChange={(e) => setTransparentBg(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="transBg" className="text-xs font-semibold text-gray-600 cursor-pointer">
              Transparent Background
            </label>
          </div>

          {/* Export triggers */}
          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={handleDownloadPNG}
              className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
            >
              ↓ Download PNG Image
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDownloadSVG}
                className="py-2 px-3 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Get Vector SVG
              </button>
              <button
                onClick={handleDownloadPDF}
                className="py-2 px-3 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Get PDF Document
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Canvas workspace area */}
      <div className="flex-1 bg-white rounded-2xl shadow border border-gray-100 p-5 flex flex-col items-center justify-center">
        <span className="self-start text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
          Generated Signature Preview
        </span>
        <div className="w-full max-w-xl border border-gray-200 rounded-xl shadow-inner bg-gray-50 p-6 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className={`shadow-lg border border-gray-200 rounded-xl ${
              transparentBg ? "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-white" : "bg-white"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
