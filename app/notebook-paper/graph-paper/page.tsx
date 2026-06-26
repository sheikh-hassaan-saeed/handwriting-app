import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import NotebookPaperGenerator from "@/components/NotebookPaperGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/notebook-paper/graph-paper";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function GraphPaperPage() {
  const article = `
### Accurate Math Grids
Align algebra formulas, engineering diagrams, blueprints, or pixel designs with custom-sized graph grids. Export templates in standard Letter or A4 sizes.
  `;

  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <NotebookPaperGenerator defaultPreset="graph" />
    </PlatformLayout>
  );
}
