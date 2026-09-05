import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { profile, titleLine } from '@/lib/site-profile'

export const metadata: Metadata = {
  title: `${profile.name} | ${titleLine}`,
  description: `Portfolio of ${profile.name}, a System Engineer, frontend developer, and Data & AI enthusiast based in ${profile.location}.`,
  generator: 'v0.app',
  openGraph: {
    title: `${profile.name} | ${titleLine}`,
    description: 'Building modern, responsive, and intelligent digital experiences.',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' }, { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' }, { url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = { colorScheme: 'light dark', themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f4f5f1' }, { media: '(prefers-color-scheme: dark)', color: '#0b1115' }], userScalable: true }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personJsonLd = { '@context': 'https://schema.org', '@type': 'Person', name: profile.name, jobTitle: titleLine, email: profile.email, telephone: profile.phone, address: { '@type': 'PostalAddress', addressLocality: 'Kolkata', addressCountry: 'IN' }, sameAs: [profile.github, profile.linkedin, profile.leetcode, profile.hackerrank], knowsAbout: ['React', 'JavaScript', 'Tailwind CSS', 'Microsoft Azure', 'Power BI', 'Artificial Intelligence'] }
  return <html lang="en"><body className="antialiased">{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
