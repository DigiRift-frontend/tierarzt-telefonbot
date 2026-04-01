import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/check/ergebnis", "/ratgeber/download", "/ebook/"],
    },
    sitemap: "https://tierarzt-telefonbot.de/sitemap.xml",
  };
}
