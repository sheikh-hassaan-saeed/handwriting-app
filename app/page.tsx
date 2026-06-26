"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Controls, { ControlsState } from "@/components/Controls";
import { generateSeed } from "@/lib/randomize";

const HandwritingCanvas = dynamic(() => import("@/components/HandwritingCanvas"), {
  ssr: false,
});

const DEFAULT_TEXT =
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.";

interface ToolCardProps {
  href: string;
  title: string;
  desc: string;
  badge?: string;
  badgeColor?: string;
}

function ToolCard({ href, title, desc, badge, badgeColor = "bg-indigo-50 text-indigo-600" }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{title}</h3>
        {badge && (
          <span className={`text-xxs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      <span className="inline-block mt-3 text-xs font-semibold text-indigo-500 group-hover:text-indigo-700 transition-colors">
        Open Tool →
      </span>
    </Link>
  );
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [seed, setSeed] = useState<number>(42);
  const [controls, setControls] = useState<ControlsState>({
    font: "Caveat",
    paper: "lined",
    ink: "blue",
    fontSize: 28,
    letterSpacing: 3,
    text: DEFAULT_TEXT,
  });
  const [renderKey, setRenderKey] = useState(0);

  const handleChange = useCallback((next: Partial<ControlsState>) => {
    setControls((prev) => ({ ...prev, ...next }));
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setRenderKey((k) => k + 1);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [controls.text]);

  const handleRegenerate = useCallback(() => {
    setSeed(generateSeed());
    setRenderKey((k) => k + 1);
  }, []);

  const handleDownloadPNG = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "handwriting.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  const handleDownloadPDF = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { jsPDF } = await import("jspdf");
    const imgData = canvas.toDataURL("image/png");
    const canvasW = canvas.width / (window.devicePixelRatio || 1);
    const canvasH = canvas.height / (window.devicePixelRatio || 1);
    const pdfW = 210;
    const pdfH = (canvasH / canvasW) * pdfW;
    const pdf = new jsPDF({
      orientation: pdfH > pdfW ? "portrait" : "landscape",
      unit: "mm",
      format: [pdfW, pdfH],
    });
    pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
    pdf.save("handwriting.pdf");
  }, []);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-indigo-600 tracking-tight">HandwritingMaker</span>
            <span className="hidden lg:inline ml-2 text-xxs text-gray-400 font-bold uppercase tracking-wider">
              Educational Generators Directory
            </span>
          </div>
          <nav className="flex items-center gap-5 text-sm font-medium">
            <Link href="/printables" className="text-gray-500 hover:text-indigo-600">Printables Library</Link>
            <Link href="/notebook-paper" className="text-gray-500 hover:text-indigo-600">Notebook Paper</Link>
            <Link href="/signature-generator" className="text-gray-500 hover:text-indigo-600 font-semibold text-indigo-600">Signature Maker</Link>
            <Link href="/blog" className="text-gray-500 hover:text-indigo-600">Blog</Link>
          </nav>
        </div>
      </header>

      <main className="bg-gray-50 pb-20">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 py-16 px-4 text-center text-white border-b border-indigo-200">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Free Handwriting & Educational Generators
            </h1>
            <p className="text-indigo-100 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-6">
              Create realistic handwritten text, custom school tracing worksheets, calligraphy grids, signatures, and daily organizers. Instant high-quality PDF downloads.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="#main-converter" className="bg-white text-indigo-600 font-bold py-2.5 px-5 rounded-full hover:bg-indigo-50 shadow-md transition-all text-sm">
                ✍️ Text to Handwriting
              </a>
              <Link href="/printables" className="bg-indigo-800 text-indigo-100 border border-indigo-500 font-bold py-2.5 px-5 rounded-full hover:bg-indigo-900 transition-all text-sm">
                📅 Planners Library
              </Link>
              <Link href="/notebook-paper" className="bg-indigo-850 text-indigo-100 border border-indigo-500 font-bold py-2.5 px-5 rounded-full hover:bg-indigo-900 transition-all text-sm">
                📓 Notebook Paper Grid
              </Link>
            </div>
          </div>
        </section>

        {/* 1. INTERACTIVE FEATURED CONVERTER TOOL */}
        <section id="main-converter" className="max-w-7xl mx-auto px-4 py-12 scroll-mt-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-80 flex-shrink-0 bg-white rounded-2xl shadow border border-gray-100 p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Converter Settings</h2>
              <Controls
                state={controls}
                onChange={handleChange}
                onRegenerate={handleRegenerate}
                onDownloadPNG={handleDownloadPNG}
                onDownloadPDF={handleDownloadPDF}
              />
            </div>

            <div className="flex-1 bg-white rounded-2xl shadow border border-gray-100 p-4 min-h-[500px]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Live Preview Canvas</span>
                <button
                  onClick={handleRegenerate}
                  className="text-xs text-indigo-500 hover:text-indigo-700 font-bold"
                >
                  ↺ Randomize Font Slant
                </button>
              </div>
              <HandwritingCanvas
                key={`${renderKey}-${seed}-${controls.font}-${controls.paper}-${controls.ink}-${controls.fontSize}-${controls.letterSpacing}`}
                text={controls.text}
                font={controls.font}
                paper={controls.paper}
                ink={controls.ink}
                fontSize={controls.fontSize}
                letterSpacing={controls.letterSpacing}
                seed={seed}
                canvasRef={canvasRef}
              />
            </div>
          </div>
        </section>

        {/* 2. FEATURED TOOLS */}
        <section className="max-w-7xl mx-auto px-4 py-10 border-t border-gray-150">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Handwriting Generators</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard
              href="/notebook-paper"
              title="Notebook Paper Generator"
              desc="Design custom lined, graph, primary guidelines, dot grid, engineering, and music manuscript sheets."
              badge="Highly Customizable"
            />
            <ToolCard
              href="/cornell-notes"
              title="Cornell Notes Generator"
              desc="Create standard Cornell study sheets. Adjust cue column widths, dates, subjects, and lines."
              badge="Active Recall"
            />
            <ToolCard
              href="/letter-tracing"
              title="Letter Tracing Worksheets"
              desc="Build custom preschool tracing sheets with names, cursive letters, stroke start points, and emoji guides."
              badge="Preschool & Toddler"
              badgeColor="bg-emerald-50 text-emerald-600"
            />
            <ToolCard
              href="/handwriting-practice"
              title="Handwriting Practice Sheet Maker"
              desc="Type custom paragraphs, sentence logs, or spelling cards with cursive, print, or outline dash lines."
              badge="All Ages"
            />
            <ToolCard
              href="/calligraphy"
              title="Calligraphy Guidelines Maker"
              desc="Generate Copperplate, Spencerian, Chancery Italic, or Brush templates with custom angles."
              badge="Calligraphers"
            />
            <ToolCard
              href="/signature-generator"
              title="Typed Signature Generator"
              desc="Type any name to generate elegant handwritten signatures. Toggle transparency and swoosh lines."
              badge="Vector SVG"
              badgeColor="bg-purple-50 text-purple-600"
            />
          </div>
        </section>

        {/* 3. SECTION DIRECTORIES */}
        <section className="max-w-7xl mx-auto px-4 py-10 border-t border-gray-150">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Student Resources */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎓 Student Resources</h2>
              <div className="space-y-4">
                <Link href="/cornell-notes" className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-100 transition-all">
                  <span className="text-lg">📓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Cornell Study Sheets</h4>
                    <p className="text-xs text-gray-500">Structured layout supporting active recall note taking in class.</p>
                  </div>
                </Link>
                <Link href="/printables" className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-100 transition-all">
                  <span className="text-lg">📈</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Study Tracker & Pomodoro</h4>
                    <p className="text-xs text-gray-500">Track 25-minute study intervals, master core concepts and formulas.</p>
                  </div>
                </Link>
                <Link href="/printables" className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-100 transition-all">
                  <span className="text-lg">📚</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Personal Book Reading Log</h4>
                    <p className="text-xs text-gray-500">Record reading accomplishments, author lists, and color ratings.</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Teacher Resources */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">🏫 Teacher Resources</h2>
              <div className="space-y-4">
                <Link href="/letter-tracing" className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-100 transition-all">
                  <span className="text-lg">✏️</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Name Tracing Worksheets</h4>
                    <p className="text-xs text-gray-500">Generate custom student name outlines for early pre-writing training.</p>
                  </div>
                </Link>
                <Link href="/notebook-paper" className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-100 transition-all">
                  <span className="text-lg">👧</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Kindergarten Handwriting Papers</h4>
                    <p className="text-xs text-gray-500">Wide guidelines and dashed center lines to teach uppercase/lowercase form.</p>
                  </div>
                </Link>
                <Link href="/printables" className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-100 transition-all">
                  <span className="text-lg">📋</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Class Assignment Trackers</h4>
                    <p className="text-xs text-gray-500">Assign subjects, set due dates, priority markers, and manage grades.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. RECENTLY ADDED & POPULAR DOWNLOADS */}
        <section className="max-w-7xl mx-auto px-4 py-10 border-t border-gray-150">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">🆕 Recently Added Templates</h2>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm p-2 bg-white rounded-lg border border-gray-50">
                  <span className="text-gray-700">📐 Engineering Green Grid Paper</span>
                  <Link href="/notebook-paper" className="text-xs text-indigo-500 font-semibold">Try Maker</Link>
                </li>
                <li className="flex justify-between items-center text-sm p-2 bg-white rounded-lg border border-gray-50">
                  <span className="text-gray-700">🎼 Blank Music Manuscript Staves</span>
                  <Link href="/notebook-paper" className="text-xs text-indigo-500 font-semibold">Try Maker</Link>
                </li>
                <li className="flex justify-between items-center text-sm p-2 bg-white rounded-lg border border-gray-50">
                  <span className="text-gray-700">🎨 Italic & Spencerian Calligraphy Slants</span>
                  <Link href="/calligraphy" className="text-xs text-indigo-500 font-semibold">Try Maker</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔥 Popular Free Downloads</h2>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm p-2 bg-white rounded-lg border border-gray-50">
                  <span className="text-gray-700">📅 Daily Planner Organizer PDF</span>
                  <Link href="/printables" className="text-xs text-indigo-500 font-semibold">Download</Link>
                </li>
                <li className="flex justify-between items-center text-sm p-2 bg-white rounded-lg border border-gray-50">
                  <span className="text-gray-700">📏 Math Graph Grid Paper PDF</span>
                  <Link href="/notebook-paper" className="text-xs text-indigo-500 font-semibold">Download</Link>
                </li>
                <li className="flex justify-between items-center text-sm p-2 bg-white rounded-lg border border-gray-50">
                  <span className="text-gray-700">📝 Blank Cornell Notes Sheet</span>
                  <Link href="/cornell-notes" className="text-xs text-indigo-500 font-semibold">Download</Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. FAQ GRID */}
        <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-150">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-white border border-gray-200 rounded-xl p-5 cursor-pointer">
              <summary className="font-semibold text-gray-800 list-none flex justify-between items-center">
                Are these generator tools completely free?
                <span className="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                Yes. Every single tool, generator, planner, and graph paper template on HandwritingMaker.com is 100% free to design, download, and print. No account signup, no subscription, and no branding watermarks on downloaded PDFs.
              </p>
            </details>

            <details className="group bg-white border border-gray-200 rounded-xl p-5 cursor-pointer">
              <summary className="font-semibold text-gray-800 list-none flex justify-between items-center">
                Do you support both A4 and Letter paper formats?
                <span className="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                Yes. All our generators allow toggling between standard International A4 dimensions and North American Letter (or Legal) paper sizes. The resulting PDF files compile directly to matching pixel bounds so they print cleanly.
              </p>
            </details>

            <details className="group bg-white border border-gray-200 rounded-xl p-5 cursor-pointer">
              <summary className="font-semibold text-gray-800 list-none flex justify-between items-center">
                Can I export signatures with transparent backgrounds?
                <span className="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                Yes. The Signature Generator supports a transparent background toggle. When checked, downloading the signature as a PNG or vector SVG provides a transparent alpha layer, allowing you to insert the signature seamlessly over doc lines.
              </p>
            </details>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} HandwritingMaker. Free to use education worksheets & planners.</span>
          <nav className="flex gap-4" aria-label="Footer navigation">
            <Link href="/" className="hover:text-indigo-600">Home Converter</Link>
            <Link href="/printables" className="hover:text-indigo-600">Printables</Link>
            <Link href="/blog" className="hover:text-indigo-600">Blog</Link>
            <Link href="/contact" className="hover:text-indigo-600">Contact</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
