import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import ContactForm from "@/components/ContactForm";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/contact";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: PATH },
};

export default function ContactPage() {
  return (
    <PlatformLayout path={PATH} config={config}>
      <ContactForm />
    </PlatformLayout>
  );
}
