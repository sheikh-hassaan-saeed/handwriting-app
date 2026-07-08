"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  WORKSHEET_FONTS,
  loadCanvasFont,
  drawGuideline,
  PaperSize,
} from "@/lib/worksheetRender";
import FaqAccordion from "@/components/FaqAccordion";

interface WorksheetPageClientProps {
  config: {
    title: string;
    description: string;
    h1: string;
    intro: string;
    conclusion: string;
    faqs: { q: string; a: string }[];
    relatedTools: { name: string; href: string }[];
    relatedArticles: { name: string; href: string }[];
  };
  initialPreset?: {
    input: string;
    layout: LayoutMode;
    letterStyle: LetterStyleMode;
    fontStyle: FontStyle;
    guideline: "solid" | "dotted" | "none";
    repetitions: 1 | 2 | 3;
    lineSpacing?: number;
    fontSizeRatio?: number;
  };
}

type LayoutMode = "single" | "two" | "sentence" | "free";
type FontStyle = "print" | "cursive";
type LetterStyleMode = "solid" | "dottedTrace" | "outline";
type OrientationMode = "portrait" | "landscape";
type TabId = "content" | "style" | "document";

const LAYOUTS: { value: LayoutMode; label: string; desc: string }[] = [
  { value: "single", label: "Single Word", desc: "Repeats one word per line." },
  { value: "two", label: "Two Words", desc: "Fits two words side-by-side." },
  { value: "sentence", label: "Sentence Repeat", desc: "Repeats the full text on each line." },
  { value: "free", label: "Free Writing", desc: "Prints lines verbatim without repeating." },
];

const GUIDELINES: { value: "solid" | "dotted" | "none"; label: string }[] = [
  { value: "dotted", label: "Dotted Guidelines" },
  { value: "solid", label: "Solid Guidelines" },
  { value: "none", label: "No Guidelines" },
];

function buildLines(input: string, layout: LayoutMode): string[] {
  if (layout === "free") {
    return input.split("\n");
  }

  const cleaned = input.trim();
  if (!cleaned) return [];

  if (layout === "sentence") {
    return [cleaned.replace(/\s+/g, " ")];
  }

  const tokens = cleaned.split(/\s+/).filter(Boolean);
  if (layout === "single") {
    return tokens;
  }
  const pairs: string[] = [];
  for (let i = 0; i < tokens.length; i += 2) {
    pairs.push(tokens.slice(i, i + 2).join(" "));
  }
  return pairs;
}

// Custom Paper Pixel Size mapping supporting Orientation
function getPaperSize(size: PaperSize, orientation: OrientationMode) {
  const base = size === "A4" ? { w: 800, h: 1131 } : { w: 816, h: 1056 };
  return orientation === "landscape" ? { w: base.h, h: base.w } : base;
}

// Custom Draw Line Text supporting Solid, Dotted Trace, and Hollow Outline
function drawCustomLineText(
  ctx: CanvasRenderingContext2D,
  opts: {
    x: number;
    yBaseline: number;
    text: string;
    font: string;
    fontSize: number;
    letterSpacing: number;
    inkColor: string;
    mode: LetterStyleMode;
  }
) {
  const { x, yBaseline, text, font, fontSize, letterSpacing, inkColor, mode } = opts;
  if (!text) return;

  ctx.save();
  ctx.font = `${fontSize}px '${font}', cursive`;
  ctx.textBaseline = "alphabetic";

  if (mode === "solid") {
    ctx.fillStyle = inkColor;
    let cx = x;
    for (const ch of text) {
      ctx.fillText(ch, cx, yBaseline);
      cx += ctx.measureText(ch).width + letterSpacing;
    }
  } else if (mode === "dottedTrace") {
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = 1.25;
    ctx.setLineDash([1.5, 2.5]);
    let cx = x;
    for (const ch of text) {
      ctx.strokeText(ch, cx, yBaseline);
      cx += ctx.measureText(ch).width + letterSpacing;
    }
  } else if (mode === "outline") {
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([]); // solid border, hollow inside
    let cx = x;
    for (const ch of text) {
      ctx.strokeText(ch, cx, yBaseline);
      cx += ctx.measureText(ch).width + letterSpacing;
    }
  }
  ctx.restore();
}

export default function WorksheetPageClient({ config, initialPreset }: WorksheetPageClientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Tab State
  const [activeTab, setActiveTab] = useState<TabId>("content");

  // Worksheet Config State
  const [input, setInput] = useState("Emma");
  const [layout, setLayout] = useState<LayoutMode>("single");
  const [guideline, setGuideline] = useState<"solid" | "dotted" | "none">("dotted");
  const [letterStyle, setLetterStyle] = useState<LetterStyleMode>("dottedTrace");
  const [repetitions, setRepetitions] = useState<1 | 2 | 3>(3);
  const [fontStyle, setFontStyle] = useState<FontStyle>("print");
  const [paperSize, setPaperSize] = useState<PaperSize>("A4");
  const [orientation, setOrientation] = useState<OrientationMode>("portrait");
  const [lineSpacing, setLineSpacing] = useState(75); // lineGap in px
  const [fontSizeRatio, setFontSizeRatio] = useState(45); // % of lineSpacing
  
  // Multipage & UI States
  const [currentPage, setCurrentPage] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPngDownloading, setIsPngDownloading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"Idle" | "Saving" | "Saved">("Idle");

  // Load Settings from LocalStorage or Preset
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (initialPreset) {
        setInput(initialPreset.input);
        setLayout(initialPreset.layout);
        setLetterStyle(initialPreset.letterStyle);
        setFontStyle(initialPreset.fontStyle);
        setGuideline(initialPreset.guideline);
        setRepetitions(initialPreset.repetitions);
        if (initialPreset.lineSpacing !== undefined) setLineSpacing(initialPreset.lineSpacing);
        if (initialPreset.fontSizeRatio !== undefined) setFontSizeRatio(initialPreset.fontSizeRatio);
      } else {
        const saved = localStorage.getItem("handwritingmaker-worksheet-settings");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed.input !== undefined) setInput(parsed.input);
            if (parsed.layout !== undefined) setLayout(parsed.layout);
            if (parsed.guideline !== undefined) setGuideline(parsed.guideline);
            if (parsed.letterStyle !== undefined) setLetterStyle(parsed.letterStyle);
            if (parsed.repetitions !== undefined) setRepetitions(parsed.repetitions);
            if (parsed.fontStyle !== undefined) setFontStyle(parsed.fontStyle);
            if (parsed.paperSize !== undefined) setPaperSize(parsed.paperSize);
            if (parsed.orientation !== undefined) setOrientation(parsed.orientation);
            if (parsed.lineSpacing !== undefined) setLineSpacing(parsed.lineSpacing);
            if (parsed.fontSizeRatio !== undefined) setFontSizeRatio(parsed.fontSizeRatio);
          } catch (e) {
            console.error("Failed to parse settings", e);
          }
        }
      }
    }
  }, [initialPreset]);

  // Save Settings to LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSaveStatus("Saving");
      const settings = {
        input,
        layout,
        guideline,
        letterStyle,
        repetitions,
        fontStyle,
        paperSize,
        orientation,
        lineSpacing,
        fontSizeRatio,
      };
      localStorage.setItem("handwritingmaker-worksheet-settings", JSON.stringify(settings));
      const id = setTimeout(() => setSaveStatus("Saved"), 400);
      return () => clearTimeout(id);
    }
  }, [input, layout, guideline, letterStyle, repetitions, fontStyle, paperSize, orientation, lineSpacing, fontSizeRatio]);

  // Derived repeating lines
  const allLines = useMemo(() => {
    const entries = buildLines(input, layout);
    if (layout === "free") return entries; // free write has no repetitions configuration
    const repeated: string[] = [];
    for (const entry of entries) {
      for (let r = 0; r < repetitions; r++) repeated.push(entry);
    }
    return repeated;
  }, [input, layout, repetitions]);

  // Dynamic calculations for pages
  const { w, h } = useMemo(() => getPaperSize(paperSize, orientation), [paperSize, orientation]);
  const marginTop = 110;
  const marginBottom = 60;
  const marginLeft = 55;
  const marginRight = 45;
  const availableHeight = h - marginTop - marginBottom;
  
  const maxLinesPerPage = useMemo(() => {
    return Math.max(1, Math.floor(availableHeight / lineSpacing));
  }, [availableHeight, lineSpacing]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(allLines.length / maxLinesPerPage));
  }, [allLines, maxLinesPerPage]);

  // Adjust page number bounds on content change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);



  // Render Single Page on Canvas Context
  const drawPage = useCallback(async (ctx: CanvasRenderingContext2D, pageIndex: number) => {
    const font = fontStyle === "cursive" ? WORKSHEET_FONTS.cursive : WORKSHEET_FONTS.print;
    const fontSize = lineSpacing * (fontSizeRatio / 100);

    // Background color
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    await loadCanvasFont(font, fontSize);

    // Draw Name / Date Header
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#4b5563";
    ctx.fillText("Name:", marginLeft, 40);
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(marginLeft + 55, 42);
    ctx.lineTo(w * 0.6, 42);
    ctx.stroke();

    ctx.fillText("Date:", w * 0.65, 40);
    ctx.beginPath();
    ctx.moveTo(w * 0.65 + 45, 42);
    ctx.lineTo(w - marginRight, 42);
    ctx.stroke();

    const start = (pageIndex - 1) * maxLinesPerPage;
    const pageLines = allLines.slice(start, start + maxLinesPerPage);

    if (pageLines.length === 0) {
      ctx.fillStyle = "#9ca3af";
      ctx.font = "italic 20px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Enter text in settings to preview worksheet...", w / 2, h / 2);
    } else {
      pageLines.forEach((line, i) => {
        const yBaseline = marginTop + i * lineSpacing;
        drawGuideline(ctx, marginLeft, w - marginRight, yBaseline, fontSize, guideline);
        drawCustomLineText(ctx, {
          x: marginLeft,
          yBaseline,
          text: line,
          font,
          fontSize,
          letterSpacing: 4,
          inkColor: "#1e293b",
          mode: letterStyle,
        });
      });
    }
  }, [allLines, fontStyle, guideline, letterStyle, lineSpacing, fontSizeRatio, maxLinesPerPage, w, h]);

  // Main Preview Canvas Renderer
  const render = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    await drawPage(ctx, currentPage);
  }, [drawPage, currentPage, w, h]);

  // Trigger render on config changes
  useEffect(() => {
    const id = setTimeout(render, 50);
    return () => clearTimeout(id);
  }, [render]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.fonts.ready.then(render);
    }
  }, [render]);

  // PDF Multi-page Downloader
  const handleDownloadPDF = async () => {
    if (!canvasRef.current || isDownloading) return;
    setIsDownloading(true);

    try {
      const { jsPDF } = await import("jspdf");
      
      // Temporary canvas to render each page sequentially
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = w;
      tempCanvas.height = h;
      const tempCtx = tempCanvas.getContext("2d")!;

      const pdf = new jsPDF({
        orientation: orientation === "landscape" ? "landscape" : "portrait",
        unit: "pt",
        format: paperSize === "A4" ? "a4" : "letter",
      });

      for (let p = 1; p <= totalPages; p++) {
        if (p > 1) pdf.addPage();
        
        // Render current loop index page onto temp canvas
        await drawPage(tempCtx, p);
        
        const imgData = tempCanvas.toDataURL("image/png");
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "PNG", 0, 0, pageW, pageH);
      }

      pdf.save("handwriting-worksheet.pdf");
    } catch (e) {
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  };

  // PNG Page Exporter
  const handleDownloadPNG = async () => {
    if (!canvasRef.current || isPngDownloading) return;
    setIsPngDownloading(true);

    try {
      const link = document.createElement("a");
      link.download = `worksheet-page-${currentPage}.png`;
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error(e);
    } finally {
      setIsPngDownloading(false);
    }
  };

  // Reset all fields to default
  const handleResetSettings = () => {
    setInput("Emma");
    setLayout("single");
    setLetterStyle("dottedTrace");
    setFontStyle("print");
    setGuideline("dotted");
    setPaperSize("A4");
    setOrientation("portrait");
    setLineSpacing(75);
    setFontSizeRatio(45);
    setCurrentPage(1);
  };

  // Secondary CTA Loader - Preload sample
  const handleLoadExample = () => {
    setInput("Practice makes perfect penmanship.");
    setLayout("sentence");
    setLetterStyle("dottedTrace");
    setFontStyle("cursive");
    setGuideline("dotted");
    setRepetitions(2);
    setLineSpacing(80);
    setFontSizeRatio(45);
    setCurrentPage(1);

    const el = document.getElementById("worksheet-workspace");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleGenerateClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight flex items-center gap-1.5">
            <span className="text-2xl">✏️</span> HandwritingMaker
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/" className="text-indigo-600 font-semibold underline underline-offset-4">Worksheet Maker</Link>
            <Link href="/notebook-paper" className="hover:text-indigo-600 transition-colors">Notebook Paper</Link>
            <Link href="/cornell-notes" className="hover:text-indigo-600 transition-colors">Cornell Notes</Link>
            <Link href="/letter-tracing" className="hover:text-indigo-600 transition-colors">Letter Tracing</Link>
            <Link href="/calligraphy" className="hover:text-indigo-600 transition-colors">Calligraphy</Link>
            <Link href="/signature-generator" className="hover:text-indigo-600 transition-colors">Signature</Link>
            <Link href="/printables" className="hover:text-indigo-600 transition-colors">Templates</Link>
            <Link href="/blog" className="hover:text-indigo-600 transition-colors">Guides</Link>
          </nav>
          <Link
            href="/contact"
            className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full font-bold transition-all"
          >
            Help & Support
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white py-14 sm:py-20 px-4 relative overflow-hidden border-b border-indigo-950">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-900/60 border border-indigo-800/80 px-3.5 py-1.5 rounded-full inline-block shadow-sm">
            🎯 SaaS-grade Worksheet Creator
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none">
            {config.h1}
          </h1>
          <p className="text-indigo-200/90 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Generate customized letter-tracing sheets, alphabet practice books, and handwriting guidelines in seconds. Customize font sizes, margins, orientations, print styles, and download clean PDFs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleGenerateClick}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md transition-all text-sm sm:text-base flex items-center gap-2"
            >
              ✍️ Open Creator Workspace
            </button>
            <button
              onClick={handleLoadExample}
              className="px-8 py-3.5 bg-slate-900/40 hover:bg-white/5 border border-white/20 text-white font-semibold rounded-xl transition-all text-sm sm:text-base"
            >
              💡 Load Cursive Preset
            </button>
          </div>
        </div>
      </section>

      {/* Workspace */}
      <section id="worksheet-workspace" className="max-w-7xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full scroll-mt-20">
        
        {/* Workspace Status Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚙️</span>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Workspace Dashboard</h2>
              <p className="text-xxs text-slate-400">Configure margins, spacing ratios, and styles below.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Auto-save Status */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className={`w-2.5 h-2.5 rounded-full ${
                saveStatus === "Saved" ? "bg-emerald-500" : saveStatus === "Saving" ? "bg-amber-500" : "bg-slate-300"
              }`} />
              <span className="text-xxs font-medium">
                {saveStatus === "Saved" ? "Draft saved locally" : saveStatus === "Saving" ? "Saving..." : "Draft active"}
              </span>
            </div>
            <button
              onClick={handleResetSettings}
              className="text-xxs text-rose-500 hover:text-rose-600 border border-rose-150 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg font-bold transition-all"
            >
              ↺ Reset Settings
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Controls Sidebar */}
          <aside className="w-full lg:w-96 flex-shrink-0 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50">
              {(["content", "style", "document"] as TabId[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3.5 text-xs font-bold capitalize transition-all border-b-2 text-center ${
                    activeTab === tab
                      ? "border-indigo-600 bg-white text-indigo-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab === "content" ? "✍️ Text" : tab === "style" ? "🎨 Style" : "📄 Page"}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-6">

              {/* TAB 1: TEXT CONTENT */}
              {activeTab === "content" && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-1.5">
                    <label htmlFor="content-input" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Worksheet Text
                    </label>
                    <textarea
                      id="content-input"
                      ref={inputRef}
                      className="w-full h-28 p-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white text-slate-800 transition-all font-mono"
                      placeholder="Type letters, child names, or full paragraphs..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>

                  {/* Layout selector */}
                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Text Layout Preset
                    </span>
                    <div className="grid grid-cols-1 gap-1.5">
                      {LAYOUTS.map((l) => (
                        <button
                          key={l.value}
                          onClick={() => setLayout(l.value)}
                          className={`px-3.5 py-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${
                            layout === l.value
                              ? "border-indigo-500 bg-indigo-50/50 text-indigo-700 font-bold"
                              : "border-slate-200 hover:border-indigo-200 bg-white text-slate-600"
                          }`}
                        >
                          <div>
                            <span className="block">{l.label}</span>
                            <span className="block text-xxs text-slate-400 font-normal mt-0.5">{l.desc}</span>
                          </div>
                          {layout === l.value && <span className="text-indigo-600">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Repetitions (hidden if Free Write mode is active) */}
                  {layout !== "free" && (
                    <div className="space-y-2">
                      <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Repetitions per Line
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((n) => (
                          <button
                            key={n}
                            onClick={() => setRepetitions(n as 1 | 2 | 3)}
                            className={`py-2 rounded-xl border text-xs font-bold text-center transition-all ${
                              repetitions === n
                                ? "border-indigo-500 bg-indigo-50/50 text-indigo-700"
                                : "border-slate-200 hover:border-indigo-200 bg-white text-slate-600"
                            }`}
                          >
                            {n} {n === 1 ? "Time" : "Times"}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: TYPOGRAPHY & SPACING */}
              {activeTab === "style" && (
                <div className="space-y-5 animate-fade-in">
                  
                  {/* Font Type Selection */}
                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Worksheet Font Style
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setFontStyle("print")}
                        className={`py-3 rounded-xl border text-xs text-center font-bold capitalize transition-all ${
                          fontStyle === "print"
                            ? "border-indigo-500 bg-indigo-50/50 text-indigo-700"
                            : "border-slate-200 hover:border-indigo-200 bg-white text-slate-600"
                        }`}
                      >
                        Print Block
                      </button>
                      <button
                        onClick={() => setFontStyle("cursive")}
                        className={`py-3 rounded-xl border text-xs text-center font-bold capitalize transition-all ${
                          fontStyle === "cursive"
                            ? "border-indigo-500 bg-indigo-50/50 text-indigo-700"
                            : "border-slate-200 hover:border-indigo-200 bg-white text-slate-600"
                        }`}
                      >
                        Cursive Loop
                      </button>
                    </div>
                  </div>

                  {/* Letter Style (Solid vs Tracing vs Outline) */}
                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Worksheet Letter Style
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {(["solid", "dottedTrace", "outline"] as LetterStyleMode[]).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setLetterStyle(mode)}
                          className={`py-3 rounded-xl border text-xxs font-bold text-center capitalize transition-all ${
                            letterStyle === mode
                              ? "border-indigo-500 bg-indigo-50/50 text-indigo-700"
                              : "border-slate-200 hover:border-indigo-200 bg-white text-slate-600"
                          }`}
                        >
                          {mode === "solid" ? "Solid Fill" : mode === "dottedTrace" ? "Trace Dots" : "Outline"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Line Spacing Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                      <span>Line Spacing</span>
                      <span className="text-indigo-600">{lineSpacing}px</span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={140}
                      value={lineSpacing}
                      onChange={(e) => setLineSpacing(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Font Size ratio Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                      <span>Font Size Scale</span>
                      <span className="text-indigo-600">{fontSizeRatio}%</span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={70}
                      value={fontSizeRatio}
                      onChange={(e) => setFontSizeRatio(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Guidelines Style */}
                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Guideline Spacing Style
                    </span>
                    <div className="grid grid-cols-1 gap-1.5">
                      {GUIDELINES.map((g) => (
                        <button
                          key={g.value}
                          onClick={() => setGuideline(g.value)}
                          className={`px-3.5 py-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${
                            guideline === g.value
                              ? "border-indigo-500 bg-indigo-50/50 text-indigo-700 font-bold"
                              : "border-slate-200 hover:border-indigo-200 bg-white text-slate-600"
                          }`}
                        >
                          <span>{g.label}</span>
                          {guideline === g.value && <span className="text-indigo-600">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: DOCUMENT LAYOUT */}
              {activeTab === "document" && (
                <div className="space-y-5 animate-fade-in">
                  
                  {/* Paper Format */}
                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Paper Size Format
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {(["A4", "Letter"] as PaperSize[]).map((size) => (
                        <button
                          key={size}
                          onClick={() => setPaperSize(size)}
                          className={`py-3 rounded-xl border text-xs text-center font-bold transition-all ${
                            paperSize === size
                              ? "border-indigo-500 bg-indigo-50/50 text-indigo-700"
                              : "border-slate-200 hover:border-indigo-200 bg-white text-slate-600"
                          }`}
                        >
                          {size} Size
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Orientation */}
                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Page Orientation
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {(["portrait", "landscape"] as OrientationMode[]).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setOrientation(mode)}
                          className={`py-3 rounded-xl border text-xs text-center font-bold capitalize transition-all ${
                            orientation === mode
                              ? "border-indigo-500 bg-indigo-50/50 text-indigo-700"
                              : "border-slate-200 hover:border-indigo-200 bg-white text-slate-600"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Actions Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 text-white font-extrabold text-sm hover:bg-indigo-500 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Compiling PDF Pages...</span>
                  </>
                ) : (
                  <>
                    <span>↓ Download Multipage PDF</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadPNG}
                disabled={isPngDownloading}
                className="w-full py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <span>📷 Download Page {currentPage} as PNG</span>
              </button>
            </div>

          </aside>

          {/* Canvas Preview Area */}
          <div className="flex-1 w-full bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 min-h-[550px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Document Preview ({paperSize} - {orientation})
                </span>
                
                {/* Page Navigation Indicator */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl shadow-xxs">
                    <button
                      onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
                      disabled={currentPage === 1}
                      className="text-xs font-bold text-slate-500 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-500"
                    >
                      ← Prev
                    </button>
                    <span className="text-xxs font-bold text-slate-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((c) => Math.min(totalPages, c + 1))}
                      disabled={currentPage === totalPages}
                      className="text-xs font-bold text-slate-500 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-500"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>

              {/* Canvas Outer Frame */}
              <div className="bg-slate-100 rounded-2xl border border-slate-200 p-2 sm:p-6 flex items-center justify-center overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="w-full rounded-xl shadow-md border border-slate-350 bg-white max-w-[500px] transition-all"
                  role="img"
                  aria-label="Customizable handwriting practice worksheet preview"
                />
              </div>
            </div>

            {/* Note Cues */}
            <div className="text-center text-slate-400 text-xxs mt-4 leading-relaxed max-w-lg mx-auto">
              This preview matches the output PDF bounds. Adjust Line Spacing and Font Size sliders above to achieve ideal penmanship guidelines proportions.
            </div>
          </div>

        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white border-t border-slate-200 py-14 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How to Create Handwriting Worksheets</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
              Follow these simple steps to build custom penmanship outlines for preschool classes or private drills.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-8 text-center space-y-3 shadow-xxs">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 font-extrabold rounded-xl flex items-center justify-center text-lg mx-auto">
                1
              </div>
              <h3 className="text-base font-bold text-slate-800">Enter Practice Text</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Type names, sight word lists, or copy practice sentences in our editor tab.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-8 text-center space-y-3 shadow-xxs">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 font-extrabold rounded-xl flex items-center justify-center text-lg mx-auto">
                2
              </div>
              <h3 className="text-base font-bold text-slate-800">Customize Layout</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Toggle print or cursive styles, guideline structures, and adjust height sliders to fit.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-8 text-center space-y-3 shadow-xxs">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 font-extrabold rounded-xl flex items-center justify-center text-lg mx-auto">
                3
              </div>
              <h3 className="text-base font-bold text-slate-800">Print or Download</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Export high-resolution PDFs or PNG page drafts with no signup, watermarks, or fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature List Grid */}
      <section className="bg-slate-50 border-t border-slate-200 py-14 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Worksheet Creator Features</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
              Our software tool delivers standard parameters matching primary educational worksheets.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
              <span className="text-indigo-600 font-bold">✓</span>
              <h4 className="text-sm font-bold text-slate-800">Custom Text Input</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Enter child names, word lists, sight words, or paragraphs without character limits.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
              <span className="text-indigo-600 font-bold">✓</span>
              <h4 className="text-sm font-bold text-slate-800">Adjustable Guidelines</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Toggle standard three-line dotted lines, solid lines, or no guidelines layout.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
              <span className="text-indigo-600 font-bold">✓</span>
              <h4 className="text-sm font-bold text-slate-800">Cursive Script & Print Font</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Support primary school print fonts (Patrick Hand) and slanted cursives (Dancing Script).</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
              <span className="text-indigo-600 font-bold">✓</span>
              <h4 className="text-sm font-bold text-slate-800">Dotted Tracing Letters</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Convert solid letters to hollow tracing paths to let toddlers draw guidelines correctly.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
              <span className="text-indigo-600 font-bold">✓</span>
              <h4 className="text-sm font-bold text-slate-800">Hollow Outline Fonts</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Select outline styling to print hollow letter coordinates children can color inside.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
              <span className="text-indigo-600 font-bold">✓</span>
              <h4 className="text-sm font-bold text-slate-800">Line spacing & ratio sliders</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Adjust layout heights and font-scale ratios dynamically to get the perfect fit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white border-t border-slate-200 py-14 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Why Teachers and Families Love HandwritingMaker</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
              Our interactive practice sheet creator supports diverse handwriting development tracks.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0">
                🏫
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 text-sm">For School Teachers</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Design specialized alphabet trace lists or homework sheets for elementary classes. Instantly print a unique name tracing guideline sheet for every child in your classroom.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0">
                🏡
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 text-sm">For Preschool Parents</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Prepare toddlers for kindergarten by teaching letter stroke orders, pen controls, and name recognition drills at home.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0">
                ✍️
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 text-sm">For Adult Calligraphers</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Practice complex loop shapes, adjust slant offsets, or train script muscle coordinates using customized sentence templates.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0">
                🧠
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 text-sm">For Students & Active Recall</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Integrate custom handwriting sheets with active recall study systems to boost memory retention during exam revisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-slate-50 border-t border-slate-200 py-14 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-8">Frequently Asked Questions</h2>
          <FaqAccordion items={config.faqs} />
        </div>
      </section>

      {/* Internal Links Placeholders */}
      <section className="bg-white border-t border-slate-200 py-14 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Worksheet Collections & Resources</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
              Future structured clusters covering tracing and handwriting practice worksheets.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="border border-slate-150 rounded-2xl p-5 hover:border-slate-300 transition-all bg-slate-50/50">
              <h4 className="text-sm font-bold text-slate-800 mb-1">Handwriting Practice</h4>
              <p className="text-xs text-slate-400 mb-3">Copy drills and penmanship practice sheets for everyday letters.</p>
              <span className="text-xxs font-semibold text-slate-400 uppercase tracking-wider block">Coming Soon (Supporting Presets)</span>
            </div>
            <div className="border border-slate-150 rounded-2xl p-5 hover:border-slate-300 transition-all bg-slate-50/50">
              <h4 className="text-sm font-bold text-slate-800 mb-1">Tracing Worksheets</h4>
              <p className="text-xs text-slate-400 mb-3">Dashed line tracing templates for toddler preschool classes.</p>
              <span className="text-xxs font-semibold text-slate-400 uppercase tracking-wider block">Coming Soon (Supporting Presets)</span>
            </div>
            <div className="border border-slate-150 rounded-2xl p-5 hover:border-slate-300 transition-all bg-slate-50/50">
              <h4 className="text-sm font-bold text-slate-800 mb-1">Cursive Worksheets</h4>
              <p className="text-xs text-slate-400 mb-3">Slanted guidelines and connected script loops learning binders.</p>
              <span className="text-xxs font-semibold text-slate-400 uppercase tracking-wider block">Coming Soon (Supporting Presets)</span>
            </div>
            <div className="border border-slate-150 rounded-2xl p-5 hover:border-slate-300 transition-all bg-slate-50/50">
              <h4 className="text-sm font-bold text-slate-800 mb-1">Name Tracing</h4>
              <p className="text-xs text-slate-400 mb-3">Custom names tracing layouts for kindergarten name recognition.</p>
              <span className="text-xxs font-semibold text-slate-400 uppercase tracking-wider block">Coming Soon (Supporting Presets)</span>
            </div>
            <div className="border border-slate-150 rounded-2xl p-5 hover:border-slate-300 transition-all bg-slate-50/50">
              <h4 className="text-sm font-bold text-slate-800 mb-1">Adult Penmanship</h4>
              <p className="text-xs text-slate-400 mb-3">Refined cursive drills, quotes, and layouts optimized for adult users.</p>
              <span className="text-xxs font-semibold text-slate-400 uppercase tracking-wider block">Coming Soon (Supporting Presets)</span>
            </div>
            <div className="border border-slate-150 rounded-2xl p-5 hover:border-slate-300 transition-all bg-slate-50/50">
              <h4 className="text-sm font-bold text-slate-800 mb-1">Kids Fine Motor Skills</h4>
              <p className="text-xs text-slate-400 mb-3">Vertical lines, curved loops, and tracing patterns for preschool motor development.</p>
              <span className="text-xxs font-semibold text-slate-400 uppercase tracking-wider block">Coming Soon (Supporting Presets)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-start justify-between gap-8 text-sm text-slate-500">
          <div className="space-y-2 max-w-xs">
            <span className="font-extrabold text-indigo-600 text-lg block">✏️ HandwritingMaker</span>
            <p className="text-xxs text-slate-400 leading-normal">
              The internet&apos;s leading free resource for printable handwriting worksheets, school lined papers, Cornell notes, calligraphy slants, and typed signatures.
            </p>
            <span className="text-xxs text-slate-400 block pt-2">© {new Date().getFullYear()} HandwritingMaker. Free to use, forever.</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Ruled Papers</span>
              <nav className="flex flex-col gap-2 text-xxs font-medium" aria-label="Ruled papers footer navigation">
                <Link href="/notebook-paper" className="hover:text-indigo-600 transition-colors">Lined Notebook PaperHub</Link>
                <Link href="/cornell-notes" className="hover:text-indigo-600 transition-colors">Cornell Notes Maker</Link>
                <Link href="/tools/blank-handwriting-paper" className="hover:text-indigo-600 transition-colors">Blank Handwriting Paper</Link>
                <Link href="/tools/handwriting-paper-generator" className="hover:text-indigo-600 transition-colors">Handwriting Paper Creator</Link>
              </nav>
            </div>
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Tracing Tools</span>
              <nav className="flex flex-col gap-2 text-xxs font-medium" aria-label="Tracing tools footer navigation">
                <Link href="/letter-tracing" className="hover:text-indigo-600 transition-colors">Letter Tracing Hub</Link>
                <Link href="/tools/name-tracing-generator" className="hover:text-indigo-600 transition-colors">Name Tracing worksheets</Link>
                <Link href="/tools/alphabet-tracing-generator" className="hover:text-indigo-600 transition-colors">Alphabet Tracing Creator</Link>
                <Link href="/tools/tracing-worksheet-generator" className="hover:text-indigo-600 transition-colors">Dotted Line Worksheets</Link>
              </nav>
            </div>
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Calligraphy & Creative</span>
              <nav className="flex flex-col gap-2 text-xxs font-medium" aria-label="Calligraphy and creative footer navigation">
                <Link href="/calligraphy" className="hover:text-indigo-600 transition-colors">Calligraphy practice Grids</Link>
                <Link href="/signature-generator" className="hover:text-indigo-600 transition-colors">Typed Signature Maker</Link>
                <Link href="/printables" className="hover:text-indigo-600 transition-colors">Printable templates</Link>
                <Link href="/blog" className="hover:text-indigo-600 transition-colors">Guides Blog</Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
