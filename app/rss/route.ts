import { BLOG_ARTICLES } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

const staticPosts = [
  {
    slug: "cursive-handwriting-practice-sheets",
    title: "Free Cursive Handwriting Practice Sheets (Printable PDF for All Levels)",
    description: "Download free printable cursive handwriting practice sheets for beginners to advanced. PDF format, all 26 letters, words and sentences included. Print and start today.",
    date: "2026-06-15",
  },
  {
    slug: "how-to-improve-handwriting-as-an-adult",
    title: "How to Improve Handwriting as an Adult (7 Proven Techniques That Actually Work)",
    description: "Struggling with messy handwriting as an adult? Discover 7 proven techniques to improve your handwriting fast  -  with free practice sheets and expert tips. No talent required.",
    date: "2026-06-18",
  },
  {
    slug: "how-to-convert-handwriting-to-a-font",
    title: "How to Convert Your Handwriting into a Font (Free and Paid Methods)",
    description: "Learn how to convert handwriting to a font for free using Calligraphr, FontForge, or MyScriptFont, plus tips for clean scans and installing your font.",
    date: "2026-06-20",
  },
  {
    slug: "best-handwriting-practice-sheets-for-adults",
    title: "Best Handwriting Practice Sheets for Adults (Free Printables)",
    description: "Discover the best free handwriting practice sheets for adults, including cursive and print printables, plus how to use them and track your progress.",
    date: "2026-06-22",
  },
  {
    slug: "how-to-make-cursive-handwriting-practice-sheets",
    title: "How to Make Cursive Handwriting Practice Sheets (Free Generator)",
    description: "Learn how to make cursive handwriting practice sheets by hand or generate them free online, plus a full cursive letter formation guide for beginners.",
    date: "2026-06-24",
  },
  {
    slug: "handwriting-without-tears-alternatives-free",
    title: "Free Handwriting Without Tears Alternatives (Online Tools & Printables)",
    description: "Explore free Handwriting Without Tears alternatives, including online worksheet makers and printables that supplement at-home handwriting practice.",
    date: "2026-06-25",
  },
];

export async function GET() {
  const dynamicPosts = Object.values(BLOG_ARTICLES).map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    date: article.lastUpdated,
  }));

  const allPosts = [...staticPosts, ...dynamicPosts];

  // Sort articles by date descending
  allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const itemsXml = allPosts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HandwritingMaker Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Free handwriting worksheets, printable lining grids, active recall planner sheets, and guides from HandwritingMaker.</description>
    <language>en-us</language>
    <pubDate>${new Date("2026-06-26").toUTCString()}</pubDate>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
