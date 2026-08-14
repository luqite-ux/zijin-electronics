'use client'

import { useState } from 'react'

const fields = [
  ['name', 'Name'],
  ['company', 'Company'],
  ['email', 'Email'],
  ['phone', 'Phone / WhatsApp'],
  ['country', 'Country / Region'],
  ['productInterest', 'Product Model / Category'],
  ['application', 'Application'],
  ['estimatedQuantity', 'Estimated Quantity'],
]

export function InquiryForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  return (
    <form
      id="inquiry"
      className="rounded-[2rem] border border-line bg-white p-6 shadow-glow"
      onSubmit={async (event) => {
        event.preventDefault()
        setStatus('submitting')
        setMessage('')
        const response = await fetch('/api/inquiries', { method: 'POST', body: new FormData(event.currentTarget) })
        const result = await response.json().catch(() => ({}))
        if (!response.ok) {
          setStatus('error')
          setMessage(result.error || 'Submission failed. Please try again.')
          return
        }
        event.currentTarget.reset()
        setStatus('success')
        setMessage('Thank you. Your inquiry has been submitted successfully.')
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(([name, label]) => (
          <label key={name} className="text-sm font-bold text-ink">
            {label}
            <input name={name} type={name === 'email' ? 'email' : 'text'} className="mt-2 min-h-12 w-full rounded-2xl border border-line bg-brand-ice px-4 text-ink outline-none focus:border-brand-blue" required={name === 'name' || name === 'email'} />
          </label>
        ))}
      </div>
      <label className="mt-4 block text-sm font-bold text-ink">
        Custom Requirements / Drawings / Sample Notes
        <textarea name="requirements" className="mt-2 min-h-32 w-full rounded-2xl border border-line bg-brand-ice p-4 text-ink outline-none focus:border-brand-blue" />
      </label>
      <label className="mt-4 block text-sm font-bold text-ink">
        Message
        <textarea name="message" className="mt-2 min-h-32 w-full rounded-2xl border border-line bg-brand-ice p-4 text-ink outline-none focus:border-brand-blue" required />
      </label>
      <label className="mt-4 block rounded-2xl border border-dashed border-brand-blue/35 bg-brand-ice p-5 text-sm font-semibold text-muted">
        You can mention drawings, samples, materials, color, process, and target application in the message.
      </label>
      <button className="mt-6 min-h-12 rounded-full bg-brand-blue px-6 text-sm font-bold text-white disabled:opacity-60" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
      </button>
      {message ? <p className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${status === 'error' ? 'bg-[#fff1f1] text-[#a31919]' : 'bg-[#e9f8ef] text-[#176b3a]'}`}>{message}</p> : null}
    </form>
  )
}
