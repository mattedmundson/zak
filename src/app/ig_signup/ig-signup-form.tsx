'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CountdownBadge } from '@/components/countdown-badge'

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

type Currency = 'usd' | 'gbp'

const prices: Record<Currency, { symbol: string; list: string; offer: string; saving: string }> = {
  usd: { symbol: '$', list: '29.99', offer: '14.99', saving: '15.00' },
  gbp: { symbol: '£', list: '24.99', offer: '12.49', saving: '12.50' },
}

function getCurrencyCookie(): Currency {
  const match = document.cookie.match(/(?:^|; )currency=(usd|gbp)/)
  return (match?.[1] as Currency) ?? 'usd'
}

function setCurrencyCookie(currency: Currency) {
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `currency=${currency}; path=/; expires=${expires}; SameSite=Lax`
}

export function IgSignupForm() {
  const router = useRouter()
  const [time, setTime] = useState(getTimeRemaining(LAUNCH_DATE))
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [currency, setCurrency] = useState<Currency>('usd')
  const formLoadTime = useRef(Date.now())

  useEffect(() => {
    setCurrency(getCurrencyCookie())
  }, [])

  useEffect(() => {
    formLoadTime.current = Date.now()
    const interval = setInterval(() => {
      setTime(getTimeRemaining(LAUNCH_DATE))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleCurrency = () => {
    const next: Currency = currency === 'usd' ? 'gbp' : 'usd'
    setCurrency(next)
    setCurrencyCookie(next)
  }

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
          source: 'ig_signuppage',
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

  const p = prices[currency]

  return (
    <div className="mt-20 bg-white/95 backdrop-blur-sm rounded-2xl p-6">
      {/* Zak's photo */}
      <div className="flex justify-center -mt-18 mb-4">
        <Image
          src="/zak-profile.webp"
          alt="Zak Edmundson"
          width={112}
          height={112}
          className="w-28 h-28 rounded-full object-cover object-top border-4 border-white shadow-md"
        />
      </div>

      {/* Countdown or Badge */}
      {time.expired ? (
        <div className="flex justify-center mb-4">
          <CountdownBadge />
        </div>
      ) : (
        <>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">Launching in</p>
          <div className="flex justify-center gap-3">
            {[
              { value: time.days, label: 'Days' },
              { value: time.hours, label: 'Hrs' },
              { value: time.minutes, label: 'Min' },
              { value: time.seconds, label: 'Sec' },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-900 tabular-nums w-11 text-center">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Divider */}
      <div className="my-5 border-t border-gray-200" />

      {/* Pricing */}
      <p className="text-sm font-semibold text-gray-900">
        {time.expired ? '50% Off' : 'Launch Special — 50% Off'}
      </p>
      <div className="mt-2 flex items-center justify-center gap-3">
        <span className="text-base text-gray-400 line-through">{p.symbol}{p.list}</span>
        <span className="text-2xl font-bold text-gray-900">{p.symbol}{p.offer}</span>
      </div>
      <p className="mt-1 text-xs text-gray-500">
        You save {p.symbol}{p.saving}
      </p>
      <button
        onClick={toggleCurrency}
        className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Image src={currency === 'usd' ? '/uk.svg' : '/us.svg'} alt="" width={14} height={14} className="w-3.5 h-3.5 shrink-0 rounded-full" />
        {currency === 'usd' ? 'Show prices in £ GBP' : 'Show prices in $ USD'}
      </button>

      {/* Divider */}
      <div className="my-5 border-t border-gray-200" />

      {/* Email form */}
      <p className="text-sm text-gray-600 mb-4">
        {time.expired
          ? 'Enter your email to get the recipe book at the special offer price.'
          : 'Sign up to get notified on launch day and secure the special offer price.'}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Honeypot */}
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
          className="h-12 rounded-full border border-gray-300 px-5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={submitting}
          className="h-12 rounded-full bg-black px-6 text-sm font-bold text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : time.expired ? 'Get It Now' : 'Get 50% Off'}
        </button>
      </form>
      {error && <p className="text-sm text-red-600 text-center mt-3">{error}</p>}
      <a
        href="/#recipe-book"
        className="mt-6 block text-xs text-gray-400 hover:text-gray-600 transition-colors text-center"
      >
        More info
      </a>
    </div>
  )
}
