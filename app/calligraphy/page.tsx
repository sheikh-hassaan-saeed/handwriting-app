import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import CalligraphyGenerator from "@/components/CalligraphyGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/calligraphy";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function CalligraphyPage() {
  const article = `
### Calligraphy Slant Grids
Draw classic slant angle overlays (55-degree and 75-degree guidelines) and ascender/descender ratio staves for English Roundhand, Spencerian, and Italic lettering.
  `;

  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <CalligraphyGenerator />
    </PlatformLayout>
  );
}
