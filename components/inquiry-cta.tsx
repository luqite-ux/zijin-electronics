import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { inquiryPath } from '@/lib/routes'

type InquiryCtaProps = {
  label?: string
  className?: string
  variant?: 'primary' | 'light'
}

export function InquiryCta({ label = 'Request a Control Solution', className = '', variant = 'primary' }: InquiryCtaProps) {
  const variantClass =
    variant === 'light'
      ? 'bg-white text-brand-blue hover:bg-brand-ice'
      : 'bg-brand-blue text-white hover:bg-[#004987]'

  return (
    <Link
      href={inquiryPath}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold shadow-glow transition focus:outline-none focus:ring-4 focus:ring-brand-blue/20 ${variantClass} ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  )
}
