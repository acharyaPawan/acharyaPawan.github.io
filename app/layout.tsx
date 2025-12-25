import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Pawan Acharya	',
    template: '%s | Pawan Acharya',
  },
  description: 'Fullstack developer',
  openGraph: {
    title: 'My Portfolio',
    description: 'Fulstack developer',
    url: baseUrl,
    siteName: 'Pawan Acharya',
   /* locale: 'en_US',*/
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'bg-[#f8f8f5] text-neutral-900 dark:bg-[#020205] dark:text-neutral-100',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased mx-auto mt-10 max-w-2xl px-4 font-mono text-[15px] leading-relaxed text-neutral-900 selection:bg-neutral-900 selection:text-white dark:text-neutral-100">
        <main className="flex-auto min-w-0 flex flex-col">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
