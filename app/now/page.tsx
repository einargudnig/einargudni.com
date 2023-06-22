import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Now',
	description: "What I'm doing now"
};

export default function NowPage() {
	return (
		<section>
			<h1 className="font-bold text-3xl font-serif mb-5">Now</h1>
			Work Maul GigOver Reading Watching Playing Health Travel Last updated: 2021-10-10
			<p>Focus on chasing your curiosity!</p>
			<div>
				<h2 className="font-bold text-2xl font-serif mb-5">Work</h2>
				<p>
					I'm currently working as a software engineer at{' '}
					<a href="https://www.fool.com/">The Motley Fool</a>. I'm working on a team that
					is building a new product for the company.
				</p>
			</div>
		</section>
	);
}
