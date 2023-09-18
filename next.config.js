/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_APP_NAME: '儲蓄小幫手',
  },
}

module.exports = nextConfig
