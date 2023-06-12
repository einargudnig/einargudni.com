import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Hobbies',
	description: 'What I like to do'
};

export default function NowPage() {
	return (
		<section>
			<h1 className="font-bold text-3xl font-serif mb-5">Hobbies</h1>
		</section>
	);
}
