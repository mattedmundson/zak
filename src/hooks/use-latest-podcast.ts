'use client'

import { useState, useEffect } from 'react'
import { YouTubeVideo, getLatestPodcastEpisode } from '@/lib/youtube'

export function useLatestPodcast() {
  const [latestEpisode, setLatestEpisode] = useState<YouTubeVideo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLatestEpisode() {
      try {
        setIsLoading(true)
        setError(null)
        const episode = await getLatestPodcastEpisode()
        setLatestEpisode(episode)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch latest episode')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLatestEpisode()
  }, [])

  return { latestEpisode, isLoading, error }
}
