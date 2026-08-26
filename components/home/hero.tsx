import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { InquiryCta } from '@/components/inquiry-cta'
import { featuredProducts, stats } from '@/lib/site-data'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative mx-auto min-h-[680px] max-w-[1680px] overflow-hidden rounded-[2rem] border border-line bg-[radial-gradient(circle_at_82%_28%,rgba(49,162,232,0.2),transparent_32%),linear-gradient(135deg,#ffffff_0%,#edf8ff_58%,#dff5ef_100%)] shadow-glow sm:min-h-[760px] lg:min-h-[780px]">
        <div className="pointer-events-none absolute -right-24 top-16 h-96 w-96 rounded-full border border-brand-blue/10 bg-white/45 blur-2xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white/90 via-white/45 to-transparent" />

        <div className="relative z-10 flex min-h-[680px] flex-col px-6 py-8 sm:min-h-[760px] sm:px-10 lg:min-h-[780px] lg:px-16 lg:py-14">
          <div className="max-w-2xl pt-5 sm:pt-12 lg:pt-16">
            <p className="inline-flex rounded-full border border-brand-blue/20 bg-white/90 px-4 py-2 text-sm font-bold text-brand-blue shadow-sm backdrop-blur">
              Focused connector range
            </p>
            <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-tight text-ink sm:text-6xl lg:text-7xl">
              0.5mm, 1.0mm & 1.25mm Connector Solutions
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
              Explore two FPC / FFC connector pitches and one wafer connector pitch for compact electronic and wire-to-board connection projects.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <InquiryCta label="Send Project Inquiry" />
              <Link href="/products/category/pitch-connectors" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-brand-blue/25 bg-white px-6 text-sm font-bold text-ink shadow-sm transition hover:border-brand-blue hover:text-brand-blue">
                View Connector Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 md:absolute md:right-12 md:top-20 md:mt-0 md:w-[42%] md:max-w-2xl md:gap-4 lg:right-16 lg:top-24">
            {featuredProducts.map((product, index) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className={`group rounded-3xl border border-white/80 bg-white/92 p-3 shadow-glow backdrop-blur transition hover:-translate-y-1 ${index === 1 ? 'md:translate-y-14' : ''}`}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white p-2">
                  <img src={product.image} alt={product.model} className="h-full w-full object-contain transition duration-500 group-hover:scale-105" />
                </div>
                <p className="mt-3 text-center text-xs font-black text-ink sm:text-sm">{product.model.split(' Pitch')[0]}</p>
              </Link>
            ))}
          </div>

          <div className="mt-auto grid gap-3 rounded-3xl border border-white/70 bg-white p-3 shadow-glow sm:mt-24 sm:bg-white/86 sm:p-4 sm:backdrop-blur lg:mt-32 md:grid-cols-[1.2fr_2fr] md:items-center">
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
