import { getDishes } from "@/lib/db";

export default async function sitemap() {
  const baseUrl = "https://addiseats.et";
  const dishes = await getDishes();

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/menu`, lastModified: new Date(), priority: 0.9 },
    ...dishes.map((d) => ({
      url: `${baseUrl}/menu/${d.id}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}