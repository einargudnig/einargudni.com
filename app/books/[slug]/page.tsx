// import type { Metadata } from 'next';
// import { Mdx } from '../../../components/mdx';
// import { notFound } from 'next/navigation';

// export async function generateStaticParams() {
// 	return allBooks.map((post) => ({
// 		slug: post.slug
// 	}));
// }

// // @ts-ignore
// export async function generateMetadata({ params }): Promise<Metadata | undefined> {
// 	const post = allBooks.find((p) => p.slug === params.slug);
// 	if (!post) {
// 		return;
// 	}

// 	const { title, publishedAt: publishedTime, summary: description, image, slug } = post;
// 	const ogImage = image
// 		? `https://einargudni.com${image}`
// 		: `https://einargudni.com/api/og?title=${title}`;

// 	return {
// 		title,
// 		description,
// 		openGraph: {
// 			title,
// 			description,
// 			type: 'article',
// 			publishedTime,
// 			url: `https://einargudni.com/blog/${slug}`,
// 			images: [
// 				{
// 					url: ogImage
// 				}
// 			]
// 		},
// 		twitter: {
// 			card: 'summary_large_image',
// 			title,
// 			description,
// 			images: [ogImage]
// 		}
// 	};
// }

export default async function Book() {
	// const post = allBooks.find((p) => p.slug === params.slug);

	// if (!post) {
	// 	notFound();
	// }

	return (
		<section>
			<h1 className="font-bold text-3xl font-serif mb-5">Book</h1>
			<div className="prose prose-quoteless prose-invert">
				{/* <Mdx>{post.content}</Mdx> */}
			</div>
		</section>
	);
}
