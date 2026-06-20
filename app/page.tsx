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

  // Debounce re-render trigger on text change only
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
    // A4: 210 x 297 mm; fit width
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
            <span className="text-xl font-bold text-indigo-600 tracking-tight">
              HandwritingMaker
            </span>
            <span className="hidden sm:inline ml-2 text-xs text-gray-400 font-medium uppercase tracking-widest">
              Free Text to Handwriting Converter
            </span>
          </div>
          <nav className="flex items-center gap-5 text-sm font-medium">
            <a href="#how-to" className="text-gray-500 hover:text-indigo-600 hover:underline">
              How it works
            </a>
            <Link href="/blog" className="text-indigo-600 hover:underline">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* H1 hero */}
        <section className="bg-gradient-to-br from-indigo-50 to-white py-8 px-4 text-center border-b border-indigo-100">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Text to Handwriting Converter
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Turn any typed text into beautiful, realistic handwriting. Download as PNG or PDF — free, instant, no signup.
          </p>
        </section>

        {/* Tool */}
        <section
          className="max-w-7xl mx-auto px-4 py-8"
          aria-label="Handwriting converter tool"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left panel — controls */}
            <aside
              className="w-full lg:w-80 flex-shrink-0 bg-white rounded-2xl shadow border border-gray-100 p-5"
              aria-label="Handwriting controls"
            >
              <Controls
                state={controls}
                onChange={handleChange}
                onRegenerate={handleRegenerate}
                onDownloadPNG={handleDownloadPNG}
                onDownloadPDF={handleDownloadPDF}
              />
            </aside>

            {/* Right panel — canvas preview */}
            <div className="flex-1 bg-white rounded-2xl shadow border border-gray-100 p-4 min-h-[500px]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Live Preview
                </span>
                <button
                  onClick={handleRegenerate}
                  className="text-xs text-indigo-500 hover:text-indigo-700 font-medium"
                  aria-label="Regenerate handwriting"
                >
                  ↺ Randomize
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

        {/* More tools */}
        <section className="max-w-7xl mx-auto px-4 py-12" aria-label="More handwriting tools">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">More Handwriting Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/tools/handwriting-practice-sheets"
              className="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all p-5"
            >
              <span className="font-semibold text-gray-900">Handwriting Practice Sheet Generator</span>
              <p className="text-sm text-gray-500 mt-1">
                Printable practice sheets with cursive, print, and dotted trace modes.
              </p>
            </Link>
            <Link
              href="/tools/handwriting-worksheet-maker"
              className="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all p-5"
            >
              <span className="font-semibold text-gray-900">Handwriting Worksheet Maker</span>
              <p className="text-sm text-gray-500 mt-1">
                Build custom worksheets from any name, word list, or sentence.
              </p>
            </Link>
            <Link
              href="/tools/animated-handwriting-generator"
              className="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all p-5"
            >
              <span className="font-semibold text-gray-900">Animated Handwriting Generator</span>
              <p className="text-sm text-gray-500 mt-1">
                Turn any text into a handwriting animation you can download as a GIF.
              </p>
            </Link>
          </div>
        </section>

        {/* SEO content section */}
        <section
          id="how-to"
          className="max-w-4xl mx-auto px-4 py-12 prose prose-gray"
          aria-label="About the handwriting converter"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            How to Convert Text to Handwriting
          </h2>
          <p className="text-gray-600 mb-4">
            Using HandwritingMaker is as simple as typing. Paste or type your text into the input box on the left, choose your preferred handwriting style, pick a paper background, select an ink color, then hit <strong>Download PNG</strong> or <strong>Download PDF</strong>. Every render is unique — our randomization engine adds subtle per-letter variation so the output never looks like a computer font stamped out mechanically.
          </p>
          <p className="text-gray-600 mb-8">
            Whether you need a handwritten note for a school project, a personalized letter, or a social-media-worthy quote card, HandwritingMaker produces results that are indistinguishable from pen-and-paper writing — all in your browser, with zero data sent to any server.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why Use HandwritingMaker?
          </h2>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Why Use HandwritingMaker?
          </h3>
          <p className="text-gray-600 mb-4">
            Most text-to-handwriting tools on the web use a single fixed font with zero variation — every letter looks identical to the last. HandwritingMaker&apos;s rendering engine applies micro-randomness to each character: slight rotation, scale jitter, vertical wobble, and variable opacity. The result is writing that breathes like real handwriting, not a stamped typeface.
          </p>
          <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-1">
            <li>Five distinct handwriting personalities: cursive, print, scrawl, slanted, and casual student</li>
            <li>Four realistic paper backgrounds including lined notebook and yellow legal pad</li>
            <li>Four ink types: black ballpoint, blue ink, red pen, and soft pencil gray</li>
            <li>No watermark on any downloaded file — ever</li>
            <li>Works entirely in your browser; no account, no upload, no tracking</li>
            <li>Mobile responsive — generate handwriting on your phone or tablet</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Who Uses This Tool?
          </h3>
          <p className="text-gray-600 mb-6">
            <strong>Students</strong> use HandwritingMaker to draft assignments in a handwritten format before rewriting them by hand, or to create convincing handwritten notes for study groups. <strong>Teachers</strong> create handwritten-style worksheets and quizzes. <strong>Content creators</strong> generate eye-catching quote graphics that look authentic. <strong>Writers and authors</strong> use it to visualize how their words look in different scripts. <strong>Parents</strong> create personalized messages and cards for children. The use cases are as varied as handwriting itself.
          </p>

          {/* FAQ */}
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Frequently Asked Questions
          </h3>

          <div className="space-y-5">
            <details className="group border border-gray-200 rounded-lg p-4 cursor-pointer">
              <summary className="font-semibold text-gray-800 list-none flex justify-between items-center">
                How do I convert text to handwriting online for free?
                <span className="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600 text-sm">
                Simply type or paste your text into the input field on HandwritingMaker, choose your preferred font style and paper background, then click &ldquo;Download PNG&rdquo; or &ldquo;Download PDF.&rdquo; The entire process takes seconds and costs nothing — no account required.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-lg p-4 cursor-pointer">
              <summary className="font-semibold text-gray-800 list-none flex justify-between items-center">
                Can I download my handwriting as a PDF?
                <span className="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600 text-sm">
                Yes. Click the &ldquo;Download PDF&rdquo; button and your handwriting will be exported as a properly sized PDF document. The PDF scales to A4 dimensions and is ready to print or share digitally.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-lg p-4 cursor-pointer">
              <summary className="font-semibold text-gray-800 list-none flex justify-between items-center">
                Does this tool work on mobile?
                <span className="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600 text-sm">
                Absolutely. HandwritingMaker is fully responsive and works on any smartphone or tablet browser. Type your text on mobile, preview it, and download — the entire experience is optimized for touch screens.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-lg p-4 cursor-pointer">
              <summary className="font-semibold text-gray-800 list-none flex justify-between items-center">
                What fonts are available in the handwriting converter?
                <span className="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600 text-sm">
                There are five handwriting styles: <strong>Classic Cursive</strong> (flowing and connected), <strong>Doctor Scrawl</strong> (illegible but charming), <strong>Neat Print</strong> (clean block letters), <strong>Left-Handed Slant</strong> (elegant italic script), and <strong>Messy Student</strong> (relaxed informal writing). All fonts are loaded from Google Fonts.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-lg p-4 cursor-pointer">
              <summary className="font-semibold text-gray-800 list-none flex justify-between items-center">
                Is there a watermark on downloaded files?
                <span className="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600 text-sm">
                No. Downloaded PNG and PDF files are completely clean — no watermark, no branding, no metadata. What you see in the preview is exactly what you download.
              </p>
            </details>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} HandwritingMaker. Free to use, forever.</span>
          <nav className="flex gap-4" aria-label="Footer navigation">
            <a href="#how-to" className="hover:text-indigo-600 hover:underline">
              How it works
            </a>
            <a href="#" className="hover:text-indigo-600 hover:underline">
              Privacy
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
