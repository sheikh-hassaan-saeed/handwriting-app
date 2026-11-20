import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disclaimer | HandwritingMaker",
  description: "What HandwritingMaker's worksheets, tools and articles are (and aren't) intended for, plus notes on trademarks and printing accuracy.",
  alternates: { canonical: `${SITE_URL}/disclaimer` },
};

export default function Disclaimer() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-indigo-600 tracking-tight">HandwritingMaker</Link>
          <Link href="/" className="text-sm text-indigo-600 hover:underline font-medium">Free Handwriting Tool</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Disclaimer</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: November 20, 2026</p>

        <div className="space-y-10 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">General information only</h2>
            <p>
              The worksheets, templates and articles on HandwritingMaker are general educational resources for
              parents, teachers, students and adults practising their handwriting. They are not a substitute for
              advice from a qualified teacher, occupational therapist or medical professional. If a child has
              persistent difficulty with pencil grip, letter formation or fine motor control, please speak to a
              qualified specialist.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Printing and measurements</h2>
            <p>
              Line spacings such as wide ruled (11/32 in) and college ruled (9/32 in) are reproduced as closely as
              possible, but printed results depend on your printer, paper and print settings. For accurate spacing,
              print at 100% (&ldquo;Actual Size&rdquo;) rather than &ldquo;Fit to page&rdquo;, and check a test page
              before printing in bulk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Typed signatures</h2>
            <p>
              The signature generator produces a stylised image of a typed name. Whether a typed or image signature
              is acceptable for a particular document depends on the document and the law where you live. For
              contracts, official forms or anything requiring identity verification, use the method the other party
              requires.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Trademarks and third-party names</h2>
            <p>
              Names of curricula, products and companies mentioned on this site, such as Handwriting Without Tears,
              Learning Without Tears, Zaner-Bloser and D&apos;Nealian, belong to their respective owners.
              HandwritingMaker is independent and is not affiliated with, sponsored by or endorsed by any of them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">External links and advertising</h2>
            <p>
              Articles may link to other websites. We do not control those sites and are not responsible for their
              content. The Site may display advertising from third parties; an advertisement is not an endorsement of
              the advertised product or service. See the{" "}
              <Link href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</Link> for how
              advertising cookies are used.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Errors and corrections</h2>
            <p>
              We try to keep every page accurate, but mistakes happen. If you spot one, email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline">{CONTACT_EMAIL}</a> and
              we will review it. See also our{" "}
              <Link href="/terms" className="text-indigo-600 hover:underline">Terms of Service</Link>.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
