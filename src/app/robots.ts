import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/api/"], // Prevent crawling of internal framework & API payloads to preserve crawling budget
    },
    sitemap: "https://gis.priyanshu.world/sitemap.xml", // Automatically points Googlebot to our dynamic architecture sitemap
  };
}
