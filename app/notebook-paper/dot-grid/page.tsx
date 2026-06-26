import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import NotebookPaperGenerator from "@/components/NotebookPaperGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/notebook-paper/dot-grid";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function DotGridPage() {
  const article = `
### Minimalist Bullet Journaling
Dot grids provide alignment guides without cluttering your page, giving you maximum creative freedom for journaling, sketches, or listing tasks.
  `;

  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <NotebookPaperGenerator defaultPreset="dot-grid" />
    </PlatformLayout>
  );
}
