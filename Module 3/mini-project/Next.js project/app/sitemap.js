import { getDishes } from "@/lib/db";

export default async function sitemap() {
  const baseUrl = "https://addiseats.et";
  const dishes = await getDishes();

  const dishUrls = dishes.map((dish) => ({
    url: `${baseUrl}/menu/${dish.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...dishUrls,
    // Private and session routes (/cart, /checkout, /orders, /kitchen) are intentionally excluded
  ];
}