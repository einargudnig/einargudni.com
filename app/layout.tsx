import './globals.css';
import clsx from 'clsx';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from '@/components/navbar';
import { CommandMenu } from '@/components/command-menu';
import { RESUME_DATA } from '@/data/resume-data';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

const kaisei = localFont({
	src: '../public/fonts/kaisei-tokumin-latin-700-normal.woff2',
	weight: '700',
	variable: '--font-kaisei',
	display: 'swap'
});

// I should not need to this. There is an npm pacakage for this I think?
// const geist = localFont({
// 	src: '../public/fonts/kaisei-tokumin-latin-700-normal.woff2',
// 	weight: '700',
// 	variable: '--font-kaisei',
// 	display: 'swap'
// });

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
		// <html lang="en" className={GeistSans.className}>
		<html lang="en" className={clsx(kaisei.variable)}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<body className="antialiased mb-10 mx-4 mt-8 lg:mx-auto">
					<main className="container relative mx-auto scroll-my-12 overflow-auto print:p-12">
						<Navbar />
						{children}
						<CommandMenu
							links={[
								{
									url: '/blog',
									title: 'writing',
									type: 'internal'
								},
								{
									url: '/uses',
									title: 'uses',
									type: 'internal'
								},
								{
									url: '/weeks',
									title: 'weeks',
									type: 'internal'
								},
								{
									url: '/latex',
									title: 'latex book',
									type: 'internal'
								},
								{
									url: RESUME_DATA.contact.email,
									title: 'email',
									type: 'contact'
								},
								...RESUME_DATA.contact.social.map((socialMediaLink) => ({
									url: socialMediaLink.url,
									title: socialMediaLink.name,
									type: 'social'
								}))
							]}
						/>
					</main>
				</body>
			</ThemeProvider>
			<Analytics />
		</html>
	);
}
