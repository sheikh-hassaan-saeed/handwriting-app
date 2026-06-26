import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import PrintablesLibrary from "@/components/PrintablesLibrary";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/printables";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function PrintablesPage() {
  return (
    <PlatformLayout path={PATH} config={config}>
      <PrintablesLibrary />
    </PlatformLayout>
  );
}
