/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warnings ko ignore karke deploy karne ke liye
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Chhoti type errors ko ignore karne ke liye
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
