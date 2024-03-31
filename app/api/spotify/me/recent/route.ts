import { revalidatePath } from 'next/cache';
import { lastPlayedSong } from '../../lib';
import { type Song, Tracks, Track } from '../../types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const f = 'recent.GET';
	console.log({ f });
	const url = request.url;

	const response = await lastPlayedSong(request);

	// Here we handle the request from the API
	if (response.status === 204) {
		return new NextResponse(null, {
			status: 404,
			headers: response.headers
		});
	}

	if (response.status > 400) {
		return new NextResponse(null, {
			status: response.status,
			headers: response.headers
		});
	}

	const tracks: Tracks = await response.json();
	const track: Track = tracks.items[0].track;

	if (track === null) {
		return new NextResponse(null, {
			status: 404,
			headers: response.headers
		});
	}

	const isPlaying: boolean = false;
	const title: string = track?.name ?? 'No song playing';
	const artist: string = (track?.artists ?? ['No artist'])
		.map((_artist: { name: string }) => _artist.name)
		.join(', ');
	const album: string = track?.album?.name ?? 'No album';
	const albumUrl: string = track?.album?.external_urls?.spotify ?? 'No album url';
	const albumImageUrl: string = track?.album?.images[0]?.url ?? 'No album image url';
	const songUrl: string = track?.external_urls?.spotify ?? 'No song url';

	if (title === 'No song playing') {
		return new NextResponse(null, {
			status: 404,
			headers: response.headers
		});
	}

	const data = {
		album,
		albumUrl,
		artist,
		albumImageUrl,
		isPlaying,
		songUrl,
		title
	};

	if (url) {
		revalidatePath(url);
		const jsonResponse = NextResponse.json(
			{
				revalidated: true,
				now: Date.now(),
				data
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return jsonResponse;
	}

	const jsonResponse = NextResponse.json(
		{
			revalidated: false,
			now: Date.now(),
			data
		},
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	// We return an object containing the information about the currently playing song
	return jsonResponse;
}
