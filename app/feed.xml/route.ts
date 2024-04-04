import RSS from 'rss';

export async function GET() {
	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Content-Type': 'application/atom+xml; charset=utf-8'
		}
	});
}

const feed = new RSS({
	title: 'Einar Gudni',
	description: 'Curious, Coder, Crossfitter, Coffee and wine hobbyist, Late bloomer & Nerd',
	site_url: 'https://www.einargudni.com/',
	feed_url: 'https://www.einargudni.com/feed.xml',
	copyright: `${new Date().getFullYear()} Your Website`,
	language: 'en',
	pubDate: new Date()
});
