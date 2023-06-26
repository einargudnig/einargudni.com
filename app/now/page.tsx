import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Now',
	description: "What I'm doing now"
};

export default function NowPage() {
	return (
		<section className="prose prose-quoteless prose-invert">
			<h1 className="font-bold text-3xl font-serif mb-5">Now</h1>
			Work Maul GigOver Reading Watching Playing Health Travel Last updated: 2021-10-10
			<p>Follow your curiosity!</p>
			<div>
				<h2 className="font-bold text-2xl font-serif mb-5">Work</h2>
				<p>
					I&apos;m currently working as a software engineer at{' '}
					<a href="https://www.fool.com/">Maul</a>. We are a close knit team that aim to
					change the lunchtime at your work!
				</p>
				<p>
					We create a menu for you and your co-workers, this menu is built around
					restaurants and catering services in Reykjavik(and Copenhagen). You order of
					said menu for upcoming week and we deliver the food you and your co-workers
					ordered.
				</p>
				<p>
					We have built a many-to-one relationship, where your workplace has access to
					multiple restaurants each week.
				</p>
				<p>
					We recently launched Tiffin which will try to refresh launch culture in
					Copenhagen.
				</p>
				<h2 className="font-bold text-2xl font-serif mb-5">Freelancing</h2>
				<p></p>
			</div>
		</section>
	);
}
