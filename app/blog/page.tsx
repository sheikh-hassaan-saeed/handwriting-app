import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Handwriting Blog — Tips, Guides & Resources | HandwritingMaker",
  description:
    "Free handwriting improvement guides, tips, and resources from HandwritingMaker. Learn how to improve your handwriting, practice techniques, and more.",
  alternates: {
    canonical: "https://handwritingmaker.com/blog",
  },
};

const posts = [
  {
    slug: "cursive-handwriting-practice-sheets",
    title:
      "Free Cursive Handwriting Practice Sheets (Printable PDF for All Levels)",
    description:
      "Download free printable cursive handwriting practice sheets for beginners to advanced. PDF format, all 26 letters, words and sentences included. Print and start today.",
    readTime: "14 min read",
    category: "Cursive Writing",
  },
  {
    slug: "how-to-improve-handwriting-as-an-adult",
    title:
      "How to Improve Handwriting as an Adult (7 Proven Techniques That Actually Work)",
    description:
      "Struggling with messy handwriting as an adult? Discover 7 proven techniques to improve your handwriting fast — with free practice sheets and expert tips. No talent required.",
    readTime: "12 min read",
    category: "Handwriting Improvement",
  },
  {
    slug: "how-to-convert-handwriting-to-a-font",
    title: "How to Convert Your Handwriting into a Font (Free and Paid Methods)",
    description:
      "Learn how to convert handwriting to a font for free using Calligraphr, FontForge, or MyScriptFont, plus tips for clean scans and installing your font.",
    readTime: "9 min read",
    category: "Handwriting Fonts",
  },
  {
    slug: "best-handwriting-practice-sheets-for-adults",
    title: "Best Handwriting Practice Sheets for Adults (Free Printables)",
    description:
      "Discover the best free handwriting practice sheets for adults, including cursive and print printables, plus how to use them and track your progress.",
    readTime: "10 min read",
    category: "Handwriting Practice",
  },
  {
    slug: "how-to-make-cursive-handwriting-practice-sheets",
    title: "How to Make Cursive Handwriting Practice Sheets (Free Generator)",
    description:
      "Learn how to make cursive handwriting practice sheets by hand or generate them free online, plus a full cursive letter formation guide for beginners.",
    readTime: "8 min read",
    category: "Cursive Writing",
  },
  {
    slug: "handwriting-without-tears-alternatives-free",
    title: "Free Handwriting Without Tears Alternatives (Online Tools & Printables)",
    description:
      "Explore free Handwriting Without Tears alternatives, including online worksheet makers and printables that supplement at-home handwriting practice.",
    readTime: "8 min read",
    category: "Handwriting for Kids",
  },
];

export default function BlogIndex() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-indigo-600 tracking-tight">
            HandwritingMaker
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/blog" className="text-indigo-600 underline underline-offset-4">
              Blog
            </Link>
            <Link
              href="/"
              className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Free Tool →
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Handwriting Blog
          </h1>
          <p className="text-gray-500">
            Tips, guides, and resources to help you write better.
          </p>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all p-6"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-2 block">
                {post.category}
              </span>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {post.description}
              </p>
              <span className="text-xs text-gray-400">{post.readTime}</span>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} HandwritingMaker. Free to use, forever.</span>
          <nav className="flex gap-4">
            <Link href="/" className="hover:text-indigo-600 hover:underline">Free Tool</Link>
            <Link href="/blog" className="hover:text-indigo-600 hover:underline">Blog</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
