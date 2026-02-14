import { IgSignupForm } from './ig-signup-form'

export default function IgSignupPage() {
  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background image */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1920&q=80)',
        }}
      />
      <div
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md text-center">
          {/* Heading */}
          <h1
            className="text-4xl font-bold tracking-tight leading-[0.9] uppercase font-[family-name:var(--font-playfair)]"
            style={{ color: 'white', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
          >
            Recipe Ebook
          </h1>
          <p
            className="mt-4 text-lg font-semibold text-white/90"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}
          >
            65 gut-friendly recipes. No guesswork.
          </p>
          <p
            className="mt-2 text-sm text-white/70 leading-relaxed"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}
          >
            Portion-controlled recipes designed for IBS. Every dish has been FODMAP-checked so you know exactly what you&apos;re eating.
          </p>

          {/* Card */}
          <IgSignupForm />
        </div>
      </div>
    </div>
  )
}
