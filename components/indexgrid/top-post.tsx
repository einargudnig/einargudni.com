'use client';

import { ViewsIcon } from '../icons';
import Link from 'next/link';
import useSWR from 'swr';

type PostProps = {
	slug?: string;
	count?: number;
};

async function fetcher<JSON>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
	// @ts-ignore
	const res = await fetch(input, init);
	return res.json();
}

export default function TopPost() {
	const { data } = useSWR<PostProps[]>('/api/blog', fetcher);
	console.log('DATA', data);
	const slug = data?.[0]?.slug;
	const count = data?.[0]?.count;

	return (
		<div className="border border-gray-200 rounded-md h-48">
			<div className="flex justify-center items-center">
				<Link href={`/blog/${slug}`}>
					<div className="flex flex-col mx-auto text-center">
						{slug}
						<div className="flex flex-row">
							<ViewsIcon />
							{`${count?.toLocaleString()} views on top post`}
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
}
