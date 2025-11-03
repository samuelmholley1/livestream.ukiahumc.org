import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ukiah United Methodist Church - Livestream',
  description: 'Join us live for worship services and special events at Ukiah United Methodist Church',
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Ukiah United Methodist Church - Livestream',
    description: 'Join us live for worship services and special events at Ukiah United Methodist Church',
    url: 'https://livestream.ukiahumc.org',
    siteName: 'Ukiah United Methodist Church',
    images: [
      {
        url: 'https://livestream.ukiahumc.org/uumc_icon_wall_square.png',
        width: 1200,
        height: 1200,
        alt: 'Ukiah United Methodist Church',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ukiah United Methodist Church - Livestream',
    description: 'Join us live for worship services and special events at Ukiah United Methodist Church',
    images: ['https://livestream.ukiahumc.org/uumc_icon_wall_square.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}