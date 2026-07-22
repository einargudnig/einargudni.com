import { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/feed-pages';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: ['/', '/og'],
			// Personal listening data, not content — no reason to crawl it.
			disallow: ['/api/']
		},
		sitemap: `${SITE_URL}/sitemap.xml`,
		host: SITE_URL
	};
}
