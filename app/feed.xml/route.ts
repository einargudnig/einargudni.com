import { feedPages, SITE_URL } from '@/data/feed-pages';
import RSS from 'rss';

export async function GET() {
	const feed = new RSS({
		title: 'Einar Gudni',
		description: 'Curious, Coder, Crossfitter, Coffee and wine hobbyist, Late bloomer & Nerd',
		site_url: SITE_URL,
		feed_url: `${SITE_URL}/feed.xml`,
		copyright: `${new Date().getFullYear()} Einar Gudni`,
		language: 'en',
		pubDate: new Date()
	});

	const pages = [...feedPages].sort((a, b) => b.date.localeCompare(a.date));

	for (const page of pages) {
		const url = `${SITE_URL}${page.path}`;
		feed.item({
			title: page.title,
			description: page.description,
			url,
			guid: url,
			date: page.date
		});
	}

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Content-Type': 'application/atom+xml; charset=utf-8'
		}
	});
}
