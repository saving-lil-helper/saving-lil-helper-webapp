import '@/styles/globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import HeaderMenu from '@/components/layouts/header-menu'
export const metadata: Metadata = {
  title: 'Saving Lil-Helper',
  description: 'A web app to help you save money',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='zh-Hant' suppressHydrationWarning={true}>
      <body
        className={'min-h-screen bg-background font-sans antialiased'}
        suppressHydrationWarning={true}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <HeaderMenu></HeaderMenu>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
