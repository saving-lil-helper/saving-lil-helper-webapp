import '@/styles/globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
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
      <body className={'h-screen w-screen'} suppressHydrationWarning={true}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
