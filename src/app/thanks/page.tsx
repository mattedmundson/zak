import { Suspense } from 'react'
import { ThanksContent } from './thanks-content'

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <Suspense fallback={
        <div className="max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-[family-name:var(--font-playfair)]">
            Thank you!
          </h1>
        </div>
      }>
        <ThanksContent />
      </Suspense>
    </div>
  )
}
