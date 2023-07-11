'use client';

import { useEffect } from 'react';
import useSWR from 'swr';

type UsesView = {
	type: string;
	count: string;
};

async function fetcher<JSON>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
	// @ts-ignore
	const res = await fetch(input, init);
	return res.json();
}

export default function UsesCounter({ type, trackView }: { type: string; trackView: boolean }) {
	const { data } = useSWR<UsesView[]>('/api/uses', fetcher);
	const viewsForSlug = Array.isArray(data) && data.find((view) => view.type === type);
	const views = viewsForSlug ? Number(viewsForSlug.count) : 0;

	useEffect(() => {
		const registerView = () =>
			fetch(`/api/uses/${type}`, {
				method: 'POST'
			});

		if (trackView) {
			registerView();
		}
	}, [type, trackView]);

	return (
		<div className="flex flex-row-reverse justify-between items-center">
			<p className="font-mono text-md text-neutral-500 tracking-tighter">
				{data ? `${views.toLocaleString()} uses` : ' ​'}
			</p>
			<button className="rounded-md border border-1 border-neutral-300 p-1">
				I use this!
			</button>
		</div>
	);
}
