'use client'

import { useSearchParams } from 'next/navigation'

export function ThanksContent() {
  const searchParams = useSearchParams()
  const source = searchParams.get('source')

  const messages: Record<string, { heading: string; intro: string; confirmBefore: string; confirmBold: string; confirmAfter: string }> = {
    recipe: {
      heading: 'You\'re (almost) on the list!',
      intro: 'Thanks for signing up to hear about the recipe book.',
      confirmBefore: 'You\'ll receive an email shortly asking you to confirm your email address.',
      confirmBold: 'Please click the link in that email to complete your sign-up.',
      confirmAfter: 'If you don\'t confirm, we won\'t be able to let you know when the book launches or send you the special offer price.',
    },
    newsletter: {
      heading: 'You\'re (almost) subscribed!',
      intro: 'Thanks for signing up to my weekly newsletter.',
      confirmBefore: 'You\'ll receive an email shortly asking you to confirm your email address.',
      confirmBold: 'Please click the link in that email to complete your subscription.',
      confirmAfter: 'If you don\'t confirm, you won\'t receive any newsletters or updates from me.',
    },
  }

  const content = messages[source ?? ''] ?? {
    heading: 'Thank you!',
    intro: 'Thanks for signing up.',
    confirmBefore: 'You\'ll receive an email shortly asking you to confirm your email address.',
    confirmBold: 'Please click the link in that email to complete your sign-up.',
    confirmAfter: '',
  }

  return (
    <div className="max-w-xl text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-[family-name:var(--font-playfair)]">
        {content.heading}
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        {content.intro}
      </p>
      <div className="mt-8 bg-gray-50 rounded-2xl p-6">
        <p className="text-base text-gray-700 font-semibold mb-2">
          One last step
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {content.confirmBefore} <span className="font-bold text-gray-900">{content.confirmBold}</span> {content.confirmAfter}
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Don&apos;t forget to check your spam or promotions folder if you don&apos;t see it within a few minutes.
        </p>
      </div>
      <a
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-bold text-white transition-colors hover:bg-gray-700"
      >
        Back to Home
      </a>
    </div>
  )
}
