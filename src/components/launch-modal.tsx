'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

function getTimeRemaining(targetDate: Date) {
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  }
}

const LAUNCH_DATE = new Date('2026-02-16T12:00:00Z')

export function LaunchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter()
  const [time, setTime] = useState(getTimeRemaining(LAUNCH_DATE))
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const formLoadTime = useRef(Date.now())

  useEffect(() => {
    if (!open) return
    formLoadTime.current = Date.now()
    const interval = setInterval(() => {
      setTime(getTimeRemaining(LAUNCH_DATE))
    }, 1000)
    return () => clearInterval(interval)
  }, [open])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (!open) return
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, handleKeyDown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'recipe_book_launch',
          _honeypot: honeypot,
          _formLoadTime: formLoadTime.current,
        }),
      })
      if (!res.ok) throw new Error()
      router.push('/thanks?source=recipe')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Heading */}
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-[family-name:var(--font-playfair)] text-center">
          The Recipe Book is launching soon
        </h3>

        {/* Countdown */}
        <div className="mt-8 flex justify-center gap-4">
          {[
            { value: time.days, label: 'Days' },
            { value: time.hours, label: 'Hours' },
            { value: time.minutes, label: 'Mins' },
            { value: time.seconds, label: 'Secs' },
          ].map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-gray-900 tabular-nums w-14 text-center">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-gray-200" />

        {/* Pricing */}
        <div className="mt-8 text-center">
          <p className="text-base text-gray-600">
            Special launch offer
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="text-lg text-gray-400 line-through">$27.99</span>
            <span className="text-3xl font-bold text-gray-900">$17.99</span>
          </div>
        </div>

        {/* Email signup */}
        <div className="mt-8">
              <p className="text-sm text-gray-600 text-center mb-4">
                Enter your email to get notified on launch day and secure the special offer price.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-3">
                {/* Honeypot - hidden from humans, bots will fill it */}
                <input
                  type="text"
                  name="company_name"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  disabled={submitting}
                  className="flex-1 h-12 rounded-full border border-gray-300 px-5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-12 rounded-full bg-black px-6 text-sm font-bold text-white transition-colors hover:bg-gray-700 whitespace-nowrap disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Notify Me'}
                </button>
              </form>
              {error && <p className="text-sm text-red-600 text-center mt-3">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export function LaunchButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <LaunchModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
