import './globals.css';
import clsx from 'clsx';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Navbar } from '@/components/navbar';

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
		<html lang="en" className={clsx(kaisei.variable)}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<body className="antialiased mb-10 mx-4 mt-8 lg:mx-auto">
					<main className="container relative mx-auto scroll-my-12 overflow-auto print:p-12">
						<Navbar />
						{children}
					</main>
				</body>
			</ThemeProvider>
			<Analytics />
		</html>
	);
}
