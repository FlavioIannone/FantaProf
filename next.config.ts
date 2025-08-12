import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(process.env.IMAGES_GOOGLE_DOMAIN!)],
  },
};

export default nextConfig;
