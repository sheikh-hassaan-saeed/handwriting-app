import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | HandwritingMaker",
  description: "HandwritingMaker privacy policy: how we handle data, advertising, and cookies.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPolicy() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-indigo-600 tracking-tight">HandwritingMaker</Link>
          <Link href="/" className="text-sm text-indigo-600 hover:underline font-medium">Free Handwriting Tool</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Effective date: June 9, 2026. Last updated: November 20, 2026</p>

        <div className="space-y-10 text-[15px] leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. About HandwritingMaker</h2>
            <p>
              HandwritingMaker (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website at{" "}
              <Link href="/" className="text-indigo-600 hover:underline">www.handwritingmaker.com</Link>{" "}
              (the &ldquo;Site&rdquo;). The Site provides free browser-based tools for generating handwriting
              worksheets, practice sheets, notebook paper, and related educational printables. This Privacy Policy
              explains what information is collected when you use the Site and how it is used.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <h3 className="text-base font-semibold text-gray-800 mb-2">A. Tool Usage Data</h3>
            <p>
              All handwriting generators, worksheet builders, and PDF creators on HandwritingMaker run entirely
              inside your browser. Text you type, settings you choose, and files you generate are processed
              locally on your device and are never transmitted to our servers or stored in any database.
            </p>
            <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">B. Server Log Data</h3>
            <p>
              Like all web servers, ours automatically records standard access logs when your browser requests
              a page. These logs may include your IP address, browser type, referring URL, and pages visited.
              Log data is used solely for security monitoring and aggregate traffic analysis and is not linked
              to any personal identity.
            </p>
            <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">C. Cookies</h3>
            <p>
              We use cookies and similar tracking technologies for two purposes: analytics and advertising.
              You can instruct your browser to refuse all cookies; however, some parts of the Site may not
              function as a result.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Google AdSense and Third-Party Advertising</h2>
            <p>
              We use Google AdSense to display advertisements on the Site. Google AdSense uses cookies and web
              beacons to serve ads based on a user&apos;s prior visits to our Site and other sites on the internet.
              Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit
              to our Site and other sites.
            </p>
            <p className="mt-3">
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Google&apos;s Ads Settings
              </a>
              . Alternatively, you may opt out of a third-party vendor&apos;s use of cookies for personalized
              advertising by visiting{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                www.aboutads.info
              </a>
              .
            </p>
            <p className="mt-3">
              Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits
              to this website or other websites. For more information about how Google uses data when you visit
              sites that use its advertising services, see{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                How Google uses data from sites that use Google services
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Analytics</h2>
            <p>
              The Site does not currently run Google Analytics or any other analytics script. We review
              aggregate search performance (queries, impressions and clicks) in Google Search Console, which
              does not place cookies on your device. If we add an analytics tool in the future, this section will
              be updated before it goes live. Google Analytics cookies, where used, can be opted out of with the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Children&apos;s Privacy</h2>
            <p>
              Our Site is designed to provide educational resources suitable for use by teachers and parents
              working with children. We do not knowingly collect personal information from children under 13.
              If you are a parent or guardian and believe your child has provided us with personal information,
              please contact us and we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Links to Other Websites</h2>
            <p>
              The Site may contain links to external websites. We have no control over the content or privacy
              practices of those sites and are not responsible for their policies. We encourage you to review
              the privacy policy of any external site you visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to access, correct, or delete personal
              information held about you, or to restrict or object to its processing. Because HandwritingMaker
              does not collect personal information through its tools, there is typically no personal data on
              file for tool users. For any data-related requests related to log data or ad tracking, please
              contact us using the details below.
            </p>
            <p className="mt-3">
              <strong>EEA, UK and Switzerland (GDPR / UK GDPR):</strong> you have the right to access, rectify,
              erase, restrict or object to the processing of your personal data, the right to data portability,
              and the right to withdraw consent at any time. Where personalised advertising is shown to visitors
              in these regions, it is only shown after consent is collected through a consent banner, and you can
              change your choice at any time. You also have the right to lodge a complaint with your local data
              protection authority.
            </p>
            <p className="mt-3">
              <strong>California (CCPA / CPRA):</strong> you have the right to know what personal information is
              collected about you, to request its deletion, and to opt out of the &ldquo;sale&rdquo; or
              &ldquo;sharing&rdquo; of personal information for cross-context behavioural advertising. We do not sell
              personal information for money. You can limit ad personalisation through Google&apos;s Ads Settings
              linked above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Emails You Send Us</h2>
            <p>
              If you email us directly or through the contact page, we receive your email address and whatever you
              write. We use it only to reply to you and do not add you to any mailing list.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top of
              this page reflects the most recent revision. Continued use of the Site after any changes
              constitutes your acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
              <Link href="/contact" className="text-indigo-600 hover:underline">our contact page</Link> or by
              email at{" "}
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
