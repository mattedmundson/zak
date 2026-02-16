import Image from 'next/image'

const currencies = [
  {
    code: 'GBP',
    flag: '/uk.svg',
    symbol: '£',
    list: '24.99',
    offer: '12.49',
    label: 'Buy in £',
    href: 'https://zakthenutritionist.beehiiv.com/products/ibs-friendly-recipe-ebook-gbp',
  },
  {
    code: 'USD',
    flag: '/us.svg',
    symbol: '$',
    list: '29.99',
    offer: '14.99',
    label: 'Buy in $',
    href: 'https://zakthenutritionist.beehiiv.com/products/ibs-friendly-recipe-ebook-usd',
  },
] as const

export function PricingCards() {
  return (
    <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
      {currencies.map((c) => (
        <div key={c.code} className="border border-gray-200 rounded-xl p-4 text-center bg-white">
          <Image src={c.flag} alt={c.code} width={28} height={28} className="w-7 h-7 rounded-full mx-auto" />
          <p className="mt-2 text-xs text-gray-400 line-through">
            {c.symbol}{c.list}
          </p>
          <p className="text-xl font-bold text-gray-900">
            {c.symbol}{c.offer}
          </p>
          <p className="text-[10px] text-gray-500 mb-3">50% off</p>
          <a
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 w-full h-10 rounded-full bg-black text-white text-xs font-bold transition-colors hover:bg-gray-700"
          >
            <Image src={c.flag} alt="" width={14} height={14} className="w-3.5 h-3.5 rounded-full" />
            {c.label}
          </a>
        </div>
      ))}
    </div>
  )
}
