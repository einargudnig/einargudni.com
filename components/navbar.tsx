import Link from 'next/link';
import { NowPlaying } from './now-playing';
import { ThemeToggle } from './theme-toggle';

const navItems = {
	'/': {
		name: 'home'
	},
	'/blog': {
		name: 'writing'
	}
};

export function Navbar() {
	return (
		<nav className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6">
			<aside className="-ml-[8px] mb-16 tracking-tight">
				<div className="lg:sticky lg:top-20">
					<nav className="px-0 pb-0 fade scroll-pr-6" id="nav">
						<div className="flex justify-between items-center">
							<div className="flex flex-row">
								<div className="flex flex-row space-x-0 pr-1">
									{Object.entries(navItems).map(([path, { name }]) => {
										return (
											<Link
												key={path}
												href={path}
												className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
											>
												{name}
											</Link>
										);
									})}
								</div>
								<Link
									href="learn.einargudni.com"
									className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
								>
									curiosity
								</Link>
							</div>
							<div className="justify-end">
								<div className="flex items-center">
									<div className="md:flex hidden">
										<NowPlaying />
									</div>
									<div className="w-2" />
									<ThemeToggle />
								</div>
							</div>
						</div>
						<div className="flex justify-end mt-2 md:hidden">
							<NowPlaying />
						</div>
					</nav>
				</div>
			</aside>
		</nav>
	);
}