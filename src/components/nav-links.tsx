'use client'

import { useEffect, useState, useRef } from 'react'
import clsx from 'clsx'

const sections = [
  { id: 'ecommercer', label: 'eCommercer' },
  { id: 'podcaster', label: 'Podcaster' },
  { id: 'pastor', label: 'Pastor' },
  { id: 'woodworker', label: 'Woodworker' },
  { id: 'speaker', label: 'Speaker' },
  { id: 'family', label: 'Family' },
  { id: 'contact', label: 'Contact' },
]

export function NavLinks() {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio and get the most visible one
          const mostVisible = visibleEntries.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          )
          setActiveSection(mostVisible.target.id)
        }
      },
      { rootMargin: '-20% 0px -20% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={clsx(
            'px-3 py-2 text-sm transition-colors',
            activeSection === id
              ? 'font-bold text-white'
              : 'font-medium text-gray-400 hover:text-white'
          )}
        >
          {label}
        </a>
      ))}
    </>
  )
}

export function MobileNavLinks() {
  const [activeSection, setActiveSection] = useState<string>('ecommercer')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for the sticky header

      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id)
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id)
          return
        }
      }
      // Default to first section if none found
      setActiveSection(sections[0].id)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Run once on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-scroll to keep active section link visible (at the left)
  useEffect(() => {
    if (activeSection && scrollContainerRef.current) {
      const activeLink = linkRefs.current.get(activeSection)
      const firstLink = linkRefs.current.get(sections[0].id)
      if (activeLink && firstLink) {
        // Calculate offset relative to the first link's position
        const scrollOffset = activeLink.offsetLeft - firstLink.offsetLeft
        scrollContainerRef.current.scrollTo({
          left: scrollOffset,
          behavior: 'smooth'
        })
      }
    }
  }, [activeSection])

  return (
    <div
      ref={scrollContainerRef}
      className="flex overflow-x-auto scrollbar-none"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {sections.map(({ id, label }) => (
        <a
          key={id}
          ref={(el) => {
            if (el) linkRefs.current.set(id, el)
          }}
          href={`#${id}`}
          className={clsx(
            'flex-none px-3 py-2 text-sm whitespace-nowrap transition-colors',
            activeSection === id
              ? 'font-bold text-white'
              : 'font-medium text-gray-400 hover:text-white'
          )}
        >
          {label}
        </a>
      ))}
    </div>
  )
}
