import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import NotebookPaperGenerator from "@/components/NotebookPaperGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/notebook-paper/kindergarten";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function KindergartenPage() {
  const article = `
### Extra-Wide Rules for Preschoolers
Nursery kids need large spacing guidelines (64px) to draw uppercase and lowercase letters. Customize margin offsets and color grids.
  `;

  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <NotebookPaperGenerator defaultPreset="kindergarten" />
    </PlatformLayout>
  );
}
