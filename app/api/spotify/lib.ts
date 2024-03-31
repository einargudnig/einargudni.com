import querystring from 'querystring';
import { IArtistsAPIResponse, ITracksAPIResponse } from './interface';
import { SpotifyAccessToken } from './types';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// We access our values with enviroment variables,
// we don't want to share these values in our code
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

// We encode our client_id and client_secret again to send with the POST request.
// This is a part of the authorization header
const basic: string = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

const LAST_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

// This function gets the access token so that we can access the API
const getAccessToken = async (): Promise<SpotifyAccessToken> => {
	const request: NextRequest = new NextRequest(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token
		})
	});

	try {
		const response: Response = await fetch(request);
		return await response.json();
	} catch (error) {
		console.error(error);
		return { access_token: 'NO ACCESS' };
	}
};

/**
 * Makes a request to the Spotify API to retrieve the user's top tracks.
 */
export const topTracks = async (): Promise<ITracksAPIResponse[]> => {
	// Obtain an access token
	const { access_token }: { access_token: string } = await getAccessToken();

	// Make a request to the Spotify API to retrieve the user's top tracks in last 4 weeks

	const response = await fetch(
		'https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term',
		{
			headers: {
				// Set the Authorization header with the access token
				Authorization: `Bearer ${access_token}`
			}
		}
	);

	// Handle the response and convert it to the expected type
	if (!response.ok) {
		throw new Error('Failed to fetch top artists.');
	}
	const data = await response.json();
	// @ts-ignore
	return data.items as ITracksAPIResponse[];
};

/**
 * Makes a request to the Spotify API to retrieve the user's top artists.
 */
export const topArtists = async (): Promise<IArtistsAPIResponse[]> => {
	// Obtain an access token
	const { access_token } = await getAccessToken();

	// Make a request to the Spotify API to retrieve the user's top artists in last 4 weeks
	const response = await fetch(
		'https://api.spotify.com/v1/me/top/artists?limit=5&time_range=short_term',
		{
			headers: {
				// Set the Authorization header with the access token
				Authorization: `Bearer ${access_token}`
			}
		}
	);

	// Handle the response and convert it to the expected type
	if (!response.ok) {
		throw new Error('Failed to fetch top artists.');
	}

	const data = await response.json();
	// @ts-ignore
	return data.items as IArtistsAPIResponse[];
};

/**
 * Makes a request to the Spotify API to retrieve the currently playing song for the user.
 */
export const currentlyPlayingSong = async (initialRequest: NextRequest) => {
	const f = 'currentlyPlayingSong';
	// Obtain an access token
	const { access_token } = await getAccessToken();
	console.log({ access_token });

	const request = new NextRequest(NOW_PLAYING_ENDPOINT, {
		headers: {
			// Set the Authorization header with the access token
			Authorization: `Bearer ${access_token}`
		}
	});

	try {
		const response: Response = await fetch(request);

		return response;
	} catch (error) {
		const response: NextResponse = new NextResponse(null, {
			status: 404
		});
		return response;
	}
};

export const lastPlayedSong = async (initialRequest: NextRequest) => {
	const f = 'lastPlayedSong';
	// Obtain an access token
	const { access_token } = await getAccessToken();

	const request = new NextRequest(LAST_PLAYED_ENDPOINT, {
		headers: {
			// Set the Authorization header with the access token
			Authorization: `Bearer ${access_token}`
		}
	});

	try {
		const response: Response = await fetch(request);

		return response;
	} catch (error) {
		const response: NextResponse = new NextResponse(null, {
			status: 404
		});
		return response;
	}
	// Make a request to the Spotify API to retrieve the currently playing song for the user
};
