export type SpotifyAccessToken = {
	access_token: string;
};

export type Tracks = {
	items: TracksItem[];
};

export type TracksItem = {
	track: Track;
	played_at: string;
};

export type Track = {
	album: {
		images: {
			url: string;
		}[];
		name: string;
		external_urls: {
			spotify: string;
		};
	};
	artists: {
		name: string;
		external_urls: {
			spotify: string;
		};
	}[];
	external_urls: {
		spotify: string;
	};
	name: string;
};

export type Song = {
	item: {
		album: {
			images: {
				url: string;
			}[];
			name: string;
			external_urls: {
				spotify: string;
			};
		};
		artists: {
			name: string;
			external_urls: {
				spotify: string;
			};
		}[];
		external_urls: {
			spotify: string;
		};
		name: string;
	};
	is_playing: boolean;
};
