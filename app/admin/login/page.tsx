'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { siteInfo } from '@/lib/site-data'

function LoginForm() {
  const params = useSearchParams()
  const [pending, setPending] = useState(false)
  const reason = params.get('reason')
  const error = params.get('error')

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f4fbff] via-white to-[#effffb] p-4">
      <div className="w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-glow">
        <div className="mb-6 text-center">
          <img src={siteInfo.logo} alt={siteInfo.brand} className="mx-auto h-14 w-auto object-contain" />
          <h1 className="mt-5 text-2xl font-bold text-ink">{siteInfo.brand}</h1>
          <p className="mt-2 text-sm text-muted">Website management login</p>
        </div>

        {reason === 'unauthorized' && (
          <p className="mb-4 rounded-2xl bg-[#fff8df] px-4 py-3 text-sm font-semibold text-[#8a6100]">
            Please log in before accessing the management dashboard.
          </p>
        )}

        <form action="/api/auth/login" method="post" className="space-y-4" onSubmit={() => setPending(true)}>
          {error && <p className="rounded-2xl bg-[#fff1f1] px-4 py-3 text-sm font-semibold text-[#a31919]">{error}</p>}
          <label className="block text-sm font-bold text-ink">
            Email
            <input name="email" type="email" autoComplete="email" required className="mt-2 min-h-12 w-full rounded-2xl border border-line bg-brand-ice px-4 text-ink outline-none focus:border-brand-blue" />
          </label>
          <label className="block text-sm font-bold text-ink">
            Password
            <input name="password" type="password" autoComplete="current-password" required className="mt-2 min-h-12 w-full rounded-2xl border border-line bg-brand-ice px-4 text-ink outline-none focus:border-brand-blue" />
          </label>
          <button type="submit" disabled={pending} className="min-h-12 w-full rounded-full bg-brand-blue px-5 text-sm font-bold text-white disabled:opacity-60">
            {pending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-muted">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
