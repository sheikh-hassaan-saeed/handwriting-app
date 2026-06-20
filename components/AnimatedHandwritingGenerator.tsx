"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FONTS,
  PAPERS,
  INKS,
  INK_COLORS,
  drawPaper,
  FontStyle,
  PaperStyle,
  InkColor,
} from "@/lib/handwritingStyles";
import { wrapText } from "@/lib/canvasText";
import { drawHandwrittenText, totalCharCount } from "@/lib/handwritingRender";

type Speed = "slow" | "medium" | "fast";

const SPEED_MS: Record<Speed, number> = {
  slow: 200,
  medium: 100,
  fast: 45,
};

const SPEEDS: { value: Speed; label: string }[] = [
  { value: "slow", label: "Slow" },
  { value: "medium", label: "Medium" },
  { value: "fast", label: "Fast" },
];

const MAX_CHARS = 100;
const SEED = 42;
const FONT_SIZE = 30;
const LETTER_SPACING = 3;

export default function AnimatedHandwritingGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimsRef = useRef({ w: 700, h: 300 });
  const linesRef = useRef<string[]>([]);
  const revealRef = useRef(0);
  const lastTickRef = useRef(0);
  const pauseUntilRef = useRef(0);

  const [text, setText] = useState("Handwriting that moves.");
  const [font, setFont] = useState<FontStyle>("Caveat");
  const [paper, setPaper] = useState<PaperStyle>("lined");
  const [ink, setInk] = useState<InkColor>("blue");
  const [speed, setSpeed] = useState<Speed>("medium");
  const [loop, setLoop] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [exporting, setExporting] = useState(false);

  const drawFrame = useCallback((revealCount: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const { w, h } = dimsRef.current;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawPaper(ctx, paper, w, h);
    drawHandwrittenText({
      ctx,
      lines: linesRef.current,
      font,
      fontSize: FONT_SIZE,
      letterSpacing: LETTER_SPACING,
      marginLeft: paper === "lined" ? 60 : paper === "legal" ? 70 : 40,
      marginTop: 50,
      lineHeight: FONT_SIZE * 1.75,
      inkColor: INK_COLORS[ink],
      ink,
      seed: SEED,
      maxChars: revealCount,
    });
  }, [font, paper, ink]);

  // Recompute wrapped lines and canvas size whenever text/font changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    (async () => {
      try {
        await document.fonts.load(`${FONT_SIZE}px '${font}'`);
      } catch {
        // proceed anyway
      }
      if (cancelled) return;

      const marginLeft = paper === "lined" ? 60 : paper === "legal" ? 70 : 40;
      const marginRight = 40;
      const w = 700;
      const measureCtx = canvas.getContext("2d")!;
      measureCtx.font = `${FONT_SIZE}px '${font}', cursive`;
      const lines = wrapText(measureCtx, text || "Type something…", w - marginLeft - marginRight, FONT_SIZE, LETTER_SPACING);
      const lineHeight = FONT_SIZE * 1.75;
      const h = Math.max(220, 50 + lines.length * lineHeight + 60);

      linesRef.current = lines;
      dimsRef.current = { w, h };

      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "auto";

      revealRef.current = 0;
      drawFrame(0);
    })();

    return () => {
      cancelled = true;
    };
  }, [text, font, paper, drawFrame]);

  // Animation loop
  useEffect(() => {
    if (!playing) return;
    let raf: number;

    const tick = (time: number) => {
      const total = totalCharCount(linesRef.current);
      if (lastTickRef.current === 0) lastTickRef.current = time;

      if (pauseUntilRef.current > 0) {
        if (time >= pauseUntilRef.current) {
          pauseUntilRef.current = 0;
          revealRef.current = 0;
          lastTickRef.current = time;
        }
      } else if (time - lastTickRef.current >= SPEED_MS[speed]) {
        lastTickRef.current = time;
        if (revealRef.current < total) {
          revealRef.current += 1;
          drawFrame(revealRef.current);
        } else if (loop) {
          pauseUntilRef.current = time + 700;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, speed, loop, drawFrame]);

  const handleReplay = useCallback(() => {
    revealRef.current = 0;
    pauseUntilRef.current = 0;
    lastTickRef.current = 0;
    drawFrame(0);
    setPlaying(true);
  }, [drawFrame]);

  const handleDownloadGIF = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setExporting(true);
    setPlaying(false);

    const { default: GIF } = await import("gif.js");
    const total = totalCharCount(linesRef.current);
    const gif = new GIF({
      workers: 2,
      quality: 10,
      workerScript: "/gif.worker.js",
      width: canvas.width,
      height: canvas.height,
      repeat: 0,
    });

    for (let i = 0; i <= total; i++) {
      drawFrame(i);
      gif.addFrame(canvas, { copy: true, delay: SPEED_MS[speed] });
    }
    gif.addFrame(canvas, { copy: true, delay: 900 });

    gif.on("finished", (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "animated-handwriting.gif";
      link.click();
      URL.revokeObjectURL(url);
      setExporting(false);
      drawFrame(revealRef.current);
    });

    gif.render();
  }, [drawFrame, speed]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <aside
        className="w-full lg:w-80 flex-shrink-0 bg-white rounded-2xl shadow border border-gray-100 p-5"
        aria-label="Animated handwriting controls"
      >
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Your Text
            </label>
            <textarea
              className="w-full h-20 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
              placeholder="Type up to 100 characters…"
              value={text}
              maxLength={MAX_CHARS}
              onChange={(e) => setText(e.target.value)}
              aria-label="Text to animate"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">
              {text.length}/{MAX_CHARS} characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Handwriting Style
            </label>
            <div className="grid grid-cols-1 gap-2">
              {FONTS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFont(f.value)}
                  aria-pressed={font === f.value}
                  className={`text-left px-3 py-2 rounded-lg border text-sm transition-all ${
                    font === f.value
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                      : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                  }`}
                  style={{ fontFamily: `'${f.value}', cursive` }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Paper Background
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PAPERS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPaper(p.value)}
                  aria-pressed={paper === p.value}
                  className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                    paper === p.value
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                      : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ink Color
            </label>
            <div className="flex gap-3">
              {INKS.map((i) => (
                <button
                  key={i.value}
                  onClick={() => setInk(i.value)}
                  title={i.label}
                  aria-label={`Ink color: ${i.label}`}
                  aria-pressed={ink === i.value}
                  className={`w-9 h-9 rounded-full border-4 transition-all ${
                    ink === i.value ? "border-indigo-500 scale-110" : "border-gray-200 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: i.color }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Animation Speed
            </label>
            <div className="grid grid-cols-3 gap-2">
              {SPEEDS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSpeed(s.value)}
                  aria-pressed={speed === s.value}
                  className={`px-2 py-2 rounded-lg border text-sm transition-all ${
                    speed === s.value
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                      : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={loop}
              onChange={(e) => setLoop(e.target.checked)}
              className="accent-indigo-500 w-4 h-4"
            />
            Loop animation
          </label>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="w-full py-2.5 px-4 rounded-lg border-2 border-indigo-500 text-indigo-600 font-semibold text-sm hover:bg-indigo-50 transition-colors"
            >
              {playing ? "⏸ Pause" : "▶ Play"}
            </button>
            <button
              onClick={handleReplay}
              className="w-full py-2.5 px-4 rounded-lg border-2 border-gray-300 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              ↺ Replay
            </button>
            <button
              onClick={handleDownloadGIF}
              disabled={exporting}
              className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-60"
              aria-label="Download animated handwriting as GIF"
            >
              {exporting ? "Rendering GIF…" : "↓ Download GIF"}
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 bg-white rounded-2xl shadow border border-gray-100 p-4 min-h-[400px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Live Animation
          </span>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full rounded-lg shadow-md border border-gray-200"
          aria-label="Animated handwriting preview"
          role="img"
        />
      </div>
    </div>
  );
}
