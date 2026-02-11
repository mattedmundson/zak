'use client'

import { useRef, useState, useEffect } from 'react'

const stages = [
  {
    number: '01',
    title: 'Elimination',
    description: "We start by reducing FODMAP intake to give your gut a break and establish a baseline. This isn't about cutting everything out, it's about being strategic.",
  },
  {
    number: '02',
    title: 'Reintroduction',
    description: "Once symptoms settle, we systematically test FODMAP groups to identify your personal triggers. This is where the real learning happens.",
  },
  {
    number: '03',
    title: 'Personalisation',
    description: "Finally, we build a sustainable, personalised diet based on what you've learned, expanding your food choices while keeping symptoms in check.",
  },
]

export function StageCards() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const cardWidth = container.scrollWidth / stages.length
      const newIndex = Math.round(scrollLeft / cardWidth)
      setActiveIndex(Math.min(newIndex, stages.length - 1))
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current
    if (!container) return
    const cardWidth = container.scrollWidth / stages.length
    container.scrollTo({ left: cardWidth * index, behavior: 'smooth' })
  }

  return (
    <div className="mt-16">
      {/* Cards Container */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-3 overflow-x-auto snap-x snap-mandatory pb-4 md:overflow-visible md:gap-6 lg:gap-6"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {stages.map((stage, index) => (
          <div key={stage.number} className="contents">
            {/* Card */}
            <div className="flex-shrink-0 md:flex-1 md:flex-shrink snap-center">
              <div className="relative w-[70vw] md:w-auto h-full">
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-black" />
                <div className="relative bg-gray-50 p-6 md:p-8 lg:p-10 h-full border border-black flex flex-col">
                  <span className="block text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-4 md:mb-6 text-gray-300">
                    {stage.number}
                  </span>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                    {stage.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-grow">
                    {stage.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow (not after last card) */}
            {index < stages.length - 1 && (
              <div className="flex items-center justify-center flex-shrink-0">
                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-black">
                  <svg className="h-3 w-3 md:h-4 md:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Dots (mobile only) */}
      <div className="flex justify-center gap-2 mt-6 md:hidden">
        {stages.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? 'w-8 bg-black'
                : 'w-2 bg-gray-300'
            }`}
            aria-label={`Go to stage ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
