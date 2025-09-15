import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "img.lemde.fr",
      },
      {
        hostname: "s2-g1.glbimg.com",
      },
    ],
  },
};

export default nextConfig;
