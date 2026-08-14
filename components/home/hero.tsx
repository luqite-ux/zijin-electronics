import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { InquiryCta } from '@/components/inquiry-cta'
import { featuredProducts, stats } from '@/lib/site-data'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative mx-auto min-h-[680px] max-w-[1680px] overflow-hidden rounded-[2rem] border border-line bg-brand-ice shadow-glow sm:min-h-[760px] lg:min-h-[780px]">
        <img
          src="/images/hero-banner.png"
          alt="Zijin Electronics switch and connector products on an intelligent manufacturing banner"
          className="absolute inset-0 h-full w-full object-cover object-[58%_center] sm:object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.94)_38%,rgba(255,255,255,0.58)_66%,rgba(255,255,255,0.16)_100%)] sm:bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.94)_26%,rgba(255,255,255,0.62)_46%,rgba(255,255,255,0.08)_72%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white/95 via-white/55 to-transparent" />

        <img
          src="/images/hero-product.jpg"
          alt="KDC-A08-5-4P-3PCB range hood switch product"
          className="pointer-events-none absolute bottom-24 right-1 z-10 w-48 drop-shadow-2xl sm:hidden"
        />

        <div className="relative z-10 flex min-h-[680px] flex-col justify-between px-6 py-8 sm:min-h-[760px] sm:px-10 lg:min-h-[780px] lg:px-16 lg:py-14">
          <div className="max-w-3xl pt-5 sm:pt-12 lg:pt-16">
            <p className="inline-flex rounded-full border border-brand-blue/20 bg-white/90 px-4 py-2 text-sm font-bold text-brand-blue shadow-sm backdrop-blur">
              OEM / ODM Switch & Connector Manufacturer Since 2007
            </p>
            <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-tight text-ink sm:text-6xl lg:text-7xl">
              Precision Switch Solutions for Global Appliance Production
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
              Yueqing Zijin Electronics manufactures range hood switches, direct key switches, key caps, and connector components for appliance, audio-visual, medical equipment, and precision instrument projects.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <InquiryCta label="Send Project Inquiry" />
              <Link href="/products/category/range-hood-switches" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-brand-blue/25 bg-white px-6 text-sm font-bold text-ink shadow-sm transition hover:border-brand-blue hover:text-brand-blue">
                View Range Hood Switches
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-3 rounded-3xl border border-white/70 bg-white p-3 shadow-glow sm:bg-white/86 sm:p-4 sm:backdrop-blur md:grid-cols-[1.2fr_2fr] md:items-center">
            <div className="flex items-center gap-3 px-1">
              <Sparkles className="h-6 w-6 shrink-0 text-brand-blue" />
              <p className="text-sm font-bold text-ink">Featured series: {featuredProducts.slice(0, 3).map((item) => item.model).join(' / ')}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {stats.slice(0, 6).map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-line bg-white p-4 sm:bg-white/88">
                  <p className="text-xl font-black text-ink">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
