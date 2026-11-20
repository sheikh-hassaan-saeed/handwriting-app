import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Page not found | HandwritingMaker",
  robots: { index: false, follow: true },
};

const POPULAR = [
  { href: "/tools/tracing-worksheet-generator", label: "Dotted line tracing worksheet generator" },
  { href: "/handwriting-practice", label: "Handwriting practice sheets" },
  { href: "/tools/cursive-practice-sheets", label: "Cursive practice sheets" },
  { href: "/letter-tracing", label: "Letter tracing worksheets" },
  { href: "/notebook-paper", label: "Printable notebook paper" },
  { href: "/blog", label: "Handwriting guides and articles" },
];

export default function NotFound() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-indigo-600 tracking-tight">HandwritingMaker</Link>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-16 text-gray-800">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">We couldn&apos;t find that page</h1>
        <p className="text-gray-600 mb-8">
          The link may be old or mistyped. Here are the pages people use most:
        </p>
        <ul className="space-y-2 mb-10">
          {POPULAR.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="text-indigo-600 font-semibold hover:underline">{p.label} →</Link>
            </li>
          ))}
        </ul>
        <Link href="/" className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700">
          Go to the homepage
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
