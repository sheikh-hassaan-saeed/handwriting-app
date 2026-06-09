"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
      {items.map((item, i) => (
        <div key={i} className="bg-white">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-6 py-5 flex justify-between items-start gap-4 hover:bg-gray-50 transition-colors"
            aria-expanded={open === i}
          >
            <span className="font-semibold text-gray-900 text-base leading-snug">
              {item.q}
            </span>
            <span
              className="flex-shrink-0 mt-0.5 text-indigo-400 text-sm font-bold transition-transform duration-200"
              style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              ▼
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-gray-600 text-base leading-relaxed">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
