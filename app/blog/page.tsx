import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import { allBlogs } from 'contentlayer/generated';
import Link from 'next/link';
import ViewCounter from './view-counter';

export const metadata: Metadata = {
	title: 'Blog',
	description: 'A place for thoughts reflections & everything in between'
};

export default async function BlogPage() {
	// console.log('allBlogs', allBlogs);

	const supabase = createClient();

	let { data: writing } = await supabase.from('writing').select('title, views');
	console.log('WRITING', writing);
	return (
		<section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6">
			<h1 className="font-bold text-3xl font-serif mb-5">Blog</h1>
			{allBlogs
				.sort((a, b) => {
					if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
						return -1;
					}
					return 1;
				})
				.map((post) => (
					<Link
						key={post.slug}
						className="flex flex-col space-y-1 mb-4"
						href={`/blog/${post.slug}`}
					>
						<div className="w-full flex flex-col">
							<p>{post.title}</p>
							<ViewCounter title={post.title} trackView={false} writing={writing!} />
						</div>
					</Link>
				))}
		</section>
	);
}
