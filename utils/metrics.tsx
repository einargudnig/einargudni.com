// `server-only` ships no type declarations (it's a marker package with no
// exports). Assigning it to a binding satisfies oxlint's no-unassigned-import
// rule; the ts-expect-error suppresses the resulting "implicitly any" error
// without adding a separate .d.ts file just for this.
// @ts-expect-error - server-only has no type declarations
import * as serverOnly from 'server-only';
void serverOnly;

import { Octokit } from '@octokit/rest';
import { cache } from 'react';

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
