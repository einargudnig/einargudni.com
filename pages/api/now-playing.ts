import { NextApiRequest, NextApiResponse } from 'next';
import { currentlyPlayingSong } from '@/lib/spotify';

interface Song {
	is_playing: boolean;
	item: {
		name: string;
		artists: {
			name: string;
		}[];
		album: {
			name: string;
			images: {
				url: string;
			}[];
		};
		external_urls: {
			spotify: string;
		};
	};
}

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
	const response = await currentlyPlayingSong();

	// Here we handle the request from the API
	if (response.status === 204 || response.status > 400) {
		return res.status(200).json({ isPlaying: false });
	}

	const song = await response.json();
	// console.log('song', song)

	if (song.item === null) {
		return res.status(200).json({ isPlaying: false });
	}

	const isPlaying: boolean = song.is_playing;
	const title: string = song.item.name;
	const artist: string = song.item.artists
		.map((_artist: { name: string }) => _artist.name)
		.join(', ');
	const album: string = song.item.album.name;
	const albumImageUrl: string = song.item.album.images[0].url;
	const songUrl: string = song.item.external_urls.spotify;

	res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');

	// We return an obejct containing the information about the currently playing song
	return res.status(200).json({
		album,
		albumImageUrl,
		artist,
		isPlaying,
		songUrl,
		title
	});
}
