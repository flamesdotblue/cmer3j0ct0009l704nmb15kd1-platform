import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Skeuomorphism UI',
  description: 'A tactile skeuomorphic interface demo built with Next.js and Tailwind',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
