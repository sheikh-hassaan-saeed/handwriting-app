"use client";

import React from "react";
import { FONTS, PAPERS, INKS } from "@/lib/handwritingStyles";
import type { FontStyle, PaperStyle, InkColor } from "@/lib/handwritingStyles";

export type { FontStyle, PaperStyle, InkColor };

export interface ControlsState {
  font: FontStyle;
  paper: PaperStyle;
  ink: InkColor;
  fontSize: number;
  letterSpacing: number;
  text: string;
}

interface ControlsProps {
  state: ControlsState;
  onChange: (next: Partial<ControlsState>) => void;
  onRegenerate: () => void;
  onDownloadPNG: () => void;
  onDownloadPDF: () => void;
}

export default function Controls({
  state,
  onChange,
  onRegenerate,
  onDownloadPNG,
  onDownloadPDF,
}: ControlsProps) {
  const charCount = state.text.length;

  return (
    <div className="flex flex-col gap-5">
      {/* Text Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Your Text
        </label>
        <textarea
          className="w-full h-36 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          placeholder="Type or paste your text here…"
          value={state.text}
          onChange={(e) => onChange({ text: e.target.value })}
          aria-label="Text to convert to handwriting"
        />
        <p className="text-xs text-gray-400 mt-1 text-right">
          {charCount} characters
        </p>
      </div>

      {/* Font Style */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Handwriting Style
        </label>
        <div className="grid grid-cols-1 gap-2">
          {FONTS.map((f) => (
            <button
              key={f.value}
              onClick={() => onChange({ font: f.value })}
              className={`text-left px-3 py-2 rounded-lg border text-sm transition-all ${
                state.font === f.value
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                  : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
              }`}
              style={{ fontFamily: `'${f.value}', cursive` }}
              aria-pressed={state.font === f.value}
            >
              {f.label}
              <span className="block text-xs text-gray-400 mt-0.5" style={{ fontFamily: "sans-serif" }}>
                ({f.value})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Paper Style */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Paper Background
        </label>
        <div className="grid grid-cols-2 gap-2">
          {PAPERS.map((p) => (
            <button
              key={p.value}
              onClick={() => onChange({ paper: p.value })}
              className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                state.paper === p.value
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                  : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
              }`}
              aria-pressed={state.paper === p.value}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ink Color */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Ink Color
        </label>
        <div className="flex gap-3">
          {INKS.map((ink) => (
            <button
              key={ink.value}
              onClick={() => onChange({ ink: ink.value })}
              title={ink.label}
              aria-label={`Ink color: ${ink.label}`}
              aria-pressed={state.ink === ink.value}
              className={`w-9 h-9 rounded-full border-4 transition-all ${
                state.ink === ink.value
                  ? "border-indigo-500 scale-110"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              style={{ backgroundColor: ink.color }}
            />
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Font Size:{" "}
          <span className="font-normal text-gray-500">
            {state.fontSize < 22 ? "Small" : state.fontSize < 32 ? "Medium" : "Large"}
          </span>
        </label>
        <input
          type="range"
          min={16}
          max={44}
          step={2}
          value={state.fontSize}
          onChange={(e) => onChange({ fontSize: parseInt(e.target.value) })}
          className="w-full accent-indigo-500"
          aria-label="Font size"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Small</span>
          <span>Medium</span>
          <span>Large</span>
        </div>
      </div>

      {/* Letter Spacing */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Letter Spacing:{" "}
          <span className="font-normal text-gray-500">{state.letterSpacing}</span>
        </label>
        <input
          type="range"
          min={0}
          max={12}
          step={1}
          value={state.letterSpacing}
          onChange={(e) => onChange({ letterSpacing: parseInt(e.target.value) })}
          className="w-full accent-indigo-500"
          aria-label="Letter spacing"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Tight</span>
          <span>Normal</span>
          <span>Wide</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          onClick={onRegenerate}
          className="w-full py-2.5 px-4 rounded-lg border-2 border-indigo-500 text-indigo-600 font-semibold text-sm hover:bg-indigo-50 transition-colors"
          aria-label="Regenerate handwriting with new randomization"
        >
          ↺ Regenerate
        </button>
        <button
          onClick={onDownloadPNG}
          className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors"
          aria-label="Download handwriting as PNG image"
        >
          ↓ Download PNG
        </button>
        <button
          onClick={onDownloadPDF}
          className="w-full py-2.5 px-4 rounded-lg bg-gray-700 text-white font-semibold text-sm hover:bg-gray-800 transition-colors"
          aria-label="Download handwriting as PDF document"
        >
          ↓ Download PDF
        </button>
      </div>
    </div>
  );
}
