import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/fonts";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function FontsPage() {
  return (
    <PlatformLayout path={PATH} config={config}>
      <div className="bg-white rounded-2xl border border-gray-150 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Supported Handwriting Cursive Typefaces</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Compare our cursive styles used to convert text to realistic handwriting.
        </p>

        <div className="space-y-6">
          <div className="p-5 border border-gray-150 rounded-xl bg-gray-50">
            <span className="text-xxs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Font family: Caveat</span>
            <span className="font-semibold text-gray-800 text-sm block">Classic Cursive</span>
            <span className="block text-2xl font-serif mt-3 text-indigo-800 font-bold" style={{ fontFamily: "Caveat" }}>
              The quick brown fox jumps over the lazy dog.
            </span>
          </div>
          <div className="p-5 border border-gray-150 rounded-xl bg-gray-50">
            <span className="text-xxs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Font family: Homemade Apple</span>
            <span className="font-semibold text-gray-800 text-sm block">Doctor Scrawl (Informal)</span>
            <span className="block text-2xl font-serif mt-3 text-indigo-800 font-bold" style={{ fontFamily: "Homemade Apple" }}>
              The quick brown fox jumps over the lazy dog.
            </span>
          </div>
          <div className="p-5 border border-gray-150 rounded-xl bg-gray-50">
            <span className="text-xxs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Font family: Patrick Hand</span>
            <span className="font-semibold text-gray-800 text-sm block">Neat Print Block</span>
            <span className="block text-2xl font-serif mt-3 text-indigo-800 font-bold" style={{ fontFamily: "Patrick Hand" }}>
              The quick brown fox jumps over the lazy dog.
            </span>
          </div>
          <div className="p-5 border border-gray-150 rounded-xl bg-gray-50">
            <span className="text-xxs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Font family: Dancing Script</span>
            <span className="font-semibold text-gray-800 text-sm block">Left-Handed Slant (Script)</span>
            <span className="block text-2xl font-serif mt-3 text-indigo-800 font-bold" style={{ fontFamily: "Dancing Script" }}>
              The quick brown fox jumps over the lazy dog.
            </span>
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
}
