export default function ConfirmedPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-[family-name:var(--font-playfair)]">
          You&apos;re all set!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Your email is confirmed and you&apos;re officially on the list. Lots of good stuff coming your way soon.
        </p>
        <p className="mt-2 text-lg text-gray-600">
          In the meantime, check out the website or come and follow me on Instagram.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-bold text-white transition-colors hover:bg-gray-700"
          >
            Visit Website
          </a>
          <a
            href="https://www.instagram.com/zakthenutritionist/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-gray-300 px-6 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-50"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </div>
  )
}
