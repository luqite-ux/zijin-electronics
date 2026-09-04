import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { MotionController } from '@/components/motion-controller'
import { siteInfo } from '@/lib/site-data'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.zijinglobal.com'),
  title: 'Zijin Electronics | Precision Appliance Switches & Keycaps',
  description: 'Explore piano-chain, range-hood and direct-key switches, keycaps and connectors from Zijin Electronics for B2B project inquiries.',
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/icon.png?v=zijin-20260904', type: 'image/png' }],
    apple: '/apple-icon.png?v=zijin-20260904'
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MotionController />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_TENANT_ID && (
        <script
          async
          src={`https://admin.globle-trade.com/api/public/analytics.js?tenantId=${encodeURIComponent(process.env.NEXT_PUBLIC_TENANT_ID)}`}
        />
      )}
      </body>
    </html>
  )
}
