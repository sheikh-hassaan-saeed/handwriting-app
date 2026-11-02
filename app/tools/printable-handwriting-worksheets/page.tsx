import type { Metadata } from "next";
import Link from "next/link";
import { SEO_DATA } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import SiteFooter from "@/components/SiteFooter";
import FaqAccordion from "@/components/FaqAccordion";

const PATH = "/tools/printable-handwriting-worksheets";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: config.title,
    description: config.description,
    url: `${SITE_URL}${PATH}`,
    siteName: "HandwritingMaker",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: config.title, description: config.description },
};

const faqItems = [
  { q: "How do I choose the right worksheet tool?", a: "Match the tool to the writer's stage. Tracing tools suit beginners learning letter shapes; cursive tools suit writers learning joined-up script; grade-level worksheets match school expectations; paper tools provide blank lined sheets for open writing." },
  { q: "Are all of these worksheets free to print?", a: "Yes. Every generator on this site is free — no accounts, no subscriptions, and no watermarks on the downloaded PDFs." },
  { q: "What paper sizes do the worksheets print on?", a: "Most tools export PDFs sized for A4 or US Letter paper, and many offer portrait and landscape. Choose your size before downloading and the guidelines will print at the correct scale." },
  { q: "Can I use these worksheets in my classroom?", a: "Yes. Teachers regularly print class sets — generate once, print thirty copies. The PDFs are clean and watermark-free, so they look professional handed out." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Printable Handwriting Worksheets", item: `${SITE_URL}${PATH}` },
  ],
};

export default function PrintableHandwritingWorksheetsHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-indigo-600 tracking-tight">HandwritingMaker</Link>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Home</Link>
            <Link href="/blog" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Blog</Link>
          </nav>
        </div>
      </header>

      <main className="bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-50 to-white border-b border-indigo-100 py-14 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">{config.h1}</h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Every free printable handwriting worksheet on this site lives here. Instead of one generic template, you&apos;ll find a collection of specialized generators — tracing tools for young learners, cursive tools for older students and adults, grade-level worksheets, custom lined paper, and a few extras. Pick the tool that matches the writer and the task, type your text, and print.
            </p>
          </div>
        </section>

        {/* Chooser */}
        <section className="bg-slate-50 border-b border-slate-200 py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-slate-800 mb-3">Find the right tool</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              A quick way to choose: if the writer is still learning letter shapes, start with a tracing tool. If they&apos;re learning or relearning joined-up writing, open a cursive tool. If you need paper for spelling tests or journaling rather than guided practice, use a paper tool. And when none of the presets fit, the Worksheet Creator builds a custom sheet from any words you type.
            </p>
          </div>
        </section>

        {/* Tool Directory */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto space-y-10">

            {/* Tracing tools */}
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-200">Tracing tools</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { href: "/tools/tracing-worksheet-generator", name: "Tracing Worksheet Generator", desc: "Dotted-line tracing for any word or sentence you type; the best starting point for preschool letter practice." },
                  { href: "/tools/name-tracing-generator", name: "Name Tracing Generator", desc: "Personalized sheets made from any name; a favorite for name-writing practice." },
                  { href: "/tools/sentence-tracing-generator", name: "Sentence Tracing Generator", desc: "Full sentences in traceable format, for writers moving past single words." },
                  { href: "/tools/alphabet-tracing-generator", name: "Alphabet Tracing Generator", desc: "A through Z in order, for systematic letter practice." },
                ].map((tool) => (
                  <Link key={tool.href} href={tool.href} className="block border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all bg-white group">
                    <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 mb-1">{tool.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Cursive tools */}
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-200">Cursive tools</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { href: "/tools/cursive-practice-sheets", name: "Cursive Practice Sheets", desc: "Connected script for words, sentences, and quotes, with adjustable slant; built for students and adults alike." },
                  { href: "/tools/cursive-alphabet-practice-sheets", name: "Cursive Alphabet Practice Sheets", desc: "Uppercase and lowercase letterform drills with dotted guides; the on-ramp to cursive words." },
                ].map((tool) => (
                  <Link key={tool.href} href={tool.href} className="block border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all bg-white group">
                    <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 mb-1">{tool.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Grade-level worksheets */}
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-200">Grade-level worksheets</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { href: "/tools/handwriting-worksheets-kindergarten", name: "Kindergarten Worksheets", desc: "Extra-large 80px guidelines for ages 4–6, with name writing and letter ranges." },
                  { href: "/tools/handwriting-worksheets-grade-1", name: "Grade 1 Worksheets", desc: "Guided practice sized for first graders building fluency." },
                  { href: "/tools/handwriting-worksheets-grade-2", name: "Grade 2 Worksheets", desc: "Practice sheets matched to second-grade writing expectations." },
                ].map((tool) => (
                  <Link key={tool.href} href={tool.href} className="block border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all bg-white group">
                    <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 mb-1">{tool.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Paper tools */}
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-200">Paper tools</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { href: "/tools/handwriting-paper-generator", name: "Handwriting Paper Generator", desc: "Custom lined paper with 40–140px line heights, in A4 or US Letter." },
                  { href: "/notebook-paper", name: "Notebook Paper", desc: "Ready-made ruled styles: wide-ruled, college-ruled, graph, and dot grid." },
                ].map((tool) => (
                  <Link key={tool.href} href={tool.href} className="block border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all bg-white group">
                    <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 mb-1">{tool.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Specialty tools */}
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-200">Specialty tools</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { href: "/calligraphy", name: "Calligraphy Generator", desc: "Slant guidelines for decorative lettering practice." },
                  { href: "/signature-generator", name: "Signature Generator", desc: "Design and refine a personal signature." },
                  { href: "/tools/animated-handwriting-generator", name: "Animated Handwriting Generator", desc: "Watch each letter form stroke by stroke." },
                ].map((tool) => (
                  <Link key={tool.href} href={tool.href} className="block border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all bg-white group">
                    <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 mb-1">{tool.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* All-rounders */}
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-200">All-rounders</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { href: "/tools/handwriting-worksheet-creator", name: "Handwriting Worksheet Creator", desc: "The flagship builder: any spelling list, sight words, or vocabulary turned into a clean worksheet." },
                  { href: "/tools/handwriting-practice-sheets", name: "Handwriting Practice Sheets", desc: "Quick custom sheets with built-in presets for the alphabet, numbers, and common words." },
                ].map((tool) => (
                  <Link key={tool.href} href={tool.href} className="block border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all bg-white group">
                    <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 mb-1">{tool.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-slate-50 border-t border-slate-200 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8">Frequently Asked Questions</h2>
            <FaqAccordion items={faqItems} />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white border-t border-slate-200 py-10 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-slate-600 leading-relaxed">
              Not sure where to begin? The{" "}
              <Link href="/tools/handwriting-worksheet-creator" className="text-indigo-600 font-semibold hover:underline">
                Handwriting Worksheet Creator
              </Link>{" "}
              is the most flexible starting point — type any words and print a custom sheet in seconds.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
