import type { Metadata } from "next";
import Link from "next/link";
import PlatformLayout from "@/components/platform/PlatformLayout";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/student-resources";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function StudentResourcesPage() {
  return (
    <PlatformLayout path={PATH} config={config}>
      <div className="bg-white rounded-2xl border border-gray-150 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Academic & Study Binders</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Download templates designed to simplify note-taking, coursework lists, and revisions.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/cornell-notes" className="p-5 border border-gray-150 hover:border-indigo-200 rounded-xl transition-all bg-gray-50 block">
            <span className="text-lg block mb-1">📓</span>
            <span className="font-bold text-gray-800 text-sm block">Cornell Notes Worksheets</span>
            <span className="text-xs text-gray-400 mt-1 block">Active recall sheets with cue columns.</span>
          </Link>
          <Link href="/printables/assignment" className="p-5 border border-gray-150 hover:border-indigo-200 rounded-xl transition-all bg-gray-50 block">
            <span className="text-lg block mb-1">📋</span>
            <span className="font-bold text-gray-800 text-sm block">Assignment Planner Tracks</span>
            <span className="text-xs text-gray-400 mt-1 block">Manage classes, due dates, statuses, and grades.</span>
          </Link>
          <Link href="/printables/study-planner" className="p-5 border border-gray-150 hover:border-indigo-200 rounded-xl transition-all bg-gray-50 block">
            <span className="text-lg block mb-1">⏰</span>
            <span className="font-bold text-gray-800 text-sm block">Study Logs & Pomodoros</span>
            <span className="text-xs text-gray-400 mt-1 block">Color circles for focus study sessions.</span>
          </Link>
          <Link href="/notebook-paper/college-ruled" className="p-5 border border-gray-150 hover:border-indigo-200 rounded-xl transition-all bg-gray-50 block">
            <span className="text-lg block mb-1">📝</span>
            <span className="font-bold text-gray-800 text-sm block">College Ruled Ruled Sheets</span>
            <span className="text-xs text-gray-400 mt-1 block">Medium ruled sheets with 7.1mm gaps.</span>
          </Link>
        </div>
      </div>
    </PlatformLayout>
  );
}
