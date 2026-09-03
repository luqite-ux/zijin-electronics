import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { siteInfo } from '@/lib/site-data'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.zijinglobal.com'),
  title: 'Zijin Electronics | Piano Chain Switches, Keycaps & Direct Key Switches',
  description: 'Explore piano chain switches, keycaps, and direct key switches from Yueqing Zijin Electronics for B2B project inquiries.',
  alternates: { canonical: '/' },
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
