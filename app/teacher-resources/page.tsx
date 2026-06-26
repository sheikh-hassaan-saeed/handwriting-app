import type { Metadata } from "next";
import Link from "next/link";
import PlatformLayout from "@/components/platform/PlatformLayout";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/teacher-resources";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function TeacherResourcesPage() {
  return (
    <PlatformLayout path={PATH} config={config}>
      <div className="bg-white rounded-2xl border border-gray-150 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Classroom Materials Directory</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Access specialized generators configured for elementary, preschool, or secondary education. Choose a tool below to load preset guides.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/letter-tracing" className="p-5 border border-gray-150 hover:border-indigo-200 rounded-xl transition-all bg-gray-50 block">
            <span className="text-lg block mb-1">✏️</span>
            <span className="font-bold text-gray-800 text-sm block">Alphabet Letter Tracing</span>
            <span className="text-xs text-gray-400 mt-1 block">Customize name outlines and picture phonics.</span>
          </Link>
          <Link href="/notebook-paper/primary-writing" className="p-5 border border-gray-150 hover:border-indigo-200 rounded-xl transition-all bg-gray-50 block">
            <span className="text-lg block mb-1">👧</span>
            <span className="font-bold text-gray-800 text-sm block">Primary Guidelines Paper</span>
            <span className="text-xs text-gray-400 mt-1 block">Three-line boundary rules for early writing classes.</span>
          </Link>
          <Link href="/printables/reading-log" className="p-5 border border-gray-150 hover:border-indigo-200 rounded-xl transition-all bg-gray-50 block">
            <span className="text-lg block mb-1">📚</span>
            <span className="font-bold text-gray-800 text-sm block">Student Reading Logs</span>
            <span className="text-xs text-gray-400 mt-1 block">Assign book checklists and five-star rating sheets.</span>
          </Link>
          <Link href="/notebook-paper/kindergarten" className="p-5 border border-gray-150 hover:border-indigo-200 rounded-xl transition-all bg-gray-50 block">
            <span className="text-lg block mb-1">🏫</span>
            <span className="font-bold text-gray-800 text-sm block">Kindergarten Spacing Sheets</span>
            <span className="text-xs text-gray-400 mt-1 block">Extra large (64px) horizontal lines for toddlers.</span>
          </Link>
        </div>
      </div>
    </PlatformLayout>
  );
}
