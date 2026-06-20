import type { Metadata } from "next";
import Link from "next/link";
import AnimatedHandwritingGenerator from "@/components/AnimatedHandwritingGenerator";
import FaqAccordion from "@/components/FaqAccordion";

const TITLE = "Animated Handwriting Generator - Free Text Animation | HandwritingMaker";
const DESCRIPTION =
  "Generate free animated handwriting videos and GIFs from any text, right in your browser. No software install needed. Export as GIF or looping video.";
const PAGE_URL = "https://handwritingmaker.com/tools/animated-handwriting-generator";

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
      name: "Is this animated handwriting generator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The animated handwriting generator is completely free, runs entirely in your browser, and requires no signup or software install.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download the animation as a GIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Click Download GIF and the tool renders every frame of the animation and saves it as a looping GIF file you can upload anywhere.",
      },
    },
    {
      "@type": "Question",
      name: "How long can my text be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Text is limited to 100 characters. This keeps animations short, fast to render, and well suited for social media captions, signatures, and short quotes.",
      },
    },
    {
      "@type": "Question",
      name: "Can I change the handwriting font and paper style?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The generator uses the same five handwriting fonts, four paper backgrounds, and four ink colors as the main HandwritingMaker text-to-handwriting converter.",
      },
    },
    {
      "@type": "Question",
      name: "Will the animation loop automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, by default the animation writes the text, pauses briefly, then restarts. You can turn looping off if you only want it to play once.",
      },
    },
  ],
};

const faqItems = [
  {
    q: "Is this animated handwriting generator free?",
    a: "Yes. The animated handwriting generator is completely free, runs entirely in your browser, and requires no signup or software install.",
  },
  {
    q: "Can I download the animation as a GIF?",
    a: "Yes. Click Download GIF and the tool renders every frame of the animation and saves it as a looping GIF file you can upload anywhere.",
  },
  {
    q: "How long can my text be?",
    a: "Text is limited to 100 characters. This keeps animations short, fast to render, and well suited for social media captions, signatures, and short quotes.",
  },
  {
    q: "Can I change the handwriting font and paper style?",
    a: "Yes. The generator uses the same five handwriting fonts, four paper backgrounds, and four ink colors as the main HandwritingMaker text-to-handwriting converter.",
  },
  {
    q: "Will the animation loop automatically?",
    a: "Yes, by default the animation writes the text, pauses briefly, then restarts. You can turn looping off if you only want it to play once.",
  },
];

export default function AnimatedHandwritingGeneratorPage() {
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
            Animated Handwriting Generator
          </h1>
          <div className="max-w-3xl mx-auto text-left sm:text-center text-gray-600 text-base">
            <p>
              A still image of handwriting is easy to scroll past, but watching text appear stroke by stroke holds attention in a way static text cannot. This free animated handwriting generator turns any short line of text into a looping animation that looks like it is being written in real time, right in your browser.
            </p>
            <p className="mt-3">
              Choose from five handwriting styles, pick a paper background and ink color, and set the writing speed to slow, medium, or fast. Watch the live preview write itself out, then download the result as a GIF you can drop into a video, a slideshow, or a social media post. No software to install and nothing to sign up for.
            </p>
            <p className="mt-3">
              Most animated handwriting tools online either charge a subscription or limit you to a single font and a plain white background. This one keeps the same five fonts, four paper textures, and four ink colors available on the main HandwritingMaker converter, so the animation matches whatever style you already use for static handwriting images.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-8" aria-label="Animated handwriting generator tool">
          <AnimatedHandwritingGenerator />
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12 prose prose-gray">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            How to Create Animated Handwriting
          </h2>
          <p className="text-gray-600 mb-8">
            Type up to 100 characters of text, choose a handwriting style from the five available fonts, and pick a paper background and ink color to match the look you want. Choose an animation speed, then watch the preview write your text out automatically. When you are happy with the result, click Download GIF to save it as a looping animated file ready to share.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Uses for Animated Handwriting Text
          </h2>
          <ul className="list-disc pl-5 text-gray-600 mb-8 space-y-2">
            <li>Animated signatures or short quotes for video intros and outros</li>
            <li>Handwritten-style greetings for digital cards and invitations</li>
            <li>Eye-catching captions for short-form video content</li>
            <li>Classroom presentations that demonstrate letter formation in motion</li>
            <li>Personalized animated messages for birthdays and special occasions</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Animated Handwriting for Social Media
          </h2>
          <p className="text-gray-600 mb-8">
            A short animated handwriting clip stands out in a feed full of static images and pre-made templates because it looks personal and unpolished in a good way. Research suggests that motion and novelty both increase the time viewers spend looking at a piece of content, which is exactly what a few seconds of handwriting animation provides. Keep the text short, choose a paper background that matches your platform&apos;s aesthetic, and loop the animation so it holds attention through a second pass.
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
