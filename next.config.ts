import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com","images.unsplash.com"], // Add your Cloudinary domain here
  },
};

export default nextConfig;
