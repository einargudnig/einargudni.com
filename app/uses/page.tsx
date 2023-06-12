import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Uses',
	description: 'The tools I use'
};

export default function UsesPage() {
	return (
		<section>
			<h1 className="font-bold text-3xl font-serif mb-5">Uses</h1>
		</section>
	);
}
