import type { MetadataRoute } from "next";

const SITE_URL = "https://koralstudio.online";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
