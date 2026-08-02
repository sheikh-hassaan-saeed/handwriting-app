import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
        <span>© {new Date().getFullYear()} HandwritingMaker. Free to use, forever.</span>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-xs" aria-label="Footer navigation">
          <Link href="/" className="hover:text-indigo-600 hover:underline">Home</Link>
          <Link href="/blog" className="hover:text-indigo-600 hover:underline">Blog</Link>
          <Link href="/about" className="hover:text-indigo-600 hover:underline">About</Link>
          <Link href="/contact" className="hover:text-indigo-600 hover:underline">Contact</Link>
          <Link href="/privacy-policy" className="hover:text-indigo-600 hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-indigo-600 hover:underline">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
