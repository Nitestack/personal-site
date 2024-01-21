import withNextIntl from "next-intl/plugin";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Notion gallery images
      {
        protocol: "https",
        hostname: "www.notion.so",
        pathname: "/images/page-cover/**",
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
    ],
  },
  redirects: async () => [
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
      source: "/dotfiles",
      destination: "https://github.com/Nitestack/dotfiles",
      permanent: true,
    },
    {
      source: "/discord",
      destination: "https://discordapp.com/users/1082266135627579412",
      permanent: true,
    },
  ],
};

export default withNextIntl()(nextConfig);
