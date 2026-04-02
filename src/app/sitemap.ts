import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/digimedia";

const BASE = "https://tierarzt-telefonbot.de";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/anwendungsfaelle`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/demo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/check`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/so-funktionierts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ratgeber`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/kontakt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/datenschutz-ki-telefonie`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE}/datenschutz`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/impressum`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];

  // Dynamic blog articles
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const { articles } = await getArticles(1, 100);
    blogPages = articles.map((a) => ({
      url: `${BASE}/blog/${a.slug}`,
      lastModified: a.updated_at ? new Date(a.updated_at) : new Date(a.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // Fail silently — static pages are still included
  }

  return [...staticPages, ...blogPages];
}
