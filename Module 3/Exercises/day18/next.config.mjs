/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Whitelist remote domains for dish CDN optimization
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.addiseats.et",
      },
    ],
  },
  // Security headers & static redirects moved out of middleware to keep edge runtime fast
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;