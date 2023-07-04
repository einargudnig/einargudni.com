import { Metadata } from 'next';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';

export const metadata: Metadata = {
	title: 'Uses',
	description: 'The tools I use'
};

export default function UsesPage() {
	return (
		<section>
			<h1 className="font-bold text-3xl font-serif mb-5">Uses</h1>
			<div>
				<p>I have an idea how to make this page more fun, you just wait!</p>

				<h2 className="mt-4 font-bold text-2xl font-serif mb-5">Hardware</h2>
				<div>
					<Card>
						<CardHeader>
							<CardTitle>Card Title</CardTitle>
							<CardDescription>Card Description</CardDescription>
						</CardHeader>
						<CardContent>
							<p>Card Content</p>
						</CardContent>
						<CardFooter>
							<p>Card Footer</p>
						</CardFooter>
					</Card>
				</div>
				<h2 className="font-bold text-2xl font-serif mb-5">Software</h2>
				<ul>
					<li>Obsidian</li>
					<li>Things 3</li>
					<li>Cron</li>
					<li>VS Code</li>
					<li>Arc</li>
					<li>Chrome</li>
					<li>1Password</li>
					<li>Postman</li>
					<li>Insomnia</li>
					<li>IntelliJ</li>
					<li>Warp</li>
					<li>Spark</li>
					<li>Front</li>
					<li>Around</li>
					<li>Asana</li>
					<li>Spotify</li>
				</ul>
			</div>
		</section>
	);
}
