import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: "2026-06-09",
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: "2026-06-09",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/cursive-handwriting-practice-sheets`,
      lastModified: "2026-06-09",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog/how-to-improve-handwriting-as-an-adult`,
      lastModified: "2026-06-09",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/handwriting-practice-sheets`,
      lastModified: "2026-06-20",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/handwriting-worksheet-maker`,
      lastModified: "2026-06-20",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/animated-handwriting-generator`,
      lastModified: "2026-06-20",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog/how-to-convert-handwriting-to-a-font`,
      lastModified: "2026-06-20",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/best-handwriting-practice-sheets-for-adults`,
      lastModified: "2026-06-20",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/how-to-make-cursive-handwriting-practice-sheets`,
      lastModified: "2026-06-20",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/handwriting-without-tears-alternatives-free`,
      lastModified: "2026-06-20",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
