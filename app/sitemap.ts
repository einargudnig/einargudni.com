import { MetadataRoute } from 'next';
import { feedPages, SITE_URL } from '@/data/feed-pages';

// Routes that are public but deliberately absent from the RSS feed, so they
// carry no publish date of their own.
const unfeedPaths = ['/latex-template'];

export default function sitemap(): MetadataRoute.Sitemap {
	const feedEntries = feedPages.map((page) => ({
		url: `${SITE_URL}${page.path}`,
		lastModified: new Date(page.date)
	}));

	const newestDate = feedPages.reduce(
		(newest, page) => (page.date > newest ? page.date : newest),
		feedPages[0].date
	);

	return [
		{ url: `${SITE_URL}/`, lastModified: new Date(newestDate) },
		...feedEntries,
		...unfeedPaths.map((path) => ({
			url: `${SITE_URL}${path}`,
			lastModified: new Date(newestDate)
		}))
	];
}
