'use client'

import { LazyYouTube } from '@/components/lazy-youtube'

interface LatestEpisodePlayerProps {
  videoId: string
  title: string
}

export function LatestEpisodePlayer({ videoId, title }: LatestEpisodePlayerProps) {
  return <LazyYouTube videoId={videoId} title={title} />
}
