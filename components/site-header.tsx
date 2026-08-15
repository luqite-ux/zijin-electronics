import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { inquiryPath } from '@/lib/routes'
import { navItems, siteInfo } from '@/lib/site-data'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Zijin Electronics Home">
          <span className="flex h-12 w-24 items-center justify-center sm:h-14 sm:w-28">
            <Image src={siteInfo.logoMark} alt="" width={179} height={101} className="h-auto w-full object-contain" priority />
          </span>
          <span className="whitespace-nowrap text-base font-black tracking-normal text-ink sm:text-lg lg:text-[1.05rem]">{siteInfo.brand}</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-ink lg:flex xl:gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap transition hover:text-brand-blue">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={inquiryPath}
            className="hidden min-h-11 items-center whitespace-nowrap rounded-full bg-brand-red px-5 text-sm font-bold text-white transition hover:bg-[#c90010] xl:inline-flex"
          >
            Send Inquiry
          </Link>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink lg:hidden" aria-label="Open navigation">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
