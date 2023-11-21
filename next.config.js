const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['images.unsplash.com', 'i.scdn.co']
	},
	experimental: {
		turbo: {
			rules: {
				// Option-less format
				'*.mdx': ['@mdx-js/loader']
			}
		}
	}
};

module.exports = withContentlayer(nextConfig);
