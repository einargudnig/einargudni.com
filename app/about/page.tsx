import { Separator } from '@/components/ui/separator';

export default function Page() {
	return (
		<section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6">
			<h1 className="font-bold text-3xl font-serif mb-5">About</h1>
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

				<p></p>
			</div>
			<Separator />
			<div className="prose prose-neutral dark:prose-invert text-neutral-200">
				<p className="text-neutral-500 text-lg font-mono">What</p>
				<p>
					I love to wander around the web and see what other people are building it
					inspires me a lot.
				</p>
				<p>I work as a developer for Maul, a small company</p>
				<p>
					I do some free lance work on the side, and have been adding features and
					rebuilding the system for gigover
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
			</div>
		</section>
	);
}
