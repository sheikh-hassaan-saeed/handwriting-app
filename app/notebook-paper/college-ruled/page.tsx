import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import NotebookPaperGenerator from "@/components/NotebookPaperGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/notebook-paper/college-ruled";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function CollegeRuledNotebookPaperPage() {
  const article = `
### Space-Saving Notes Format
College ruled lined sheets decrease the gap between rows to 7.1mm, allowing you to fit 20% more lines per page compared to wide ruled layouts.
  `;

  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <NotebookPaperGenerator defaultPreset="college-ruled" />
    </PlatformLayout>
  );
}
