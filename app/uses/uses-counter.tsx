'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
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

	const handleClick = () => {
		console.log(type);
		fetch(`/api/uses/${type}`, {
			method: 'POST'
		});
	};

	return (
		<div className="flex flex-row-reverse justify-between items-center">
			<p className="font-mono text-md text-neutral-500 tracking-tighter">
				{data ? `${views.toLocaleString()} uses` : ' ​'}
			</p>
			<Button className="mx-3" variant="secondary" onClick={handleClick}>
				I use this!
			</Button>
		</div>
	);
}
