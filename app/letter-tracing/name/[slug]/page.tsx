import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BABY_NAMES } from "@/lib/names";
import { SITE_URL } from "@/lib/constants";
import LetterTracingGenerator from "@/components/LetterTracingGenerator";
import Breadcrumbs from "@/components/platform/Breadcrumbs";
import FaqAccordion from "@/components/FaqAccordion";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return BABY_NAMES.map((name) => ({
    slug: `${name.toLowerCase()}-tracing-worksheet`,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const slug = params.slug;
  if (!slug.endsWith("-tracing-worksheet")) return {};

  const rawName = slug.replace("-tracing-worksheet", "");
  const name = BABY_NAMES.find((n) => n.toLowerCase() === rawName);
  if (!name) return {};

  const pageUrl = `${SITE_URL}/letter-tracing/name/${slug}`;
  const title = `Free Printable ${name} Tracing Worksheet | HandwritingMaker`;
  const description = `Download a free printable name tracing worksheet for the name ${name}. Customize lines, repetitions, dotted letters, and export a vector PDF.`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "HandwritingMaker",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function NameTracingPage({ params }: Props) {
  const slug = params.slug;
  if (!slug.endsWith("-tracing-worksheet")) notFound();

  const rawName = slug.replace("-tracing-worksheet", "");
  const name = BABY_NAMES.find((n) => n.toLowerCase() === rawName);
  if (!name) notFound();

  const pageUrl = `${SITE_URL}/letter-tracing/name/${slug}`;
  const h1 = `Free Printable ${name} Tracing Worksheet`;

  const breadcrumbsList = [
    { name: "Letter Tracing", href: "/letter-tracing" },
    { name: `${name} Tracing Worksheet`, href: `/letter-tracing/name/${slug}` },
  ];

  const faqs = [
    {
      q: `How do I print a tracing sheet for the name ${name}?`,
      a: `Type any adjustments in the tool, customize page options like A4 or Letter sizes, and click 'Download PDF'. Print from any device.`,
    },
    {
      q: `Can I change the font style to cursive?`,
      a: `Yes. In the workspace settings below, switch the font typeface to Cursive to render ${name} in script guidelines.`,
    },
  ];

  // Dynamic Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Letter Tracing",
        item: `${SITE_URL}/letter-tracing`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${name} Tracing Sheet`,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight flex items-center gap-1.5">
            ✏️ HandwritingMaker
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Worksheet Maker</Link>
            <Link href="/notebook-paper" className="hover:text-indigo-600 transition-colors">Notebook Paper</Link>
            <Link href="/cornell-notes" className="hover:text-indigo-600 transition-colors">Cornell Notes</Link>
            <Link href="/letter-tracing" className="text-indigo-600 font-semibold underline underline-offset-4">Letter Tracing</Link>
            <Link href="/calligraphy" className="hover:text-indigo-600 transition-colors">Calligraphy</Link>
            <Link href="/signature-generator" className="hover:text-indigo-600 transition-colors">Signature</Link>
            <Link href="/printables" className="hover:text-indigo-600 transition-colors">Templates</Link>
            <Link href="/blog" className="hover:text-indigo-600 transition-colors">Guides</Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbsList} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-50 to-white rounded-3xl border border-indigo-100 p-6 sm:p-10 mb-8">
          <span className="text-xxs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full inline-block mb-3">
            Programmatic Name Preset
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {h1}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
            Help children master stroke coordinates for the name <strong>{name}</strong>. This custom name-tracing sheet renders block print letters with tracing dots, arrow stroke guides, and phonics illustrations. Customize repetitions or switch fonts in the workspace below.
          </p>
        </section>

        {/* Tracing Workspace */}
        <section className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm mb-12">
          <LetterTracingGenerator defaultName={name} />
        </section>

        {/* On-Page Copy Sections */}
        <section className="max-w-4xl mx-auto prose prose-slate py-8 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">How to Use the {name} Name Tracing Worksheet</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Open the document canvas inside the editor workspace above. The first row features a phonics illustration for the initial letter <strong>{name.charAt(0)}</strong> to build letter-sound association. The subsequent rows provide dotted name paths with start dots. Click the download button to export the worksheet as a print-ready A4 PDF.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Teaching Letter Stroke Coordinates at Home</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Preschool toddlers learning name-writing often struggle with fine muscle controls. Dotted lines with start-point indicator guides help teach the proper top-to-bottom stroke sequence, reinforcing muscle memory.
            </p>
          </div>

          {/* FAQs Accordion */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <FaqAccordion items={faqs} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} HandwritingMaker. Free to use, forever.</span>
          <nav className="flex gap-4" aria-label="Footer navigation">
            <Link href="/" className="hover:text-indigo-600 hover:underline">Worksheet Maker</Link>
            <Link href="/notebook-paper" className="hover:text-indigo-600 hover:underline">Notebook Paper</Link>
            <Link href="/letter-tracing" className="hover:text-indigo-600 hover:underline">Letter Tracing</Link>
            <Link href="/contact" className="hover:text-indigo-600 hover:underline">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
