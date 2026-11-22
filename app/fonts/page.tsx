import type { Metadata } from "next";
import Link from "next/link";
import PlatformLayout from "@/components/platform/PlatformLayout";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/fonts";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: PATH },
};

interface FontEntry {
  family: string;
  label: string;
  kind: string;
  bestFor: string;
  used: { name: string; href: string; as?: string }[];
}

const FONTS: FontEntry[] = [
  {
    family: "Patrick Hand",
    label: "Neat Print",
    kind: "Print",
    bestFor:
      "Unconnected, upright letters with simple shapes. The default for print practice, name tracing and early-grade worksheets, where each letter should be clear on its own.",
    used: [
      { name: "Handwriting worksheets and tracing tools", href: "/tools/handwriting-worksheet-creator", as: "Print style" },
      { name: "Letter tracing", href: "/letter-tracing", as: "Standard Print" },
      { name: "Handwriting practice sheets", href: "/tools/handwriting-practice-sheets", as: "Print" },
    ],
  },
  {
    family: "Dancing Script",
    label: "Left-Handed Slant",
    kind: "Cursive",
    bestFor:
      "Connected, slanted letters with clear joins. The cursive option in the worksheet and tracing tools, and the best choice here for cursive practice sheets for both children and adults.",
    used: [
      { name: "Cursive practice sheets", href: "/tools/cursive-practice-sheets", as: "Cursive style" },
      { name: "Cursive alphabet sheets", href: "/tools/cursive-alphabet-practice-sheets", as: "Cursive style" },
      { name: "Letter tracing", href: "/letter-tracing", as: "Cursive Script" },
      { name: "Cornell notes", href: "/cornell-notes", as: "Cursive Labels layout" },
      { name: "Calligraphy generator", href: "/calligraphy", as: "Modern preset" },
    ],
  },
  {
    family: "Caveat",
    label: "Classic Cursive",
    kind: "Casual handwriting",
    bestFor:
      "A quick, natural pen-on-paper look rather than a formal script. Good for notes-style text and animations. It is not a teaching hand, so use it for display rather than for learning letter shapes.",
    used: [
      { name: "Animated handwriting generator", href: "/tools/animated-handwriting-generator", as: "Classic Cursive" },
      { name: "Signature generator", href: "/signature-generator", as: "Bold Marker" },
    ],
  },
  {
    family: "Homemade Apple",
    label: "Doctor Scrawl",
    kind: "Loose cursive",
    bestFor:
      "An informal, uneven cursive that looks hurried. Useful for a realistic handwritten look in animations and for the brush-lettering calligraphy preset, but not for learning correct letter formation.",
    used: [
      { name: "Animated handwriting generator", href: "/tools/animated-handwriting-generator", as: "Doctor Scrawl" },
      { name: "Calligraphy generator", href: "/calligraphy", as: "Brush Lettering preset" },
    ],
  },
  {
    family: "Architects Daughter",
    label: "Messy Student",
    kind: "Casual print",
    bestFor:
      "Slightly irregular, hand-drawn print. Suits a casual note or a student-style look in animations. For clean print practice, use Patrick Hand instead.",
    used: [{ name: "Animated handwriting generator", href: "/tools/animated-handwriting-generator", as: "Messy Student" }],
  },
  {
    family: "Great Vibes",
    label: "Elegant script",
    kind: "Formal script",
    bestFor:
      "Flowing formal script with large loops. Used as the Copperplate model on the calligraphy sheets and as the Elegant Cursive signature. Best for invitations and signatures, not everyday practice.",
    used: [
      { name: "Calligraphy generator", href: "/calligraphy", as: "Copperplate preset" },
      { name: "Signature generator", href: "/signature-generator", as: "Elegant Cursive" },
    ],
  },
  {
    family: "Playball",
    label: "Classic formal script",
    kind: "Formal script",
    bestFor:
      "A sturdier, more upright formal script. Used for the Chancery Italic calligraphy preset and the Business Executive signature, where a signature should still read clearly.",
    used: [
      { name: "Calligraphy generator", href: "/calligraphy", as: "Chancery Italic preset" },
      { name: "Signature generator", href: "/signature-generator", as: "Business Executive" },
    ],
  },
  {
    family: "Monsieur La Doulaise",
    label: "Ornate script",
    kind: "Ornate script",
    bestFor:
      "A highly decorative, steeply slanted script. Used only for the Spencerian calligraphy preset, where it shows tall ascenders and descenders. Too ornate for body text.",
    used: [{ name: "Calligraphy generator", href: "/calligraphy", as: "Spencerian preset" }],
  },
  {
    family: "Sacramento",
    label: "Modern Minimalist",
    kind: "Thin monoline script",
    bestFor: "Fine, evenly weighted strokes with little contrast. A clean signature style that scans and prints lightly.",
    used: [{ name: "Signature generator", href: "/signature-generator", as: "Modern Minimalist" }],
  },
  {
    family: "Pinyon Script",
    label: "Prestige Luxury",
    kind: "Formal script",
    bestFor: "A slanted, high-contrast script in the style of formal copperplate lettering. Signature use only.",
    used: [{ name: "Signature generator", href: "/signature-generator", as: "Prestige Luxury" }],
  },
  {
    family: "Allura",
    label: "Fountain Pen",
    kind: "Flowing script",
    bestFor: "Light, flowing strokes that resemble a fountain-pen signature. Signature use only.",
    used: [{ name: "Signature generator", href: "/signature-generator", as: "Fountain Pen" }],
  },
  {
    family: "Alex Brush",
    label: "Standard Ballpoint",
    kind: "Casual script",
    bestFor: "An everyday connected script that looks like a ballpoint signature. Signature use only.",
    used: [{ name: "Signature generator", href: "/signature-generator", as: "Standard Ballpoint" }],
  },
  {
    family: "Reenie Beanie",
    label: "Artist Brush",
    kind: "Freehand",
    bestFor: "A loose, fast, brush-pen look. Signature use only.",
    used: [{ name: "Signature generator", href: "/signature-generator", as: "Artist Brush" }],
  },
];

const SAMPLE = "The quick brown fox jumps over the lazy dog";

export default function FontsPage() {
  return (
    <PlatformLayout path={PATH} config={config}>
      <div className="space-y-10 max-w-4xl mx-auto">
        <section className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">How to choose</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            For <strong>learning to write</strong>, stick to the two fonts the worksheet tools default to: Patrick Hand
            for print and Dancing Script for cursive. Both have clear, consistent letter shapes. Start a child in print,
            and add cursive later with the{" "}
            <Link href="/blog/print-vs-cursive-which-to-teach-first" className="text-indigo-600 hover:underline font-semibold">
              print vs cursive guide
            </Link>{" "}
            in mind.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            For <strong>adult practice</strong>, use Patrick Hand to tidy up print, or Dancing Script to relearn cursive
            joins. The casual fonts (Caveat, Homemade Apple, Architects Daughter) are for display and animation, because
            they are deliberately irregular.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            For <strong>calligraphy and signatures</strong>, the formal scripts below are decorative models. Real
            calligraphy takes pen practice, so use the{" "}
            <Link href="/calligraphy" className="text-indigo-600 hover:underline font-semibold">calligraphy guide sheets</Link>{" "}
            to trace and learn the proportions.
          </p>
        </section>

        <section className="space-y-5" aria-label="Font comparison">
          {FONTS.map((f) => (
            <article key={f.family} className="p-5 border border-gray-150 rounded-xl bg-white shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="text-base font-bold text-gray-800">
                  {f.family} <span className="text-gray-400 font-normal text-sm">&middot; {f.label}</span>
                </h3>
                <span className="text-xxs font-bold uppercase tracking-wider text-indigo-500">{f.kind}</span>
              </div>
              <p className="text-3xl text-indigo-900 my-3 leading-snug break-words" style={{ fontFamily: `'${f.family}', cursive` }}>
                {SAMPLE}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{f.bestFor}</p>
              <p className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700">Used in: </span>
                {f.used.map((u, i) => (
                  <span key={u.name + (u.as || "")}>
                    {i > 0 && "; "}
                    <Link href={u.href} className="text-indigo-600 hover:underline">{u.name}</Link>
                    {u.as ? ` (${u.as})` : ""}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </section>

        <section className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">A note on printing</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            The fonts are loaded from Google Fonts when you open a page, and the generators draw the text onto a canvas
            before saving it as a PDF or image. The SVG export from the signature generator refers to the web font by
            name, so if you need a signature that looks identical everywhere, use the PNG download instead.
          </p>
        </section>
      </div>
    </PlatformLayout>
  );
}
