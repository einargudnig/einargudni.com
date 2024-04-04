import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const links = [
		{
			url: 'https://www.einargudni.com/',
			lastModified: new Date()
		}
	];

	return links;
}
