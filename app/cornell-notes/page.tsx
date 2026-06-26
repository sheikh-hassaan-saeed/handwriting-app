import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import CornellNotesGenerator from "@/components/CornellNotesGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/cornell-notes";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function CornellNotesPage() {
  const article = `
### Active Recall Layout
Structure study binders with custom Cornell notes. The left column holds questions, the right details notes, and the footer integrates a page summary.
  `;

  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <CornellNotesGenerator />
    </PlatformLayout>
  );
}
