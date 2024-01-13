import './globals.css';
import { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from '@/components/navbar';
import { CommandMenu } from '@/components/command-menu';
import { RESUME_DATA } from '@/data/resume-data';
import { GeistSans } from 'geist/font/sans';

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
		<html lang="en" className={GeistSans.className}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<body className="antialiased mb-10 lg:mx-auto">
					<main className="container relative mx-auto mt-8 overflow-auto print:p-12">
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
