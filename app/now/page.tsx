import { ExternalLink } from '@/components/external-link';

export default function Page() {
	return (
		<section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6 mb-8">
			<div className="flex flex-col">
				<h1 className="font-semibold text-2xl font-serif mb-5">Now</h1>
				<p className="-mt-4 text-neutral-500">Updated 14. sept, 2024</p>
			</div>
			<div className="prose prose-neutral dark:prose-invert text-neutral-200">
				<p className="text-lg">Writing</p>
				<p className="-mt-2">
					I recently moved my writing from this page to me new Astro page. I have wanted
					to write more for the last couple of years and I have never managed to make it
					important enough. I have been planning some posts for me to write in the future
					so check out&nbsp;
					<ExternalLink href="https://writing.einargudni.com">my writings</ExternalLink>.
				</p>
				<p className="text-lg">Craft</p>
				<p className="-mt-2">
					I have seen other people post their own UI component creations and it inspires
					my a lot. My bookmarks on Twitter are full of delightful UI components that I
					want to try to recreate and add to my{' '}
					<ExternalLink href="https://writing.einargudni.com">site.</ExternalLink> This
					seems like a fun way to spend an evening here and there.
				</p>
				<p className="text-lg">Team tally</p>
				<p className="-mt-2">
					I am going to build and publish my first mobile app, stay tuned! More details
					very soon. This is going well, I have added authentication and started to build
					the screens needed.
				</p>
				<p className="text-lg">Running</p>
				<p className="-mt-2">
					Every other person around me has started running, which is great. I&apos;ve also
					started to run more than I&apos;ve done before. This year I ran 20km trail run
					and also managed to do half marathon under 2 hours. By no means a world class
					time, but I am happy with it. This september I registered for a 100 challenge in
					Strava. Basically, run 100km in the month of September
				</p>
				<p className="text-lg">Reading</p>
				<p className="-mt-2">
					I am listening to the first book in the{' '}
					<ExternalLink href="https://www.goodreads.com/book/show/15839976-red-rising">
						Red Rising
					</ExternalLink>{' '}
					trilogy, by Pierce Brown, and I am obsessed! I love it!
				</p>
			</div>
		</section>
	);
}
