import Link from 'next/link';
import LifeWeeks from '@/components/lifeweeks';

const HomePage = () => {
	const weeksPassed = () => {
		const date1 = new Date('03/24/1992');
		const date2 = new Date();
		const diffTime = Math.abs(date2.getTime() - date1.getTime());
		const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
		return diffWeeks;
	};

	return (
		<section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6">
			<div>
				<h2 className="font-bold text-3xl font-serif">5200 weeks</h2>
				<p className="mt-3">
					<Link href={'https://www.oliverburkeman.com/books'}>
						Oliver Burkman wrote 4000 weeks, which I can&apos;t recommend enough.
					</Link>
				</p>
				<br />
				<i className="my-3 text-neutral-400">
					&quot;We live in an age of impossible demands, infinite choice, relentless
					distraction and spiralling global crises. Yet most productivity advice, like
					other modern messages about time, makes things worse. It encourages the fantasy
					that we might one day “get everything done”, becoming the fully optimized,
					emotionally invincible masters of our time. The pursuit of this limit-denying
					delusion systematically leaves us more busy, distracted, and isolated from each
					other – while postponing the truly important parts of life to some point in the
					future that never quite seems to arrive.&quot;
				</i>
				<br />
				<p>Why 5200 weeks instead of 4000? I plan to live to be at least 100 years old.</p>
			</div>
			<div className="py-5">
				<LifeWeeks weeksPassed={weeksPassed()} />
			</div>

			<div className="mt-3">
				<p className="text-neutral-400 font-light text-sm font-serif">
					{weeksPassed()}/5200{' '}
				</p>
			</div>
		</section>
	);
};

export default HomePage;
