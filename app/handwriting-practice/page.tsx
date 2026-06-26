import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import PracticeSheetGenerator from "@/components/PracticeSheetGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/handwriting-practice";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function HandwritingPracticePage() {
  const article = `
### Custom Paragraph Spelling Drills
Print custom guidelines worksheets for spelling, penmanship, vocabulary, quotes, or occupational muscle coordinates.
  `;

  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <PracticeSheetGenerator />
    </PlatformLayout>
  );
}
