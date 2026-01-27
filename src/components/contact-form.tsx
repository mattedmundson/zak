'use client'

import { useState, useEffect, useRef } from 'react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [submittedFirstName, setSubmittedFirstName] = useState('')
  const [showNewsletterCheckbox, setShowNewsletterCheckbox] = useState(false)
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(true)
  const [errors, setErrors] = useState<Map<string, string>>(new Map())
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const lastCheckedEmail = useRef<string>('')
  const formLoadTime = useRef<number>(Date.now())
  const [honeypot, setHoneypot] = useState('')

  const inputBaseClass = "block w-full rounded-lg border bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 disabled:opacity-50"
  const inputNormalClass = `${inputBaseClass} border-gray-400 focus:border-black focus:ring-black`
  const inputErrorClass = `${inputBaseClass} border-red-500 focus:border-red-500 focus:ring-red-500`

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return 'First name is required'
        break
      case 'lastName':
        if (!value.trim()) return 'Last name is required'
        break
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address'
        break
      case 'company':
        if (!value.trim()) return 'Company is required'
        break
      case 'message':
        if (!value.trim()) return 'Message is required'
        break
    }
    return null
  }

  const handleBlur = (name: string, value: string) => {
    setTouched((prev) => new Set(prev).add(name))
    const error = validateField(name, value)
    setErrors((prev) => {
      const next = new Map(prev)
      if (error) {
        next.set(name, error)
      } else {
        next.delete(name)
      }
      return next
    })
  }

  const validateForm = (): boolean => {
    const newErrors = new Map<string, string>()
    const fields = { firstName, lastName, email, company, message }

    for (const [name, value] of Object.entries(fields)) {
      const error = validateField(name, value)
      if (error) newErrors.set(name, error)
    }

    setErrors(newErrors)
    setTouched(new Set(['firstName', 'lastName', 'email', 'company', 'message']))
    return newErrors.size === 0
  }

  const hasError = (name: string) => touched.has(name) && errors.has(name)

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

    if (!validateForm()) {
      return
    }

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
          company,
          phone: phone || undefined,
          message,
          subscribedToNewsletter: subscribeToNewsletter && showNewsletterCheckbox,
          _honeypot: honeypot,
          _formLoadTime: formLoadTime.current,
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
      setCompany('')
      setPhone('')
      setMessage('')
      setShowNewsletterCheckbox(false)
      setSubscribeToNewsletter(true)
      setErrors(new Map())
      setTouched(new Set())
      lastCheckedEmail.current = ''
      formLoadTime.current = Date.now()
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
      {/* Honeypot field - hidden from users, catches bots */}
      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <input
          type="text"
          name="_honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

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
            onBlur={() => handleBlur('firstName', firstName)}
            disabled={status === 'submitting'}
            className={hasError('firstName') ? inputErrorClass : inputNormalClass}
          />
          {hasError('firstName') && (
            <p className="mt-2 text-sm text-red-600">{errors.get('firstName')}</p>
          )}
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
            onBlur={() => handleBlur('lastName', lastName)}
            disabled={status === 'submitting'}
            className={hasError('lastName') ? inputErrorClass : inputNormalClass}
          />
          {hasError('lastName') && (
            <p className="mt-2 text-sm text-red-600">{errors.get('lastName')}</p>
          )}
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
            onBlur={() => handleBlur('email', email)}
            disabled={status === 'submitting'}
            className={hasError('email') ? inputErrorClass : inputNormalClass}
          />
          {hasError('email') && (
            <p className="mt-2 text-sm text-red-600">{errors.get('email')}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-900 mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            onBlur={() => handleBlur('company', company)}
            disabled={status === 'submitting'}
            className={hasError('company') ? inputErrorClass : inputNormalClass}
          />
          {hasError('company') && (
            <p className="mt-2 text-sm text-red-600">{errors.get('company')}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
            Phone <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={status === 'submitting'}
            className={inputNormalClass}
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
            onBlur={() => handleBlur('message', message)}
            disabled={status === 'submitting'}
            className={`${hasError('message') ? inputErrorClass : inputNormalClass} resize-y`}
          />
          {hasError('message') && (
            <p className="mt-2 text-sm text-red-600">{errors.get('message')}</p>
          )}
        </div>

        {showNewsletterCheckbox && (
          <div className="sm:col-span-2">
            <label className="flex items-start gap-3 cursor-pointer bg-gray-100 rounded-lg p-4 border border-gray-400">
              <input
                type="checkbox"
                checked={subscribeToNewsletter}
                onChange={(e) => setSubscribeToNewsletter(e.target.checked)}
                disabled={status === 'submitting'}
                className="mt-0.5 h-4 w-4 rounded border-2 border-gray-900 text-gray-900 focus:ring-gray-900 focus:ring-offset-0 cursor-pointer accent-gray-900 disabled:opacity-50"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">Subscribe to eCommercer</span>
                <span className="text-sm text-gray-500">Our weekly newsletter with insights and tips for eCommerce founders</span>
              </div>
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
