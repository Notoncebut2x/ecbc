/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/ecbc',
  assetPrefix: '/ecbc/',
  trailingSlash: true,
}

module.exports = nextConfig 