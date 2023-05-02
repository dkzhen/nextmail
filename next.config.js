/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "80",
        pathname: "/random/?nature",
      },
    ],
  },
  env: {
    URL: process.env.URL,
  },
};

module.exports = nextConfig;
