import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import HeaderMenu from '@/components/layouts/header-menu'
import { Noto_Sans } from 'next/font/google'
import Script from 'next/script'
import Footer from '@/components/layouts/footer'
import NextProgressBarProvider from '@/components/layouts/next-progress-bar-provider'

const fontSetting = Noto_Sans({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME as string
const APP_DEFAULT_TITLE = process.env.NEXT_PUBLIC_APP_NAME as string
const APP_TITLE_TEMPLATE = `%s | ${APP_NAME}`
const APP_DESCRIPTION = `${APP_NAME} | 定期存款計數機 | 活期存款 | 渣打高息馬拉松`

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: 'hsl(222.2, 84%, 4.9%)' },
    { media: '(prefers-color-scheme: light)', color: 'hsl(0, 0%, 100%)' },
  ],
  colorScheme: 'light dark',
}

export const metadata: Metadata = {
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
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
    title: APP_DEFAULT_TITLE,
    statusBarStyle: 'default',
  },
  manifest: '/manifest.json',
  keywords: ['定期存款計數機', '活期存款', '渣打馬拉松', '渣打高息馬拉松'],
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
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
          <NextProgressBarProvider>
            <HeaderMenu />
            <div className='container flex-1'>{children}</div>
            <Footer />
          </NextProgressBarProvider>
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
