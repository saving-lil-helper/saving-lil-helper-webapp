import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
})

export default withPWA({
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_APP_NAME: '儲蓄小幫手',
    NEXT_PUBLIC_APP_URL: 'https://saving-lil-helper-webapp.vercel.app',
  },
})
