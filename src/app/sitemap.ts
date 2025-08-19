import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.fantaprof.com";

    return [
        { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "yearly", priority: 1.0 },
        { url: `${baseUrl}/rules/starting-game`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
        { url: `${baseUrl}/rules/team-creation`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
        { url: `${baseUrl}/rules/bonus-malus`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
        { url: `${baseUrl}/rules/personalization`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
        { url: `${baseUrl}/rules/site-explanation`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    ]
}
