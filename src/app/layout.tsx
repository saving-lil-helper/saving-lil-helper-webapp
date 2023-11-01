import '@/styles/globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import HeaderMenu from '@/components/layouts/header-menu'
import { Noto_Sans } from 'next/font/google'
import Script from 'next/script'
import Footer from '@/components/layouts/footer'

const fontSetting = Noto_Sans({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME as string

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: `${APP_NAME} | 定期存款計數機 | 活期存款 | 渣打高息馬拉松`,
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicons/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicons/apple-touch-icon.png',
    },
    { rel: 'apple-touch-icon', url: '/favicons/apple-touch-icon.png' },
    { rel: 'shortcut icon', url: '/favicon.ico' },
  ],
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  themeColor: '#FFFFFF',
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  manifest: '/manifest.json',
  keywords: ['定期存款計數機', '活期存款', '渣打馬拉松', '渣打高息馬拉松'],
}

const GA_MEASUREMENT_ID = 'G-KHXXWPHYM5'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='zh-Hant'
      className={fontSetting.className}
      suppressHydrationWarning={true}
    >
      <body
        className={
          'flex min-h-screen flex-col overflow-x-hidden bg-background antialiased'
        }
        suppressHydrationWarning={true}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <HeaderMenu />
          <div className='container flex-1'>{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id='google-analytics'>
        {`
  window.dataLayer = window.dataLayer || [] 
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date()) 
  
  gtag('config', '${GA_MEASUREMENT_ID}')
  `}
      </Script>
    </html>
  )
}
