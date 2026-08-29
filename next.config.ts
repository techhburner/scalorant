import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/scalorant",
  assetPrefix: "/scalorant/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
