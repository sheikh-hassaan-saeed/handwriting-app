import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import CornellNotesGenerator from "@/components/CornellNotesGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/cornell-notes/template";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function CornellTemplatePage() {
  const article = `
### Standard Lined Note template
Download printable Cornell templates immediately in A4 or Letter sizes. Print blank grids to build custom handwriting and lecture worksheets.
  `;

  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <CornellNotesGenerator defaultLayout="lined" />
    </PlatformLayout>
  );
}
