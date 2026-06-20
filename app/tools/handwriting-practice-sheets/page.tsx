import type { Metadata } from "next";
import Link from "next/link";
import PracticeSheetGenerator from "@/components/PracticeSheetGenerator";
import FaqAccordion from "@/components/FaqAccordion";

const TITLE = "Handwriting Practice Sheet Generator - Free";
const DESCRIPTION =
  "Generate free printable handwriting practice sheets instantly. Choose cursive, print, dotted trace, or custom text. Download as PDF, no signup required.";
const PAGE_URL = "https://handwritingmaker.com/tools/handwriting-practice-sheets";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL("https://handwritingmaker.com"),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "HandwritingMaker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this handwriting practice sheets generator really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The handwriting practice sheets generator is completely free to use, with no signup, no account, and no watermark on your downloaded PDF.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create a practice sheet with my own custom text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Type any word, sentence, or word list into the text box and the generator will repeat it across every line of the sheet. This is useful for teachers building sheets around spelling lists or class vocabulary.",
      },
    },
    {
      "@type": "Question",
      name: "What is dotted trace mode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dotted trace mode renders your text as faint, dashed outline letters instead of solid ink. The student traces directly over the dotted letterforms with a pencil, which builds correct motor memory before writing freehand.",
      },
    },
    {
      "@type": "Question",
      name: "Can I print the practice sheet on Letter or A4 paper?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Choose A4 or Letter from the paper size control before downloading. The generated PDF is sized to fit that paper exactly, so the guidelines print correctly without scaling issues.",
      },
    },
    {
      "@type": "Question",
      name: "How many lines should a handwriting practice sheet have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most practice sessions work well with 10 to 15 lines, which is enough repetition to build muscle memory without causing hand fatigue. Beginners and young children often do better with fewer lines and wider spacing.",
      },
    },
  ],
};

const faqItems = [
  {
    q: "Is this handwriting practice sheets generator really free?",
    a: "Yes. The handwriting practice sheets generator is completely free to use, with no signup, no account, and no watermark on your downloaded PDF.",
  },
  {
    q: "Can I create a practice sheet with my own custom text?",
    a: "Yes. Type any word, sentence, or word list into the text box and the generator will repeat it across every line of the sheet. This is useful for teachers building sheets around spelling lists or class vocabulary.",
  },
  {
    q: "What is dotted trace mode?",
    a: "Dotted trace mode renders your text as faint, dashed outline letters instead of solid ink. The student traces directly over the dotted letterforms with a pencil, which builds correct motor memory before writing freehand.",
  },
  {
    q: "Can I print the practice sheet on Letter or A4 paper?",
    a: "Yes. Choose A4 or Letter from the paper size control before downloading. The generated PDF is sized to fit that paper exactly, so the guidelines print correctly without scaling issues.",
  },
  {
    q: "How many lines should a handwriting practice sheet have?",
    a: "Most practice sessions work well with 10 to 15 lines, which is enough repetition to build muscle memory without causing hand fatigue. Beginners and young children often do better with fewer lines and wider spacing.",
  },
];

export default function HandwritingPracticeSheetsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-indigo-600 tracking-tight">
            HandwritingMaker
          </Link>
          <nav className="flex items-center gap-5 text-sm font-medium">
            <Link href="/blog" className="text-gray-500 hover:text-indigo-600 hover:underline">
              Blog
            </Link>
            <Link href="/" className="text-indigo-600 hover:underline">
              Main Converter
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-br from-indigo-50 to-white py-8 px-4 text-center border-b border-indigo-100">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Handwriting Practice Sheet Generator
          </h1>
          <div className="max-w-3xl mx-auto text-left sm:text-center text-gray-600 text-base">
            <p>
              Building consistent, legible handwriting takes repetition, and most people give up before they find a fast way to create that repetition. This free handwriting practice sheets generator lets you type any word, sentence, or word list and instantly turn it into a printable practice sheet with proper guidelines, ready to download as a PDF in seconds.
            </p>
            <p className="mt-3">
              Choose cursive or print lettering, switch on dotted trace mode so a student can trace faint letters before writing freehand, or generate blank ruled lines for open practice. Pick how many lines you need, how wide the spacing should be, and whether the page is A4 or Letter, then print. No signup, no watermark, and no software to install, just a ready-to-print sheet in under a minute.
            </p>
            <p className="mt-3">
              Teachers use it to build spelling drills for a whole class in one sitting, occupational therapists use it to print letter-formation drills for clients, and parents use it to target whichever letters a child is struggling with that week. Because every sheet comes from your own text, there is no need to dig through a binder of generic printables for the one word list you actually need.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-8" aria-label="Handwriting practice sheet generator tool">
          <PracticeSheetGenerator />
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12 prose prose-gray">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            How to Create Handwriting Practice Sheets
          </h2>
          <p className="text-gray-600 mb-4">
            Start by typing your own text into the input box, or pick one of the built-in presets: alphabet, numbers, common words, or a pangram. Next, choose a sheet style: cursive, print, dotted trace, or blank lines. Set the number of lines (5, 10, 15, or 20) and choose narrow or wide line spacing depending on the writer&apos;s age and skill level. Pick A4 or Letter paper size, then click Download PDF. The sheet is generated entirely in your browser and prints at the correct size with no extra setup.
          </p>
          <p className="text-gray-600 mb-8">
            Teachers can build a full week of practice sheets in minutes by swapping the custom text for each day&apos;s spelling list, while parents can generate a quick sheet around a child&apos;s name or a tricky letter combination the moment it becomes a problem.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Types of Handwriting Practice Sheets
          </h2>
          <ul className="list-disc pl-5 text-gray-600 mb-8 space-y-2">
            <li>
              <strong>Cursive sheets</strong> render your text in a connected, flowing script, ideal for students learning joined-up writing or adults working on a more elegant hand.
            </li>
            <li>
              <strong>Print sheets</strong> use clean block letterforms, the standard starting point for young children and for anyone rebuilding basic letter formation.
            </li>
            <li>
              <strong>Dotted trace sheets</strong> show your text as faint dashed outlines so the writer can trace directly over each letter, building correct stroke direction and muscle memory.
            </li>
            <li>
              <strong>Blank line sheets</strong> provide ruled guidelines with no text at all, giving a writer open space to copy from a book, a worksheet, or their own notes while keeping letters consistently sized.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            How to Use Dotted Trace Practice Sheets
          </h2>
          <p className="text-gray-600 mb-4">
            Dotted trace sheets work best as a first step, not a final destination. Have the student trace over the dashed letters slowly with a pencil, paying attention to where each stroke starts and ends rather than just connecting the dots quickly. After two or three dotted sessions on the same word or letter group, switch to a blank line sheet using the same text and ask the writer to reproduce it from memory.
          </p>
          <p className="text-gray-600 mb-8">
            Research suggests that tracing before freehand writing helps reinforce correct motor patterns, especially for young children and for adults relearning letter formation after years of typing. Keep each dotted trace session short, around ten to fifteen minutes, since accuracy drops once a hand gets tired.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={faqItems} />

          <div className="mt-12 border-t border-gray-100 pt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">More Handwriting Tools</h3>
            <div className="grid sm:grid-cols-2 gap-4">
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
                href="/"
                className="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all p-5"
              >
                <span className="font-semibold text-gray-900">Text to Handwriting Converter</span>
                <p className="text-sm text-gray-500 mt-1">
                  Convert any text into realistic handwriting with five font styles.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} HandwritingMaker. Free to use, forever.</span>
          <nav className="flex gap-4" aria-label="Footer navigation">
            <Link href="/" className="hover:text-indigo-600 hover:underline">Free Tool</Link>
            <Link href="/blog" className="hover:text-indigo-600 hover:underline">Blog</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
