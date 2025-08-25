import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Skeuomorphic Studio – Warm Clay',
  description: 'A tactile skeuomorphic interface demo (warm clay/leather theme) built with Next.js and Tailwind',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
