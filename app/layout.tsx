import './globals.css';
import clsx from 'clsx';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import { Sidebar } from '../components/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { ReactQueryProvider } from './react-query-provider';
import { KBarProviderComponent } from './kbar-provider';

const kaisei = localFont({
	src: '../public/fonts/kaisei-tokumin-latin-700-normal.woff2',
	weight: '700',
	variable: '--font-kaisei',
	display: 'swap'
});

export const metadata: Metadata = {
	title: 'Einar Gudni',
	description: 'Curious developer, crossfitter, and coffee lover.',
	openGraph: {
		title: 'Einar Gudni',
		description: 'Curious developer, crossfitter, and coffee lover.',
		url: 'https://einargudni.com',
		siteName: 'Einar Gudni',
		images: [
			{
				url: 'https://einargudni.com/og-bg.png',
				alt: 'Einar Gudni'
			}
		],
		type: 'website'
	}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ReactQueryProvider>
			<KBarProviderComponent>
				<html lang="en" className={clsx('text-white bg-[#111010]', kaisei.variable)}>
					<body className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto">
						<Sidebar />
						<main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0">
							<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
								{children}
							</ThemeProvider>
							<Analytics />
						</main>
					</body>
				</html>
			</KBarProviderComponent>
		</ReactQueryProvider>
	);
}
