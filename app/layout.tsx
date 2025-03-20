import type { Metadata } from 'next'
import './globals.css'
import { contactInfo } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Text Animation Collection - Minh Vo',
  description: 'Collection of text animations repository created by Minh Vo. Choose from various animation types including slash, reveal, typing, shine, fade, bounce, wave, glitch, blur, gradient, flip, and scale animations for your website.',
  generator: 'MinhOmega',
  keywords: ['text animation', 'animation repository', 'slash animation', 'text reveal', 'typing animation', 'shine text', 'fade animation', 'bounce text', 'wave animation', 'glitch text', 'blur animation', 'gradient text', 'flip animation', 'scale text', 'text effects', 'animation collection', 'Minh Vo', 'web animation', 'creative text', 'animation tool', 'multiple animations'],
  authors: [{ name: contactInfo.name, url: 'https://minhvo.is-a.dev' }],
  creator: contactInfo.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://minhvo.is-a.dev',
    title: 'Text Animation Collection - Minh Vo',
    description: 'Collection of text animations repository created by Minh Vo. Choose from various animation types including slash, reveal, typing, shine, fade, bounce, wave, glitch, blur, gradient, flip, and scale animations for your website.',
    siteName: 'Text Animation Collection by Minh Vo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Animation Collection - Minh Vo',
    description: 'Collection of text animations repository created by Minh Vo. Choose from various animation types including slash, reveal, typing, shine, fade, bounce, wave, glitch, blur, gradient, flip, and scale animations for your website.',
    creator: '@minhomega',
  },
  alternates: {
    canonical: 'https://minhvo.is-a.dev',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
