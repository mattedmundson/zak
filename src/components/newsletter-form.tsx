'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function NewsletterForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const formLoadTime = useRef(Date.now())

  useEffect(() => {
    formLoadTime.current = Date.now()
  }, [])

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
          source: 'newsletter_form',
          _honeypot: honeypot,
          _formLoadTime: formLoadTime.current,
        }),
      })
      if (!res.ok) throw new Error()
      router.push('/thanks?source=newsletter')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-3">
        {/* Honeypot - hidden from humans, bots will fill it */}
        <input
          type="text"
          name="website_url"
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
          className="h-12 rounded-full bg-black px-6 text-sm font-bold text-white transition-colors hover:bg-gray-700 whitespace-nowrap disabled:opacity-50 cursor-pointer"
        >
          {submitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
    </div>
  )
}
