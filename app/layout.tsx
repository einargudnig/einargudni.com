import { CommandMenu } from '@/components/command-menu';
import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { RESUME_DATA } from '@/data/resume-data';
import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';
import { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import './globals.css';

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
	},
	alternates: {
		types: {
			'application/rss+xml': 'https://www.einargudni.com/feed.xml'
		}
	}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ViewTransitions>
			<html lang="en" className={GeistSans.className}>
				<ThemeProvider attribute="class" defaultTheme="dark">
					<body className="antialiased mb-10 lg:mx-auto">
						<main className="container relative mx-auto mt-8 overflow-auto print:p-12">
							<Navbar />
							{children}
							<CommandMenu
								links={[
									{
										url: 'writing.einargudni.com',
										title: 'writing',
										type: 'internal'
									},
									{
										url: 'craft.einargudni.com',
										title: 'craft',
										type: 'internal'
									},
									{
										url: 'https://remix-workbook.fly.dev/',
										title: 'learnings',
										type: 'internal'
									},
									{
										url: '/about',
										title: 'about',
										type: 'internal'
									},
									{
										url: '/now',
										title: 'now',
										type: 'internal'
									},
									{
										url: '/someday',
										title: 'someday',
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
							<Footer />
						</main>
					</body>
				</ThemeProvider>
				<Analytics />
			</html>
		</ViewTransitions>
	);
}
