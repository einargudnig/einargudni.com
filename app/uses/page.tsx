import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Uses',
	description: "Here's what tech I'm currently using for coding and in my daily life"
};

export default function UsesPage() {
	return (
		<section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6">
			<div className="prose prose-neutral dark:prose-invert">
				<h3 id="computer-office" className="text-cyan">
					What's on my desk
				</h3>
				<ul>
					<li>Ikea Bekant desk</li>
					<li>14&quot; Macbook Pro M1 Max 64GB 1TB</li>
					<li>Nuphy Halo 65</li>
					<li>27&quot; Asus monitor</li>
					<li>Logitech MX Master 3 Mouse</li>
					<li>Apple Magic Trackpad</li>
					<li>Keychron K3</li>
					<li>Ikea Styrspel chair</li>
					<li>Twleve South Curve flex</li>
				</ul>
				<h3 id="coding">Development</h3>
				<ul>
					<li>
						Editor: VSCode (
						<Link href="https://gist.github.com/einargudnig/1d4efe842d2fdc1698a57ab7cb5fad31">
							Settings
						</Link>
						)
					</li>
					<li>
						Theme:&nbsp;
						<Link href="https://marketplace.visualstudio.com/items?itemName=RaillyHugo.one-hunter">
							One Hunter Flexoki Dark
						</Link>
					</li>
					<li>Terminal: Warp</li>
					<li>API testing: Insomnia</li>
				</ul>
				<h3 id="software">Software 💽</h3>
				<ul>
					<li>
						Launcher: <i>Raycast</i>
					</li>
					<li>
						To-do: <i>Things</i>
					</li>
					<li>
						Notes: <i>Obsidian</i>
					</li>
					<li>
						Browser: Arc <i>browser</i>
					</li>
					<li>
						Password Management: <i>1Password</i>
					</li>
					<li>Music: Spotify</li>
					<li>
						Email: <i>Spark</i>
					</li>
					<li>
						Calendar: <i>Cron</i>
					</li>
					<li>
						Screenshots: CleanShot <i>X</i>
					</li>
				</ul>
				<h3 id="other-tech">Other Tech</h3>
				<ul>
					<li>Apple Airpods Pro</li>
					<li>Apple iPhone 14 pro</li>
					<li>Garmin Venu</li>
					<li>Kindle</li>
					<li>Sony wh-1000xm3</li>
				</ul>
				<h3 id="other-tech">Coffee ☕</h3>
				<ul>
					<li>Timemore Chestnut hand grinder</li>
					<li>Aeropress</li>
					<li>Hario V60 aluminum</li>
					<li>Nespresso Vertuo</li>
				</ul>
			</div>
		</section>
	);
}
