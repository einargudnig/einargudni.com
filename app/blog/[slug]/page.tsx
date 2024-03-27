import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from '../../../components/mdx';
import { allBlogs } from 'contentlayer/generated';
import { createClient } from '@/utils/supabase/server';
// import { getTweets } from 'lib/twitter';
import Balancer from 'react-wrap-balancer';
import ViewCounter from '../view-counter';

export async function generateStaticParams() {
	return allBlogs.map((post) => ({
		slug: post.slug
	}));
}
// @ts-ignore
export async function generateMetadata({ params }): Promise<Metadata | undefined> {
	const post = allBlogs.find((p) => p.slug === params.slug);
	if (!post) {
		return;
	}

	const { title, publishedAt: publishedTime, summary: description, image, slug } = post;
	const ogImage = image
		? `https://einargudni.com${image}`
		: `https://einargudni.com/api/og?title=${title}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `https://einargudni.com/blog/${slug}`,
			images: [
				{
					url: ogImage
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage]
		}
	};
}
// @ts-ignore
export default async function Blog({ params }) {
	const supabase = createClient();

	// reading from database, show the total view count for blog post
	let { data: writing } = await supabase.from('writing').select('title, views');
	const post = allBlogs.find((p) => p.slug === params.slug);

	// write to the database, add one to views when blog post is read
	// const { data, error } = await supabase
	// 	.from('writing')
	// 	.insert([{ views: '' }])
	// 	.select();

	if (!post) {
		notFound();
	}

	// const tweets = await getTweets(post.tweetIds);

	return (
		<section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6">
			<script type="application/ld+json">{JSON.stringify(post.structuredData)}</script>
			<h1 className="font-bold text-3xl font-serif max-w-[650px]">
				<Balancer>{post.title}</Balancer>
			</h1>
			<div className="grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm max-w-[650px]">
				<div className="bg-neutral-800 rounded-md px-2 py-1 tracking-tighter">
					{post.publishedAt}
				</div>
				<div className="h-[0.2em] bg-neutral-800 mx-2" />
				<ViewCounter title={post.title} writing={writing!} trackView />
			</div>
			<Mdx code={post.body.code} />
			{/* <Mdx code={post.body.code} tweets={tweets} /> */}
		</section>
	);
}
