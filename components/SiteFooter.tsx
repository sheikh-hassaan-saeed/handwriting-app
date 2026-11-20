import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-8">
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-3">
        <nav className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-xs font-semibold" aria-label="Tools footer navigation">
          <Link href="/handwriting-practice" className="text-gray-600 hover:text-indigo-600 hover:underline">Handwriting Practice</Link>
          <Link href="/letter-tracing" className="text-gray-600 hover:text-indigo-600 hover:underline">Letter Tracing</Link>
          <Link href="/notebook-paper" className="text-gray-600 hover:text-indigo-600 hover:underline">Notebook Paper</Link>
          <Link href="/cornell-notes" className="text-gray-600 hover:text-indigo-600 hover:underline">Cornell Notes</Link>
          <Link href="/calligraphy" className="text-gray-600 hover:text-indigo-600 hover:underline">Calligraphy</Link>
          <Link href="/signature-generator" className="text-gray-600 hover:text-indigo-600 hover:underline">Signature Generator</Link>
          <Link href="/printables" className="text-gray-600 hover:text-indigo-600 hover:underline">Printables</Link>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-6 pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
        <span>© {new Date().getFullYear()} HandwritingMaker. Free to use, forever.</span>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-xs" aria-label="Footer navigation">
          <Link href="/" className="hover:text-indigo-600 hover:underline">Home</Link>
          <Link href="/blog" className="hover:text-indigo-600 hover:underline">Blog</Link>
          <Link href="/about" className="hover:text-indigo-600 hover:underline">About</Link>
          <Link href="/contact" className="hover:text-indigo-600 hover:underline">Contact</Link>
          <Link href="/privacy-policy" className="hover:text-indigo-600 hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-indigo-600 hover:underline">Terms</Link>
          <Link href="/disclaimer" className="hover:text-indigo-600 hover:underline">Disclaimer</Link>
        </nav>
      </div>
    </footer>
  );
}
