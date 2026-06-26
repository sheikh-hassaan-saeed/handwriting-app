import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_ARTICLES, AUTHOR_INFO } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import Breadcrumbs from "@/components/platform/Breadcrumbs";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(BLOG_ARTICLES).map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = BLOG_ARTICLES[params.slug];
  if (!article) return {};

  const pageUrl = `${SITE_URL}/blog/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: pageUrl,
      siteName: "HandwritingMaker",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

function parseMarkdownToHtml(markdown: string): string {
  // Replace carriage returns
  let html = markdown.replace(/\r\n/g, "\n");

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Italics
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  // Inline Code
  html = html.replace(/`(.*?)`/g, "<code class='bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded text-sm font-mono'>$1</code>");

  // Blockquotes
  html = html.replace(/^\s*>\s+(.*)$/gm, "<blockquote class='border-l-4 border-indigo-500 pl-4 py-1 my-4 text-gray-500 italic'>$1</blockquote>");

  // Headers (H3, H2)
  html = html.replace(/^\s*###\s+(.*)$/gm, (match, title) => {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `<h3 id="${id}" class="text-lg font-bold text-gray-700 mt-4 mb-2 scroll-mt-20">${title}</h3>`;
  });
  html = html.replace(/^\s*##\s+(.*)$/gm, (match, title) => {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `<h2 id="${id}" class="text-xl font-bold text-gray-800 mt-6 mb-3 scroll-mt-20">${title}</h2>`;
  });
  html = html.replace(/^\s*#\s+(.*)$/gm, (match, title) => {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `<h1 id="${id}" class="text-2xl font-extrabold text-gray-900 mt-10 mb-5 scroll-mt-20">${title}</h1>`;
  });

  // Links: [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' class='text-indigo-600 hover:underline font-semibold'>$1</a>");

  // Tables parsing line-by-line
  const lines = html.split("\n");
  let inTable = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("|") && line.endsWith("|")) {
      if (!inTable) {
        inTable = true;
        lines[i] = "<div class='overflow-x-auto my-6 border border-gray-200 rounded-xl'><table class='min-w-full divide-y divide-gray-200 text-sm'><thead class='bg-gray-50'><tr>" + 
          line.split("|").slice(1, -1).map(cell => `<th class='px-4 py-3 text-left font-bold text-gray-700 uppercase tracking-wider'>${cell.trim()}</th>`).join("") + 
          "</tr></thead><tbody class='bg-white divide-y divide-gray-100'>";
      } else if (line.includes("---")) {
        lines[i] = "";
      } else {
        lines[i] = "<tr>" + 
          line.split("|").slice(1, -1).map(cell => `<td class='px-4 py-3 text-gray-600'>${cell.trim()}</td>`).join("") + 
          "</tr>";
      }
    } else {
      if (inTable) {
        inTable = false;
        lines[i] = "</tbody></table></div>" + lines[i];
      }
    }
  }
  html = lines.join("\n");

  // Lists: Unordered lists starting with - or *
  html = html.replace(/^\s*[\-\*]\s+(.*)$/gm, "<li class='text-gray-600 mb-1.5'>$1</li>");
  
  // Wrap list items in <ul>
  html = html.replace(/(<li.*?>[\s\S]*?<\/li>)+/g, (match) => {
    return `<ul class='list-disc pl-5 my-4 space-y-1.5'>${match}</ul>`;
  });

  // Paragraphs
  const paragraphs = html.split(/\n\s*\n/);
  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i].trim();
    if (p && !p.startsWith("<h") && !p.startsWith("<ul") && !p.startsWith("<li") && !p.startsWith("<div") && !p.startsWith("<table") && !p.startsWith("<tbody") && !p.startsWith("<thead") && !p.startsWith("<tr") && !p.startsWith("<blockquote") && !p.startsWith("<a")) {
      paragraphs[i] = `<p class='mb-4 text-gray-600 leading-relaxed'>${p}</p>`;
    }
  }
  html = paragraphs.join("\n");

  return html;
}

export default function dynamicBlogPage({ params }: Props) {
  const article = BLOG_ARTICLES[params.slug];
  if (!article) notFound();

  const pageUrl = `${SITE_URL}/blog/${article.slug}`;

  // 1. Breadcrumbs
  const breadcrumbsList = [
    { name: "Blog", href: "/blog" },
    { name: article.title, href: `/blog/${article.slug}` },
  ];

  // 2. JSON-LD Breadcrumb Schema
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
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: pageUrl,
      },
    ],
  };

  // 3. JSON-LD Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.lastUpdated,
    dateModified: article.lastUpdated,
    author: {
      "@type": "Person",
      name: AUTHOR_INFO.name,
      jobTitle: AUTHOR_INFO.role,
      sameAs: AUTHOR_INFO.sameAs || [],
    },
    publisher: {
      "@type": "Organization",
      name: "HandwritingMaker",
      url: SITE_URL,
    },
    mainEntityOfPage: pageUrl,
  };

  // Render article markdown
  const bodyHtml = parseMarkdownToHtml(article.contentMarkdown);

  // Dynamically extract headings from markdown
  const headingMatches = article.contentMarkdown.match(/^\s*#{2,3}\s+(.*)$/gm) || [];
  const headings = headingMatches.map((match) => {
    const isH3 = match.trim().startsWith("###");
    const text = match.replace(/^\s*#{2,3}\s+/, "").trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return { text, id, isH3 };
  });

  // Approximate reading time (200 words per minute)
  const wordCount = article.contentMarkdown.split(/\s+/).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

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
            <Link href="/printables" className="text-gray-500 hover:text-indigo-600">Printables</Link>
            <Link href="/blog" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-4">Blog</Link>
          </nav>
          <Link
            href="/"
            className="text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3.5 py-1.5 rounded-full font-bold transition-colors"
          >
            Free Tool →
          </Link>
        </div>
      </header>

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbsList} />

      <main className="bg-white min-h-screen">
        {/* Banner Hero */}
        <section className="bg-gradient-to-br from-indigo-50 to-white border-b border-indigo-100 py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3 block">
              {article.category.toUpperCase()}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-gray-500 text-sm">
              By {AUTHOR_INFO.name} ({AUTHOR_INFO.role}) · {readTime} min read · Updated {article.lastUpdated}
            </p>
          </div>
        </section>

        {/* Content Structure */}
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="bg-gray-50 border border-gray-150 rounded-2xl p-5 sticky top-24 shadow-xs space-y-5">
              {headings.length > 0 && (
                <div>
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-gray-500 mb-3">Table of Contents</h4>
                  <ul className="space-y-2 text-xs font-semibold text-indigo-600">
                    <li>
                      <a href="#quick-intro" className="hover:underline">Introduction</a>
                    </li>
                    {headings.map((h, idx) => (
                      <li key={idx} className={h.isH3 ? "pl-3 text-gray-500 font-normal" : ""}>
                        <a href={`#${h.id}`} className="hover:underline">{h.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className={headings.length > 0 ? "border-t border-gray-200 pt-4" : ""}>
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-gray-500 mb-3">Related Tool</h4>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  Apply this guide&apos;s findings using our free interactive canvas workspace.
                </p>
                <Link
                  href={article.relatedTool.href}
                  className="w-full text-center py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm block transition-colors shadow-sm"
                >
                  Open {article.relatedTool.name}
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Article Body */}
          <article id="quick-intro" className="lg:col-span-8 prose prose-gray max-w-none scroll-mt-20">
            <div
              className="text-gray-800 text-[17px] leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />

            {/* Author Section */}
            <div className="border-t border-gray-150 mt-12 pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-xl font-bold flex-shrink-0 border border-indigo-100">
                  {AUTHOR_INFO.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{AUTHOR_INFO.name}</h4>
                  <p className="text-xs text-indigo-500 font-semibold mb-2">{AUTHOR_INFO.role}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{AUTHOR_INFO.bio}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} HandwritingMaker. Free worksheets, printables, and generators.</span>
          <nav className="flex gap-4">
            <Link href="/" className="hover:text-indigo-600 hover:underline">Free Tool</Link>
            <Link href="/blog" className="hover:text-indigo-600 hover:underline">Blog</Link>
            <Link href="/contact" className="hover:text-indigo-600 hover:underline">Contact</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
