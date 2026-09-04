import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { inquiryPath } from '@/lib/routes'
import { productCategories, siteInfo } from '@/lib/site-data'

export function formatFooterCopyright(company: string, year = new Date().getFullYear()) {
  const legalName = company.replace(/[.。]+\s*$/u, '')
  return `© ${year} ${legalName}. All rights reserved.`
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#111] px-5 py-14 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-xl font-black tracking-tight text-white">{siteInfo.brand}</p>
          <p className="mt-4 max-w-md leading-7 text-white/60">{siteInfo.description}</p>
          <Link href={inquiryPath} className="mt-6 inline-flex bg-brand-red px-5 py-3 text-sm font-bold text-white">
            Send Project Requirements
          </Link>
        </div>
        <div>
          <p className="font-bold text-white">Product Categories</p>
          <div className="mt-4 grid gap-3 text-sm text-white/60">
            {productCategories.slice(0, 6).map((item) => (
              <Link key={item.slug} href={`/products/category/${item.slug}`} className="hover:text-brand-blue">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold text-white">Contact</p>
          <div className="mt-4 space-y-4 text-sm leading-6 text-white/60">
            <p className="flex gap-3"><Mail className="mt-1 h-4 w-4 text-brand-blue" />{siteInfo.email}</p>
            <p className="flex gap-3"><Phone className="mt-1 h-4 w-4 text-brand-blue" />{siteInfo.phone}</p>
            <p className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-blue" />{siteInfo.address}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/45">
        {formatFooterCopyright(siteInfo.company)}
      </div>
    </footer>
  )
}
