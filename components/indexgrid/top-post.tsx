import { useState } from 'react';
import { getMostViewedPost } from '@/lib/metrics';
import Link from 'next/link';
import { ViewsIcon } from '../icons';

type PostState = {
	slug: string;
	count: number;
};

export default function TopPost() {
	const [isLoading, setIsLoading] = useState(true);
	const [post, setPost] = useState<PostState>({ slug: '', count: 0 });

	// eslint-disable-next-line
	async function fetchMostViewedPost() {
		try {
			const { slug, count } = await getMostViewedPost();
			setPost({ slug, count });
		} catch (error) {
			console.error('Error fetching most viewed post:', error);
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!post) {
		return <div>No data available.</div>;
	}

	const { slug, count } = post;

	return (
		<div className="border border-gray-200 rounded-md h-48">
			<div className="flex justify-center items-center">
				<Link href={`/blog/${slug}`} passHref>
					<a className="flex items-center">
						<div className="flex flex-col mx-auto text-center">
							{slug}
							<div className="flex flex-row">
								<ViewsIcon />
								{`${count?.toLocaleString()} views on top post`}
							</div>
						</div>
					</a>
				</Link>
			</div>
		</div>
	);
}

export function getServerComponentProps() {
	return {
		props: {},
		async onLoad({ update }: { update: (data: { slug: string; count: number }) => void }) {
			const { slug, count } = await getMostViewedPost();
			update({ slug, count });
		}
	};
}
