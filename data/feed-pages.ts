// Source of truth for the RSS feed (app/feed.xml/route.ts).
// Add a row here whenever you publish a new page and it shows up in /feed.xml.
// Newest `date` floats to the top of the feed automatically.

export const SITE_URL = 'https://www.einargudni.com';

export interface FeedPage {
	title: string;
	description: string;
	path: string; // route path, leading slash, e.g. '/dissect/marchon'
	date: string; // ISO date (YYYY-MM-DD) — publish date, used for ordering + pubDate
}

export const feedPages: FeedPage[] = [
	// Uncomment on Team Tally launch day, once the page exists at this route.
	// {
	// 	title: 'I built a fines app for football teams — and gave it no backend',
	// 	description:
	// 		'Team Tally is a fine tracker for sports teams. No accounts, no cloud, no server. Why offline-first was the whole point.',
	// 	path: '/writing/team-tally',
	// 	date: '2026-06-23'
	// },
	{
		title: 'Marchon mobile app dissect',
		description: 'What I like about the training app I use now, and the details it gets right.',
		path: '/dissect/marchon',
		date: '2024-10-17'
	},
	{
		title: 'Software dissection',
		description: 'Dissecting the software I use daily — features, design choices, and workflows that just work.',
		path: '/dissect',
		date: '2024-10-17'
	},
	{
		title: 'Someday',
		description: 'A running someday/maybe list — things I want to build, learn, and do.',
		path: '/someday',
		date: '2024-09-14'
	},
	{
		title: 'Uses',
		description: 'The hardware, software, and tools I use day to day.',
		path: '/uses',
		date: '2023-05-12'
	},
	{
		title: 'Now',
		description: "What I'm focused on right now.",
		path: '/now',
		date: '2023-05-12'
	},
	{
		title: 'Weeks',
		description: 'My life in weeks.',
		path: '/weeks',
		date: '2023-08-24'
	},
	{
		title: 'LaTeX resume template',
		description: 'A clean LaTeX resume template you can copy.',
		path: '/latex',
		date: '2023-11-06'
	},
	{
		title: 'About',
		description: 'A little about me.',
		path: '/about',
		date: '2023-05-12'
	}
];
