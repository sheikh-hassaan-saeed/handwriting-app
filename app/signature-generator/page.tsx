import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import SignatureGenerator from "@/components/SignatureGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/signature-generator";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function SignaturePage() {
  const article = `
### E-Signatures and Vector Formats
Type names to generate elegant signatures. Export as transparent PNG files to add signatures cleanly over lines on digital PDFs. Get vector SVG strings for high-fidelity scalability.
  `;

  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <SignatureGenerator />
    </PlatformLayout>
  );
}
