import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Now',
	description: "What I'm doing now"
};

export default function NowPage() {
	return (
		<section>
			<h1 className="font-bold text-3xl font-serif mb-5">Now</h1>
		</section>
	);
}
