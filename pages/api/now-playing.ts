import { getNowPlaying } from '@/lib/spotify'

interface Song {
  album: string
  albumImageUrl: string
  artist: string
  isPlaying: boolean
  songUrl: string
  title: string
}


export default async function handler(_, res) {
  const response = await getNowPlaying()

  // Here we handle the request from the API
  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false })
  }

  const song: Song = await response.json()
  // console.log('song', song)

  if (song.item === null) {
    return res.status(200).json({ isPlaying: false })
  }

  const isPlaying = song.is_playing
  const title = song.item.name
  const artist = song.item.artists.map((_artist) => _artist.name).join(', ')
  const album = song.item.album.name
  const albumImageUrl = song.item.album.images[0].url
  const songUrl = song.item.external_urls.spotify

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')

  // We return an obejct containing the information about the currently playing song
  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  })
}
