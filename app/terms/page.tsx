import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service | HandwritingMaker",
  description: "Terms of service for using HandwritingMaker — the free online handwriting worksheet and printable generator.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function Terms() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-indigo-600 tracking-tight">HandwritingMaker</Link>
          <Link href="/" className="text-sm text-indigo-600 hover:underline font-medium">Free Handwriting Tool</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-10">Effective date: June 9, 2026 &mdash; Last updated: August 2, 2026</p>

        <div className="space-y-10 text-[15px] leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the website at{" "}
              <Link href="/" className="text-indigo-600 hover:underline">www.handwritingmaker.com</Link>{" "}
              (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not
              agree to these Terms, please do not use the Site. These Terms apply to all visitors, users,
              and anyone else who accesses or uses the Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
            <p>
              HandwritingMaker provides free, browser-based tools for generating handwriting worksheets,
              practice sheets, notebook paper templates, printable planners, and related educational
              materials (collectively, the &ldquo;Service&rdquo;). All generation tools run locally in your
              browser. No account registration is required to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Permitted Use</h2>
            <p>You may use the Service for personal, educational, and classroom purposes, including:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-700">
              <li>Generating and printing worksheets for your own students, children, or personal practice</li>
              <li>Downloading PDF and image outputs for use in classrooms and home learning environments</li>
              <li>Sharing printed copies of generated materials for non-commercial educational use</li>
            </ul>
            <p className="mt-4">You may not:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-700">
              <li>Reproduce, sell, or sublicense the Site&apos;s underlying software, code, or design</li>
              <li>Scrape or crawl the Site in a way that places excessive load on our servers</li>
              <li>Use the Site to generate content that is unlawful, harmful, or abusive</li>
              <li>Attempt to gain unauthorized access to any portion of the Site or its related systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Intellectual Property</h2>
            <p>
              The Site&apos;s design, code, text, graphics, and branding are the intellectual property of
              HandwritingMaker and are protected by applicable copyright and trademark laws. The worksheet
              and printable outputs you generate using the tools are yours to use freely for personal and
              educational purposes. You retain ownership of any custom text you input into the tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Third-Party Services and Advertising</h2>
            <p>
              The Site displays advertisements served by Google AdSense and potentially other third-party
              ad networks. These services may collect data as described in our{" "}
              <Link href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</Link>.
              We are not responsible for the content, accuracy, or practices of third-party advertisers or
              websites linked from advertisements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Disclaimer of Warranties</h2>
            <p>
              The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of
              any kind, either express or implied, including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, or non-infringement. We do not warrant
              that the Service will be uninterrupted, error-free, or free of viruses or other harmful
              components.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, HandwritingMaker and its operators shall
              not be liable for any indirect, incidental, special, consequential, or punitive damages arising
              from your use of, or inability to use, the Service, even if advised of the possibility of such
              damages. Our total liability to you for any claim arising out of or relating to these Terms or
              the Service shall not exceed one US dollar ($1).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Modifications to the Service and Terms</h2>
            <p>
              We reserve the right to modify or discontinue the Service at any time without notice. We may
              also update these Terms from time to time. The &ldquo;Last updated&rdquo; date at the top of this page
              reflects the most recent revision. Your continued use of the Site after changes are posted
              constitutes your acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with applicable law. Any disputes
              arising under these Terms shall be resolved through good-faith negotiation. If unresolved,
              disputes shall be submitted to binding arbitration or a court of competent jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact</h2>
            <p>
              Questions about these Terms may be directed to us via{" "}
              <Link href="/contact" className="text-indigo-600 hover:underline">our contact page</Link> or
              by email at{" "}
              <a href="mailto:sheikhhassaansaeed@gmail.com" className="text-indigo-600 hover:underline">
                sheikhhassaansaeed@gmail.com
              </a>
              .
            </p>
          </section>

        </div>
      </main>

      <SiteFooter />
    </>
  );
}
