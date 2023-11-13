import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Now',
	description: "What I'm doing now"
};

export default function NowPage() {
	return (
		<section className="prose prose-quoteless prose-invert">
			<h1 className="font-bold text-3xl font-serif mb-5">Follow your curiosity!</h1>
			<p>
				<strong>Last updated:</strong> 2023-11-13
			</p>
			<div className="grid grid-cols-2 gap-4">
				<div className="flex space-x-2 border border-neutral-100 p-2 rounded-md justify-center items-center">
					<p>
						<strong>Location:</strong>
					</p>
					<p>Copenhagen, Denmark</p>
				</div>
				<div className="flex space-x-2 border border-neutral-100 p-2 rounded-md justify-center items-center">
					<p>
						<strong>Weather:</strong>
					</p>
					<p>8°C, Cloudy</p>
				</div>
				<div className="flex flex-col border border-neutral-100 p-2 rounded-md items-center">
					<p>
						<strong>Reading:</strong>
					</p>
					<p>Thinking in Systems</p>
					<p>Donatella Meadows</p>
				</div>
				<div className="flex space-x-2 border border-neutral-100 p-2 rounded-md justify-center items-center">
					<p>
						<strong>Podcast:</strong>
					</p>
					<p>How I write</p>
				</div>
				<div className="flex space-x-2 border border-neutral-100 p-2 rounded-md justify-center items-center">
					<p>
						<strong>Drinking:</strong>
					</p>
					<p>Coffee</p>
				</div>
				<div className="flex space-x-2 border border-neutral-100 p-2 rounded-md justify-center items-center">
					<p>
						<strong>Eating:</strong>
					</p>
					<p>Nothing</p>
				</div>
			</div>
			<div>
				<h2 className="font-bold text-2xl font-serif mb-5">Work</h2>
				<p>
					I&apos;m currently working as a software engineer at{' '}
					<Link href="https://www.maul.is/" target="_blank">
						Maul
					</Link>
					. We are a close knit team that aim to change the lunchtime at your work!
				</p>
				<p>
					We create a menu for you and your co-workers, this menu is built around
					restaurants and catering services in Reykjavik(and Copenhagen). You order of
					said menu for upcoming week and we deliver the food you and your co-workers
					ordered.
				</p>
				<p>
					We have built a many-to-one relationship, where your workplace has access to
					multiple restaurants each day.
				</p>
				<p>
					We recently launched{' '}
					<Link href="https://www.tiffin.dk/" target="_blank">
						Tiffin
					</Link>{' '}
					which will try to refresh the launch culture in Copenhagen.
				</p>
				<p>
					I am located in Copenhagen for the next 2 weeks to help the team here. If your
					team is in need of upgraded frokost, let me know 😼
				</p>
				<h2 className="font-bold text-2xl font-serif mb-5">Freelancing</h2>
				<p>
					I&apos;m always open to new opportunities, if you have a project that you think
					I could help you with, please don&apos;t hesitate to contact me.
				</p>
				<p>
					One of my freelancing projects is a frontend developer at{' '}
					<Link href="https://www.gigover.com/" target="_blank">
						GigOver
					</Link>
					. I help them build a software used in construction. My current project revolves
					around building a procurement and offer system.
				</p>
				<h2 className="font-bold text-2xl font-serif mb-5">Side projects</h2>
				<p>
					I always have something that I want to build. My main problem is to find the
					time to do it.
				</p>
				<p>I have some fun ideas I want experiment with, so stay tuned on my page.</p>
				<h2 className="font-bold text-2xl font-serif mb-5">Health</h2>
				<p>My plan is to live to be at least 100 years old and be healthy</p>
				<p>
					I try to get enough sleep, eat well and train. I&apos;ve been following the
					Strength program from{' '}
					<Link href="https://www.mayhemathletes.com/competitor/" target="_blank">
						Crossfit Mayhem
					</Link>{' '}
					for some time.
				</p>
			</div>
		</section>
	);
}
