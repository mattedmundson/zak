'use client'

import { useState, useEffect, useRef } from 'react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [submittedFirstName, setSubmittedFirstName] = useState('')
  const [showNewsletterCheckbox, setShowNewsletterCheckbox] = useState(false)
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(true)
  const lastCheckedEmail = useRef<string>('')

  // Check subscription status when email changes (debounced)
  useEffect(() => {
    const trimmedEmail = email.trim()
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)

    if (!isValidEmail || trimmedEmail === lastCheckedEmail.current) {
      return
    }

    const timeoutId = setTimeout(async () => {
      lastCheckedEmail.current = trimmedEmail

      try {
        const response = await fetch('/api/newsletter/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmedEmail }),
        })
        const result = await response.json()

        setShowNewsletterCheckbox(!result.subscribed)
        if (result.subscribed) {
          setSubscribeToNewsletter(false)
        }
      } catch (error) {
        console.error('Failed to check subscription:', error)
        setShowNewsletterCheckbox(false)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      // If user opted in to newsletter, subscribe them
      if (subscribeToNewsletter && showNewsletterCheckbox) {
        try {
          await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: email,
              source: 'Contact Form',
              signupPage: '/contact',
            }),
          })
        } catch (error) {
          console.error('Failed to subscribe to newsletter:', error)
        }
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          message,
          subscribedToNewsletter: subscribeToNewsletter && showNewsletterCheckbox,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmittedFirstName(firstName)
      setStatus('success')
      setFirstName('')
      setLastName('')
      setEmail('')
      setMessage('')
      setShowNewsletterCheckbox(false)
      setSubscribeToNewsletter(true)
      lastCheckedEmail.current = ''
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to send message'
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-16">
        <div className="rounded-lg bg-gray-100 border border-black p-6">
          <h3 className="text-lg font-semibold text-gray-900">Thanks for your message, {submittedFirstName}!</h3>
          <p className="text-gray-900 mt-2">
            I&apos;ll get back to you as soon as possible. A confirmation email has been sent to your inbox.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-bold text-white hover:bg-gray-500 transition-colors"
          >
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-16">
      <h3 className="mb-6 text-lg font-semibold text-gray-900">Send a message</h3>

      {status === 'error' && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-red-800">{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 mb-2">
            First name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={status === 'submitting'}
            className="block w-full rounded-lg border border-gray-400 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-900 mb-2">
            Last name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={status === 'submitting'}
            className="block w-full rounded-lg border border-gray-400 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'submitting'}
            className="block w-full rounded-lg border border-gray-400 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            disabled={status === 'submitting'}
            className="block w-full rounded-lg border border-gray-400 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black resize-y disabled:opacity-50"
          />
        </div>

        {showNewsletterCheckbox && (
          <div className="sm:col-span-2">
            <label className="flex items-start gap-3 cursor-pointer bg-gray-100 rounded-lg p-4 border border-gray-300">
              <input
                type="checkbox"
                checked={subscribeToNewsletter}
                onChange={(e) => setSubscribeToNewsletter(e.target.checked)}
                disabled={status === 'submitting'}
                className="mt-0.5 size-5 rounded border-gray-400 text-black focus:ring-black cursor-pointer disabled:opacity-50"
              />
              <span className="text-sm text-gray-700">
                Subscribe to <span className="font-medium text-gray-900">eCommercer</span>, our weekly newsletter with insights and tips for eCommerce founders
              </span>
            </label>
          </div>
        )}
      </div>
      <div className="mt-8">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-full bg-black px-6 py-3 text-sm font-bold text-white hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Send message'}
        </button>
      </div>
    </form>
  )
}
