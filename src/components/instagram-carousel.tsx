'use client'

import { useEffect, useRef } from 'react'
import { PillBadge } from './badge'

interface InstagramCarouselProps {
  id?: string
  urls: string[]
  ctaText?: string
  ctaHref?: string
}

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

export function InstagramCarousel({
  id,
  urls,
  ctaText = 'Follow @zakthenutritionist',
  ctaHref = 'https://www.instagram.com/zakthenutritionist/',
}: InstagramCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Load Instagram embed script
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src*="instagram.com/embed.js"]'
    )

    if (existingScript) {
      window.instgrm?.Embeds.process()
    } else {
      const script = document.createElement('script')
      script.src = '//www.instagram.com/embed.js'
      script.async = true
      document.body.appendChild(script)

      script.onload = () => {
        window.instgrm?.Embeds.process()
      }
    }
  }, [urls])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' })
    }
  }

  if (urls.length === 0) return null

  return (
    <section id={id} className="py-16 md:py-20 lg:py-24 bg-gray-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <PillBadge className="-rotate-1">@zakthenutritionist</PillBadge>

          {/* Navigation arrows - desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:border-black hover:text-white transition-all duration-200"
              aria-label="Scroll left"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:border-black hover:text-white transition-all duration-200"
              aria-label="Scroll right"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 -mx-8 px-8"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {urls.map((url) => (
            <div
              key={url}
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Card with offset border */}
              <div className="relative group">
                {/* Offset shadow */}
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-black transition-all duration-300 group-hover:-bottom-4 group-hover:-right-4" />

                {/* Instagram embed */}
                <div className="relative bg-white border border-black">
                  <blockquote
                    className="instagram-media"
                    data-instgrm-captioned
                    data-instgrm-permalink={url}
                    data-instgrm-version="14"
                    style={{
                      background: '#FFF',
                      border: 0,
                      borderRadius: 0,
                      boxShadow: 'none',
                      margin: 0,
                      maxWidth: '340px',
                      minWidth: '300px',
                      padding: 0,
                      width: '340px',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Follow CTA Card */}
          <div
            className="flex-shrink-0 w-[300px] md:w-[340px] min-h-[400px]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="relative group h-full">
              {/* Offset shadow */}
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-black transition-all duration-300 group-hover:-bottom-4 group-hover:-right-4" />

              {/* Card */}
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex flex-col items-center justify-center w-full h-full bg-white border border-black text-center p-8 min-h-[400px]"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-black transition-transform duration-300 group-hover:scale-110">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {ctaText}
                </span>
                <span className="text-sm text-gray-500 mt-1">
                  Daily tips & recipes
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-6">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:border-black hover:text-white transition-all duration-200"
            aria-label="Scroll left"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:border-black hover:text-white transition-all duration-200"
            aria-label="Scroll right"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
