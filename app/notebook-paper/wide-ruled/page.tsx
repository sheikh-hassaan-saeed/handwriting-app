import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import NotebookPaperGenerator from "@/components/NotebookPaperGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/notebook-paper/wide-ruled";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function WideRuledNotebookPaperPage() {
  const article = `
### Classroom Printables
Wide ruled notebooks are optimized for toddlers and kids learning to form basic letters. Adjust red border offsets to customize margins.
  `;

  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <NotebookPaperGenerator defaultPreset="wide-ruled" />
    </PlatformLayout>
  );
}
