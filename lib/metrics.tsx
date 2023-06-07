import 'server-only';

import { Octokit } from '@octokit/rest';
import { queryBuilder } from './planetscale';
import { cache } from 'react';

export const getBlogViews = cache(async () => {
	const data = await queryBuilder.selectFrom('views').select(['count']).execute();

	return data.reduce((acc, curr) => acc + Number(curr.count), 0);
});

// Return the blog post with most views
export const getMostViewedPost = cache(async () => {
	const data = await queryBuilder
		.selectFrom('views')
		.select(['slug', 'count'])
		.orderBy('count', 'desc')
		.limit(1)
		.execute();

	return data[0];
});

export const getStarCount = cache(async () => {
	const octokit = new Octokit({
		auth: process.env.GITHUB_TOKEN
	});

	const req = await octokit.request('GET /repos/{owner}/{repo}', {
		owner: 'einargudnig',
		repo: 'einargudni.com-next13'
	});

	return req.data.stargazers_count;
});
