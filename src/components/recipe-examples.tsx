'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const recipes = [
  { src: '/recipe-ex/ramen_1.webp', title: 'The Recipe' },
  { src: '/recipe-ex/ramen_2.webp', title: 'Ingredients & Method' },
  { src: '/recipe-ex/ramen_3.webp', title: 'Personalisation' },
  { src: '/recipe-ex/ramen_4.webp', title: 'Nutrition' },
]

export function RecipeExamples() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (expandedIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [expandedIndex])

  useEffect(() => {
    if (expandedIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedIndex(null)
      if (e.key === 'ArrowRight') setExpandedIndex((i) => (i !== null && i < recipes.length - 1 ? i + 1 : i))
      if (e.key === 'ArrowLeft') setExpandedIndex((i) => (i !== null && i > 0 ? i - 1 : i))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [expandedIndex])

  return (
    <>
      <div className="mt-16 md:mt-20">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">What you get for each recipe</h3>
        <div
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {recipes.map((recipe, index) => (
            <div key={index} className="flex-shrink-0 w-[65vw] md:w-auto snap-center">
              <p className="text-sm font-semibold text-gray-900 mb-3">{recipe.title}</p>
              <button
                onClick={() => setExpandedIndex(index)}
                className="relative group w-full text-left cursor-zoom-in"
              >
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-black transition-all duration-300 group-hover:-bottom-4 group-hover:-right-4" />
                <div className="relative border border-black">
                  <div className="relative aspect-[800/1132]">
                    <Image
                      src={recipe.src}
                      alt={recipe.title}
                      width={800}
                      height={1132}
                      sizes="(max-width: 768px) 65vw, 25vw"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center">
          <a
            href="#recipe-book"
            className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-bold text-white transition-colors hover:bg-gray-700"
          >
            Get Recipe Book
          </a>
          <p className="text-sm text-gray-500 mt-2">Immediate Download</p>
        </div>
      </div>

      {/* Lightbox */}
      {expandedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-8 cursor-zoom-out"
          onClick={() => setExpandedIndex(null)}
        >
          <button
            onClick={() => setExpandedIndex(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous */}
            {expandedIndex > 0 && (
              <button
                onClick={() => setExpandedIndex(expandedIndex - 1)}
                className="absolute -left-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                aria-label="Previous recipe"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next */}
            {expandedIndex < recipes.length - 1 && (
              <button
                onClick={() => setExpandedIndex(expandedIndex + 1)}
                className="absolute -right-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                aria-label="Next recipe"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <Image
              src={recipes[expandedIndex].src}
              alt={recipes[expandedIndex].title}
              width={800}
              height={1132}
              sizes="(max-width: 768px) 90vw, 50vw"
              className="h-full w-auto object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
