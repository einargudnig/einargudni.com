import Image from 'next/image';
import Link from 'next/link';

export default async function MyBooks() {
	return (
		<section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6">
			<h1 className="font-bold text-3xl font-serif mb-5">Latex</h1>
			<p>My homework efficency improved a lot when I discovered LaTex</p>
			<p>It&apos;s a great tool to use for any kind of scientific or technical homework.</p>
			<p>LaTeX is great to build templates that are easily re-usable.</p>
			<br />
			<p>I used these template to build a good system for my homework returns.</p>
			<p>
				I simply built couple of templates in the beginning of the semester and re-used them
				every week
			</p>
			<Image alt="second brain" src="/images/enCover.png" width={500} height={400} />
			<p>This book is available in both Icelandic and english. You can get them for free.</p>
			<br />
			<br />

			<ul>
				<li>
					<div className="flex items-center">
						<div className="text-neutral-500 mr-2 text-lg"> &#8227;</div>
						<Link
							href={'https://einargudni.gumroad.com/l/ufidy'}
							className="hover:text-neutral-600"
						>
							Icelandic version 🇮🇸🇮🇸
						</Link>
					</div>
				</li>
				<li>
					<div className="flex items-center">
						<div className="text-neutral-500 mr-2 text-lg"> &#8227;</div>
						<Link
							href={'https://einargudni.gumroad.com/l/sfmlw'}
							className="hover:text-neutral-600"
						>
							English version 🇬🇧🇺🇸{' '}
						</Link>
					</div>
				</li>
			</ul>
		</section>
	);
}
