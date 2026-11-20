import type { Metadata } from "next";
import Link from "next/link";
import PlatformLayout from "@/components/platform/PlatformLayout";
import { SEO_DATA } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/constants";

const PATH = "/about";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function AboutPage() {
  return (
    <PlatformLayout path={PATH} config={config}>
      <div className="bg-white rounded-2xl border border-gray-150 p-8 shadow-sm prose prose-gray max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Who runs HandwritingMaker</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          [[OWNER INPUT: your name, where you are based, and in two or three sentences why you built this site — for
          example a child learning to write, a classroom need, or your own handwriting practice. Only include details
          that are true.]]
        </p>

        <h2 className="text-xl font-bold text-gray-800 mb-4">What the site does</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          HandwritingMaker is a set of free, browser-based generators for printable handwriting material: tracing
          worksheets, cursive and print practice sheets, lined and graph paper, Cornell notes templates, planners,
          calligraphy guide sheets and typed signatures. Alongside the tools, the{" "}
          <Link href="/blog" className="text-indigo-600 hover:underline">blog</Link> covers practical topics such as{" "}
          <Link href="/blog/how-to-improve-handwriting-as-an-adult" className="text-indigo-600 hover:underline">
            improving handwriting as an adult
          </Link>{" "}
          and{" "}
          <Link href="/blog/wide-ruled-vs-college-ruled" className="text-indigo-600 hover:underline">
            choosing between wide and college ruled paper
          </Link>
          .
        </p>

        <h2 className="text-xl font-bold text-gray-800 mb-4">How the tools handle your data</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          The generators run entirely in your browser. Names, word lists and signatures you type are used to draw the
          preview and PDF on your own device and are not sent to or stored on our server. There are no accounts and no
          sign-up. See the <Link href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</Link>{" "}
          for details on cookies and advertising.
        </p>

        <h2 className="text-xl font-bold text-gray-800 mb-4">How content is written and checked</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          [[OWNER INPUT: describe honestly how articles are researched, written and reviewed, including whether AI tools
          are used for drafting and how you check facts before publishing.]]
        </p>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Get in touch</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Found a bug, or want a layout we don&apos;t offer yet? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline">{CONTACT_EMAIL}</a> or use the{" "}
          <Link href="/contact" className="text-indigo-600 hover:underline">contact page</Link>.
        </p>
      </div>
    </PlatformLayout>
  );
}
