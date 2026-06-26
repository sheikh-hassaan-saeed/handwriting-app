import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import LetterTracingGenerator from "@/components/LetterTracingGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/letter-tracing";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function LetterTracingPage() {
  const article = `
### Kindergarten spelling worksheets
Trace lines to teach pencil control. Customize tracing text casing, guidelines, direction start points, and phonics illustrations.
  `;

  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <LetterTracingGenerator />
    </PlatformLayout>
  );
}
