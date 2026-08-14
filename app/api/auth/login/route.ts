import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { SESSION_COOKIE } from '@/lib/admin-session'
import { createAdminClient } from '@/lib/supabase-server'
import { getTenantId } from '@/lib/supabase'

const SESSION_DAYS = 7

function loginError(request: NextRequest, message: string) {
  const target = new URL('/admin/login', request.url)
  target.searchParams.set('error', message)
  return NextResponse.redirect(target, 303)
}

export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null)
  const email = String(form?.get('email') || '').trim().toLowerCase()
  const password = String(form?.get('password') || '')

  if (!email || !password) return loginError(request, 'Please enter email and password.')
  const tenantId = getTenantId()
  if (!tenantId) return loginError(request, 'Site tenant is not configured.')
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) return loginError(request, 'Login service is not configured.')

  const supabase = createAdminClient()
  const { data: user, error } = await supabase
    .from('admin_users')
    .select('id, email, password_hash, is_active, tenant_id')
    .eq('email', email)
    .eq('tenant_id', tenantId)
    .single()

  if (error || !user) return loginError(request, 'Email or password is incorrect.')
  if (!user.is_active) return loginError(request, 'This account is inactive. Please contact the administrator.')

  const ok = await bcrypt.compare(password, user.password_hash)
  if (!ok) return loginError(request, 'Email or password is incorrect.')

  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || ''
  const ua = request.headers.get('user-agent') || ''

  const { error: insertError } = await supabase.from('admin_user_sessions').insert({
    admin_user_id: user.id,
    token,
    expires_at: expiresAt.toISOString(),
    ip,
    user_agent: ua,
  })

  if (insertError) return loginError(request, `Login failed: ${insertError.message}`)

  await supabase.from('admin_users').update({ last_login_at: new Date().toISOString() }).eq('id', user.id)

  const response = NextResponse.redirect(new URL('/admin', request.url), 303)
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    expires: expiresAt,
    path: '/',
  }
  response.cookies.set(SESSION_COOKIE, token, cookieOptions)
  response.cookies.set('hq_tenant_id', tenantId, cookieOptions)
  return response
}
