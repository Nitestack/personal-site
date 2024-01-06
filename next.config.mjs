import withNextIntl from "next-intl/plugin";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  ],
};

export default withNextIntl()(nextConfig);
