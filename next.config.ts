import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      // Notion gallery images
      {
        protocol: "https",
        hostname: "notion.so",
      },
      // Notion Unsplash images
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Notion file uploads
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
      // Github avatars
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  redirects: () => [
    {
      source: "/linkedin",
      destination: "https://linkedin.com/in/pham-nhan",
      permanent: true,
    },
    {
      source: "/twitter",
      destination: "https://twitter.com/nitestack",
      permanent: true,
    },
    {
      source: "/github",
      destination: "https://github.com/Nitestack",
      permanent: true,
    },
    {
      source: "/gitlab",
      destination: "https://gitlab.com/Nitestack",
      permanent: true,
    },
    {
      source: "/discord",
      destination: "https://discordapp.com/users/1082266135627579412",
      permanent: true,
    },
  ],
};

export default withNextIntl(nextConfig);
