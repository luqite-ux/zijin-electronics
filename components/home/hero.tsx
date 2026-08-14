import Link from 'next/link'
import { CircuitBoard, Sparkles, Zap } from 'lucide-react'
import { InquiryCta } from '@/components/inquiry-cta'
import { featuredProducts, stats } from '@/lib/site-data'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:py-28">
      <div className="absolute inset-0 circuit-bg opacity-70" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white via-[#eefaff] to-transparent" />
      <div className="absolute -right-28 top-10 h-80 w-80 rounded-full bg-brand-blue/16 blur-3xl" />
      <div className="absolute left-1/4 top-28 h-56 w-56 rounded-full bg-brand-green/18 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
        <div>
          <p className="inline-flex rounded-full border border-brand-blue/20 bg-white/85 px-4 py-2 text-sm font-bold text-brand-blue shadow-sm">
            OEM / ODM Switch & Connector Manufacturer Since 2007
          </p>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Custom Switches, Key Caps & Connectors for Global Appliance Manufacturers
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Yueqing Zijin Electronics supplies direct key switches, range hood switches, door lock switches, key caps, and connector components for home appliances, audio-visual products, medical equipment, and precision instruments.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <InquiryCta label="Send Project Inquiry" />
            <Link href="/products" className="inline-flex min-h-12 items-center rounded-full border border-line bg-white px-6 text-sm font-bold text-ink transition hover:border-brand-blue hover:text-brand-blue">
              Explore 618 Models
            </Link>
          </div>
        </div>
        <div className="relative min-h-[560px]">
          <div className="glass animate-flow absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white via-brand-ice to-[#f1fff9] p-6">
            <div className="grid h-full grid-rows-[1fr_auto] gap-6">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-white">
                <span className="absolute inset-x-8 top-12 h-px bg-gradient-to-r from-transparent via-brand-blue/35 to-transparent" />
                <span className="absolute inset-y-8 left-12 w-px bg-gradient-to-b from-transparent via-brand-blue/25 to-transparent" />
                <img src="/images/hero-product.jpg" alt="Zijin Electronics featured range hood switch product series" className="float-slow absolute inset-0 h-full w-full object-contain p-10" />
                <div className="absolute left-6 top-6 rounded-2xl bg-white/92 p-4 shadow-glow">
                  <CircuitBoard className="h-7 w-7 text-brand-blue" />
                  <p className="mt-2 text-sm font-bold">Range Hood Switches</p>
                </div>
                <div className="absolute bottom-6 right-6 rounded-2xl bg-white/92 p-4 shadow-glow">
                  <Zap className="h-7 w-7 text-brand-green" />
                  <p className="mt-2 text-sm font-bold">Custom Production</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {stats.slice(0, 6).map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-line bg-white/90 p-4">
                    <p className="text-xl font-black text-ink">{stat.value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 left-8 right-8 rounded-3xl border border-line bg-white p-4 shadow-glow">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-brand-blue" />
              <p className="text-sm font-bold text-ink">Featured series: {featuredProducts.slice(0, 3).map((item) => item.model).join(' / ')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
