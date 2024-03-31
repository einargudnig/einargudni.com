import { currentlyPlayingSong } from '../../lib';
import { type Song } from '../../types';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
	const f = 'current.GET';
	console.log({ f });
	const url = request.url;
	const response = await currentlyPlayingSong(request);

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

	const song: Song = await response.json();

	if (song.item === null) {
		return new NextResponse(null, {
			status: 404,
			headers: response.headers
		});
	}

	const isPlaying: boolean = song?.is_playing ?? false;
	const title: string = song?.item?.name ?? 'No song playing';
	const artist: string = (song?.item?.artists ?? ['No artist'])
		.map((_artist: { name: string }) => _artist.name)
		.join(', ');
	const album: string = song?.item?.album?.name ?? 'No album';
	const albumUrl: string = song?.item?.album?.external_urls?.spotify ?? 'No album url';
	const albumImageUrl: string = song?.item?.album?.images[0]?.url ?? 'No album image url';
	const songUrl: string = song?.item?.external_urls?.spotify ?? 'No song url';

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

	console.log({ jsonResponse });
	// We return an object containing the information about the currently playing song
	return jsonResponse;
}
