import React from "react";
import Link from "next/link";
import { SEOPageConfig } from "@/lib/seo";
import SEOComponent from "./SEOComponent";
import Breadcrumbs from "./Breadcrumbs";
import FaqAccordion from "../FaqAccordion";

interface PlatformLayoutProps {
  path: string;
  config: SEOPageConfig;
  blogSlug?: string;
  children?: React.ReactNode;
  contentMarkdown?: string; // Optional custom article body
}

export default function PlatformLayout({
  path,
  config,
  blogSlug,
  children,
  contentMarkdown,
}: PlatformLayoutProps) {
  const faqItems = config.faqs.map((faq) => ({ q: faq.q, a: faq.a }));

  return (
    <>
      {/* Structural JSON-LD schemas */}
      <SEOComponent path={path} config={config} blogSlug={blogSlug} />

      {/* Nav Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-indigo-600 tracking-tight">
            HandwritingMaker
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            <Link href="/" className="text-gray-500 hover:text-indigo-600">Handwriting</Link>
            <Link href="/notebook-paper" className="text-gray-500 hover:text-indigo-600">Notebook Paper</Link>
            <Link href="/cornell-notes" className="text-gray-500 hover:text-indigo-600">Cornell Notes</Link>
            <Link href="/letter-tracing" className="text-gray-500 hover:text-indigo-600">Letter Tracing</Link>
            <Link href="/calligraphy" className="text-gray-500 hover:text-indigo-600">Calligraphy</Link>
            <Link href="/signature-generator" className="text-gray-500 hover:text-indigo-600">Signature</Link>
            <Link href="/printables" className="text-gray-500 hover:text-indigo-600 font-semibold text-indigo-600">Printables</Link>
            <Link href="/blog" className="text-gray-500 hover:text-indigo-600">Blog</Link>
          </nav>
          {/* Mobile navigation button */}
          <Link
            href="/printables"
            className="md:hidden text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full font-bold"
          >
            All Templates
          </Link>
        </div>
      </header>

      {/* Breadcrumb Navigator */}
      {config.breadcrumbs.length > 0 && <Breadcrumbs items={config.breadcrumbs} />}

      {/* Main Core Container */}
      <main className="min-h-screen bg-gray-50 pb-20">
        {/* HERO INTRO */}
        <section className="bg-gradient-to-br from-indigo-50 to-white py-10 px-4 text-center border-b border-indigo-100">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">{config.h1}</h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              {config.intro}
            </p>
          </div>
        </section>

        {/* INTERACTIVE WORKSPACE SLOT */}
        {children && (
          <section className="max-w-7xl mx-auto px-4 py-8" aria-label="Interactive workspace tool">
            {children}
          </section>
        )}

        {/* SEO CONTENT SECTION */}
        <section className="max-w-4xl mx-auto px-4 py-8 prose prose-gray">
          {/* Table of Contents */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8 shadow-sm max-w-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Table of Contents</h3>
            <ol className="list-decimal pl-5 text-xs text-indigo-600 font-semibold space-y-1.5">
              <li><a href="#quick-intro" className="hover:underline">Detailed Introduction</a></li>
              {children && <li><a href="#interactive-tool" className="hover:underline">Interactive Workspace Generator</a></li>}
              <li><a href="#features-guide" className="hover:underline">Resources & Features Guide</a></li>
              {faqItems.length > 0 && <li><a href="#faq-section" className="hover:underline">Frequently Asked Questions</a></li>}
              <li><a href="#related-resources" className="hover:underline">Related Tools & Guides</a></li>
              <li><a href="#author-bio" className="hover:underline">Author Profile & Verification</a></li>
            </ol>
          </div>

          <div id="quick-intro" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Detailed Introduction</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{config.intro}</p>
          </div>

          {children && (
            <div id="interactive-tool" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Interactive Workspace Generator</h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                Use the generator interface above to customize your template parameters in real-time. Adjust heights, grid spacing, line weights, paper sizes, and fonts using the sidebar. Once satisfied, click the download button to export high-resolution printouts directly from your client browser.
              </p>
            </div>
          )}

          {/* Core educational body */}
          <div id="features-guide" className="mb-8 border-t border-gray-150 pt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Resources & Features Guide</h2>
            {contentMarkdown ? (
              <div
                className="text-gray-600 leading-relaxed text-sm sm:text-base space-y-4"
                dangerouslySetInnerHTML={{
                  __html: contentMarkdown
                    .replace(/\n/g, "<br/>")
                    .replace(/### (.*)/g, "<h3 class='text-lg font-bold text-gray-700 mt-4 mb-2'>$1</h3>")
                    .replace(/## (.*)/g, "<h2 class='text-xl font-bold text-gray-800 mt-6 mb-3'>$1</h2>")
                    .replace(/- \*\*(.*?)\*\*(.*)/g, "<li><strong>$1</strong>$2</li>")
                    .replace(/(\|.*?\|)/g, "") // remove tables markdown parsing cleanly if raw
                }}
              />
            ) : (
              <p className="text-gray-600 leading-relaxed text-sm">
                This workbook maker conforms to standard international grids. It allows users to download letter-perfect guidelines for writing, tracking daily targets, or practicing stroke curves. Everything is calculated in vector grids so printing is clean at 300 DPI.
              </p>
            )}
          </div>

          {/* Conclusion */}
          <div className="mb-8 border-t border-gray-150 pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Conclusion</h2>
            <p className="text-gray-600 leading-relaxed text-sm">{config.conclusion}</p>
          </div>

          {/* FAQ Accordions */}
          {faqItems.length > 0 && (
            <div id="faq-section" className="mb-10 border-t border-gray-150 pt-6 scroll-mt-14">
              <h2 className="text-2xl font-bold text-gray-800 mb-5">Frequently Asked Questions</h2>
              <FaqAccordion items={faqItems} />
            </div>
          )}

          {/* Related Tools & Articles cluster links */}
          <div id="related-resources" className="border-t border-gray-150 pt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Tools & Guides</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {config.relatedTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="block bg-white rounded-xl border border-gray-150 p-4 hover:border-indigo-200 shadow-sm transition-all"
                >
                  <span className="font-bold text-indigo-600 text-sm block">⚙️ {tool.name}</span>
                  <span className="text-xxs text-gray-400 mt-1 block">Customize presets inside workspace</span>
                </Link>
              ))}
              {config.relatedArticles.map((art) => (
                <Link
                  key={art.href}
                  href={art.href}
                  className="block bg-white rounded-xl border border-gray-150 p-4 hover:border-indigo-200 shadow-sm transition-all"
                >
                  <span className="font-bold text-emerald-600 text-sm block">📝 {art.name}</span>
                  <span className="text-xxs text-gray-400 mt-1 block">Read supporting cluster guide</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Author Section & Date */}
          <div id="author-bio" className="mt-12 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-150 flex items-center justify-center text-xl flex-shrink-0">
              ✍️
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="font-bold text-gray-800 text-sm">{config.author.name}</h4>
                <span className="text-xxs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-semibold">
                  {config.author.role}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">{config.author.bio}</p>
              <span className="text-xxs text-gray-400 font-semibold block">
                Last Updated: {config.lastUpdated} | Verified High Authority Printables
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Unified Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} HandwritingMaker. All rights reserved.</span>
          <nav className="flex flex-wrap gap-4 text-xs font-semibold" aria-label="Footer navigation">
            <Link href="/" className="hover:text-indigo-600">Home Converter</Link>
            <Link href="/printables" className="hover:text-indigo-600">Planners</Link>
            <Link href="/notebook-paper" className="hover:text-indigo-600">Grids</Link>
            <Link href="/teacher-resources" className="hover:text-indigo-600">Teachers</Link>
            <Link href="/student-resources" className="hover:text-indigo-600">Students</Link>
            <Link href="/blog" className="hover:text-indigo-600">Blog</Link>
            <Link href="/about" className="hover:text-indigo-600">About</Link>
            <Link href="/contact" className="hover:text-indigo-600">Contact</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
