import type { Metadata } from "next";
import { SEO_DATA } from "@/lib/seo";
import WorksheetPageClient from "@/components/generators/WorksheetPageClient";

const PATH = "/";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: {
    canonical: "https://www.handwritingmaker.com",
  },
  openGraph: {
    title: config.title,
    description: config.description,
    url: "https://www.handwritingmaker.com",
    siteName: "HandwritingMaker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description,
  },
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HandwritingMaker",
    "url": "https://www.handwritingmaker.com",
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HandwritingMaker",
    "url": "https://www.handwritingmaker.com",
    "logo": "https://www.handwritingmaker.com/logo.png",
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "HandwritingMaker Worksheet Generator",
    "url": "https://www.handwritingmaker.com",
    "description": config.description,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": config.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WorksheetPageClient config={config} />
    </>
  );
}
