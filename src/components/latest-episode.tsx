import { getLatestPodcastEpisode } from '@/lib/youtube'
import { LatestEpisodePlayer } from '@/components/latest-episode-player'

export async function LatestEpisode() {
  const latestEpisode = await getLatestPodcastEpisode()

  if (!latestEpisode) {
    return null
  }

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-4">
        <img src="/ecommerce-podcast-logo.svg" alt="eCommerce Podcast" className="h-8" />
        <h3 className="text-lg font-semibold text-gray-900">This week&apos;s episode</h3>
      </div>
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
        <LatestEpisodePlayer videoId={latestEpisode.id} title={latestEpisode.title} />
      </div>
      <div className="mt-4">
        <p className="font-medium text-gray-900">{latestEpisode.title}</p>
      </div>
      <a
        href="https://ecommerce-podcast.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold text-white hover:bg-gray-500 transition-colors"
      >
        eCommerce Podcast Website
      </a>
    </div>
  )
}
