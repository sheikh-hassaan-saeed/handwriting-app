import type { Metadata } from "next";
import Link from "next/link";
import PlatformLayout from "@/components/platform/PlatformLayout";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/study-resources";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function StudyResourcesPage() {
  return (
    <PlatformLayout path={PATH} config={config}>
      <div className="bg-white rounded-2xl border border-gray-150 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Active Recall templates</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Utilize scientific learning templates to boost retention.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/cornell-notes" className="p-5 border border-gray-150 hover:border-indigo-200 rounded-xl transition-all bg-gray-50 block">
            <span className="text-lg block mb-1">🧠</span>
            <span className="font-bold text-gray-800 text-sm block">Cornell Active recall Note Sheets</span>
            <span className="text-xs text-gray-400 mt-1 block">Prompts on left, core notes on right.</span>
          </Link>
          <Link href="/printables/study-planner" className="p-5 border border-gray-150 hover:border-indigo-200 rounded-xl transition-all bg-gray-50 block">
            <span className="text-lg block mb-1">🍅</span>
            <span className="font-bold text-gray-800 text-sm block">Pomodoro Focus logs</span>
            <span className="text-xs text-gray-400 mt-1 block">25-minute check intervals for study cycles.</span>
          </Link>
        </div>
      </div>
    </PlatformLayout>
  );
}
