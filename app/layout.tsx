import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { siteInfo } from '@/lib/site-data'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zijin Electronics | Switch, Key Cap & Connector Manufacturer',
  description: 'Yueqing Zijin Electronics manufactures custom switches, key caps, and connector components for appliance, audio-visual, medical equipment, and precision instrument projects.',
  icons: {
    icon: '/icon.png'
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
