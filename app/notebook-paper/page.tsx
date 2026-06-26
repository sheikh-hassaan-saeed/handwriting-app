import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import NotebookPaperGenerator from "@/components/NotebookPaperGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/notebook-paper";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${config.breadcrumbs[0]?.href || ""}` },
};

export default function NotebookPaperPage() {
  return (
    <PlatformLayout path={PATH} config={config}>
      <NotebookPaperGenerator />
    </PlatformLayout>
  );
}
