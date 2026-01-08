'use client'

import { useState } from 'react'

interface LazyYouTubeProps {
  videoId: string
  title?: string
}

export function LazyYouTube({ videoId, title = 'YouTube video' }: LazyYouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // YouTube thumbnail URL - maxresdefault gives highest quality
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  const handleClick = () => {
    setIsLoaded(true)
  }

  if (isLoaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&cc_load_policy=1&cc_lang_pref=en&controls=1`}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    )
  }

  return (
    <button
      onClick={handleClick}
      className="relative w-full h-full group cursor-pointer"
      aria-label={`Play ${title}`}
    >
      {/* Thumbnail */}
      <img
        src={thumbnailUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors shadow-lg">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  )
}
