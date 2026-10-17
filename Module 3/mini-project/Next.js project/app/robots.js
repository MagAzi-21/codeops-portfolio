export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Disallow private utility routes to preserve crawl budget
        disallow: ["/cart", "/checkout", "/orders", "/kitchen", "/api/"],
      },
    ],
    sitemap: "https://addiseats.et/sitemap.xml",
  };
}