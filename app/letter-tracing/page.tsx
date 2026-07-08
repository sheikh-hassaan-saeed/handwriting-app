import type { Metadata } from "next";
import Link from "next/link";
import PlatformLayout from "@/components/platform/PlatformLayout";
import LetterTracingGenerator from "@/components/LetterTracingGenerator";
import { SEO_DATA } from "@/lib/seo";
import { BABY_NAMES } from "@/lib/names";

const PATH = "/letter-tracing";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function LetterTracingPage() {
  const article = `
### Kindergarten spelling worksheets
Trace lines to teach pencil control. Customize tracing text casing, guidelines, direction start points, and phonics illustrations.
  `;

  // Sort and group baby names alphabetically
  const sortedNames = [...BABY_NAMES].sort();
  const namesByLetter: Record<string, string[]> = {};
  
  sortedNames.forEach((name) => {
    const letter = name.charAt(0).toUpperCase();
    if (!namesByLetter[letter]) {
      namesByLetter[letter] = [];
    }
    namesByLetter[letter].push(name);
  });

  const alphabet = Object.keys(namesByLetter).sort();

  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <div className="space-y-12">
        <LetterTracingGenerator />
        
        {/* Programmatic Name Tracing Alphabetical Silo Index */}
        <div className="bg-slate-50 rounded-3xl border border-slate-150 p-6 sm:p-8 mt-8 shadow-xxs">
          <h3 className="text-lg font-bold text-slate-800 mb-3">Printable Baby Name Tracing Worksheets</h3>
          <p className="text-slate-500 text-xs mb-6">
            Find and download custom letter-tracing exercises pre-filled for your child&apos;s name. Click an alphabet character below to hop directly to that group.
          </p>
          
          {/* A-Z fast index links bar */}
          <div className="flex flex-wrap gap-2 mb-8">
            {alphabet.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-xxs flex items-center justify-center text-xs font-bold text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all"
              >
                {letter}
              </a>
            ))}
          </div>

          {/* Names Directory Grid */}
          <div className="space-y-6">
            {alphabet.map((letter) => (
              <div key={letter} id={`letter-${letter}`} className="border-t border-slate-200 pt-4 scroll-mt-24">
                <span className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-150 rounded-lg text-xs font-bold text-indigo-600 mb-3">
                  {letter}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {namesByLetter[letter].map((name) => (
                    <Link
                      key={name}
                      href={`/letter-tracing/name/${name.toLowerCase()}-tracing-worksheet`}
                      className="text-xs text-slate-600 hover:text-indigo-600 font-medium hover:underline bg-white border border-slate-150 rounded-xl px-3 py-2 shadow-xxs block transition-all"
                    >
                      {name} Tracing
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
}
