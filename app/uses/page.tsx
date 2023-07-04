import { Metadata } from 'next';

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
				<ul className="mb-4">
					<li>Macbook Pro M1 max 2022</li>
					<li>iPhone 14 Pro</li>
					<li>Nuphy Halo 65</li>
					<li>Keychron K4</li>
					<li>Keychron K3</li>
					<li>Logitech MX Master 3</li>
					<li>Sony WH1000</li>
					<li>24&quot; Asus Montior</li>
					<li>Garmin Venu</li>
					<li></li>
				</ul>
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
