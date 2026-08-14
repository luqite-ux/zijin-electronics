import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { inquiryPath } from '@/lib/routes'
import { productCategories, siteInfo } from '@/lib/site-data'

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-xl font-black tracking-tight text-ink">{siteInfo.brand}</p>
          <p className="mt-4 max-w-md leading-7 text-muted">{siteInfo.description}</p>
          <Link href={inquiryPath} className="mt-6 inline-flex rounded-full bg-brand-blue px-5 py-3 text-sm font-bold text-white">
            Send Project Requirements
          </Link>
        </div>
        <div>
          <p className="font-bold text-ink">Product Categories</p>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            {productCategories.slice(0, 6).map((item) => (
              <Link key={item.slug} href={`/products/category/${item.slug}`} className="hover:text-brand-blue">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold text-ink">Contact</p>
          <div className="mt-4 space-y-4 text-sm leading-6 text-muted">
            <p className="flex gap-3"><Mail className="mt-1 h-4 w-4 text-brand-blue" />{siteInfo.email}</p>
            <p className="flex gap-3"><Phone className="mt-1 h-4 w-4 text-brand-blue" />{siteInfo.phone}</p>
            <p className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-blue" />{siteInfo.address}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-line pt-6 text-sm text-muted">
        (c) 2026 {siteInfo.company}. All rights reserved.
      </div>
    </footer>
  )
}
