export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Exercise 7: Disallow private, session-based, and cart segments from wasting crawl budget
        disallow: ["/cart", "/checkout", "/orders", "/kitchen", "/api/"],
      },
    ],
    sitemap: "https://addiseats.et/sitemap.xml",
  };
}