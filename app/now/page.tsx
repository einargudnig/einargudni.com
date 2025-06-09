import { ExternalLink } from '@/components/external-link';

export default function Page() {
	return (
		<section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6 mb-8">
			<div className="flex flex-col">
				<h1 className="font-semibold text-2xl font-serif mb-5">Now</h1>
				<p className="-mt-4 text-neutral-500">Updated 27. jan, 2025</p>
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
					<ExternalLink href="https://craft.einargudni.com">site.</ExternalLink> This
					seems like a fun way to spend an evening here and there.
				</p>
				<p className="text-lg">Fundamentals</p>
				<p className="-mt-2">
					I feel like I have some holes in the fundamentals when I am writing code, it
					slows my annoyingly down. I will spend time on this to improve. This is super
					important to me. I feel like I&apos;ve made some progress here, I have some
					notes I want to share!
				</p>
				<p className="text-lg">HYROX</p>
				<p className="-mt-2">
					Hyrox was great! We didn&apos;t manage to achieve our goal of going under 60
					minutes, we were 4 minutes away. Now we are back to training, mainly focusing on
					functional fitness, strength and aerobic base I think we will do another HYROX
					later to try to beat our time.
				</p>
				<p className="text-lg">Reading</p>
				<p className="-mt-2">
					I am listening to the fourth book in the{' '}
					<ExternalLink href="https://www.goodreads.com/book/show/15839976-red-rising">
						Red Rising
					</ExternalLink>{' '}
					saga, by Pierce Brown, and I am obsessed! I love it!
				</p>
			</div>
		</section>
	);
}
