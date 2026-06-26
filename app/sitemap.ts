import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { SEO_DATA, BLOG_ARTICLES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Legacy tools still active on the website
  const legacyTools = [
    "/tools/handwriting-practice-sheets",
    "/tools/handwriting-worksheet-maker",
    "/tools/animated-handwriting-generator",
  ];

  // Hardcoded static blog posts in app/blog/
  const staticBlogPosts = [
    "/blog/cursive-handwriting-practice-sheets",
    "/blog/how-to-improve-handwriting-as-an-adult",
    "/blog/how-to-convert-handwriting-to-a-font",
    "/blog/best-handwriting-practice-sheets-for-adults",
    "/blog/how-to-make-cursive-handwriting-practice-sheets",
    "/blog/handwriting-without-tears-alternatives-free",
  ];

  // 1. Gather all configuration pages from SEO_DATA
  const configPages = Object.keys(SEO_DATA).map((path) => {
    const config = SEO_DATA[path];
    const isRoot = path === "/";
    return {
      url: isRoot ? SITE_URL : `${SITE_URL}${path}`,
      lastModified: config.lastUpdated || "2026-06-26",
      changeFrequency: isRoot ? ("weekly" as const) : ("monthly" as const),
      priority: isRoot ? 1.0 : 0.8,
    };
  });

  // 2. Gather legacy tools
  const toolsPages = legacyTools.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: "2026-06-20",
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // 3. Gather static blog posts
  const staticBlogPages = staticBlogPosts.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: "2026-06-25",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // 4. Gather dynamic database articles
  const dynamicBlogPages = Object.keys(BLOG_ARTICLES).map((slug) => {
    const article = BLOG_ARTICLES[slug];
    return {
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: article.lastUpdated || "2026-06-26",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };
  });

  // Use Map to deduplicate entries by URL
  const uniqueEntriesMap = new Map<string, { url: string; lastModified: string; changeFrequency: "weekly" | "monthly"; priority: number }>();

  [...configPages, ...toolsPages, ...staticBlogPages, ...dynamicBlogPages].forEach((entry) => {
    uniqueEntriesMap.set(entry.url, entry);
  });

  return Array.from(uniqueEntriesMap.values());
}
