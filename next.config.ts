import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com","images.unsplash.com"], // Add your Cloudinary domain here
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self'; connect-src 'self' https://api.felicitatrips.com https://api.cloudinary.com https://images.unsplash.com https://res.cloudinary.com; img-src 'self' data: blob: https://images.unsplash.com https://res.cloudinary.com https://*.tile.openstreetmap.org; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src 'self' https://www.openstreetmap.org; object-src 'none'; base-uri 'self'; frame-ancestors 'none';",
          },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
