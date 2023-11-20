'use client';

import { KBarProvider, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch } from 'kbar';
import { router } from 'next/client';

export function KBarProviderComponent({ children }: { children: React.ReactNode }) {
	const actions = [
		{
			id: 'home',
			name: 'Home',
			shortcut: ['g', 'h'],
			keywords: 'go-home',
			section: 'Go To',
			perform: () => router.push('/')
			// icon: <i className="ri-home-5-line" style={iconStyle} />
		},
		{
			id: 'about',
			name: 'About',
			shortcut: ['g', 'a'],
			keywords: 'go-about',
			section: 'Go To',
			perform: () => router.push('/about')
			// icon: <i className="ri-user-line" style={iconStyle} />
		},
		{
			id: 'blog',
			name: 'Blog',
			shortcut: ['g', 'b'],
			keywords: 'go-blog',
			section: 'Go To',
			perform: () => router.push('/blog')
			// icon: <i className="ri-ball-pen-line" style={iconStyle} />
		}
	];

	return (
		<KBarProvider actions={actions}>
			<KBarPortal>
				<KBarPositioner>
					<KBarAnimator>
						<KBarSearch />
					</KBarAnimator>
				</KBarPositioner>
			</KBarPortal>

			{children}
		</KBarProvider>
	);
}

// const iconStyle = {
// 	fontSize: '20px',
// 	position: 'relative',
// 	top: '-2px'
// };
