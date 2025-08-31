import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/rules/starting-game`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.64,
    },
    {
      url: `${baseUrl}/rules/team-creation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.64,
    },
    {
      url: `${baseUrl}/rules/bonus-malus`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.64,
    },
    {
      url: `${baseUrl}/rules/personalization`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.64,
    },
    {
      url: `${baseUrl}/rules/site-explanation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.64,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auth/signin`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
