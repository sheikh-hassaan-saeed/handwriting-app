import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Text to Handwriting Converter — Free Online Tool | HandwritingMaker",
  description:
    "Convert any text to realistic handwriting instantly. Free online text to handwriting converter with 5 font styles, notebook paper backgrounds, and PNG/PDF download. No signup required.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.webp",
  },
  verification: {
    google: "F7psUfwczyymfXOo2br90P0zEy--c59xe8Z6lW6wHBM",
  },
  openGraph: {
    title: "Text to Handwriting Converter — Free Online Tool | HandwritingMaker",
    description:
      "Convert any text to realistic handwriting instantly. Free online text to handwriting converter with 5 font styles, notebook paper backgrounds, and PNG/PDF download. No signup required.",
    url: SITE_URL,
    siteName: "HandwritingMaker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HandwritingMaker — Free Text to Handwriting Converter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text to Handwriting Converter — Free Online Tool | HandwritingMaker",
    description:
      "Convert any text to realistic handwriting instantly. 5 font styles, multiple paper backgrounds. Free & no signup.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HandwritingMaker",
  url: SITE_URL,
  description:
    "Free online text to handwriting converter. Convert any text into realistic handwriting with multiple font styles, paper backgrounds, and download as PNG or PDF.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  browserRequirements: "Requires JavaScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Load Google Fonts directly so canvas can reference them by original name */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Homemade+Apple&family=Patrick+Hand&family=Dancing+Script:wght@400;700&family=Architects+Daughter&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
