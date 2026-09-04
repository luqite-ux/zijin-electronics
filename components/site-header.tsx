'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { inquiryPath } from '@/lib/routes'
import { navItems, siteInfo } from '@/lib/site-data'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111]/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Zijin Electronics Home" onClick={() => setOpen(false)}>
          <span className="flex h-14 w-24 items-center justify-center bg-white px-2"><Image src={siteInfo.logo} alt="ZHIJIN" width={195} height={99} className="h-full w-full object-contain" priority /></span>
          <span className="whitespace-nowrap text-base font-black text-white sm:text-lg">{siteInfo.brand}</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-white/75 lg:flex">
          {navItems.map((item) => <Link key={item.href} href={item.href} className="whitespace-nowrap transition hover:text-white">{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-3">
          <Link href={inquiryPath} className="hidden min-h-11 items-center whitespace-nowrap bg-brand-red px-5 text-sm font-bold text-white transition hover:bg-[#ef3138] xl:inline-flex">Send Inquiry</Link>
          <button onClick={() => setOpen((value) => !value)} className="inline-flex h-11 w-11 items-center justify-center border border-white/30 text-white lg:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {open ? <nav className="border-t border-white/10 bg-[#111] px-5 py-5 lg:hidden">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-white/10 py-3 text-sm font-semibold text-white/80">{item.label}</Link>)}<Link href={inquiryPath} onClick={() => setOpen(false)} className="mt-5 flex min-h-11 items-center justify-center bg-brand-red px-5 text-sm font-bold text-white">Send Inquiry</Link></nav> : null}
    </header>
  )
}
