import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import { SEO_DATA } from "@/lib/seo";

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
      <div className="bg-white rounded-2xl border border-gray-150 p-8 shadow-sm prose prose-gray">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Our Platform Mission</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          HandwritingMaker was established to create a fast, accessible workbook environment for preschool teachers, parents, home-schooled students, and handwriting hobbyists.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          We believe high-quality study templates like Cornell sheets, quad ruled graph papers, and e-signature markers should be open-source and free for all classrooms without needing account registrations or subscriptions.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Every generator operates entirely inside your client browser, ensuring 100% data security. No text strings, custom names, or signature strokes are ever transmitted to any database.
        </p>
      </div>
    </PlatformLayout>
  );
}
