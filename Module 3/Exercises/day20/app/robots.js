\export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/checkout", "/orders", "/kitchen", "/api/"],
      },
    ],
    sitemap: "https://addiseats.et/sitemap.xml",
  };
}