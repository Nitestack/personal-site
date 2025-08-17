import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
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
  redirects: async () => [
    {
      source: "/linkedin",
      destination: "https://www.linkedin.com/in/nhan-pham-6702922b3",
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
      source: "/discord",
      destination: "https://discordapp.com/users/1082266135627579412",
      permanent: true,
    },
  ],
};

export default withNextIntl(nextConfig);
