import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/api/"], // Prevent crawling of internal framework & API payloads to preserve crawling budget
    },
    sitemap: [
      "https://gis.priyanshu.world/sitemap.xml", // Directs Googlebot to our dynamic architecture sitemap
      "https://lab.priyanshu.world/sitemap.xml"  // Explicitly binds the lab domain mapping to the crawler logic
    ],
  };
}
