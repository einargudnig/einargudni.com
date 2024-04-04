import RSS from 'rss';

export async function GET() {
	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Content-Type': 'application/atom+xml; charset=utf-8'
		}
	});
}

const feed = new RSS({
	title: 'Your Website',
	description: 'A cool website that everyone should check out!',
	site_url: 'https://www.einargudni.com/',
	feed_url: `https://www.einargudni.com/feed.xml`,
	copyright: `${new Date().getFullYear()} Your Website`,
	language: 'en',
	pubDate: new Date()
});
