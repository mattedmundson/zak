'use client'

import { useState, useEffect } from 'react'
import clsx from 'clsx'

const LAUNCH_DATE = new Date('2026-02-16T12:00:00Z')

function getTimeRemaining() {
  const diff = LAUNCH_DATE.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function CountdownBadge({ className }: { className?: string }) {
  const [time, setTime] = useState<ReturnType<typeof getTimeRemaining>>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(getTimeRemaining())
    const interval = setInterval(() => {
      setTime(getTimeRemaining())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return (
      <span
        className={clsx(
          'inline-block text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full bg-white text-black',
          className
        )}
      >
        Launching Soon
      </span>
    )
  }

  if (!time) {
    return (
      <span
        className={clsx(
          'inline-block text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full bg-white text-black',
          className
        )}
      >
        Now Available
      </span>
    )
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full bg-white text-black tabular-nums',
        className
      )}
    >
      Launches in {time.days}d {String(time.hours).padStart(2, '0')}h {String(time.minutes).padStart(2, '0')}m {String(time.seconds).padStart(2, '0')}s
    </span>
  )
}
