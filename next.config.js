/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const debug = process.env.NODE_ENV !== "production";
const repository = "https://EngChooN.github.io/aimzero_web";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: !debug ? `/${repository}/` : "",
  trailingSlash: true,
  i18n,
};

module.exports = nextConfig;
