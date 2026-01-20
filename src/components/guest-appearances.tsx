'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

const guestAppearances = [
  {
    id: 1,
    title: 'Grow eCommerce Business',
    href: 'https://www.ecomone.com/podcast/matt-edmundson-grow-ecommerce-business',
    imageUrl: '/podcast-ecomone.webp',
    podcast: 'eCom@One',
  },
  {
    id: 2,
    title: 'A Framework for Growing eCommerce Brands From Scratch',
    href: 'https://www.youtube.com/watch?v=HuG26r9ZeRA',
    imageUrl: 'https://img.youtube.com/vi/HuG26r9ZeRA/hqdefault.jpg',
    podcast: 'eCommerce Profits Podcast',
  },
  {
    id: 3,
    title: 'Creating a Customer-Centric E-Commerce Experience',
    href: 'https://www.theagentsofchange.com/matt-edmundson',
    imageUrl: '/podcast-agentsofchange.webp',
    podcast: 'The Agents of Change',
  },
  {
    id: 4,
    title: 'Excelling with Ecommerce in the Beauty Space',
    href: 'https://www.youtube.com/watch?v=tD4vutYxAaQ',
    imageUrl: 'https://img.youtube.com/vi/tD4vutYxAaQ/hqdefault.jpg',
    podcast: 'Spa Marketing Made Easy',
  },
  {
    id: 5,
    title: 'Toilet Seat Thinking',
    href: 'https://www.youtube.com/watch?v=XNWiBYK_-E0',
    imageUrl: 'https://img.youtube.com/vi/XNWiBYK_-E0/hqdefault.jpg',
    podcast: 'eCommerce Odyssey',
  },
  {
    id: 6,
    title: 'Why Podcasting is a Win-Win for eCommerce Businesses',
    href: 'https://www.youtube.com/watch?v=-zheDNek_cs',
    imageUrl: 'https://img.youtube.com/vi/-zheDNek_cs/hqdefault.jpg',
    podcast: 'Ecommerce Marketing Podcast',
  },
  {
    id: 7,
    title: 'Scale and Sell Your Business In These 7 Steps',
    href: 'https://thebudaimedia.com/podcasts/123-matt-edmundson-scale-and-sell-your-business-in-these-7-steps/',
    imageUrl: '/podcast-ecomshow.webp',
    podcast: 'The Ecom Show',
  },
  {
    id: 8,
    title: 'Building a Killer Shopify Store',
    href: 'https://www.mattedmundson.com/blog/winning-with-shopify',
    imageUrl: '/podcast-winningwithshopify.webp',
    podcast: 'Winning With Shopify',
  },
  {
    id: 9,
    title: 'The Slingshot Framework – How to Scale Your Online Business',
    href: 'https://www.youtube.com/watch?v=US7P-uyDj2A',
    imageUrl: 'https://img.youtube.com/vi/US7P-uyDj2A/hqdefault.jpg',
    podcast: 'Ecom Power',
  },
  {
    id: 10,
    title: 'The Jam Jar Product Funnel',
    href: 'https://www.mattedmundson.com/blog/the-jam-jar-product-funnel',
    imageUrl: '/podcast-chasingtheinsights.webp',
    podcast: 'Chasing the Insights',
  },
  {
    id: 11,
    title: 'Selling Your eCommerce Business',
    href: 'https://startup-hustle.captivate.fm/episode/selling-your-ecommerce-business',
    imageUrl: '/podcast-startuphustle.webp',
    podcast: 'Startup Hustle',
  },
  {
    id: 12,
    title: 'How to Create a Customer-Centric Experience With Toilet Seat Marketing',
    href: 'https://100mba.net/mba2013/',
    imageUrl: '/podcast-100mbashow.webp',
    podcast: 'The $100 MBA Show',
  },
  {
    id: 13,
    title: 'Growing A Great Ecommerce Brand',
    href: 'https://joinupdots.com/podcast/matt-edmundson-growing-a-great-ecommerce-brand/',
    imageUrl: '/podcast-jointhedots.webp',
    podcast: 'Join Up Dots',
  },
  {
    id: 14,
    title: 'A Desire to Constantly Learn',
    href: 'https://podcasts.apple.com/nz/podcast/222-matt-edmundson-a-desire-to-constantly-learn/id1517844848?i=1000541321142',
    imageUrl: '/podcast-leadershipischanging.webp',
    podcast: 'Leadership Is Changing',
  },
]

export function GuestAppearances() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const cards = container.querySelectorAll('article')
      if (cards[index]) {
        const card = cards[index] as HTMLElement
        const containerLeft = container.getBoundingClientRect().left
        const cardLeft = card.getBoundingClientRect().left
        const scrollLeft = container.scrollLeft + (cardLeft - containerLeft)
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      }
    }
    setActiveIndex(index)
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const cards = container.querySelectorAll('article')
      const containerLeft = container.getBoundingClientRect().left
      let closestIndex = 0
      let closestDistance = Infinity

      cards.forEach((card, index) => {
        const cardLeft = card.getBoundingClientRect().left
        const distance = Math.abs(cardLeft - containerLeft)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveIndex(closestIndex)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="mt-16">
      <div className="max-w-3xl mx-auto">
        <hr className="border-gray-200 mb-16" />
      </div>
      <div className="max-w-3xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-8">
          Podcasts I have been a guest on
        </h3>
      </div>
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          width: '100vw',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          scrollPaddingLeft: '1.5rem',
          scrollPaddingRight: '1.5rem',
        }}
      >
        <div
          className="flex gap-x-6"
          style={{ width: 'max-content' }}
        >
        {guestAppearances.map((appearance) => (
          <article
            key={appearance.id}
            className="flex-none w-72 sm:w-80 lg:w-72 xl:w-80 flex flex-col items-start justify-between snap-start"
          >
            <div className="relative w-full">
              <Image
                alt=""
                src={appearance.imageUrl}
                width={480}
                height={270}
                sizes="288px"
                className="aspect-video w-full rounded-2xl bg-gray-100 object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="group relative flex max-w-xl grow flex-col justify-between">
              <a href={appearance.href} target="_blank" rel="noopener noreferrer">
                <span className="absolute inset-0" />
                <div className="mt-4">
                  <span className="inline-block rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                    {appearance.podcast}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {appearance.title}
                </p>
              </a>
            </div>
          </article>
        ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {guestAppearances.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to item ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              activeIndex === index
                ? 'w-8 bg-gray-900'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
