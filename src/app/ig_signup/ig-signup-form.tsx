import Image from 'next/image'

export function IgSignupForm() {
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

      {/* Badge */}
      <div className="flex justify-center mb-3">
        <span className="inline-block px-4 py-1 bg-black text-white text-xs font-bold rounded-full -rotate-1">Launch offer — 50% off</span>
      </div>

      <p className="text-sm font-semibold text-gray-900 text-center">
        65 gut-friendly recipes. No guesswork.
      </p>
      <p className="text-xs text-gray-500 text-center mt-1 mb-5">
        Choose your currency for instant download of all 4 PDFs.
      </p>

      {/* Pricing & Buy Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {/* GBP */}
        <div className="flex flex-col items-center text-center">
          <Image src="/uk.svg" alt="GBP" width={32} height={32} className="w-8 h-8 rounded-full" />
          <span className="mt-2 text-base text-gray-400 line-through">&pound;24.99</span>
          <span className="text-2xl font-bold text-gray-900 mb-3">&pound;12.49</span>
          <a
            href="https://zakthenutritionist.beehiiv.com/products/ibs-friendly-recipe-ebook-gbp"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-1.5 w-full h-10 rounded-full bg-black text-white text-xs font-bold transition-colors hover:bg-gray-700"
          >
            <Image src="/uk.svg" alt="" width={14} height={14} className="w-3.5 h-3.5 rounded-full" />
            Buy in &pound;
          </a>
        </div>

        {/* USD */}
        <div className="flex flex-col items-center text-center">
          <Image src="/us.svg" alt="USD" width={32} height={32} className="w-8 h-8 rounded-full" />
          <span className="mt-2 text-base text-gray-400 line-through">$29.99</span>
          <span className="text-2xl font-bold text-gray-900 mb-3">$14.99</span>
          <a
            href="https://zakthenutritionist.beehiiv.com/products/ibs-friendly-recipe-ebook-usd"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-1.5 w-full h-10 rounded-full bg-black text-white text-xs font-bold transition-colors hover:bg-gray-700"
          >
            <Image src="/us.svg" alt="" width={14} height={14} className="w-3.5 h-3.5 rounded-full" />
            Buy in $
          </a>
        </div>
      </div>

      <a
        href="/#recipe-book"
        className="mt-6 block text-xs text-gray-400 hover:text-gray-600 transition-colors text-center"
      >
        More info
      </a>
    </div>
  )
}
