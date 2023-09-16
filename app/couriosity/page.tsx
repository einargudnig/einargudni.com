import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Couriosity',
	description: 'I am courious about a lot of things'
};

export default function Couriosity() {
	return (
		<section>
			<h1 className="font-bold text-3xl font-serif mb-5">Couriosity</h1>
			<div className="prose prose-neutral dark:prose-invert text-neutral-200">
				<p>
					This will be me couriosity diary. I will add things here that I find
					interesting.
				</p>
				<p>
					I&apos;m going to make list of everything that I find courious along side the
					date I add it to the list, so buckle up for this ride 🎢
				</p>
			</div>
			<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
				&#126;&#126;&#126;
			</div>

			<div className="flex mt-2 items-center">
				<div className="text-neutral-500 mr-2 text-lg"> &#8227;</div>
				<div className="text-neutral-200 hover:text-neutral-500">
					<a
						href="https://engineercodex.substack.com/p/how-instagram-scaled-to-14-million"
						target="_blank"
						rel="noopener noreferrer"
					>
						How instagram scaled to 14 million users with only 3 engineers
					</a>
				</div>
				<div className="text-neutral-400">&nbsp;-&nbsp;16. sept 2023</div>
			</div>

			<div className="flex mt-2 items-center">
				<div className="text-neutral-500 mr-2 text-lg"> &#8227;</div>
				<div className="text-neutral-200 hover:text-neutral-500">
					<a
						href="https://bun.sh/blog/bun-v1.0#why-bun-exists"
						target="_blank"
						rel="noopener noreferrer"
					>
						Why Bun exists
					</a>
				</div>
				<div className="text-neutral-400">&nbsp;-&nbsp;16. sept 2023</div>
			</div>

			<div className="flex mt-2 items-center">
				<div className="text-neutral-500 mr-2 text-lg"> &#8227;</div>
				<div className="text-neutral-200 hover:text-neutral-500">
					<a
						href="https://vercel.com/docs/functions/edge-functions/og-image-generation"
						target="_blank"
						rel="noopener noreferrer"
					>
						Vercel og image generation
					</a>
				</div>
				<div className="text-neutral-400">&nbsp;-&nbsp;16. sept 2023</div>
			</div>
		</section>
	);
}
