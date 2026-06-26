import React from "react";
import { SEOPageConfig, BLOG_ARTICLES } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

interface SEOComponentProps {
  path: string;
  config: SEOPageConfig;
  blogSlug?: string;
}

export default function SEOComponent({ path, config, blogSlug }: SEOComponentProps) {
  // 1. Breadcrumb Schema
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...config.breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: crumb.name,
        item: `${SITE_URL}${crumb.href}`,
      })),
    ],
  };

  // 2. FAQ Schema
  const faqSchema = config.faqs && config.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  } : null;

  // 3. Software Application Schema (for tools)
  const softwareSchema = config.softwareSchema ? {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: config.softwareSchema.name,
    url: `${SITE_URL}${path}`,
    description: config.softwareSchema.description,
    applicationCategory: config.softwareSchema.category,
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  } : null;

  // 4. Article Schema (for blog articles)
  let articleSchema = null;
  if (blogSlug && BLOG_ARTICLES[blogSlug]) {
    const article = BLOG_ARTICLES[blogSlug];
    articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.h1,
      description: article.description,
      datePublished: article.lastUpdated,
      dateModified: article.lastUpdated,
      author: {
        "@type": "Person",
        name: config.author.name,
        jobTitle: config.author.role,
        sameAs: config.author.sameAs || [],
      },
      publisher: {
        "@type": "Organization",
        name: "HandwritingMaker",
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/favicon.webp`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/${blogSlug}`,
      },
    };
  }

  // 5. Global Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HandwritingMaker",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.webp`,
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {softwareSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      )}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
