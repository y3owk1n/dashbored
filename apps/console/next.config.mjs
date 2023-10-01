// Importing env files here to validate on build
import "./src/env.mjs";
import "@dashbored/auth/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@dashbored/api", "@dashbored/auth", "@dashbored/db"],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
