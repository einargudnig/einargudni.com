import type { Metadata } from 'next';
import Link from 'next/link';
import { Hardware } from '@/components/hardware';

export const metadata: Metadata = {
	title: 'Uses',
	description: "Here's what tech I'm currently using for coding and in my daily life"
};

export default function UsesPage() {
	return (
		<section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6">
			<div className="prose prose-neutral dark:prose-invert">
				<h3 id="computer-office" className="text-cyan">
					What&apos;s on my desk
				</h3>
				<ul>
					<Hardware />
				</ul>
				<h3 id="coding">
					Development -{' '}
					<Link href="https://github.com/einargudnig/dotfiles">dotfiles</Link>
				</h3>
				<ul>
					<li>
						Editor: VSCode (
						<Link href="https://gist.github.com/einargudnig/1d4efe842d2fdc1698a57ab7cb5fad31">
							config
						</Link>
						) | neovim → <Link href="https://www.lazyvim.org/">Lazyvim</Link> (
						<Link href="https://github.com/einargudnig/dotfiles/tree/master/nvim/lua/config">
							config
						</Link>
						)
					</li>
					<li>
						Terminal: wezterm (
						<Link href="https://github.com/einargudnig/dotfiles/blob/master/wezterm/wezterm.lua">
							config
						</Link>
						) + tmux (
						<Link href="https://github.com/einargudnig/dotfiles/blob/master/tmux/tmux.conf">
							config
						</Link>
						)
					</li>
					<li>API testing: Insomnia</li>
					<li>
						Shell: zsh (
						<Link href="https://github.com/einargudnig/dotfiles/blob/master/zsh/zshrc">
							config
						</Link>
						)
					</li>
				</ul>
				<h3 id="software">Software 💽</h3>
				<ul>
					<li>
						Launcher:{' '}
						<i>
							<Link href="https://raycast.com/?via=einar">Raycast</Link>
						</i>
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
						Screenshots: <i>CleanShot X</i>
					</li>
					<li>
						Window manager:{' '}
						<i>
							Aerospace (
							<Link href="https://github.com/einargudnig/dotfiles/blob/master/aerospace/aerospace.toml">
								config
							</Link>
							)
						</i>
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
