import './globals.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '../components/sidebar'

const inter = Inter({ subsets: ['latin'] })

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
        url: 'https://einargudni.com/images/og-image.png',
        alt: 'Einar Gudni',
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto">
        <Sidebar />
        <main className='flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0'>
          {children}
        </main>
      </body>
    </html>
  )
}
