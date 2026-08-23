import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from '@/lib/inquiry-captcha'

function text(value: FormDataEntryValue | null) {
  return String(value ?? '').trim()
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) {
    return NextResponse.json({ error: 'Inquiry service is not configured.' }, { status: 500 })
  }

  const name = text(formData.get('name'))
  const email = text(formData.get('email'))
  const message = text(formData.get('message'))
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }

  const captchaSecret = process.env.CAPTCHA_SECRET?.trim()
  if (!captchaSecret) {
    return NextResponse.json({ error: 'Verification service is temporarily unavailable.' }, { status: 503 })
  }
  try {
    const captcha = await verifyCaptchaSubmission({
      secret: captchaSecret,
      ...createSupabaseCaptchaContextFromEnv(),
      scope: text(formData.get('captchaScope')).slice(0, 160),
      token: text(formData.get('captchaToken')).slice(0, 4096),
      answer: text(formData.get('captchaAnswer')).slice(0, 16),
    })
    if (!captcha.ok) {
      return NextResponse.json({ error: 'The verification code is incorrect or expired. Please try again.' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'Verification service is temporarily unavailable.' }, { status: 503 })
  }

  const productInterest = text(formData.get('productInterest'))
  const application = text(formData.get('application'))
  const estimatedQuantity = text(formData.get('estimatedQuantity'))
  const requirements = text(formData.get('requirements'))
  const subject = productInterest || 'Zijin Electronics product inquiry'
  const composedMessage = [
    message,
    requirements && `Custom Requirements: ${requirements}`,
    application && `Application: ${application}`,
    estimatedQuantity && `Estimated Quantity: ${estimatedQuantity}`,
    text(formData.get('country')) && `Country / Region: ${text(formData.get('country'))}`,
  ].filter(Boolean).join('\n\n')

  const { error } = await supabase.from('inquiries').insert({
    tenant_id: tenantId,
    name,
    email,
    phone: text(formData.get('phone')),
    company: text(formData.get('company')),
    subject,
    message: composedMessage,
    status: 'unread',
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
