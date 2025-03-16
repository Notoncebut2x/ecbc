/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '/east-coast-bike-calendar', // Replace with your repo name
  assetPrefix: '/east-coast-bike-calendar/', // Replace with your repo name
}

module.exports = nextConfig 