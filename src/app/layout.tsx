import '@/styles/globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import HeaderMenu from '@/components/layouts/header-menu'
import { Noto_Sans } from 'next/font/google'

const fontSetting = Noto_Sans({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const appName = process.env.NEXT_PUBLIC_APP_NAME as string

export const metadata: Metadata = {
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: `${appName} | 定期存款計數機 | 活期存款 | 渣打高息馬拉松`,
}

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
        className={'min-h-screen bg-background antialiased'}
        suppressHydrationWarning={true}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <HeaderMenu />
          <div className='container'>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
