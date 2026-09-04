'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { InquiryCta } from '@/components/inquiry-cta'

const slides = [
  { image: '/images/hero-priority-products-v2.png', eyebrow: 'Switches engineered for appliance control', title: 'Precision in every press.', text: 'Piano-chain switches, keycaps and direct-key switches for model-based OEM and ODM programs.' },
  { image: '/images/hero-range-hood-v2.png', eyebrow: 'High-volume range-hood switch series', title: 'Built for the rhythm of production.', text: 'Explore KDC range-hood switch models backed by custom production and sample support.' },
  { image: '/images/hero-direct-key-v2.png', eyebrow: 'Direct-key switch portfolio', title: 'Compact parts. Exact response.', text: 'Select verified direct-key switch models for household appliance and precision equipment projects.' }
]

export function Hero() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 7000)
    return () => window.clearInterval(timer)
  }, [])
  const show = (index: number) => setActive((index + slides.length) % slides.length)
  const slide = slides[active]
  return (
    <section className="relative min-h-[calc(100dvh-5rem)] overflow-hidden bg-[#111] text-white">
      {slides.map((item, index) => <Image key={item.image} src={item.image} alt="" fill priority={index === 0} sizes="100vw" className={`object-cover object-center transition-opacity duration-700 ${index === active ? 'opacity-100' : 'opacity-0'}`} />)}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,.94)_0%,rgba(8,8,8,.78)_34%,rgba(8,8,8,.18)_65%,rgba(8,8,8,.12)_100%)]" />
      <div className="relative mx-auto flex min-h-[calc(100dvh-5rem)] max-w-7xl items-center px-5 py-16 sm:px-8 lg:py-20">
        <div key={active} className="hero-panel max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff5960]">{slide.eyebrow}</p>
          <h1 className="mt-6 max-w-[12ch] text-5xl font-black leading-[.94] tracking-[-0.055em] sm:text-7xl lg:text-[5.5rem]">{slide.title}</h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/72 sm:text-lg">{slide.text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <InquiryCta label="Send Project Inquiry" />
            <Link href="/products" className="inline-flex min-h-12 items-center gap-3 border border-white/35 bg-white/10 px-6 text-sm font-bold text-white transition hover:bg-white hover:text-ink">Explore Products <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 right-5 flex items-center gap-2 sm:right-8 lg:right-[max(2rem,calc((100vw-80rem)/2))]">
        <button onClick={() => show(active - 1)} className="flex h-11 w-11 items-center justify-center border border-white/35 bg-black/25 text-white backdrop-blur transition hover:bg-white hover:text-ink" aria-label="Previous banner"><ChevronLeft className="h-5 w-5" /></button>
        <span className="px-3 text-xs font-black tabular-nums text-white/75">0{active + 1} / 0{slides.length}</span>
        <button onClick={() => show(active + 1)} className="flex h-11 w-11 items-center justify-center border border-white/35 bg-black/25 text-white backdrop-blur transition hover:bg-white hover:text-ink" aria-label="Next banner"><ChevronRight className="h-5 w-5" /></button>
      </div>
    </section>
  )
}
