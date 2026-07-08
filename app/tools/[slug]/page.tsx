import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SEO_DATA } from "@/lib/seo";
import WorksheetPageClient from "@/components/generators/WorksheetPageClient";

interface PageProps {
  params: {
    slug: string;
  };
}

const VALID_SLUGS = [
  "handwriting-worksheet-creator",
  "handwriting-practice-generator",
  "custom-handwriting-worksheets",
  "printable-handwriting-worksheets",
  "tracing-worksheet-generator",
  "name-tracing-generator",
  "sentence-tracing-generator",
  "cursive-worksheet-generator",
  "alphabet-tracing-generator",
  "blank-handwriting-paper",
  "handwriting-paper-generator",
  "handwriting-worksheets-grade-1",
  "handwriting-worksheets-grade-2",
  "handwriting-worksheets-kindergarten",
  "cursive-practice-sheets",
  "alphabet-tracing-worksheets",
  "sentence-tracing-worksheets",
  "name-tracing-worksheets",
];

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const path = `/tools/${params.slug}`;
  const config = SEO_DATA[path];

  if (!config) {
    return {};
  }

  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: `https://www.handwritingmaker.com${path}`,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: `https://www.handwritingmaker.com${path}`,
      siteName: "HandwritingMaker",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
    },
  };
}

// Resolver for specific workspace preset configurations
function getPresetForSlug(slug: string) {
  switch (slug) {
    case "handwriting-worksheet-creator":
      return {
        input: "apple banana cherry orange grape",
        layout: "single" as const,
        letterStyle: "dottedTrace" as const,
        fontStyle: "print" as const,
        guideline: "dotted" as const,
        repetitions: 3 as const,
        lineSpacing: 75,
        fontSizeRatio: 45,
      };
    case "handwriting-practice-generator":
      return {
        input: "Practice makes perfect.",
        layout: "sentence" as const,
        letterStyle: "dottedTrace" as const,
        fontStyle: "print" as const,
        guideline: "dotted" as const,
        repetitions: 2 as const,
        lineSpacing: 80,
        fontSizeRatio: 45,
      };
    case "custom-handwriting-worksheets":
      return {
        input: "Custom worksheets are fun.",
        layout: "sentence" as const,
        letterStyle: "solid" as const,
        fontStyle: "print" as const,
        guideline: "dotted" as const,
        repetitions: 2 as const,
        lineSpacing: 75,
        fontSizeRatio: 45,
      };
    case "printable-handwriting-worksheets":
      return {
        input: "Free printable writing sheet.",
        layout: "sentence" as const,
        letterStyle: "solid" as const,
        fontStyle: "print" as const,
        guideline: "dotted" as const,
        repetitions: 2 as const,
        lineSpacing: 75,
        fontSizeRatio: 45,
      };
    case "tracing-worksheet-generator":
      return {
        input: "Trace these dotted words",
        layout: "sentence" as const,
        letterStyle: "dottedTrace" as const,
        fontStyle: "print" as const,
        guideline: "dotted" as const,
        repetitions: 3 as const,
        lineSpacing: 75,
        fontSizeRatio: 45,
      };
    case "name-tracing-generator":
      return {
        input: "Alexander",
        layout: "single" as const,
        letterStyle: "dottedTrace" as const,
        fontStyle: "print" as const,
        guideline: "dotted" as const,
        repetitions: 3 as const,
        lineSpacing: 75,
        fontSizeRatio: 45,
      };
    case "sentence-tracing-generator":
      return {
        input: "Practice tracing full sentences.",
        layout: "sentence" as const,
        letterStyle: "dottedTrace" as const,
        fontStyle: "print" as const,
        guideline: "dotted" as const,
        repetitions: 2 as const,
        lineSpacing: 80,
        fontSizeRatio: 45,
      };
    case "cursive-worksheet-generator":
      return {
        input: "Dancing script cursive joins.",
        layout: "sentence" as const,
        letterStyle: "dottedTrace" as const,
        fontStyle: "cursive" as const,
        guideline: "dotted" as const,
        repetitions: 2 as const,
        lineSpacing: 80,
        fontSizeRatio: 45,
      };
    case "alphabet-tracing-generator":
      return {
        input: "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz",
        layout: "single" as const,
        letterStyle: "dottedTrace" as const,
        fontStyle: "print" as const,
        guideline: "dotted" as const,
        repetitions: 1 as const,
        lineSpacing: 70,
        fontSizeRatio: 45,
      };
    case "blank-handwriting-paper":
      return {
        input: "",
        layout: "free" as const,
        letterStyle: "solid" as const,
        fontStyle: "print" as const,
        guideline: "dotted" as const,
        repetitions: 1 as const,
        lineSpacing: 75,
        fontSizeRatio: 45,
      };
    case "handwriting-paper-generator":
      return {
        input: "",
        layout: "free" as const,
        letterStyle: "solid" as const,
        fontStyle: "print" as const,
        guideline: "solid" as const,
        repetitions: 1 as const,
        lineSpacing: 75,
        fontSizeRatio: 45,
      };
    case "handwriting-worksheets-grade-1":
      return {
        input: "First grade writers practice pencil controls daily.",
        layout: "sentence" as const,
        letterStyle: "dottedTrace" as const,
        fontStyle: "print" as const,
        guideline: "dotted" as const,
        repetitions: 2 as const,
        lineSpacing: 70,
        fontSizeRatio: 45,
      };
    case "handwriting-worksheets-grade-2":
      return {
        input: "Second grade writing focuses on letter heights.",
        layout: "sentence" as const,
        letterStyle: "dottedTrace" as const,
        fontStyle: "print" as const,
        guideline: "dotted" as const,
        repetitions: 2 as const,
        lineSpacing: 60,
        fontSizeRatio: 45,
      };
    case "handwriting-worksheets-kindergarten":
      return {
        input: "kindergarten",
        layout: "single" as const,
        letterStyle: "dottedTrace" as const,
        fontStyle: "print" as const,
        guideline: "dotted" as const,
        repetitions: 3 as const,
        lineSpacing: 80,
        fontSizeRatio: 45,
      };
    case "cursive-practice-sheets":
      return {
        input: "Cursive writing practice connects letters.",
        layout: "sentence" as const,
        letterStyle: "dottedTrace" as const,
        fontStyle: "cursive" as const,
        guideline: "dotted" as const,
        repetitions: 2 as const,
        lineSpacing: 80,
        fontSizeRatio: 45,
      };
    case "alphabet-tracing-worksheets":
      return {
        input: "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz",
        layout: "single" as const,
        letterStyle: "dottedTrace" as const,
        fontStyle: "print" as const,
        guideline: "dotted" as const,
        repetitions: 1 as const,
        lineSpacing: 70,
        fontSizeRatio: 45,
      };
    case "sentence-tracing-worksheets":
      return {
        input: "Trace these sample sentences carefully.",
        layout: "sentence" as const,
        letterStyle: "dottedTrace" as const,
        fontStyle: "print" as const,
        guideline: "dotted" as const,
        repetitions: 2 as const,
        lineSpacing: 75,
        fontSizeRatio: 45,
      };
    case "name-tracing-worksheets":
      return {
        input: "Alexander",
        layout: "single" as const,
        letterStyle: "dottedTrace" as const,
        fontStyle: "print" as const,
        guideline: "dotted" as const,
        repetitions: 3 as const,
        lineSpacing: 75,
        fontSizeRatio: 45,
      };
    default:
      return undefined;
  }
}

export default function ToolLandingPage({ params }: PageProps) {
  const path = `/tools/${params.slug}`;
  const config = SEO_DATA[path];

  if (!config) {
    notFound();
  }

  const preset = getPresetForSlug(params.slug);

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": config.h1,
    "url": `https://www.handwritingmaker.com${path}`,
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.handwritingmaker.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://www.handwritingmaker.com",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": config.h1,
        "item": `https://www.handwritingmaker.com${path}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <WorksheetPageClient config={config} initialPreset={preset} />
    </>
  );
}
