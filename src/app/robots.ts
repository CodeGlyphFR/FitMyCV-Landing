import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/mockups/"],
      },
    ],
    sitemap: "https://www.fitmycv.io/sitemap.xml",
  };
}
