const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: 'export', // Añadido para GitHub Pages
  trailingSlash: true, // Añadido para GitHub Pages
  basePath: '/MisRetosDiarios', // Añadido para GitHub Pages
  assetPrefix: '/MisRetosDiarios/', // Añadido para GitHub Pages
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true }, // Ya lo tenías, perfecto para GitHub Pages
};
module.exports = nextConfig;
