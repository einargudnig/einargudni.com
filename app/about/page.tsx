import { ExternalLink } from '@/components/external-link';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function Page() {
	return (
		<section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6 mb-8">
			<h1 className="font-bold text-2xl font-serif mb-5">About</h1>
			<div className="prose prose-neutral dark:prose-invert text-neutral-200">
				<p className="text-neutral-500 text-lg font-mono">Who</p>
				<p>
					I am Einar Gudni, usually called Einar, a software developer born and raised in
					Iceland. I am a triplet, and I have two great sisters. My parents are some of my
					biggest role models.
				</p>

				<p>
					I am curious by nature but didn&apos;t start coding until I started computer
					science at the University of Iceland. I graduated in 2020 and I think few things
					have been as rewarding as learning to code.
				</p>

				<p>
					A big part of my identity revolves around sports and being active. I trained
					football and handball when growing up, and I have been doing CrossFit for the
					last 9 years. &quot;If you don&#39;t use it, you lose it.&quot; So I try to use
					it as much I can.{' '}
					<Link href="../../weeks">I plan on to live to at least 100 years old!</Link>
				</p>
			</div>
			<Separator />
			<div className="prose prose-neutral dark:prose-invert text-neutral-200">
				<p className="text-neutral-500 text-lg font-mono">What</p>
				<p>
					I love to wander around the web and see what other people are building it
					inspires me a lot. If I had all the time in the world I would spend it tinkering
					on things.
				</p>
				<p>
					I work as a developer for{' '}
					<ExternalLink href="https://maul.is">Maul</ExternalLink>, a small company that
					wants to change how you experience your work lunch. It is so much fun to be a
					part of a small team with great people. High agency and a lot of responsibility.
					Your voice is heard and lot of opportunities to learn from others.
				</p>
				<p>
					I do some free lance work on the side, and have been adding features and
					rebuilding the system for{' '}
					<ExternalLink href="https://gigover.com">gigover</ExternalLink>
				</p>
			</div>
			<Separator />
			<div className="prose prose-neutral dark:prose-invert text-neutral-200">
				<p className="text-neutral-500 text-lg font-mono">Why</p>
				<p>
					I remember that I loved building LEGO when I was small, at some point I loved to
					draw houses, like an architecture, being the only boy it came naturally to me to
					play alone and I think that is where my love for building things started.
				</p>
				<p>
					Over the last years I&apos;ve started to realize more and more how important it
					is to have a long-term mindset. I believe that given time and effort I am
					capable of doing anything I set my mind to. That still means that I have to work
					hard and continue to improve.
				</p>

				<p>
					My current inspiration is minimalistic and simple design, well crafted software
					that makes sense to use.
				</p>
			</div>
		</section>
	);
}
