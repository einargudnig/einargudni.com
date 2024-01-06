import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

const navItems = {
	'/': {
		name: 'home'
	},
	'/work': {
		name: 'work'
	},
	'/blog': {
		name: 'blog'
	}
};

export function Navbar() {
	return (
		<div className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6">
			<aside className="-ml-[8px] mb-16 tracking-tight">
				<div className="lg:sticky lg:top-20">
					<nav className="px-0 pb-0 fade scroll-pr-6" id="nav">
						<div className="flex justify-between items-center">
							<div className="flex flex-row space-x-0 pr-10">
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
							<div className="justify-end">
								<ThemeToggle />
							</div>
						</div>
					</nav>
				</div>
			</aside>
		</div>
	);
}
