import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SEO optimizations
  trailingSlash: false,

  // Enable static generation for better performance
  output: "export",

  // Image optimization
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
