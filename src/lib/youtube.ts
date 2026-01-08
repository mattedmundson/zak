// Use server-side env vars (no NEXT_PUBLIC_ prefix needed for server components)
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  duration?: string
}

export async function getLatestPodcastEpisode(): Promise<YouTubeVideo | null> {
  if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
    console.error('YouTube API key or Channel ID not configured')
    return null
  }

  try {
    // First, get the channel's uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    )

    if (!channelResponse.ok) {
      throw new Error('Failed to fetch channel data')
    }

    const channelData = await channelResponse.json()
    const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsPlaylistId) {
      throw new Error('Could not find uploads playlist')
    }

    // Get the latest video from the uploads playlist
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=1&order=date&key=${YOUTUBE_API_KEY}`
    )

    if (!playlistResponse.ok) {
      throw new Error('Failed to fetch playlist items')
    }

    const playlistData = await playlistResponse.json()
    const latestVideo = playlistData.items[0]

    if (!latestVideo) {
      throw new Error('No videos found')
    }

    // Get additional video details (duration, etc.)
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${latestVideo.snippet.resourceId.videoId}&key=${YOUTUBE_API_KEY}`
    )

    const videoData = await videoResponse.json()
    const videoDetails = videoData.items[0]

    return {
      id: latestVideo.snippet.resourceId.videoId,
      title: latestVideo.snippet.title,
      description: latestVideo.snippet.description,
      thumbnail:
        latestVideo.snippet.thumbnails.maxres?.url ||
        latestVideo.snippet.thumbnails.high?.url ||
        latestVideo.snippet.thumbnails.medium?.url,
      publishedAt: latestVideo.snippet.publishedAt,
      duration: videoDetails?.contentDetails?.duration,
    }
  } catch (error) {
    console.error('Error fetching latest podcast episode:', error)
    return null
  }
}
