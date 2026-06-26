import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import LetterTracingGenerator from "@/components/LetterTracingGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/letter-tracing/custom-name";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function CustomNameTracingPage() {
  const article = `
### Personalized Preschool Worksheets
Enter a child's name to generate personalized trace guidelines. Teach alphabetical shapes, print styles, or joined cursive formations.
  `;

  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <LetterTracingGenerator defaultName="Emma" />
    </PlatformLayout>
  );
}
