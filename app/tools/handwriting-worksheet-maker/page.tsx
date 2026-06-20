import type { Metadata } from "next";
import Link from "next/link";
import WorksheetMaker from "@/components/WorksheetMaker";
import FaqAccordion from "@/components/FaqAccordion";

const TITLE = "Handwriting Worksheet Maker - Free Custom Worksheets | HandwritingMaker";
const DESCRIPTION =
  "Create free custom handwriting worksheets in seconds. Enter any name, word list, or full sentence and get a print-ready PDF download, no account needed.";
const PAGE_URL = "https://handwritingmaker.com/tools/handwriting-worksheet-maker";

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
      name: "Is this handwriting worksheet maker free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The worksheet maker is completely free, with no account, no signup, and no watermark on the downloaded PDF.",
      },
    },
    {
      "@type": "Question",
      name: "Can I make a worksheet with my child's name?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Type any name into the input box, set repetitions to 2 or 3, and the tool generates a full sheet of name-tracing practice with that name repeated down the page.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between the layout options?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Single Word per Line puts one word on each line, useful for vocabulary or name practice. Two Words per Line fits two items per line for longer word lists. Sentence Repeat prints your full sentence on every line, ideal for practicing whole-sentence handwriting.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this as a handwriting without tears style worksheet maker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. While this tool is not affiliated with Handwriting Without Tears, it generates the same kind of repetition-based name and word practice sheets that style of teaching relies on, using your own words instead of a fixed workbook.",
      },
    },
    {
      "@type": "Question",
      name: "Does this work for cursive handwriting practice too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Switch the font style to Cursive and every word or sentence on the worksheet renders in a connected script instead of print letters.",
      },
    },
  ],
};

const faqItems = [
  {
    q: "Is this handwriting worksheet maker free to use?",
    a: "Yes. The worksheet maker is completely free, with no account, no signup, and no watermark on the downloaded PDF.",
  },
  {
    q: "Can I make a worksheet with my child's name?",
    a: "Yes. Type any name into the input box, set repetitions to 2 or 3, and the tool generates a full sheet of name-tracing practice with that name repeated down the page.",
  },
  {
    q: "What is the difference between the layout options?",
    a: "Single Word per Line puts one word on each line, useful for vocabulary or name practice. Two Words per Line fits two items per line for longer word lists. Sentence Repeat prints your full sentence on every line, ideal for practicing whole-sentence handwriting.",
  },
  {
    q: "Can I use this as a handwriting without tears style worksheet maker?",
    a: "Yes. While this tool is not affiliated with Handwriting Without Tears, it generates the same kind of repetition-based name and word practice sheets that style of teaching relies on, using your own words instead of a fixed workbook.",
  },
  {
    q: "Does this work for cursive handwriting practice too?",
    a: "Yes. Switch the font style to Cursive and every word or sentence on the worksheet renders in a connected script instead of print letters.",
  },
];

export default function HandwritingWorksheetMakerPage() {
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
            Handwriting Worksheet Maker
          </h1>
          <div className="max-w-3xl mx-auto text-left sm:text-center text-gray-600 text-base">
            <p>
              Most parents and teachers searching for a way to make a personalized practice page eventually look for a handwriting without tears worksheet maker that does not require buying a new workbook for every name or word list. This free tool covers that need directly: type any name, word list, or full sentence and turn it into a clean, printable worksheet in seconds.
            </p>
            <p className="mt-3">
              Pick a layout (single word per line, two words per line, or sentence repeat), choose dotted, solid, or no guidelines, set how many times each word repeats, and switch between print and cursive lettering. The worksheet renders instantly in the preview and downloads as a print-ready PDF with no account required.
            </p>
            <p className="mt-3">
              Enter a child&apos;s name and the tool becomes instant name-tracing practice, repeating that name down the page exactly the way classroom worksheets do. Enter a weekly spelling list instead and the same generator becomes a vocabulary drill sheet in the same few seconds.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-8" aria-label="Handwriting worksheet maker tool">
          <WorksheetMaker />
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12 prose prose-gray">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            How to Make a Handwriting Worksheet
          </h2>
          <p className="text-gray-600 mb-8">
            Type a name, a list of words, or a full sentence into the text box. Choose how the content should be laid out: single word per line for name or vocabulary practice, two words per line to fit more on a page, or sentence repeat to drill a full sentence. Select a guideline style, dotted for tracing or solid for general writing, set the number of repetitions per line, and pick print or cursive lettering. Click Download PDF and the worksheet is ready to print immediately.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Name Practice Worksheets for Kids
          </h2>
          <p className="text-gray-600 mb-8">
            Name practice is one of the first handwriting milestones for young children, and it is also one of the hardest things to find a ready-made worksheet for since every child&apos;s name is different. Type the name once, set repetitions to two or three, and the generator fills a full line of practice for that exact name in either print or cursive. Parents often print one sheet per week and rotate between the child&apos;s first name, last name, and a few sight words from school.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            How Teachers Use Custom Handwriting Worksheets
          </h2>
          <p className="text-gray-600 mb-8">
            Teachers use this tool to turn a weekly spelling list into a ready-to-print worksheet without manually drawing guidelines in a document editor. Pasting an entire word list and choosing Two Words per Line fits an average class spelling list onto a single page, while Sentence Repeat is useful for grammar or punctuation drills where the whole class practices the same sentence. Because the input is plain text, building a new worksheet for a new lesson takes under a minute.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={faqItems} />

          <div className="mt-12 border-t border-gray-100 pt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">More Handwriting Tools</h3>
            <div className="grid sm:grid-cols-2 gap-4">
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
                href="/tools/animated-handwriting-generator"
                className="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all p-5"
              >
                <span className="font-semibold text-gray-900">Animated Handwriting Generator</span>
                <p className="text-sm text-gray-500 mt-1">
                  Turn any text into a handwriting animation you can download as a GIF.
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
