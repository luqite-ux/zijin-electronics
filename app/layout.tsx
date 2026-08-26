import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { siteInfo } from '@/lib/site-data'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zijin Electronics | 0.5mm, 1.0mm & 1.25mm Connectors',
  description: 'Explore 0.5mm and 1.0mm FPC / FFC connectors and 1.25mm wafer connectors from Yueqing Zijin Electronics for B2B project inquiries.',
  icons: {
    icon: [
      { url: '/favicon.ico?v=zijin-technology-20260815', sizes: 'any' },
      { url: '/icon.png?v=zijin-technology-20260815', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=zijin-technology-20260815'
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
