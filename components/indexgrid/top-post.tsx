// a component that displays the top post, link to it and number of views
import { getMostViewedPost } from '@/lib/metrics';
import Link from 'next/link';
import { ViewsIcon } from '../icons';

export default async function TopPost() {
	const { slug, count } = await getMostViewedPost();
	// console.log('TOP POST', slug, count);

	return (
		<div className="border border-gray-200 rounded-md h-48">
			<div className="flex justify-center items-center">
				<Link href={`/blog/${slug}`} className="flex items-center">
					<div className="flex flex-col">
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
